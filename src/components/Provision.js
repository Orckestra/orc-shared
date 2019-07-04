import React from "react";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router/immutable";
import { ThemeProvider } from "styled-components";
import { history } from "../buildStore";
import DevPages from "./DevPages";
import Head from "./Head";
import I18n from "./I18n";
import Relogin from "./Relogin";

const Provision = ({ store, theme = {}, children }) => (
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<React.Fragment>
				<Head />
				<ThemeProvider theme={theme}>
					<DevPages>
						<I18n>{React.Children.only(children)}</I18n>
					</DevPages>
				</ThemeProvider>
			</React.Fragment>
		</ConnectedRouter>
		<Relogin />
	</Provider>
);

export default Provision;
