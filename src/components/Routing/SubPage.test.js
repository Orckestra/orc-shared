import React from "react";
import Toolbar from "../Toolbar";
import { SubPage, Backdrop, Dialog } from "./SubPage";
import withWaypointing from "./withWaypointing";

const InnerView = () => <div />;
const WrappedView = withWaypointing(InnerView);

describe("SubPage", () => {
	it("shows overtop its parent", () =>
		expect(
			<SubPage
				config={{ component: InnerView, set: true }}
				root="/foo"
				path="/foo/bar"
				match={{ params: {} }}
			/>,
			"to render as",
			<React.Fragment>
				<Backdrop />
				<Dialog>
					<Toolbar
						tools={[
							{
								type: "button",
								key: "subPage_goBack",
								label: { icon: "arrow-left" },
								onClick: expect.it("to be a function"),
							},
							{ type: "separator", key: "subpage_sep_nav" },
						]}
					/>
					<WrappedView set={true} />
				</Dialog>
			</React.Fragment>,
		));
});
