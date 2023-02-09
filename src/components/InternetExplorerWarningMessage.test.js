import React from "react";
import { extractMessages, TestWrapper } from "../utils/testUtils";
import { InternetExplorerWarningMessage } from "./InternetExplorerWarningMessage";
import Immutable from "immutable";
import sharedMessages from "../sharedMessages";
import ModalMui from "@mui/material/Modal";
import { Ignore } from "unexpected-reaction";

const messages = extractMessages(sharedMessages);

describe("InternetExplorerWarningMessage with Internet Explorer", () => {
	let state, store;
	const { MSInputMethodContext } = window;
	const { documentMode } = document;

	beforeEach(() => {
		state = Immutable.fromJS({});

		store = {
			getState: () => state,
			subscribe: () => {},
			dispatch: () => {},
		};

		window.MSInputMethodContext = {};
		document.documentMode = 11;
	});

	afterEach(() => {
		window.MSInputMethodContext = MSInputMethodContext;
		document.documentMode = documentMode;
	});

	it("renders the dialog for IE11", () => {
		const component = (
			<TestWrapper provider={{ store }} intlProvider={{ messages }} stylesProvider muiThemeProvider={{}}>
				<div>
					<InternetExplorerWarningMessage />
				</div>
			</TestWrapper>
		);

		const expected = (
			<TestWrapper intlProvider={{ messages }} stylesProvider>
				<div>
					<ModalMui disablePortal disableEnforceFocus disableAutoFocus open={true}>
						<Ignore />
					</ModalMui>
				</div>
			</TestWrapper>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});
});

describe("InternetExplorerWarningMessage without Internet Explorer", () => {
	let state, store;

	beforeEach(() => {
		state = Immutable.fromJS({});

		store = {
			getState: () => state,
			subscribe: () => {},
			dispatch: () => {},
		};
	});

	it("renders the dialog for IE11", () => {
		const component = (
			<TestWrapper provider={{ store }} intlProvider={{ messages }} stylesProvider muiThemeProvider={{}}>
				<InternetExplorerWarningMessage />
			</TestWrapper>
		);

		expect(component, "when mounted", "to satisfy", null);
	});
});
