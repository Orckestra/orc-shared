import React from "react";
import ApplicationSelector, { getAnchor, getDialog } from "./index";
import Header, { MenuIcon, Wrapper } from "./Header";
import ApplicationDialog, {
	List,
	Block,
	Link,
	Logo,
	Label,
	Indicator,
} from "./ApplicationDialog";

describe("ApplicationSelector", () => {
	let props, applications, thisApp, modalRoot;
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
		modalRoot = document.createElement("div");
		modalRoot.id = "modal";
		document.body.appendChild(modalRoot);
	});
	afterEach(() => {
		document.body.removeChild(modalRoot);
	});

	it("renders a modal application selector dialog", () =>
		expect(
			<ApplicationSelector {...props} />,
			"when mounted",
			"with event",
			"click",
			"to satisfy",
			<Wrapper>
				<MenuIcon />
			</Wrapper>,
		).then(() =>
			expect(
				modalRoot,
				"to contain",
				<List>
					<Block key="current">
						<Link href="/test/url">
							<Logo src="/url/to/img1.png" />
						</Link>
						<Label>Test label</Label>
						<Indicator />
					</Block>
					<Block key="other">
						<Link href="/test/elsewhere">
							<Logo src="/url/to/img2.png" />
						</Link>
						<Label>Test again</Label>
					</Block>
				</List>,
			),
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
