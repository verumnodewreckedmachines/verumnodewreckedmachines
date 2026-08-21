import { cn } from '@/lib/utils';

interface HolographicBorderProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function HolographicBorder({ 
  children, 
  className,
  size = 'md' 
}: HolographicBorderProps) {
  const sizeClasses = {
    sm: 'p-0.5',
    md: 'p-1',
    lg: 'p-1.5'
  };

  return (
    <div className={cn("holographic-border rounded-lg", sizeClasses[size], className)}>
      <div className="w-full h-full bg-verum-dark rounded-lg">
        {children}
      </div>
    </div>
  );
}
