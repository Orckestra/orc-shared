import { schema } from "normalizr";

export const countriesSchema = new schema.Entity("countries", {}, { idAttribute: "isoCode" });

export const countriesListSchema = [countriesSchema];

export default countriesListSchema;
