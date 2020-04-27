import React from "react";
import ReactDOM from "react-dom";
import { useSelector } from "react-redux";
import styled, { css } from "styled-components";
import transition from "styled-transition-group";
import { ifFlag } from "../../utils";
import Text from "../Text";
import withClickOutside from "../../hocs/withClickOutside";
import useViewState from "../../hooks/useViewState";
import bgImage from "../../content/aboutBackground.png";
import logoImage from "../../content/aboutLogo.png";
import { getVersionSelector } from "../../selectors/versionInfo";

export const ABOUT_NAME = "__aboutBox";

const getModalRoot = () => document.getElementById("modal");

export const AboutBox = withClickOutside(transition.div`
	box-sizing: border-box;
	z-index: 9999;
	position: absolute;
	top: calc(50% - 210px);
	left: calc(50% - 210px);
	height: 420px;
	width: 420px;
	padding: 15px 20px;
	color: #ffffff;
	font-size: 13px;
	line-height: 16px;
	background: #0a0a07 url(${bgImage});
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

export const AboutParagraph = styled.p`
	margin-top: 20px;
	${ifFlag(
		"long",
		css`
			html[lang^="fr"] & {
				font-size: 10px;
			}
		`,
	)}
`;

export const AboutLink = styled.a`
	color: #23527c;
	text-decoration: none;
`;

export const getClickOutsideHandler = ({ show }, updateViewState) =>
	show
		? event => {
				event.stopPropagation();
				updateViewState("show", false);
		  }
		: () => {};

export const About = ({ messages, currentApplication }) => {
	const [viewState, updateViewState] = useViewState(ABOUT_NAME);
	const version = useSelector(getVersionSelector);

	return (
		<AboutBox
			in={viewState.show}
			onClickOutside={getClickOutsideHandler(viewState, updateViewState)}
		>
			<img src={logoImage} alt="Orckestra" />
			<AboutParagraph>
				<Text
					message={{
						...messages.ccVersion,
						values: { version: version },
					}}
				/>
				{currentApplication && currentApplication.displayName
					? [
							<br key="application-br" />,
							<Text
								key="application-version"
								message={currentApplication.displayName.concat(" ", window.BUILD_NUMBER)}
							/>,
					  ]
					: null}
				{DEPENDENCIES && DEPENDENCIES["orc-shared"]
					? [
							<br key="orc-shared-br" />,
							<Text
								key="orc-shared-version"
								message={{
									...messages.sharedVersion,
									values: { version: DEPENDENCIES["orc-shared"] },
								}}
							/>,
					  ]
					: null}
				{DEPENDENCIES && DEPENDENCIES["orc-scripts"]
					? [
							<br key="orc-scripts-br" />,
							<Text
								key="orc-scripts-version"
								message={{
									...messages.scriptsVersion,
									values: { version: DEPENDENCIES["orc-scripts"] },
								}}
							/>,
					  ]
					: null}
				{DEPENDENCIES && DEPENDENCIES["orc-secret"]
					? [
							<br key="orc-secret-br" />,
							<Text
								key="orc-secret-version"
								message={{
									...messages.secretVersion,
									values: { version: DEPENDENCIES["orc-secret"] },
								}}
							/>,
					  ]
					: null}
			</AboutParagraph>
			<AboutParagraph long>
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
};

const WiredAbout = About;

export default props => ReactDOM.createPortal(<WiredAbout {...props} />, getModalRoot());
