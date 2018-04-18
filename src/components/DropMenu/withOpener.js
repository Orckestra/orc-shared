// @flow
import { withStateHandlers } from "recompose";
import type { ComponentType } from "react";
import type { DropMenuProps, ExpandedMenuProps } from "./DropMenu";

type WithOpener = (
	ComponentType<ExpandedMenuProps>,
) => ComponentType<DropMenuProps>;

const withOpener: WithOpener = withStateHandlers(
	({ initOpen = false }) => ({ open: initOpen }),
	{
		toggle: ({ open }) => () => ({ open: !open }),
	},
);

export default withOpener;
