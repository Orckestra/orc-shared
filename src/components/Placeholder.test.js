import React from "react";
import { IntlProvider } from "react-intl";
import { spyOnConsole } from "../utils/testUtils";
import Text from "./Text";
import Placeholder, {
	PlaceholderBox,
	PlaceholderIcon,
	PlaceholderTitle,
	PlaceholderSubtitle,
} from "./Placeholder";

describe("Placeholder", () => {
	spyOnConsole();
	it("renders a placeholder with icon, title, and subtitle", () =>
		expect(
			<Placeholder
				icon="testIcon"
				title="A title"
				subtitle="A subtitle"
				otherProp={true}
			/>,
			"when mounted",
			"to satisfy",
			<PlaceholderBox otherProp={true}>
				<PlaceholderIcon id="testIcon" />
				<PlaceholderTitle>
					<Text message="A title" />
				</PlaceholderTitle>
				<PlaceholderSubtitle>
					<Text message="A subtitle" />
				</PlaceholderSubtitle>
			</PlaceholderBox>,
		).then(() => expect(console.error, "was not called")));

	it("renders an empty placeholder", () =>
		expect(
			<Placeholder />,
			"when mounted",
			"to satisfy",
			<PlaceholderBox />,
		).then(() => expect(console.error, "was not called")));

	it("renders an animated icon", () =>
		expect(
			<Placeholder icon="testIcon" animate />,
			"when mounted",
			"to satisfy",
			<PlaceholderBox>
				<PlaceholderIcon id="testIcon" animate />
			</PlaceholderBox>,
		).then(() => expect(console.error, "was not called")));

	it("translates title and subtitle if given message descriptors", () =>
		expect(
			<IntlProvider
				locale="en"
				messages={{
					"test.title": "The title",
					"test.subtitle": "The subtitle",
				}}
			>
				<Placeholder
					title={{ id: "test.title", defaultMessage: "A default title" }}
					subtitle={{
						id: "test.subtitle",
						defaultMessage: "A default subtitle",
					}}
				/>
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			<PlaceholderBox>
				<PlaceholderTitle>
					<span>The title</span>
				</PlaceholderTitle>
				<PlaceholderSubtitle>
					<span>The subtitle</span>
				</PlaceholderSubtitle>
			</PlaceholderBox>,
		).then(() => expect(console.error, "was not called")));

	it("renders a warning placeholder", () =>
		expect(
			<Placeholder icon="testIcon" warn />,
			"when mounted",
			"to satisfy",
			<PlaceholderBox warn>
				<PlaceholderIcon id="testIcon" />
			</PlaceholderBox>,
		).then(() => expect(console.error, "was not called")));
});

describe("PlaceholderIcon", () => {
	it("renders with animation", () =>
		expect(
			<PlaceholderIcon id="spinner" animate />,
			"when mounted",
			"to have style rules satisfying",
			"to contain",
			"animation: ",
		));

	it("renders without animation", () =>
		expect(
			<PlaceholderIcon id="spinner" />,
			"when mounted",
			"to have style rules satisfying",
			"not to contain",
			"animation: ",
		));
});
