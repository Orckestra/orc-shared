import Immutable from "immutable";
import {
	isEntityUnderEditing,
	getModifiedSections,
	getModifiedModels,
	getModifiedModel,
	getModifiedTabs,
	getSectionsWithErrors,
	getInstanceKeysWithErrors,
	getTabsWithErrors,
	hasUnsavedDataSelector,
} from "./view";

describe("isEntityUnderEditing", () => {
	let state, stateWithEmptyEdit;
	beforeEach(() => {
		state = Immutable.fromJS({
			view: {
				edit: {
					module1: {
						id1: {
							section1: {},
						},
					},
				},
			},
			navigation: {
				route: { match: { path: "/:scope/module1/id1/section1" } },
				config: { prependPath: "/:scope/", prependHref: "/scope/" },
			},
		});
		stateWithEmptyEdit = Immutable.fromJS({
			view: {},
			navigation: {
				route: { match: { path: "/:scope/module1/id1/section1" } },
				config: { prependPath: "/:scope/", prependHref: "/scope/" },
			},
		});
	});

	it("Retrieves true if specified entity is under editing", () => {
		expect(isEntityUnderEditing, "when called with", ["id1"], "called with", [state], "to satisfy", true);
	});

	it("Retrieves false if specified entity is not under editing or not found", () => {
		expect(isEntityUnderEditing, "when called with", ["id12"], "called with", [state], "to satisfy", false);
	});

	it("Retrieves false if edit is missing from the store", () => {
		expect(isEntityUnderEditing, "when called with", ["id2"], "called with", [stateWithEmptyEdit], "to satisfy", false);
	});
});

describe("getModifiedSections", () => {
	let state, stateWithEmptyEdit;
	beforeEach(() => {
		state = Immutable.fromJS({
			view: {
				edit: {
					module1: {
						id1: {
							section1: {},
							section2: {
								model: {
									field1: {
										value: "smth",
										wasModified: true,
									},
								},
							},
							section3: {
								model: {
									field1: {
										value: "another",
										wasModified: false,
									},
								},
							},
						},
					},
				},
			},
			navigation: {
				route: { match: { path: "/:scope/module1/id1/section1" } },
				config: { prependPath: "/:scope/", prependHref: "/scope/" },
			},
		});

		stateWithEmptyEdit = Immutable.fromJS({
			view: {},
			navigation: {
				route: { match: { path: "/:scope/module1/id1/section1" } },
				config: { prependPath: "/:scope/", prependHref: "/scope/" },
			},
		});
	});

	it("Retrieves modified sections", () => {
		expect(getModifiedSections, "when called with", ["id1"], "called with", [state], "to satisfy", ["section2"]);
	});

	it("Retrieves empty array if no sections found or no sections were modified", () => {
		expect(getModifiedSections, "when called with", ["id2"], "called with", [state], "to satisfy", []);
	});

	it("Retrieves empty array if edit is missing from the store", () => {
		expect(getModifiedSections, "when called with", ["id2"], "called with", [stateWithEmptyEdit], "to satisfy", []);
	});
});

describe("getSectionsWithErrors", () => {
	let state, stateWithEmptyEdit;
	beforeEach(() => {
		state = Immutable.fromJS({
			view: {
				edit: {
					module1: {
						id1: {
							section1: {},
							section2: {
								model: {
									field1: {
										error: "smth",
									},
								},
							},
							section3: {
								model: {
									field1: {
										value: "another",
										wasModified: false,
									},
								},
							},
						},
					},
				},
			},
			navigation: {
				route: { match: { path: "/:scope/module1/id1/section1" } },
				config: { prependPath: "/:scope/", prependHref: "/scope/" },
			},
		});

		stateWithEmptyEdit = Immutable.fromJS({
			view: {},
			navigation: {
				route: { match: { path: "/:scope/module1/id1/section1" } },
				config: { prependPath: "/:scope/", prependHref: "/scope/" },
			},
		});
	});

	it("Retrieves sections with errors", () => {
		expect(getSectionsWithErrors, "when called with", ["id1"], "called with", [state], "to satisfy", ["section2"]);
	});

	it("Retrieves empty array if no sections found or no sections were modified", () => {
		expect(getSectionsWithErrors, "when called with", ["id2"], "called with", [state], "to satisfy", []);
	});

	it("Retrieves empty array if edit is missing from the store", () => {
		expect(getSectionsWithErrors, "when called with", ["id2"], "called with", [stateWithEmptyEdit], "to satisfy", []);
	});
});

describe("getInstanceKeysWithErrors", () => {
	let state;
	beforeEach(() => {
		state = Immutable.fromJS({
			view: {
				edit: {
					module1: {
						id1: {
							section1: {
								model: {
									path1: {
										path11: {
											id1: {
												field1: {
													error: "smth",
												},
											},
											id2: {
												field1: {
													value: "something",
												},
											},
											id3: {
												field1: {
													value: "something",
												},
												field2: {
													error: "smth",
												},
											},
										},
									},
								},
							},
						},
					},
				},
			},
			navigation: {
				route: { match: { path: "/:scope/module1/id1/section1" } },
				config: { prependPath: "/:scope/", prependHref: "/scope/" },
			},
		});
	});

	it("Retrieves instance Keys with errors", () => {
		expect(
			getInstanceKeysWithErrors,
			"when called with",
			["id1", "section1", ["path1", "path11"]],
			"called with",
			[state],
			"to satisfy",
			["id1", "id3"],
		);
	});

	it("Retrieves empty array if path doesn't exist errors", () => {
		expect(
			getInstanceKeysWithErrors,
			"when called with",
			["id1", "section1", ["path1", "path1_absent"]],
			"called with",
			[state],
			"to satisfy",
			[],
		);
	});
});

describe("getModifiedModels", () => {
	let state, stateWithEmptyEdit;
	beforeEach(() => {
		state = Immutable.fromJS({
			view: {
				edit: {
					module1: {
						id1: {
							section1: {
								model: {
									key11: "value11",
									key12: "value12",
								},
							},
							section2: {
								model: {
									key21: "value21",
									key22: "value22",
									key23: {
										key33: "value33",
									},
								},
							},
						},
					},
				},
			},
			navigation: {
				route: { match: { path: "/:scope/module1/id1/section1" } },
				config: { prependPath: "/:scope/", prependHref: "/scope/" },
			},
		});

		stateWithEmptyEdit = Immutable.fromJS({
			view: {},
			navigation: {
				route: { match: { path: "/:scope/module1/id1/section1" } },
				config: { prependPath: "/:scope/", prependHref: "/scope/" },
			},
		});
	});

	it("Retrieves modified sections", () => {
		expect(getModifiedModels, "when called with", ["id1"], "called with", [state], "to satisfy", {
			section1: {
				key11: "value11",
				key12: "value12",
			},
			section2: {
				key21: "value21",
				key22: "value22",
				key23: {
					key33: "value33",
				},
			},
		});
	});

	it("Retrieves empty array if no sections found or no sections were modified", () => {
		expect(getModifiedModels, "when called with", ["id2"], "called with", [state], "to satisfy", {});
	});

	it("Retrieves empty array if edit is missing from the store", () => {
		expect(getModifiedModels, "when called with", ["id2"], "called with", [stateWithEmptyEdit], "to satisfy", {});
	});
});

describe("getModifiedModel", () => {
	let state, stateWithEmptyEdit;
	beforeEach(() => {
		state = Immutable.fromJS({
			view: {
				edit: {
					module1: {
						id1: {
							section1: {
								model: {
									key11: "value11",
									key12: "value12",
								},
							},
							section2: {
								model: {
									key21: "value21",
									key22: "value22",
									key23: {
										key33: "value33",
									},
								},
							},
						},
					},
				},
			},
			navigation: {
				route: { match: { path: "/:scope/module1/id1/section1" } },
				config: { prependPath: "/:scope/", prependHref: "/scope/" },
			},
		});

		stateWithEmptyEdit = Immutable.fromJS({
			view: {},
			navigation: {
				route: { match: { path: "/:scope/module1/id1/section1" } },
				config: { prependPath: "/:scope/", prependHref: "/scope/" },
			},
		});
	});

	it("Retrieves modified sections", () => {
		expect(getModifiedModel, "when called with", ["id1"], "called with", [state], "to satisfy", {
			key11: "value11",
			key12: "value12",
			key21: "value21",
			key22: "value22",
			key23: {
				key33: "value33",
			},
		});
	});

	it("Retrieves empty array if no sections found or no sections were modified", () => {
		expect(getModifiedModel, "when called with", ["id2"], "called with", [state], "to satisfy", {});
	});

	it("Retrieves empty array if edit is missing from the store", () => {
		expect(getModifiedModel, "when called with", ["id2"], "called with", [stateWithEmptyEdit], "to satisfy", {});
	});
});

describe("getModifiedTabs", () => {
	let state, stateWithEmptyEdit;
	beforeEach(() => {
		state = Immutable.fromJS({
			view: {
				edit: {
					module1: {
						id1: {
							section1: {},
							section2: {
								model: {
									field1: {
										value: "smth",
										wasModified: true,
									},
								},
							},
						},
						id2: {
							section1: {},
							section2: {},
						},
						new: {
							section1: {
								model: {
									field1: {
										value: "smth",
										wasModified: true,
									},
								},
							},
							section2: {},
						},
					},
				},
			},
			navigation: {
				route: { match: { path: "/:scope/module1/id1/section1" } },
				config: { prependPath: "/:scope/", prependHref: "/scope/" },
			},
		});

		stateWithEmptyEdit = Immutable.fromJS({
			view: {},
			navigation: {
				route: { match: { path: "/:scope/module1/id1/section1" } },
				config: { prependPath: "/:scope/", prependHref: "/scope/" },
			},
		});
	});

	it("Retrieves modified tabs correctly when edit is not empty", () => {
		const tabParams = [
			{
				href: "id1Href",
				params: ["Global", "id1"],
			},
			{
				href: "id2Href",
				params: ["Global", "id2"],
			},
		];

		expect(getModifiedTabs, "when called with", [tabParams], "called with", [state], "to satisfy", ["id1Href"]);
	});

	it("Retrieves empty array when edit is empty", () => {
		const tabParams = [
			{
				href: "id1Href",
				params: ["Global", "id1"],
			},
			{
				href: "id2Href",
				params: ["Global", "id2"],
			},
		];

		expect(getModifiedTabs, "when called with", [tabParams], "called with", [stateWithEmptyEdit], "to satisfy", []);
	});

	it("Add new entity id to tab params when parsed in URL", () => {
		const tabParams = [
			{
				href: "/Global/module1/new/section1",
				params: ["Global"],
			},
		];

		expect(getModifiedTabs, "when called with", [tabParams], "called with", [state], "to satisfy", [
			"/Global/module1/new/section1",
		]);
	});
});

describe("getTabsWithErrors", () => {
	let state, stateWithEmptyEdit;
	beforeEach(() => {
		state = Immutable.fromJS({
			view: {
				edit: {
					module1: {
						id1: {
							section1: {},
							section2: {
								model: {
									field1: {
										value: "smth",
										error: "smth",
										wasModified: true,
									},
								},
							},
						},
						id2: {
							section1: {},
							section2: {},
						},
						new: {
							section1: {
								model: {
									field1: {
										value: "smth",
										wasModified: true,
									},
								},
							},
							section2: {},
						},
					},
				},
			},
			navigation: {
				route: { match: { path: "/:scope/module1/id1/section1" } },
				config: { prependPath: "/:scope/", prependHref: "/scope/" },
			},
		});

		stateWithEmptyEdit = Immutable.fromJS({
			view: {},
			navigation: {
				route: { match: { path: "/:scope/module1/id1/section1" } },
				config: { prependPath: "/:scope/", prependHref: "/scope/" },
			},
		});
	});

	it("Retrieves tabs with errors correctly when error is present in one section", () => {
		const tabParams = [
			{
				href: "id1Href",
				params: ["Global", "id1"],
			},
			{
				href: "id2Href",
				params: ["Global", "id2"],
			},
		];

		expect(getTabsWithErrors, "when called with", [tabParams], "called with", [state], "to satisfy", ["id1Href"]);
	});

	it("Retrieves empty array when edit is empty", () => {
		const tabParams = [
			{
				href: "id1Href",
				params: ["Global", "id1"],
			},
			{
				href: "id2Href",
				params: ["Global", "id2"],
			},
		];

		expect(getTabsWithErrors, "when called with", [tabParams], "called with", [stateWithEmptyEdit], "to satisfy", []);
	});
});

describe("hasUnsavedDataSelector", () => {
	it("Returns false when no edit data is present", () => {
		const state = Immutable.fromJS({ view: {} });

		expect(hasUnsavedDataSelector, "called with", [state], "to be", false);
	});

	it("Returns false when there are no modified models", () => {
		const state = Immutable.fromJS({
			view: {
				edit: {
					module1: {
						id1: {
							section1: {},
							section2: {
								model: {
									field1: {
										value: "smth",
										error: "smth",
										wasModified: false,
									},
								},
							},
						},
						id2: {
							section1: {},
							section2: {},
						},
						new: {
							section1: {
								model: {
									field1: {
										value: "smth",
										wasModified: false,
									},
								},
							},
							section2: {},
						},
					},
				},
			},
		});

		expect(hasUnsavedDataSelector, "called with", [state], "to be", false);
	});

	it("Returns true when a model is modified", () => {
		const state = Immutable.fromJS({
			view: {
				edit: {
					module1: {
						id1: {
							section1: {},
							section2: {
								model: {
									field1: {
										value: "smth",
										error: "smth",
										wasModified: false,
									},
								},
							},
						},
						id2: {
							section1: {},
							section2: {},
						},
						new: {
							section1: {
								model: {
									field1: {
										value: "smth",
										wasModified: true,
									},
								},
							},
							section2: {},
						},
					},
				},
			},
		});

		expect(hasUnsavedDataSelector, "called with", [state], "to be", true);
	});
});
