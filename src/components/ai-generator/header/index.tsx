import { Settings, Sparkles, Keyboard, ChevronDown, ArrowLeft, HelpCircle, Download, Archive, FileDown, FileCode } from 'lucide-react';
import { IconButton, DropdownButton } from '@/components/composite';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { SettingsSheet } from '../settings/index';
import { ShortcutsDialog } from '../dialogs/shortcuts-dialog';
import Link from 'next/link';
import { ProjectExporter } from '@/lib/project-exporter';
import { Project } from '@/types/real-project';
import { toast } from 'sonner';

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
  currentProject?: Project;
  onExportProject?: (project: Project) => void;
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
  currentProject,
  onExportProject,
}: HeaderProps) {
  
  const handleExportAsJSON = () => {
    if (currentProject) {
      try {
        ProjectExporter.exportAsJSON(currentProject);
        toast.success(`"${currentProject.name}" exported as JSON successfully!`);
        onExportProject?.(currentProject);
      } catch (error) {
        toast.error('Failed to export project as JSON');
        console.error('Export error:', error);
      }
    }
  };

  const handleExportAsProject = () => {
    if (currentProject) {
      try {
        ProjectExporter.exportAsNextJSProject(currentProject);
        toast.success(`"${currentProject.name}" exported as project documentation!`);
        onExportProject?.(currentProject);
      } catch (error) {
        toast.error('Failed to export project documentation');
        console.error('Export error:', error);
      }
    }
  };

  const handleExportStats = () => {
    if (currentProject) {
      try {
        const stats = ProjectExporter.generateProjectStats(currentProject);
        const blob = new Blob([stats], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${currentProject.name.toLowerCase().replace(/\s+/g, '-')}-stats.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        toast.success(`"${currentProject.name}" statistics exported!`);
        onExportProject?.(currentProject);
      } catch (error) {
        toast.error('Failed to export project statistics');
        console.error('Export error:', error);
      }
    }
  };
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
          {currentProject && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Export Code
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Export Options</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleExportAsJSON}>
                  <FileCode className="mr-2 h-4 w-4" />
                  Export as JSON
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleExportAsProject}>
                  <FileDown className="mr-2 h-4 w-4" />
                  Export as Project (MD)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleExportStats}>
                  <Archive className="mr-2 h-4 w-4" />
                  Export Statistics
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
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
