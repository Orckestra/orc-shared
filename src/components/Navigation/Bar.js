import React, { useRef, useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { ifFlag, getThemeProp, safeGet } from "../../utils";
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

export const InnerBar = styled.div`
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
			<InnerBar id="navigationPageTabs" ref={ref}>
				{children}
			</InnerBar>
		</>
	);
});

const getTabEdges = (pages, tabRefs) => {
	let lastWidth = 0;
	return pages.map(({ href }) => {
		const tabWidth = safeGet(tabRefs, href, "offsetWidth") || 0;
		lastWidth += tabWidth;
		return lastWidth;
	});
};

export const useTabScroll = (pages, barRef, tabRefs, debug = false) => {
	const getTabRef = useCallback(
		node => {
			/* istanbul ignore else */
			if (node) {
				const href = safeGet(node, "dataset", "href");
				tabRefs.current[href] = node;
			}
		},
		[tabRefs],
	);

	const [barWidth, setBarWidth] = useState(0);
	const [tabEdges, setTabEdges] = useState([]);
	const setCurrentWidths = useCallback(
		pages => {
			setBarWidth(safeGet(barRef, "current", "offsetWidth") || 0);
			setTabEdges(getTabEdges(pages, tabRefs.current));
		},
		[barRef, tabRefs, setBarWidth, setTabEdges],
	);
	useEffect(() => setCurrentWidths(pages), [pages, setCurrentWidths]);

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
		const activeEdge = tabEdges[activeIndex + 1] || tabEdges[activeIndex] || 0;
		let scrollEdge = Math.max(activeEdge - barWidth + 5, 0);
		barElem.scrollTo({ left: scrollEdge });
		const edgeIndex =
			tabEdges.findIndex(edge => edge > barWidth + barElem.scrollLeft - 10) - 1;
		// if (barWidth) console.log(barWidth, tabEdges, edgeIndex);
		if (tabEdges[tabEdges.length - 1] <= barWidth) {
			setLastShown(pages.length);
		} else if (edgeIndex > activeIndex) {
			setLastShown(edgeIndex);
		} else {
			setLastShown(activeIndex + 1);
		}
	}, [setLastShown, pages, barRef, barWidth, tabEdges, activeIndex]);
	return {
		...(debug ? { barWidth, tabEdges } : {}),
		lastShownTab,
		getTabRef,
	};
};

const Bar = ({ module, pages }) => {
	const barRef = useRef(null);
	const tabRefs = useRef({});
	const { lastShownTab, getTabRef } = useTabScroll(pages, barRef, tabRefs);
	// console.log("last shown", lastShownTab);
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
									ref={getTabRef}
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
