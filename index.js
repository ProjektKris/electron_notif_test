const electron = require('electron');
const path = require('path');
const { app, ipcMain, contextBridge, Notification, BrowserWindow } = electron;

let mainWindow;

// listen for app to be ready
app.on('ready', () => {
    console.log('app ready');

    // create new window
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    // load html to the window
    mainWindow.loadFile(path.join(__dirname, 'index.html'));
})

ipcMain.on('toMain', (event, args) => {
    switch(args) {
        case 'push:notif':
            console.log('pushing notif');
            const notif = {
                title: 'Title',
                body: 'Notification from the main process'
            };
            new Notification(notif).show();
            break;
        default:
            console.log('unknown arg');
            break;
    }
})