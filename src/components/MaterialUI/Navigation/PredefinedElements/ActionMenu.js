import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import DropDownMenu from "../DropDownMenu";
import Icon from "../../DataDisplay/Icon";
import DropDownMenuProps from "../DropDownMenuProps";

const useStyles = makeStyles(theme => ({
	root: {
		border: 0,
		marginLeft: "auto",
		font: "icon",
		padding: theme.spacing(0.5, 1),
	},
}));

const ActionMenu = ({ payload, menuItems, children, disabled, autoFocus }) => {
	const classes = useStyles();

	const dropDownMenuProps = new DropDownMenuProps();

	if (disabled !== undefined) dropDownMenuProps.set(DropDownMenuProps.propNames.disabled, disabled);

	if (autoFocus !== undefined) dropDownMenuProps.set(DropDownMenuProps.propNames.autoFocus, autoFocus);

	return (
		<DropDownMenu children={children} payload={payload} menuItems={menuItems} dropDownMenuProps={dropDownMenuProps}>
			<IconButton classes={classes}>
				<Icon id="dot-menu" />
			</IconButton>
		</DropDownMenu>
	);
};

export default ActionMenu;
