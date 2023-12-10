const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
})

contextBridge.exposeInMainWorld('electron', {
    translateText: async (text, into, from = "") => {
        return await ipcRenderer.invoke('translate-text', text, into, from = "");
    }
})
