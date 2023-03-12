let localStorageValue;
export let setInLocalStorage = function (key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
        localStorageValue = { key: key, value: value };
    }
};
export let getFromLocalStorage = function (key) {
    try {
        return JSON.parse(localStorage.getItem(key));
    } catch (err) {
        return localStorageValue[key];
    }
};