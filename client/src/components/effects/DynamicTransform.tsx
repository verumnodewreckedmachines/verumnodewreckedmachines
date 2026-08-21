import { motion, AnimatePresence } from 'framer-motion';
import { useDynamicEffects, EffectConfig } from '@/hooks/use-dynamic-effects';
import { cn } from '@/lib/utils';

interface DynamicTransformProps {
  children: React.ReactNode;
  effect?: Partial<EffectConfig>;
  className?: string;
  disabled?: boolean;
}

export function DynamicTransform({ 
  children, 
  effect = {}, 
  className,
  disabled = false 
}: DynamicTransformProps) {
  const { transformState, handlers, effectClasses } = useDynamicEffects(effect);

  if (disabled) {
    return <div className={className}>{children}</div>;
  }

  const getMotionVariants = () => {
    const { effectType, intensity } = transformState;
    
    const baseScale = {
      low: 1.05,
      medium: 1.1,
      high: 1.15,
      extreme: 1.25
    }[intensity];

    const variants = {
      holographic: {
        initial: { scale: 1, rotateY: 0, filter: 'hue-rotate(0deg)' },
        active: { 
          scale: baseScale, 
          rotateY: [0, 5, -5, 0], 
          filter: ['hue-rotate(0deg)', 'hue-rotate(180deg)', 'hue-rotate(360deg)'],
          transition: { duration: 0.8, ease: 'easeInOut' }
        }
      },
      quantum: {
        initial: { scale: 1, y: 0, opacity: 1 },
        active: { 
          scale: [1, baseScale, 1], 
          y: [0, -20, 0], 
          opacity: [1, 0.8, 1],
          transition: { duration: 0.6, ease: 'easeInOut' }
        }
      },
      neural: {
        initial: { scale: 1, rotate: 0, brightness: 1 },
        active: { 
          scale: baseScale, 
          rotate: [0, 5, -5, 0], 
          filter: ['brightness(1)', 'brightness(1.5)', 'brightness(1)'],
          transition: { duration: 0.4, ease: 'easeInOut' }
        }
      },
      matrix: {
        initial: { scale: 1, skewX: 0, opacity: 1 },
        active: { 
          scale: baseScale, 
          skewX: [0, 2, -2, 0], 
          opacity: [1, 0.7, 1],
          transition: { duration: 0.8, ease: 'easeInOut' }
        }
      },
      pulse: {
        initial: { scale: 1, opacity: 1 },
        active: { 
          scale: [1, baseScale, 1, baseScale, 1], 
          opacity: [1, 0.6, 1, 0.6, 1],
          transition: { duration: 0.6, ease: 'easeInOut' }
        }
      },
      morph: {
        initial: { scale: 1, rotateX: 0, rotateY: 0 },
        active: { 
          scale: baseScale, 
          rotateX: [0, 180, 0], 
          rotateY: [0, 180, 0],
          transition: { duration: 1, ease: 'easeInOut' }
        }
      }
    };

    return variants[effectType] || variants.holographic;
  };

  const ParticleSystem = () => (
    <AnimatePresence>
      {transformState.particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute pointer-events-none text-lg z-10"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            color: particle.color
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: particle.life, 
            scale: [0, 1, 0],
            x: particle.vx * 20,
            y: particle.vy * 20
          }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.5 }}
        >
          {particle.icon}
        </motion.div>
      ))}
    </AnimatePresence>
  );

  const motionVariants = getMotionVariants();

  return (
    <motion.div
      className={cn('relative', effectClasses, className)}
      variants={motionVariants}
      initial="initial"
      animate={transformState.isActive ? "active" : "initial"}
      {...handlers}
    >
      {children}
      <ParticleSystem />
    </motion.div>
  );
}