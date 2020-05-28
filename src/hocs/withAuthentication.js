import { compose, branch, renderComponent, mapProps, withProps } from "recompose";
import { useAuthenticationData, Loader, Error } from "../components/Authenticate";

console.warn(
	"Higher order component withAuthentication has been deprecated in favor of component Authenticate",
);

const isAuthenticated = withProps(useAuthenticationData);

const withAuthentication = compose(
	isAuthenticated,
	branch(({ loading }) => loading, renderComponent(Loader)),
	branch(
		({ authedUser }) => !authedUser,
		renderComponent(Error),
		mapProps(({ authedUser, loading, requestError, needLogin, ...props }) => props),
	),
);

export default withAuthentication;
