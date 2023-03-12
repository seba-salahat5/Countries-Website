export let addToList = function (favourates, countryToAdd){
    if (!favourates.some((favCountry) => favCountry.cca2 == countryToAdd.cca2)) {
        return [ ...favourates, countryToAdd];
    }
    else return favourates;
}

export let removeFromList = function (favourates, countryToRemove){
    let favourtesAfterRemove = favourates.filter(country => country.cca2 != countryToRemove.cca2);
    return favourtesAfterRemove;
}
