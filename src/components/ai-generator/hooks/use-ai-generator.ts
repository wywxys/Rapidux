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
  const [selectedLayer, setSelectedLayer] = useState<string>('div-main');
  const [aiMode, setAiMode] = useState<'edit' | 'generate'>('edit');
  const [selectedPage, setSelectedPage] = useState<string>('');
  const [rightPanelTab, setRightPanelTab] = useState<'style' | 'props'>('style');
  const [layoutType, setLayoutType] = useState<'flex' | 'grid'>('flex');
  const [flexDirection, setFlexDirection] = useState<'row' | 'column'>('row');
  const [showCodeDialog, setShowCodeDialog] = useState(false);
  const [showSettingsSheet, setShowSettingsSheet] = useState(false);
  const [components, setComponents] = useState(DEFAULT_COMPONENTS);
  
  // 设置状态
  const [autoSaveCode, setAutoSaveCode] = useState(true);
  const [showLineNumbers, setShowLineNumbers] = useState(false);
  const [enableCodeFormatting, setEnableCodeFormatting] = useState(true);
  
  // 前一个设置状态用于撤销
  const [previousSettings, setPreviousSettings] = useState<SettingsState>({
    autoSaveCode: true,
    showLineNumbers: false,
    enableCodeFormatting: true
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
      enableCodeFormatting
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
    
    // 显示撤销确认提示
    toast.info("Settings restored", {
      description: "Your preferences have been reverted to the previous state",
    });
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
    rightPanelTab,
    layoutType,
    flexDirection,
    showCodeDialog,
    showSettingsSheet,
    components,
    autoSaveCode,
    showLineNumbers,
    enableCodeFormatting,
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
    setRightPanelTab,
    setLayoutType,
    setFlexDirection,
    setShowCodeDialog,
    setShowSettingsSheet,
    setComponents,
    setAutoSaveCode,
    setShowLineNumbers,
    setEnableCodeFormatting,
    setPreviousSettings,
    
    // 复杂操作
    handleGenerate,
    copyCode,
    saveSettings,
    undoSettings,
  };
}
