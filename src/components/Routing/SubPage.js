import React from "react";
import styled, { withTheme } from "styled-components";
import { connect } from "react-redux";
import { compose } from "recompose";
import UrlPattern from "url-pattern";
import { getThemeProp, memoize } from "../../utils";
import routingConnector from "../../hocs/routingConnector";
import withErrorBoundary from "../../hocs/withErrorBoundary";
import { mapHref } from "../../actions/navigation";
import Toolbar from "../Toolbar";
import withWaypointing from "./withWaypointing";

const getWrappedView = memoize((path, View) =>
	withErrorBoundary(path)(withWaypointing(View)),
);

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
	box-shadow: -3px 0 4px 0 rgba(0, 0, 0, 0.25);
	z-index: 100;
`;

export const SubPage = ({
	config,
	tools = [],
	theme,
	match,
	location,
	history,
	root,
	dispatch,
}) => {
	const { component: View, ...props } = config;
	const pattern = new UrlPattern(root);
	const baseHref = pattern.stringify(match.params);
	const WrappedView = getWrappedView(location.pathname, View);
	const closeSubPage = () => {
		history.push(baseHref);
		dispatch(mapHref(baseHref, baseHref));
	};
	return (
		<React.Fragment>
			<Backdrop onClick={closeSubPage} />
			<Dialog>
				<Toolbar
					tools={[
						{
							type: "button",
							key: "subPage_goBack",
							id: "subPage_goBack",
							label: {
								icon: getThemeProp(
									["icons", "backArrow"],
									"back",
								)({
									theme,
								}),
							},
							onClick: closeSubPage,
						},
						{ type: "separator", key: "subpage_sep_nav" },
						...tools,
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

const mapToolFuncs = (dispatch, { config }) => {
	if (typeof config.toolFuncSelector !== "function") return { dispatch };
	return {
		funcs: config.toolFuncSelector(dispatch),
		dispatch,
	};
};

const mapToolbar = (state, { config, funcs }) => {
	if (typeof config.toolStateSelector !== "function") return {};
	return {
		tools: config.toolStateSelector(state, funcs),
	};
};

export const withToolbar = compose(
	routingConnector(() => ({}), mapToolFuncs),
	connect(mapToolbar, () => ({})),
	withTheme,
);

export default withToolbar(SubPage);
