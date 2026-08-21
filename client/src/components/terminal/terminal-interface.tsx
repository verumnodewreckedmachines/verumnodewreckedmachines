import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Terminal, Play, Square, Minimize2, Maximize2, X } from 'lucide-react';

interface Command {
  id: string;
  command: string;
  output: string;
  timestamp: Date;
  exitCode: number;
}

interface TerminalInterfaceProps {
  isMinimized?: boolean;
  onMinimize?: () => void;
  onMaximize?: () => void;
  onClose?: () => void;
}

export function TerminalInterface({ 
  isMinimized = false, 
  onMinimize, 
  onMaximize, 
  onClose 
}: TerminalInterfaceProps) {
  const [commands, setCommands] = useState<Command[]>([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isRunning, setIsRunning] = useState(false);
  const [currentPath, setCurrentPath] = useState('~/verum-os');
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  // Comandos disponíveis do VERUM OS
  const availableCommands = [
    'help', 'ls', 'cd', 'pwd', 'cat', 'echo', 'clear', 'history',
    'ps', 'top', 'df', 'date', 'uname', 'whoami', 'calc',
    'kernel-info', 'bootloader-status', 'memory-map', 'hardware-check',
    'witness-hash', 'axon-verify', 'neural-analyze', 'quantum-status'
  ];

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [commands]);

  useEffect(() => {
    // Comando de boas-vindas
    if (commands.length === 0) {
      const welcomeCommand: Command = {
        id: Date.now().toString(),
        command: 'system-init',
        output: `VERUM OS Terminal v2.4.1 - Enterprise Edition
=====================================
Alpha AXP Kernel 64-bit | PostgreSQL Active | AI Systems Online
Type 'help' for available commands

SISTEMA OPERACIONAL REGISTRADO:
• INPI Brasil: BR512025002574-2 
• US Copyright: TX0009512048
• Hash SHA-256: 398603fafc37faf194527774520c291e0b3fe6a57ba3183c14bd336783ef0eab

Welcome to VERUM OS Enterprise Terminal.`,
        timestamp: new Date(),
        exitCode: 0
      };
      setCommands([welcomeCommand]);
    }
  }, []);

  const executeCommand = async (cmd: string) => {
    if (!cmd.trim()) return;

    setIsRunning(true);
    const commandId = Date.now().toString();
    
    // Adicionar comando ao histórico
    setCommandHistory(prev => [...prev, cmd]);
    setHistoryIndex(-1);

    // Simular processamento de comando
    let output = '';
    let exitCode = 0;

    const [baseCmd, ...args] = cmd.trim().split(' ');

    switch (baseCmd.toLowerCase()) {
      case 'help':
        output = `VERUM OS Terminal Commands:
=========================
Basic Commands:
  help              - Show this help message
  ls                - List directory contents
  cd <dir>          - Change directory
  pwd               - Show current directory
  cat <file>        - Display file contents
  echo <text>       - Display text
  clear             - Clear terminal
  history           - Show command history

System Commands:
  ps                - Show running processes
  top               - Display system processes
  df                - Show disk usage
  date              - Show current date/time
  uname             - System information
  whoami            - Current user
  calc <expr>       - Calculate mathematical expression

VERUM OS Specific:
  kernel-info       - Alpha AXP kernel information
  bootloader-status - Boot system status
  memory-map        - Virtual memory layout
  hardware-check    - Hardware validation
  witness-hash      - Generate witness hash
  axon-verify       - AXON OMEGA verification
  neural-analyze    - Neural network analysis
  quantum-status    - Quantum subsystem status`;
        break;

      case 'ls':
        output = `total 24
drwxr-xr-x  8 admin  admin   256 Jul 11 23:32 applications/
drwxr-xr-x  5 admin  admin   160 Jul 11 23:32 documents/
drwxr-xr-x  3 admin  admin    96 Jul 11 23:32 system/
drwxr-xr-x  4 admin  admin   128 Jul 11 23:32 ai-modules/
drwxr-xr-x  2 admin  admin    64 Jul 11 23:32 quantum/
-rw-r--r--  1 admin  admin  1024 Jul 11 23:32 kernel.img
-rw-r--r--  1 admin  admin   512 Jul 11 23:32 bootlx.exe
-rw-r--r--  1 admin  admin  2048 Jul 11 23:32 AXON_OMEGA_MACHINE_SEAL.json`;
        break;

      case 'pwd':
        output = currentPath;
        break;

      case 'whoami':
        output = 'admin (VERUM OS Enterprise User)';
        break;

      case 'date':
        output = new Date().toString();
        break;

      case 'uname':
        if (args[0] === '-a') {
          output = 'VERUM OS 2.4.1 Alpha-AXP-64 #1 SMP Enterprise Jul 11 2025 kernel-6.8.0-verum';
        } else {
          output = 'VERUM OS';
        }
        break;

      case 'ps':
        output = `  PID TTY           TIME CMD
    1 ??         0:01.23 /sbin/launchd
  147 ??         0:00.45 verum-kernel
  256 ??         0:00.12 axon-omega-daemon
  301 ??         0:00.08 neural-processor
  423 ??         0:00.15 quantum-bridge
  512 ??         0:00.03 ai-consolidator
  678 ttys000    0:00.02 terminal-interface
  789 ttys000    0:00.01 bash`;
        break;

      case 'df':
        output = `Filesystem     1K-blocks    Used Available Use% Mounted on
/dev/sda1       10485760 4194304   6291456  40% /
/dev/sda2        2097152  524288   1572864  25% /quantum
/dev/sda3        1048576  262144    786432  25% /ai-modules
tmpfs             524288   65536    458752  13% /tmp`;
        break;

      case 'calc':
        if (args.length > 0) {
          try {
            const expression = args.join(' ');
            // Avaliação segura de expressões matemáticas básicas
            const result = Function('"use strict"; return (' + expression.replace(/[^0-9+\-*/().\s]/g, '') + ')')();
            output = `${expression} = ${result}`;
          } catch (e) {
            output = `Erro: Expressão matemática inválida`;
            exitCode = 1;
          }
        } else {
          output = `Uso: calc <expressão>\nExemplo: calc 25*4+10`;
          exitCode = 1;
        }
        break;

      case 'kernel-info':
        output = `VERUM OS Alpha AXP Kernel Information:
====================================
Kernel Version:    6.8.0-verum-enterprise
Architecture:      Alpha AXP 64-bit
Build Date:        Jul 11 2025 23:32:15
Compiler:          GCC 4.6.3 (Alpha cross-compiler)
Page Size:         8192 bytes
VPTB Address:      0x200000000
PAL Code:          OSF/1 v1.3
SRM Console:       v7.4-1
Boot Protocol:     BOOTP/SRM
Loadable Modules:  245 loaded
Enterprise Mode:   ACTIVE`;
        break;

      case 'bootloader-status':
        output = `Alpha AXP Boot System Status:
============================
Primary Bootloader:    mkbb (Master Boot Block) - OK
Secondary Bootloader:  lxboot - LOADED
OS Loader:            bootlx.exe - ACTIVE
Kernel Image:         kernel.img - VERIFIED
PAL Code Status:      INITIALIZED
SRM Console:          READY
BOOTP Configuration:  VALID
Boot Device:          /dev/sda1
Last Boot:            Jul 11 2025 23:30:45
Boot Time:            2.34 seconds
Status:               HEALTHY`;
        break;

      case 'memory-map':
        output = `Alpha AXP Virtual Memory Layout:
===============================
User Space:           0x000000000 - 0x3FFFFFFFF (256GB)
Kernel Space:         0x400000000 - 0x7FFFFFFFF (256GB)
VPTB (Page Tables):   0x200000000 - 0x3FFFFFFFF
L1 Page Table:        0x1FFE00000 (self-mapped)
L2 Page Tables:       Dynamic allocation
L3 Page Tables:       Dynamic allocation
Page Size:            8192 bytes (8KB)
Physical Memory:      16GB installed
Available Memory:     15.2GB
Kernel Memory:        800MB
User Memory:          14.4GB
Page Fault Handler:   Active
TLB Status:           Operational`;
        break;

      case 'hardware-check':
        output = `Alpha AXP Hardware Validation:
=============================
CPU:                  Alpha 21264A @ 833MHz - OK
L1 Cache:             64KB I-cache + 64KB D-cache - OK
L2 Cache:             8MB unified - OK
Memory Controller:    ECC enabled - OK
PCI Bus:              64-bit @ 66MHz - OK
Storage Controller:   SCSI Ultra320 - OK
Network Interface:    Gigabit Ethernet - OK
Serial Ports:         2x RS232 - OK
Console:              SRM v7.4 - OK
Interrupt Controller: Tsunami chipset - OK
Real-Time Clock:      Battery OK
Overall Status:       ALL SYSTEMS OPERATIONAL`;
        break;

      case 'witness-hash':
        const witnessData = `VERUM-OS-${Date.now()}`;
        output = `WITNESS Protocol Hash Generation:
================================
Input Data:     ${witnessData}
SHA-256 Hash:   398603fafc37faf194527774520c291e0b3fe6a57ba3183c14bd336783ef0eab
Timestamp:      ${new Date().toISOString()}
Block Height:   #${Math.floor(Math.random() * 1000000)}
Status:         VERIFIED
Witness ID:     WS-${Date.now().toString(16).toUpperCase()}`;
        break;

      case 'axon-verify':
        output = `AXON OMEGA Verification System:
==============================
Machine Seal:       VALID
Signature:          4141deefb062166736f45f8e29aff84c288a94d6522f625195eea7ebfa73854c
Integrity Check:    PASSED
Security Level:     MAXIMUM
Encryption:         AES-256-GCM
Access Control:     ENTERPRISE
Threat Detection:   ACTIVE
Last Scan:          ${new Date().toLocaleTimeString()}
Status:             SECURE`;
        break;

      case 'neural-analyze':
        output = `Neural Processing Unit Analysis:
===============================
Claude Sonnet-4:    ONLINE (2.1s avg response)
GPT-4o:            STANDBY (fallback ready)
Processing Cores:   64 neural threads
Memory Pool:        8GB allocated
Cache Hit Rate:     97.3%
Model Accuracy:     99.1%
Parallel Tasks:     12 active
Quantum Bridge:     CONNECTED
Analysis Queue:     3 pending
Status:             OPTIMAL PERFORMANCE`;
        break;

      case 'quantum-status':
        output = `Quantum Subsystem Status:
========================
Quantum Cores:      16 qubits active
Entanglement:       STABLE (99.7% coherence)
Error Correction:   ACTIVE
Temperature:        15 millikelvin
Isolation:          MAINTAINED
Bridge Protocol:    SYNCHRONIZED
Processing Speed:   2.1 TFLOPS
Parallel Dimensions: 8 accessible
Tunnel Status:      OPEN
Status:             QUANTUM READY`;
        break;

      case 'clear':
        setCommands([]);
        setIsRunning(false);
        return;

      case 'history':
        output = commandHistory.map((cmd, index) => `${index + 1}  ${cmd}`).join('\n');
        break;

      case 'echo':
        output = args.join(' ');
        break;

      case 'cd':
        if (args.length === 0) {
          setCurrentPath('~/verum-os');
          output = '';
        } else {
          const newPath = args[0];
          if (newPath === '..') {
            const pathParts = currentPath.split('/');
            pathParts.pop();
            setCurrentPath(pathParts.join('/') || '~');
          } else if (newPath.startsWith('/')) {
            setCurrentPath(newPath);
          } else {
            setCurrentPath(`${currentPath}/${newPath}`);
          }
          output = '';
        }
        break;

      case 'cat':
        if (args[0] === 'AXON_OMEGA_MACHINE_SEAL.json') {
          output = `{
  "machine_id": "AXON-OMEGA-ENTERPRISE-001",
  "hash": "4141deefb062166736f45f8e29aff84c288a94d6522f625195eea7ebfa73854c",
  "signature": "VERUM-OS-ENTERPRISE-2025",
  "verification": "MAXIMUM-SECURITY-VALIDATED",
  "timestamp": "${new Date().toISOString()}",
  "status": "ACTIVE"
}`;
        } else {
          output = `cat: ${args[0] || 'filename'}: No such file or directory`;
          exitCode = 1;
        }
        break;

      default:
        output = `verum-bash: ${baseCmd}: command not found
Type 'help' for available commands`;
        exitCode = 1;
    }

    // Adicionar comando executado à lista
    const newCommand: Command = {
      id: commandId,
      command: cmd,
      output,
      timestamp: new Date(),
      exitCode
    };

    setCommands(prev => [...prev, newCommand]);
    setCurrentCommand('');
    setIsRunning(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(currentCommand);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[newIndex] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : -1;
        setHistoryIndex(newIndex);
        setCurrentCommand(newIndex === -1 ? '' : commandHistory[newIndex] || '');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Tab completion
      const matches = availableCommands.filter(cmd => cmd.startsWith(currentCommand));
      if (matches.length === 1) {
        setCurrentCommand(matches[0]);
      }
    }
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 left-4 z-50">
        <Button 
          onClick={onMaximize}
          className="bg-gray-900 border border-gray-700 text-green-400 hover:bg-gray-800"
        >
          <Terminal className="h-4 w-4 mr-2" />
          Terminal
        </Button>
      </div>
    );
  }

  return (
    <Card className="bg-black/95 border-green-400/20 text-green-400 font-mono text-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Terminal className="h-5 w-5" />
            <CardTitle className="text-green-400">VERUM OS Terminal</CardTitle>
            <Badge variant="outline" className="text-green-400 border-green-400/20">
              {isRunning ? 'Running' : 'Ready'}
            </Badge>
          </div>
          <div className="flex items-center space-x-1">
            <Button size="sm" variant="ghost" onClick={onMinimize} className="h-6 w-6 p-0 text-green-400 hover:bg-green-400/10">
              <Minimize2 className="h-3 w-3" />
            </Button>
            <Button size="sm" variant="ghost" onClick={onMaximize} className="h-6 w-6 p-0 text-green-400 hover:bg-green-400/10">
              <Maximize2 className="h-3 w-3" />
            </Button>
            <Button size="sm" variant="ghost" onClick={onClose} className="h-6 w-6 p-0 text-red-400 hover:bg-red-400/10">
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div 
          ref={outputRef}
          className="bg-black border border-green-400/20 rounded p-4 h-96 overflow-y-auto mb-4"
        >
          {commands.map((cmd) => (
            <div key={cmd.id} className="mb-2">
              <div className="text-blue-400">
                <span className="text-green-400">admin@verum-os</span>
                <span className="text-white">:</span>
                <span className="text-blue-400">{currentPath}</span>
                <span className="text-white">$ </span>
                {cmd.command}
              </div>
              {cmd.output && (
                <pre className="text-green-300 whitespace-pre-wrap mt-1 leading-relaxed">
                  {cmd.output}
                </pre>
              )}
            </div>
          ))}
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-green-400">admin@verum-os</span>
          <span className="text-white">:</span>
          <span className="text-blue-400">{currentPath}</span>
          <span className="text-white">$</span>
          <Input
            ref={inputRef}
            value={currentCommand}
            onChange={(e) => setCurrentCommand(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isRunning}
            className="flex-1 bg-transparent border-none text-green-400 placeholder-green-400/50 focus:ring-0 focus:border-none"
            placeholder="Digite um comando..."
            autoFocus
          />
          <Button
            onClick={() => executeCommand(currentCommand)}
            disabled={isRunning || !currentCommand.trim()}
            size="sm"
            className="bg-green-400/20 text-green-400 hover:bg-green-400/30 border border-green-400/30"
          >
            {isRunning ? <Square className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}