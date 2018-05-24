import React from "react";
import ApplicationSelector from "./index";
import Header from "./Header";
import ApplicationDialog from "./ApplicationDialog";
import Modal from "../../Modal";

describe("ApplicationSelector", () => {
	let props, applications, thisApp;
	beforeEach(() => {
		thisApp = {
			name: "current",
			displayName: "Test label",
			iconUri: "/test/url",
		};
		applications = [
			thisApp,
			{
				name: "other",
				displayName: "Test again",
				iconUri: "/test/elsewhere",
			},
		];
		props = {
			open: true,
			applications,
			applicationId: "current",
		};
	});

	it("renders a modal application selector dialog", () =>
		expect(
			<ApplicationSelector {...props} />,
			"to render as",
			<Modal
				anchor={<Header open application={thisApp} />}
				content={
					<ApplicationDialog
						open
						applications={applications}
						applicationId={props.applicationId}
					/>
				}
			/>,
		));

	it("handles a missing app list", () => {
		delete props.applications;
		return expect(
			<ApplicationSelector {...props} />,
			"to render as",
			<Modal
				anchor={<Header open />}
				content={<ApplicationDialog open applicationId={props.applicationId} />}
			/>,
		);
	});
});
