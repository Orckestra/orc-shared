import React from "react";
import sinon from "sinon";
import Text from "../Text";
import bgImage from "../../content/aboutBackground.png";
import logoImage from "../../content/aboutLogo.png";
import {
	AboutBox,
	AboutParagraph,
	AboutLink,
	About,
	getClickOutsideHandler,
} from "./About";

describe("About", () => {
	let messages;
	beforeEach(() => {
		window.orcVersion = "x.y.z";
		messages = {
			ccName: "Test App",
			ccVersion: { id: "foo", defaultMessage: "Version {version}" },
			copyrightTermsNotice: "Copyright all rights reserved",
			copyright: "Copyright",
			allRightsReserved: "All rights reserved",
		};
	});
	afterEach(() => {
		delete window.orcVersion;
	});

	it("renders an about box with messages and background images", () =>
		expect(
			<About viewState={{ show: true }} messages={messages} />,
			"when mounted",
			"to satisfy",
			<AboutBox in>
				<img src={logoImage} alt="Orckestra" />
				<AboutParagraph>
					<Text
						message={{
							id: "foo",
							defaultMessage: "Version {version}",
							values: { version: "x.y.z" },
						}}
					/>
				</AboutParagraph>
				<AboutParagraph>
					<Text message="Copyright all rights reserved" />
				</AboutParagraph>
				<AboutParagraph>
					<AboutLink href="https://www.orckestra.com/">
						<Text message="Test App" />
					</AboutLink>
				</AboutParagraph>
				<AboutParagraph>
					<Text message="Copyright" />
					<br />
					<Text message="All rights reserved" />
				</AboutParagraph>
			</AboutBox>,
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
				expect(update, "was called with", "show", false);
				expect(mockEvent.stopPropagation, "was called");
			}));
	});
});
