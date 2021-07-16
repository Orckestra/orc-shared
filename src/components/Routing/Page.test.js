import React from "react";
import Immutable from "immutable";
import { MemoryRouter } from "react-router";
import Page from "./Page";
import ModalProps from "../MaterialUI/DataDisplay/modalProps";
import Button from "@material-ui/core/Button";
import { TestWrapper, createMuiTheme } from "../../utils/testUtils";
import { mount } from "unexpected-reaction";
import translations from "~/translations/en-US.json";

const View = () => <div id="view" />;
const Sub1 = () => <div id="sub1" />;
const Sub2 = () => <div id="sub2" />;

describe("Page", () => {
	let state, store;
	const modalProps = new ModalProps();

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
		state = Immutable.fromJS({
			navigation: { route: {} },
			requests: {
				logout: false,
			},
		});
		store = {
			subscribe: () => {},
			dispatch: () => {},
			getState: () => state,
		};
	});

	const theme = createMuiTheme();

	it("shows the page view when its path is matched", () =>
		expect(
			<TestWrapper provider={{ store }} intlProvider={intlProvider} stylesProvider muiThemeProvider={{ theme }}>
				<MemoryRouter initialEntries={["/nabble"]}>
					<Page
						component={View}
						path="/nabble"
						pages={{
							"/foo": { component: Sub1 },
							"/bar": { component: Sub2 },
						}}
					/>
				</MemoryRouter>
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper provider={{ store }} intlProvider={intlProvider} stylesProvider muiThemeProvider={{ theme }}>
				<View />
			</TestWrapper>,
		));

	it("shows nested page when its path is matched", () =>
		expect(
			<TestWrapper provider={{ store }} intlProvider={intlProvider} stylesProvider muiThemeProvider={{ theme }}>
				<MemoryRouter initialEntries={["/nabble/bar"]}>
					<Page
						component={View}
						path="/nabble"
						pages={{
							"/foo": { component: Sub1 },
							"/bar": { component: Sub2 },
						}}
					/>
				</MemoryRouter>
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper provider={{ store }} intlProvider={intlProvider} stylesProvider muiThemeProvider={{ theme }}>
				<Sub2 />
			</TestWrapper>,
		));

	it("renders both its own view as well as matched subpage", () => {
		const component = (
			<TestWrapper provider={{ store }} intlProvider={intlProvider} stylesProvider muiThemeProvider={{ theme }}>
				<div>
					<MemoryRouter initialEntries={["/nabble/bar"]}>
						<Page
							component={View}
							path="/nabble"
							subpages={{
								"/foo": { component: Sub1, title: "Item Details" },
								"/bar": { component: Sub2, title: "Item Details" },
							}}
						/>
					</MemoryRouter>
				</div>
			</TestWrapper>
		);

		const mountedComponent = mount(component);

		let expected = <div id="view"></div>;

		expect(mountedComponent, "to contain", expected);

		expected = <div id="sub2"></div>;
		expect(mountedComponent, "to contain", expected);
	});
});
