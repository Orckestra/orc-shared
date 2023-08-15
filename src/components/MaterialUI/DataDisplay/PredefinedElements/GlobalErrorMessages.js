import React from "react";
import { useIntl } from "react-intl";
import { makeStyles } from "@material-ui/core/styles";
import sharedMessages from "../../../../sharedMessages";
import Grid from "@material-ui/core/Grid";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import LookupDisplayValue from "./LookupDisplayValue";
import ActionModal from "./ActionModal";
import { useDispatch, useSelector } from "react-redux";
import { firstDialogErrorMessageSelector } from "../../../../selectors/globalErrorMessages";
import { popGlobalErrorMessage } from "../../../../actions/globalErrorMessages";

const useStyles = makeStyles(theme => ({
	grid: {
		maxHeight: "40vh",
		overflowY: "auto",
	},
}));

const GlobalErrorMessagesModal = ({ children }) => {
	const classes = useStyles();
	const { formatMessage } = useIntl();
	const dispatch = useDispatch();

	const msg = useSelector(firstDialogErrorMessageSelector);

	if (msg === null) {
		return <>{children}</>;
	}

	const closeCallback = () => {
		dispatch(popGlobalErrorMessage());
	};
	const actions = [{ label: sharedMessages.close, isPrimary: true, handler: closeCallback }];

	let content = (
		<Grid container spacing={2} className={classes.grid}>
			<Grid container item spacing={0}>
				{msg.description && (
					<Grid item xs={12}>
						{msg.description}
					</Grid>
				)}

				{msg.messages?.length > 0 && (
					<Grid item xs={12}>
						<List className={classes.root}>
							{msg.messages.map((msg, index) => {
								const hasLookup = msg.lookupModule && msg.lookupName && msg.lookupKey;

								return (
									<ListItem key={index}>
										<ListItemIcon>●</ListItemIcon>
										<ListItemText>
											{hasLookup && (
												<LookupDisplayValue
													moduleName={msg.lookupModule}
													lookupName={msg.lookupName}
													lookupKey={msg.lookupKey}
													lookupReplacementValues={msg.lookupReplacementValues}
												/>
											)}
											{!hasLookup && msg.message}
										</ListItemText>
									</ListItem>
								);
							})}
						</List>
					</Grid>
				)}
			</Grid>
		</Grid>
	);

	return (
		<>
			{children}
			{
				<ActionModal
					title={msg.title || formatMessage(sharedMessages.error)}
					message={content}
					open={true}
					actions={actions}
				/>
			}
		</>
	);
};

export default GlobalErrorMessagesModal;
