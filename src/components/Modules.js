import React from "react";
import { connect } from "react-redux";
import { ImmutableFragment as RenderFragment } from "redux-little-router/lib/immutable";
import { getCurrentScope } from "../selectors/route";
import Navigation from "./Navigation";
import Segments from "./Segments";

export const Module = ({
	name,
	pages = {},
	component: MainPage,
	mode,
	root,
}) => {
	if (mode === "segments") {
		return <Segments pages={pages} root={root} />;
	}
	return (
		<React.Fragment>
			{Object.entries(pages).map(([route, page]) => {
				const { component: Page } = page;
				return (
					<RenderFragment key={route} forRoute={route}>
						<Page />
					</RenderFragment>
				);
			})}
			<RenderFragment forRoute="/">
				<MainPage />
			</RenderFragment>
		</React.Fragment>
	);
};

export const Modules = ({ modules, scope }) => (
	<React.Fragment>
		<Navigation modules={modules} />
		{Object.entries(modules).map(([name, { pages, component, mode }]) => {
			return (
				<RenderFragment key={name} forRoute={"/" + name}>
					<Module
						{...{ name, pages, component, mode }}
						root={"/" + scope + "/" + name}
					/>
				</RenderFragment>
			);
		})}
	</React.Fragment>
);

/* istanbul ignore next */
export default connect(
	/* istanbul ignore next */ state => ({ scope: getCurrentScope(state) }),
)(Modules);
