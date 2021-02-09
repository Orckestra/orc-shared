import React from "react";
import StepperModal from "./StepperModal";
import Modal from "./../Modal";
import ModalProps from "./../modalProps";
import Button from "@material-ui/core/Button";
import { mount } from "enzyme";
import sinon from "sinon";
import { IntlProvider } from "react-intl";
import { extractMessages } from "./../../../../utils/testUtils";
import sharedMessages from "./../../../../sharedMessages";

const messages = extractMessages(sharedMessages);

describe("StepperModal", () => {
	it("Renders StepperModal correctly", () => {
		const open = true;
		const title = "title";
		const backdropClickCallback = jest.fn();
		const okCallback = jest.fn();
		const cancelCallback = jest.fn();
		const modalProps = new ModalProps();
		const steps = [{ title: "step1", content: <div>content</div> }, { title: "step2" }];

		const titleComponent = (
			<div>
				<div>{title}</div>
				<div>step1</div>
				<div>step2</div>
			</div>
		);
		const messageComponent = <div>{steps[0].content}</div>;

		modalProps.set(ModalProps.propNames.title, titleComponent);
		modalProps.set(ModalProps.propNames.open, open);
		modalProps.set(ModalProps.propNames.backdropClickCallback, backdropClickCallback);

		const actionPanel = (
			<div>
				<Button variant="outlined" onClick={() => cancelCallback()}>
					{sharedMessages.cancel.defaultMessage}
				</Button>
				<Button variant="contained" color="primary" onClick={() => {}}>
					{sharedMessages.next.defaultMessage}
				</Button>
			</div>
		);

		modalProps.set(ModalProps.propNames.actionPanel, actionPanel);

		const component = (
			<IntlProvider locale="en-US" messages={messages}>
				<StepperModal
					steps={steps}
					title={title}
					open={open}
					confirmCallback={okCallback}
					closeCallback={cancelCallback}
				/>
			</IntlProvider>
		);

		const expected = (
			<IntlProvider locale="en-US" messages={messages}>
				<Modal message={messageComponent} modalProps={modalProps} />
			</IntlProvider>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Render closed modal", () => {
		const open = false;

		const component = (
			<IntlProvider locale="en-US" messages={messages}>
				<StepperModal open={open} />
			</IntlProvider>
		);

		expect(component, "when mounted", "to satisfy", null);
	});

	it("Calls cancelCallback when cancel button is pressed", () => {
		const open = true;
		const cancelCallbackSpy = sinon.spy();

		const component = (
			<IntlProvider locale="en-US" messages={messages}>
				<StepperModal open={open} closeCallback={cancelCallbackSpy} />
			</IntlProvider>
		);

		const mountedComponent = mount(component);

		const cancelButton = mountedComponent.find(Button).at(0);

		cancelButton.invoke("onClick")();

		expect(cancelCallbackSpy, "was called");
	});

	it("Calls cancelCallback when ok button is pressed", () => {
		const open = true;
		const okCallback = sinon.spy();
		const cancelCallback = sinon.spy();
		const steps = [
			{ title: "step1", content: "content" },
			{ title: "step2", content: "content2" },
		];

		const component = (
			<IntlProvider locale="en-US" messages={messages}>
				<StepperModal open={open} steps={steps} closeCallback={cancelCallback} confirmCallback={okCallback} />
			</IntlProvider>
		);

		const mountedComponent = mount(component);

		const next = mountedComponent.find(Button).at(1);
		next.invoke("onClick")();

		expect(mountedComponent.containsMatchingElement(steps[1].content), "to be truthy");

		const back = mountedComponent.find(Button).at(0);
		back.invoke("onClick")();

		expect(mountedComponent.containsMatchingElement(steps[0].content), "to be truthy");

		next.invoke("onClick")();

		const okButton = mountedComponent.find(Button).at(2);
		okButton.invoke("onClick")();

		expect(okCallback, "was called");
	});
});
