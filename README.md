# Shared code for Orckestra applications

A collection of useful, generally applicable pieces of code, used to build Orckestra applications.

## Top-level

Top level shared code is used to set up the standard infrastructure of Orckestra apps.

### `buildState(routes, reducers, supportedLocales)`

Constructs a state store with support for dev tools (as browser extension), routing, localization, API access and Immutable state.

`routes`: A routing object as used by `redux-little-router`.

`reducers`: A plain JS object containing reducer functions as consumed by [`combineReducers()` from `redux-immutable`](https://github.com/gajus/redux-immutable#usage). The returned store will use the keys of the reducers as their keys in the state. Should not contain the keys `locale` or `router`, as these are in use for internationalization and routing, respectively.

`supportedLocales`: An array of IETF language tags, designating which locales are to be supported. The first tag in the list will be the initially selected locale.

### `addLocales(...locales)`

Loads in locale data for `react-intl` for the given top-level locales. Usually not needed in the app, used by `localeFactory` to ensure locale data is loaded for the supported locales.

`locales`: A list of locale names, specifying only the language portion (i.e. 'en' rather than 'en-US').

## Actions

### `makeApiAction(name, endpoint, method, options)`

Returns a valid RSAA from the arguments given, with sensible defaults. Name and endpoint parameters are required.

`name`: The base name of the action types that will be used to signal beginning and conclusion of the request. Actions used will be generated with `makeActionTypes(name)`.

`endpoint`: The URL of the endpoint that is being accessed.

`method`: The HTTP method used to access the endpoint. Defaults to 'GET'.

`options`: An object with optional settings. Allowed options are `headers`, `body`, `options`, `credentials`, `bailout`. Apart from `bailout`, these are used directly as `fetch()` options and should fulfill appropriate format. `bailout` is a function that, when called with the current state at the start of the request will cancel the request if it returns true.

#### `makeActionTypes(name)`

Creates an array of three action types, based on `name`. The action types will be `<name>_REQUEST`, dispatched at the start of the request, `<name>_SUCCESS`, dispatched at successful conclusion of the request, and `<name>_FAILURE`, which is dispatched in case of error.

### `changeLocale(locale)`

Generates an action that will cause the locale to be switched to the given tag. See also `localeFactory` under reducers.

`locale`: An IETF language tag, e.g. 'en', 'fr-CA'.

## Components

### AppFrame

`topbarConfig`: An object containing the needed information to configure an app frame.

`sidebarConfig`: An object containing the needed information to configure an app frame.

`children`: Children of the component will be rendered into the view port.

Intended as the outermost visual component of an application, and handles the sidebar with the application selector and main menu, and the top bar with breadcrumb trail, user menu and help popup.

### I18n

Pre-connected internationalization-provider. Use this as a wrapper component for your app, inside your redux provider, and outside any internationalized content. Uses `react-intl`, and expects a state store created with `buildState`, above, or at least one including a `locale` reducer created by `reducers/localeFactory`. Needs no further properties.

### DropMenu

`menuLabel`: The menu anchor label text.

`menuItems`: A list of objects with `label` and `handler` properties. The former is the text to show, the latter the function to call on clicking the item.

A simple menu component that will show a list of items when clicked. Assigning it a class will apply it to the menu anchor, allowing it to be styled with Styled Components.

### Icon

`id`: ID of the icon to display.

Shows a single SVG icon, according to the icon id given. Requires `content/icons.svg` (or another, similarly structured SVG sprite sheet) to have been inserted in the DOM. Size is controlled by setting the CSS font-size.

### Modal

`look`: The appearance of the dialog box. One of `'default'` or `'dark'`.

`anchor`: A React Node (i.e. legal JSX output) to be rendered as the anchor element. This will have a `toggle` function prop set on it by Modal, which when invoked will toggle visibility of the dialog.

`content`: A React Node (i.e. legal JSX output) to be rendered as the dialog contents. This will have a `toggle` function prop set on it by Modal, which when invoked will toggle visibility of the dialog.

Shows a modal dialog box, which will close if clicked outside. Children of the component tag will be rendered inside the dialog box.

### SpriteSheet

Displays all available icons along with the ids to access them.

## HOCs

### `withClickOutside(Component)`

Adds support for a `onClickOutside` prop to the component. This prop should be a function, and is used as an event handler for clicks outside the elements rendered by the component. Useful for e.g. closing dropdowns, intercepting clicks outside a modal dialog, etc. Clicks outside are handled during the capture phase, on `window.document`. This permits stopping event propagation at this point, before any DOM elements are allowed to respond to it.

### `withLocaleSwitch(Component)`

Provides a click event handler to the component, which will attempt to change the locale to the one given in its `locale` prop.

### `withToggle(propname)(Component)`

Sets up a boolean property on the component, toggled with the `toggle` function property.

## Reducers

### `localeFactory(supportedLocales)`

Usually not used directly, as it is included in state stores created with `buildstate`. This factory creates a locale reducer from a list of supported locales. This reducer will initially set the selected locale to the first supported locale, and accepts actions to set it to any other. Actions to set unsupported locales will be ignored.

`supportedLocales`: An array of IETF language tags, designating which locales are to be supported.

## Selectors

### `currentLocale`

Extracts and returns the currently set locale from the state. Expects a `buildState` store, or one using `localeFactory` to create its `locale` reducer.

### `breadcrumbs`

Creates a data set suitable for populating the `<AppFrame>` breadcrumb trail based on currently matched routing. It will add a crumb to the trail for each matched route with a `title` field. If this field is a `react-intl` message descriptor it will be translated, and any values in it will be inserted.

If the route match has no field of the same name as the value to be inserted, the URL parameter from the route match will be inserted - i.e. if your path is `/root/item1/edit` and the route matched is `/root/:item/edit`, then a translation message of `'Item {item}'` will have the value `'item1'` inserted.

If, however, the route has a field of the same name containing an array of strings, this will be treated as a path into the state object. As a result, the selector will find the referenced value in the state, and insert that into the translation. This behavior is nested, as well, so these state paths can include e.g. references to route parameters or other state elements. For example, if, in your state, you have a 'data' reducer which contains an index of items, as well as the path and route mentioned above, and the matched route object contains an `item` field with value `['data', ['router', 'params', 'item'], 'label']`, then, first, the inner array is handled, getting the matched parameter value, whereupon the value found in the `item1` field of the state's `data` is returned. In short, your title contains the label, rather than the ID, of the matched item.

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
