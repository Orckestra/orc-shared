import React from "react";
import Immutable from "immutable";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import Page from "./Page";
import { Backdrop, Dialog } from "./SubPage";
import { Bar, toolComponents } from "../Toolbar";

const { button: ToolbarButton, separator: ToolbarSeparator } = toolComponents;

const View = () => <div id="view" />;
const Sub1 = () => <div id="sub1" />;
const Sub2 = () => <div id="sub2" />;

describe("Page", () => {
	let state, store;
	beforeEach(() => {
		state = Immutable.fromJS({
			navigation: { route: {} },
		});
		store = {
			subscribe: () => {},
			dispatch: () => {},
			getState: () => state,
		};
	});

	it("shows the page view when its path is matched", () =>
		expect(
			<Provider store={store}>
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
			</Provider>,
			"when mounted",
			"to satisfy",
			<View />,
		));

	it("shows nested page when its path is matched", () =>
		expect(
			<Provider store={store}>
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
			</Provider>,
			"when mounted",
			"to satisfy",
			<Sub2 />,
		));

	it("renders both its own view as well as matched subpage", () =>
		expect(
			<div>
				<Provider store={store}>
					<MemoryRouter initialEntries={["/nabble/bar"]}>
						<Page
							component={View}
							path="/nabble"
							subpages={{
								"/foo": { component: Sub1 },
								"/bar": { component: Sub2 },
							}}
						/>
					</MemoryRouter>
				</Provider>
			</div>,
			"when mounted",
			"to satisfy",
			<div>
				<View />
				<Backdrop />
				<Dialog>
					<Bar>
						<ToolbarButton label={{ icon: "arrow-left" }} />
						<ToolbarSeparator />
					</Bar>
					<Sub2 />
				</Dialog>
			</div>,
		));
});
