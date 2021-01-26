import { createSelector } from "reselect";
import { unwrapImmutable } from "../utils";
import Immutable from "immutable";

const routerData = state => state.get("router");

export const selectLocation = createSelector(routerData, router => router.get("location") || Immutable.Map());

export const selectPathname = createSelector(selectLocation, location => unwrapImmutable(location).pathname || "");
