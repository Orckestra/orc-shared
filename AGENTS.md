# AGENTS.md

This file provides guidance to AI coding agents working with code in this repository.

## What this is

`orc-shared` is a library of shared React/Redux infrastructure, components, hooks and utilities used to build Orckestra front-end applications. It is not an application itself — it's consumed by other Orckestra projects as an npm dependency (`orc-shared`). Almost everything under `src/` is exported for use by consumers, so changes here ripple out to other apps.

The overall architecture (state store shape, module/routing config, actions/reducers/selectors, HOCs, hooks, components, forms, lists) is documented in `docs/`:

- `docs/infrastructure.md` — `buildState`, `getTheme`, `spawnerMiddleware`, and the general utility functions in `src/utils`
- `docs/moduleFile.md` — the module map that drives app navigation/routing (modules → segments/pages/subpages)
- `docs/actionsreducersselectors.md` — API action helpers (`makeApiAction`, `makeOrcApiAction`) and the built-in reducers/selectors (applications, authentication, locale, navigation, requests, scopes, settings, toasts, view)
- `docs/hocs.md` — higher-order components (many are marked deprecated in favor of hooks — check this before adding new usages)
- `docs/hooks.md` — the newer hook-based replacements for the above HOCs
- `docs/components.md` — the component library (AppFrame, Modules, Navigation, Scope, Toolbar, List/CategoryList, Form, etc.)
- `docs/forms.md` and `docs/lists.md` — the field-definition/column-definition config formats consumed by `Form`, `List` and `CategoryList`

When making non-trivial changes to any of these systems, read the relevant doc file first, and update it if the change affects documented behavior.

Some subsystems aren't covered in `docs/` at all and are documented only in the sections below — notably the module/page tab bar (Navigation tab system), the `@material-ui/core` wrapper layer, and `normalizr`-based data normalization.

## Technology stack

- **React** (function components + hooks) for views, **`react-redux`** hooks (`useSelector`/`useDispatch`) for connecting them to the store — the older `connect()`-style `routingConnector` HOC is deprecated.
- **Redux** as the state container, with **`redux-immutable`**'s `combineReducers` and **Immutable.js** (`Immutable.Map`/`fromJS`) as the state shape throughout — plain-object reducers/selectors are the exception, not the rule.
- **`redux-api-middleware`** (RSAA actions) for HTTP calls, **`connected-react-router`** (`/immutable` build) + **`history`** for routing/browser history syncing into the store, and a hand-rolled `spawnerMiddleware` (`src/spawnerMiddleware.js`) for reactive "dispatch action B when action A + some state condition occurs" logic.
- **`react-router` / `react-router-dom`** (`Switch`/`Route`/`Redirect`, `useHistory`/`useLocation`) under the hood of the module/segment/page routing system described below.
- **`styled-components`** for styling/theming, **`react-intl`** for i18n (message descriptors + `FormattedMessage`/`useIntl`), **`polished`** for color math (`shade`/`tint`), **`lodash`** for general data utilities, **`prop-types`** on some components, **`react-datepicker`** and **`react-number-format`** for specialized inputs.
- **`@material-ui/core` (MUI v4, not the newer `@mui/*` scope)** underlies the `src/components/MaterialUI` wrapper layer (`makeStyles`, `Menu`/`MenuItem`, `Table`, `Modal`, `Snackbar`, `Chip`, `Badge`, etc.), themed via `muiThemes.js` so it matches the `styled-components` theme; `classnames` is used alongside it for conditional class composition.
- **`normalizr`** normalizes list-shaped API responses into Immutable-friendly entity maps — see `src/schemas/*.js` and Data normalization below.
- Build/lint/test tooling (webpack, Babel, Jest, ESLint, Prettier) all comes from the sibling **`orc-scripts`** package — see Commands below.

## Application routing: modules, segments, pages, subpages

Full reference: `docs/moduleFile.md`. Rendering is implemented in `src/components/Modules.js` and `src/components/Routing/*`:

- **`Modules`** (`src/components/Modules.js`) takes the app's module map, renders the sidebar `Navigation` bar, and sets up one `react-router` `<Route>` per top-level module, prefixed by the current scope (`/:scope/<moduleName>`). It also handles scope/module bookkeeping: reacting to scope changes, tracking which modules are visible for the current scope (`setModuleAsVisible`/`getScopeModuleInformationSelector`), and auto-redirecting to the first visible module.
- **`FullPage`** renders a single module/page's own component plus its `pages` (nested full pages, each getting its own sub-route) and `subpages` (rendered by `SubPage` as an overlay on top of the parent, not a route replacement).
- **`Page`** (`src/components/Routing/Page.js`) is the recursive workhorse: for a given view config it renders `pages` as nested `<Switch>`/`<Route>`s (matched before the view's own route, so more specific paths win), the view's own `component` wrapped in `withErrorBoundary` + `withWaypointing`, and `subpages` as a second, independent `<Switch>` of overlay routes.
- **`Segment`** renders one entry of a `segments` map — a view shown in the left-hand list/right-hand detail layout described in `docs/moduleFile.md` — also wrapped in `withErrorBoundary`/`withWaypointing`.
- **`SubPage`** renders a `subpages` entry as an overlay over its parent's currently-rendered content, using `parentUrlPattern` (via `url-pattern`) to compute the close/parent URL.
- **`withWaypointing`** integrates with the `waypointing`/tab system so navigating into a page/segment updates tab state correctly.

Labels on views may be plain strings or `react-intl` message descriptors, optionally with a `labelValueSelector`/`toolStateSelector`/`toolFuncSelector` for dynamic labels and subpage toolbars — see `docs/moduleFile.md` for the exact shapes.

## Navigation tab system (`src/components/Navigation`)

This is the module/page tab bar shown at the top of a module (module tab + one tab per open page), and is distinct from the `Scope` bar. It is driven by the `navigation` reducer and rendered through a small pipeline:

- **`reducers/navigation.js`** is the source of truth: `SET_ROUTE` (dispatched by the routing components as views render) records the current `route`, and appends the visited path to `moduleTabs[moduleName]`/`tabIndex` if not already open; `REMOVE_TAB` removes one; `REMOVE_MODULE_TABS` clears all tabs (and `closingTabsHandlerActions`) for a module, e.g. on scope change (`APPLICATION_SCOPE_HAS_CHANGED` also resets `moduleTabs`/`tabIndex`/`mappedHrefs` wholesale); `MAP_HREF` records a href-rewrite (`mappedHrefs`) so segment navigation can keep tabs pointed at the right URL; `SET_HREF_CONFIG`/`SET_CURRENT_PREPEND_PATH` store the module map's route-prefix config used to strip/re-add the `/:scope/<module>` prefix when computing tab identity.
- **`useNavigationState(modules)`** (`src/components/Navigation/useNavigationState.js`) is the hook that turns that raw reducer state plus the current location into what the tab bar renders: it resolves the current module from the URL (`getModuleNameFromHref`), reads the open-tab list for it (`selectMappedCurrentModuleList`), then for each tab walks the module's `pages`/`segments`/`subpages` config tree (`getPageData`/`getPageWithSplitPath`, matching literal and `:param(regex)` path segments) to resolve that tab's `label` (resolving `labelValueSelector`/deprecated `dataPath`), `icon`, and whether it `isDetails`. It also computes each tab's `close` handler (removes the tab, optionally running a module-configured `closingTabHandler` first) and flags a tab `outsideScope`/`scopeNotSupported` when the scope has changed underneath a tab whose page data has a `pageScopeSelector` that no longer matches (such tabs auto-close via the `scopeNotSupported` effect in `Tab`).
- **`index.js`** wraps `useNavigationState` in an error boundary and feeds its result into `MaterialUI/Navigation/TabBar` for actual rendering — so this folder is the state/logic layer, `MaterialUI/Navigation` is the presentation layer.
- **`Bar.js`** (mostly superseded by `MaterialUI/Navigation/TabBar` but still exported) and its `useTabScroll` hook compute which tabs fit in the visible bar width, expose a "more tabs" overflow menu, and scroll to keep the active tab in view.
- **`Tab.js`** renders one tab (module tab or page tab), resolving its label via `useLabelMessage`, showing a close icon (page tabs only), and truncating with a title tooltip when the label doesn't fit.

When adding a new page/segment/subpage type to a module map, this is the system that turns it into an actual tab — check `getPageData`'s path-matching logic if a new dynamic (`:param`) route segment's tab isn't resolving as expected.

## Data normalization (`src/schemas`)

A handful of API list responses are normalized with **`normalizr`** before being stored: `src/schemas/*.js` (`countries`, `timezones`, `scopes`, `metadata`, `definitions`, `productDefinitions`) define `schema.Entity`/array schemas (mostly keyed by a natural id like `entityTypeName`), and the corresponding reducers (`reducers/countries.js`, `timezones.js`, `scopes.js`, `metadata.js`) call `normalize(action.payload, someListSchema)` on the relevant `_SUCCESS` action and merge `normalizedResult.entities.<key>` into Immutable state. Follow this pattern (schema + `normalize()` in the reducer) rather than hand-rolling entity indexing when a new list-shaped endpoint needs to be keyed by id.

## Components catalog

`src/components` groups into:

- **Shell/chrome**: `AppFrame/` (outermost app shell: sidebar, top bar, scope selector, About/Preferences), `Navigation/` (module tab bar), `Modules.js` (routing glue above), `Head.js` (document head/title), `DevPages.js` (dev-only route passthrough).
- **Auth/provisioning**: `Authenticate.js`, `Provision.js`, `ApplicationModuleLoader.js`, `ScopeExtendedConfigurationLoader.js` — wrap the app tree with auth checks, providers (redux/theme/intl), and scope config loading before rendering real content.
- **Routing**: `Routing/` (`FullPage`, `Page`, `Segment`, `SubPage`, `withWaypointing`) — see routing section above.
- **Scope**: `Scope/` — the scope bar/tree/selector UI and its hooks (`useScopeData`, `useScopeSelect`, `useScopeConfirmationModalState`).
- **Lists/tables**: `List/` (`List`, `Row`, `HeadRow`/`HeadCell`, `DataCell`, `enhanceColumnDefs`) plus the higher-level `CategoryList.js` — see `docs/lists.md` for column-definition config.
- **Forms**: `Form/` (`Form`, `Fieldset`, `Combination`, `Field`, `FieldElements`, `FormElement`, `InputField`, `Inputs/*`) — see `docs/forms.md` for field-definition config.
- **Generic UI primitives**: `Button.js`, `IconButton.js`, `Checkbox.js`, `Switch.js`, `Input.js`, `Selector.js`, `MultiSelector.js`, `Icon.js`, `Text.js`, `Tooltip.js`, `Placeholder.js`, `Loader.js`/`LoadingIcon.js`, `ErrorPlaceholder.js`, `Sidepanel.js`, `Toolbar.js`, `ToastList.js`, `ColumnWrapper.js`, `Spritesheet.js`.
- **Menus/dialogs**: `DropMenu/`, `Modal/` (`Dialog`, `Wrapper`, `Background`).
- **Structured data display**: `Treeview/` (`Node`, `Branch`, `Leaf`, `Label`).
- **Material UI wrapper layer**: `MaterialUI/` — an internal wrapper around `@material-ui/core` (v4) components (`DataDisplay`, `Feedback`, `Inputs`, `Navigation`, `ScopeSelector`, `Surfaces`, plus its own `hocs`, `muiThemes.js`, shared prop helpers). `Navigation/TabBar` here is what `components/Navigation` renders into (see Navigation tab system below). Prefer these wrappers over importing `@material-ui/core` directly when working in areas that already use them, for visual consistency.
- Misc: `Culture.js` (locale/date-picker localization glue), `Registry.js`, `TaskDetailsModal.js`, `InternetExplorerWarningMessage.js`.

## Theme management

- `getTheme(highlight, overrides)` (`src/getTheme.js`) builds the `styled-components` theme object: a `baseTheme` (colors, icon id map, fonts, tree-view geometry) deep-merged (via lodash `merge`) with caller-supplied `overrides`, then run through `setApplicationColors` to derive `application.primary/highlight/select/dark` from `application.base` using `polished`'s `shade`/`tint` if not explicitly overridden. Importing this file also side-effect-imports the Open Sans / Roboto Condensed webfonts.
- `getThemeOverrides(appName)` (`src/getThemeOverrides.js`) supplies Orckestra-specific brand colors per application (`pim`, `oms`, `marketing`, `analytics`, plus the shared `orckestraBlue`) to feed into `getTheme`'s `overrides` param; unknown app names get a deliberately garish magenta fallback so misconfiguration is obvious.
- The theme is consumed from `styled-components` templates via the prop-function helpers in `src/utils/styledPropFuncs.js`: `getThemeProp(path, defaultValue, func?)` (safe nested theme lookup, path/default may themselves be prop functions), `ifFlag(name, thenVal, elseVal)` (boolean prop → value), and `switchEnum(enumField, cases)` (prop value → matching case, falling back to `cases.default`). Use these instead of hardcoding colors/sizes in styled templates.
- `muiThemes.js` (`src/components/MaterialUI/muiThemes.js`) adapts/derives a MUI theme from the same `styled-components` theme so MUI-based components stay visually consistent with the rest of the app.

## HTTP requests

All API calls are dispatched as Redux actions (RSAA — Redux Standard API-calling Actions, from `redux-api-middleware`), handled by the `apiMiddleware` wired into the store by `buildStore` (`src/buildStore.js`), which also wires in `routerMiddleware` and the local `spawnerMiddleware`.

- `makeApiAction(name, endpoint, method, options)` (`src/actions/makeApiAction.js`) builds the raw RSAA object: `{ [RSAA]: { types: makeActionTypes(name), endpoint, method, body: JSON.stringify(body), ...rest } }`. `makeActionTypes(name)` produces `<name>_REQUEST/_SUCCESS/_FAILURE`. `getJSONWithValidBody` works around empty-but-JSON-typed 404 responses that would otherwise throw on `JSON.parse`.
- `makeOrcApiAction(name, endpoint, method, options)` (`src/actions/makeOrcApiAction.js`) wraps the above with Orckestra API conventions: `credentials: "include"` (cookie auth), `Accept`/`Content-Type: application/json`, `redirect: "follow"`, and a `bailout` that skips dispatch if the same-named request is already in flight (tracked by the `request` reducer, keyed off `_REQUEST`/`_SUCCESS`/`_FAILURE` action types).
- `buildUrl(pathParts, queryObject)` / `loadConfig()` (`src/utils/buildUrl.js`) construct absolute API URLs against a host loaded at runtime from `/config.json` (`serviceApiUrl`); `loadConfig()` must resolve before any action using `buildUrl` is dispatched. `buildExternalAppUrl(app, relativeUrl)` builds links to sibling Orckestra apps (`pim`/`oms`).
- `src/utils/requestProcessingHelper.js` / `responseProcessingHelper.js` contain shared helpers for shaping outgoing request bodies and parsing/normalizing API responses (e.g. extracting standard error messages, used by `useDispatchWithErrorHandling`).
- `src/actions/requestsApi.js` is a **generated** file (`npm run generateApi`, reading definitions from `src/requests/`) — do not hand-edit it; regenerate instead.
- In-flight/loading state is tracked by the `request` reducer (flat flags per action base name, read via `selectActivity`/`useLoader`) and, for the richer success/error/notification flows, the `requestStates` reducer paired with `useRequestState`/`useNotificationRequestState`/`useEntityLoader` (see Hooks below).

## HOCs (`src/hocs`)

Most of these are considered legacy in favor of an equivalent hook (noted below); prefer the hook in new code. Full details: `docs/hocs.md`.

| HOC                                    | Purpose                                           | Prefer instead                              |
| -------------------------------------- | ------------------------------------------------- | ------------------------------------------- |
| `routingConnector`                     | `connect()` + router-aware HOC                    | `react-redux`/`react-router` hooks directly |
| `withAuthentication`                   | Auth check + loader/error gate                    | `Authenticate` component                    |
| `withClickOutside`                     | Adds an `onClickOutside` handler                  | — (still current)                           |
| `withErrorBoundary(name, handler)`     | Wraps render-time errors in an error boundary     | — (still current)                           |
| `withId(name)`                         | Generates a stable pseudo-unique `id` prop        | — (still current)                           |
| `withInfiniteScroll`                   | Adds scroll-triggered `scrollLoader` calling      | — (still current, used by `List`)           |
| `withInitialLoad(loaderName, test)`    | Calls a loader prop on mount                      | `useLoader`                                 |
| `withLocaleSwitch`                     | Click handler that changes locale                 | `useDispatch` directly                      |
| `withNavigationLink`                   | `onClick` that navigates via router               | `useNavigationHandler`                      |
| `withRequestActivity(request)`         | Injects `active` flag for a named request         | `useSelector` + `selectActivity`            |
| `withScopeData`                        | Injects full scope info                           | scope hooks in `components/Scope`           |
| `withScrollBox`                        | Wraps in a scrollable, size-reporting `<div>`     | — (still current)                           |
| `withToggle(propName)`                 | Boolean prop + toggle function                    | `useToggle`                                 |
| `withUpdateHandler(handlerName, test)` | Calls a handler prop when props change per `test` | `useLoader`                                 |
| `withViewState`                        | Injects named view state + updater                | `useViewState`                              |

## Hooks (`src/hooks`)

Full details: `docs/hooks.md`, which now covers all hooks in `src/hooks`.

- `useViewState(name)` — `[viewState, updateViewState(key, value), resetViewState(defaultValue)]` backed by the `view` reducer.
- `useToggle(init)` — `[flag, toggle(), reset()]`.
- `useLoader(loadActions, cutoutSelector)` — dispatches `loadActions` on render while `cutoutSelector(state)` is falsy.
- `useEntityLoader(entityId, loadAction, cutoutSelector)` — `useLoader` specialized for loading a single entity by id, wired into `useRequestState`; throws if given an array of actions.
- `useNavigationHandler(href)` — `[navigateHandler, active]` for router-aware links/buttons.
- `useSelectorAndUnwrap(selector)` — `useSelector` that also runs the result through `unwrapImmutable`.
- `useRequestState({ keys, operation, successAction, errorAction })` — builds a `requestState` meta object for actions so the `requestStates` reducer can track request outcome (`inProgress`/`value`/`error`) per key.
- `useNotificationRequestState({ keys, operation, successAction, errorAction })` — like the above, but drives toast/notification display (via `NotificationContext`) on completion instead of/in addition to flags.
- `useDispatchWithErrorHandling(...)` (`executeDispatchWithErrorHandling`) — dispatches an action and pushes a formatted global error message (`pushGlobalErrorMessage`) on failure, using `responseProcessingHelper` to extract API error details.
- `useDispatchWithModulesData()` — a `dispatch` wrapper that auto-appends the current module name (and optionally section name) as trailing action-creator arguments, for actions that are module-scoped.
- `useEditState` / `useMultipleFieldEditState` / `useFullEntityEditState` — field-level and whole-entity edit-state management (dirty tracking, per-field validation via `modelValidationHelper`, dispatched through `useDispatchWithModulesData`) backing in-place edit forms.
- `useScopeGuardLoader(actions, cutoutSelector)` — like `useLoader`, but suppresses loading while a scope change is in progress (`getScopeChangeInProgress`).
- `useInMemoryPaging({ viewStateName, tableRef, ... })` — client-side pagination over an already-loaded dataset, backed by view state.
- `useInfiniteScroll(entities, pageSize, countOffset)` — reveals more of an in-memory `entities` array as the user scrolls.
- `useLabelMessage(...)` — resolves a label that may be a plain string, message descriptor, or state-selector-driven message with values.
- `useDaysAndMonthsLocalization()` — localized weekday/month name arrays for date pickers, via `react-intl` + `sharedMessages`.
- `usePreviousModified(value, effectAction, predicate)` — tracks a value's previous version and fires `effectAction(value, previous)` when `predicate` says it materially changed.

## Commands

Run everything from the repo root with npm (Node >= 18, npm >= 9; `legacy-peer-deps=true` is set in `.npmrc`).

- `npm test` — run the full Jest suite (`orc-scripts test`)
- `npm test -- src/utils/safeGet.test.js` — run a single test file (extra args pass through to Jest)
- `npm test -- -t "some test name"` — filter by test name
- `npm run coverage` — run tests with coverage, enforced at **100% branches/functions/lines/statements** (`jest.coverageconfig.js`); CI will fail under this threshold
- `npm run lint` — ESLint over `src` (config extends `orc-scripts`'s shared config)
- `npm run build` — full build (`orc-scripts prep` then `build:source`, excluding `*.test.js` and translations)
- `npm run watch` — build in watch mode
- `npm run extract` — extract `react-intl` message descriptors into the translation files
- `npm run icons` — regenerate the icon sprite sheet (`src/content/icons.svg`) from source icons
- `npm run generateApi` — regenerate `src/actions/requestsApi.js`
- `npm run generateWindowsZone` — regenerate `src/timezones.json`

Linting and formatting also run automatically on commit via `lint-staged`/husky (`prettier --write`, `eslint --max-warnings=0`, and translation JSON validation).

Build tooling, ESLint/Prettier/Babel/Jest configs are not defined locally — they're all thin wrappers importing from the `orc-scripts` package (`node_modules/orc-scripts/src/config/*`). If a config question comes up, look there rather than in this repo's root config files.

## Testing conventions

**Coverage must stay at 100% (branches, functions, lines, statements)** — `jest.coverageconfig.js` sets `coverageThreshold.global` to 100 across the board, and `npm run coverage` (what CI runs) fails the build if any file drops below that. Every new branch (including error paths, default parameters, and `||`/`??` fallbacks) needs a covering test; there is no partial-coverage allowance to lean on.

Tests use **`unexpected`** (with `unexpected-dom`, `unexpected-reaction`, `unexpected-sinon`, `unexpected-immutable`, plus project-specific assertions) as a global `expect`, installed via Jest's `setupFilesAfterEach` — **not** Jest's built-in `expect` matcher API. Assertions read as sentences:

```js
expect(safeGet, "when called with", [obj, "foo", "bar"], "to equal", true);
expect(newState, "not to be", oldState).and("to equal", Immutable.fromJS({...}));
expect(reducer, "to be a reducer with initial state", { actives: Immutable.Map(), ... });
```

Notable custom assertions (defined in `orc-scripts`'s `unexpected.js`): `"to be a reducer with initial state"`, `"as a React component"`, `"to be a label"`, `"to be a column definition"` (validates list column-def objects — see `docs/lists.md`). Every test file lives alongside the source file it tests, as `<name>.test.js`.

State in this codebase is **Immutable.js**, not plain JS objects — reducers operate on and return `Immutable.Map`/`Immutable.fromJS` structures. Use `unwrapImmutable` (`src/utils/unwrapImmutable.js`) when a plain JS value is needed at a boundary.

## Other notable top-level files

- `src/constants.js` — shared constant maps used across actions/reducers/components: `applications` (`oms`/`pim`), `scopeTypes`, `platformRoles`, `roleGroups`, etc. Prefer these over re-declaring the same string literals.
- `src/sharedMessages.js` — a large `defineMessages()` block of `react-intl` descriptors reused by multiple components (e.g. `signOut`, `preferences`, weekday/month names for `useDaysAndMonthsLocalization`) — check here before adding a new descriptor that may already exist.
- `src/whyDidYouRerender.js` — dev-only opt-in wiring for the `@welldone-software/why-did-you-render` library (only active when `NODE_ENV === "development"`); import it before other app code (e.g. at the top of `App.js`) in a consuming app to debug unnecessary re-renders. Not used by default.
- `src/index.js` is **not** a normal barrel export — for historical reasons tied to a dependency resolution quirk (see the comment in the file) it currently just re-exports `call-bind`. Consumers are expected to import from subpaths (`orc-shared/src/...`), matching the `exports` map in `package.json` (which only defines `./`, `./src/`, `./dist/`, no `.` root entry) — don't add code to `src/index.js` expecting it to be the package's main entry point.

## Conventions to follow

- Prefer hooks (`src/hooks`) over the corresponding HOCs (`src/hocs`) for new code — most HOCs are explicitly documented as deprecated in `docs/hocs.md` in favor of a hook equivalent.
- Styled-components is the styling approach; theme values come from `getTheme.js` and should be accessed via the `getThemeProp`/`ifFlag`/`switchEnum` prop-function helpers in `src/utils/styledPropFuncs.js` rather than hardcoded.
- Translatable strings are `react-intl` message descriptors (`{ id, defaultMessage }`), not raw strings, wherever a `label`/`message` prop is documented as accepting one. Translation source files are `src/translations/en-US.json` and `src/translations/fr-CA.json`; run `npm run extract` after adding new `defineMessages`/`FormattedMessage` usages rather than hand-editing the JSON.
- Redux API calls go through `makeApiAction`/`makeOrcApiAction` (`src/actions/makeApiAction.js`, `makeOrcApiAction.js`), which build RSAA-shaped actions for `redux-api-middleware` and produce `_REQUEST`/`_SUCCESS`/`_FAILURE` action types — don't hand-roll fetch calls in actions.
- This package is published for external consumption (`main`, `exports`, `files` in `package.json`), so avoid breaking the public shape of `src/` exports without considering downstream consumers.
