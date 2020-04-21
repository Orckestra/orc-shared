import React from "react";
import Immutable from "immutable";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import FullPage from "./FullPage";
import { Wrapper, Item, List } from "./SegmentPage";

const View1 = () => <div id="view1" />;
const View2 = () => <div id="view2" />;

describe("Fullpage", () => {
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

	it("shows a page if no segments", () =>
		expect(
			<Provider store={store}>
				<MemoryRouter initialEntries={["/meep/snap"]}>
					<FullPage
						path="/meep/snap"
						config={{
							component: View1,
							pages: { "/stuff": { component: View2 } },
						}}
						location={{ location: true }}
						match={{ match: true }}
					/>
				</MemoryRouter>
			</Provider>,
			"when mounted",
			"to satisfy",
			<View1 />,
		));

	it("shows a page under a page", () =>
		expect(
			<Provider store={store}>
				<MemoryRouter initialEntries={["/meep/snap/stuff"]}>
					<FullPage
						path="/meep/snap"
						config={{
							component: View1,
							pages: { "/stuff": { component: View2 } },
						}}
						location={{ location: true }}
						match={{ match: true }}
					/>
				</MemoryRouter>
			</Provider>,
			"when mounted",
			"to satisfy",
			<View2 />,
		));

	it("shows a segment page if segments", () =>
		expect(
			<Provider store={store}>
				<MemoryRouter initialEntries={["/meep/snap"]}>
					<div>
						<FullPage
							path="/meep/snap"
							config={{
								component: View1,
								segments: { "/stuff": { component: View2, label: "Two" } },
							}}
							location={{ location: true }}
							match={{ match: true }}
						/>
					</div>
				</MemoryRouter>
			</Provider>,
			"when mounted",
			"to satisfy",
			<div>
				<View1 />
				<Wrapper>
					<MemoryRouter initialEntries={["/meep/snap/stuff"]}>
						<List>
							<Item to="/meep/snap/stuff">Two</Item>
						</List>
					</MemoryRouter>
					<View2 />
				</Wrapper>
			</div>,
		));
});
