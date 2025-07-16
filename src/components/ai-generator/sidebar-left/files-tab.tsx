import { Plus, Home, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FilesTabProps {
  selectedPage: string;
  setSelectedPage: (page: string) => void;
  setSelectedLayer: (layer: string) => void;
}

export function FilesTab({
  selectedPage,
  setSelectedPage,
  setSelectedLayer,
}: FilesTabProps) {
  return (
    <>
      {/* Pages Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold">Pages</h2>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-1">
          <div 
            className={`flex items-center space-x-2 p-2 rounded-md cursor-pointer transition-colors ${
              selectedPage === 'home' 
                ? 'bg-primary text-primary-foreground' 
                : 'hover:bg-accent'
            }`}
            onClick={() => {
              setSelectedPage('home');
              setSelectedLayer('');
            }}
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
            onClick={() => {
              setSelectedPage('settings');
              setSelectedLayer('');
            }}
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
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
            <Plus className="h-4 w-4" />
          </Button>
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
            <div key={component} className="flex items-center space-x-2 p-2 rounded-md hover:bg-accent cursor-pointer">
              <div className="h-4 w-4 bg-muted rounded-sm flex items-center justify-center">
                <div className="h-2 w-2 bg-muted-foreground rounded-sm"></div>
              </div>
              <span className="text-sm">{component}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
