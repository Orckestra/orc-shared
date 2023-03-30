import { makeActionTypes } from "./makeApiAction";
import makeOrcApiAction from "./makeOrcApiAction";
import {
	deleteTaskInfoRequest,
	getRequesterTasksInfoRequest,
	getTaskExecutionLogsRequest,
	getTaskInfoRequest,
} from "./requestsApi";

const GET_TASKINFO = "GET_TASKINFO";

export const [GET_TASKINFO_REQUEST, GET_TASKINFO_SUCCESS, GET_TASKINFO_FAILURE] = makeActionTypes(GET_TASKINFO);

export const getTaskInfo = taskId => makeOrcApiAction(GET_TASKINFO, getTaskInfoRequest.buildUrl(taskId));

export const GET_TASK_LIST = "GET_TASK_LIST";

export const ssrsDownloadFilterTaskNames = [
	"Orckestra.Overture.Providers.CommerceEngine.Profiles.ProfileSchemaExportTask, Orckestra.Overture.Providers.CommerceEngine",
	"Orckestra.Overture.Providers.CommerceEngine.Profiles.ProfileSchemaImportTask, Orckestra.Overture.Providers.CommerceEngine",
	"Orckestra.Overture.Providers.CommerceEngine.Orders.ExportOrderSchemaTask, Orckestra.Overture.Providers.CommerceEngine",
	"Orckestra.Overture.Providers.CommerceEngine.Orders.ImportOrderSchemaTask, Orckestra.Overture.Providers.CommerceEngine",
	"Orckestra.Overture.Providers.CommerceEngine.Products.ImportExport.ExportProductsTask, Orckestra.Overture.Providers.CommerceEngine",
	"Orckestra.Overture.Providers.CommerceEngine.Products.ImportExport.ProductSchemaExportTask, Orckestra.Overture.Providers.CommerceEngine",
	"Orckestra.Overture.Providers.CommerceEngine.Products.ImportExport.ImportProductsTask, Orckestra.Overture.Providers.CommerceEngine",
	"OrckestraCommerce.DataExchange.Product.Tasks.ProductExportTask, OrckestraCommerce.DataExchange",
	"Orckestra.Overture.Providers.CommerceEngine.Marketing.ExportCouponCodesTask, Orckestra.Overture.Providers.CommerceEngine",
	"Orckestra.Overture.Providers.CommerceEngine.Marketing.ImportCouponCodesTask, Orckestra.Overture.Providers.CommerceEngine",
	"Orckestra.Overture.Providers.CommerceEngine.Marketing.GenerateCouponTask, Orckestra.Overture.Providers.CommerceEngine",
	"Orckestra.Overture.Providers.CommerceEngine.Reporting.ReportExportTask, Orckestra.Overture.Providers.CommerceEngine",
];

export const [GET_TASK_LIST_REQUEST, GET_TASK_LIST_SUCCESS, GET_TASK_LIST_FAILURE] = makeActionTypes(GET_TASK_LIST);

export const getTaskList = (requester, filterTaskNames, lastModified = null, addToActiveRequests = true) =>
	makeOrcApiAction(
		GET_TASK_LIST,
		getRequesterTasksInfoRequest.buildUrl({
			filterTaskNames: filterTaskNames,
			requester: requester,
			lastModified: lastModified,
		}),
		getRequesterTasksInfoRequest.verb,
		{
			meta: {
				addToActiveRequests,
			},
		},
	);

const DELETE_TASK = "DELETE_TASK";

export const [DELETE_TASK_REQUEST, DELETE_TASK_SUCCESS, DELETE_TASK_FAILURE] = makeActionTypes(DELETE_TASK);

export const deleteTask = taskId =>
	makeOrcApiAction(DELETE_TASK, deleteTaskInfoRequest.buildUrl(taskId), deleteTaskInfoRequest.verb, {
		meta: { taskId },
	});

const GET_TASK_LOG = "GET_TASK_LOG";

export const [GET_TASK_LOG_REQUEST, GET_TASK_LOG_SUCCESS, GET_TASK_LOG_FAILURE] = makeActionTypes(GET_TASK_LOG);

export const getTaskLog = taskId =>
	makeOrcApiAction(GET_TASK_LOG, getTaskExecutionLogsRequest.buildUrl(taskId), getTaskExecutionLogsRequest.verb, {
		meta: { taskId },
	});

export const CLEAR_TASK_LOG = "CLEAR_TASK_LOG";

export const clearTaskLog = taskId => ({
	type: CLEAR_TASK_LOG,
	meta: { taskId },
});
