import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import Icon from "./MaterialUI/DataDisplay/Icon";
import { FormattedMessage } from "react-intl";
import ModalMui from "@mui/material/Modal";
import sharedMessages from "../sharedMessages";

const useStyles = makeStyles(theme => ({
	container: {
		fontFamily: "'Open Sans', sans-serif",
		fontSize: "14px",
		background: "rgba(255,255,255,0.85)",
		maxWidth: "700px",
		width: "calc(100% - 40px)",
		display: "block",
		top: "50%",
		left: "50%",
		position: "absolute",
		boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
		transform: "translateY(-50%) translateX(-50%)",
		padding: "80px",
		borderRadius: "3px",
		"& header": {
			paddingBottom: "20px",
			marginBottom: "20px",
			borderBottom: "1px solid #999",
			"& h1": {
				fontWeight: 400,
				fontWize: "30px",
				marginTop: 0,
				marginBottom: "5px",
				"& p": {
					fontSize: "16px",
					margin: 0,
					color: "#999",
					fontWeight: 400,
				},
			},
		},
	},
	grid: {
		display: "flex",
		flexWrap: "wrap",
		width: "100%",
		boxSizing: "border-box",
		marginTop: "40px",
	},
	gridItem: {
		display: "flex",
		flex: "0 1 16.667%",
		maxWidth: "16.667%",
		flexDirection: "column",
	},
	browserIconContainer: {
		width: "48px",
		textAlign: "center",
	},
	browserIconCaption: {
		fontSize: "11px",
		color: "#999",
	},
	browserIcon: {
		stroke: "none",
		fontSize: "48px",
	},
}));

export const InternetExplorerWarningMessage = () => {
	const classes = useStyles();

	var isIE = !!window.MSInputMethodContext && !!document.documentMode;

	if (!isIE) {
		return null;
	}

	return (
		<ModalMui
			open={true}
			disablePortal
			disableAutoFocus={true}
			disableEnforceFocus={true}
			disableBackdropClick={true}
			disableEscapeKeyDown={true}
		>
			<div className={classes.container}>
				<header>
					<h1>
						<FormattedMessage {...sharedMessages.ccName} />
					</h1>
					<p>
						<FormattedMessage {...sharedMessages.ccDescription} />
					</p>
				</header>
				<h2>
					<FormattedMessage {...sharedMessages.internetExplorerWarningTitle} />
				</h2>
				<p>
					<FormattedMessage {...sharedMessages.internetExplorerWarningContent} />
				</p>
				<div className={classes.grid}>
					<div className={classes.gridItem}>
						<div className={classes.browserIconContainer}>
							<Icon id="chrome" className={classes.browserIcon} />
							<div className={classes.browserIconCaption}>Google Chrome</div>
						</div>
					</div>
					<div className={classes.gridItem}>
						<div className={classes.browserIconContainer}>
							<Icon id="firefox" className={classes.browserIcon} />
							<div className={classes.browserIconCaption}>Mozilla Firefox</div>
						</div>
					</div>
					<div className={classes.gridItem}>
						<div className={classes.browserIconContainer}>
							<Icon id="edge" className={classes.browserIcon} />
							<div className={classes.browserIconCaption}>Microsoft Edge</div>
						</div>
					</div>
					<div className={classes.gridItem}>
						<div className={classes.browserIconContainer}>
							<Icon id="safari" className={classes.browserIcon} />
							<div className={classes.browserIconCaption}>Safari (MacOS)</div>
						</div>
					</div>
					<div className={classes.gridItem}>
						<div className={classes.browserIconContainer}>
							<Icon id="opera" className={classes.browserIcon} />
							<div className={classes.browserIconCaption}>Opera</div>
						</div>
					</div>
				</div>
			</div>
		</ModalMui>
	);
};

export default React.memo(InternetExplorerWarningMessage);
