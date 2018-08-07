import React from "react";
import Text from "../../Text";
import {
	CenterWrapper,
	ReadOnlyBlock,
	ReadOnly,
	Label,
	LineLabel,
} from "./ReadOnly";

describe("ReadOnly", () => {
	it("renders a read-only value in a form", () =>
		expect(
			<ReadOnly
				value={{ id: "test.readOnlyValue", defaultMessage: "Read Only" }}
			/>,
			"to render as",
			<CenterWrapper>
				<ReadOnlyBlock>
					<Text
						message={{ id: "test.readOnlyValue", defaultMessage: "Read Only" }}
					/>
				</ReadOnlyBlock>
			</CenterWrapper>,
		));
});

describe("LineLabel", () => {
	it("renders a text in large font", () =>
		expect(
			<LineLabel value="A text value" />,
			"to render as",
			<CenterWrapper>
				<Label>
					<Text message="A text value" />
				</Label>
			</CenterWrapper>,
		));
});
