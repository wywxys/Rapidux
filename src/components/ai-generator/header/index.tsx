import { Settings, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import { SettingsSheet } from '../settings/index';

interface HeaderProps {
  showSettingsSheet: boolean;
  setShowSettingsSheet: (show: boolean) => void;
  autoSaveCode: boolean;
  setAutoSaveCode: (auto: boolean) => void;
  showLineNumbers: boolean;
  setShowLineNumbers: (show: boolean) => void;
  enableCodeFormatting: boolean;
  setEnableCodeFormatting: (enable: boolean) => void;
  saveSettings: () => void;
}

export function Header({
  showSettingsSheet,
  setShowSettingsSheet,
  autoSaveCode,
  setAutoSaveCode,
  showLineNumbers,
  setShowLineNumbers,
  enableCodeFormatting,
  setEnableCodeFormatting,
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
              saveSettings={saveSettings}
            />
          </Sheet>
        </div>
      </div>
    </header>
  );
}
