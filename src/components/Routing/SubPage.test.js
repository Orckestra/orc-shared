import React from "react";
import SubPage, { Backdrop, Dialog } from "./SubPage";

const InnerView = () => <div />;

describe("SubPage", () => {
	// < Shows as modal dialog over a page, does not open tab >
	it("shows overtop its parent", () =>
		// Subpage renders in an overlay, parent page renders underneath
		expect(
			<SubPage config={{ component: InnerView, set: true }} path="/foo/bar" />,
			"to render as",
			<React.Fragment>
				<Backdrop />
				<Dialog>
					<InnerView set={true} />
				</Dialog>
			</React.Fragment>,
		));
});
