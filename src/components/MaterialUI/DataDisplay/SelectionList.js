import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { ScrollableCustomList } from "./TransferList";

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
		borderRadius: theme.spacing(0.5),
		boxShadow: "none",

		"&::-webkit-scrollbar": {
			width: theme.spacing(1.5),
		},
		"&::-webkit-scrollbar-thumb": {
			background: theme.palette.grey.borders,
			border: `5px white solid`,
			backgroundClip: "padding-box",
			borderRadius: theme.shape.borderRadius,
		},
	},

	paperLeft: {
		border: `1px solid ${theme.palette.grey.borders}`,
	},
}));

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
	infoPanel,
}) => {
	const classes = useStyles({ height });
	const [checked, setChecked] = useState([]);
	const refScrollableList = React.useRef();

	const onChangeEvent = ids => {
		onChange(formatOnChange(listData.data, ids));
	};

	return (
		<Grid container spacing={2}>
			<Grid item xs={5}>
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
			<Grid item xs={7}>
				{infoPanel}
			</Grid>
		</Grid>
	);
};

export default SelectionList;
