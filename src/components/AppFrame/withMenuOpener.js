import { withStateHandlers } from "recompose";

const withMenuOpener = withStateHandlers(
	({ initOpen = false }) => ({ open: initOpen }),
	{
		openMenu: () => () => ({ open: true }),
		closeMenu: () => () => ({ open: false }),
	},
);

export default withMenuOpener;
