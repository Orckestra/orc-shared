export const infoBar = "infoBar";

export const scopeTypes = {
	global: "Global",
	virtual: "Virtual",
	dependant: "Dependant",
	sale: "Sale",
};

export const platformRoles = {
	Picker: "Picker",
	Integrator: "Integrator",
	Administrator: "Administrator",
	Editor: "Editor",
	Reader: "Reader",
	Recipient: "Recipient",
};

export const roleGroups = {
	Products: "Products",
	Orders: "Orders",
	OrderReturn: "OrderReturn",
	Marketing: "Marketing",
	Analytics: "Analytics",
	Shopping: "Shopping",
	Search: "Search",
	Profiles: "Profiles",
	Locations: "Locations",
	Orchestrator: "Orchestrator",
	PriceManagement: "PriceManagement",
	UserManagement: "UserManagement",
	System: "System",
	Application: "Application",
	DAM: "DAM",
	FulfillmentApplication: "FulfillmentApplication",
	Report: "Report",
	Inventories: "Inventories",
	Customer: "Customer",
};

export const validationErrorTypes = {
	fieldIsRequired: "fieldIsRequired",
	fieldHasWrongValue: "fieldHasWrongValue",
	fieldMustBeValidEmail: "fieldMustBeValidEmail",
	fieldMustBeValidPhoneNumber: "fieldMustBeValidPhoneNumber",
	fieldMustBeValidPhoneExtension: "fieldMustBeValidPhoneExtension",
};

export const displayMode = {
	edit: "edit",
	read: "read",
	create: "create",
};

export const requestStates = {
	processing: "processing",
	success: "success",
	fail: "fail",
	idle: "idle",
};

export const scopeConfirmationDialogTypes = {
	none: "None",
	hasUnsavedDataMessage: "HasUnsavedDataMessage",
	scopeChangeConfirmation: "ScopeChangeConfirmation",
};

export const attributeDataType = {
	integer: "Integer",
	decimal: "Decimal",
	boolean: "Boolean",
	text: "Text",
	dateTime: "DateTime",
	lookup: "Lookup",
	entityReference: "EntityReference",
	customType: "CustomType",
	singleChoice: "SingleChoice",
	multipleChoice: "MultipleChoice",
};

// It is intended that some of them have a different value of its keys
export const overtureModule = {
	System: "System",
	Products: "Product",
	Customers: "Customer",
	Orders: "Order",
	Marketing: "Marketing",
	Report: "Reports",
	Administration: "Administration",
	UserManagement: "UserManagement",
	PriceManagement: "PriceManagement",
	Locations: "Location",
};

export const definitionType = {
	shared: "Shared",
	embedded: "Embedded",
};

export const requestStateOperations = {
	create: "create",
	delete: "delete",
	fetch: "fetch",
	update: "update",
};
export const requestStateOperationMap = {
	create: "creates",
	delete: "deletes",
	fetch: "fetches",
	update: "updates",
};

export const taskStatuses = {
	created: "Created",
	waitingToRun: "WaitingToRun",
	running: "Running",
	ranToCompletion: "RanToCompletion",
	canceled: "Canceled",
	faulted: "Faulted",
	idle: "Idle",
	waitingToCancel: "WaitingToCancel",
	ignored: "Ignored",
	queuedForSequence: "QueuedForSequence",
};

export const propertyBagPrimitiveDataType = {
	boolean: "Boolean",
	byte: "Byte",
	sbyte: "SByte",
	int16: "Int16",
	uint16: "UInt16",
	int32: "Int32",
	uint32: "UInt32",
	int64: "Int64",
	uint64: "UInt64",
	single: "Single",
	double: "Double",
	decimal: "Decimal",
	dateTime: "DateTime",
	char: "Char",
	string: "String",
	guid: "Guid",
};

export const dotNetDataTypes = {
	boolean: "System.Boolean",
	byte: "System.Byte",
	sbyte: "System.SByte",
	int16: "System.Int16",
	uint16: "System.UInt16",
	int32: "System.Int32",
	uint32: "System.UInt32",
	int64: "System.Int64",
	uint64: "System.UInt64",
	single: "System.Single",
	double: "System.Double",
	decimal: "System.Decimal",
	dateTime: "System.DateTime",
	char: "System.Char",
	string: "System.String",
	guid: "System.Guid",
};

export const serializationTypeKey = "__type";

export const jsonCargoType = {
	boolean: "Boolean",
	double: "Double",
	dateTime: "DateTime",
	integer: "Int32",
	stringArray: "String[]",
	entityReferences: "Guid[]",
};

export const allValue = "#All#";

export const choiceControlOrientation = {
	horizontal: "Horizontal",
	vertical: "Vertical",
};
