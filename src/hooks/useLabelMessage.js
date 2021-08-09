import { useSelector } from "react-redux";
import { FormattedMessage } from "react-intl";
import { unwrapImmutable } from "../utils";
import safeGet from "../utils/safeGet";
import stripKey from "../utils/stripKey";
import React from "react";

const defaultBuildMessage = message => <FormattedMessage {...message} />;

export const messageContainsValues = message => {
	const valRefs = message.defaultMessage.match(/(\{\w+\})/g);
	if (!valRefs) return true;
	const valNames = valRefs.map(ref => ref.replace(/[{}]/g, ""));
	return !!message.values && valNames.every(key => message.values[key] !== undefined && message.values[key] !== null);
};

const useLabelMessage = (label, buildMessage = defaultBuildMessage) => {
	let messageResult = null;
	let missingValues = false;
	let valueSelector = () => {};
	let message = typeof label === "object" ? { ...label } : label || "";
	if (typeof safeGet(message, "values") === "function") {
		valueSelector = message.values;
		message = stripKey("values", message);
	}
	const selectValues = unwrapImmutable(useSelector(valueSelector));

	if (message && (message.values || selectValues)) {
		message.values = { ...message.values, ...selectValues };
	}

	if (message.id) {
		if (message.values || selectValues) {
			message.values = { ...message.values, ...selectValues };
		}
		if (messageContainsValues(message)) {
			messageResult = buildMessage(message);
		} else {
			missingValues = true;
			messageResult = null;
		}
	} else {
		messageResult = message.toString();
	}

	return [messageResult, missingValues];
};

export default useLabelMessage;
