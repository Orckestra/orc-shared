import React from "react";
import ApplicationDialog from "./ApplicationDialog";
import PopperedIcon from "../../MaterialUI/DataDisplay/PopperedElements/PopperedIcon";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles(theme => ({
	popperContainer: {
		cursor: "pointer",
		position: "relative",
		fontSize: theme.spacing(2.4),
		padding: theme.spacing(0.5, 1.3),
		"& svg": {
			color: theme.palette.grey.icon,
		},
	},
	arrow: {
		top: 0,
		left: theme.spacing(1),
		width: theme.spacing(1),
		height: theme.spacing(1),
		transform: "translateX(-50%) rotate(45deg)",
		marginTop: theme.spacing(-1.5),
		backgroundColor: theme.palette.grey.lighter,
		border: "1px solid",
		borderColor: `${theme.palette.grey.borders} transparent transparent ${theme.palette.grey.borders}`,
		zIndex: 2000,
		position: "absolute",
	},
}));

const ApplicationSelector = ({ className, ...props }) => {
	const classes = useStyles();
	return (
		<PopperedIcon
			popperValue={<ApplicationDialog {...props} />}
			id="app-list"
			classprop={classes}
			placement="bottom-start"
		/>
	);
};

export default ApplicationSelector;
