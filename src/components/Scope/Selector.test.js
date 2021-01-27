import React from "react";
import Immutable from "immutable";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { IntlProvider } from "react-intl";
import { Selector, Wrapper, SearchInput, InputBox } from "./Selector";
import { Wrapper as BranchWrapper } from "../Treeview/Branch";
import { Root } from "../Treeview/Leaf";
import { Label } from "../Treeview/Label";
import { ScopeIcon, ContentLabel, ScopeText } from "./ScopeNode";

describe("Selector", () => {
	let props, modalRoot, state, store, nodes;
	beforeEach(() => {
		nodes = {
			Global: {
				id: "Global",
				name: "Global",
				type: "test",
				childrenIds: ["Foo", "Bar"],
			},
			Foo: { id: "Foo", name: "Foo", type: "test" },
			Bar: { id: "Bar", name: "Bar", type: "test" },
		};
		modalRoot = document.createElement("div");
		modalRoot.id = "modal";
		document.body.appendChild(modalRoot);
		props = {
			id: "Global",
			show: true,
			reset: () => {},
			intl: { formatMessage: msg => msg.defaultMessage },
			getScope: id => nodes[id],
			defaultNodeState: { foo: true, bar: true },
			filter: "",
			updateFilter: () => {},
			filterPlaceholder: { defaultMessage: "Type a scope name" },
		};
		state = Immutable.fromJS({
			view: {},
			navigation: {
				route: {
					match: {
						path: "/:scope/Bar",
						params: { scope: "Foo" },
					},
				},
			},
			router: {},
		});
		store = { subscribe: () => {}, dispatch: () => {}, getState: () => state };
	});
	afterEach(() => {
		document.body.removeChild(modalRoot);
	});

	it("shows a side panel with search and tree with a current node", () => {
		props.currentScope = nodes["Global"];
		expect(
			<Provider store={store}>
				<MemoryRouter>
					<IntlProvider locale="en">
						<Selector {...props} />
					</IntlProvider>
				</MemoryRouter>
			</Provider>,
			"when mounted",
			"to satisfy",
			null,
		).then(() =>
			expect(
				modalRoot,
				"to satisfy",
				<div>
					<div>
						<Wrapper>
							<InputBox>
								<IntlProvider locale="en">
									<SearchInput />
								</IntlProvider>
							</InputBox>
							<BranchWrapper>
								<Root>
									<Label isSelectedNode={true}>
										<ContentLabel id="selectorNodeGlobal">
											<ScopeIcon type="test" />
											<ScopeText>Global</ScopeText>
										</ContentLabel>
									</Label>
								</Root>
							</BranchWrapper>
						</Wrapper>
					</div>
				</div>,
			),
		);
	});

	it("shows a side panel with search and tree", () =>
		expect(
			<Provider store={store}>
				<MemoryRouter>
					<IntlProvider locale="en">
						<Selector {...props} />
					</IntlProvider>
				</MemoryRouter>
			</Provider>,
			"when mounted",
			"to satisfy",
			null,
		).then(() =>
			expect(
				modalRoot,
				"to satisfy",
				<div>
					<div>
						<Wrapper>
							<InputBox>
								<IntlProvider locale="en">
									<SearchInput />
								</IntlProvider>
							</InputBox>
							<BranchWrapper>
								<Root>
									<Label>
										<ContentLabel id="selectorNodeGlobal">
											<ScopeIcon type="test" />
											<ScopeText>Global</ScopeText>
										</ContentLabel>
									</Label>
								</Root>
							</BranchWrapper>
						</Wrapper>
					</div>
				</div>,
			),
		));
});
