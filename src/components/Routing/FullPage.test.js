import React from "react";
import Immutable from "immutable";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import FullPage from "./FullPage";
import SegmentPage from "./SegmentPage";

const View1 = () => <div id="view1" />;
const View2 = () => <div id="view2" />;

describe("Fullpage", () => {
	let state, store;
	const match = {
		url: "/meep/snap/stuff",
		path: "/:scope/snap/stuff",
		params: { scope: "meep" },
	};

	beforeEach(() => {
		state = Immutable.fromJS({
			view: {
				edit: {
					snap: {},
				},
			},
			requests: {
				logout: false,
			},
			navigation: {
				route: {
					match: match,
				},
				config: { prependPath: "/:scope/", prependHref: "/meep/" },
			},
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

	it("shows a segment page if segments", () => {
		const location = {
			pathname: "/meep/snap/stuff",
		};

		const segments = { "/stuff": { component: View2, label: "Two" } };

		expect(
			<Provider store={store}>
				<MemoryRouter initialEntries={["/meep/snap"]}>
					<div>
						<FullPage
							path="/meep/snap"
							config={{
								component: View1,
								segments: segments,
							}}
							location={location}
							match={match}
						/>
					</div>
				</MemoryRouter>
			</Provider>,
			"when mounted",
			"to satisfy",
			<Provider store={store}>
				<MemoryRouter initialEntries={["/meep/snap/stuff"]}>
					<div>
						<div id="view1"></div>
						<SegmentPage path="/:scope/snap" location={location} segments={segments} match={match} />
					</div>
				</MemoryRouter>
			</Provider>,
		);
	});

	it("entityIdResolver is passed to SegmentPage", () => {
		const location = {
			pathname: "/meep/snap/stuff",
		};

		const segments = { "/stuff": { component: View2, label: "Two" } };
		const customResolver = () => "customId";

		expect(
			<Provider store={store}>
				<MemoryRouter initialEntries={["/meep/snap"]}>
					<div>
						<FullPage
							path="/meep/snap"
							config={{
								component: View1,
								segments: segments,
								entityIdResolver: customResolver,
							}}
							location={location}
							match={match}
						/>
					</div>
				</MemoryRouter>
			</Provider>,
			"when mounted",
			"to satisfy",
			<Provider store={store}>
				<MemoryRouter initialEntries={["/meep/snap/stuff"]}>
					<div>
						<div id="view1"></div>
						<SegmentPage
							path="/:scope/snap"
							location={location}
							segments={segments}
							match={match}
							entityIdResolver={customResolver}
						/>
					</div>
				</MemoryRouter>
			</Provider>,
		);
	});
});
