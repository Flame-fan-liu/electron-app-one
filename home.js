const { Menu, app, BrowserWindow, BrowserView } = require("electron");
const path = require("path");

const createWindow = () => {
  Menu.setApplicationMenu(null);

  const win = new BrowserWindow({
    show: false,
    icon: "./assets/logo.png",
    frame: true,
    width: 1300,
    height: 600,
    hasShadow: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  win.setThumbnailClip({
    x: 0,
    y: 0,
    width: 360,
    height: 90
  })

  win.loadFile("./page/home/home.html");
  const left = new BrowserView();
  win.setBrowserView(left);
  left.setBounds({
    x: 0,
    y: 32,
    width: 500,
    height: 3000
  });
  left.setAutoResize({
    width: true,
    height: true,
    horizontal: true,
    vertical: false
  })
  left.webContents.openDevTools();
  left.webContents.loadFile("./page/leftmenu/leftmenu.html");
  win.once("ready-to-show", () => {
    win.show();
  })
}
app.whenReady().then(() => {
  createWindow()
  //用于mac的重新激活（切屏）
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on("window-all-colsed", () => {
  if (process.platform !== 'darwin') app.quit()
})