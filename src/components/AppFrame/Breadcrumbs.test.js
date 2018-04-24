import React from "react";
import Breadcrumbs, { CrumbWrapper, Crumb, CrumbLink } from "./Breadcrumbs";

const testHOC = Comp => props => <Comp test {...props} />;

describe("Breadcrumbs", () => {
	let path;
	beforeEach(() => {
		path = [
			{ label: "Parent", href: "/one" },
			{ label: "Child", href: "/one/two" },
			{ label: "Grandchild", href: "/one/two/three" },
		];
	});

	it("renders a breadcrumb trail based on the steps given it", () =>
		expect(
			<Breadcrumbs linkHOC={x => x} path={path} />,
			"to render as",
			<CrumbWrapper>
				<Crumb>
					<CrumbLink href="/one">Parent</CrumbLink>
				</Crumb>
				<Crumb>
					<CrumbLink href="/one/two">Child</CrumbLink>
				</Crumb>
				<Crumb>
					<CrumbLink href="/one/two/three">Grandchild</CrumbLink>
				</Crumb>
			</CrumbWrapper>,
		));

	it("enhances the steps of the trail with the HOC given", () =>
		expect(
			<Breadcrumbs linkHOC={testHOC} path={path} />,
			"to deeply render as",
			<CrumbWrapper>
				<Crumb>
					<CrumbLink test />
				</Crumb>
				<Crumb>
					<CrumbLink test />
				</Crumb>
				<Crumb>
					<CrumbLink test />
				</Crumb>
			</CrumbWrapper>,
		));
});
