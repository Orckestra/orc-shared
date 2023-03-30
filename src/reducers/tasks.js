import Immutable from "immutable";
import { safeGet } from "../utils";
import {
	GET_TASK_LIST_SUCCESS,
	DELETE_TASK_REQUEST,
	GET_TASK_LOG_SUCCESS,
	CLEAR_TASK_LOG,
	GET_TASKINFO_SUCCESS,
} from "../actions/tasks";
import { compareObjectProperty } from "../utils/propertyHelper";

const initialState = Immutable.fromJS({
	tasks: [],
	taskInfos: {},
	logs: {},
});

const tasks = (state = initialState, action) => {
	switch (action.type) {
		case GET_TASKINFO_SUCCESS:
			return state.setIn(["taskInfos", action.payload.taskId], Immutable.fromJS(action.payload));
		case GET_TASK_LIST_SUCCESS:
			return state.set(
				"tasks",
				Immutable.fromJS(action.payload.sort((a, b) => compareObjectProperty(a, b, "created"))),
			);
		case DELETE_TASK_REQUEST:
			const deleteTaskId = safeGet(action, "meta", "taskId");

			return state.withMutations(s => {
				s.set(
					"tasks",
					s.get("tasks").filter(task => task.get("taskId") !== deleteTaskId),
				);
				s.deleteIn(["logs", deleteTaskId]);
				s.deleteIn(["taskInfos", deleteTaskId]);
			});
		case GET_TASK_LOG_SUCCESS:
			const logTaskId = safeGet(action, "meta", "taskId");
			if (action.payload?.length > 0) {
				return state.setIn(
					["logs", logTaskId],
					Immutable.fromJS(action.payload.sort((a, b) => compareObjectProperty(a, b, "executionTime"))),
				);
			} else {
				return state.deleteIn(["logs", logTaskId]);
			}
		case CLEAR_TASK_LOG:
			const taskId = safeGet(action, "meta", "taskId");
			return state.deleteIn(["logs", taskId]);
		default:
			return state;
	}
};

export default tasks;
