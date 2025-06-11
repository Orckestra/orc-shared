import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { FormattedMessage } from "react-intl";
import Icon from "../MaterialUI/DataDisplay/Icon";

const useStyles = makeStyles(theme => ({
	drawer: {
		position: "absolute",
		zIndex: 19999,
		margin: "4px 0 0",
		left: props => (props.alignRight ? "auto" : "0"),
		right: props => (props.alignRight ? "0" : "auto"),
		transition: "opacity 100ms ease-out",

		"&.enter-active": {
			opacity: 1,
			visibility: "visible",
		},
		"&.exit-active": {
			opacity: 0,
			visibility: "hidden",
		},
	},
	list: {
		color: theme.palette.text.primary,
		backgroundColor: "white",
		border: `1px solid ${theme.palette.text.hint}`,
		borderRadius: "5px",
		listStyleType: "none",
		padding: "5px 0",
		margin: "0",
		fontFamily: "Open Sans, sans-serif",
		fontSize: "12px",
		width: "max-content",
	},
	item: {
		boxSizing: "border-box",
		height: "30px",
		minWidth: "178px",
		padding: "9px 12px",
		display: "flex",
		alignItems: "center",
		cursor: "pointer",
		"&:hover": {
			backgroundColor: theme.palette.primary.main,
			color: "white",
		},
	},
	itemIcon: {
		paddingRight: "11px",
		fontSize: "17px",
	},
}));

const Menu = ({ id, open, menuItems, reset, alignRight }) => {
	const classes = useStyles({ alignRight });

	return (
		<div className={`${classes.drawer} ${open ? "enter-active" : "exit-active"}`}>
			<ul id={id} className={classes.list}>
				{menuItems.map(item => (
					<li
						id={item.id}
						key={item.id || item.label?.id + (item.icon || "")}
						className={classes.item}
						onClick={event => {
							reset();
							item.handler(event);
						}}
					>
						{item.icon ? <Icon id={item.icon} className={classes.itemIcon} /> : null}
						{typeof item.label === "string" ? item.label : <FormattedMessage {...item.label} />}
					</li>
				))}
			</ul>
		</div>
	);
};

export default Menu;
