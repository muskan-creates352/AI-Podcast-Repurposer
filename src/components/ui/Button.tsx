import { cn } from "@/lib/utils";
import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'secondary';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-300 disabled:pointer-events-none disabled:opacity-50",
          {
            'bg-violet-600 text-white hover:bg-violet-500 shadow-sm shadow-violet-900/20': variant === 'default',
            'border border-zinc-800 bg-transparent hover:bg-zinc-800 text-zinc-100 hover:text-zinc-50': variant === 'outline',
            'hover:bg-zinc-800/50 hover:text-zinc-100 text-zinc-400': variant === 'ghost',
            'bg-zinc-800 text-zinc-100 hover:bg-zinc-700': variant === 'secondary',
            'h-9 px-4 py-2': size === 'default',
            'h-8 rounded-md px-3 text-xs': size === 'sm',
            'h-10 rounded-md px-8': size === 'lg',
            'h-9 w-9': size === 'icon',
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
