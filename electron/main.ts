import {app, BrowserWindow, Tray} from 'electron'
import path from 'path'

let tray = null;
app.commandLine.appendSwitch('lang', 'zh-CN'); // 设置语言为中文

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        icon: path.join(__dirname, '../assets/my-logo.png'),
    })
    win.loadURL('https://www.kkwnhub.com');
    // win.webContents.openDevTools()
    tray = new Tray(path.join(__dirname, '../assets/my-logo.png')); // 设置托盘图标
    tray.setToolTip('爱盼-网盘资源搜索');
    tray.on('click', () => {
        win.isVisible() ? win.hide() : win.show();
    });
}

app.whenReady().then(() => {
    createWindow();
    // win.webContents.openDevTools()
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });

})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});