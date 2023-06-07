import React, { useMemo } from "react";
import { useDispatch } from "react-redux";
import UrlPattern from "url-pattern";
import withErrorBoundary from "../../hocs/withErrorBoundary";
import { mapHref } from "../../actions/navigation";
import withWaypointing from "./withWaypointing";
import Modal from "../MaterialUI/DataDisplay/Modal";
import ModalProps from "../MaterialUI/DataDisplay/modalProps";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import sharedMessages from "../../sharedMessages";
import { FormattedMessage } from "react-intl";

const useStyles = makeStyles(theme => ({
	actionPanel: {
		display: "flex",
		marginLeft: "auto",
		flex: "1 1 0",
		justifyContent: "flex-end",
	},
}));

export const SubPage = ({ config, match, location, history, root, modulePrependPath, parentUrlPattern }) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	let { component: View, ...props } = config;
	const pattern = new UrlPattern(root);
	const baseHref = pattern.stringify(match.params);
	const path = location.pathname;

	const WrappedView = useMemo(() => withErrorBoundary(path)(withWaypointing(View)), [path, View]);
	const closeSubPage = () => {
		const parentHref = parentUrlPattern.stringify(match.params);
		history.push(parentHref);
		dispatch(mapHref(parentHref, parentHref));
	};

	const message = (
		<WrappedView
			match={match}
			location={location}
			mapFrom={baseHref}
			{...props}
			modulePrependPath={modulePrependPath}
		/>
	);

	const modalProps = new ModalProps();

	const titleComponent = props?.title?.id ? (
		<FormattedMessage id={props?.title?.id} defaultMesaage={props?.title?.defaultMessage} />
	) : (
		props?.title
	);

	modalProps.set(ModalProps.propNames.title, titleComponent);
	modalProps.set(ModalProps.propNames.open, true);
	modalProps.set(ModalProps.propNames.type, "fullwidth");
	modalProps.set(ModalProps.propNames.backdropClickCallback, closeSubPage);

	const actionPanel = (
		<div className={classes.actionPanel}>
			<Button variant="contained" color="primary" disableElevation onClick={closeSubPage}>
				<FormattedMessage {...sharedMessages.close} />
			</Button>
		</div>
	);

	modalProps.set(ModalProps.propNames.actionPanel, actionPanel);

	return <Modal message={message} modalProps={modalProps} />;
};
SubPage.defaultProps = {
	theme: { icons: { backArrow: "arrow-left" } },
};

export default SubPage;
