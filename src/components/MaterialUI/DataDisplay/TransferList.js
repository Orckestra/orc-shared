import React, { useState, useCallback } from "react";
import { FormattedMessage } from "react-intl";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
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
		height: props => theme.spacing(props.height),
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
	paperLeft: {
		border: `${theme.spacing(0.1)} solid ${theme.palette.grey.borders}`,
	},

	button: {
		margin: theme.spacing(0.5, 0),
		fontSize: theme.spacing(1.3),
		lineHeight: theme.spacing(1.4),
		padding: theme.spacing(0.7),
		minWidth: theme.spacing(8),
	},
}));

const useListStyles = makeStyles(theme => ({
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
	itemTitle: {
		fontWeight: theme.typography.fontWeightSemiBold,
	},
}));

const formatState = (state, checked, from, to) => {
	const fromSelectedItems = state[from].filter(({ id }) => checked.includes(id));
	return {
		[to]: [...state[to], ...fromSelectedItems],
		[from]: state[from].filter(({ id }) => !checked.includes(id)),
	};
};

const CustomList = ({ items, checked, setChecked, listItemFormatter }) => {
	const classes = useListStyles();

	const handleToggle = useCallback(
		value =>
			setChecked(state => {
				const currentIndex = state.indexOf(value);
				const newChecked = [...state];

				if (currentIndex === -1) {
					newChecked.push(value);
				} else {
					newChecked.splice(currentIndex, 1);
				}
				return newChecked;
			}),
		[setChecked],
	);

	return (
		<List component="div" role="list">
			{items.map(item => (
				<ListItem
					className={classNames(classes.item, checked.includes(item.id) && classes.selectedItem)}
					key={item.id}
					role="listitem"
					onClick={!item.disabled ? () => handleToggle(item.id) : null}
					disabled={item.disabled}
				>
					{listItemFormatter ? (
						listItemFormatter(item)
					) : (
						<ListItemText
							key={`transfer-list-item-${item.id}-label`}
							primary={<Typography className={classes.itemTitle}>{item.title}</Typography>}
							secondary={<Typography>{item.subtitle}</Typography>}
						/>
					)}
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
	removeButtonTitle,
	customLeftComponent,
	listItemFormatter,
	height = 48,
}) => {
	const classes = useStyles({ height });
	const [checked, setChecked] = useState([]);
	const onAddButtonClick = () => {
		onChange(formatState({ right: rightListData.data, left: leftListData.data }, checked, "left", "right"));
		setChecked(checked.filter(check => !leftListData.data?.some(({ id }) => id === check)));
	};
	const onRemoveButtonClick = () => {
		onChange(formatState({ right: rightListData.data, left: leftListData.data }, checked, "right", "left"));
		setChecked(checked.filter(check => !rightListData.data?.some(({ id }) => id === check)));
	};

	const rightSelected = rightListData.data?.some(({ id }) => checked.includes(id));
	const leftSelected = leftListData.data?.some(({ id }) => checked.includes(id));

	return (
		<Grid container spacing={1} justify="center" alignItems="center" className={classes.root}>
			<Grid item xs={5}>
				<div className={classes.title}>{leftListData.title}</div>
				<Paper className={classNames(classes.paper, classes.paperLeft)}>
					{isReactComponent(customLeftComponent) ? (
						<customLeftComponent.type selected={checked} setSelected={setChecked} {...customLeftComponent.props} />
					) : (
						<CustomList
							items={leftListData.data}
							checked={checked}
							setChecked={setChecked}
							listItemFormatter={listItemFormatter}
						/>
					)}
				</Paper>
			</Grid>
			<Grid xs={2} item>
				<Grid container direction="column" alignItems="center">
					<Button
						variant="outlined"
						size="small"
						className={classes.button}
						onClick={onAddButtonClick}
						disabled={!leftSelected}
						aria-label="move selected right"
					>
						{addButtonTitle || <FormattedMessage {...sharedMessages.add} />} &gt;
					</Button>
					<Button
						variant="outlined"
						size="small"
						className={classes.button}
						onClick={onRemoveButtonClick}
						disabled={!rightSelected}
						aria-label="move selected left"
					>
						&lt; {removeButtonTitle || <FormattedMessage {...sharedMessages.remove} />}
					</Button>
				</Grid>
			</Grid>
			<Grid item xs={5}>
				<div className={classes.title}>{rightListData.title}</div>
				<Paper className={classes.paper}>
					<CustomList
						items={rightListData.data}
						checked={checked}
						setChecked={setChecked}
						listItemFormatter={listItemFormatter}
					/>
				</Paper>
			</Grid>
		</Grid>
	);
};

export default TransferList;
