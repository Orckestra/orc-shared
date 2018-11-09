import React from "react";
import { connect } from "react-redux";
import { ImmutableFragment as RenderFragment } from "redux-little-router/lib/immutable";
import withErrorBoundary from "../hocs/withErrorBoundary";
import { getCurrentScope } from "../selectors/route";
import Navigation from "./Navigation";
import Segments from "./Segments";

export const Module = withErrorBoundary("Module")(
	({ name, pages = {}, component: MainPage, mode, root, error }) => {
		if (error) {
			return (
				<span>
					Module {name} errored: {error.message}
				</span>
			);
		}
		if (mode === "segments") {
			return <Segments pages={pages} root={root} />;
		}
		if (!MainPage) {
			return <span>Module {name} needs a renderable component</span>;
		}
		return (
			<React.Fragment>
				{Object.entries(pages).map(([route, page]) => {
					if (page.mode === "segments") {
						return (
							<RenderFragment key={route} forRoute={route}>
								<Segments pages={page.pages} root={root + route} />
							</RenderFragment>
						);
					}
					const { component: Page } = page;
					if (!Page) {
						return (
							<span>
								Page {page.name} under module {name} did not have a renderable
								component
							</span>
						);
					}
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
	},
);

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
