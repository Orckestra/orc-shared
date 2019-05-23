# Infrastructure helpers

This code can be used to set up the standard infrastructure of Orckestra apps.

## `buildState`

- `reducers`: A plain JS object containing reducer functions as consumed by [`combineReducers()` from `redux-immutable`](https://github.com/gajus/redux-immutable#usage). The returned store will use the keys of the reducers as their keys in the state. Should not contain the keys `locale`, `navigation`, `router`, `requests`, `toasts`, or `view`, as these are in use for internationalization, navigation info, routing, request tracking and view data, respectively.
- `devOptions`: An options object for the dev tools, as described in the [Redux dev tools documentation](https://github.com/zalmoxisus/redux-devtools-extension/blob/master/docs/API/Arguments.md).

Constructs a state store with support for dev tools (as browser extension), routing, localization, API access and Immutable state.

## `addLocales`

- All parameters should be locale names, specifying only the language portion (i.e. 'en' rather than 'en-US'). An arbitrary number of names can be specified in a single call.

Loads in locale data for `react-intl` for the given top-level locales. Usually not needed in the app, used by `localeFactory` to ensure locale data is loaded for the supported locales.

## utils

The `utils.js` file contains a number of useful utility functions, some for use with styled components, some more generally applicable.

`safeGet(obj, path1, path2, ...)` fetches the value found in the object at the end of all path steps given, or undefined if a step fails, and does not throw errors. Ex. `safeGet({ foo: { bar: 'hat' } }, "foo", "bar")` returns `"hat"`.

`getThemeProp(path, defaultValue)` will return a prop function (suitable for use in a styled-components template string) that finds the value indicated by `path` (an array of strings), or returns `defaultValue` if that fails. Both `defaultValue` and elements of `path` may be prop functions themselves.

`ifFlag(flag, thenVal, elseVal)` returns a prop function that checks if a prop of name `flag` is true, and returns `thenVal` if it is, `elseVal` if it is not. Both of the value parameters may be prop functions.

`unwrapImmutable(maybeImmutable)` takes a value, and if it is immutable (as in Immutable.JS), returns the JS value of it, otherwise it returns the value itself.

`logPass(x)` takes any value, logs it to console and returns it. This is useful for inserting log calls in blockless arrow functions.

`normalizeForSearch(searchStr)` lowercases the search string and strips accents from it to ease comparisons between strings. Note: on IE11, accent stripping does not work.

`flatten(array)` will flatten nested arrays, resulting in a single-level array. Order of elements is maintained.

`setTranslation(locale, object, path1, path2, ...)` will look in `object` at the path location (see `safeGet` above), and if found will replace a translation message structure (ex.: `{ 'en-US': 'A hat', 'fr-FR': 'Un chapeau' }`) with the string indicated by `locale`. If no match is found, the first given message string will be used as a default.

`debounce(func, wait, immediate)` handles many rapid calls in succession by waiting until calls have ceased for `wait` milliseconds before calling `func`. If `immediate` is true, it will call `func` immediately, and then debounce further calls as per the above.

`modulesToRoutes(modules)` converts a module tree to a route table that will support the given module structure.

`memoize(func)` wraps `func` such that if it is called again with the same arguments, the result from the first call with those arguments is returned. This is useful for example for tying handler functions to properties in React components. However, a memoized function must be pure - i.e. it returns the same result given the same arguments, with no side effects - as it will only be executed once for a given set of arguments.
