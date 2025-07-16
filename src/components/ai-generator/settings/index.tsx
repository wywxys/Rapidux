import { RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';

interface SettingsSheetProps {
  autoSaveCode: boolean;
  setAutoSaveCode: (auto: boolean) => void;
  showLineNumbers: boolean;
  setShowLineNumbers: (show: boolean) => void;
  enableCodeFormatting: boolean;
  setEnableCodeFormatting: (enable: boolean) => void;
  saveSettings: () => void;
}

export function SettingsSheet({
  autoSaveCode,
  setAutoSaveCode,
  showLineNumbers,
  setShowLineNumbers,
  enableCodeFormatting,
  setEnableCodeFormatting,
  saveSettings,
}: SettingsSheetProps) {
  return (
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
                      <SelectItem value="tsx">TSX</SelectItem>
                      <SelectItem value="jsx">JSX</SelectItem>
                      <SelectItem value="js">JavaScript</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-xs text-muted-foreground">Include imports</label>
                  <Button variant="outline" size="sm">
                    ON
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
  );
}
