import Immutable from "immutable";
import { createSelector } from "reselect";

const tasksData = state => state.get("tasks");

export const taskInfo = taskId => {
	return createSelector(tasksData, tasks => {
		return tasks.getIn(["taskInfos", taskId]) || null;
	});
};

export const taskLogs = taskId => {
	return createSelector(tasksData, tasks => {
		return tasks.getIn(["logs", taskId]) || Immutable.List();
	});
};
