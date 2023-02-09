import React, { useState, isValidElement, cloneElement } from "react";
import makeStyles from "@mui/styles/makeStyles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Text from "../../Text";
import DropDownMenuProps, { isDropDownMenuProps } from "./DropDownMenuProps";

const useStyles = makeStyles(theme => ({
	menuItem: {
		fontFamily: theme.typography.fontFamily,
		textTransform: "none",
		color: theme.palette.text.primary,
		borderRadius: 0,
		"&:hover, &:focus": {
			borderRadius: 0,
			boxShadow: "none",
			backgroundColor: theme.palette.primary.light,
		},
	},
	menu: {
		border: `${theme.spacing(0.1)} solid ${theme.palette.grey.borders}`,
		boxShadow: `${theme.spacing(0, 0.5, 0.7, 0)} ${theme.palette.grey.borders}`,
		borderRadius: theme.spacing(0.3),
	},
}));

const DropDownMenu = ({ payload, menuItems, children, dropDownMenuProps = new DropDownMenuProps() }) => {
	if (isDropDownMenuProps(dropDownMenuProps) === false) {
		throw new TypeError("dropDownMenuProps property is not of type DropDownMenuProps");
	}

	const disabled = dropDownMenuProps.get(DropDownMenuProps.propNames.disabled);
	const autoFocus = dropDownMenuProps.get(DropDownMenuProps.propNames.autoFocus);

	const [anchorEl, setAnchorEl] = useState(null);
	const isOpened = Boolean(anchorEl);
	const classes = useStyles();

	const onClose = event => {
		event.stopPropagation();
		setAnchorEl(null);
	};

	const onMenuItemClick = (action, itemContext) => event => {
		onClose(event);
		action(payload, itemContext);
	};

	const onOpenClick = event => {
		event.stopPropagation();
		setAnchorEl(event.currentTarget);
	};

	const buttonProps = { "aria-controls": "scope-menu", "aria-haspopup": true, onClick: onOpenClick, disabled };

	return (
		<>
			{isValidElement(children) ? cloneElement(children, buttonProps) : <Button {...buttonProps}>{children}</Button>}
			<Menu
				elevation={0}
				getContentAnchorEl={null}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "right",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				classes={{ paper: classes.menu }}
				id="scope-menu"
				open={isOpened}
				onClose={onClose}
				autoFocus={autoFocus}
				anchorEl={anchorEl}
			>
				{menuItems.map(({ title, disabled, action, itemContext }, key) => (
					<MenuItem
						classes={{ root: classes.menuItem }}
						key={key}
						onClick={onMenuItemClick(action, itemContext)}
						disabled={disabled}
					>
						<Text message={title} />
					</MenuItem>
				))}
			</Menu>
		</>
	);
};

export default DropDownMenu;
