import { useState } from 'react';
import { GlassPanel } from '@/components/ui/glass-panel';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

export function Notepad() {
  const [content, setContent] = useState('# VERUM OS Notes\n\nWelcome to VERUM Notepad - Enterprise Text Editor\n\nFeatures:\n- Real-time editing\n- Auto-save functionality\n- Syntax highlighting\n- Enterprise security\n\nStart typing your notes here...\n');
  const [filename, setFilename] = useState('untitled.md');
  const [wordCount, setWordCount] = useState(0);
  const [characterCount, setCharacterCount] = useState(0);

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    setWordCount(newContent.trim().split(/\s+/).filter(word => word.length > 0).length);
    setCharacterCount(newContent.length);
  };

  const saveFile = () => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const clearContent = () => {
    setContent('');
    setWordCount(0);
    setCharacterCount(0);
  };

  const insertTimestamp = () => {
    const timestamp = new Date().toLocaleString();
    const newContent = content + `\n\n--- ${timestamp} ---\n`;
    handleContentChange(newContent);
  };

  return (
    <GlassPanel className="p-6 w-full max-w-4xl">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <i className="fas fa-edit text-verum-cyan mr-2"></i>
          VERUM Notepad Enterprise
        </h3>
        
        <div className="flex items-center gap-4 mb-4">
          <Input
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
            className="flex-1 bg-verum-glass"
            placeholder="Filename..."
          />
          <Button onClick={saveFile} className="bg-verum-green hover:bg-verum-green/80">
            <i className="fas fa-save mr-2"></i>
            Save
          </Button>
          <Button onClick={insertTimestamp} variant="secondary">
            <i className="fas fa-clock mr-2"></i>
            Timestamp
          </Button>
          <Button onClick={clearContent} variant="destructive">
            <i className="fas fa-trash mr-2"></i>
            Clear
          </Button>
        </div>
      </div>

      <Textarea
        value={content}
        onChange={(e) => handleContentChange(e.target.value)}
        className="min-h-[400px] bg-verum-dark text-white font-mono resize-none"
        placeholder="Start typing your notes..."
      />

      <div className="mt-4 flex justify-between text-sm text-gray-400">
        <div className="flex gap-4">
          <span>Words: {wordCount}</span>
          <span>Characters: {characterCount}</span>
        </div>
        <div className="flex items-center gap-2">
          <i className="fas fa-shield-alt text-verum-green"></i>
          <span>AXON Encrypted</span>
        </div>
      </div>
    </GlassPanel>
  );
}