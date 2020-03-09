import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { ifFlag, getThemeProp } from "../../utils";
import Tab from "./Tab";

export const TabBar = styled.div`
	flex: 0 0 10px;
	max-height: 10px;
	padding: 0 0 0 10px;
	margin: 0 200px 0 0;
	height: 10px;
	display: flex;
	align-items: flex-end;
	width: calc(100% - 210px);
	font-family: ${getThemeProp(["fonts", "header"], "sans-serif")};
	font-size: 13px;
	text-transform: uppercase;
`;

const InnerBar = styled.div`
	position: relative;
	flex: 0 1 100%;
	margin-left: -10px;
	padding-left: 10px;
	z-index: 0;
	overflow: hidden;
	box-sizing: border-box;
	height: 50px;
	display: flex;
	align-items: flex-end;
`;

const Fade = styled.div.attrs(({ scroll = 0 }) => ({
	style: {
		transform: `translateX(${scroll}px)`,
		opacity: Math.min(1, scroll * 0.1),
	},
}))`
	position: absolute;
	left: 10px;
	bottom: 11px;
	height: 38px;
	width: 0;
	z-index: 1;
	background-color: red;
	box-shadow: 0px 0 5px 5px #fff;
	clip-path: polygon(-10px 0, -10px 100%, 30px 100%, 30px 0);
	visibility: ${ifFlag("scroll", "visible", "hidden")};
`;

export const ScrollableBar = ({ scroll, children }) => {
	const barRef = useRef(null);
	let [refScroll, updateScroll] = useState(scroll);
	useEffect(() => {
		barRef.current.scrollLeft = scroll;
		updateScroll(barRef.current.scrollLeft * 1);
	}, [scroll]);
	// Set scroll on ref
	return (
		<InnerBar ref={barRef}>
			{children}
			<Fade scroll={refScroll} />
		</InnerBar>
	);
};

const Bar = ({ module, pages = [] }) => (
	<TabBar>
		<Tab
			module
			icon={module.icon}
			href={module.href}
			mappedFrom={module.mappedFrom}
			label={module.label}
			active={module.active}
		/>
		{pages.length ? (
			<ScrollableBar>
				{pages.map(
					({ href, mappedFrom, label, active, icon, outsideScope, close }, index) => (
						<Tab
							key={href}
							icon={icon}
							href={href}
							mappedFrom={mappedFrom}
							label={label}
							active={active}
							close={close}
							outsideScope={outsideScope}
						/>
					),
				)}
			</ScrollableBar>
		) : null}
	</TabBar>
);

export default Bar;
