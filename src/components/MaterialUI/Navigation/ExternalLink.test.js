import React from "react";
import Link from "@mui/material/Link";
import Icon from "../DataDisplay/Icon";
import ExternalLink from "./ExternalLink";

describe("ExternalLink", () => {
	it("render ExternalLink without errors", () => {
		const children = <div>a div element</div>;

		expect(
			<ExternalLink id="an_Id" url="https://www.npmjs.com/package/orc-shared" children={children} />,
			"when mounted",
			"to satisfy",
			<Link
				id="an_Id"
				href="https://www.npmjs.com/package/orc-shared"
				rel="noreferrer"
				target="_blank"
				underline="always"
			>
				{children}
				<div>
					<Icon id="open-in-new-tab" />
				</div>
			</Link>,
		);
	});
});
