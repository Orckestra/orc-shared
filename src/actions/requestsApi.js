/* istanbul ignore file */

import { buildUrl } from "../utils/buildUrl";

export const acquireEntityLockRequest = {
	name: "acquireEntityLockRequest",
	buildUrl: (scopeId, entity, entityId) => buildUrl(["locking", scopeId, "entity", entity, entityId, "lock"]),
	verb: "POST",
};

export const activateUserRequest = {
	name: "activateUserRequest",
	buildUrl: userName => buildUrl(["users", userName, "activate"]),
	verb: "POST",
};

export const activateUsersRequest = {
	name: "activateUsersRequest",
	buildUrl: () => buildUrl(["users", "activate"]),
	verb: "PUT",
};

export const addAddressToCustomProfileRequest = {
	name: "addAddressToCustomProfileRequest",
	buildUrl: (scopeId, entityId) => buildUrl(["customProfiles", scopeId, entityId, "addresses"]),
	verb: "POST",
};

export const addAddressToCustomerRequest = {
	name: "addAddressToCustomerRequest",
	buildUrl: (scopeId, customerId) => buildUrl(["customers", scopeId, customerId, "addresses"]),
	verb: "POST",
};

export const addCountryRequest = {
	name: "addCountryRequest",
	buildUrl: () => buildUrl(["countries"]),
	verb: "POST",
};

export const addCouponRequest = {
	name: "addCouponRequest",
	buildUrl: (scopeId, customerId, cartName, couponCode) =>
		buildUrl(["carts", scopeId, customerId, cartName, "coupons", couponCode]),
	verb: "POST",
};

export const addCustomerNoteRequest = {
	name: "addCustomerNoteRequest",
	buildUrl: (scopeId, customerId) => buildUrl(["customers", scopeId, customerId, "notes"]),
	verb: "POST",
};

export const addCustomerPaymentProfileRequest = {
	name: "addCustomerPaymentProfileRequest",
	buildUrl: (scopeId, customerId, paymentProviderName) =>
		buildUrl(["customers", scopeId, customerId, paymentProviderName, "paymentProfile"]),
	verb: "POST",
};

export const addCustomersToOrganizationRequest = {
	name: "addCustomersToOrganizationRequest",
	buildUrl: scopeId => buildUrl(["organizations", scopeId, "customers"]),
	verb: "POST",
};

export const addFromGlobalRequest = {
	name: "addFromGlobalRequest",
	buildUrl: scopeId => buildUrl(["products", scopeId, "fromGlobal"]),
	verb: "POST",
};

export const addFulfillmentCompetitionLocationsRequest = {
	name: "addFulfillmentCompetitionLocationsRequest",
	buildUrl: (scopeId, fulfillmentCompetitionId) =>
		buildUrl(["fulfillments", "competitions", scopeId, fulfillmentCompetitionId, "locations"]),
	verb: "POST",
};

export const addFulfillmentLocationTimeSlotRequest = {
	name: "addFulfillmentLocationTimeSlotRequest",
	buildUrl: (scopeId, fulfillmentLocationId, fulfillmentMethodType) =>
		buildUrl(["fulfillmentLocations", scopeId, fulfillmentLocationId, fulfillmentMethodType, "slots"]),
	verb: "POST",
};

export const addFulfillmentLocationTimeSlotReservationRequest = {
	name: "addFulfillmentLocationTimeSlotReservationRequest",
	buildUrl: (scopeId, fulfillmentLocationId, slotId) =>
		buildUrl(["fulfillmentLocations", scopeId, fulfillmentLocationId, "reservations", slotId]),
	verb: "POST",
};

export const addFulfillmentLocationTimeSlotsRequest = {
	name: "addFulfillmentLocationTimeSlotsRequest",
	buildUrl: (scopeId, fulfillmentLocationId, fulfillmentMethodType) =>
		buildUrl(["fulfillmentLocations", scopeId, fulfillmentLocationId, fulfillmentMethodType, "slots", "several"]),
	verb: "POST",
};

export const addInventoryScheduleRequest = {
	name: "addInventoryScheduleRequest",
	buildUrl: inventoryLocationId => buildUrl(["inventoryLocations", inventoryLocationId, "schedules"]),
	verb: "POST",
};

export const addLineItemInShipmentRequest = {
	name: "addLineItemInShipmentRequest",
	buildUrl: (scopeId, customerId, cartName, shipmentId) =>
		buildUrl(["carts", scopeId, customerId, cartName, "shipments", shipmentId, "lineItems"]),
	verb: "POST",
};

export const addLineItemRequest = {
	name: "addLineItemRequest",
	buildUrl: (scopeId, customerId, cartName) => buildUrl(["carts", scopeId, customerId, cartName, "lineItems"]),
	verb: "POST",
};

export const addOrUpdateCampaignRequest = {
	name: "addOrUpdateCampaignRequest",
	buildUrl: (scopeId, campaignId) => buildUrl(["campaigns", scopeId, campaignId, "full"]),
	verb: "PUT",
};

export const addOrUpdateCustomerAddressRequest = {
	name: "addOrUpdateCustomerAddressRequest",
	buildUrl: (customerId, addressId) => buildUrl(["customers", customerId, "addresses", addressId]),
	verb: "PUT",
};

export const addOrUpdateLineItemsInShipmentRequest = {
	name: "addOrUpdateLineItemsInShipmentRequest",
	buildUrl: (scopeId, customerId, cartName, shipmentId) =>
		buildUrl(["carts", scopeId, customerId, cartName, "shipments", shipmentId, "lineItems", "batch"]),
	verb: "POST",
};

export const addOrUpdateLineItemsRequest = {
	name: "addOrUpdateLineItemsRequest",
	buildUrl: (scopeId, customerId, cartName) => buildUrl(["carts", scopeId, customerId, cartName, "lineItems", "batch"]),
	verb: "POST",
};

export const addOrUpdatePriceListRequest = {
	name: "addOrUpdatePriceListRequest",
	buildUrl: scopeId => buildUrl(["products", scopeId, "priceLists"]),
	verb: "POST",
};

export const addOrUpdateRecurringOrderLineItemsRequest = {
	name: "addOrUpdateRecurringOrderLineItemsRequest",
	buildUrl: (scopeId, customerId) => buildUrl(["recurringOrders", scopeId, "lineItems", "forCustomer", customerId]),
	verb: "PUT",
};

export const addOrUpdateScheduledTaskTrigger = {
	name: "addOrUpdateScheduledTaskTrigger",
	buildUrl: (taskGroup, taskName, triggerGroup, triggerName) =>
		buildUrl(["tasks", "scheduled", taskGroup, taskName, "triggers", triggerGroup, triggerName]),
	verb: "PUT",
};

export const addOrUpdateVariantSearchConfigurationRequest = {
	name: "addOrUpdateVariantSearchConfigurationRequest",
	buildUrl: scopeId => buildUrl(["search", scopeId, "configurations", "variant"]),
	verb: "PUT",
};

export const addOrderHistoryRequest = {
	name: "addOrderHistoryRequest",
	buildUrl: scopeId => buildUrl(["orders", scopeId, "orderhistory"]),
	verb: "POST",
};

export const addOrderNoteRequest = {
	name: "addOrderNoteRequest",
	buildUrl: (scopeId, orderId) => buildUrl(["orders", scopeId, orderId, "notes"]),
	verb: "POST",
};

export const addOrganizationsToCustomerRequest = {
	name: "addOrganizationsToCustomerRequest",
	buildUrl: (scopeId, customerId) => buildUrl(["customers", scopeId, customerId, "organizations"]),
	verb: "POST",
};

export const addStoresToCustomerRequest = {
	name: "addStoresToCustomerRequest",
	buildUrl: (scopeId, customerId) => buildUrl(["customers", scopeId, customerId, "stores"]),
	verb: "POST",
};

export const addPaymentRequest = {
	name: "addPaymentRequest",
	buildUrl: (scopeId, customerId, cartName) => buildUrl(["carts", scopeId, customerId, cartName, "payments"]),
	verb: "POST",
};

export const addPriceListEntryRequest = {
	name: "addPriceListEntryRequest",
	buildUrl: (scopeId, productId) => buildUrl(["products", scopeId, productId, "priceListEntries"]),
	verb: "POST",
};

export const addRoleChildRequest = {
	name: "addRoleChildRequest",
	buildUrl: (parentRoleId, childRoleId) => buildUrl(["roles", parentRoleId, childRoleId]),
	verb: "POST",
};

export const addRoleChildToGlobalAdministratorRoleRequest = {
	name: "addRoleChildToGlobalAdministratorRoleRequest",
	buildUrl: childRoleId => buildUrl(["roles", "systemAdministrator", childRoleId]),
	verb: "POST",
};

export const addRoleChildrenRequest = {
	name: "addRoleChildrenRequest",
	buildUrl: parentRoleId => buildUrl(["roles", parentRoleId, "child"]),
	verb: "POST",
};

export const addShipmentFulfillmentMessagesRequest = {
	name: "addShipmentFulfillmentMessagesRequest",
	buildUrl: (scopeId, orderId, shipmentId) =>
		buildUrl(["orders", scopeId, orderId, "shipments", shipmentId, "state", "messages"]),
	verb: "POST",
};

export const addShipmentNoteRequest = {
	name: "addShipmentNoteRequest",
	buildUrl: (scopeId, orderId, shipmentId) => buildUrl(["orders", scopeId, orderId, "shipments", shipmentId, "notes"]),
	verb: "POST",
};

export const addShipmentRequest = {
	name: "addShipmentRequest",
	buildUrl: (scopeId, customerId, cartName) => buildUrl(["carts", scopeId, customerId, cartName, "shipments"]),
	verb: "POST",
};

export const addUserToGroupRequest = {
	name: "addUserToGroupRequest",
	buildUrl: (groupId, userName) => buildUrl(["groups", groupId, userName]),
	verb: "POST",
};

export const advancedSearchRequest = {
	name: "advancedSearchRequest",
	buildUrl: (scopeId, cultureName, indexName) => buildUrl(["search", scopeId, cultureName, "advanced", indexName]),
	verb: "POST",
};

export const assignPickerToPickingMissionRequest = {
	name: "assignPickerToPickingMissionRequest",
	buildUrl: (scopeId, id) => buildUrl(["pickingMissions", scopeId, id, "assignPicker"]),
	verb: "POST",
};

export const associateCustomerEntityRequest = {
	name: "associateCustomerEntityRequest",
	buildUrl: (customerId, scopeId, attributeName, entityId) =>
		buildUrl(["customers", customerId, "customProfiles", scopeId, attributeName, entityId]),
	verb: "POST",
};

export const associateEntityRequest = {
	name: "associateEntityRequest",
	buildUrl: (scopeId, parentEntityTypeName, parentId, attributeName, entityId) =>
		buildUrl(["customProfiles", scopeId, parentEntityTypeName, parentId, attributeName, entityId]),
	verb: "POST",
};

export const authorizePaymentRequest = {
	name: "authorizePaymentRequest",
	buildUrl: (scopeId, customerId, cartName, paymentId) =>
		buildUrl(["carts", scopeId, customerId, cartName, "payments", paymentId, "authorize"]),
	verb: "POST",
};

export const basicDiagnosticRequest = {
	name: "basicDiagnosticRequest",
	buildUrl: () => buildUrl(["diagnostic", "basic"]),
	verb: "GET",
};

export const bulkAssignProductCategoriesRequest = {
	name: "bulkAssignProductCategoriesRequest",
	buildUrl: scopeId => buildUrl(["products", scopeId, "bulkAssignCategories"]),
	verb: "POST",
};

export const bulkRevertProductChangesRequest = {
	name: "bulkRevertProductChangesRequest",
	buildUrl: scopeId => buildUrl(["products", scopeId, "bulkRevert"]),
	verb: "POST",
};

export const bulkUpdatePublicationStatusRequest = {
	name: "bulkUpdatePublicationStatusRequest",
	buildUrl: scopeId => buildUrl(["products", scopeId, "bulkUpdatePublicationStatus"]),
	verb: "POST",
};

export const bulkUpdateProfilesRequest = {
	name: "bulkUpdateProfilesRequest",
	buildUrl: scopeId => buildUrl(["customProfiles", scopeId, "update"]),
	verb: "PUT",
};

export const calculateFulfillmentLocationsDelayRequest = {
	name: "calculateFulfillmentLocationsDelayRequest",
	buildUrl: scopeId => buildUrl(["fulfillmentLocations", scopeId, "calculateDelay"]),
	verb: "POST",
};

export const calculatePricesofProductsRequest = {
	name: "calculatePricesofProductsRequest",
	buildUrl: scopeId => buildUrl(["products", scopeId, "prices"]),
	verb: "POST",
};

export const calculateProductPriceRequest = {
	name: "calculateProductPriceRequest",
	buildUrl: (scopeId, productId) => buildUrl(["products", scopeId, productId, "price"]),
	verb: "POST",
};

export const calculateScheduleAvailabilitySlotsRequest = {
	name: "calculateScheduleAvailabilitySlotsRequest",
	buildUrl: (fulfillmentLocationId, fulfillmentType) =>
		buildUrl(["fulfillmentLocations", fulfillmentLocationId, fulfillmentType]),
	verb: "POST",
};

export const cancelAllInventoryReservedItemsRequest = {
	name: "cancelAllInventoryReservedItemsRequest",
	buildUrl: ownerId => buildUrl(["inventoryItems", "reservations", ownerId, "cancelAll"]),
	verb: "POST",
};

export const cancelCampaignRequest = {
	name: "cancelCampaignRequest",
	buildUrl: (scopeId, id) => buildUrl(["campaigns", scopeId, id, "cancel"]),
	verb: "POST",
};

export const cancelInventoryReservedItemsRequest = {
	name: "cancelInventoryReservedItemsRequest",
	buildUrl: ownerId => buildUrl(["inventoryItems", "reservations", ownerId, "cancelList"]),
	verb: "POST",
};

export const cancelPickingMissionAssemblyRequest = {
	name: "cancelPickingMissionAssemblyRequest",
	buildUrl: (scopeId, id) => buildUrl(["pickingMissions", scopeId, id, "cancelAssembly"]),
	verb: "POST",
};

export const cancelPickingMissionRequest = {
	name: "cancelPickingMissionRequest",
	buildUrl: (scopeId, id) => buildUrl(["pickingMissions", scopeId, id, "cancel"]),
	verb: "POST",
};

export const cancelTaskRequest = {
	name: "cancelTaskRequest",
	buildUrl: taskId => buildUrl(["tasks", taskId, "cancel"]),
	verb: "POST",
};

export const changeFulfillmentCompetitionLocationStatusRequest = {
	name: "changeFulfillmentCompetitionLocationStatusRequest",
	buildUrl: (scopeId, fulfillmentCompetitionId, fulfillmentLocationId) =>
		buildUrl([
			"fulfillments",
			"competitions",
			scopeId,
			fulfillmentCompetitionId,
			"locations",
			fulfillmentLocationId,
			"status",
		]),
	verb: "PUT",
};

export const changeFulfillmentCompetitionStatusRequest = {
	name: "changeFulfillmentCompetitionStatusRequest",
	buildUrl: (scopeId, fulfillmentCompetitionId) =>
		buildUrl(["fulfillments", "competitions", scopeId, fulfillmentCompetitionId, "status"]),
	verb: "PUT",
};

export const changeInventoryReservedItemsStockStatusRequest = {
	name: "changeInventoryReservedItemsStockStatusRequest",
	buildUrl: ownerId => buildUrl(["inventoryItems", "reservations", ownerId, "changeStockStatus"]),
	verb: "POST",
};

export const changeOrderStatusRequest = {
	name: "changeOrderStatusRequest",
	buildUrl: (scopeId, orderId) => buildUrl(["orders", scopeId, orderId, "fulfillmentState"]),
	verb: "POST",
};

export const changeOwnershipCartOrderDraftRequest = {
	name: "changeOwnershipCartOrderDraftRequest",
	buildUrl: (scopeId, customerId, orderId) =>
		buildUrl(["orders", scopeId, customerId, orderId, "orderDraft", "changeOwnership"]),
	verb: "POST",
};

export const changePasswordRequest = {
	name: "changePasswordRequest",
	buildUrl: (scopeId, userName) => buildUrl(["membership", scopeId, "ChangePassword", userName]),
	verb: "POST",
};

export const changeShipmentStatusRequest = {
	name: "changeShipmentStatusRequest",
	buildUrl: (scopeId, orderId, shipmentId) =>
		buildUrl(["orders", scopeId, orderId, "shipments", shipmentId, "fulfillmentState"]),
	verb: "POST",
};

export const changeUserNameRequest = {
	name: "changeUserNameRequest",
	buildUrl: (scopeId, oldUsername) => buildUrl(["membership", scopeId, "ChangeUserName", oldUsername]),
	verb: "POST",
};

export const checkAvailabilitySlotRequest = {
	name: "checkAvailabilitySlotRequest",
	buildUrl: (fulfillmentLocationId, fulfillmentType) =>
		buildUrl(["fulfillmentLocations", "forSlot", fulfillmentLocationId, fulfillmentType]),
	verb: "POST",
};

export const clearCartRequest = {
	name: "clearCartRequest",
	buildUrl: (scopeId, customerId, cartName, queryParams) =>
		buildUrl(["carts", scopeId, customerId, cartName, "clear"], queryParams),
	verb: "DELETE",
};

export const clearRelationshipsRequest = {
	name: "clearRelationshipsRequest",
	buildUrl: (scopeId, entityType, entityId, queryParams) =>
		buildUrl(["relationships", scopeId, entityType, entityId], queryParams),
	verb: "DELETE",
};

export const clearRelationshipsV2Request = {
	name: "clearRelationshipsV2Request",
	buildUrl: (scopeId, entityType, entityId, queryParams) =>
		buildUrl(["relationships", "v2", scopeId, entityType, entityId], queryParams),
	verb: "DELETE",
};

export const completeCheckoutRequest = {
	name: "completeCheckoutRequest",
	buildUrl: (scopeId, customerId, cartName) => buildUrl(["carts", scopeId, customerId, cartName, "completeCheckout"]),
	verb: "POST",
};

export const completePickingMissionAssemblyRequest = {
	name: "completePickingMissionAssemblyRequest",
	buildUrl: (scopeId, id) => buildUrl(["pickingMissions", scopeId, id, "completeAssembly"]),
	verb: "POST",
};

export const confirmFulfillmentCarrierQuotesRequest = {
	name: "confirmFulfillmentCarrierQuotesRequest",
	buildUrl: (scopeId, fulfillmentCarrierId) =>
		buildUrl(["fulfillments", "carriers", scopeId, fulfillmentCarrierId, "quotes", "confirm"]),
	verb: "POST",
};

export const confirmInventoryReservedOrderItemsRequest = {
	name: "confirmInventoryReservedOrderItemsRequest",
	buildUrl: ownerId => buildUrl(["inventoryItems", "reservations", ownerId, "confirm"]),
	verb: "POST",
};

export const consumeCouponByCodeRequest = {
	name: "consumeCouponByCodeRequest",
	buildUrl: () => buildUrl(["coupons", "consume", "code"]),
	verb: "POST",
};

export const consumeCouponRequest = {
	name: "consumeCouponRequest",
	buildUrl: () => buildUrl(["coupons", "consume"]),
	verb: "POST",
};

export const copyCampaignRequest = {
	name: "copyCampaignRequest",
	buildUrl: (scopeId, fromCampaignId) => buildUrl(["campaigns", scopeId, fromCampaignId, "copy"]),
	verb: "POST",
};

export const copyCartFromOrderRequest = {
	name: "copyCartFromOrderRequest",
	buildUrl: (scopeId, orderId) => buildUrl(["orders", scopeId, orderId, "copycart"]),
	verb: "POST",
};

export const copyCartToCustomerRequest = {
	name: "copyCartToCustomerRequest",
	buildUrl: (scopeId, customerId, cartName, newCustomerId) =>
		buildUrl(["carts", scopeId, customerId, cartName, "copyTo", newCustomerId]),
	verb: "PUT",
};

export const copyOrderRequest = {
	name: "copyOrderRequest",
	buildUrl: (scopeId, orderId) => buildUrl(["orders", scopeId, orderId, "copy"]),
	verb: "POST",
};

export const copyProductRequest = {
	name: "copyProductRequest",
	buildUrl: (scopeId, productId, newProductId) => buildUrl(["products", scopeId, productId, "copy", newProductId]),
	verb: "PUT",
};

export const createCampaignRequest = {
	name: "createCampaignRequest",
	buildUrl: scopeId => buildUrl(["campaigns", scopeId]),
	verb: "POST",
};

export const createCarrierProviderRequest = {
	name: "createCarrierProviderRequest",
	buildUrl: scopeId => buildUrl(["providers", scopeId, "carrier"]),
	verb: "POST",
};

export const createCartOrderDraftRequest = {
	name: "createCartOrderDraftRequest",
	buildUrl: (scopeId, customerId, orderId) => buildUrl(["orders", scopeId, customerId, orderId, "orderDraft"]),
	verb: "POST",
};

export const createCartPaymentVaultProfileRequest = {
	name: "createCartPaymentVaultProfileRequest",
	buildUrl: (scopeId, customerId, cartName, paymentId) =>
		buildUrl(["monerisCanadaVaultProfile", "carts", scopeId, customerId, cartName, "payments", paymentId]),
	verb: "POST",
};

export const createCategoryDefinitionRequest = {
	name: "createCategoryDefinitionRequest",
	buildUrl: name => buildUrl(["metadata", "definitions", "category", name]),
	verb: "POST",
};

export const createCategoryRequest = {
	name: "createCategoryRequest",
	buildUrl: scopeId => buildUrl(["categories", scopeId]),
	verb: "POST",
};

export const createCustomProfileRequest = {
	name: "createCustomProfileRequest",
	buildUrl: (scopeId, entityTypeName) => buildUrl(["customProfiles", scopeId, entityTypeName]),
	verb: "POST",
};

export const createCustomRoleRequest = {
	name: "createCustomRoleRequest",
	buildUrl: name => buildUrl(["roles", "custom", name]),
	verb: "POST",
};

export const createCustomerMembershipRequest = {
	name: "createCustomerMembershipRequest",
	buildUrl: scopeId => buildUrl(["membership", scopeId]),
	verb: "POST",
};

export const createCustomerRequest = {
	name: "createCustomerRequest",
	buildUrl: scopeId => buildUrl(["customers", scopeId]),
	verb: "POST",
};

export const createEntityTypeRequest = {
	name: "createEntityTypeRequest",
	buildUrl: entityTypeName => buildUrl(["metadata", "EntityType", entityTypeName]),
	verb: "POST",
};

export const createFulfillmentCarrierManifestRequest = {
	name: "createFulfillmentCarrierManifestRequest",
	buildUrl: (scopeId, fulfillmentCarrierId) =>
		buildUrl(["fulfillments", "carriers", scopeId, fulfillmentCarrierId, "manifests"]),
	verb: "POST",
};

export const createFulfillmentCompetitionRequest = {
	name: "createFulfillmentCompetitionRequest",
	buildUrl: scopeId => buildUrl(["fulfillments", "competitions", scopeId]),
	verb: "POST",
};

export const createFulfillmentPackageRequest = {
	name: "createFulfillmentPackageRequest",
	buildUrl: scopeId => buildUrl(["fulfillments", "packages", scopeId]),
	verb: "POST",
};

export const createFulfillmentPackageTypeRequest = {
	name: "createFulfillmentPackageTypeRequest",
	buildUrl: scopeId => buildUrl(["fulfillments", "packageTypes", scopeId]),
	verb: "POST",
};

export const createFulfillmentProviderRequest = {
	name: "createFulfillmentProviderRequest",
	buildUrl: scopeId => buildUrl(["providers", scopeId, "fulfillment"]),
	verb: "POST",
};

export const createFulfillmentSLARequest = {
	name: "createFulfillmentSLARequest",
	buildUrl: scopeId => buildUrl(["fulfillments", "SLAs", scopeId]),
	verb: "POST",
};

export const createGroupRequest = {
	name: "createGroupRequest",
	buildUrl: displayName => buildUrl(["groups", displayName]),
	verb: "POST",
};

export const createInventoryLocationRequest = {
	name: "createInventoryLocationRequest",
	buildUrl: scopeId => buildUrl(["inventoryLocations", scopeId]),
	verb: "POST",
};

export const createMediaRequest = {
	name: "createMediaRequest",
	buildUrl: (scopeId, productId) => buildUrl(["products", "media", scopeId, productId]),
	verb: "PUT",
};

export const createOrUpdateFulfillmentExceptionRequest = {
	name: "createOrUpdateFulfillmentExceptionRequest",
	buildUrl: (scopeId, fulfillmentLocationId, orderId, shipmentId, lineItemId) =>
		buildUrl(["fulfillments", "exceptions", scopeId, fulfillmentLocationId, orderId, shipmentId, lineItemId]),
	verb: "PUT",
};

export const createOrUpdatePaymentProviderStoreSettingsRequest = {
	name: "createOrUpdatePaymentProviderStoreSettingsRequest",
	buildUrl: (scopeId, providerId, storeId) =>
		buildUrl(["providers", scopeId, "payment", providerId, "storesSettings", storeId]),
	verb: "PUT",
};

export const createOrUpdateFulfillmentProviderRequest = {
	name: "createOrUpdateFulfillmentProviderRequest",
	buildUrl: scopeId => buildUrl(["providers", scopeId, "fulfillment"]),
	verb: "PUT",
};

export const createOrUpdateInventoryItemRequest = {
	name: "createOrUpdateInventoryItemRequest",
	buildUrl: (scopeId, inventoryLocationId, sku) => buildUrl(["inventoryItems", scopeId, inventoryLocationId, sku]),
	verb: "PUT",
};

export const createOrUpdateSegmentRequest = {
	name: "createOrUpdateSegmentRequest",
	buildUrl: () => buildUrl(["segments"]),
	verb: "POST",
};

export const createOrUpdateStoreByNumberRequest = {
	name: "createOrUpdateStoreByNumberRequest",
	buildUrl: (scopeId, number) => buildUrl(["stores", scopeId, number]),
	verb: "POST",
};

export const createOrUpdateTemplateVariableRequest = {
	name: "createOrUpdateTemplateVariableRequest",
	buildUrl: (scopeId, name) => buildUrl(["templates", scopeId, "Variables", name]),
	verb: "PUT",
};

export const createOrUpdateWarehouseByNumberRequest = {
	name: "createOrUpdateWarehouseByNumberRequest",
	buildUrl: scopeId => buildUrl(["warehouses", scopeId, "createOrUpdate"]),
	verb: "PUT",
};

export const createOrderDraftPaymentVaultProfileRequest = {
	name: "createOrderDraftPaymentVaultProfileRequest",
	buildUrl: (scopeId, draftId, paymentId) =>
		buildUrl(["monerisCanadaVaultProfile", "orderdraft", scopeId, draftId, "payments", paymentId]),
	verb: "POST",
};

export const createOrderLookupTypeDefinitionRequest = {
	name: "createOrderLookupTypeDefinitionRequest",
	buildUrl: lookupName => buildUrl(["metadata", "lookups", "order", lookupName]),
	verb: "POST",
};

export const createOrderRequest = {
	name: "createOrderRequest",
	buildUrl: () => buildUrl(["orders"]),
	verb: "POST",
};

export const createOrganizationRequest = {
	name: "createOrganizationRequest",
	buildUrl: scopeId => buildUrl(["organizations", scopeId]),
	verb: "POST",
};

export const createPaymentProviderRequest = {
	name: "createPaymentProviderRequest",
	buildUrl: scopeId => buildUrl(["providers", scopeId, "payment"]),
	verb: "POST",
};

export const createPickingMissionRequest = {
	name: "createPickingMissionRequest",
	buildUrl: scopeId => buildUrl(["pickingMissions", scopeId]),
	verb: "POST",
};

export const createPriceListRequest = {
	name: "createPriceListRequest",
	buildUrl: (scopeId, priceListId) => buildUrl(["products", scopeId, "priceLists", priceListId]),
	verb: "POST",
};

export const createProductAttributeGroupRequest = {
	name: "createProductAttributeGroupRequest",
	buildUrl: name => buildUrl(["metadata", "attributegroups", "product", name]),
	verb: "POST",
};

export const createProductAttributeRequest = {
	name: "createProductAttributeRequest",
	buildUrl: attributeName => buildUrl(["metadata", "attributes", "product", attributeName]),
	verb: "POST",
};

export const createProductDefinitionRequest = {
	name: "createProductDefinitionRequest",
	buildUrl: name => buildUrl(["metadata", "definitions", "product", name]),
	verb: "POST",
};

export const createProductLookupTypeDefinitionRequest = {
	name: "createProductLookupTypeDefinitionRequest",
	buildUrl: lookupName => buildUrl(["metadata", "lookups", "product", lookupName]),
	verb: "POST",
};

export const createProductRequest = {
	name: "createProductRequest",
	buildUrl: scopeId => buildUrl(["products", scopeId]),
	verb: "POST",
};

export const createProfileAttributeGroupRequest = {
	name: "createProfileAttributeGroupRequest",
	buildUrl: name => buildUrl(["metadata", "attributegroups", "profile", name]),
	verb: "POST",
};

export const createPromotionRequest = {
	name: "createPromotionRequest",
	buildUrl: (scopeId, campaignId) => buildUrl(["campaigns", scopeId, campaignId, "promotions"]),
	verb: "POST",
};

export const createRecurringOrderProgramRequest = {
	name: "createRecurringOrderProgramRequest",
	buildUrl: () => buildUrl(["recurringOrders", "programs"]),
	verb: "POST",
};

export const createRelationshipsRequest = {
	name: "createRelationshipsRequest",
	buildUrl: scopeId => buildUrl(["relationships", scopeId]),
	verb: "POST",
};

export const createRelationshipsV2Request = {
	name: "createRelationshipsV2Request",
	buildUrl: scopeId => buildUrl(["relationships", "v2", scopeId]),
	verb: "POST",
};

export const createRmaGuestRequest = {
	name: "createRmaGuestRequest",
	buildUrl: (scopeId, orderNumber) => buildUrl(["orders", "RMA", scopeId, orderNumber, "Guest"]),
	verb: "POST",
};

export const createRmaRegisteredRequest = {
	name: "createRmaRegisteredRequest",
	buildUrl: (scopeId, orderNumber, customerId) =>
		buildUrl(["orders", "RMA", scopeId, orderNumber, customerId, "Registered"]),
	verb: "POST",
};

export const createRoleRequest = {
	name: "createRoleRequest",
	buildUrl: name => buildUrl(["roles", name]),
	verb: "POST",
};

export const createRoutingProviderRequest = {
	name: "createRoutingProviderRequest",
	buildUrl: scopeId => buildUrl(["providers", scopeId, "routing"]),
	verb: "POST",
};

export const createScopeRequest = {
	name: "createScopeRequest",
	buildUrl: scopeId => buildUrl(["scopes", scopeId]),
	verb: "POST",
};

export const createSearchQueryRequest = {
	name: "createSearchQueryRequest",
	buildUrl: (scopeId, queryType, name) => buildUrl(["searchqueries", scopeId, queryType, name]),
	verb: "POST",
};

export const createSegmentRequest = {
	name: "createSegmentRequest",
	buildUrl: () => buildUrl(["segment"]),
	verb: "POST",
};

export const createSelfReferencingRelationshipsRequest = {
	name: "createSelfReferencingRelationshipsRequest",
	buildUrl: scopeId => buildUrl(["relationships", scopeId, "self"]),
	verb: "POST",
};

export const createSelfReferencingRelationshipsV2Request = {
	name: "createSelfReferencingRelationshipsV2Request",
	buildUrl: scopeId => buildUrl(["relationships", "v2", scopeId, "self"]),
	verb: "POST",
};

export const createShipmentDocumentRequest = {
	name: "createShipmentDocumentRequest",
	buildUrl: (scopeId, orderId, shipmentId, name) =>
		buildUrl(["orders", scopeId, orderId, "shipments", shipmentId, "documents", name]),
	verb: "POST",
};

export const createSsrsReportPreviewRequest = {
	name: "createSsrsReportPreviewRequest",
	buildUrl: reportId => buildUrl(["reporting", "ssrs", "reports", reportId, "previews"]),
	verb: "POST",
};

export const createStoreRequest = {
	name: "createStoreRequest",
	buildUrl: scopeId => buildUrl(["stores", scopeId]),
	verb: "POST",
};

export const createTaxProviderRequest = {
	name: "createTaxProviderRequest",
	buildUrl: scopeId => buildUrl(["providers", scopeId, "tax"]),
	verb: "POST",
};

export const createTemplateRequest = {
	name: "createTemplateRequest",
	buildUrl: (scopeId, type, name) => buildUrl(["templates", scopeId, type, name]),
	verb: "POST",
};

export const createUserRequest = {
	name: "createUserRequest",
	buildUrl: userName => buildUrl(["users", userName]),
	verb: "POST",
};

export const createWarehouseRequest = {
	name: "createWarehouseRequest",
	buildUrl: scopeId => buildUrl(["warehouses", scopeId]),
	verb: "POST",
};

export const customerSignInRequest = {
	name: "customerSignInRequest",
	buildUrl: () => buildUrl(["authentication", "customer", "signin"]),
	verb: "POST",
};

export const deactivateUserRequest = {
	name: "deactivateUserRequest",
	buildUrl: userName => buildUrl(["users", userName, "deactivate"]),
	verb: "POST",
};

export const deactivateUsersRequest = {
	name: "deactivateUsersRequest",
	buildUrl: () => buildUrl(["users", "desactivate"]),
	verb: "PUT",
};

export const decreaseInventoryQuantityRequest = {
	name: "decreaseInventoryQuantityRequest",
	buildUrl: (scopeId, sku, inventoryLocationId, quantity) =>
		buildUrl(["inventoryItems", scopeId, "bySku", sku, "byLocation", inventoryLocationId, "decrease", quantity]),
	verb: "POST",
};

export const deleteAllScheduledTasksRequest = {
	name: "deleteAllScheduledTasksRequest",
	buildUrl: () => buildUrl(["tasks", "scheduled", "all"]),
	verb: "DELETE",
};

export const deleteCarrierProviderRequest = {
	name: "deleteCarrierProviderRequest",
	buildUrl: (scopeId, id) => buildUrl(["providers", scopeId, "carrier", id]),
	verb: "DELETE",
};

export const deleteCartOrderDraftRequest = {
	name: "deleteCartOrderDraftRequest",
	buildUrl: (scopeId, customerId, orderId) => buildUrl(["orders", scopeId, customerId, orderId, "orderDraft"]),
	verb: "DELETE",
};

export const deleteCartRequest = {
	name: "deleteCartRequest",
	buildUrl: (scopeId, customerId, cartName, queryParams) =>
		buildUrl(["carts", scopeId, customerId, cartName], queryParams),
	verb: "DELETE",
};

export const deleteCategoryRequest = {
	name: "deleteCategoryRequest",
	buildUrl: (scopeId, categoryId, queryParams) => buildUrl(["categories", scopeId, categoryId], queryParams),
	verb: "DELETE",
};

export const deleteCategoryV2Request = {
	name: "deleteCategoryV2Request",
	buildUrl: (scopeId, categoryId, queryParams) => buildUrl(["categories", "v2", scopeId, categoryId], queryParams),
	verb: "DELETE",
};

export const deleteCouponByCodeRequest = {
	name: "deleteCouponByCodeRequest",
	buildUrl: queryParams => buildUrl(["coupons", "delete", "code"], queryParams),
	verb: "DELETE",
};

export const deleteCustomProfileRequest = {
	name: "deleteCustomProfileRequest",
	buildUrl: (scopeId, entityTypeName, entityId) => buildUrl(["customProfiles", scopeId, entityTypeName, entityId]),
	verb: "DELETE",
};

export const deleteCustomerPaymentMethodRequest = {
	name: "deleteCustomerPaymentMethodRequest",
	buildUrl: (scopeId, customerId, paymentProviderName, paymentMethodId) =>
		buildUrl(["customers", scopeId, customerId, paymentProviderName, "paymentMethods", paymentMethodId]),
	verb: "DELETE",
};

export const deleteFulfillmentCompetitionRequest = {
	name: "deleteFulfillmentCompetitionRequest",
	buildUrl: (scopeId, fulfillmentCompetitionId) =>
		buildUrl(["fulfillments", "competitions", scopeId, fulfillmentCompetitionId]),
	verb: "DELETE",
};

export const deleteFulfillmentExceptionRequest = {
	name: "deleteFulfillmentExceptionRequest",
	buildUrl: (scopeId, fulfillmentLocationId, orderId, shipmentId, lineItemId) =>
		buildUrl(["fulfillments", "exceptions", scopeId, fulfillmentLocationId, orderId, shipmentId, lineItemId]),
	verb: "DELETE",
};

export const deleteFulfillmentLocationTimeSlotRequest = {
	name: "deleteFulfillmentLocationTimeSlotRequest",
	buildUrl: (scopeId, fulfillmentLocationId, fulfillmentMethodType, slotId) =>
		buildUrl(["fulfillmentLocations", scopeId, fulfillmentLocationId, fulfillmentMethodType, "slots", slotId]),
	verb: "DELETE",
};

export const deleteFulfillmentLocationTimeSlotReservationRequest = {
	name: "deleteFulfillmentLocationTimeSlotReservationRequest",
	buildUrl: (scopeId, fulfillmentLocationId, slotReservationId, queryParams) =>
		buildUrl(
			["fulfillmentLocations", scopeId, fulfillmentLocationId, "reservations", "byId", slotReservationId],
			queryParams,
		),
	verb: "DELETE",
};

export const deleteFulfillmentLocationTimeSlotsRequest = {
	name: "deleteFulfillmentLocationTimeSlotsRequest",
	buildUrl: (scopeId, fulfillmentLocationId, fulfillmentMethodType) =>
		buildUrl(["fulfillmentLocations", scopeId, fulfillmentLocationId, fulfillmentMethodType, "slots"]),
	verb: "DELETE",
};

export const deleteFulfillmentPackageForShipmentRequest = {
	name: "deleteFulfillmentPackageForShipmentRequest",
	buildUrl: (scopeId, shipmentId) => buildUrl(["fulfillments", "packages", scopeId, "byShipment", shipmentId]),
	verb: "DELETE",
};

export const deleteFulfillmentPackageRequest = {
	name: "deleteFulfillmentPackageRequest",
	buildUrl: (scopeId, id) => buildUrl(["fulfillments", "packages", scopeId, id]),
	verb: "DELETE",
};

export const deleteFulfillmentPackageTypeRequest = {
	name: "deleteFulfillmentPackageTypeRequest",
	buildUrl: (scopeId, id) => buildUrl(["fulfillments", "packageTypes", scopeId, id]),
	verb: "DELETE",
};

export const deleteFulfillmentProviderRequest = {
	name: "deleteFulfillmentProviderRequest",
	buildUrl: (scopeId, id) => buildUrl(["providers", scopeId, "fulfillment", id]),
	verb: "DELETE",
};

export const deleteGroupRequest = {
	name: "deleteGroupRequest",
	buildUrl: groupId => buildUrl(["groups", groupId]),
	verb: "DELETE",
};

export const deleteInventoryScheduleRequest = {
	name: "deleteInventoryScheduleRequest",
	buildUrl: (inventoryLocationId, scheduleId, queryParams) =>
		buildUrl(["inventoryLocations", inventoryLocationId, "schedules", scheduleId], queryParams),
	verb: "DELETE",
};

export const deletePaymentProviderRequest = {
	name: "deletePaymentProviderRequest",
	buildUrl: (scopeId, id) => buildUrl(["providers", scopeId, "payment", id]),
	verb: "DELETE",
};

export const deletePriceListEntryRequest = {
	name: "deletePriceListEntryRequest",
	buildUrl: (scopeId, productId, priceListId, queryParams) =>
		buildUrl(["products", scopeId, productId, "priceListEntries", priceListId], queryParams),
	verb: "DELETE",
};

export const deletePriceListRequest = {
	name: "deletePriceListRequest",
	buildUrl: (scopeId, priceListId, queryParams) =>
		buildUrl(["products", scopeId, "priceLists", priceListId], queryParams),
	verb: "DELETE",
};

export const deleteProductAttributeGroupRequest = {
	name: "deleteProductAttributeGroupRequest",
	buildUrl: name => buildUrl(["metadata", "attributegroups", "product", name]),
	verb: "DELETE",
};

export const deleteProductAttributeRequest = {
	name: "deleteProductAttributeRequest",
	buildUrl: attributeName => buildUrl(["metadata", "attributes", "product", attributeName]),
	verb: "DELETE",
};

export const deleteProductByIdRequest = {
	name: "deleteProductByIdRequest",
	buildUrl: (scopeId, productId) => buildUrl(["products", scopeId, "product", productId]),
	verb: "DELETE",
};

export const deleteProductByIdV2Request = {
	name: "deleteProductByIdV2Request",
	buildUrl: (scopeId, productId) => buildUrl(["products", "v2", scopeId, productId]),
	verb: "DELETE",
};

export const deleteProductDraftRequest = {
	name: "deleteProductDraftRequest",
	buildUrl: (scopeId, productId) => buildUrl(["products", scopeId, "draft", productId]),
	verb: "DELETE",
};

export const deleteProductLookupValuesRequest = {
	name: "deleteProductLookupValuesRequest",
	buildUrl: (lookupName, queryParams) =>
		buildUrl(["metadata", "lookups", "product", lookupName, "values"], queryParams),
	verb: "DELETE",
};

export const deleteProductSettingsEntryRequest = {
	name: "deleteProductSettingsEntryRequest",
	buildUrl: entry => buildUrl(["products", "settings", entry]),
	verb: "DELETE",
};

export const deleteProductsRequest = {
	name: "deleteProductsRequest",
	buildUrl: scopeId => buildUrl(["products", scopeId, "bulkDelete"]),
	verb: "POST",
};

export const deleteProfileAttributeGroupRequest = {
	name: "deleteProfileAttributeGroupRequest",
	buildUrl: name => buildUrl(["metadata", "attributegroups", "profile", name]),
	verb: "DELETE",
};

export const deletePromotionRequest = {
	name: "deletePromotionRequest",
	buildUrl: (scopeId, campaignId, promotionId) =>
		buildUrl(["campaigns", scopeId, campaignId, "promotions", promotionId]),
	verb: "DELETE",
};

export const deleteRecurringCartLineItemsRequest = {
	name: "deleteRecurringCartLineItemsRequest",
	buildUrl: (scopeId, customerId, queryParams) =>
		buildUrl(["recurringOrders", scopeId, "carts", customerId, "lineItems"], queryParams),
	verb: "DELETE",
};

export const deleteRecurringOrderLineItemsRequest = {
	name: "deleteRecurringOrderLineItemsRequest",
	buildUrl: (scopeId, customerId, queryParams) =>
		buildUrl(["recurringOrders", scopeId, customerId, "lineItems"], queryParams),
	verb: "DELETE",
};

export const deleteRecurringOrderProgramRequest = {
	name: "deleteRecurringOrderProgramRequest",
	buildUrl: recurringOrderProgramName => buildUrl(["recurringOrders", "programs", recurringOrderProgramName]),
	verb: "DELETE",
};

export const deleteRelationshipsRequest = {
	name: "deleteRelationshipsRequest",
	buildUrl: (scopeId, queryParams) => buildUrl(["relationships", scopeId], queryParams),
	verb: "DELETE",
};

export const deleteRelationshipsV2Request = {
	name: "deleteRelationshipsV2Request",
	buildUrl: (scopeId, queryParams) => buildUrl(["relationships", "v2", scopeId], queryParams),
	verb: "DELETE",
};

export const deleteRoleRequest = {
	name: "deleteRoleRequest",
	buildUrl: (id, queryParams) => buildUrl(["roles", id], queryParams),
	verb: "DELETE",
};

export const deleteRoutingProviderRequest = {
	name: "deleteRoutingProviderRequest",
	buildUrl: (scopeId, id) => buildUrl(["providers", scopeId, "routing", id]),
	verb: "DELETE",
};

export const deleteScheduledTaskRequest = {
	name: "deleteScheduledTaskRequest",
	buildUrl: (group, name) => buildUrl(["tasks", "scheduled", group, name]),
	verb: "DELETE",
};

export const deleteScopeRequest = {
	name: "deleteScopeRequest",
	buildUrl: scopeId => buildUrl(["scopes", scopeId]),
	verb: "DELETE",
};

export const deleteSearchQueryRequest = {
	name: "deleteSearchQueryRequest",
	buildUrl: (scopeId, queryType, name) => buildUrl(["searchqueries", scopeId, queryType, name]),
	verb: "DELETE",
};

export const deleteSegmentRequest = {
	name: "deleteSegmentRequest",
	buildUrl: segmentId => buildUrl(["segments", segmentId]),
	verb: "DELETE",
};

export const deleteShipmentDocumentRequest = {
	name: "deleteShipmentDocumentRequest",
	buildUrl: (scopeId, orderId, shipmentId, name) =>
		buildUrl(["orders", scopeId, orderId, "shipments", shipmentId, "documents", name]),
	verb: "DELETE",
};

export const deleteStoreRequest = {
	name: "deleteStoreRequest",
	buildUrl: (scopeId, id) => buildUrl(["stores", scopeId, id]),
	verb: "DELETE",
};

export const deleteTaskInfoRequest = {
	name: "deleteTaskInfoRequest",
	buildUrl: (taskId, queryParams) => buildUrl(["tasks", taskId], queryParams),
	verb: "DELETE",
};

export const deleteTaxProviderRequest = {
	name: "deleteTaxProviderRequest",
	buildUrl: (scopeId, id) => buildUrl(["providers", scopeId, "tax", id]),
	verb: "DELETE",
};

export const deleteTemplateRequest = {
	name: "deleteTemplateRequest",
	buildUrl: (scopeId, type, name) => buildUrl(["templates", scopeId, type, name]),
	verb: "DELETE",
};

export const deleteTemplateVariableRequest = {
	name: "deleteTemplateVariableRequest",
	buildUrl: (scopeId, name) => buildUrl(["templates", scopeId, "Variables", name]),
	verb: "DELETE",
};

export const deleteUnusedMediaStorageRequest = {
	name: "deleteUnusedMediaStorageRequest",
	buildUrl: queryParams => buildUrl(["products", "media", "storage"], queryParams),
	verb: "DELETE",
};

export const deleteUserRequest = {
	name: "deleteUserRequest",
	buildUrl: userName => buildUrl(["users", userName]),
	verb: "DELETE",
};

export const deleteWarehouseRequest = {
	name: "deleteWarehouseRequest",
	buildUrl: (scopeId, id) => buildUrl(["warehouses", scopeId, id]),
	verb: "DELETE",
};

export const disableFulfillmentSLARequest = {
	name: "disableFulfillmentSLARequest",
	buildUrl: () => buildUrl(["fulfillments", "SLAs", "disable"]),
	verb: "POST",
};

export const disassociateCustomerEntityRequest = {
	name: "disassociateCustomerEntityRequest",
	buildUrl: (customerId, scopeId, attributeName, entityId) =>
		buildUrl(["customers", customerId, "customProfiles", scopeId, attributeName, entityId]),
	verb: "DELETE",
};

export const disassociateEntityRequest = {
	name: "disassociateEntityRequest",
	buildUrl: (scopeId, parentEntityTypeName, parentId, attributeName, entityId) =>
		buildUrl(["customProfiles", scopeId, parentEntityTypeName, parentId, attributeName, entityId]),
	verb: "DELETE",
};

export const evaluateInventoryAvailabilityRequest = {
	name: "evaluateInventoryAvailabilityRequest",
	buildUrl: ownerId => buildUrl(["inventoryItems", "reservations", ownerId, "evaluate"]),
	verb: "POST",
};

export const exportCouponCodesRequest = {
	name: "exportCouponCodesRequest",
	buildUrl: promotionId => buildUrl(["promotions", promotionId, "coupons", "export"]),
	verb: "POST",
};

export const exportOrderSchemaRequest = {
	name: "exportOrderSchemaRequest",
	buildUrl: () => buildUrl(["integration", "orders", "schema", "export"]),
	verb: "POST",
};

export const exportProductPriceRequest = {
	name: "exportProductPriceRequest",
	buildUrl: scopeId => buildUrl(["dataexchange", "productprices", scopeId, "export"]),
	verb: "POST",
};

export const exportProductPricesRequest = {
	name: "exportProductPricesRequest",
	buildUrl: scopeId => buildUrl(["integration", "products", scopeId, "prices", "export"]),
	verb: "POST",
};

export const exportProductsRequest = {
	name: "exportProductsRequest",
	buildUrl: scopeId => buildUrl(["integration", "products", scopeId, "export"]),
	verb: "POST",
};

export const exportProfileSchemaRequest = {
	name: "exportProfileSchemaRequest",
	buildUrl: () => buildUrl(["integration", "profiles", "schema", "export"]),
	verb: "POST",
};

export const exportProfilesRequest = {
	name: "exportProfilesRequest",
	buildUrl: () => buildUrl(["integration", "profiles", "export"]),
	verb: "POST",
};

export const exportPromoCodesRequest = {
	name: "exportPromoCodesRequest",
	buildUrl: promotionId => buildUrl(["dataexchange", "promotions", promotionId, "promoCodes", "export"]),
	verb: "POST",
};

export const exportSsrsReportRequest = {
	name: "exportSsrsReportRequest",
	buildUrl: reportId => buildUrl(["reporting", "ssrs", "reports", reportId, "export"]),
	verb: "POST",
};

export const federationSignoutReplyRequest = {
	name: "federationSignoutReplyRequest",
	buildUrl: queryParams => buildUrl(["authentication", "fedsignoutreply"], queryParams),
	verb: "GET",
};

export const findCalculatedFulfillmentMethodsRequest = {
	name: "findCalculatedFulfillmentMethodsRequest",
	buildUrl: (scopeId, customerId, cartName) => buildUrl(["fulfillmentMethods", scopeId, customerId, cartName]),
	verb: "POST",
};

export const findCampaignsRequest = {
	name: "findCampaignsRequest",
	buildUrl: scopeId => buildUrl(["campaigns", scopeId, "find"]),
	verb: "POST",
};

export const findCartPaymentMethodsRequest = {
	name: "findCartPaymentMethodsRequest",
	buildUrl: (scopeId, customerId, cartName, paymentProviderName) =>
		buildUrl(["carts", scopeId, customerId, cartName, paymentProviderName, "paymentMethods"]),
	verb: "POST",
};

export const findCategoryTreeNodesRequest = {
	name: "findCategoryTreeNodesRequest",
	buildUrl: (scopeId, searchTerms, queryParams) =>
		buildUrl(["categories", scopeId, "treeNodes", searchTerms], queryParams),
	verb: "GET",
};

export const findCustomersRequest = {
	name: "findCustomersRequest",
	buildUrl: scopeId => buildUrl(["customers", scopeId, "find"]),
	verb: "POST",
};

export const findFulfillmentCompetitionsCountRequest = {
	name: "findFulfillmentCompetitionsCountRequest",
	buildUrl: scopeId => buildUrl(["fulfillments", "competitions", scopeId, "count"]),
	verb: "POST",
};

export const findFulfillmentCompetitionsRequest = {
	name: "findFulfillmentCompetitionsRequest",
	buildUrl: scopeId => buildUrl(["fulfillments", "competitions", scopeId, "find"]),
	verb: "POST",
};

export const findFulfillmentEventsRequest = {
	name: "findFulfillmentEventsRequest",
	buildUrl: () => buildUrl(["fulfillments", "events", "find"]),
	verb: "POST",
};

export const findFulfillmentLocationsRequest = {
	name: "findFulfillmentLocationsRequest",
	buildUrl: scopeId => buildUrl(["fulfillmentLocations", scopeId, "find"]),
	verb: "POST",
};

export const findFulfillmentManifestPackagesRequest = {
	name: "findFulfillmentManifestPackagesRequest",
	buildUrl: (scopeId, queryParams) => buildUrl(["fulfillments", "packages", scopeId, "findmanifest"], queryParams),
	verb: "GET",
};

export const findFulfillmentOrdersRequest = {
	name: "findFulfillmentOrdersRequest",
	buildUrl: scopeId => buildUrl(["fulfillments", "orders", scopeId, "find"]),
	verb: "POST",
};

export const findFulfillmentPackageTypesRequest = {
	name: "findFulfillmentPackageTypesRequest",
	buildUrl: scopeId => buildUrl(["fulfillments", "packageTypes", scopeId, "find"]),
	verb: "POST",
};

export const findFulfillmentPackagesRequest = {
	name: "findFulfillmentPackagesRequest",
	buildUrl: (scopeId, queryParams) => buildUrl(["fulfillments", "packages", scopeId, "find"], queryParams),
	verb: "GET",
};

export const findFulfillmentSLARequest = {
	name: "findFulfillmentSLARequest",
	buildUrl: scopeId => buildUrl(["fulfillments", "SLAs", scopeId, "find"]),
	verb: "POST",
};

export const findGroupsRequest = {
	name: "findGroupsRequest",
	buildUrl: () => buildUrl(["groups", "find"]),
	verb: "POST",
};

export const findInventoryItemStatusByLocationAndSkusRequest = {
	name: "findInventoryItemStatusByLocationAndSkusRequest",
	buildUrl: (scopeId, inventoryLocationId) =>
		buildUrl(["inventoryItems", scopeId, "byLocation", inventoryLocationId, "bySkus", "status"]),
	verb: "POST",
};

export const findInventoryItemStatusBySkuAndLocationRequest = {
	name: "findInventoryItemStatusBySkuAndLocationRequest",
	buildUrl: (scopeId, sku, inventoryLocationId) =>
		buildUrl(["inventoryItems", scopeId, "bySku", sku, "byLocation", inventoryLocationId, "status"]),
	verb: "POST",
};

export const findInventoryItemsRequest = {
	name: "findInventoryItemsRequest",
	buildUrl: scopeId => buildUrl(["inventoryItems", scopeId, "find"]),
	verb: "POST",
};

export const findInventoryItemsStatusByScopeAndSkuRequest = {
	name: "findInventoryItemsStatusByScopeAndSkuRequest",
	buildUrl: (scopeId, sku) => buildUrl(["inventoryItems", scopeId, "bySku", sku, "status"]),
	verb: "POST",
};

export const findInventoryItemsStatusByScopeAndSkusRequest = {
	name: "findInventoryItemsStatusByScopeAndSkusRequest",
	buildUrl: scopeId => buildUrl(["inventoryItems", scopeId, "bySkus", "status"]),
	verb: "POST",
};

export const findNearestStoresRequest = {
	name: "findNearestStoresRequest",
	buildUrl: (scopeId, searchTerms, queryParams) => buildUrl(["stores", scopeId, "near", searchTerms], queryParams),
	verb: "GET",
};

export const findOrdersCountRequest = {
	name: "findOrdersCountRequest",
	buildUrl: scopeId => buildUrl(["orders", scopeId, "count"]),
	verb: "POST",
};

export const findOrdersRequest = {
	name: "findOrdersRequest",
	buildUrl: scopeId => buildUrl(["orders", scopeId, "find"]),
	verb: "POST",
};

export const findOrganizationsRequest = {
	name: "findOrganizationsRequest",
	buildUrl: scopeId => buildUrl(["organizations", scopeId, "find"]),
	verb: "POST",
};

export const findProductsRequest = {
	name: "findProductsRequest",
	buildUrl: (scopeId, cultureName) => buildUrl(["search", scopeId, cultureName, "availableProducts"]),
	verb: "POST",
};

export const findPaymentProviderStoresSettingsRequest = {
	name: "findPaymentProviderStoresSettingsRequest",
	buildUrl: (scopeId, id) => buildUrl(["providers", scopeId, "payment", id, "storesSettings", "find"]),
	verb: "POST",
};

export const findPriceListsRequest = {
	name: "findPriceListsRequest",
	buildUrl: (scopeId, queryParams) => buildUrl(["products", scopeId, "priceLists", "find"], queryParams),
	verb: "GET",
};

export const findProductAttributeGroupsRequest = {
	name: "findProductAttributeGroupsRequest",
	buildUrl: () => buildUrl(["metadata", "attributegroups", "product", "find"]),
	verb: "POST",
};

export const findProductPricesRequest = {
	name: "findProductPricesRequest",
	buildUrl: scopeId => buildUrl(["products", scopeId, "productPrices"]),
	verb: "POST",
};

export const findProfileInstancesRequest = {
	name: "findProfileInstancesRequest",
	buildUrl: (scopeId, entityTypeName) => buildUrl(["customProfiles", scopeId, entityTypeName, "find"]),
	verb: "POST",
};

export const findPromoCodesRequest = {
	name: "findPromoCodesRequest",
	buildUrl: (scopeId, promotionId) => buildUrl(["promotions", scopeId, promotionId, "promoCodes"]),
	verb: "POST",
};

export const findSearchQueriesRequest = {
	name: "findSearchQueriesRequest",
	buildUrl: scopeId => buildUrl(["searchqueries", scopeId, "find"]),
	verb: "POST",
};

export const findSegmentsRequest = {
	name: "findSegmentsRequest",
	buildUrl: () => buildUrl(["segments", "find"]),
	verb: "POST",
};

export const findShipmentDocumentsRequest = {
	name: "findShipmentDocumentsRequest",
	buildUrl: scopeId => buildUrl(["orders", scopeId, "shipments", "documents", "find"]),
	verb: "POST",
};

export const findShipmentDocumentsSummariesRequest = {
	name: "findShipmentDocumentsSummariesRequest",
	buildUrl: scopeId => buildUrl(["orders", scopeId, "shipments", "documents", "summaries", "find"]),
	verb: "POST",
};

export const findStoresRequest = {
	name: "findStoresRequest",
	buildUrl: scopeId => buildUrl(["stores", scopeId, "find"]),
	verb: "POST",
};

export const findUsersByNameRequest = {
	name: "findUsersByNameRequest",
	buildUrl: () => buildUrl(["users", "find"]),
	verb: "POST",
};

export const findUtcOffsetForTimeZoneRequest = {
	name: "findUtcOffsetForTimeZoneRequest",
	buildUrl: () => buildUrl(["timezones", "convert"]),
	verb: "POST",
};

export const findWarehousesRequest = {
	name: "findWarehousesRequest",
	buildUrl: scopeId => buildUrl(["warehouses", scopeId, "find"]),
	verb: "POST",
};

export const forceChangeUserPasswordRequest = {
	name: "forceChangeUserPasswordRequest",
	buildUrl: userName => buildUrl(["users", userName, "forceChangePassword"]),
	verb: "POST",
};

export const generatePromoCodesRequest = {
	name: "generatePromoCodesRequest",
	buildUrl: (scopeId, promotionId) => buildUrl(["promotions", scopeId, promotionId, "promoCodes", "generate"]),
	verb: "POST",
};

export const getAddressRequest = {
	name: "getAddressRequest",
	buildUrl: addressId => buildUrl(["addresses", addressId]),
	verb: "GET",
};

export const getAddressesByIdsRequest = {
	name: "getAddressesByIdsRequest",
	buildUrl: ids => buildUrl(["addresses", "byIds", ids]),
	verb: "GET",
};

export const getAllApplicationsRequest = {
	name: "getAllApplicationsRequest",
	buildUrl: () => buildUrl(["applications"]),
	verb: "GET",
};

export const getAllCulturesRequest = {
	name: "getAllCulturesRequest",
	buildUrl: () => buildUrl(["cultures", "all"]),
	verb: "GET",
};

export const getAllScheduledTasksRequest = {
	name: "getAllScheduledTasksRequest",
	buildUrl: () => buildUrl(["tasks", "scheduled", "all"]),
	verb: "GET",
};

export const getApplicationModules = {
	name: "getApplicationModules",
	buildUrl: applicationName => buildUrl(["modules", "byApplicationName", applicationName]),
	verb: "GET",
};

export const getAssociatedScopesRequest = {
	name: "getAssociatedScopesRequest",
	buildUrl: (scopeId, entityTypeName, entityId) =>
		buildUrl(["customProfiles", scopeId, entityTypeName, entityId, "scopes"]),
	verb: "GET",
};

export const getAuthenticationConfiguration = {
	name: "getAuthenticationConfiguration",
	buildUrl: () => buildUrl(["authentication", "configuration"]),
	verb: "GET",
};

export const getAuthenticationStatusRequest = {
	name: "getAuthenticationStatusRequest",
	buildUrl: () => buildUrl(["authentication", "status"]),
	verb: "GET",
};

export const getAuthorizedApplicationsRequest = {
	name: "getAuthorizedApplicationsRequest",
	buildUrl: () => buildUrl(["my", "applications"]),
	verb: "GET",
};

export const getAvailableDomainsRequest = {
	name: "getAvailableDomainsRequest",
	buildUrl: () => buildUrl(["users", "domains"]),
	verb: "GET",
};

export const getAvailableFulfillmentMethodsByScopeRequest = {
	name: "getAvailableFulfillmentMethodsByScopeRequest",
	buildUrl: (scopeId, queryParams) => buildUrl(["fulfillmentMethods", scopeId], queryParams),
	verb: "GET",
};

export const getAvailableTaxProvidersRequest = {
	name: "getAvailableTaxProvidersRequest",
	buildUrl: queryParams => buildUrl(["orders", "availableTaxProviders"], queryParams),
	verb: "GET",
};

export const getCacheStatusRequest = {
	name: "getCacheStatusRequest",
	buildUrl: queryParams => buildUrl(["diagnostic", "caches"], queryParams),
	verb: "GET",
};

export const getCampaignPromotionsRequest = {
	name: "getCampaignPromotionsRequest",
	buildUrl: (scopeId, campaignId, queryParams) =>
		buildUrl(["campaigns", scopeId, campaignId, "promotions"], queryParams),
	verb: "GET",
};

export const getCampaignRequest = {
	name: "getCampaignRequest",
	buildUrl: (scopeId, campaignId, queryParams) => buildUrl(["campaigns", scopeId, campaignId], queryParams),
	verb: "GET",
};

export const getCampaignsRequest = {
	name: "getCampaignsRequest",
	buildUrl: (scopeId, campaignIds) => buildUrl(["campaigns", scopeId, "byIds", campaignIds]),
	verb: "GET",
};

export const getCarrierProviderByIdRequest = {
	name: "getCarrierProviderByIdRequest",
	buildUrl: (scopeId, id) => buildUrl(["providers", scopeId, "carrier", id]),
	verb: "GET",
};

export const getCarrierProvidersMetadataRequest = {
	name: "getCarrierProvidersMetadataRequest",
	buildUrl: queryParams => buildUrl(["providers", "carrier", "metadata"], queryParams),
	verb: "GET",
};

export const getCarrierProvidersRequest = {
	name: "getCarrierProvidersRequest",
	buildUrl: (scopeId, queryParams) => buildUrl(["providers", scopeId, "carrier"], queryParams),
	verb: "GET",
};

export const getCartRequest = {
	name: "getCartRequest",
	buildUrl: (scopeId, customerId, cartName, queryParams) =>
		buildUrl(["carts", scopeId, customerId, cartName], queryParams),
	verb: "GET",
};

export const getCartStatesRequest = {
	name: "getCartStatesRequest",
	buildUrl: (scopeId, customerId, cartName, queryParams) =>
		buildUrl(["carts", scopeId, customerId, cartName, "states"], queryParams),
	verb: "GET",
};

export const getCartSummaryRequest = {
	name: "getCartSummaryRequest",
	buildUrl: (scopeId, customerId, cartName, queryParams) =>
		buildUrl(["carts", scopeId, customerId, cartName, "Summary"], queryParams),
	verb: "GET",
};

export const getCartsByCustomerIdRequest = {
	name: "getCartsByCustomerIdRequest",
	buildUrl: (scopeId, customerId, queryParams) => buildUrl(["carts", scopeId, customerId], queryParams),
	verb: "GET",
};

export const getCatalogChildrenIdsRequest = {
	name: "getCatalogChildrenIdsRequest",
	buildUrl: (catalogId, queryParams) => buildUrl(["catalogs", catalogId, "children"], queryParams),
	verb: "GET",
};

export const getCatalogRequest = {
	name: "getCatalogRequest",
	buildUrl: (catalogId, queryParams) => buildUrl(["catalogs", catalogId], queryParams),
	verb: "GET",
};

export const getCategoriesContainingProductsByStatusRequest = {
	name: "getCategoriesContainingProductsByStatusRequest",
	buildUrl: (scopeId, queryParams) => buildUrl(["categories", scopeId, "containingProducts"], queryParams),
	verb: "GET",
};

export const getCategoriesRequest = {
	name: "getCategoriesRequest",
	buildUrl: (scopeId, queryParams) => buildUrl(["categories", scopeId], queryParams),
	verb: "GET",
};

export const getCategoriesV2Request = {
	name: "getCategoriesV2Request",
	buildUrl: (scopeId, queryParams) => buildUrl(["categories", "v2", scopeId], queryParams),
	verb: "GET",
};

export const getCategoryChildrenRequest = {
	name: "getCategoryChildrenRequest",
	buildUrl: (scopeId, categoryId, queryParams) =>
		buildUrl(["categories", scopeId, categoryId, "children"], queryParams),
	verb: "GET",
};

export const getCategoryChildrenV2Request = {
	name: "getCategoryChildrenV2Request",
	buildUrl: (scopeId, categoryId, queryParams) =>
		buildUrl(["categories", "v2", scopeId, categoryId, "children"], queryParams),
	verb: "GET",
};

export const getCategoryRelationshipsRequest = {
	name: "getCategoryRelationshipsRequest",
	buildUrl: (scopeId, categoryId, queryParams) =>
		buildUrl(["categories", scopeId, categoryId, "relationships"], queryParams),
	verb: "GET",
};

export const getCategoryRelationshipsV2Request = {
	name: "getCategoryRelationshipsV2Request",
	buildUrl: (scopeId, categoryId, queryParams) =>
		buildUrl(["categories", "v2", scopeId, categoryId, "relationships"], queryParams),
	verb: "GET",
};

export const getCategoryRequest = {
	name: "getCategoryRequest",
	buildUrl: (scopeId, categoryId, queryParams) => buildUrl(["categories", scopeId, categoryId], queryParams),
	verb: "GET",
};

export const getCategoryTreeExistingItemByStateRequest = {
	name: "getCategoryTreeExistingItemByStateRequest",
	buildUrl: (scopeId, queryParams) => buildUrl(["categories", scopeId, "existing"], queryParams),
	verb: "GET",
};

export const getCategoryTreeNodesForPathRequest = {
	name: "getCategoryTreeNodesForPathRequest",
	buildUrl: (scopeId, startId, endId, queryParams) =>
		buildUrl(["categories", scopeId, "treeNodes", startId, endId], queryParams),
	verb: "GET",
};

export const getCategoryTreeNodesRequest = {
	name: "getCategoryTreeNodesRequest",
	buildUrl: (scopeId, categoryId, queryParams) =>
		buildUrl(["categories", scopeId, categoryId, "treeNodes"], queryParams),
	verb: "GET",
};

export const getCategoryTreeNodesV2Request = {
	name: "getCategoryTreeNodesV2Request",
	buildUrl: (scopeId, categoryId, queryParams) =>
		buildUrl(["categories", "v2", scopeId, categoryId, "treeNodes"], queryParams),
	verb: "GET",
};

export const getCategoryV2Request = {
	name: "getCategoryV2Request",
	buildUrl: (scopeId, categoryId, queryParams) => buildUrl(["categories", "v2", scopeId, categoryId], queryParams),
	verb: "GET",
};

export const getClosestCatalogLanguageRequest = {
	name: "getClosestCatalogLanguageRequest",
	buildUrl: (catalogId, language) => buildUrl(["catalogs", "closestlanguage", catalogId, language]),
	verb: "GET",
};

export const getCountShipmentFulfillmentInfosRequest = {
	name: "getCountShipmentFulfillmentInfosRequest",
	buildUrl: (scopeId, queryParams) => buildUrl(["shipmentFulfillmentInfos", scopeId, "count"], queryParams),
	verb: "GET",
};

export const getCountriesRequest = {
	name: "getCountriesRequest",
	buildUrl: queryParams => buildUrl(["countries"], queryParams),
	verb: "GET",
};

export const getCountryRequest = {
	name: "getCountryRequest",
	buildUrl: (countryIsoCode, queryParams) => buildUrl(["countries", countryIsoCode], queryParams),
	verb: "GET",
};

export const getCouponRequest = {
	name: "getCouponRequest",
	buildUrl: couponCode => buildUrl(["coupons", couponCode]),
	verb: "GET",
};

export const getCouponsRequest = {
	name: "getCouponsRequest",
	buildUrl: customerId => buildUrl(["coupons", "validates", customerId]),
	verb: "POST",
};

export const getCurrenciesRequest = {
	name: "getCurrenciesRequest",
	buildUrl: queryParams => buildUrl(["metadata", "currencies"], queryParams),
	verb: "GET",
};

export const getCustomRolesRequest = {
	name: "getCustomRolesRequest",
	buildUrl: queryParams => buildUrl(["roles", "custom"], queryParams),
	verb: "GET",
};

export const getCustomerAddressRequest = {
	name: "getCustomerAddressRequest",
	buildUrl: (customerId, addressId) => buildUrl(["addresses", "customer", customerId, addressId]),
	verb: "GET",
};

export const getCustomerAddressesRequest = {
	name: "getCustomerAddressesRequest",
	buildUrl: (scopeId, customerId) => buildUrl(["customers", scopeId, customerId, "addresses"]),
	verb: "GET",
};

export const getCustomerByUsernameRequest = {
	name: "getCustomerByUsernameRequest",
	buildUrl: (scopeId, username, queryParams) => buildUrl(["customers", scopeId, "byUsername", username], queryParams),
	verb: "GET",
};

export const getCustomerDefinitionRequest = {
	name: "getCustomerDefinitionRequest",
	buildUrl: (name, queryParams) => buildUrl(["metadata", "definitions", "customer", name], queryParams),
	verb: "GET",
};

export const getCustomerDefinitionsRequest = {
	name: "getCustomerDefinitionsRequest",
	buildUrl: queryParams => buildUrl(["metadata", "definitions", "customer"], queryParams),
	verb: "GET",
};

export const getCustomerFromPasswordTicketRequest = {
	name: "getCustomerFromPasswordTicketRequest",
	buildUrl: queryParams => buildUrl(["customers", "byTicket"], queryParams),
	verb: "GET",
};

export const getCustomerLastOrderRequest = {
	name: "getCustomerLastOrderRequest",
	buildUrl: (scopeId, customerId) => buildUrl(["orders", scopeId, customerId, "lastOrder"]),
	verb: "GET",
};

export const getCustomerLookupRequest = {
	name: "getCustomerLookupRequest",
	buildUrl: lookupName => buildUrl(["metadata", "lookups", "customer", lookupName]),
	verb: "GET",
};

export const getCustomerLookupsRequest = {
	name: "getCustomerLookupsRequest",
	buildUrl: () => buildUrl(["metadata", "lookups", "customer"]),
	verb: "GET",
};

export const getCustomerNotesRequest = {
	name: "getCustomerNotesRequest",
	buildUrl: (scopeId, customerId) => buildUrl(["customers", scopeId, customerId, "notes"]),
	verb: "GET",
};

export const getCustomerOrderHistoryRequest = {
	name: "getCustomerOrderHistoryRequest",
	buildUrl: (scopeId, customerId, queryParams) => buildUrl(["customers", scopeId, customerId, "orders"], queryParams),
	verb: "GET",
};

export const getCustomerOrganizationsRequest = {
	name: "getCustomerOrganizationsRequest",
	buildUrl: (scopeId, customerId, queryParams) =>
		buildUrl(["customers", scopeId, customerId, "organizations"], queryParams),
	verb: "GET",
};

export const getCustomerPaymentMethodsRequest = {
	name: "getCustomerPaymentMethodsRequest",
	buildUrl: (scopeId, customerId, paymentProviderName) =>
		buildUrl(["customers", scopeId, customerId, paymentProviderName, "paymentMethods"]),
	verb: "GET",
};

export const getCustomerPaymentProfileRequest = {
	name: "getCustomerPaymentProfileRequest",
	buildUrl: (scopeId, customerId, paymentProviderName) =>
		buildUrl(["customers", scopeId, customerId, paymentProviderName, "paymentProfile"]),
	verb: "GET",
};

export const getCustomerPaymentProfilesRequest = {
	name: "getCustomerPaymentProfilesRequest",
	buildUrl: (scopeId, customerId) => buildUrl(["customers", scopeId, customerId, "paymentProfiles"]),
	verb: "GET",
};

export const getCustomerRequest = {
	name: "getCustomerRequest",
	buildUrl: (scopeId, customerId, queryParams) => buildUrl(["customers", scopeId, customerId], queryParams),
	verb: "GET",
};

export const getCustomerStoresRequest = {
	name: "getCustomerStoresRequest",
	buildUrl: (scopeId, customerId, queryParams) => buildUrl(["customers", scopeId, customerId, "stores"], queryParams),
	verb: "GET",
};

export const getCustomersByOrganizationNameRequest = {
	name: "getCustomersByOrganizationNameRequest",
	buildUrl: (scopeId, name, queryParams) =>
		buildUrl(["organizations", scopeId, "byName", name, "customers"], queryParams),
	verb: "GET",
};

export const getCustomersByOrganizationRequest = {
	name: "getCustomersByOrganizationRequest",
	buildUrl: (scopeId, organizationId, queryParams) =>
		buildUrl(["organizations", scopeId, organizationId, "customers"], queryParams),
	verb: "GET",
};

export const getDeliveryFulfillmentLocationsByScopeRequest = {
	name: "getDeliveryFulfillmentLocationsByScopeRequest",
	buildUrl: (scopeId, queryParams) => buildUrl(["fulfillmentLocations", scopeId, "delivery"], queryParams),
	verb: "GET",
};

export const getDirectAuthorizationsRequest = {
	name: "getDirectAuthorizationsRequest",
	buildUrl: objectsIds => buildUrl(["authorizations", "direct", objectsIds]),
	verb: "POST",
};

export const getEffectiveAuthorizationsRequest = {
	name: "getEffectiveAuthorizationsRequest",
	buildUrl: () => buildUrl(["authorizations", "GetEffectiveAuthorizations"]),
	verb: "POST",
};

export const getEffectivePriceEntryInfoRequest = {
	name: "getEffectivePriceEntryInfoRequest",
	buildUrl: (scopeId, productId, queryParams) =>
		buildUrl(["products", scopeId, productId, "effectivePriceEntryInfo"], queryParams),
	verb: "GET",
};

export const getFulfillmentAvailabilityRequest = {
	name: "getFulfillmentAvailabilityRequest",
	buildUrl: scopeId => buildUrl(["fulfillmentLocations", scopeId, "availabilty"]),
	verb: "POST",
};

export const getFulfillmentCarrierDocumentsRequest = {
	name: "getFulfillmentCarrierDocumentsRequest",
	buildUrl: (scopeId, fulfillmentCarrierId) =>
		buildUrl(["fulfillments", "carriers", scopeId, fulfillmentCarrierId, "quotes", "documents"]),
	verb: "POST",
};

export const getFulfillmentCarrierQuotesRequest = {
	name: "getFulfillmentCarrierQuotesRequest",
	buildUrl: (scopeId, fulfillmentCarrierId) =>
		buildUrl(["fulfillments", "carriers", scopeId, fulfillmentCarrierId, "quotes"]),
	verb: "POST",
};

export const getFulfillmentCompetitionRequest = {
	name: "getFulfillmentCompetitionRequest",
	buildUrl: (scopeId, fulfillmentCompetitionId) =>
		buildUrl(["fulfillments", "competitions", scopeId, fulfillmentCompetitionId]),
	verb: "GET",
};

export const getFulfillmentExceptionsRequest = {
	name: "getFulfillmentExceptionsRequest",
	buildUrl: (scopeId, fulfillmentLocationId, orderId) =>
		buildUrl(["fulfillments", "exceptions", scopeId, fulfillmentLocationId, orderId]),
	verb: "GET",
};

export const getFulfillmentLocationAverageMetricsRequest = {
	name: "getFulfillmentLocationAverageMetricsRequest",
	buildUrl: (scopeId, fulfillmentLocationId, queryParams) =>
		buildUrl(["fulfillments", "metrics", "productivity", "average", scopeId, fulfillmentLocationId], queryParams),
	verb: "GET",
};

export const getFulfillmentLocationByIdElapsedTimeRequest = {
	name: "getFulfillmentLocationByIdElapsedTimeRequest",
	buildUrl: (scopeId, fulfillmentLocationId, queryParams) =>
		buildUrl(["fulfillmentLocations", scopeId, fulfillmentLocationId, "elapsedTime"], queryParams),
	verb: "GET",
};

export const getFulfillmentLocationByIdRequest = {
	name: "getFulfillmentLocationByIdRequest",
	buildUrl: (scopeId, fulfillmentLocationId) => buildUrl(["fulfillmentLocations", scopeId, fulfillmentLocationId]),
	verb: "GET",
};

export const getFulfillmentLocationPickingMissionsRequest = {
	name: "getFulfillmentLocationPickingMissionsRequest",
	buildUrl: (scopeId, fulfillmentLocationId, queryParams) =>
		buildUrl(["pickingMissions", scopeId, "byLocation", fulfillmentLocationId], queryParams),
	verb: "GET",
};

export const getFulfillmentLocationProductivityMetricsRequest = {
	name: "getFulfillmentLocationProductivityMetricsRequest",
	buildUrl: (scopeId, fulfillmentLocationId) =>
		buildUrl(["fulfillments", "metrics", "productivity", scopeId, fulfillmentLocationId]),
	verb: "POST",
};

export const getFulfillmentLocationShipmentAndItemMetricsRequest = {
	name: "getFulfillmentLocationShipmentAndItemMetricsRequest",
	buildUrl: (scopeId, fulfillmentLocationId, queryParams) =>
		buildUrl(["fulfillments", "metrics", "shipments", scopeId, fulfillmentLocationId], queryParams),
	verb: "GET",
};

export const getFulfillmentLocationTimeSlotByIdRequest = {
	name: "getFulfillmentLocationTimeSlotByIdRequest",
	buildUrl: (scopeId, fulfillmentLocationId, fulfillmentMethodType, slotId) =>
		buildUrl(["fulfillmentLocations", scopeId, fulfillmentLocationId, fulfillmentMethodType, "slots", slotId]),
	verb: "GET",
};

export const getFulfillmentLocationTimeSlotReservationByIdRequest = {
	name: "getFulfillmentLocationTimeSlotReservationByIdRequest",
	buildUrl: (scopeId, fulfillmentLocationId, slotReservationId, queryParams) =>
		buildUrl(
			["fulfillmentLocations", scopeId, fulfillmentLocationId, "reservations", "byId", slotReservationId],
			queryParams,
		),
	verb: "GET",
};

export const getFulfillmentLocationTimeSlotReservationsRequest = {
	name: "getFulfillmentLocationTimeSlotReservationsRequest",
	buildUrl: (scopeId, fulfillmentLocationId, slotId, queryParams) =>
		buildUrl(["fulfillmentLocations", scopeId, fulfillmentLocationId, "reservations", slotId], queryParams),
	verb: "GET",
};

export const getFulfillmentLocationTimeSlotsRequest = {
	name: "getFulfillmentLocationTimeSlotsRequest",
	buildUrl: (scopeId, fulfillmentLocationId, fulfillmentMethodType) =>
		buildUrl(["fulfillmentLocations", scopeId, fulfillmentLocationId, fulfillmentMethodType, "slots"]),
	verb: "GET",
};

export const getFulfillmentLocationsByInventoryLocationIdsRequest = {
	name: "getFulfillmentLocationsByInventoryLocationIdsRequest",
	buildUrl: (scopeId, inventoryLocationIds) => buildUrl(["fulfillmentLocations", scopeId, inventoryLocationIds]),
	verb: "GET",
};

export const getFulfillmentLocationsByScopeRequest = {
	name: "getFulfillmentLocationsByScopeRequest",
	buildUrl: (scopeId, queryParams) => buildUrl(["fulfillmentLocations", scopeId], queryParams),
	verb: "GET",
};

export const getFulfillmentMethodTypesByFulfillmentLocationRequest = {
	name: "getFulfillmentMethodTypesByFulfillmentLocationRequest",
	buildUrl: (scopeId, fulfillmentLocationId) => buildUrl(["fulfillmentMethodTypes", scopeId, fulfillmentLocationId]),
	verb: "GET",
};

export const getFulfillmentMethodTypesByScopeRequest = {
	name: "getFulfillmentMethodTypesByScopeRequest",
	buildUrl: (scopeId, queryParams) => buildUrl(["fulfillmentMethodTypes", scopeId], queryParams),
	verb: "GET",
};

export const getFulfillmentPackageRequest = {
	name: "getFulfillmentPackageRequest",
	buildUrl: (scopeId, id, queryParams) => buildUrl(["fulfillments", "packages", scopeId, id], queryParams),
	verb: "GET",
};

export const getFulfillmentPackageTypeRequest = {
	name: "getFulfillmentPackageTypeRequest",
	buildUrl: (scopeId, id, queryParams) => buildUrl(["fulfillments", "packageTypes", scopeId, id], queryParams),
	verb: "GET",
};

export const getFulfillmentProviderByIdRequest = {
	name: "getFulfillmentProviderByIdRequest",
	buildUrl: (scopeId, id) => buildUrl(["providers", scopeId, "fulfillment", id]),
	verb: "GET",
};

export const getFulfillmentProvidersMetadataRequest = {
	name: "getFulfillmentProvidersMetadataRequest",
	buildUrl: queryParams => buildUrl(["providers", "fulfillment", "metadata"], queryParams),
	verb: "GET",
};

export const getFulfillmentProvidersRequest = {
	name: "getFulfillmentProvidersRequest",
	buildUrl: (scopeId, queryParams) => buildUrl(["providers", scopeId, "fulfillment"], queryParams),
	verb: "GET",
};

export const getFulfillmentSLARequest = {
	name: "getFulfillmentSLARequest",
	buildUrl: (scopeId, id) => buildUrl(["fulfillments", "SLAs", scopeId, id]),
	verb: "GET",
};

export const getGroupMembersWithPagingRequest = {
	name: "getGroupMembersWithPagingRequest",
	buildUrl: (groupId, queryParams) => buildUrl(["groups", groupId, "users"], queryParams),
	verb: "GET",
};

export const getGroupRequest = {
	name: "getGroupRequest",
	buildUrl: groupId => buildUrl(["groups", groupId]),
	verb: "GET",
};

export const getGuestTokenRequest = {
	name: "getGuestTokenRequest",
	buildUrl: queryParams => buildUrl(["token", "customer", "guest"], queryParams),
	verb: "GET",
};

export const getInventoryItemBySkuAndLocationRequest = {
	name: "getInventoryItemBySkuAndLocationRequest",
	buildUrl: (scopeId, sku, inventoryLocationId, queryParams) =>
		buildUrl(["inventoryItems", scopeId, "bySku", sku, "byLocation", inventoryLocationId], queryParams),
	verb: "GET",
};

export const getInventoryItemsByLocationRequest = {
	name: "getInventoryItemsByLocationRequest",
	buildUrl: (scopeId, inventoryLocationId) => buildUrl(["inventoryItems", scopeId, "byLocation", inventoryLocationId]),
	verb: "GET",
};

export const getInventoryItemsByScopeAndSkuRequest = {
	name: "getInventoryItemsByScopeAndSkuRequest",
	buildUrl: (scopeId, sku, queryParams) => buildUrl(["inventoryItems", scopeId, "bySku", sku], queryParams),
	verb: "GET",
};

export const getInventoryItemsByScopeAndSkusRequest = {
	name: "getInventoryItemsByScopeAndSkusRequest",
	buildUrl: scopeId => buildUrl(["inventoryItems", scopeId, "bySkus"]),
	verb: "POST",
};

export const getInventoryLocationRequest = {
	name: "getInventoryLocationRequest",
	buildUrl: (scopeId, associatedLocationId) => buildUrl(["inventoryLocations", scopeId, associatedLocationId]),
	verb: "GET",
};

export const getInventoryProvidersRequest = {
	name: "getInventoryProvidersRequest",
	buildUrl: (scopeId, queryParams) => buildUrl(["inventoryItems", scopeId, "findProviders"], queryParams),
	verb: "GET",
};

export const getInventoryReservedItemsRequest = {
	name: "getInventoryReservedItemsRequest",
	buildUrl: ownerId => buildUrl(["inventoryItems", "reservations", ownerId]),
	verb: "GET",
};

export const getInventoryScheduleByIdRequest = {
	name: "getInventoryScheduleByIdRequest",
	buildUrl: (inventoryLocationId, scheduleId, queryParams) =>
		buildUrl(["inventoryLocations", inventoryLocationId, "schedules", "byId", scheduleId], queryParams),
	verb: "GET",
};

export const getInventorySchedulesBySkuRequest = {
	name: "getInventorySchedulesBySkuRequest",
	buildUrl: (inventoryLocationId, sku, queryParams) =>
		buildUrl(["inventoryLocations", inventoryLocationId, "schedules", "bySku", sku], queryParams),
	verb: "GET",
};

export const getInventorySchedulesRequest = {
	name: "getInventorySchedulesRequest",
	buildUrl: (inventoryLocationId, queryParams) =>
		buildUrl(["inventoryLocations", inventoryLocationId, "schedules"], queryParams),
	verb: "GET",
};

export const getLineItemRequest = {
	name: "getLineItemRequest",
	buildUrl: (scopeId, customerId, cartName, id, queryParams) =>
		buildUrl(["carts", scopeId, customerId, cartName, "lineItems", id], queryParams),
	verb: "GET",
};

export const getLineItemsInCartRequest = {
	name: "getLineItemsInCartRequest",
	buildUrl: (scopeId, customerId, cartName, queryParams) =>
		buildUrl(["carts", scopeId, customerId, cartName, "lineItems"], queryParams),
	verb: "GET",
};

export const getLineItemsInShipmentRequest = {
	name: "getLineItemsInShipmentRequest",
	buildUrl: (scopeId, customerId, cartName, shipmentId, queryParams) =>
		buildUrl(["carts", scopeId, customerId, cartName, "shipments", shipmentId, "lineItems"], queryParams),
	verb: "GET",
};

export const getLiveCampaignsRequest = {
	name: "getLiveCampaignsRequest",
	buildUrl: (scopeId, queryParams) => buildUrl(["campaigns", scopeId, "getlive"], queryParams),
	verb: "GET",
};

export const getMarketingLookupRequest = {
	name: "getMarketingLookupRequest",
	buildUrl: lookupName => buildUrl(["metadata", "lookups", "marketing", lookupName]),
	verb: "GET",
};

export const getMarketingLookupsRequest = {
	name: "getMarketingLookupsRequest",
	buildUrl: () => buildUrl(["metadata", "lookups", "marketing"]),
	verb: "GET",
};

export const getMarketingSettingsRequest = {
	name: "getMarketingSettingsRequest",
	buildUrl: () => buildUrl(["marketing", "settings"]),
	verb: "GET",
};

export const getMediaBySkuRequest = {
	name: "getMediaBySkuRequest",
	buildUrl: (scopeId, sku) => buildUrl(["products", scopeId, "bySku", sku, "media"]),
	verb: "POST",
};

export const getMediaCoverListRequest = {
	name: "getMediaCoverListRequest",
	buildUrl: scopeId => buildUrl(["products", "media", scopeId, "covers"]),
	verb: "POST",
};

export const getMediaRequest = {
	name: "getMediaRequest",
	buildUrl: (scopeId, productId, mediaId) => buildUrl(["products", scopeId, productId, "media", mediaId]),
	verb: "GET",
};

export const getMediaSettingsRequest = {
	name: "getMediaSettingsRequest",
	buildUrl: () => buildUrl(["products", "media", "settings"]),
	verb: "GET",
};

export const getMembershipConfigurationRequest = {
	name: "getMembershipConfigurationRequest",
	buildUrl: () => buildUrl(["membership", "configuration"]),
	verb: "GET",
};

export const getMembershipSettingsRequest = {
	name: "getMembershipSettingsRequest",
	buildUrl: () => buildUrl(["authorizations", "settings"]),
	verb: "GET",
};

export const getModulesRequest = {
	name: "getModulesRequest",
	buildUrl: () => buildUrl(["modules"]),
	verb: "GET",
};

export const getNumberOfShipmentsForFulfillmentLocationRequest = {
	name: "getNumberOfShipmentsForFulfillmentLocationRequest",
	buildUrl: (scopeId, fulfillmentLocationId) =>
		buildUrl(["shipmentFulfillmentInfos", scopeId, "numberOfShipmentsForFulfillmentLocation", fulfillmentLocationId]),
	verb: "GET",
};

export const getOperatingStatusRequest = {
	name: "getOperatingStatusRequest",
	buildUrl: (scopeId, fulfillmentLocationId) =>
		buildUrl(["fulfillmentLocations", scopeId, fulfillmentLocationId, "operatingStatus"]),
	verb: "GET",
};

export const getOrderByIdRequest = {
	name: "getOrderByIdRequest",
	buildUrl: (scopeId, orderId, queryParams) => buildUrl(["orders", scopeId, orderId], queryParams),
	verb: "GET",
};

export const getOrderByNumberRequest = {
	name: "getOrderByNumberRequest",
	buildUrl: (scopeId, orderNumber, queryParams) => buildUrl(["orders", scopeId, "byNumber", orderNumber], queryParams),
	verb: "GET",
};

export const getOrderDefinitionRequest = {
	name: "getOrderDefinitionRequest",
	buildUrl: (name, queryParams) => buildUrl(["metadata", "definitions", "order", name], queryParams),
	verb: "GET",
};

export const getOrderDefinitionsRequest = {
	name: "getOrderDefinitionsRequest",
	buildUrl: queryParams => buildUrl(["metadata", "definitions", "order"], queryParams),
	verb: "GET",
};

export const getOrderDraftPaymentRequest = {
	name: "getOrderDraftPaymentRequest",
	buildUrl: (scopeId, draftId, paymentId) => buildUrl(["orderdraft", scopeId, draftId, "payment", paymentId]),
	verb: "GET",
};

export const getOrderFulfillmentStateRequest = {
	name: "getOrderFulfillmentStateRequest",
	buildUrl: (scopeId, orderId) => buildUrl(["orders", scopeId, orderId, "fulfillmentState"]),
	verb: "GET",
};

export const getOrderHistoryRequest = {
	name: "getOrderHistoryRequest",
	buildUrl: (scopeId, queryParams) => buildUrl(["orders", scopeId, "orderhistory"], queryParams),
	verb: "GET",
};

export const getOrderLookupRequest = {
	name: "getOrderLookupRequest",
	buildUrl: lookupName => buildUrl(["metadata", "lookups", "order", lookupName]),
	verb: "GET",
};

export const getOrderLookupsRequest = {
	name: "getOrderLookupsRequest",
	buildUrl: () => buildUrl(["metadata", "lookups", "order"]),
	verb: "GET",
};

export const getOrderNotesRequest = {
	name: "getOrderNotesRequest",
	buildUrl: (scopeId, orderId) => buildUrl(["orders", scopeId, orderId, "notes"]),
	verb: "GET",
};

export const getOrderPickingMissionsRequest = {
	name: "getOrderPickingMissionsRequest",
	buildUrl: (scopeId, orderId, queryParams) => buildUrl(["pickingMissions", scopeId, "byOrder", orderId], queryParams),
	verb: "GET",
};

export const getOrderSettingsRequest = {
	name: "getOrderSettingsRequest",
	buildUrl: () => buildUrl(["orders", "settings"]),
	verb: "GET",
};

export const getOrganizationByNameRequest = {
	name: "getOrganizationByNameRequest",
	buildUrl: (scopeId, name, queryParams) => buildUrl(["organizations", scopeId, "byName", name], queryParams),
	verb: "GET",
};

export const getOrganizationRequest = {
	name: "getOrganizationRequest",
	buildUrl: (scopeId, organizationId, queryParams) => buildUrl(["organizations", scopeId, organizationId], queryParams),
	verb: "GET",
};

export const getOvertureHostInfoRequest = {
	name: "getOvertureHostInfoRequest",
	buildUrl: () => buildUrl(["monitoring", "health"]),
	verb: "GET",
};

export const getParentRolesRequest = {
	name: "getParentRolesRequest",
	buildUrl: roleId => buildUrl(["role", roleId, "parents"]),
	verb: "GET",
};

export const getPaymentProviderByIdRequest = {
	name: "getPaymentProviderByIdRequest",
	buildUrl: (scopeId, id) => buildUrl(["providers", scopeId, "payment", id]),
	verb: "GET",
};

export const getPaymentProviderStoreSettingsRequest = {
	name: "getPaymentProviderStoreSettingsRequest",
	buildUrl: (scopeId, providerId, storeId) =>
		buildUrl(["providers", scopeId, "payment", providerId, "storesSettings", storeId]),
	verb: "GET",
};

export const getPaymentProvidersMetadataRequest = {
	name: "getPaymentProvidersMetadataRequest",
	buildUrl: queryParams => buildUrl(["providers", "payment", "metadata"], queryParams),
	verb: "GET",
};

export const getPaymentProvidersRequest = {
	name: "getPaymentProvidersRequest",
	buildUrl: (scopeId, queryParams) => buildUrl(["providers", scopeId, "payment"], queryParams),
	verb: "GET",
};

export const getPaymentRequest = {
	name: "getPaymentRequest",
	buildUrl: (scopeId, customerId, cartName, id, queryParams) =>
		buildUrl(["carts", scopeId, customerId, cartName, "payments", id], queryParams),
	verb: "GET",
};

export const getPaymentsInCartRequest = {
	name: "getPaymentsInCartRequest",
	buildUrl: (scopeId, customerId, cartName, queryParams) =>
		buildUrl(["carts", scopeId, customerId, cartName, "payments"], queryParams),
	verb: "GET",
};

export const getPickingMissionRequest = {
	name: "getPickingMissionRequest",
	buildUrl: (scopeId, id) => buildUrl(["pickingMissions", scopeId, id]),
	verb: "GET",
};

export const getPickupFulfillmentLocationsByScopeRequest = {
	name: "getPickupFulfillmentLocationsByScopeRequest",
	buildUrl: (scopeId, queryParams) => buildUrl(["fulfillmentLocations", scopeId, "pickup"], queryParams),
	verb: "GET",
};

export const getPriceListEntriesRequest = {
	name: "getPriceListEntriesRequest",
	buildUrl: (scopeId, productId, queryParams) =>
		buildUrl(["products", scopeId, productId, "priceListEntries"], queryParams),
	verb: "GET",
};

export const getPriceListsRequest = {
	name: "getPriceListsRequest",
	buildUrl: (scopeId, queryParams) => buildUrl(["products", scopeId, "priceLists"], queryParams),
	verb: "GET",
};

export const getPrintableOrderUriRequest = {
	name: "getPrintableOrderUriRequest",
	buildUrl: (scopeId, orderId) => buildUrl(["orders", scopeId, orderId, "printuri"]),
	verb: "GET",
};

export const getPrintableOrdersUriRequest = {
	name: "getPrintableOrdersUriRequest",
	buildUrl: scopeId => buildUrl(["orders", scopeId, "printOrders"]),
	verb: "POST",
};

export const getPrintableShipmentUriRequest = {
	name: "getPrintableShipmentUriRequest",
	buildUrl: (scopeId, shipmentId) => buildUrl(["shipmentFulfillmentInfos", scopeId, shipmentId, "printuri"]),
	verb: "GET",
};

export const getPrintableShipmentsUriRequest = {
	name: "getPrintableShipmentsUriRequest",
	buildUrl: scopeId => buildUrl(["shipmentFulfillmentInfos", scopeId, "printShipments"]),
	verb: "POST",
};

export const getProductAttributesRequest = {
	name: "getProductAttributesRequest",
	buildUrl: () => buildUrl(["products", "attributes"]),
	verb: "GET",
};

export const getProductDefinitionRequest = {
	name: "getProductDefinitionRequest",
	buildUrl: (name, queryParams) => buildUrl(["products", "definitions", name], queryParams),
	verb: "GET",
};

export const getProductDefinitionsRequest = {
	name: "getProductDefinitionsRequest",
	buildUrl: queryParams => buildUrl(["products", "definitions"], queryParams),
	verb: "GET",
};

export const getProductDraftRequest = {
	name: "getProductDraftRequest",
	buildUrl: (scopeId, productId, queryParams) => buildUrl(["products", scopeId, "draft", productId], queryParams),
	verb: "GET",
};

export const getProductDraftStatesRequest = {
	name: "getProductDraftStatesRequest",
	buildUrl: (scopeId, productId) => buildUrl(["products", scopeId, "draftStates", productId]),
	verb: "GET",
};

export const getProductLookupRequest = {
	name: "getProductLookupRequest",
	buildUrl: lookupName => buildUrl(["metadata", "lookups", "product", lookupName]),
	verb: "GET",
};

export const getProductLookupsRequest = {
	name: "getProductLookupsRequest",
	buildUrl: () => buildUrl(["metadata", "lookups", "product"]),
	verb: "GET",
};

export const getProductPriceEntriesRequest = {
	name: "getProductPriceEntriesRequest",
	buildUrl: (scopeId, productId) => buildUrl(["products", scopeId, productId, "productPriceEntries"]),
	verb: "POST",
};

export const getProductRelationshipsRequest = {
	name: "getProductRelationshipsRequest",
	buildUrl: (scopeId, productId, queryParams) =>
		buildUrl(["products", scopeId, productId, "relationships"], queryParams),
	verb: "GET",
};

export const getProductRequest = {
	name: "getProductRequest",
	buildUrl: (scopeId, productId, queryParams) => buildUrl(["products", scopeId, productId], queryParams),
	verb: "GET",
};

export const getProductSettingsRequest = {
	name: "getProductSettingsRequest",
	buildUrl: queryParams => buildUrl(["products", "settings"], queryParams),
	verb: "GET",
};

export const getProductV2Request = {
	name: "getProductV2Request",
	buildUrl: (scopeId, productId, queryParams) => buildUrl(["products", "v2", scopeId, productId], queryParams),
	verb: "GET",
};

export const getProductsByCategoryRequest = {
	name: "getProductsByCategoryRequest",
	buildUrl: (scopeId, categoryId, queryParams) =>
		buildUrl(["categories", scopeId, categoryId, "products"], queryParams),
	verb: "GET",
};

export const getProductsByCategoryV2Request = {
	name: "getProductsByCategoryV2Request",
	buildUrl: (scopeId, categoryId, queryParams) =>
		buildUrl(["categories", "v2", scopeId, categoryId, "products"], queryParams),
	verb: "GET",
};

export const getProductsByIdsRequest = {
	name: "getProductsByIdsRequest",
	buildUrl: scopeId => buildUrl(["products", scopeId, "byIds"]),
	verb: "POST",
};

export const getProductsByIdsV2Request = {
	name: "getProductsByIdsV2Request",
	buildUrl: scopeId => buildUrl(["products", "v2", scopeId, "byIds"]),
	verb: "POST",
};

export const getProductsByPublicationStatusRequest = {
	name: "getProductsByPublicationStatusRequest",
	buildUrl: scopeId => buildUrl(["products", scopeId, "byPublicationStatus"]),
	verb: "POST",
};

export const getProductsBySkuRequest = {
	name: "getProductsBySkuRequest",
	buildUrl: (scopeId, sku, queryParams) => buildUrl(["products", scopeId, "bySku", sku], queryParams),
	verb: "GET",
};

export const getProductsBySkuV2Request = {
	name: "getProductsBySkuV2Request",
	buildUrl: (scopeId, sku, queryParams) => buildUrl(["products", "v2", scopeId, "bySku", sku], queryParams),
	verb: "GET",
};

export const getProductsBySkusV2Request = {
	name: "getProductsBySkusV2Request",
	buildUrl: scopeId => buildUrl(["products", "v2", scopeId, "bySkus"]),
	verb: "POST",
};

export const getProductsCountByCategoryRequest = {
	name: "getProductsCountByCategoryRequest",
	buildUrl: (scopeId, categoryId, queryParams) => buildUrl(["products", scopeId, categoryId, "count"], queryParams),
	verb: "GET",
};

export const getProductsPriceEntriesRequest = {
	name: "getProductsPriceEntriesRequest",
	buildUrl: scopeId => buildUrl(["products", scopeId, "productPriceEntries"]),
	verb: "POST",
};

export const getProductsPropertiesByCategoryRequest = {
	name: "getProductsPropertiesByCategoryRequest",
	buildUrl: (scopeId, categoryId, queryParams) =>
		buildUrl(["products", scopeId, "byCategoryId", categoryId], queryParams),
	verb: "GET",
};

export const getProductsPropertiesByDraftStateAndCategoriesRequest = {
	name: "getProductsPropertiesByDraftStateAndCategoriesRequest",
	buildUrl: scopeId => buildUrl(["products", scopeId, "byDraftStateAndCategories"]),
	verb: "POST",
};

export const getProductsPropertiesByDraftStateRequest = {
	name: "getProductsPropertiesByDraftStateRequest",
	buildUrl: (scopeId, draftState, queryParams) =>
		buildUrl(["products", scopeId, "byDraftState", draftState], queryParams),
	verb: "GET",
};

export const getProductsPropertiesFlagAsNewRequest = {
	name: "getProductsPropertiesFlagAsNewRequest",
	buildUrl: (scopeId, queryParams) => buildUrl(["products", scopeId, "flagAsNew"], queryParams),
	verb: "GET",
};

export const getProductsPropertiesWithNotificationRequest = {
	name: "getProductsPropertiesWithNotificationRequest",
	buildUrl: (scopeId, queryParams) => buildUrl(["products", scopeId, "withNotification"], queryParams),
	verb: "GET",
};

export const getProductsStatisticsRequest = {
	name: "getProductsStatisticsRequest",
	buildUrl: scopeId => buildUrl(["products", scopeId, "statistics"]),
	verb: "GET",
};

export const getProfileAttributeGroupRequest = {
	name: "getProfileAttributeGroupRequest",
	buildUrl: name => buildUrl(["metadata", "attributegroups", "profile", name]),
	verb: "GET",
};

export const getProfileAttributeGroupsRequest = {
	name: "getProfileAttributeGroupsRequest",
	buildUrl: () => buildUrl(["metadata", "attributegroups", "profile"]),
	verb: "GET",
};

export const getProfileInstanceByNameRequest = {
	name: "getProfileInstanceByNameRequest",
	buildUrl: (scopeId, entityTypeName, name) => buildUrl(["customProfiles", scopeId, entityTypeName, "byName", name]),
	verb: "GET",
};

export const getProfileInstanceRequest = {
	name: "getProfileInstanceRequest",
	buildUrl: (scopeId, entityTypeName, entityId) => buildUrl(["customProfiles", scopeId, entityTypeName, entityId]),
	verb: "GET",
};

export const getProfileInstancesRequest = {
	name: "getProfileInstancesRequest",
	buildUrl: (scopeId, entityTypeName) => buildUrl(["customProfiles", scopeId, entityTypeName, "byIds"]),
	verb: "POST",
};

export const getPromoCodesCountRequest = {
	name: "getPromoCodesCountRequest",
	buildUrl: (scopeId, promotionId) => buildUrl(["promotions", scopeId, promotionId, "promoCodes", "count"]),
	verb: "GET",
};

export const getPromotionRequest = {
	name: "getPromotionRequest",
	buildUrl: (scopeId, campaignId, promotionId, queryParams) =>
		buildUrl(["campaigns", scopeId, campaignId, "promotions", promotionId], queryParams),
	verb: "GET",
};

export const getPromotionSummariesRequest = {
	name: "getPromotionSummariesRequest",
	buildUrl: (scopeId, campaignId) => buildUrl(["campaigns", scopeId, campaignId, "promotions", "summaries"]),
	verb: "GET",
};

export const getProvidersRequest = {
	name: "getProvidersRequest",
	buildUrl: (scopeId, queryParams) => buildUrl(["providers", scopeId, "types"], queryParams),
	verb: "GET",
};

export const getQuickLinksCountDetailsRequest = {
	name: "getQuickLinksCountDetailsRequest",
	buildUrl: queryParams => buildUrl(["products", "quicklinks"], queryParams),
	verb: "GET",
};

export const getRecurringOrderLineItemRequest = {
	name: "getRecurringOrderLineItemRequest",
	buildUrl: (scopeId, recurringOrderLineItemId) =>
		buildUrl(["recurringOrders", scopeId, "lineItems", recurringOrderLineItemId]),
	verb: "GET",
};

export const getRecurringOrderLineItemsForCustomerRequest = {
	name: "getRecurringOrderLineItemsForCustomerRequest",
	buildUrl: (scopeId, customerId) => buildUrl(["recurringOrders", scopeId, "lineItems", "byCustomer", customerId]),
	verb: "GET",
};

export const getRecurringOrderProgramRequest = {
	name: "getRecurringOrderProgramRequest",
	buildUrl: recurringOrderProgramName => buildUrl(["recurringOrders", "programs", recurringOrderProgramName]),
	verb: "GET",
};

export const getRecurringOrderProgramsByScopeIdRequest = {
	name: "getRecurringOrderProgramsByScopeIdRequest",
	buildUrl: scopeId => buildUrl(["recurringOrders", "programs", "byScope", scopeId]),
	verb: "GET",
};

export const getRegionsRequest = {
	name: "getRegionsRequest",
	buildUrl: (countryIsoCode, queryParams) => buildUrl(["countries", countryIsoCode, "regions"], queryParams),
	verb: "GET",
};

export const getRequesterTasksInfoRequest = {
	name: "getRequesterTasksInfoRequest",
	buildUrl: queryParams => buildUrl(["tasks"], queryParams),
	verb: "GET",
};

export const getRmaRequest = {
	name: "getRmaRequest",
	buildUrl: (scopeId, orderNumber, rmaNumber) => buildUrl(["orders", "RMA", scopeId, orderNumber, rmaNumber]),
	verb: "GET",
};

export const getRmasByOrderRequest = {
	name: "getRmasByOrderRequest",
	buildUrl: (scopeId, orderNumber) => buildUrl(["orders", "RMA", scopeId, orderNumber]),
	verb: "GET",
};

export const getRoleByIdRequest = {
	name: "getRoleByIdRequest",
	buildUrl: id => buildUrl(["roles", id]),
	verb: "GET",
};

export const getRoleRequest = {
	name: "getRoleRequest",
	buildUrl: (moduleId, roleName) => buildUrl(["roles", moduleId, roleName]),
	verb: "GET",
};

export const getRolesRequest = {
	name: "getRolesRequest",
	buildUrl: () => buildUrl(["roles"]),
	verb: "GET",
};

export const getRoutingProviderByIdRequest = {
	name: "getRoutingProviderByIdRequest",
	buildUrl: (scopeId, id) => buildUrl(["providers", scopeId, "routing", id]),
	verb: "GET",
};

export const getRoutingProvidersMetadataRequest = {
	name: "getRoutingProvidersMetadataRequest",
	buildUrl: queryParams => buildUrl(["providers", "routing", "metadata"], queryParams),
	verb: "GET",
};

export const getRoutingProvidersRequest = {
	name: "getRoutingProvidersRequest",
	buildUrl: (scopeId, queryParams) => buildUrl(["providers", scopeId, "routing"], queryParams),
	verb: "GET",
};

export const getRunningScheduledTasksRequest = {
	name: "getRunningScheduledTasksRequest",
	buildUrl: () => buildUrl(["tasks", "scheduled", "running"]),
	verb: "GET",
};

export const getScheduleRequest = {
	name: "getScheduleRequest",
	buildUrl: (scopeId, fulfillmentLocationId, queryParams) =>
		buildUrl(["fulfillmentLocations", scopeId, fulfillmentLocationId, "schedule"], queryParams),
	verb: "GET",
};

export const getScheduledTaskRequest = {
	name: "getScheduledTaskRequest",
	buildUrl: (group, name) => buildUrl(["tasks", "scheduled", group, name]),
	verb: "GET",
};

export const getScopeChildrenRequest = {
	name: "getScopeChildrenRequest",
	buildUrl: (scopeId, queryParams) => buildUrl(["scopes", scopeId, "children"], queryParams),
	verb: "GET",
};

export const getScopeRequest = {
	name: "getScopeRequest",
	buildUrl: (scopeId, queryParams) => buildUrl(["scopes", scopeId], queryParams),
	verb: "GET",
};

export const getSearchQueryByNameRequest = {
	name: "getSearchQueryByNameRequest",
	buildUrl: (scopeId, queryType, name, queryParams) =>
		buildUrl(["searchqueries", scopeId, queryType, name], queryParams),
	verb: "GET",
};

export const getSegmentRequest = {
	name: "getSegmentRequest",
	buildUrl: (segmentId, queryParams) => buildUrl(["segments", segmentId], queryParams),
	verb: "GET",
};

export const getSegmentsRequest = {
	name: "getSegmentsRequest",
	buildUrl: queryParams => buildUrl(["segments"], queryParams),
	verb: "GET",
};

export const getShipmentDocumentRequest = {
	name: "getShipmentDocumentRequest",
	buildUrl: (scopeId, orderId, shipmentId, name) =>
		buildUrl(["orders", scopeId, orderId, "shipments", shipmentId, "documents", name]),
	verb: "GET",
};

export const getShipmentFulfillmentInfosRequest = {
	name: "getShipmentFulfillmentInfosRequest",
	buildUrl: (scopeId, queryParams) => buildUrl(["shipmentFulfillmentInfos", scopeId], queryParams),
	verb: "GET",
};

export const getShipmentNotesRequest = {
	name: "getShipmentNotesRequest",
	buildUrl: (scopeId, shipmentId) => buildUrl(["orders", scopeId, shipmentId, "shipment", "notes"]),
	verb: "GET",
};

export const getShipmentPickingMissionsRequest = {
	name: "getShipmentPickingMissionsRequest",
	buildUrl: (scopeId, shipmentId, queryParams) =>
		buildUrl(["pickingMissions", scopeId, "byShipment", shipmentId], queryParams),
	verb: "GET",
};

export const getShipmentRequest = {
	name: "getShipmentRequest",
	buildUrl: (scopeId, customerId, cartName, id, queryParams) =>
		buildUrl(["carts", scopeId, customerId, cartName, "shipments", id], queryParams),
	verb: "GET",
};

export const getShippingFulfillmentLocationsByScopeRequest = {
	name: "getShippingFulfillmentLocationsByScopeRequest",
	buildUrl: (scopeId, queryParams) => buildUrl(["fulfillmentLocations", scopeId, "shipping"], queryParams),
	verb: "GET",
};

export const getSsrsRenderingFormatsRequest = {
	name: "getSsrsRenderingFormatsRequest",
	buildUrl: queryParams => buildUrl(["reporting", "ssrs", "reports", "renderingformats"], queryParams),
	verb: "GET",
};

export const getSsrsReportParametersRequest = {
	name: "getSsrsReportParametersRequest",
	buildUrl: reportId => buildUrl(["reporting", "ssrs", "reports", reportId, "parameters"]),
	verb: "POST",
};

export const getSsrsReportsRequest = {
	name: "getSsrsReportsRequest",
	buildUrl: queryParams => buildUrl(["reporting", "ssrs", "reports"], queryParams),
	verb: "GET",
};

export const getStoreByNameRequest = {
	name: "getStoreByNameRequest",
	buildUrl: (scopeId, name, queryParams) => buildUrl(["stores", scopeId, "byName", name], queryParams),
	verb: "GET",
};

export const getStoreByNumberRequest = {
	name: "getStoreByNumberRequest",
	buildUrl: (scopeId, number, queryParams) => buildUrl(["stores", scopeId, "byNumber", number], queryParams),
	verb: "GET",
};

export const getStoreRequest = {
	name: "getStoreRequest",
	buildUrl: (scopeId, id, queryParams) => buildUrl(["stores", scopeId, id], queryParams),
	verb: "GET",
};

export const getSupportedCulturesRequest = {
	name: "getSupportedCulturesRequest",
	buildUrl: () => buildUrl(["cultures"]),
	verb: "GET",
};

export const getTargetingMetadataRequest = {
	name: "getTargetingMetadataRequest",
	buildUrl: queryParams => buildUrl(["metadata", "targeting"], queryParams),
	verb: "GET",
};

export const getTaskExecutionLogsRequest = {
	name: "getTaskExecutionLogsRequest",
	buildUrl: taskId => buildUrl(["tasks", taskId, "logs"]),
	verb: "GET",
};

export const getTaskInfoRequest = {
	name: "getTaskInfoRequest",
	buildUrl: taskId => buildUrl(["tasks", taskId]),
	verb: "GET",
};

export const getTasksInfoByCorrelationIdRequest = {
	name: "getTasksInfoByCorrelationIdRequest",
	buildUrl: id => buildUrl(["tasks", "byCorrelationId", id]),
	verb: "GET",
};

export const getTaxCategoriesRequest = {
	name: "getTaxCategoriesRequest",
	buildUrl: queryParams => buildUrl(["orders", "taxCategories"], queryParams),
	verb: "GET",
};

export const getTaxProviderByIdRequest = {
	name: "getTaxProviderByIdRequest",
	buildUrl: (scopeId, id) => buildUrl(["providers", scopeId, "tax", id]),
	verb: "GET",
};

export const getTaxProviderByScopeRequest = {
	name: "getTaxProviderByScopeRequest",
	buildUrl: queryParams => buildUrl(["orders", "taxProviderByScope"], queryParams),
	verb: "GET",
};

export const getTaxProvidersMetadataRequest = {
	name: "getTaxProvidersMetadataRequest",
	buildUrl: queryParams => buildUrl(["providers", "tax", "metadata"], queryParams),
	verb: "GET",
};

export const getTaxProvidersRequest = {
	name: "getTaxProvidersRequest",
	buildUrl: (scopeId, queryParams) => buildUrl(["providers", scopeId, "tax"], queryParams),
	verb: "GET",
};

export const getTemplateByNameRequest = {
	name: "getTemplateByNameRequest",
	buildUrl: (scopeId, type, name, queryParams) => buildUrl(["templates", scopeId, type, name], queryParams),
	verb: "GET",
};

export const getTemplateVariablesRequest = {
	name: "getTemplateVariablesRequest",
	buildUrl: scopeId => buildUrl(["templates", scopeId, "Variables"]),
	verb: "GET",
};

export const getTemplatesRequest = {
	name: "getTemplatesRequest",
	buildUrl: (scopeId, type, queryParams) => buildUrl(["templates", scopeId, type], queryParams),
	verb: "GET",
};

export const getTimeZonesRequest = {
	name: "getTimeZonesRequest",
	buildUrl: () => buildUrl(["timezones"]),
	verb: "GET",
};

export const getTokenRequest = {
	name: "getTokenRequest",
	buildUrl: () => buildUrl(["token"]),
	verb: "POST",
};

export const getUsedLanguagesRequest = {
	name: "getUsedLanguagesRequest",
	buildUrl: () => buildUrl(["catalogs", "usedCultures"]),
	verb: "GET",
};

export const getUserApplicationRequest = {
	name: "getUserApplicationRequest",
	buildUrl: () => buildUrl(["my", "application"]),
	verb: "GET",
};

export const getUserCultureRequest = {
	name: "getUserCultureRequest",
	buildUrl: () => buildUrl(["my", "culture"]),
	verb: "GET",
};

export const getUserEffectiveAuthorizationsRequest = {
	name: "getUserEffectiveAuthorizationsRequest",
	buildUrl: userName => buildUrl(["authorizations", userName, "GetEffectiveAuthorizations"]),
	verb: "GET",
};

export const getUserGroupsRequest = {
	name: "getUserGroupsRequest",
	buildUrl: userName => buildUrl(["users", userName, "groups"]),
	verb: "GET",
};

export const getUserPermissionsRequest = {
	name: "getUserPermissionsRequest",
	buildUrl: () => buildUrl(["authentication", "profile"]),
	verb: "GET",
};

export const getUserRequest = {
	name: "getUserRequest",
	buildUrl: userName => buildUrl(["users", userName]),
	verb: "GET",
};

export const getUserScopeRequest = {
	name: "getUserScopeRequest",
	buildUrl: module => buildUrl(["my", "scope", module]),
	verb: "GET",
};

export const getUserScopeTreeRequest = {
	name: "getUserScopeTreeRequest",
	buildUrl: (module, queryParams) => buildUrl(["my", "scope", module, "tree"], queryParams),
	verb: "GET",
};

export const getVariantSearchConfigurationsRequest = {
	name: "getVariantSearchConfigurationsRequest",
	buildUrl: scopeId => buildUrl(["search", scopeId, "configurations", "variant"]),
	verb: "GET",
};

export const getVariantsByProductRequest = {
	name: "getVariantsByProductRequest",
	buildUrl: (scopeId, productId, queryParams) => buildUrl(["products", scopeId, productId, "variants"], queryParams),
	verb: "GET",
};

export const getVersionInfoRequest = {
	name: "getVersionInfoRequest",
	buildUrl: queryParams => buildUrl(["diagnostic", "versioninfo"], queryParams),
	verb: "GET",
};

export const getWarehouseByNumberRequest = {
	name: "getWarehouseByNumberRequest",
	buildUrl: (scopeId, number, queryParams) => buildUrl(["warehouses", scopeId, "byNumber", number], queryParams),
	verb: "GET",
};

export const getWarehouseRequest = {
	name: "getWarehouseRequest",
	buildUrl: (scopeId, id, queryParams) => buildUrl(["warehouses", scopeId, id], queryParams),
	verb: "GET",
};

export const grantAuthorizationRequest = {
	name: "grantAuthorizationRequest",
	buildUrl: (roleId, objectId) => buildUrl(["authorizations", roleId, objectId]),
	verb: "POST",
};

export const grantAuthorizationsRequest = {
	name: "grantAuthorizationsRequest",
	buildUrl: objectId => buildUrl(["authorizations", objectId]),
	verb: "POST",
};

export const importCouponCodesRequest = {
	name: "importCouponCodesRequest",
	buildUrl: promotionId => buildUrl(["promotions", promotionId, "coupons", "import"]),
	verb: "POST",
};

export const importInventoryItemsRequest = {
	name: "importInventoryItemsRequest",
	buildUrl: () => buildUrl(["integration", "inventoryItems", "import"]),
	verb: "POST",
};

export const importOrderSchemaRequest = {
	name: "importOrderSchemaRequest",
	buildUrl: () => buildUrl(["integration", "orders", "schema", "import"]),
	verb: "POST",
};

export const importOrdersRequest = {
	name: "importOrdersRequest",
	buildUrl: () => buildUrl(["integration", "orders", "import"]),
	verb: "POST",
};

export const importProductPriceRequest = {
	name: "importProductPriceRequest",
	buildUrl: scopeId => buildUrl(["dataexchange", "productprices", scopeId, "import"]),
	verb: "POST",
};

export const importProductsPricesRequest = {
	name: "importProductsPricesRequest",
	buildUrl: scopeId => buildUrl(["integration", "products", scopeId, "prices", "import"]),
	verb: "POST",
};

export const importProductsRequest = {
	name: "importProductsRequest",
	buildUrl: scopeId => buildUrl(["integration", "products", scopeId, "import"]),
	verb: "POST",
};

export const importProfileSchemaRequest = {
	name: "importProfileSchemaRequest",
	buildUrl: () => buildUrl(["integration", "profiles", "schema", "import"]),
	verb: "POST",
};

export const importProfilesRequest = {
	name: "importProfilesRequest",
	buildUrl: () => buildUrl(["integration", "profiles", "import"]),
	verb: "POST",
};

export const importPromoCodesRequest = {
	name: "importPromoCodesRequest",
	buildUrl: promotionId => buildUrl(["dataexchange", "promotions", promotionId, "promoCodes", "import"]),
	verb: "POST",
};

export const increaseInventoryQuantityRequest = {
	name: "increaseInventoryQuantityRequest",
	buildUrl: (scopeId, sku, inventoryLocationId, quantity) =>
		buildUrl(["inventoryItems", scopeId, "bySku", sku, "byLocation", inventoryLocationId, "increase", quantity]),
	verb: "POST",
};

export const indexCustomersRequest = {
	name: "indexCustomersRequest",
	buildUrl: () => buildUrl(["search", "indexes", "customers"]),
	verb: "PUT",
};

export const indexInventoriesRequest = {
	name: "indexInventoriesRequest",
	buildUrl: () => buildUrl(["search", "indexes", "inventories"]),
	verb: "PUT",
};

export const indexProductsRequest = {
	name: "indexProductsRequest",
	buildUrl: () => buildUrl(["search", "indexes", "products"]),
	verb: "PUT",
};

export const indexStoresRequest = {
	name: "indexStoresRequest",
	buildUrl: () => buildUrl(["search", "indexes", "stores"]),
	verb: "PUT",
};

export const initializePaymentRequest = {
	name: "initializePaymentRequest",
	buildUrl: (scopeId, customerId, cartName, paymentId) =>
		buildUrl(["carts", scopeId, customerId, cartName, "payments", paymentId, "initialize"]),
	verb: "POST",
};

export const liberateCouponRequest = {
	name: "liberateCouponRequest",
	buildUrl: () => buildUrl(["coupons", "liberate"]),
	verb: "POST",
};

export const loginRequest = {
	name: "loginRequest",
	buildUrl: scopeId => buildUrl(["membership", scopeId, "Login"]),
	verb: "PUT",
};

export const mergeDocumentsRequest = {
	name: "mergeDocumentsRequest",
	buildUrl: documentType => buildUrl(["documents", documentType, "merge"]),
	verb: "POST",
};

export const pauseCampaignRequest = {
	name: "pauseCampaignRequest",
	buildUrl: (scopeId, id) => buildUrl(["campaigns", scopeId, id, "pause"]),
	verb: "POST",
};

export const postProcessOrderRequest = {
	name: "postProcessOrderRequest",
	buildUrl: (scopeId, orderId) => buildUrl(["orders", scopeId, orderId, "postProcess"]),
	verb: "POST",
};

export const processPromotionEngineRequest = {
	name: "processPromotionEngineRequest",
	buildUrl: () => buildUrl(["promotion", "engine"]),
	verb: "POST",
};

export const productExistsRequest = {
	name: "productExistsRequest",
	buildUrl: (scopeId, productId) => buildUrl(["products", "exists", scopeId, productId]),
	verb: "GET",
};

export const productInformationExportRequest = {
	name: "productInformationExportRequest",
	buildUrl: scopeId => buildUrl(["dataexchange", "products", scopeId, "export"]),
	verb: "POST",
};

export const productInformationImportRequest = {
	name: "productInformationImportRequest",
	buildUrl: scopeId => buildUrl(["dataexchange", "products", scopeId, "import"]),
	verb: "POST",
};

export const productInformationLegacyImportRequest = {
	name: "productInformationLegacyImportRequest",
	buildUrl: scopeId => buildUrl(["dataexchange", "products", scopeId, "legacy", "import"]),
	verb: "POST",
};

export const publishCampaignRequest = {
	name: "publishCampaignRequest",
	buildUrl: (scopeId, id) => buildUrl(["campaigns", scopeId, id, "publish"]),
	verb: "POST",
};

export const queueActivityTaskRequest = {
	name: "queueActivityTaskRequest",
	buildUrl: taskId => buildUrl(["tasks", "activities", taskId]),
	verb: "POST",
};

export const queueWorkflowTaskRequest = {
	name: "queueWorkflowTaskRequest",
	buildUrl: taskId => buildUrl(["tasks", "workflows", taskId]),
	verb: "POST",
};

export const refreshPaymentOrderRequest = {
	name: "refreshPaymentOrderRequest",
	buildUrl: (scopeId, orderId, paymentId) => buildUrl(["orders", scopeId, orderId, "payments", paymentId, "refresh"]),
	verb: "POST",
};

export const refreshPaymentRequest = {
	name: "refreshPaymentRequest",
	buildUrl: (scopeId, customerId, cartName, paymentId) =>
		buildUrl(["carts", scopeId, customerId, cartName, "payments", paymentId, "refresh"]),
	verb: "POST",
};

export const refundFulfillmentCarrierQuotesRequest = {
	name: "refundFulfillmentCarrierQuotesRequest",
	buildUrl: (scopeId, fulfillmentCarrierId) =>
		buildUrl(["fulfillments", "carriers", scopeId, fulfillmentCarrierId, "quotes", "refund"]),
	verb: "POST",
};

export const refundPaymentRequest = {
	name: "refundPaymentRequest",
	buildUrl: (scopeId, orderId, paymentId) => buildUrl(["orders", scopeId, orderId, "payments", paymentId, "refund"]),
	verb: "POST",
};

export const rejectCampaignRequest = {
	name: "rejectCampaignRequest",
	buildUrl: (scopeId, id) => buildUrl(["campaigns", scopeId, id, "reject"]),
	verb: "POST",
};

export const releaseEntityLockRequest = {
	name: "releaseEntityLockRequest",
	buildUrl: (scopeId, entity, entityId) => buildUrl(["locking", scopeId, "entity", entity, entityId, "releaseLock"]),
	verb: "POST",
};

export const releaseOrderLockForShipmentRequest = {
	name: "releaseOrderLockForShipmentRequest",
	buildUrl: (scopeId, orderId) => buildUrl(["processedOrders", scopeId, orderId, "releaselock"]),
	verb: "POST",
};

export const removeAddressRequest = {
	name: "removeAddressRequest",
	buildUrl: addressId => buildUrl(["addresses", addressId]),
	verb: "DELETE",
};

export const removeAllLineItemsRequest = {
	name: "removeAllLineItemsRequest",
	buildUrl: (scopeId, customerId, cartName, queryParams) =>
		buildUrl(["carts", scopeId, customerId, cartName, "removeAllLineItems"], queryParams),
	verb: "DELETE",
};

export const removeCouponRequest = {
	name: "removeCouponRequest",
	buildUrl: (scopeId, customerId, cartName, couponCode, queryParams) =>
		buildUrl(["carts", scopeId, customerId, cartName, "coupons", couponCode], queryParams),
	verb: "DELETE",
};

export const removeCustomerAddressRequest = {
	name: "removeCustomerAddressRequest",
	buildUrl: (customerId, addressId) => buildUrl(["addresses", "customer", customerId, addressId]),
	verb: "DELETE",
};

export const removeCustomersFromOrganizationRequest = {
	name: "removeCustomersFromOrganizationRequest",
	buildUrl: (scopeId, queryParams) => buildUrl(["organizations", scopeId, "customers"], queryParams),
	verb: "DELETE",
};

export const removeFulfillmentCompetitionLocationsRequest = {
	name: "removeFulfillmentCompetitionLocationsRequest",
	buildUrl: (scopeId, fulfillmentCompetitionId, queryParams) =>
		buildUrl(["fulfillments", "competitions", scopeId, fulfillmentCompetitionId, "locations"], queryParams),
	verb: "DELETE",
};

export const removeLineItemRequest = {
	name: "removeLineItemRequest",
	buildUrl: (scopeId, customerId, cartName, id, queryParams) =>
		buildUrl(["carts", scopeId, customerId, cartName, "lineItems", id], queryParams),
	verb: "DELETE",
};

export const removeLineItemsInShipmentRequest = {
	name: "removeLineItemsInShipmentRequest",
	buildUrl: (scopeId, customerId, cartName, shipmentId, queryParams) =>
		buildUrl(["carts", scopeId, customerId, cartName, "shipments", shipmentId, "lineItems"], queryParams),
	verb: "DELETE",
};

export const removeLineItemsRequest = {
	name: "removeLineItemsRequest",
	buildUrl: (scopeId, customerId, cartName, queryParams) =>
		buildUrl(["carts", scopeId, customerId, cartName, "lineItems", "batch"], queryParams),
	verb: "DELETE",
};

export const removeOrganizationsToCustomerRequest = {
	name: "removeOrganizationsToCustomerRequest",
	buildUrl: (scopeId, customerId, queryParams) =>
		buildUrl(["customers", scopeId, customerId, "organizations"], queryParams),
	verb: "DELETE",
};

export const removeStoresFromCustomerRequest = {
	name: "removeStoresFromCustomerRequest",
	buildUrl: (scopeId, customerId, queryParams) => buildUrl(["customers", scopeId, customerId, "stores"], queryParams),
	verb: "DELETE",
};

export const removePaymentRequest = {
	name: "removePaymentRequest",
	buildUrl: (scopeId, customerId, cartName, id, queryParams) =>
		buildUrl(["carts", scopeId, customerId, cartName, "payments", id], queryParams),
	verb: "DELETE",
};

export const removeRoleChildRequest = {
	name: "removeRoleChildRequest",
	buildUrl: (parentRoleId, childRoleId, queryParams) => buildUrl(["roles", parentRoleId, childRoleId], queryParams),
	verb: "DELETE",
};

export const removeRoleChildrenRequest = {
	name: "removeRoleChildrenRequest",
	buildUrl: (parentRoleId, queryParams) => buildUrl(["roles", parentRoleId, "child"], queryParams),
	verb: "DELETE",
};

export const removeScheduledTaskTriggerRequest = {
	name: "removeScheduledTaskTriggerRequest",
	buildUrl: (taskGroup, taskName, triggerGroup, triggerName) =>
		buildUrl(["tasks", "scheduled", taskGroup, taskName, "triggers", triggerGroup, triggerName]),
	verb: "DELETE",
};

export const removeScopeAssociationRequest = {
	name: "removeScopeAssociationRequest",
	buildUrl: (scopeId, entityTypeName, entityId) =>
		buildUrl(["customProfiles", scopeId, entityTypeName, entityId, "scopes"]),
	verb: "DELETE",
};

export const removeShipmentRequest = {
	name: "removeShipmentRequest",
	buildUrl: (scopeId, customerId, cartName, id, queryParams) =>
		buildUrl(["carts", scopeId, customerId, cartName, "shipments", id], queryParams),
	verb: "DELETE",
};

export const removeUserFromGroupRequest = {
	name: "removeUserFromGroupRequest",
	buildUrl: (groupId, userName) => buildUrl(["groups", groupId, userName]),
	verb: "DELETE",
};

export const renderOrderShipmentTemplateRequest = {
	name: "renderOrderShipmentTemplateRequest",
	buildUrl: (scopeId, orderId, shipmentId, queryParams) =>
		buildUrl(["orders", scopeId, orderId, "shipments", shipmentId, "renderTemplate"], queryParams),
	verb: "GET",
};

export const repairProductInheritanceRequest = {
	name: "repairProductInheritanceRequest",
	buildUrl: (scopeId, productId) => buildUrl(["products", scopeId, productId, "repairInheritance"]),
	verb: "PUT",
};

export const reportShipmentFulfillmentFailureRequest = {
	name: "reportShipmentFulfillmentFailureRequest",
	buildUrl: (scopeId, orderId, shipmentId) =>
		buildUrl(["orders", scopeId, orderId, "shipments", shipmentId, "state", "failure"]),
	verb: "POST",
};

export const rescheduleRecurringCartRequest = {
	name: "rescheduleRecurringCartRequest",
	buildUrl: (scopeId, cartName) => buildUrl(["recurringOrders", scopeId, "cart", cartName, "reschedule"]),
	verb: "PUT",
};

export const reserveAvailabilitySlotRequest = {
	name: "reserveAvailabilitySlotRequest",
	buildUrl: fulfillmentLocationId => buildUrl(["fulfillmentLocations", "reserveSlot", fulfillmentLocationId]),
	verb: "POST",
};

export const reserveInventoryItemsRequest = {
	name: "reserveInventoryItemsRequest",
	buildUrl: ownerId => buildUrl(["inventoryItems", "reservations", ownerId]),
	verb: "POST",
};

export const reserveTimeSlotRequest = {
	name: "reserveTimeSlotRequest",
	buildUrl: (scopeId, customerId, cartName, shipmentId, timeSlotId) =>
		buildUrl(["carts", scopeId, customerId, cartName, "shipments", shipmentId, timeSlotId]),
	verb: "POST",
};

export const resetFulfillmentLocationTimeSlotsRequest = {
	name: "resetFulfillmentLocationTimeSlotsRequest",
	buildUrl: (scopeId, fulfillmentLocationId, fulfillmentMethodType) =>
		buildUrl(["fulfillmentLocations", scopeId, fulfillmentLocationId, fulfillmentMethodType, "slots", "reset"]),
	verb: "PUT",
};

export const resetPasswordRequest = {
	name: "resetPasswordRequest",
	buildUrl: scopeId => buildUrl(["membership", scopeId, "ResetPassword"]),
	verb: "POST",
};

export const resetPaymentProviderStoreSettingsRequest = {
	name: "resetPaymentProviderStoreSettingsRequest",
	buildUrl: (scopeId, providerId, storeId) =>
		buildUrl(["providers", scopeId, "payment", providerId, "storesSettings", storeId]),
	verb: "DELETE",
};

export const resetUserPasswordRequest = {
	name: "resetUserPasswordRequest",
	buildUrl: userName => buildUrl(["users", userName, "resetUserPassword"]),
	verb: "PUT",
};

export const restartShipmentFulfillmentProcessingRequest = {
	name: "restartShipmentFulfillmentProcessingRequest",
	buildUrl: (scopeId, orderId, shipmentId) =>
		buildUrl(["orders", scopeId, orderId, "shipments", shipmentId, "fulfillmentState", "restartTask"]),
	verb: "POST",
};

export const resumeOrderRequest = {
	name: "resumeOrderRequest",
	buildUrl: (scopeId, orderId) => buildUrl(["orders", scopeId, orderId, "resume"]),
	verb: "POST",
};

export const revertProductChangesRequest = {
	name: "revertProductChangesRequest",
	buildUrl: scopeId => buildUrl(["products", scopeId, "revert"]),
	verb: "POST",
};

export const revokeAuthorizationRequest = {
	name: "revokeAuthorizationRequest",
	buildUrl: (roleId, objectId, queryParams) => buildUrl(["authorizations", roleId, objectId], queryParams),
	verb: "DELETE",
};

export const revokeAuthorizationsRequest = {
	name: "revokeAuthorizationsRequest",
	buildUrl: (objectId, queryParams) => buildUrl(["authorizations", objectId], queryParams),
	verb: "DELETE",
};

export const roleIsHierarchicalChildOfParentRolesRequest = {
	name: "roleIsHierarchicalChildOfParentRolesRequest",
	buildUrl: childRoleId => buildUrl(["roles", childRoleId, "childOf"]),
	verb: "POST",
};

export const saveCustomRoleRequest = {
	name: "saveCustomRoleRequest",
	buildUrl: roleId => buildUrl(["roles", "custom", roleId]),
	verb: "PUT",
};

export const saveGroupRequest = {
	name: "saveGroupRequest",
	buildUrl: groupId => buildUrl(["groups", groupId]),
	verb: "PUT",
};

export const saveOrderRequest = {
	name: "saveOrderRequest",
	buildUrl: (scopeId, orderId) => buildUrl(["orders", scopeId, orderId]),
	verb: "POST",
};

export const savePickingMissionAssemblyProgressRequest = {
	name: "savePickingMissionAssemblyProgressRequest",
	buildUrl: (scopeId, id) => buildUrl(["pickingMissions", scopeId, id, "saveAssemblyProgress"]),
	verb: "PUT",
};

export const saveProcessedOrderRequest = {
	name: "saveProcessedOrderRequest",
	buildUrl: (scopeId, orderId) => buildUrl(["processedOrders", scopeId, orderId]),
	verb: "POST",
};

export const saveUserApplicationRequest = {
	name: "saveUserApplicationRequest",
	buildUrl: applicationId => buildUrl(["my", "application", applicationId]),
	verb: "POST",
};

export const saveUserCultureRequest = {
	name: "saveUserCultureRequest",
	buildUrl: cultureIso => buildUrl(["my", "culture", cultureIso]),
	verb: "POST",
};

export const saveUserRequest = {
	name: "saveUserRequest",
	buildUrl: userName => buildUrl(["users", userName]),
	verb: "PUT",
};

export const saveUserScopeRequest = {
	name: "saveUserScopeRequest",
	buildUrl: (module, scopeId) => buildUrl(["my", "scope", module, scopeId]),
	verb: "POST",
};

export const scheduleTaskActivityRequest = {
	name: "scheduleTaskActivityRequest",
	buildUrl: (group, name) => buildUrl(["tasks", "scheduled", "activities", group, name]),
	verb: "POST",
};

export const scheduleTaskWorkflowRequest = {
	name: "scheduleTaskWorkflowRequest",
	buildUrl: (group, name) => buildUrl(["tasks", "scheduled", "workflows", group, name]),
	verb: "POST",
};

export const searchAvailableProductsByCategoryRequest = {
	name: "searchAvailableProductsByCategoryRequest",
	buildUrl: (scopeId, cultureName, categoryName) =>
		buildUrl(["search", scopeId, cultureName, "availableProducts", "byCategory", categoryName]),
	verb: "POST",
};

export const searchAvailableProductsRequest = {
	name: "searchAvailableProductsRequest",
	buildUrl: (scopeId, cultureName) => buildUrl(["search", scopeId, cultureName, "availableProducts"]),
	verb: "POST",
};

export const searchBySearchQueryRequest = {
	name: "searchBySearchQueryRequest",
	buildUrl: (scopeId, cultureName, queryType, queryName) =>
		buildUrl(["search", scopeId, cultureName, "bySearchQuery", queryType, queryName]),
	verb: "POST",
};

export const searchCustomersRequest = {
	name: "searchCustomersRequest",
	buildUrl: (scopeId, cultureName) => buildUrl(["search", scopeId, cultureName, "customers"]),
	verb: "POST",
};

export const searchProductByIdsRequest = {
	name: "searchProductByIdsRequest",
	buildUrl: (scopeId, cultureName) => buildUrl(["search", scopeId, cultureName, "products", "byIds"]),
	verb: "POST",
};

export const searchProductBySavedQueryRequest = {
	name: "searchProductBySavedQueryRequest",
	buildUrl: (scopeId, cultureName, queryId) =>
		buildUrl(["search", scopeId, cultureName, "products", "bySavedQuery", queryId]),
	verb: "POST",
};

export const searchProductRequest = {
	name: "searchProductRequest",
	buildUrl: (scopeId, cultureName) => buildUrl(["search", scopeId, cultureName, "products"]),
	verb: "POST",
};

export const searchSimilarProductsRequest = {
	name: "searchSimilarProductsRequest",
	buildUrl: (scopeId, cultureName, productId) =>
		buildUrl(["search", scopeId, cultureName, "products", "similar", productId]),
	verb: "POST",
};

export const setAdjustmentOrderRequest = {
	name: "setAdjustmentOrderRequest",
	buildUrl: (scopeId, orderId, shipmentId) =>
		buildUrl(["orders", scopeId, orderId, "shipments", shipmentId, "adjustment"]),
	verb: "PUT",
};

export const setAdjustmentRequest = {
	name: "setAdjustmentRequest",
	buildUrl: (scopeId, customerId, cartName, shipmentId) =>
		buildUrl(["carts", scopeId, customerId, cartName, "shipments", shipmentId, "adjustment"]),
	verb: "PUT",
};

export const setApplicationVisibilityRequest = {
	name: "setApplicationVisibilityRequest",
	buildUrl: applicationId => buildUrl(["applications", applicationId, "visibility"]),
	verb: "PUT",
};

export const setDefaultCultureRequest = {
	name: "setDefaultCultureRequest",
	buildUrl: () => buildUrl(["cultures", "default"]),
	verb: "PUT",
};

export const setDefaultCustomerPaymentMethodRequest = {
	name: "setDefaultCustomerPaymentMethodRequest",
	buildUrl: (scopeId, customerId, paymentProviderName, paymentMethodId) =>
		buildUrl(["customers", scopeId, customerId, paymentProviderName, "paymentMethods", paymentMethodId, "default"]),
	verb: "PUT",
};

export const setFulfillmentLocationInventoryManagementRequest = {
	name: "setFulfillmentLocationInventoryManagementRequest",
	buildUrl: (scopeId, fulfillmentLocationId) =>
		buildUrl(["fulfillmentLocations", scopeId, fulfillmentLocationId, "inventory"]),
	verb: "PUT",
};

export const setSupportedCulturesRequest = {
	name: "setSupportedCulturesRequest",
	buildUrl: () => buildUrl(["cultures"]),
	verb: "PUT",
};

export const settlePaymentOrderRequest = {
	name: "settlePaymentOrderRequest",
	buildUrl: (scopeId, orderId, paymentId) => buildUrl(["orders", scopeId, orderId, "payments", paymentId, "settle"]),
	verb: "POST",
};

export const settlePaymentRequest = {
	name: "settlePaymentRequest",
	buildUrl: (scopeId, customerId, cartName, paymentId) =>
		buildUrl(["carts", scopeId, customerId, cartName, "payments", paymentId, "settle"]),
	verb: "POST",
};

export const shipmentSplitRequest = {
	name: "shipmentSplitRequest",
	buildUrl: (scopeId, orderId, shipmentId) => buildUrl(["orders", scopeId, orderId, "shipments", shipmentId, "split"]),
	verb: "PUT",
};

export const signInRequest = {
	name: "signInRequest",
	buildUrl: () => buildUrl(["authentication", "signin"]),
	verb: "POST",
};

export const signInWithCredentialsRequest = {
	name: "signInWithCredentialsRequest",
	buildUrl: () => buildUrl(["authentication", "signinwithcredentials"]),
	verb: "POST",
};

export const signInWithIssuedTokenRequest = {
	name: "signInWithIssuedTokenRequest",
	buildUrl: () => buildUrl(["authentication", "signinwithtoken"]),
	verb: "POST",
};

export const signInWithJWTRequest = {
	name: "signInWithJWTRequest",
	buildUrl: () => buildUrl(["authentication", "signinwithjwt"]),
	verb: "POST",
};

export const signOutRequest = {
	name: "signOutRequest",
	buildUrl: () => buildUrl(["authentication", "signout"]),
	verb: "POST",
};

export const startNewShipmentFulfillmentWorkflowRequest = {
	name: "startNewShipmentFulfillmentWorkflowRequest",
	buildUrl: (scopeId, orderId, shipmentId) =>
		buildUrl(["orders", scopeId, orderId, "shipments", shipmentId, "fulfillmentState", "startNewWorkflow"]),
	verb: "POST",
};

export const startPickingMissionAssemblyRequest = {
	name: "startPickingMissionAssemblyRequest",
	buildUrl: (scopeId, id) => buildUrl(["pickingMissions", scopeId, id, "startAssembly"]),
	verb: "POST",
};

export const submitCampaignRequest = {
	name: "submitCampaignRequest",
	buildUrl: (scopeId, id) => buildUrl(["campaigns", scopeId, id, "submit"]),
	verb: "POST",
};

export const submitCartOrderDraftRequest = {
	name: "submitCartOrderDraftRequest",
	buildUrl: (scopeId, customerId, orderId) =>
		buildUrl(["orders", scopeId, customerId, orderId, "orderDraft", "submit"]),
	verb: "POST",
};

export const syncProductRequest = {
	name: "syncProductRequest",
	buildUrl: (scopeId, productId) => buildUrl(["products", "sync", scopeId, productId]),
	verb: "PUT",
};

export const transferFulfillmentPackageItemsRequest = {
	name: "transferFulfillmentPackageItemsRequest",
	buildUrl: scopeId => buildUrl(["fulfillments", "packages", scopeId, "transferFulfillmentPackageItems"]),
	verb: "POST",
};

export const tryAcquireOrderLockForShipmentRequest = {
	name: "tryAcquireOrderLockForShipmentRequest",
	buildUrl: (scopeId, orderId) => buildUrl(["processedOrders", scopeId, orderId, "lock"]),
	verb: "POST",
};

export const unassignPickerFromPickingMissionRequest = {
	name: "unassignPickerFromPickingMissionRequest",
	buildUrl: (scopeId, id) => buildUrl(["pickingMissions", scopeId, id, "unassignPicker"]),
	verb: "POST",
};

export const unlockUserRequest = {
	name: "unlockUserRequest",
	buildUrl: (scopeId, userName) => buildUrl(["membership", scopeId, "UnlockUser", userName]),
	verb: "POST",
};

export const updateAddressRequest = {
	name: "updateAddressRequest",
	buildUrl: addressId => buildUrl(["addresses", addressId]),
	verb: "PUT",
};

export const updateBillingAddressRequest = {
	name: "updateBillingAddressRequest",
	buildUrl: (scopeId, customerId, cartName, paymentId) =>
		buildUrl(["carts", scopeId, customerId, cartName, "payments", paymentId, "billingAddress"]),
	verb: "PUT",
};

export const updateCampaignRequest = {
	name: "updateCampaignRequest",
	buildUrl: (scopeId, id) => buildUrl(["campaigns", scopeId, id]),
	verb: "PUT",
};

export const updateCampaignStatusRequest = {
	name: "updateCampaignStatusRequest",
	buildUrl: (scopeId, id) => buildUrl(["campaigns", scopeId, id, "status"]),
	verb: "PUT",
};

export const updateCarrierProviderRequest = {
	name: "updateCarrierProviderRequest",
	buildUrl: (scopeId, id) => buildUrl(["providers", scopeId, "carrier", id]),
	verb: "PUT",
};

export const updateCartRequest = {
	name: "updateCartRequest",
	buildUrl: (scopeId, customerId, cartName) => buildUrl(["carts", scopeId, customerId, cartName]),
	verb: "PUT",
};

export const updateCatalogRequest = {
	name: "updateCatalogRequest",
	buildUrl: catalogId => buildUrl(["catalogs", catalogId]),
	verb: "PUT",
};

export const updateCategoryDefinitionRequest = {
	name: "updateCategoryDefinitionRequest",
	buildUrl: name => buildUrl(["metadata", "definitions", "category", name]),
	verb: "PUT",
};

export const updateCategoryRequest = {
	name: "updateCategoryRequest",
	buildUrl: (scopeId, categoryId) => buildUrl(["categories", scopeId, categoryId]),
	verb: "POST",
};

export const updateCategorySequenceRequest = {
	name: "updateCategorySequenceRequest",
	buildUrl: (scopeId, categoryId) => buildUrl(["categories", scopeId, categoryId, "children", "sequence"]),
	verb: "POST",
};

export const updateCategoryV2Request = {
	name: "updateCategoryV2Request",
	buildUrl: (scopeId, categoryId) => buildUrl(["categories", "v2", scopeId, categoryId]),
	verb: "PUT",
};

export const updateCountryAndRegionsRequest = {
	name: "updateCountryAndRegionsRequest",
	buildUrl: isoCode => buildUrl(["countries", isoCode]),
	verb: "PUT",
};

export const updateCustomProfileRequest = {
	name: "updateCustomProfileRequest",
	buildUrl: (scopeId, entityTypeName, entityId) => buildUrl(["customProfiles", scopeId, entityTypeName, entityId]),
	verb: "PUT",
};

export const updateCustomerAddressRequest = {
	name: "updateCustomerAddressRequest",
	buildUrl: (customerId, addressId) => buildUrl(["addresses", "customer", customerId, addressId]),
	verb: "PUT",
};

export const updateCustomerPaymentProfileRequest = {
	name: "updateCustomerPaymentProfileRequest",
	buildUrl: (scopeId, customerId, paymentProviderName) =>
		buildUrl(["customers", scopeId, customerId, paymentProviderName, "paymentProfile"]),
	verb: "PUT",
};

export const updateCustomerRequest = {
	name: "updateCustomerRequest",
	buildUrl: (scopeId, customerId) => buildUrl(["customers", scopeId, customerId]),
	verb: "PUT",
};

export const updateCustomerSummaryRequest = {
	name: "updateCustomerSummaryRequest",
	buildUrl: (scopeId, customerId, cartName) => buildUrl(["carts", scopeId, customerId, cartName, "customer"]),
	verb: "PUT",
};

export const updateFulfillmentLocationTimeSlotRequest = {
	name: "updateFulfillmentLocationTimeSlotRequest",
	buildUrl: (scopeId, fulfillmentLocationId, fulfillmentMethodType, slotId) =>
		buildUrl(["fulfillmentLocations", scopeId, fulfillmentLocationId, fulfillmentMethodType, "slots", slotId]),
	verb: "PUT",
};

export const updateFulfillmentLocationTimeSlotReservationRequest = {
	name: "updateFulfillmentLocationTimeSlotReservationRequest",
	buildUrl: (scopeId, fulfillmentLocationId, slotReservationId) =>
		buildUrl(["fulfillmentLocations", scopeId, fulfillmentLocationId, "reservations", slotReservationId]),
	verb: "PUT",
};

export const updateFulfillmentPackageRequest = {
	name: "updateFulfillmentPackageRequest",
	buildUrl: (scopeId, id) => buildUrl(["fulfillments", "packages", scopeId, id]),
	verb: "PUT",
};

export const updateFulfillmentPackageTypeRequest = {
	name: "updateFulfillmentPackageTypeRequest",
	buildUrl: (scopeId, id) => buildUrl(["fulfillments", "packageTypes", scopeId, id]),
	verb: "PUT",
};

export const updateFulfillmentProviderRequest = {
	name: "updateFulfillmentProviderRequest",
	buildUrl: (scopeId, id) => buildUrl(["providers", scopeId, "fulfillment", id]),
	verb: "PUT",
};

export const updateInventoryScheduleRequest = {
	name: "updateInventoryScheduleRequest",
	buildUrl: inventoryLocationId => buildUrl(["inventoryLocations", inventoryLocationId, "schedules"]),
	verb: "PUT",
};

export const updateLineItemRequest = {
	name: "updateLineItemRequest",
	buildUrl: (scopeId, customerId, cartName, id) => buildUrl(["carts", scopeId, customerId, cartName, "lineItems", id]),
	verb: "PUT",
};

export const updateMarketingLookupTypeDefinitionRequest = {
	name: "updateMarketingLookupTypeDefinitionRequest",
	buildUrl: lookupName => buildUrl(["metadata", "LookupType", "Marketing", lookupName]),
	verb: "POST",
};

export const updateMarketingSettingsRequest = {
	name: "updateMarketingSettingsRequest",
	buildUrl: () => buildUrl(["marketing", "settings"]),
	verb: "PUT",
};

export const updateMediaResizedInstancesRequest = {
	name: "updateMediaResizedInstancesRequest",
	buildUrl: (scopeId, productId, mediaId) => buildUrl(["products", scopeId, productId, "media", mediaId, "resized"]),
	verb: "PUT",
};

export const updateMediaSettingsRequest = {
	name: "updateMediaSettingsRequest",
	buildUrl: () => buildUrl(["products", "media", "settings"]),
	verb: "PUT",
};

export const updateOrderDraftPaymentRequest = {
	name: "updateOrderDraftPaymentRequest",
	buildUrl: (scopeId, draftId, paymentId) => buildUrl(["orderdraft", scopeId, draftId, "payment", paymentId]),
	verb: "POST",
};

export const updateOrderLookupTypeDefinitionRequest = {
	name: "updateOrderLookupTypeDefinitionRequest",
	buildUrl: lookupName => buildUrl(["metadata", "lookups", "order", lookupName]),
	verb: "PUT",
};

export const updateOrderSettingsRequest = {
	name: "updateOrderSettingsRequest",
	buildUrl: () => buildUrl(["orders", "settings"]),
	verb: "PUT",
};

export const updateOrganizationRequest = {
	name: "updateOrganizationRequest",
	buildUrl: (scopeId, organizationId) => buildUrl(["organizations", scopeId, organizationId]),
	verb: "PUT",
};

export const updatePaymentAmountRequest = {
	name: "updatePaymentAmountRequest",
	buildUrl: (scopeId, customerId, cartName, paymentId) =>
		buildUrl(["carts", scopeId, customerId, cartName, "payments", paymentId, "amount"]),
	verb: "PUT",
};

export const updatePaymentMethodRequest = {
	name: "updatePaymentMethodRequest",
	buildUrl: (scopeId, customerId, cartName, paymentId) =>
		buildUrl(["carts", scopeId, customerId, cartName, "payments", paymentId, "method"]),
	verb: "PUT",
};

export const updatePaymentProviderRequest = {
	name: "updatePaymentProviderRequest",
	buildUrl: (scopeId, id) => buildUrl(["providers", scopeId, "payment", id]),
	verb: "PUT",
};

export const updatePaymentRequest = {
	name: "updatePaymentRequest",
	buildUrl: (scopeId, customerId, cartName, id) => buildUrl(["carts", scopeId, customerId, cartName, "payments", id]),
	verb: "PUT",
};

export const updatePickingMissionRequest = {
	name: "updatePickingMissionRequest",
	buildUrl: (scopeId, id) => buildUrl(["pickingMissions", scopeId, id]),
	verb: "PUT",
};

export const updatePreferredStoreRequest = {
	name: "updatePreferredStoreRequest",
	buildUrl: (scopeId, customerId) => buildUrl(["customers", scopeId, customerId, "preferred", "store"]),
	verb: "PUT",
};

export const updatePriceListEntryRequest = {
	name: "updatePriceListEntryRequest",
	buildUrl: (scopeId, productId) => buildUrl(["products", scopeId, productId, "priceListEntries"]),
	verb: "PUT",
};

export const updatePriceListRequest = {
	name: "updatePriceListRequest",
	buildUrl: (scopeId, priceListId) => buildUrl(["products", scopeId, "priceLists", priceListId]),
	verb: "PUT",
};

export const updateProductAttributeGroupRequest = {
	name: "updateProductAttributeGroupRequest",
	buildUrl: name => buildUrl(["metadata", "attributegroups", "product", name]),
	verb: "PUT",
};

export const updateProductAttributeRequest = {
	name: "updateProductAttributeRequest",
	buildUrl: attributeName => buildUrl(["metadata", "attributes", "product", attributeName]),
	verb: "PUT",
};

export const updateProductDefinitionRequest = {
	name: "updateProductDefinitionRequest",
	buildUrl: name => buildUrl(["metadata", "definitions", "product", name]),
	verb: "PUT",
};

export const updateProductDraftRequest = {
	name: "updateProductDraftRequest",
	buildUrl: (scopeId, productId) => buildUrl(["products", scopeId, "draft", productId]),
	verb: "POST",
};

export const updateProductLookupTypeDefinitionRequest = {
	name: "updateProductLookupTypeDefinitionRequest",
	buildUrl: lookupName => buildUrl(["metadata", "lookups", "product", lookupName]),
	verb: "PUT",
};

export const updateProductPublicationStatusRequest = {
	name: "updateProductPublicationStatusRequest",
	buildUrl: scopeId => buildUrl(["products", scopeId, "publicationStatus"]),
	verb: "POST",
};

export const updateProductRequest = {
	name: "updateProductRequest",
	buildUrl: (scopeId, productId) => buildUrl(["products", scopeId, productId]),
	verb: "PUT",
};

export const updateProductSettingsRequest = {
	name: "updateProductSettingsRequest",
	buildUrl: () => buildUrl(["products", "settings"]),
	verb: "PUT",
};

export const updateProfileAttributeGroupRequest = {
	name: "updateProfileAttributeGroupRequest",
	buildUrl: name => buildUrl(["metadata", "attributegroups", "profile", name]),
	verb: "PUT",
};

export const updatePromotionRequest = {
	name: "updatePromotionRequest",
	buildUrl: (scopeId, campaignId, promotionId) =>
		buildUrl(["campaigns", scopeId, campaignId, "promotions", promotionId]),
	verb: "PUT",
};

export const updateRecurringOrderProgramRequest = {
	name: "updateRecurringOrderProgramRequest",
	buildUrl: recurringOrderProgramName => buildUrl(["recurringOrders", "programs", recurringOrderProgramName]),
	verb: "PUT",
};

export const updateRmaRequest = {
	name: "updateRmaRequest",
	buildUrl: (scopeId, orderNumber, rmaNumber) => buildUrl(["orders", "RMA", scopeId, orderNumber, rmaNumber]),
	verb: "PUT",
};

export const updateRoleRequest = {
	name: "updateRoleRequest",
	buildUrl: id => buildUrl(["roles", id]),
	verb: "PUT",
};

export const updateRoutingProviderRequest = {
	name: "updateRoutingProviderRequest",
	buildUrl: (scopeId, id) => buildUrl(["providers", scopeId, "routing", id]),
	verb: "PUT",
};

export const updateScopeAssociationsRequest = {
	name: "updateScopeAssociationsRequest",
	buildUrl: (scopeId, entityTypeName, entityId) =>
		buildUrl(["customProfiles", scopeId, entityTypeName, entityId, "scopes"]),
	verb: "PUT",
};

export const updateScopeRequest = {
	name: "updateScopeRequest",
	buildUrl: scopeId => buildUrl(["scopes", scopeId]),
	verb: "PUT",
};

export const updateSearchQueryRequest = {
	name: "updateSearchQueryRequest",
	buildUrl: (scopeId, queryType, name) => buildUrl(["searchqueries", scopeId, queryType, name]),
	verb: "PUT",
};

export const updateSegmentRequest = {
	name: "updateSegmentRequest",
	buildUrl: () => buildUrl(["segment"]),
	verb: "PUT",
};

export const updateShipmentDocumentRequest = {
	name: "updateShipmentDocumentRequest",
	buildUrl: (scopeId, orderId, shipmentId, name) =>
		buildUrl(["orders", scopeId, orderId, "shipments", shipmentId, "documents", name]),
	verb: "PUT",
};

export const updateShipmentFulfillmentStateRequest = {
	name: "updateShipmentFulfillmentStateRequest",
	buildUrl: (scopeId, orderId, shipmentId) => buildUrl(["orders", scopeId, orderId, "shipments", shipmentId, "state"]),
	verb: "PUT",
};

export const updateShipmentFulfillmentWorkflowXamlPathRequest = {
	name: "updateShipmentFulfillmentWorkflowXamlPathRequest",
	buildUrl: (scopeId, orderId, shipmentId) =>
		buildUrl(["orders", scopeId, orderId, "shipments", shipmentId, "WorkflowXamlPath"]),
	verb: "PUT",
};

export const updateShipmentRequest = {
	name: "updateShipmentRequest",
	buildUrl: (scopeId, customerId, cartName, id) => buildUrl(["carts", scopeId, customerId, cartName, "shipments", id]),
	verb: "PUT",
};

export const updateStoreRequest = {
	name: "updateStoreRequest",
	buildUrl: (scopeId, storeId) => buildUrl(["stores", scopeId, storeId]),
	verb: "PUT",
};

export const updateStoreScopeAssociationRequest = {
	name: "updateStoreScopeAssociationRequest",
	buildUrl: (scopeId, id) => buildUrl(["stores", scopeId, id, "associatedScope"]),
	verb: "PUT",
};

export const updateTaxProviderRequest = {
	name: "updateTaxProviderRequest",
	buildUrl: (scopeId, id) => buildUrl(["providers", scopeId, "tax", id]),
	verb: "PUT",
};

export const updateTemplateRequest = {
	name: "updateTemplateRequest",
	buildUrl: (scopeId, type, name, culture) => buildUrl(["templates", scopeId, type, name, culture]),
	verb: "PUT",
};

export const updateVariantsPriceListEntryRequest = {
	name: "updateVariantsPriceListEntryRequest",
	buildUrl: (scopeId, productId, priceListId) =>
		buildUrl(["products", scopeId, productId, "variantsPrices", priceListId]),
	verb: "PUT",
};

export const updateWarehouseRequest = {
	name: "updateWarehouseRequest",
	buildUrl: (scopeId, id) => buildUrl(["warehouses", scopeId, id]),
	verb: "PUT",
};

export const updateWarehouseScopeAssociationsRequest = {
	name: "updateWarehouseScopeAssociationsRequest",
	buildUrl: (scopeId, id) => buildUrl(["warehouses", scopeId, id, "associatedScopes"]),
	verb: "PUT",
};

export const uploadMediaRequest = {
	name: "uploadMediaRequest",
	buildUrl: (scopeId, productId) => buildUrl(["products", "media", scopeId, productId, "upload"]),
	verb: "POST",
};

export const validatePromoCodeRequest = {
	name: "validatePromoCodeRequest",
	buildUrl: (scopeId, promotionId, promoCode) =>
		buildUrl(["promotions", scopeId, promotionId, "promoCodes", promoCode, "validate"]),
	verb: "POST",
};

export const validateProviderSettingsRequest = {
	name: "validateProviderSettingsRequest",
	buildUrl: queryParams => buildUrl(["providers", "validateProviderSettings"], queryParams),
	verb: "GET",
};

export const validateUserRequest = {
	name: "validateUserRequest",
	buildUrl: scopeId => buildUrl(["membership", scopeId, "Validate"]),
	verb: "PUT",
};

export const voidPaymentRequest = {
	name: "voidPaymentRequest",
	buildUrl: (scopeId, customerId, cartName, paymentId) =>
		buildUrl(["carts", scopeId, customerId, cartName, "payments", paymentId, "void"]),
	verb: "POST",
};
