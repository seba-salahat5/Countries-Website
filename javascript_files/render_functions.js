import { detailsPageController } from "./home.js";
const countriesContainer = document.getElementById('row');
const favouratesContainer = document.getElementById('favourates_area');

const main = document.getElementById('main');

export let renderCountries = function (countries, onStarClicked) {
  countriesContainer.innerHTML = '';
  if (countries.length == 0) {
    countriesContainer.innerHTML = '<h5 class="card-title text-start fw-bold adaptive-font">No results Found</h5>';
    return;
  }
  for (let country of countries) {
    let countryCard = document.createElement('div');
    countryCard.setAttribute('class', 'col');
    countryCard.setAttribute('id', `col-${country.cca2}`);
    countryCard.setAttribute('draggable', "true");

    countryCard.innerHTML = `<div class="card h-100 white" id=card-${country.cca2}>
        <img class="card-img-top" src=${country.flags.svg} alt=${country.name.common}>
        <div class="card-body" id="${country.name.common}">
          <h5 class="card-title text-start fw-bold">${country.name.common}</h5>
          <h6><span class="fw-bold">Population: </span><span>${country.population}</sapn>
          </h6>
          <h6><span class="fw-bold">Region: </span><span>${country.region}</sapn>
          </h6>
          <h6><span class="fw-bold">Capital: </span><span>${country.capital}</sapn>
          </h6>
        </div>
        <div class="d-lg-none d-flex flex-row-reverse py-2 px-2">
        <i class="fa-regular fa-star" id="${country.cca2}-starIcon"></i>
        </div>
      </div>`;

    countryCard.addEventListener('dragstart', onDragStart(country.cca2));
    countryCard.addEventListener('dragend', onDragEnd);

    countryCard.querySelector('i').addEventListener('click', (event) => {
      countryCard.querySelector('i').classList.toggle("fa-solid");
      onStarClicked(country);
    });

    countryCard.querySelector(`#card-${country.cca2}`).addEventListener('click', (event) => {
      onCountyClicked(country.cca2);
    });
    countriesContainer.appendChild(countryCard);
  };
};

let renderFavourateCountry = function (country, onRemoveClicked) {
  let favourateItem = document.createElement('span');
  favourateItem.setAttribute('class', 'd-flex justify-content-between my-2');
  favourateItem.setAttribute('id', `favorate-span-${country.cca2}`);
  favourateItem.innerHTML = `<span>
      <img class="favorite-card-img rounded" src= ${country.flags.svg}>
      <h5 class="mx-2 d-inline fw-bold">${country.name.common}</h5>
  </span>
  <i class="fa-solid fa-circle-xmark" id="close"></i>`;
  favourateItem.querySelector('i').addEventListener('click', (event) => {
    onRemoveClicked(country)
  });
  return favourateItem;
};

export let renderFavouratesList = function (favourates, onRemoveClicked) {
  favouratesContainer.querySelector('div').innerHTML = '';
  if (favourates) {
    for (let favourateItem of favourates) {
      favouratesContainer.querySelector('div').appendChild(renderFavourateCountry(favourateItem, onRemoveClicked));
      document.getElementById(`col-${favourateItem.cca2}`).querySelector('i').setAttribute('class', "fa-regular fa-star fa-solid");
    };
  };
};

function onDragStart(selectedCountry) {
  return (event) => {
    event.target.style.opacity = '0.5';
    event.dataTransfer.setData('text/plain', selectedCountry);
  }
};

function onDragEnd(event) {
  event.target.style.opacity = '1';
};

function onCountyClicked(country_code) {
  detailsPageController(country_code);
};

/* ************************************************* Details Page Functions ***************************************** */
export let displayDetails = function (data, borders) {
  main.innerHTML = '';
  main.innerHTML = `<button type="button" class="btn white shadow-sm fs-6 px-4" id="back-btn">
  <i class="fa-solid fa-arrow-left-long px-2"></i>Back
  </button>
  <div class="row g-5 my-1 adaptive-font">
    <div class="col-12 col-sm-12 col-md-6 col-lg-6" id="flag">
      <img class="img-fluid" src=${data.flag} alt= ${data.name}>
    </div>
    <div class="col-12 col-sm-12 col-md-6 col-lg-6" id="details">
        <h2 class="fw-bold" id="name">${data.name}</h2>
        <div class="row">
            <div class="my-4 col-12 col-sm-12 col-md-6 col-lg-6">
                <dt>
                    <h3 class="card-text fs-6 fw-semibold d-inline py-3">Native Name: </h3>
                    <h3 class="card-text fs-6 fw-normal d-inline py-3" id="native">${data.nativeName}</h3>
                </dt>
                <dt>
                    <h3 class="card-text fs-6 fw-semibold d-inline py-3">Population: </h3>
                    <h3 class="card-text fs-6 fw-normal d-inline py-3" id="population">${data.population}</h3>
                </dt>
                <dt>
                    <h3 class="card-text fs-6 fw-semibold d-inline py-3">Region: </h3>
                    <h3 class="card-text fs-6 fw-normal d-inline py-3" id="region">${data.region}</h3>
                </dt>
                <dt>
                    <h3 class="card-text fs-6 fw-semibold d-inline py-3">Sub Region: </h3>
                    <h3 class="card-text fs-6 fw-normal d-inline py-3" id="subRegion">${data.subregion}</h3>
                </dt>
                <dt>
                    <h3 class="card-text fs-6 fw-semibold d-inline py-3">Capital: </h3>
                    <h3 class="card-text fs-6 fw-normal d-inline py-3" id="capital">${data.capital}</h3>
                </dt>
            </div>
            <div class="my-4 col-12 col-sm-12 col-md-6 col-lg-6">
                <dt>
                    <h3 class="card-text fs-6 fw-semibold d-inline py-3">Top Level Domain: </h3>
                    <h3 class="card-text fs-6 fw-normal d-inline py-3" id="tld">${data.tld}</h3>
                </dt>
                <dt>
                    <h3 class="card-text fs-6 fw-semibold d-inline py-3">Currencies: </h3>
                    <h3 class="card-text fs-6 fw-normal d-inline py-3" id="currencies">${data.currency}</h3>
                </dt>
                <dt>
                    <h3 class="card-text fs-6 fw-semibold d-inline py-3">Languages: </h3>
                    <h3 class="card-text fs-6 fw-normal d-inline py-3" id="languages">${data.languages}</h3>
                </dt>
            </div>
        </div>

        <div class="col-12 col-sm-12 col-md-6 col-lg-6 d-inline" id="border-countries">
            <h3 class="card-text fs-6 fw-semibold py-3 d-lg-inline d-sm-block">Border Countries:</h3>
        </div>

    </div>
  </div>`;

  let back_button = document.getElementById('back-btn');
  back_button.addEventListener('click', (event) => {
    window.location.replace('http://127.0.0.1:5500/home.html');
  });

  if (borders) {
    let bordersContainer = document.getElementById('border-countries');
    displayBorderCountries(borders, bordersContainer);
  };
};

let displayBorderCountries = function (borderCountries, bordersContainer) {
  borderCountries.forEach(border_country => {
    bordersContainer.innerHTML +=
      `<button class="btn border-btn shadow-sm d-inline white mx-2 px-1 my-2 py-1" type="button">${border_country[0].name.common}</button>`;
  });
};