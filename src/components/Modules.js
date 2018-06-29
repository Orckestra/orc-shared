import React from "react";
import { ImmutableFragment as RenderFragment } from "redux-little-router/lib/immutable";
import Navigation from "./Navigation";

const Modules = ({ modules }) => (
	<React.Fragment>
		<Navigation modules={modules} />
		{Object.keys(modules).map(name => {
			const { pages = {}, component: MainPage } = modules[name];
			return (
				<RenderFragment key={name} forRoute={"/" + name}>
					<React.Fragment>
						{Object.keys(pages).map(route => {
							const { component: Page } = pages[route];
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
				</RenderFragment>
			);
		})}
	</React.Fragment>
);

export default Modules;
