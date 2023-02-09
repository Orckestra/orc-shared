import React from "react";
import Paper from "../../Surfaces/Paper";
import PaperProps from "../../Surfaces/paperProps";
import makeStyles from "@mui/styles/makeStyles";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const useStyles = makeStyles(theme => ({
	paper: {
		padding: theme.spacing(1, 2),
		backgroundColor: theme.palette.grey.light,
	},
	container: {
		display: "flex",
		width: "auto",
	},
	label: {
		fontSize: theme.typography.h2Size,
		fontFamily: theme.typography.fontFamily,
		fontWeight: theme.typography.fontWeightMedium,
	},
}));

const TableInfoBar = ({ tableLabel }) => {
	const classes = useStyles();

	const content = (
		<Grid container alignItems="center">
			<Grid item className={classes.container} xs={9} md={10} lg={11}>
				<Typography className={classes.label} children={tableLabel} />
			</Grid>
		</Grid>
	);

	const paperProps = new PaperProps();
	paperProps.set(PaperProps.propNames.square, true);
	paperProps.setStyle(PaperProps.ruleNames.root, classes.paper);

	return <Paper content={content} paperProps={paperProps} />;
};

export default TableInfoBar;
