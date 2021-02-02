import React from "react";
import { mount } from "enzyme";
import sinon from "sinon";
import Collapse from "@material-ui/core/Collapse";
import Typography from "@material-ui/core/Typography";
import Icon from "../Icon";
import { TestWrapper, createMuiTheme, extractMessages } from "../../../../utils/testUtils";
import InputBase from "@material-ui/core/InputBase";
import Translation, { compareTranslateStrings } from "./Translation";
import sharedMessages from "../../../../sharedMessages";
import { buildUrl } from "../../../../utils/buildUrl";

const messages = extractMessages(sharedMessages);

describe("Translation", () => {
	const cultures = ["en-CA", "en-US", "fr-CA"];
	const defaultCulture = "en-US";

	const theme = createMuiTheme();

	it("Renders Translation correctly", () => {
		const component = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }} intlProvider={{ messages }}>
				<Translation cultures={cultures} defaultCulture={defaultCulture} />
			</TestWrapper>
		);

		const expected = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<div>
					{
						<div key={"en-US"}>
							<div>
								<div>
									<label>{"en-US"}</label>
									<InputBase />
								</div>
							</div>
						</div>
					}
					<Collapse in={false} timeout="auto">
						{[
							<div key={"en-CA"}>
								<div>
									<div>
										<label>{"en-CA"}</label>
										<InputBase />
									</div>
								</div>
							</div>,
							<div key={"fr-CA"}>
								<div>
									<div>
										<label>{"fr-CA"}</label>
										<InputBase />
									</div>
								</div>
							</div>,
						]}
					</Collapse>
					<div>
						<Icon color="primary" id="chevron-down" />
						<Typography color="primary" children={"Show more languages"} />
					</div>
				</div>
			</TestWrapper>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Renders Translation with error correctly", () => {
		const aError = "Error";

		const component = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }} intlProvider={{ messages }}>
				<Translation cultures={cultures} defaultCulture={defaultCulture} errors={aError} />
			</TestWrapper>
		);

		const expected = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<div>
					{
						<div key={"en-US"}>
							<div>
								<div>
									<label>{"en-US"}</label>
									<InputBase />
								</div>
								<div>{aError}</div>
							</div>
						</div>
					}
					<Collapse in={false} timeout="auto">
						{[
							<div key={"en-CA"}>
								<div>
									<div>
										<label>{"en-CA"}</label>
										<InputBase />
									</div>
								</div>
							</div>,
							<div key={"fr-CA"}>
								<div>
									<div>
										<label>{"fr-CA"}</label>
										<InputBase />
									</div>
								</div>
							</div>,
						]}
					</Collapse>
					<div>
						<Icon color="primary" id="chevron-down" />
						<Typography color="primary" children={"Show more languages"} />
					</div>
				</div>
			</TestWrapper>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Translation component handles change", () => {
		const aValue = "aValue";
		const update = sinon.spy().named("update");

		const component = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }} intlProvider={{ messages }}>
				<Translation cultures={cultures} defaultCulture={defaultCulture} update={update} />
			</TestWrapper>
		);

		const mountedComponent = mount(component);

		const input = mountedComponent.find("input");
		input.at(0).simulate("change", { target: { value: aValue } });
		expect(update, "to have calls satisfying", [{ args: [{ ["en-US"]: aValue }] }]);
	});

	it("Compare translate strings", () => {
		expect(
			compareTranslateStrings,
			"called with",
			[{}, { cultures: ["en-US"], value: { "en-US": "value" } }],
			"to equal",
			false,
		);
	});

	it("Compare the same translate strings", () => {
		expect(
			compareTranslateStrings,
			"called with",
			[{ value: {} }, { cultures: ["en-US"], value: { "en-Ca": "value" } }],
			"to equal",
			true,
		);
	});
});
