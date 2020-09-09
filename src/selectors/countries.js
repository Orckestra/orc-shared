import { currentLocaleOrDefault } from "./locale";
import { getLocalization } from "../utils/localizationHelper";
import { createSelector } from "reselect";

const countriesData = state => state.get("countries");

export const localizedCountry = countryCode =>
  createSelector(countriesData, currentLocaleOrDefault,
    (countries, locale) => {
      const countryDisplayName = countries.getIn([countryCode, "name"]);
      const country = countryDisplayName
        ? getLocalization(countryDisplayName.toJS(), locale, countryCode)
        : null;
      return country;
    })
