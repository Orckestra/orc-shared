export const logProfiler = (
	profilerId,
	phase,
	actualTime,
	baseTime,
	startTime,
	commitTime,
	interactions,
) => {
	console.log({
		_title: profilerId, // Renamed the property to be the first one to be displayed
		phase,
		actualTime,
		baseTime, //time taken by react
		startTime, //time at which render starts
		commitTime,
		interactions, // this is gotten from the rapping API
	});
};
