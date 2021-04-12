import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useSelectorAndUnwrap from "../../hooks/useSelectorAndUnwrap";
import { hasOpenedTabs, selectCurrentModuleName } from "../../selectors/navigation";
import { applicationScopeHasChanged } from "../../actions/scopes";
import useScopeData from "./useScopeData";
import { hasUnsavedDataSelector } from "../../selectors/view";
import { scopeConfirmationDialogTypes } from "../../constants";
import { useHistory } from "react-router-dom";
import UrlPattern from "url-pattern";

const useApplicationScopeChanger = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const moduleName = useSelectorAndUnwrap(selectCurrentModuleName);

	return (previousScope, newScope) => {
		const params = {
			scope: newScope,
		};

		// did not find a more reliable way to get the URL for the first tab of the module
		const pattern = new UrlPattern(`/:scope/${moduleName}`);
		const href = pattern.stringify(params);

		history.push(href);
		dispatch(applicationScopeHasChanged(previousScope, newScope));
	};
};

const useScopeConfirmationModalState = () => {
	const [currentScope] = useScopeData();
	const [isModalOpened, setModalOpened] = React.useState(false);
	const hasUnsavedData = useSelector(hasUnsavedDataSelector);
	const [newScope, setNewScope] = useState(null);
	const changeApplicationScope = useApplicationScopeChanger();
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
