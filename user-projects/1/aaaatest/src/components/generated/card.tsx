// AI Generated Card Component Example
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
}
