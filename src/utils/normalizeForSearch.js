let normalizeForSearch;
/* istanbul ignore else */
if ("".normalize) {
	normalizeForSearch = str =>
		str
			.toLowerCase()
			// Strip accents by normalizing to letters + combining chars, then strip all combining chars.
			.normalize("NFKD")
			// Note AD20240801: the new eslint config complains on the next line however I have no idea what it is supposed to do so to be safe I'll disable the warning
			// eslint-disable-next-line no-misleading-character-class
			.replace(/[\u0300-\u036f\u1ab0-\u1aff\u1dc0-\u1dff\u20d0-\u20ff\ufe20-\ufe2f]/g, "");
} else {
	// IE11 does not support string#normalize(). V. sad for IE users.
	normalizeForSearch = str => str.toLowerCase();
}

export default normalizeForSearch;
