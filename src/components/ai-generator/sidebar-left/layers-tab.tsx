import { Minimize2, Home, ChevronDown, Square, ChevronRight, FileText, Container, Type, MousePointer, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useState, useCallback } from 'react';
import { LayerInfo } from '../types/layers';

interface LayersTabProps {
  selectedLayer: string;
  setSelectedLayer: (layer: string) => void;
  setSelectedPage: (page: string) => void;
  setSelectedComponent: (component: string) => void;
  selectedPage: string; // 添加选中页面的prop
  canvasLayers: LayerInfo[]; // 添加canvas层级数据
}

export function LayersTab({
  selectedLayer,
  setSelectedLayer,
  setSelectedPage,
  setSelectedComponent,
  selectedPage,
  canvasLayers,
}: LayersTabProps) {
  const [isPagesDropdownOpen, setIsPagesDropdownOpen] = useState(false);
  const [expandedLayers, setExpandedLayers] = useState<string[]>(['project-container']); // 管理展开的层
  
  const pages = [
    { name: 'Home', path: 'home', icon: Home },
    { name: '/settings', path: 'settings', icon: FileText }
  ];

  // 使用从Canvas传递过来的真实层级数据
  const currentLayers = canvasLayers.length > 0 ? canvasLayers : [];

  const handleCollapseAll = useCallback(() => {
    setExpandedLayers([]);
    setSelectedLayer('');
    console.log('Collapsing all layers...');
  }, [setSelectedLayer]);

  const handlePageSelect = useCallback((page: string) => {
    setSelectedPage(page);
    // Only clear layer selection if switching to a different page
    if (selectedPage !== page) {
      setSelectedLayer('');
    }
    setIsPagesDropdownOpen(false); // Close dropdown
    // Reset expansion state
    setExpandedLayers(canvasLayers.length > 0 ? [canvasLayers[0].id] : []);
  }, [selectedPage, setSelectedPage, setSelectedLayer, canvasLayers]);

  const toggleLayerExpansion = useCallback((layerId: string) => {
    setExpandedLayers(prev => 
      prev.includes(layerId) 
        ? prev.filter(id => id !== layerId)
        : [...prev, layerId]
    );
  }, []);

  const handleLayerSelect = useCallback((layerId: string) => {
    setSelectedLayer(layerId);
    setSelectedComponent(''); // Clear component selection but keep page selection
  }, [setSelectedLayer, setSelectedComponent]);

  const isChildOfSelected = (layer: LayerInfo): boolean => {
    if (!selectedLayer) return false;
    
    // 检查当前层是否是选中层的直接或间接子层
    const checkIfChildOfSelected = (layers: LayerInfo[], selectedId: string): boolean => {
      for (const l of layers) {
        if (l.id === selectedId && l.children) {
          // 递归检查所有子层
          const getAllChildIds = (children: LayerInfo[]): string[] => {
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

  const getLayerIcon = (type: LayerInfo['type']) => {
    switch (type) {
      case 'container':
        return <Container className="h-4 w-4" />;
      case 'component':
        return <Square className="h-4 w-4" />;
      case 'text':
        return <Type className="h-4 w-4" />;
      case 'button':
        return <MousePointer className="h-4 w-4" />;
      case 'card':
        return <CreditCard className="h-4 w-4" />;
      default:
        return <Square className="h-4 w-4" />;
    }
  };

  const renderLayer = (layer: LayerInfo, depth = 0) => {
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
          onClick={() => handleLayerSelect(layer.id)}
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
          {getLayerIcon(layer.type)}
          <span className="text-sm">{layer.name}</span>
        </div>
        
        {/* Render children if expanded */}
        {isExpanded && layer.children && (
          <div className="space-y-1">
            {layer.children.map((child: LayerInfo) => renderLayer(child, depth + 1))}
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
