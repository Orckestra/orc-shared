import React from "react";
import InformationItem from "./MaterialUI/DataDisplay/PredefinedElements/InformationItem";
import sharedMessages from "~/sharedMessages";
import Box from "@material-ui/core/Box";
import Registry from "./Registry";
import { TestWrapper, createMuiTheme, extractMessages } from "../utils/testUtils";

const messages = extractMessages(sharedMessages);
const theme = createMuiTheme();

describe("Registry", () => {
	it("Renders Registry correctly", () => {
		const created = "2020-10-06T16:21:55.5700000Z";
		const createdBy = "Somebody";
		const lastModified = "2020-10-06T16:21:55.5700000Z";
		const lastModifiedBy = "OOE@oco";

		const component = (
			<TestWrapper intlProvider={{ messages }} stylesProvider muiThemeProvider={{ theme }}>
				<Registry
					dateCreated={created}
					createdBy={createdBy}
					lastModifiedDate={lastModified}
					lastModifiedBy={lastModifiedBy}
				/>
			</TestWrapper>
		);

		const expected = (
			<TestWrapper intlProvider={{ messages }} stylesProvider muiThemeProvider={{ theme }}>
				<Box display="flex" flexDirection="column">
					<InformationItem label={sharedMessages.created} children="10/6/2020" />
					<InformationItem label={sharedMessages.createdBy} children={createdBy} />
					<InformationItem label={sharedMessages.lastModified} children="10/6/2020" />
					<InformationItem label={sharedMessages.lastModifiedBy} children={lastModifiedBy} />
				</Box>
			</TestWrapper>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Renders Registry correctly with additional content", () => {
		const created = "2020-10-06T16:21:55.5700000Z";
		const createdBy = "Somebody";
		const lastModified = "2020-10-06T16:21:55.5700000Z";
		const lastModifiedBy = "OOE@oco";

		const component = (
			<TestWrapper intlProvider={{ messages }} stylesProvider muiThemeProvider={{ theme }}>
				<Registry
					dateCreated={created}
					createdBy={createdBy}
					lastModifiedDate={lastModified}
					lastModifiedBy={lastModifiedBy}
					additionalContent={[
						{
							label: sharedMessages.about,
							content: "some date",
						},
						{
							label: sharedMessages.help,
							content: "Hugh Mann",
						},
					]}
				/>
			</TestWrapper>
		);

		const expected = (
			<TestWrapper intlProvider={{ messages }} stylesProvider muiThemeProvider={{ theme }}>
				<Box display="flex" flexDirection="column">
					<InformationItem label={sharedMessages.created} children="10/6/2020" />
					<InformationItem label={sharedMessages.createdBy} children={createdBy} />
					<InformationItem label={sharedMessages.lastModified} children="10/6/2020" />
					<InformationItem label={sharedMessages.lastModifiedBy} children={lastModifiedBy} />
					<InformationItem label={sharedMessages.about} children={"some date"} />
					<InformationItem label={sharedMessages.help} children={"Hugh Mann"} />
				</Box>
			</TestWrapper>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});
});
