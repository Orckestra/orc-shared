import Immutable from "immutable";
import { normalize } from "normalizr";
import { timezonesListSchema } from "../schemas/timezones";
import { GET_TIMEZONES_SUCCESS } from "../actions/timezones";

const initialState = Immutable.fromJS({});

const countriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TIMEZONES_SUCCESS: {
      const normalizedTimezones = normalize(action.payload, timezonesListSchema);
      return state.merge(Immutable.fromJS(normalizedTimezones.entities.timezones));
    }
    default:
      return state;
  }
};

export default countriesReducer;
