import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { getThemeProp, memoize, unwrapImmutable } from "../../utils";
import Sidepanel from "../Sidepanel";
import Button from "../Button";
import Text from "../Text";
import { FormContext } from "../Form/Form";
import FieldElements from "../Form/FieldElements";
import useViewState from "../../hooks/useViewState";
import { setValue } from "../../actions/view";
import { setDefaultLanguage } from "../../actions/locale";
import { setMyApplication } from "../../actions/applications";
import { changeLocale } from "../../actions/locale";
import { localizedAppOptionSelector } from "../../selectors/applications";
import {
	currentLocale,
	orderedCultureOptionList,
} from "../../selectors/locale";
import { defaultAppId } from "../../selectors/settings";

export const PREFS_NAME = "__prefsDialog";

export const PrefPanel = styled(Sidepanel)`
	background-color: #f7f7f7;
	border-left: 1px solid #ccc;
	border-top: 1px solid #ccc;
	border-top-left-radius: 5px;
	top: 40px;
	box-shadow: -3px 2px 5px 0px rgba(0, 0, 0, 0.2);
	z-index: 9998;
	display: flex;
	flex-direction: column;
`;

export const Header = styled.div`
	flex: 0 0 auto;
	border-bottom: 1px solid #ccc;
	border-top-left-radius: 5px;
	padding: 15px 30px;
	height: 18px;
	font-size: 15px;
	font-family: ${getThemeProp(["fonts", "header"], "sans-serif")};
	text-transform: uppercase;
	color: ${getThemeProp(["appHighlightColor"], "#ccc")};
	background-color: #ffffff;
`;

export const PrefForm = styled.div`
	flex: 1 1 auto;
	display: flex;
	flex-direction: column;
	padding: 20px 30px;
	font-size: 12px;
`;

export const Footer = styled.div`
	flex: 0 0 auto;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	background-color: #ffffff;
	border-top: 1px solid #ccc;
	padding-right: 10px;
	height: 60px;
`;

export const PrefButton = styled(Button)`
	margin-right: 20px;
	min-width: 110px;
`;

export const createGetUpdater = memoize(update =>
	memoize(name => value => update(name, value)),
);

const usePreferenceSetup = () => {
	const dispatch = useDispatch();
	const [viewState, updateViewState] = useViewState(PREFS_NAME);
	return {
		show: viewState.show,
		values: {
			language: useSelector(currentLocale),
			application: useSelector(defaultAppId) || "",
			...viewState,
		},
		getUpdater: createGetUpdater(updateViewState),
		languageOptions: unwrapImmutable(useSelector(orderedCultureOptionList)),
		applicationOptions: unwrapImmutable(
			useSelector(localizedAppOptionSelector),
		),
		clear: () => dispatch(setValue(PREFS_NAME, { show: false })),
		save: () => {
			if (viewState.language) {
				dispatch(changeLocale(viewState.language));
				dispatch(setDefaultLanguage(viewState.language));
				// TODO: reload any language dependent data?
			}
			if (viewState.application) {
				dispatch(setMyApplication(viewState.application));
			}
			dispatch(setValue(PREFS_NAME, { show: false }));
		},
	};
};

export const Preferences = ({ messages }) => {
	const {
		show,
		getUpdater,
		save,
		clear,
		languageOptions,
		applicationOptions,
		values,
	} = usePreferenceSetup();
	return (
		<PrefPanel in={show} width="380px" timeout={400}>
			<Header>
				<Text message={messages.preferences} />
			</Header>
			<PrefForm>
				<FormContext.Provider value={{ values }}>
					<FieldElements
						fields={[
							{
								label: messages.language,
								type: "Selector",
								name: "language",
								options: languageOptions,
							},
							{
								label: messages.defaultApp,
								type: "Selector",
								name: "application",
								options: applicationOptions,
							},
						]}
						getUpdater={getUpdater}
					/>
				</FormContext.Provider>
			</PrefForm>
			<Footer>
				<PrefButton id="cancelPrefs" onClick={clear}>
					<Text message={messages.cancel} />
				</PrefButton>
				<PrefButton id="savePrefs" primary onClick={save}>
					<Text message={messages.save} />
				</PrefButton>
			</Footer>
		</PrefPanel>
	);
};

export default Preferences;
