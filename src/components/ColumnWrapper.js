import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
	columnWrapper: {
		flex: "0 1 100%",
		display: "flex",
		flexDirection: "column",
		minHeight: 0,
		minWidth: 0,
	},
}));

const ColumnWrapper = ({ children }) => {
	const classes = useStyles();

	return <div className={classes.columnWrapper}>{children}</div>;
};

export default ColumnWrapper;
