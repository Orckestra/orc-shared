import unwrapImmutalbe from "./../utils/unwrapImmutable";
import { useSelector } from "react-redux";

export const useSelectorAndUnwrap = selector => {
	return unwrapImmutalbe(useSelector(selector));
};

export default useSelectorAndUnwrap;
