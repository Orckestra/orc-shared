import React from "react";
import { mount } from "enzyme";
import TextProps from "../../textProps";
import TooltippedTypography from "../TooltippedElements/TooltippedTypography";
import Address from "./Address";
import Grid from "@material-ui/core/Grid";
import { ignoreConsoleError } from "../../../../utils/testUtils";

describe("Address", () => {
	it("Renders Address when all parameters are passed", () => {
		const address = {
			addressName: "My test address",
			firstName: "TestFirstName",
			lastName: "TestLastName",
			line1: "123 Test line1",
			line2: "Test line2",
			city: "CityTest",
			regionCode: "RegionTest",
			postalCode: "QWE12345",
			country: "Canada",
			email: "test@test.com",
			phoneNumber: "000-000-000",
			notes: "Test address information",
		};

		const contactPerson = `${address.firstName} ${address.lastName}`;

		const cityRegionPostalCode = `${address.city}, ${address.regionCode}, ${address.postalCode}`;

		const component = <Address address={address} />;

		const mountedComponent = mount(component);

		const expected = (
			<Grid container>
				<TooltippedTypography children={address.addressName} titleValue={address.addressName} />
				<TooltippedTypography children={contactPerson} titleValue={contactPerson} />
				<TooltippedTypography children={address.line1} titleValue={address.line1} />
				<TooltippedTypography children={address.line2} titleValue={address.line2} />
				<TooltippedTypography children={cityRegionPostalCode} titleValue={cityRegionPostalCode} />
				<TooltippedTypography children={address.country} titleValue={address.country} />
				<TooltippedTypography children={address.notes} titleValue={address.notes} />
				<TooltippedTypography children={address.email} titleValue={address.email} />
				<TooltippedTypography children={address.phoneNumber} titleValue={address.phoneNumber} />
			</Grid>
		);

		expect(mountedComponent.containsMatchingElement(expected), "to be true");
	});

	it("Renders Address when just required parameters are passed", () => {
		const address = {
			line1: "123 Test line1",
			city: "CityTest",
			regionCode: "RegionTest",
			postalCode: "QWE12345",
			country: "Canada",
		};

		const cityRegionPostalCode = `${address.city}, ${address.regionCode}, ${address.postalCode}`;

		const component = <Address address={address} />;

		const mountedComponent = mount(component);

		const expected = (
			<Grid container>
				<TooltippedTypography children={address.line1} titleValue={address.line1} />
				<TooltippedTypography children={cityRegionPostalCode} titleValue={cityRegionPostalCode} />
				<TooltippedTypography children={address.country} titleValue={address.country} />
			</Grid>
		);

		expect(mountedComponent.containsMatchingElement(expected), "to be true");
	});

	it("Renders Address with just firstName when lastName is not passed", () => {
		const address = {
			firstName: "TestFirstName",
			line1: "123 Test line1",
			city: "CityTest",
			regionCode: "RegionTest",
			postalCode: "QWE12345",
			country: "Canada",
		};

		const cityRegionPostalCode = `${address.city}, ${address.regionCode}, ${address.postalCode}`;

		const component = <Address address={address} />;

		const mountedComponent = mount(component);

		const expected = (
			<Grid container>
				<TooltippedTypography children={address.firstName} titleValue={address.firstName} />
				<TooltippedTypography children={address.line1} titleValue={address.line1} />
				<TooltippedTypography children={cityRegionPostalCode} titleValue={cityRegionPostalCode} />
				<TooltippedTypography children={address.country} titleValue={address.country} />
			</Grid>
		);

		expect(mountedComponent.containsMatchingElement(expected), "to be true");
	});

	it("Renders Address with just lastName when firstName is not passed", () => {
		const address = {
			lastName: "TestLastName",
			line1: "123 Test line1",
			city: "CityTest",
			regionCode: "RegionTest",
			postalCode: "QWE12345",
			country: "Canada",
		};

		const cityRegionPostalCode = `${address.city}, ${address.regionCode}, ${address.postalCode}`;

		const component = <Address address={address} />;

		const mountedComponent = mount(component);

		const expected = (
			<Grid container>
				<TooltippedTypography children={address.lastName} titleValue={address.lastName} />
				<TooltippedTypography children={address.line1} titleValue={address.line1} />
				<TooltippedTypography children={cityRegionPostalCode} titleValue={cityRegionPostalCode} />
				<TooltippedTypography children={address.country} titleValue={address.country} />
			</Grid>
		);

		expect(mountedComponent.containsMatchingElement(expected), "to be true");
	});

	it("Use style passed to component", () => {
		const address = {
			line1: "123 Test line1",
			city: "CityTest",
			regionCode: "RegionTest",
			postalCode: "QWE12345",
			country: "Canada",
		};
		const addressTextProps = new TextProps();
		const test = "testRoot";
		addressTextProps.set(TextProps.propNames.classes, test);
		const component = <Address address={address} textProps={addressTextProps} />;

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
