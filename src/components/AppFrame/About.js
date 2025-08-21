import React from "react";
import ReactDOM from "react-dom";
import { useSelector } from "react-redux";
import { FormattedMessage } from "react-intl";
import { makeStyles } from "@material-ui/core/styles";
import withClickOutside from "../../hocs/withClickOutside";
import useViewState from "../../hooks/useViewState";
import bgImage from "../../content/aboutBackground.png";
import logoImage from "../../content/orckestra-logo-white.png";
import close from "../../content/close.png";
import { getVersionSelector } from "../../selectors/versionInfo";
import { currentLocaleOrDefault } from "../../selectors/locale";
import sharedMessages from "./../../sharedMessages";
import { trimStart } from "lodash";

export const ABOUT_NAME = "__aboutBox";

const getModalRoot = () => document.getElementById("modal");

const useStyles = makeStyles(() => ({
	aboutBox: props => ({
		boxSizing: "border-box",
		zIndex: 9999,
		position: "absolute",
		top: "calc(50% - 210px)",
		left: "calc(50% - 210px)",
		height: "420px",
		width: "420px",
		padding: "15px 20px",
		color: "#ffffff",
		fontSize: "13px",
		lineHeight: "16px",
		background: `#0a0a07 url(${props.bgImage})`,

		"&.enter-active": {
			opacity: 1,
			transition: "none",
		},
		"&.exit-active": {
			opacity: 0,
			transition: "opacity 800ms ease-out",
		},
	}),
	closeButton: {
		zIndex: 9999,
		position: "absolute",
		color: "#ffffff",
		top: "15px",
		right: "20px",
		margin: "0",
		cursor: "pointer",
		opacity: "1",

		"&:hover": {
			opacity: 0.75,
		},
	},
	aboutLink: {
		color: "#337ab7",
		textDecoration: "none",
	},
	aboutParagraph: {
		marginTop: "20px",
	},
	longAboutParagraph: props => ({
		marginTop: "20px",
		fontSize: props.lang?.toLowerCase().startsWith("fr") ? "10px" : undefined,
	}),
}));

export const AboutBox = withClickOutside(
	React.forwardRef(({ children, className }, ref) => {
		const classes = useStyles({ bgImage });

		return (
			<div ref={ref} className={`${classes.aboutBox} ${className ? className : ""}`}>
				{children}
			</div>
		);
	}),
);

export const getClickOutsideHandler = ({ show }, updateViewState) => {
	return show
		? event => {
				event.stopPropagation();
				updateViewState("show", false);
			}
		: () => {};
};

export const About = ({ currentApplication }) => {
	const lang = document.documentElement.lang;
	const classes = useStyles({ lang });

	const [viewState, updateViewState] = useViewState(ABOUT_NAME);
	const version = useSelector(getVersionSelector);
	const locale = useSelector(currentLocaleOrDefault);
	const closeAboutBox = getClickOutsideHandler(viewState, updateViewState);
	const aboutLinkUrl = "https://www.orckestra.com".concat(locale.substr(0, 2).toLowerCase() === "fr" ? "/fr" : "");

	return (
		<AboutBox className={`${viewState.show ? "enter-active" : "exit-active"}`} onClickOutside={closeAboutBox}>
			<p className={classes.closeButton} onClick={closeAboutBox}>
				<img src={close} alt="X" />
			</p>
			<img src={logoImage} width="250" alt="Orckestra" />
			<p className={classes.aboutParagraph}>
				<FormattedMessage {...sharedMessages.ccVersion} values={{ version: version }} />
				{currentApplication && currentApplication.displayName
					? [<br key="application-br" />, currentApplication.displayName.concat(" ", window.BUILD_NUMBER)]
					: null}
				{DEPENDENCIES && DEPENDENCIES["orc-shared"]
					? [
							<br key="orc-shared-br" />,
							<FormattedMessage
								key="orc-shared-version"
								{...sharedMessages.orcSharedVersion}
								values={{ version: trimStart(DEPENDENCIES["orc-shared"], "^") }}
							/>,
						]
					: null}
				{DEPENDENCIES && DEPENDENCIES["orc-scripts"]
					? [
							<br key="orc-scripts-br" />,
							<FormattedMessage
								key="orc-scripts-version"
								{...sharedMessages.orcScriptsVersion}
								values={{ version: trimStart(DEPENDENCIES["orc-scripts"], "^") }}
							/>,
						]
					: null}
				{DEPENDENCIES && DEPENDENCIES["orc-secret"]
					? [
							<br key="orc-secret-br" />,
							<FormattedMessage
								key="orc-secret-version"
								{...sharedMessages.orcSecretVersion}
								values={{ version: trimStart(DEPENDENCIES["orc-secret"], "^") }}
							/>,
						]
					: null}
			</p>
			<p className={classes.longAboutParagraph}>
				<FormattedMessage {...sharedMessages.copyrightTermsNotice} />
			</p>
			<p className={classes.aboutParagraph}>
				<a className={classes.aboutLink} href={aboutLinkUrl} target="_blank" rel="noreferrer">
					<FormattedMessage {...sharedMessages.ccName} />
				</a>
			</p>
			<p className={classes.aboutParagraph}>
				<FormattedMessage {...sharedMessages.copyright} values={{ year: new Date().getFullYear() }} />
				<br />
				<FormattedMessage {...sharedMessages.allRightsReserved} />
			</p>
		</AboutBox>
	);
};

const WiredAbout = About;

export default props => ReactDOM.createPortal(<WiredAbout {...props} />, getModalRoot());
