import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';

interface GlassPanelProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassPanel({ children, className, hover = true, ...props }: GlassPanelProps) {
  return (
    <div
      className={cn(
        "glass-effect rounded-xl p-6",
        hover && "transition-all duration-300 hover:bg-opacity-10",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
