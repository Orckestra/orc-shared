import React from "react";
import { mount } from "enzyme";
import sinon from "sinon";
import { ignoreConsoleError } from "../../../utils/testUtils";
import NotificationProps from "./NotificationProps";
import Notification from "./Notification";
import Snackbar from "@material-ui/core/Snackbar";

describe("Notification Component", () => {
	let setSnackPack, container;
	beforeEach(() => {
		container = document.createElement("div");
		document.body.appendChild(container);
		setSnackPack = sinon.spy().named("setSnackPack");
	});
	afterEach(() => {
		document.body.removeChild(container);
		container = null;
	});

	it("Fails if notificationProps has wrong type", () => {
		ignoreConsoleError(() => {
			const component = <Notification notificationProps="Wrong type" />;
			expect(() => mount(component), "to throw a", TypeError).then(error => {
				expect(error, "to have message", "notificationProps property is not of type NotificationProps");
			});
		});
	});

	it("Renders Error Notification component without errors", () => {
		const mockedMessage = {
			key: new Date().getTime(),
			message: "This is confirmation notification message",
			type: "error",
		};
		const snackPack = [mockedMessage];
		const autoHideDuration = 5000;
		const anchorOrigin = { vertical: "top", horizontal: "right" };
		const lastOnly = false;

		const notificationProps = new NotificationProps();

		notificationProps.set(NotificationProps.propNames.autoHideDuration, autoHideDuration);
		notificationProps.set(NotificationProps.propNames.anchorOrigin, anchorOrigin);
		notificationProps.set(NotificationProps.propNames.lastOnly, lastOnly);

		const component = (
			<Notification notificationProps={notificationProps} snackPack={snackPack} setSnackPack={setSnackPack} />
		);

		const mountedComponent = mount(component);

		expect(mountedComponent.exists("#error-cross-filled"), "to be true");
		expect(mountedComponent.containsMatchingElement(mockedMessage.message), "to be truthy");
	});

	it("Renders Success Notification component without errors", () => {
		const mockedMessage = {
			key: new Date().getTime(),
			message: "This is confirmation notification message",
			type: "success",
		};
		let snackPack = [mockedMessage];
		const autoHideDuration = 5000;
		const anchorOrigin = { vertical: "top", horizontal: "right" };
		const lastOnly = false;

		const notificationProps = new NotificationProps();

		notificationProps.set(NotificationProps.propNames.autoHideDuration, autoHideDuration);
		notificationProps.set(NotificationProps.propNames.anchorOrigin, anchorOrigin);
		notificationProps.set(NotificationProps.propNames.lastOnly, lastOnly);

		const component = (
			<Notification notificationProps={notificationProps} snackPack={snackPack} setSnackPack={setSnackPack} />
		);

		const mountedComponent = mount(component);

		expect(mountedComponent.exists("#checkmark-filled"), "to be true");
		expect(mountedComponent.containsMatchingElement(mockedMessage.message), "to be truthy");
	});

	it("Renders Notification component without errors", () => {
		const mockedMessage = { key: new Date().getTime(), message: "This is confirmation notification message" };
		let snackPack = [mockedMessage];
		const setSnackPack = snackPackUpdate => snackPackUpdate(snackPack);

		const notificationProps = new NotificationProps();

		const component = (
			<Notification notificationProps={notificationProps} snackPack={snackPack} setSnackPack={setSnackPack} />
		);

		const mountedComponent = mount(component);

		mountedComponent.find(Snackbar).invoke("onClose")({}, "clickaway");
		expect(mountedComponent.containsMatchingElement(mockedMessage.message), "to be truthy");

		mountedComponent.find("button").simulate("click");

		mountedComponent.find(Snackbar).invoke("onExited")();
		expect(mountedComponent.containsMatchingElement(mockedMessage.message), "not to be truthy");
	});

	it("Renders lastOnly Notification component without errors", () => {
		const mockedMessage = { key: new Date().getTime(), message: "This is confirmation first notification message" };
		const mockedMessageSecond = {
			key: new Date().getTime() + 1,
			message: "This is confirmation second notification message",
		};
		let snackPack = [mockedMessage, mockedMessageSecond];
		const setSnackPack = snackPackUpdate => snackPackUpdate(snackPack);

		const notificationProps = new NotificationProps();

		const component = (
			<Notification notificationProps={notificationProps} snackPack={snackPack} setSnackPack={setSnackPack} />
		);

		const mountedComponent = mount(component);

		mountedComponent.find(Snackbar).invoke("onExited")();
		expect(mountedComponent.containsMatchingElement(mockedMessageSecond.message), "to be truthy");
	});
});
