import React from "react";
import Icon from "./../Icon";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles(theme => ({
	placeholder: {
		margin: `${theme.spacing(10)} auto`,
	},
	placeholderImage: {
		fontSize: theme.spacing(14),
		color: theme.palette.grey.icon,
	},
	placeholderTitle: {
		marginTop: theme.spacing(1),
		fontSize: theme.typography.h1Size,
		color: theme.palette.grey.icon,
	},
	placeholderSubtitle: {
		marginTop: theme.spacing(1),
		fontSize: theme.typography.h3Size,
		color: theme.palette.grey.icon,
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
		height: 6,
		animation: false,
	},
	chipSkeleton: {
		width: 60,
		height: 25,
		animation: false,
		borderRadius: "15px",
	},
	radioSkeleton:{
		width: 17,
		height: 17,
		animation: false,
		
	},
	root: {
		flexGrow: 1,
	},
}));

const Placeholder = ({ icon, title, subtitle, cellList = [] }) => {
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
					<Grid container direction="column" alignItems="center" className={classes.placeholder}>
						{icon ? <Icon className={classes.placeholderImage} id={icon} /> : null}
						{title ? <Typography className={classes.placeholderTitle}>{title}</Typography> : null}
						{subtitle ? <Typography className={classes.placeholderSubtitle}>{subtitle}</Typography> : null}
					</Grid>
				)}
			</div>
		</>
	);
};

export default Placeholder;
