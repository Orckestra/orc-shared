import React from "react";
import { FormattedMessage } from "react-intl";

const Text = ({ message }) =>
	message.id ? <FormattedMessage {...message} /> : <span>{message}</span>;

export default Text;
