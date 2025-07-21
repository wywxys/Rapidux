import { Settings, Sparkles, Keyboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import { SettingsSheet } from '../settings/index';
import { ShortcutsDialog } from '../dialogs/shortcuts-dialog';

interface HeaderProps {
  showSettingsSheet: boolean;
  setShowSettingsSheet: (show: boolean) => void;
  showShortcutsDialog: boolean;
  setShowShortcutsDialog: (show: boolean) => void;
  autoSaveCode: boolean;
  setAutoSaveCode: (auto: boolean) => void;
  showLineNumbers: boolean;
  setShowLineNumbers: (show: boolean) => void;
  enableCodeFormatting: boolean;
  setEnableCodeFormatting: (enable: boolean) => void;
  includeImports: boolean;
  setIncludeImports: (include: boolean) => void;
  enableAutoComplete: boolean;
  setEnableAutoComplete: (enable: boolean) => void;
  enableTypeChecking: boolean;
  setEnableTypeChecking: (enable: boolean) => void;
  enablePrettierOnSave: boolean;
  setEnablePrettierOnSave: (enable: boolean) => void;
  saveSettings: () => void;
}

export function Header({
  showSettingsSheet,
  setShowSettingsSheet,
  showShortcutsDialog,
  setShowShortcutsDialog,
  autoSaveCode,
  setAutoSaveCode,
  showLineNumbers,
  setShowLineNumbers,
  enableCodeFormatting,
  setEnableCodeFormatting,
  includeImports,
  setIncludeImports,
  enableAutoComplete,
  setEnableAutoComplete,
  enableTypeChecking,
  setEnableTypeChecking,
  enablePrettierOnSave,
  setEnablePrettierOnSave,
  saveSettings,
}: HeaderProps) {
  return (
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
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setShowShortcutsDialog(true)}
          >
            <Keyboard className="h-5 w-5" />
          </Button>
          <Sheet open={showSettingsSheet} onOpenChange={setShowSettingsSheet}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SettingsSheet
              autoSaveCode={autoSaveCode}
              setAutoSaveCode={setAutoSaveCode}
              showLineNumbers={showLineNumbers}
              setShowLineNumbers={setShowLineNumbers}
              enableCodeFormatting={enableCodeFormatting}
              setEnableCodeFormatting={setEnableCodeFormatting}
              includeImports={includeImports}
              setIncludeImports={setIncludeImports}
              enableAutoComplete={enableAutoComplete}
              setEnableAutoComplete={setEnableAutoComplete}
              enableTypeChecking={enableTypeChecking}
              setEnableTypeChecking={setEnableTypeChecking}
              enablePrettierOnSave={enablePrettierOnSave}
              setEnablePrettierOnSave={setEnablePrettierOnSave}
              saveSettings={saveSettings}
            />
          </Sheet>
        </div>
      </div>
      
      <ShortcutsDialog
        open={showShortcutsDialog}
        onOpenChange={setShowShortcutsDialog}
      />
    </header>
  );
}
