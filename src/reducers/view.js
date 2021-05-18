import Immutable from "immutable";
import {
	VIEW_SET,
	VIEW_SET_FIELD,
	VIEW_REMOVE_EDIT_NODE,
	VIEW_SET_EDIT_MODEL_FIELD,
	VIEW_SET_EDIT_MODEL_FIELD_ERRORS,
	VIEW_SET_EDIT_MODEL_ERRORS,
	VIEW_REMOVE_EDIT_MODEL,
	VIEW_REMOVE_EDIT_MODEL_FIELD_ERRORS,
	VIEW_REMOVE_EDIT_MODEL_FIELD,
} from "../actions/view";
import { APPLICATION_SCOPE_HAS_CHANGED } from "../actions/scopes";
import { isEqual, dropRight } from "lodash";

const initialState = Immutable.Map({});

const viewStateReducer = (state = initialState, action) => {
	switch (action.type) {
		case VIEW_SET: {
			return state.set(action.payload.name, Immutable.fromJS(action.payload.value));
		}
		case VIEW_SET_FIELD: {
			return state.setIn([action.payload.name, action.payload.field], Immutable.fromJS(action.payload.value));
		}
		case VIEW_REMOVE_EDIT_NODE: {
			const { moduleName, entityId } = action.payload;

			return state.removeIn(["edit", moduleName, entityId]);
		}
		case VIEW_REMOVE_EDIT_MODEL: {
			const { moduleName, sectionName, entityId, keys } = action.payload;

			const path = ["edit", moduleName, entityId, sectionName, "model"].concat(keys);

			return state.removeIn(path);
		}
		case VIEW_SET_EDIT_MODEL_FIELD: {
			const { keys, value, storeValue, entityId, sectionName, moduleName } = action.payload;

			const path = ["edit", moduleName, entityId, sectionName, "model"].concat(keys);

			return state.setIn(path, Immutable.fromJS({ value, wasModified: !isEqual(value, storeValue) }));
		}
		case VIEW_REMOVE_EDIT_MODEL_FIELD: {
			const { keys, storeValue, entityId, sectionName, moduleName } = action.payload;

			const pathToDelete = ["edit", moduleName, entityId, sectionName, "model"].concat(keys);
			const removed = state.removeIn(pathToDelete);

			const newPath = dropRight(pathToDelete, 1);
			const value = removed.getIn(newPath);

			const pathToUpdate = newPath[newPath.length - 1] === "value" ? dropRight(newPath, 1) : newPath;

			return state.setIn(pathToUpdate, Immutable.fromJS({ value, wasModified: !isEqual(value.toJS(), storeValue) }));
		}
		case VIEW_SET_EDIT_MODEL_FIELD_ERRORS: {
			const { keys, error, entityId, sectionName, moduleName } = action.payload;
			const path = ["edit", moduleName, entityId, sectionName, "model", ...keys, "error"];
			return state.setIn(path, error);
		}
		case VIEW_REMOVE_EDIT_MODEL_FIELD_ERRORS: {
			const { keys, entityId, sectionName, moduleName } = action.payload;
			const path = ["edit", moduleName, entityId, sectionName, "model", ...keys, "error"];
			return state.removeIn(path);
		}
		case VIEW_SET_EDIT_MODEL_ERRORS: {
			const { errors, entityId, sectionName, moduleName } = action.payload;
			errors.forEach(item => {
				if (item.keys) {
					const path = ["edit", moduleName, entityId, sectionName, "model", ...item.keys, "error"];
					state = state.setIn(path, item.error);
				}
			});

			return state;
		}
		case APPLICATION_SCOPE_HAS_CHANGED: {
			return state.remove("edit");
		}
		default:
			return state;
	}
};

export default viewStateReducer;
