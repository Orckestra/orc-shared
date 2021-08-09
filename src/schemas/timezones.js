import { schema } from "normalizr";

export const timezonesSchema = new schema.Entity("timezones");

export const timezonesListSchema = [timezonesSchema];

export default timezonesListSchema;
