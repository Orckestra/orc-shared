import React from "react";
import { Selector, Wrapper, SearchInput, SelectorPanel } from "./Selector";
import ScopeNode from "./ScopeNode";
import Treeview from "../Treeview";

describe("Selector", () => {
	let props;
	beforeEach(() => {
		props = {
			show: true,
			reset: () => {},
			intl: { formatMessage: msg => msg.defaultMessage },
			getScope: () => {},
			openAll: false,
			nodeState: {},
			updateNodeState: () => {},
			filter: "",
			updateFilter: () => {},
			filterPlaceholder: { defaultMessage: "Type a scope name" },
		};
	});

	it("shows a side panel with search and tree", () =>
		expect(
			<Selector {...props} />,
			"to render as",
			<SelectorPanel in>
				<Wrapper onClickOutside={props.reset}>
					<SearchInput
						placeholder="Type a scope name"
						value={props.filter}
						onChange={props.updateFilter}
					/>
					<Treeview
						Content={ScopeNode}
						rootId="Global"
						getNode={props.getScope}
						openAll={false}
						nodeState={props.nodeState}
						updateNodeState={props.updateNodeState}
						closeSelector={props.reset}
					/>
				</Wrapper>
			</SelectorPanel>,
		));
});
