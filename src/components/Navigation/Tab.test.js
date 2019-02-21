import React from "react";
import sinon from "sinon";
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
	it("renders a module tab with icon and label", () =>
		expect(
			<Tab module icon="test" label="A module" href="/Foo/modu" />,
			"to render as",
			<ModuleTab>
				<TabLink to="/Foo/modu">
					<ModuleIcon id="test" />
					<TabText>
						<Text message="A module" />
					</TabText>
				</TabLink>
			</ModuleTab>,
		));

	it("renders an active module tab", () =>
		expect(
			<Tab
				module
				active
				icon="test"
				label={{ id: "test.module", defaultMessage: "A module" }}
				href="/Foo/modu"
			/>,
			"to render as",
			<ModuleTab active>
				<TabLink to="/Foo/modu">
					<ModuleIcon id="test" />
					<TabText>
						<Text message={{ id: "test.module", defaultMessage: "A module" }} />
					</TabText>
				</TabLink>
			</ModuleTab>,
		));

	it("renders a page tab with label and close button", () => {
		const close = () => {};
		return expect(
			<Tab
				label={{ id: "test.page", defaultMessage: "A page" }}
				href="/Foo/modu/page"
				close={close}
			/>,
			"to render as",
			<PageTab>
				<TabLink to="/Foo/modu/page">
					<TabText>
						<Text message={{ id: "test.page", defaultMessage: "A page" }} />
					</TabText>
					<CloseIcon onClick={close} />
				</TabLink>
			</PageTab>,
		);
	});

	it("renders an active page tab", () => {
		const close = () => {};
		return expect(
			<Tab active href="/Foo/modu/page" close={close} />,
			"to render as",
			<PageTab active>
				<TabLink to="/Foo/modu/page">
					<TabText />
					<CloseIcon onClick={close} />
				</TabLink>
			</PageTab>,
		);
	});

	describe("with close handler", () => {
		const innerClose = sinon.spy().named("innerClose");
		const close = sinon.spy(() => innerClose).named("close");
		return expect(
			<FullTab
				label="A page"
				href="/Foo/modu/page/sub"
				mappedFrom="/Foo/modu/page"
				close={close}
			/>,
			"when rendered",
			"has elements",
		)
			.then(elements => expect(elements.props.close, "called"))
			.then(() =>
				expect(close, "to have calls satisfying", [
					{ args: ["/Foo/modu/page/sub", "/Foo/modu/page"] },
				]),
			)
			.then(() => expect(innerClose, "was called"));
	});
});
