import React from "react";
import { useIntl } from "react-intl";
import useLabelMessage from "../../../hooks/useLabelMessage";
import TooltippedTypography from "../DataDisplay/TooltippedElements/TooltippedTypography";

const TabLabel = ({ label, mustTruncate }) => {
	const { formatMessage } = useIntl();

	const buildMessage = message => formatMessage(message, message.values);
	const [labelMessage] = useLabelMessage(label, buildMessage);

	return <TooltippedTypography noWrap={mustTruncate} titleValue={labelMessage} children={labelMessage} />;
};

export default TabLabel;
