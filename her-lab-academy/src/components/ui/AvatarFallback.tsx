import React from 'react';

interface AvatarFallbackProps {
  name?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function AvatarFallback({ name, size = 'md', className = '' }: AvatarFallbackProps) {
  const getInitials = (nameStr: string) => {
    if (!nameStr) return '?';
    const parts = nameStr.split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return nameStr.substring(0, 2).toUpperCase();
  };

  const initials = getInitials(name || '');

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-16 h-16 text-xl',
  };

  return (
    <div
      className={`flex items-center justify-center rounded-full bg-[var(--color-primary)] text-white font-medium tracking-wider ${sizeClasses[size]} ${className}`}
    >
      {initials}
    </div>
  );
}
