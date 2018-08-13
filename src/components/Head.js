import React from "react";
import { connect } from "react-redux";
import Helmet from "react-helmet";
import { currentLocale } from "../selectors/locale";

const Head = ({ locale }) => (
	<Helmet>
		<html lang={locale} />
	</Helmet>
);

const withLocale = connect(state => ({
	locale: currentLocale(state),
}));

export default withLocale(Head);
