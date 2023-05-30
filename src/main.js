const { app, BrowserWindow } = require('electron');
const path = require('path');

// 引入 PostCSS 和 Tailwind CSS 相关文件
// const postcss = require('postcss')
// const tailwindcss = require('tailwindcss')
// const fs = require("fs");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 250,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // 在窗口完成加载后，执行以下代码
//   mainWindow.webContents.on('did-finish-load', () => {
//     // 获取 index.html 文件的路径
//     const filePath = path.join(__dirname, '../../index.html')
// // console.log(filePath);
//
//     // 读取 index.html 文件的内容
//     fs.readFile(filePath, 'utf8', (err, data) => {
//       if (err) throw err
// // console.log(data)
//
//       // 使用 PostCSS 和 Tailwind CSS 编译样式表
//       postcss([tailwindcss])
//           .process(data)
//           .then(result => {
//             // 将编译后的样式表插入到 index.html 中
//             mainWindow.webContents.insertCSS(result.css)
//           })
//           .catch(err => console.error('tailwindcss', err))
//     })
//   })

};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  // if (BrowserWindow.getAllWindows().length === 0) {
  //   createWindow();
  // }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
