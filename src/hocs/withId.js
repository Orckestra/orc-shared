import React, { useMemo } from "react";

const generators = {};

const getGenerator = name => {
	let idCounter = 0;
	if (!generators[name]) {
		generators[name] = () => {
			const id = name + idCounter;
			idCounter += 1;
			return id;
		};
	}
	return generators[name]();
};

const withId =
	name =>
	Comp =>
	({ id, ...props }) => {
		const generatedId = useMemo(() => getGenerator(name), []);
		return <Comp id={id || generatedId} {...props} />;
	};

export default withId;
