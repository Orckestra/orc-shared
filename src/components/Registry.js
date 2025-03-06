import React from "react";
import InformationItem from "./MaterialUI/DataDisplay/PredefinedElements/InformationItem";
import sharedMessages from "~/sharedMessages";
import { useIntl } from "react-intl";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
	registry: {
		"& > div + div": {
			marginTop: theme.spacing(2),
		},
	},
}));

const Registry = ({ dateCreated, createdBy, lastModifiedDate, lastModifiedBy, additionalContent = [] }) => {
	const { formatDate } = useIntl();
	const classes = useStyles();

	const created = formatDate(dateCreated);
	const lastModified = formatDate(lastModifiedDate);

	const registry = (
		<Box className={classes.registry} display="flex" flexDirection="column">
			{dateCreated !== undefined && <InformationItem label={sharedMessages.created} children={created} />}
			{createdBy !== undefined && <InformationItem label={sharedMessages.createdBy} children={createdBy} />}
			{lastModifiedDate !== undefined && (
				<InformationItem label={sharedMessages.lastModified} children={lastModified} />
			)}
			{lastModifiedBy !== undefined && (
				<InformationItem label={sharedMessages.lastModifiedBy} children={lastModifiedBy} />
			)}
			{additionalContent.map((c, index) => (
				<InformationItem key={"additional" + index} label={c.label} children={c.content} />
			))}
		</Box>
	);

	return registry;
};

export default Registry;
