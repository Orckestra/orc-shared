import React, { useState, useEffect, useCallback } from "react";
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
	title: {
		color: theme.palette.text.hint,
		fontSize: theme.spacing(1.2),
		marginBottom: theme.spacing(0.6),
	},
	paper: {
		overflow: "auto",
		height: props => theme.spacing(props.height),
		border: `1px solid ${theme.palette.primary.light}`,
		borderRadius: theme.shape.borderRadius,
		boxShadow: "none",

		"&::-webkit-scrollbar": {
			width: theme.spacing(1.5),
		},
		"&::-webkit-scrollbar-thumb": {
			background: theme.palette.grey.borders,
			border: `5px white solid`,
			backgroundClip: "padding-box",
			borderRadius: theme.spacing(1.5),
		},
	},
	paperLeft: {
		border: `1px solid ${theme.palette.grey.borders}`,
	},

	customContainer: {
		margin: theme.spacing(1.5, 1),
		"& .MuiTreeView-root li:last-child:before, & .MuiTreeItem-iconontainer:before": {
			backgroundColor: theme.palette.background.paper,
		},
	},

	button: {
		margin: theme.spacing(0.5, 1),
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
		padding: theme.spacing(0.4, 1.6),
		cursor: "pointer",
	},
	selectedItem: {
		backgroundColor: theme.palette.primary.light,
	},
	itemTitle: {
		fontWeight: theme.typography.fontWeightSemiBold,
		marginBottom: theme.spacing(0.4),
	},
}));

const formatState = (state, checked, from, to) => {
	const fromSelectedItems = state[from].filter(({ id }) => checked.includes(id));
	return {
		[to]: [...state[to], ...fromSelectedItems],
		[from]: state[from].filter(({ id }) => !checked.includes(id)),
	};
};

export const ScrollableCustomList = React.forwardRef((props, ref) => {
	const scrollEvent = evt => {
		if (!props.onScroll) return;

		if (
			evt.target.scrollHeight - (evt.target.scrollTop + evt.target.offsetHeight) < 50 &&
			props.currentTotal === props.currentPage * props.pageSize
		) {
			props.onScroll(props.currentPage + 1);
		}
	};

	return (
		<Paper ref={ref} onScroll={scrollEvent} className={classNames(props.classes.paper, props.classes.paperLeft)}>
			<CustomList
				items={props.items}
				checked={props.checked}
				setChecked={props.setChecked}
				listItemFormatter={props.listItemFormatter}
				multiSelect={props.multiSelect}
				onChange={props.onChange}
			/>
		</Paper>
	);
});

const compareListItem = (prev, next) => {
	return (
		prev.item.id === next.item.id &&
		prev.isChecked === next.isChecked &&
		prev.item.subtitle === next.item.subtitle &&
		prev.item.title === next.item.title
	);
};

const ListItemWrapper = ({ isChecked, item, handleToggle, listItemFormatter, classes }) => {
	return (
		<ListItem
			className={classNames(classes.item, isChecked && classes.selectedItem)}
			role="listitem"
			onClick={!item.disabled ? () => handleToggle(item.id) : null}
			disabled={item.disabled}
		>
			{listItemFormatter ? (
				listItemFormatter(item)
			) : (
				<ListItemText
					key={`transfer-list-item-${item.id}-label`}
					primary={
						<Typography component="div" className={classes.itemTitle}>
							{item.title}
						</Typography>
					}
					secondary={<Typography component="div">{item.subtitle}</Typography>}
				/>
			)}
		</ListItem>
	);
};

const MemoListItem = React.memo(ListItemWrapper, compareListItem);

export const CustomList = ({ items, checked, setChecked, listItemFormatter, multiSelect = true, onChange }) => {
	const classes = useListStyles();

	const handleToggle = useCallback(
		value =>
			setChecked(state => {
				const currentIndex = state.indexOf(value);
				let newChecked = [...state];

				if (!multiSelect) {
					newChecked = [value];
				} else {
					if (currentIndex === -1) {
						newChecked.push(value);
					} else {
						newChecked.splice(currentIndex, 1);
					}
				}

				return newChecked;
			}),
		[setChecked, multiSelect],
	);

	useEffect(() => onChange && onChange(checked), [checked, onChange]);

	return (
		<List component="div" role="list">
			{items.map(item => (
				<MemoListItem
					key={item.id}
					isChecked={checked.includes(item.id)}
					item={item}
					listItemFormatter={listItemFormatter}
					classes={classes}
					handleToggle={handleToggle}
				/>
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
	onScroll,
	currentTotal,
	currentPage = 1,
	pageSize = 20,
	height = 48,
}) => {
	const classes = useStyles({ height });
	const [checked, setChecked] = useState([]);
	const refScrollableList = React.useRef();
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
		<Grid container spacing={2} justifyContent="center" alignItems="center">
			<Grid item xs={5}>
				<div className={classes.title}>{leftListData.title}</div>
				{isReactComponent(customLeftComponent) ? (
					<Paper className={classNames(classes.paper, classes.paperLeft)}>
						<div className={classes.customContainer}>
							<customLeftComponent.type selected={checked} setSelected={setChecked} {...customLeftComponent.props} />
						</div>
					</Paper>
				) : (
					<ScrollableCustomList
						ref={refScrollableList}
						onScroll={onScroll}
						currentPage={currentPage}
						currentTotal={currentTotal}
						pageSize={pageSize}
						classes={classes}
						items={leftListData.data}
						checked={checked}
						setChecked={setChecked}
						listItemFormatter={listItemFormatter}
					/>
				)}
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
