// @flow

export type ApplicationItemProps = {
	id: string,
	src: string,
	label: string,
	href: string,
};

export type ApplicationListProps = {
	applications: Array<ApplicationItemProps>,
	applicationId: string,
};
