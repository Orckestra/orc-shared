import React from "react";
import { useDispatchWithModulesData } from "./useDispatchWithModulesData";
import sinon from "sinon";
import { mount } from "enzyme";
import * as reactRedux from "react-redux";
import { Provider } from "react-redux";
import Immutable from "immutable";

describe("useDispatchWithModulesData", () => {
	let store, state;
	const moduleName = "thing";
	const sectionName = "mySection";

	beforeEach(() => {
		state = Immutable.fromJS({
			navigation: {
				route: { match: { path: `/:scope/${moduleName}/id/${sectionName}` } },
				config: { prependPath: "/:scope/", prependHref: "/scope/" },
			},
		});

		store = {
			subscribe: () => {},
			dispatch: () => {},
			getState: () => state,
		};
	});

	it("Dispatches action just with passed and default params", () => {
		const actionSpy = sinon.spy();
		const params = ["test1", "test2"];
		const TestComp = () => {
			const dispatch = useDispatchWithModulesData();
			dispatch(actionSpy, params);
			return null;
		};

		const component = (
			<Provider store={store}>
				<TestComp />
			</Provider>
		);

		mount(component);

		expect(actionSpy, "to have a call satisfying", { args: params.concat([moduleName]) });
	});

	it("Dispatches action just with default params", () => {
		const actionSpy = sinon.spy();

		const TestComp = () => {
			const dispatch = useDispatchWithModulesData();
			dispatch(actionSpy);
			return null;
		};

		const component = (
			<Provider store={store}>
				<TestComp />
			</Provider>
		);

		mount(component);

		expect(actionSpy, "to have a call satisfying", { args: [moduleName] });
	});

	it("Dispatches action with default and options params", () => {
		const actionSpy = sinon.spy();

		const TestComp = () => {
			const dispatch = useDispatchWithModulesData();
			dispatch(actionSpy, [], { includeCurrentSection: true });
			return null;
		};

		const component = (
			<Provider store={store}>
				<TestComp />
			</Provider>
		);

		mount(component);

		expect(actionSpy, "to have a call satisfying", { args: [sectionName, moduleName] });
	});
});
