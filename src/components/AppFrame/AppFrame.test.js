import React from "react";
import ReactDOM from "react-dom";
import Immutable from "immutable";
import { Provider } from "react-redux";
import Scope from "../Scope";
import FullAppFrame, { Base, ViewPort, AppFrame } from "./index";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";

class ClassAppFrame extends React.Component {
	render() {
		const { store, ...props } = this.props;
		return (
			<Provider store={store}>
				<FullAppFrame {...props} />
			</Provider>
		);
	}
}

const TestComp1 = () => <div />;
const TestComp2 = () => <div />;
const TestComp3 = () => <div />;

describe("AppFrame", () => {
	let props, toggle, reset;
	beforeEach(() => {
		props = {
			applications: [{ src: "/", label: "This", id: "current" }],
			applicationId: "current",
			modules: [],
			menuLabel: "TestLabel",
			menuItems: [],
			linkHOC: x => x,
			ConnectedScope: Scope,
		};

		toggle = () => {};
		reset = () => {};
	});

	it("renders a viewport, top bar and sidebar", () => {
		props.modules = [
			{ id: "test1", component: TestComp1, route: "/test1" },
			{ id: "test2", component: TestComp2, route: "/test2" },
			{ id: "test3", component: TestComp3, route: "/test3" },
		];
		props.children = [
			<TestComp1 key="1" />,
			<TestComp2 key="2" />,
			<TestComp3 key="3" />,
		];
		return expect(
			<AppFrame {...props} {...{ toggle, reset }} />,
			"to render as",
			<Base>
				<Topbar
					linkHOC={props.linkHOC}
					applications={props.applications}
					applicationId={props.applicationId}
					menuLabel={props.menuLabel}
					menuItems={props.menuItems}
				/>
				<Sidebar linkHOC={props.linkHOC} modules={props.modules} />
				<ViewPort>
					<Scope>
						<TestComp1 key="1" />
						<TestComp2 key="2" />
						<TestComp3 key="3" />
					</Scope>
				</ViewPort>
			</Base>,
		);
	});

	it("propagates open flag, toggle and reset functions", () =>
		expect(
			<AppFrame open {...props} />,
			"to render as",
			<Base>
				<Topbar onClick={expect.it("to be", props.reset)} />
				<Sidebar open toggle={expect.it("to be", props.toggle)} />
				<ViewPort open onClick={expect.it("to be", props.reset)} />
			</Base>,
		));

	describe("with state handling", () => {
		let store, outerProps, appRoot, modalRoot;
		beforeEach(() => {
			store = {
				subscribe: () => {},
				dispatch: () => {},
				getState: () =>
					Immutable.fromJS({
						router: {
							params: { scope: "foo" },
						},
					}),
			};
			const { ConnectedScope, ...remainder } = props;
			outerProps = { store, scopeHOC: x => x, ...remainder };
			appRoot = document.createElement("div");
			appRoot.id = "app";
			document.body.appendChild(appRoot);
			modalRoot = document.createElement("div");
			modalRoot.id = "modal";
			document.body.appendChild(modalRoot);
		});
		afterEach(() => {
			try {
				ReactDOM.unmountComponentAtNode(appRoot);
			} catch (_) {}
			document.body.removeChild(appRoot);
			document.body.removeChild(modalRoot);
		});

		it("adds toggleable and resettable open flag", () => {
			const render = ReactDOM.render(
				<ClassAppFrame {...outerProps} />,
				appRoot,
			);
			return expect(
				render,
				"to have rendered",
				<AppFrame
					{...props}
					open={false}
					toggle={expect.it("to be a function")}
					reset={expect.it("to be a function")}
				/>,
			);
		});
	});

	describe("global styles", () => {
		it("ensures required styling on html element to make IE11 happy", () =>
			// render any component from AppFrame.js to ensure jsdom has styles injected
			expect(<Base />, "when deeply rendered").then(() =>
				expect(
					"html",
					"as a selector to have style rules",
					"to match",
					/html\s*\{\s*height: 100%;\s*\}/,
				),
			));

		it("ensures required body styling", () =>
			// render any component from AppFrame.js to ensure jsdom has styles injected
			expect(<Base />, "when deeply rendered").then(() =>
				expect(
					"body",
					"as a selector to have style rules",
					"to match",
					/body\s*\{\s*height: 100%;\s*margin: 0;\s*overflow: hidden;\s*\}/,
				),
			));

		it("ensures required viewport styling", () =>
			// render any component from AppFrame.js to ensure jsdom has styles injected
			expect(<Base />, "when deeply rendered").then(() =>
				expect(
					"#app",
					"as a selector to have style rules",
					"to match",
					/#app\s*\{\s*height: 100%;\s*\}/,
				),
			));
	});
});

describe("ViewPort", () => {
	it("does not translate when closed", () =>
		expect(
			<ViewPort />,
			"to render style rules",
			"not to contain",
			"translateX",
		));

	it("translates to the side when open", () =>
		expect(
			<ViewPort open />,
			"to render style rules",
			"to contain",
			"transform: translateX(150px);",
		));
});
