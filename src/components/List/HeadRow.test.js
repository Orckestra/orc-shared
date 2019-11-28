import React from "react";
import HeadRow, { HeadTableRow } from "./HeadRow";
import HeadCell from "./HeadCell";

describe("HeadRow", () => {
	it("renders a row of headers, one for each defined column", () => {
		const columnDefs = [
			{ fieldName: "a" },
			{ fieldName: "b" },
			{ fieldName: "c" },
		];
		return expect(
			<HeadRow columnDefs={columnDefs} allSelected={false} />,
			"when mounted",
			"to satisfy",
			<HeadTableRow>
				<HeadCell key="a" columnDef={columnDefs[0]} allSelected={false} />
				<HeadCell key="b" columnDef={columnDefs[1]} allSelected={false} />
				<HeadCell key="c" columnDef={columnDefs[2]} allSelected={false} />
			</HeadTableRow>,
		);
	});
});
