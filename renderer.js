console.log('Hello, world.');

const translateForm = document.getElementById('translate-form')
const translateInput = document.getElementById('translate-input')
const translateOutput = document.getElementById('translate-output')

translateForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const userInput = translateInput.value.trim();
    if (!userInput) return;

    translateOutput.textContent = userInput;
})
