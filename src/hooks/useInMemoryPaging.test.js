import React, { useRef } from "react";
import { Provider } from "react-redux";
import Immutable from "immutable";
import sinon from "sinon";
import { spyOnConsole } from "../utils/testUtils";
import { mount } from "enzyme";
import useInMemoryPaging from "./useInMemoryPaging";
import { buildHeaderAndRowFromConfig, Table, TableProps } from "../components/MaterialUI/DataDisplay";

const getColumnDefs = () => [
	{
		fieldName: "name",
		label: "name",
	},
];

const TestComp = ({ stateName, sortAndFilterFn, initialSort = {}, initialFilters = {}, tableRef = undefined }) => {
	const internalTableRef = useRef(null);

	const allRecords = Array.from(Array(50).keys()).map(k => ({ name: "n" + k }));

	const params = {
		viewStateName: stateName,
		tableRef: tableRef === undefined ? internalTableRef : tableRef,
		records: allRecords,
		pageSize: 20,
		initialSort: initialSort,
		initialFilters: initialFilters,
		sortAndFilterFn: sortAndFilterFn,
	};

	if (params.initialSort === null) {
		delete params.initialSort;
	}

	if (params.initialFilters === null) {
		delete params.initialFilters;
	}

	const {
		rows: pagedRows,
		scrollLoader,
		currentPage,
		filters,
		sorting,
		setFilter,
		setSort,
		totalCount,
	} = useInMemoryPaging(params);

	const onInternalFilter = () => {
		setFilter({ search: "n10" });
	};

	const onInternalSort = () => {
		setSort({ sortBy: "name" });
	};

	const onScrollPage1 = () => {
		scrollLoader(1);
	};

	const onScrollPage2 = () => {
		scrollLoader(2);
	};

	const tableProps = new TableProps();
	tableProps.set(TableProps.propNames.stickyHeader, true);
	tableProps.set(TableProps.propNames.withoutTopBorder, true);
	const columnDefs = getColumnDefs();

	const { headers, rows } = buildHeaderAndRowFromConfig(columnDefs, pagedRows, true, "id");

	return (
		<div>
			<div data-qa="totalCount">{totalCount}</div>
			<div data-qa="filters">{JSON.stringify(filters)}</div>
			<div data-qa="sorting">{JSON.stringify(sorting)}</div>
			<div data-qa="pagedRows">{JSON.stringify(pagedRows)}</div>

			<input type="button" data-qa="filter" value="filter" onClick={onInternalFilter} />
			<input type="button" data-qa="sort" value="sort" onClick={onInternalSort} />
			<input type="button" data-qa="scrollPage1" value="scrollPage1" onClick={onScrollPage1} />
			<input type="button" data-qa="scrollPage2" value="scrollPage2" onClick={onScrollPage2} />

			<Table
				headers={headers}
				rows={rows}
				tableProps={tableProps}
				scrollLoader={scrollLoader}
				latestPage={currentPage}
				pageLength={20}
			/>
		</div>
		// <div id="test" onClick={() => setTick(tick + 1)} data-live={live}>
		// 	{tick}
		// </div>
	);
};

const sortAndFilter = ({ list, filters, sorting }) => {
	const { searchTerm } = filters;
	const { sortBy = "name" } = sorting;

	list = [...list];
	list.sort((a, b) => a[sortBy]?.localeCompare(b[sortBy]));

	if (searchTerm) {
		list = list.filter(c => c.name?.toLowerCase()?.includes(searchTerm));
	}

	return list;
};

describe("useInMemoryPaging", () => {
	spyOnConsole(["warn", "error"]);

	let state, store;

	beforeEach(() => {
		state = Immutable.fromJS({});
		store = {
			getState: () => state,
			subscribe: () => {},
			dispatch: sinon.spy().named("dispatch"),
		};
	});

	it("initial state", () => {
		const component = (
			<Provider store={store}>
				<TestComp stateName={"inMemory"} sortAndFilterFn={sortAndFilter} />
			</Provider>
		);

		const mountedComponent = mount(component);
		const totalCountDiv = mountedComponent.find("[data-qa='totalCount']").at(0);
		const filtersDiv = mountedComponent.find("[data-qa='filters']").at(0);
		const sortingDiv = mountedComponent.find("[data-qa='sorting']").at(0);
		const pagedRowsDiv = mountedComponent.find("[data-qa='pagedRows']").at(0);

		expect(totalCountDiv.text(), "to equal", "50");
		expect(filtersDiv.text(), "to equal", "{}");
		expect(sortingDiv.text(), "to equal", "{}");
		expect(
			pagedRowsDiv.text(),
			"to equal",
			'[{"name":"n0"},{"name":"n1"},{"name":"n10"},{"name":"n11"},{"name":"n12"},{"name":"n13"},{"name":"n14"},{"name":"n15"},{"name":"n16"},{"name":"n17"},{"name":"n18"},{"name":"n19"},{"name":"n2"},{"name":"n20"},{"name":"n21"},{"name":"n22"},{"name":"n23"},{"name":"n24"},{"name":"n25"},{"name":"n26"}]',
		);
	});

	it("scrollLoader changes nothing if page is less than next page", () => {
		state = state.setIn(
			["view", "inMemory"],
			Immutable.fromJS({
				currentPage: 1,
				nextPageToLoad: 1,
			}),
		);

		const component = (
			<Provider store={store}>
				<TestComp stateName={"inMemory"} sortAndFilterFn={sortAndFilter} />
			</Provider>
		);

		const mountedComponent = mount(component);
		const onScrollPage1Btn = mountedComponent.find("[data-qa='scrollPage1']").at(0);
		onScrollPage1Btn.simulate("click");

		expect(store.dispatch, "was not called");
	});

	it("scrollLoader changes view state if page is greater than next page", () => {
		state = state.setIn(
			["view", "inMemory"],
			Immutable.fromJS({
				currentPage: 1,
				nextPageToLoad: 1,
			}),
		);

		const component = (
			<Provider store={store}>
				<TestComp stateName={"inMemory"} sortAndFilterFn={sortAndFilter} />
			</Provider>
		);

		const mountedComponent = mount(component);
		const onScrollPage2Btn = mountedComponent.find("[data-qa='scrollPage2']").at(0);
		onScrollPage2Btn.simulate("click");

		expect(store.dispatch, "to have a call satisfying", {
			args: [
				{
					type: "VIEW_STATE_SET_FIELD",
					payload: { name: "inMemory", field: "currentPage", value: 2 },
				},
			],
		});
		expect(store.dispatch, "to have a call satisfying", {
			args: [
				{
					type: "VIEW_STATE_SET_FIELD",
					payload: { name: "inMemory", field: "nextPageToLoad", value: 2 },
				},
			],
		});
	});

	it("validate default values for filters and sorting", () => {
		state = state.setIn(
			["view", "inMemory"],
			Immutable.fromJS({
				currentPage: 1,
				nextPageToLoad: 1,
			}),
		);

		const component = (
			<Provider store={store}>
				<TestComp stateName={"inMemory"} sortAndFilterFn={sortAndFilter} initialSort={null} initialFilters={null} />
			</Provider>
		);

		const mountedComponent = mount(component);
		const totalCountDiv = mountedComponent.find("[data-qa='totalCount']").at(0);
		const filtersDiv = mountedComponent.find("[data-qa='filters']").at(0);
		const sortingDiv = mountedComponent.find("[data-qa='sorting']").at(0);
		const pagedRowsDiv = mountedComponent.find("[data-qa='pagedRows']").at(0);

		expect(totalCountDiv.text(), "to equal", "50");
		expect(filtersDiv.text(), "to equal", "{}");
		expect(sortingDiv.text(), "to equal", "{}");
		expect(
			pagedRowsDiv.text(),
			"to equal",
			'[{"name":"n0"},{"name":"n1"},{"name":"n10"},{"name":"n11"},{"name":"n12"},{"name":"n13"},{"name":"n14"},{"name":"n15"},{"name":"n16"},{"name":"n17"},{"name":"n18"},{"name":"n19"},{"name":"n2"},{"name":"n20"},{"name":"n21"},{"name":"n22"},{"name":"n23"},{"name":"n24"},{"name":"n25"},{"name":"n26"}]',
		);
	});

	it("displays first page with a real sortAndFilterFn", () => {
		state = state.setIn(
			["view", "inMemory"],
			Immutable.fromJS({
				currentPage: 1,
				nextPageToLoad: 1,
			}),
		);

		const sortAndFilterCustom = ({ list, filters, sorting }) => {
			const { searchTerm } = filters;
			const { sortBy = "name" } = sorting;

			list = [...list];
			list.sort((a, b) => a[sortBy]?.localeCompare(b[sortBy]));

			if (searchTerm) {
				list = list.filter(c => c.name?.toLowerCase()?.includes(searchTerm));
			}

			return list.slice(0, 10);
		};

		const component = (
			<Provider store={store}>
				<TestComp stateName={"inMemory"} sortAndFilterFn={sortAndFilterCustom} />
			</Provider>
		);

		const mountedComponent = mount(component);
		const totalCountDiv = mountedComponent.find("[data-qa='totalCount']").at(0);
		const filtersDiv = mountedComponent.find("[data-qa='filters']").at(0);
		const sortingDiv = mountedComponent.find("[data-qa='sorting']").at(0);
		const pagedRowsDiv = mountedComponent.find("[data-qa='pagedRows']").at(0);

		expect(totalCountDiv.text(), "to equal", "10");
		expect(filtersDiv.text(), "to equal", "{}");
		expect(sortingDiv.text(), "to equal", "{}");
		expect(
			pagedRowsDiv.text(),
			"to equal",
			'[{"name":"n0"},{"name":"n1"},{"name":"n10"},{"name":"n11"},{"name":"n12"},{"name":"n13"},{"name":"n14"},{"name":"n15"},{"name":"n16"},{"name":"n17"}]',
		);
	});

	it("displays 2nd page", () => {
		state = state.setIn(
			["view", "inMemory"],
			Immutable.fromJS({
				currentPage: 2,
				nextPageToLoad: 2,
			}),
		);

		const component = (
			<Provider store={store}>
				<TestComp stateName={"inMemory"} sortAndFilterFn={sortAndFilter} />
			</Provider>
		);

		const mountedComponent = mount(component);
		const totalCountDiv = mountedComponent.find("[data-qa='totalCount']").at(0);
		const filtersDiv = mountedComponent.find("[data-qa='filters']").at(0);
		const sortingDiv = mountedComponent.find("[data-qa='sorting']").at(0);
		const pagedRowsDiv = mountedComponent.find("[data-qa='pagedRows']").at(0);

		expect(totalCountDiv.text(), "to equal", "50");
		expect(filtersDiv.text(), "to equal", "{}");
		expect(sortingDiv.text(), "to equal", "{}");
		expect(
			pagedRowsDiv.text(),
			"to equal",
			'[{"name":"n0"},{"name":"n1"},{"name":"n10"},{"name":"n11"},{"name":"n12"},{"name":"n13"},{"name":"n14"},{"name":"n15"},{"name":"n16"},{"name":"n17"},{"name":"n18"},{"name":"n19"},{"name":"n2"},{"name":"n20"},{"name":"n21"},{"name":"n22"},{"name":"n23"},{"name":"n24"},{"name":"n25"},{"name":"n26"},{"name":"n27"},{"name":"n28"},{"name":"n29"},{"name":"n3"},{"name":"n30"},{"name":"n31"},{"name":"n32"},{"name":"n33"},{"name":"n34"},{"name":"n35"},{"name":"n36"},{"name":"n37"},{"name":"n38"},{"name":"n39"},{"name":"n4"},{"name":"n40"},{"name":"n41"},{"name":"n42"},{"name":"n43"},{"name":"n44"}]',
		);
	});

	it("scrollTableRef raises warning if tableRef is null", () => {
		state = state.setIn(
			["view", "inMemory"],
			Immutable.fromJS({
				currentPage: 2,
				nextPageToLoad: 2,
			}),
		);

		const component = (
			<Provider store={store}>
				<TestComp stateName={"inMemory"} sortAndFilterFn={sortAndFilter} tableRef={null} />
			</Provider>
		);

		const mountedComponent = mount(component);
		const filterBtn = mountedComponent.find("[data-qa='filter']").at(0);
		filterBtn.simulate("click");

		expect(console.error, "to have a call satisfying", {
			args: ["[useInMemoryPaging]: tableRef was not specified or tableRef.current is null."],
		});
	});

	it("scrollTableRef raises warning if tableRef.current is null", () => {
		state = state.setIn(
			["view", "inMemory"],
			Immutable.fromJS({
				currentPage: 2,
				nextPageToLoad: 2,
			}),
		);

		const tableRef = {
			current: null,
		};

		const component = (
			<Provider store={store}>
				<TestComp stateName={"inMemory"} sortAndFilterFn={sortAndFilter} tableRef={tableRef} />
			</Provider>
		);

		const mountedComponent = mount(component);
		const filterBtn = mountedComponent.find("[data-qa='filter']").at(0);
		filterBtn.simulate("click");

		expect(console.error, "to have a call satisfying", {
			args: ["[useInMemoryPaging]: tableRef was not specified or tableRef.current is null."],
		});
	});

	it("scrollTableRef scrolls to top if tableRef.current is not null", () => {
		state = state.setIn(
			["view", "inMemory"],
			Immutable.fromJS({
				currentPage: 2,
				nextPageToLoad: 2,
			}),
		);

		const tableRef = {
			current: {
				scrollToTop: sinon.spy().named("tableRefcurrent"),
			},
		};

		const component = (
			<Provider store={store}>
				<TestComp stateName={"inMemory"} sortAndFilterFn={sortAndFilter} tableRef={tableRef} />
			</Provider>
		);

		const mountedComponent = mount(component);
		const filterBtn = mountedComponent.find("[data-qa='filter']").at(0);
		filterBtn.simulate("click");

		expect(tableRef.current.scrollToTop, "was called");
	});

	it("changing filter reset state and tableRef", () => {
		state = state.setIn(
			["view", "inMemory"],
			Immutable.fromJS({
				currentPage: 2,
				nextPageToLoad: 2,
			}),
		);

		const tableRef = {
			current: {
				scrollToTop: sinon.spy().named("tableRefcurrent"),
			},
		};

		const component = (
			<Provider store={store}>
				<TestComp stateName={"inMemory"} sortAndFilterFn={sortAndFilter} tableRef={tableRef} />
			</Provider>
		);

		const mountedComponent = mount(component);
		const filterBtn = mountedComponent.find("[data-qa='filter']").at(0);
		filterBtn.simulate("click");

		expect(tableRef.current.scrollToTop, "was called");
		expect(store.dispatch, "to have a call satisfying", {
			args: [
				{
					type: "VIEW_STATE_SET_FIELD",
					payload: { name: "inMemory", field: "filters", value: { search: "n10" } },
				},
			],
		});
		expect(store.dispatch, "to have a call satisfying", {
			args: [
				{
					type: "VIEW_STATE_SET_FIELD",
					payload: { name: "inMemory", field: "currentPage", value: 1 },
				},
			],
		});
		expect(store.dispatch, "to have a call satisfying", {
			args: [
				{
					type: "VIEW_STATE_SET_FIELD",
					payload: { name: "inMemory", field: "nextPageToLoad", value: 1 },
				},
			],
		});
	});

	it("changing sorting reset state and tableRef", () => {
		state = state.setIn(
			["view", "inMemory"],
			Immutable.fromJS({
				currentPage: 2,
				nextPageToLoad: 2,
			}),
		);

		const tableRef = {
			current: {
				scrollToTop: sinon.spy().named("tableRefcurrent"),
			},
		};

		const component = (
			<Provider store={store}>
				<TestComp stateName={"inMemory"} sortAndFilterFn={sortAndFilter} tableRef={tableRef} />
			</Provider>
		);

		const mountedComponent = mount(component);
		const sortingBtn = mountedComponent.find("[data-qa='sort']").at(0);
		sortingBtn.simulate("click");

		expect(tableRef.current.scrollToTop, "was called");
		expect(store.dispatch, "to have a call satisfying", {
			args: [
				{
					type: "VIEW_STATE_SET_FIELD",
					payload: { name: "inMemory", field: "sorting", value: { sortBy: "name" } },
				},
			],
		});
		expect(store.dispatch, "to have a call satisfying", {
			args: [
				{
					type: "VIEW_STATE_SET_FIELD",
					payload: { name: "inMemory", field: "currentPage", value: 1 },
				},
			],
		});
		expect(store.dispatch, "to have a call satisfying", {
			args: [
				{
					type: "VIEW_STATE_SET_FIELD",
					payload: { name: "inMemory", field: "nextPageToLoad", value: 1 },
				},
			],
		});
	});

	it("mutating sortAndFilterFn should display a warning", () => {
		state = state.setIn(
			["view", "inMemory"],
			Immutable.fromJS({
				currentPage: 2,
				nextPageToLoad: 2,
			}),
		);

		const tableRef = {
			current: {
				scrollToTop: sinon.spy().named("tableRefcurrent"),
			},
		};

		const component = (
			<Provider store={store}>
				<TestComp stateName={"inMemory"} sortAndFilterFn={sortAndFilter} tableRef={tableRef} />
			</Provider>
		);

		const mountedComponent = mount(component);
		mountedComponent.setProps({
			children: <TestComp stateName={"inMemory"} sortAndFilterFn={list => list} tableRef={tableRef} />,
		});
		mountedComponent.update();

		expect(console.warn, "to have a call satisfying", {
			args: [
				"[useInMemoryPaging]: a different value for sortAndFilterFn was detected between renders, ensure that it never changes (define it outside of your component).",
			],
		});
	});
});
