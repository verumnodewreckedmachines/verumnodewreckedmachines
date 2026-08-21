const { app, BrowserWindow } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

let mainWindow;
let serverProcess;

const isDev = process.env.NODE_ENV === 'development';

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
    },
    title: 'VERUM NODE - AI Assistant',
    autoHideMenuBar: true,
  });

  if (isDev) {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    const frontendPath = path.join(process.resourcesPath, 'dist', 'client', 'index.html');
    console.log('Loading frontend from:', frontendPath);
    mainWindow.loadFile(frontendPath);
  }

  mainWindow.on('closed', () => {
    if (serverProcess) serverProcess.kill();
    mainWindow = null;
  });
}

function startServer() {
  return new Promise((resolve, reject) => {
    const serverPath = path.join(process.resourcesPath, 'dist', 'server', 'index.js');
    console.log('Starting server from:', serverPath);
    
    // Use tsx loader to run ESM files
    const tsxLoader = path.join(process.resourcesPath, 'node_modules', 'tsx', 'dist', 'index.mjs');
    console.log('Using tsx loader:', tsxLoader);
    
    serverProcess = spawn(
      process.execPath,
      ['--import', tsxLoader, serverPath],
      {
        cwd: path.join(process.resourcesPath, 'dist', 'server'),
        env: {
          ...process.env,
          NODE_ENV: 'production',
          PORT: '5000',
        },
      }
    );

    serverProcess.stdout.on('data', (data) => {
      const output = data.toString();
      console.log('Server:', output);
      if (output.includes('serving on port') || output.includes('Express')) {
        setTimeout(resolve, 2000);
      }
    });

    serverProcess.stderr.on('data', (data) => {
      console.error('Server error:', data.toString());
    });

    serverProcess.on('error', reject);
    serverProcess.on('close', (code) => {
      console.log('Server exited with code:', code);
    });
  });
}

app.whenReady().then(async () => {
  try {
    await startServer();
    console.log('Backend server started');
  } catch (err) {
    console.error('Server start error:', err);
  }
  
  createWindow();
  
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (serverProcess) serverProcess.kill();
  if (process.platform !== 'darwin') app.quit();
});
