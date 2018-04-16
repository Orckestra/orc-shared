// @flow
import React from "react";
import type { StatelessFunctionalComponent } from "react";
import Header from "./Header";
import ApplicationDialog from "./ApplicationDialog";
import type { ApplicationListProps } from "./types";
import Modal from "../../Modal";

type AppSelectorProps = { open: boolean } & ApplicationListProps;
type AppSelectorComp = StatelessFunctionalComponent<AppSelectorProps>;

const ApplicationSelector: AppSelectorComp = props => {
	const [thisApp] = props.applications.filter(
		app => app.id === props.applicationId,
	);
	return (
		<Modal
			anchor={<Header open={props.open} application={thisApp} />}
			content={<ApplicationDialog {...props} />}
			look="dark"
		/>
	);
};

export default ApplicationSelector;
