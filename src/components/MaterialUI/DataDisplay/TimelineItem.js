import React from "react";
import TimelineItemMui from "@mui/lab/TimelineItem";
import TimelineOppositeContentMui from "@mui/lab/TimelineOppositeContent";
import TimelineContentMui from "@mui/lab/TimelineContent";
import TimelineSeparatorMui from "@mui/lab/TimelineSeparator";
import TimelineDotMui from "@mui/lab/TimelineDot";
import TimelineConnector from "@mui/lab/TimelineConnector";

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
