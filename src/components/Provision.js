import React from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import DevPages from "./DevPages";
import Head from "./Head";
import I18n from "./I18n";

const Provision = ({ store, theme = {}, children }) => (
	<Provider store={store}>
		<React.Fragment>
			<Head />
			<ThemeProvider theme={theme}>
				<DevPages>
					<I18n>{React.Children.only(children)}</I18n>
				</DevPages>
			</ThemeProvider>
		</React.Fragment>
	</Provider>
);

export default Provision;
