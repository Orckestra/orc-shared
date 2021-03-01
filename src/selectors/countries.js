import { currentLocaleOrDefault } from "./locale";
import { getLocalization } from "../utils/localizationHelper";
import { createSelector } from "reselect";

const countriesData = state => state.get("countries");

export const mappedCountries = createSelector(countriesData, data => {
	const countries = data.toJS();
	return Object.keys(countries).map(key => countries[key]);
});

export const localizedCountry = countryCode =>
	createSelector(countriesData, currentLocaleOrDefault, (countries, locale) => {
		const countryName = countries.getIn([countryCode, "name"]);
		const displayName = countryName ? countryName.toJS() : null;
		const country = getLocalization(displayName, locale, countryCode);
		return country;
	});
