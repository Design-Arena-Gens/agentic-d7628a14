'use client';

import { ButtonHTMLAttributes } from 'react';
import { cn } from '../lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export function Button({ variant = 'primary', className, ...props }: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-60';

  const variantClasses = {
    primary: 'bg-blue-600 text-white shadow-sm hover:bg-blue-700',
    secondary: 'bg-white text-slate-700 border border-slate-200 hover:border-blue-500 hover:text-blue-600'
  };

  return <button className={cn(baseClasses, variantClasses[variant], className)} {...props} />;
}
