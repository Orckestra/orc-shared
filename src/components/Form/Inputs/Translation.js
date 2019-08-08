import React from "react";
import styled from "styled-components";
import { compose, withHandlers } from "recompose";
import { getThemeProp, unwrapImmutable } from "../../../utils";
import routingConnector from "../../../hocs/routingConnector";
import Icon from "../../Icon";
import Text from "../../Text";
import { orderedCultureList } from "../../../selectors/locale";
import withToggle from "../../../hocs/withToggle";
import { FormInput } from "./Text";
import { ButtonWrapper } from "./FieldButtons";

const withCultureList = routingConnector(
	state => ({
		cultures: unwrapImmutable(orderedCultureList(state)),
	}),
	dispatch => ({}),
);

const LanguageLabel = styled.label`
	flex: 0 0 auto;
	min-width: 35px;
	border: 1px solid #ccc;
	padding: 5px 10px;
	background-color: #eaeaea;
`;

export const TranslationField = ({ lang, message, onChange, required }) => (
	<ButtonWrapper invalid={required && !message}>
		<LanguageLabel>{lang}</LanguageLabel>
		<FormInput value={message} onChange={onChange} />
	</ButtonWrapper>
);
TranslationField.displayName = "TranslationField";

const withTranslationUpdater = withHandlers({
	handlers: ({ update, value, cultures }) => {
		const handlers = {};
		cultures.forEach(lang => {
			handlers[lang] = event => {
				update({ ...value, [lang]: event.target.value });
			};
		});
		return lang => handlers[lang];
	},
});

export const TranslationWrapper = styled.div`
	display: flex;
	flex-direction: column;

	& > * {
		margin-top: 10px;
	}
	& > :first-child {
		margin-top: 0;
	}
`;

export const ShowButton = styled.div.attrs({
	role: "button",
})`
	align-self: flex-end;
	cursor: pointer;
`;

export const ShowButtonChevron = styled(Icon).attrs({
	id: getThemeProp(["icons", "indicators", "down"], "chevron-down"),
})`
	font-size: 10px;
	margin-right: 5px;
	color: ${getThemeProp(["appHighlightColor"], "#000")};
`;

export const TranslationInput = ({
	handlers,
	value,
	cultures,
	showAll,
	toggle,
	required,
	moreLabel = "[more]",
}) => {
	return (
		<TranslationWrapper>
			{cultures.map((lang, index) =>
				!index || showAll ? (
					<TranslationField
						key={lang}
						lang={lang}
						message={value[lang]}
						onChange={handlers(lang)}
						required
					/>
				) : null,
			)}
			{!showAll && cultures.length > 1 ? (
				<ShowButton onClick={toggle}>
					<ShowButtonChevron />
					<Text message={moreLabel} />
				</ShowButton>
			) : null}
		</TranslationWrapper>
	);
};

export default compose(
	withToggle("showAll"),
	withCultureList,
	withTranslationUpdater,
)(TranslationInput);
