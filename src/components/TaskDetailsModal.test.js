import React from "react";
import Immutable from "immutable";
import { mount } from "enzyme";
import TaskDetailsModal from "./TaskDetailsModal";
import Modal from "./MaterialUI/DataDisplay/Modal";
import { defaultCulture } from "../selectors/locale";
import sinon from "sinon";
import { createMuiTheme, extractMessages, TestWrapper } from "../utils/testUtils";
import sharedMessages from "../sharedMessages";
import ModalProps from "./MaterialUI/DataDisplay/modalProps";
import { Ignore } from "unexpected-reaction";
import InformationItem from "./MaterialUI/DataDisplay/PredefinedElements/InformationItem";
import { clearTaskLog, getTaskInfo, getTaskLog } from "../actions/tasks";
import { taskStatuses } from "../constants";

const messages = extractMessages(sharedMessages);

jest.mock("../utils/buildUrl", () => {
	const modExport = {};
	modExport.loadConfig = () => Promise.resolve({});
	modExport.buildUrl = (path = [], params = "") => "URL: " + path.join("/") + " " + JSON.stringify(params);
	return modExport;
});

function removeBailout(obj) {
	delete obj["@@redux-api-middleware/RSAA"].bailout;
	return obj;
}

describe("TaskDetailsModal", () => {
	let state, dispatch, store, clearIntervalSpy;
	const theme = createMuiTheme();

	beforeEach(() => {
		//window.bypassDebounce = true;

		dispatch = sinon.spy().named("dispatch");
		jest.useFakeTimers();
		clearIntervalSpy = sinon.spy(global, "clearInterval");

		state = Immutable.fromJS({
			requests: {
				logout: false,
			},
			metadata: {
				lookups: {},
			},
			tasks: {
				taskInfos: {},
				tasks: [],
				logs: {},
			},
			locale: {
				defaultCulture: defaultCulture,
			},
		});

		store = {
			getState: () => state,
			subscribe: () => {},
			dispatch: dispatch,
		};
	});
	afterEach(() => {
		jest.useRealTimers();
		jest.restoreAllMocks();
		clearIntervalSpy.restore();
	});

	it("renders a modal for task", () => {
		const modalProps = new ModalProps();

		modalProps.set(ModalProps.propNames.title, "Task In Progress");
		modalProps.set(ModalProps.propNames.open, true);
		modalProps.set(ModalProps.propNames.type, "wide");
		modalProps.set(ModalProps.propNames.actionPanel, <Ignore />);

		const expectedContent = (
			<div>
				<InformationItem label={sharedMessages.taskId}>1234</InformationItem>
				<InformationItem label={sharedMessages.taskStatus}>
					<Ignore />
				</InformationItem>
				<InformationItem label={sharedMessages.taskLogs}>
					<textarea />
				</InformationItem>
			</div>
		);

		expect(
			<TestWrapper
				provider={{ store }}
				memoryRouter
				stylesProvider
				muiThemeProvider={{ theme }}
				intlProvider={{ messages }}
			>
				<TaskDetailsModal taskId="1234" open={true} closeModal={() => {}} />
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper
				provider={{ store }}
				memoryRouter
				stylesProvider
				muiThemeProvider={{ theme }}
				intlProvider={{ messages }}
			>
				<Modal message={expectedContent} modalProps={modalProps} />
			</TestWrapper>,
		).then(() => expect(console.error, "was not called"));
	});

	it("renders a modal for task with status and logs", () => {
		state = state.setIn(
			["tasks", "logs", "1234"],
			[
				{ executionTime: "", message: null },
				{ executionTime: "4", message: "msg\r\n" },
				{ executionTime: "3", message: "another" },
			],
		);
		state = state.setIn(["tasks", "taskInfos", "1234"], { status: taskStatuses.running });

		const modalProps = new ModalProps();

		modalProps.set(ModalProps.propNames.title, "Task In Progress");
		modalProps.set(ModalProps.propNames.open, true);
		modalProps.set(ModalProps.propNames.type, "wide");
		modalProps.set(ModalProps.propNames.actionPanel, <Ignore />);

		const expectedContent = (
			<div>
				<InformationItem label={sharedMessages.taskId}>1234</InformationItem>
				<InformationItem label={sharedMessages.taskStatus}>[Running]</InformationItem>
				<InformationItem label={sharedMessages.taskLogs}>
					<textarea readOnly value={"another\nmsg"} />
				</InformationItem>
			</div>
		);

		expect(
			<TestWrapper
				provider={{ store }}
				memoryRouter
				stylesProvider
				muiThemeProvider={{ theme }}
				intlProvider={{ messages }}
			>
				<TaskDetailsModal taskId="1234" open={true} closeModal={() => {}} />
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper
				provider={{ store }}
				memoryRouter
				stylesProvider
				muiThemeProvider={{ theme }}
				intlProvider={{ messages }}
			>
				<Modal message={expectedContent} modalProps={modalProps} />
			</TestWrapper>,
		).then(() => expect(console.error, "was not called"));
	});

	it("close the dialog", () => {
		const closeSpy = sinon.spy().named("close");

		const content = (
			<TestWrapper
				provider={{ store }}
				memoryRouter
				stylesProvider
				muiThemeProvider={{ theme }}
				intlProvider={{ messages }}
			>
				<TaskDetailsModal taskId="1234" open={true} closeModal={closeSpy} />
			</TestWrapper>
		);

		const mountedComponent = mount(content);
		store.dispatch.resetHistory();

		const input = mountedComponent.find("[data-qa='" + sharedMessages.close.id + "']").at(0);
		input.simulate("click");

		expect(closeSpy, "was called");
		expect(store.dispatch, "to have calls satisfying", [
			{
				args: [clearTaskLog("1234")],
			},
		]);
	});

	it("clear timer on unmount", () => {
		const closeSpy = sinon.spy().named("close");
		const content = (
			<TestWrapper
				provider={{ store }}
				memoryRouter
				stylesProvider
				muiThemeProvider={{ theme }}
				intlProvider={{ messages }}
			>
				<TaskDetailsModal taskId="1234" open={true} closeModal={closeSpy} />
			</TestWrapper>
		);

		const mountedComponent = mount(content);
		clearIntervalSpy.resetHistory();
		mountedComponent.unmount();

		expect(clearIntervalSpy, "was called");
	});

	it("taskInfo is called to load data", () => {
		const content = (
			<TestWrapper
				provider={{ store }}
				memoryRouter
				stylesProvider
				muiThemeProvider={{ theme }}
				intlProvider={{ messages }}
			>
				<TaskDetailsModal taskId="1234" open={true} closeModal={() => {}} />
			</TestWrapper>
		);

		mount(content);

		expect(store.dispatch, "to have calls satisfying", [
			{
				args: [removeBailout(getTaskInfo("1234"))],
			},
		]);
		expect(store.dispatch, "not to have calls satisfying", [
			{
				args: [removeBailout(getTaskLog("1234"))],
			},
		]);
	});

	it("taskLogs is called to load data", () => {
		const content = (
			<TestWrapper
				provider={{ store }}
				memoryRouter
				stylesProvider
				muiThemeProvider={{ theme }}
				intlProvider={{ messages }}
			>
				<TaskDetailsModal taskId="1234" open={true} closeModal={() => {}} />
			</TestWrapper>
		);

		mount(content);

		expect(store.dispatch, "to have calls satisfying", [
			{
				args: [removeBailout(getTaskInfo("1234"))],
			},
		]);

		store.dispatch.resetHistory();

		jest.runOnlyPendingTimers();

		expect(store.dispatch, "to have calls satisfying", [
			{
				args: [removeBailout(getTaskInfo("1234"))],
			},
			{
				args: [removeBailout(getTaskLog("1234", false))],
			},
		]);
	});

	it.each([taskStatuses.faulted, taskStatuses.ranToCompletion, taskStatuses.canceled, taskStatuses.ignored])(
		"taskLogs is not called because task is completed (%s)",
		newStatus => {
			state = state.setIn(["tasks", "taskInfos", "1234"], { status: newStatus });

			const content = (
				<TestWrapper
					provider={{ store }}
					memoryRouter
					stylesProvider
					muiThemeProvider={{ theme }}
					intlProvider={{ messages }}
				>
					<TaskDetailsModal taskId="1234" open={true} closeModal={() => {}} />
				</TestWrapper>
			);

			mount(content);

			expect(store.dispatch, "not to have calls satisfying", [
				{
					args: [removeBailout(getTaskInfo("1234"))],
				},
			]);

			store.dispatch.resetHistory();

			jest.runOnlyPendingTimers();

			expect(store.dispatch, "not to have calls satisfying", [
				{
					args: [removeBailout(getTaskInfo("1234"))],
				},
				{
					args: [removeBailout(getTaskLog("1234"))],
				},
			]);
		},
	);
});
