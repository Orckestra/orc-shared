import styled from "styled-components";
import Button from "../../Button";

export const ButtonWrapper = styled.div`
	box-sizing: border-box;
	display: flex;
	height: 30px;
	flex: 0 1 auto;
	border-radius: 4px;
	border: 1px solid #ccc;

	& > * {
		height: 28px;
		border: 0 none transparent;
		border-radius: 0;
		margin-right: -1px;
		flex: 0 1 100%;
		box-shadow: none;
	}

	& > :first-child {
		border-top-left-radius: 4px;
		border-bottom-left-radius: 4px;
	}
	& > :last-child {
		margin-right: 0;
		border-top-right-radius: 4px;
		border-bottom-right-radius: 4px;
	}
`;

export const Spinners = styled.div`
	display: flex;
	flex-direction: column;
	height: 30px;
	flex: 0 0 auto;
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

		&:first-child {
			margin-top: 0;
			border-top-right-radius: 4px;
		}
		&:last-child {
			padding-top: 1px;
			border-bottom-right-radius: 4px;
		}
	}
`;
