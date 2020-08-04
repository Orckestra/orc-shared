import React from "react";
import { mount } from "enzyme";
import sinon from "sinon";
import TooltippedTypography from "../../DataDisplay/TooltippedElements/TooltippedTypography";
import SearchControl from "./SearchControl";
import { createMuiTheme } from "../../../../utils/testUtils";
import { MuiThemeProvider } from "@material-ui/core";
import Input from "@material-ui/core/Input";
import IconButton from "@material-ui/core/IconButton";
import SelectMUI from "@material-ui/core/Select";
import Icon from "../../DataDisplay/Icon";
import { useStyles } from "./SearchControl";

const TestComp = ({ classToTest, styleProps }) => {
	const classes = useStyles({ ...styleProps });

	return <div className={classes[classToTest]} />;
};

const MuiThemeContainer = ({ classToTest, styleProps, muiTheme }) => {
	return (
		<MuiThemeProvider theme={muiTheme}>
			<TestComp classToTest={classToTest} styleProps={styleProps} />
		</MuiThemeProvider>
	);
};

describe("useStyles", () => {
	it("build parentInput styles as expected", () => {
		expect(
			<MuiThemeContainer classToTest="parentInput" muiTheme={createMuiTheme()} />,
			"when mounted",
			"to have style rules satisfying",
			expect
				.it("to contain", "z-index: 1;")
				.and("to contain", "border: 0.0625rem solid #CCC;")
				.and("to contain", "box-shadow: none;"),
		);

		expect(
			<MuiThemeContainer classToTest="parentInput" styleProps={{ focused: true }} muiTheme={createMuiTheme()} />,
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

	it("Renders Search Control component without errors", () => {
		const options = [
			{ value: "aValue", label: "aLabel" },
			{ value: "anotherValue", label: "anotherLabel" },
		];

		const component = (
			<MuiThemeProvider theme={createMuiTheme()}>
				<SearchControl placeholder="placeHolderTest" searchOptions={options} />
			</MuiThemeProvider>
		);

		const mountedComponent = mount(component);

		expect(
			mountedComponent.containsMatchingElement(<TooltippedTypography children="aLabel" noWrap titleValue="aLabel" />),
			"to be true",
		);

		expect(mountedComponent.containsMatchingElement(<Input placeholder="placeHolderTest" />), "to be true");

		expect(
			mountedComponent.containsMatchingElement(
				<IconButton>
					<Icon id="close2" />
				</IconButton>,
			),
			"to be true",
		);

		expect(
			mountedComponent.containsMatchingElement(
				<IconButton>
					<Icon id="search" />
				</IconButton>,
			),
			"to be true",
		);
	});

	it("Search Control should trigger the event when hitting Enter even without prop", () => {
		const options = [
			{ value: "aValue", label: "aLabel" },
			{ value: "anotherValue", label: "anotherLabel" },
		];

		const component = (
			<MuiThemeProvider theme={createMuiTheme()}>
				<SearchControl placeholder="placeHolderTest" searchOptions={options} />
			</MuiThemeProvider>
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
			<MuiThemeProvider theme={createMuiTheme()}>
				<SearchControl placeholder="placeHolderTest" searchOptions={options} onSearch={onSearchEvent} />
			</MuiThemeProvider>
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

	it("Search Control should trigger the event when clearing text", () => {
		const options = [
			{ value: "aValue", label: "aLabel" },
			{ value: "anotherValue", label: "anotherLabel" },
		];

		const onSearchEvent = sinon.spy().named("search");

		const component = (
			<MuiThemeProvider theme={createMuiTheme()}>
				<SearchControl placeholder="placeHolderTest" searchOptions={options} onSearch={onSearchEvent} />
			</MuiThemeProvider>
		);

		const mountedComponent = mount(component);

		const allInputs = mountedComponent.find("input");
		const searchInput = allInputs.find("[placeholder='placeHolderTest']");
		expect(searchInput.length, "to be", 1);

		searchInput.instance().value = "abc";
		expect(searchInput.instance().value, "to be", "abc");

		const allButton = mountedComponent.find("button");
		const clearButton = allButton.find("[tabIndex='-1']");

		clearButton.simulate("click");

		expect(onSearchEvent, "to have calls satisfying", [{ args: ["aValue", ""] }]);
		expect(searchInput.instance().value, "to be", "");
	});

	it("Search Control should trigger the event when clicking on the search button", () => {
		const options = [
			{ value: "aValue", label: "aLabel" },
			{ value: "anotherValue", label: "anotherLabel" },
		];

		const onSearchEvent = sinon.spy().named("search");

		const component = (
			<MuiThemeProvider theme={createMuiTheme()}>
				<SearchControl placeholder="placeHolderTest" searchOptions={options} onSearch={onSearchEvent} />
			</MuiThemeProvider>
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

	it("Search Control should trigger the event when clicking on the search button when option change", () => {
		const options = [
			{ value: "aValue", label: "aLabel" },
			{ value: "anotherValue", label: "anotherLabel" },
		];

		const onSearchEvent = sinon.spy().named("search");

		const component = (
			<MuiThemeProvider theme={createMuiTheme()}>
				<SearchControl placeholder="placeHolderTest" searchOptions={options} onSearch={onSearchEvent} />
			</MuiThemeProvider>
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
			<MuiThemeProvider theme={createMuiTheme()}>
				<SearchControl placeholder="placeHolderTest" searchOptions={options} />
			</MuiThemeProvider>
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

	it("focusing clear button input should set focus on container", () => {
		jest.spyOn(React, "useState").mockImplementation(useStateMock);

		const options = [
			{ value: "aValue", label: "aLabel" },
			{ value: "anotherValue", label: "anotherLabel" },
		];

		const component = (
			<MuiThemeProvider theme={createMuiTheme()}>
				<SearchControl placeholder="placeHolderTest" searchOptions={options} />
			</MuiThemeProvider>
		);

		const mountedComponent = mount(component);

		const allButton = mountedComponent.find("button");
		const clearButton = allButton.find("[tabIndex='-1']");
		expect(clearButton.length, "to be", 1);

		let searchEditParent = mountedComponent.find('[data-qa="searchInput"]');
		expect(searchEditParent.length, "to be", 1);

		expect(searchEditParent.props()["data-qa-is-focused"], "to be", false);

		const event = {
			preventDefault: () => {},
			stopPropagation: () => {},
		};

		clearButton.invoke("onFocus")(event);

		searchEditParent = mountedComponent.find('[data-qa="searchInput"]');
		expect(searchEditParent.props()["data-qa-is-focused"], "to be", true);

		clearButton.invoke("onBlur")(event);

		searchEditParent = mountedComponent.find('[data-qa="searchInput"]');
		expect(searchEditParent.props()["data-qa-is-focused"], "to be", false);
	});
});
