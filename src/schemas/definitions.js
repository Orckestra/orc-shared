import { schema } from "normalizr";

export const definitionsSchema = new schema.Entity("definitions", {}, { idAttribute: "entityTypeName" });

export const definitionsListSchema = [definitionsSchema];

export default definitionsListSchema;
