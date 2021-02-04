import unwrapImmutalbe from "./../utils/unwrapImmutable";
import { useSelector } from "react-redux";

const useSelectorAndUnwrap = selector => {
	return unwrapImmutalbe(useSelector(selector));
};

export default useSelectorAndUnwrap;
