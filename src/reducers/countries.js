import Immutable from "immutable";
import { normalize } from "normalizr";
import { countriesListSchema } from "../schemas/countries";
import { GET_COUNTRIES_SUCCESS } from "../actions/countries";

const initialState = Immutable.fromJS({});

const countriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COUNTRIES_SUCCESS: {
      const normalizedCountries = normalize(action.payload, countriesListSchema);
      return state.merge(Immutable.fromJS(normalizedCountries.entities.countries));
    }
    default:
      return state;
  }
};

export default countriesReducer;
