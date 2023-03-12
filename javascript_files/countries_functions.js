import { FILTER_OPTIONS_ID, SEARCH_FIELD_ID, DROP_AREA_ID } from "./constants.js"

const filterOptions = document.querySelectorAll(FILTER_OPTIONS_ID);
const searchField = document.getElementById(SEARCH_FIELD_ID);
const dropTarget = document.getElementById(DROP_AREA_ID);

let debounceDelay;

export let onDropdownEvent = function (cb) {
    let filter = '';
    filterOptions.forEach(option => option.onclick = function () {
        filter = this.innerHTML;
        cb(filter);
    });
};

export let onSearchEvent = function (cb) {
    searchField.addEventListener('input', async (event) => {
        cb(event.target.value);
        clearTimeout(debounceDelay);
        debounceDelay = setTimeout(() => {
            cb(event.target.value);
        }, 500);
    });
};

export let onDropEvent = function (cb) {
    let dropAreaClass = dropTarget.className;

    dropTarget.addEventListener("dragover", (event) => {
        dropTarget.setAttribute('class', `${dropAreaClass} ondragOver`);
        event.preventDefault();
    });

    dropTarget.addEventListener("dragleave", (event) => {
        dropTarget.setAttribute('class', dropAreaClass);
        event.preventDefault();
    });

    dropTarget.addEventListener("drop", (event) => {
        dropTarget.setAttribute('class', dropAreaClass);
        cb(event.dataTransfer.getData("text/plain"));
    });
};

export let onFilterChange = function (countries, favourates, selectedFilter) {
    let filteredCountries;
    selectedFilter == 'Favourites'
        ? filteredCountries = countries.filter(country => favourates.find(favCountry => favCountry.cca2 == country.cca2))
        : filteredCountries = countries.filter(country => country.region == selectedFilter || selectedFilter == 'No Filter');
    return filteredCountries;
}