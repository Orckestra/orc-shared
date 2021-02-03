import React, { useMemo } from "react";
import { FormattedMessage } from "react-intl";
import { makeStyles } from "@material-ui/core/styles";
import CollapsibleList from "../CollapsableList";
import CollapsibleListProps from "../collapsableListProps";
import { InputBase, InputBaseProps } from "../../Inputs";
import sharedMessages from "../../../../sharedMessages";

export const useStyles = makeStyles(theme => ({
	elementContainer: {
		marginBottom: theme.spacing(1.5),
	},
}));

const Translations = ({
	cultures,
	defaultCulture,
	value = {},
	update,
	disabled = false,
	errors = undefined,
	readOnly,
}) => {
	const classes = useStyles();
	const collapsibleListProps = new CollapsibleListProps();

	collapsibleListProps.set(CollapsibleListProps.propNames.hasMessage, true);
	collapsibleListProps.set(
		CollapsibleListProps.propNames.openMessage,
		<FormattedMessage {...sharedMessages.showMoreLanguages} />,
	);
	collapsibleListProps.set(
		CollapsibleListProps.propNames.closeMessage,
		<FormattedMessage {...sharedMessages.showFewerLanguages} />,
	);
	collapsibleListProps.set(CollapsibleListProps.propNames.expandPosition, "right");
	collapsibleListProps.set(CollapsibleListProps.propNames.containerWidth, "unset");

	const handlers = useMemo(
		() =>
			cultures.reduce((handlers, lang) => {
				handlers[lang] = fieldValue => update({ ...value, [lang]: fieldValue });
				return handlers;
			}, {}),
		[update, cultures, value],
	);

	const elementList = cultures
		.sort((ca, cb) => {
			if (ca === defaultCulture) return -1;
			if (cb === defaultCulture) return 1;
			return 0;
		})
		.map(lang => {
			const inputProps = new InputBaseProps();
			inputProps.set(InputBaseProps.propNames.label, lang);
			inputProps.set(InputBaseProps.propNames.value, value[lang]);
			inputProps.set(InputBaseProps.propNames.update, handlers[lang]);
			inputProps.set(InputBaseProps.propNames.disabled, disabled);
			inputProps.set(InputBaseProps.propNames.readOnly, readOnly);
			inputProps.set(InputBaseProps.propNames.error, errors?.[lang]);
			return (
				<div key={lang} className={classes.elementContainer}>
					<InputBase inputProps={inputProps} />
				</div>
			);
		});

	const [defaultElement, ...otherElements] = elementList;

	return (
		<CollapsibleList
			collapsableListProps={collapsibleListProps}
			defaultElement={defaultElement}
			otherElements={otherElements}
		/>
	);
};

export const compareTranslateStrings = (prev, next) =>
	!next.cultures?.some(c => (prev.value && prev.value[c]) !== (next.value && next.value[c])) &&
	prev.errors === next.errors &&
	prev.update === next.update;

export default React.memo(Translations, compareTranslateStrings);
