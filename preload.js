const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld({
  node: () => process.version.node,
  chrome: () => process.version.chrome,
  electron: () => process.version.electron
})