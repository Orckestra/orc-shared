import ComponentProps from "../componentProps";
import TimelineItemProps from "./TimelineItemProps";

class TimelineProps extends ComponentProps {
	static propNames = {
		items: "items",
	};

	constructor() {
		super();
		this.componentProps.set(this.constructor.propNames.items, null);

		this._isTimelineProps = true;
	}

	AddItem(content, contentOpposite, separatorIcon) {
		if (content || contentOpposite) {
			const newItem = new TimelineItemProps();
			newItem.set(TimelineItemProps.propNames.content, content);
			newItem.set(TimelineItemProps.propNames.contentOpposite, contentOpposite);
			newItem.set(TimelineItemProps.propNames.separatorIcon, separatorIcon);

			const items = this.componentProps.get(this.constructor.propNames.items) ?? [];
			items.push(newItem);
			this.componentProps.set(this.constructor.propNames.items, items);
		}
	}
}

export const isTimelineProps = function (value) {
	if (value == null) return true;
	return typeof value === "object" && (value instanceof TimelineProps || value._isTimelineProps === true);
};

export default TimelineProps;
