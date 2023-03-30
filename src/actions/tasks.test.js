import { RSAA } from "redux-api-middleware";
import {
	GET_TASKINFO_REQUEST,
	GET_TASKINFO_SUCCESS,
	GET_TASKINFO_FAILURE,
	getTaskInfo,
	getTaskList,
	getTaskLog,
	ssrsDownloadFilterTaskNames,
	deleteTask,
} from "./tasks";

jest.mock("../utils/buildUrl", () => {
	const modExport = {};
	modExport.loadConfig = () => Promise.resolve({});
	modExport.buildUrl = (path = [], params = "") => "URL: " + path.join("/") + " " + JSON.stringify(params);
	return modExport;
});

describe("getTaskInfo", () => {
	it("creates a RSAA to get task info", () =>
		expect(getTaskInfo, "when called with", ["1234"], "to exhaustively satisfy", {
			[RSAA]: {
				types: [GET_TASKINFO_REQUEST, GET_TASKINFO_SUCCESS, GET_TASKINFO_FAILURE],
				endpoint: 'URL: tasks/1234 ""',
				method: "GET",
				body: undefined,
				credentials: "include",
				bailout: expect.it("to be a function"),
				headers: {
					Accept: "application/json; charset=utf-8",
					"Content-Type": "application/json",
				},
				options: { redirect: "follow" },
			},
		}));
});

describe("getTaskLog", () => {
	it("creates a RSAA to get task info", () =>
		expect(getTaskLog, "when called with", ["1234"], "to exhaustively satisfy", {
			[RSAA]: {
				types: [
					{ type: "GET_TASK_LOG_REQUEST", meta: { taskId: "1234", addToActiveRequests: true } },
					{ type: "GET_TASK_LOG_SUCCESS", meta: { taskId: "1234", addToActiveRequests: true } },
					{ type: "GET_TASK_LOG_FAILURE", meta: { taskId: "1234", addToActiveRequests: true } },
				],
				endpoint: 'URL: tasks/1234/logs ""',
				method: "GET",
				body: undefined,
				credentials: "include",
				bailout: expect.it("to be a function"),
				headers: {
					Accept: "application/json; charset=utf-8",
					"Content-Type": "application/json",
				},
				options: { redirect: "follow" },
			},
		}));

	it("creates a RSAA to get task info with addToActiveRequests false", () =>
		expect(getTaskLog, "when called with", ["1234", false], "to exhaustively satisfy", {
			[RSAA]: {
				types: [
					{ type: "GET_TASK_LOG_REQUEST", meta: { taskId: "1234", addToActiveRequests: false } },
					{ type: "GET_TASK_LOG_SUCCESS", meta: { taskId: "1234", addToActiveRequests: false } },
					{ type: "GET_TASK_LOG_FAILURE", meta: { taskId: "1234", addToActiveRequests: false } },
				],
				endpoint: 'URL: tasks/1234/logs ""',
				method: "GET",
				body: undefined,
				credentials: "include",
				bailout: expect.it("to be a function"),
				headers: {
					Accept: "application/json; charset=utf-8",
					"Content-Type": "application/json",
				},
				options: { redirect: "follow" },
			},
		}));
});

describe("getTaskList", () => {
	it("creates a RSAA to get task info", () => {
		const expectedParameters = {
			filterTaskNames: ssrsDownloadFilterTaskNames,
			requester: "freddie",
			lastModified: "date value",
		};

		expect(
			getTaskList,
			"when called with",
			["freddie", ssrsDownloadFilterTaskNames, "date value", false],
			"to exhaustively satisfy",
			{
				[RSAA]: {
					types: [
						{ type: "GET_TASK_LIST_REQUEST", meta: { addToActiveRequests: false } },
						{ type: "GET_TASK_LIST_SUCCESS", meta: { addToActiveRequests: false } },
						{ type: "GET_TASK_LIST_FAILURE", meta: { addToActiveRequests: false } },
					],
					endpoint: "URL: tasks " + JSON.stringify(expectedParameters),
					method: "GET",
					body: undefined,
					credentials: "include",
					bailout: expect.it("to be a function"),
					headers: {
						Accept: "application/json; charset=utf-8",
						"Content-Type": "application/json",
					},
					options: { redirect: "follow" },
				},
			},
		);
	});

	it("creates a RSAA to get task info with null lastModified and true addToActiveRequests", () => {
		const expectedParameters = {
			filterTaskNames: ssrsDownloadFilterTaskNames,
			requester: "freddie",
			lastModified: null,
		};

		expect(getTaskList, "when called with", ["freddie", ssrsDownloadFilterTaskNames], "to exhaustively satisfy", {
			[RSAA]: {
				types: [
					{ type: "GET_TASK_LIST_REQUEST", meta: { addToActiveRequests: true } },
					{ type: "GET_TASK_LIST_SUCCESS", meta: { addToActiveRequests: true } },
					{ type: "GET_TASK_LIST_FAILURE", meta: { addToActiveRequests: true } },
				],
				endpoint: "URL: tasks " + JSON.stringify(expectedParameters),
				method: "GET",
				body: undefined,
				credentials: "include",
				bailout: expect.it("to be a function"),
				headers: {
					Accept: "application/json; charset=utf-8",
					"Content-Type": "application/json",
				},
				options: { redirect: "follow" },
			},
		});
	});
});

describe("deleteTask", () => {
	it("creates a RSAA to delete a task", () => {
		expect(deleteTask, "when called with", ["1234"], "to exhaustively satisfy", {
			[RSAA]: {
				types: [
					{ type: "DELETE_TASK_REQUEST", meta: { taskId: "1234" } },
					{ type: "DELETE_TASK_SUCCESS", meta: { taskId: "1234" } },
					{ type: "DELETE_TASK_FAILURE", meta: { taskId: "1234" } },
				],
				endpoint: 'URL: tasks/1234 ""',
				method: "DELETE",
				body: undefined,
				credentials: "include",
				bailout: expect.it("to be a function"),
				headers: {
					Accept: "application/json; charset=utf-8",
					"Content-Type": "application/json",
				},
				options: { redirect: "follow" },
			},
		});
	});
});
