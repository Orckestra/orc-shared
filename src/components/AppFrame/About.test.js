import React from "react";
import Immutable from "immutable";
import { Provider } from "react-redux";
import { IntlProvider } from "react-intl";
import sinon from "sinon";
import bgImage from "../../content/aboutBackground.png";
import logoImage from "../../content/aboutLogo.png";
import {
	ABOUT_NAME,
	AboutBox,
	AboutParagraph,
	AboutLink,
	About,
	getClickOutsideHandler,
} from "./About";

describe("About", () => {
	let messages, state, store;
	beforeEach(() => {
		window.orcVersion = "x.y.z";
		messages = {
			ccName: "Test App",
			ccVersion: { id: "foo", defaultMessage: "Version {version}" },
			copyrightTermsNotice: "Copyright all rights reserved",
			copyright: "Copyright",
			allRightsReserved: "All rights reserved",
		};
		state = Immutable.fromJS({ view: { [ABOUT_NAME]: { show: true } } });
		store = {
			subscribe: () => {},
			getState: () => state,
			dispatch: sinon.spy().named("dispatch"),
		};
	});
	afterEach(() => {
		delete window.orcVersion;
	});

	it("renders an about box with messages and background images", () =>
		expect(
			<Provider store={store}>
				<IntlProvider locale="en">
					<About viewState={{ show: true }} messages={messages} />
				</IntlProvider>
			</Provider>,
			"when mounted",
			"to satisfy",
			<IntlProvider locale="en">
				<AboutBox in>
					<img src={logoImage} alt="Orckestra" />
					<AboutParagraph>Version x.y.z</AboutParagraph>
					<AboutParagraph long>Copyright all rights reserved</AboutParagraph>
					<AboutParagraph>
						<AboutLink href="https://www.orckestra.com/">Test App</AboutLink>
					</AboutParagraph>
					<AboutParagraph>
						Copyright
						<br />
						All rights reserved
					</AboutParagraph>
				</AboutBox>
			</IntlProvider>,
		));

	describe("AboutBox", () => {
		it("has a background image", () =>
			expect(
				<AboutBox in />,
				"when mounted",
				"to have style rules satisfying",
				"to contain",
				bgImage,
			));

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
			expect(
				getClickOutsideHandler,
				"called with",
				[{ show: false }, update],
				"called with",
				[mockEvent],
			).then(() => {
				expect(update, "was not called");
				expect(mockEvent.stopPropagation, "was not called");
			}));

		it("does stop events and close popup when open", () =>
			expect(
				getClickOutsideHandler,
				"called with",
				[{ show: true }, update],
				"called with",
				[mockEvent],
			).then(() => {
				expect(update, "to have calls satisfying", [{ args: ["show", false] }]);
				expect(mockEvent.stopPropagation, "was called");
			}));
	});
});
