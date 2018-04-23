import React from "react";
import ApplicationSelector from "./index";
import Header from "./Header";
import ApplicationDialog from "./ApplicationDialog";
import Modal from "../../Modal";

describe("ApplicationSelector", () => {
	let props, applications, thisApp;
	beforeEach(() => {
		thisApp = {
			id: "current",
			label: "Test label",
			src: "/test/url",
		};
		applications = [
			thisApp,
			{
				id: "other",
				label: "Test again",
				src: "/test/elsewhere",
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
});
