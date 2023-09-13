const { Menu, app, BrowserWindow } = require("electron");
const path = require("path");

const createWindow = () => {
  Menu.setApplicationMenu(null);

  const win = new BrowserWindow({
    show: false,
    icon: "./assets/logo.png",
    frame: true,
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  win.once("ready-to-show", () => {
    win.show();
  })

  win.loadFile("./page/home/home.html")
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