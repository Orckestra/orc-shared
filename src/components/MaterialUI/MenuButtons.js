import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "./DataDisplay/Divider";
import DividerProps from "./DataDisplay/dividerProps";
import Icon from "./DataDisplay/Icon";
import Button from "@material-ui/core/Button";

const useMenuStyles = makeStyles(theme => ({
	menuItem: {
		fontFamily: theme.typography.fontFamily,
		textTransform: "none",
		color: theme.palette.text.primary,
		borderRadius: 0,
		"&:hover": {
			borderRadius: 0,
			boxShadow: "none",
			backgroundColor: theme.palette.primary.light,
		},
		"&:focus, &:active, &.Mui-focusVisible": {
			borderRadius: 0,
			boxShadow: "none",
			outline: "none",
		},
	},
	menu: {
		border: `${theme.spacing(0.1)} solid ${theme.palette.primary.main}`,
	},
	arrowIcon: {
		width: theme.spacing(1),
		height: theme.spacing(1),
	},
}));

const StyledMenu = props => {
	const classes = useMenuStyles();

	return (
		<Menu
			elevation={0}
			getContentAnchorEl={null}
			anchorOrigin={{
				vertical: "bottom",
				horizontal: "left",
			}}
			transformOrigin={{
				vertical: "top",
				horizontal: "left",
			}}
			classes={{ paper: classes.menu }}
			{...props}
		/>
	);
};

const MenuButton = ({ options, label }) => {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const classes = useMenuStyles();

	const handleClick = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const dividerProps = new DividerProps();
	dividerProps.set(DividerProps.propNames.light, true);
	dividerProps.set(DividerProps.propNames.variant, "middle");
	const allDisabled = options?.every(o => o.disabled) ?? true;
	return (
		<>
			<Button
				aria-haspopup="true"
				variant="outlined"
				color="primary"
				disabled={allDisabled}
				onClick={handleClick}
				endIcon={<Icon id="chevron-down" className={classes.arrowIcon} />}
			>
				{label}
			</Button>
			<StyledMenu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
				{options?.map(({ key, component, disabled, action }, index) => (
					<div key={key}>
						<MenuItem
							onClick={() => {
								handleClose();
								action?.();
							}}
							disabled={disabled}
							classes={{ root: classes.menuItem }}
						>
							{component}
						</MenuItem>
						{index < options.length - 1 && <Divider dividerProps={dividerProps} />}
					</div>
				))}
			</StyledMenu>
		</>
	);
};

export default MenuButton;
