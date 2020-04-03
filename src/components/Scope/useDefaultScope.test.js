import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import Immutable from "immutable";
import { RSAA } from "redux-api-middleware";
import sinon from "sinon";
import { PropStruct } from "../../utils/testUtils";
import useDefaultScope from "./useDefaultScope";

jest.mock("../../utils/buildUrl", () => {
	const modExport = {};
	modExport.loadConfig = () => Promise.resolve({});
	modExport.buildUrl = () => "URL";
	return modExport;
});

const TestComp = ({ ...props }) => {
	const [defaultScope] = useDefaultScope();
	return <div>{defaultScope}</div>;
};

describe("useDefaultScope", () => {
	let state, store, spy;
	beforeEach(() => {
		state = Immutable.fromJS({
			input: {},
			locale: {
				locale: "en-CA",
				supportedLocales: ["en-US", "en-CA"],
			},
			settings: {
				defaultScope: "ds",
			},
		});
		store = {
			subscribe: () => {},
			dispatch: () => {},
			getState: () => state,
		};
	});

	it("provides scope data props to the enhanced component", () =>
		expect(
			<Provider store={store}>
				<MemoryRouter>
					<TestComp spy={spy} />
				</MemoryRouter>
			</Provider>,
			"when mounted",
			"to satisfy",
			<div>ds</div>,
		));
});
