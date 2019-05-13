import Immutable from "immutable";
import { PUSH_TOAST, SHIFT_TOAST } from "../actions/toasts";
const initialState = Immutable.fromJS({ queue: [] });

const toastReducer = (state = initialState, action) => {
	switch (action.type) {
		case PUSH_TOAST:
			return state.withMutations(s => {
				const latestToast = s.get("queue").last() || Immutable.Map({ key: 0 });
				const latestKey = latestToast.get("key");
				const toast = Immutable.fromJS(action.payload).set(
					"key",
					latestKey + 1,
				);
				s.set("queue", s.get("queue").push(toast));
			});
		case SHIFT_TOAST:
			return state.withMutations(s => {
				s.set("queue", s.get("queue").shift());
			});
		default:
			return state;
	}
};

export default toastReducer;
