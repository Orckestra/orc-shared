import React from "react";
import {
	Selector,
	Wrapper,
	SearchInput,
	InputBox,
	SelectorPanel,
} from "./Selector";
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
			defaultNodeState: { foo: true, bar: true },
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
					<InputBox>
						<SearchInput
							placeholder="Type a scope name"
							value={props.filter}
							onChange={props.updateFilter}
						/>
					</InputBox>
					<Treeview
						Content={ScopeNode}
						rootId="Global"
						getNode={props.getScope}
						openAll={false}
						closeSelector={props.reset}
						defaultNodeState={{ foo: true, bar: true }}
					/>
				</Wrapper>
			</SelectorPanel>,
		));
});
