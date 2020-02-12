import React from "react";
import Immutable from "immutable";
import { Provider } from "react-redux";
import { IntlProvider } from "react-intl";
import { RSAA } from "redux-api-middleware";
import sinon from "sinon";
import { Ignore } from "unexpected-reaction";
import { getClassName } from "../../utils/testUtils";
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
import { setValue } from "../../actions/view";
import { FieldBox, Label } from "../Form/Field";
import { Wrapper as SelectorWrapper } from "../Selector";
import Preferences, {
	Header,
	PrefForm,
	Footer,
	PrefButton,
	createGetUpdater,
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
	let messages, modalRoot, state, store;
	beforeEach(() => {
		messages = {
			preferences: "Preferences",
			save: "Save",
			cancel: "Cancel",
			language: "Display language",
			defaultApp: "Default application",
		};
		state = Immutable.fromJS({
			view: { [PREFS_NAME]: { show: true } },
			locale: {
				locale: "en-US",
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
		modalRoot = document.createElement("div");
		modalRoot.id = "modal";
		document.body.appendChild(modalRoot);
	});
	afterEach(() => {
		document.body.removeChild(modalRoot);
	});

	it("renders a form dialog", () => {
		return expect(
			<Provider store={store}>
				<IntlProvider locale="en-US">
					<Preferences messages={messages} />
				</IntlProvider>
			</Provider>,
			"when mounted",
			"to satisfy",
			null,
		)
			.then(
				expect(
					modalRoot,
					"with event",
					{
						type: "click",
						target: "." + getClassName(<PrefButton />) + ":last-child",
					},
					"to satisfy",
					<div>
						<div>
							<Header>Preferences</Header>
							<PrefForm>
								<FieldBox>
									<Label id="language_label">Display language</Label>
									<SelectorWrapper>
										<select id="language" value="en-US" onChange={() => {}}>
											<option>French - France</option>
											<option>English - United States</option>
											<option>English - Canada</option>
											<option>French - Canada</option>
										</select>
										<Ignore />
										<Ignore />
									</SelectorWrapper>
								</FieldBox>
								<FieldBox>
									<Label id="application_label">Default application</Label>
									<SelectorWrapper>
										<select id="application" value={4} onChange={() => {}}>
											<option>Marketing Legacy</option>
											<option>Product Information</option>
										</select>
										<Ignore />
										<Ignore />
									</SelectorWrapper>
								</FieldBox>
							</PrefForm>
							<Footer>
								<PrefButton id="cancelPrefs">Cancel</PrefButton>
								<PrefButton id="savePrefs" primary>
									Save
								</PrefButton>
							</Footer>
						</div>
					</div>,
				),
			)
			.then(() =>
				expect(store.dispatch, "to have calls satisfying", [
					{
						args: [setValue(PREFS_NAME, { show: false })],
					},
				]),
			);
	});

	it("shows view state fields, saves language change", () => {
		state = state.setIn(
			["view", PREFS_NAME],
			Immutable.fromJS({ show: true, language: "fr-CA" }),
		);
		return expect(
			<Provider store={store}>
				<IntlProvider locale="en">
					<Preferences messages={messages} />
				</IntlProvider>
			</Provider>,
			"when mounted",
			"to satisfy",
			null,
		)
			.then(
				expect(
					modalRoot,
					"with event",
					{
						type: "click",
						target: "." + getClassName(<PrefButton />) + ":last-child",
					},
					"to satisfy",
					<div>
						<div>
							<Ignore />
							<PrefForm>
								<FieldBox>
									<Label id="language_label">Display language</Label>
									<SelectorWrapper>
										<select id="language" value="fr-CA" onChange={() => {}}>
											<option>French - France</option>
											<option>English - United States</option>
											<option>English - Canada</option>
											<option>French - Canada</option>
										</select>
										<Ignore />
										<Ignore />
									</SelectorWrapper>
								</FieldBox>
								<FieldBox>
									<Label id="application_label">Default application</Label>
									<SelectorWrapper>
										<select id="application" value={4} onChange={() => {}}>
											<option>Marketing Legacy</option>
											<option>Product Information</option>
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
			)
			.then(() =>
				expect(store.dispatch, "to have calls satisfying", [
					{
						// Called save() with language
						args: [
							expect.it("to equal", {
								type: CHANGE_LOCALE,
								payload: "fr-CA",
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
											meta: { lang: "fr-CA" },
										},
										{
											type: SET_DEFAULT_LANGUAGE_SUCCESS,
											meta: { lang: "fr-CA" },
										},
										{
											type: SET_DEFAULT_LANGUAGE_FAILURE,
											meta: { lang: "fr-CA" },
										},
									],
									endpoint: 'URL: my/culture/fr-CA ""',
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

	it("shows view state fields, saves application change", () => {
		state = state.setIn(
			["view", PREFS_NAME],
			Immutable.fromJS({ show: true, application: 3 }),
		);
		return expect(
			<Provider store={store}>
				<IntlProvider locale="en">
					<Preferences messages={messages} />
				</IntlProvider>
			</Provider>,
			"when mounted",
			"to satisfy",
			null,
		)
			.then(
				expect(
					modalRoot,
					"with event",
					{
						type: "click",
						target: "." + getClassName(<PrefButton />) + ":last-child",
					},
					"to satisfy",
					<div>
						<div>
							<Ignore />
							<PrefForm>
								<FieldBox>
									<Label id="language_label">Display language</Label>
									<SelectorWrapper>
										<select id="language" value="en-US" onChange={() => {}}>
											<option>French - France</option>
											<option>English - United States</option>
											<option>English - Canada</option>
											<option>French - Canada</option>
										</select>
										<Ignore />
										<Ignore />
									</SelectorWrapper>
								</FieldBox>
								<FieldBox>
									<Label id="application_label">Default application</Label>
									<SelectorWrapper>
										<select id="application" value={3} onChange={() => {}}>
											<option>Marketing Legacy</option>
											<option>Product Information</option>
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
			)
			.then(() =>
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

	it("clears and closes", () => {
		state = state.setIn(
			["view", PREFS_NAME],
			Immutable.fromJS({ show: true, language: "fr-CA", application: 3 }),
		);
		return expect(
			<Provider store={store}>
				<IntlProvider locale="en">
					<Preferences messages={messages} />
				</IntlProvider>
			</Provider>,
			"when mounted",
			"to satisfy",
			null,
		)
			.then(
				expect(
					modalRoot,
					"with event",
					{
						type: "click",
						target: "." + getClassName(<PrefButton />) + ":first-child",
					},
					"to satisfy",
					<div>
						<div>
							<Ignore />
							<PrefForm>
								<FieldBox>
									<Label id="language_label">Display language</Label>
									<SelectorWrapper>
										<select id="language" value="fr-CA" onChange={() => {}}>
											<option>French - France</option>
											<option>English - United States</option>
											<option>English - Canada</option>
											<option>French - Canada</option>
										</select>
										<Ignore />
										<Ignore />
									</SelectorWrapper>
								</FieldBox>
								<FieldBox>
									<Label id="application_label">Default application</Label>
									<SelectorWrapper>
										<select id="application" value={3} onChange={() => {}}>
											<option>Marketing Legacy</option>
											<option>Product Information</option>
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
			)
			.then(() =>
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

	it("handles missing current values", () => {
		state = state
			.deleteIn(["locale", "locale"])
			.deleteIn(["locale", "defaultCulture"])
			.deleteIn(["settings", "defaultApp"]);
		expect(
			<Provider store={store}>
				<IntlProvider locale="en">
					<Preferences messages={messages} />
				</IntlProvider>
			</Provider>,
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
								<Label id="language_label">Display language</Label>
								<SelectorWrapper>
									<select id="language" value="" onChange={() => {}}>
										<option>English - United States</option>
										<option>English - Canada</option>
										<option>French - France</option>
										<option>French - Canada</option>
									</select>
									<Ignore />
									<Ignore />
								</SelectorWrapper>
							</FieldBox>
							<FieldBox>
								<Label id="application_label">Default application</Label>
								<SelectorWrapper>
									<select id="application" value="" onChange={() => {}}>
										<option>Marketing Legacy</option>
										<option>Product Information</option>
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

	describe("createGetUpdater", () => {
		let update, update2;
		beforeEach(() => {
			update = sinon.spy().named("update");
			update2 = () => {};
		});
		it("returns an update function", () =>
			expect(
				createGetUpdater,
				"when called with",
				[update],
				"called with",
				["testField"],
				"called with",
				["testValue"],
			).then(() =>
				expect(update, "to have calls satisfying", [
					{ args: ["testField", "testValue"] },
				]),
			));

		it("memoizes on update function and field name", () => {
			const update1_1 = createGetUpdater(update)("111");
			const update1_2 = createGetUpdater(update)("222");
			const update2_1 = createGetUpdater(update2)("111");
			const update2_2 = createGetUpdater(update2)("222");
			expect(createGetUpdater, "called with", [update]).then(f =>
				expect(f, "called with", ["111"], "to be", update1_1).and(
					"called with",
					["222"],
					"to be",
					update1_2,
				),
			);
			expect(createGetUpdater, "called with", [update2]).then(f =>
				expect(f, "called with", ["111"], "to be", update2_1).and(
					"called with",
					["222"],
					"to be",
					update2_2,
				),
			);
		});
	});
});
