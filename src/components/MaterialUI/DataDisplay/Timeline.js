import React from "react";
import TimelineMui from "@material-ui/lab/Timeline";
import TimelineItemMui from "@material-ui/lab/TimelineItem";
import TimelineOppositeContentMui from "@material-ui/lab/TimelineOppositeContent";
import TimelineContentMui from "@material-ui/lab/TimelineContent";
import TimelineSeparatorMui from "@material-ui/lab/TimelineSeparator";
import TimelineDotMui from "@material-ui/lab/TimelineDot";
import TimelineProps, { isTimelineProps } from "./TimelineProps";
import TimelineItemProps, { isTimelineItemProps } from "./TimelineItemProps";

const renderItems = items => {
	if (!items) return null;

	let timelineItems = [];
	let count = 0;
	items.forEach(item => {
		if (isTimelineItemProps(item) === false) {
			throw new TypeError("timelineItemProps property is not of type TimelineItemProps");
		}

		const content = item.get(TimelineItemProps.propNames.content);
		const contentOpposite = item.get(TimelineItemProps.propNames.contentOpposite);
		const separatorIcon = item.get(TimelineItemProps.propNames.separatorIcon);

		count++;
		timelineItems.push(
			<TimelineItemMui key={count}>
				{renderContentOpposite(contentOpposite)}
				{renderSeparator(separatorIcon)}
				{renderContent(content)}
			</TimelineItemMui>,
		);
	});

	return timelineItems;
};

const renderContent = content => {
	if (!content) return null;

	return <TimelineContentMui>{content}</TimelineContentMui>;
};

const renderContentOpposite = contentOpposite => {
	if (!contentOpposite) return null;

	return <TimelineOppositeContentMui>{contentOpposite}</TimelineOppositeContentMui>;
};

const renderSeparator = separatorIcon => {
	return (
		<TimelineSeparatorMui>
			<TimelineDotMui>{separatorIcon}</TimelineDotMui>
		</TimelineSeparatorMui>
	);
};

const Timeline = ({ timelineProps }) => {
	if (isTimelineProps(timelineProps) === false) {
		throw new TypeError("timelineProps property is not of type TimelineProps");
	}

	const items = timelineProps?.get(TimelineProps.propNames.items);
	const timeline = <TimelineMui>{renderItems(items)}</TimelineMui>;

	return timeline;
};

export default Timeline;
