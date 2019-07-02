# Infrastructure helpers

This code can be used to set up the standard infrastructure of Orckestra apps.

## `buildState`

- `reducers`: A plain JS object containing reducer functions as consumed by [`combineReducers()` from `redux-immutable`](https://github.com/gajus/redux-immutable#usage). The returned store will use the keys of the reducers as their keys in the state. Should not contain the keys `locale`, `navigation`, `router`, `requests`, `toasts`, or `view`, as these are in use for internationalization, navigation info, routing, request tracking and view data, respectively.
- `devOptions`: An options object for the dev tools, as described in the [Redux dev tools documentation](https://github.com/zalmoxisus/redux-devtools-extension/blob/master/docs/API/Arguments.md).

Constructs a state store with support for dev tools (as browser extension), routing, localization, API access and Immutable state.

## `addLocales`

- All parameters should be locale names, specifying only the language portion (i.e. 'en' rather than 'en-US'). An arbitrary number of names can be specified in a single call.

Loads in locale data for `react-intl` for the given top-level locales. Usually not needed in the app, used by `localeFactory` to ensure locale data is loaded for the supported locales.

## spawnerMiddleware

This middleware is added by default when using `buildStore`. and permits adding 'spawners' to action types. Spawners are functions which can create and dispatch a new action based on the caught action and current state,

## utils

The `utils.js` file contains a number of useful utility functions, for use in various parts of the application.

### Helpers for `styled-components`

`getThemeProp(path, defaultValue)` will return a prop function (suitable for use in a styled-components template string) that finds the value indicated by `path` (an array of strings), or returns `defaultValue` if that fails. Both `defaultValue` and elements of `path` may be prop functions themselves.

`ifFlag(flag, thenVal, elseVal)` returns a prop function that checks if a prop of name `flag` is true, and returns `thenVal` if it is, `elseVal` if it is not. Both of the value parameters may be prop functions.

`switchEnum(propName, cases)` returns a prop function that will fetch a value (including functions) based on a property. `propName` defines the name of the property to select by, `cases` should be a key/value object. The `'default'` key is used if no key is matched.

### API helpers

`loadConfig()` loads in the `config.json` file (by fetching it at runtime, not as an imported module) in order to gain access to the API location, version number etc. It returns a promise, which when resolved signals the availability the API. This is required to be called first and allowed to complete before dispatching API actions using the `buildUrl()` helper function. <!-- Edit this to generalize if/when we have more API helper funcs  --> It also sets `window.orcVersion` to the current Orckestra Commerce Suite version number.

`buildUrl(pathParts, queryObject)` constructs an absolute URL for an Orckestra API end point. The `pathParts` parameter is an array of strings defining the path, for example `['my', 'application']` will target the `/api/my/application` endpoint. `queryObject` should be an object of key/value pairs that will become search query parameters, for example `{ IncludeChildren: true, IncludeCurrency: true }` turns into `?IncludeChildren=true&IncludeCurrency=true`. It is best used together with [`makeOrcApiAction()`](actionsreducersselectors.md#api-action-tools), q.v.

### Data helpers

`safeGet(obj, path1, path2, ...)` fetches the value found in the object at the end of all path steps given, or undefined if a step fails, and does not throw errors. Ex. `safeGet({ foo: { bar: 'hat' } }, "foo", "bar")` returns `"hat"`.

`unwrapImmutable(maybeImmutable)` takes a value, and if it is immutable (as in Immutable.JS), returns the JS value of it, otherwise it returns the value itself.

`flatten(array)` will flatten nested arrays, resulting in a single-level array. Order of elements is maintained.

`normalizeForSearch(searchStr)` lowercases the search string and strips accents from it to ease comparisons between strings. Note: on IE11, accent stripping does not work.

`setTranslation(locale, immutableMap, path1, path2, ...)` will look in `immutableMap` at the path location (see `safeGet` above), and if found will replace a translation message structure (ex.: `{ 'en-US': 'A hat', 'fr-FR': 'Un chapeau' }`) with the string indicated by `locale`. If no match is found, the first given message string will be used as a default.

`stripKey(key, obj)` will return a new object containing everything in `obj` except the entry named by `key`. Example: `stripKey("foo", { foo: 1, bar: 3, beep: 5 })` returns a new object `{ bar: 3, beep: 5 }`

### Function helpers

`curry(func, ...parameters)` will 'preload' a function with the given parameters. For instance, if we have a function `update(id, fieldName, value)`, and we want a function `updateField(value)` that has a id of `45` and a field name of `"Springfield"`, we define this by `const updateField = curry(update, 45, "Springfield")`. Calling `updateField("Bart")` is then equivalent to calling `update(45, "Springfield", "Bart")`.

`debounce(func, wait, immediate)` handles many rapid calls in succession by waiting until calls have ceased for `wait` milliseconds before calling `func`. If `immediate` is true, it will call `func` immediately, and then debounce further calls as per the above.

`logPass(x)` takes any value, logs it to console and returns it. This is useful for inserting log calls in e.g. blockless arrow functions.

`memoize(func)` wraps `func` such that if it is called again with the same arguments, the result from the first call with those arguments is returned. This is useful for example for tying handler functions to properties in React components. However, a memoized function must be pure - i.e. it returns the same result given the same arguments, with no side effects - as it will only be executed once for a given set of arguments.
