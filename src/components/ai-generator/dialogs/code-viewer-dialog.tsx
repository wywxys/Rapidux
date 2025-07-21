"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Copy, Check, Code } from 'lucide-react';
import { useState } from 'react';

interface CodeViewerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  code: string;
  language?: string;
  description?: string;
  showIcon?: boolean;
}

export function CodeViewerDialog({
  open,
  onOpenChange,
  title,
  code,
  language = 'css',
  description,
  showIcon = false
}: CodeViewerDialogProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code: ', err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="w-[60svw] max-w-none max-h-[80vh] flex flex-col"
        style={{ 
          width: '60svw',
          maxWidth: 'none',
          maxHeight: '80vh'
        }}
      >
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between pr-6">
            <div className="flex items-center gap-2">
              {showIcon && <Code className="h-5 w-5" />}
              <span>{title}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={copyToClipboard}
              className="flex items-center space-x-2 ml-4"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>Copy</span>
                </>
              )}
            </Button>
          </DialogTitle>
          {description && (
            <DialogDescription>
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <pre className="bg-muted p-4 rounded-md text-sm font-mono whitespace-pre">
              <code className={`language-${language}`}>{code}</code>
            </pre>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
