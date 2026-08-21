import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';

interface BootScreenProps {
  progress: number;
}

export default function BootScreen({ progress }: BootScreenProps) {
  return (
    <div className="h-screen bg-black flex items-center justify-center">
      <Card className="bg-gray-900 border-gray-700 p-8 w-96">
        <div className="text-center space-y-6">
          <div className="text-4xl font-bold text-white mb-2">
            VERUM OS
          </div>
          <div className="text-gray-400 text-sm">
            Virtual Computer Environment
          </div>
          
          <div className="space-y-3">
            <div className="text-blue-400 text-sm">
              Initializing system...
            </div>
            <Progress value={progress} className="h-2" />
            <div className="text-xs text-gray-500">
              {progress < 25 && "Loading kernel modules..."}
              {progress >= 25 && progress < 50 && "Mounting file systems..."}
              {progress >= 50 && progress < 75 && "Starting services..."}
              {progress >= 75 && progress < 95 && "Initializing desktop environment..."}
              {progress >= 95 && "System ready!"}
            </div>
          </div>
          
          <div className="text-xs text-gray-600">
            VERUM Virtual Computer v2.4.1
          </div>
        </div>
      </Card>
    </div>
  );
}