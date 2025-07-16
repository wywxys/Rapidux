import { ScrollArea } from '@/components/ui/scroll-area';
import { StylePanel } from './style-panel';
import { PropsPanel } from './props-panel';
import { PageSettingsPanel } from './page-settings';
import { RightPanelTab, LayoutType, FlexDirection } from '../types';

interface RightSidebarProps {
  selectedPage: string;
  selectedLayer: string;
  rightPanelTab: RightPanelTab;
  setRightPanelTab: (tab: RightPanelTab) => void;
  layoutType: LayoutType;
  setLayoutType: (type: LayoutType) => void;
  flexDirection: FlexDirection;
  setFlexDirection: (direction: FlexDirection) => void;
  fontSize: string;
  setFontSize: (size: string) => void;
  borderRadius: number[];
  setBorderRadius: (radius: number[]) => void;
}

export function RightSidebar({
  selectedPage,
  selectedLayer,
  rightPanelTab,
  setRightPanelTab,
  layoutType,
  setLayoutType,
  flexDirection,
  setFlexDirection,
  fontSize,
  setFontSize,
  borderRadius,
  setBorderRadius,
}: RightSidebarProps) {
  return (
    <aside className="w-80 bg-card/30 border-l">
      <ScrollArea className="h-full">
        <div className="p-4 space-y-4">
          {(selectedPage === 'home' || selectedLayer || selectedPage === 'settings') && (
            <>
              {/* Element Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                  {selectedPage === 'home' ? 'Home' : selectedPage === 'settings' ? 'Page Settings' : selectedLayer}
                </h2>
                <div className="flex items-center space-x-2">
                  {/* Header action buttons will be added here */}
                </div>
              </div>

              {/* Content based on selection */}
              {selectedPage === 'settings' && (
                <PageSettingsPanel />
              )}

              {/* Style/Props Toggle for other selections */}
              {selectedPage !== 'settings' && (
                <>
                  {/* Style/Props Toggle */}
                  <div className="flex bg-muted/50 rounded-lg p-1">
                    <button 
                      className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        rightPanelTab === 'style' 
                          ? 'bg-background shadow-sm' 
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                      onClick={() => setRightPanelTab('style')}
                    >
                      Style
                    </button>
                    <button 
                      className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        rightPanelTab === 'props' 
                          ? 'bg-background shadow-sm' 
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                      onClick={() => setRightPanelTab('props')}
                    >
                      Props
                    </button>
                  </div>
                </>
              )}
            </>
          )}

          {/* Regular Style/Props content */}
          {(selectedPage === 'home' || selectedLayer) && (
            <>
              {rightPanelTab === 'style' && (
                <StylePanel
                  layoutType={layoutType}
                  setLayoutType={setLayoutType}
                  flexDirection={flexDirection}
                  setFlexDirection={setFlexDirection}
                  fontSize={fontSize}
                  setFontSize={setFontSize}
                  borderRadius={borderRadius}
                  setBorderRadius={setBorderRadius}
                />
              )}

              {rightPanelTab === 'props' && (
                <PropsPanel />
              )}
            </>
          )}

          {/* Default Properties Panel (when nothing is selected) */}
          {!selectedPage && !selectedLayer && (
            <StylePanel
              layoutType={layoutType}
              setLayoutType={setLayoutType}
              flexDirection={flexDirection}
              setFlexDirection={setFlexDirection}
              fontSize={fontSize}
              setFontSize={setFontSize}
              borderRadius={borderRadius}
              setBorderRadius={setBorderRadius}
            />
          )}
        </div>
      </ScrollArea>
    </aside>
  );
}
