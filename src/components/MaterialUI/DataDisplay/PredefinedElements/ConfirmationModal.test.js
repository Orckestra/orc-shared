import React from "react";
import ConfirmationModal from "./ConfirmationModal";
import Modal from "./../Modal";
import ModalProps from "./../modalProps";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { mount } from "enzyme";
import sinon from "sinon";
import { IntlProvider } from "react-intl";
import { extractMessages } from "./../../../../utils/testUtils";
import sharedMessages from "./../../../../sharedMessages";
import { stringifyWithoutQuotes } from "./../../../../utils/parseHelper";

const messages = extractMessages(sharedMessages);

describe("ConfirmationModal", () => {
	it("Renders ConfirmationModal correctly", () => {
		const open = true;
		const message = "message";
		const backdropClickCallback = jest.fn();
		const okCallback = jest.fn();
		const cancelCallback = jest.fn();
		const modalProps = new ModalProps();

		const titleComponent = stringifyWithoutQuotes(messages["orc-shared.confirmation"]);
		const messageComponent = (
			<div>
				<Typography children={message} />
			</div>
		);

		modalProps.set(ModalProps.propNames.title, titleComponent);
		modalProps.set(ModalProps.propNames.open, open);
		modalProps.set(ModalProps.propNames.backdropClickCallback, backdropClickCallback);

		const actionPanel = (
			<div>
				<Button variant="outlined" onClick={() => cancelCallback()}>
					{stringifyWithoutQuotes(messages["orc-shared.cancel"])}
				</Button>
				<Button variant="contained" color="primary" onClick={() => okCallback()}>
					{stringifyWithoutQuotes(messages["orc-shared.close"])}
				</Button>
			</div>
		);

		modalProps.set(ModalProps.propNames.actionPanel, actionPanel);

		const component = (
			<IntlProvider locale="en-US" messages={messages}>
				<ConfirmationModal
					message={message}
					open={open}
					okCallback={okCallback}
					cancelCallback={cancelCallback}
					backdropClickCallback={backdropClickCallback}
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

	it("Calls cancelCallback when cancel button is pressed", () => {
		const open = true;
		const cancelCallbackSpy = sinon.spy();
		const modalProps = new ModalProps();

		modalProps.set(ModalProps.propNames.open, open);

		const component = (
			<IntlProvider locale="en-US" messages={messages}>
				<ConfirmationModal open={open} cancelCallback={cancelCallbackSpy} />
			</IntlProvider>
		);

		const mountedComponent = mount(component);

		const cancelButton = mountedComponent.find(Button).at(0);

		cancelButton.invoke("onClick")();

		expect(cancelCallbackSpy, "was called");
	});

	it("Calls okCallback when ok button is pressed", () => {
		const open = true;
		const okCallbackSpy = sinon.spy();
		const modalProps = new ModalProps();

		modalProps.set(ModalProps.propNames.open, open);

		const component = (
			<IntlProvider locale="en-US" messages={messages}>
				<ConfirmationModal open={open} okCallback={okCallbackSpy} />
			</IntlProvider>
		);

		const mountedComponent = mount(component);

		const okButton = mountedComponent.find(Button).at(1);

		okButton.invoke("onClick")();

		expect(okCallbackSpy, "was called");
	});

	it("Renders ConfirmationModal correctly when set buttons' labels", () => {
		const open = true;
		const message = "message";
		const okButtonlabel = sharedMessages.yes;
		const cancelButtonlabel = sharedMessages.no;
		const backdropClickCallback = jest.fn();
		const okCallback = jest.fn();
		const cancelCallback = jest.fn();
		const modalProps = new ModalProps();

		const titleComponent = stringifyWithoutQuotes(messages["orc-shared.confirmation"]);
		const okButtonlabelComponent = stringifyWithoutQuotes(messages["orc-shared.yes"]);
		const cancelButtonlabelComponent = stringifyWithoutQuotes(messages["orc-shared.no"]);
		const messageComponent = (
			<div>
				<Typography children={message} />
			</div>
		);

		modalProps.set(ModalProps.propNames.title, titleComponent);
		modalProps.set(ModalProps.propNames.open, open);
		modalProps.set(ModalProps.propNames.backdropClickCallback, backdropClickCallback);

		const actionPanel = (
			<div>
				<Button variant="outlined" onClick={() => cancelCallback()}>
					{cancelButtonlabelComponent}
				</Button>
				<Button variant="contained" color="primary" onClick={() => okCallback()}>
					{okButtonlabelComponent}
				</Button>
			</div>
		);

		modalProps.set(ModalProps.propNames.actionPanel, actionPanel);

		const component = (
			<IntlProvider locale="en-US" messages={messages}>
				<ConfirmationModal
					message={message}
					open={open}
					okCallback={okCallback}
					cancelCallback={cancelCallback}
					backdropClickCallback={backdropClickCallback}
					okButtonLabel={okButtonlabel}
					cancelButtonLabel={cancelButtonlabel}
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
});
