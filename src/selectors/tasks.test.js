import Immutable from "immutable";
import { taskInfo, taskLogs } from "./tasks";

const defaultState = {
	tasks: [],
	taskInfos: {
		"8908517403b84b44832e99f5c59eb4eb": {
			taskId: "8908517403b84b44832e99f5c59eb4eb",
			name: "Report export (Report Export)",
			status: "RanToCompletion",
			resultBlobUrl: "packages/Report_20190430_11324479637592.xlsx",
			type: "Orckestra.Overture.Providers.CommerceEngine.Reporting.ReportExportTask, Orckestra.Overture.Providers.CommerceEngine",
		},
	},
	logs: {
		"8908517403b84b44832e99f5c59eb4eb": ["a"],
		"5cb96f72f9bb47fc9e4feb5f9817772e": ["b"],
	},
};

describe("Tasks Selectors", () => {
	let state;
	beforeEach(() => {
		state = Immutable.fromJS({
			tasks: defaultState,
		});
	});

	it("Retrieves task info by id", () => {
		expect(
			taskInfo,
			"when called with",
			["8908517403b84b44832e99f5c59eb4eb"],
			"called with",
			[state],
			"to satisfy",
			Immutable.fromJS(defaultState.taskInfos["8908517403b84b44832e99f5c59eb4eb"]),
		);
	});

	it("Retrieves unknown task info by id", () => {
		expect(taskInfo, "when called with", ["404"], "called with", [state], "to be null");
	});

	it("Retrieves task logs by id", () => {
		expect(
			taskLogs,
			"when called with",
			["8908517403b84b44832e99f5c59eb4eb"],
			"called with",
			[state],
			"to satisfy",
			defaultState.logs["8908517403b84b44832e99f5c59eb4eb"],
		);
	});

	it("Retrieves unknown task logs by id", () => {
		expect(taskLogs, "when called with", ["404"], "called with", [state], "to satisfy", Immutable.List());
	});
});
