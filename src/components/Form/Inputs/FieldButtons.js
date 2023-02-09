import styled, { css } from "styled-components";
import Button from "../../Button";
import { ifFlag, getThemeProp } from "../../../utils";

export const ButtonWrapper = styled.div`
	box-sizing: border-box;
	display: flex;
	align-items: stretch;
	height: 30px;
	flex: 0 1 auto;
	border-radius: 4px;
	border: 1px solid ${getThemeProp(["colors", "borderLight"], "#cccccc")};

	& > * {
		box-sizing: border-box;
		height: 28px;
		border: 0 none transparent;
		border-radius: 0;
		flex: 0 1 100%;
		box-shadow: none;
	}

	& > :first-of-type {
		border-top-left-radius: 4px;
		border-bottom-left-radius: 4px;
	}
	& > :last-child {
		border-top-right-radius: 4px;
		border-bottom-right-radius: 4px;
	}

	${ifFlag(
		"invalid",
		css`
			border-color: ${getThemeProp(["colors", "error"], "#ce4844")};

			&:hover,
			&:active {
				box-shadow: 0 0 4px ${getThemeProp(["colors", "error"], "#ce4844")};
			}
		`,
	)}
`;

export const Spinners = styled.div`
	display: flex;
	flex-direction: column;
	height: 30px;
	flex: 0 0 auto;
	margin-top: -1px;
	margin-bottom: -1px;

	&:first-of-type > * {
		margin-left: -1px;
	}
	&:last-child > * {
		margin-right: -1px;
	}
`;

export const InputButton = styled(Button)`
	padding: 2px 7px;
	font-size: 8px;
	border-radius: 0;
	min-width: 0;
	min-height: 0;
	flex: 0 0 auto;

	&:active,
	&:focus,
	&:hover {
		z-index: 1;
	}

	${Spinners} > & {
		flex: 1 1 50%;
	}
	${Spinners}:last-child > & {
		margin-top: -1px;

		&:first-of-type {
			margin-top: 0;
			border-top-right-radius: 4px;
		}
		&:last-child {
			padding-top: 1px;
			border-bottom-right-radius: 4px;
		}
	}
`;
