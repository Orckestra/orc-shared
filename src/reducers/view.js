import Immutable from "immutable";
import {
	VIEW_SET,
	VIEW_SET_FIELD,
	VIEW_INITIALIZE_EDIT_TREE,
	VIEW_CREATE_EDIT_NODE,
	VIEW_REMOVE_EDIT_NODE,
	VIEW_SET_EDIT_MODEL
} from "../actions/view";

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
		case VIEW_INITIALIZE_EDIT_TREE: {
			const modules = action.payload;
			const moduleNames = Object.keys(modules);
			const editTree = {};
			for (const moduleName of moduleNames) {
				editTree[moduleName] = {};
			}

			return state.set("edit", Immutable.fromJS(editTree));
		}
		case VIEW_CREATE_EDIT_NODE: {
			const moduleName = action.payload.moduleName;
			const id = action.payload.entityId;
			const modulesData = action.payload.modulesData;

			const pages = modulesData[moduleName].pages;

			const pageKeys = Object.keys(pages)
			// if at some point it will be possible that there could be more than 1 page per module
			// it will be necessary to remake this part and to receive page key as a property
			const sections = pages[pageKeys[0]];

			const sectionsKeys = Object.keys(sections);

			for (const sectionKey of sectionsKeys) {
				sections[sectionKey].wasEdited = false;
			}
			return state.setIn(["edit", moduleName, id], Immutable.fromJS(sections));
		}
		case VIEW_REMOVE_EDIT_NODE: {
			const moduleName = action.payload.moduleName;
			const id = action.payload.entityId;

			return state.removeIn(["edit", moduleName, id]);
		}
		case VIEW_SET_EDIT_MODEL: {
			const moduleName = action.payload.moduleName;
			const id = action.payload.entityId;
			const sectionName = action.payload.sectionName;
			const model = action.payload.model;

			return state.setIn(["edit", moduleName, id, sectionName, "model"], Immutable.fromJS(model))
				.setIn(["edit", moduleName, id, sectionName, "wasEdited"], true);
		}
		default:
			return state;
	}
};

export default viewStateReducer;
