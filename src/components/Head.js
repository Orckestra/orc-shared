import React from "react";
import Helmet from "react-helmet";
import routingConnector from "../hocs/routingConnector";
import { currentLocale } from "../selectors/locale";

const Head = ({ locale }) => (
	<Helmet>
		<html lang={locale} />
	</Helmet>
);

const withLocale = routingConnector(state => ({
	locale: currentLocale(state),
}));

export default withLocale(Head);
