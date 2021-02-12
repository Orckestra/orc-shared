import React, { useState, useCallback } from "react";
import { FormattedMessage } from "react-intl";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import classNames from "classnames";
import { isReactComponent } from "../../../utils/propertyValidator";
import sharedMessages from "../../../sharedMessages";

const useStyles = makeStyles(theme => ({
	root: {
		margin: "auto",
	},

	title: {
		color: theme.palette.text.hint,
		fontSize: theme.spacing(1.2),
		marginBottom: theme.spacing(0.6),
	},
	paper: {
		overflow: "auto",
		width: theme.spacing(32.6),
		height: theme.spacing(48),
		border: `${theme.spacing(0.1)} solid ${theme.palette.primary.light}`,
		borderRadius: theme.spacing(0.5),
		boxShadow: "none",

		"&::-webkit-scrollbar": {
			width: theme.spacing(1.5),
		},
		"&::-webkit-scrollbar-thumb": {
			background: theme.palette.grey.borders,
			border: `${theme.spacing(0.5)} white solid`,
			backgroundClip: "padding-box",
			borderRadius: theme.spacing(1.5),
		},
	},
	item: {
		fontSize: theme.spacing(1.3),
		color: theme.palette.text.primary,
		fontFamily: theme.typography.fontFamily,
		padding: theme.spacing(0, 1.6),
		cursor: "pointer",
	},
	selectedItem: {
		backgroundColor: theme.palette.primary.light,
	},

	button: {
		margin: theme.spacing(0.5, 0),
		fontSize: theme.spacing(1.3),
		lineHeight: theme.spacing(1.4),
		padding: theme.spacing(0.7),
		minWidth: theme.spacing(8),
	},
}));

const formatState = (state, checked, from, to) => {
	const fromSelectedItems = state[from].filter(({ id }) => checked.includes(id));
	return {
		[to]: [...state[to], ...fromSelectedItems].sort((a, b) => a.title.localeCompare(b.title)),
		[from]: state[from].filter(({ id }) => !checked.includes(id)),
	};
};

const formatSelectedItems = (selectedItems, value) => {
	const currentIndex = selectedItems.indexOf(value);
	const newChecked = [...selectedItems];

	if (currentIndex === -1) {
		newChecked.push(value);
	} else {
		newChecked.splice(currentIndex, 1);
	}
	return newChecked;
};

const CustomList = ({ items, checked, toggle }) => {
	const classes = useStyles();

	return (
		<List component="div" role="list">
			{items.map(({ id, title, disabled }) => (
				<ListItem
					className={classNames(classes.item, checked.includes(id) && classes.selectedItem)}
					key={id}
					role="listitem"
					onClick={!disabled ? () => toggle(id) : null}
					disabled={disabled}
				>
					<ListItemText id={`transfer-list-item-${id}-label`} primary={title} />
				</ListItem>
			))}
		</List>
	);
};

const TransferList = ({
	rightListData,
	leftListData,
	onChange,
	addButtonTitle,
	deleteButtonTitle,
	customLeftComponent,
}) => {
	const classes = useStyles();
	const [checked, setChecked] = useState([]);
	const handleToggle = useCallback(value => setChecked(state => formatSelectedItems(state, value)), [setChecked]);
	const onTopButtonClick = () =>
		onChange(formatState({ right: rightListData.data, left: leftListData.data }, checked, "left", "right"));
	const onBottomButtonClick = () =>
		onChange(formatState({ right: rightListData.data, left: leftListData.data }, checked, "right", "left"));

	const rightSelected = rightListData.data?.some(({ id }) => checked.includes(id));
	const leftSelected = leftListData.data?.some(({ id }) => checked.includes(id));

	return (
		<Grid container spacing={1} justify="center" alignItems="center" className={classes.root}>
			<Grid item>
				<div className={classes.title}>{leftListData.title}</div>
				<Paper className={classes.paper}>
					{isReactComponent(customLeftComponent) ? (
						customLeftComponent
					) : (
						<CustomList items={leftListData.data} checked={checked} toggle={handleToggle} />
					)}
				</Paper>
			</Grid>
			<Grid item>
				<Grid container direction="column" alignItems="center">
					<Button
						variant="outlined"
						size="small"
						className={classes.button}
						onClick={onTopButtonClick}
						disabled={!leftSelected}
						aria-label="move selected right"
					>
						{addButtonTitle || <FormattedMessage {...sharedMessages.add} />} &gt;
					</Button>
					<Button
						variant="outlined"
						size="small"
						className={classes.button}
						onClick={onBottomButtonClick}
						disabled={!rightSelected}
						aria-label="move selected left"
					>
						&lt; {deleteButtonTitle || <FormattedMessage {...sharedMessages.remove} />}
					</Button>
				</Grid>
			</Grid>
			<Grid item>
				<div className={classes.title}>{rightListData.title}</div>
				<Paper className={classes.paper}>
					<CustomList items={rightListData.data} checked={checked} toggle={handleToggle} />
				</Paper>
			</Grid>
		</Grid>
	);
};

export default TransferList;
