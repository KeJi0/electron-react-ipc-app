const {app, BrowserWindow, ipcMain} = require('electron');
const isDev = require('electron-is-dev');   
const path = require('path');
const {getConnection} = require('./connection');

let win ;
let connection;

function createWindow() {
    win  = new BrowserWindow({
        width:800,
        height:600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });
    // const startURL = isDev ? 'http://localhost:3000' :
    //  `file://${path.join(__dirname, '../build/index.html')}`;
    // win.loadURL(startURL); //npm run dev
    const startURL = `file://${path.join(__dirname, '../build/index.html')}`;//npm run estart
    win.loadURL(startURL);
 
     // Open the DevTools.
    if (isDev) {
        win.webContents.openDevTools({ mode: 'detach' });
    } 
   
}
async function createConnection() {
    connection =await getConnection();
    connection.connect();
    var  sql = 'SELECT * FROM material';
    const [rows,fields] = await connection.query(sql);
    console.log(rows);
}

app.whenReady().then(()=> {
    createWindow();
    createConnection();
})

app.on('window-all-closed', (e) => {
    if (process.platform !== 'darwin') app.quit()
    connection.end();
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
});

ipcMain.handle('findAll', async() => {
    var sql = 'SELECT * FROM material';
    var [rows,fields] = await connection.query(sql);
    return rows;
    
})