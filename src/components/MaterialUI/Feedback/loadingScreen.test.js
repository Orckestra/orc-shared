import React from "react";
import ReactDOM from "react-dom";
import LoadingScreen from "./loadingScreen";
import Backdrop from "@material-ui/core/Backdrop";
import { act } from "react-dom/test-utils";
import CircularProgress from "@material-ui/core/CircularProgress";
import { mount } from "enzyme";
import { createMuiTheme, TestWrapper } from "../../../utils/testUtils";
import Immutable from "immutable";
import sinon from "sinon";

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

			// act(() => {
			//     anchor.click();
			// });
			// expect(menu, "to contain elements matching", getStyledClassSelector(List));
			// act(() => {
			//     outside.click();
			// });
			// expect(
			//     menu,
			//     "to contain",
			//     <AnchorWrapper id="testAnchor" open={false}>
			//         TestLabel
			//     </AnchorWrapper>,
			// );
			// expect(menu, "not to contain elements matching", getStyledClassSelector(List));
		} finally {
			ReactDOM.unmountComponentAtNode(menuNode);
			document.body.removeChild(menuNode);
			clock.restore();
		}

		// const component = (
		//     <TestWrapper stylesProvider muiThemeProvider={{theme}} provider={{store}}>
		//          <LoadingScreen/>
		//      </TestWrapper>);
		//
		// const mountedComponent = mount(component);
		// const expected = (
		//     //<TestWrapper stylesProvider muiThemeProvider={{theme}} provider={{store}}>
		//         <Backdrop open={true}/>
		//     //</TestWrapper>
		// );
		// const expected1 = (
		//     //<TestWrapper stylesProvider muiThemeProvider={{theme}} provider={{store}}>
		//     <CircularProgress/>
		//     //</TestWrapper>
		// );
		//
		// expect(mountedComponent.containsMatchingElement(expected), "to be truthy");
		// expect(mountedComponent.containsMatchingElement(expected1), "to be false");
		//
		// act(() => {
		//     clock.tick(1000);
		// });
		//
		// mountedComponent.setProps({});
		//
		// expect(mountedComponent.containsMatchingElement(expected), "to be truthy");
		// expect(mountedComponent.containsMatchingElement(expected1), "to be truthy");
		//
		// act(() => {
		//     state = state.setIn(["requests", "actives", "aRequest"], false);
		//     store.updateState();
		// });
		//
		// expect(mountedComponent.containsMatchingElement(expected), "to be truthy");
		// expect(mountedComponent.containsMatchingElement(expected1), "to be truthy");

		//mountedComponent.unmount();

		// const component = <TestWrapper stylesProvider muiThemeProvider={{theme}} provider={{store}}>
		//     <LoadingScreen/>
		// </TestWrapper>;
		//

		// return expect(
		//     <TestWrapper stylesProvider muiThemeProvider={{theme}} provider={{store}}>
		//         <LoadingScreen/>
		//     </TestWrapper>,
		//     "when mounted",
		//     "to satisfy",
		//     <TestWrapper stylesProvider muiThemeProvider={{theme}} provider={{store}}>
		//         <Backdrop open={true}/>
		//     </TestWrapper>,
		// ).then(() => clock.tick(1000));

		// expect(
		//     mountedComponent.containsAllMatchingElements([<Backdrop open={true}/>]),
		//     "to be true",
		// );

		//
		// const mountedComponent = mount(component);
		//
		// expect(
		//     mountedComponent.containsAllMatchingElements([<Backdrop open={true}/>]),
		//     "to be true",
		// );
		// expect(
		//     mountedComponent.containsAllMatchingElements([<CircularProgress/>]),
		//     "to be false",
		// );
		//
		// act(() => {
		//     clock.tick(1000);
		// });
		//
		// expect(
		//     mountedComponent.containsAllMatchingElements([<Backdrop open={true}/>]),
		//     "to be true",
		// );
		// // expect(
		// //     mountedComponent.containsAllMatchingElements([<CircularProgress size={100} color="inherit"/>]),
		// //     "to be true",
		// // );
		//
		// act(() => {
		//     state = state.setIn(["requests", "actives", "aRequest"], false);
		//     store.updateState();
		// });
		//
		//
		// expect(
		//     mountedComponent.containsAllMatchingElements([<Backdrop open={true}/>]),
		//     "to be true",
		// );
		//
		//
		// ReactDOM.unmountComponentAtNode(menuNode);
		// document.body.removeChild(menuNode);

		// expect(
		//     mountedComponent.containsAllMatchingElements([<CircularProgress size={100} color="inherit"/>]),
		//     "to be true",
		// );

		//        expect(component, "to contain", <Backdrop open={true}/>);

		// const component = (
		//     <TestWrapper provider={{ store }} intlProvider={{ messages }}>
		//         <InfoBar />
		//     </TestWrapper>
		// );
		//
		// const mountedComponent = mount(component);
		//
		// const orderSummaryFields = <OrderSummaryFields orderDetails={orderByIdPayload} />;
		//
		// const executionMessage = <ExecutionMessage fulfillmentState={fulfillmentStateWithoutProcessingMessages} />;
		//
		// const cancelOrderModal = <CancelOrderModal />;
		// expect(
		//     mountedComponent.containsAllMatchingElements([orderSummaryFields, executionMessage, cancelOrderModal]),
		//     "to be true",
		// );

		// expect(
		//     <TestWrapper stylesProvider muiThemeProvider={{theme}} provider={{store}}>
		//         <LoadingScreen/>
		//     </TestWrapper>,
		//     "when mounted",
		//     "to satisfy",
		//     <TestWrapper stylesProvider muiThemeProvider={{theme}} provider={{store}}>
		//         <Backdrop open={true}>
		//         </Backdrop>
		//     </TestWrapper>,
		// );
		//
		// await new Promise(resolve => setTimeout(resolve, 500));
		//
		// expect(
		//     <TestWrapper stylesProvider muiThemeProvider={{theme}} provider={{store}}>
		//         <LoadingScreen/>
		//     </TestWrapper>,
		//     "when mounted",
		//     "to satisfy",
		//     <TestWrapper stylesProvider muiThemeProvider={{theme}} provider={{store}}>
		//         <Backdrop open={true}>
		//             <CircularProgress/>
		//         </Backdrop>
		//     </TestWrapper>,
		// );
	});
});
