import Immutable from "immutable";
import { getScopeModuleInformationSelector, modulesSelector } from "./modules";

describe("modulesSelector", () => {
	let state;
	beforeEach(() => {
		state = Immutable.fromJS({
			modules: {
				tree: "modulesTree",
				visibleModules: ["a", "module123"],
				lastScopeAndModuleSelection: {
					scope: "Norway",
					moduleName: "Profiles",
					routingPerformed: false,
				},
			},
		});
	});

	it("Retrieves modules", () => {
		expect(modulesSelector, "when called with", [state], "to equal", "modulesTree");
	});

	it("Retrieves modules and scope information", () => {
		expect(getScopeModuleInformationSelector, "when called with", [state], "to equal", {
			visibleModules: ["a", "module123"],
			scope: "Norway",
			moduleName: "Profiles",
			routingPerformed: false,
		});
	});
});
