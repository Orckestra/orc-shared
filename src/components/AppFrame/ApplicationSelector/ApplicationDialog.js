import React from "react";
import { FormattedMessage } from "react-intl";
import sharedMessages from "../../../sharedMessages";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";

const useStyles = makeStyles(theme => ({
	popperContainer: {
		cursor: "pointer",
		position: "relative",
	},
	header: {
		borderBottom: `1px solid ${theme.palette.grey.light}`,
		margin: theme.spacing(0),
		padding: `${theme.spacing(1, 2)} !important`,
		width: `calc(100% + ${theme.spacing(2)})`,
		maxWidth: "none",
		flexGrow: 1,
		backgroundColor: theme.palette.grey.lighter,
		textAlign: "center",
		borderRadius: theme.spacing(1, 1, 0, 0),
	},
	content: {
		borderRadius: theme.shape.borderRadius,
	},
	wrapper: {
		backgroundColor: theme.palette.background.paper,
		width: theme.spacing(82),
		borderRadius: theme.spacing(1),
		border: `1px solid ${theme.palette.grey.borders}`,
		boxShadow: `${theme.spacing(0, 0, 2)} rgba(0,0,0,0.5)`,
		position: "relative",
	},
	container: {
		borderRadius: theme.shape.borderRadius,
		textAlign: "center",
		"&:hover": {
			backgroundColor: theme.palette.grey.lighter,
		},
		overflow: "hidden",
	},
	containerSelected: {
		boxShadow: `${theme.spacing(0, 0, 0.8)} ${theme.palette.grey.borders}`,
	},
	appLink: {
		padding: theme.spacing(2),
		display: "block",
	},
	headerTitle: {
		fontSize: theme.typography.h3Size,
		textTransform: theme.typography.button.textTransform,
		fontFamily: theme.typography.button.fontFamily,
		fontWeight: theme.typography.button.fontWeight,
	},
	label: {
		fontSize: theme.typography.h4Size,
		color: theme.palette.text.primary,
	},
}));

export const ApplicationDialog = ({ toggle, applications, applicationId, applicationOrder }) => {
	const classes = useStyles();

	return (
		<Grid container spacing={2} className={classes.wrapper}>
			<Grid item xs={12} className={classes.header}>
				<Typography
					children={<FormattedMessage {...sharedMessages.appSelectorTitle} />}
					className={classes.headerTitle}
				/>
			</Grid>
			<Grid item container xs={12} className={classes.content}>
				{applications.map(app => (
					<Grid
						className={classNames(classes.container, app.name === applicationId ? classes.containerSelected : "")}
						item
						key={app.name}
						xs={6}
						md={3}
					>
						<Link
							className={classes.appLink}
							id={app.name}
							href={app.url}
							target="_blank"
							underline="none"
							onClick={
								app.name === applicationId
									? event => {
											event.preventDefault();
											toggle();
									  }
									: /* istanbul ignore next */
									  () => {}
							}
						>
							<img height="60" src={app.iconUri} alt={app.displayName} />
							<br />
							<Typography children={app.displayName} className={classes.label} />
						</Link>
					</Grid>
				))}
			</Grid>
		</Grid>
	);
};

export default ApplicationDialog;
