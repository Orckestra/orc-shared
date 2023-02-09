import React from "react";
import ReactDOM from "react-dom";
import LoadingScreen from "./loadingScreen";
import Backdrop from "@mui/material/Backdrop";
import { act } from "react-dom/test-utils";
import CircularProgress from "@mui/material/CircularProgress";
import { createMuiTheme, TestWrapper } from "../../../utils/testUtils";
import Immutable from "immutable";
import sinon from "sinon";
import { mount } from "enzyme";

describe("loadingScreen", () => {
	let store, state;

	beforeEach(() => {
		state = Immutable.fromJS({
			view: {},
			requests: {
				actives: {},
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
	});

	const theme = createMuiTheme();

	it("Renders a closed backdrop by default", () => {
		expect(
			<TestWrapper stylesProvider muiThemeProvider={{ theme }} provider={{ store }}>
				<LoadingScreen />
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper stylesProvider muiThemeProvider={{ theme }} provider={{ store }}>
				<Backdrop open={false}></Backdrop>
			</TestWrapper>,
		);
	});

	it("Renders an opened backdrop when active request are running", () => {
		state = state.setIn(["requests", "actives", "aRequest"], true);
		expect(
			<TestWrapper stylesProvider muiThemeProvider={{ theme }} provider={{ store }}>
				<LoadingScreen />
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper stylesProvider muiThemeProvider={{ theme }} provider={{ store }}>
				<Backdrop open={true} />
			</TestWrapper>,
		);
	});

	it("Renders an opened backdrop with circular progress when active request are running", () => {
		state = state.setIn(["requests", "actives", "aRequest"], true);

		const clock = sinon.useFakeTimers();
		const menuNode = document.createElement("div");
		document.body.appendChild(menuNode);
		const menu = ReactDOM.render(
			<div>
				<TestWrapper stylesProvider muiThemeProvider={{ theme }} provider={{ store }}>
					<LoadingScreen />
				</TestWrapper>
			</div>,
			menuNode,
		);

		const expectedWithoutProgress = <Backdrop open={true} invisible={true} />;

		const expectedWithProgress = (
			<Backdrop open={true} invisible={true}>
				<CircularProgress size={100} color="inherit" />
			</Backdrop>
		);

		try {
			expect(menu, "to contain", expectedWithoutProgress);
			expect(menu, "not to contain", expectedWithProgress);

			act(() => {
				clock.tick(1000); // Wait for the menu to unrender
			});

			expect(menu, "not to contain", expectedWithoutProgress);
			expect(menu, "to contain", expectedWithProgress);

			act(() => {
				state = state.setIn(["requests", "actives", "aRequest"], false);
				store.updateState();
			});

			expect(menu, "not to contain", expectedWithoutProgress);
			expect(menu, "to contain", expectedWithProgress);
		} finally {
			ReactDOM.unmountComponentAtNode(menuNode);
			document.body.removeChild(menuNode);
			clock.restore();
		}
	});

	it("Handles the onMouseDown event without error", () => {
		state = state.setIn(["requests", "actives", "aRequest"], true);

		const component = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }} provider={{ store }}>
				<LoadingScreen />
			</TestWrapper>
		);

		const mountedComponent = mount(component);
		const backdrop = mountedComponent.find("[data-qa='backdroploadingscreen']").first();

		const event = {
			preventDefault: jest.fn(),
			stopPropagation: jest.fn(),
		};
		backdrop.invoke("onMouseDown")(event);

		expect(event.preventDefault.mock.calls.length, "to equal", 1);
		expect(event.stopPropagation.mock.calls.length, "to equal", 1);
	});
});
