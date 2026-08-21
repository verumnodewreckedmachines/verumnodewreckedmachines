import { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';

export default function Dashboard() {
  const [, navigate] = useLocation();

  const apps = [
    { name: 'Console Claude IA', icon: '🧠', route: '/ai-console' },
    { name: 'Chat Claude', icon: '💭', route: '/claude-chat' },
    { name: 'Chat OpenAI', icon: '💬', route: '/openai-chat' },
    { name: 'Apple Integration', icon: '🍎', route: '/apple-integration' },
    { name: 'Intel Pack', icon: '💻', route: '/intel-pack' },
    { name: 'Figma Assets', icon: '🎨', route: '/figma-assets' },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f0f0f] text-white p-8">
      {/* Centro da tela - Logo e navegação simples */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-light mb-2">VERUM OS</h1>
        <p className="text-gray-400 text-lg">Sistema Operacional Empresarial</p>
      </div>

      {/* Grid de aplicações minimalista */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-2xl w-full">
        {apps.map((app) => (
          <Button
            key={app.route}
            onClick={() => navigate(app.route)}
            className="h-24 bg-[#1a1a1a] hover:bg-[#2a2a2a] border border-[#2a2a2a] hover:border-[#00d4aa]/30 flex flex-col items-center justify-center rounded-lg transition-all"
          >
            <span className="text-2xl mb-2">{app.icon}</span>
            <span className="text-sm text-gray-300">{app.name}</span>
          </Button>
        ))}
      </div>

      {/* Rodapé minimalista */}
      <div className="mt-12 text-center">
        <p className="text-gray-500 text-sm">VERUM OS v2.0 - Enterprise Edition</p>
        <p className="text-gray-600 text-xs mt-2">Powered by Claude Sonnet-4 & PostgreSQL</p>
      </div>
    </div>
  );
}