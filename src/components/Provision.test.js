import React from "react";
import Immutable from "immutable";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router/immutable";
import { ThemeProvider, withTheme } from "styled-components";
import { toClass } from "recompose";
import { history } from "../buildStore";
import DevPages from "./DevPages";
import Head from "./Head";
import I18n from "./I18n";
import Provision from "./Provision";
import Relogin from "./Relogin";

const fakeStore = {
	subscribe: listener => () => {},
	dispatch: action => action,
	getState: () => Immutable.fromJS({ locale: {} }),
	replaceReducer: () => {},
};

const fakeTheme = { value: "styles" };

const TestComp = toClass(
	withTheme(({ theme }) => <div>{JSON.stringify(theme)}</div>),
);

describe("Provision", () => {
	it("renders", () =>
		expect(
			<Provision store={fakeStore} theme={fakeTheme}>
				<TestComp />
			</Provision>,
			"when mounted",
			"to satisfy",
			<Provider store={fakeStore}>
				<ConnectedRouter history={history}>
					<React.Fragment>
						<Head />
						<ThemeProvider theme={fakeTheme}>
							<DevPages>
								<I18n>
									<TestComp />
								</I18n>
							</DevPages>
						</ThemeProvider>
					</React.Fragment>
				</ConnectedRouter>
				<Relogin />
			</Provider>,
		));

	it("handles getting no theme", () =>
		expect(
			<Provision store={fakeStore}>
				<TestComp />
			</Provision>,
			"when mounted",
			"to satisfy",
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
					"when mounted",
				),
			"to throw",
			"React.Children.only expected to receive a single React element child.",
		));
});
