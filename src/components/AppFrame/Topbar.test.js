import React from "react";
import ApplicationSelector from "./ApplicationSelector";
import Topbar, {
	Wrapper,
	AppBox,
	CurrentApp,
	AppLabel,
	AppLogo,
	Menu,
} from "./Topbar";

describe("Topbar", () => {
	let applications, props, linkHOC, path, clicker, menuMessages;
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
		menuMessages = {};
		props = {
			onClick: clicker,
			path,
			linkHOC,
			menuLabel: "TestLabel",
			menuMessages,
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
				<Menu menuLabel="TestLabel" messages={menuMessages} />
			</Wrapper>,
		));

	it("doesn't break if no current app", () =>
		expect(
			<Topbar {...props} applicationId="wrong" />,
			"to render as",
			<Wrapper onClick={clicker}>
				<AppBox>
					<CurrentApp />
				</AppBox>
				<Menu menuLabel="TestLabel" messages={menuMessages} />
			</Wrapper>,
		));

	it("doesn't break if no apps at all", () =>
		expect(
			<Topbar {...props} applications={undefined} />,
			"to render as",
			<Wrapper onClick={clicker}>
				<AppBox>
					<CurrentApp />
				</AppBox>
				<Menu menuLabel="TestLabel" messages={menuMessages} />
			</Wrapper>,
		));
});

describe("CurrentApp", () => {
	it("renders the app logo and name", () =>
		expect(
			<CurrentApp displayName="Test label" iconUri="/test/url" />,
			"to render as",
			<AppLabel>
				<AppLogo src="/test/url" />
				Test label
			</AppLabel>,
		));
});
