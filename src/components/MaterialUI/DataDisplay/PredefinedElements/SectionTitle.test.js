import React from "react";
import { shallow } from "enzyme";
import SectionTitle from "./SectionTitle";
import Typography from "@material-ui/core/Typography";

describe("SectionTitle", () => {
	it("Renders section title with passed value", () => {
		const value = "Title";

		const sectionTitle = <SectionTitle title={value} />;

		const mountedComponent = shallow(sectionTitle);

		const expected = <Typography children={value} />;

		expect(mountedComponent.containsMatchingElement(expected), "to be true");
	});
});
