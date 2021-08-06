import { schema } from "normalizr";

export const productDefinitionsSchema = new schema.Entity("definitions", {}, { idAttribute: "name" });
export const productDefinitionsListSchema = [productDefinitionsSchema];
export default productDefinitionsListSchema;
