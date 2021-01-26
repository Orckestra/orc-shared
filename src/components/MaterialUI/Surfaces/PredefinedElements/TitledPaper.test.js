import React from "react";
import Paper from "../Paper";
import SectionTitle from "../../DataDisplay/PredefinedElements/SectionTitle";
import TitledPaper from "./TitledPaper";
import { shallow } from "enzyme";

describe("Titled Paper", () => {
	it("Renders titled paper with passed title and content", () => {
		const title = "Hello";

		const content = (
			<div>
				<p>Hello</p>
			</div>
		);

		const titledPaper = <TitledPaper content={content} title={title} />;

		const mountedTitledPaper = shallow(titledPaper);

		const expected = (
			<div>
				<SectionTitle title={title} />
				<Paper content={content} />
			</div>
		);

		expect(mountedTitledPaper.containsMatchingElement(expected), "to be true");
	});
});
