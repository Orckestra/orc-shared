import React from "react";
import Header from "./Header";
import ApplicationDialog from "./ApplicationDialog";
import Modal from "../../Modal";

const getApp = (apps = [], id) => apps.filter(app => app.name === id)[0];

const ApplicationSelector = ({ className, ...props }) => {
	return (
		<Modal
			anchor={
				<Header
					className={className}
					open={props.open}
					application={getApp(props.applications, props.applicationId)}
				/>
			}
			content={<ApplicationDialog {...props} />}
			look="dark"
		/>
	);
};

export default ApplicationSelector;
