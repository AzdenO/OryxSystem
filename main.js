/**
 * @module main
 * @description The main application file
 * @version 0.1
 * @author DRAW
 */
//////////////////////////////////////////////////////////////////////////////////////////////////////
import path from 'path';
import {fileURLToPath} from "url";
//////////////////////////////////////////////////////////////////////////////////////////////////////
import CommsHandler from "./app_modules/root/CommsHandler.mjs";
import System from "./app_modules/root/System/System.mjs";
import {MainInit} from "./app_modules/Initialisation/PrimaryInitialisation.mjs";
import SystemInitialisation from "./app_modules/Initialisation/SystemInitialisation.mjs";
//////////////////////////////////////////////////////////////////////////////////////////////////////
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dev = true;
console.log("Working Directory: "+__dirname);

const electron = MainInit.initElectron();
const comms = await MainInit.initCommsHandler(electron.ipc);
const initDat = await SystemInitialisation.initialize(__dirname);
const system = new System(initDat.Core, initDat.Secondary, initDat.Parser)

electron.ipc.handle('run-command', async (event,args) => {
    const res = await system.processor(args);
    return {
        success: res.success,
        data: res.data,
    }
})

///////////////////////////////////////////////////////////////////////
electron.app.whenReady().then(() => {
    MainInit.createElectron(dev, __dirname);
});
///////////////////////////////////////////////////////////////////////
electron.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
///////////////////////////////////////////////////////////////////////