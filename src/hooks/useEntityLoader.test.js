import React, { useState } from "react";
import { Provider, useSelector } from "react-redux";
import Immutable from "immutable";
import sinon from "sinon";
import { RSAA } from "redux-api-middleware";
import { spyOnConsole } from "../utils/testUtils";
import useEntityLoader from "./useEntityLoader";
import { makeActionTypes } from "../actions/makeApiAction";
import * as getRequestStateInfo from "../selectors/requestStates";
import { mount } from "enzyme";

const TestComp = ({ entityId, loader, cutout }) => {
	useEntityLoader(entityId, loader, cutout);
	const [tick, setTick] = useState(0);
	const live = useSelector(state => state.get("live"));
	return (
		<div id="test" onClick={() => setTick(tick + 1)} data-live={live}>
			{tick}
		</div>
	);
};

describe("useEntityLoader", () => {
	spyOnConsole(["warn", "error"]);

	let loader, state, store, appNode;

	const closingAction = sinon.spy().named("closingAction");

	beforeEach(() => {
		state = Immutable.fromJS({
			cutout: "yes",
			live: 0,
			requests: {
				logout: false,
			},
			requestStates: {
				creates: {},
				deletes: {},
				fetches: {},
				updates: {},
			},
			navigation: {
				route: {
					match: { path: "/:scope/TheModuleName/:entityId", params: { scope: "TheOldScope", entityId: "loaderId" } },
				},
				moduleTabs: {},
				config: { prependPath: "/:scope/", prependHref: "/Scope1/" },
				closingTabsHandlerActions: {
					TheModuleName: [
						{
							entityId: "loaderId",
							closeTab: closingAction,
						},
					],
				},
			},
		});
		const subs = [];
		store = {
			updateState: () => {
				subs.forEach((sub, i) => {
					sub();
				});
			},
			subscribe: sub => {
				subs.push(sub);
				return () => {};
			},
			getState: () => state,
			dispatch: sinon.spy().named("dispatch"),
		};
		loader = {
			[RSAA]: {
				types: makeActionTypes("TEST_ACTION"),
			},
		};
		appNode = document.createElement("div");
		document.body.appendChild(appNode);
	});

	const getLoaderWithMeta = (withMeta = false) => ({
		[RSAA]: {
			types: makeActionTypes("TEST_ACTION").map(x => ({
				type: x,
				[withMeta ? "meta" : "noMeta"]: { data: "some meta data" },
			})),
		},
	});

	afterEach(() => {
		closingAction.resetHistory();
		document.body.removeChild(appNode);
	});

	it("dispatches the entity loader action on mount if cutout returns falsy", () =>
		expect(
			<Provider store={store}>
				<TestComp entityId={"entityId"} loader={loader} cutout={state => state.get("live")} />
			</Provider>,
			"when mounted",
			"to satisfy",
			<div>0</div>,
		).then(() => expect(store.dispatch, "to have calls satisfying", [{ args: [loader] }])));

	it("dispatches the entity loader action on mount with object types if cutout returns falsy", () =>
		expect(
			<Provider store={store}>
				<TestComp entityId={"entityId"} loader={getLoaderWithMeta(true)} cutout={state => state.get("live")} />
			</Provider>,
			"when mounted",
			"to satisfy",
			<div>0</div>,
		).then(() => expect(store.dispatch, "to have calls satisfying", [{ args: [getLoaderWithMeta(true)] }])));

	it("dispatches the entity loader action on mount with object types without meta if cutout returns falsy", () =>
		expect(
			<Provider store={store}>
				<TestComp entityId={"entityId"} loader={getLoaderWithMeta()} cutout={state => state.get("live")} />
			</Provider>,
			"when mounted",
			"to satisfy",
			<div>0</div>,
		).then(() => expect(store.dispatch, "to have calls satisfying", [{ args: [getLoaderWithMeta()] }])));

	it("dispatches the entity loader action without types", () =>
		expect(
			<Provider store={store}>
				<TestComp entityId={"entityId"} loader={{ [RSAA]: {} }} cutout={state => state.get("live")} />
			</Provider>,
			"when mounted",
			"to satisfy",
			<div>0</div>,
		).then(() => expect(store.dispatch, "to have calls satisfying", [{ args: [{ [RSAA]: {} }] }])));

	it("does not dispatch entity loader if cutout returns truthy", () =>
		expect(
			<Provider store={store}>
				<TestComp entityId={"entityId"} loader={loader} cutout={state => state.get("cutout")} />
			</Provider>,
			"when mounted",
			"to satisfy",
			<div>0</div>,
		).then(() => expect(store.dispatch, "was not called")));

	it("Throws an exception if loader is not a RSAA action", () =>
		expect(
			() =>
				expect(
					<Provider store={store}>
						<TestComp entityId={"entityId"} loader={{ type: 1 }} cutout={state => state.get("live")} />
					</Provider>,
					"when mounted",
				),
			"to throw",
			"useEntityLoader only supports RSAA api actions",
		));

	it("Ignores when the loader is not a RSAA action if cutout return true", () =>
		expect(
			<Provider store={store}>
				<TestComp entityId={"entityId"} loader={{ type: 1 }} cutout={state => state.get("cutout")} />
			</Provider>,
			"when mounted",
			"to satisfy",
			<div>0</div>,
		).then(() => expect(store.dispatch, "was not called")));

	it("Throws an exception if loader is an array", () =>
		expect(
			() =>
				expect(
					<Provider store={store}>
						<TestComp entityId={"entityId"} loader={[loader]} cutout={state => state.get("live")} />
					</Provider>,
					"when mounted",
				),
			"to throw",
			"useEntityLoader does not support an array of actions",
		));

	it("Throws an exception if loader RSAA action has an invalid type", () =>
		expect(
			() =>
				expect(
					<Provider store={store}>
						<TestComp
							entityId={"entityId"}
							loader={{ [RSAA]: { types: [1, "SSS"] } }}
							cutout={state => state.get("live")}
						/>
					</Provider>,
					"when mounted",
				),
			"to throw",
			"useEntityLoader only supports RSAA api actions with valid types",
		));

	it("Invoke the closing tab action when entity not found", () => {
		const component = (
			<Provider store={store}>
				<TestComp entityId={"loaderId"} loader={loader} cutout={state => state.get("live")} />
			</Provider>
		);

		const errorPayload = {
			status: 404,
			response: {
				responseStatus: {
					message: "some error message",
				},
			},
		};

		const getRequestStateInfoOverride = () => ({
			inProgress: false,
			value: false,
			error: closingAction.callCount === 0,
			errorResponse: closingAction.callCount === 0 ? errorPayload : null,
		});

		const getRequestStateInfoStub = sinon
			.stub(getRequestStateInfo, "getRequestStateInfo")
			.returns(() => getRequestStateInfoOverride());

		mount(component);

		expect(closingAction, "was called");

		getRequestStateInfoStub.restore();
	});

	it("Does not invoke not existing closing tab action when entity not found", () => {
		const component = (
			<Provider store={store}>
				<TestComp entityId={"loaderAnotherId"} loader={loader} cutout={state => state.get("live")} />
			</Provider>
		);

		const errorPayload = {
			status: 404,
			response: {
				responseStatus: {
					message: "some error message",
				},
			},
		};

		const getRequestStateInfoOverride = () => ({
			inProgress: false,
			value: false,
			error: closingAction.callCount === 0,
			errorResponse: closingAction.callCount === 0 ? errorPayload : null,
		});

		const getRequestStateInfoStub = sinon
			.stub(getRequestStateInfo, "getRequestStateInfo")
			.returns(() => getRequestStateInfoOverride());

		mount(component);

		expect(closingAction, "was not called");

		getRequestStateInfoStub.restore();
	});
});
