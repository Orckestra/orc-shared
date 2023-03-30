import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import { FormattedMessage } from "react-intl";
import { makeStyles } from "@material-ui/core/styles";
import { taskStatuses } from "../constants";
import useSelectorAndUnwrap from "../hooks/useSelectorAndUnwrap";
import InformationItem from "./MaterialUI/DataDisplay/PredefinedElements/InformationItem";
import { taskInfo, taskLogs } from "../selectors/tasks";
import { compareObjectProperty } from "../utils/propertyHelper";
import useLoader from "../hooks/useLoader";
import { clearTaskLog, getTaskInfo, getTaskLog } from "../actions/tasks";
import ModalProps from "./MaterialUI/DataDisplay/modalProps";
import Modal from "./MaterialUI/DataDisplay/Modal";
import { namedLookupLocalizedSelector } from "../selectors/metadata";
import sharedMessages from "../sharedMessages";

export const useStyles = makeStyles(theme => ({
	actionPanel: {
		display: "flex",
		marginLeft: "auto",
		flex: "1 1 0",
		justifyContent: "flex-end",
	},
	taskContainer: {
		display: "flex",
		width: "100%",
		flexDirection: "column",
		"&>div": {
			"&:last-child": {
				flex: 1,
				display: "flex",
				flexDirection: "column",
				"&>textarea": {
					overflowY: "scroll",
					resize: "none",
					flex: 1,
				},
			},
		},
	},
}));

const isTaskCompleted = status => {
	switch (status) {
		case taskStatuses.faulted:
		case taskStatuses.ranToCompletion:
		case taskStatuses.canceled:
		case taskStatuses.ignored:
			return true;
		default:
			return false;
	}
};

const TaskDetailsModal = ({ taskId, open, closeModal }) => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const taskDetails = useSelectorAndUnwrap(taskInfo(taskId));
	const logs = useSelectorAndUnwrap(taskLogs(taskId));
	const logsText = logs
		.sort((a, b) => compareObjectProperty(a, b, "executionTime"))
		.reduce((accumulator, currentValue) => {
			if (currentValue.message === null) {
				return accumulator;
			}
			if (accumulator === "") {
				return currentValue.message.trim();
			}
			return accumulator + "\n" + currentValue.message.trim();
		}, "");

	useLoader(getTaskInfo(taskId), () => taskDetails !== null);

	const internalCloseModal = () => {
		dispatch(clearTaskLog(taskId));
		closeModal();
	};

	const taskStatus = taskDetails?.status;

	useEffect(() => {
		const timer = setInterval(() => {
			if (!isTaskCompleted(taskStatus)) {
				dispatch(getTaskInfo(taskId));
				dispatch(getTaskLog(taskId));
			}
		}, 10000);
		return () => clearInterval(timer);
	}, [dispatch, taskId, taskStatus]);

	const localizedStatus = useSelector(namedLookupLocalizedSelector("order", "TaskStatus", taskStatus));
	const modalProps = new ModalProps();
	const titleComponent = <FormattedMessage {...sharedMessages.taskInProgressModalTitle} />;

	modalProps.set(ModalProps.propNames.title, titleComponent);
	modalProps.set(ModalProps.propNames.open, open);
	modalProps.set(ModalProps.propNames.type, "wide");
	modalProps.set(ModalProps.propNames.backdropClickCallback, internalCloseModal);

	const actionPanel = (
		<div className={classes.actionPanel}>
			<Button
				key={sharedMessages.close.id}
				data-qa={sharedMessages.close.id}
				variant="contained"
				color="primary"
				disableElevation={true}
				onClick={e => internalCloseModal(e)}
			>
				<FormattedMessage {...sharedMessages.close} />
			</Button>
		</div>
	);

	modalProps.set(ModalProps.propNames.actionPanel, actionPanel);

	const taskContent = (
		<div className={classes.taskContainer}>
			<InformationItem label={sharedMessages.taskId}>{taskId}</InformationItem>
			<InformationItem label={sharedMessages.taskStatus}>{localizedStatus}</InformationItem>
			<InformationItem label={sharedMessages.taskLogs}>
				<textarea readOnly value={logsText} />
			</InformationItem>
		</div>
	);

	return <Modal message={taskContent} modalProps={modalProps} />;
};

export default TaskDetailsModal;
