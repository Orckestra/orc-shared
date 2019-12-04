import React from "react";
import sinon from "sinon";
import { getClassName } from "../../../utils/testUtils";
import ApplicationDialog, {
	List,
	Block,
	Link,
	Logo,
	Label,
	Indicator,
} from "./ApplicationDialog";

describe("ApplicationDialog", () => {
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

	it("renders a dialog structure listing applications", () =>
		expect(
			<ApplicationDialog
				toggle={toggle}
				applications={applications}
				applicationId="ChosenId"
			/>,
			"when mounted",
			"with event",
			{
				type: "click",
				target: "." + getClassName(<Link />) + '[href="/test/url"]',
			},
			"to satisfy",
			<List>
				<Block key="ChosenId">
					<Link href="/test/url">
						<Logo src="/url/to/img1.png" />
					</Link>
					<Label>Current App</Label>
					<Indicator />
				</Block>
				<Block key="OtherId">
					<Link href="/test/some/other/url">
						<Logo src="/url/to/img2.png" />
					</Link>
					<Label>Other App</Label>
				</Block>
			</List>,
		).then(() => expect(toggle, "was called once")));
});
