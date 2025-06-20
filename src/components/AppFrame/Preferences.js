import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { getThemeProp, memoize, unwrapImmutable } from "../../utils";
import Sidepanel from "../Sidepanel";
import Button from "../Button";
import Text from "../Text";
import useViewState from "../../hooks/useViewState";
import { setValue } from "../../actions/view";
import { setDefaultLanguage } from "../../actions/locale";
import { setMyApplication } from "../../actions/applications";
import { changeLocale } from "../../actions/locale";
import { localizedAppOptionSelector } from "../../selectors/applications";
import { currentLocaleOrDefault, cultureOptionList } from "../../selectors/locale";
import { defaultAppId } from "../../selectors/settings";
import withClickOutside from "../../hocs/withClickOutside";
import { resetVersionInfo } from "../../actions/versionInfo";
import sharedMessages from "./../../sharedMessages";
import SelectProps from "../MaterialUI/Inputs/SelectProps";
import InformationItem from "../MaterialUI/DataDisplay/PredefinedElements/InformationItem";
import Select from "../MaterialUI/Inputs/Select";

export const PREFS_NAME = "__prefsDialog";

export const PrefPanel = styled(Sidepanel)`
	background-color: #f7f7f7;
	border-left: 1px solid ${getThemeProp(["colors", "borderLight"], "#cccccc")};
	border-top: 1px solid ${getThemeProp(["colors", "borderLight"], "#cccccc")};
	border-top-left-radius: 5px;
	top: 40px;
	box-shadow: -3px 2px 5px 0px rgba(0, 0, 0, 0.2);
	z-index: 9998;
	transition: right 400ms ease-out;
`;

export const Wrapper = withClickOutside(styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
`);

export const Header = styled.div`
	flex: 0 0 auto;
	border-bottom: 1px solid ${getThemeProp(["colors", "borderLight"], "#cccccc")};
	border-top-left-radius: 5px;
	padding: 15px 30px;
	height: 18px;
	font-size: 15px;
	font-family: ${getThemeProp(["fonts", "header"], "sans-serif")};
	text-transform: uppercase;
	color: ${getThemeProp(["colors", "application", "base"], "#ccc")};
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
	border-top: 1px solid ${getThemeProp(["colors", "borderLight"], "#cccccc")};
	padding-right: 10px;
	height: 60px;
`;

export const PrefButton = styled(Button)`
	margin-right: 20px;
	min-width: 110px;
`;

export const stateEventUpdater = memoize((update, key) => value => update(key, value));

const usePreferenceSetup = () => {
	const dispatch = useDispatch();
	const [viewState, updateViewState] = useViewState(PREFS_NAME);

	const initialLanguage = useSelector(currentLocaleOrDefault);
	const initialApplication = useSelector(defaultAppId) || "";

	const languageSelectProps = new SelectProps();
	languageSelectProps.set(SelectProps.propNames.value, viewState.language ?? initialLanguage);
	languageSelectProps.set(SelectProps.propNames.disabled, false);
	languageSelectProps.set(SelectProps.propNames.positionOverride, { disablePortal: true });
	languageSelectProps.set(SelectProps.propNames.update, stateEventUpdater(updateViewState, "language"));

	const applicationSelectProps = new SelectProps();
	applicationSelectProps.set(SelectProps.propNames.value, viewState.application ?? initialApplication);
	applicationSelectProps.set(SelectProps.propNames.disabled, false);
	applicationSelectProps.set(SelectProps.propNames.positionOverride, { disablePortal: true });
	applicationSelectProps.set(SelectProps.propNames.update, stateEventUpdater(updateViewState, "application"));

	return {
		show: viewState.show,
		languageOptions: unwrapImmutable(useSelector(cultureOptionList)),
		languageSelectProps,
		applicationOptions: unwrapImmutable(useSelector(localizedAppOptionSelector)),
		applicationSelectProps,
		clear: () => dispatch(setValue(PREFS_NAME, { show: false })),
		save: () => {
			if (viewState.language) {
				dispatch(changeLocale(viewState.language));
				dispatch(setDefaultLanguage(viewState.language));
				dispatch(resetVersionInfo());
				// TODO: reload any language dependent data?
			}
			if (viewState.application) {
				dispatch(setMyApplication(viewState.application));
			}
			dispatch(setValue(PREFS_NAME, { show: false }));
		},
	};
};

export const clickOutsideHandler = e => {
	e.preventDefault();
	e.stopPropagation();
};

export const Preferences = () => {
	const { show, save, clear, languageOptions, languageSelectProps, applicationOptions, applicationSelectProps } =
		usePreferenceSetup();
	return (
		<PrefPanel in={show} width="380px" timeout={400}>
			<Wrapper onClickOutside={clickOutsideHandler}>
				<Header>
					<Text message={sharedMessages.preferences} />
				</Header>
				<PrefForm>
					<InformationItem label={sharedMessages.displayLanguage}>
						<Select options={languageOptions} selectProps={languageSelectProps} />
					</InformationItem>
					<InformationItem label={sharedMessages.defaultApp}>
						<Select options={applicationOptions} selectProps={applicationSelectProps} />
					</InformationItem>
				</PrefForm>
				<Footer>
					<PrefButton id="cancelPrefs" onClick={clear}>
						<Text message={sharedMessages.cancel} />
					</PrefButton>
					<PrefButton id="savePrefs" primary onClick={save}>
						<Text message={sharedMessages.save} />
					</PrefButton>
				</Footer>
			</Wrapper>
		</PrefPanel>
	);
};

export default Preferences;
