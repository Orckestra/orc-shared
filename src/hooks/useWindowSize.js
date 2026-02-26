import { useEffect, useState } from "react";

export const useWindowSize = () => {
	const [windowSize, setWindowSize] = useState({
		innerWidth: window.innerWidth,
		innerHeight: window.innerHeight,
		outerWidth: window.outerWidth,
		outerHeight: window.outerHeight,
	});

	useEffect(() => {
		const handleResize = () => {
			const haveChanged =
				windowSize.innerWidth !== window.innerWidth ||
				windowSize.innerHeight !== window.innerHeight ||
				windowSize.outerWidth !== window.outerWidth ||
				windowSize.outerHeight !== window.outerHeight;

			if (haveChanged) {
				setWindowSize({
					innerWidth: window.innerWidth,
					innerHeight: window.innerHeight,
					outerWidth: window.outerWidth,
					outerHeight: window.outerHeight,
				});
			}
		};

		handleResize();

		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, [windowSize]);

	return windowSize;
};

export default useWindowSize;
