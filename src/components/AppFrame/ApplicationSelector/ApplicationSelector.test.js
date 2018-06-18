import React from "react";
import ApplicationSelector, { getAnchor, getDialog } from "./index";
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
				anchor={expect.it("to be a function")}
				content={expect.it("to be a function")}
			/>,
		));

	describe("getAnchor", () => {
		let toggle;
		beforeEach(() => {
			toggle = () => {};
		});

		it("takes props and returns a header render function", () =>
			expect(
				getAnchor,
				"when called with",
				["foo", props],
				"when called with",
				[toggle],
				"to equal",
				<Header className="foo" open application={thisApp} toggle={toggle} />,
			));

		it("handles a missing app list", () => {
			delete props.applications;
			return expect(
				getAnchor,
				"when called with",
				["foo", props],
				"when called with",
				[toggle],
				"to equal",
				<Header className="foo" open toggle={toggle} />,
			);
		});
	});

	describe("getDialog", () => {
		let toggle;
		beforeEach(() => {
			toggle = () => {};
		});

		it("takes props and returns a header render function", () =>
			expect(
				getDialog,
				"when called with",
				[props],
				"when called with",
				[toggle],
				"to equal",
				<ApplicationDialog
					open
					applications={applications}
					applicationId={props.applicationId}
					toggle={toggle}
				/>,
			));
	});
});
