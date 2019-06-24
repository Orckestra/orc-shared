import { schema } from "normalizr";

const scope = new schema.Entity("scopes");
scope.define({ children: [scope] });

export default scope;
