const { app, BrowserWindow } = require('electron');
const { OpenAI } = require("openai");

require('dotenv').config()

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

async function chatTest() {
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: 'Say this is a test' }],
    model: 'gpt-3.5-turbo',
  });

  console.log(chatCompletion.choices[0].message.content);
}

chatTest();

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
