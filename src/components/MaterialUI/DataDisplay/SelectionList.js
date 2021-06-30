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
	divider: {
		margin: "auto",
	},
	paperLeft: {
		border: `1px solid ${theme.palette.grey.borders}`,
	},
	actionPanel: {
		paddingTop: theme.spacing(2),
	},
}));

const defaultInfoPanelXs = 6;

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
	defaultSelection,
	infoPanel,
	infoPanelXs,
	divider = true,
	actionPanel,
}) => {
	const classes = useStyles({ height });
	const [checked, setChecked] = useState([]);
	const refScrollableList = React.useRef();
	const defaultPanel = <div></div>;

	useEffect(() => {
		const listDataIds = listData.data.map(d => d.id);
		const checkedFromList = listDataIds.filter(l => checked.includes(l));
		if (defaultSelection && checkedFromList.length === 0) {
			setChecked([defaultSelection]);
		}
	}, [defaultSelection, checked, listData.data]);

	useEffect(() => {
		if (!multiSelect) {
			setChecked([defaultSelection]);
		}
	}, [defaultSelection, multiSelect, listData.data.length]);

	const onChangeEvent = ids => {
		onChange && onChange(formatOnChange(listData.data, ids));
	};

	const showDivider = infoPanel && divider;
	const dividerProps = new DividerProps();
	dividerProps.set(DividerProps.propNames.orientation, "vertical");
	dividerProps.set(DividerProps.propNames.light, true);
	dividerProps.setStyle(DividerProps.ruleNames.vertical, classes.divider);

	infoPanelXs = infoPanelXs ?? defaultInfoPanelXs;
	infoPanel = infoPanel ?? defaultPanel;

	const dividerDiff = showDivider ? 1 : 0;

	const listComponent = (
		<>
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
			{actionPanel ? <div className={classes.actionPanel}>{actionPanel}</div> : null}
		</>
	);

	const dividerComponent = showDivider && (
		<Grid item>
			<Divider dividerProps={dividerProps} />
		</Grid>
	);

	return (
		<Grid container spacing={2}>
			<Grid item xs={12 - infoPanelXs - dividerDiff}>
				{listComponent}
			</Grid>
			{dividerComponent}
			<Grid item xs={infoPanelXs}>
				{infoPanel}
			</Grid>
		</Grid>
	);
};

export default SelectionList;
