import { useState, useEffect, useMemo } from 'react';

export interface EffectConfig {
  type: 'holographic' | 'quantum' | 'neural' | 'matrix' | 'pulse' | 'morph';
  trigger: 'hover' | 'click' | 'auto' | 'scroll';
  intensity: 'low' | 'medium' | 'high' | 'extreme';
  duration: number;
  delay?: number;
  particles?: boolean;
}

export interface TransformationState {
  isActive: boolean;
  effectType: EffectConfig['type'];
  intensity: EffectConfig['intensity'];
  particles: ParticleData[];
}

export interface ParticleData {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  icon: string;
  color: string;
}

const DEFAULT_CONFIG: EffectConfig = {
  type: 'holographic',
  trigger: 'hover',
  intensity: 'medium',
  duration: 800,
  delay: 0,
  particles: true
};

export function useDynamicEffects(config: Partial<EffectConfig> = {}) {
  const effectConfig = useMemo(() => ({ ...DEFAULT_CONFIG, ...config }), [config]);
  
  const [transformState, setTransformState] = useState<TransformationState>({
    isActive: false,
    effectType: effectConfig.type,
    intensity: effectConfig.intensity,
    particles: []
  });

  const [autoTrigger, setAutoTrigger] = useState(false);

  // Auto trigger effect
  useEffect(() => {
    if (effectConfig.trigger === 'auto') {
      const interval = setInterval(() => {
        setAutoTrigger(prev => !prev);
      }, effectConfig.duration + (effectConfig.delay || 0) + 2000);
      
      return () => clearInterval(interval);
    }
  }, [effectConfig]);

  // Generate particles based on effect type
  const generateParticles = (type: EffectConfig['type'], intensity: EffectConfig['intensity']): ParticleData[] => {
    if (!effectConfig.particles) return [];

    const particleCount = {
      low: 5,
      medium: 10,
      high: 15,
      extreme: 25
    }[intensity];

    const icons = {
      holographic: ['✨', '🌟', '💫', '⭐'],
      quantum: ['⚛️', '🔬', '🌌', '💠'],
      neural: ['⚡', '🧠', '💡', '🔋'],
      matrix: ['🔢', '💻', '📊', '🔗'],
      pulse: ['💓', '🔥', '💥', '⚡'],
      morph: ['🔄', '🌀', '🔮', '🎭']
    };

    const colors = {
      holographic: ['#00ffff', '#ff00ff', '#ffff00', '#00ff00'],
      quantum: ['#4a90e2', '#7b68ee', '#00bcd4', '#9c27b0'],
      neural: ['#ff4081', '#ff9800', '#ffc107', '#e91e63'],
      matrix: ['#00ff00', '#39ff14', '#00ff41', '#32cd32'],
      pulse: ['#ff1744', '#ff5722', '#ff9800', '#ffeb3b'],
      morph: ['#9c27b0', '#673ab7', '#3f51b5', '#2196f3']
    };

    return Array.from({ length: particleCount }, (_, i) => ({
      id: `particle-${i}-${Date.now()}`,
      x: Math.random() * 100,
      y: Math.random() * 100,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      life: 1,
      maxLife: 1,
      icon: icons[type][Math.floor(Math.random() * icons[type].length)],
      color: colors[type][Math.floor(Math.random() * colors[type].length)]
    }));
  };

  // Trigger effect
  const triggerEffect = () => {
    if (transformState.isActive) return;

    const particles = generateParticles(effectConfig.type, effectConfig.intensity);
    
    setTransformState({
      isActive: true,
      effectType: effectConfig.type,
      intensity: effectConfig.intensity,
      particles
    });

    setTimeout(() => {
      setTransformState(prev => ({ ...prev, isActive: false, particles: [] }));
    }, effectConfig.duration);
  };

  // Update particles animation
  useEffect(() => {
    if (transformState.particles.length === 0) return;

    const interval = setInterval(() => {
      setTransformState(prev => ({
        ...prev,
        particles: prev.particles.map(particle => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
          life: particle.life - 0.02
        })).filter(particle => particle.life > 0)
      }));
    }, 16); // 60fps

    return () => clearInterval(interval);
  }, [transformState.particles.length > 0]);

  // Auto trigger effect
  useEffect(() => {
    if (effectConfig.trigger === 'auto' && autoTrigger) {
      setTimeout(triggerEffect, effectConfig.delay || 0);
    }
  }, [autoTrigger]);

  // Event handlers
  const handlers = {
    onMouseEnter: effectConfig.trigger === 'hover' ? triggerEffect : undefined,
    onClick: effectConfig.trigger === 'click' ? triggerEffect : undefined,
  };

  // CSS classes based on effect type and state
  const getEffectClasses = () => {
    const baseClasses = 'transition-all duration-300 relative overflow-hidden';
    
    if (!transformState.isActive) return baseClasses;

    const effectClasses = {
      holographic: 'animate-pulse bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20',
      quantum: 'animate-bounce bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-purple-500/20',
      neural: 'animate-ping bg-gradient-to-r from-orange-500/20 via-red-500/20 to-pink-500/20',
      matrix: 'animate-pulse bg-gradient-to-r from-green-500/20 via-emerald-500/20 to-lime-500/20',
      pulse: 'animate-ping bg-gradient-to-r from-red-500/20 via-orange-500/20 to-yellow-500/20',
      morph: 'animate-spin bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-cyan-500/20'
    };

    const intensityClasses = {
      low: 'scale-105',
      medium: 'scale-110 rotate-1',
      high: 'scale-115 rotate-2 shadow-lg',
      extreme: 'scale-125 rotate-3 shadow-2xl'
    };

    return `${baseClasses} ${effectClasses[transformState.effectType]} ${intensityClasses[transformState.intensity]}`;
  };

  return {
    transformState,
    triggerEffect,
    handlers,
    effectClasses: getEffectClasses(),
    updateConfig: (newConfig: Partial<EffectConfig>) => {
      Object.assign(effectConfig, newConfig);
    }
  };
}