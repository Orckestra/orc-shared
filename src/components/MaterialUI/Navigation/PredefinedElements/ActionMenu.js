import React from "react";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import DropDownMenu from "../DropDownMenu";
import Icon from "../../DataDisplay/Icon";

const LightIconButton = withStyles(theme => ({
	root: {
		border: 0,
		marginLeft: "auto",
		font: "icon",
		padding: theme.spacing(0.5, 1),
	},
}))(IconButton);

const ActionMenu = props => {
	return (
		<DropDownMenu {...props}>
			<LightIconButton>
				<Icon id="dot-menu" />
			</LightIconButton>
		</DropDownMenu>
	);
};

export default ActionMenu;
