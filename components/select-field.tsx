'use client';

import { forwardRef } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { cn } from '../lib/utils';

type SelectFieldProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  hint?: string;
};

const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ label, id, className, hint, children, ...props }, ref) => (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-slate-700">
        {label}
      </label>
      <div className="relative">
        <select
          ref={ref}
          id={id}
          className={cn(
            'w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200',
            className
          )}
          {...props}
        >
          {children}
        </select>
        <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      </div>
      {hint ? <p className="text-xs text-slate-500">{hint}</p> : null}
    </div>
  )
);

SelectField.displayName = 'SelectField';

export default SelectField;
