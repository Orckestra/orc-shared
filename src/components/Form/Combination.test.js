import React from "react";
import { Provider } from "react-redux";
import Field from "./Field";
import Combination from "./Combination";

describe("Combination", () => {
	it("renders a combining box around a list of fields", () =>
		expect(
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<Combination label="A combination" proportions={[30, 70]}>
					<div id="child1" />
					<div id="child2" />
				</Combination>
			</Provider>,
			"when mounted",
			"to satisfy",
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<Field label="A combination">
					<div>
						<div id="child1" />
						<div id="child2" />
					</div>
				</Field>
			</Provider>,
		));

	it("handles missing props", () =>
		expect(
			<Combination>
				<div id="child1" />
				<div id="child2" />
			</Combination>,
			"when mounted",
			"to satisfy",
			<Field label={undefined}>
				<div>
					<div id="child1" />
					<div id="child2" />
				</div>
			</Field>,
		));
});
