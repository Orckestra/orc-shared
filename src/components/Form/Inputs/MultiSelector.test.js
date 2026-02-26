import React from "react";
import sinon from "sinon";
import MultiSelector from "./MultiSelector";
import { TestWrapper, createMuiTheme, extractMessages } from "../../../utils/testUtils";
import Immutable from "immutable";
import SelectMUI from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TooltippedTypography from "../../MaterialUI/DataDisplay/TooltippedElements/TooltippedTypography";
import Icon from "../../MaterialUI/DataDisplay/Icon";
import FormControl from "@material-ui/core/FormControl";
import { render, screen, fireEvent } from "@testing-library/react";
import sharedMessages from "../../../sharedMessages";

const messages = extractMessages(sharedMessages);

describe("MultiSelector", () => {
	let update, state, store, chevronDown, multipleRenderValue;
	beforeEach(() => {
		update = sinon.spy().named("update");
		multipleRenderValue = sinon.fake.returns("En, It");

		state = Immutable.fromJS({
			locale: {
				locale: "en-CA",
			},
		});

		store = {
			subscribe: () => {},
			dispatch: () => {},
			getState: () => state,
		};

		chevronDown = props => {
			return <Icon id="dropdown-chevron-down" {...props} />;
		};
	});

	const theme = createMuiTheme();

	it("renders a multi selector with multiple options", () =>
		expect(
			<TestWrapper provider={{ store }} intlProvider={{ messages }} stylesProvider muiThemeProvider={{ theme }}>
				<MultiSelector
					update={update}
					value={["English"]}
					options={[
						{ value: "English", label: "English" },
						{ value: "Francais", label: "Francais" },
					]}
				/>
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper provider={{ store }} intlProvider={{ messages }} stylesProvider muiThemeProvider={{ theme }}>
				<FormControl>
					<SelectMUI
						value={["English"]}
						disableUnderline={true}
						IconComponent={chevronDown}
						error={false}
						multiple={true}
						renderValue={selected => selected.join(", ")}
					>
						<MenuItem key="English" value="English">
							<TooltippedTypography children="English" titleValue="English" />
						</MenuItem>
						<MenuItem key="Francais" value="Francais">
							<TooltippedTypography noWrap children="Francais" titleValue="Francais" />
						</MenuItem>
					</SelectMUI>
				</FormControl>
			</TestWrapper>,
		));

	it("renders a multi selector with select all and clear options without errors", () =>
		expect(
			<TestWrapper provider={{ store }} intlProvider={{ messages }} stylesProvider muiThemeProvider={{ theme }}>
				<MultiSelector
					update={update}
					addClearSelectAll={true}
					value={["English"]}
					options={[
						{ value: "English", label: "English" },
						{ value: "Francais", label: "Francais" },
					]}
				/>
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper provider={{ store }} intlProvider={{ messages }} stylesProvider muiThemeProvider={{ theme }}>
				<FormControl>
					<SelectMUI
						value={["English"]}
						disableUnderline={true}
						IconComponent={chevronDown}
						error={false}
						multiple={false}
						renderValue={selected => selected.join(", ")}
					>
						<MenuItem key="English" value="English">
							<TooltippedTypography children="English" titleValue="English" />
						</MenuItem>
						<MenuItem key="Francais" value="Francais">
							<TooltippedTypography noWrap children="Francais" titleValue="Francais" />
						</MenuItem>
					</SelectMUI>
				</FormControl>
			</TestWrapper>,
		));

	it("Expect multipleRenderValue to be called and selection to be rendered correctly", () => {
		const allOptions = [
			{ value: "English", label: "English" },
			{ value: "Francais", label: "Francais" },
			{ value: "Italiano", label: "Italiano" },
		];

		const multiSelector = (
			<TestWrapper provider={{ store }} intlProvider={{ messages }} stylesProvider muiThemeProvider={{ theme }}>
				<MultiSelector
					update={update}
					multipleRenderValue={multipleRenderValue}
					value={["English", "Italiano"]}
					options={allOptions}
				/>
			</TestWrapper>
		);

		render(multiSelector);

		const selectionText = screen.queryByText("En, It");

		expect(selectionText, "not to be null");
		expect(multipleRenderValue, "to have a call satisfying", { args: [["English", "Italiano"], allOptions] });
	});

	it("Expect to have both 'Select All' and 'Clear' options to be available with partial selection", () => {
		const multiSelector = (
			<TestWrapper provider={{ store }} intlProvider={{ messages }} stylesProvider muiThemeProvider={{ theme }}>
				<MultiSelector
					update={update}
					addClearSelectAll={true}
					value={["English"]}
					options={[
						{ value: "English", label: "English" },
						{ value: "Francais", label: "Francais" },
					]}
				/>
			</TestWrapper>
		);

		render(multiSelector);

		const selectButton = screen.getByRole("button");
		fireEvent.mouseDown(selectButton);

		const selectAllOption = screen.queryByText("Select All");
		const clearOption = screen.queryByText("Clear");

		expect(selectAllOption, "not to be null");
		expect(clearOption, "not to be null");
	});

	it("Expect to have only 'Clear' option to be available with all options being selected", () => {
		const multiSelector = (
			<TestWrapper provider={{ store }} intlProvider={{ messages }} stylesProvider muiThemeProvider={{ theme }}>
				<MultiSelector
					update={update}
					addClearSelectAll={true}
					value={["English", "Francais"]}
					options={[
						{ value: "English", label: "English" },
						{ value: "Francais", label: "Francais" },
					]}
				/>
			</TestWrapper>
		);

		render(multiSelector);

		const selectButton = screen.getByRole("button");
		fireEvent.mouseDown(selectButton);

		const selectAllOption = screen.queryByText("Select All");
		const clearOption = screen.queryByText("Clear");

		expect(selectAllOption, "to be null");
		expect(clearOption, "not to be null");
	});

	it("Expect to have only 'Select All' option to be available with an empty selection", () => {
		const multiSelector = (
			<TestWrapper provider={{ store }} intlProvider={{ messages }} stylesProvider muiThemeProvider={{ theme }}>
				<MultiSelector
					update={update}
					addClearSelectAll={true}
					value={[]}
					options={[
						{ value: "English", label: "English" },
						{ value: "Francais", label: "Francais" },
					]}
				/>
			</TestWrapper>
		);

		render(multiSelector);

		const selectButton = screen.getByRole("button");
		fireEvent.mouseDown(selectButton);

		const selectAllOption = screen.queryByText("Select All");
		const clearOption = screen.queryByText("Clear");

		expect(selectAllOption, "not to be null");
		expect(clearOption, "to be null");
	});

	it("Picking one selection should update with it along with existing ones", () => {
		const multiSelector = (
			<TestWrapper provider={{ store }} intlProvider={{ messages }} stylesProvider muiThemeProvider={{ theme }}>
				<MultiSelector
					update={update}
					addClearSelectAll={true}
					value={["English"]}
					options={[
						{ value: "English", label: "English" },
						{ value: "Francais", label: "Francais" },
						{ value: "Italiano", label: "Italiano" },
					]}
				/>
			</TestWrapper>
		);

		render(multiSelector);

		const selectButton = screen.getByRole("button");
		fireEvent.mouseDown(selectButton);

		const optionToSelect = screen.getByText("Italiano");
		fireEvent.click(optionToSelect);

		expect(update, "to have calls satisfying", [{ args: [["English", "Italiano"]] }]);
	});

	it("The 'Select All' option should update with all values", () => {
		const multiSelector = (
			<TestWrapper provider={{ store }} intlProvider={{ messages }} stylesProvider muiThemeProvider={{ theme }}>
				<MultiSelector
					update={update}
					addClearSelectAll={true}
					value={["English"]}
					options={[
						{ value: "English", label: "English" },
						{ value: "Francais", label: "Francais" },
						{ value: "Italiano", label: "Italiano" },
					]}
				/>
			</TestWrapper>
		);

		render(multiSelector);

		const selectButton = screen.getByRole("button");
		fireEvent.mouseDown(selectButton);

		const optionToSelect = screen.getByText("Select All");
		fireEvent.click(optionToSelect);

		expect(update, "to have calls satisfying", [{ args: [["English", "Francais", "Italiano"]] }]);
	});

	it("The 'Clear' option should update with an empty list", () => {
		const multiSelector = (
			<TestWrapper provider={{ store }} intlProvider={{ messages }} stylesProvider muiThemeProvider={{ theme }}>
				<MultiSelector
					update={update}
					addClearSelectAll={true}
					value={["English"]}
					options={[
						{ value: "English", label: "English" },
						{ value: "Francais", label: "Francais" },
						{ value: "Italiano", label: "Italiano" },
					]}
				/>
			</TestWrapper>
		);

		render(multiSelector);

		const selectButton = screen.getByRole("button");
		fireEvent.mouseDown(selectButton);

		const optionToSelect = screen.getByText("Clear");
		fireEvent.click(optionToSelect);

		expect(update, "to have calls satisfying", [{ args: [[]] }]);
	});

	it("renders a multi selector with an error", () => {
		expect(
			<TestWrapper provider={{ store }} intlProvider={{ messages }} stylesProvider muiThemeProvider={{ theme }}>
				<MultiSelector
					update={update}
					required={true}
					value={[]}
					options={[
						{ value: "English", label: "English" },
						{ value: "Francais", label: "Francais" },
					]}
				/>
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper provider={{ store }} intlProvider={{ messages }} stylesProvider muiThemeProvider={{ theme }}>
				<FormControl>
					<div>
						<SelectMUI value={[""]} disableUnderline={true} IconComponent={chevronDown} error={true} multiple={true}>
							<MenuItem key="English" value="English">
								<TooltippedTypography children="English" titleValue="English" />
							</MenuItem>
							<MenuItem key="Francais" value="Francais">
								<TooltippedTypography noWrap children="Francais" titleValue="Francais" />
							</MenuItem>
						</SelectMUI>
						<div></div>
					</div>
				</FormControl>
			</TestWrapper>,
		);
	});
});
