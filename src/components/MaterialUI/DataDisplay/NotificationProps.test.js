import NotificationProps, { isNotificationProps } from "./NotificationProps";

describe("NotificationProps Props", () => {
	it("Contains necessary props keys", () => {
		const propNames = ["autoHideDuration", "anchorOrigin", "lastOnly"];

		expect(NotificationProps.propNames, "to have keys", propNames);
	});

	it("Puts keys in component props map", () => {
		const propNames = ["autoHideDuration", "anchorOrigin", "lastOnly"];

		const notificationProps = new NotificationProps();

		const keys = Array.from(notificationProps.componentProps.keys());

		expect(keys, "to equal", propNames);
	});
});

describe("isNotificationProps", () => {
	it("Returns true if passed value is null", () => {
		expect(isNotificationProps(null), "to be true");
	});

	it("Returns false if passed value is not object", () => {
		expect(isNotificationProps("Not object"), "to be false");
	});

	it("Returns true if passed value type is NotificationProps", () => {
		expect(isNotificationProps(new NotificationProps()), "to be true");
	});

	it("Returns true if passed value has property _isNotificationProps and it's true", () => {
		expect(isNotificationProps({ _isNotificationProps: true }), "to be true");
	});

	it("Returns false if passed value has property _isNotificationProps and it's false or missing", () => {
		expect(isNotificationProps({}), "to be false");
		expect(isNotificationProps({ _isNotificationProps: false }), "to be false");
	});
});
