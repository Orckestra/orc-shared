import styled, { css } from "styled-components";
import { ifFlag } from "../../utils";
import { SelectedValue } from "../Selector";
const Form = styled.div`
	flex: 1 0 auto;
	display: flex;
	flex-direction: column;
	padding: 20px;
	padding-top: 0;
	font-size: 12px;

	${ifFlag(
		"wide",
		css`
			& ${SelectedValue} {
				width: calc(100vw - 200px);
				${"" /* XXX: This works for base cases, needs to be better - Gert */}
			}
		`,
		css`
			flex-wrap: wrap;
			align-items: flex-start;
			align-content: flex-start;
			height: ${props => props.h + 20 || 1000}px;
			& > * {
				margin-right: 50px;
				width: 430px;
			}
		`,
	)};
`;

export default Form;
