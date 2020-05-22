import { createMuiTheme } from "@material-ui/core/styles";
import "typeface-open-sans";
import "typeface-roboto-condensed";

const theme = createMuiTheme({
	typography: {
		fontFamily: "Open Sans, sans-serif",
		header: {
			fontFamily: "Roboto Condensed, sans-serif",
		},
	},
});
