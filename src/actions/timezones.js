import { makeActionTypes } from "./makeApiAction";
import makeOrcApiAction from "./makeOrcApiAction";
import { buildUrl } from "../utils/buildUrl";

const GET_TIMEZONES = "GET_TIMEZONES";

export const [GET_TIMEZONES_REQUEST, GET_TIMEZONES_SUCCESS, GET_TIMEZONES_FAILURE] = makeActionTypes(GET_TIMEZONES);

export const getTimezones = () => makeOrcApiAction(GET_TIMEZONES, buildUrl(["timezones"]));
