import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import sinon from "sinon";
import Tab from "./Tab";
import Bar, { TabBar } from "./Bar";

describe("Bar", () => {
	let closers;
	beforeEach(() => {
		closers = [0, 1, 2, 3].map(id => sinon.spy().named("close" + id));
	});

	it("renders a bar containing tabs", () =>
		expect(
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<MemoryRouter>
					<Bar
						pages={[
							{
								icon: "test",
								label: "A module",
								href: "/Foo/modu",
								mappedFrom: "/Foo/modu",
							},
							{
								href: "/Foo/modu/1",
								mappedFrom: "/Foo/modu/1",
								label: "Page 1",
								close: closers[0],
							},
							{
								href: "/Foo/modu/2",
								mappedFrom: "/Foo/modu/2",
								label: "Page 2",
								close: closers[1],
								active: true,
							},
							{
								href: "/Foo/modu/3",
								mappedFrom: "/Foo/modu/3",
								label: "Page 3",
								close: closers[2],
							},
							{
								href: "/Foo/modu/4",
								mappedFrom: "/Foo/modu/4",
								label: "Page 4",
								close: closers[3],
							},
						]}
					/>
				</MemoryRouter>
			</Provider>,
			"when mounted",
			"to satisfy",
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<MemoryRouter>
					<TabBar>
						<Tab
							key="/Foo/modu"
							module
							icon="test"
							href="/Foo/modu"
							mappedFrom="/Foo/modu"
							label="A module"
						/>
						<Tab
							key="/Foo/modu/1"
							href="/Foo/modu/1"
							mappedFrom="/Foo/modu/1"
							label="Page 1"
							close={closers[0]}
						/>
						<Tab
							key="/Foo/modu/2"
							href="/Foo/modu/2"
							mappedFrom="/Foo/modu/2"
							label="Page 2"
							close={closers[1]}
							active
						/>
						<Tab
							key="/Foo/modu/3"
							href="/Foo/modu/3"
							mappedFrom="/Foo/modu/3"
							label="Page 3"
							close={closers[2]}
						/>
						<Tab
							key="/Foo/modu/4"
							href="/Foo/modu/4"
							mappedFrom="/Foo/modu/4"
							label="Page 4"
							close={closers[3]}
						/>
					</TabBar>
				</MemoryRouter>
			</Provider>,
		));
});
