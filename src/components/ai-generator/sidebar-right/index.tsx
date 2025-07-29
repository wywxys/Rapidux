import { ScrollArea } from '@/components/ui/scroll-area';
import { StylePanel } from './style-panel';
import { PropsPanel } from './props-panel';
import { PageSettingsPanel } from './page-settings';
import { RightPanelTab, LayoutType, FlexDirection } from '../types';

interface RightSidebarProps {
  selectedPage: string;
  selectedComponent: string;
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
  selectedComponent,
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
    <aside className="h-full bg-card/30 border-l flex flex-col">
      <ScrollArea className="h-full">
        <div className="p-4 space-y-4">
          {(selectedPage || selectedComponent || selectedLayer) && (
            <>
              {/* Element Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                  {selectedComponent 
                    ? selectedComponent 
                    : selectedLayer
                      ? selectedLayer 
                      : selectedPage 
                        ? 'Page Settings'
                        : 'Properties'}
                </h2>
                <div className="flex items-center space-x-2">
                  {/* Header action buttons will be added here */}
                </div>
              </div>

              {/* Content based on selection priority: Component/Layer > Page */}
              {(selectedComponent || selectedLayer) && (
                <>
                  {/* Style/Props Toggle for component/layer selections */}
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

                  {/* Style/Props Content */}
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

              {/* Page Settings - shown when ONLY page is selected (no component/layer) */}
              {selectedPage && !selectedComponent && !selectedLayer && (
                <PageSettingsPanel />
              )}
            </>
          )}

          {/* Default Properties Panel (when nothing is selected) */}
          {!selectedPage && !selectedComponent && !selectedLayer && (
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
