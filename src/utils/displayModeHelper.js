import { displayMode } from "../constants";

export const isReadMode = modeToCheck => {
	return modeToCheck === displayMode.read;
};

export const isEditMode = modeToCheck => {
	return modeToCheck === displayMode.edit;
};

export const isCreateMode = modeToCheck => {
	return modeToCheck === displayMode.create;
};

export const isMutationMode = modeToCheck => {
	return isEditMode(modeToCheck) || isCreateMode(modeToCheck);
};
