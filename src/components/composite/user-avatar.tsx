'use client';

import { cn } from '@/lib/utils';

interface UserAvatarProps {
  name?: string;
  email?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'h-6 w-6 text-xs',
  md: 'h-8 w-8 text-xs',
  lg: 'h-10 w-10 text-sm'
};

export function UserAvatar({ 
  name, 
  email, 
  size = 'md', 
  className 
}: UserAvatarProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const displayName = name || email?.split('@')[0] || 'U';
  const initials = getInitials(displayName);

  return (
    <div className={cn(
      "rounded-full bg-primary flex items-center justify-center",
      sizeClasses[size],
      className
    )}>
      <span className="font-medium text-primary-foreground">
        {initials}
      </span>
    </div>
  );
}
