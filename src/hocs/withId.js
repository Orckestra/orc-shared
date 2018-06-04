import { withPropsOnChange } from "recompose";

const generators = {};

// If no id set, sets a unique-ish id on the component on mount.
const withId = name => {
	let idCounter = 0;
	if (!generators[name]) {
		generators[name] = () => {
			const id = name + idCounter;
			idCounter += 1;
			return id;
		};
	}
	const getDomId = generators[name];
	return withPropsOnChange(["id"], ({ id }) => ({ id: id || getDomId() }));
};

export default withId;
