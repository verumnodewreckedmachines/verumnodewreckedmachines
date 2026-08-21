import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation, useMotionValue, useTransform } from 'framer-motion';
import { Sparkles, Zap, Star, Atom } from 'lucide-react';

interface TransformEffectProps {
  children: React.ReactNode;
  effect?: 'holographic' | 'quantum' | 'neural' | 'matrix' | 'pulse' | 'morph';
  trigger?: 'hover' | 'click' | 'auto' | 'scroll';
  intensity?: 'low' | 'medium' | 'high' | 'extreme';
  duration?: number;
  delay?: number;
  className?: string;
}

export function DynamicTransform({
  children,
  effect = 'holographic',
  trigger = 'hover',
  intensity = 'medium',
  duration = 0.6,
  delay = 0,
  className = ''
}: TransformEffectProps) {
  const [isActive, setIsActive] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; opacity: number }>>([]);
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Intensity configurations
  const intensityConfig = {
    low: { scale: 1.02, rotate: 0.5, blur: 1, particles: 3 },
    medium: { scale: 1.05, rotate: 1, blur: 2, particles: 8 },
    high: { scale: 1.1, rotate: 2, blur: 3, particles: 15 },
    extreme: { scale: 1.15, rotate: 3, blur: 4, particles: 25 }
  };

  const config = intensityConfig[intensity];

  // Auto-trigger effect
  useEffect(() => {
    if (trigger === 'auto') {
      const interval = setInterval(() => {
        setIsActive(true);
        setTimeout(() => setIsActive(false), duration * 1000);
      }, 3000 + Math.random() * 2000);
      return () => clearInterval(interval);
    }
  }, [trigger, duration]);

  // Scroll-based trigger
  useEffect(() => {
    if (trigger === 'scroll') {
      const handleScroll = () => {
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
          setIsActive(isVisible);
        }
      };
      
      window.addEventListener('scroll', handleScroll);
      handleScroll();
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [trigger]);

  // Generate particles for effects
  const generateParticles = () => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const newParticles = Array.from({ length: config.particles }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * rect.width,
      y: Math.random() * rect.height,
      opacity: Math.random()
    }));
    
    setParticles(newParticles);
    setTimeout(() => setParticles([]), duration * 1000);
  };

  const handleInteraction = () => {
    if (trigger === 'hover' || trigger === 'click') {
      setIsActive(true);
      generateParticles();
    }
  };

  const handleMouseLeave = () => {
    if (trigger === 'hover') {
      setIsActive(false);
    }
  };

  const handleClick = () => {
    if (trigger === 'click') {
      setIsActive(!isActive);
      generateParticles();
    }
  };

  // Mouse tracking for advanced effects
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  // Effect variants
  const getEffectVariants = () => {
    const baseVariants = {
      initial: { scale: 1, rotate: 0, filter: 'blur(0px)' },
      active: {
        scale: config.scale,
        rotate: config.rotate,
        filter: `blur(${config.blur}px)`,
        transition: { duration, delay }
      }
    };

    switch (effect) {
      case 'holographic':
        return {
          ...baseVariants,
          active: {
            ...baseVariants.active,
            background: [
              'linear-gradient(45deg, rgba(0,255,255,0.1), rgba(255,0,255,0.1))',
              'linear-gradient(45deg, rgba(255,0,255,0.1), rgba(0,255,0,0.1))',
              'linear-gradient(45deg, rgba(0,255,0,0.1), rgba(255,255,0,0.1))'
            ],
            boxShadow: [
              '0 0 20px rgba(0,255,255,0.5)',
              '0 0 30px rgba(255,0,255,0.5)',
              '0 0 20px rgba(0,255,255,0.5)'
            ],
            transition: { duration, repeat: Infinity, repeatType: 'reverse' as const }
          }
        };

      case 'quantum':
        return {
          ...baseVariants,
          active: {
            ...baseVariants.active,
            scale: [1, config.scale, 0.95, config.scale],
            rotate: [0, config.rotate, -config.rotate, 0],
            filter: [
              'blur(0px) hue-rotate(0deg)',
              `blur(${config.blur}px) hue-rotate(180deg)`,
              'blur(0px) hue-rotate(360deg)'
            ],
            transition: { duration: duration * 1.5, repeat: Infinity }
          }
        };

      case 'neural':
        return {
          ...baseVariants,
          active: {
            ...baseVariants.active,
            background: 'linear-gradient(45deg, rgba(0,100,255,0.1), rgba(100,0,255,0.1))',
            borderColor: ['rgba(0,100,255,0.5)', 'rgba(100,0,255,0.5)', 'rgba(0,100,255,0.5)'],
            boxShadow: '0 0 30px rgba(0,100,255,0.3), inset 0 0 30px rgba(100,0,255,0.1)',
            transition: { duration, repeat: Infinity, repeatType: 'mirror' as const }
          }
        };

      case 'matrix':
        return {
          ...baseVariants,
          active: {
            ...baseVariants.active,
            background: 'linear-gradient(90deg, rgba(0,255,0,0.1), transparent, rgba(0,255,0,0.1))',
            color: ['#00ff00', '#ffffff', '#00ff00'],
            textShadow: '0 0 10px #00ff00',
            transition: { duration: duration * 0.5, repeat: Infinity }
          }
        };

      case 'pulse':
        return {
          ...baseVariants,
          active: {
            scale: [1, config.scale, 1],
            opacity: [1, 0.7, 1],
            boxShadow: [
              '0 0 0 0 rgba(255,255,255,0.7)',
              '0 0 0 10px rgba(255,255,255,0)',
              '0 0 0 0 rgba(255,255,255,0)'
            ],
            transition: { duration, repeat: Infinity }
          }
        };

      case 'morph':
        return {
          ...baseVariants,
          active: {
            borderRadius: ['8px', '50%', '0px', '8px'],
            rotate: [0, 180, 360],
            scale: [1, config.scale, 0.9, 1],
            background: [
              'linear-gradient(0deg, rgba(255,0,0,0.1), rgba(0,0,255,0.1))',
              'linear-gradient(90deg, rgba(0,255,0,0.1), rgba(255,255,0,0.1))',
              'linear-gradient(180deg, rgba(255,0,255,0.1), rgba(0,255,255,0.1))',
              'linear-gradient(270deg, rgba(255,255,255,0.1), rgba(0,0,0,0.1))'
            ],
            transition: { duration: duration * 2, repeat: Infinity }
          }
        };

      default:
        return baseVariants;
    }
  };

  const variants = getEffectVariants();

  return (
    <motion.div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      variants={variants}
      initial="initial"
      animate={isActive ? "active" : "initial"}
      onMouseEnter={trigger === 'hover' ? handleInteraction : undefined}
      onMouseLeave={trigger === 'hover' ? handleMouseLeave : undefined}
      onClick={trigger === 'click' ? handleClick : undefined}
      onMouseMove={handleMouseMove}
      style={{
        transformOrigin: 'center',
        backfaceVisibility: 'hidden',
        perspective: '1000px'
      }}
    >
      {children}

      {/* Particle Effects */}
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute pointer-events-none"
            initial={{ 
              x: particle.x, 
              y: particle.y, 
              opacity: particle.opacity, 
              scale: 0 
            }}
            animate={{ 
              x: particle.x + (Math.random() - 0.5) * 100,
              y: particle.y - Math.random() * 100,
              opacity: 0,
              scale: 1
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: duration, ease: "easeOut" }}
          >
            {effect === 'holographic' && <Sparkles className="w-3 h-3 text-cyan-400" />}
            {effect === 'quantum' && <Atom className="w-3 h-3 text-purple-400" />}
            {effect === 'neural' && <Zap className="w-3 h-3 text-blue-400" />}
            {(effect === 'matrix' || effect === 'pulse' || effect === 'morph') && 
             <Star className="w-3 h-3 text-green-400" />}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Overlay Effects */}
      {isActive && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: duration * 0.3 }}
        >
          {effect === 'holographic' && (
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 animate-pulse" />
          )}
          {effect === 'quantum' && (
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-indigo-500/5" />
          )}
          {effect === 'neural' && (
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/5 via-indigo-600/5 to-purple-600/5" />
          )}
          {effect === 'matrix' && (
            <div className="absolute inset-0 bg-gradient-to-b from-green-500/5 to-transparent" />
          )}
        </motion.div>
      )}
    </motion.div>
  );
}

// Preset effect components for easy use
export const HolographicTransform = ({ children, ...props }: Omit<TransformEffectProps, 'effect'>) => (
  <DynamicTransform effect="holographic" {...props}>{children}</DynamicTransform>
);

export const QuantumTransform = ({ children, ...props }: Omit<TransformEffectProps, 'effect'>) => (
  <DynamicTransform effect="quantum" {...props}>{children}</DynamicTransform>
);

export const NeuralTransform = ({ children, ...props }: Omit<TransformEffectProps, 'effect'>) => (
  <DynamicTransform effect="neural" {...props}>{children}</DynamicTransform>
);

export const MatrixTransform = ({ children, ...props }: Omit<TransformEffectProps, 'effect'>) => (
  <DynamicTransform effect="matrix" {...props}>{children}</DynamicTransform>
);

export const PulseTransform = ({ children, ...props }: Omit<TransformEffectProps, 'effect'>) => (
  <DynamicTransform effect="pulse" {...props}>{children}</DynamicTransform>
);

export const MorphTransform = ({ children, ...props }: Omit<TransformEffectProps, 'effect'>) => (
  <DynamicTransform effect="morph" {...props}>{children}</DynamicTransform>
);