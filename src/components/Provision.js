import React from "react";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router/immutable";
import { ThemeProvider } from "styled-components";
import { history } from "../buildStore";
// import { BrowserRouter } from "react-router-dom";
import DevPages from "./DevPages";
import Head from "./Head";
import I18n from "./I18n";

const Provision = ({ store, theme = {}, children }) => (
	<Provider store={store}>
		{/* <BrowserRouter> */}
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
		{/* </BrowserRouter> */}
	</Provider>
);

export default Provision;
