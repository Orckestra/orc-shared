import React from "react";
import sinon from "sinon";
import { FormattedMessage } from "react-intl";
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
				<TabLink href="/Foo/modu">
					<ModuleIcon id="test" />
					<TabText>A module</TabText>
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
				<TabLink href="/Foo/modu">
					<ModuleIcon id="test" />
					<TabText>
						<FormattedMessage id="test.module" defaultMessage="A module" />
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
				<TabLink href="/Foo/modu/page">
					<TabText>
						<FormattedMessage id="test.page" defaultMessage="A page" />
					</TabText>
					<CloseIcon onClick={close} />
				</TabLink>
			</PageTab>,
		);
	});

	it("renders an active page tab", () => {
		const close = () => {};
		return expect(
			<Tab active label="A page" href="/Foo/modu/page" close={close} />,
			"to render as",
			<PageTab active>
				<TabLink href="/Foo/modu/page">
					<TabText>A page</TabText>
					<CloseIcon onClick={close} />
				</TabLink>
			</PageTab>,
		);
	});

	describe("with close handler", () => {
		const innerClose = sinon.spy().named("innerClose");
		const close = sinon.spy(() => innerClose).named("close");
		return expect(
			<FullTab label="A page" href="/Foo/modu/page" close={close} />,
			"to render as",
			<Tab label="A page" href="/Foo/modu/page" close={expect.it("called")} />,
		)
			.then(() =>
				expect(close, "to have calls satisfying", [
					{ args: ["/Foo/modu/page"] },
				]),
			)
			.then(() => expect(innerClose, "was called"));
	});
});
