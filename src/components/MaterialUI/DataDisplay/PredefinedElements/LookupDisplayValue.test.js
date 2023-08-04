import React from "react";
import LookupDisplayValue from "./LookupDisplayValue";
import { createMuiTheme, TestWrapper } from "../../../../utils/testUtils";
import Immutable from "immutable";
import TooltippedTypography from "../TooltippedElements/TooltippedTypography";

const theme = createMuiTheme();

const metadataPayload = {
	metadata: {
		lookups: {
			order: {
				index: {
					OrderStatus: {
						lookupName: "OrderStatus",
						values: {
							Completed: {
								id: "03caa0ebecd04792a96c2f8df5b9b35a",
								value: "Completed",
								lookupId: "OrderStatus",
								displayName: {
									"en-US": "Completed",
								},
								sortOrder: 0,
								isActive: true,
								isSystem: true,
							},
							InProgress: {
								id: "13caa0ebecd04792a96c2f8df5b9b35a",
								value: "InProgress",
								lookupId: "InProgress",
								displayName: {
									"en-US": "In Progress",
								},
								sortOrder: 1,
								isActive: false,
								isSystem: true,
							},
						},
						displayName: {
							"en-US": "Order Status",
						},
						isActive: true,
						isSystem: true,
					},
				},
				list: [],
			},
		},
	},
};

describe("LookupDisplayValue", () => {
	let store, state;
	beforeEach(() => {
		state = Immutable.fromJS({
			locale: {
				locale: "en",
				supportedLocales: ["en", "fr"],
			},
			...metadataPayload,
		});
		store = {
			subscribe: () => {},
			getState: () => state,
			dispatch: () => {},
		};
	});

	it("Renders lookup value", () => {
		const component = (
			<TestWrapper provider={{ store }} memoryRouter stylesProvider muiThemeProvider={{ theme }}>
				<LookupDisplayValue moduleName="order" lookupName="OrderStatus" lookupKey="InProgress" />
			</TestWrapper>
		);

		const expected = (
			<TestWrapper provider={{ store }} memoryRouter stylesProvider muiThemeProvider={{ theme }}>
				<TooltippedTypography noWrap children={"In Progress"} titleValue={"In Progress"} />
			</TestWrapper>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});
});
