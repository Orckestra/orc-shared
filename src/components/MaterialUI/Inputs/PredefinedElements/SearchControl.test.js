import React from "react";
import { mount } from "enzyme";
import sinon from "sinon";
import SearchControl from "./SearchControl";
import { TestWrapper, createMuiTheme } from "../../../../utils/testUtils";
import Input from "@material-ui/core/Input";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SelectMUI from "@material-ui/core/Select";
import Icon from "../../DataDisplay/Icon";
import { useStyles } from "./SearchControl";
import Select from "../Select";
import SelectProps from "../SelectProps";

const TestComp = ({ classToTest, styleProps }) => {
	const classes = useStyles({ ...styleProps });

	return <div className={classes[classToTest]} />;
};

const MuiThemeContainer = ({ classToTest, styleProps }) => {
	const theme = createMuiTheme();

	return (
		<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
			<TestComp classToTest={classToTest} styleProps={styleProps} />
		</TestWrapper>
	);
};

describe("useStyles", () => {
	it("build parentInput styles as expected", () => {
		expect(
			<MuiThemeContainer classToTest="parentInput" />,
			"when mounted",
			"to have style rules satisfying",
			expect
				.it("to contain", "z-index: 1;")
				.and("to contain", "border: 0.0625rem solid #CCC;")
				.and("to contain", "box-shadow: none;"),
		);

		expect(
			<MuiThemeContainer classToTest="parentInput" styleProps={{ focused: true }} />,
			"when mounted",
			"to have style rules satisfying",
			expect
				.it("to contain", "z-index: 99;")
				.and("to contain", "border: 0.0625rem solid #4fa1f0;")
				.and("to contain", "box-shadow: 0 0 4px #4fa1f0;"),
		);
	});
});

describe("SearchControl Component", () => {
	const stateSetter = sinon.spy().named("focus");
	const useStateMock = initState => [initState, stateSetter];

	afterEach(() => {
		jest.clearAllMocks();
	});

	const theme = createMuiTheme();

	it("Renders Search Control component without errors", () => {
		const options = [
			{ value: "aValue", label: "aLabel" },
			{ value: "anotherValue", label: "anotherLabel" },
		];

		const component = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<SearchControl placeholder="placeHolderTest" defaultValue="default" searchOptions={options} />
			</TestWrapper>
		);

		const selectProps = new SelectProps();
		selectProps.set(SelectProps.propNames.value, "aValue");

		const expected = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<div>
					<Select options={options} selectProps={selectProps} />
					<div>
						<form>
							<Input
								placeholder="placeHolderTest"
								defaultValue="default"
								disableUnderline={true}
								endAdornment={
									<InputAdornment position="start">
										<IconButton tabIndex="-1">
											<Icon id="close2" />
										</IconButton>
									</InputAdornment>
								}
							/>
						</form>
					</div>
					<IconButton>
						<Icon id="search" />
					</IconButton>
				</div>
			</TestWrapper>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Renders Search Control component without errors when searchOptions are empty", () => {
		const options = [];

		const component = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<SearchControl placeholder="placeHolderTest" defaultValue="default" searchOptions={options} />
			</TestWrapper>
		);

		const selectProps = new SelectProps();
		selectProps.set(SelectProps.propNames.value, "aValue");

		const expected = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<div>
					<div>
						<form>
							<Input
								placeholder="placeHolderTest"
								defaultValue="default"
								disableUnderline={true}
								endAdornment={
									<InputAdornment position="start">
										<IconButton tabIndex="-1">
											<Icon id="close2" />
										</IconButton>
									</InputAdornment>
								}
							/>
						</form>
					</div>
					<IconButton>
						<Icon id="search" />
					</IconButton>
				</div>
			</TestWrapper>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Renders Search Control component without errors when searchOptions are null", () => {
		const options = null;

		const component = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<SearchControl placeholder="placeHolderTest" defaultValue="default" searchOptions={options} />
			</TestWrapper>
		);

		const selectProps = new SelectProps();
		selectProps.set(SelectProps.propNames.value, "aValue");

		const expected = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<div>
					<div>
						<form>
							<Input
								placeholder="placeHolderTest"
								defaultValue="default"
								disableUnderline={true}
								endAdornment={
									<InputAdornment position="start">
										<IconButton tabIndex="-1">
											<Icon id="close2" />
										</IconButton>
									</InputAdornment>
								}
							/>
						</form>
					</div>
					<IconButton>
						<Icon id="search" />
					</IconButton>
				</div>
			</TestWrapper>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Search Control should trigger the event when hitting Enter even without prop", () => {
		const options = [
			{ value: "aValue", label: "aLabel" },
			{ value: "anotherValue", label: "anotherLabel" },
		];

		const component = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<SearchControl placeholder="placeHolderTest" searchOptions={options} />
			</TestWrapper>
		);

		const mountedComponent = mount(component);

		const allInputs = mountedComponent.find("input");
		const searchInput = allInputs.find("[placeholder='placeHolderTest']");
		expect(searchInput.length, "to be", 1);

		searchInput.instance().value = "abc";
		searchInput.simulate("keydown", { key: "Enter" });
	});

	it("Search Control should trigger the event when hitting Enter", () => {
		const options = [
			{ value: "aValue", label: "aLabel" },
			{ value: "anotherValue", label: "anotherLabel" },
		];

		const onSearchEvent = sinon.spy().named("search");

		const component = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<SearchControl placeholder="placeHolderTest" searchOptions={options} onSearch={onSearchEvent} />
			</TestWrapper>
		);

		const mountedComponent = mount(component);

		const allInputs = mountedComponent.find("input");
		const searchInput = allInputs.find("[placeholder='placeHolderTest']");
		expect(searchInput.length, "to be", 1);

		searchInput.instance().value = "abc";
		searchInput.simulate("keydown", { key: "Tab" });
		searchInput.simulate("keydown", { key: "Enter" });

		expect(onSearchEvent, "to have calls satisfying", [{ args: ["aValue", "abc"] }]);
	});

	it("Search Control should trigger the event when clicking on the search button", () => {
		const options = [
			{ value: "aValue", label: "aLabel" },
			{ value: "anotherValue", label: "anotherLabel" },
		];

		const onSearchEvent = sinon.spy().named("search");

		const component = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<SearchControl placeholder="placeHolderTest" searchOptions={options} onSearch={onSearchEvent} />
			</TestWrapper>
		);

		const mountedComponent = mount(component);

		const allInputs = mountedComponent.find("input");
		const searchInput = allInputs.find("[placeholder='placeHolderTest']");
		expect(searchInput.length, "to be", 1);

		searchInput.instance().value = "abcdef";

		const allButton = mountedComponent.find("button");
		const serachButton = allButton.find("[data-qa='searchButton']");

		serachButton.simulate("click");

		expect(onSearchEvent, "to have calls satisfying", [{ args: ["aValue", "abcdef"] }]);
	});

	it("Search Control should remove value when clicking on the clear button", () => {
		const options = [
			{ value: "aValue", label: "aLabel" },
			{ value: "anotherValue", label: "anotherLabel" },
		];

		const component = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<SearchControl placeholder="placeHolderTest" searchOptions={options} />
			</TestWrapper>
		);

		const mountedComponent = mount(component);

		const allInputs = mountedComponent.find("input");
		const searchInput = allInputs.find("[placeholder='placeHolderTest']");
		expect(searchInput.length, "to be", 1);

		searchInput.instance().value = "abcdef";

		const allButton = mountedComponent.find("button");
		const clearButton = allButton.find("[data-qa='clearButton']");

		clearButton.simulate("click");

		expect(searchInput.instance().value, "to equal", "");
	});

	it("Search Control should trigger the event when clicking on the search button when option change", () => {
		const options = [
			{ value: "aValue", label: "aLabel" },
			{ value: "anotherValue", label: "anotherLabel" },
		];

		const onSearchEvent = sinon.spy().named("search");

		const component = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<SearchControl placeholder="placeHolderTest" searchOptions={options} onSearch={onSearchEvent} />
			</TestWrapper>
		);

		const mountedComponent = mount(component);

		const allInputs = mountedComponent.find("input");
		const searchInput = allInputs.find("[placeholder='placeHolderTest']");
		expect(searchInput.length, "to be", 1);

		searchInput.instance().value = "abcdef123";

		const selectMui = mountedComponent.find(SelectMUI);

		const event = {
			target: {
				value: "anotherValue",
			},
		};

		selectMui.invoke("onChange")(event);

		const allButton = mountedComponent.find("button");
		const serachButton = allButton.find("[data-qa='searchButton']");

		serachButton.simulate("click");

		expect(onSearchEvent, "to have calls satisfying", [{ args: ["anotherValue", "abcdef123"] }]);
	});

	it("focusing text input should set focus on container", () => {
		jest.spyOn(React, "useState").mockImplementation(useStateMock);

		const options = [
			{ value: "aValue", label: "aLabel" },
			{ value: "anotherValue", label: "anotherLabel" },
		];

		const component = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<SearchControl placeholder="placeHolderTest" searchOptions={options} />
			</TestWrapper>
		);

		const mountedComponent = mount(component);

		const allInputs = mountedComponent.find("input");
		const searchInput = allInputs.find("[placeholder='placeHolderTest']");
		expect(searchInput.length, "to be", 1);

		let searchEditParent = mountedComponent.find('[data-qa="searchInput"]');
		expect(searchEditParent.length, "to be", 1);

		expect(searchEditParent.props()["data-qa-is-focused"], "to be", false);

		const event = {
			preventDefault: () => {},
			stopPropagation: () => {},
		};

		searchInput.invoke("onFocus")(event);

		searchEditParent = mountedComponent.find('[data-qa="searchInput"]');
		expect(searchEditParent.props()["data-qa-is-focused"], "to be", true);

		searchInput.invoke("onBlur")(event);

		searchEditParent = mountedComponent.find('[data-qa="searchInput"]');
		expect(searchEditParent.props()["data-qa-is-focused"], "to be", false);
	});

	it("Renders Search Control component without errors when disabled", () => {
		const options = [
			{ value: "aValue", label: "aLabel" },
			{ value: "anotherValue", label: "anotherLabel" },
		];

		const component = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<SearchControl placeholder="placeHolderTest" defaultValue="default" searchOptions={options} disabled={true} />
			</TestWrapper>
		);

		const selectProps = new SelectProps();
		selectProps.set(SelectProps.propNames.value, "aValue");

		const expected = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<div>
					<Select options={options} selectProps={selectProps} />
					<div>
						<form>
							<Input
								placeholder="placeHolderTest"
								defaultValue="default"
								disabled={true}
								disableUnderline={true}
								endAdornment={
									<InputAdornment position="start">
										<IconButton tabIndex="-1" disabled={true}>
											<Icon id="close2" />
										</IconButton>
									</InputAdornment>
								}
							/>
						</form>
					</div>
					<IconButton disabled={true}>
						<Icon id="search" />
					</IconButton>
				</div>
			</TestWrapper>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});
});
