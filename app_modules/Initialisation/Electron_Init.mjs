/**
 * @module Electron_Init
 * @description collection of functions directly related to the initialisation of electron, browser windows, etc.
 * @version 0.1
 * @author DRAW
 */
///////////////////////////////////////////////////////////////////////////////////////////////////////
import {createRequire} from 'module';
const require = createRequire(import.meta.url);
const {app, BrowserWindow, ipcMain} = require('electron');
import path from 'path';
import {fileURLToPath} from "url";
///////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * @function createWindow
 * @description creates the main application window, with appropriate configurations
 * @param {boolean} dev Flag for whether to spawn electron in vite dev server, or to a build local
 * @param {string} __dirname The path to the build directory, where a production ready application would open electron too
 * @returns {BrowserWindow} An object containing
 */
function createMainWindow(dev, __dirname) {
    const window = new BrowserWindow({
        width: 1920,
        height: 1080,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true,
        }
    });
    if (dev) {
        window.loadURL('http://localhost:5173');
    } else {
        window.loadFile(path.join(__dirname, 'dist/index.html'));
    }
    return window;
}
////////////////////////////////////////////////////////////////////////////////////////////////////////
function getMainDependencies() {
    return {
        app: app,
        ipc: ipcMain
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////
export const ElectronInit ={
    createMainWindow,
    getMainDependencies
}