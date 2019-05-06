const {
    dialog,
    BrowserWindow,
    ipcMain
} = require('electron')
const {
    autoUpdater
} = require('electron-updater')

autoUpdater.logger = require('electron-log')
autoUpdater.transport.file.level = 'info'

autoUpdater.autoDownload = false

exports.check = () => {
    autoUpdater.checkForUpdates()

    autoUpdater.on('update-available', () => {
        let downloadProgress = 0

        dialog.showMessageBox({
            type: 'info',
            title: 'Update Available',
            message: 'A new version of the app is available. Do you want to update now?',
            buttons: ['Update', 'No']
        }, (buttonIndex) => {
            if (buttonIndex !== 0) return
            autoUpdater.downloadUpdate()

            let progressWin = new BrowserWindow({
                width: 350,
                height: 35,
                useContentSize: true,
                autoHideMenuBar: true,
                maximizable: false,
                fullscreen: false,
                resizable: false
            })

            progressWin.loadURL(`file://$(__dirname)/renderer/progress.html`)

            progressWin.on('closed', () => progressWin = null)

            ipcMain.on('download-progress-request', (e) => {
                e.returnValue = downloadProgress
            })

            autoUpdater.on('download-progress', (d) => {
                downloadProgress = d.percent
            })

            autoUpdater.on('update-downloaded', () => {
                if (progressWin) progressWin.close()

                dialog.showMessageBox({
                    type: 'info',
                    title: 'Update Ready',
                    message: 'A new version of the app is ready. Quit and install now?',
                    buttons: ['Yes', 'Later']
                }, (buttonIndex) => {
                    if (buttonIndex === 0) autoUpdater.quitAndInstall()
                })
            })
        })
    })
}