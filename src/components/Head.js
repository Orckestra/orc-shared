import { useEffect } from "react";
import { useSelector } from "react-redux";
import { currentLocale } from "../selectors/locale";

const Head = () => {
	const locale = useSelector(currentLocale);
	useEffect(() => {
		if (document.documentElement.lang !== locale) {
			document.documentElement.setAttribute("lang", locale);
		}
	});
	return null;
};

export default Head;
