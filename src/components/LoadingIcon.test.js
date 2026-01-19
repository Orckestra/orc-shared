import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import LoadingIcon from "./LoadingIcon";
import { createMuiTheme, TestWrapper } from "../utils/testUtils";

const theme = createMuiTheme();

describe("LoadingIcon", () => {
	it("shows a spinning load icon", () =>
		expect(
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<LoadingIcon />
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<div>
					<CircularProgress size={100} color="inherit" />
				</div>
			</TestWrapper>,
		));
});
