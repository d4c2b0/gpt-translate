const { app, BrowserWindow, ipcMain } = require('electron');
const { OpenAI } = require("openai");

require('dotenv').config()

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
    width: 600,
    height: 400,
    title: 'マイアプリ',
  });

  mainWindow.loadFile('index.html');
};

app.once('ready', () => {
  createWindow();
});

app.once('window-all-closed', () => app.quit());
