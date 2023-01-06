const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI',{
  findAll: () => ipcRenderer.invoke('findAll')
})