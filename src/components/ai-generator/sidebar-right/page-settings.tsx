"use client";

import { Code, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useState } from 'react';
import { CodeViewerDialog } from '../dialogs/code-viewer-dialog';
import { generateTypographyCSS } from '../utils/typography-generator';
import { generateColorThemeCSS } from '../utils/style-generator';

export function PageSettingsPanel() {
  const [showTypographyDialog, setShowTypographyDialog] = useState(false);
  const [showColorDialog, setShowColorDialog] = useState(false);
  const [headingFont, setHeadingFont] = useState('Familjen Grotesk');
  const [bodyFont, setBodyFont] = useState('Familjen Grotesk');

  const handleViewTypographyCode = () => {
    setShowTypographyDialog(true);
  };

  const handleViewColorCode = () => {
    setShowColorDialog(true);
  };

  const typographyCSS = generateTypographyCSS({
    headingFont,
    bodyFont
  });

  const colorThemeCSS = generateColorThemeCSS({
    background: 'hsl(0, 0%, 0%)',
    foreground: 'hsl(0, 0%, 100%)',
    primary: 'hsl(270, 95%, 75%)',
    primaryForeground: 'hsl(0, 0%, 100%)',
    secondary: 'hsl(0, 0%, 0%)',
    secondaryForeground: 'hsl(0, 0%, 100%)',
    muted: 'hsl(0, 0%, 0%)',
    mutedForeground: 'hsl(0, 0%, 45%)'
  });

  return (
    <div className="space-y-6">
      {/* Fonts Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold">Typography</h3>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 w-6 p-0"
                onClick={handleViewTypographyCode}
              >
                <Code className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>View typography CSS code</p>
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
            <Select value={headingFont} onValueChange={setHeadingFont}>
              <SelectTrigger className="h-10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Familjen Grotesk">Familjen Grotesk</SelectItem>
                <SelectItem value="Inter">Inter</SelectItem>
                <SelectItem value="Roboto">Roboto</SelectItem>
                <SelectItem value="Arial">Arial</SelectItem>
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
            <Select value={bodyFont} onValueChange={setBodyFont}>
              <SelectTrigger className="h-10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Familjen Grotesk">Familjen Grotesk</SelectItem>
                <SelectItem value="Inter">Inter</SelectItem>
                <SelectItem value="Roboto">Roboto</SelectItem>
                <SelectItem value="Arial">Arial</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Border Radius Section */}
      <div>
        <h3 className="text-base font-semibold mb-4">Border Radius</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-4">
            <Slider
              value={[0.67]}
              max={2}
              min={0}
              step={0.01}
              className="flex-1"
            />
            <span className="text-sm text-muted-foreground w-12 text-right">0.67rem</span>
          </div>
        </div>
      </div>

      {/* Colors Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <h3 className="text-base font-semibold">Color Theme</h3>
            <div className="w-4 h-4 rounded-full bg-muted flex items-center justify-center">
              <span className="text-xs text-muted-foreground">i</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <Palette className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Color picker</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-6 w-6 p-0"
                  onClick={handleViewColorCode}
                >
                  <Code className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View color CSS code</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
        
        <div className="space-y-4">
          {/* Background */}
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 rounded-full bg-black"></div>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Background</span>
                <code className="text-xs bg-muted px-1 py-0.5 rounded">hsl(0, 0%, 0%)</code>
              </div>
            </div>
          </div>

          {/* Foreground */}
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 rounded-full bg-white border border-border"></div>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Foreground</span>
                <code className="text-xs bg-muted px-1 py-0.5 rounded">hsl(0, 0%, 100%)</code>
              </div>
            </div>
          </div>

          {/* Primary */}
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 rounded-full bg-purple-500"></div>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Primary</span>
                <code className="text-xs bg-muted px-1 py-0.5 rounded">hsl(270, 95%, 75%)</code>
              </div>
            </div>
          </div>

          {/* Primary Foreground */}
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 rounded-full bg-white border border-border"></div>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Primary Foreground</span>
                <code className="text-xs bg-muted px-1 py-0.5 rounded">hsl(0, 0%, 100%)</code>
              </div>
            </div>
          </div>

          {/* Secondary */}
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 rounded-full bg-black"></div>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Secondary</span>
                <code className="text-xs bg-muted px-1 py-0.5 rounded">hsl(0, 0%, 0%)</code>
              </div>
            </div>
          </div>

          {/* Secondary Foreground */}
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 rounded-full bg-white border border-border"></div>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Secondary Foreground</span>
                <code className="text-xs bg-muted px-1 py-0.5 rounded">hsl(0, 0%, 100%)</code>
              </div>
            </div>
          </div>

          {/* Muted */}
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 rounded-full bg-black"></div>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Muted</span>
                <code className="text-xs bg-muted px-1 py-0.5 rounded">hsl(0, 0%, 0%)</code>
              </div>
            </div>
          </div>

          {/* Muted Foreground */}
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 rounded-full bg-gray-500"></div>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Muted Foreground</span>
                <code className="text-xs bg-muted px-1 py-0.5 rounded">hsl(0, 0%, 45%)</code>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Typography CSS Code Dialog */}
      <CodeViewerDialog
        open={showTypographyDialog}
        onOpenChange={setShowTypographyDialog}
        title="Typography CSS Code"
        code={typographyCSS}
        language="css"
      />

      {/* Color Theme CSS Code Dialog */}
      <CodeViewerDialog
        open={showColorDialog}
        onOpenChange={setShowColorDialog}
        title="Color Theme CSS Code"
        code={colorThemeCSS}
        language="css"
      />
    </div>
  );
}
