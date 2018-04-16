// @flow
import React from "react";
import type { StatelessFunctionalComponent } from "react";
import Header from "./Header";
import type { HeaderProps } from "./Header";
import ApplicationDialog from "./ApplicationDialog";
import type { ApplicationListProps } from "./types";
import Modal from "../../Modal";

type AppSelectorProps = HeaderProps & ApplicationListProps;
type AppSelectorComp = StatelessFunctionalComponent<AppSelectorProps>;

const ApplicationSelector: AppSelectorComp = props => {
	return (
		<Modal
			anchor={<Header {...props} />}
			content={<ApplicationDialog {...props} />}
			look="dark"
		/>
	);
};

export default ApplicationSelector;
