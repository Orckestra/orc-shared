import React, { useState, isValidElement, cloneElement } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Text from "../../Text";

const CustomMenuItem = withStyles(theme => ({
	root: {
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
}))(MenuItem);

const CustomMenu = withStyles(theme => ({
	paper: {
		border: `${theme.spacing(0.1)} solid ${theme.palette.grey.borders}`,
		boxShadow: `${theme.spacing(0, 0.5, 0.7, 0)} ${theme.palette.grey.borders}`,
		borderRadius: theme.spacing(0.3),
	},
}))(props => (
	<Menu
		{...{
			elevation: 0,
			getContentAnchorEl: null,
			anchorOrigin: {
				vertical: "bottom",
				horizontal: "right",
			},
			transformOrigin: {
				vertical: "top",
				horizontal: "right",
			},
		}}
		{...props}
	/>
));

const DropDownMenu = ({ payload, menuItems, children, autoFocus = true, ...props }) => {
	const [anchorEl, setAnchorEl] = useState(null);
	const isOpened = Boolean(anchorEl);

	const onClose = event => {
		event.stopPropagation();
		setAnchorEl(null);
	};

	const onMenuItemClick = action => event => {
		onClose(event);
		action(payload);
	};

	const onOpenClick = event => {
		event.stopPropagation();
		setAnchorEl(event.currentTarget);
	};

	const buttonProps = { "aria-controls": "scope-menu", "aria-haspopup": true, onClick: onOpenClick, ...props };

	return (
		<>
			{isValidElement(children) ? cloneElement(children, buttonProps) : <Button {...buttonProps}>{children}</Button>}
			<CustomMenu id="scope-menu" open={isOpened} onClose={onClose} autoFocus={autoFocus} anchorEl={anchorEl}>
				{menuItems.map(({ title, disabled, action }, key) => (
					<CustomMenuItem key={key} onClick={onMenuItemClick(action)} disabled={disabled}>
						<Text message={title} />
					</CustomMenuItem>
				))}
			</CustomMenu>
		</>
	);
};

export default DropDownMenu;
