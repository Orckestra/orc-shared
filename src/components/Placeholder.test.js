import React from "react";
import Text from "./Text";
import Placeholder, {
	PlaceholderBox,
	PlaceholderIcon,
	PlaceholderTitle,
	PlaceholderSubtitle,
} from "./Placeholder";

describe("Placeholder", () => {
	it("renders a placeholder with icon, title, and subtitle", () =>
		expect(
			<Placeholder icon="testIcon" title="A title" subtitle="A subtitle" />,
			"to exactly render as",
			<PlaceholderBox>
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
		expect(<Placeholder />, "to exactly render as", <PlaceholderBox />).then(
			() => expect(console.error, "was not called"),
		));

	it("renders an animated icon", () =>
		expect(
			<Placeholder icon="testIcon" animate />,
			"to exactly render as",
			<PlaceholderBox>
				<PlaceholderIcon id="testIcon" animate />
			</PlaceholderBox>,
		).then(() => expect(console.error, "was not called")));

	it("translates title and subtitle if given message descriptors", () =>
		expect(
			<Placeholder
				title={{ id: "test.title", defaultMessage: "A title" }}
				subtitle={{ id: "test.subtitle", defaultMessage: "A subtitle" }}
			/>,
			"to exactly render as",
			<PlaceholderBox>
				<PlaceholderTitle>
					<Text message={{ id: "test.title", defaultMessage: "A title" }} />
				</PlaceholderTitle>
				<PlaceholderSubtitle>
					<Text
						message={{ id: "test.subtitle", defaultMessage: "A subtitle" }}
					/>
				</PlaceholderSubtitle>
			</PlaceholderBox>,
		).then(() => expect(console.error, "was not called")));

	it("renders a warning placeholder", () =>
		expect(
			<Placeholder icon="testIcon" warn />,
			"to exactly render as",
			<PlaceholderBox warn>
				<PlaceholderIcon id="testIcon" />
			</PlaceholderBox>,
		).then(() => expect(console.error, "was not called")));
});

describe("PlaceholderIcon", () => {
	it("renders with animation", () =>
		expect(
			<PlaceholderIcon animate />,
			"to render style rules",
			"to contain",
			"animation: ",
		));

	it("renders without animation", () =>
		expect(
			<PlaceholderIcon />,
			"to render style rules",
			"not to contain",
			"animation: ",
		));
});
