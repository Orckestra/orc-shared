import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FormattedMessage } from "react-intl";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { memoize, unwrapImmutable } from "../../utils";
import Sidepanel from "../Sidepanel";
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

const useStyles = makeStyles(theme => ({
	prefPanel: {
		backgroundColor: "#f7f7f7",
		borderLeft: `1px solid ${theme.palette.grey.borders}`,
		borderTop: `1px solid ${theme.palette.grey.borders}`,
		borderTopLeftRadius: theme.spacing(0.5),
		top: theme.spacing(4),
		boxShadow: `${theme.spacing(-0.3, 0.2, 0.5, 0)} rgba(0, 0, 0, 0.2)`,
		zIndex: 9998,
		transition: "right 400ms ease-out",
	},
	header: {
		flex: "0 0 auto",
		borderBottom: `1px solid ${theme.palette.grey.borders}`,
		borderTopLeftRadius: theme.spacing(0.5),
		padding: theme.spacing(1.5, 3),
		height: theme.spacing(1.8),
		fontSize: theme.spacing(1.5),
		fontFamily: theme.typography.button.fontFamily,
		textTransform: "uppercase",
		color: theme.palette.primary.main,
		backgroundColor: "#ffffff",
	},
	prefForm: {
		flex: "1 1 auto",
		display: "flex",
		flexDirection: "column",
		padding: theme.spacing(2, 3),
		fontSize: theme.spacing(1.2),
	},
	footer: {
		flex: "0 0 auto",
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-end",
		backgroundColor: "#ffffff",
		borderTop: `1px solid ${theme.palette.grey.borders}`,
		paddingRight: theme.spacing(1),
		height: theme.spacing(6),
	},
	prefButton: {
		marginRight: theme.spacing(2),
		minWidth: theme.spacing(11),
	},
	wrapper: {
		display: "flex",
		flexDirection: "column",
		height: "100%",
	},
}));

export const Wrapper = withClickOutside(
	React.forwardRef(({ children }, ref) => {
		const classes = useStyles();

		return (
			<div ref={ref} className={classes.wrapper}>
				{children}
			</div>
		);
	}),
);

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
	const classes = useStyles();

	const { show, save, clear, languageOptions, languageSelectProps, applicationOptions, applicationSelectProps } =
		usePreferenceSetup();
	return (
		<Sidepanel in={show} widthSpacing={38} timeout={400} className={classes.prefPanel}>
			<Wrapper onClickOutside={clickOutsideHandler}>
				<div className={classes.header}>
					<FormattedMessage {...sharedMessages.preferences} />
				</div>
				<div className={classes.prefForm}>
					<InformationItem label={sharedMessages.displayLanguage}>
						<Select options={languageOptions} selectProps={languageSelectProps} />
					</InformationItem>
					<InformationItem label={sharedMessages.defaultApp}>
						<Select options={applicationOptions} selectProps={applicationSelectProps} />
					</InformationItem>
				</div>
				<div className={classes.footer}>
					<Button id="cancelPrefs" onClick={clear} className={classes.prefButton} variant="outlined">
						<FormattedMessage {...sharedMessages.cancel} />
					</Button>
					<Button id="savePrefs" onClick={save} className={classes.prefButton} variant="outlined" color="primary">
						<FormattedMessage {...sharedMessages.save} />
					</Button>
				</div>
			</Wrapper>
		</Sidepanel>
	);
};

export default Preferences;
