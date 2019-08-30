import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import sinon from "sinon";
import Immutable from "immutable";
import { IntlProvider } from "react-intl";
import Text from "../../Text";
import { ButtonWrapper } from "./FieldButtons";
import TranslationInput, {
	TranslationWrapper,
	TranslationField,
	ShowButton,
	ShowButtonChevron,
} from "./Translation";

describe("TranslationInput", () => {
	let state, store, update;
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
			"to deeply render as",
			<TranslationWrapper>
				<TranslationField lang="en-CA" />
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
						<TranslationInput name="test" value={{ "fr-CA": "Des mots" }} />
					</IntlProvider>
				</MemoryRouter>
			</Provider>,
			"when deeply rendered",
			"with event click",
			"on",
			<ShowButton />,
			"to have rendered",
			<TranslationWrapper>
				<TranslationField lang="en-CA" />
				<TranslationField lang="en-US" />
				<TranslationField lang="fr-CA" message="Des mots" />
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
			"when deeply rendered",
			"queried for",
			<TranslationField lang="en-CA" />,
			"with event",
			"change",
			{ target: { value: "New" } },
			"on",
			<input />,
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
			"when deeply rendered",
			"to be ok",
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
			"when deeply rendered",
		).then(render =>
			expect(
				render,
				"to have rendered",
				<TranslationWrapper>
					<TranslationField lang="en-CA" required />
					<ShowButton onClick={expect.it("to be a function")}>
						<ShowButtonChevron />
						<Text message="Show more things" />
					</ShowButton>
				</TranslationWrapper>,
			).and(
				"queried for",
				<TranslationField />,
				"to have rendered",
				<ButtonWrapper invalid={true} />,
			),
		));
});
