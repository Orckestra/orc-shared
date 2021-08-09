import React from "react";
import { mount } from "enzyme";
import Badge from "./Badge";
import BadgeMui from "@material-ui/core/Badge";
import { makeStyles } from "@material-ui/core/styles";

describe("Badge", () => {
	it("Renders Badge when children was passed", () => {
		const badge = 10;
		const children = <p>Hello</p>;

		const component = <Badge badge={badge} children={children} />;

		const mountedComponent = mount(component);

		const expected = <BadgeMui badgeContent={badge}>{children}</BadgeMui>;

		expect(mountedComponent.containsMatchingElement(expected), "to be true");
	});

	it("Renders Badge when children was not passed", () => {
		const badge = 10;

		const component = <Badge badge={badge} />;

		const mountedComponent = mount(component);

		const expected = <BadgeMui badgeContent={badge} />;

		expect(mountedComponent.containsMatchingElement(expected), "to be true");
	});

	it("Renders Badge when classprop is not null", () => {
		const useStyles = makeStyles(theme => ({
			badge: {
				color: theme.palette.background.default,
				height: theme.spacing(2.8),
				borderRadius: theme.spacing(2.8),
				padding: theme.spacing(1),
			},
		}));

		const badge = 10;
		const children = <p>Hello</p>;

		const Component = () => {
			const customClass = useStyles();
			return <Badge badge={badge} children={children} classProp={customClass} />;
		};

		const mountedComponent = mount(<Component />);

		const mountedProps = mountedComponent.prop("classProp");

		expect(mountedProps, "not to be null");

		const expected = <BadgeMui badgeContent={badge}>{children}</BadgeMui>;

		expect(mountedComponent.containsMatchingElement(expected), "to be true");
	});
});
