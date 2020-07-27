import React from "react";
import { mount } from "enzyme";
import { TextProps } from "../textProps";
import TooltippedTypography from "./TooltippedElements/TooltippedTypography";
import Address from "./Address";
import Grid from "@material-ui/core/Grid";
import { ignoreConsoleError } from "../../../utils/testUtils";

describe("Address", () => {
	const name = "My test address";
	const contactPerson = "Test Test";
	const line1 = "123 Test street";
	const line2 = "Test building test entrance";
	const city = "CityTest";
	const province = "ProvinceTest";
	const postalCode = "QWE12345";
	const country = "CountryTest";
	const email = "test@test.com";
	const phone = "000-000-000";

	const cityProvincePostalCode = `${city}, ${province}, ${postalCode}`;

	it("Renders Address when all parameters passed", () => {
		const component = (
			<Address
				name={name}
				contactPerson={contactPerson}
				line1={line1}
				line2={line2}
				city={city}
				province={province}
				postalCode={postalCode}
				country={country}
				email={email}
				phone={phone}
			/>
		);

		const mountedComponent = mount(component);

		const expected = (
			<Grid container>
				<TooltippedTypography children={name} titleValue={name} />
				<TooltippedTypography children={contactPerson} titleValue={contactPerson} />
				<TooltippedTypography children={line1} titleValue={line1} />
				<TooltippedTypography children={line2} titleValue={line2} />
				<TooltippedTypography children={cityProvincePostalCode} titleValue={cityProvincePostalCode} />
				<TooltippedTypography children={country} titleValue={country} />
				<TooltippedTypography children={email} titleValue={email} />
				<TooltippedTypography children={phone} titleValue={phone} />
			</Grid>
		);

		expect(mountedComponent.containsMatchingElement(expected), "to be true");
	});

	it("Renders Address when just required parameters passed", () => {
		const component = (
			<Address line1={line1} city={city} province={province} postalCode={postalCode} country={country} />
		);

		const mountedComponent = mount(component);

		const expected = (
			<Grid container>
				<TooltippedTypography children={line1} titleValue={line1} />
				<TooltippedTypography children={cityProvincePostalCode} titleValue={cityProvincePostalCode} />
				<TooltippedTypography children={country} titleValue={country} />
			</Grid>
		);

		expect(mountedComponent.containsMatchingElement(expected), "to be true");
	});

	it("Use style passed to component", () => {
		const addressTextProps = new TextProps();
		const test = "testRoot";
		addressTextProps.set(TextProps.propNames.classes, test);
		const component = (
			<Address
				line1={line1}
				city={city}
				province={province}
				postalCode={postalCode}
				country={country}
				textProps={addressTextProps}
			/>
		);

		const mountedComponent = mount(component);

		expect(mountedComponent.exists(".testRoot"), "to be true");
	});

	it("Fails if textProps has wrong type", () => {
		ignoreConsoleError(() => {
			const component = <Address textProps="Wrong Type" />;
			expect(() => mount(component), "to throw a", TypeError);
		});
	});
});
