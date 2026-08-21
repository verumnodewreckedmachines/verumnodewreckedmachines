import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Calculator as CalculatorIcon,
  FileText,
  Folder,
  Terminal as TerminalIcon,
  Brain,
  Activity,
  Settings as SettingsIcon,
  Printer,
  Save,
  Archive,
  HardDrive,
  Upload,
  Download,
  X
} from 'lucide-react';
import { VirtualMediaHub, VirtualMetadataManager, VirtualSyncLyrics } from './MediaApps';
import { VirtualMusicLibrary } from './MusicLibrary';
import RealMusicPlayer from './RealMusicPlayer';
import PrintManager from './PrintManager';
import EnhancedTerminal from './EnhancedTerminal';

interface VirtualAppContentProps {
  appId: string;
  virtualData: any;
  saveSystemState: () => boolean;
  loadSystemState: () => boolean;
}

export function VirtualAppContent({ appId, virtualData, saveSystemState, loadSystemState }: VirtualAppContentProps) {
  switch (appId) {
    case 'calculator':
      return <VirtualCalculator />;
    case 'notepad':
      return <VirtualNotepad />;
    case 'file-manager':
      return <VirtualFileManager />;
    case 'terminal':
      return <EnhancedTerminal />;
    case 'ai-assistant':
      return <VirtualAIAssistant />;
    case 'task-manager':
      return <VirtualTaskManager />;
    case 'settings':
      return <VirtualSettings />;
    case 'print-manager':
      return <PrintManager />;
    case 'save-manager':
      return <VirtualSaveManager 
        virtualData={virtualData}
        saveSystemState={saveSystemState}
        loadSystemState={loadSystemState}
      />;
    case 'calendar':
      return <VirtualCalendar />;
    case 'mail':
      return <VirtualMail />;
    case 'image-viewer':
      return <VirtualImageViewer />;
    case 'music-player':
      return <VirtualMusicPlayer />;
    case 'video-player':
      return <VirtualVideoPlayer />;
    case 'camera':
      return <VirtualCamera />;
    case 'neural-processor':
      return <VirtualNeuralProcessor />;
    case 'media-hub':
      return <VirtualMediaHub />;
    case 'music-library':
      return <RealMusicPlayer />;
    case 'metadata-manager':
      return <VirtualMetadataManager />;
    case 'sync-lyrics':
      return <VirtualSyncLyrics />;
    default:
      return (
        <div className="flex items-center justify-center h-full text-gray-400">
          <div className="text-center">
            <div className="text-6xl mb-4">🚧</div>
            <p>Application "{appId}" is under development</p>
            <p className="text-sm mt-2">Coming soon in VERUM Virtual Computer</p>
          </div>
        </div>
      );
  }
}

// Virtual Calculator
function VirtualCalculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(String(num));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const inputOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '*':
        return firstValue * secondValue;
      case '/':
        return firstValue / secondValue;
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const clearAll = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  return (
    <div className="max-w-xs mx-auto bg-gray-800 rounded-lg p-4">
      <div className="bg-black rounded p-4 mb-4">
        <div className="text-right text-white text-2xl font-mono">
          {display}
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-2">
        <Button onClick={clearAll} className="bg-red-600 hover:bg-red-700 col-span-2">
          Clear
        </Button>
        <Button onClick={() => inputOperation('/')} className="bg-gray-600 hover:bg-gray-700">
          ÷
        </Button>
        <Button onClick={() => inputOperation('*')} className="bg-gray-600 hover:bg-gray-700">
          ×
        </Button>
        
        <Button onClick={() => inputNumber('7')} className="bg-gray-700 hover:bg-gray-600">
          7
        </Button>
        <Button onClick={() => inputNumber('8')} className="bg-gray-700 hover:bg-gray-600">
          8
        </Button>
        <Button onClick={() => inputNumber('9')} className="bg-gray-700 hover:bg-gray-600">
          9
        </Button>
        <Button onClick={() => inputOperation('-')} className="bg-gray-600 hover:bg-gray-700">
          -
        </Button>
        
        <Button onClick={() => inputNumber('4')} className="bg-gray-700 hover:bg-gray-600">
          4
        </Button>
        <Button onClick={() => inputNumber('5')} className="bg-gray-700 hover:bg-gray-600">
          5
        </Button>
        <Button onClick={() => inputNumber('6')} className="bg-gray-700 hover:bg-gray-600">
          6
        </Button>
        <Button onClick={() => inputOperation('+')} className="bg-gray-600 hover:bg-gray-700">
          +
        </Button>
        
        <Button onClick={() => inputNumber('1')} className="bg-gray-700 hover:bg-gray-600">
          1
        </Button>
        <Button onClick={() => inputNumber('2')} className="bg-gray-700 hover:bg-gray-600">
          2
        </Button>
        <Button onClick={() => inputNumber('3')} className="bg-gray-700 hover:bg-gray-600">
          3
        </Button>
        <Button onClick={performCalculation} className="bg-blue-600 hover:bg-blue-700 row-span-2">
          =
        </Button>
        
        <Button onClick={() => inputNumber('0')} className="bg-gray-700 hover:bg-gray-600 col-span-2">
          0
        </Button>
        <Button onClick={() => inputNumber('.')} className="bg-gray-700 hover:bg-gray-600">
          .
        </Button>
      </div>
    </div>
  );
}

// Virtual Notepad
function VirtualNotepad() {
  const [content, setContent] = useState('Welcome to VERUM Virtual Notepad\n\nThis is a fully functional text editor within the virtual computer environment.\n\nYou can:\n- Type and edit text\n- Save your documents\n- Create new files\n- Format your content\n\nStart typing to begin...');

  return (
    <div className="h-full flex flex-col">
      <div className="bg-gray-800 p-2 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            New
          </Button>
          <Button size="sm" className="bg-green-600 hover:bg-green-700">
            Save
          </Button>
          <Button size="sm" className="bg-gray-600 hover:bg-gray-700">
            Open
          </Button>
        </div>
      </div>
      
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="flex-1 bg-white text-black p-4 resize-none focus:outline-none font-mono text-sm"
        placeholder="Start typing..."
      />
      
      <div className="bg-gray-800 p-2 border-t border-gray-700 text-xs text-gray-400">
        Characters: {content.length} | Lines: {content.split('\n').length}
      </div>
    </div>
  );
}

// Virtual File Manager
function VirtualFileManager() {
  const [currentPath, setCurrentPath] = useState('/home/user');
  const [files] = useState([
    { name: 'Documents', type: 'folder', size: '-', modified: '2025-07-11' },
    { name: 'Pictures', type: 'folder', size: '-', modified: '2025-07-11' },
    { name: 'Downloads', type: 'folder', size: '-', modified: '2025-07-11' },
    { name: 'Desktop', type: 'folder', size: '-', modified: '2025-07-11' },
    { name: 'readme.txt', type: 'file', size: '1.2 KB', modified: '2025-07-11' },
    { name: 'project.json', type: 'file', size: '3.4 KB', modified: '2025-07-11' },
    { name: 'image.png', type: 'file', size: '256 KB', modified: '2025-07-10' },
  ]);

  return (
    <div className="h-full flex flex-col">
      <div className="bg-gray-800 p-2 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <Button size="sm">← Back</Button>
          <Button size="sm">↑ Up</Button>
          <div className="flex-1 bg-gray-700 px-3 py-1 rounded text-white text-sm">
            {currentPath}
          </div>
          <Button size="sm">🔍</Button>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-800 text-gray-300">
            <tr>
              <th className="text-left p-2">Name</th>
              <th className="text-left p-2">Size</th>
              <th className="text-left p-2">Modified</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file, index) => (
              <tr key={index} className="border-b border-gray-700 hover:bg-gray-800 cursor-pointer">
                <td className="p-2 flex items-center space-x-2">
                  <span className="text-lg">
                    {file.type === 'folder' ? '📁' : '📄'}
                  </span>
                  <span className="text-white">{file.name}</span>
                </td>
                <td className="p-2 text-gray-400">{file.size}</td>
                <td className="p-2 text-gray-400">{file.modified}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Virtual Terminal
function VirtualTerminal() {
  const [commands, setCommands] = useState([
    { input: 'uname -a', output: 'VERUM Virtual OS 2.4.1 x86_64 GNU/Linux' },
    { input: 'whoami', output: 'virtual-user' }
  ]);
  const [currentInput, setCurrentInput] = useState('');

  const executeCommand = (cmd: string) => {
    let output = '';

    switch (cmd.toLowerCase()) {
      case 'help':
        output = 'Available commands: help, ls, pwd, date, clear, uname, whoami, ps, top, df\nMedia commands: spotdl-search, spotdl-download, lyrics-sync, metadata-fix';
        break;
      case 'ls':
        output = 'Documents  Pictures  Downloads  Desktop  readme.txt  project.json';
        break;
      case 'pwd':
        output = '/home/virtual-user';
        break;
      case 'date':
        output = new Date().toString();
        break;
      case 'ps':
        output = 'PID   NAME\n1234  virtual-desktop\n1235  file-manager\n1236  terminal\n1237  calculator';
        break;
      case 'top':
        output = 'Tasks: 4 total, 1 running, 3 sleeping\nCPU: 15.2% user, 2.1% system, 82.7% idle\nMem: 1024M total, 456M used, 568M free';
        break;
      case 'df':
        output = 'Filesystem     Size  Used Avail Use% Mounted on\n/dev/sda1       50G   15G   35G  30% /\n/dev/sda2      100G   72G   28G  72% /home';
        break;
      case 'clear':
        setCommands([]);
        return;
      case 'spotdl-search':
        output = 'VERUM spotDL Search Engine v4.2.5\n🔍 Searching for music across platforms...\n✅ Found 3 tracks on YouTube Music\n✅ Found 2 tracks on Spotify\n✅ Found 1 track on Bandcamp\nUse "spotdl-download <track>" to download';
        break;
      case 'spotdl-download':
        output = 'VERUM spotDL Downloader v4.2.5\n🎵 Downloading track...\n📥 Progress: [████████████████████] 100%\n🏷️ Adding metadata...\n✅ Download complete: track.mp3 (320kbps)\n💾 Saved to: /Downloads/Music/';
        break;
      case 'lyrics-sync':
        output = 'VERUM Lyrics Synchronizer v2.1.0\n🎤 Fetching lyrics from multiple sources...\n⏱️ Synchronizing timestamps...\n📝 Generated LRC file with 45 synced lines\n✅ Lyrics sync complete: track.lrc saved';
        break;
      case 'metadata-fix':
        output = 'VERUM Metadata Processor v3.0.1\n🏷️ Scanning audio files...\n🔧 Processing 5 files with missing metadata\n🎨 Downloading album artwork...\n✅ Metadata fix complete - all files updated';
        break;
      default:
        output = `bash: ${cmd}: command not found`;
    }

    setCommands(prev => [...prev, { input: cmd, output }]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && currentInput.trim()) {
      executeCommand(currentInput.trim());
      setCurrentInput('');
    }
  };

  return (
    <div className="h-full bg-black p-4 font-mono text-green-400 overflow-auto">
      {commands.map((cmd, index) => (
        <div key={index} className="mb-2">
          <div className="flex">
            <span className="text-blue-400">virtual-user@verum-computer</span>
            <span className="text-white">:</span>
            <span className="text-yellow-400">~</span>
            <span className="text-white">$ {cmd.input}</span>
          </div>
          <pre className="text-green-300 whitespace-pre-wrap">{cmd.output}</pre>
        </div>
      ))}

      <div className="flex">
        <span className="text-blue-400">virtual-user@verum-computer</span>
        <span className="text-white">:</span>
        <span className="text-yellow-400">~</span>
        <span className="text-white">$ </span>
        <input
          type="text"
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 bg-transparent border-none outline-none text-green-400"
          autoFocus
        />
      </div>
    </div>
  );
}

// Virtual AI Assistant
function VirtualAIAssistant() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I am your VERUM Virtual AI Assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        role: 'assistant',
        content: `I understand you said: "${input}". This is a virtual AI assistant within the VERUM Virtual Computer. I can help you with various tasks, answer questions, or provide information about the virtual environment.`
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);

    setInput('');
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
              message.role === 'user' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-700 text-gray-100'
            }`}>
              {message.content}
            </div>
          </div>
        ))}
      </div>
      
      <div className="border-t border-gray-700 p-4">
        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type your message..."
            className="flex-1 bg-gray-700 border-gray-600 text-white"
          />
          <Button onClick={sendMessage} className="bg-blue-600 hover:bg-blue-700">
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}

// Virtual Task Manager
function VirtualTaskManager() {
  const [processes] = useState([
    { pid: 1234, name: 'virtual-desktop', cpu: 15.2, memory: 156, status: 'Running' },
    { pid: 1235, name: 'file-manager', cpu: 2.1, memory: 45, status: 'Running' },
    { pid: 1236, name: 'terminal', cpu: 0.8, memory: 23, status: 'Running' },
    { pid: 1237, name: 'calculator', cpu: 0.2, memory: 12, status: 'Running' },
    { pid: 1238, name: 'notepad', cpu: 0.1, memory: 8, status: 'Sleeping' },
  ]);

  return (
    <div className="h-full flex flex-col">
      <div className="bg-gray-800 p-2 border-b border-gray-700">
        <h3 className="text-white font-semibold">Task Manager - VERUM Virtual Computer</h3>
      </div>
      
      <div className="flex-1 overflow-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-800 text-gray-300">
            <tr>
              <th className="text-left p-2">PID</th>
              <th className="text-left p-2">Process Name</th>
              <th className="text-left p-2">CPU %</th>
              <th className="text-left p-2">Memory (MB)</th>
              <th className="text-left p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {processes.map((process) => (
              <tr key={process.pid} className="border-b border-gray-700 hover:bg-gray-800">
                <td className="p-2 text-gray-400">{process.pid}</td>
                <td className="p-2 text-white">{process.name}</td>
                <td className="p-2 text-blue-400">{process.cpu}%</td>
                <td className="p-2 text-green-400">{process.memory}</td>
                <td className="p-2">
                  <Badge className={process.status === 'Running' ? 'text-green-400' : 'text-yellow-400'}>
                    {process.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Virtual Settings
function VirtualSettings() {
  const [settings, setSettings] = useState({
    theme: 'dark',
    resolution: '1920x1080',
    volume: 75,
    brightness: 80,
    autoSave: true,
    notifications: true
  });

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">System Settings</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-white">Theme</label>
            <select 
              value={settings.theme}
              onChange={(e) => setSettings(prev => ({ ...prev, theme: e.target.value }))}
              className="bg-gray-800 border border-gray-600 rounded px-3 py-1 text-white"
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
              <option value="auto">Auto</option>
            </select>
          </div>
          
          <div className="flex items-center justify-between">
            <label className="text-white">Resolution</label>
            <select 
              value={settings.resolution}
              onChange={(e) => setSettings(prev => ({ ...prev, resolution: e.target.value }))}
              className="bg-gray-800 border border-gray-600 rounded px-3 py-1 text-white"
            >
              <option value="1920x1080">1920 x 1080</option>
              <option value="1366x768">1366 x 768</option>
              <option value="2560x1440">2560 x 1440</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="text-white">Volume: {settings.volume}%</label>
            <input
              type="range"
              min="0"
              max="100"
              value={settings.volume}
              onChange={(e) => setSettings(prev => ({ ...prev, volume: parseInt(e.target.value) }))}
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-white">Brightness: {settings.brightness}%</label>
            <input
              type="range"
              min="0"
              max="100"
              value={settings.brightness}
              onChange={(e) => setSettings(prev => ({ ...prev, brightness: parseInt(e.target.value) }))}
              className="w-full"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <label className="text-white">Auto Save</label>
            <input
              type="checkbox"
              checked={settings.autoSave}
              onChange={(e) => setSettings(prev => ({ ...prev, autoSave: e.target.checked }))}
              className="scale-125"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <label className="text-white">Notifications</label>
            <input
              type="checkbox"
              checked={settings.notifications}
              onChange={(e) => setSettings(prev => ({ ...prev, notifications: e.target.checked }))}
              className="scale-125"
            />
          </div>
        </div>
      </div>
      
      <div className="pt-4 border-t border-gray-600">
        <Button className="bg-blue-600 hover:bg-blue-700">Apply Settings</Button>
      </div>
    </div>
  );
}

// Virtual Print Manager
function VirtualPrintManager({ virtualData }: { virtualData: any }) {
  const [printQueue, setPrintQueue] = useState([
    {
      id: 1,
      document: 'VERUM_System_Report.pdf',
      status: 'Printing',
      progress: 78,
      pages: '15/20',
      printer: 'VERUM LaserJet Enterprise',
      priority: 'High',
      user: 'rafael@verumnode.com',
      submitted: new Date().toLocaleTimeString()
    },
    {
      id: 2,
      document: 'Enterprise_Architecture.docx',
      status: 'Queued',
      progress: 0,
      pages: '0/35',
      printer: 'VERUM Color Professional',
      priority: 'Normal',
      user: 'admin@verumnode.com',
      submitted: new Date(Date.now() - 300000).toLocaleTimeString()
    },
    {
      id: 3,
      document: 'Database_Schema.pdf',
      status: 'Completed',
      progress: 100,
      pages: '8/8',
      printer: 'VERUM LaserJet Enterprise',
      priority: 'Low',
      user: 'system@verumnode.com',
      submitted: new Date(Date.now() - 600000).toLocaleTimeString()
    }
  ]);

  const [newDocument, setNewDocument] = useState('');

  const addToPrintQueue = () => {
    if (!newDocument.trim()) return;
    
    const newJob = {
      id: Date.now(),
      document: newDocument,
      status: 'Queued',
      progress: 0,
      pages: '0/1',
      printer: 'VERUM LaserJet Enterprise',
      priority: 'Normal',
      user: 'admin@verumnode.com',
      submitted: new Date().toLocaleTimeString()
    };
    
    setPrintQueue(prev => [newJob, ...prev]);
    setNewDocument('');
  };

  const cancelPrintJob = (jobId: number) => {
    setPrintQueue(prev => prev.filter(job => job.id !== jobId));
  };

  const pausePrintJob = (jobId: number) => {
    setPrintQueue(prev => prev.map(job => 
      job.id === jobId 
        ? { ...job, status: job.status === 'Printing' ? 'Paused' : 'Printing' }
        : job
    ));
  };

  return (
    <div className="h-full flex flex-col space-y-4">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Printer className="h-5 w-5" />
            <span>Add Print Job</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input
              placeholder="Document name..."
              value={newDocument}
              onChange={(e) => setNewDocument(e.target.value)}
              className="flex-1 bg-gray-700 border-gray-600 text-white"
            />
            <Button onClick={addToPrintQueue} className="bg-blue-600 hover:bg-blue-700">
              Print
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700 flex-1">
        <CardHeader>
          <CardTitle className="text-white">Print Queue</CardTitle>
        </CardHeader>
        <CardContent className="overflow-auto">
          <div className="space-y-3">
            {printQueue.map((job) => (
              <div key={job.id} className="bg-gray-700 rounded-lg p-3 border border-gray-600">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-blue-400" />
                    <span className="text-white font-medium">{job.document}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={
                      job.status === 'Printing' ? 'bg-blue-600' :
                      job.status === 'Completed' ? 'bg-green-600' :
                      job.status === 'Paused' ? 'bg-yellow-600' :
                      'bg-gray-600'
                    }>{job.status}</Badge>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => pausePrintJob(job.id)}
                      className="text-blue-400 hover:bg-blue-700/20 px-2 py-1"
                    >
                      {job.status === 'Printing' ? '⏸️' : '▶️'}
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => cancelPrintJob(job.id)}
                      className="text-red-400 hover:bg-red-700/20 px-2 py-1"
                    >
                      ❌
                    </Button>
                  </div>
                </div>
                <div className="text-xs text-gray-400 mb-2">
                  {job.printer} • {job.pages} • Submitted: {job.submitted} • User: {job.user}
                </div>
                <Progress value={job.progress} className="h-2" />
                <div className="text-xs text-gray-500 mt-1">Progress: {job.progress}%</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Virtual Save Manager
function VirtualSaveManager({ 
  virtualData, 
  saveSystemState, 
  loadSystemState 
}: { 
  virtualData: any;
  saveSystemState: () => boolean;
  loadSystemState: () => boolean;
}) {
  const [saveSlots, setSaveSlots] = useState([
    {
      id: 1,
      name: 'Auto Save - Current Session',
      timestamp: new Date().toISOString(),
      type: 'auto',
      size: '2.4 MB',
      description: 'Automatic system save'
    },
    {
      id: 2,
      name: 'Manual Save - Project Work',
      timestamp: '2025-07-11T23:30:00',
      type: 'manual',
      size: '1.8 MB',
      description: 'User created save'
    }
  ]);

  const [newSaveName, setNewSaveName] = useState('');

  const createManualSave = () => {
    if (!newSaveName.trim()) return;
    
    const success = saveSystemState();
    if (success) {
      const newSave = {
        id: Date.now(),
        name: newSaveName,
        timestamp: new Date().toISOString(),
        type: 'manual',
        size: `${(Math.random() * 3 + 1).toFixed(1)} MB`,
        description: 'User created save'
      };
      
      setSaveSlots(prev => [newSave, ...prev]);
      setNewSaveName('');
    }
  };

  const deleteSaveSlot = (slotId: number) => {
    setSaveSlots(prev => prev.filter(slot => slot.id !== slotId));
  };

  return (
    <div className="h-full flex flex-col space-y-4">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Save className="h-5 w-5" />
            <span>Save Controls</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input
              placeholder="Save name..."
              value={newSaveName}
              onChange={(e) => setNewSaveName(e.target.value)}
              className="flex-1 bg-gray-700 border-gray-600 text-white"
            />
            <Button onClick={createManualSave} className="bg-green-600 hover:bg-green-700">
              Save
            </Button>
            <Button onClick={() => saveSystemState()} className="bg-blue-600 hover:bg-blue-700">
              Quick Save
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700 flex-1">
        <CardHeader>
          <CardTitle className="text-white">Save Slots</CardTitle>
        </CardHeader>
        <CardContent className="overflow-auto">
          <div className="space-y-3">
            {saveSlots.map((slot) => (
              <div key={slot.id} className="bg-gray-700 rounded-lg p-3 border border-gray-600">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Archive className="h-4 w-4 text-blue-400" />
                    <span className="text-white font-medium">{slot.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge>{slot.type}</Badge>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => deleteSaveSlot(slot.id)}
                      className="text-red-400 hover:bg-red-700/20"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <div className="text-xs text-gray-400 mb-2">
                  {new Date(slot.timestamp).toLocaleString()} • {slot.size}
                </div>
                <p className="text-sm text-gray-300">{slot.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Additional Virtual Apps
function VirtualCalendar() {
  return (
    <div className="p-4 text-center">
      <div className="text-6xl mb-4">📅</div>
      <h3 className="text-xl font-bold text-white mb-2">VERUM Calendar</h3>
      <p className="text-gray-400">Agenda e eventos do sistema</p>
    </div>
  );
}

function VirtualMail() {
  return (
    <div className="p-4 text-center">
      <div className="text-6xl mb-4">📧</div>
      <h3 className="text-xl font-bold text-white mb-2">VERUM Mail</h3>
      <p className="text-gray-400">Sistema de emails corporativo</p>
    </div>
  );
}

function VirtualImageViewer() {
  return (
    <div className="p-4 text-center">
      <div className="text-6xl mb-4">🖼️</div>
      <h3 className="text-xl font-bold text-white mb-2">Image Viewer</h3>
      <p className="text-gray-400">Visualizador de imagens VERUM</p>
    </div>
  );
}

function VirtualMusicPlayer() {
  return (
    <div className="p-4 text-center">
      <div className="text-6xl mb-4">🎵</div>
      <h3 className="text-xl font-bold text-white mb-2">Music Player</h3>
      <p className="text-gray-400">Player de música integrado</p>
    </div>
  );
}

function VirtualVideoPlayer() {
  return (
    <div className="p-4 text-center">
      <div className="text-6xl mb-4">🎥</div>
      <h3 className="text-xl font-bold text-white mb-2">Video Player</h3>
      <p className="text-gray-400">Reprodutor de vídeos VERUM</p>
    </div>
  );
}

function VirtualCamera() {
  return (
    <div className="p-4 text-center">
      <div className="text-6xl mb-4">📸</div>
      <h3 className="text-xl font-bold text-white mb-2">Camera</h3>
      <p className="text-gray-400">Sistema de captura VERUM</p>
    </div>
  );
}

function VirtualNeuralProcessor() {
  const [status, setStatus] = useState('idle');
  
  return (
    <div className="p-6 space-y-4">
      <div className="text-center">
        <div className="text-6xl mb-4">🧠</div>
        <h3 className="text-xl font-bold text-white mb-2">Neural Processor</h3>
        <Badge className={status === 'active' ? 'bg-green-600' : 'bg-gray-600'}>
          Status: {status.toUpperCase()}
        </Badge>
      </div>
      
      <div className="bg-gray-800 rounded-lg p-4">
        <div className="flex justify-center gap-2 mb-4">
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-75"></div>
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-150"></div>
        </div>
        
        <Button 
          className={`w-full ${status === 'active' ? 'bg-red-600 hover:bg-red-700' : 'bg-purple-600 hover:bg-purple-700'}`}
          onClick={() => setStatus(prev => prev === 'active' ? 'idle' : 'active')}
        >
          {status === 'active' ? 'Stop Processing' : 'Start Neural Processing'}
        </Button>
      </div>
    </div>
  );
}