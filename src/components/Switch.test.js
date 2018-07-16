import React from "react";
import Text from "./Text";
import FullSwitch, {
	Switch,
	Wrapper,
	ContainedCheckbox,
	OnCaption,
	OffCaption,
} from "./Switch";

describe("Switch", () => {
	it("renders a switch in the on position", () =>
		expect(
			<Switch value={true} />,
			"to render as",
			<Wrapper value={true}>
				<ContainedCheckbox checked={true} />
			</Wrapper>,
		));

	it("renders a switch in the off position", () =>
		expect(
			<Switch value={false} />,
			"to render as",
			<Wrapper value={false}>
				<ContainedCheckbox checked={false} />
			</Wrapper>,
		));

	it("renders captions on the switch", () =>
		expect(
			<Switch
				value={true}
				onCaption={{ id: "foo", defaultMessage: "Foo!" }}
				offCaption={{ id: "foo", defaultMessage: "Foo!" }}
			/>,
			"to render as",
			<Wrapper>
				<ContainedCheckbox />
				<OnCaption>
					<Text message={{ id: "foo", defaultMessage: "Foo!" }} />
				</OnCaption>
				<OffCaption>
					<Text message={{ id: "foo", defaultMessage: "Foo!" }} />
				</OffCaption>
			</Wrapper>,
		));

	it("sets onChange handler on the checkbox", () => {
		const onChange = () => {};
		return expect(
			<Switch onChange={onChange} />,
			"when rendered",
			"to contain",
			<ContainedCheckbox onChange={onChange} />,
		);
	});

	describe("with id handling", () => {
		it("passes through a given id", () =>
			expect(
				<FullSwitch value={true} id="fixedID" />,
				"to render as",
				<Switch value={true} id="fixedID" />,
			));

		it("sets an id if none given", () =>
			expect(
				<FullSwitch value={true} />,
				"to render as",
				<Switch value={true} id={expect.it("to match", /^switch\d+$/)} />,
			));
	});
});

describe("Wrapper", () => {
	it("sets active colors when on", () =>
		expect(<Wrapper value={true} />, "to render style rules").then(styles =>
			expect(styles, "to match", /\scolor: #ffffff;.*::after/).and(
				"to match",
				/\sbackground-color: #ff0000;.*::after/,
			),
		));

	it("sets background color according to theme when on", () =>
		expect(
			<Wrapper value={true} theme={{ appHighlightColor: "#990099" }} />,
			"to render style rules",
			"to match",
			/\sbackground-color: #990099;.*::after/,
		));

	it("sets custom background color when on", () =>
		expect(
			<Wrapper value={true} onColor="#ff00ff" />,
			"to render style rules",
			"to match",
			/\sbackground-color: #ff00ff;.*::after/,
		));

	it("sets inactive colors when off", () =>
		expect(<Wrapper value={false} />, "to render style rules").then(styles =>
			expect(styles, "to match", /\scolor: #333;.*::after/).and(
				"to match",
				/\sbackground-color: #cccccc;.*::after/,
			),
		));

	it("sets custom background color when off", () =>
		expect(
			<Wrapper value={false} offColor="#00cc00" />,
			"to render style rules",
			"to match",
			/\sbackground-color: #00cc00;.*::after/,
		));
});
