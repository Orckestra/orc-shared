import React from "react";
import Immutable from "immutable";
import sinon from "sinon";
import { TestWrapper, createMuiTheme } from "./../../../utils/testUtils";
import { mount } from "enzyme";
import ScopeTreeView from "./ScopeTreeView";
import ScopeSelector from "./ScopeSelector";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import InputBase from "./../Inputs/InputBase";
import InputBaseProps from "./../Inputs/InputBaseProps";
import sharedMessages from "./../../../sharedMessages";
import { extractMessages } from "./../../../utils/testUtils";

const messages = extractMessages(sharedMessages);

describe("ScopeSelected", () => {
	let store, state;

	beforeEach(() => {
		state = Immutable.fromJS({
			navigation: {
				route: {
					location: {},
					match: {
						path: "/:scope/Bar",
						params: { scope: "Foo" },
					},
				},
			},
		});
		store = {
			getState: () => state,
			subscribe: () => {},
			dispatch: sinon.spy().named("dispatch"),
		};
	});

	const modalRoot = document.createElement("div");
	modalRoot.id = "modal";

	beforeEach(() => {
		document.body.appendChild(modalRoot);
	});

	afterEach(() => {
		document.body.removeChild(modalRoot);
	});

	const theme = createMuiTheme();

	const closeSelector = sinon.spy();
	const getScope = jest.fn();
	const selectedScope = "Global";
	const filter = "";
	const updateFilter = jest.fn();

	it("Renders scope selector correctly", () => {
		const component = (
			<TestWrapper
				provider={{ store }}
				memoryRouter
				intlProvider={{ messages }}
				stylesProvider
				muiThemeProvider={{ theme }}
			>
				<ScopeSelector
					show={true}
					closeSelector={closeSelector}
					getScope={getScope}
					selectedScope={selectedScope}
					filter={filter}
					updateFilter={updateFilter}
				/>
			</TestWrapper>
		);

		const inputBaseProps = new InputBaseProps();

		inputBaseProps.set(InputBaseProps.propNames.placeholder, sharedMessages.scopeFilterPlaceholder.defaultMessage);
		inputBaseProps.set(InputBaseProps.propNames.value, "");
		inputBaseProps.set(InputBaseProps.propNames.update, updateFilter);

		const expected = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<div>
					<div>
						<ClickAwayListener onClickAway={e => closeSelector(e)}>
							<div>
								<>
									<div>
										<InputBase inputProps={inputBaseProps} />
									</div>
									<div>
										<ScopeTreeView
											rootId="Global"
											getScope={getScope}
											selected={selectedScope.id}
											expanded={selectedScope.scopePath}
											onSelected={closeSelector}
										/>
									</div>
								</>
							</div>
						</ClickAwayListener>
					</div>
				</div>
			</TestWrapper>
		);

		expect(component, "when mounted", "to satisfy", null).and(() => expect(modalRoot, "to satisfy", expected));
	});

	it("Calls close selector on click away", () => {
		const component = (
			<TestWrapper
				provider={{ store }}
				memoryRouter
				intlProvider={{ messages }}
				stylesProvider
				muiThemeProvider={{ theme }}
			>
				<ScopeSelector
					show={true}
					closeSelector={closeSelector}
					getScope={getScope}
					selectedScope={selectedScope}
					filter={filter}
					updateFilter={updateFilter}
				/>
			</TestWrapper>
		);

		const mountedComponent = mount(component);

		const clickAwayListener = mountedComponent.find(ClickAwayListener);

		clickAwayListener.invoke("onClickAway")();

		expect(closeSelector, "was called");
	});

	it("isScopeSelectable is passed to ScopeTreeView", () => {
		const fn = sinon.spy().named("isScopeSelectable");
		const component = (
			<TestWrapper
				provider={{ store }}
				memoryRouter
				intlProvider={{ messages }}
				stylesProvider
				muiThemeProvider={{ theme }}
			>
				<ScopeSelector
					show={true}
					closeSelector={closeSelector}
					getScope={getScope}
					selectedScope={selectedScope}
					filter={filter}
					updateFilter={updateFilter}
					isScopeSelectable={fn}
				/>
			</TestWrapper>
		);

		const mountedComponent = mount(component);

		const treeView = mountedComponent.find(ScopeTreeView);

		expect(treeView.props().isScopeSelectable, "to be", fn);
	});
});
