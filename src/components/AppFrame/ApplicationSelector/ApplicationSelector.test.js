import React from "react";
import { extractMessages, TestWrapper, createMuiTheme } from "../../../utils/testUtils";
import ApplicationSelector from "./index";
import PopperedIcon from "../../MaterialUI/DataDisplay/PopperedElements/PopperedIcon";
import ApplicationDialog from "./ApplicationDialog";
import sharedMessages from "~/sharedMessages";

const messages = extractMessages(sharedMessages);

describe("ApplicationSelector", () => {
	const theme = createMuiTheme();

	let props, applications, thisApp;
	beforeEach(() => {
		thisApp = {
			name: "current",
			displayName: "Test label",
			iconUri: "/url/to/img1.png",
			url: "/test/url",
		};
		applications = [
			thisApp,
			{
				name: "other",
				displayName: "Test again",
				iconUri: "/url/to/img2.png",
				url: "/test/elsewhere",
			},
		];
		props = {
			open: true,
			applications,
			applicationId: "current",
		};
	});

	it("renders a poppered application selector dialog", () => {
		const component = (
			<TestWrapper intlProvider={{ messages }} stylesProvider muiThemeProvider={{ theme }}>
				<ApplicationSelector {...props} />
			</TestWrapper>
		);
		const expected = (
			<TestWrapper intlProvider={{ messages }} stylesProvider muiThemeProvider={{ theme }}>
				<PopperedIcon popperValue={<ApplicationDialog {...props} />} id="app-list" placement="bottom-start" />
			</TestWrapper>
		);
		expect(component, "when mounted", "to satisfy", expected);
	});
});
