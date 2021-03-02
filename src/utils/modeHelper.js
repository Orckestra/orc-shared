import { mode } from "./../constants";

export const isReadMode = modeToCheck => {
	return modeToCheck === mode.read;
};

export const isEditMode = modeToCheck => {
	return modeToCheck === mode.edit;
};

export const isCreateMode = modeToCheck => {
	return modeToCheck === mode.create;
};

export const isMutationMode = modeToCheck => {
	return isEditMode(modeToCheck) || isCreateMode(modeToCheck);
};
