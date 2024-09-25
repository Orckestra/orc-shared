import React from "react";
import StepperModal from "./StepperModal";
import Modal from "./../Modal";
import ModalProps from "./../modalProps";
import Button from "@material-ui/core/Button";
import ModalMui from "@material-ui/core/Modal";
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
		modalProps.set(ModalProps.propNames.type, "wide");

		const actionPanel = (
			<div>
				<div></div>
				<div>
					<Button variant="outlined" disabled={false} onClick={() => cancelCallback()}>
						{sharedMessages.cancel.defaultMessage}
					</Button>
					<Button variant="contained" color="primary" disabled={false} onClick={() => {}} disableElevation>
						{sharedMessages.next.defaultMessage}
					</Button>
				</div>
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

	it("Renders StepperModal correctly with disabled step", () => {
		const open = true;
		const title = "title";
		const backdropClickCallback = jest.fn();
		const okCallback = jest.fn();
		const cancelCallback = jest.fn();
		const modalProps = new ModalProps();
		const steps = [{ title: "step1", nextDisabled: () => true, content: <div>content</div> }, { title: "step2" }];

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
		modalProps.set(ModalProps.propNames.type, "wide");

		const actionPanel = (
			<div>
				<div></div>
				<div>
					<Button variant="outlined" disabled={false} onClick={() => cancelCallback()}>
						{sharedMessages.cancel.defaultMessage}
					</Button>
					<Button variant="contained" color="primary" disabled={true} onClick={() => {}} disableElevation>
						{sharedMessages.next.defaultMessage}
					</Button>
				</div>
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

	it("Renders StepperModal correctly with custom actions", () => {
		const open = true;
		const title = "title";
		const backdropClickCallback = jest.fn();
		const okCallback = jest.fn();
		const cancelCallback = jest.fn();
		const modalProps = new ModalProps();
		const actions = [
			{
				value: "first value",
				label: "first action",
				Handler: () => {},
			},
			{
				value: "second value",
				label: "second action",
				Handler: () => {},
			},
		];
		const steps = [{ title: "step1", content: <div>content</div>, actions }, { title: "step2" }];

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
		modalProps.set(ModalProps.propNames.type, "wide");

		const actionPanel = (
			<div>
				<div></div>
				<div>
					<Button variant="outlined" disabled={false} onClick={() => cancelCallback()}>
						{sharedMessages.cancel.defaultMessage}
					</Button>
					<Button variant="contained" color="primary" disabled={false} onClick={() => {}} disableElevation>
						first action
					</Button>
					<Button variant="contained" color="primary" disabled={false} onClick={() => {}} disableElevation>
						second action
					</Button>
				</div>
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

	it("Renders StepperModal correctly with disabled custom actions", () => {
		const open = true;
		const title = "title";
		const backdropClickCallback = jest.fn();
		const okCallback = jest.fn();
		const cancelCallback = jest.fn();
		const modalProps = new ModalProps();
		const actions = [
			{
				value: "first value",
				label: "first action",
				Handler: () => {},
			},
			{
				value: "second value",
				label: "second action",
				Handler: () => {},
			},
		];
		const steps = [
			{ title: "step1", nextDisabled: () => true, content: <div>content</div>, actions },
			{ title: "step2" },
		];

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
		modalProps.set(ModalProps.propNames.type, "wide");

		const actionPanel = (
			<div>
				<div></div>
				<div>
					<Button variant="outlined" disabled={false} onClick={() => cancelCallback()}>
						{sharedMessages.cancel.defaultMessage}
					</Button>
					<Button variant="contained" color="primary" disabled={true} onClick={() => {}} disableElevation>
						first action
					</Button>
					<Button variant="contained" color="primary" disabled={true} onClick={() => {}} disableElevation>
						second action
					</Button>
				</div>
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

	it("Renders StepperModal correctly when custom action is clicked", () => {
		const open = true;
		const actions = [
			{
				value: "first value",
				label: "first action",
				handler: jest.fn(),
			},
			{
				value: "second value",
				label: "second action",
				handler: jest.fn(),
			},
		];

		const okCallback = sinon.spy();
		const cancelCallback = sinon.spy();
		const steps = [
			{ title: "step1", content: "content", actions },
			{ title: "step2", content: "content2" },
		];

		const component = (
			<IntlProvider locale="en-US" messages={messages}>
				<StepperModal open={open} steps={steps} closeCallback={cancelCallback} confirmCallback={okCallback} />
			</IntlProvider>
		);

		const mountedComponent = mount(component);

		const firstAction = mountedComponent.find(Button).at(1);
		firstAction.invoke("onClick")();

		expect(mountedComponent.containsMatchingElement(steps[1].content), "to be truthy");

		const back = mountedComponent.find(Button).at(0);
		back.invoke("onClick")();

		expect(mountedComponent.containsMatchingElement(steps[0].content), "to be truthy");

		const secondAction = mountedComponent.find(Button).at(2);
		secondAction.invoke("onClick")();

		const okButton = mountedComponent.find(Button).at(2);
		okButton.invoke("onClick")();

		expect(okCallback, "was called");
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

	it("Calls backdropCallback when clicking away from component", () => {
		const open = true;
		const backdropCallbackSpy = sinon.spy();

		const component = (
			<IntlProvider locale="en-US" messages={messages}>
				<StepperModal open={open} backdropCallback={backdropCallbackSpy} />
			</IntlProvider>
		);

		const mountedComponent = mount(component);

		const muiModal = mountedComponent.find(ModalMui);

		muiModal.invoke("onClose")({}, "backdropClick");

		expect(backdropCallbackSpy, "was called");
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
