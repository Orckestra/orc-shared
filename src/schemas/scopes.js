import { schema } from "normalizr";

const scope = new schema.Entity(
	"scopes",
	{},
	{
		processStrategy: (scope, parentScope) => {
			scope.scopePath =
				scope.id === parentScope.id
					? (scope.scopePath = [scope.id])
					: (scope.scopePath = [...parentScope.scopePath, scope.id]);

			return scope;
		},
	},
);
scope.define({ children: [scope] });

export default scope;
