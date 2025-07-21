"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useEffect, useState } from 'react';

interface ShortcutsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// 检测操作系统
const useOperatingSystem = () => {
  const [isMac, setIsMac] = useState(false);
  
  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0);
  }, []);
  
  return isMac;
};

// 获取修饰键显示
const getModifierKey = (isMac: boolean) => ({
  ctrl: isMac ? '⌘' : 'Ctrl',
  alt: isMac ? '⌥' : 'Alt',
  shift: isMac ? '⇧' : 'Shift'
});

const getShortcuts = (modifiers: ReturnType<typeof getModifierKey>) => [
  {
    category: "General",
    items: [
      { keys: [modifiers.ctrl, "S"], description: "Save changes" },
      { keys: [modifiers.ctrl, "Z"], description: "Undo action" },
      { keys: [modifiers.ctrl, "Y"], description: "Redo action" },
      { keys: ["F5"], description: "Refresh page" },
      { keys: [modifiers.ctrl, "I"], description: "Toggle conversation" },
    ]
  },
  {
    category: "Navigation",
    items: [
      { keys: [modifiers.ctrl, ","], description: "Toggle settings" },
      { keys: [modifiers.ctrl, "/"], description: "Toggle shortcuts" },
      { keys: ["Esc"], description: "Close dialogs" },
    ]
  },
  {
    category: "Editing",
    items: [
      { keys: [modifiers.ctrl, "C"], description: "Copy code" },
      { keys: [modifiers.ctrl, "A"], description: "Select all" },
      { keys: ["Del"], description: "Delete selected" },
    ]
  }
];

export function ShortcutsDialog({ open, onOpenChange }: ShortcutsDialogProps) {
  const isMac = useOperatingSystem();
  const modifiers = getModifierKey(isMac);
  const shortcuts = getShortcuts(modifiers);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Keyboard Shortcuts</DialogTitle>
          <DialogDescription>
            Speed up your workflow with these keyboard shortcuts
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {shortcuts.map((category) => (
            <div key={category.category}>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3">
                {category.category}
              </h3>
              <div className="space-y-2">
                {category.items.map((shortcut, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm">{shortcut.description}</span>
                    <div className="flex items-center space-x-1">
                      {shortcut.keys.map((key, keyIndex) => (
                        <div key={keyIndex} className="flex items-center">
                          <kbd className="inline-flex items-center justify-center px-2 py-1 text-xs font-medium text-muted-foreground bg-muted border border-border rounded">
                            {key}
                          </kbd>
                          {keyIndex < shortcut.keys.length - 1 && (
                            <span className="mx-1 text-xs text-muted-foreground">+</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
