'use client';

import { Sparkles, ZoomIn, ZoomOut, RotateCcw, Move } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ViewMode } from '../types';
import { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { Project } from '@/types/real-project';
import { LayerInfo } from '../types/layers';

interface CanvasProps {
  viewMode: ViewMode;
  generatedCode: string;
  currentProject?: Project;
  onElementSizeChange?: (width: number) => void;
  selectedLayer?: string;
  onLayerSelect?: (layerId: string) => void;
  onLayersChange?: (layers: LayerInfo[]) => void;
}

interface Transform {
  x: number;
  y: number;
  scale: number;
}

interface ElementSize {
  width: number;
}

export function Canvas({ viewMode, generatedCode, currentProject, onElementSizeChange, selectedLayer, onLayerSelect, onLayersChange }: CanvasProps) {
  const [renderComponent, setRenderComponent] = useState<React.ReactNode>(null);
  const [transform, setTransform] = useState<Transform>({ x: 0, y: 0, scale: 1 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [elementSize, setElementSize] = useState<ElementSize>({ width: 800 });
  const [isResizing, setIsResizing] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // 检测深浅模式
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document?.documentElement?.classList?.contains('dark') || false);
    };
    
    checkDarkMode();
    
    // 监听主题变化
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => observer.disconnect();
  }, []);

  // 根据viewMode调整画布宽度
  useEffect(() => {
    if (viewMode === 'mobile') {
      setElementSize({ width: 375 }); // 手机预览
    } else if (viewMode === 'desktop') {
      setElementSize({ width: 1200 }); // 桌面预览
    }
  }, [viewMode]);

  // 通知父组件宽度变化
  useEffect(() => {
    if (onElementSizeChange) {
      onElementSizeChange(elementSize.width);
    }
  }, [elementSize.width, onElementSizeChange]);

  // 处理鼠标滚轮缩放
  const handleWheel = useCallback((e: WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      
      const delta = e.deltaY > 0 ? 0.9 : 1.1;
      const newScale = Math.max(0.1, Math.min(3, transform.scale * delta));
      
      // 由于变换顺序的改变，现在缩放会自动围绕中心进行
      setTransform(prev => ({
        ...prev,
        scale: newScale
      }));
    } else {
      // 正常滚动时进行画布平移
      e.preventDefault();
      setTransform(prev => ({
        ...prev,
        x: prev.x - e.deltaX,
        y: prev.y - e.deltaY
      }));
    }
  }, [transform]);

  // 处理鼠标拖拽
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button === 0 && (e.currentTarget === canvasRef.current)) {
      e.preventDefault();
      setIsDragging(true);
      setDragStart({ x: e.clientX - transform.x, y: e.clientY - transform.y });
    }
  }, [transform.x, transform.y]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging) {
      setTransform(prev => ({
        ...prev,
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      }));
    }
  }, [isDragging, dragStart]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setIsResizing(false);
  }, []);

  // 处理元素大小调整
  const handleResizeStart = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsResizing(true);
  }, []);

  const handleResizeMove = useCallback((e: MouseEvent) => {
    if (isResizing && canvasRef.current) {
      const canvasRect = canvasRef.current.getBoundingClientRect();
      
      // 计算鼠标在画布中的位置
      const mouseXInCanvas = e.clientX - canvasRect.left;
      
      // 计算画布中心点
      const canvasCenter = canvasRect.width / 2;
      
      // 转换为画布坐标系（考虑新的变换顺序：缩放在前，平移在后）
      const mouseXInCanvasCoords = ((mouseXInCanvas - canvasCenter) / transform.scale - transform.x / transform.scale);
      
      // 新宽度 = 鼠标位置相对于元素中心的距离 * 2
      const newWidth = Math.max(300, Math.min(1600, Math.abs(mouseXInCanvasCoords) * 2));
      
      setElementSize(prev => ({ ...prev, width: newWidth }));
    }
  }, [isResizing, transform.scale, transform.x]);

  // 键盘快捷键
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === '0' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      resetTransform();
    }
  }, []);

  // 重置变换
  const resetTransform = () => {
    setTransform({ x: 0, y: 0, scale: 1 });
  };

  // 缩放功能
  const zoomIn = () => {
    setTransform(prev => ({
      ...prev,
      scale: Math.min(3, prev.scale * 1.2)
    }));
  };

  const zoomOut = () => {
    setTransform(prev => ({
      ...prev,
      scale: Math.max(0.1, prev.scale / 1.2)
    }));
  };

  // 快速调节预览尺寸
  const setMobilePreview = () => {
    setElementSize({ width: 375 }); // iPhone 标准宽度
  };

  const setDesktopPreview = () => {
    setElementSize({ width: 1200 }); // 桌面标准宽度
  };

  // 事件监听器
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener('wheel', handleWheel, { passive: false });
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mousemove', handleResizeMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('keydown', handleKeyDown);

      return () => {
        canvas.removeEventListener('wheel', handleWheel);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mousemove', handleResizeMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [handleWheel, handleMouseMove, handleResizeMove, handleMouseUp, handleKeyDown]);

  // Memoize layers to prevent unnecessary recalculations
  const layers = useMemo(() => {
    if (!currentProject) return [];
    
    const projectLayers: LayerInfo[] = [
      {
        id: 'project-container',
        name: 'Project Container',
        type: 'container',
        children: [
          {
            id: 'project-header',
            name: 'Project Header',
            type: 'container',
            children: [
              { id: 'project-title', name: 'Project Title', type: 'text' },
              { id: 'project-description', name: 'Project Description', type: 'text' },
              { id: 'project-metadata', name: 'Project Metadata', type: 'container' }
            ]
          },
          {
            id: 'project-cards',
            name: 'Project Cards',
            type: 'container',
            children: [
              {
                id: 'ai-generation-card',
                name: 'AI Generation Card',
                type: 'card',
                children: [
                  { id: 'ai-card-header', name: 'AI Card Header', type: 'text' },
                  { id: 'ai-card-content', name: 'AI Card Content', type: 'container' }
                ]
              },
              {
                id: 'project-structure-card',
                name: 'Project Structure Card',
                type: 'card',
                children: [
                  { id: 'structure-header', name: 'Structure Header', type: 'text' },
                  { id: 'structure-details', name: 'Structure Details', type: 'container' }
                ]
              }
            ]
          }
        ]
      }
    ];

    // Add generated code layer if available
    if (generatedCode) {
      projectLayers[0].children?.push({
        id: 'generated-preview-card',
        name: 'Generated Preview Card',
        type: 'card',
        children: [
          { id: 'preview-header', name: 'Preview Header', type: 'text' },
          { id: 'preview-code', name: 'Preview Code', type: 'component' }
        ]
      });
    }

    // Add help card
    projectLayers[0].children?.push({
      id: 'canvas-help-card',
      name: 'Canvas Help Card',
      type: 'card',
      children: [
        { id: 'help-title', name: 'Help Title', type: 'text' },
        { id: 'help-content', name: 'Help Content', type: 'text' }
      ]
    });

    return projectLayers;
  }, [currentProject, generatedCode]);

  // Notify parent of layer changes only when layers actually change
  useEffect(() => {
    if (onLayersChange && layers.length > 0) {
      onLayersChange(layers);
    }
  }, [layers, onLayersChange]);

  // 内容渲染逻辑
  useEffect(() => {
    if (currentProject) {
      const ProjectRenderer = () => {
        return (
          <div 
            className="space-y-8 max-w-4xl"
            data-layer-id="project-container"
            style={{
              outline: selectedLayer === 'project-container' ? '2px solid #3b82f6' : 'none',
              outlineOffset: '2px'
            }}
            onClick={(e) => {
              e.stopPropagation();
              onLayerSelect?.('project-container');
            }}
          >
            {/* 项目标题 */}
            <div 
              className="text-center"
              data-layer-id="project-header"
              style={{
                outline: selectedLayer === 'project-header' ? '2px solid #3b82f6' : 'none',
                outlineOffset: '2px'
              }}
              onClick={(e) => {
                e.stopPropagation();
                onLayerSelect?.('project-header');
              }}
            >
              <h1 
                className="text-3xl font-bold mb-4"
                data-layer-id="project-title"
                style={{
                  outline: selectedLayer === 'project-title' ? '2px solid #3b82f6' : 'none',
                  outlineOffset: '2px'
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  onLayerSelect?.('project-title');
                }}
              >
                {currentProject.name}
              </h1>
              <p 
                className="text-lg text-muted-foreground mb-6"
                data-layer-id="project-description"
                style={{
                  outline: selectedLayer === 'project-description' ? '2px solid #3b82f6' : 'none',
                  outlineOffset: '2px'
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  onLayerSelect?.('project-description');
                }}
              >
                {currentProject.description}
              </p>
              <div 
                className="flex items-center justify-center gap-4 text-sm text-muted-foreground"
                data-layer-id="project-metadata"
                style={{
                  outline: selectedLayer === 'project-metadata' ? '2px solid #3b82f6' : 'none',
                  outlineOffset: '2px'
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  onLayerSelect?.('project-metadata');
                }}
              >
                <span className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  {currentProject.framework} project
                </span>
                <span>•</span>
                <span className="capitalize">{currentProject.status}</span>
                <span>•</span>
                <span>Created {new Date(currentProject.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            {/* 项目信息卡片 */}
            <div 
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
              data-layer-id="project-cards"
              style={{
                outline: selectedLayer === 'project-cards' ? '2px solid #3b82f6' : 'none',
                outlineOffset: '2px'
              }}
              onClick={(e) => {
                e.stopPropagation();
                onLayerSelect?.('project-cards');
              }}
            >
              <Card 
                className="p-6"
                data-layer-id="ai-generation-card"
                style={{
                  outline: selectedLayer === 'ai-generation-card' ? '2px solid #3b82f6' : 'none',
                  outlineOffset: '2px'
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  onLayerSelect?.('ai-generation-card');
                }}
              >
                <div className="space-y-4">
                  <div 
                    className="flex items-center justify-between"
                    data-layer-id="ai-card-header"
                    style={{
                      outline: selectedLayer === 'ai-card-header' ? '2px solid #3b82f6' : 'none',
                      outlineOffset: '2px'
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onLayerSelect?.('ai-card-header');
                    }}
                  >
                    <h3 className="font-semibold">AI Code Generation</h3>
                    <Sparkles className="h-5 w-5 text-blue-500" />
                  </div>
                  <div 
                    className="text-center py-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg"
                    data-layer-id="ai-card-content"
                    style={{
                      outline: selectedLayer === 'ai-card-content' ? '2px solid #3b82f6' : 'none',
                      outlineOffset: '2px'
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onLayerSelect?.('ai-card-content');
                    }}
                  >
                    <Sparkles className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                    <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Ready for AI Generation</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                      Use the AI input below to generate components for this project
                    </p>
                    <div className="text-xs text-gray-400 dark:text-gray-500">
                      Generated code will appear here
                    </div>
                  </div>
                </div>
              </Card>

              <Card 
                className="p-6"
                data-layer-id="project-structure-card"
                style={{
                  outline: selectedLayer === 'project-structure-card' ? '2px solid #3b82f6' : 'none',
                  outlineOffset: '2px'
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  onLayerSelect?.('project-structure-card');
                }}
              >
                <div className="space-y-4">
                  <h3 
                    className="font-semibold"
                    data-layer-id="structure-header"
                    style={{
                      outline: selectedLayer === 'structure-header' ? '2px solid #3b82f6' : 'none',
                      outlineOffset: '2px'
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onLayerSelect?.('structure-header');
                    }}
                  >
                    Project Structure
                  </h3>
                  <div 
                    className="space-y-3"
                    data-layer-id="structure-details"
                    style={{
                      outline: selectedLayer === 'structure-details' ? '2px solid #3b82f6' : 'none',
                      outlineOffset: '2px'
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onLayerSelect?.('structure-details');
                    }}
                  >
                    <div className="flex justify-between text-sm">
                      <span>Framework:</span>
                      <span className="capitalize font-medium">{currentProject.framework}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Status:</span>
                      <span className={`capitalize font-medium ${
                        currentProject.status === 'active' ? 'text-green-600' : 'text-yellow-600'
                      }`}>
                        {currentProject.status}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Last Updated:</span>
                      <span className="font-medium">
                        {new Date(currentProject.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Project Path:</span>
                      <span className="font-mono text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                        {currentProject.path.split('/').slice(-2).join('/')}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* 如果有生成的代码，显示预览 */}
            {generatedCode && (
              <Card 
                className="p-6"
                data-layer-id="generated-preview-card"
                style={{
                  outline: selectedLayer === 'generated-preview-card' ? '2px solid #3b82f6' : 'none',
                  outlineOffset: '2px'
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  onLayerSelect?.('generated-preview-card');
                }}
              >
                <div className="space-y-4">
                  <h3 
                    className="font-semibold"
                    data-layer-id="preview-header"
                    style={{
                      outline: selectedLayer === 'preview-header' ? '2px solid #3b82f6' : 'none',
                      outlineOffset: '2px'
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onLayerSelect?.('preview-header');
                    }}
                  >
                    Generated Component Preview
                  </h3>
                  <div 
                    className="bg-gray-900 dark:bg-gray-950 rounded-lg p-4"
                    data-layer-id="preview-code"
                    style={{
                      outline: selectedLayer === 'preview-code' ? '2px solid #3b82f6' : 'none',
                      outlineOffset: '2px'
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onLayerSelect?.('preview-code');
                    }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-white font-medium">Generated Code</h4>
                      <span className="text-xs text-gray-400 dark:text-gray-500">TypeScript React Component</span>
                    </div>
                    <pre className="text-green-400 dark:text-green-300 text-sm overflow-x-auto">
                      <code>{generatedCode.slice(0, 500)}...</code>
                    </pre>
                  </div>
                </div>
              </Card>
            )}

            {/* 画布帮助信息 */}
            <Card 
              className="p-6 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800"
              data-layer-id="canvas-help-card"
              style={{
                outline: selectedLayer === 'canvas-help-card' ? '2px solid #3b82f6' : 'none',
                outlineOffset: '2px'
              }}
              onClick={(e) => {
                e.stopPropagation();
                onLayerSelect?.('canvas-help-card');
              }}
            >
              <div className="space-y-2">
                <h4 
                  className="font-medium text-blue-900 dark:text-blue-100"
                  data-layer-id="help-title"
                  style={{
                    outline: selectedLayer === 'help-title' ? '2px solid #3b82f6' : 'none',
                    outlineOffset: '2px'
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onLayerSelect?.('help-title');
                  }}
                >
                  Canvas Controls
                </h4>
                <div 
                  className="text-sm text-blue-700 dark:text-blue-300 space-y-1"
                  data-layer-id="help-content"
                  style={{
                    outline: selectedLayer === 'help-content' ? '2px solid #3b82f6' : 'none',
                    outlineOffset: '2px'
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onLayerSelect?.('help-content');
                  }}
                >
                  <p>• Hold Ctrl/Cmd + Scroll to zoom in/out</p>
                  <p>• Click and drag to pan around</p>
                  <p>• Press Ctrl/Cmd + 0 to reset view</p>
                </div>
              </div>
            </Card>
          </div>
        );
      };

      setRenderComponent(<ProjectRenderer />);
    } else {
      const WelcomeRenderer = () => (
        <div className="text-center py-16 max-w-md">
          <Sparkles className="h-16 w-16 text-gray-400 dark:text-gray-500 mx-auto mb-6" />
          <h2 className="text-2xl font-bold mb-4">Welcome to Rapidux AI Generator</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Select a project from your dashboard or create a new one to start generating components with AI.
          </p>
          <Card className="p-6 text-left">
            <h3 className="font-semibold mb-4">Getting Started:</h3>
            <ol className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>1. Go back to your dashboard</li>
              <li>2. Create a new project or open an existing one</li>
              <li>3. Use AI to generate components</li>
              <li>4. Export your complete project</li>
            </ol>
          </Card>
        </div>
      );

      setRenderComponent(<WelcomeRenderer />);
    }
  }, [currentProject, generatedCode, selectedLayer]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-gray-50 dark:bg-gray-900">
      {/* 画布控制工具栏 */}
      <div className="absolute top-4 right-4 z-20 flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={zoomOut}
          className="bg-white dark:bg-gray-800 shadow-sm border-gray-200 dark:border-gray-700"
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={resetTransform}
          className="bg-white dark:bg-gray-800 shadow-sm px-3 border-gray-200 dark:border-gray-700"
        >
          {Math.round(transform.scale * 100)}%
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={zoomIn}
          className="bg-white dark:bg-gray-800 shadow-sm border-gray-200 dark:border-gray-700"
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={resetTransform}
          className="bg-white dark:bg-gray-800 shadow-sm border-gray-200 dark:border-gray-700"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>

      {/* 画布网格背景 */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(circle, ${isDarkMode ? '#374151' : '#e5e7eb'} 1px, transparent 1px)
          `,
          backgroundSize: `${20 * transform.scale}px ${20 * transform.scale}px`,
          backgroundPosition: `${transform.x}px ${transform.y}px`,
        }}
      />

      {/* 主画布区域 */}
      <div
        ref={canvasRef}
        className="absolute inset-0 z-0 cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        {/* 画布中心点 - 固定在画布视窗中心 */}
        <div
          className="absolute"
          style={{
            left: '50%',
            top: '50%',
            transform: `translate(-50%, -50%) scale(${transform.scale}) translate(${transform.x / transform.scale}px, ${transform.y / transform.scale}px)`,
            transformOrigin: 'center center',
          }}
        >
          {/* 内容容器 - 完全基于用户设置的宽度 */}
          <div 
            ref={contentRef}
            className="relative group"
            style={{ 
              width: `${elementSize.width}px`,
              minHeight: '600px', // 固定最小高度
            }}
          >
            {/* 主内容元素 */}
            <div 
              className="relative w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 pointer-events-auto select-none"
              style={{ 
                width: `${elementSize.width}px`, // 强制设置确切宽度
                userSelect: 'none',
                WebkitUserSelect: 'none',
                MozUserSelect: 'none',
                msUserSelect: 'none'
              }}
            >
              {/* 内容区域 */}
              <div 
                className="p-8 select-none"
                style={{
                  width: `${elementSize.width - 64}px`, // 减去padding (32px * 2)
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                  MozUserSelect: 'none',
                  msUserSelect: 'none',
                  pointerEvents: 'none'
                }}
                onDragStart={(e) => e.preventDefault()}
              >
                {renderComponent || (
                  <div className="text-center py-16">
                    <Sparkles className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">Loading project...</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* 右侧大小调整控制 */}
            <div 
              className="absolute top-0 w-4 cursor-ew-resize bg-transparent hover:bg-blue-500 hover:bg-opacity-30 transition-colors rounded-sm flex items-center justify-center group-hover:opacity-100 opacity-60"
              onMouseDown={handleResizeStart}
              style={{ 
                left: `${elementSize.width + 8}px`, // 位置基于确切宽度
                height: '100%', 
                minHeight: '200px' 
              }}
            >
              {/* 拖拽指示器 */}
              <div className="w-1.5 h-16 bg-gray-400 dark:bg-gray-500 rounded-full transition-opacity" />
              
              {/* 宽度显示提示 */}
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black dark:bg-white text-white dark:text-black text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {Math.round(elementSize.width)}px
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 状态指示器 */}
      <div className="absolute top-4 left-4 z-20">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm px-3 py-2 text-sm flex items-center gap-2">
          <Move className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          <span className="text-gray-600 dark:text-gray-300">
            {Math.round(transform.x)}, {Math.round(transform.y)} | {Math.round(transform.scale * 100)}% | {Math.round(elementSize.width)}px
          </span>
        </div>
      </div>
    </div>
  );
}
