const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path')
const { OpenAI } = require("openai");
require('dotenv').config()

console.log('Hello from Electron 👋')

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

async function translateText(text, into, from = "") {
  try {
    const chatCompletion = await openai.chat.completions.create({
      messages: [
        { role: 'user', content: `${text}` },
        { role: 'user', content: `Translate that ${from} text into ${into}.`}
      ],
      model: 'gpt-3.5-turbo',
    });
    console.log(chatCompletion.choices[0].message.content);
  } catch (error) {
    console.error('Error while translate text: ' + error)
    throw error;
  }
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: 'マイアプリ',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.loadFile('index.html');
};

app.once('ready', () => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
