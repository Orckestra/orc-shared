import React from "react";
import Immutable from "immutable";
import FullPage from "./FullPage";
import SegmentPage from "./SegmentPage";
import { TestWrapper, createMuiTheme } from "./../../utils/testUtils";

const View1 = () => <div id="view1" />;
const View2 = () => <div id="view2" />;

describe("Fullpage", () => {
	let state, store;
	const match = {
		url: "/meep/snap/stuff",
		path: "/:scope/snap/stuff",
		params: { scope: "meep" },
	};
	const theme = createMuiTheme();

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
			<TestWrapper
				provider={{ store }}
				memoryRouter={{ initialEntries: ["/meep/snap"] }}
				stylesProvider
				muiThemeProvider={{ theme }}
			>
				<FullPage
					path="/meep/snap"
					config={{
						component: View1,
						pages: { "/stuff": { component: View2 } },
					}}
					location={{ location: true }}
					match={{ match: true }}
				/>
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<View1 />,
		));

	it("shows a page under a page", () =>
		expect(
			<TestWrapper
				provider={{ store }}
				memoryRouter={{ initialEntries: ["/meep/snap/stuff"] }}
				stylesProvider
				muiThemeProvider={{ theme }}
			>
				<FullPage
					path="/meep/snap"
					config={{
						component: View1,
						pages: { "/stuff": { component: View2 } },
					}}
					location={{ location: true }}
					match={{ match: true }}
				/>
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<View2 />,
		));

	it("does not show a page when not visible", () =>
		expect(
			<TestWrapper
				provider={{ store }}
				memoryRouter={{ initialEntries: ["/meep/snap/stuff"] }}
				stylesProvider
				muiThemeProvider={{ theme }}
			>
				<FullPage
					path="/meep/snap"
					config={{
						component: View1,
					}}
					isVisible={false}
					location={{ location: true }}
					match={{ match: true }}
				/>
			</TestWrapper>,
			"when mounted",
			"to be",
			null,
		));

	it("shows a segment page if segments", () => {
		const location = {
			pathname: "/meep/snap/stuff",
		};

		const segments = { "/stuff": { component: View2, label: "Two" } };

		expect(
			<TestWrapper
				provider={{ store }}
				memoryRouter={{ initialEntries: ["/meep/snap"] }}
				stylesProvider
				muiThemeProvider={{ theme }}
			>
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
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper
				provider={{ store }}
				memoryRouter={{ initialEntries: ["/meep/snap/stuff"] }}
				stylesProvider
				muiThemeProvider={{ theme }}
			>
				<div>
					<div id="view1"></div>
					<SegmentPage path="/:scope/snap" location={location} segments={segments} match={match} />
				</div>
			</TestWrapper>,
		);
	});

	it("entityIdResolver is passed to SegmentPage", () => {
		const location = {
			pathname: "/meep/snap/stuff",
		};

		const segments = { "/stuff": { component: View2, label: "Two" } };
		const customResolver = () => "customId";

		expect(
			<TestWrapper
				provider={{ store }}
				memoryRouter={{ initialEntries: ["/meep/snap"] }}
				stylesProvider
				muiThemeProvider={{ theme }}
			>
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
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper
				provider={{ store }}
				memoryRouter={{ initialEntries: ["/meep/snap"] }}
				stylesProvider
				muiThemeProvider={{ theme }}
			>
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
			</TestWrapper>,
		);
	});

	it("componentProps are passed to SegmentPage", () => {
		const location = {
			pathname: "/meep/snap/stuff",
		};

		const segments = { "/stuff": { component: View2, label: "Two" } };
		const customResolver = () => "customId";

		expect(
			<TestWrapper
				provider={{ store }}
				memoryRouter={{ initialEntries: ["/meep/snap"] }}
				stylesProvider
				muiThemeProvider={{ theme }}
			>
				<div>
					<FullPage
						path="/meep/snap"
						config={{
							component: View1,
							segments: segments,
							entityIdResolver: customResolver,
							componentProps: { foo: "foo", bar: "bar" },
						}}
						location={location}
						match={match}
					/>
				</div>
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper
				provider={{ store }}
				memoryRouter={{ initialEntries: ["/meep/snap"] }}
				stylesProvider
				muiThemeProvider={{ theme }}
			>
				<div>
					<div id="view1"></div>
					<SegmentPage
						path="/:scope/snap"
						location={location}
						segments={segments}
						match={match}
						componentProps={{ foo: "foo", bar: "bar" }}
						entityIdResolver={customResolver}
					/>
				</div>
			</TestWrapper>,
		);
	});
});
