import { IntlProvider } from "react-intl";
import routingConnector from "../hocs/routingConnector";
import { currentLocale } from "../selectors/locale";

const mapStateToProps = state => ({
	locale: currentLocale(state),
	key: currentLocale(state), // TODO: Remove this when react-intl suports new React context API
	messages: require("translations/" + currentLocale(state) + ".json"),
});

const withLanguageData = routingConnector(mapStateToProps);

export default withLanguageData(IntlProvider);
