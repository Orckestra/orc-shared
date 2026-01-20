import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "./MaterialUI/DataDisplay/Icon";
import { FormattedMessage } from "react-intl";
import ModalMui from "@material-ui/core/Modal";
import sharedMessages from "../sharedMessages";

const useStyles = makeStyles(theme => ({
	container: {
		fontFamily: "'Open Sans', sans-serif",
		fontSize: theme.spacing(1.4),
		background: "rgba(255,255,255,0.85)",
		maxWidth: theme.spacing(70),
		width: `calc(100% - ${theme.spacing(4)})`,
		display: "block",
		top: "50%",
		left: "50%",
		position: "absolute",
		boxShadow: `${theme.spacing(0, 0.4, 0.8, 0)} rgba(0, 0, 0, 0.2), ${theme.spacing(0, 0.6, 2, 0)} rgba(0, 0, 0, 0.19)`,
		transform: "translateY(-50%) translateX(-50%)",
		padding: theme.spacing(8),
		borderRadius: theme.spacing(0.3),
		"& header": {
			paddingBottom: theme.spacing(2),
			marginBottom: theme.spacing(2),
			borderBottom: "1px solid #999",
			"& h1": {
				fontWeight: 400,
				fontWize: theme.spacing(3),
				marginTop: 0,
				marginBottom: theme.spacing(0.5),
				"& p": {
					fontSize: theme.spacing(1.6),
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
		marginTop: theme.spacing(4),
	},
	gridItem: {
		display: "flex",
		flex: "0 1 16.667%",
		maxWidth: "16.667%",
		flexDirection: "column",
	},
	browserIconContainer: {
		width: theme.spacing(4.8),
		textAlign: "center",
	},
	browserIconCaption: {
		fontSize: theme.spacing(1.1),
		color: "#999",
	},
	browserIcon: {
		stroke: "none",
		fontSize: theme.spacing(4.8),
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
