// @flow
import transition from "styled-transition-group";

const Wrapper = transition.div.attrs({
	unmountOnExit: true,
	timeout: 300,
})`
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	z-index: 9999;
	transition: opacity 0.3s ease-out;
	display: flex;

	&:enter {
		opacity: 0.01;
	}
	&:enter-active {
		opacity: 1;
	}
	&:exit {
		opacity: 1;
	}
	&:exit-active {
		opacity: 0.01;
	}
`;

export default Wrapper;
