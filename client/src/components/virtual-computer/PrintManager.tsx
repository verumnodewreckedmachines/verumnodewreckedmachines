import React, { useState, useEffect } from 'react';
import { Printer, FileText, Image, Download, CheckCircle, Clock, AlertCircle, X } from 'lucide-react';

interface PrintJob {
  id: string;
  name: string;
  type: 'document' | 'image' | 'webpage' | 'report';
  pages: number;
  copies: number;
  printer: string;
  status: 'queued' | 'printing' | 'completed' | 'error';
  progress: number;
  timestamp: string;
  size: string;
}

interface PrinterDevice {
  id: string;
  name: string;
  type: 'laser' | 'inkjet' | 'virtual' | 'pdf';
  status: 'online' | 'offline' | 'busy';
  location: string;
  color: boolean;
  duplex: boolean;
}

export default function PrintManager() {
  const [printJobs, setPrintJobs] = useState<PrintJob[]>([]);
  const [printers, setPrinters] = useState<PrinterDevice[]>([
    {
      id: 'verum-laser-01',
      name: 'VERUM Laser Pro',
      type: 'laser',
      status: 'online',
      location: 'VERUM Office - Floor 2',
      color: false,
      duplex: true
    },
    {
      id: 'verum-color-01',
      name: 'VERUM Color Express',
      type: 'inkjet',
      status: 'online',
      location: 'VERUM Office - Design Dept',
      color: true,
      duplex: false
    },
    {
      id: 'verum-pdf-01',
      name: 'VERUM PDF Generator',
      type: 'pdf',
      status: 'online',
      location: 'Virtual Printer',
      color: true,
      duplex: true
    }
  ]);
  const [selectedPrinter, setSelectedPrinter] = useState('verum-laser-01');
  const [newJobForm, setNewJobForm] = useState({
    name: '',
    type: 'document' as PrintJob['type'],
    pages: 1,
    copies: 1
  });

  // Simular progresso de impressão
  useEffect(() => {
    const interval = setInterval(() => {
      setPrintJobs(prev => prev.map(job => {
        if (job.status === 'printing' && job.progress < 100) {
          const newProgress = Math.min(job.progress + Math.random() * 15, 100);
          return {
            ...job,
            progress: newProgress,
            status: newProgress >= 100 ? 'completed' : 'printing'
          };
        }
        return job;
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const addPrintJob = () => {
    if (!newJobForm.name.trim()) return;

    const newJob: PrintJob = {
      id: `job-${Date.now()}`,
      name: newJobForm.name,
      type: newJobForm.type,
      pages: newJobForm.pages,
      copies: newJobForm.copies,
      printer: selectedPrinter,
      status: 'queued',
      progress: 0,
      timestamp: new Date().toLocaleTimeString(),
      size: `${(Math.random() * 5 + 0.5).toFixed(1)} MB`
    };

    setPrintJobs(prev => [newJob, ...prev]);
    
    // Iniciar impressão após 2 segundos
    setTimeout(() => {
      setPrintJobs(prev => prev.map(job => 
        job.id === newJob.id ? { ...job, status: 'printing' } : job
      ));
    }, 2000);

    // Reset form
    setNewJobForm({
      name: '',
      type: 'document',
      pages: 1,
      copies: 1
    });
  };

  const cancelJob = (jobId: string) => {
    setPrintJobs(prev => prev.filter(job => job.id !== jobId));
  };

  const getStatusIcon = (status: PrintJob['status']) => {
    switch (status) {
      case 'queued': return <Clock className="h-4 w-4 text-yellow-400" />;
      case 'printing': return <Printer className="h-4 w-4 text-blue-400 animate-pulse" />;
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'error': return <AlertCircle className="h-4 w-4 text-red-400" />;
    }
  };

  const getTypeIcon = (type: PrintJob['type']) => {
    switch (type) {
      case 'document': return <FileText className="h-4 w-4" />;
      case 'image': return <Image className="h-4 w-4" />;
      case 'webpage': return <Download className="h-4 w-4" />;
      case 'report': return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="h-full bg-gradient-to-br from-gray-900 to-black p-6 text-white overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Printer className="h-8 w-8 text-blue-400" />
          <h1 className="text-2xl font-bold">VERUM Print Manager</h1>
          <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded text-sm">
            {printJobs.filter(j => j.status === 'printing').length} Active
          </span>
        </div>
        <div className="text-sm text-gray-400">
          {printers.filter(p => p.status === 'online').length} Printers Online
        </div>
      </div>

      {/* Add New Print Job */}
      <div className="bg-gray-800/50 rounded-lg p-4 mb-6 border border-gray-700">
        <h2 className="text-lg font-semibold mb-4 text-white">New Print Job</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Document Name</label>
            <input
              type="text"
              value={newJobForm.name}
              onChange={(e) => setNewJobForm(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter document name..."
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Type</label>
            <select
              value={newJobForm.type}
              onChange={(e) => setNewJobForm(prev => ({ ...prev, type: e.target.value as PrintJob['type'] }))}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="document">Document</option>
              <option value="image">Image</option>
              <option value="webpage">Webpage</option>
              <option value="report">Report</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Printer</label>
            <select
              value={selectedPrinter}
              onChange={(e) => setSelectedPrinter(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {printers.map(printer => (
                <option key={printer.id} value={printer.id}>
                  {printer.name} ({printer.status})
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex space-x-2">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-300 mb-1">Pages</label>
              <input
                type="number"
                min="1"
                value={newJobForm.pages}
                onChange={(e) => setNewJobForm(prev => ({ ...prev, pages: parseInt(e.target.value) || 1 }))}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-300 mb-1">Copies</label>
              <input
                type="number"
                min="1"
                value={newJobForm.copies}
                onChange={(e) => setNewJobForm(prev => ({ ...prev, copies: parseInt(e.target.value) || 1 }))}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
        
        <button
          onClick={addPrintJob}
          disabled={!newJobForm.name.trim()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Add to Print Queue
        </button>
      </div>

      {/* Print Queue */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4 text-white">Print Queue</h2>
        {printJobs.length === 0 ? (
          <div className="bg-gray-800/30 rounded-lg p-8 text-center border border-gray-700">
            <Printer className="h-12 w-12 text-gray-500 mx-auto mb-3" />
            <p className="text-gray-400">No print jobs in queue</p>
          </div>
        ) : (
          <div className="space-y-3">
            {printJobs.map(job => (
              <div key={job.id} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {getTypeIcon(job.type)}
                    <div>
                      <h3 className="font-medium text-white">{job.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span>{printers.find(p => p.id === job.printer)?.name}</span>
                        <span>{job.pages} pages • {job.copies} copies</span>
                        <span>{job.size}</span>
                        <span>{job.timestamp}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(job.status)}
                    <span className="text-sm font-medium capitalize text-gray-300">
                      {job.status}
                    </span>
                    {job.status === 'printing' && (
                      <div className="w-24 bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${job.progress}%` }}
                        />
                      </div>
                    )}
                    {(job.status === 'queued' || job.status === 'printing') && (
                      <button
                        onClick={() => cancelJob(job.id)}
                        className="p-1 text-gray-400 hover:text-red-400 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Available Printers */}
      <div>
        <h2 className="text-lg font-semibold mb-4 text-white">Available Printers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {printers.map(printer => (
            <div key={printer.id} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-white">{printer.name}</h3>
                <div className={`w-3 h-3 rounded-full ${
                  printer.status === 'online' ? 'bg-green-400' :
                  printer.status === 'busy' ? 'bg-yellow-400' : 'bg-red-400'
                }`} />
              </div>
              <div className="text-sm text-gray-400 space-y-1">
                <div>Type: {printer.type.charAt(0).toUpperCase() + printer.type.slice(1)}</div>
                <div>Location: {printer.location}</div>
                <div className="flex space-x-3">
                  <span>Color: {printer.color ? 'Yes' : 'No'}</span>
                  <span>Duplex: {printer.duplex ? 'Yes' : 'No'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}