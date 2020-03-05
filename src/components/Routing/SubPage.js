import React, { useMemo } from "react";
import styled, { useTheme } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import UrlPattern from "url-pattern";
import { getThemeProp } from "../../utils";
import withErrorBoundary from "../../hocs/withErrorBoundary";
import { mapHref } from "../../actions/navigation";
import Toolbar from "../Toolbar";
import withWaypointing from "./withWaypointing";

export const Backdrop = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	opacity: 0.3;
	color: ${getThemeProp(["colors", "text"], "#333333")};
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

export const SubPage = ({ config, match, location, history, root }) => {
	const theme = useTheme();
	const dispatch = useDispatch();
	let {
		component: View,
		toolStateSelector = () => [],
		toolFuncSelector = () => ({}),
		...props
	} = config;
	const toolSelector = state => toolStateSelector(state, toolFuncSelector(dispatch));
	const tools = useSelector(toolSelector);
	const pattern = new UrlPattern(root);
	const baseHref = pattern.stringify(match.params);
	const path = location.pathname;
	const WrappedView = useMemo(() => withErrorBoundary(path)(withWaypointing(View)), [
		path,
		View,
	]);
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
				<WrappedView match={match} location={location} mapFrom={baseHref} {...props} />
			</Dialog>
		</React.Fragment>
	);
};
SubPage.defaultProps = {
	theme: { icons: { backArrow: "arrow-left" } },
};

export default SubPage;
