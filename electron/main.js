const path = require("path");
const { app, BrowserWindow, ipcMain } = require("electron");

const tcpServer = require("./tcp-server");

try {
  require("electron-reloader")(module);
} catch {}

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    titleBarStyle: "hidden",
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("index.html");
  tcpServer.start(win);
}

app.whenReady().then(() => {
  createWindow();
});
