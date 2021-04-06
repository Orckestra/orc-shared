import React from "react";

export const isString = property => {
	return typeof property === "string";
};

export const isObject = property => {
	return typeof property === "object";
};

export const isStringNullOrWhitespace = string => {
	return string == null || string.trim().length === 0;
};

export const isPropertyBagAttribute = property => {
	return typeof property === "object" && property.hasOwnProperty("value") && property.hasOwnProperty("__type");
};

export const isReactComponent = component => {
	return React.isValidElement(component);
};
