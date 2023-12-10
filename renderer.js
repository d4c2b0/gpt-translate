console.log('Hello, world.');

console.log(window.electron);

const information = document.getElementById('info')
information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`

const translateForm = document.getElementById('translate-form')
const translateLanguage = document.getElementById('translate-language')
const translateInput = document.getElementById('translate-input')
const translateOutput = document.getElementById('translate-output')

translateForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const userInput = translateInput.value.trim();
    if (!userInput) return;
    const language = translateLanguage.value;

    const response = await window.electron.translateText(userInput, `${language}`);

    console.log(response);

    translateOutput.textContent = response;
})
