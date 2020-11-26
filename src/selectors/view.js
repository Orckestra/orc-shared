import { createSelector } from "reselect";
import { selectCurrentModuleName } from "./navigation";

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
    const modifiedSections = [];
    if (data != null) {
      const dataJS = data.toJS();
      const sections = dataJS[moduleName][entityId];
      if (sections != null) {
        const sectionsKeys = Object.keys(sections);
        for (const sectionKey of sectionsKeys) {
          if (sections[sectionKey].wasEdited === true) {
            modifiedSections.push(sectionKey);
          }
        }
      }
    }

    return modifiedSections;
  },
);

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