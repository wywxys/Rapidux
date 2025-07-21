'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { 
  AIGeneratorState, 
  AIGeneratorActions, 
  SettingsState,
  DEFAULT_COMPONENTS 
} from '../types';

export function useAIGenerator(): AIGeneratorState & AIGeneratorActions {
  // 基础状态
  const [prompt, setPrompt] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [fontSize, setFontSize] = useState('16px');
  const [borderRadius, setBorderRadius] = useState([8]);
  const [showTopBar, setShowTopBar] = useState(true);
  const [activeTab, setActiveTab] = useState<'files' | 'layers'>('files');
  const [selectedLayer, setSelectedLayer] = useState<string>(''); // 初始为空，让page优先显示
  const [aiMode, setAiMode] = useState<'edit' | 'generate'>('edit');
  const [selectedPage, setSelectedPage] = useState<string>('home'); // 默认选择home页面
  const [selectedComponent, setSelectedComponent] = useState<string>('');
  const [rightPanelTab, setRightPanelTab] = useState<'style' | 'props'>('style');
  const [layoutType, setLayoutType] = useState<'flex' | 'grid'>('flex');
  const [flexDirection, setFlexDirection] = useState<'row' | 'column'>('row');
  const [showCodeDialog, setShowCodeDialog] = useState(false);
  const [showSettingsSheet, setShowSettingsSheet] = useState(false);
  const [showShortcutsDialog, setShowShortcutsDialog] = useState(false);
  const [components, setComponents] = useState(DEFAULT_COMPONENTS);
  
  // 设置状态
  const [autoSaveCode, setAutoSaveCode] = useState(true);
  const [showLineNumbers, setShowLineNumbers] = useState(false);
  const [enableCodeFormatting, setEnableCodeFormatting] = useState(true);
  const [includeImports, setIncludeImports] = useState(true);
  const [enableAutoComplete, setEnableAutoComplete] = useState(true);
  const [enableTypeChecking, setEnableTypeChecking] = useState(true);
  const [enablePrettierOnSave, setEnablePrettierOnSave] = useState(false);
  
  // 前一个设置状态用于撤销
  const [previousSettings, setPreviousSettings] = useState<SettingsState>({
    autoSaveCode: true,
    showLineNumbers: false,
    enableCodeFormatting: true,
    includeImports: true,
    enableAutoComplete: true,
    enableTypeChecking: true,
    enablePrettierOnSave: false
  });

  // 处理生成代码
  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    
    // 模拟AI生成代码的过程
    setTimeout(() => {
      const mockCode = `function UserCard({ name, email, avatar }) {
  return (
    <div className="max-w-sm mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
      <div className="p-6">
        <div className="flex items-center space-x-4">
          <img className="h-12 w-12 rounded-full object-cover" src={avatar} alt={name} />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
            <p className="text-gray-600">{email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}`;
      setGeneratedCode(mockCode);
      setIsGenerating(false);
    }, 2000);
  };

  // 复制代码
  const copyCode = () => {
    const codeToCopy = generatedCode || `// Generated code will appear here after you create a component
// Click the "Generate" button to create your first component

function SampleComponent() {
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-2">Sample Component</h2>
      <p className="text-gray-600">This is a sample component.</p>
    </div>
  );
}`;
    navigator.clipboard.writeText(codeToCopy);
  };

  // 保存设置
  const saveSettings = () => {
    // 保存当前设置作为之前的状态
    setPreviousSettings({
      autoSaveCode,
      showLineNumbers,
      enableCodeFormatting,
      includeImports,
      enableAutoComplete,
      enableTypeChecking,
      enablePrettierOnSave
    });
    
    // 先关闭设置面板
    setShowSettingsSheet(false);
    
    // 显示成功提示，带有撤销选项
    setTimeout(() => {
      toast.success("Settings saved successfully", {
        description: "Your preferences have been updated",
        action: {
          label: "Undo",
          onClick: () => undoSettings(),
        },
      });
    }, 200);
  };

  // 撤销设置
  const undoSettings = () => {
    // 恢复之前的设置
    setAutoSaveCode(previousSettings.autoSaveCode);
    setShowLineNumbers(previousSettings.showLineNumbers);
    setEnableCodeFormatting(previousSettings.enableCodeFormatting);
    setIncludeImports(previousSettings.includeImports);
    setEnableAutoComplete(previousSettings.enableAutoComplete);
    setEnableTypeChecking(previousSettings.enableTypeChecking);
    setEnablePrettierOnSave(previousSettings.enablePrettierOnSave);
    
    // 显示撤销确认提示
    toast.info("Settings restored", {
      description: "Your preferences have been reverted to the previous state",
    });
  };

  // 保存画布更改
  const saveCanvasChanges = () => {
    // 这里可以添加实际的保存逻辑，比如保存到localStorage或发送到服务器
    // 目前只显示提示信息
    
    toast.success("Saved", {
      description: "All changes saved",
      action: {
        label: "View Project",
        onClick: () => {
          // 可以添加查看项目的逻辑
          console.log("View project clicked");
        },
      },
    });
  };

  // 撤销操作
  const undoAction = () => {
    toast.info("Undo", {
      description: "Previous action has been undone",
    });
    console.log("Undo action performed");
  };

  // 重做操作
  const redoAction = () => {
    toast.info("Redo", {
      description: "Action has been redone",
    });
    console.log("Redo action performed");
  };

  // 刷新页面
  const refreshPage = () => {
    toast.info("Refreshing", {
      description: "Page is being refreshed",
    });
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  // 打开/切换对话
  const openConversation = () => {
    const newShowTopBar = !showTopBar;
    setShowTopBar(newShowTopBar);
  };

  return {
    // 状态
    prompt,
    generatedCode,
    isGenerating,
    viewMode,
    fontSize,
    borderRadius,
    showTopBar,
    activeTab,
    selectedLayer,
    aiMode,
    selectedPage,
    selectedComponent,
    rightPanelTab,
    layoutType,
    flexDirection,
    showCodeDialog,
    showSettingsSheet,
    showShortcutsDialog,
    components,
    autoSaveCode,
    showLineNumbers,
    enableCodeFormatting,
    includeImports,
    enableAutoComplete,
    enableTypeChecking,
    enablePrettierOnSave,
    previousSettings,
    
    // 操作
    setPrompt,
    setGeneratedCode,
    setIsGenerating,
    setViewMode,
    setFontSize,
    setBorderRadius,
    setShowTopBar,
    setActiveTab,
    setSelectedLayer,
    setAiMode,
    setSelectedPage,
    setSelectedComponent,
    setRightPanelTab,
    setLayoutType,
    setFlexDirection,
    setShowCodeDialog,
    setShowSettingsSheet,
    setShowShortcutsDialog,
    setComponents,
    setAutoSaveCode,
    setShowLineNumbers,
    setEnableCodeFormatting,
    setIncludeImports,
    setEnableAutoComplete,
    setEnableTypeChecking,
    setEnablePrettierOnSave,
    setPreviousSettings,
    
    // 复杂操作
    handleGenerate,
    copyCode,
    saveSettings,
    saveCanvasChanges,
    undoAction,
    redoAction,
    refreshPage,
    openConversation,
    undoSettings,
  };
}
