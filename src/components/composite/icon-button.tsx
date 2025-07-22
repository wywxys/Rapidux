'use client';

import { Button, buttonVariants } from '@/components/ui/button';
import { VariantProps } from 'class-variance-authority';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import React from 'react';

interface IconButtonProps extends 
  React.ComponentProps<"button">,
  VariantProps<typeof buttonVariants> {
  icon: LucideIcon;
  iconSize?: string;
  tooltip?: string;
}

export function IconButton({ 
  icon: Icon, 
  iconSize = "h-5 w-5",
  className,
  ...props 
}: IconButtonProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("h-9 w-9", className)}
      {...props}
    >
      <Icon className={iconSize} />
    </Button>
  );
}
