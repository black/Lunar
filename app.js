const electron = require('electron'),
    url = require('url'),
    path = require('path');

const { app, BrowserWindow } = electron;

let mainWindow;
// demo for abhay
app.on('ready', function() {
    mainWindow = new BrowserWindow();
    mainWindow.setMenu(null);
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));
});