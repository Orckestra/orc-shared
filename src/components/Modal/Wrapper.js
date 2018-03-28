// @flow
import transition from "styled-transition-group";

const Wrapper = transition.div`
	z-index: 9999;
	display: flex;
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	transition: visibility, opacity ${props => props.timeout}ms ease-out;

	&:enter {
		visibility: 0;
		opacity: 0.01;
	}
	&:enter-active {
		visibility: 1;
		opacity: 1;
	}
	&:exit {
		visibility: 1;
		opacity: 1;
	}
	&:exit-active {
		visibility: 0;
		opacity: 0.01;
	}
`;
Wrapper.defaultProps = { timeout: 300, unmountOnExit: true };

export default Wrapper;
