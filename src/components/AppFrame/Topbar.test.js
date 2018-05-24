import React from "react";
import ApplicationSelector from "./ApplicationSelector";
import Topbar, { Wrapper, AppBox, CurrentApp, Menu } from "./Topbar";

describe("Topbar", () => {
	let applications, props, linkHOC, path, clicker, menuItems;
	beforeEach(() => {
		applications = [
			{
				name: "current",
				displayName: "Test label",
				iconUri: "/test/url",
			},
			{
				name: "other",
				displayName: "Test again",
				iconUri: "/test/elsewhere",
			},
		];
		linkHOC = x => x;
		path = [{ crumb: 1 }, { crumb: 2 }, { crumb: 3 }];
		clicker = () => {};
		menuItems = [];
		props = {
			onClick: clicker,
			path,
			linkHOC,
			menuLabel: "TestLabel",
			menuItems,
			applications,
			applicationId: "current",
		};
	});
	it("renders a top bar of an app", () =>
		expect(
			<Topbar {...props} />,
			"to render as",
			<Wrapper onClick={clicker}>
				<AppBox>
					<ApplicationSelector
						{...{
							applications,
							applicationId: "current",
						}}
					/>
					<CurrentApp displayName="Test label" iconUri="/test/url" />
				</AppBox>
				<Menu menuLabel="TestLabel" menuItems={menuItems} />
			</Wrapper>,
		));
});
