import React from "react";
import TimelineItemMui from "@material-ui/lab/TimelineItem";
import TimelineOppositeContentMui from "@material-ui/lab/TimelineOppositeContent";
import TimelineContentMui from "@material-ui/lab/TimelineContent";
import TimelineSeparatorMui from "@material-ui/lab/TimelineSeparator";
import TimelineDotMui from "@material-ui/lab/TimelineDot";

const renderContent = content => {
	if (!content) return null;

	return <TimelineContentMui>{content}</TimelineContentMui>;
};

const renderContentOpposite = contentOpposite => {
	if (!contentOpposite) return null;

	return <TimelineOppositeContentMui>{contentOpposite}</TimelineOppositeContentMui>;
};

const renderSeparator = (icon, outlined) => {
	var dotProps = outlined ? { variant: "outlined" } : {};
	return (
		<TimelineSeparatorMui>
			<TimelineDotMui {...dotProps}>{icon}</TimelineDotMui>
		</TimelineSeparatorMui>
	);
};

const TimelineItem = ({ content, contentOpposite, icon, outlined }) => {
	return (
		<TimelineItemMui>
			{renderContentOpposite(contentOpposite)}
			{renderSeparator(icon, outlined)}
			{renderContent(content)}
		</TimelineItemMui>
	);
};

export default TimelineItem;
