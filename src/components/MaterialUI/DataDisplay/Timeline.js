import React from "react";
import TimelineMui from "@material-ui/lab/Timeline";

const Timeline = ({ items, classes }) => {
	return <TimelineMui className={classes}>{items}</TimelineMui>;
};

export default Timeline;
