const { app, BrowserWindow } = require("electron");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600
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