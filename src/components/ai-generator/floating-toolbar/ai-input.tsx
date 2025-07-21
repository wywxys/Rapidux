import { Search, Image, Download, Play, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRef, useState, useEffect } from 'react';
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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<{ file: File; preview: string } | null>(null);
  const [animationClass, setAnimationClass] = useState('');

  // 处理动画状态
  useEffect(() => {
    if (showTopBar) {
      setAnimationClass('ai-input-enter');
    } else {
      setAnimationClass('ai-input-exit');
      // 延迟隐藏组件，让退出动画播放完成
      const timer = setTimeout(() => {
        setAnimationClass('');
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [showTopBar]);

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      // 创建预览 URL
      const previewUrl = URL.createObjectURL(file);
      setSelectedImage({ file, preview: previewUrl });
      console.log('Selected image:', file.name);
    }
  };

  const removeImage = () => {
    if (selectedImage) {
      URL.revokeObjectURL(selectedImage.preview);
      setSelectedImage(null);
    }
    // 清空文件输入
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (!showTopBar && !animationClass.includes('exit')) return null;

  return (
    <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50">
      <div 
        className={`w-[600px] max-w-[85vw] shadow-xl border bg-card/95 backdrop-blur-md rounded-lg p-4 ${animationClass}`}
      >
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
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-1.5 h-7 px-2"
                onClick={handlePhotoClick}
              >
                <Image className="h-3.5 w-3.5" />
                <span className="text-xs">Photo</span>
              </Button>
              
              {/* Hidden File Input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              
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
          
          {/* Image Preview */}
          {selectedImage && (
            <div className="border rounded-md p-2 bg-muted/30">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <img
                    src={selectedImage.preview}
                    alt="Selected image"
                    className="w-16 h-16 object-cover rounded border"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute -top-1 -right-1 h-5 w-5 p-0 bg-background border shadow-sm hover:bg-destructive hover:text-destructive-foreground"
                    onClick={removeImage}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{selectedImage.file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(selectedImage.file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
