import { withStateHandlers } from "recompose";

const withOpener = withStateHandlers(
	({ initOpen = false }) => ({ open: initOpen }),
	{
		toggle: ({ open }) => () => ({ open: !open }),
	},
);

export default withOpener;
