import { Copy, Home, ChevronDown, Square, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LayersTabProps {
  selectedLayer: string;
  setSelectedLayer: (layer: string) => void;
  setSelectedPage: (page: string) => void;
}

export function LayersTab({
  selectedLayer,
  setSelectedLayer,
  setSelectedPage,
}: LayersTabProps) {
  return (
    <>
      {/* Home Dropdown */}
      <div className="space-y-1">
        <div className="flex items-center justify-between p-2 rounded-md bg-muted/50 cursor-pointer">
          <div className="flex items-center space-x-2">
            <Home className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Home</span>
          </div>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>

      {/* Layers Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold">Layers</h2>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="space-y-1">
          {/* Main div - expanded */}
          <div className={`rounded-md ${selectedLayer === 'div-main' ? 'layer-selected' : ''}`}>
            <div 
              className={`flex items-center space-x-2 p-2 cursor-pointer layer-item ${
                selectedLayer === 'div-main' ? 'layer-selected' : ''
              }`}
              onClick={() => {
                setSelectedLayer('div-main');
                setSelectedPage('');
              }}
            >
              <ChevronDown className="h-4 w-4" />
              <Square className="h-4 w-4" />
              <span className="text-sm">div</span>
            </div>
            
            {/* Nested items */}
            <div className="ml-4 space-y-1 pb-2">
              <div 
                className={`flex items-center space-x-2 p-2 rounded-md cursor-pointer layer-item ${
                  selectedLayer === 'sidebar' ? 'layer-selected' : 
                  selectedLayer === 'div-main' ? 'layer-selected-child' : ''
                }`}
                onClick={() => {
                  setSelectedLayer('sidebar');
                  setSelectedPage('');
                }}
              >
                <div className="h-4 w-4 bg-secondary rounded-sm flex items-center justify-center">
                  <div className="h-2 w-2 bg-secondary-foreground rounded-sm"></div>
                </div>
                <span className="text-sm">Sidebar</span>
              </div>
              
              <div className={`rounded-md ${selectedLayer === 'div-content' ? 'layer-selected' : selectedLayer === 'div-main' ? 'layer-selected-child' : ''}`}>
                <div 
                  className={`flex items-center space-x-2 p-2 cursor-pointer layer-item ${
                    selectedLayer === 'div-content' ? 'layer-selected' : 
                    selectedLayer === 'div-main' ? 'layer-selected-child' : ''
                  }`}
                  onClick={() => {
                    setSelectedLayer('div-content');
                    setSelectedPage('');
                  }}
                >
                  <ChevronRight className="h-4 w-4" />
                  <Square className="h-4 w-4" />
                  <span className="text-sm">div</span>
                </div>
                
                {/* Nested content items */}
                <div className="ml-4 space-y-1 pb-2">
                  <div 
                    className={`flex items-center space-x-2 p-2 rounded-md cursor-pointer layer-item ${
                      selectedLayer === 'header' ? 'layer-selected' : 
                      selectedLayer === 'div-content' ? 'layer-selected-child' : ''
                    }`}
                    onClick={() => {
                      setSelectedLayer('header');
                      setSelectedPage('');
                    }}
                  >
                    <div className="h-4 w-4 bg-secondary rounded-sm flex items-center justify-center">
                      <div className="h-2 w-2 bg-secondary-foreground rounded-sm"></div>
                    </div>
                    <span className="text-sm">Header</span>
                  </div>
                  
                  <div 
                    className={`flex items-center space-x-2 p-2 rounded-md cursor-pointer layer-item ${
                      selectedLayer === 'main' ? 'layer-selected' : 
                      selectedLayer === 'div-content' ? 'layer-selected-child' : ''
                    }`}
                    onClick={() => {
                      setSelectedLayer('main');
                      setSelectedPage('');
                    }}
                  >
                    <div className="h-4 w-4 bg-secondary rounded-sm flex items-center justify-center">
                      <div className="h-2 w-2 bg-secondary-foreground rounded-sm"></div>
                    </div>
                    <span className="text-sm">Main</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
