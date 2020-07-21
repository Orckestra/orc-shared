import React from "react";
import styled, { css } from "styled-components";
import { format, parseISO } from "date-fns";
import { injectIntl } from "react-intl";
import { getThemeProp, switchEnum, memoize } from "../../../utils";
import withClickOutside from "../../../hocs/withClickOutside";
import { FormInput, getEventUpdater } from "./Text";
import { ButtonWrapper, InputButton } from "./FieldButtons";

export const PositionedWrapper = withClickOutside(styled(ButtonWrapper)`
	position: relative;
`);

export const CalendarButton = styled(InputButton)`
	margin-top: -1px;
	margin-right: -1px;
	min-width: 36px;
	padding: 4px 7px;
	border-left-color: transparent;
	background-color: #fff;
`;

export let DateInputField, getDateUpdater, LiteralInput, PartInput;
/* istanbul ignore else */
if (Intl.DateTimeFormat.prototype.formatToParts) {
	const getFormatter = memoize(locale =>
		Intl.DateTimeFormat(locale, {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
		}),
	);

	LiteralInput = styled(FormInput).attrs(() => ({
		tabIndex: -1,
		type: "text",
		readOnly: true,
	}))`
		flex: 0 0 auto;
		min-width: 0;
		width: 1em;
		padding-left: 0.2em;
		padding-right: 0.2em;
		text-align: center;

		&:focus {
			box-shadow: none;
			border-color: ${getThemeProp(["colors", "borderDark"], "#333333")};
		}
		&:last-of-type {
			flex-grow: 1;
		}
	`;

	PartInput = styled(FormInput).attrs(() => ({
		onFocus: /* istanbul ignore next */ () => event => event.target.select(),
		type: "number",
	}))`
		padding-left: 0.2em;
		padding-right: 0.2em;
		min-width: 0;
		width: 1em;
		flex-grow: 0;
		flex-shrink: 0;
		text-align: center;

		&:first-child {
			text-align: right;
		}
		&:last-of-type {
			text-align: left;
		}

		${switchEnum("part", {
			day: css`
				flex-basis: 2em;
			`,
			month: css`
				flex-basis: 2em;
			`,
			year: css`
				flex-basis: 3em;
			`,
		})}
	`;

	getDateUpdater = (update, part, value) => {
		let prefix, suffix, partLength;
		const match = value.match(/^(\d+)-(\d+)-(\d+)$/);
		if (part === "year") {
			prefix = "";
			suffix = "-" + match[2] + "-" + match[3];
			partLength = 4;
		} else if (part === "month") {
			prefix = match[1] + "-";
			suffix = "-" + match[3];
			partLength = 2;
		} else {
			prefix = match[1] + "-" + match[2] + "-";
			suffix = "";
			partLength = 2;
		}
		return event => {
			let eventVal = event.target.value + "";
			const value = eventVal.padStart(partLength, "0").slice(-partLength);
			const newDate = parseISO(prefix + value + suffix /* + " 12:00"*/);
			update(format(newDate, "yyyy-MM-dd"));
		};
	};

	DateInputField = injectIntl(({ value, intl, update, ...props }) => {
		const safeValue = value || "1970-01-01";
		const formatter = getFormatter(intl.locale);
		const parts = formatter.formatToParts(parseISO(safeValue));
		return (
			<React.Fragment>
				{parts.map(({ type, value: partValue }, index) =>
					type === "literal" ? (
						<LiteralInput key={index} value={partValue} />
					) : (
						<PartInput
							key={index}
							{...props}
							value={partValue}
							part={type}
							onChange={getDateUpdater(update, type, safeValue)}
						/>
					),
				)}
				<LiteralInput value="" />
			</React.Fragment>
		);
	});
} else {
	// IE11 does not support any of this
	DateInputField = ({ update, ...props }) => <FormInput {...props} onChange={getEventUpdater(update)} type="text" />;
}

export const DateInput = ({ update, initOpen, required, value, ...props }) => {
	const safeValue = value || "1970-01-01";

	return <DateInputField update={update} {...props} value={safeValue} />;
};
