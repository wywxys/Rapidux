'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { LucideIcon, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import React from 'react';

interface DropdownButtonItem {
  label: string;
  icon?: LucideIcon;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  variant?: 'default' | 'destructive';
  separator?: boolean;
}

interface DropdownButtonProps {
  trigger: React.ReactNode;
  items: DropdownButtonItem[];
  align?: 'start' | 'center' | 'end';
  className?: string;
}

export function DropdownButton({ 
  trigger, 
  items, 
  align = 'end',
  className 
}: DropdownButtonProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {trigger}
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} className={cn("w-56", className)}>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {item.separator && <DropdownMenuSeparator />}
            <DropdownMenuItem 
              onClick={item.onClick}
              disabled={item.disabled}
              className={item.variant === 'destructive' ? 'text-red-600 focus:text-red-600' : ''}
            >
              {item.icon && <item.icon className="mr-2 h-4 w-4" />}
              <span>{item.label}</span>
            </DropdownMenuItem>
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
