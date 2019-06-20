import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { getThemeProp, memoize, unwrapImmutable } from "../../utils";
import Sidepanel from "../Sidepanel";
import Button from "../Button";
import Text from "../Text";
import FieldElements from "../Form/FieldElements";
import withViewState from "../../hocs/withViewState";
import { setValue } from "../../actions/view";
import { changeLocale } from "../../actions/locale";
import { localizedAppOptionSelector } from "../../selectors/applications";
import {
	currentLocale,
	orderedCultureOptionList,
} from "../../selectors/locale";
import { defaultAppId } from "../../selectors/settings";

export const PREFS_NAME = "__prefsDialog";

const PrefPanel = styled(Sidepanel)`
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

const Header = styled.div`
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

const PrefForm = styled.div`
	flex: 1 1 auto;
	display: flex;
	flex-direction: column;
	padding: 20px 30px;
	font-size: 12px;
`;

const Footer = styled.div`
	flex: 0 0 auto;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	background-color: #ffffff;
	border-top: 1px solid #ccc;
	padding-right: 10px;
	height: 60px;
`;

const PrefButton = styled(Button)`
	margin-right: 20px;
	min-width: 110px;
`;

const getUpdater = memoize(update =>
	memoize(name => value => update(name, value)),
);

// Use FieldElements to build a form?
const Preferences = ({
	save,
	clear,
	viewState,
	updateViewState,
	language,
	applications,
	messages,
}) => (
	<PrefPanel in={viewState.show} width="380px" timeout={400}>
		<Header>
			<Text message={messages.preferences} />
		</Header>
		<PrefForm>
			<FieldElements
				fields={[
					{
						label: messages.language,
						type: "Selector",
						name: "language",
						options: language.options,
					},
					{
						label: messages.defaultApp,
						type: "Selector",
						name: "application",
						options: applications.options,
					},
				]}
				getUpdater={getUpdater(updateViewState)}
				values={{
					language: language.current || "",
					application: applications.current || "",
					...viewState,
				}}
			/>
		</PrefForm>
		<Footer>
			<PrefButton onClick={clear}>
				<Text message={messages.cancel} />
			</PrefButton>
			<PrefButton primary onClick={() => save(viewState)}>
				<Text message={messages.save} />
			</PrefButton>
		</Footer>
	</PrefPanel>
);

const withPreferences = connect(
	state => ({
		language: {
			current: currentLocale(state),
			options: unwrapImmutable(orderedCultureOptionList(state)),
		},
		applications: {
			current: defaultAppId(state),
			options: unwrapImmutable(localizedAppOptionSelector(state)),
		},
	}),
	(dispatch, { actions }) => ({
		clear: () => dispatch(setValue(PREFS_NAME, { show: false })),
		save: ({ language, application }) => {
			if (language) {
				dispatch(changeLocale(language));
				dispatch(actions.saveLanguage(language));
				// TODO: reload any language dependent data?
			}
			if (application) {
				dispatch(actions.saveApplication(application));
			}
			dispatch(setValue(PREFS_NAME, { show: false }));
		},
	}),
);

const WiredPrefs = withPreferences(withViewState(Preferences));

export default props => <WiredPrefs name={PREFS_NAME} {...props} />;
