import {
	attributeDataType,
	dotNetDataTypes,
	jsonCargoType,
	propertyBagPrimitiveDataType,
	serializationTypeKey,
} from "../constants";
import { isObject } from "./propertyValidator";
import sharedMessages from "../sharedMessages";
import { parseGuid } from "./parseHelper";

export const customDataType = {
	money: "Money",
	priceTieredRateTable: "PriceTieredRateTable",
	quantityTieredRateTable: "QuantityTieredRateTable",
	password: "Password",
	carrierProviderSelector: "CarrierProviderSelector",
	routingProviderSelector: "RoutingProviderSelector",
	multipleCarrierProvidersSelector: "MultipleCarrierProvidersSelector",
};

const tieredAttributeTypes = [customDataType.priceTieredRateTable, customDataType.quantityTieredRateTable];

export const isTieredAttribute = attribute => tieredAttributeTypes.includes(attribute.customDataType);

const buildValueOfType = cargoType => {
	return `ValueOf${cargoType}`;
};

const buildValueContainerOfType = dotNetType => {
	return `Orckestra.Overture.Entities.ValueContainer\`1[[${dotNetType}, mscorlib]], Orckestra.Overture.Entities`;
};

export const createJsonCargo = (cargoType, value) => {
	return {
		__type: buildValueOfType(cargoType),
		value: value,
	};
};

const createTieredTableJsonCargo = tiers => {
	return {
		__type: "Orckestra.Overture.Entities.Orders.TieredRateTable, Orckestra.Overture.Entities",
		tiers: tiers.filter(tier => (tier?.min ?? "") !== ""),
	};
};

export const toJsonCargo = (attribute, value) => {
	switch (attribute.dataType) {
		case attributeDataType.text:
		case attributeDataType.lookup:
		case attributeDataType.radio:
			return value;

		case attributeDataType.boolean:
			return createJsonCargo(jsonCargoType.boolean, value);

		case attributeDataType.integer:
			return createJsonCargo(jsonCargoType.integer, Number(formatNumber(value, 0)));

		case attributeDataType.decimal:
			return createJsonCargo(jsonCargoType.double, Number(value));

		case attributeDataType.dateTime:
			return createJsonCargo(jsonCargoType.dateTime, value);

		case attributeDataType.customType:
			switch (attribute.customDataType) {
				case customDataType.money:
					return createJsonCargo(jsonCargoType.double, Number(formatNumber(value, 2)));
				case customDataType.priceTieredRateTable:
				case customDataType.quantityTieredRateTable:
					return createTieredTableJsonCargo(value);
				case customDataType.password:
				case customDataType.carrierProviderSelector: // To be properly handled when user story 61801 will be addressed
				case customDataType.routingProviderSelector: // To be properly handled when user story 61801 will be addressed
				case customDataType.multipleCarrierProvidersSelector: // To be properly handled when user story 61801 will be addressed
					return value;
				default:
					throw new Error(`toJsonCargo: attribute.customDataType ${attribute.customDataType} is not implemented`);
			}
		case attributeDataType.entityReference:
			return createJsonCargo(jsonCargoType.entityReferences, value);
		default:
			throw new Error(`toJsonCargo: attribute.dataType ${attribute.dataType} is not implemented`);
	}
};

const dataTypesChecker = {
	booleanDataTypes: [
		buildValueOfType(propertyBagPrimitiveDataType.boolean),
		buildValueContainerOfType(dotNetDataTypes.boolean),
	],
	integerDataTypes: [
		buildValueOfType(propertyBagPrimitiveDataType.byte),
		buildValueContainerOfType(dotNetDataTypes.byte),
		buildValueOfType(propertyBagPrimitiveDataType.sbyte),
		buildValueContainerOfType(dotNetDataTypes.sbyte),
		buildValueOfType(propertyBagPrimitiveDataType.int16),
		buildValueContainerOfType(dotNetDataTypes.int16),
		buildValueOfType(propertyBagPrimitiveDataType.uint16),
		buildValueContainerOfType(dotNetDataTypes.uint16),
		buildValueOfType(propertyBagPrimitiveDataType.int32),
		buildValueContainerOfType(dotNetDataTypes.int32),
		buildValueOfType(propertyBagPrimitiveDataType.uint32),
		buildValueContainerOfType(dotNetDataTypes.uint32),
		buildValueOfType(propertyBagPrimitiveDataType.int64),
		buildValueContainerOfType(dotNetDataTypes.int64),
		buildValueOfType(propertyBagPrimitiveDataType.uint64),
		buildValueContainerOfType(dotNetDataTypes.uint64),
	],
	textDataTypes: [
		buildValueOfType(propertyBagPrimitiveDataType.char),
		buildValueContainerOfType(dotNetDataTypes.char),
		buildValueOfType(propertyBagPrimitiveDataType.string),
		buildValueContainerOfType(dotNetDataTypes.string),
	],
	decimalDataTypes: [
		buildValueOfType(propertyBagPrimitiveDataType.single),
		buildValueContainerOfType(dotNetDataTypes.single),
		buildValueOfType(propertyBagPrimitiveDataType.double),
		buildValueContainerOfType(dotNetDataTypes.double),
		buildValueOfType(propertyBagPrimitiveDataType.decimal),
		buildValueContainerOfType(dotNetDataTypes.decimal),
	],
	dateTimeDataTypes: [
		buildValueOfType(propertyBagPrimitiveDataType.dateTime),
		buildValueContainerOfType(dotNetDataTypes.dateTime),
	],
	guidDataTypes: [buildValueOfType(propertyBagPrimitiveDataType.guid), buildValueContainerOfType(dotNetDataTypes.guid)],

	isBoolean: type => dataTypesChecker.booleanDataTypes.includes(type),
	isInteger: type => dataTypesChecker.integerDataTypes.includes(type),
	isText: type => dataTypesChecker.textDataTypes.includes(type),
	isDecimal: type => dataTypesChecker.decimalDataTypes.includes(type),
	isDateTime: type => dataTypesChecker.dateTimeDataTypes.includes(type),
	isGuid: type => dataTypesChecker.guidDataTypes.includes(type),
};

export const getPropertyBagFormattedPrimitiveValue = (propertyBagValue, formatMessage, formatDate, formatTime) => {
	if (propertyBagValue === null || propertyBagValue === undefined || !isObject(propertyBagValue)) {
		return propertyBagValue;
	}

	if (propertyBagValue.value === null || propertyBagValue.value === undefined) {
		return null;
	}

	if (dataTypesChecker.isBoolean(propertyBagValue[serializationTypeKey])) {
		return Boolean(propertyBagValue.value)
			? formatMessage(sharedMessages.valueTypeWrapperTrue)
			: formatMessage(sharedMessages.valueTypeWrapperFalse);
	}

	if (dataTypesChecker.isInteger(propertyBagValue[serializationTypeKey])) {
		return formatNumber(propertyBagValue.value, 0);
	}

	if (dataTypesChecker.isText(propertyBagValue[serializationTypeKey])) {
		return propertyBagValue.value.toString();
	}

	if (dataTypesChecker.isDecimal(propertyBagValue[serializationTypeKey])) {
		return formatNumber(propertyBagValue.value, 2);
	}

	if (dataTypesChecker.isDateTime(propertyBagValue[serializationTypeKey])) {
		return `${formatDate(propertyBagValue.value)} ${formatTime(propertyBagValue.value)}`;
	}

	if (dataTypesChecker.isGuid(propertyBagValue[serializationTypeKey])) {
		return parseGuid(propertyBagValue.value);
	}

	// we ignore other data types since we have no way to format them
	return null;
};

export const formatNumber = (value, precision) => Number(value).toFixed(precision);

export const fixPropertyBagModifiedModel = (model, ...fields) => {
	const fixProfileOperations = model => {
		if (model.hasOwnProperty("profileOperations")) {
			let { profilesToAdd, profilesToUpdate } = model.profileOperations;
			if (profilesToAdd) {
				const items = Array.isArray(profilesToAdd) ? profilesToAdd : Object.values(profilesToAdd);
				items.forEach(pr => {
					fixPropertyBagEmptyValues(pr.propertyBag);
				});
			}
			if (profilesToUpdate) {
				const items = Array.isArray(profilesToUpdate) ? profilesToUpdate : Object.values(profilesToUpdate);
				items.forEach(pr => {
					fixPropertyBagEmptyValues(pr.propertyBag);
				});
			}
		}
	};

	fixPropertyBagEmptyValues(model.propertyBag);
	fixProfileOperations(model);

	fields.forEach(field => {
		let fieldValue = model[field]?.value;
		if (!fieldValue) return;
		if (Array.isArray(fieldValue)) {
			fieldValue.forEach(fieldItem => {
				fixPropertyBagEmptyValues(fieldItem.propertyBag);
				fixProfileOperations(fieldItem);
			});
		} else {
			fixPropertyBagEmptyValues(fieldValue.propertyBag);
		}
	});
};

export const fixPropertyBagEmptyValues = propertyBag => {
	if (!propertyBag) return;
	//we need to pass null to backend to remove attribute instead of empty string
	//in case if attribute has validation for min length and when we will pass empty string, then we will get error from platform
	//in case if DateTime attribute has empty value Backend will transform it to some '01/01/1900' date, so we need to pass null
	const modifiedFields = Object.keys(propertyBag);
	modifiedFields.forEach(propertyName => {
		let property = propertyBag[propertyName];
		let propertyValue = property && isObject(property) && property.hasOwnProperty("value") ? property.value : property;
		if (propertyValue === "") {
			propertyBag[propertyName] = null;
		}
	});
};

export const setRequiredBooleansDefault = (attributes, propertyBag) => {
	const requiredBools = attributes.filter(a => a.isRequired && a.dataType === attributeDataType.boolean);

	requiredBools.forEach(attr => {
		if (!propertyBag[attr.name]) {
			propertyBag[attr.name] = toJsonCargo(attr, false);
		}
	});
};
