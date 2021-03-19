import React from "react";
import TimelineItemMui from "@material-ui/lab/TimelineItem";
import TimelineOppositeContentMui from "@material-ui/lab/TimelineOppositeContent";
import TimelineContentMui from "@material-ui/lab/TimelineContent";
import TimelineSeparatorMui from "@material-ui/lab/TimelineSeparator";
import TimelineDotMui from "@material-ui/lab/TimelineDot";
import TimelineConnector from "@material-ui/lab/TimelineConnector";

const renderContent = content => {
	if (!content) return null;

	return <TimelineContentMui>{content}</TimelineContentMui>;
};

const renderContentOpposite = contentOpposite => {
	if (!contentOpposite) return null;

	return <TimelineOppositeContentMui>{contentOpposite}</TimelineOppositeContentMui>;
};

const renderSeparator = (icon, outlined, connector) => {
	var dotProps = outlined ? { variant: "outlined" } : {};
	var timeLineConnector = connector ? <TimelineConnector /> : null;
	return (
		<TimelineSeparatorMui>
			<TimelineDotMui {...dotProps}>{icon}</TimelineDotMui>
			{timeLineConnector}
		</TimelineSeparatorMui>
	);
};

const TimelineItem = ({ content, contentOpposite, icon, outlined, connector }) => {
	return (
		<TimelineItemMui>
			{renderContentOpposite(contentOpposite)}
			{renderSeparator(icon, outlined, connector)}
			{renderContent(content)}
		</TimelineItemMui>
	);
};

export default TimelineItem;
