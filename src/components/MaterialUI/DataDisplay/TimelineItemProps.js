import ComponentProps from "../componentProps";

class TimelineItemProps extends ComponentProps {
	static propNames = {
		content: "content",
		contentOpposite: "contentOpposite",
		separatorIcon: "separatorIcon",
		outlined: "outlined",
	};

	constructor() {
		super();
		this.componentProps.set(this.constructor.propNames.content, null);
		this.componentProps.set(this.constructor.propNames.contentOpposite, null);
		this.componentProps.set(this.constructor.propNames.separatorIcon, null);
		this.componentProps.set(this.constructor.propNames.outlined, null);

		this._isTimelineItemProps = true;
	}
}

export const isTimelineItemProps = function (value) {
	if (value == null) return true;
	return typeof value === "object" && (value instanceof TimelineItemProps || value._isTimelineItemProps === true);
};

export default TimelineItemProps;
