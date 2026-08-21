import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { DynamicTransform } from '@/components/effects/DynamicTransform';
import { EffectConfig } from '@/hooks/use-dynamic-effects';
import { Sparkles, Atom, Zap, Hash, Heart, RotateCcw } from 'lucide-react';

interface EffectDemo {
  name: string;
  type: EffectConfig['type'];
  description: string;
  icon: React.ReactNode;
  color: string;
}

const effectTypes: EffectDemo[] = [
  {
    name: 'Holographic',
    type: 'holographic',
    description: 'Iridescent hologram-like effects with color shifting',
    icon: <Sparkles className="w-6 h-6" />,
    color: 'from-cyan-500 to-purple-500'
  },
  {
    name: 'Quantum',
    type: 'quantum',
    description: 'Quantum field oscillations with particle behavior',
    icon: <Atom className="w-6 h-6" />,
    color: 'from-blue-500 to-indigo-500'
  },
  {
    name: 'Neural',
    type: 'neural',
    description: 'Neural network activation patterns',
    icon: <Zap className="w-6 h-6" />,
    color: 'from-orange-500 to-red-500'
  },
  {
    name: 'Matrix',
    type: 'matrix',
    description: 'Digital matrix code rain effects',
    icon: <Hash className="w-6 h-6" />,
    color: 'from-green-500 to-emerald-500'
  },
  {
    name: 'Pulse',
    type: 'pulse',
    description: 'Rhythmic pulsing energy waves',
    icon: <Heart className="w-6 h-6" />,
    color: 'from-red-500 to-pink-500'
  },
  {
    name: 'Morph',
    type: 'morph',
    description: 'Shape-shifting transformation effects',
    icon: <RotateCcw className="w-6 h-6" />,
    color: 'from-purple-500 to-blue-500'
  }
];

export default function TransformShowcase() {
  const [selectedEffect, setSelectedEffect] = useState<EffectConfig['type']>('holographic');
  const [trigger, setTrigger] = useState<EffectConfig['trigger']>('hover');
  const [intensity, setIntensity] = useState<EffectConfig['intensity']>('medium');
  const [duration, setDuration] = useState(800);
  const [delay, setDelay] = useState(0);
  const [particles, setParticles] = useState(true);

  const currentEffectConfig: Partial<EffectConfig> = {
    type: selectedEffect,
    trigger,
    intensity,
    duration,
    delay,
    particles
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl font-bold text-white">
            Dynamic UI Element Transformation Effects
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Experience advanced UI transformations with 6 different effect types, 
            interactive triggers, and customizable intensity levels.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Controls Panel */}
          <Card className="bg-black/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Effect Controls</CardTitle>
              <CardDescription>Customize transformation parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Effect Type */}
              <div className="space-y-2">
                <Label className="text-white">Effect Type</Label>
                <Select value={selectedEffect} onValueChange={(value: EffectConfig['type']) => setSelectedEffect(value)}>
                  <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    {effectTypes.map((effect) => (
                      <SelectItem key={effect.type} value={effect.type} className="text-white">
                        <div className="flex items-center space-x-2">
                          {effect.icon}
                          <span>{effect.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Trigger */}
              <div className="space-y-2">
                <Label className="text-white">Trigger</Label>
                <Select value={trigger} onValueChange={(value: EffectConfig['trigger']) => setTrigger(value)}>
                  <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    <SelectItem value="hover" className="text-white">Hover</SelectItem>
                    <SelectItem value="click" className="text-white">Click</SelectItem>
                    <SelectItem value="auto" className="text-white">Auto</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Intensity */}
              <div className="space-y-2">
                <Label className="text-white">Intensity</Label>
                <Select value={intensity} onValueChange={(value: EffectConfig['intensity']) => setIntensity(value)}>
                  <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    <SelectItem value="low" className="text-white">Low</SelectItem>
                    <SelectItem value="medium" className="text-white">Medium</SelectItem>
                    <SelectItem value="high" className="text-white">High</SelectItem>
                    <SelectItem value="extreme" className="text-white">Extreme</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Duration */}
              <div className="space-y-2">
                <Label className="text-white">Duration: {duration}ms</Label>
                <Slider
                  value={[duration]}
                  onValueChange={(value) => setDuration(value[0])}
                  max={2000}
                  min={200}
                  step={100}
                  className="w-full"
                />
              </div>

              {/* Delay */}
              <div className="space-y-2">
                <Label className="text-white">Delay: {delay}ms</Label>
                <Slider
                  value={[delay]}
                  onValueChange={(value) => setDelay(value[0])}
                  max={1000}
                  min={0}
                  step={50}
                  className="w-full"
                />
              </div>

              {/* Particles */}
              <div className="flex items-center space-x-2">
                <Switch
                  checked={particles}
                  onCheckedChange={setParticles}
                  id="particles"
                />
                <Label htmlFor="particles" className="text-white">Enable Particles</Label>
              </div>
            </CardContent>
          </Card>

          {/* Effect Preview */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-black/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Live Preview</CardTitle>
                <CardDescription>
                  {trigger === 'hover' && 'Hover over the elements below to see the effect'}
                  {trigger === 'click' && 'Click on the elements below to see the effect'}
                  {trigger === 'auto' && 'Effects will trigger automatically'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Demo Elements */}
                <div className="grid grid-cols-2 gap-4">
                  <DynamicTransform effect={currentEffectConfig}>
                    <Card className="bg-gradient-to-r from-blue-600 to-purple-600 border-none cursor-pointer">
                      <CardContent className="p-6 text-center">
                        <h3 className="text-white font-bold text-lg">Demo Card 1</h3>
                        <p className="text-gray-200">Interactive element</p>
                      </CardContent>
                    </Card>
                  </DynamicTransform>

                  <DynamicTransform effect={currentEffectConfig}>
                    <Button className="h-20 w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700">
                      <div className="text-center">
                        <div className="font-bold">Demo Button</div>
                        <div className="text-sm opacity-90">Click or hover</div>
                      </div>
                    </Button>
                  </DynamicTransform>
                </div>

                {/* Large Demo Element */}
                <DynamicTransform effect={currentEffectConfig}>
                  <Card className="bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 border-none cursor-pointer">
                    <CardContent className="p-8 text-center">
                      <div className="space-y-4">
                        <div className="text-3xl">🚀</div>
                        <h2 className="text-white font-bold text-2xl">
                          {effectTypes.find(e => e.type === selectedEffect)?.name} Effect
                        </h2>
                        <p className="text-gray-200">
                          {effectTypes.find(e => e.type === selectedEffect)?.description}
                        </p>
                        <div className="flex justify-center space-x-2">
                          <span className="px-3 py-1 bg-white/20 rounded-full text-sm text-white">
                            {intensity.toUpperCase()}
                          </span>
                          <span className="px-3 py-1 bg-white/20 rounded-full text-sm text-white">
                            {duration}ms
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </DynamicTransform>
              </CardContent>
            </Card>

            {/* Effect Gallery */}
            <Card className="bg-black/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Effect Gallery</CardTitle>
                <CardDescription>All available transformation effects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {effectTypes.map((effect) => (
                    <DynamicTransform
                      key={effect.type}
                      effect={{ type: effect.type, trigger: 'hover', intensity: 'medium' }}
                    >
                      <Card 
                        className={`bg-gradient-to-r ${effect.color} border-none cursor-pointer transition-all`}
                        onClick={() => setSelectedEffect(effect.type)}
                      >
                        <CardContent className="p-4 text-center">
                          <div className="text-white space-y-2">
                            {effect.icon}
                            <div className="font-bold text-sm">{effect.name}</div>
                          </div>
                        </CardContent>
                      </Card>
                    </DynamicTransform>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}