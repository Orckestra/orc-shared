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
};

export const roleGroups = {
	Products: "Products",
	Orders: "Orders",
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
