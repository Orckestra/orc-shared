import React from "react";
import Text from "./Text";
import FullSwitch, {
	Switch,
	Wrapper,
	ContainedCheckbox,
	Caption,
} from "./Switch";

describe("Switch", () => {
	it("renders a switch in the on position", () =>
		expect(
			<Switch value={true} />,
			"when mounted",
			"to satisfy",
			<Wrapper value={true}>
				<ContainedCheckbox checked={true} />
			</Wrapper>,
		));

	it("renders a switch in the off position", () =>
		expect(
			<Switch value={false} />,
			"when mounted",
			"to satisfy",
			<Wrapper value={false}>
				<ContainedCheckbox checked={false} />
			</Wrapper>,
		));

	it("renders captions on the switch", () =>
		expect(
			<Switch
				value={true}
				onCaption={{ id: "foo", defaultMessage: "Foo!" }}
				offCaption={{ id: "bar", defaultMessage: "Bar!" }}
			/>,
			"when mounted",
			"to satisfy",
			<Wrapper value={true}>
				<ContainedCheckbox />
				<Caption value={true}>
					<Text message={{ id: "foo", defaultMessage: "Foo!" }} />
				</Caption>
				<Caption value={false}>
					<Text message={{ id: "bar", defaultMessage: "Bar!" }} />
				</Caption>
			</Wrapper>,
		));

	it("sets onChange handler on the checkbox", () => {
		const onChange = () => {};
		return expect(
			<Switch onChange={onChange} />,
			"when mounted",
			"to contain",
			<ContainedCheckbox onChange={onChange} />,
		);
	});

	describe("with id handling", () => {
		it("passes through a given id", () =>
			expect(
				<FullSwitch value={true} id="fixedID" />,
				"when mounted",
				"to satisfy",
				<Switch value={true} id="fixedID" />,
			));

		it("sets an id if none given", () =>
			expect(
				<FullSwitch value={true} />,
				"when mounted",
				"to satisfy",
				<Switch value={true} id={expect.it("to match", /^switch\d+$/)} />,
			));
	});
});

describe("Wrapper", () => {
	it("sets active colors when on", () =>
		expect(
			<Wrapper value={true} />,
			"when mounted",
			"to have style rules satisfying",
			expect
				.it("to match", /\scolor: #ffffff;.*::after/)
				.and("to match", /\sbackground-color: #ff0000;.*::after/),
		));

	it("sets background color according to theme when on", () =>
		expect(
			<Wrapper value={true} theme={{ appHighlightColor: "#990099" }} />,
			"when mounted",
			"to have style rules satisfying",
			"to match",
			/\sbackground-color: #990099;.*::after/,
		));

	it("sets custom background color when on", () =>
		expect(
			<Wrapper value={true} onColor="#ff00ff" />,
			"when mounted",
			"to have style rules satisfying",
			"to match",
			/\sbackground-color: #ff00ff;.*::after/,
		));

	it("sets inactive colors when off", () =>
		expect(
			<Wrapper value={false} />,
			"when mounted",
			"to have style rules satisfying",
			expect
				.it("to match", /\scolor: #333;.*::after/)
				.and("to match", /\sbackground-color: #cccccc;.*::after/),
		));

	it("sets custom background color when off", () =>
		expect(
			<Wrapper value={false} offColor="#00cc00" />,
			"when mounted",
			"to have style rules satisfying",
			"to match",
			/\sbackground-color: #00cc00;.*::after/,
		));
});
