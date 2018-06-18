import React from "react";
import Header from "./Header";
import ApplicationDialog from "./ApplicationDialog";
import Modal from "../../Modal";

const getApp = (apps = [], id) => apps.filter(app => app.name === id)[0];

export const getAnchor = (className, props) => toggle => (
	<Header
		className={className}
		open={props.open}
		application={getApp(props.applications, props.applicationId)}
		toggle={toggle}
	/>
);

export const getDialog = props => toggle => (
	<ApplicationDialog {...props} toggle={toggle} />
);

const ApplicationSelector = ({ className, ...props }) => {
	return (
		<Modal
			anchor={getAnchor(className, props)}
			content={getDialog(props)}
			look="dark"
		/>
	);
};

export default ApplicationSelector;
