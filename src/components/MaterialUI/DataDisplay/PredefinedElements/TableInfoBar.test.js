import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "../../Surfaces/Paper";
import PaperProps from "../../Surfaces/paperProps";
import TableInfoBar from "./TableInfoBar";

describe("TableInfoBar", () => {
	it("Renders properly", () => {
		const rowsCount = 1206;
		const tableName = "someItems";

		const expectedContent = (
			<Grid container alignItems="center">
				<Grid item xs={9} md={10} lg={11}>
					<Typography children={`${rowsCount} ${tableName}`} />
				</Grid>
			</Grid>
		);

		const paperProps = new PaperProps();
		paperProps.set(PaperProps.propNames.square, true);

		expect(
			<TableInfoBar rowsCount={rowsCount} tableName={tableName} />,
			"when mounted",
			"to satisfy",
			<Paper content={expectedContent} paperProps={paperProps} />,
		);
	});
});
