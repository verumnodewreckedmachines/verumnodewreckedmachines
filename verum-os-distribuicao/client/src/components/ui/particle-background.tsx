import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  left: string;
  size: string;
  delay: string;
}

export function ParticleBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const newParticles: Particle[] = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 8 + 4}px`,
      delay: `${Math.random() * 8}s`,
    }));
    
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle absolute rounded-full"
          style={{
            left: particle.left,
            width: particle.size,
            height: particle.size,
            animationDelay: particle.delay,
          }}
        />
      ))}
    </div>
  );
}
