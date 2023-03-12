import { API_URL } from "./constants.js";

let lastRequest;

export let fetchCountries = function () {
    let url = `${API_URL}/all`;
    return fetch(url)
        .then((response) => {
            switch (response.status) {
                case 200:
                    return response.json();
                default:
                    return null;
            }
        });
};

export let loadCountries = function (searchValue) {
    let controller = new AbortController();
    let activeRequest = { value: searchValue || '', controller: controller };
    lastRequest = activeRequest;
    return new Promise(async (resolve, reject) => {
        let url = '';
        searchValue == '' ? url = `${API_URL}/all` : url = `${API_URL}/name/${searchValue}`;
        fetch(url, { signal: controller.signal })
            .then((response) => {
                if (lastRequest === activeRequest) {
                    switch (response.status) {
                        case 200:
                            resolve(response.json());
                            break;
                        case 404:
                            resolve([]);
                        default:
                            resolve(null);
                    }
                }
                else {
                    activeRequest.controller.abort();
                }
            });
    });
};

/* *********************************************** Details Page Functions ******************************************** */

export let loadCountryDetails = async function (countryCode) {
    let response = await fetch(`${API_URL}/alpha/${countryCode}`);

    if (!response.ok) {
        throw new Error(`Failed to fetch countries: ${response.status}`);
    }
    let info = await response.json();
    let data = {
        "flag": info[0].flags.svg,
        "borders": info[0].borders,
        "name": info[0].name.common,
        "nativeName": Object.entries(info[0].name.nativeName)[0][1].common,
        "population": info[0].population,
        "region": info[0].region,
        "subregion": info[0].subregion,
        "capital": info[0].capital,
        "tld": info[0].tld,
        "currency": Object.entries(info[0].currencies)[0][1].name,
        "languages": Object.values(info[0].languages).join(', '),
    };
    return data;
};

export let loadBorderCountries = async function (bordersCodes) {
    let borderContries = [];
    if (bordersCodes) {
        for (let borderIndex = 0; borderIndex < bordersCodes.length; borderIndex++) {
            try {
                let response = await fetch(`${API_URL}/alpha/${bordersCodes[borderIndex]}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch countries: ${response.status}`);
                }
                let country = await response.json();
                borderContries.push(country)
            } catch (e) {
                console.log(e);
            }
        }
    }
    return borderContries;
};
