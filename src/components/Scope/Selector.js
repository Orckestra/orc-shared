import React from "react";
import styled from "styled-components";
import { getThemeProp } from "../../utils";
import Input from "../Input";
import Treeview from "../Treeview";
import ScopeNode from "./ScopeNode";
import Sidepanel from "../Sidepanel";
import withClickOutside from "../../hocs/withClickOutside";
import { useIntl } from "react-intl";
import sharedMessages from "./../../sharedMessages";

export const Wrapper = withClickOutside(styled.div`
	height: 100%;
	width: 100%;
	user-select: none;
	display: flex;
	flex-direction: column;
`);

export const InputBox = styled.div`
	border-bottom: 1px solid #666;
`;

export const SearchInput = styled(Input)`
	background-color: transparent;
	border-color: ${getThemeProp(["colors", "border"], "#999999")};
	color: ${getThemeProp(["colors", "textMedium"], "#999999")};
	width: calc(100% - 40px);
	margin: 20px;
	font-size: 14px;
`;

export const SelectorPanel = styled(Sidepanel)`
	top: 90px;
	background-color: ${getThemeProp(["colors", "bgDark"], "#333333")};
	color: #fff;
	z-index: 1000;
`;

export const Selector = ({ name, show, reset, getScope, currentScope, defaultNodeState, filter, updateFilter }) => {
	const { formatMessage } = useIntl();
	return (
		<SelectorPanel in={show} width="27vw" timeout={300}>
			<Wrapper onClickOutside={reset}>
				<InputBox>
					<SearchInput
						placeholder={formatMessage(sharedMessages.scopeFilterPlaceholder)}
						value={filter}
						onChange={updateFilter}
					/>
				</InputBox>
				<Treeview
					{...{
						name,
						Content: ScopeNode,
						rootId: "Global",
						getNode: getScope,
						selectedNodeId: (currentScope && currentScope.id) || null,
						openAll: !!filter,
						closeSelector: reset,
						dark: true,
						defaultNodeState,
					}}
				/>
			</Wrapper>
		</SelectorPanel>
	);
};

export default Selector;
