import React from "react";
import styled, { css } from "styled-components";
import { ifFlag, getThemeProp } from "../../utils";
import Text from "../Text";

export const FieldBox = styled.div`
	flex: 0 1 auto;
	display: flex;
	flex-direction: column;
	margin-top: 20px;
	position: relative;
`;

export const Label = styled.label`
	${ifFlag(
		"invalid",
		css`
			color: ${getThemeProp(["colors", "error"], "#ce4844")};
		`,
		css`
			color: ${getThemeProp(["colors", "textLight"], "#999999")};
		`,
	)}
	min-height: 17px;
	${ifFlag(
		"center",
		css`
			text-align: center;
		`,
	)};
	${ifFlag(
		"labelOnly",
		"",
		css`
			margin-bottom: 10px;
		`,
	)};
	${ifFlag(
		"required",
		css`
			&::after {
				content: " *";
				color: #666;
			}
		`,
	)}
`;

export const RequiredNotice = styled.div`
	position: absolute;
	bottom: -1.6em;
	right: 0;
	color: ${getThemeProp(["colors", "error"], "#ce4844")};
`;

const Field = ({ id, label, center, labelOnly, required, invalid, children }) => {
	const reqFlag = { invalid };
	if (required) reqFlag.required = true;
	return (
		<FieldBox>
			{label !== undefined ? (
				<Label
					htmlFor={labelOnly ? undefined : id}
					labelOnly={labelOnly}
					id={id + "_label"}
					center={center}
					{...reqFlag}
				>
					<Text message={label} />
				</Label>
			) : null}
			{labelOnly ? null : children}
			{!labelOnly && required && invalid ? (
				<RequiredNotice>
					<Text message={required} />
				</RequiredNotice>
			) : null}
		</FieldBox>
	);
};

export default Field;
