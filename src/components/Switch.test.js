import React from "react";
import { Provider } from "react-redux";
import { IntlProvider } from "react-intl";
import FullSwitch, {
	Switch,
	Wrapper,
	ContainedCheckbox,
	Caption,
} from "./Switch";

describe("Switch", () => {
	it("renders a switch in the on position", () =>
		expect(
			<Switch value={true} onChange={() => {}} />,
			"when mounted",
			"to satisfy",
			<Wrapper value={true}>
				<ContainedCheckbox checked={true} onChange={() => {}} />
			</Wrapper>,
		));

	it("renders a switch in the off position", () =>
		expect(
			<Switch value={false} onChange={() => {}} />,
			"when mounted",
			"to satisfy",
			<Wrapper value={false}>
				<ContainedCheckbox checked={false} onChange={() => {}} />
			</Wrapper>,
		));

	it("renders captions on the switch", () =>
		expect(
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<IntlProvider locale="en">
					<Switch
						value={true}
						onChange={() => {}}
						onCaption={{ id: "foo", defaultMessage: "Foo!" }}
						offCaption={{ id: "bar", defaultMessage: "Bar!" }}
					/>
				</IntlProvider>
			</Provider>,
			"when mounted",
			"to satisfy",
			<Wrapper value={true}>
				<ContainedCheckbox checked onChange={() => {}} />
				<Caption value={true}>Foo!</Caption>
				<Caption value={false}>Bar!</Caption>
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
				<FullSwitch onChange={() => {}} value={true} id="fixedID" />,
				"when mounted",
				"queried for first",
				"input",
				"to have attributes",
				{ id: "fixedID" },
			));

		it("sets an id if none given", () =>
			expect(
				<FullSwitch onChange={() => {}} value={true} />,
				"when mounted",
				"queried for first",
				"input",
				"to have attributes",
				{ id: expect.it("to match", /^switch\d+$/) },
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
