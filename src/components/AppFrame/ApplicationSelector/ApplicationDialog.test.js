import React from "react";
import sinon from "sinon";
import { extractMessages, TestWrapper, createMuiTheme } from "../../../utils/testUtils";
import ApplicationDialog from "./ApplicationDialog";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import sharedMessages from "~/sharedMessages";
import { mount } from "enzyme";

const messages = extractMessages(sharedMessages);
describe("ApplicationDialog", () => {
	const theme = createMuiTheme();

	let toggle, applications;
	beforeEach(() => {
		toggle = sinon.spy().named("toggle");
		applications = [
			{
				name: "ChosenId",
				iconUri: "/url/to/img1.png",
				url: "/test/url",
				displayName: "Current App",
			},
			{
				name: "OtherId",
				iconUri: "/url/to/img2.png",
				url: "/test/some/other/url",
				displayName: "Other App",
			},
		];
	});

	it("renders a dialog structure listing applications", () => {
		const component = (
			<TestWrapper intlProvider={{ messages }} stylesProvider muiThemeProvider={{ theme }}>
				<ApplicationDialog toggle={toggle} applications={applications} applicationId="ChosenId" />
			</TestWrapper>
		);

		const expected = (
			<TestWrapper intlProvider={{ messages }} stylesProvider muiThemeProvider={{ theme }}>
				<Grid>
					<Grid>
						<p>Orckestra Commerce Cloud Applications List</p>
					</Grid>
					<Grid>
						<Grid key="ChosenId">
							<Link href="/test/url" underline="none">
								<img src="/url/to/img1.png" alt="Current App" />
								<br />
								<p>Current App</p>
							</Link>
						</Grid>
						<Grid key="OtherId">
							<Link href="/test/some/other/url" underline="none">
								<img src="/url/to/img2.png" alt="Other App" />
								<br />
								<p>Other App</p>
							</Link>
						</Grid>
					</Grid>
				</Grid>
			</TestWrapper>
		);
		expect(component, "when mounted", "to satisfy", expected);
	});

	it("triggers toggle when the current app link is clicked", () => {
		const component = (
			<TestWrapper intlProvider={{ messages }} stylesProvider muiThemeProvider={{ theme }}>
				<ApplicationDialog toggle={toggle} applications={applications} applicationId="ChosenId" />
			</TestWrapper>
		);

		const mountedComponent = mount(component);

		const currAppLink = mountedComponent.find(Link).at(0);
		currAppLink.simulate("click");
		expect(toggle, "was called once");
	});
	/*
		expect(
			<ApplicationDialog toggle={toggle} applications={applications} applicationId="ChosenId" />,
			"when mounted",
			"to satisfy",
			,
		).then(() => expect(toggle, "was called once")));
		*/
});
