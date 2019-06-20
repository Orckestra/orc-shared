import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import transition from "styled-transition-group";
import Text from "../Text";
import withClickOutside from "../../hocs/withClickOutside";
import withViewState from "../../hocs/withViewState";

const getModalRoot = () => document.getElementById("modal");

const AboutBox = withClickOutside(transition.div`
	box-sizing: border-box;
	z-index: 9999;
	position: absolute;
	top: calc(50% - 190px);
	left: calc(50% - 190px);
	height: 380px;
	width: 380px;
	padding: 15px 20px;
	color: #ffffff;
	font-size: 13px;
	line-height: 16px;
	background: #0a0a07 url("${window.BASE_PATH}/aboutBackground.png");
	transition: opacity ${props => props.timeout}ms ease-out;

	&:enter {
		opacity: 0;
	}
	&:enter-active {
		opacity: 1;
	}
	&:exit {
		opacity: 1;
	}
	&:exit-active {
		opacity: 0;
	}
`);
AboutBox.defaultProps = { timeout: 800, unmountOnExit: true };

const AboutParagraph = styled.p`
	margin-top: 20px;
`;

const AboutLink = styled.a`
	color: #23527c;
	text-decoration: none;
`;

const About = ({ viewState, updateViewState, messages }) => (
	<AboutBox
		in={viewState.show}
		onClickOutside={
			viewState.show
				? event => {
						event.stopPropagation();
						updateViewState("show", false);
				  }
				: () => {}
		}
	>
		<img src={window.BASE_PATH + "/aboutLogo.png"} alt="Orckestra" />
		<AboutParagraph>
			<Text
				message={{
					...messages.ccVersion,
					values: { versionNumber: "3.22.0.657" }, // Needs to come from API
				}}
			/>
		</AboutParagraph>
		<AboutParagraph>
			<Text message={messages.copyrightTermsNotice} />
		</AboutParagraph>
		<AboutParagraph>
			<AboutLink href="https://www.orckestra.com/">
				<Text message={messages.ccName} />
			</AboutLink>
		</AboutParagraph>
		<AboutParagraph>
			<Text message={messages.copyright} />
			<br />
			<Text message={messages.allRightsReserved} />
		</AboutParagraph>
	</AboutBox>
);

const WiredAbout = withViewState(About);

export default props =>
	ReactDOM.createPortal(
		<WiredAbout name="__aboutBox" {...props} />,
		getModalRoot(),
	);
