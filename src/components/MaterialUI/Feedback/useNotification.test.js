import React from "react";
import { useNotification } from "./useNotification";
import { mount } from "enzyme";

const TestComp = () => {
	const [snackPack, setSnackPack] = React.useState([]);

	const addNotification = useNotification(snackPack, setSnackPack);
	return (
		<div>
			<div id="notification" snacks={snackPack} onClick={(message, type) => addNotification(message, type)} />
		</div>
	);
};

describe("useNotification", () => {
	it("Retrieves empty snackPack array by default", () => {
		const component = <TestComp />;

		const mountedComponent = mount(component);

		const notification = mountedComponent.find("#notification");

		const snackPack = notification.prop("snacks");

		expect(snackPack, "to equal", []);
	});

	it("Adds new notification to snackPack", () => {
		const component = <TestComp />;

		const mountedComponent = mount(component);

		let notification = mountedComponent.find("#notification");

		const message = "test";
		const type = "success";

		notification.invoke("onClick")(message, type);

		notification = mountedComponent.find("#notification");

		const snackPack = notification.prop("snacks");

		expect(snackPack[0].message, "to equal", message);
		expect(snackPack[0].type, "to equal", type);
	});
});
