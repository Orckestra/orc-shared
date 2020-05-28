const spawners = {};

export const spawnerMiddleware = store => next => action => {
	const actionSpawner = spawners[action.type];
	if (actionSpawner) {
		const spawn = actionSpawner(action);
		if (spawn) {
			next(spawn);
		}
	}
	return next(action);
};

const addSpawner = (type, mapper) => {
	if (spawners[type]) {
		throw new Error("Action spawner for type " + type + " was attempted overwritten.");
	}
	spawners[type] = mapper;
};

export default addSpawner;
