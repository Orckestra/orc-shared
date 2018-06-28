import React from "react";
import sinon from "sinon";
import Tab from "./Tab";
import FullBar, { Bar, TabBar } from "./Bar";

describe("Bar", () => {
	it("renders a bar containing tabs", () => {
		const close = () => {};
		return expect(
			<Bar
				pages={[
					{
						icon: "test",
						label: "A module",
						href: "/Foo/modu",
					},
					{
						href: "/Foo/modu/1",
						label: "Page 1",
					},
					{
						href: "/Foo/modu/2",
						label: "Page 2",
						active: true,
					},
					{
						href: "/Foo/modu/3",
						label: "Page 3",
					},
					{
						href: "/Foo/modu/4",
						label: "Page 4",
					},
				]}
				close={close}
			/>,
			"to render as",
			<TabBar>
				<Tab
					key="/Foo/modu"
					module
					icon="test"
					href="/Foo/modu"
					label="A module"
				/>
				<Tab
					key="/Foo/modu/1"
					href="/Foo/modu/1"
					label="Page 1"
					close={close}
				/>
				<Tab
					key="/Foo/modu/2"
					href="/Foo/modu/2"
					label="Page 2"
					close={close}
					active
				/>
				<Tab
					key="/Foo/modu/3"
					href="/Foo/modu/3"
					label="Page 3"
					close={close}
				/>
				<Tab
					key="/Foo/modu/4"
					href="/Foo/modu/4"
					label="Page 4"
					close={close}
				/>
			</TabBar>,
		);
	});

	describe("with close handler", () => {
		it("curries the close handler with module name and href", () => {
			const innerClose = sinon.spy().named("innerClose");
			const close = sinon.spy(() => innerClose).named("close");
			return expect(
				<FullBar
					pages={[]}
					close={close}
					moduleName="modu"
					moduleHref="/Foo/modu"
				/>,
				"to render as",
				<Bar pages={[]} close={expect.it("called")} />,
			)
				.then(() =>
					expect(close, "to have calls satisfying", [
						{ args: ["modu", "/Foo/modu"] },
					]),
				)
				.then(() => expect(innerClose, "was called"));
		});
	});
});
