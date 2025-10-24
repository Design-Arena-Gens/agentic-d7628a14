'use client';

import { forwardRef } from 'react';
import { cn } from '../lib/utils';

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
};

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, id, className, hint, ...props }, ref) => (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-slate-700">
        {label}
      </label>
      <input
        ref={ref}
        id={id}
        className={cn(
          'w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200',
          className
        )}
        {...props}
      />
      {hint ? <p className="text-xs text-slate-500">{hint}</p> : null}
    </div>
  )
);

InputField.displayName = 'InputField';

export default InputField;
