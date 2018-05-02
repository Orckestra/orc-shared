import React from "react";
import Header from "./Header";
import ApplicationDialog from "./ApplicationDialog";
import Modal from "../../Modal";

const ApplicationSelector = ({ className, ...props }) => {
	const [thisApp] = (props.applications || []).filter(
		app => app.id === props.applicationId,
	);
	return (
		<Modal
			anchor={
				<Header className={className} open={props.open} application={thisApp} />
			}
			content={<ApplicationDialog {...props} />}
			look="dark"
		/>
	);
};

export default ApplicationSelector;
