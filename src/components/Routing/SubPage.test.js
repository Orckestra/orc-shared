import React from "react";
import { Router, Route } from "react-router-dom";
import { createMemoryHistory } from "history";
import Immutable from "immutable";
import sinon from "sinon";
import { mount } from "enzyme";
import { PropStruct } from "../../utils/testUtils";
import { mapHref } from "../../actions/navigation";
import SubPage from "./SubPage";
import Modal from "../MaterialUI/DataDisplay/Modal";
import ModalProps from "../MaterialUI/DataDisplay/modalProps";
import Button from "@material-ui/core/Button";
import translations from "~/translations/en-US.json";
import { act } from "unexpected-reaction";
import { TestWrapper, createMuiTheme } from "../../utils/testUtils";
import sharedMessages from "../../sharedMessages";

const InnerView = ({ theme, pathname, search, mapFrom, match, location, routeIsAligned, set }) => (
	<PropStruct
		{...{
			theme,
			pathname,
			search,
			mapFrom,
			match,
			location,
			routeIsAligned,
			set,
		}}
	/>
);

describe("SubPage", () => {
	let history, dispatch, state, store, theme;

	//theme = createMuiTheme();
	let modalProps = new ModalProps();

	const intlProvider = { messages: translations };
	modalProps.set(ModalProps.propNames.open, true);
	modalProps.set(ModalProps.propNames.type, "fullwidth");

	const actionPanel = (
		<div>
			<Button variant="contained" color="primary" disableElevation>
				Close
			</Button>
		</div>
	);
	const titleComponent = "Item Details";

	modalProps.set(ModalProps.propNames.actionPanel, actionPanel);
	modalProps.set(ModalProps.propNames.title, titleComponent);

	beforeEach(() => {
		history = createMemoryHistory({ initialEntries: ["/foo/bar"] });
		sinon.spy(history, "push");
		history.push.named("history.push");
		dispatch = sinon.spy().named("dispatch");
		theme = createMuiTheme();
		state = Immutable.fromJS({
			navigation: {
				route: {
					match: { path: "/foo/bar", url: "/foo/bar", params: {} },
				},
			},
			requests: {
				logout: false,
			},
			foo: true,
			bar: false,
		});
		store = {
			getState: () => state,
			dispatch: dispatch,
			subscribe: () => {},
		};
	});
	afterAll(() => {
		history.push.restore();
	});

	it("shows a dialog containing the configured view", () =>
		expect(
			<TestWrapper provider={{ store }} intlProvider={intlProvider} stylesProvider muiThemeProvider={{ theme }}>
				<div>
					<div id="outer" />
					<Router history={history}>
						<Route
							path="/foo/bar"
							render={route => (
								<SubPage
									config={{ component: InnerView, set: true, title: "Item Details" }}
									root="/foo"
									path="/foo/bar"
									{...route}
								/>
							)}
						/>
					</Router>
				</div>
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper provider={{ store }} intlProvider={intlProvider} stylesProvider muiThemeProvider={{ theme }}>
				<div>
					<div id="outer" />
					<Modal
						message={
							<InnerView
								set={true}
								mapFrom="/foo"
								match={{
									isExact: true,
									path: "/foo/bar",
									url: "/foo/bar",
									params: {},
								}}
								location={{
									hash: "",
									pathname: "/foo/bar",
									search: "",
								}}
							/>
						}
						modalProps={modalProps}
					/>
				</div>
			</TestWrapper>,
		));
	it("rendrers correctly when using localized text", () =>
		expect(
			<TestWrapper provider={{ store }} intlProvider={intlProvider} stylesProvider muiThemeProvider={{ theme }}>
				<div>
					<div id="outer" />
					<Router history={history}>
						<Route
							path="/foo/bar"
							render={route => (
								<SubPage
									config={{ component: InnerView, set: true, title: sharedMessages.confirmation }}
									root="/foo"
									path="/foo/bar"
									{...route}
								/>
							)}
						/>
					</Router>
				</div>
			</TestWrapper>,
			"when mounted",
			"to contain",
			<div className="makeStyles-title">Confirmation</div>,
		));
	it("closes when clicking close button", () => {
		const component = (
			<TestWrapper provider={{ store }} intlProvider={intlProvider} stylesProvider muiThemeProvider={{ theme }}>
				<div>
					<div id="outer" />
					<Router history={history}>
						<Route
							path="/foo/bar"
							render={route => (
								<SubPage
									config={{ component: InnerView, set: true, title: "Item Details" }}
									root="/foo"
									path="/foo/bar"
									{...route}
								/>
							)}
						/>
					</Router>
				</div>
			</TestWrapper>
		);
		const mountedComponent = mount(component);

		const closeButton = mountedComponent.find("button").at(0);

		closeButton.invoke("onClick")();
		expect(history.push, "to have calls satisfying", [{ args: ["/foo"] }]);
		expect(dispatch, "to have calls satisfying", [{ args: [mapHref("/foo", "/foo")] }]);
	});

	it("renders action panel passed from props", () => {
		const clock = sinon.useFakeTimers();

		const actions = () => [{ label: sharedMessages.cancel }, { label: sharedMessages.applyChanges }];

		const component = (
			<TestWrapper provider={{ store }} intlProvider={intlProvider} stylesProvider muiThemeProvider={{ theme }}>
				<div>
					<div id="outer" />
					<Router history={history}>
						<Route
							path="/foo/bar"
							render={route => (
								<SubPage
									config={{
										component: InnerView,
										set: true,
										title: "Item Details",
										componentProps: { actionPanel: actions },
									}}
									root="/foo"
									path="/foo/bar"
									{...route}
								/>
							)}
						/>
					</Router>
				</div>
			</TestWrapper>
		);
		const mountedComponent = mount(component);

		const closeButton = mountedComponent.find("button").at(0);
		const applyButton = mountedComponent.find("button").at(1);

		closeButton.invoke("onMouseDown")();

		act(() => {
			clock.tick(500); // Wait for the setTimeout inside the onMouseDown event to execute
		});

		expect(applyButton, "not to be", null);
		expect(history.push, "to have calls satisfying", [{ args: ["/foo"] }]);
		expect(dispatch, "to have calls satisfying", [{ args: [mapHref("/foo", "/foo")] }]);
	});

	it("Executes handler from button received from props", () => {
		const someEvent = sinon.spy().named("someEvent");
		const clock = sinon.useFakeTimers();

		const actions = () => [
			{ label: sharedMessages.applyChanges, isPrimary: true, handler: someEvent, timeoutDelay: 500 },
		];

		const component = (
			<TestWrapper provider={{ store }} intlProvider={intlProvider} stylesProvider muiThemeProvider={{ theme }}>
				<div>
					<div id="outer" />
					<Router history={history}>
						<Route
							path="/foo/bar"
							render={route => (
								<SubPage
									config={{
										component: InnerView,
										set: true,
										title: "Item Details",
										componentProps: { actionPanel: actions },
									}}
									root="/foo"
									path="/foo/bar"
									{...route}
								/>
							)}
						/>
					</Router>
				</div>
			</TestWrapper>
		);
		const mountedComponent = mount(component);

		const applyButton = mountedComponent.find("button").at(0);

		applyButton.invoke("onMouseDown")();

		act(() => {
			clock.tick(500); // Wait for the setTimeout inside the onMouseDown event to execute
		});

		const applyButtonClassName = applyButton.props().className;
		expect(applyButtonClassName, "to contain", "MuiButton-contained");
		expect(applyButtonClassName, "to contain", "MuiButton-containedPrimary");
		expect(someEvent, "was called");
	});
});
