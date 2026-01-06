import pt from "prop-types";

export const ptLabel = pt.oneOfType([
	pt.string,
	pt.shape({
		id: pt.string.isRequired,
		defaultMessage: pt.string.isRequired,
	}),
]);
