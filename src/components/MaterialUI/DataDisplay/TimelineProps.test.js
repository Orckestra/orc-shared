import TimelineItemProps from "./TimelineItemProps";
import TimelineProps, { isTimelineProps } from "./TimelineProps";

describe("TimelineProps Props", () => {
	it("Contains necessary props keys", () => {
		const propNames = ["items"];

		expect(TimelineProps.propNames, "to have keys", propNames);
	});

	it("Puts keys in component props map", () => {
		const propNames = ["items"];
		const timelineProps = new TimelineProps();
		const keys = Array.from(timelineProps.componentProps.keys());

		expect(keys, "to equal", propNames);
	});

	it("Adds TimelineItemProps to items", () => {
		const timelineProps = new TimelineProps();
		timelineProps.AddItem("content", "contentOpposite", null);
		timelineProps.AddItem("content", "contentOpposite", null);
		const items = timelineProps.get(TimelineProps.propNames.items);

		const timelineItemProps = new TimelineItemProps();
		timelineItemProps.set(TimelineItemProps.propNames.content, "content");
		timelineItemProps.set(TimelineItemProps.propNames.contentOpposite, "contentOpposite");

		expect(items, "to equal", [timelineItemProps, timelineItemProps]);
	});

	it("Adds TimelineItemProps to items with no content renders no items", () => {
		const timelineProps = new TimelineProps();
		timelineProps.AddItem(null, null, null);
		timelineProps.AddItem("content", "contentOpposite", null);
		const items = timelineProps.get(TimelineProps.propNames.items);

		const timelineItemProps = new TimelineItemProps();
		timelineItemProps.set(TimelineItemProps.propNames.content, "content");
		timelineItemProps.set(TimelineItemProps.propNames.contentOpposite, "contentOpposite");

		expect(items, "to equal", [timelineItemProps]);
	});
});

describe("isTimelineProps", () => {
	it("Returns true if passed value is null", () => {
		expect(isTimelineProps(null), "to be true");
	});

	it("Returns false if passed value is not object", () => {
		expect(isTimelineProps("Not object"), "to be false");
	});

	it("Returns true if passed value type is TimelineProps", () => {
		expect(isTimelineProps(new TimelineProps()), "to be true");
	});

	it("Returns true if passed value has property _isTimelineProps and it's true", () => {
		expect(isTimelineProps({ _isTimelineProps: true }), "to be true");
	});

	it("Returns false if passed value has property _isTimelineProps and it's false or missing", () => {
		expect(isTimelineProps({}), "to be false");
		expect(isTimelineProps({ _isTimelineProps: false }), "to be false");
	});
});
