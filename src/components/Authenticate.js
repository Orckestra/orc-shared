import React from "react";
import styled, { withTheme } from "styled-components";
import { getThemeProp, safeGet } from "../utils";
import Placeholder from "../components/Placeholder";
import { useSelector } from "react-redux";
import { unwrapImmutable } from "../utils";
import { GET_AUTHENTICATION_PROFILE } from "../actions/authentication";
import { ERROR, LOGOUT } from "../reducers/request";

export const useAuthenticationData = () => ({
	loading: useSelector(state => state.getIn(["requests", GET_AUTHENTICATION_PROFILE])),
	authedUser: useSelector(state => state.getIn(["authentication", "name"])),
	requestError: unwrapImmutable(useSelector(state => state.getIn(["requests", ERROR]))),
	needLogin: useSelector(state => state.getIn(["requests", LOGOUT])),
});

export const Wrapper = styled.div`
	display: flex;
	width: 60%;
	height: 100%;
	padding: 0 20vw;
	flex-direction: column;
	justify-content: center;
`;

export const Loader = withTheme(props => (
	<Wrapper>
		<Placeholder icon={getThemeProp(["icons", "loading"], "loading")(props)} animate />
	</Wrapper>
));

export const Error = ({ requestError, needLogin }) => {
	if (needLogin) {
		return (
			<Wrapper>
				<h1>Not logged in</h1>
			</Wrapper>
		);
	}
	return (
		<Wrapper>
			<h1>{safeGet(requestError, "payload", "message") || "An error occurred"}</h1>
			Last failing action: <pre>{JSON.stringify(requestError, null, 2)}</pre>
		</Wrapper>
	);
};

const Authenticate = ({ children }) => {
	const { loading, authedUser, requestError, needLogin } = useAuthenticationData();
	if (loading) {
		return <Loader />;
	}
	if (!authedUser) {
		return <Error {...{ requestError, needLogin }} />;
	} else {
		return React.Children.only(children);
	}
};

export default Authenticate;
