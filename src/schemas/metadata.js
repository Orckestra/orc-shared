import { schema } from "normalizr";

export const profileAttributeGroupsSchema = new schema.Entity("metadata", {}, { idAttribute: "name" });
export const profileAttributeGroupsListSchema = [profileAttributeGroupsSchema];
export default profileAttributeGroupsListSchema;

export const orderAttributeGroupsSchema = new schema.Entity("metadata", {}, { idAttribute: "name" });
export const orderAttributeGroupsListSchema = [orderAttributeGroupsSchema];
