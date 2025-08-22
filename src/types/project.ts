// 实际项目数据类型定义
export interface Project {
  id: string;
  name: string;
  description: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  path: string; // 项目在文件系统中的路径
  status: 'active' | 'archived';
  framework: 'nextjs' | 'react' | 'vue';
  type: 'component' | 'page' | 'layout';
  // 项目文件结构
  files: ProjectFile[];
}

export interface ProjectFile {
  id: string;
  name: string;
  path: string;
  content: string;
  type: 'tsx' | 'css' | 'json' | 'md';
  isGenerated: boolean;
  lastModified: Date;
}

// 样例项目数据
export const sampleProjects: Project[] = [
  {
    id: 'sample-1',
    name: 'AI Component Library',
    description: 'A collection of AI-generated React components with interactive demos',
    userId: '1', // Admin User
    createdAt: new Date('2024-12-01'),
    updatedAt: new Date('2024-12-01'),
    path: '/projects/ai-component-library',
    status: 'active',
    framework: 'react',
    type: 'component',
    files: [
      {
        id: 'file-1',
        name: 'button.tsx',
        path: 'src/components/generated/button.tsx',
        content: `// AI Generated Button Component Example
'use client';

import { useState } from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
}

export function GeneratedButton({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  onClick,
  disabled = false 
}: ButtonProps) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    if (!disabled && onClick) {
      setIsClicked(true);
      onClick();
      setTimeout(() => setIsClicked(false), 150);
    }
  };

  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 active:bg-blue-800',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500 active:bg-gray-800',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500 active:bg-blue-100'
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  const disabledClasses = 'opacity-50 cursor-not-allowed';
  const clickedClasses = 'transform scale-95';

  const className = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    disabled && disabledClasses,
    isClicked && !disabled && clickedClasses
  ].filter(Boolean).join(' ');

  return (
    <button
      className={className}
      onClick={handleClick}
      disabled={disabled}
      type="button"
    >
      {children}
    </button>
  );
}`,
        type: 'tsx',
        isGenerated: true,
        lastModified: new Date('2024-12-01')
      },
      {
        id: 'file-2',
        name: 'card.tsx',
        path: 'src/components/generated/card.tsx',
        content: `// AI Generated Card Component Example
'use client';

interface CardProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'outlined';
}

export function GeneratedCard({ 
  title, 
  description, 
  children, 
  className = '',
  variant = 'default'
}: CardProps) {
  const baseClasses = 'rounded-lg p-6 transition-all duration-200';
  
  const variantClasses = {
    default: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
    elevated: 'bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl',
    outlined: 'border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400'
  };

  const cardClassName = [
    baseClasses,
    variantClasses[variant],
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClassName}>
      {title && (
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {title}
        </h3>
      )}
      {description && (
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {description}
        </p>
      )}
      {children}
    </div>
  );
}`,
        type: 'tsx',
        isGenerated: true,
        lastModified: new Date('2024-12-01')
      },
      {
        id: 'file-3',
        name: 'demo.tsx',
        path: 'src/app/demo/page.tsx',
        content: `'use client';

import { GeneratedButton, GeneratedCard } from '@/components/generated';
import { useState } from 'react';

export default function DemoPage() {
  const [clickCount, setClickCount] = useState(0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            AI Generated Components Demo
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Examples of components generated by AI and rendered in real-time
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <GeneratedCard
            title="Generated Button Component"
            description="Interactive buttons with different variants and sizes"
            variant="elevated"
          >
            <div className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <GeneratedButton 
                  variant="primary" 
                  size="sm"
                  onClick={() => setClickCount(c => c + 1)}
                >
                  Primary Small
                </GeneratedButton>
                <GeneratedButton 
                  variant="secondary" 
                  size="md"
                  onClick={() => setClickCount(c => c + 1)}
                >
                  Secondary Medium
                </GeneratedButton>
                <GeneratedButton 
                  variant="outline" 
                  size="lg"
                  onClick={() => setClickCount(c => c + 1)}
                >
                  Outline Large
                </GeneratedButton>
              </div>
              
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Click count: <span className="font-semibold">{clickCount}</span>
                </p>
              </div>
            </div>
          </GeneratedCard>
        </div>
      </div>
    </div>
  );
}`,
        type: 'tsx',
        isGenerated: false,
        lastModified: new Date('2024-12-01')
      }
    ]
  }
];
