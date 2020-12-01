import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";
import sinon from "sinon";
import { ignoreConsoleError } from "../../../utils/testUtils";
import NotificationProps from "./NotificationProps";
import Notification from "./Notification";
import Switch from "../Inputs/Switch";

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

	it("Renders Notification component without errors", done => {
		const mockedMessage = { key: new Date().getTime(), message: "This is confirmation notification message" };
		let snackPack = [mockedMessage];
		const setSnackPack = snackPackUpdate => snackPackUpdate(snackPack);

		const notificationProps = new NotificationProps();

		const component = (
			<Notification notificationProps={notificationProps} snackPack={snackPack} setSnackPack={setSnackPack} />
		);

		ReactDOM.render(component, container);

		const clickEvent = document.createEvent("MouseEvents");
		clickEvent.initEvent("click", true, false);

		container.dispatchEvent(clickEvent);

		expect(container, "to contain", <div>{mockedMessage.message}</div>);

		act(() => {
			const closeButton = container.querySelector("button");
			closeButton.dispatchEvent(clickEvent);
			setTimeout(() => {
				expect(container, "not to contain", <div>{mockedMessage.message}</div>);
				done();
			}, 2000);
		});
	});

	it("Renders lastOnly Notification component without errors", done => {
		const mockedMessage = { key: new Date().getTime(), message: "This is confirmation notification message" };
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

		ReactDOM.render(component, container);

		const clickEvent = document.createEvent("MouseEvents");
		clickEvent.initEvent("click", true, false);

		act(() => {
			setTimeout(() => {
				container.dispatchEvent(clickEvent);
				expect(container, "to contain", <div>{mockedMessageSecond.message}</div>);
				done();
			}, 2000);
		});
	});
});
