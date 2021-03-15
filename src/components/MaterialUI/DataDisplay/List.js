import React, { useState, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListMui from "@material-ui/core/List";
import ListItemMui from "@material-ui/core/ListItem";
import ListItemTextMui from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";

const useStyles = makeStyles(theme => ({
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

const ListItem = ({ isChecked, item, onChange, listItemFormatter, classes }) => {
	return (
		<ListItemMui
			className={classNames(classes.item, isChecked && classes.selectedItem)}
			role="listitem"
			onClick={!item.disabled ? () => onChange([item]) : () => null}
			disabled={item.disabled}
		>
			{listItemFormatter ? (
				listItemFormatter(item)
			) : (
				<ListItemTextMui
					key={`list-item-${item.id}`}
					primary={<Typography className={classes.itemTitle}>{item.title}</Typography>}
					secondary={<Typography>{item.subtitle}</Typography>}
				/>
			)}
		</ListItemMui>
	);
};
export const compareListItem = (prev, next) => prev.item.id === next.item.id && prev.isChecked === next.isChecked;
const MemoListItemMui = React.memo(ListItem, compareListItem);

export const ScrollableList = React.forwardRef((props, ref) => {
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
		<Paper ref={ref} onScroll={scrollEvent} className={props.classes.paper}>
			<ListMui component="div" role="list">
				{props.items.map(item => (
					<MemoListItemMui
						key={item.id}
						isChecked={props.selected.includes(item.id)}
						item={item}
						listItemFormatter={props.listItemFormatter}
						classes={props.classes}
						onChange={props.onChange}
					/>
				))}
			</ListMui>
		</Paper>
	);
});

const List = ({
	onChange,
	items,
	selected = [],
	listItemFormatter,
	onScroll,
	currentTotal,
	currentPage = 1,
	pageSize = 20,
	height = 48,
}) => {
	const classes = useStyles({ height });
	const refScrollableList = React.useRef();

	return (
		<ScrollableList
			ref={refScrollableList}
			onChange={onChange}
			onScroll={onScroll}
			currentPage={currentPage}
			currentTotal={currentTotal}
			pageSize={pageSize}
			classes={classes}
			items={items}
			selected={selected}
			listItemFormatter={listItemFormatter}
		/>
	);
};

export default List;
