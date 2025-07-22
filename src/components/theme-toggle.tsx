'use client';

import * as React from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { DropdownButton } from '@/components/composite';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/theme-provider';
import { MenuItem } from '@/types/common';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const getThemeIcon = () => {
    switch (theme) {
      case 'dark':
        return Moon;
      case 'light':
        return Sun;
      default:
        return Monitor;
    }
  };

  const themeMenuItems: MenuItem[] = [
    {
      label: 'Light',
      icon: Sun,
      onClick: () => setTheme('light')
    },
    {
      label: 'Dark', 
      icon: Moon,
      onClick: () => setTheme('dark')
    },
    {
      label: 'System',
      icon: Monitor,
      onClick: () => setTheme('system')
    }
  ];

  const trigger = (
    <Button variant="outline" size="icon">
      {React.createElement(getThemeIcon(), { 
        className: "h-[1.2rem] w-[1.2rem] transition-all" 
      })}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );

  return (
    <DropdownButton 
      trigger={trigger}
      items={themeMenuItems}
      align="end"
    />
  );
}
