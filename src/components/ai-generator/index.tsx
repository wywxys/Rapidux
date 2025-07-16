'use client';

import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/sonner';
import { Header } from './header';
import { LeftSidebar } from './sidebar-left';
import { Canvas } from './canvas';
import { RightSidebar } from './sidebar-right';
import { FloatingToolbar } from './floating-toolbar';
import { AIInput } from './floating-toolbar/ai-input';
import { CodeViewerDialog } from './dialogs/code-viewer';
import { useAIGenerator } from './hooks/use-ai-generator';
import './styles.css';

export function AIComponentGenerator() {
  const state = useAIGenerator();

  return (
    <TooltipProvider>
      <div className="h-screen bg-background text-foreground flex flex-col relative">
        {/* Header */}
        <Header
          showSettingsSheet={state.showSettingsSheet}
          setShowSettingsSheet={state.setShowSettingsSheet}
          autoSaveCode={state.autoSaveCode}
          setAutoSaveCode={state.setAutoSaveCode}
          showLineNumbers={state.showLineNumbers}
          setShowLineNumbers={state.setShowLineNumbers}
          enableCodeFormatting={state.enableCodeFormatting}
          setEnableCodeFormatting={state.setEnableCodeFormatting}
          saveSettings={state.saveSettings}
        />

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Sidebar - Project Structure */}
          <LeftSidebar
            activeTab={state.activeTab}
            setActiveTab={state.setActiveTab}
            selectedPage={state.selectedPage}
            setSelectedPage={state.setSelectedPage}
            selectedLayer={state.selectedLayer}
            setSelectedLayer={state.setSelectedLayer}
          />

          {/* Center Canvas */}
          <Canvas
            viewMode={state.viewMode}
            generatedCode={state.generatedCode}
          />

          {/* Right Sidebar - Properties */}
          <RightSidebar
            selectedPage={state.selectedPage}
            selectedLayer={state.selectedLayer}
            rightPanelTab={state.rightPanelTab}
            setRightPanelTab={state.setRightPanelTab}
            layoutType={state.layoutType}
            setLayoutType={state.setLayoutType}
            flexDirection={state.flexDirection}
            setFlexDirection={state.setFlexDirection}
            fontSize={state.fontSize}
            setFontSize={state.setFontSize}
            borderRadius={state.borderRadius}
            setBorderRadius={state.setBorderRadius}
          />
        </div>

        {/* Floating AI Input */}
        <AIInput
          showTopBar={state.showTopBar}
          prompt={state.prompt}
          setPrompt={state.setPrompt}
          aiMode={state.aiMode}
          setAiMode={state.setAiMode}
          isGenerating={state.isGenerating}
          handleGenerate={state.handleGenerate}
        />

        {/* Bottom Tool Bar */}
        <FloatingToolbar
          viewMode={state.viewMode}
          setViewMode={state.setViewMode}
          showTopBar={state.showTopBar}
          setShowTopBar={state.setShowTopBar}
        />

        {/* Code Viewer Dialog */}
        <CodeViewerDialog
          showCodeDialog={state.showCodeDialog}
          setShowCodeDialog={state.setShowCodeDialog}
          generatedCode={state.generatedCode}
        />

        {/* Toast Notifications */}
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
