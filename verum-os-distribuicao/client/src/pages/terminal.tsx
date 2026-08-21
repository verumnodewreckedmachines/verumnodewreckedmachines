import { TerminalInterface } from '@/components/terminal/terminal-interface';

export default function Terminal() {
  return (
    <div className="flex-1 p-6">
      <div className="h-full">
        <TerminalInterface />
      </div>
    </div>
  );
}
