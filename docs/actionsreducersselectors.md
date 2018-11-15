# Actions

## Locale

`changeLocale(locale)`: Generates an action that will cause the locale to be switched to the given tag. See also `localeFactory` under reducers. `locale` should be an IETF language tag, e.g. 'en', 'fr-CA'.

`GET_CULTURES_<flag>`: For use with an API action that retrieves culture data from an API.

## API actions

`makeApiAction(name, endpoint, method, options)`: Returns a valid RSAA from the arguments given, with sensible defaults. Name and endpoint parameters are required.

- `name` is the base name of the action types that will be used to signal beginning and conclusion of the request. Actions used will be generated with `makeActionTypes(name)` (see below).
- `endpoint` is the URL of the endpoint that is to be accessed.
- `method` denotes the HTTP method used to access the endpoint, and defaults to `'GET'`.
- `options` may contain an object with optional settings. This object cotains any required options not given by the aforementioned parameters, as described in [the `redux-api-middleware` documentation](https://github.com/agraboso/redux-api-middleware#defining-the-api-call).

`makeActionTypes(name)`: Creates an array of three action types, based on `name`. The action types will be `<name>_REQUEST`, dispatched at the start of the request, `<name>_SUCCESS`, dispatched at successful conclusion of the request, and `<name>_FAILURE`, which is dispatched in case of error.

## Navigation

While routing is mostly handled by routing actions, the app's navigation infrastructure requires handling of module and page tabs. `removeTab(module, path)` permits closing page tabs.

## View state

Provides actions for setting partial or complete view state for named components (see also `reducers/view`, below, and [`hocs/withViewState`](hocs.md#withviewstatecomponent), which use them).

# Reducers

## `localeFactory(supportedLocales)`

- `supportedLocales`: An array of IETF language tags, designating which locales are to be supported.

Usually not used directly, as it is included in state stores created with `buildState`. This factory creates a locale reducer from a list of supported locales. This reducer will initially set the selected locale to the first supported locale, and accepts actions to set it to any other. Actions to set unsupported locales will be ignored. This reducer will also store culture (i.e. customer-facing locale) info, and expects to get this data as an array of objects, each containing a `cultureIso` field with the IETF tag of the culture.

## `view`

A simple reducer that keeps track of view state objects for named components. Used to support the [`withViewState`](hocs.md#withviewstatecomponent) higher-order component (q.v.).

## `request`

This reducer interacts with `redux-api-middleware`, in that it tracks ongoing requests. If an action ending in `"_REQUEST"` is dispatched, it will set a flag named for the action type. So, for example, `GET_SCOPES_REQUEST` will see `'GET_SCOPES'` set in the request state. A following action of that name ending in `'_SUCCESS'` or `'_FAILURE'` will then unset the flag again. This can be used to indicate a loading state to users.

## `navigation`

Takes care of storing tabs when a new page is navigated to (when a `redux-little-router` `LOCATION_CHANGED` action is dispatched), and handles calls for the removal of a tab as well.

# Selectors

These selectors expect a `buildState` store.

## Locale

`currentLocale`: Extracts and returns the currently set locale from the state.

`defaultLocale`: Finds and returns the default locale for the application. This is the first entry in the supported locales list, or if no such list is given, falls back to `'en'`.

`cultures`: Pulls the index of supported cultures.

`cultureList`: Gives a simple list of the IETF tags of supported cultures.

`defaultCulture`: Extracts the default culture IETF tag.

`orderedCultureList`: Returns a list of all supported cultures, but ensures that the default culture is the first element. All others retain their order.

## Navigation

`selectTabGetter`: Creates a function that will get tabs by their path. Returns undefined on unknown path.

`selectCurrentModuleName`: Searches up through the current route result for a module name. If none can be found, returns empty string.

`selectMappedCurrentModuleList`: Gets the list of tab objects for the currently selected module.

`selectSegmentHrefMapper`: Returns a mapper function that, when given a href will return either the href the input is mapped to, or the input itself. This is useful for ensuring path equality, that links point to the right places, etc.

## Route

`paramSelector`: Returns the matched parameters of the current route.

`routeSelector`: Returns the matched route string.

`resultSelector`: Returns the matched result object, which includes the parent routes of the currently matched route back to the root, as described in the application's route object.

`getCurrentScope`: Not an actual selector, as this function will return either the current `scope` route parameter, the last set `scope` parameter, or the default scope name (`"Global"`) if no scope has ever been set.
