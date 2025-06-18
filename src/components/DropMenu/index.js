import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Menu from "./Menu";
import useToggle from "../../hooks/useToggle";
import withClickOutside from "../../hocs/withClickOutside";

const useStyles = makeStyles(() => ({
	wrapper: {
		position: "relative",
	},
}));

export const Wrapper = withClickOutside(
	React.forwardRef(({ children, className }, ref) => {
		const classes = useStyles();

		return (
			<div ref={ref} className={`${classes.wrapper} ${className ? className : ""}`}>
				{children}
			</div>
		);
	}),
);

const DropMenu = ({ id, initOpen, menuItems, alignRight, className = "", children }) => {
	const [open, toggle, reset] = useToggle(initOpen);

	return (
		<Wrapper className={className} onClickOutside={reset}>
			<div id={id + "Anchor"} onClick={toggle}>
				{React.Children.map(children, child =>
					typeof child === "object" ? React.cloneElement(child, { open }) : child,
				)}
			</div>
			<Menu id={id + "Dropdown"} {...{ open, menuItems, reset }} alignRight={alignRight} />
		</Wrapper>
	);
};

export default DropMenu;
