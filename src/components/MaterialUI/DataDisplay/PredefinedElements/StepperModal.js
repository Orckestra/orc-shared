import React, { useState, useEffect, useCallback } from "react";
import { FormattedMessage } from "react-intl";
import classNames from "classnames";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "../Modal";
import ModalProps from "../modalProps";
import sharedMessages from "./../../../../sharedMessages";

const useStyles = makeStyles(theme => ({
	actionPanel: {
		float: "right",
	},
	container: {
		width: "100%",
		height: theme.spacing(56),
		wordWrap: "normal",
	},
	step: {
		position: "relative",
		display: "inline-block",
		fontFamily: theme.typography.button.fontFamily,
		fontSize: theme.typography.h3Size,
		letterSpacing: "0",
		lineHeight: theme.spacing(2),
		textTransform: theme.typography.button.textTransform,
		padding: theme.spacing(1, 0),
		marginRight: theme.spacing(0.4),

		"&:not(:first-child)": {
			backgroundColor: theme.palette.grey.borders,
			color: "#FFF",
			width: "auto",
			paddingLeft: `${theme.spacing(3)} !important`,
		},

		"&:last-child": {
			paddingRight: theme.spacing(2.4),
			borderRadius: theme.spacing(0, 0.8, 0, 0),
		},

		"&:not(:first-child):not(:last-child):after, &:not(:last-child):before": {
			content: "' '",
			width: 0,
			height: 0,
			position: "absolute",
			top: 0,
			zIndex: 2,
			border: `${theme.spacing(2)} solid transparent`,
			borderLeft: `${theme.spacing(2)} solid ${theme.palette.grey.borders}`,
			borderRightWidth: 0,
		},

		"&:not(:last-child):before": {
			zIndex: 1,
			left: "100%",
			borderLeft: `${theme.spacing(2)} solid ${theme.palette.grey.lighter}`,
			transform: `translateX(${theme.spacing(0.4)})`,
		},
	},
	active: {
		backgroundColor: `${theme.palette.primary.dark} !important`,
		boxShadow: "inset 10px 0 10px 1px rgba(0,0,0,0.18)",

		"&:after": {
			borderLeftColor: `${theme.palette.primary.dark} !important`,
		},
	},

	done: {
		backgroundColor: `${theme.palette.primary.main} !important`,
		boxShadow: "0 1px 1px 0 rgba(0,0,0,0.1)",

		"&:after": {
			borderLeftColor: `${theme.palette.primary.main} !important`,
		},
	},
}));

const StepperModal = ({
	steps = [],
	title = "",
	open,
	closeCallback,
	confirmCallback,
	confirmTitle,
	type = "wide",
}) => {
	const classes = useStyles();
	const [currentStep, changeCurrentStep] = useState(0);

	useEffect(() => {
		if (open) {
			changeCurrentStep(0);
		}
	}, [open]);

	const modalProps = new ModalProps();

	const titleComponent = (
		<div>
			<div className={classes.step}>{title}</div>
			{steps.map(({ title }, index) => (
				<div
					key={index}
					className={classNames(
						classes.step,
						index < currentStep && classes.done,
						index === currentStep && classes.active,
					)}
				>
					{title}
				</div>
			))}
		</div>
	);
	const contentComponent = <div className={classes.container}>{steps[currentStep]?.content}</div>;
	const nextDisabledFunction = steps[currentStep]?.nextDisabled;
	const nextDisabled = nextDisabledFunction ? !!nextDisabledFunction() : false;

	modalProps.set(ModalProps.propNames.title, titleComponent);
	modalProps.set(ModalProps.propNames.open, open);
	modalProps.set(ModalProps.propNames.backdropClickCallback, closeCallback);
	modalProps.set(ModalProps.propNames.type, type);

	const nextClick = useCallback(() => changeCurrentStep(step => step + 1), []);
	const backClick = useCallback(() => changeCurrentStep(step => step - 1), []);

	const actionPanel = (
		<>
			{!!currentStep && (
				<Button variant="contained" color="primary" onClick={backClick} disableElevation>
					<FormattedMessage {...sharedMessages.back} />
				</Button>
			)}
			<div className={classes.actionPanel}>
				<Button variant="outlined" onClick={closeCallback}>
					<FormattedMessage {...sharedMessages.cancel} />
				</Button>
				{currentStep < steps.length - 1 && (
					<Button variant="contained" color="primary" disabled={nextDisabled} onClick={nextClick} disableElevation>
						<FormattedMessage {...sharedMessages.next} />
					</Button>
				)}
				{currentStep === steps.length - 1 && (
					<Button
						variant="contained"
						color="primary"
						disabled={nextDisabled}
						onClick={confirmCallback}
						disableElevation
					>
						{confirmTitle || <FormattedMessage {...sharedMessages.applyChanges} />}
					</Button>
				)}
			</div>
		</>
	);

	modalProps.set(ModalProps.propNames.actionPanel, actionPanel);

	return <Modal message={contentComponent} modalProps={modalProps} />;
};

export default StepperModal;
