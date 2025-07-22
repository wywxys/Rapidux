import { LucideIcon } from 'lucide-react';

// 通用UI类型
export interface BaseComponent {
  className?: string;
  children?: React.ReactNode;
}

export interface IconComponent extends BaseComponent {
  icon: LucideIcon;
  iconSize?: 'sm' | 'md' | 'lg';
}

// 表单相关类型
export interface FormFieldProps extends BaseComponent {
  label?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
}

// 菜单项类型
export interface MenuItem {
  label: string;
  icon?: LucideIcon;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  variant?: 'default' | 'destructive';
  keyboard?: string;
}

// 用户相关类型
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: 'admin' | 'user';
}

// 主题相关类型
export type Theme = 'light' | 'dark' | 'system';
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type Variant = 'default' | 'primary' | 'secondary' | 'destructive' | 'ghost';

// 状态类型
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';
export type ViewMode = 'preview' | 'code' | 'split';

// 响应式设计类型
export interface ResponsiveProps {
  mobile?: boolean;
  tablet?: boolean;
  desktop?: boolean;
}
