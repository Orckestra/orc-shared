import { spyOnConsole } from "./testUtils";
import { logProfiler } from "./profilerHelper";

describe("profilerHelper", () => {
	spyOnConsole();

	it("get property value", () => {
		logProfiler(
			"a_ProfilerId",
			"a_Phase",
			"a_ActualTime",
			"a_BaseTime",
			"a_StartTime",
			"a_CommitTime",
			"a_Interactions",
		);

		expect(console.log, "to have a call satisfying", {
			args: [
				{
					_title: "a_ProfilerId",
					phase: "a_Phase",
					actualTime: "a_ActualTime",
					baseTime: "a_BaseTime",
					startTime: "a_StartTime",
					commitTime: "a_CommitTime",
					interactions: "a_Interactions",
				},
			],
		});
	});
});
