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
import {MainInit} from "./app_modules/Initialisation/PrimaryInitialisation.mjs";
//////////////////////////////////////////////////////////////////////////////////////////////////////
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dev = true;


const electron = MainInit.initElectron();
const comms = MainInit.initCommsHandler(electron.ipc);

electron.app.whenReady().then(() => {
    MainInit.createElectron(dev, __dirname);
});

electron.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});