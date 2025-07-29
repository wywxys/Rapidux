'use client';

import { useEffect, useState } from 'react';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Header } from './header';
import { LeftSidebar } from './sidebar-left';
import { Canvas } from './canvas';
import { RightSidebar } from './sidebar-right';
import { FloatingToolbar } from './floating-toolbar';
import { AIInput } from './floating-toolbar/ai-input';
import { CodeViewerDialog } from './dialogs/code-viewer-dialog';
import { useAIGenerator } from './hooks/use-ai-generator';
import { Project } from '@/types/real-project';
import { LayerInfo } from './types/layers';
import './styles.css';

export function AIComponentGenerator() {
  const state = useAIGenerator();
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [leftSidebarWidth, setLeftSidebarWidth] = useState(300);
  const [rightSidebarWidth, setRightSidebarWidth] = useState(320);
  const [isResizingLeft, setIsResizingLeft] = useState(false);
  const [isResizingRight, setIsResizingRight] = useState(false);
  const [canvasElementWidth, setCanvasElementWidth] = useState(800);
  const [canvasLayers, setCanvasLayers] = useState<LayerInfo[]>([]);

  // 处理层级选择
  const handleLayerSelect = (layerId: string) => {
    state.setSelectedLayer(layerId);
  };

  // 处理层级变化
  const handleLayersChange = (layers: LayerInfo[]) => {
    setCanvasLayers(layers);
  };

  // 从URL参数获取项目ID并加载项目
  useEffect(() => {
    const loadProject = async () => {
      try {
        // 从URL参数获取项目ID
        const urlParams = new URLSearchParams(window.location.search);
        const projectId = urlParams.get('project');
        
        if (projectId) {
          const response = await fetch(`/api/projects/${projectId}`);
          if (response.ok) {
            const data = await response.json();
            setCurrentProject(data.project);
          } else {
            console.error('Failed to load project');
          }
        }
      } catch (error) {
        console.error('Error loading project:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, []);

  // 处理侧边栏大小调整
  const handleLeftResizeStart = () => setIsResizingLeft(true);
  const handleRightResizeStart = () => setIsResizingRight(true);

  const handleMouseMove = (event: MouseEvent) => {
    if (isResizingLeft) {
      const newWidth = Math.max(200, Math.min(500, event.clientX));
      setLeftSidebarWidth(newWidth);
    }
    if (isResizingRight) {
      const newWidth = Math.max(250, Math.min(600, window.innerWidth - event.clientX));
      setRightSidebarWidth(newWidth);
    }
  };

  const handleMouseUp = () => {
    setIsResizingLeft(false);
    setIsResizingRight(false);
  };

  useEffect(() => {
    if (isResizingLeft || isResizingRight) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isResizingLeft, isResizingRight]);

  // 添加快捷键监听
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // 检测Mac系统
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const modifierKey = isMac ? event.metaKey : event.ctrlKey;
      
      // Ctrl/Cmd+S - 保存
      if (modifierKey && event.key === 's') {
        event.preventDefault();
        state.saveCanvasChanges();
      }
      // Ctrl/Cmd+Z - 撤销
      else if (modifierKey && event.key === 'z') {
        event.preventDefault();
        state.undoAction();
      }
      // Ctrl/Cmd+Y - 重做
      else if (modifierKey && event.key === 'y') {
        event.preventDefault();
        state.redoAction();
      }
      // F5 - 刷新
      else if (event.key === 'F5') {
        event.preventDefault();
        state.refreshPage();
      }
      // Ctrl/Cmd+I - 打开/关闭对话
      else if (modifierKey && event.key === 'i') {
        event.preventDefault();
        state.openConversation();
      }
      // Ctrl/Cmd+/ - 切换快捷键提示
      else if (modifierKey && event.key === '/') {
        event.preventDefault();
        state.setShowShortcutsDialog(!state.showShortcutsDialog);
      }
      // Ctrl/Cmd+, - 切换设置页面
      else if (modifierKey && event.key === ',') {
        event.preventDefault();
        state.setShowSettingsSheet(!state.showSettingsSheet);
      }
      // Esc - 关闭对话框
      else if (event.key === 'Escape') {
        state.setShowShortcutsDialog(false);
        state.setShowSettingsSheet(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [state]);

  // 处理项目导出
  const handleExportProject = (project: Project) => {
    console.log('Export project called:', project.name);
  };

  return (
    <TooltipProvider>
      <div className="h-screen bg-background text-foreground flex flex-col relative">
        {/* Header */}
        <Header
          showSettingsSheet={state.showSettingsSheet}
          setShowSettingsSheet={state.setShowSettingsSheet}
          showShortcutsDialog={state.showShortcutsDialog}
          setShowShortcutsDialog={state.setShowShortcutsDialog}
          autoSaveCode={state.autoSaveCode}
          setAutoSaveCode={state.setAutoSaveCode}
          showLineNumbers={state.showLineNumbers}
          setShowLineNumbers={state.setShowLineNumbers}
          enableCodeFormatting={state.enableCodeFormatting}
          setEnableCodeFormatting={state.setEnableCodeFormatting}
          includeImports={state.includeImports}
          setIncludeImports={state.setIncludeImports}
          enableAutoComplete={state.enableAutoComplete}
          setEnableAutoComplete={state.setEnableAutoComplete}
          enableTypeChecking={state.enableTypeChecking}
          setEnableTypeChecking={state.setEnableTypeChecking}
          enablePrettierOnSave={state.enablePrettierOnSave}
          setEnablePrettierOnSave={state.setEnablePrettierOnSave}
          saveSettings={state.saveSettings}
          currentProject={currentProject || undefined}
          onExportProject={handleExportProject}
        />

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden relative">
          {/* Left Sidebar - Project Structure */}
          <div 
            className="flex-shrink-0 border-r border-border bg-background"
            style={{ width: `${leftSidebarWidth}px` }}
          >
            <LeftSidebar
              activeTab={state.activeTab}
              setActiveTab={state.setActiveTab}
              selectedPage={state.selectedPage}
              setSelectedPage={state.setSelectedPage}
              selectedComponent={state.selectedComponent}
              setSelectedComponent={state.setSelectedComponent}
              selectedLayer={state.selectedLayer}
              setSelectedLayer={state.setSelectedLayer}
              canvasLayers={canvasLayers}
            />
          </div>

          {/* Left Resize Handle */}
          <div
            className="w-1 bg-border hover:bg-blue-500 cursor-ew-resize flex-shrink-0 transition-colors z-10"
            onMouseDown={handleLeftResizeStart}
          />

          {/* Center Canvas */}
          <div className="flex-1 relative z-0">
            <Canvas
              viewMode={state.viewMode}
              generatedCode={state.generatedCode}
              currentProject={currentProject || undefined}
              onElementSizeChange={setCanvasElementWidth}
              selectedLayer={state.selectedLayer}
              onLayerSelect={handleLayerSelect}
              onLayersChange={handleLayersChange}
            />
          </div>

          {/* Right Resize Handle */}
          <div
            className="w-1 bg-border hover:bg-blue-500 cursor-ew-resize flex-shrink-0 transition-colors z-10"
            onMouseDown={handleRightResizeStart}
          />

          {/* Right Sidebar - Properties */}
          <div 
            className="flex-shrink-0 border-l border-border bg-background"
            style={{ width: `${rightSidebarWidth}px` }}
          >
            <RightSidebar
              selectedPage={state.selectedPage}
              selectedComponent={state.selectedComponent}
              selectedLayer={state.selectedLayer}
              rightPanelTab={state.rightPanelTab}
              setRightPanelTab={state.setRightPanelTab}
              layoutType={state.layoutType}
              setLayoutType={state.setLayoutType}
              flexDirection={state.flexDirection}
              setFlexDirection={state.setFlexDirection}
              fontSize={state.fontSize}
              setFontSize={state.setFontSize}
              borderRadius={state.borderRadius}
              setBorderRadius={state.setBorderRadius}
            />
          </div>
        </div>

        {/* Floating AI Input */}
        <AIInput
          showTopBar={state.showTopBar}
          prompt={state.prompt}
          setPrompt={state.setPrompt}
          aiMode={state.aiMode}
          setAiMode={state.setAiMode}
          isGenerating={state.isGenerating}
          handleGenerate={state.handleGenerate}
        />

        {/* Bottom Tool Bar */}
        <FloatingToolbar
          viewMode={state.viewMode}
          setViewMode={state.setViewMode}
          showTopBar={state.showTopBar}
          setShowTopBar={state.setShowTopBar}
          undoAction={state.undoAction}
          redoAction={state.redoAction}
          refreshPage={state.refreshPage}
        />

        {/* Code Viewer Dialog */}
        <CodeViewerDialog
          open={state.showCodeDialog}
          onOpenChange={state.setShowCodeDialog}
          title="Generated Code"
          code={state.generatedCode}
          language="jsx"
          description="View and copy the generated code for your component"
          showIcon={true}
        />

        {/* Remove duplicate Toaster here */}
      </div>
    </TooltipProvider>
  );
}
