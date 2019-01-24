import React from "react";
import FullPage from "./FullPage";
import Page from "./Page";
import SegmentPage from "./SegmentPage";

const View1 = () => <div />;
const View2 = () => <div />;

describe("Fullpage", () => {
	// fullpage:
	// page
	it("shows a page if no segments", () =>
		expect(
			<FullPage
				path="/meep/snap"
				config={{ component: View1, pages: { "/stuff": { component: View2 } } }}
			/>,
			"to render as",
			<Page
				path="/meep/snap"
				component={View1}
				pages={{ "/stuff": { component: View2 } }}
			/>,
		));

	// segpage
	it("shows a segment page if segments", () =>
		expect(
			<FullPage
				path="/meep/snap"
				config={{
					component: View1,
					segments: { "/stuff": { component: View2 } },
				}}
			/>,
			"to render as",
			<SegmentPage
				path="/meep/snap"
				component={View1}
				segments={{ "/stuff": { component: View2 } }}
			/>,
		));
});
