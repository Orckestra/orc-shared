import React from "react";
import Icon from "./../Icon";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles(theme => ({
	placeholder: {
		margin: `${theme.spacing(10)} auto`,
		"& > *": {
			color: theme.palette.grey.icon,
		},
	},
	placeholderError: {
		"& > *": {
			color: theme.palette.error.main,
		},
	},
	placeholderImage: {
		fontSize: theme.spacing(14),
	},
	placeholderTitle: {
		marginTop: theme.spacing(1),
		fontSize: theme.typography.h1Size,
	},
	placeholderSubtitle: {
		marginTop: theme.spacing(1),
		fontSize: theme.typography.h3Size,
	},
	placeholderRow: {
		alignSelf: "flex-start",
		width: "100%",
		display: "flex",
		borderBottom: `1px solid ${theme.palette.grey.borders}`,
		backgroundColor: `${theme.palette.background.paper}!important`,
	},
	placeholderCell: {
		display: "inline-flex",
		padding: theme.spacing(2.7, 1.6),
		paddingRight: theme.spacing(4.6),
		flex: 1,
		alignItems: "center",
	},
	textSkeleton: {
		width: "100%",
		height: theme.spacing(0.6),
		animation: false,
	},
	chipSkeleton: {
		width: theme.spacing(6),
		height: theme.spacing(2.5),
		animation: false,
		borderRadius: theme.spacing(1.5),
	},
	radioSkeleton: {
		width: theme.spacing(1.7),
		height: theme.spacing(1.7),
		animation: false,
	},
	root: {
		flexGrow: 1,
		display: "flex",
		flexDirection: "column",
	},
	animatePlaceholderImage: {
		animation: "$rotate 4s linear infinite",
		margin: "auto",
	},
	"@keyframes rotate": {
		to: {
			transform: "rotate(1turn)",
		},
	},
}));

const Placeholder = ({ icon, title, subtitle, cellList = [], error = false, animateIcon = false }) => {
	const classes = useStyles();
	return (
		<>
			<div className={classes.root}>
				{cellList.length ? (
					<div className={classes.placeholderRow}>
						{cellList.map((value, index) => {
							switch (value) {
								case "chip":
									return (
										<div key={`pc-${index}`} className={classes.placeholderCell}>
											<Skeleton className={classes.chipSkeleton} />
										</div>
									);
								case "radio":
									return (
										<div key={`pc-${index}`} className={classes.placeholderCell}>
											<Skeleton variant="circle" className={classes.radioSkeleton} />
										</div>
									);
								default:
									return (
										<div key={`pc-${index}`} className={classes.placeholderCell}>
											<Skeleton className={classes.textSkeleton} />
										</div>
									);
							}
						})}
					</div>
				) : null}
				{(icon || title || subtitle) && (
					<Grid
						container
						direction="column"
						alignItems="center"
						className={`${classes.placeholder} ${error ? classes.placeholderError : ""}`}
					>
						{icon ? (
							<Icon
								className={`${classes.placeholderImage} ${animateIcon ? classes.animatePlaceholderImage : ""}`}
								id={icon}
							/>
						) : null}
						{title ? <Typography className={classes.placeholderTitle}>{title}</Typography> : null}
						{subtitle ? <Typography className={classes.placeholderSubtitle}>{subtitle}</Typography> : null}
					</Grid>
				)}
			</div>
		</>
	);
};

export default Placeholder;
