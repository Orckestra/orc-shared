import React from "react";
import GlobalErrorMessagesModal from "./GlobalErrorMessages";
import { createMuiTheme, extractMessages, TestWrapper } from "../../../../utils/testUtils";
import Immutable from "immutable";
import ActionModal from "./ActionModal";
import sharedMessages from "../../../../sharedMessages";
import LookupDisplayValue from "./LookupDisplayValue";
import Grid from "@material-ui/core/Grid";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { popGlobalErrorMessage } from "../../../../actions/globalErrorMessages";
import sinon from "sinon";
import { render } from "@testing-library/react";
import { getByText, fireEvent } from "@testing-library/react";

const theme = createMuiTheme();
const messages = extractMessages(sharedMessages);

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

describe("GlobalErrorMessagesModal", () => {
	let store, state, dispatch;
	beforeEach(() => {
		state = Immutable.fromJS({
			locale: {
				locale: "en",
				supportedLocales: ["en", "fr"],
			},
			globalErrorMessages: {
				dialog: {
					errorMessages: [],
				},
			},
			...metadataPayload,
		});

		dispatch = sinon.spy().named("dispatch");

		store = {
			subscribe: () => {},
			getState: () => state,
			dispatch: dispatch,
		};
	});

	const errorMessages = [
		{
			title: "ze title",
			description: "desc",
			messages: [
				{ message: "error msg" },
				{ lookupModule: "order", lookupName: "OrderStatus", lookupKey: "InProgress" },
			],
		},
	];
	const expectedMessagesContent = (
		<Grid item xs={12}>
			<List>
				<ListItem key={0}>
					<ListItemIcon>●</ListItemIcon>
					<ListItemText>error msg</ListItemText>
				</ListItem>
				<ListItem key={1}>
					<ListItemIcon>●</ListItemIcon>
					<ListItemText>
						<LookupDisplayValue moduleName="order" lookupName="OrderStatus" lookupKey="InProgress" />
					</ListItemText>
				</ListItem>
			</List>
		</Grid>
	);

	it("Renders no dialog because state contains no messages", () => {
		const component = (
			<TestWrapper
				provider={{ store }}
				intlProvider={{ messages }}
				memoryRouter
				stylesProvider
				muiThemeProvider={{ theme }}
			>
				<GlobalErrorMessagesModal>
					<div>children</div>
				</GlobalErrorMessagesModal>
			</TestWrapper>
		);

		const expected = (
			<TestWrapper
				provider={{ store }}
				intlProvider={{ messages }}
				memoryRouter
				stylesProvider
				muiThemeProvider={{ theme }}
			>
				<div>children</div>
			</TestWrapper>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Renders dialog with messages", () => {
		state = state.setIn(["globalErrorMessages", "dialog", "errorMessages"], Immutable.fromJS(errorMessages));

		const component = (
			<TestWrapper
				provider={{ store }}
				intlProvider={{ messages }}
				memoryRouter
				stylesProvider
				muiThemeProvider={{ theme }}
			>
				<div>
					<GlobalErrorMessagesModal>
						<div>children</div>
					</GlobalErrorMessagesModal>
				</div>
			</TestWrapper>
		);

		const content = (
			<Grid container spacing={2}>
				<Grid container item spacing={0}>
					<Grid item xs={12}>
						desc
					</Grid>
					{expectedMessagesContent}
				</Grid>
			</Grid>
		);

		const expected = (
			<TestWrapper
				provider={{ store }}
				intlProvider={{ messages }}
				memoryRouter
				stylesProvider
				muiThemeProvider={{ theme }}
			>
				<div>
					<div>children</div>
					<ActionModal
						title={"ze title"}
						message={content}
						open={true}
						actions={[{ label: sharedMessages.close, isPrimary: true }]}
					/>
				</div>
			</TestWrapper>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Renders dialog with messages with default title", () => {
		state = state.setIn(
			["globalErrorMessages", "dialog", "errorMessages"],
			Immutable.fromJS([{ ...errorMessages[0], title: null }]),
		);

		const component = (
			<TestWrapper
				provider={{ store }}
				intlProvider={{ messages }}
				memoryRouter
				stylesProvider
				muiThemeProvider={{ theme }}
			>
				<div>
					<GlobalErrorMessagesModal>
						<div>children</div>
					</GlobalErrorMessagesModal>
				</div>
			</TestWrapper>
		);

		const content = (
			<Grid container spacing={2}>
				<Grid container item spacing={0}>
					<Grid item xs={12}>
						desc
					</Grid>
					{expectedMessagesContent}
				</Grid>
			</Grid>
		);

		const expected = (
			<TestWrapper
				provider={{ store }}
				intlProvider={{ messages }}
				memoryRouter
				stylesProvider
				muiThemeProvider={{ theme }}
			>
				<div>
					<div>children</div>
					<ActionModal
						title={"Error"}
						message={content}
						open={true}
						actions={[{ label: sharedMessages.close, isPrimary: true }]}
					/>
				</div>
			</TestWrapper>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Renders dialog with messages without description", () => {
		state = state.setIn(
			["globalErrorMessages", "dialog", "errorMessages"],
			Immutable.fromJS([{ ...errorMessages[0], description: null }]),
		);

		const component = (
			<TestWrapper
				provider={{ store }}
				intlProvider={{ messages }}
				memoryRouter
				stylesProvider
				muiThemeProvider={{ theme }}
			>
				<div>
					<GlobalErrorMessagesModal>
						<div>children</div>
					</GlobalErrorMessagesModal>
				</div>
			</TestWrapper>
		);

		const content = (
			<Grid container spacing={2}>
				<Grid container item spacing={0}>
					{expectedMessagesContent}
				</Grid>
			</Grid>
		);

		const expected = (
			<TestWrapper
				provider={{ store }}
				intlProvider={{ messages }}
				memoryRouter
				stylesProvider
				muiThemeProvider={{ theme }}
			>
				<div>
					<div>children</div>
					<ActionModal
						title={"ze title"}
						message={content}
						open={true}
						actions={[{ label: sharedMessages.close, isPrimary: true }]}
					/>
				</div>
			</TestWrapper>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Renders dialog without messages (empty)", () => {
		state = state.setIn(
			["globalErrorMessages", "dialog", "errorMessages"],
			Immutable.fromJS([{ ...errorMessages[0], messages: [] }]),
		);

		const component = (
			<TestWrapper
				provider={{ store }}
				intlProvider={{ messages }}
				memoryRouter
				stylesProvider
				muiThemeProvider={{ theme }}
			>
				<div>
					<GlobalErrorMessagesModal>
						<div>children</div>
					</GlobalErrorMessagesModal>
				</div>
			</TestWrapper>
		);

		const content = (
			<Grid container spacing={2}>
				<Grid container item spacing={0}>
					<Grid item xs={12}>
						desc
					</Grid>
				</Grid>
			</Grid>
		);

		const expected = (
			<TestWrapper
				provider={{ store }}
				intlProvider={{ messages }}
				memoryRouter
				stylesProvider
				muiThemeProvider={{ theme }}
			>
				<div>
					<div>children</div>
					<ActionModal
						title={"ze title"}
						message={content}
						open={true}
						actions={[{ label: sharedMessages.close, isPrimary: true }]}
					/>
				</div>
			</TestWrapper>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Renders dialog without messages (null)", () => {
		state = state.setIn(
			["globalErrorMessages", "dialog", "errorMessages"],
			Immutable.fromJS([{ ...errorMessages[0], messages: null }]),
		);

		const component = (
			<TestWrapper
				provider={{ store }}
				intlProvider={{ messages }}
				memoryRouter
				stylesProvider
				muiThemeProvider={{ theme }}
			>
				<div>
					<GlobalErrorMessagesModal>
						<div>children</div>
					</GlobalErrorMessagesModal>
				</div>
			</TestWrapper>
		);

		const content = (
			<Grid container spacing={2}>
				<Grid container item spacing={0}>
					<Grid item xs={12}>
						desc
					</Grid>
				</Grid>
			</Grid>
		);

		const expected = (
			<TestWrapper
				provider={{ store }}
				intlProvider={{ messages }}
				memoryRouter
				stylesProvider
				muiThemeProvider={{ theme }}
			>
				<div>
					<div>children</div>
					<ActionModal
						title={"ze title"}
						message={content}
						open={true}
						actions={[{ label: sharedMessages.close, isPrimary: true }]}
					/>
				</div>
			</TestWrapper>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("The close button pop the message", () => {
		state = state.setIn(["globalErrorMessages", "dialog", "errorMessages"], Immutable.fromJS(errorMessages));

		const component = (
			<TestWrapper
				provider={{ store }}
				intlProvider={{ messages }}
				memoryRouter
				stylesProvider
				muiThemeProvider={{ theme }}
			>
				<div>
					<GlobalErrorMessagesModal>
						<div>children</div>
					</GlobalErrorMessagesModal>
				</div>
			</TestWrapper>
		);

		const { container } = render(component);
		const button = getByText(container, "Close");
		fireEvent.click(button);

		expect(dispatch, "to have calls satisfying", [{ args: [popGlobalErrorMessage()] }]);
	});
});
