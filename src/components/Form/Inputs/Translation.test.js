import React from "react";
import sinon from "sinon";
import Immutable from "immutable";
import Text from "../../Text";
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
			<TranslationInput
				name="test"
				store={store}
				value={{}}
				moreLabel="Show more things"
			/>,
			"renders elements",
			"renders elements",
			"renders elements",
			"to render with all children as",
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
			<TranslationInput
				name="test"
				store={store}
				value={{ "fr-CA": "Des mots" }}
			/>,
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
			<TranslationInput
				name="test"
				store={store}
				value={{ "fr-CA": "Des mots" }}
				update={update}
				moreLabel="Show more things"
			/>,
			"renders elements",
			"renders elements",
			"renders elements",
			"with event",
			"change",
			{ target: { value: "New" } },
			"on",
			<TranslationField lang="en-CA" />,
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
			<TranslationInput
				name="test"
				store={store}
				value={{ "fr-CA": "Des mots" }}
				update={update}
				moreLabel="Show more things"
			/>,
			"when deeply rendered",
			"to be ok",
		);
	});
});
