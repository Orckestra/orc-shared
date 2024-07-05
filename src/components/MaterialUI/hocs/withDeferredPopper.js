import React, { useState } from "react";
import Popper from "@material-ui/core/Popper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { isString, isObject, isStringNullOrWhitespace, isReactComponent } from "../../../utils/propertyValidator";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
	popper: {
		zIndex: 9999,
		'&[x-placement*="bottom"] $arrow': {
			top: 0,
			left: "50%",
			transform: "translateX(-50%) rotate(45deg)",
			marginTop: "-0.25em",
			width: "0.4em",
			height: "0.4em",
			borderColor: `${theme.palette.grey.icon} transparent transparent ${theme.palette.grey.icon}`,
		},
		'&[x-placement*="top"] $arrow': {
			bottom: 0,
			left: "50%",
			transform: "translateX(-50%) rotate(45deg)",
			marginBottom: "-0.25em",
			width: "0.4em",
			height: "0.4em",
			borderColor: `transparent ${theme.palette.grey.icon} ${theme.palette.grey.icon} transparent`,
		},
		'&[x-placement*="right"] $arrow': {
			left: 0,
			top: "50%",
			marginLeft: "-0.25em",
			transform: "translateY(-50%) rotate(45deg)",
			width: "0.4em",
			height: "0.4em",
			borderColor: `transparent transparent ${theme.palette.grey.icon} ${theme.palette.grey.icon}`,
		},
		'&[x-placement*="left"] $arrow': {
			right: 0,
			top: "50%",
			marginRight: "-0.25em",
			transform: "translateY(-50%) rotate(45deg)",
			width: "0.4em",
			height: "0.4em",
			borderColor: `${theme.palette.grey.icon} ${theme.palette.grey.icon} transparent transparent`,
		},
	},
	arrow: {
		position: "absolute",
		border: "1px solid",
		backgroundColor: theme.palette.background.paper,
	},
	popperContainer: {
		cursor: "pointer",
	},
}));

export const Arrow = ({ arrowClass }) => {
	return <div className={arrowClass} />;
};

const withDeferredPopper =
	Comp =>
	({ popperValue, ...props }) => {
		const classes = useStyles();

		const [popperState, setPopperState] = useState({
			isDisplayed: false,
			anchorElement: null,
			arrowElement: null,
		});

		if (popperValue == null) return <Comp {...props} />;

		if (isString(popperValue) && isStringNullOrWhitespace(popperValue)) return <Comp {...props} />;

		if (isObject(popperValue) && isReactComponent(popperValue) === false) return <Comp {...props} />;

		const defaultComponent = <Comp onClick={event => togglePopper(event)} {...props} />;

		const togglePopper = function (event) {
			const linkParent = event?._dispatchInstances?.filter(item => item.elementType === "a");
			if (linkParent) {
				event.preventDefault();
			}
			const isDisplayed = !popperState.isDisplayed;
			const anchorElement = event.currentTarget;
			setPopperState({
				isDisplayed: isDisplayed,
				anchorElement: anchorElement,
			});
			event.bubbles = false;
			event.stopPropagation();
		};

		const clickAwayHandler = function () {
			if (popperState.anchorElement) {
				setPopperState({
					isDisplayed: false,
					anchorElement: null,
				});
			}
		};

		const placement = props?.placement ?? "bottom";

		const classProp = props.classprop ? props.classprop : classes;

		classProp.popperContainer = classProp.popperContainer ?? classes.popperContainer;

		classProp.popper = classProp.popper ?? classes.popper;

		classProp.arrow = classProp.arrow ?? classes.arrow;

		return (
			<div className={classProp.popperContainer} data-qa="popperContainer" onClick={e => e.preventDefault()}>
				{defaultComponent}
				<Popper
					placement={placement}
					data-qa="poperComponent"
					className={classProp.popper}
					modifiers={{
						offset: {
							offset: "0, 10",
						},
						arrow: {
							enabled: true,
							element: classProp.arrow,
						},
					}}
					open={popperState.isDisplayed}
					anchorEl={popperState.anchorElement}
				>
					<ClickAwayListener onClickAway={() => clickAwayHandler()}>
						<div>
							<Arrow arrowClass={classProp.arrow} />
							{popperValue}
						</div>
					</ClickAwayListener>
				</Popper>
			</div>
		);
	};

export default withDeferredPopper;
