import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useSelectorAndUnwrap from "../../hooks/useSelectorAndUnwrap";
import { hasOpenedTabs, selectCurrentModuleName, selectClosingTabHandlerActions } from "../../selectors/navigation";
import { applicationScopeHasChanged } from "../../actions/scopes";
import useScopeData from "./useScopeData";
import { hasUnsavedDataSelector } from "../../selectors/view";
import { scopeConfirmationDialogTypes } from "../../constants";

const ExecuteClosingTabHandlerActions = async closingTabHandlerActions => {
	if (closingTabHandlerActions.length <= 0) return Promise.resolve();

	for (const action of closingTabHandlerActions) {
		await action.closeTab(null, true);
	}
};

const useApplicationScopeChanger = closingTabHandlerActions => {
	const dispatch = useDispatch();
	const moduleName = useSelectorAndUnwrap(selectCurrentModuleName);

	return (previousScope, newScope) => {
		ExecuteClosingTabHandlerActions(closingTabHandlerActions).then(() => {
			dispatch(applicationScopeHasChanged(previousScope, newScope, moduleName));
		});
	};
};

const useScopeConfirmationModalState = () => {
	const [currentScope] = useScopeData();
	const [isModalOpened, setModalOpened] = React.useState(false);
	const hasUnsavedData = useSelector(hasUnsavedDataSelector);
	const [newScope, setNewScope] = useState(null);

	const closingTabHandlerActions = useSelector(selectClosingTabHandlerActions);

	const changeApplicationScope = useApplicationScopeChanger(closingTabHandlerActions);

	let dialogIsNeeded = useSelector(hasOpenedTabs);

	const openModal = () => setModalOpened(true);
	const closeModal = () => setModalOpened(false);

	let scopeDialogType = scopeConfirmationDialogTypes.none;

	if (dialogIsNeeded) {
		scopeDialogType = hasUnsavedData
			? scopeConfirmationDialogTypes.hasUnsavedDataMessage
			: scopeConfirmationDialogTypes.scopeChangeConfirmation;
	}

	const acceptScopeChange = () => {
		closeModal();
		changeApplicationScope(currentScope.id, newScope);
		setNewScope(null);
	};

	const selectNewScope = newSelection => {
		setNewScope(newSelection);

		if (newSelection) {
			if (scopeDialogType !== scopeConfirmationDialogTypes.none) {
				openModal();
			} else {
				changeApplicationScope(currentScope.id, newSelection);
			}
		}
	};

	return [isModalOpened, closeModal, scopeDialogType, acceptScopeChange, selectNewScope];
};

export default useScopeConfirmationModalState;
