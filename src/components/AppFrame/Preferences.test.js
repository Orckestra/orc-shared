import React from "react";
import Immutable from "immutable";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { RSAA } from "redux-api-middleware";
import sinon from "sinon";
import { CHANGE_LOCALE } from "../../actions/locale";
import {
	SET_DEFAULT_LANGUAGE_REQUEST,
	SET_DEFAULT_LANGUAGE_SUCCESS,
	SET_DEFAULT_LANGUAGE_FAILURE,
} from "../../actions/locale";
import {
	SET_MY_APPLICATION_REQUEST,
	SET_MY_APPLICATION_SUCCESS,
	SET_MY_APPLICATION_FAILURE,
} from "../../actions/applications";
import Text from "../Text";
import FieldElements from "../Form/FieldElements";
import {
	PrefPanel,
	Header,
	PrefForm,
	Footer,
	PrefButton,
	getUpdater,
	Preferences,
	withPreferences,
} from "./Preferences";

jest.mock("../../utils/buildUrl", () => {
	const modExport = {};
	modExport.loadConfig = () => Promise.resolve({});
	modExport.buildUrl = (path = [], params = "") =>
		"URL: " + path.join("/") + " " + JSON.stringify(params);
	return modExport;
});

describe("Preferences", () => {
	let messages, language, applications, clear, save;
	beforeEach(() => {
		messages = {
			preferences: "Preferences",
			save: "Save",
			cancel: "Cancel",
			language: "Display language",
			defaultApp: "Default application",
		};
		language = {
			options: [
				{ value: "en", label: "English" },
				{ value: "fr", label: "French" },
			],
			current: "en",
		};
		applications = {
			options: [
				{ value: 2, label: "Marketing" },
				{ value: 3, label: "Order management" },
			],
			current: 3,
		};
		clear = () => {};
		save = sinon.spy().named("save");
	});

	it("renders a form dialog", () =>
		expect(
			<Preferences
				viewState={{ show: true }}
				messages={messages}
				language={language}
				applications={applications}
				clear={clear}
				save={save}
			/>,
			"to render as",
			<PrefPanel in>
				<Header>
					<Text message="Preferences" />
				</Header>
				<PrefForm>
					<FieldElements
						fields={[
							{
								label: "Display language",
								type: "Selector",
								name: "language",
								options: [
									{ value: "en", label: "English" },
									{ value: "fr", label: "French" },
								],
							},
							{
								label: "Default application",
								type: "Selector",
								name: "application",
								options: [
									{ value: 2, label: "Marketing" },
									{ value: 3, label: "Order management" },
								],
							},
						]}
						getUpdater={expect.it("to be a function")}
						values={{
							language: "en",
							application: 3,
						}}
					/>
				</PrefForm>
				<Footer>
					<PrefButton onClick={clear}>
						<Text message="Cancel" />
					</PrefButton>
					<PrefButton
						primary
						onClick={expect.it("when called", "to be undefined")}
					>
						<Text message="Save" />
					</PrefButton>
				</Footer>
			</PrefPanel>,
		));

	it("shows view state fields", () =>
		expect(
			<Preferences
				viewState={{ show: true, language: "fr", application: 2 }}
				messages={messages}
				language={language}
				applications={applications}
				clear={clear}
				save={save}
			/>,
			"to render as",
			<PrefPanel in>
				<Header />
				<PrefForm>
					<FieldElements
						values={{
							language: "fr",
							application: 2,
						}}
					/>
				</PrefForm>
				<Footer />
			</PrefPanel>,
		));

	it("handles missing current values", () => {
		delete language.current;
		delete applications.current;
		expect(
			<Preferences
				viewState={{ show: true }}
				messages={messages}
				language={language}
				applications={applications}
				clear={clear}
				save={save}
			/>,
			"to render as",
			<PrefPanel in>
				<Header />
				<PrefForm>
					<FieldElements
						values={{
							language: "",
							application: "",
						}}
					/>
				</PrefForm>
				<Footer />
			</PrefPanel>,
		);
	});

	describe("getUpdater", () => {
		let update, update2;
		beforeEach(() => {
			update = sinon.spy().named("update");
			update2 = () => {};
		});
		it("returns an update function", () =>
			expect(
				getUpdater,
				"when called with",
				[update],
				"called with",
				["testField"],
				"called with",
				["testValue"],
			).then(() =>
				expect(update, "was called with", "testField", "testValue"),
			));

		it("memoizes on update function and field name", () => {
			const update1_1 = getUpdater(update)("111");
			const update1_2 = getUpdater(update)("222");
			const update2_1 = getUpdater(update2)("111");
			const update2_2 = getUpdater(update2)("222");
			expect(getUpdater, "called with", [update]).then(f =>
				expect(f, "called with", ["111"], "to be", update1_1).and(
					"called with",
					["222"],
					"to be",
					update1_2,
				),
			);
			expect(getUpdater, "called with", [update2]).then(f =>
				expect(f, "called with", ["111"], "to be", update2_1).and(
					"called with",
					["222"],
					"to be",
					update2_2,
				),
			);
		});
	});

	describe("withPreferences", () => {
		let state, store;
		beforeEach(() => {
			state = Immutable.fromJS({
				locale: {
					locale: "fr-CA",
					supportedLocales: ["en-US", "en-CA", "fr-FR", "fr-CA"],
					cultures: {
						"en-US": {
							cultureIso: "en-US",
							cultureName: "English - United States",
							sortOrder: 0,
							isDefault: false,
						},
						"en-CA": {
							cultureIso: "en-CA",
							cultureName: "English - Canada",
							sortOrder: 0,
							isDefault: false,
						},
						"fr-FR": {
							cultureIso: "fr-FR",
							cultureName: "French - France",
							sortOrder: 0,
							isDefault: true,
						},
						"fr-CA": {
							cultureIso: "fr-CA",
							cultureName: "French - Canada",
							sortOrder: 0,
							isDefault: false,
						},
					},
					defaultCulture: "fr-FR",
				},
				settings: { defaultApp: 4 },
				applications: {
					list: [
						{
							id: 3,
							name: "Orders",
							isVisible: true,
							isAbsoluteUrl: true,
							url: "https://orc-env18-oco.develop.orckestra.cloud/oms",
							iconUri:
								"https://orc-env18-oco.develop.orckestra.cloud/oms/icon.png",
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
							iconUri:
								"https://orc-env18-oco.develop.orckestra.cloud/pim/icon.png",
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
							url:
								"https://orc-env18-oco.develop.orckestra.cloud/marketing-legacy",
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
			store = {
				subscribe: () => {},
				getState: () => state,
				dispatch: sinon.spy().named("dispatch"),
			};
		});

		it("provides settings information to the wrapped component", () => {
			const TestComp = () => <div />;
			const EnhComp = withPreferences(TestComp);
			return expect(
				<Provider store={store}>
					<MemoryRouter>
						<EnhComp name="test" />
					</MemoryRouter>
				</Provider>,
				"to deeply render as",
				<TestComp
					language={{
						current: "fr-CA",
						options: [
							{ value: "fr-FR", label: "French - France" },
							{ value: "en-US", label: "English - United States" },
							{ value: "en-CA", label: "English - Canada" },
							{ value: "fr-CA", label: "French - Canada" },
						],
					}}
					applications={{
						current: 4,
						options: [
							{ value: 3, label: "Marketing Legacy" },
							{ value: 4, label: "Informations Produit" },
						],
					}}
					clear={expect.it("called")}
					save={expect
						.it("called with", [{ language: "en-US" }])
						.and("called with", [{ application: 3 }])}
				/>,
			).then(() =>
				expect(store.dispatch, "to have calls satisfying", [
					{
						// Called clear()
						args: [
							expect.it("to equal", {
								type: "VIEW_STATE_SET",
								payload: { name: "__prefsDialog", value: { show: false } },
							}),
						],
					},
					{
						// Called save() with language
						args: [
							expect.it("to equal", {
								type: CHANGE_LOCALE,
								payload: "en-US",
							}),
						],
					},
					{
						args: [
							expect.it("to satisfy", {
								[RSAA]: {
									types: [
										{
											type: SET_DEFAULT_LANGUAGE_REQUEST,
											meta: { lang: "en-US" },
										},
										{
											type: SET_DEFAULT_LANGUAGE_SUCCESS,
											meta: { lang: "en-US" },
										},
										{
											type: SET_DEFAULT_LANGUAGE_FAILURE,
											meta: { lang: "en-US" },
										},
									],
									endpoint: 'URL: my/culture/en-US ""',
									method: "POST",
									credentials: "include",
									bailout: expect.it("to be a function"),
									headers: {
										Accept: "application/json; charset=utf-8",
										"Content-Type": "application/json",
									},
									options: { redirect: "follow" },
								},
							}),
						],
					},
					{
						args: [
							expect.it("to equal", {
								type: "VIEW_STATE_SET",
								payload: { name: "__prefsDialog", value: { show: false } },
							}),
						],
					},
					{
						// Called save() with application
						args: [
							expect.it("to satisfy", {
								[RSAA]: {
									types: [
										{ type: SET_MY_APPLICATION_REQUEST, meta: { appId: 3 } },
										{ type: SET_MY_APPLICATION_SUCCESS, meta: { appId: 3 } },
										{ type: SET_MY_APPLICATION_FAILURE, meta: { appId: 3 } },
									],
									endpoint: 'URL: my/application/3 ""',
									method: "POST",
									credentials: "include",
									bailout: expect.it("to be a function"),
									headers: {
										Accept: "application/json; charset=utf-8",
										"Content-Type": "application/json",
									},
									options: { redirect: "follow" },
								},
							}),
						],
					},
					{
						args: [
							expect.it("to equal", {
								type: "VIEW_STATE_SET",
								payload: { name: "__prefsDialog", value: { show: false } },
							}),
						],
					},
				]),
			);
		});
	});
});
