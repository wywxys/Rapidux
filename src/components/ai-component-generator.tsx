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
  Minus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
    navigator.clipboard.writeText(generatedCode);
  };

  return (
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
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Settings className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Settings</SheetTitle>
                  <SheetDescription>
                    Configure your AI component generator preferences.
                  </SheetDescription>
                </SheetHeader>
                <div className="space-y-4 mt-6">
                  <div>
                    <label className="text-sm font-medium">Generator Model</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select model" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gpt-4">GPT-4</SelectItem>
                        <SelectItem value="claude-3">Claude 3</SelectItem>
                        <SelectItem value="local">Local Model</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
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
                      <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-accent cursor-pointer">
                        <Home className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Home</span>
                      </div>
                      <div className="flex items-center space-x-2 p-2 rounded-md bg-primary text-primary-foreground cursor-pointer">
                        <FileText className="h-4 w-4" />
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
                          onClick={() => setSelectedLayer('div-main')}
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
                            onClick={() => setSelectedLayer('sidebar')}
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
                              onClick={() => setSelectedLayer('div-content')}
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
                                onClick={() => setSelectedLayer('header')}
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
                                  onClick={() => setSelectedLayer('main')}
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
                                    onClick={() => setSelectedLayer('div-1')}
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
                                    onClick={() => setSelectedLayer('div-2')}
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
                                    onClick={() => setSelectedLayer('card')}
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
              
              {generatedCode && (
                <div className="space-y-3">
                  <h2 className="text-sm font-medium flex items-center text-muted-foreground">
                    <Code className="h-4 w-4 mr-2" />
                    Generated Code
                  </h2>
                  <Card>
                    <CardContent className="p-4">
                      <ScrollArea className="h-48">
                        <pre className="text-xs font-mono text-muted-foreground leading-relaxed whitespace-pre-wrap">
                          {generatedCode}
                        </pre>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                  <Button onClick={copyCode} variant="outline" size="sm" className="w-full">
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Code
                  </Button>
                </div>
              )}
            </div>
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
                  {/* Settings Button */}
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                    <Settings className="h-3.5 w-3.5" />
                  </Button>
                  
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
        <div className="flex items-center bg-card/95 backdrop-blur-md shadow-lg border rounded-lg px-1.5 py-1.5">
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
    </div>
  );
}
