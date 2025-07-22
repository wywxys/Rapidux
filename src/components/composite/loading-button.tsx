'use client';

import { Button } from '@/components/ui/button';
import { buttonVariants } from '@/components/ui/button';
import { VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import React from 'react';

interface LoadingButtonProps extends 
  React.ComponentProps<"button">,
  VariantProps<typeof buttonVariants> {
  loading?: boolean;
  loadingText?: string;
  children: React.ReactNode;
}

export function LoadingButton({ 
  loading = false,
  loadingText,
  children,
  disabled,
  className,
  ...props 
}: LoadingButtonProps) {
  return (
    <Button
      disabled={disabled || loading}
      className={className}
      {...props}
    >
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {loading ? (loadingText || children) : children}
    </Button>
  );
}
