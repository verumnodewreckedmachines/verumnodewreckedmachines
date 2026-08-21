import { useState } from 'react';
import { 
  DynamicTransform, 
  HolographicTransform, 
  QuantumTransform, 
  NeuralTransform, 
  MatrixTransform, 
  PulseTransform, 
  MorphTransform 
} from '@/components/ui/dynamic-transforms';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Slider 
} from '@/components/ui/slider';
import { 
  Switch 
} from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { 
  Sparkles, 
  Atom, 
  Zap, 
  Binary, 
  Activity, 
  Shuffle,
  Settings,
  Play,
  Pause
} from 'lucide-react';

export function TransformShowcase() {
  const [selectedEffect, setSelectedEffect] = useState<'holographic' | 'quantum' | 'neural' | 'matrix' | 'pulse' | 'morph'>('holographic');
  const [selectedTrigger, setSelectedTrigger] = useState<'hover' | 'click' | 'auto' | 'scroll'>('hover');
  const [selectedIntensity, setSelectedIntensity] = useState<'low' | 'medium' | 'high' | 'extreme'>('medium');
  const [duration, setDuration] = useState([0.6]);
  const [delay, setDelay] = useState([0]);
  const [isAutoMode, setIsAutoMode] = useState(false);

  const effects = [
    { 
      name: 'holographic', 
      label: 'Holográfico', 
      icon: Sparkles, 
      description: 'Efeito holográfico com gradientes cíclicos e brilho',
      color: 'text-cyan-400'
    },
    { 
      name: 'quantum', 
      label: 'Quântico', 
      icon: Atom, 
      description: 'Transformações quânticas com rotação e blur dinâmico',
      color: 'text-purple-400'
    },
    { 
      name: 'neural', 
      label: 'Neural', 
      icon: Zap, 
      description: 'Rede neural com pulsos elétricos e bordas luminosas',
      color: 'text-blue-400'
    },
    { 
      name: 'matrix', 
      label: 'Matrix', 
      icon: Binary, 
      description: 'Efeito Matrix com código verde e sombras',
      color: 'text-green-400'
    },
    { 
      name: 'pulse', 
      label: 'Pulso', 
      icon: Activity, 
      description: 'Pulso rítmico com ondas expansivas',
      color: 'text-red-400'
    },
    { 
      name: 'morph', 
      label: 'Metamorfose', 
      icon: Shuffle, 
      description: 'Transformação completa de forma e cor',
      color: 'text-pink-400'
    }
  ];

  const triggers = [
    { value: 'hover', label: 'Hover (Passar Mouse)' },
    { value: 'click', label: 'Click (Clique)' },
    { value: 'auto', label: 'Automático' },
    { value: 'scroll', label: 'Scroll (Rolagem)' }
  ];

  const intensities = [
    { value: 'low', label: 'Baixa', description: 'Efeitos sutis' },
    { value: 'medium', label: 'Média', description: 'Efeitos balanceados' },
    { value: 'high', label: 'Alta', description: 'Efeitos intensos' },
    { value: 'extreme', label: 'Extrema', description: 'Máxima intensidade' }
  ];

  return (
    <div className="h-screen overflow-auto bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <HolographicTransform trigger="auto" intensity="medium">
          <Card className="border-2 border-cyan-500/30 bg-black/40 backdrop-blur-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                🌊 Dynamic UI Element Transformation Effects 🌊
              </CardTitle>
              <p className="text-gray-300">
                Sistema avançado de transformações dinâmicas para elementos da interface
              </p>
            </CardHeader>
          </Card>
        </HolographicTransform>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Controls Panel */}
          <div className="lg:col-span-1">
            <QuantumTransform trigger="hover" intensity="low">
              <Card className="border border-purple-500/30 bg-black/40 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-purple-400">
                    <Settings className="w-5 h-5" />
                    Controles de Transformação
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  
                  {/* Effect Selection */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-gray-300">Tipo de Efeito</Label>
                    <Select 
                      value={selectedEffect} 
                      onValueChange={(value: any) => setSelectedEffect(value)}
                    >
                      <SelectTrigger className="bg-gray-800/50 border-gray-600">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-600">
                        {effects.map((effect) => (
                          <SelectItem key={effect.name} value={effect.name}>
                            <div className="flex items-center gap-2">
                              <effect.icon className={`w-4 h-4 ${effect.color}`} />
                              {effect.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Trigger Selection */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-gray-300">Gatilho</Label>
                    <Select 
                      value={selectedTrigger} 
                      onValueChange={(value: any) => setSelectedTrigger(value)}
                    >
                      <SelectTrigger className="bg-gray-800/50 border-gray-600">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-600">
                        {triggers.map((trigger) => (
                          <SelectItem key={trigger.value} value={trigger.value}>
                            {trigger.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Intensity Selection */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-gray-300">Intensidade</Label>
                    <Select 
                      value={selectedIntensity} 
                      onValueChange={(value: any) => setSelectedIntensity(value)}
                    >
                      <SelectTrigger className="bg-gray-800/50 border-gray-600">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-600">
                        {intensities.map((intensity) => (
                          <SelectItem key={intensity.value} value={intensity.value}>
                            <div className="space-y-1">
                              <div className="font-medium">{intensity.label}</div>
                              <div className="text-xs text-gray-400">{intensity.description}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator className="bg-gray-600" />

                  {/* Duration Control */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-gray-300">
                      Duração: {duration[0].toFixed(1)}s
                    </Label>
                    <Slider
                      value={duration}
                      onValueChange={setDuration}
                      max={3}
                      min={0.1}
                      step={0.1}
                      className="w-full"
                    />
                  </div>

                  {/* Delay Control */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-gray-300">
                      Atraso: {delay[0].toFixed(1)}s
                    </Label>
                    <Slider
                      value={delay}
                      onValueChange={setDelay}
                      max={2}
                      min={0}
                      step={0.1}
                      className="w-full"
                    />
                  </div>

                  <Separator className="bg-gray-600" />

                  {/* Auto Mode Toggle */}
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium text-gray-300">Modo Automático</Label>
                    <Switch 
                      checked={isAutoMode}
                      onCheckedChange={setIsAutoMode}
                    />
                  </div>

                </CardContent>
              </Card>
            </QuantumTransform>
          </div>

          {/* Showcase Area */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Main Demonstration */}
            <Card className="border border-blue-500/30 bg-black/40 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-blue-400">Demonstração Principal</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-center p-12">
                <DynamicTransform
                  effect={selectedEffect}
                  trigger={isAutoMode ? 'auto' : selectedTrigger}
                  intensity={selectedIntensity}
                  duration={duration[0]}
                  delay={delay[0]}
                >
                  <Card className="w-80 h-48 border-2 border-white/20 bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl cursor-pointer">
                    <CardContent className="flex flex-col items-center justify-center h-full text-center">
                      {(() => {
                        const effect = effects.find(e => e.name === selectedEffect);
                        const Icon = effect?.icon || Sparkles;
                        return (
                          <>
                            <Icon className={`w-12 h-12 mb-4 ${effect?.color || 'text-white'}`} />
                            <h3 className="text-xl font-bold text-white mb-2">
                              {effect?.label || 'Efeito'}
                            </h3>
                            <p className="text-gray-300 text-sm">
                              {effect?.description || 'Descrição do efeito'}
                            </p>
                            <Badge className="mt-3" variant="secondary">
                              {selectedIntensity.toUpperCase()}
                            </Badge>
                          </>
                        );
                      })()}
                    </CardContent>
                  </Card>
                </DynamicTransform>
              </CardContent>
            </Card>

            {/* All Effects Grid */}
            <Card className="border border-gray-500/30 bg-black/40 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-gray-300">Galeria de Efeitos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  
                  <HolographicTransform trigger="hover" intensity="medium">
                    <Card className="border border-cyan-500/30 bg-gray-800/50 cursor-pointer">
                      <CardContent className="p-4 text-center">
                        <Sparkles className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                        <h4 className="text-sm font-medium text-white">Holográfico</h4>
                      </CardContent>
                    </Card>
                  </HolographicTransform>

                  <QuantumTransform trigger="hover" intensity="medium">
                    <Card className="border border-purple-500/30 bg-gray-800/50 cursor-pointer">
                      <CardContent className="p-4 text-center">
                        <Atom className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                        <h4 className="text-sm font-medium text-white">Quântico</h4>
                      </CardContent>
                    </Card>
                  </QuantumTransform>

                  <NeuralTransform trigger="hover" intensity="medium">
                    <Card className="border border-blue-500/30 bg-gray-800/50 cursor-pointer">
                      <CardContent className="p-4 text-center">
                        <Zap className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                        <h4 className="text-sm font-medium text-white">Neural</h4>
                      </CardContent>
                    </Card>
                  </NeuralTransform>

                  <MatrixTransform trigger="hover" intensity="medium">
                    <Card className="border border-green-500/30 bg-gray-800/50 cursor-pointer">
                      <CardContent className="p-4 text-center">
                        <Binary className="w-8 h-8 text-green-400 mx-auto mb-2" />
                        <h4 className="text-sm font-medium text-white">Matrix</h4>
                      </CardContent>
                    </Card>
                  </MatrixTransform>

                  <PulseTransform trigger="hover" intensity="medium">
                    <Card className="border border-red-500/30 bg-gray-800/50 cursor-pointer">
                      <CardContent className="p-4 text-center">
                        <Activity className="w-8 h-8 text-red-400 mx-auto mb-2" />
                        <h4 className="text-sm font-medium text-white">Pulso</h4>
                      </CardContent>
                    </Card>
                  </PulseTransform>

                  <MorphTransform trigger="hover" intensity="medium">
                    <Card className="border border-pink-500/30 bg-gray-800/50 cursor-pointer">
                      <CardContent className="p-4 text-center">
                        <Shuffle className="w-8 h-8 text-pink-400 mx-auto mb-2" />
                        <h4 className="text-sm font-medium text-white">Metamorfose</h4>
                      </CardContent>
                    </Card>
                  </MorphTransform>

                </div>
              </CardContent>
            </Card>

          </div>
        </div>

      </div>
    </div>
  );
}