import Immutable from "immutable";
import reducer from "./settings";
import {
	GET_MY_APPLICATION_SUCCESS,
	SET_MY_APPLICATION_SUCCESS,
} from "../actions/applications";

describe("settings", () => {
	it("behaves as a reducer should", () =>
		expect(reducer, "to be a reducer with initial state", {
			defaultApp: 0,
		}));

	it("stores results of getting your personal default application", () => {
		const oldState = Immutable.fromJS({
			defaultApp: 0,
		});
		const action = {
			type: GET_MY_APPLICATION_SUCCESS,
			payload: {
				id: 9,
				name: "HTMLMarketing",
				isVisible: true,
				isAbsoluteUrl: true,
				url: "https://orc-env18-oco.develop.orckestra.cloud/marketing",
				iconUri: "https://orc-env18-oco.develop.orckestra.cloud/marketing/icon.png",
				displayName: {
					"en-CA": "Product Information Beta",
					"en-US": "Product Information Beta",
					"fr-CA": "Informations Produit Bêta",
					"fr-FR": "Informations Produit Bêta",
					"it-IT": "Informazioni sul prodotto Bêta",
				},
			},
		};
		const newState = reducer(oldState, action);
		expect(newState, "not to be", oldState).and("to satisfy", {
			defaultApp: 9,
		});
	});

	it("stores a newly set default application", () => {
		const oldState = Immutable.fromJS({
			defaultApp: 9,
		});
		const action = {
			type: SET_MY_APPLICATION_SUCCESS,
			meta: { appId: 12 },
		};
		const newState = reducer(oldState, action);
		expect(newState, "not to be", oldState).and("to satisfy", {
			defaultApp: 12,
		});
	});
});
