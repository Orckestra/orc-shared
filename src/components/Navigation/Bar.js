import React, { useRef, useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { ifFlag, getThemeProp, safeGet } from "../../utils";
import DropMenu from "../DropMenu";
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
	min-width: 0;
	box-sizing: border-box;
	height: 50px;
	display: flex;
	align-items: flex-end;
	scroll-behavior: smooth;
`;

const Fade = styled.div`
	position: absolute;
	left: 0;
	bottom: 11px;
	height: 38px;
	width: 10px;
	z-index: 1;
	background-color: red;
	box-shadow: 0px 0 5px 5px #fff;
	clip-path: polygon(-10px 0, -10px 100%, 30px 100%, 30px 0);
	visibility: ${ifFlag("scroll", "visible", "hidden")};
`;

export const ScrollableBar = React.forwardRef(({ children }, ref) => {
	return (
		<>
			<Fade scroll={0} />
			<InnerBar ref={ref}>{children}</InnerBar>
		</>
	);
});

const getTabEdges = tabRef => {
	let lastWidth = 0;
	return tabRef.current.map(ref => {
		const tabWidth = safeGet(ref, "current", "offsetWidth") || 0;
		lastWidth += tabWidth;
		return lastWidth;
	});
};

const useTabScroll = (pages, barRef, tabRefs) => {
	tabRefs.current = tabRefs.current.filter(ref => ref.current);
	pages.forEach((page, index) => {
		const myIndex = tabRefs.current.findIndex(
			ref => safeGet(ref, "current", "dataset", "testId") === page.href,
		);
		if (myIndex === -1) {
			tabRefs.current.splice(index, 0, React.createRef());
		}
	});
	const lastActiveIndex = useRef(-1);
	let activeIndex = pages.findIndex(page => page.active);
	if (activeIndex === -1) {
		activeIndex = lastActiveIndex.current;
	} else {
		lastActiveIndex.current = activeIndex;
	}
	const [lastShownTab, setLastShown] = useState(pages.length);
	useEffect(() => {
		const barElem = barRef.current;
		if (!barElem) return;
		const barWidth = barElem.offsetWidth * 1;
		const tabEdges = getTabEdges(tabRefs);
		let scrollEdge = Math.max(
			(tabEdges[activeIndex + 1] || tabEdges[activeIndex]) - barWidth + 5,
			0,
		);
		barElem.scrollTo({ left: scrollEdge });
		const edgeIndex = tabEdges.findIndex(
			edge => edge >= barWidth + barElem.scrollLeft - 10,
		);
		console.log(barWidth, tabEdges);
		if (tabEdges[tabEdges.length - 1] < barWidth) {
			console.log("last: full length");
			setLastShown(pages.length);
		} else if (edgeIndex > activeIndex) {
			console.log("last: edgeIndex", edgeIndex);
			setLastShown(edgeIndex);
		} else {
			console.log("last: active + 1", activeIndex + 1);
			setLastShown(activeIndex + 1);
		}
	}, [setLastShown, pages, tabRefs, barRef, activeIndex]);
	return {
		lastShownTab,
	};
};

const Bar = ({ module, pages }) => {
	const barRef = useRef(null);
	const tabRefs = useRef([]);
	const { lastShownTab } = useTabScroll(pages, barRef, tabRefs);
	console.log("last shown", lastShownTab);
	return (
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
				<ScrollableBar ref={barRef}>
					{pages.map(
						({ href, mappedFrom, label, active, icon, outsideScope, close }, index) => {
							return (
								<Tab
									ref={tabRefs.current[index]}
									key={href}
									icon={icon}
									href={href}
									mappedFrom={mappedFrom}
									label={label}
									active={active}
									close={close}
									outsideScope={outsideScope}
									hidden={index > lastShownTab}
								/>
							);
						},
					)}
				</ScrollableBar>
			) : null}
		</TabBar>
	);
};

export default Bar;
