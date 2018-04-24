import React from "react";
import Topbar, { Wrapper, Menu } from "./Topbar";
import Breadcrumbs from "./Breadcrumbs";

describe("Topbar", () => {
	let props, linkHOC, path, clicker, menuItems;
	beforeEach(() => {
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
		};
	});
	it("renders a top bar of an app", () =>
		expect(
			<Topbar {...props} />,
			"to render as",
			<Wrapper onClick={clicker}>
				<Breadcrumbs linkHOC={linkHOC} path={path} />
				<Menu menuLabel="TestLabel" menuItems={menuItems} />
			</Wrapper>,
		));
});
