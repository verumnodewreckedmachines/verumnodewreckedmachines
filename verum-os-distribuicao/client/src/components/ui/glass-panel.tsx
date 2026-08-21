import { cn } from '@/lib/utils';

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassPanel({ children, className, hover = true }: GlassPanelProps) {
  return (
    <div
      className={cn(
        "glass-effect rounded-xl p-6",
        hover && "transition-all duration-300 hover:bg-opacity-10",
        className
      )}
    >
      {children}
    </div>
  );
}
