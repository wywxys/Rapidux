'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Settings, 
  Play, 
  Code, 
  Palette,
  FileText,
  Layers,
  Sparkles,
  Copy,
  Monitor,
  Smartphone,
  Plus,
  Home,
  Image,
  Download,
  Undo2,
  Redo2,
  Laptop,
  RefreshCw,
  ChevronUp,
  ChevronDown,
  Bot,
  Zap,
  ChevronRight,
  Square,
  Minus,
  Lock,
  RotateCcw,
  ArrowUpDown,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Grid3x3,
  Maximize2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from '@/components/ui/sheet';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Switch } from '@/components/ui/switch';
import { toast, Toaster } from 'sonner';
import { ThemeToggle } from '@/components/theme-toggle';

interface ComponentData {
  name: string;
  code: string;
  lastModified: string;
}

export function AIComponentGenerator() {
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
  
  // Settings switches state
  const [autoSaveCode, setAutoSaveCode] = useState(true);
  const [showLineNumbers, setShowLineNumbers] = useState(false);
  const [enableCodeFormatting, setEnableCodeFormatting] = useState(true);
  
  // Previous settings state for undo functionality
  const [previousSettings, setPreviousSettings] = useState({
    autoSaveCode: true,
    showLineNumbers: false,
    enableCodeFormatting: true
  });
  
  const [components, setComponents] = useState<ComponentData[]>([
    { name: 'UserCard', code: '', lastModified: '2h ago' },
    { name: 'Button', code: '', lastModified: '5h ago' },
    { name: 'Input', code: '', lastModified: '1d ago' },
  ]);

  const projectFiles = [
    { name: 'App.tsx', active: true },
    { name: 'UserCard.tsx', active: false },
    { name: 'Button.tsx', active: false },
    { name: 'Input.tsx', active: false },
  ];

  const colorPalette = [
    'bg-blue-500',
    'bg-purple-500',
    'bg-green-500',
    'bg-red-500',
    'bg-yellow-500',
    'bg-pink-500',
  ];

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

  const saveSettings = () => {
    // Save current settings as previous state
    setPreviousSettings({
      autoSaveCode,
      showLineNumbers,
      enableCodeFormatting
    });
    
    // Close the settings sheet first
    setShowSettingsSheet(false);
    
    // Show success toast with undo option after a short delay
    setTimeout(() => {
      toast.success("Settings saved successfully", {
        description: "Your preferences have been updated",
        action: {
          label: "Undo",
          onClick: () => undoSettings(),
        },
      });
    }, 200); // Small delay to ensure sheet closes first
  };

  const undoSettings = () => {
    // Restore previous settings
    setAutoSaveCode(previousSettings.autoSaveCode);
    setShowLineNumbers(previousSettings.showLineNumbers);
    setEnableCodeFormatting(previousSettings.enableCodeFormatting);
    
    // Show undo confirmation toast
    toast.info("Settings restored", {
      description: "Your preferences have been reverted to the previous state",
    });
  };

  return (
    <TooltipProvider>
      <div className="h-screen bg-background text-foreground flex flex-col relative">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary rounded-lg">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-semibold">
              AI Component Generator
            </h1>
          </div>
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <Sheet open={showSettingsSheet} onOpenChange={setShowSettingsSheet}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Settings className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent className="w-96 flex flex-col gap-0 p-0 h-full">
                <SheetHeader className="px-4 py-4 border-b">
                  <SheetTitle>Settings</SheetTitle>
                  <SheetDescription>
                    Configure your AI component generator preferences.
                  </SheetDescription>
                </SheetHeader>
                
                <div className="flex-1 overflow-hidden">
                  <ScrollArea className="h-full px-4 py-4">
                    <div className="space-y-6">
                      {/* Generator Model */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Generator Model</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select model" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="gpt-4">GPT-4</SelectItem>
                            <SelectItem value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
                            <SelectItem value="claude-3">Claude 3</SelectItem>
                            <SelectItem value="claude-3-opus">Claude 3 Opus</SelectItem>
                            <SelectItem value="local">Local Model</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* API Settings */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium">API Configuration</label>
                        <div className="space-y-3">
                          <div>
                            <label className="text-xs text-muted-foreground">API Key</label>
                            <Input type="password" placeholder="Enter your API key" />
                          </div>
                          <div>
                            <label className="text-xs text-muted-foreground">Base URL</label>
                            <Input placeholder="https://api.openai.com/v1" />
                          </div>
                        </div>
                      </div>

                      {/* Generation Settings */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Generation Settings</label>
                        <div className="space-y-3">
                          <div>
                            <label className="text-xs text-muted-foreground">Temperature</label>
                            <div className="flex items-center space-x-3">
                              <Slider
                                value={[0.7]}
                                max={1}
                                min={0}
                                step={0.1}
                                className="flex-1"
                              />
                              <span className="text-xs text-muted-foreground w-8">0.7</span>
                            </div>
                          </div>
                          <div>
                            <label className="text-xs text-muted-foreground">Max Tokens</label>
                            <Input type="number" placeholder="2048" />
                          </div>
                        </div>
                      </div>

                      {/* UI Preferences */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium">UI Preferences</label>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <label className="text-xs text-muted-foreground">Auto-save generated code</label>
                            <Switch
                              checked={autoSaveCode}
                              onCheckedChange={setAutoSaveCode}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <label className="text-xs text-muted-foreground">Show line numbers</label>
                            <Switch
                              checked={showLineNumbers}
                              onCheckedChange={setShowLineNumbers}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <label className="text-xs text-muted-foreground">Enable code formatting</label>
                            <Switch
                              checked={enableCodeFormatting}
                              onCheckedChange={setEnableCodeFormatting}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Code Style Settings */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Code Style</label>
                        <div className="space-y-3">
                          <div>
                            <label className="text-xs text-muted-foreground">Indentation</label>
                            <Select defaultValue="2">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="2">2 spaces</SelectItem>
                                <SelectItem value="4">4 spaces</SelectItem>
                                <SelectItem value="tab">Tab</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <label className="text-xs text-muted-foreground">Quote Style</label>
                            <Select defaultValue="single">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="single">Single quotes</SelectItem>
                                <SelectItem value="double">Double quotes</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>

                      {/* Export Settings */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Export Settings</label>
                        <div className="space-y-3">
                          <div>
                            <label className="text-xs text-muted-foreground">Default Format</label>
                            <Select defaultValue="tsx">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="tsx">TypeScript React (.tsx)</SelectItem>
                                <SelectItem value="jsx">JavaScript React (.jsx)</SelectItem>
                                <SelectItem value="vue">Vue (.vue)</SelectItem>
                                <SelectItem value="svelte">Svelte (.svelte)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex items-center justify-between">
                            <label className="text-xs text-muted-foreground">Include imports</label>
                            <Button variant="outline" size="sm">
                              <span className="text-xs">ON</span>
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Reset Settings */}
                      <div className="pt-4 border-t">
                        <Button variant="outline" className="w-full">
                          <RotateCcw className="h-4 w-4 mr-2" />
                          Reset to Defaults
                        </Button>
                      </div>
                    </div>
                  </ScrollArea>
                </div>

                <div className="border-t p-4">
                  <Button className="w-full" onClick={saveSettings}>
                    Save changes
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Project Structure */}
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
              ) : (
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
                              <ChevronDown className="h-4 w-4" />
                              <Square className="h-4 w-4" />
                              <span className="text-sm">div</span>
                            </div>
                            
                            <div className="ml-4 space-y-1">
                              <div 
                                className={`flex items-center space-x-2 p-2 rounded-md cursor-pointer layer-item ${
                                  selectedLayer === 'header' ? 'layer-selected' : 
                                  (selectedLayer === 'div-content' || selectedLayer === 'div-main') ? 'layer-selected-child' : ''
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
                              
                              <div className={`rounded-md ${selectedLayer === 'main' ? 'layer-selected' : (selectedLayer === 'div-content' || selectedLayer === 'div-main') ? 'layer-selected-child' : ''}`}>
                                <div 
                                  className={`flex items-center space-x-2 p-2 cursor-pointer layer-item ${
                                    selectedLayer === 'main' ? 'layer-selected' : 
                                    (selectedLayer === 'div-content' || selectedLayer === 'div-main') ? 'layer-selected-child' : ''
                                  }`}
                                  onClick={() => {
                                    setSelectedLayer('main');
                                    setSelectedPage('');
                                  }}
                                >
                                  <ChevronDown className="h-4 w-4" />
                                  <Square className="h-4 w-4" />
                                  <span className="text-sm">main</span>
                                </div>
                                
                                <div className="ml-4 space-y-1">
                                  <div 
                                    className={`flex items-center space-x-2 p-2 rounded-md cursor-pointer layer-item ${
                                      selectedLayer === 'div-1' ? 'layer-selected' : 
                                      (selectedLayer === 'main' || selectedLayer === 'div-content' || selectedLayer === 'div-main') ? 'layer-selected-child' : ''
                                    }`}
                                    onClick={() => {
                                      setSelectedLayer('div-1');
                                      setSelectedPage('');
                                    }}
                                  >
                                    <ChevronRight className="h-4 w-4" />
                                    <Square className="h-4 w-4" />
                                    <span className="text-sm">div</span>
                                  </div>
                                  
                                  <div 
                                    className={`flex items-center space-x-2 p-2 rounded-md cursor-pointer layer-item ${
                                      selectedLayer === 'div-2' ? 'layer-selected' : 
                                      (selectedLayer === 'main' || selectedLayer === 'div-content' || selectedLayer === 'div-main') ? 'layer-selected-child' : ''
                                    }`}
                                    onClick={() => {
                                      setSelectedLayer('div-2');
                                      setSelectedPage('');
                                    }}
                                  >
                                    <ChevronRight className="h-4 w-4" />
                                    <Square className="h-4 w-4" />
                                    <span className="text-sm">div</span>
                                  </div>
                                  
                                  <div 
                                    className={`flex items-center space-x-2 p-2 rounded-md cursor-pointer layer-item ${
                                      selectedLayer === 'card' ? 'layer-selected' : 
                                      (selectedLayer === 'main' || selectedLayer === 'div-content' || selectedLayer === 'div-main') ? 'layer-selected-child' : ''
                                    }`}
                                    onClick={() => {
                                      setSelectedLayer('card');
                                      setSelectedPage('');
                                    }}
                                  >
                                    <ChevronRight className="h-4 w-4" />
                                    <div className="h-4 w-4 bg-secondary rounded-sm flex items-center justify-center">
                                      <div className="h-2 w-2 bg-secondary-foreground rounded-sm"></div>
                                    </div>
                                    <span className="text-sm">Card</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </ScrollArea>
        </aside>

        {/* Center Canvas */}
        <main className="flex-1 flex flex-col">
          {/* Canvas Area */}
          <div className="flex-1 bg-muted/30 p-8 overflow-auto">
            <div className={`mx-auto h-full ${viewMode === 'mobile' ? 'max-w-sm' : 'max-w-4xl'}`}>
              {generatedCode ? (
                <Card className="p-8">
                  <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
                    <div className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 bg-primary rounded-full flex items-center justify-center">
                          <span className="text-primary-foreground text-sm font-medium">JD</span>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">John Doe</h3>
                          <p className="text-gray-600">john@example.com</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center -mt-16">
                    <div className="mb-6">
                      <div className="relative">
                        <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl"></div>
                        <Sparkles className="relative h-16 w-16 mx-auto text-muted-foreground" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      Describe the component you want to create
                    </h3>
                    <p className="text-muted-foreground text-base">
                      AI will generate React + Tailwind CSS code for you
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>

        {/* Right Sidebar - Properties */}
        <aside className="w-80 bg-card/30 border-l">
          <ScrollArea className="h-full">
            {(selectedPage === 'home' || selectedLayer || selectedPage === 'settings') && (
              <div className="p-4 space-y-4">
                {/* Element Header */}
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">
                    {selectedPage === 'home' ? 'Home' : selectedPage === 'settings' ? 'Settings' : selectedLayer}
                  </h2>
                  <div className="flex items-center space-x-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <Maximize2 className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Full screen preview</p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <Code className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>View source code</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>

                {/* Content based on selection */}
                {selectedPage === 'settings' && (
                  <div className="space-y-6">
                    {/* Fonts Section */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-base font-semibold">Fonts</h3>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <Code className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>View font CSS code</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      
                      <div className="space-y-4">
                        {/* Headings */}
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <label className="text-sm font-medium">Headings</label>
                            <div className="w-4 h-4 rounded-full bg-muted flex items-center justify-center">
                              <span className="text-xs text-muted-foreground">i</span>
                            </div>
                          </div>
                          <Select defaultValue="Familjen Grotesk">
                            <SelectTrigger className="h-10">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Familjen Grotesk">Familjen Grotesk</SelectItem>
                              <SelectItem value="Inter">Inter</SelectItem>
                              <SelectItem value="Roboto">Roboto</SelectItem>
                              <SelectItem value="Open Sans">Open Sans</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Body */}
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <label className="text-sm font-medium">Body</label>
                            <div className="w-4 h-4 rounded-full bg-muted flex items-center justify-center">
                              <span className="text-xs text-muted-foreground">i</span>
                            </div>
                          </div>
                          <Select defaultValue="Familjen Grotesk">
                            <SelectTrigger className="h-10">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Familjen Grotesk">Familjen Grotesk</SelectItem>
                              <SelectItem value="Inter">Inter</SelectItem>
                              <SelectItem value="Roboto">Roboto</SelectItem>
                              <SelectItem value="Open Sans">Open Sans</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    {/* Border Radius Section */}
                    <div>
                      <h3 className="text-base font-semibold mb-4">Border Radius (rem)</h3>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-4">
                          <Slider
                            value={[0.67]}
                            max={2}
                            min={0}
                            step={0.01}
                            className="flex-1"
                          />
                          <span className="text-sm text-muted-foreground w-12 text-right">0.67</span>
                        </div>
                      </div>
                    </div>

                    {/* Colors Section */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <h3 className="text-base font-semibold">Colors</h3>
                          <div className="w-4 h-4 rounded-full bg-muted flex items-center justify-center">
                            <span className="text-xs text-muted-foreground">i</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <Palette className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <Code className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        {/* Background */}
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 rounded-full bg-black"></div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium">Background</span>
                              <div className="w-4 h-4 rounded-full bg-muted flex items-center justify-center">
                                <span className="text-xs text-muted-foreground">i</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Foreground */}
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 rounded-full bg-white border border-border"></div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium">Foreground</span>
                              <div className="w-4 h-4 rounded-full bg-muted flex items-center justify-center">
                                <span className="text-xs text-muted-foreground">i</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Primary */}
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 rounded-full bg-purple-500"></div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium">Primary</span>
                              <div className="w-4 h-4 rounded-full bg-muted flex items-center justify-center">
                                <span className="text-xs text-muted-foreground">i</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Primary Foreground */}
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 rounded-full bg-white border border-border"></div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium">Primary Foreground</span>
                              <div className="w-4 h-4 rounded-full bg-muted flex items-center justify-center">
                                <span className="text-xs text-muted-foreground">i</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Secondary */}
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 rounded-full bg-black"></div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium">Secondary</span>
                              <div className="w-4 h-4 rounded-full bg-muted flex items-center justify-center">
                                <span className="text-xs text-muted-foreground">i</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Secondary Foreground */}
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 rounded-full bg-white border border-border"></div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium">Secondary Foreground</span>
                              <div className="w-4 h-4 rounded-full bg-muted flex items-center justify-center">
                                <span className="text-xs text-muted-foreground">i</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Muted */}
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 rounded-full bg-black"></div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium">Muted</span>
                              <div className="w-4 h-4 rounded-full bg-muted flex items-center justify-center">
                                <span className="text-xs text-muted-foreground">i</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Muted Foreground */}
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 rounded-full bg-gray-500"></div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium">Muted Foreground</span>
                              <div className="w-4 h-4 rounded-full bg-muted flex items-center justify-center">
                                <span className="text-xs text-muted-foreground">i</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
              </div>
            )}

            {/* Regular Style/Props content */}
            {(selectedPage === 'home' || selectedLayer) && (
              <div className="px-4 pb-4">
                {rightPanelTab === 'style' && (
                  <div className="space-y-4">
                    {/* Tailwind Classes */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium">Tailwind Classes</label>
                        <div className="flex items-center space-x-1">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <Lock className="h-3 w-3" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Lock/unlock class editing</p>
                            </TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <ChevronDown className="h-3 w-3" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Collapse/expand section</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Input 
                            placeholder="New class" 
                            className="flex-1 h-8 text-sm"
                          />
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <RotateCcw className="h-3 w-3" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Reset classes to default</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        
                        <div className="flex flex-wrap gap-1">
                          {['flex-1', 'w-full', 'flex', 'flex-col'].map((className) => (
                            <Badge key={className} variant="secondary" className="text-xs">
                              {className}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Layout */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium">Layout</label>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <ChevronDown className="h-3 w-3" />
                        </Button>
                      </div>
                      
                      <div className="space-y-3">
                        {/* Type */}
                        <div>
                          <label className="block text-xs text-muted-foreground mb-1">Type</label>
                          <div className="flex bg-muted/50 rounded-md p-0.5">
                            <button 
                              className={`flex-1 px-2 py-1 text-xs rounded-sm transition-colors ${
                                layoutType === 'flex' 
                                  ? 'bg-background shadow-sm' 
                                  : 'text-muted-foreground hover:text-foreground'
                              }`}
                              onClick={() => setLayoutType('flex')}
                            >
                              Flex
                            </button>
                            <button 
                              className={`flex-1 px-2 py-1 text-xs rounded-sm transition-colors ${
                                layoutType === 'grid' 
                                  ? 'bg-background shadow-sm' 
                                  : 'text-muted-foreground hover:text-foreground'
                              }`}
                              onClick={() => setLayoutType('grid')}
                            >
                              Grid
                            </button>
                          </div>
                        </div>

                        {/* Direction */}
                        <div>
                          <label className="block text-xs text-muted-foreground mb-1">Direction</label>
                          <div className="flex bg-muted/50 rounded-md p-0.5">
                            <button 
                              className={`flex-1 px-2 py-1 text-xs rounded-sm transition-colors flex items-center justify-center ${
                                flexDirection === 'row' 
                                  ? 'bg-background shadow-sm' 
                                  : 'text-muted-foreground hover:text-foreground'
                              }`}
                              onClick={() => setFlexDirection('row')}
                            >
                              <ArrowUpDown className="h-3 w-3 rotate-90" />
                            </button>
                            <button 
                              className={`flex-1 px-2 py-1 text-xs rounded-sm transition-colors flex items-center justify-center ${
                                flexDirection === 'column' 
                                  ? 'bg-background shadow-sm' 
                                  : 'text-muted-foreground hover:text-foreground'
                              }`}
                              onClick={() => setFlexDirection('column')}
                            >
                              <ArrowUpDown className="h-3 w-3" />
                            </button>
                          </div>
                        </div>

                        {/* Alignment */}
                        <div>
                          <label className="block text-xs text-muted-foreground mb-1">Alignment</label>
                          <div className="flex bg-muted/50 rounded-md p-0.5">
                            <button className="flex-1 px-2 py-1 text-xs rounded-sm transition-colors flex items-center justify-center hover:bg-background">
                              <AlignLeft className="h-3 w-3" />
                            </button>
                            <button className="flex-1 px-2 py-1 text-xs rounded-sm transition-colors flex items-center justify-center hover:bg-background">
                              <AlignCenter className="h-3 w-3" />
                            </button>
                            <button className="flex-1 px-2 py-1 text-xs rounded-sm transition-colors flex items-center justify-center hover:bg-background">
                              <AlignRight className="h-3 w-3" />
                            </button>
                          </div>
                        </div>

                        {/* Distribution */}
                        <div>
                          <label className="block text-xs text-muted-foreground mb-1">Distribution</label>
                          <Select defaultValue="start">
                            <SelectTrigger className="h-8 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="start">Start</SelectItem>
                              <SelectItem value="center">Center</SelectItem>
                              <SelectItem value="end">End</SelectItem>
                              <SelectItem value="between">Space Between</SelectItem>
                              <SelectItem value="around">Space Around</SelectItem>
                              <SelectItem value="evenly">Space Evenly</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {rightPanelTab === 'props' && (
                  <div className="space-y-4">
                    <div className="text-sm text-muted-foreground">
                      Component props will be displayed here
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Default Properties Panel (when nothing is selected) */}
            {!selectedPage && !selectedLayer && (
              <div className="p-6 space-y-6">
                <div>
                  <h2 className="text-sm font-medium mb-4 flex items-center text-muted-foreground">
                    <Palette className="h-4 w-4 mr-2" />
                    Properties
                  </h2>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        Font Size
                      </label>
                      <Select value={fontSize} onValueChange={setFontSize}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="12px">12px</SelectItem>
                          <SelectItem value="14px">14px</SelectItem>
                          <SelectItem value="16px">16px</SelectItem>
                          <SelectItem value="18px">18px</SelectItem>
                          <SelectItem value="20px">20px</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        Color Palette
                      </label>
                      <div className="grid grid-cols-6 gap-2">
                        {colorPalette.map((color, index) => (
                          <div
                            key={index}
                            className={`w-10 h-10 rounded-lg cursor-pointer hover:scale-105 transition-transform ${color}`}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        Border Radius
                      </label>
                      <Slider
                        value={borderRadius}
                        onValueChange={setBorderRadius}
                        max={20}
                        min={0}
                        step={1}
                        className="w-full"
                      />
                      <div className="text-xs text-muted-foreground">
                        {borderRadius[0]}px
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Generated Code Section - Always show */}
                <div className="space-y-3">
                  <h2 className="text-sm font-medium flex items-center text-muted-foreground">
                    <Code className="h-4 w-4 mr-2" />
                    Generated Code
                  </h2>
                  <Card>
                    <CardContent className="p-4">
                      <ScrollArea className="h-48">
                        <pre className="text-xs font-mono text-muted-foreground leading-relaxed whitespace-pre-wrap">
                          {generatedCode || `// Generated code will appear here after you create a component
// Click the "Generate" button to create your first component

function SampleComponent() {
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-2">Sample Component</h2>
      <p className="text-gray-600">This is a sample component.</p>
    </div>
  );
}`}
                        </pre>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                  <div className="flex space-x-2">
                    <Button onClick={copyCode} variant="outline" size="sm" className="flex-1">
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Code
                    </Button>
                    <Button onClick={() => setShowCodeDialog(true)} variant="outline" size="sm" className="flex-1">
                      <Code className="h-4 w-4 mr-2" />
                      &lt;/&gt;
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </ScrollArea>
        </aside>
      </div>

      {/* Floating AI Input */}
      {showTopBar && (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50">
          <div className="w-[600px] max-w-[85vw] shadow-xl border bg-card/95 backdrop-blur-md rounded-lg p-4">
            <div className="space-y-3">
              {/* Input Field */}
              <div className="flex items-center space-x-3">
                <div className="flex-1 relative">                    <Input
                      type="text"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder={
                        aiMode === 'edit' 
                          ? "Describe how to edit the selected component..." 
                          : "Describe the component you want to create..."
                      }
                      className="w-full pr-10 text-sm h-10 bg-background/50 border focus:border-primary/50 focus:ring-1 focus:ring-primary/20"
                      onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                    />
                  <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center justify-between">                  <div className="flex items-center space-x-2">
                    {/* Edit/Generate Toggle */}
                    <div className="flex bg-muted/50 rounded-md p-0.5">
                      <button 
                        className={`px-2 py-1 text-xs font-medium rounded-sm transition-colors ${
                          aiMode === 'edit' 
                            ? 'bg-background shadow-sm' 
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                        onClick={() => setAiMode('edit')}
                      >
                        Edit
                      </button>
                      <button 
                        className={`px-2 py-1 text-xs font-medium rounded-sm transition-colors ${
                          aiMode === 'generate' 
                            ? 'bg-background shadow-sm' 
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                        onClick={() => setAiMode('generate')}
                      >
                        Generate
                      </button>
                    </div>
                  
                  {/* Add Photo Button */}
                  <Button variant="outline" size="sm" className="gap-1.5 h-7 px-2">
                    <Image className="h-3.5 w-3.5" />
                    <span className="text-xs">Photo</span>
                  </Button>
                  
                  {/* Import from Figma Button */}
                  <Button variant="outline" size="sm" className="gap-1.5 h-7 px-2">
                    <Download className="h-3.5 w-3.5" />
                    <span className="text-xs">Figma</span>
                  </Button>
                </div>
                
                <div className="flex items-center space-x-1">
                  {/* Send Button */}                    <Button
                      onClick={handleGenerate}
                      disabled={isGenerating || !prompt.trim()}
                      size="sm"
                      className="gap-1.5 h-7 px-3 bg-primary hover:bg-primary/90"
                    >
                      {isGenerating ? (
                        <>
                          <div className="animate-spin h-3.5 w-3.5 border-2 border-current border-t-transparent rounded-full"></div>
                          <span className="text-xs">Sending...</span>
                        </>
                      ) : (
                        <>
                          <Play className="h-3.5 w-3.5" />
                          <span className="text-xs">Send</span>
                        </>
                      )}
                    </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Tool Bar */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="flex items-center bg-card/95 backdrop-blur-md shadow-lg border rounded-lg px-2 py-1.5 gap-1">
          {/* Undo Button */}
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
            <Undo2 className="h-3.5 w-3.5" />
          </Button>
          
          {/* Redo Button */}
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
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
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
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

      {/* Code Viewer Dialog */}
      <Dialog open={showCodeDialog} onOpenChange={setShowCodeDialog}>
        <DialogContent className="max-w-4xl w-full h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Code className="h-5 w-5" />
              Generated Code
            </DialogTitle>
            <DialogDescription>
              View and copy the generated code for your component
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full">
              <div className="relative">
                <pre className="bg-muted/50 rounded-lg p-4 text-sm font-mono overflow-x-auto">
                  <code className="text-foreground">
                    {generatedCode || `// Generated code will appear here
function AIComponent() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          AI Component Generator
        </h1>
        <p className="text-gray-600 mb-6">
          This is a sample generated component. Use the AI input to create your own custom components.
        </p>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Get Started
        </button>
      </div>
    </div>
  );
}

export default AIComponent;`}
                  </code>
                </pre>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => {
                    navigator.clipboard.writeText(generatedCode || '// No code generated yet');
                  }}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </ScrollArea>
          </div>
        </DialogContent>
      </Dialog>
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: 'hsl(var(--card))',
            color: 'hsl(var(--card-foreground))',
            border: '1px solid hsl(var(--border))',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            backdropFilter: 'blur(8px)',
            opacity: 1,
          },
          className: 'bg-card/95 backdrop-blur-sm border shadow-lg',
        }}
      />
    </div>
    </TooltipProvider>
  );
}
