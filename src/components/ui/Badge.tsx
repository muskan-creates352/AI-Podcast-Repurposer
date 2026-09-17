import { cn } from "@/lib/utils";

export function Badge({ className, variant = 'default', children }: { className?: string, variant?: 'default' | 'success' | 'warning' | 'neutral' | 'outline', children: React.ReactNode }) {
  return (
    <div className={cn(
      "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium transition-colors tracking-wide uppercase",
      {
        'bg-zinc-100 text-zinc-900': variant === 'default',
        'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]': variant === 'success',
        'bg-amber-500/10 text-amber-400 border border-amber-500/20': variant === 'warning',
        'bg-zinc-800 text-zinc-300': variant === 'neutral',
        'border border-zinc-700 text-zinc-400': variant === 'outline',
      },
      className
    )}>
      {children}
    </div>
  );
}
