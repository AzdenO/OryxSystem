import {contextBridge, ipcRenderer} from "electron"

contextBridge.exposeInMainWorld('backend',{
    runCommand: (command, args) => ipcRenderer.invoke("run-command", command, args)
})