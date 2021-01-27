import React from "react";
import { mount } from "enzyme";
import Placeholder from "./Placeholder";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Icon from "./../Icon";
import Skeleton from "@material-ui/lab/Skeleton";

describe("Placeholder", () => {
	const icon = "orders";
	const title = "Test Title";
	const subtitle = "Test Subtitle";

	it("Renders placeholder with all parametres", () => {
		const component = <Placeholder icon={icon} title={title} subtitle={subtitle} />;

		const mountedComponent = mount(component);
		const expected = (
			<Grid>
				<Icon id={icon} />
				<Typography>{title}</Typography>
				<Typography>{subtitle}</Typography>
			</Grid>
		);

		expect(mountedComponent.containsMatchingElement(expected), "to be truthy");
	});

	it("Renders placeholder when icon param is missed", () => {
		const component = <Placeholder title={title} subtitle={subtitle} />;

		const mountedComponent = mount(component);
		const expected = (
			<Grid>
				<Typography>{title}</Typography>
				<Typography>{subtitle}</Typography>
			</Grid>
		);

		expect(mountedComponent.containsMatchingElement(expected), "to be truthy");
	});

	it("Renders placeholder when title param is missed", () => {
		const component = <Placeholder icon={icon} subtitle={subtitle} />;

		const mountedComponent = mount(component);
		const expected = (
			<Grid>
				<Icon id={icon} />
				<Typography>{subtitle}</Typography>
			</Grid>
		);

		expect(mountedComponent.containsMatchingElement(expected), "to be truthy");
	});

	it("Renders placeholder when subtitle param is missed", () => {
		const component = <Placeholder icon={icon} title={title} />;

		const mountedComponent = mount(component);
		const expected = (
			<Grid>
				<Icon id={icon} />
				<Typography>{title}</Typography>
			</Grid>
		);

		expect(mountedComponent.containsMatchingElement(expected), "to be truthy");
	});
	it("Renders placeholder when cellList has value ", () => {
		const component = <Placeholder cellList={["t", "t", "t", "status"]} />;

		const mountedComponent = mount(component);
		const expected = (
			<div>
				<div>
					<Skeleton />
				</div>
				<div>
					<Skeleton />
				</div>
				<div>
					<Skeleton />
				</div>
				<div>
					<Skeleton />
				</div>
			</div>
		);

		expect(mountedComponent.containsMatchingElement(expected), "to be truthy");
	});
});
