import React from "react";
import { MemoryRouter } from "react-router-dom";
import sinon from "sinon";
import { getClassSelector } from "../../utils/testUtils";
import Tab, { CloseIcon } from "./Tab";
import FullBar, { Bar, TabBar } from "./Bar";

describe("Bar", () => {
	it("renders a bar containing tabs", () => {
		const close = () => {};
		return expect(
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
						},
						{
							href: "/Foo/modu/2",
							mappedFrom: "/Foo/modu/2",
							label: "Page 2",
							active: true,
						},
						{
							href: "/Foo/modu/3",
							mappedFrom: "/Foo/modu/3",
							label: "Page 3",
						},
						{
							href: "/Foo/modu/4",
							mappedFrom: "/Foo/modu/4",
							label: "Page 4",
						},
					]}
					close={close}
				/>
			</MemoryRouter>,
			"when mounted",
			"to satisfy",
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
						close={close}
					/>
					<Tab
						key="/Foo/modu/2"
						href="/Foo/modu/2"
						mappedFrom="/Foo/modu/2"
						label="Page 2"
						close={close}
						active
					/>
					<Tab
						key="/Foo/modu/3"
						href="/Foo/modu/3"
						mappedFrom="/Foo/modu/3"
						label="Page 3"
						close={close}
					/>
					<Tab
						key="/Foo/modu/4"
						href="/Foo/modu/4"
						mappedFrom="/Foo/modu/4"
						label="Page 4"
						close={close}
					/>
				</TabBar>
			</MemoryRouter>,
		);
	});

	describe("with close handler", () => {
		it("curries the close handler with module name and href", () => {
			const innerClose = sinon.spy(() => () => {}).named("innerClose");
			const close = sinon.spy(() => innerClose).named("close");
			return expect(
				<MemoryRouter>
					<FullBar
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
							},
						]}
						close={close}
						moduleName="modu"
						moduleHref="/Foo/modu"
					/>
				</MemoryRouter>,
				"when mounted",
				"with event",
				{
					type: "click",
					target: getClassSelector(<CloseIcon />),
				},
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
