import React from 'react';
import { cn } from '@/utils/cn';

export const Button = React.forwardRef(({ className, variant = 'primary', ...props }, ref) => {
  const variants = {
    primary: 'bg-black text-white hover:bg-gray-800',
    outline: 'border border-black text-black hover:bg-gray-50',
    ghost: 'text-gray-500 hover:text-black',
  };

  return (
    <button
      ref={ref}
      className={cn(
        'px-6 py-3 rounded-full font-bold uppercase tracking-widest transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none',
        variants[variant],
        className
      )}
      {...props}
    />
  );
});

Button.displayName = 'Button';
