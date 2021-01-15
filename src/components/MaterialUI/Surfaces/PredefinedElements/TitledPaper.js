import React from "react";
import Paper from "../Paper";
import SectionTitle from "../../DataDisplay/PredefinedElements/SectionTitle";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
	container: {
		display: "flex",
		flexDirection: "column",
		width: "inherit",
	},
}));

const TitledPaper = ({ title, content, titleProps, paperProps }) => {
	const classes = useStyles();

	return (
		<div className={classes.container}>
			<SectionTitle title={title} titleProps={titleProps} />
			<Paper content={content} paperProps={paperProps} />
		</div>
	);
};

export default TitledPaper;
