import React from "react";
import Immutable from "immutable";
import { Provider } from "react-redux";
import { IntlProvider } from "react-intl";
import { MemoryRouter } from "react-router-dom";
import { RSAA } from "redux-api-middleware";
import sinon from "sinon";
import { Ignore } from "unexpected-reaction";
import { PropStruct } from "../../utils/testUtils";
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
import withViewState from "../../hocs/withViewState";
import { FieldBox, Label } from "../Form/Field";
import { Wrapper as SelectorWrapper } from "../Selector";
import {
	Header,
	PrefForm,
	Footer,
	PrefButton,
	getUpdater,
	Preferences,
	withPreferences,
	PREFS_NAME,
} from "./Preferences";

jest.mock("../../utils/buildUrl", () => {
	const modExport = {};
	modExport.loadConfig = () => Promise.resolve({});
	modExport.buildUrl = (path = [], params = "") =>
		"URL: " + path.join("/") + " " + JSON.stringify(params);
	return modExport;
});

describe("Preferences", () => {
	let messages, language, applications, clear, save, modalRoot;
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
		modalRoot = document.createElement("div");
		modalRoot.id = "modal";
		document.body.appendChild(modalRoot);
	});
	afterEach(() => {
		document.body.removeChild(modalRoot);
	});

	it("renders a form dialog", () =>
		expect(
			<IntlProvider>
				<Preferences
					viewState={{ show: true }}
					updateViewState={() => {}}
					messages={messages}
					language={language}
					applications={applications}
					clear={clear}
					save={save}
				/>
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			null,
		).then(
			expect(
				modalRoot,
				"to satisfy",
				<div>
					<div>
						<Header>
							<span>Preferences</span>
						</Header>
						<PrefForm>
							<FieldBox>
								<Label id="language_label">
									<span>Display language</span>
								</Label>
								<SelectorWrapper>
									<select id="language">
										<Ignore />
										<Ignore />
									</select>
									<Ignore />
									<Ignore />
								</SelectorWrapper>
							</FieldBox>
							<FieldBox>
								<Label id="application_label">
									<span>Default application</span>
								</Label>
								<SelectorWrapper>
									<select id="application">
										<Ignore />
										<Ignore />
									</select>
									<Ignore />
									<Ignore />
								</SelectorWrapper>
							</FieldBox>
						</PrefForm>
						<Footer>
							<PrefButton onClick={clear}>
								<span>Cancel</span>
							</PrefButton>
							<PrefButton
								primary
								onClick={expect.it("when called", "to be undefined")}
							>
								<span>Save</span>
							</PrefButton>
						</Footer>
					</div>
				</div>,
			),
		));

	it("shows view state fields", () =>
		expect(
			<IntlProvider>
				<Preferences
					viewState={{ show: true, language: "fr", application: 2 }}
					messages={messages}
					language={language}
					applications={applications}
					clear={clear}
					save={save}
				/>
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			null,
		).then(
			expect(
				modalRoot,
				"to satisfy",
				<div>
					<div>
						<Ignore />
						<PrefForm>
							<FieldBox>
								<Label id="language_label">
									<span>Display language</span>
								</Label>
								<SelectorWrapper>
									<select id="language" value="fr">
										<Ignore />
										<Ignore />
									</select>
									<Ignore />
									<Ignore />
								</SelectorWrapper>
							</FieldBox>
							<FieldBox>
								<Label id="application_label">
									<span>Default application</span>
								</Label>
								<SelectorWrapper>
									<select id="application" value={2}>
										<Ignore />
										<Ignore />
									</select>
									<Ignore />
									<Ignore />
								</SelectorWrapper>
							</FieldBox>
						</PrefForm>
						<Ignore />
					</div>
				</div>,
			),
		));

	it("handles missing current values", () => {
		delete language.current;
		delete applications.current;
		expect(
			<IntlProvider>
				<Preferences
					viewState={{ show: true }}
					messages={messages}
					language={language}
					applications={applications}
					clear={clear}
					save={save}
				/>
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			null,
		).then(
			expect(
				modalRoot,
				"to satisfy",
				<div>
					<div>
						<Ignore />
						<PrefForm>
							<FieldBox>
								<Label id="language_label">
									<span>Display language</span>
								</Label>
								<SelectorWrapper>
									<select id="language" value="">
										<Ignore />
										<Ignore />
									</select>
									<Ignore />
									<Ignore />
								</SelectorWrapper>
							</FieldBox>
							<FieldBox>
								<Label id="application_label">
									<span>Default application</span>
								</Label>
								<SelectorWrapper>
									<select id="application" value="">
										<Ignore />
										<Ignore />
									</select>
									<Ignore />
									<Ignore />
								</SelectorWrapper>
							</FieldBox>
						</PrefForm>
						<Ignore />
					</div>
				</div>,
			),
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
				view: {
					PREFS_NAME: {},
				},
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

		const TestComp = ({ language, applications, ...props }) => (
			<div>
				<PropStruct {...{ language, applications }} />
				<button id="clear" onClick={props.clear}></button>
				<button id="save" onClick={() => props.save(props.viewState)}></button>
			</div>
		);

		it("provides settings information to the wrapped component", () => {
			const EnhComp = withPreferences(withViewState(TestComp));
			return expect(
				<Provider store={store}>
					<MemoryRouter>
						<EnhComp />
					</MemoryRouter>
				</Provider>,
				"when mounted",
				"to satisfy",
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
					clear={() => {}}
					save={() => {}}
				/>,
			);
		});

		it("provides a clear handler", () => {
			const EnhComp = withPreferences(withViewState(TestComp));
			return expect(
				<Provider store={store}>
					<MemoryRouter>
						<EnhComp />
					</MemoryRouter>
				</Provider>,
				"when mounted",
				"with event",
				{ type: "click", target: "#clear" },
			).then(() =>
				expect(store.dispatch, "to have calls satisfying", [
					{
						args: [
							expect.it("to equal", {
								type: "VIEW_STATE_SET",
								payload: { name: PREFS_NAME, value: { show: false } },
							}),
						],
					},
				]),
			);
		});

		it("can save language changes", () => {
			state = state.setIn(["view", PREFS_NAME, "language"], "en-US");
			const EnhComp = withPreferences(withViewState(TestComp));
			return expect(
				<Provider store={store}>
					<MemoryRouter>
						<EnhComp />
					</MemoryRouter>
				</Provider>,
				"when mounted",
				"with event",
				{ type: "click", target: "#save" },
			).then(() =>
				expect(store.dispatch, "to have calls satisfying", [
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
								payload: { name: PREFS_NAME, value: { show: false } },
							}),
						],
					},
				]),
			);
		});

		it("can save default application", () => {
			state = state.setIn(["view", PREFS_NAME, "application"], 3);
			const EnhComp = withPreferences(withViewState(TestComp));
			return expect(
				<Provider store={store}>
					<MemoryRouter>
						<EnhComp />
					</MemoryRouter>
				</Provider>,
				"when mounted",
				"with event",
				{ type: "click", target: "#save" },
			).then(() =>
				expect(store.dispatch, "to have calls satisfying", [
					{
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
								payload: { name: PREFS_NAME, value: { show: false } },
							}),
						],
					},
				]),
			);
		});
	});
});
