# Actions

## API action tools

`makeApiAction(name, endpoint, method, options)`: Returns a valid RSAA from the arguments given, with sensible defaults. Name and endpoint parameters are required.

- `name` is the base name of the action types that will be used to signal beginning and conclusion of the request. Actions used will be generated with `makeActionTypes(name)` (see below).
- `endpoint` is the URL of the endpoint that is to be accessed.
- `method` denotes the HTTP method used to access the endpoint, and defaults to `'GET'`.
- `options` may contain an object with optional settings. This object contains any required options not given by the aforementioned parameters, as described in [the `redux-api-middleware` documentation](https://github.com/agraboso/redux-api-middleware#defining-the-api-call). Additionally, it may contain a key `meta`, the value of which will be used as metadata on the Flux Standard Actions emitted from the API middleware.

`makeActionTypes(name)`: Creates an array of three action types, based on `name`. The action types will be `<name>_REQUEST`, dispatched at the start of the request, `<name>_SUCCESS`, dispatched at successful conclusion of the request, and `<name>_FAILURE`, which is dispatched in case of error.

`makeOrcApiAction(name, endpoint, method, options)`: This function takes the same parameters as `makeApiAction`, above, but ensures they are set up correctly to access an Orckestra Commerce Suite API. This includes ensuring that multiples of the same actions are not sent while still running.

## Applications

`getApplications()`: Fetches the application list available to the user from the Orckestra API.

`getMyApplication()`: Fetches the default application for the user from Orckestra API.

`setMyApplication(applicationId)`: Sets the default application for the user from Orckestra API.

## Authentication

`getAuthProfile()`: Loads the authentication profile of the logged in user from Orckestra API.

`signOut()`: Signs out the user.

## Locale

`getCultures`: Orckestra API action that retrieves available culture locales for the application.

`getMyCulture`: Orckestra API action that fetches the current locale for the logged-in user.

`setDefaultLanguage`: Orckestra API action to set the current language of the logged-in user.

`changeLocale(locale)`: Generates an action that will cause the locale to be switched to the given tag. See also `localeFactory` under reducers. `locale` should be an IETF language tag, e.g. 'en', 'fr-CA'.

## Navigation

The app's navigation infrastructure requires handling of module and page tabs, typically in response to navigation. `setRoute(location, match)` is called by the routing components when rendering a view, putting information in the state about the currently matched view and location. `mapHref(from, to)` sets a href mapping up to allow tabs to directly navigate to their selected segment. `removeTab(module, path)` permits closing page tabs.

## Toasts

Small temporary notifications (aka. toasts) can be shown by dispatching the return value of `pushToast(message, type)`. The value of `message` can be a plain string or a message descriptor (as per `react-intl`). `shiftToast()` returns an action that will clear the first shown toast, and is generally used for timed dismissal of the toast.

## View state

Provides actions for setting partial or complete view state for named components (see also `reducers/view`, below, and [`hocs/withViewState`](hocs.md#withviewstatecomponent), which use them).

# Reducers

## `applications`

Holds a list of available applications, mostly used for the application selector and for setting your default application preference.

## `authentication`

Stores authentication data for the logged-in user, including name and upn, and roles and claims.

## `localeFactory(supportedLocales)`

- `supportedLocales`: An array of IETF language tags, designating which locales are to be supported.

Usually not used directly, as it is included in state stores created with `buildState`. This factory creates a locale reducer from a list of supported locales. This reducer will initially set the selected locale to the first supported locale, and accepts actions to set it to any other. Actions to set unsupported locales will be ignored. This reducer will also store culture (i.e. customer-facing locale) info, and expects to get this data as an array of objects, each containing a `cultureIso` field with the IETF tag of the culture.

## `navigation`

Takes care of storing tabs and mappings when a new view is navigated to, and handles calls for the removal of tabs as well.

## `request`

This reducer interacts with `redux-api-middleware`, in that it tracks ongoing requests. If an action ending in `"_REQUEST"` is dispatched, it will set a flag named for the action type. So, for example, `GET_SCOPES_REQUEST` will see `'GET_SCOPES'` set in the request state. A following action of that name ending in `'_SUCCESS'` or `'_FAILURE'` will then unset the flag again. This can be used to indicate a loading state to users.

## `scopes`

Scopes known to the user will be stored here, supporting their use across the application. Please note that the currently selected scope is set by the browser path, and thus stored by `navigation`. Uses the schema in `src/schemas/scopes.js` to normalize the output from the API.

## `settings`

Stores user settings.

## `toasts`

Handles storing the list of shown toasts. See [above](#toasts)

## `view`

A simple reducer that keeps track of view state objects for named components. Used to support the [`withViewState`](hocs.md#withviewstatecomponent) higher-order component (q.v.).

# Selectors

These selectors expect a `buildState` store.

## Applications

`localizedAppSelector`: Gets a list of visible applications, with names etc. localized to currently selected locale.

`localizedAppOptionSelector`: Creates an array of objects, shaped like `{ label: "Item 1", value: 1 }`, for use in selectors with the result of `localizedAppSelector`, above.

## Locale

`currentLocale`: Extracts and returns the currently set locale from the state.

`defaultLocale`: Finds and returns the default locale for the application. This is the first entry in the supported locales list, or if no such list is given, falls back to `'en'`.

`cultures`: Pulls the index of supported cultures.

`cultureList`: Gives a simple list of the IETF tags of supported cultures.

`defaultCulture`: Extracts the default culture IETF tag.

`orderedCultureList`: Returns a list of all supported cultures, but ensures that the default culture is the first element. All others retain their order.

`orderedCultureOptionList`: Turns the output of `orderedCultureList`, above, into an array of option objects, shaped like `{ label: "Item 1", value: 1 }`.

## Navigation

`selectRouteParams`: Gets the most recently matched route parameters, as set in the store.

`selectRoutePath`: Gets the most recently matched route path (with no parameter substitution, example: `"/:scope/orders/:orderId/info"`), as set in the store.

`selectRouteHref`: Gets the most recently matched URL pathname (example: `"/Global/orders/0d216f37-d0d1-4b20-b47a-17b210b0e547/info"`), as set in the store.

`getCurrentScope`: Not an actual selector, as this function will return either the current `scope` route parameter, the last set `scope` parameter, or the default scope name (`"Global"`) if no scope has ever been set.

`selectTabGetter`: Creates a function that will get tabs by their path. Returns undefined on unknown path.

`selectCurrentModuleName`: Searches up through the current route result for a module name. If none can be found, returns empty string.

`selectMappedCurrentModuleList`: Gets the list of tab objects for the currently selected module.

`selectSegmentHrefMapper`: Returns a mapper function that, when given a href will return either the href the input is mapped to, or the input itself. This is useful for ensuring path equality, that links point to the right places, etc.

## Route

`selectLocation`: Get the location data stored in the state.

`selectPathname`: Get the pathname from the location data.

## Scope

`currentScopeSelector`: Finds the scope object of the currently active scope.

`scopeGetter`: Returns a getter function that, when given a scope id will return the scope object, provided it is found in the scope list, filters applied. If it is not, returns null.

## Settings

`defaultAppId`: Gets the application id of the user's current default application.
