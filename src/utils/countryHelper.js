import { getLocalization } from "../utils/localizationHelper";

export const getLocalizedCountryByCode = (countries, countryCode, locale) => {
  const country = countries.find(value => value.isoCode === countryCode);
  const countryDisplayName = country ? country.name : null;
  const countryLocalized = countryDisplayName
    ? getLocalization(countryDisplayName, locale, countryCode)
    : null;
  return countryLocalized;
}

