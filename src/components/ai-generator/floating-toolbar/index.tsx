import { Undo2, Redo2, Laptop, Smartphone, RefreshCw, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ViewMode } from '../types';

interface FloatingToolbarProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  showTopBar: boolean;
  setShowTopBar: (show: boolean) => void;
  undoAction: () => void;
  redoAction: () => void;
  refreshPage: () => void;
}

export function FloatingToolbar({
  viewMode,
  setViewMode,
  showTopBar,
  setShowTopBar,
  undoAction,
  redoAction,
  refreshPage,
}: FloatingToolbarProps) {
  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="flex items-center bg-card/95 backdrop-blur-md shadow-lg border rounded-lg px-2 py-1.5 gap-1">
        {/* Undo Button */}
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-6 w-6 p-0"
          onClick={undoAction}
        >
          <Undo2 className="h-3.5 w-3.5" />
        </Button>
        
        {/* Redo Button */}
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-6 w-6 p-0"
          onClick={redoAction}
        >
          <Redo2 className="h-3.5 w-3.5" />
        </Button>
        
        {/* Separator */}
        <div className="w-px h-3 bg-border mx-1"></div>
        
        {/* Desktop View Button */}
        <Button 
          variant={viewMode === 'desktop' ? 'default' : 'ghost'} 
          size="sm" 
          className="h-6 w-6 p-0"
          onClick={() => setViewMode('desktop')}
        >
          <Laptop className="h-3.5 w-3.5" />
        </Button>
        
        {/* Mobile View Button */}
        <Button 
          variant={viewMode === 'mobile' ? 'default' : 'ghost'} 
          size="sm" 
          className="h-6 w-6 p-0"
          onClick={() => setViewMode('mobile')}
        >
          <Smartphone className="h-3.5 w-3.5" />
        </Button>
        
        {/* Separator */}
        <div className="w-px h-3 bg-border mx-1"></div>
        
        {/* Refresh Button */}
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-6 w-6 p-0"
          onClick={refreshPage}
        >
          <RefreshCw className="h-3.5 w-3.5" />
        </Button>
        
        {/* Separator */}
        <div className="w-px h-3 bg-border mx-1"></div>
        
        {/* Toggle AI Input Bar Button */}
        <Button 
          variant={showTopBar ? 'default' : 'ghost'} 
          size="sm" 
          className="h-6 w-6 p-0"
          onClick={() => setShowTopBar(!showTopBar)}
        >
          <Bot className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}
