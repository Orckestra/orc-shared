import React from "react";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router/immutable";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import { history } from "../buildStore";
import Authenticate from "./Authenticate";
import DevPages from "./DevPages";
import Head from "./Head";
import I18n from "./I18n";
import InternetExplorerWarningMessage from "./InternetExplorerWarningMessage";
import Culture from "./Culture";
import ScopeExtendedConfigurationLoader from "./ScopeExtendedConfigurationLoader";

const useGlobalStyles = makeStyles({
	"@global": {
		html: {
			height: "100%",
		},

		body: {
			height: "100%",
			margin: 0,
			overflow: "hidden",
			fontFamily: props => props.muiTheme.typography.fontFamily,
		},

		"#app": {
			height: "100%",
		},
	},
});

const Provision = ({ store, muiTheme, children }) => {
	useGlobalStyles({ muiTheme });

	return (
		<Provider store={store}>
			<ConnectedRouter history={history}>
				<MuiThemeProvider theme={muiTheme}>
					<React.Fragment>
						<Head />
						<Authenticate>
							<React.Fragment>
								<DevPages>
									<I18n>
										<Culture />
										{React.Children.only(children)}
										<InternetExplorerWarningMessage />
									</I18n>
								</DevPages>
								<ScopeExtendedConfigurationLoader />
							</React.Fragment>
						</Authenticate>
					</React.Fragment>
				</MuiThemeProvider>
			</ConnectedRouter>
		</Provider>
	);
};

export default Provision;
