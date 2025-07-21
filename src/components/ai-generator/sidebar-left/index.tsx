import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FilesTab } from './files-tab';
import { LayersTab } from './layers-tab';
import { ActiveTab } from '../types';

interface LeftSidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  selectedPage: string;
  setSelectedPage: (page: string) => void;
  selectedComponent: string;
  setSelectedComponent: (component: string) => void;
  selectedLayer: string;
  setSelectedLayer: (layer: string) => void;
}

export function LeftSidebar({
  activeTab,
  setActiveTab,
  selectedPage,
  setSelectedPage,
  selectedComponent,
  setSelectedComponent,
  selectedLayer,
  setSelectedLayer,
}: LeftSidebarProps) {
  return (
    <aside className="w-72 bg-card/30 border-r">
      <ScrollArea className="h-full">
        <div className="p-4 space-y-4">
          {/* Tabs */}
          <div className="flex bg-muted/50 rounded-lg p-1">
            <button 
              className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'files' 
                  ? 'bg-background shadow-sm' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => setActiveTab('files')}
            >
              Files
            </button>
            <button 
              className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'layers' 
                  ? 'bg-background shadow-sm' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => setActiveTab('layers')}
            >
              Layers
            </button>
          </div>
          
          {activeTab === 'files' ? (
            <FilesTab
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
              selectedComponent={selectedComponent}
              setSelectedComponent={setSelectedComponent}
              setSelectedLayer={setSelectedLayer}
            />
          ) : (
            <LayersTab
              selectedLayer={selectedLayer}
              setSelectedLayer={setSelectedLayer}
              setSelectedPage={setSelectedPage}
              setSelectedComponent={setSelectedComponent}
              selectedPage={selectedPage}
            />
          )}
        </div>
      </ScrollArea>
    </aside>
  );
}
