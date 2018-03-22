// @flow

export type ApplicationItemProps = {
	src: string,
	label: string,
	href: string,
};

export type ApplicationListProps = {
	applications: {
		[string]: ApplicationItemProps,
	},
	applicationId: string,
	applicationOrder: string[],
};
