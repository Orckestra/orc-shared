import React from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import DevPages from "./DevPages";
import I18n from "./I18n";

const Provision = ({ store, theme = {}, children }) => (
	<Provider store={store}>
		<ThemeProvider theme={theme}>
			<DevPages>
				<I18n>{React.Children.only(children)}</I18n>
			</DevPages>
		</ThemeProvider>
	</Provider>
);

export default Provision;
