import { setInLocalStorage, getFromLocalStorage } from "./local_storage_functions.js";

const darkModeButton = document.getElementById('darkMode_btn');
const body = document.body;
let darkMode = getFromLocalStorage('darkMode');

export let initializeDarkMode = function () {
    applyMode();
    darkModeButton.addEventListener('click', (event) => {
        switchMode();
    });
};
export let switchMode = function () {
    darkMode = !darkMode;
    setInLocalStorage('darkMode', darkMode);
    applyMode();
};

let applyMode = function () {
    body.setAttribute('class', '');
    darkModeButton.innerHTML = "Dark Mode";
    if (darkMode) {
        body.setAttribute('class', 'darkmode');
        darkModeButton.innerHTML = "Light Mode";
    }
};