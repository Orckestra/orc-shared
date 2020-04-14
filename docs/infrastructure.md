# Infrastructure helpers

This code can be used to set up the standard infrastructure of Orckestra apps.

## `buildState`

- `reducers`: A plain JS object containing reducer functions as consumed by [`combineReducers()` from `redux-immutable`](https://github.com/gajus/redux-immutable#usage). The returned store will use the keys of the reducers as their keys in the state. Should not contain the keys `locale`, `navigation`, `router`, `requests`, `toasts`, or `view`, as these are in use for internationalization, navigation info, routing, request tracking and view data, respectively.
- `devOptions`: An options object for the dev tools, as described in the [Redux dev tools documentation](https://github.com/zalmoxisus/redux-devtools-extension/blob/master/docs/API/Arguments.md).

Constructs a state store with support for dev tools (as browser extension), routing, localization, API access and Immutable state.

## `getTheme`

- `highlight`: A string containing a CSS color.
- `overrides`: An object containing values to be merged into the returned theme.

Builds a theme objedct for use with `styled-components`. This contains lengths, colors, fonts and icon names for use in the application. As a side effect of importing `getTheme.js`, the standard UI fonts (Roboto Condensed and Open Sans) will also be imported.

## spawnerMiddleware

This middleware is added by default when using `buildStore`. and permits adding 'spawners' to action types. Spawners are functions which can create and dispatch a new action based on the caught action and current state,

## utils

The `utils` folder contains a number of useful utility functions, for use in various parts of the application.

### Content utilities

`insertIcons(svgString)` takes a string of SVG, parses it and inserts it into the body of the DOM. It is useful for adding dynamically and/or statically imported icon sheets (i.e. collections of `<symbol>` tags) to the site, as Webpack will provide the string content of imported SVG files. If the imported SVG is malformed, no SVG will be injected. If the SVG contains non-`<symbol>` SVG, behavior is undefined but likely shows the SVG in a non-useful way.

### Utilities for `styled-components`

`getThemeProp(path, defaultValue)` will return a prop function (suitable for use in a styled-components template string) that finds the value indicated by `path` (an array of strings), or returns `defaultValue` if that fails. Both `defaultValue` and elements of `path` may be prop functions themselves.

`ifFlag(flag, thenVal, elseVal)` returns a prop function that checks if a prop of name `flag` is true, and returns `thenVal` if it is, `elseVal` if it is not. Both of the value parameters may be prop functions.

`switchEnum(propName, cases)` returns a prop function that will fetch a value (including functions) based on a property. `propName` defines the name of the property to select by, `cases` should be a key/value object. The `'default'` key is used if no key is matched.

### API utilities

`loadConfig()` loads in the `config.json` file (by fetching it at runtime, not as an imported module) in order to gain access to the API location, version number etc. It returns a promise, which when resolved signals the availability the API. This is required to be called first and allowed to complete before dispatching API actions using the `buildUrl()` helper function. <!-- Edit this to generalize if/when we have more API helper funcs  --> It also sets `window.orcVersion` to the current Orckestra Commerce Suite version number.

`buildUrl(pathParts, queryObject)` constructs an absolute URL for an Orckestra API end point. The `pathParts` parameter is an array of strings defining the path, for example `['my', 'application']` will target the `/api/my/application` endpoint. `queryObject` should be an object of key/value pairs that will become search query parameters, for example `{ IncludeChildren: true, IncludeCurrency: true }` turns into `?IncludeChildren=true&IncludeCurrency=true`. It is best used together with [`makeOrcApiAction()`](actionsreducersselectors.md#api-action-tools), q.v.

### Data utilities

`safeGet(obj, path1, path2, ...)` fetches the value found in the object at the end of all path steps given, or undefined if a step fails, and does not throw errors. Ex. `safeGet({ foo: { bar: 'hat' } }, "foo", "bar")` returns `"hat"`.

`unwrapImmutable(maybeImmutable)` takes a value, and if it is immutable (as in Immutable.JS), returns the JS value of it, otherwise it returns the value itself.

`flatten(array)` will flatten nested arrays, resulting in a single-level array, for example, `flatten([1,[2,3],4])` returns `[1,2,3,4]`. Order of elements is maintained.

`flattenObj(object, separator = ".", prefix = "")` will flatten nested objects, prefixing keys to identify them, i.e. `flattenObj({ a: { b: true } })` returns `{ "a.b": true }`. Optional parameters: `separator` is a string that will be used instead of `"."` to separate prefix levels; `prefix` is a string that will be concatenated onto the start of all keys in the resulting object.

`normalizeForSearch(searchStr)` lowercases the search string and strips accents from it to ease comparisons between strings. Note: on IE11, accent stripping does not work.

`setTranslation(locale, immutableMap, path1, path2, ...)` will look in `immutableMap` at the path location (see `safeGet` above), and if found will replace a translation message structure (ex.: `{ 'en-US': 'A hat', 'fr-FR': 'Un chapeau' }`) with the string indicated by `locale`. If no match is found, the first given message string will be used as a default.

`stripKey(key, obj)` will return a new object containing everything in `obj` except the entry named by `key`. Example: `stripKey("foo", { foo: 1, bar: 3, beep: 5 })` returns a new object `{ bar: 3, beep: 5 }`

### Function utilities

`curry(func, ...parameters)` will 'preload' a function with the given parameters. For instance, if we have a function `update(id, fieldName, value)`, and we want a function `updateField(value)` that has a id of `45` and a field name of `"Springfield"`, we define this by `const updateField = curry(update, 45, "Springfield")`. Calling `updateField("Bart")` is then equivalent to calling `update(45, "Springfield", "Bart")`.

`debounce(func, wait, immediate)` handles many rapid calls in succession by waiting until calls have ceased for `wait` milliseconds before calling `func`. If `immediate` is true, it will call `func` immediately, and then debounce further calls as per the above.

`logPass(x)` takes any value, logs it to console and returns it. This is useful for inserting log calls in e.g. blockless arrow functions.

`memoize(func)` wraps `func` such that if it is called again with the same arguments, the result from the first call with those arguments is returned. This is useful for example for tying handler functions to properties in React components. However, a memoized function must be pure - i.e. it returns the same result given the same arguments, with no side effects - as it will only be executed once for a given set of arguments.

### Test utilities

These should generally never be used for live code, but are highly useful tools for testing.

`spyOnConsole()` can be called in a `describe()` block, and will set up (and tear down) `console.log()`, `console.warn()` and `console.error()` as sinon spies. This intercepts their normal function (i.e. no messages are output), but alloows asserting on whether they have been called and with what. Highly useful for testing e.g. error display. (This was universally applied prior to `orc-scripts` v0.7.0.)

`getElmClasses(element, parentType)` creates an array containing all class names attached to the element given. The `parentType` parameter can be used to suppress nesting validation output for e.g. `<td>` elements and others which cannot legitimally reside under a `<div>`.

`getClassName(element, index, parentType)` will extract the indexed class name of an element, and is most useful for querying for styled components in a DOM tree. It does not include the class selector prefix (i.e. it outputs "myClass", not ".myClass"), so if used as a selector, the class name should be prefixed with a period. `index` is zero-based, and defaults to 0. In most cases you will not need this parameter.

`getClassSelector(element, index, parentType)` will generate a string containing a CSS selector that targets the given element's class. If index is -1, all classes on the element will be used together, otherwise it works as on `getClassName` above.

`getStyledClassSelector(<StyledComponent />, parentType)` discovers the most-specific class targeting elements of the `StyledComponent` type. If the passed element is not a rendered styled component, it will throw an error. In cases where the component needs a specific parent node type, `parentType` allows it to be set.

`<PropStruct />` is a React component that renders an ordered format of the properties given to it. This is extremely useful for testing higher order components and other cases where the properties passed to a component are important.
