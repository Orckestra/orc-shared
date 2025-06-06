import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles(() => ({
	form: {
		boxSizing: "border-box",
		flexBasis: 0,
		flexShrink: 0,
		display: "flex",
		flexDirection: "column",
		padding: 0,
		paddingRight: 20,
		paddingTop: 0,
		fontSize: 12,
		flexGrow: props => props.spanWidth,
		"&:first-child": {
			paddingLeft: 20,
		},
	},
}));

const Form = ({ spanWidth = 1, children }) => {
	const classes = useStyles({ spanWidth });

	return <div className={classes.form}>{children}</div>;
};

export default Form;
