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
import { TestWrapper, createMuiTheme } from "../../utils/testUtils";
import sharedMessages from "../../sharedMessages";
import UrlPattern from "url-pattern";

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
									parentUrlPattern={new UrlPattern("/foo")}
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
									parentUrlPattern={new UrlPattern("/foo")}
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
									parentUrlPattern={new UrlPattern("/foo")}
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
	it("closing the dialog navigate to the parentUrlPattern with parameters", () => {
		history = createMemoryHistory({ initialEntries: ["/foo/bar/123/456"] });
		sinon.spy(history, "push");
		history.push.named("history.push");
		dispatch.resetHistory();

		const component = (
			<TestWrapper provider={{ store }} intlProvider={intlProvider} stylesProvider muiThemeProvider={{ theme }}>
				<div>
					<div id="outer" />
					<Router history={history}>
						<Route
							path="/foo/bar/:parentId/:id"
							render={route => (
								<SubPage
									config={{ component: InnerView, set: true, title: "Item Details" }}
									root="/foo/bar/:parentId/:id"
									path="/foo/bar/123/456"
									parentUrlPattern={new UrlPattern("/foo/bar/:parentId")}
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
		expect(history.push, "to have calls satisfying", [{ args: ["/foo/bar/123"] }]);
		expect(dispatch, "to have a call satisfying", { args: [mapHref("/foo/bar/123", "/foo/bar/123")] });
	});

	it("renders action panel passed from props", () => {
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
									parentUrlPattern={new UrlPattern("/foo")}
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

		closeButton.invoke("onClick")();

		expect(applyButton, "not to be", null);
		expect(history.push, "to have calls satisfying", [{ args: ["/foo"] }]);
		expect(dispatch, "to have calls satisfying", [{ args: [mapHref("/foo", "/foo")] }]);
	});

	it("Executes handler from button received from props", () => {
		const someEvent = sinon.spy().named("someEvent");

		const actions = () => [{ label: sharedMessages.applyChanges, isPrimary: true, handler: someEvent }];

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
									parentUrlPattern={new UrlPattern("/foo")}
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

		applyButton.invoke("onClick")();

		const applyButtonClassName = applyButton.props().className;
		expect(applyButtonClassName, "to contain", "MuiButton-contained");
		expect(applyButtonClassName, "to contain", "MuiButton-containedPrimary");
		expect(someEvent, "was called");
	});

	it("Do not close when clicking action button has validateBeforeClose and result is false", () => {
		const applyHandler = () => false;

		const actions = () => [
			{ label: sharedMessages.applyChanges, isPrimary: true, handler: applyHandler, validateBeforeClose: true },
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
									parentUrlPattern={new UrlPattern("/foo")}
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

		applyButton.invoke("onClick")();
		expect(history.push, "not to have calls satisfying", [{ args: ["/foo"] }]);
		expect(dispatch, "not to have calls satisfying", [{ args: [mapHref("/foo", "/foo")] }]);
	});

	it("Close when clicking action button has validateBeforeClose and result is true", () => {
		const applyHandler = () => true;

		const actions = () => [
			{ label: sharedMessages.applyChanges, isPrimary: true, handler: applyHandler, validateBeforeClose: true },
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
									parentUrlPattern={new UrlPattern("/foo")}
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

		applyButton.invoke("onClick")();
		expect(history.push, "to have calls satisfying", [{ args: ["/foo"] }]);
		expect(dispatch, "to have calls satisfying", [{ args: [mapHref("/foo", "/foo")] }]);
	});

	it("Close when clicking action button has validateBeforeClose and result as promise with true", () => {
		const applyHandler = () => Promise.resolve(true);

		const actions = () => [
			{ label: sharedMessages.applyChanges, isPrimary: true, handler: applyHandler, validateBeforeClose: true },
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
									parentUrlPattern={new UrlPattern("/foo")}
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

		applyButton.invoke("onClick")();
		setTimeout(() => {
			expect(history.push, "to have calls satisfying", [{ args: ["/foo"] }]);
			expect(dispatch, "to have calls satisfying", [{ args: [mapHref("/foo", "/foo")] }]);
		}, 200);
	});

	it("Do not Close when clicking action button has validateBeforeClose and result as promise with false", () => {
		const applyHandler = () => Promise.resolve(false);

		const actions = () => [
			{ label: sharedMessages.applyChanges, isPrimary: true, handler: applyHandler, validateBeforeClose: true },
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
									parentUrlPattern={new UrlPattern("/foo")}
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

		applyButton.invoke("onClick")();
		setTimeout(() => {
			expect(history.push, "not to have calls satisfying", [{ args: ["/foo"] }]);
			expect(dispatch, "not to have calls satisfying", [{ args: [mapHref("/foo", "/foo")] }]);
		}, 200);
	});
});
