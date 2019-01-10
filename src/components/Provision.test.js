import React from "react";
import Immutable from "immutable";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router/immutable";
import { ThemeProvider } from "styled-components";
import { toClass } from "recompose";
import { history } from "../buildStore";
import DevPages from "./DevPages";
import Head from "./Head";
import I18n from "./I18n";
import Provision from "./Provision";

const fakeStore = {
	subscribe: listener => () => {},
	dispatch: action => action,
	getState: () => Immutable.Map(),
	replaceReducer: () => {},
};

const fakeTheme = { value: "styles" };

const TestComp = toClass(() => <div />);

describe("Provision", () => {
	it("renders", () =>
		expect(
			<Provision store={fakeStore} theme={fakeTheme}>
				<TestComp />
			</Provision>,
			"to render as",
			<Provider store={fakeStore}>
				<ConnectedRouter history={history}>
					<React.Fragment>
						<Head />
						<ThemeProvider theme={expect.it("to be", fakeTheme)}>
							<DevPages>
								<I18n>
									<TestComp />
								</I18n>
							</DevPages>
						</ThemeProvider>
					</React.Fragment>
				</ConnectedRouter>
			</Provider>,
		));

	it("handles getting no theme", () =>
		expect(
			<Provision store={fakeStore}>
				<TestComp />
			</Provision>,
			"to render as",
			<Provider store={fakeStore}>
				<ConnectedRouter history={history}>
					<React.Fragment>
						<Head />
						<ThemeProvider theme={{}}>
							<DevPages>
								<I18n>
									<TestComp />
								</I18n>
							</DevPages>
						</ThemeProvider>
					</React.Fragment>
				</ConnectedRouter>
			</Provider>,
		));

	it("fails if no children given", () =>
		expect(
			() =>
				expect(
					<Provision store={fakeStore} theme={fakeTheme} />,
					"when rendered",
				),
			"to throw",
			"React.Children.only expected to receive a single React element child.",
		));
});
