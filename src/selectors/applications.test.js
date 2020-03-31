import Immutable from "immutable";
import { localizedAppSelector, localizedAppOptionSelector } from "./applications";

let state;
beforeEach(() => {
	state = Immutable.fromJS({
		locale: {
			locale: "fr-FR",
			supportedLocales: ["en-US", "fr-FR"],
		},
		applications: {
			list: [
				{
					id: 3,
					name: "Orders",
					isVisible: true,
					isAbsoluteUrl: true,
					url: "https://orc-env18-oco.develop.orckestra.cloud/oms",
					iconUri: "https://orc-env18-oco.develop.orckestra.cloud/oms/icon.png",
					displayName: {
						"en-CA": "Marketing Legacy",
						"en-US": "Marketing Legacy",
						"fr-CA": "Marketing Legacy",
						"fr-FR": "Marketing Legacy",
						"it-IT": "Marketing Legacy",
					},
				},
				{
					id: 4,
					name: "Products",
					isVisible: true,
					isAbsoluteUrl: true,
					url: "https://orc-env18-oco.develop.orckestra.cloud/pim",
					iconUri: "https://orc-env18-oco.develop.orckestra.cloud/pim/icon.png",
					displayName: {
						"en-CA": "Product Information",
						"en-US": "Product Information",
						"fr-CA": "Informations Produit",
						"fr-FR": "Informations Produit",
						"it-IT": "Informazioni sul prodotto",
					},
				},
				{
					id: 5,
					name: "Marketing",
					isVisible: false,
					isAbsoluteUrl: true,
					url: "https://orc-env18-oco.develop.orckestra.cloud/marketing-legacy",
					iconUri:
						"https://orc-env18-oco.develop.orckestra.cloud/marketing-legacy/icon.png",
					displayName: {
						"en-CA": "Security",
						"en-US": "Security",
						"fr-CA": "Sécurité",
						"fr-FR": "Sécurité",
						"it-IT": "Sicurezza",
					},
				},
			],
		},
	});
});

describe("localizedAppSelector", () => {
	it("gets the list of visible applications, localized to the current language", () =>
		expect(
			localizedAppSelector,
			"called with",
			[state],
			"to equal",
			Immutable.fromJS([
				{
					id: 3,
					name: "Orders",
					isVisible: true,
					isAbsoluteUrl: true,
					url: "https://orc-env18-oco.develop.orckestra.cloud/oms",
					iconUri: "https://orc-env18-oco.develop.orckestra.cloud/oms/icon.png",
					displayName: "Marketing Legacy",
				},
				{
					id: 4,
					name: "Products",
					isVisible: true,
					isAbsoluteUrl: true,
					url: "https://orc-env18-oco.develop.orckestra.cloud/pim",
					iconUri: "https://orc-env18-oco.develop.orckestra.cloud/pim/icon.png",
					displayName: "Informations Produit",
				},
			]),
		));
});

describe("localizedAppOptionSelector", () => {
	it("gets the list of visible localized applications as an option list for selectors", () =>
		expect(localizedAppOptionSelector, "called with", [state], "to equal", [
			{
				value: 3,
				label: "Marketing Legacy",
			},
			{
				value: 4,
				label: "Informations Produit",
			},
		]));
});
