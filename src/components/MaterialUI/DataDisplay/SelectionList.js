import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { ScrollableCustomList } from "./TransferList";
import Divider from "./Divider";
import DividerProps from "./dividerProps";

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
}));

const defaultInfoPanelXs = 7;

const formatOnChange = (data, ids) => {
	const selectedItems = data.filter(dataItem => ids.includes(dataItem.id));

	return {
		selectedItems: [...selectedItems],
	};
};

const SelectionList = ({
	listData,
	onChange,
	listItemFormatter,
	onScroll,
	currentTotal,
	currentPage = 1,
	pageSize = 20,
	height = 50,
	multiSelect = false,
	defaultSelection = [],
	infoPanel,
	infoPanelXs,
	divider = true,
}) => {
	const classes = useStyles({ height });
	const [checked, setChecked] = useState([]);
	const refScrollableList = React.useRef();

	useEffect(() => {
		if (checked.length === 0 && defaultSelection.length > 0) {
			setChecked(defaultSelection);
		}
	}, [checked.length, defaultSelection]);

	const onChangeEvent = ids => {
		onChange && onChange(formatOnChange(listData.data, ids));
	};

	const showDivider = infoPanel && divider;
	const dividerProps = new DividerProps();
	dividerProps.set(DividerProps.propNames.orientation, "vertical");
	dividerProps.set(DividerProps.propNames.light, true);
	dividerProps.setStyle(DividerProps.ruleNames.vertical, classes.divider);

	const listComponent = (
		<Grid item xs={showDivider ? 11 : 12}>
			<div className={classes.title}>{listData.title}</div>
			<ScrollableCustomList
				ref={refScrollableList}
				onScroll={onScroll}
				currentPage={currentPage}
				currentTotal={currentTotal}
				pageSize={pageSize}
				classes={classes}
				items={listData.data}
				checked={checked}
				setChecked={setChecked}
				listItemFormatter={listItemFormatter}
				multiSelect={multiSelect}
				onChange={onChangeEvent}
			/>
		</Grid>
	);

	const dividerComponent = showDivider && (
		<Grid item xs={1}>
			<Divider dividerProps={dividerProps} />
		</Grid>
	);

	const listContainer = (
		<Grid container spacing={1}>
			{listComponent}
			{dividerComponent}
		</Grid>
	);

	if (!infoPanel) return listContainer;

	return (
		<Grid container spacing={1}>
			<Grid item xs={12 - (infoPanelXs ?? defaultInfoPanelXs)}>
				{listContainer}
			</Grid>
			<Grid item xs={infoPanelXs ?? defaultInfoPanelXs}>
				{infoPanel}
			</Grid>
		</Grid>
	);
};

export default SelectionList;
