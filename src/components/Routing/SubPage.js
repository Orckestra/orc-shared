import React from "react";
import styled, { withTheme } from "styled-components";
import UrlPattern from "url-pattern";
import { getThemeProp } from "../../utils";
import Toolbar from "../Toolbar";
import withWaypointing from "./withWaypointing";

export const Backdrop = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	opacity: 0.3;
	color: #333;
`;

export const Dialog = styled.div`
	position: absolute;
	display: flex;
	flex-direction: column;
	top: 92px;
	bottom: 0;
	left: 136px;
	right: 0;
	background: white;
	border-top-left-radius: 8px;
	box-shadow: -3px 0 4px 0 rgba(0,0,0,0.25);}
`;

export const SubPage = ({ config, theme, match, location, history, root }) => {
	const { component: View, ...props } = config;
	const pattern = new UrlPattern(root);
	const baseHref = pattern.stringify(match.params);
	const WrappedView = withWaypointing(View);
	return (
		<React.Fragment>
			<Backdrop onClick={() => history.push(baseHref)} />
			<Dialog>
				<Toolbar
					tools={[
						{
							type: "button",
							key: "subPage_goBack",
							label: {
								icon: getThemeProp(["icons", "backArrow"], "back")({
									theme,
								}),
							},
							onClick: () => history.push(baseHref),
						},
						{ type: "separator", key: "subpage_sep_nav" },
					]}
				/>
				<WrappedView
					match={match}
					location={location}
					mapFrom={baseHref}
					{...props}
				/>
			</Dialog>
		</React.Fragment>
	);
};
SubPage.defaultProps = {
	theme: { icons: { backArrow: "arrow-left" } },
};

export default withTheme(SubPage);
