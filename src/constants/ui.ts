// 常用的UI常量
export const UI_CONSTANTS = {
  SIZES: {
    ICON: {
      sm: 'h-4 w-4',
      md: 'h-5 w-5', 
      lg: 'h-6 w-6'
    },
    BUTTON: {
      sm: 'h-8',
      md: 'h-9',
      lg: 'h-10'
    },
    AVATAR: {
      sm: 'h-6 w-6',
      md: 'h-8 w-8',
      lg: 'h-10 w-10'
    }
  },
  SPACING: {
    xs: 'space-x-1 space-y-1',
    sm: 'space-x-2 space-y-2',
    md: 'space-x-3 space-y-3',
    lg: 'space-x-4 space-y-4'
  },
  RADIUS: {
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full'
  }
} as const;

// 动画常量
export const ANIMATIONS = {
  DURATION: {
    fast: 150,
    normal: 200,
    slow: 300
  },
  EASING: {
    easeOut: 'ease-out',
    easeIn: 'ease-in',
    easeInOut: 'ease-in-out'
  }
} as const;

// 键盘快捷键
export const KEYBOARD_SHORTCUTS = {
  GENERATE: 'ctrl+enter',
  SAVE: 'ctrl+s',
  TOGGLE_SIDEBAR: 'ctrl+b',
  SETTINGS: 'ctrl+comma',
  HELP: 'ctrl+?'
} as const;
