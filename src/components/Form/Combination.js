import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Field from "./Field";

const useStyles = makeStyles(() => ({
	combiningRow: props => {
		const flexStyles = props.proportions.reduce((styles, width, index) => {
			if (width) {
				styles[`& > *:nth-child(${index + 1})`] = {
					flex: typeof width === "string" ? `0 0 ${width}` : `0 1 ${width}%`,
				};
			}
			return styles;
		}, {});

		return {
			display: "flex",
			flexDirection: "row",
			"& > *": {
				marginTop: 0,
				marginRight: 15,
			},
			"& > :last-child": {
				marginRight: 0,
			},
			...flexStyles,
		};
	},
}));

const CombinationField = ({ label, children, proportions = [] }) => {
	const classes = useStyles({ proportions });

	return (
		<Field label={label}>
			<div className={classes.combiningRow}>{children}</div>
		</Field>
	);
};

export default CombinationField;
