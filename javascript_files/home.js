import { fetchCountries, loadCountries, loadCountryDetails, loadBorderCountries } from "./API_Functions.js";
import { renderCountries, renderFavouratesList, displayDetails } from "./render_functions.js";
import { onFilterChange, onDropdownEvent, onSearchEvent, onDropEvent } from "./countries_functions.js";
import { setInLocalStorage, getFromLocalStorage } from "./local_storage_functions.js";
import { removeFromList, addToList } from "./favourates_functions.js";
import { initializeDarkMode } from "./darkMode_functions.js";

let countries = [];
let filteredCountries = [];
let selectedRegion = 'No Filter';
let searchValue = '';
let favourateCountries = getFromLocalStorage('favourates') || [];

async function homePageController() {
    onSearchEvent(async (searchString) => {
        searchValue = searchString;
        countries = await loadCountries(searchValue);
        updateCountries();
    });

    onDropdownEvent((filter) => {
        selectedRegion = filter;
        updateCountries();
    });

    onDropEvent((favourateCountryCode) => {
        let favourateCountry = countries.find(country => country.cca2 == favourateCountryCode);
        addToFavourates(favourateCountry);
    });

    countries = await fetchCountries();
    updateCountries();
    renderFavouratesList(favourateCountries, removeFromFavourates);
    initializeDarkMode();
};

let updateCountries = function () {
    filteredCountries = onFilterChange(countries, favourateCountries, selectedRegion);
    renderCountries(filteredCountries, onStarClicked);
};

let onStarClicked = function (country) {
    let addOrRemove = favourateCountries.some((favCountry) => favCountry.cca2 == country.cca2);
    addOrRemove ? removeFromFavourates(country) : addToFavourates(country);
};

let addToFavourates = function (country) {
    favourateCountries = addToList(favourateCountries, country)
    updateFavourates();
};

let removeFromFavourates = function (country) {
    favourateCountries = removeFromList(favourateCountries, country);
    updateFavourates();
    updateCountries();
};

let updateFavourates = function () {
    setInLocalStorage('favourates', favourateCountries);
    renderFavouratesList(favourateCountries, removeFromFavourates);
};

export let detailsPageController = async function (countryCode) {
    let data = await loadCountryDetails(countryCode);
    let borders = await loadBorderCountries(data.borders);
    displayDetails(data, borders);
};
homePageController();