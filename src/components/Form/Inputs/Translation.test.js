import React from "react";
import Immutable from "immutable";
import { Provider } from "react-redux";
import { IntlProvider } from "react-intl";
import { MemoryRouter } from "react-router-dom";
import { Ignore } from "unexpected-reaction";
import sinon from "sinon";
import { spyOnConsole, getClassName } from "../../../utils/testUtils";
import Text from "../../Text";
import { ButtonWrapper } from "./FieldButtons";
import { FormInput } from "./Text";
import TranslationInput, {
	TranslationWrapper,
	TranslationField,
	ShowButton,
	ShowButtonChevron,
	LanguageLabel,
} from "./Translation";

describe("TranslationInput", () => {
	let state, store, update, handlers;
	beforeEach(() => {
		state = Immutable.fromJS({
			locale: {
				cultures: {
					"en-US": {},
					"en-CA": {},
					"fr-CA": {},
				},
				defaultCulture: "en-CA",
			},
		});
		store = {
			subscribe: () => {},
			dispatch: () => {},
			getState: () => state,
		};
		update = sinon.spy().named("update");
		handlers = { "en-US": () => {}, "en-CA": () => {}, "fr-CA": () => {} };
	});

	it("renders a field for the default culture, and a button to show others", () =>
		expect(
			<Provider store={store}>
				<MemoryRouter>
					<IntlProvider locale="en">
						<TranslationInput
							name="test"
							value={{}}
							moreLabel="Show more things"
						/>
					</IntlProvider>
				</MemoryRouter>
			</Provider>,
			"when mounted",
			"to satisfy",
			<TranslationWrapper>
				<IntlProvider locale="en">
					<TranslationField lang="en-CA" onChange={() => {}} />
				</IntlProvider>
				<ShowButton onClick={expect.it("to be a function")}>
					<ShowButtonChevron />
					<Text message="Show more things" />
				</ShowButton>
			</TranslationWrapper>,
		));

	it("renders fields for all languages when button is clicked", () =>
		expect(
			<Provider store={store}>
				<MemoryRouter>
					<IntlProvider locale="en">
						<TranslationInput
							name="test"
							value={{ "fr-CA": "Des mots" }}
							handlers={handlers}
						/>
					</IntlProvider>
				</MemoryRouter>
			</Provider>,
			"when mounted",
			"with event",
			{ type: "click", target: "." + getClassName(<ShowButton />) },
			"to satisfy",
			<TranslationWrapper>
				<IntlProvider locale="en">
					<TranslationField lang="en-CA" onChange={() => {}} />
				</IntlProvider>
				<IntlProvider locale="en">
					<TranslationField lang="en-US" onChange={() => {}} />
				</IntlProvider>
				<IntlProvider locale="en">
					<TranslationField
						lang="fr-CA"
						message="Des mots"
						onChange={() => {}}
					/>
				</IntlProvider>
			</TranslationWrapper>,
		));

	it("lets you update a single language", () =>
		expect(
			<Provider store={store}>
				<MemoryRouter>
					<IntlProvider locale="en-CA">
						<TranslationInput
							name="test"
							value={{ "fr-CA": "Des mots" }}
							update={update}
							moreLabel="Show more things"
						/>
					</IntlProvider>
				</MemoryRouter>
			</Provider>,
			"when mounted",
			"with event",
			{ type: "change", value: "New", target: "input" },
		).then(() =>
			expect(update, "to have calls satisfying", [
				{
					args: [
						{
							"en-CA": "New",
							"fr-CA": "Des mots",
						},
					],
				},
			]),
		));

	it("handles no cultures being loaded gracefully", () => {
		state = state.setIn(["locale", "cultures"], Immutable.Map());
		return expect(
			<Provider store={store}>
				<MemoryRouter>
					<TranslationInput
						name="test"
						value={{ "fr-CA": "Des mots" }}
						update={update}
						moreLabel="Show more things"
					/>
				</MemoryRouter>
			</Provider>,
			"when mounted",
			"to be a",
			"DOMElement",
		);
	});

	it("handles being required but missing", () =>
		expect(
			<Provider store={store}>
				<MemoryRouter>
					<IntlProvider locale="en">
						<TranslationInput
							name="test"
							value={{}}
							required
							moreLabel="Show more things"
						/>
					</IntlProvider>
				</MemoryRouter>
			</Provider>,
			"when mounted",
			"to satisfy",
			expect
				.it(
					"to satisfy",
					<TranslationWrapper>
						<IntlProvider locale="en">
							<TranslationField lang="en-CA" required onChange={() => {}} />
						</IntlProvider>
						<ShowButton onClick={expect.it("to be a function")}>
							<ShowButtonChevron />
							Show more things
						</ShowButton>
					</TranslationWrapper>,
				)
				.and(
					"to contain",
					<ButtonWrapper invalid={true}>
						<Ignore />
						<Ignore />
					</ButtonWrapper>,
				),
		));
});

describe("TranslationField", () => {
	spyOnConsole();

	let onChange;
	beforeEach(() => {
		onChange = () => {};
	});

	it("shows a single language label and a text field", () =>
		expect(
			<IntlProvider locale="en">
				<TranslationField
					lang="en-US"
					message="A hat, pardner"
					onChange={onChange}
					otherProp
				/>
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			<ButtonWrapper>
				<LanguageLabel>en-US</LanguageLabel>
				<IntlProvider locale="en">
					<FormInput value="A hat, pardner" onChange={onChange} otherProp />
				</IntlProvider>
			</ButtonWrapper>,
		).then(() =>
			expect(
				[console.log, console.warn, console.error],
				"to have calls satisfying",
				[],
			),
		));

	it("handles missing message", () =>
		expect(
			<IntlProvider locale="en">
				<TranslationField lang="en-US" onChange={onChange} otherProp />
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			<ButtonWrapper>
				<LanguageLabel>en-US</LanguageLabel>
				<IntlProvider locale="en">
					<FormInput value="" onChange={onChange} otherProp />
				</IntlProvider>
			</ButtonWrapper>,
		).then(() =>
			expect(
				[console.log, console.warn, console.error],
				"to have calls satisfying",
				[],
			),
		));
});
