import { DynamicTransform } from '@/components/effects/DynamicTransform';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, Sparkles, Atom } from 'lucide-react';

export default function TransformDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-white text-center mb-12">
          Dynamic UI Transformation Effects Demo
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Holographic Effect */}
          <DynamicTransform 
            effect={{ 
              type: 'holographic', 
              trigger: 'hover', 
              intensity: 'medium',
              particles: true 
            }}
          >
            <Card className="bg-gray-800/50 border-gray-700 cursor-pointer">
              <CardContent className="p-6 text-center">
                <Sparkles className="w-12 h-12 mx-auto mb-4 text-cyan-400" />
                <h3 className="text-xl font-bold text-white mb-2">Holographic</h3>
                <p className="text-gray-300">Hover para ver efeito holográfico</p>
              </CardContent>
            </Card>
          </DynamicTransform>

          {/* Quantum Effect */}
          <DynamicTransform 
            effect={{ 
              type: 'quantum', 
              trigger: 'click', 
              intensity: 'high',
              particles: true 
            }}
          >
            <Card className="bg-gray-800/50 border-gray-700 cursor-pointer">
              <CardContent className="p-6 text-center">
                <Atom className="w-12 h-12 mx-auto mb-4 text-blue-400" />
                <h3 className="text-xl font-bold text-white mb-2">Quantum</h3>
                <p className="text-gray-300">Clique para efeito quântico</p>
              </CardContent>
            </Card>
          </DynamicTransform>

          {/* Neural Effect */}
          <DynamicTransform 
            effect={{ 
              type: 'neural', 
              trigger: 'auto', 
              intensity: 'low',
              particles: true 
            }}
          >
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-6 text-center">
                <Brain className="w-12 h-12 mx-auto mb-4 text-purple-400" />
                <h3 className="text-xl font-bold text-white mb-2">Neural</h3>
                <p className="text-gray-300">Efeito automático neural</p>
              </CardContent>
            </Card>
          </DynamicTransform>
        </div>

        <div className="text-center">
          <DynamicTransform 
            effect={{ 
              type: 'pulse', 
              trigger: 'hover', 
              intensity: 'extreme',
              particles: true 
            }}
          >
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              Teste o Efeito Pulse
            </Button>
          </DynamicTransform>
        </div>
      </div>
    </div>
  );
}