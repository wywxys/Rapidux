import { cn } from '@/lib/utils';

// 样式生成工具
export const styleHelpers = {
  // 生成响应式间距
  spacing: (size: 'xs' | 'sm' | 'md' | 'lg' | 'xl') => {
    const spacingMap = {
      xs: 'p-1 gap-1',
      sm: 'p-2 gap-2', 
      md: 'p-3 gap-3',
      lg: 'p-4 gap-4',
      xl: 'p-6 gap-6'
    };
    return spacingMap[size];
  },

  // 生成Flex布局类
  flex: (direction: 'row' | 'col', align: 'start' | 'center' | 'end' = 'center') => {
    return cn(
      'flex',
      direction === 'col' ? 'flex-col' : 'flex-row',
      `items-${align}`,
      `justify-${align}`
    );
  },

  // 生成网格布局类
  grid: (cols: number, gap: 'sm' | 'md' | 'lg' = 'md') => {
    const gapMap = { sm: 'gap-2', md: 'gap-4', lg: 'gap-6' };
    return cn('grid', `grid-cols-${cols}`, gapMap[gap]);
  },

  // 生成按钮变体样式
  buttonVariant: (variant: 'primary' | 'secondary' | 'ghost' | 'destructive') => {
    const variants = {
      primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      ghost: 'hover:bg-accent hover:text-accent-foreground',
      destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
    };
    return variants[variant];
  }
};

// 颜色工具
export const colorHelpers = {
  // 获取主题色
  primary: (opacity?: number) => 
    opacity ? `hsl(var(--primary) / ${opacity})` : 'hsl(var(--primary))',
  
  // 获取状态色
  status: (status: 'success' | 'warning' | 'error' | 'info') => {
    const statusColors = {
      success: 'text-green-600 bg-green-100',
      warning: 'text-yellow-600 bg-yellow-100', 
      error: 'text-red-600 bg-red-100',
      info: 'text-blue-600 bg-blue-100'
    };
    return statusColors[status];
  }
};

// 字符串工具
export const stringHelpers = {
  // 获取用户名缩写
  getInitials: (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  },

  // 截断文本
  truncate: (text: string, length: number) => {
    return text.length > length ? `${text.slice(0, length)}...` : text;
  },

  // 格式化文件大小
  formatFileSize: (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Byte';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  }
};
