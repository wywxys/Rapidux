import { Settings, Sparkles, Keyboard, ChevronDown, ArrowLeft, HelpCircle } from 'lucide-react';
import { IconButton, DropdownButton } from '@/components/composite';
import { ThemeToggle } from '@/components/theme-toggle';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SettingsSheet } from '../settings/index';
import { ShortcutsDialog } from '../dialogs/shortcuts-dialog';
import Link from 'next/link';

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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors cursor-pointer">
                <div className="p-2 bg-primary rounded-lg">
                  <Sparkles className="h-5 w-5 text-primary-foreground" />
                </div>
                <div className="px-2">
                  <ChevronDown className="h-3 w-3 text-muted-foreground" />
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuItem asChild>
                <Link href="/dashboard" className="flex items-center">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  <span>Back to Dashboard</span>
                </Link>
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem disabled>
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>Help Documentation</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          <IconButton 
            icon={Keyboard}
            onClick={() => setShowShortcutsDialog(true)}
          />
          <Sheet open={showSettingsSheet} onOpenChange={setShowSettingsSheet}>
            <SheetTrigger asChild>
              <IconButton icon={Settings} />
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
