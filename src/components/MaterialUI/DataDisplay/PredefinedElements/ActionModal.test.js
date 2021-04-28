import React from "react";
import Modal from "./../Modal";
import ModalProps from "./../modalProps";
import Button from "@material-ui/core/Button";
import { mount } from "enzyme";
import sinon from "sinon";
import { IntlProvider } from "react-intl";
import { extractMessages } from "./../../../../utils/testUtils";
import sharedMessages from "./../../../../sharedMessages";
import { stringifyWithoutQuotes } from "./../../../../utils/parseHelper";
import ActionModal from "./ActionModal";

const messages = extractMessages(sharedMessages);

describe("ActionModal", () => {
	it("Renders ActionModal correctly", () => {
		const open = true;
		const message = "message";

		const actionOne = { label: sharedMessages.yes, handler: jest.fn(), isPrimary: true };
		const actionTwo = { label: sharedMessages.no, handler: jest.fn() };
		const actionThree = { label: sharedMessages.cancel, handler: jest.fn() };

		const backdropClickCallback = jest.fn();
		const modalProps = new ModalProps();

		const titleComponent = stringifyWithoutQuotes(messages["orc-shared.confirmation"]);

		modalProps.set(ModalProps.propNames.title, titleComponent);
		modalProps.set(ModalProps.propNames.open, open);
		modalProps.set(ModalProps.propNames.backdropClickCallback, backdropClickCallback);

		const actionPanel = (
			<div>
				<Button key="1" variant="contained" color="primary" onClick={() => actionOne.handler()} disableElevation>
					{stringifyWithoutQuotes(messages["orc-shared.yes"])}
				</Button>
				<Button key="2" variant="outlined" onClick={() => actionTwo.handler()}>
					{stringifyWithoutQuotes(messages["orc-shared.no"])}
				</Button>
				<Button key="3" variant="outlined" onClick={() => actionThree.handler()}>
					{stringifyWithoutQuotes(messages["orc-shared.cancel"])}
				</Button>
			</div>
		);

		modalProps.set(ModalProps.propNames.actionPanel, actionPanel);

		const component = (
			<IntlProvider locale="en-US" messages={messages}>
				<ActionModal
					message={message}
					open={open}
					actions={[actionOne, actionTwo, actionThree]}
					backdropClickCallback={backdropClickCallback}
				/>
			</IntlProvider>
		);

		const expected = (
			<IntlProvider locale="en-US" messages={messages}>
				<Modal message={message} modalProps={modalProps} />
			</IntlProvider>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Renders ConfirmationModal correctly with non default title", () => {
		const open = true;
		const title = "aTitle";
		const message = "aMessage";

		const actionOne = { label: sharedMessages.about, handler: jest.fn() };
		const actionTwo = { label: sharedMessages.help, handler: jest.fn(), isPrimary: true };
		const actionThree = { label: sharedMessages.signOut, handler: jest.fn() };

		const backdropClickCallback = jest.fn();
		const modalProps = new ModalProps();

		modalProps.set(ModalProps.propNames.title, title);
		modalProps.set(ModalProps.propNames.open, open);
		modalProps.set(ModalProps.propNames.backdropClickCallback, backdropClickCallback);

		const actionPanel = (
			<div>
				<Button key="1" variant="outlined" onClick={() => actionTwo.handler()}>
					{stringifyWithoutQuotes(messages["orc-shared.about"])}
				</Button>
				<Button key="2" variant="contained" color="primary" onClick={() => actionOne.handler()} disableElevation>
					{stringifyWithoutQuotes(messages["orc-shared.help"])}
				</Button>
				<Button key="3" variant="outlined" onClick={() => actionThree.handler()}>
					{stringifyWithoutQuotes(messages["orc-shared.signOut"])}
				</Button>
			</div>
		);

		modalProps.set(ModalProps.propNames.actionPanel, actionPanel);

		const component = (
			<IntlProvider locale="en-US" messages={messages}>
				<ActionModal
					title={title}
					message={message}
					open={open}
					actions={[actionOne, actionTwo, actionThree]}
					backdropClickCallback={backdropClickCallback}
				/>
			</IntlProvider>
		);

		const expected = (
			<IntlProvider locale="en-US" messages={messages}>
				<Modal message={message} modalProps={modalProps} />
			</IntlProvider>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Calls action handlers when buttons are pressed", () => {
		const open = true;

		const actionOne = { label: sharedMessages.yes, handler: sinon.spy(), isPrimary: true };
		const actionTwo = { label: sharedMessages.no, handler: sinon.spy() };
		const actionThree = { label: sharedMessages.cancel, handler: sinon.spy() };

		const component = (
			<IntlProvider locale="en-US" messages={messages}>
				<ActionModal open={open} actions={[actionOne, actionTwo, actionThree]} />
			</IntlProvider>
		);

		const mountedComponent = mount(component);

		const buttons = mountedComponent.find(Button);

		buttons.at(0).invoke("onClick")();
		buttons.at(0).invoke("onClick")();
		buttons.at(0).invoke("onClick")();

		buttons.at(1).invoke("onClick")();
		buttons.at(1).invoke("onClick")();

		buttons.at(2).invoke("onClick")();

		expect(actionOne.handler, "was called thrice");
		expect(actionTwo.handler, "was called twice");
		expect(actionThree.handler, "was called once");
	});
});
