import { createSelector } from "reselect";
import { selectCurrentModuleName } from "./navigation";
import { isObjectContainsPropertyWithValue } from "./../utils/propertyHelper";

const modulesData = state => state.get("view");

const editData = createSelector(modulesData, data => data.get("edit"));

export const isEntityUnderEditing = (entityId) => createSelector(
  editData,
  selectCurrentModuleName,
  (data, moduleName) => {
    if (data != null) {
      const dataJS = data.toJS();
      const sections = dataJS[moduleName][entityId];
      if (sections != null) {
        return true;
      }
    }
    return false;
  },
);

export const getModifiedSections = (entityId) => createSelector(
  editData,
  selectCurrentModuleName,
  (data, moduleName) => {
    return getModifiedSectionsFromModule(data, moduleName, entityId);
  },
);

const getModifiedSectionsFromModule = (editData, moduleName, entityId) => {
  const modifiedSections = [];
  if (editData != null) {
    const dataJS = editData.toJS();
    const sections = dataJS[moduleName][entityId];
    if (sections != null) {
      const sectionsKeys = Object.keys(sections);
      for (const sectionKey of sectionsKeys) {
        const sectionModel = sections[sectionKey].model;

        if (sectionModel != null) {
          const wasModified = isObjectContainsPropertyWithValue(sectionModel, "wasModified", true);
          if (wasModified === true) {
            modifiedSections.push(sectionKey);
          }
        }
      }
    }
  }
  return modifiedSections;
}

export const getModifiedTabs = (tabsParams) => createSelector(
  editData,
  selectCurrentModuleName,
  (data, moduleName) => {
    const modifiedTabs = [];

    tabsParams.forEach(tabParams => {
      for (let i = 0; i < tabParams.params.length; i++) {
        const modifiedSections = getModifiedSectionsFromModule(data, moduleName, tabParams.params[i]);
        if (modifiedSections.length > 0) {
          modifiedTabs.push(tabParams.href);
          break;
        }
      }
    });

    return modifiedTabs;
  }
)

export const getModifiedModels = (entityId) => createSelector(
  editData,
  selectCurrentModuleName,
  (data, moduleName) => {
    const models = {};
    if (data != null) {
      const dataJS = data.toJS();
      const sections = dataJS[moduleName][entityId];
      if (sections != null) {
        const sectionsKeys = Object.keys(sections);

        sectionsKeys.forEach(sectionKey => {
          models[sectionKey] = sections[sectionKey].model;
        });
      }
    }
    return models;
  }
);