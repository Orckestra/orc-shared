import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { unwrapImmutable } from "../../utils";
import { shiftToast } from "../../actions/toasts";
import ToastList from "../ToastList";

export const TOAST_TIMEOUT = 5; // seconds

const selectToasts = state => state.getIn(["toasts", "queue"]).take(3);

const ConnectedToastList = () => {
	const dismissalTimer = useRef();
	const toasts = unwrapImmutable(useSelector(selectToasts));
	const dispatch = useDispatch();
	const dismissToasts = toasts.length > 0;
	useEffect(() => {
		if (dismissToasts) {
			dismissalTimer.current = window.setInterval(() => dispatch(shiftToast()), TOAST_TIMEOUT * 1000);
		}
		return () => {
			window.clearInterval(dismissalTimer.current);
		};
	}, [dismissalTimer, dismissToasts, dispatch]);
	return <ToastList toasts={toasts} />;
};

export default ConnectedToastList;
