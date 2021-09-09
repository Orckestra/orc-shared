import safeGet from "./safeGet";

const feedPropFunc = props => value => typeof value === "function" ? value(props) : value;

/* Safely gets a (potentially nested) theme property, can run a function on the resulting value */
export const getThemeProp =
	(path, defaultValue, func = x => x) =>
	props =>
		func(safeGet(props, "theme", ...path.map(feedPropFunc(props))) || feedPropFunc(props)(defaultValue));

/* Use in styled components to check if a prop has a truthy value and
   return values based on that. */
export const ifFlag =
	(name, thenVal, elseVal = "") =>
	props =>
		props[name] ? feedPropFunc(props)(thenVal) : feedPropFunc(props)(elseVal);

/* Creates a prop function that checks a field against a list of cases,
	 	 and gives back a found case, or a default */
export const switchEnum = (enumField, cases) => props => cases[props[enumField]] || cases["default"];
