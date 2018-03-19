// Overrides the 'expect' global to fit the signature of unexpected

declare type ExpectChain = {
	and(assertion: string, ...valuesOrAssertions: Array<any>): ExpectChain,
} & Promise<any>;

declare var expect: {
	(
		subject: any,
		assertion: string,
		...valuesOrAssertions: Array<any>
	): ExpectChain,
	it(assertion: string, ...valuesOrAssertions: Array<any>): ExpectChain,
};
