import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "../../Surfaces/Paper";
import PaperProps from "../../Surfaces/paperProps";
import TableInfoBar from "./TableInfoBar";

describe("TableInfoBar", () => {
	it("Renders properly", () => {
		const tableLabel = "322 orders";

		const component = <TableInfoBar tableLabel={tableLabel} />;

		const paperProps = new PaperProps();
		paperProps.set(PaperProps.propNames.square, true);

		const expectedPaperContent = (
			<Grid container alignItems="center">
				<Grid item xs={9} md={10} lg={11}>
					<Typography children={tableLabel} />
				</Grid>
			</Grid>
		);

		const expected = <Paper content={expectedPaperContent} paperProps={paperProps} />;

		expect(component, "when mounted", "to satisfy", expected);
	});
});
