import React from "react";
import Immutable from "immutable";
import Helmet from "react-helmet";
import Head from "./Head";

describe("Head", () => {
	let store;
	beforeEach(() => {
		store = {
			subscribe: () => {},
			dispatch: () => {},
			getState: () =>
				Immutable.fromJS({
					locale: {
						locale: "fr-CA",
					},
				}),
		};
	});

	it("renders a Helmet setting the language on the <html> element", () =>
		expect(
			<Head store={store} />,
			"renders elements",
			"to render as",
			<Helmet>
				<html lang="fr-CA" />
			</Helmet>,
		));
});
