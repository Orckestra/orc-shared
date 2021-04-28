import React from "react";
import ConfirmationModal from "./ConfirmationModal";
import { IntlProvider } from "react-intl";
import { extractMessages } from "./../../../../utils/testUtils";
import sharedMessages from "./../../../../sharedMessages";
import ActionModal from "./ActionModal";

const messages = extractMessages(sharedMessages);

describe("ConfirmationModal", () => {
	it("Renders ConfirmationModal correctly", () => {
		const open = true;
		const message = "message";
		const backdropClickCallback = jest.fn();
		const okCallback = jest.fn();
		const cancelCallback = jest.fn();

		const actions = [
			{ label: sharedMessages.cancel, handler: cancelCallback },
			{ label: sharedMessages.close, handler: okCallback, isPrimary: true },
		];

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
				<ActionModal open={open} message={message} actions={actions} />
			</IntlProvider>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Renders ConfirmationModal correctly when set buttons' labels", () => {
		const open = true;
		const message = "message";
		const backdropClickCallback = jest.fn();
		const okCallback = jest.fn();
		const cancelCallback = jest.fn();
		const okButtonLabel = sharedMessages.yes;
		const cancelButtonLabel = sharedMessages.no;

		const actions = [
			{ label: cancelButtonLabel, handler: cancelCallback },
			{ label: okButtonLabel, handler: okCallback, isPrimary: true },
		];

		const component = (
			<IntlProvider locale="en-US" messages={messages}>
				<ConfirmationModal
					message={message}
					open={open}
					okCallback={okCallback}
					cancelCallback={cancelCallback}
					okButtonLabel={okButtonLabel}
					cancelButtonLabel={cancelButtonLabel}
					backdropClickCallback={backdropClickCallback}
				/>
			</IntlProvider>
		);

		const expected = (
			<IntlProvider locale="en-US" messages={messages}>
				<ActionModal open={open} message={message} actions={actions} />
			</IntlProvider>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});
});
