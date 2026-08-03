# Hooks

For documentation on how to use hooks, please see [the React documentation](https://reactjs.org/docs/hooks-intro.html). In general, the components used to test these hooks show usage examples.

## `useViewState(name)`

Returns `[viewState, updateViewState(key, value), resetViewState(defaultValue)]`, where the first is the data stored by [the `view` reducer](actionsreducersselectors.md#view) for the given `name`, the second sets an individual key/value within it, and the third replaces the whole named view state (with `defaultValue`, or `{}` if omitted).

## `useToggle(init)`

Returns `[flag, toggle(), reset()]` of a flag value with toggle and reset functions. The `init` parameter specifies the initial value of the flag.

## `useLoader(loadActions, cutoutSelector)`

This hook sets up a side effect, such that whenever the `cutoutSelector` returns a falsy value (such as if there are zero rows in a list, for example) it will dispatch the `loadActions` (which can be a single action object or an array of them) on render. Loading is also suppressed while the user needs to log back in (per the `requests` reducer's logout flag). Be mindful of changing the `loadActions`, such as for example constructing the value in a function call -- this will cause the action(s) to be dispatched, as the hook checks its identity on each rendering. Memoizing functions or creating static action objects for use with this hook is beneficial. Calling this hook without a `cutoutSelector` logs a one-time console warning, since the load action(s) will then never be dispatched.

## `useEntityLoader(entityId, loadAction, cutoutSelector)`

A specialization of `useLoader` for loading a single entity by id via one RSAA action. It throws if `loadAction` is an array (only a single action is supported) or is not an RSAA action (unless already cut out). Internally it wires a `requestState` (see `useRequestState` below) into the action's `_SUCCESS`/`_FAILURE` types so a `404` response can trigger the current entity's configured tab-closing handler (set via a module's `closingTabHandler`), automatically closing a tab pointed at data that no longer exists.

## `useNavigationHandler(href)`

Returns `[navigateHandler, active]`, wherein the latter indicates that the href is the current path, or a parent path thereof, and the former is an event handler function that will navigate the browser to the href, and prevent the default event.

## `useDispatchWithModulesData()`

Returns a `dispatch`-like function for actions that are module-scoped: call it as `dispatch(actionCreator, params, options)`. It appends the current module name (from the navigation state) as the last argument to `actionCreator`, and — if `options.includeCurrentSection` is `true` — the current section name as the second-to-last argument, before the module name. `params` (an array of the action creator's own arguments) may be omitted if the action creator takes only the module/section arguments.

## `useDispatchWithErrorHandling()`

Returns a callback with signature `({ action, errorTitle, errorDescription, validationLookupModule, validationLookupName, lookupKeyCustomizer }) => Promise`. It dispatches `action` and, if the resolved response contains standard API error/validation information (as extracted by `responseProcessingHelper`'s `extractStandardErrorMessagesFromResponse`, using the current locale's `formatMessage`/`formatDate`/`formatTime`), dispatches a formatted global error message (`pushGlobalErrorMessage`) built from `errorTitle`/`errorDescription` plus the extracted validation messages. The underlying `executeDispatchWithErrorHandling(...)` is also exported for use outside of a hook (e.g. from a thunk-like helper that already has `dispatch`/`formatMessage` available).

## `useEditState(entityId, sectionName, extendedValidationRules)` / `useDynamicEditState(entityId, sectionName, extendedValidationRules)`

Field-level edit-state management for a form editing one section of one entity, backed by the `view` reducer's `edit` branch (keyed by current module, `entityId`, `sectionName`) and dispatched via `useDispatchWithModulesData`. Both return a `useFieldState(keys, ...)` function to be called once per field (`keys` is a path array identifying the field within the section's model).

- `useEditState`'s field function takes `(keys, initialValue, errorTypes, saveInitialValueToEditState, preValidateInitialValue, fieldDependencies)` and returns `{ state: { value, ... }, update(newValue, dependencies), reset(), isValid(value, dependencies) }`. If `saveInitialValueToEditState` is set, the initial value is seeded into edit state (and optionally pre-validated) the first time the field is rendered with no existing edit state.
- `useDynamicEditState`'s field function takes `(keys, initialValue, saveInitialValueToEditState)` and returns a richer API for fields whose value is itself a nested object/array reached by a relative `path`: `{ getStateValue(path), update(newValue, path, errorTypes, dependencies), reset(path), isValid(value, path, errorTypes, dependencies), getError(path), delete(path), getState(path) }`.

Validation rules come from `modelValidationHelper`'s `validationRules` by default; pass `extendedValidationRules` (keyed the same way) to add to or override them.

## `useMultipleFieldEditState(entityId, sectionName, initialValues, extendedValidationRules)`

Similar to `useEditState`, but for components with a _dynamic_ (not statically known) set of editable fields sharing one entity/section — e.g. a variable list of custom parameters — where calling a selector hook once per field isn't practical. It calls `useSelector` a single time for the whole section. `initialValues` must be shaped `{ [id]: { [fieldName]: value } }`. Returns `[useDynamicFieldState(id, fieldName, errorTypes, fieldDependencies), modifiedStates]`; `useDynamicFieldState` returns the same `{ state, update, reset, isValid }` shape as `useEditState`, but its validation rule functions receive `(value, id, fieldName, dependencies)` instead of `(value, dependencies)`.

## `useFullEntityEditState(entityId, getFullEntityModelProperties, extendedValidationRules, dependencies)`

For seeding or replacing an entire entity's edit-state model in one dispatch, rather than field-by-field (e.g. when opening an edit form and populating/validating its whole field set at once). Returns a function `buildFullEntityEditState(initializationContext)` that calls `getFullEntityModelProperties(initializationContext)` — expected to return `{ [sectionName]: { [fieldName]: { keys, newValue, initialValue, errorTypes?, dependencies? } } }` — runs validation per field, and dispatches the assembled model via `setFullEntityEditModel`.

## `useRequestState({ keys, operation, successAction, errorAction })`

This hook is used to handle custom action after deletes and updates requests. We have a reducer (`requestStates`) scanning every dispatched action for a special `meta.requestState` payload; if that payload's `keys`/`operation` match this call, the reducer tracks `inProgress`/`value`/`error` flags for it as the request's `_REQUEST`/`_SUCCESS`/`_FAILURE` actions are dispatched. Once the tracked request settles (transitions from in progress to a definite success or error), this hook resets that request's state and calls `successAction()` or `errorAction(errorResponse)`. Returns `[buildRequestState]`, where `buildRequestState()` returns `{ keys, operation }` — put this in the dispatched action's `meta.requestState` so the reducer knows to track it (see `requestStateOperations` in `src/constants.js` for valid `operation` values, e.g. delete/update).

## `useNotificationRequestState({ keys, operation, successMessageId, successMessageValues, successAction, errorMessageId, errorMessageValues, errorAction })`

Built on top of `useRequestState`, this hook drives toast/notification display (via `NotificationContext` from `components/MaterialUI/Feedback`) when a tracked request completes, instead of (or alongside) calling plain callbacks: on success it formats `successMessageId` with `successMessageValues` and shows it as a success notification (then calls `successAction()` if given); on error it formats `errorMessageId` with `errorMessageValues` plus the server's error message (or a generic fallback) and shows it as an error notification (then calls `errorAction(errorResponse)` if given). Returns `[buildRequestState]`, used the same way as `useRequestState`.

## `useScopeGuardLoader(actions, cutoutSelector)`

Like `useLoader`, but suppresses loading while a scope change is in progress (`getScopeChangeInProgress`, from `reducers/scopeRouteState.js`), regardless of what `cutoutSelector` would otherwise say. Use this instead of `useLoader` for data that must not be (re)requested mid scope-transition.

## `useInMemoryPaging({ viewStateName, tableRef, records, pageSize, initialSort, initialFilters, sortAndFilterFn })`

Client-side paging/sorting/filtering over an already fully-loaded `records` array, with paging position, `sorting` and `filters` persisted in the named view state. `sortAndFilterFn({ list, filters, sorting })` must return the complete sorted/filtered dataset; the hook slices out the first `currentPage * pageSize` rows of that for you. Returns `{ rows, totalCount, currentPage, filters, sorting, scrollLoader(page), setFilter(filters), setSort(sorting) }`; `setFilter`/`setSort` reset back to page 1 and scroll `tableRef.current` (expected to expose a `scrollToTop()` method) back to the top.

## `useInfiniteScroll(entities, pageSize, countOffset)`

For an already in-memory `entities` array (no server paging involved): reveals `pageSize` more items each time the returned `scrollEvent` handler (wire it to a scrollable container's `onScroll`) detects the user has scrolled within 100px of the bottom. Returns `[visibleEntities, scrollEvent]`.

## `useLabelMessage(label, buildMessage?)`

Resolves a view-config `label` (see [`docs/moduleFile.md`](moduleFile.md#labels-and-label-value-selectors)) that may be a plain string, a `react-intl` message descriptor, or a descriptor whose `values` is a state selector function. In the last case, the selector is run via `useSelector` and its result merged into the descriptor's `values` before rendering. Returns `[messageResult, missingValues]`: `messageResult` is the rendered node (via `buildMessage`, which defaults to rendering a `<FormattedMessage>`), or `null` if the descriptor's `defaultMessage` references `{placeholders}` that aren't satisfied yet (in which case `missingValues` is `true`); plain string labels are simply returned as-is.

## `useDaysAndMonthsLocalization()`

Returns a memoized `{ weekdays, weekdaysShort, weekdaysMin, months, monthsShort }` object of localized name arrays, built from `react-intl` and the day/month message descriptors in `sharedMessages.js`. Intended for feeding `react-datepicker`'s locale registration (see `Culture.js`).

## `usePreviousModified(value, effectAction, predicate)`

Tracks `value` across renders and, when `predicate(previousValue, value)` is true (the default predicate treats it as "changed" whenever the previous value was defined and different from the current one), calls `effectAction(value, previousValue)` after that render. Always returns the current predicate result, so it can also be used purely as a "did this meaningfully change" flag without providing `effectAction`.

## `useSelectorAndUnwrap(selector)`

A `useSelector` that also runs the result through [`unwrapImmutable`](infrastructure.md#data-utilities), for when the selected state is (or may be) an Immutable.js value but a plain JS value is wanted in the component.
