const { app, BrowserWindow } = require('electron');
const path = require('node:path');
const { findProducto } = require('../app/model/findProducto.js');
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, '../app/views/home/index.html'));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.on('FindProducto', (event, data) => {

  const ean = data;

  try {
    console.log('Datos recibidos en main.js/consultar ean:', data);

    findProducto(ean, (error, resultado, producto, descripcion, precio, cantidad, idProducto) => {
      if (error) {
        console.error("Error en el procedimiento:", error);
        dialog.showMessageBox({
          type: 'warning',
          title: 'Ocurrió Fallo',
          message: 'Recarga la entrada. Detalles: ' + error.message,
          buttons: ['OK'],
        });
      }

          if (resultado) {
              console.log("entró al resultad");
              event.sender.send('FindLineaResult', {
                producto: producto,
                descripcion: descripcion,
                precio: precio,
                cantidad: cantidad,
                idEan: idEan
              });
           }
           else{
              dialog.showMessageBox({
                type: 'error',
                title: 'Ocurrió un Fallo',
                message: 'No existe el Codigo consultado ',
                buttons: ['OK'],
              });
              console.log('No se pudo registrar la linea');
              event.sender.send('FindLineaResult', {
                error:'error'
              });
           }
      
    });
  } catch (error) {
    console.error("Error en el procedimiento:", error);
    return callback(error, null);
  }

});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
