import React from "react";
import { Router, MemoryRouter } from "react-router-dom";
import sinon from "sinon";
import { createMemoryHistory } from "history";
import { Ignore } from "unexpected-reaction";
import { getClassName } from "../../utils/testUtils";
import Text from "../Text";
import FullTab, {
	Tab,
	PageTab,
	ModuleTab,
	TabLink,
	ModuleIcon,
	TabText,
	CloseIcon,
} from "./Tab";

describe("Tab", () => {
	let history;
	beforeEach(() => {
		history = createMemoryHistory();
	});

	it("renders a module tab with icon and label", () =>
		expect(
			<Router history={history}>
				<Tab module icon="test" label="A module" href="/Foo/modu" />
			</Router>,
			"when mounted",
			"with event",
			{
				type: "click",
				target:
					"." +
					getClassName(
						<MemoryRouter>
							<TabLink to="/" />
						</MemoryRouter>,
					),
			},
			"to satisfy",
			<Router history={history}>
				<ModuleTab>
					<TabLink to="/Foo/modu">
						<ModuleIcon id="test" />
						<TabText>
							<Text message="A module" />
						</TabText>
					</TabLink>
				</ModuleTab>
			</Router>,
		));

	it("renders an active module tab", () =>
		expect(
			<Router history={history}>
				<Tab
					module
					active
					icon="test"
					label={{ id: "test.module", defaultMessage: "A module" }}
					href="/Foo/modu"
				/>
			</Router>,
			"when mounted",
			"to satisfy",
			<Router history={history}>
				<ModuleTab active>
					<TabLink to="/Foo/modu">
						<ModuleIcon id="test" />
						<TabText>
							<Text
								message={{ id: "test.module", defaultMessage: "A module" }}
							/>
						</TabText>
					</TabLink>
				</ModuleTab>
			</Router>,
		));

	it("renders a tab outside the current scope", () =>
		expect(
			<Router history={history}>
				<Tab
					module
					outsideScope
					icon="test"
					label={{ id: "test.module", defaultMessage: "A module" }}
					href="/Foo/modu"
				/>
			</Router>,
			"when mounted",
			"with event",
			{
				type: "click",
				target:
					"." +
					getClassName(
						<MemoryRouter>
							<TabLink to="/" />
						</MemoryRouter>,
					),
			},
			"to satisfy",
			<Router history={history}>
				<ModuleTab outsideScope>
					<TabLink outsideScope to="/Foo/modu">
						<ModuleIcon id="test" />
						<TabText>
							<span>A module</span>
						</TabText>
					</TabLink>
				</ModuleTab>
			</Router>,
		));

	it("renders a page tab with label and close button", () => {
		const close = () => {};
		return expect(
			<Router history={history}>
				<Tab
					label={{ id: "test.page", defaultMessage: "A page" }}
					href="/Foo/modu/page"
					close={close}
				/>
			</Router>,
			"when mounted",
			"to satisfy",
			<Router history={history}>
				<PageTab>
					<TabLink to="/Foo/modu/page">
						<TabText>
							<Text message={{ id: "test.page", defaultMessage: "A page" }} />
						</TabText>
						<CloseIcon onClick={close} />
					</TabLink>
				</PageTab>
			</Router>,
		);
	});

	it("renders an active page tab", () => {
		const close = () => {};
		return expect(
			<Router history={history}>
				<Tab active href="/Foo/modu/page" close={close} />
			</Router>,
			"when mounted",
			"to satisfy",
			<Router history={history}>
				<PageTab active>
					<TabLink to="/Foo/modu/page">
						<TabText>
							<Ignore />
						</TabText>
						<CloseIcon onClick={close} />
					</TabLink>
				</PageTab>
			</Router>,
		);
	});

	describe("with close handler", () => {
		it("curries close handler with tab and mapped href", () => {
			const innerClose = sinon.spy().named("innerClose");
			const close = sinon.spy(() => innerClose).named("close");
			return expect(
				<Router history={history}>
					<FullTab
						label="A page"
						href="/Foo/modu/page/sub"
						mappedFrom="/Foo/modu/page"
						close={close}
					/>
				</Router>,
				"when mounted",
				"with event",
				{
					type: "click",
					target: "." + getClassName(<CloseIcon />),
				},
			)
				.then(() =>
					expect(close, "to have calls satisfying", [
						{ args: ["/Foo/modu/page/sub", "/Foo/modu/page"] },
					]),
				)
				.then(() => expect(innerClose, "was called"));
		});
	});
});
