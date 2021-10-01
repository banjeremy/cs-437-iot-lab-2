const { app, BrowserWindow } = require('electron');

try {
  require('electron-reloader')(module);
} catch {}

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    titleBarStyle: 'hidden',
    resizable: false,
  });

  win.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();
});
