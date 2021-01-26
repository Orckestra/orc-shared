import React from "react";
import Immutable from "immutable";
import { Provider } from "react-redux";
import { IntlProvider } from "react-intl";
import sinon from "sinon";
import bgImage from "../../content/aboutBackground.png";
import logoImage from "../../content/aboutLogo.png";
import close from "../../content/close.png";
import { ABOUT_NAME, AboutBox, AboutParagraph, AboutLink, About, getClickOutsideHandler, CloseButton } from "./About";
import { setStateField } from "../../actions/view";
import { extractMessages } from "./../../utils/testUtils";
import sharedMessages from "./../../sharedMessages";
import { stringifyWithoutQuotes } from "./../../utils/parseHelper";

const messages = extractMessages(sharedMessages);
describe("About", () => {
	let state, store;
	const ccVersion = "5.1.9.5";

	beforeEach(() => {
		state = Immutable.fromJS({
			view: { [ABOUT_NAME]: { show: true } },
			versionInfo: { version: ccVersion },
			locale: {
				locale: "en-US",
				supportedLocales: [
					{ language: "English", cultureIso: "en-US" },
					{ language: "Francais", cultureIso: "fr" },
				],
			},
		});
		store = {
			subscribe: () => {},
			getState: () => state,
			dispatch: sinon.spy().named("dispatch"),
		};
	});

	it("renders an about box with messages and background images", () => {
		const orcSharedVersion = "2.9.0";
		const orcScriptsVersion = "1.2.3";
		const orcSecretVersion = "5.1.7";

		global.DEPENDENCIES = {
			"orc-scripts": orcScriptsVersion,
			"orc-secret": orcSecretVersion,
			"orc-shared": orcSharedVersion,
		};
		global.BUILD_NUMBER = "2.3.2";
		expect(
			<Provider store={store}>
				<IntlProvider locale="en-US" messages={messages}>
					<About viewState={{ show: true }} currentApplication={{ displayName: "An application" }} />
				</IntlProvider>
			</Provider>,
			"when mounted",
			"to satisfy",
			<IntlProvider locale="en-US" messages={messages}>
				<AboutBox in>
					<CloseButton>
						<img src={close} alt="X" />
					</CloseButton>
					<img src={logoImage} alt="Orckestra" />
					<AboutParagraph>
						{stringifyWithoutQuotes(messages["orc-shared.ccVersion"]).replace("{version}", ccVersion)}
						<br />
						An application 2.3.2
						<br />
						{stringifyWithoutQuotes(messages["orc-shared.orcSharedVersion"]).replace("{version}", orcSharedVersion)}
						<br />
						{stringifyWithoutQuotes(messages["orc-shared.orcScriptsVersion"]).replace("{version}", orcScriptsVersion)}
						<br />
						{stringifyWithoutQuotes(messages["orc-shared.orcSecretVersion"]).replace("{version}", orcSecretVersion)}
					</AboutParagraph>
					<AboutParagraph long>{stringifyWithoutQuotes(messages["orc-shared.copyrightTermsNotice"])}</AboutParagraph>
					<AboutParagraph>
						<AboutLink href="https://www.orckestra.com">
							{stringifyWithoutQuotes(messages["orc-shared.ccName"])}
						</AboutLink>
					</AboutParagraph>
					<AboutParagraph>
						{stringifyWithoutQuotes(messages["orc-shared.copyright"])}
						<br />
						{stringifyWithoutQuotes(messages["orc-shared.allRightsReserved"])}
					</AboutParagraph>
				</AboutBox>
			</IntlProvider>,
		);
	});

	it("view state handler update show value when clicking on close button", () =>
		expect(
			<Provider store={store}>
				<IntlProvider locale="en-US" messages={messages}>
					<About viewState={{ show: true }} />
				</IntlProvider>
			</Provider>,
			"when mounted",
			"with event",
			{ type: "click", target: '[alt="X"]' },
		).then(() =>
			expect(store.dispatch, "to have calls satisfying", [{ args: [setStateField(ABOUT_NAME, "show", false)] }]),
		));

	it("renders an about box with messages and background images but without versions", () => {
		global.DEPENDENCIES = {};
		global.BUILD_NUMBER = null;
		expect(
			<Provider store={store}>
				<IntlProvider locale="en-US" messages={messages}>
					<About viewState={{ show: true }} />
				</IntlProvider>
			</Provider>,
			"when mounted",
			"to satisfy",

			<IntlProvider locale="en-US" messages={messages}>
				<AboutBox in>
					<CloseButton>
						<img src={close} alt="X" />
					</CloseButton>
					<img src={logoImage} alt="Orckestra" />
					<AboutParagraph>
						{stringifyWithoutQuotes(messages["orc-shared.ccVersion"]).replace("{version}", ccVersion)}
					</AboutParagraph>
					<AboutParagraph long>{stringifyWithoutQuotes(messages["orc-shared.copyrightTermsNotice"])}</AboutParagraph>
					<AboutParagraph>
						<AboutLink href="https://www.orckestra.com">
							{stringifyWithoutQuotes(messages["orc-shared.ccName"])}
						</AboutLink>
					</AboutParagraph>
					<AboutParagraph>
						{stringifyWithoutQuotes(messages["orc-shared.copyright"])}
						<br />
						{stringifyWithoutQuotes(messages["orc-shared.allRightsReserved"])}
					</AboutParagraph>
				</AboutBox>
			</IntlProvider>,
		);
	});

	it("renders an about box with about ling to the french version of the web site.", () => {
		state = state.setIn(["locale", "locale"], "FR-FR");
		expect(
			<Provider store={store}>
				<IntlProvider locale="en-US" messages={messages}>
					<About viewState={{ show: true }} />
				</IntlProvider>
			</Provider>,
			"when mounted",
			"to satisfy",
			<IntlProvider locale="en-US" messages={messages}>
				<AboutBox in>
					<CloseButton>
						<img src={close} alt="X" />
					</CloseButton>
					<img src={logoImage} alt="Orckestra" />
					<AboutParagraph>
						{stringifyWithoutQuotes(messages["orc-shared.ccVersion"]).replace("{version}", ccVersion)}
					</AboutParagraph>
					<AboutParagraph long>{stringifyWithoutQuotes(messages["orc-shared.copyrightTermsNotice"])}</AboutParagraph>
					<AboutParagraph>
						<AboutLink href="https://www.orckestra.com/fr">
							{stringifyWithoutQuotes(messages["orc-shared.ccName"])}
						</AboutLink>
					</AboutParagraph>
					<AboutParagraph>
						{stringifyWithoutQuotes(messages["orc-shared.copyright"])}
						<br />
						{stringifyWithoutQuotes(messages["orc-shared.allRightsReserved"])}
					</AboutParagraph>
				</AboutBox>
			</IntlProvider>,
		);
	});

	describe("AboutBox", () => {
		it("has a background image", () =>
			expect(<AboutBox in />, "when mounted", "to have style rules satisfying", "to contain", bgImage));

		it("renders an opacity-transitioning box", () =>
			expect(
				<AboutBox in />,
				"when mounted",
				"to have style rules satisfying",
				"to contain",
				"transition: opacity 800ms ease-out;",
			));
	});

	describe("getClickOutsideHandler", () => {
		let update, mockEvent;
		beforeEach(() => {
			update = sinon.spy().named("update");
			mockEvent = {
				stopPropagation: sinon.spy().named("event.stopPropagation"),
			};
		});

		it("does not stop events or update state when closed", () =>
			expect(getClickOutsideHandler, "called with", [{ show: false }, update], "called with", [mockEvent]).then(() => {
				expect(update, "was not called");
				expect(mockEvent.stopPropagation, "was not called");
			}));

		it("does stop events and close popup when open", () =>
			expect(getClickOutsideHandler, "called with", [{ show: true }, update], "called with", [mockEvent]).then(() => {
				expect(update, "to have calls satisfying", [{ args: ["show", false] }]);
				expect(mockEvent.stopPropagation, "was called");
			}));
	});
});
