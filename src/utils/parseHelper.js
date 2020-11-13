export const parseGuid = guid => {
	if (guid.length !== 32) return "";

	const partsLength = [8, 4, 4, 4, 12];
	let parsedGuid = "";

	let lastIndex = 0;

	for (let i = 0; i < partsLength.length; i++) {
		parsedGuid += guid.substring(lastIndex, lastIndex + partsLength[i]);
		lastIndex += partsLength[i];

		if (i !== partsLength.length - 1) {
			parsedGuid += "-";
		}
	}

	return parsedGuid;
};

export const concatObjectPropsWithDelimeter = (object, propsToUse, delimeter = ",", useSpace = true) => {
	let concatedString = "";

	const valuesToUse = [];
	propsToUse.forEach(prop => {
		const tempProp = object[prop];
		if (tempProp != null) {
			valuesToUse.push(tempProp);
		}
	});

	valuesToUse.forEach((value, index) => {
		concatedString += value;
		if (index < valuesToUse.length - 1) {
			if (delimeter != null) {
				concatedString += delimeter;
			}
			if (useSpace) {
				concatedString += " ";
			}
		}
	});

	return concatedString;
};

export const getAllAfterPrependHref = (prependHref, href) => {
	const prependSlashCount = (prependHref?.match(/\//g) || []).length;
	return href.split("/").slice(prependSlashCount).join("/");
};

export const getModuleNameFromHref = (prependPath, href) => {
	const pathArray = href.split("/");
	const moduleNamePosition = (prependPath?.match(/\//g) || []).length;
	const moduleName = moduleNamePosition < pathArray.length ? pathArray[moduleNamePosition] : "";
	const moduleHref = moduleNamePosition < pathArray.length ? pathArray.slice(0, moduleNamePosition + 1).join("/") : "";
	return [moduleName, moduleHref];
};
