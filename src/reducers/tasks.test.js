import Immutable from "immutable";
import { GET_TASK_LIST_SUCCESS, GET_TASK_LOG_SUCCESS, clearTaskLog, GET_TASKINFO_SUCCESS } from "actions/tasks";
import reducer from "./tasks";
import { DELETE_TASK_REQUEST } from "../actions/tasks";

describe("reports", () => {
	it("behaves as a reducer should", () =>
		expect(reducer, "to be a reducer with initial state", {
			taskInfos: {},
			tasks: [],
			logs: {},
		}));

	describe("load task info", () => {
		it("stores task info from the server", () => {
			const oldState = Immutable.fromJS({
				new: false,
				taskInfos: {
					"8908517403b84b44832e99f5c59eb4eb": {
						taskId: "8908517403b84b44832e99f5c59eb4eb",
						name: "Report export (Report Export)",
						created: "2023-03-24T15:26:32.9986622Z",
						status: "RanToCompletion",
						resultBlobUrl: "packages/Report_20190430_11324479637592.xlsx",
						type: "Orckestra.Overture.Providers.CommerceEngine.Reporting.ReportExportTask, Orckestra.Overture.Providers.CommerceEngine",
					},
				},
			});
			const action = {
				type: GET_TASKINFO_SUCCESS,
				payload: {
					taskId: "5cb96f72f9bb47fc9e4feb5f9817772e",
					created: "2023-03-14T15:26:32.9986622Z",
					name: "Report export (Customer Extract)",
					type: "Orckestra.Overture.Providers.CommerceEngine.Reporting.ReportExportTask, Orckestra.Overture.Providers.CommerceEngine",
					status: "Faulted",
					requester: "gert.sonderby@orckestra.com",
				},
			};
			const newState = reducer(oldState, action);
			return expect(newState, "not to be", oldState).and(
				"value at",
				"taskInfos",
				"to equal",
				Immutable.fromJS({
					"8908517403b84b44832e99f5c59eb4eb": {
						taskId: "8908517403b84b44832e99f5c59eb4eb",
						created: "2023-03-24T15:26:32.9986622Z",
						name: "Report export (Report Export)",
						status: "RanToCompletion",
						resultBlobUrl: "packages/Report_20190430_11324479637592.xlsx",
						type: "Orckestra.Overture.Providers.CommerceEngine.Reporting.ReportExportTask, Orckestra.Overture.Providers.CommerceEngine",
					},
					"5cb96f72f9bb47fc9e4feb5f9817772e": {
						taskId: "5cb96f72f9bb47fc9e4feb5f9817772e",
						created: "2023-03-14T15:26:32.9986622Z",
						name: "Report export (Customer Extract)",
						type: "Orckestra.Overture.Providers.CommerceEngine.Reporting.ReportExportTask, Orckestra.Overture.Providers.CommerceEngine",
						status: "Faulted",
						requester: "gert.sonderby@orckestra.com",
					},
				}),
			);
		});
	});

	describe("load task list", () => {
		it("stores new tasks as loaded from the server", () => {
			const oldState = Immutable.fromJS({
				new: false,
				tasks: [
					{
						taskId: "8908517403b84b44832e99f5c59eb4eb",
						name: "Report export (Report Export)",
						status: "RanToCompletion",
						resultBlobUrl: "packages/Report_20190430_11324479637592.xlsx",
						type: "Orckestra.Overture.Providers.CommerceEngine.Reporting.ReportExportTask, Orckestra.Overture.Providers.CommerceEngine",
					},
				],
			});
			const action = {
				type: GET_TASK_LIST_SUCCESS,
				payload: [
					{
						taskId: "8908517403b84b44832e99f5c59eb4eb",
						created: "2023-03-24T15:26:32.9986622Z",
						name: "Report export (Report Export)",
						status: "RanToCompletion",
						resultBlobUrl: "packages/Report_20190430_11324479637592.xlsx",
						type: "Orckestra.Overture.Providers.CommerceEngine.Reporting.ReportExportTask, Orckestra.Overture.Providers.CommerceEngine",
					},
					{
						taskId: "5cb96f72f9bb47fc9e4feb5f9817772e",
						created: "2023-03-14T15:26:32.9986622Z",
						name: "Report export (Customer Extract)",
						type: "Orckestra.Overture.Providers.CommerceEngine.Reporting.ReportExportTask, Orckestra.Overture.Providers.CommerceEngine",
						status: "Faulted",
						requester: "gert.sonderby@orckestra.com",
					},
				],
			};
			const newState = reducer(oldState, action);
			return expect(newState, "not to be", oldState).and(
				"value at",
				"tasks",
				"to equal",
				Immutable.fromJS([
					{
						taskId: "5cb96f72f9bb47fc9e4feb5f9817772e",
						created: "2023-03-14T15:26:32.9986622Z",
						name: "Report export (Customer Extract)",
						type: "Orckestra.Overture.Providers.CommerceEngine.Reporting.ReportExportTask, Orckestra.Overture.Providers.CommerceEngine",
						status: "Faulted",
						requester: "gert.sonderby@orckestra.com",
					},
					{
						taskId: "8908517403b84b44832e99f5c59eb4eb",
						created: "2023-03-24T15:26:32.9986622Z",
						name: "Report export (Report Export)",
						status: "RanToCompletion",
						resultBlobUrl: "packages/Report_20190430_11324479637592.xlsx",
						type: "Orckestra.Overture.Providers.CommerceEngine.Reporting.ReportExportTask, Orckestra.Overture.Providers.CommerceEngine",
					},
				]),
			);
		});
	});

	describe("removes a task from the list", () => {
		it("removes a task from the list", () => {
			const oldState = Immutable.fromJS({
				new: false,
				taskInfos: {
					"5cb96f72f9bb47fc9e4feb5f9817772e": {},
					"8908517403b84b44832e99f5c59eb4eb": {},
				},
				tasks: [
					{
						taskId: "8908517403b84b44832e99f5c59eb4eb",
						name: "Report export (Report Export)",
						status: "RanToCompletion",
						resultBlobUrl: "packages/Report_20190430_11324479637592.xlsx",
						type: "Orckestra.Overture.Providers.CommerceEngine.Reporting.ReportExportTask, Orckestra.Overture.Providers.CommerceEngine",
					},
					{
						taskId: "5cb96f72f9bb47fc9e4feb5f9817772e",
						name: "Report export (Customer Extract)",
						type: "Orckestra.Overture.Providers.CommerceEngine.Reporting.ReportExportTask, Orckestra.Overture.Providers.CommerceEngine",
						status: "Faulted",
					},
				],
				logs: {
					"8908517403b84b44832e99f5c59eb4eb": ["a"],
					"5cb96f72f9bb47fc9e4feb5f9817772e": ["b"],
				},
			});
			const action = {
				type: DELETE_TASK_REQUEST,
				meta: { taskId: "8908517403b84b44832e99f5c59eb4eb" },
			};
			const newState = reducer(oldState, action);
			return expect(newState, "not to be", oldState)
				.and(
					"value at",
					"tasks",
					"to equal",
					Immutable.fromJS([
						{
							taskId: "5cb96f72f9bb47fc9e4feb5f9817772e",
							name: "Report export (Customer Extract)",
							type: "Orckestra.Overture.Providers.CommerceEngine.Reporting.ReportExportTask, Orckestra.Overture.Providers.CommerceEngine",
							status: "Faulted",
						},
					]),
				)
				.and(
					"value at",
					"logs",
					"to equal",
					Immutable.fromJS({
						"5cb96f72f9bb47fc9e4feb5f9817772e": ["b"],
					}),
				)
				.and(
					"value at",
					"taskInfos",
					"to equal",
					Immutable.fromJS({
						"5cb96f72f9bb47fc9e4feb5f9817772e": {},
					}),
				);
		});
	});

	describe("load task log", () => {
		it("stores a log loaded from server", () => {
			const oldState = Immutable.fromJS({
				logs: {
					"5cb96f72f9bb47fc9e4feb5f9817772e": [{ id: "1" }, { id: "2" }],
				},
			});
			const action = {
				type: GET_TASK_LOG_SUCCESS,
				meta: { taskId: "641b80e5-2bad-454b-b9c2-18753348d121" },
				payload: [
					{
						id: "41debbd4-c229-449b-96b4-4c3a98d53fc3",
						taskId: "641b80e5-2bad-454b-b9c2-18753348d121",
						logLevel: "Info",
						message: "[Information] Exported report to path: packages/Report_20190515_07045925463191.pdf\r\n",
						executionTime: "2019-05-15T07:04:59.3641552Z",
					},
					{
						id: "80b42d72-6bf2-44ce-beb4-a75cd3867d9d",
						taskId: "641b80e5-2bad-454b-b9c2-18753348d121",
						logLevel: "Info",
						message:
							"[Information] Parameters used for the export:\nName: Scope\nValue: BetterRetail\n\r\nName: StartDate\nValue: 05/15/2014 00:00:00\n\r\nName: EndDate\nValue: 05/15/2019 00:00:00\n\r\n\r\n",
						executionTime: "2019-05-10T07:04:57.8172100Z",
					},
					{
						id: "2955e65f-744e-4225-beb1-d298a8fd02f6",
						taskId: "641b80e5-2bad-454b-b9c2-18753348d121",
						logLevel: "Info",
						message: '[Information] Starting report export: Report Export. Export as "Pdf"\r\n',
						executionTime: "2019-05-19T07:04:57.8016097Z",
					},
				],
			};
			const newState = reducer(oldState, action);
			return expect(newState, "not to be", oldState).and(
				"value at",
				"logs",
				"to equal",
				Immutable.fromJS({
					"5cb96f72f9bb47fc9e4feb5f9817772e": [{ id: "1" }, { id: "2" }],
					"641b80e5-2bad-454b-b9c2-18753348d121": [
						{
							id: "80b42d72-6bf2-44ce-beb4-a75cd3867d9d",
							taskId: "641b80e5-2bad-454b-b9c2-18753348d121",
							logLevel: "Info",
							message:
								"[Information] Parameters used for the export:\nName: Scope\nValue: BetterRetail\n\r\nName: StartDate\nValue: 05/15/2014 00:00:00\n\r\nName: EndDate\nValue: 05/15/2019 00:00:00\n\r\n\r\n",
							executionTime: "2019-05-10T07:04:57.8172100Z",
						},
						{
							id: "41debbd4-c229-449b-96b4-4c3a98d53fc3",
							taskId: "641b80e5-2bad-454b-b9c2-18753348d121",
							logLevel: "Info",
							message: "[Information] Exported report to path: packages/Report_20190515_07045925463191.pdf\r\n",
							executionTime: "2019-05-15T07:04:59.3641552Z",
						},
						{
							id: "2955e65f-744e-4225-beb1-d298a8fd02f6",
							taskId: "641b80e5-2bad-454b-b9c2-18753348d121",
							logLevel: "Info",
							message: '[Information] Starting report export: Report Export. Export as "Pdf"\r\n',
							executionTime: "2019-05-19T07:04:57.8016097Z",
						},
					],
				}),
			);
		});

		it("log is replaced", () => {
			const oldState = Immutable.fromJS({
				logs: {
					"5cb96f72f9bb47fc9e4feb5f9817772e": [{ id: "1" }, { id: "2" }],
					"641b80e5-2bad-454b-b9c2-18753348d121": [{ id: "1" }, { id: "2" }],
				},
			});
			const action = {
				type: GET_TASK_LOG_SUCCESS,
				meta: { taskId: "641b80e5-2bad-454b-b9c2-18753348d121" },
				payload: [
					{
						id: "41debbd4-c229-449b-96b4-4c3a98d53fc3",
						taskId: "641b80e5-2bad-454b-b9c2-18753348d121",
						logLevel: "Info",
						message: "[Information] Exported report to path: packages/Report_20190515_07045925463191.pdf\r\n",
						executionTime: "2019-05-15T07:04:59.3641552Z",
					},
					{
						id: "80b42d72-6bf2-44ce-beb4-a75cd3867d9d",
						taskId: "641b80e5-2bad-454b-b9c2-18753348d121",
						logLevel: "Info",
						message:
							"[Information] Parameters used for the export:\nName: Scope\nValue: BetterRetail\n\r\nName: StartDate\nValue: 05/15/2014 00:00:00\n\r\nName: EndDate\nValue: 05/15/2019 00:00:00\n\r\n\r\n",
						executionTime: "2019-05-10T07:04:57.8172100Z",
					},
					{
						id: "2955e65f-744e-4225-beb1-d298a8fd02f6",
						taskId: "641b80e5-2bad-454b-b9c2-18753348d121",
						logLevel: "Info",
						message: '[Information] Starting report export: Report Export. Export as "Pdf"\r\n',
						executionTime: "2019-05-19T07:04:57.8016097Z",
					},
				],
			};
			const newState = reducer(oldState, action);
			return expect(newState, "not to be", oldState).and(
				"value at",
				"logs",
				"to equal",
				Immutable.fromJS({
					"5cb96f72f9bb47fc9e4feb5f9817772e": [{ id: "1" }, { id: "2" }],
					"641b80e5-2bad-454b-b9c2-18753348d121": [
						{
							id: "80b42d72-6bf2-44ce-beb4-a75cd3867d9d",
							taskId: "641b80e5-2bad-454b-b9c2-18753348d121",
							logLevel: "Info",
							message:
								"[Information] Parameters used for the export:\nName: Scope\nValue: BetterRetail\n\r\nName: StartDate\nValue: 05/15/2014 00:00:00\n\r\nName: EndDate\nValue: 05/15/2019 00:00:00\n\r\n\r\n",
							executionTime: "2019-05-10T07:04:57.8172100Z",
						},
						{
							id: "41debbd4-c229-449b-96b4-4c3a98d53fc3",
							taskId: "641b80e5-2bad-454b-b9c2-18753348d121",
							logLevel: "Info",
							message: "[Information] Exported report to path: packages/Report_20190515_07045925463191.pdf\r\n",
							executionTime: "2019-05-15T07:04:59.3641552Z",
						},
						{
							id: "2955e65f-744e-4225-beb1-d298a8fd02f6",
							taskId: "641b80e5-2bad-454b-b9c2-18753348d121",
							logLevel: "Info",
							message: '[Information] Starting report export: Report Export. Export as "Pdf"\r\n',
							executionTime: "2019-05-19T07:04:57.8016097Z",
						},
					],
				}),
			);
		});

		it("log is removed because of empty list", () => {
			const oldState = Immutable.fromJS({
				logs: {
					"5cb96f72f9bb47fc9e4feb5f9817772e": [{ id: "1" }, { id: "2" }],
					"641b80e5-2bad-454b-b9c2-18753348d121": [{ id: "1" }, { id: "2" }],
				},
			});
			const action = {
				type: GET_TASK_LOG_SUCCESS,
				meta: { taskId: "641b80e5-2bad-454b-b9c2-18753348d121" },
				payload: [],
			};
			const newState = reducer(oldState, action);
			return expect(newState, "not to be", oldState).and(
				"value at",
				"logs",
				"to equal",
				Immutable.fromJS({
					"5cb96f72f9bb47fc9e4feb5f9817772e": [{ id: "1" }, { id: "2" }],
				}),
			);
		});
	});

	describe("clear task log", () => {
		it("deletes the task log", () => {
			const oldState = Immutable.fromJS({
				logs: {
					"5cb96f72f9bb47fc9e4feb5f9817772e": [{ id: "1" }, { id: "2" }],
					FFb96f72f9bb47fc9e4feb5f981777FF: [{ id: "3" }, { id: "4" }],
					"641b80e5-2bad-454b-b9c2-18753348d121": [
						{
							id: "80b42d72-6bf2-44ce-beb4-a75cd3867d9d",
							taskId: "641b80e5-2bad-454b-b9c2-18753348d121",
							logLevel: "Info",
							message:
								"[Information] Parameters used for the export:\nName: Scope\nValue: BetterRetail\n\r\nName: StartDate\nValue: 05/15/2014 00:00:00\n\r\nName: EndDate\nValue: 05/15/2019 00:00:00\n\r\n\r\n",
							executionTime: "2019-05-10T07:04:57.8172100Z",
						},
						{
							id: "41debbd4-c229-449b-96b4-4c3a98d53fc3",
							taskId: "641b80e5-2bad-454b-b9c2-18753348d121",
							logLevel: "Info",
							message: "[Information] Exported report to path: packages/Report_20190515_07045925463191.pdf\r\n",
							executionTime: "2019-05-15T07:04:59.3641552Z",
						},
						{
							id: "2955e65f-744e-4225-beb1-d298a8fd02f6",
							taskId: "641b80e5-2bad-454b-b9c2-18753348d121",
							logLevel: "Info",
							message: '[Information] Starting report export: Report Export. Export as "Pdf"\r\n',
							executionTime: "2019-05-19T07:04:57.8016097Z",
						},
					],
				},
			});
			const action = clearTaskLog("641b80e5-2bad-454b-b9c2-18753348d121");
			const newState = reducer(oldState, action);
			return expect(newState, "not to be", oldState).and(
				"value at",
				"logs",
				"to equal",
				Immutable.fromJS({
					"5cb96f72f9bb47fc9e4feb5f9817772e": [{ id: "1" }, { id: "2" }],
					FFb96f72f9bb47fc9e4feb5f981777FF: [{ id: "3" }, { id: "4" }],
				}),
			);
		});
	});
});
