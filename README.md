# Shared code for Orckestra applications

[![Build Status](https://travis-ci.org/Orckestra/orc-shared.svg?branch=master)](https://travis-ci.org/Orckestra/orc-shared) [![Coverage Status](https://coveralls.io/repos/github/Orckestra/orc-shared/badge.svg?branch=master)](https://coveralls.io/github/Orckestra/orc-shared?branch=master)

A collection of useful, generally applicable pieces of code, used to build Orckestra applications.

## Top-level

Top level shared code is used to set up the standard infrastructure of Orckestra apps.

### `buildState(routes, reducers, supportedLocales)`

Constructs a state store with support for dev tools (as browser extension), routing, localization, API access and Immutable state.

`routes`: A routing object as used by `redux-little-router`.

`reducers`: A plain JS object containing reducer functions as consumed by [`combineReducers()` from `redux-immutable`](https://github.com/gajus/redux-immutable#usage). The returned store will use the keys of the reducers as their keys in the state. Should not contain the keys `view`, `locale` or `router`, as these are in use for view state, internationalization and routing, respectively.

`supportedLocales`: An array of IETF language tags, designating which locales are to be supported. The first tag in the list will be the initially selected locale.

### `addLocales(...locales)`

Loads in locale data for `react-intl` for the given top-level locales. Usually not needed in the app, used by `localeFactory` to ensure locale data is loaded for the supported locales.

`locales`: A list of locale names, specifying only the language portion (i.e. 'en' rather than 'en-US').

### utils

The `utils.js` file contains a number of useful utility functions, some for use with styled components, some more generally applicable.

`safeGet(obj, path1, path2, ...)` fetches the value found in the object at the end of all path steps given, or undefined if a step fails. Ex. `safeGet({ foo: {bar: 'hat'}}, "foo", "bar")` returns `"hat"`.

`getThemeProp(path, defaultValue)` will return a prop function (suitable for use in a styled-components template string) that finds the value indicated by `path` (an array of strings), or returns `defaultValue` if that fails. Both `defaultValue` and elements of `path` may be prop functions themselves.

`ifFlag(flag, thenVal, elseVal)` returns a prop function that checks if a prop of name `flag` is true, and returns `thenVal` if it is, `elseVal` if it is not. Both of the value parameters may be prop functions.

`unwrapImmutable(maybeImmutable)` takes a value, and if it is immutable (as in Immutable.JS), returns the JS value of it, otherwise it returns the value itself.

`logPass(x)` takes any value, logs it to console and returns it. This is useful for inserting log calls in blockless arrow functions.

`normalizeForSearch(searchStr)` lowercases the search string and strips accents from it to ease comparisons between strings. Note: on IE11, accent stripping does not work.

`flatten(array)` will flatten nested arrays, resulting in a single-level array. Order of elements is maintained.

`setTranslation(locale, object, path1, path2, ...)` will look in `object` at the path location (see `safeGet` above), and if found will replace a translation message structure (ex.: `{ 'en-US': 'A hat', 'fr-FR': 'Un chapeau' }`) with the string indicated by `locale`. If no match is found, the first given message string will be used as a default.

`debounce(func, wait, immediate)` handles many rapid calls in succession by waiting until calls have ceased for `wait` milliseconds before calling `func`. If `immediate` is true, it will call `func` immediately, and then debounce further calls as per the above.

## Actions

### Locale: `changeLocale(locale)`

Generates an action that will cause the locale to be switched to the given tag. See also `localeFactory` under reducers.

`locale`: An IETF language tag, e.g. 'en', 'fr-CA'.

### API actions: `makeApiAction(name, endpoint, method, options)`

Returns a valid RSAA from the arguments given, with sensible defaults. Name and endpoint parameters are required.

`name`: The base name of the action types that will be used to signal beginning and conclusion of the request. Actions used will be generated with `makeActionTypes(name)`.

`endpoint`: The URL of the endpoint that is being accessed.

`method`: The HTTP method used to access the endpoint. Defaults to 'GET'.

`options`: An object with optional settings. Allowed options are `headers`, `body`, `options`, `credentials`, `bailout`. Apart from `bailout`, these are used directly as `fetch()` options and should fulfill appropriate format. `bailout` is a function that, when called with the current state at the start of the request will cancel the request if it returns true.

#### `makeActionTypes(name)`

Creates an array of three action types, based on `name`. The action types will be `<name>_REQUEST`, dispatched at the start of the request, `<name>_SUCCESS`, dispatched at successful conclusion of the request, and `<name>_FAILURE`, which is dispatched in case of error.

### View state

Provides actions for setting partial or complete view state for named components (see also `reducers/view` and `hocs/withViewState` below).

## Components

### AppFrame

`applications`: A list of applications to be made available in the application selector. An application is defined as an object containing `url`, `name`, `iconUri` and `displayName` values.

`applicationId`: The `name` of the current application as given in `applications`.

`modules`: A list of modules provided by this application, given as objects containing an `id` (used to generate its URL), a `component` to render, and an `icon` and a `label` (`react-intl` message descriptor) to show in the sidebar menu.

`menuLabel`: The label for the topbar menu. Typically the logged-in user's email.

`menuItems`: A list of items in the topbar menu, given as objects containing `label` (`react-intl` message descriptor), `handler`function for selecting the item, and an `icon` id to show.

`scopeHOC`: A higher-order component that furnishes the scope selector with properties. See `Scope` component for the props this should provide.

Intended as the outermost visual component of an application, and handles the sidebar with the application selector and main menu, and the top bar with user menu and help popup. Modules will be rendered as links in the sidebar, and as routes to components in the viewport.

### Button

`primary`: If this flag is set, the button will be highlighted as a primary button.

`active`: If this flag is set, the button will be shown as currently active. Implies a toggle function.

A styled `<button>`, set up to look consistent across the UI. Use this as a drop-in replacement for `<button>` elements.

### Checkbox

Shows a pretty checkbox. The same props are accepted as for `<input type="checked" />` elements. Use `value` for whether the checkbox is checked or not, rather than `checked`. If no `id` is passed, one will be generated and used.

### DevPages

`children`: Children of the component will be rendered on routes not starting with `/dev`.

Inserts a set of developer pages to be found under `/dev/<page>`. In production, this should be replaced with a passthrough component that directly renders its child.

### DropMenu

`menuLabel`: The menu anchor label text.

`menuItems`: A list of objects with `label` and `handler` properties. The former is the text to show, the latter the function to call on clicking the item.

A simple menu component that will show a list of items when clicked. Assigning it a class will apply it to the menu anchor, allowing it to be styled with Styled Components.

### I18n

Pre-connected internationalization-provider. Use this as a wrapper component for your app, inside your redux provider, and outside any internationalized content. Uses `react-intl`, and expects a state store created with `buildState`, above, or at least one including a `locale` reducer created by `reducers/localeFactory`. Needs no further properties.

### Icon

`id`: ID of the icon to display.

Shows a single SVG icon, according to the icon id given. Requires `content/icons.svg` (or another, similarly structured SVG sprite sheet) to have been inserted in the DOM. Size is controlled by setting the CSS font-size.

### Input

A styled input field to be used in place of `<input>`. Takes the same props as this element and should be used as a replacement of it. Avoid using this for checkboxes, instead use the `Checkbox` component.

### List

`columnDefs`: An array of objects, each describing one column in the table.

`rows`: An array of data objects, each corresponding to one row in the table. Shopuld contain the fields defined in `columnDefs`, and importantly, the `keyField` (q.v.).

`rowOnClick`: A click handler for rows. The target element of the event will have `data-row-id` set, which can be accessed via `event.target.dataset["rowId"]`, and which contains the row ID of the row that was clicked (see also `keyField`). This handler is not fired when the click was on a form element (i.e. `<input>`, `<select>`, `<label>`).

`keyField`: A key name (or key path) pointing to a member on each row that is uniquely identifying. This value will be used to reference the row in selections, the `rowOnClick` handler, etc.

`scrollLoader`: A function that, given a page number, loads in more items for the list.

Configurable list component. Shows a table of information, according to the given configuration. If the `scrollLoader` prop is present, the list will be rendered with virtual scrolling, and the loader function will be called everytime the user scrolls close to the botton of the list. Props for controlling infinite scroll can be found in documentation of the `withInfiniteScroll` HOC, which is used to add this functionality.

### Modal

`look`: The appearance of the dialog box. One of `'default'` or `'dark'`.

`anchor`: A React Node (i.e. legal JSX output) to be rendered as the anchor element. This will have a `toggle` function prop set on it by Modal, which when invoked will toggle visibility of the dialog.

`content`: A React Node (i.e. legal JSX output) to be rendered as the dialog contents. This will have a `toggle` function prop set on it by Modal, which when invoked will toggle visibility of the dialog.

Shows a modal dialog box, which will close if clicked outside. Children of the component tag will be rendered inside the dialog box.

### Scope

`currentScope`: The currenlty selected scope, as stored in state.

`getScope`: A function that will get a single scope by name

`filterPlaceholder`: A message descriptor to be used as the placeholder in the filter input.

A component that shows a scope bar with slide-out scope selector. Uses Redux view state to control scope selector panel visibility, scope filtering, and the scope tree state.

### Sidepanel

`timeout`: The time taken for the sliding animation, in milliseconds. Default 1000.

`width`: The width of the panel. Controls both element size and animation. Default 200px.

Renders a side panel which will slide into view from the left side of the screen. Can and should be styled with `styled-components`.

### SpriteSheet

Displays all available icons along with the ids to access them.

### Switch

`onCaption`: A message descriptor (as used by `react-intl`) to be shown when the switch is on.

`offCaption`: A message descriptor (as used by `react-intl`) to be shown when the switch is off.

`onColor`: A string containing a CSS color value. The switch will show this color when on.

`offColor`: A string containing a CSS color value. The switch will show this color when off.

Displays a horizontal toggle switch. This is a wrapper around a `<input type="checkbox" />`, so any props that work with that will also work here. Use `value` to set the value, not `checked`. If no `id` is passed, one will be generated and used.

### Treeview

`Content`: A React component. This will render the leaf nodes of the tree. Default: a null component.

`getNode`: A function which takes a node id, and returns a data object for the node containing at least the node id, and the ids of any children. If no object is returned, the node will not be rendered. Default: Returns null.

`rootId`: An id identifying the root node of the tree.

`nodeState`: An object containing ids of open nodes.

`updateNodeState`: A function to update the `nodeState` with, takes the modified `nodeState`. Default: No-op.

`openAll`: If truthy all nodes are rendered as open, regardless of `nodeState`.

Renders a tree view, with opening and closing nodes. The data for a given node, as well as any extra props given to the Treeview, will be passed on to any rendered `Content` elements as props. This means that an onClick handler on `Treeview` will be given to all its `Content` elements, for instance.

## HOCs

### `withClickOutside(Component)`

Adds support for a `onClickOutside` prop to the component. This prop should be a function, and is used as an event handler for clicks outside the elements rendered by the component. Useful for e.g. closing dropdowns, intercepting clicks outside a modal dialog, etc. Clicks outside are handled during the capture phase, on `window.document`. This permits stopping event propagation at this point, before any DOM elements are allowed to respond to it.

### `withId(name)(Component)`

If no `id` prop is passed to the resulting component, this HOC will generate a pseudo-unique id for the wrapped component to use. Generated ids will be of the shape `"<name><count>"` where `name` is the passed name parameter, and `count` is a counter for that name. Counters are memoized, so subsequent calls to `withId` using the same name will access the same counter.

### `withInfiniteScroll(Component)`

The wrapped component (some form of list which must have consistently vertically sized items) is furnished with the needed functionality to handle infinite scrolling, i.e. a loader function (passed as a prop named `scrollLoader`) is called anytime the user scrolls beyond a certain distance (set via the `loadTrigger` prop, in pixels) of the end of the wrapped component.

Any `onScroll` handler on the resulting component will still be called as per normal.

The resulting component should be given props containing information about the list's current state: `length` should be a count of items currently loaded, `latestPage` should be the page number of the latest page loaded, and `pageLength` can be set if pages contain a different number of items than the default 20.

A `virtual` flag prop will be set on the wrapped component, to signal that it may want to render itself virtually for performance reasons.

### `withInitialLoad(loaderName, test)(Component)`

When the wrapped component is mounted, the loader func in the prop named by `loaderName` is called. A `test` function may be included, which takes the props given and should return a boolean - if false, the loader is not called.

### `withLocaleSwitch(Component)`

Provides a click event handler to the component, which will attempt to change the locale to the one given in its `locale` prop.

## `withNavigationLink(Component)`

Sets an `onClick` prop on the wrapped component that will attempt to navigate to the path given in the `href` prop. If this is a local path, browser navigation is prevented, and navigation is handled via Redux and `redux-little-router`.

### `withScrollBox(Component)`

The given component will be wrapped in a scrollable `<div>`, and is passed a `height` prop containing the height in pixels of that element as currently rendered, updated on resize.

### `withToggle(propname)(Component)`

Sets up a boolean property on the component, toggled with the `toggle` function property.

### `withViewState(Component)`

Sets the component up with a view state according to the `name` property provided. This includes all keys found in the `view` segment of the state, provided as props, and an `updateViewState(key, value)` function, which sets the appropriate key in the component's view state.

## Reducers

### `localeFactory(supportedLocales)`

Usually not used directly, as it is included in state stores created with `buildstate`. This factory creates a locale reducer from a list of supported locales. This reducer will initially set the selected locale to the first supported locale, and accepts actions to set it to any other. Actions to set unsupported locales will be ignored.

`supportedLocales`: An array of IETF language tags, designating which locales are to be supported.

### `view`

A simple reducer that keeps track of view state objects for named components.

## Selectors

These selectors expect a `buildState` store, or one using `localeFactory` to create its `locale` reducer.

### `breadcrumbs`

Creates a data set suitable for populating a breadcrumb trail based on currently matched routing. It will add a crumb to the trail for each matched route with a `title` field. If this field is a `react-intl` message descriptor it will be translated, and any values in it will be inserted.

If the route match has no field of the same name as the value to be inserted, the URL parameter from the route match will be inserted - i.e. if your path is `/root/item1/edit` and the route matched is `/root/:item/edit`, then a translation message of `'Item {item}'` will have the value `'item1'` inserted.

If, however, the route has a field of the same name containing an array of strings, this will be treated as a path into the state object. As a result, the selector will find the referenced value in the state, and insert that into the translation. This behavior is nested, as well, so these state paths can include e.g. references to route parameters or other state elements. For example, if, in your state, you have a 'data' reducer which contains an index of items, as well as the path and route mentioned above, and the matched route object contains an `item` field with value `['data', ['router', 'params', 'item'], 'label']`, then, first, the inner array is handled, getting the matched parameter value, whereupon the value found in the `item1` field of the state's `data` is returned. In short, your title contains the label, rather than the ID, of the matched item.

### Locale

`currentLocale`: Extracts and returns the currently set locale from the state.

`defaultLocale`: Finds and returns the default locale for the application. This is the first entry in the supported locales list, or if no such list is given, falls back to `'en'`.

### Route

`paramSelector`: Returns the matched parameters of the current route.

`routeSelector`: Returns the matched route string.

`resultSelector`: Returns the matched result object, which includes the parent routes of the currently matched route back to the root, as described in the application's route object.

`getCurrentScope`: Not an actual selector, as this function will return either the current `scope` route parameter, the last set `scope` parameter, or the default scope name (`"Global"`) if no scope has ever been set.

## License

Copyright &copy; 2018 Orckestra Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
