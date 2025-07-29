import { Plus, Home, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useCallback } from 'react';

interface FilesTabProps {
  selectedPage: string;
  setSelectedPage: (page: string) => void;
  selectedComponent: string;
  setSelectedComponent: (component: string) => void;
  setSelectedLayer: (layer: string) => void;
}

export function FilesTab({
  selectedPage,
  setSelectedPage,
  selectedComponent,
  setSelectedComponent,
  setSelectedLayer,
}: FilesTabProps) {
  // Use useCallback to prevent creating new functions on every render
  const handlePageSelect = useCallback((page: string) => {
    // Batch state updates using React's automatic batching
    setSelectedPage(page);
    setSelectedComponent('');
    setSelectedLayer('');
  }, [setSelectedPage, setSelectedComponent, setSelectedLayer]);

  const handleComponentSelect = useCallback((component: string) => {
    // Batch state updates using React's automatic batching
    setSelectedComponent(component);
    setSelectedPage('');
    setSelectedLayer('');
  }, [setSelectedComponent, setSelectedPage, setSelectedLayer]);
  return (
    <>
      {/* Pages Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold">Pages</h2>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 w-6 p-0"
                onClick={(e) => {
                  e.stopPropagation();
                  // Add page functionality here
                }}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add page</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <div className="space-y-1">
          <div 
            className={`flex items-center space-x-2 p-2 rounded-md cursor-pointer transition-colors ${
              selectedPage === 'home' 
                ? 'bg-primary text-primary-foreground' 
                : 'hover:bg-accent'
            }`}
            onClick={() => handlePageSelect('home')}
          >
            <Home className={`h-4 w-4 ${selectedPage === 'home' ? '' : 'text-muted-foreground'}`} />
            <span className="text-sm">Home</span>
          </div>
          <div 
            className={`flex items-center space-x-2 p-2 rounded-md cursor-pointer transition-colors ${
              selectedPage === 'settings' 
                ? 'bg-primary text-primary-foreground' 
                : 'hover:bg-accent'
            }`}
            onClick={() => handlePageSelect('settings')}
          >
            <FileText className={`h-4 w-4 ${selectedPage === 'settings' ? '' : 'text-muted-foreground'}`} />
            <span className="text-sm">/settings</span>
          </div>
        </div>
      </div>
      
      {/* Components Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold">Components</h2>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 w-6 p-0"
                onClick={(e) => {
                  e.stopPropagation();
                  // Add component functionality here
                }}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add component</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <div className="space-y-1">
          {[
            'PaymentsTableRow',
            'MetricCard',
            'Sidebar',
            'Header',
            'NavItem',
            'MobileNavItem'
          ].map((component) => (
            <div 
              key={component} 
              className={`flex items-center space-x-2 p-2 rounded-md cursor-pointer transition-colors ${
                selectedComponent === component
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-accent'
              }`}
              onClick={() => handleComponentSelect(component)}
            >
              <div className={`h-4 w-4 rounded-sm flex items-center justify-center ${
                selectedComponent === component 
                  ? 'bg-primary-foreground/20' 
                  : 'bg-muted'
              }`}>
                <div className={`h-2 w-2 rounded-sm ${
                  selectedComponent === component 
                    ? 'bg-primary-foreground' 
                    : 'bg-muted-foreground'
                }`}></div>
              </div>
              <span className="text-sm">{component}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
