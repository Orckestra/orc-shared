import { useState } from "react";

const useToggle = (init = false) => {
	const [flag, setFlag] = useState(!!init);
	const toggle = () => setFlag(!flag);
	const reset = () => setFlag(!!init);
	return [flag, toggle, reset];
};

export default useToggle;
