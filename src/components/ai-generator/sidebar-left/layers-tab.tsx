import { Minimize2, Home, ChevronDown, Square, ChevronRight, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useState } from 'react';

interface LayersTabProps {
  selectedLayer: string;
  setSelectedLayer: (layer: string) => void;
  setSelectedPage: (page: string) => void;
  setSelectedComponent: (component: string) => void;
  selectedPage: string; // 添加选中页面的prop
}

export function LayersTab({
  selectedLayer,
  setSelectedLayer,
  setSelectedPage,
  setSelectedComponent,
  selectedPage,
}: LayersTabProps) {
  const [isPagesDropdownOpen, setIsPagesDropdownOpen] = useState(false);
  const [expandedLayers, setExpandedLayers] = useState<string[]>(['div-main']); // 管理展开的层
  
  const pages = [
    { name: 'Home', path: 'home', icon: Home },
    { name: '/settings', path: 'settings', icon: FileText }
  ];

  // 不同页面的层结构
  const pageLayersMap: Record<string, any[]> = {
    home: [
      {
        id: 'div-main',
        name: 'div',
        type: 'container',
        children: [
          { id: 'header', name: 'Header', type: 'component' },
          { id: 'nav', name: 'Navigation', type: 'component' },
          {
            id: 'content',
            name: 'Content',
            type: 'container',
            children: [
              { id: 'sidebar', name: 'Sidebar', type: 'component' },
              { id: 'main-content', name: 'Main Content', type: 'component' }
            ]
          },
          { id: 'footer', name: 'Footer', type: 'component' }
        ]
      }
    ],
    settings: [
      {
        id: 'settings-container',
        name: 'Settings Container',
        type: 'container',
        children: [
          { id: 'settings-header', name: 'Settings Header', type: 'component' },
          {
            id: 'settings-form',
            name: 'Settings Form',
            type: 'container',
            children: [
              { id: 'form-section-1', name: 'General Settings', type: 'component' },
              { id: 'form-section-2', name: 'Privacy Settings', type: 'component' }
            ]
          }
        ]
      }
    ]
  };

  const currentLayers = pageLayersMap[selectedPage] || [];

  const handleCollapseAll = () => {
    setExpandedLayers([]);
    setSelectedLayer('');
    console.log('Collapsing all layers...');
  };

  const handlePageSelect = (page: string) => {
    setSelectedPage(page);
    // 只有在切换到不同页面时才清空层选择
    if (selectedPage !== page) {
      setSelectedLayer('');
    }
    setIsPagesDropdownOpen(false); // 收起下拉框
    // 重置展开状态
    setExpandedLayers(pageLayersMap[page]?.[0]?.id ? [pageLayersMap[page][0].id] : []);
  };

  const toggleLayerExpansion = (layerId: string) => {
    setExpandedLayers(prev => 
      prev.includes(layerId) 
        ? prev.filter(id => id !== layerId)
        : [...prev, layerId]
    );
  };

  const isChildOfSelected = (layer: any): boolean => {
    if (!selectedLayer) return false;
    
    // 检查当前层是否是选中层的直接或间接子层
    const checkIfChildOfSelected = (layers: any[], selectedId: string): boolean => {
      for (const l of layers) {
        if (l.id === selectedId && l.children) {
          // 递归检查所有子层
          const getAllChildIds = (children: any[]): string[] => {
            let ids: string[] = [];
            children.forEach(child => {
              ids.push(child.id);
              if (child.children) {
                ids = ids.concat(getAllChildIds(child.children));
              }
            });
            return ids;
          };
          
          const allChildIds = getAllChildIds(l.children);
          return allChildIds.includes(layer.id);
        }
        if (l.children && checkIfChildOfSelected(l.children, selectedId)) {
          return true;
        }
      }
      return false;
    };
    
    return checkIfChildOfSelected(currentLayers, selectedLayer);
  };

  const renderLayer = (layer: any, depth = 0) => {
    const isExpanded = expandedLayers.includes(layer.id);
    const isSelected = selectedLayer === layer.id;
    const isChild = isChildOfSelected(layer);
    
    // 确定应用的CSS类 - 只处理选中层和其子层
    const baseClasses = 'layer-item flex items-center space-x-2 p-2 cursor-pointer rounded-md';
    let additionalClasses = '';
    
    if (isSelected) {
      additionalClasses = ' layer-selected';
    } else if (isChild) {
      additionalClasses = ' layer-selected-child';
    }
    
    const combinedClasses = baseClasses + additionalClasses;
    
    return (
      <div key={layer.id} className="space-y-1">
        <div 
          className={combinedClasses}
          style={{ marginLeft: `${depth * 16}px` }}
          onClick={() => {
            setSelectedLayer(layer.id);
            setSelectedComponent(''); // 清空组件选择，但保留页面选择
          }}
        >
          {layer.children && layer.children.length > 0 ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleLayerExpansion(layer.id);
              }}
              className="p-0 h-4 w-4 bg-transparent border-none flex items-center justify-center hover:bg-white/10 rounded"
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>
          ) : (
            <div className="w-4 h-4" />
          )}
          <Square className="h-4 w-4" />
          <span className="text-sm">{layer.name}</span>
        </div>
        
        {/* Render children if expanded */}
        {isExpanded && layer.children && (
          <div className="space-y-1">
            {layer.children.map((child: any) => renderLayer(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Pages Dropdown */}
      <div className="space-y-1">
        <div 
          className="flex items-center justify-between p-2 rounded-md bg-muted/50 cursor-pointer hover:bg-muted/70 transition-colors"
          onClick={() => setIsPagesDropdownOpen(!isPagesDropdownOpen)}
        >
          <div className="flex items-center space-x-2">
            <Home className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Pages</span>
          </div>
          {isPagesDropdownOpen ? (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
        
        {/* Pages List */}
        {isPagesDropdownOpen && (
          <div className="ml-4 space-y-1">
            {pages.map((page) => {
              const IconComponent = page.icon;
              return (
                <div 
                  key={page.path}
                  className="flex items-center space-x-2 p-2 rounded-md cursor-pointer hover:bg-accent transition-colors"
                  onClick={() => handlePageSelect(page.path)}
                >
                  <IconComponent className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{page.name}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Layers Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold">Layers</h2>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 w-6 p-0"
                onClick={handleCollapseAll}
              >
                <Minimize2 className="h-3 w-3" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Collapse all layers</p>
            </TooltipContent>
          </Tooltip>
        </div>
        
        <div className="space-y-1">
          {/* Render layers based on selected page */}
          {currentLayers.length > 0 ? (
            currentLayers.map((layer) => renderLayer(layer))
          ) : (
            <div className="text-sm text-muted-foreground p-2">
              {selectedPage ? 'No layers available for this page' : 'Select a page to view layers'}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
