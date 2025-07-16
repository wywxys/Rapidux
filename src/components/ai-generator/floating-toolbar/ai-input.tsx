import { Search, Image, Download, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AiMode } from '../types';

interface AIInputProps {
  showTopBar: boolean;
  prompt: string;
  setPrompt: (prompt: string) => void;
  aiMode: AiMode;
  setAiMode: (mode: AiMode) => void;
  isGenerating: boolean;
  handleGenerate: () => Promise<void>;
}

export function AIInput({
  showTopBar,
  prompt,
  setPrompt,
  aiMode,
  setAiMode,
  isGenerating,
  handleGenerate,
}: AIInputProps) {
  if (!showTopBar) return null;

  return (
    <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50">
      <div className="w-[600px] max-w-[85vw] shadow-xl border bg-card/95 backdrop-blur-md rounded-lg p-4">
        <div className="space-y-3">
          {/* Input Field */}
          <div className="flex items-center space-x-3">
            <div className="flex-1 relative">
              <Input
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
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
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
              {/* Send Button */}
              <Button
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
  );
}
