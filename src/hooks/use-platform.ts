'use client';

import { useState, useEffect } from 'react';

export function usePlatform() {
  const [platform, setPlatform] = useState<'mac' | 'windows' | 'linux' | 'unknown'>('unknown');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userAgent = window.navigator.userAgent.toLowerCase();
      if (userAgent.includes('mac')) {
        setPlatform('mac');
      } else if (userAgent.includes('win')) {
        setPlatform('windows');
      } else if (userAgent.includes('linux')) {
        setPlatform('linux');
      }
    }
  }, []);

  const getKeySymbol = (key: string) => {
    if (platform === 'mac') {
      switch (key) {
        case 'ctrl': return '⌘';
        case 'alt': return '⌥';
        case 'shift': return '⇧';
        default: return key;
      }
    }
    return key;
  };

  return {
    platform,
    isMac: platform === 'mac',
    isWindows: platform === 'windows',
    isLinux: platform === 'linux',
    getKeySymbol
  };
}
