// 组件数据类型
export interface ComponentData {
  name: string;
  code: string;
  lastModified: string;
}

// 项目文件类型
export interface ProjectFile {
  name: string;
  active: boolean;
}

// AI模式类型
export type AiMode = 'edit' | 'generate';

// 视图模式类型
export type ViewMode = 'desktop' | 'mobile';

// 活动选项卡类型
export type ActiveTab = 'files' | 'layers';

// 右侧面板选项卡类型
export type RightPanelTab = 'style' | 'props';

// 布局类型
export type LayoutType = 'flex' | 'grid';

// Flex方向类型
export type FlexDirection = 'row' | 'column';

// 设置状态类型
export interface SettingsState {
  autoSaveCode: boolean;
  showLineNumbers: boolean;
  enableCodeFormatting: boolean;
  includeImports: boolean;
  enableAutoComplete: boolean;
  enableTypeChecking: boolean;
  enablePrettierOnSave: boolean;
}

// 主要状态类型
export interface AIGeneratorState {
  prompt: string;
  generatedCode: string;
  isGenerating: boolean;
  viewMode: ViewMode;
  fontSize: string;
  borderRadius: number[];
  showTopBar: boolean;
  activeTab: ActiveTab;
  selectedLayer: string;
  aiMode: AiMode;
  selectedPage: string;
  selectedComponent: string;  // 新增：选中的组件
  rightPanelTab: RightPanelTab;
  layoutType: LayoutType;
  flexDirection: FlexDirection;
  showCodeDialog: boolean;
  showSettingsSheet: boolean;
  showShortcutsDialog: boolean;
  components: ComponentData[];
  
  // 设置相关状态
  autoSaveCode: boolean;
  showLineNumbers: boolean;
  enableCodeFormatting: boolean;
  includeImports: boolean;
  enableAutoComplete: boolean;
  enableTypeChecking: boolean;
  enablePrettierOnSave: boolean;
  previousSettings: SettingsState;
}

// 操作类型
export interface AIGeneratorActions {
  setPrompt: (prompt: string) => void;
  setGeneratedCode: (code: string) => void;
  setIsGenerating: (isGenerating: boolean) => void;
  setViewMode: (mode: ViewMode) => void;
  setFontSize: (size: string) => void;
  setBorderRadius: (radius: number[]) => void;
  setShowTopBar: (show: boolean) => void;
  setActiveTab: (tab: ActiveTab) => void;
  setSelectedLayer: (layer: string) => void;
  setAiMode: (mode: AiMode) => void;
  setSelectedPage: (page: string) => void;
  setSelectedComponent: (component: string) => void;  // 新增：设置选中的组件
  setRightPanelTab: (tab: RightPanelTab) => void;
  setLayoutType: (type: LayoutType) => void;
  setFlexDirection: (direction: FlexDirection) => void;
  setShowCodeDialog: (show: boolean) => void;
  setShowSettingsSheet: (show: boolean) => void;
  setShowShortcutsDialog: (show: boolean) => void;
  setComponents: (components: ComponentData[]) => void;
  
  // 设置相关操作
  setAutoSaveCode: (auto: boolean) => void;
  setShowLineNumbers: (show: boolean) => void;
  setEnableCodeFormatting: (enable: boolean) => void;
  setIncludeImports: (include: boolean) => void;
  setEnableAutoComplete: (enable: boolean) => void;
  setEnableTypeChecking: (enable: boolean) => void;
  setEnablePrettierOnSave: (enable: boolean) => void;
  setPreviousSettings: (settings: SettingsState) => void;
  
  // 复杂操作
  handleGenerate: () => Promise<void>;
  copyCode: () => void;
  saveSettings: () => void;
  saveCanvasChanges: () => void;
  undoAction: () => void;
  redoAction: () => void;
  refreshPage: () => void;
  openConversation: () => void;
  undoSettings: () => void;
}

// 颜色调色板
export const COLOR_PALETTE = [
  'bg-blue-500',
  'bg-purple-500',
  'bg-green-500',
  'bg-red-500',
  'bg-yellow-500',
  'bg-pink-500',
];

// 项目文件默认数据
export const DEFAULT_PROJECT_FILES: ProjectFile[] = [
  { name: 'App.tsx', active: true },
  { name: 'UserCard.tsx', active: false },
  { name: 'Button.tsx', active: false },
  { name: 'Input.tsx', active: false },
];

// 默认组件数据
export const DEFAULT_COMPONENTS: ComponentData[] = [
  { name: 'UserCard', code: '', lastModified: '2h ago' },
  { name: 'Button', code: '', lastModified: '5h ago' },
  { name: 'Input', code: '', lastModified: '1d ago' },
];
