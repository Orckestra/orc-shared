const insertIcons = svgString => {
	const parser = new DOMParser();
	let iconDoc = parser.parseFromString(svgString, "image/svg+xml");
	const err = iconDoc.querySelector("parsererror");
	if (err) {
		console.error("SVG failed to parse: ", svgString);
		return;
	}
	/* istanbul ignore else */
	if (document.body !== null) {
		const body = document.body;
		const iconNode = iconDoc.querySelector("svg");
		/* istanbul ignore else */
		if (iconNode) {
			body.appendChild(iconNode);
		}
	} else {
		throw new Error("Document body not found");
	}
};

export default insertIcons;
