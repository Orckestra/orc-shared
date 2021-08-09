import { makeActionTypes } from "./makeApiAction";
import makeOrcApiAction from "./makeOrcApiAction";
import { getCountriesRequest } from "./requestsApi";

const GET_COUNTRIES = "GET_COUNTRIES";

export const [GET_COUNTRIES_REQUEST, GET_COUNTRIES_SUCCESS, GET_COUNTRIES_FAILURE] = makeActionTypes(GET_COUNTRIES);

export const getCountries = () => makeOrcApiAction(GET_COUNTRIES, getCountriesRequest.buildUrl());
