// @flow
import { withStateHandlers, mapProps, compose } from "recompose";

const withMenuState = withStateHandlers(
	({ initOpen = false }) => ({ open: initOpen }),
	{
		openMenu: () => () => ({ open: true }),
		closeMenu: () => () => ({ open: false }),
	},
);

const withMenuProps = mapProps(
	({ open, openMenu, closeMenu, ...otherProps }) => {
		const props = Object.assign({}, otherProps);
		props.sidebarMenu = { open, openMenu, closeMenu };
		return props;
	},
);

export default compose(withMenuState, withMenuProps);
