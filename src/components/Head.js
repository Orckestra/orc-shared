import { useEffect } from "react";
import { useSelector } from "react-redux";
import { currentLocaleOrDefault } from "../selectors/locale";

const Head = () => {
	const locale = useSelector(currentLocaleOrDefault);
	useEffect(() => {
		if (document.documentElement.lang !== locale) {
			document.documentElement.setAttribute("lang", locale);
		}
	});
	return null;
};

export default Head;
