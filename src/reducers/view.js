import Immutable from "immutable";
import {
	VIEW_SET,
	VIEW_SET_FIELD,
	VIEW_CREATE_EDIT_NODE,
	VIEW_REMOVE_EDIT_NODE,
	VIEW_SET_EDIT_MODEL_FIELD,
} from "../actions/view";
import { isEqual } from "lodash";

const initialState = Immutable.Map({});

const viewStateReducer = (state = initialState, action) => {
	switch (action.type) {
		case VIEW_SET: {
			return state.set(action.payload.name, Immutable.fromJS(action.payload.value));
		}
		case VIEW_SET_FIELD: {
			return state.setIn(
				[action.payload.name, action.payload.field],
				Immutable.fromJS(action.payload.value),
			);
		}
		case VIEW_CREATE_EDIT_NODE: {
			const { moduleName, entityId, modulesData } = action.payload;

			const pages = modulesData[moduleName].pages;

			const pageKeys = Object.keys(pages)
			// if at some point it will be possible that there could be more than 1 page per module
			// it will be necessary to remake this part and to receive page key as a property
			const sections = pages[pageKeys[0]];

			return state.setIn(["edit", moduleName, entityId], Immutable.fromJS(sections));
		}
		case VIEW_REMOVE_EDIT_NODE: {
			const { moduleName, entityId } = action.payload;

			return state.removeIn(["edit", moduleName, entityId]);
		}
		case VIEW_SET_EDIT_MODEL_FIELD: {
			const { keys, value, storeValue, entityId, sectionName, moduleName } = action.payload;

			const path = ["edit", moduleName, entityId, sectionName, "model"].concat(keys);

			return state.setIn(path, Immutable.fromJS({ value, wasModified: !isEqual(value, storeValue) }));
		}
		default:
			return state;
	}
};

export default viewStateReducer;
