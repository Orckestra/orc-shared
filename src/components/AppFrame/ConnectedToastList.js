import { connect } from "react-redux";
import { compose, lifecycle } from "recompose";
import { unwrapImmutable } from "../../utils";
import { shiftToast } from "../../actions/toasts";
import ToastList from "../ToastList";

export const TOAST_TIMEOUT = 5; // seconds

export const withToastData = connect(
	state => ({
		toasts: unwrapImmutable(state.getIn(["toasts", "queue"]).take(3)),
	}),
	dispatch => ({
		clearFirstToast: () => dispatch(shiftToast()),
	}),
);

export const withTimedDismissal = lifecycle({
	componentDidMount: function() {
		if (this.props.toasts.length) {
			this.dismissalTimer = window.setInterval(
				this.props.clearFirstToast,
				TOAST_TIMEOUT * 1000,
			);
		}
	},
	componentDidUpdate: function(prevProps) {
		if (!prevProps.toasts.length && this.props.toasts.length) {
			this.dismissalTimer = window.setInterval(
				this.props.clearFirstToast,
				TOAST_TIMEOUT * 1000,
			);
		}
		if (prevProps.toasts.length && !this.props.toasts.length) {
			window.clearInterval(this.dismissalTimer);
		}
	},
	componentWillUnmount: function() {
		window.clearInterval(this.dismissalTimer);
	},
});

export const ConnectedToastList = compose(
	withToastData,
	withTimedDismissal,
)(ToastList);

export default ConnectedToastList;
