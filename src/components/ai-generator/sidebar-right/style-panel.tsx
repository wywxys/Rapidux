"use client";

import { 
  Code, 
  Palette,
  Lock,
  ChevronDown,
  RotateCcw,
  ArrowUpDown,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useState } from 'react';
import { LayoutType, FlexDirection, COLOR_PALETTE } from '../types';
import { CodeViewerDialog } from '../dialogs/code-viewer-dialog';
import { generateStyleCSS } from '../utils/style-generator';

interface StylePanelProps {
  layoutType: LayoutType;
  setLayoutType: (type: LayoutType) => void;
  flexDirection: FlexDirection;
  setFlexDirection: (direction: FlexDirection) => void;
  fontSize: string;
  setFontSize: (size: string) => void;
  borderRadius: number[];
  setBorderRadius: (radius: number[]) => void;
}

export function StylePanel({
  layoutType,
  setLayoutType,
  flexDirection,
  setFlexDirection,
  fontSize,
  setFontSize,
  borderRadius,
  setBorderRadius,
}: StylePanelProps) {
  const [showStyleDialog, setShowStyleDialog] = useState(false);

  const handleViewStyleCode = () => {
    setShowStyleDialog(true);
  };

  const styleCSS = generateStyleCSS({
    layoutType,
    flexDirection,
    fontSize,
    borderRadius
  });

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {/* Tailwind Classes */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">Tailwind Classes</label>
            <div className="flex items-center space-x-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-6 w-6 p-0"
                    onClick={handleViewStyleCode}
                  >
                    <Code className="h-3 w-3" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View CSS code</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <Plus className="h-3 w-3" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add class</p>
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
              {COLOR_PALETTE.map((color, index) => (
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

      {/* Style CSS Code Dialog */}
      <CodeViewerDialog
        open={showStyleDialog}
        onOpenChange={setShowStyleDialog}
        title="Style CSS Code"
        code={styleCSS}
        language="css"
      />
    </div>
  );
}
