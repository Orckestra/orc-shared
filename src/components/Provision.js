import React from "react";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router/immutable";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { getThemeProp } from "../utils";
import { history } from "../buildStore";
import Authenticate from "./Authenticate";
import DevPages from "./DevPages";
import Head from "./Head";
import I18n from "./I18n";
import InternetExplorerWarningMessage from "./InternetExplorerWarningMessage";
import Culture from "./Culture";
import ScopeExtendedConfigurationLoader from "./ScopeExtendedConfigurationLoader";

const GlobalStyle = createGlobalStyle`
	html {
		height: 100%;
	}

	body {
		height: 100%;
		margin: 0;
		overflow: hidden;
	}

	#app {
		height: 100%;
	}
`;

const Fonts = createGlobalStyle`
	body {
		font-family: ${getThemeProp(["fonts", "base"], "sans-serif")};
	}
`;

const Provision = ({ store, theme = {}, muiTheme, children }) => {
	return (
		<Provider store={store}>
			<ConnectedRouter history={history}>
				<ThemeProvider theme={theme}>
					<MuiThemeProvider theme={muiTheme}>
						<React.Fragment>
							<Head />
							<Culture />
							<GlobalStyle />
							<Authenticate>
								<React.Fragment>
									<Fonts />
									<DevPages>
										<I18n>
											{React.Children.only(children)}
											<InternetExplorerWarningMessage />
										</I18n>
									</DevPages>
									<ScopeExtendedConfigurationLoader />
								</React.Fragment>
							</Authenticate>
						</React.Fragment>
					</MuiThemeProvider>
				</ThemeProvider>
			</ConnectedRouter>
		</Provider>
	);
};

export default Provision;
