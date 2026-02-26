import React from "react";
import sinon from "sinon";
import Selector from "./Selector";
import { TestWrapper, createMuiTheme } from "./../../../utils/testUtils";
import Immutable from "immutable";
import SelectMUI from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TooltippedTypography from "../../MaterialUI/DataDisplay/TooltippedElements/TooltippedTypography";
import Icon from "../../MaterialUI/DataDisplay/Icon";
import { mount } from "enzyme";

describe("Selector", () => {
	let update, state, store, chevronDown;
	beforeEach(() => {
		update = sinon.spy().named("update");

		state = Immutable.fromJS({
			locale: {
				locale: "en-CA",
			},
		});

		store = {
			subscribe: () => {},
			dispatch: () => {},
			getState: () => state,
		};

		chevronDown = props => {
			return <Icon id="dropdown-chevron-down" {...props} />;
		};
	});

	const theme = createMuiTheme();

	it("renders a selector with multiple options", () =>
		expect(
			<TestWrapper provider={{ store }} intlProvider stylesProvider muiThemeProvider={{ theme }}>
				<Selector
					update={update}
					value="English"
					options={[
						{ value: "English", label: "English" },
						{ value: "Francais", label: "Francais" },
					]}
				/>
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper provider={{ store }} intlProvider stylesProvider muiThemeProvider={{ theme }}>
				<SelectMUI value="English" disableUnderline={true} IconComponent={chevronDown} error={false}>
					<MenuItem key="English" value="English">
						<TooltippedTypography children="English" titleValue="English" />
					</MenuItem>
					<MenuItem key="Francais" value="Francais">
						<TooltippedTypography noWrap children="Francais" titleValue="Francais" />
					</MenuItem>
				</SelectMUI>
			</TestWrapper>,
		));

	it("renders a selector with an error", () => {
		expect(
			<TestWrapper provider={{ store }} intlProvider stylesProvider muiThemeProvider={{ theme }}>
				<Selector
					update={update}
					required={true}
					value={null}
					options={[
						{ value: "English", label: "English" },
						{ value: "Francais", label: "Francais" },
					]}
				/>
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper provider={{ store }} intlProvider stylesProvider muiThemeProvider={{ theme }}>
				<div>
					<SelectMUI value="" disableUnderline={true} IconComponent={chevronDown} error={true}>
						<MenuItem key="English" value="English">
							<TooltippedTypography children="English" titleValue="English" />
						</MenuItem>
						<MenuItem key="Francais" value="Francais">
							<TooltippedTypography noWrap children="Francais" titleValue="Francais" />
						</MenuItem>
					</SelectMUI>
					<div></div>
				</div>
			</TestWrapper>,
		);
	});

	it("Update is invoked when selection has changed", () => {
		const mountedComponent = mount(
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider intlProvider>
				<Selector
					update={update}
					required={true}
					value={null}
					options={[
						{ value: "English", label: "English" },
						{ value: "Francais", label: "Francais" },
					]}
				/>
			</TestWrapper>,
		);

		const selectMui = mountedComponent.find(SelectMUI);

		const event = {
			target: {
				value: "Francais",
			},
		};

		selectMui.invoke("onChange")(event);

		expect(update, "to have calls satisfying", [{ args: ["Francais"] }]);
	});
});
