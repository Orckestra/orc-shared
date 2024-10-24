# Components

`orc-shared` provides a wide array of components, ranging from simple styled elements to providing complex functionality. This API reference lists them here with their important properties and a description of their functionality.

## AppFrame

- `applications`: A list of applications to be made available in the application selector. An application is defined as an object containing `url`, `name`, `iconUri` and `displayName` values.
- `applicationId`: The `name` of the current application as given in `applications`.
- `modules`: A list of modules provided by this application, given as objects containing an `id` (used to generate its URL), a `component` to render, and an `icon` and a `label` (string or `react-intl` message descriptor) to show in the sidebar menu. See [documentation](moduleFile.md).
- `activeModules`: An object with module names as keys, where the values are either falsy (no notification), or an object. If the object has a `message` key (string or `react-intl` message descriptor), this will be shown as a notification tooltip. If the object has a `type` key (value should a a string of either `"confirm"`, `"warn"` or `"error"` as the case demands), this will be used to dermine the alert color.
- `menuLabel`: The label for the topbar menu. Typically the logged-in user's email.
- `menuItems`: A list of items in the topbar menu, given as objects containing `label` (`react-intl` message descriptor), `handler`function for selecting the item, and an `icon` id to show.
- `noScope`: A flag. If set, scope selector will not be shown.

Intended as the outermost visual component of an application, and handles the sidebar with the application selector and main menu, and the top bar with user menu and help popup. Modules will be rendered as links in the sidebar, and as routes to components in the viewport, along with a scope selector. It also includes showing toasts with a queued [ToastList](#toastlist), as well as About and Preference elements.

## Authenticate

A wrapper component that ensures a user is logged in to the service before rendering anything. Used by [Provision](#provision), (q.v.) thus not to be used directly by app developers.

## Button

- `primary`: If this flag is set, the button will be highlighted as a primary button.
- `active`: If this flag is set, the button will be shown as currently active. Implies a toggle function.

A styled `<button>`, set up to look consistent across the UI. Use this as a drop-in replacement for `<button>` elements where needed. For most purposes, however, the [`IconButton` component](#iconbutton) is a better choice.

## CategoryList

- `columnDefs`: An array of objects, each describing one column in the table.
- `rows`: An array of data objects, each corresponding to one row in the table. Should contain the fields defined in `columnDefs`, and importantly, the `keyField` (q.v.).
- `rowOnClick`: A click handler for rows. The target element of the event will have `data-row-id` set, which can be accessed via `event.target.dataset["rowId"]`, and which contains the row ID of the row that was clicked (see also `keyField`). This handler is not fired when the click was on a form element (i.e. `<input>`, `<select>`, `<label>`).
- `keyField`: A key name (or key path) pointing to a member on each row that is uniquely identifying. This value will be used to reference the row in selections, the `rowOnClick` handler, etc.
- `categoryField`: A name or path (as with `keyField` above) pointing to a member on each row identifying its category. The contents of this field will be used as a label for the category. Defaults to `["category"]`.
- `placeholder`: If a React node is included as this prop, the list, when empty, will display this instead, centered in the area where list elements would be.
- `rowBackgroundGetter`: A function that, given the data for a row and optionally the number of the row, returns a string containing a CSS color (e.g. `"red"`, `"#ff0000"` or `"rgba(255, 0, 0, 0.7)"`)

Configurable list component. Shows a table of information, according to the given configuration, dividing them by categories.

See also the more [detailed documentation for list components](lists.md).

## Checkbox

Shows a pretty checkbox. The same props are accepted as for `<input type="checked" />` elements. Use `value` for whether the checkbox is checked or not, rather than `checked`. If no `id` is passed, one will be generated and used.

## ColumnWrapper

This is a default column wrapper (for column layouts) available to be used by the applications. This will ensure all applications experience the same behavior for columns layouts used in lists.

Here is some sample code on usage:

> ```html
> <ColumnWrapper>
> 	<Toolbar name="{name}" tools="{[]}" />
> 	<List {...{ name, columnDefs, rows: locations }} />
> </ColumnWrapper>
> ```

## DevPages

- `children`: Children of the component will be rendered on routes not starting with `/dev`.

Inserts a set of developer pages to be found under `/dev/<page>`. In production, this should be replaced with a passthrough component that directly renders its child.

## DropMenu

- `menuItems`: A list of objects with `label` and `handler` properties. The former is the text to show, the latter the function to call on clicking the item.
- `alignRight`: A flag that when set causes the menu to be rendered to align with the right edge of the anchor element, instead of the default left.

A simple menu component that will show a list of items when clicked. Assigning it a class will apply it to the wrapper element, allowing it to be positioned if necessary. This component will wrap its children with a click handler that opens the menu, and will pass its state as flag prop `open` to child components to enable showing style differences.

## Form

- `cols`: An array of numbers, each indicating the relative width of a column of the form.
- `formName`: An optional string identifying this form uniquely. Useful when using the same field data for multiple pages.
- `getUpdater`: Should be a function that takes a field name as parameter, and returns a function that updates the named value with the new value given as its parameter.
- `fields`: An array of field definition objects (see below).
- `values`: A data object containing the values to be shown in the form, typically passed in from application state.
- `wide`: A flag that determines if the form should be rendered as fixed-width vertically wrapping columns or a single full width column. This will override anything given in `cols`.

A rather intricate component that creates forms. To do this, it receives a field definition, which it then uses to render in a form that fits the information it is given as values. For more details on field definitions and how they relate to values, please refer to the [detailed documentation.](forms.md)

## GlobalErrorMessages

Can be included in the component tree to display error messages based on data from the redux store.

## Head

Sets the DOM header, and wrapper element attributes, according to the current application state.

## I18n

Redux-connected internationalization-provider. Use this as a wrapper component for your app, inside your redux provider, and outside any internationalized content. Uses `react-intl`, and expects a state store created with `buildState`, above, or at least one including a `locale` reducer created by `reducers/localeFactory`. Needs no further properties. Used by [`<Provision>`](#provision) - if that component is in use, this one is already present.

## Icon

- `id`: ID of the icon to display.

Shows a single SVG icon, according to the icon id given. Requires `content/icons.svg` (or another, similarly structured SVG sprite sheet) to have been inserted in the DOM. Size is controlled by setting the CSS font-size.

## IconButton

- `icon`: ID of icon to show.
- `label`: String or message descriptor of button text label.

Renders a styled button with an icon, a label, or both. This component should be your first choice for this purpose, as it will handle the look and feel of the button in a consistent manner.

Properties not listed above are passed through to the underlying `Button` component, so any handlers, flags (`primary` for example), etc. can be passed this way.

## Input

A styled input field to be used in place of `<input>`. Takes the same props as this element and should be used as a replacement of it. Avoid using this for checkboxes, instead use the `Checkbox` component.

## List

- `columnDefs`: An array of objects, each describing one column in the table.
- `rows`: An array of data objects, each corresponding to one row in the table. Should contain the fields defined in `columnDefs`, and importantly, the `keyField` (q.v.).
- `rowOnClick`: A click handler for rows. The target element of the event will have `data-row-id` set, which can be accessed via `event.target.dataset["rowId"]`, and which contains the row ID of the row that was clicked (see also `keyField`). This handler is not fired when the click was on a form element (i.e. `<input>`, `<select>`, `<label>`).
- `keyField`: A key name (or key path) pointing to a member on each row that is uniquely identifying. This value will be used to reference the row in selections, the `rowOnClick` handler, etc.
- `placeholder`: If a React node is included as this prop, the list, when empty, will display this instead, centered in the area where list elements would be.
- `scrollLoader`: A function that, given a page number, loads in more items for the list.
- `rowBackgroundGetter`: A function that, given the data for a row and optionally the number of the row, returns a string containing a CSS color (e.g. `"red"`, `"#ff0000"` or `"rgba(255, 0, 0, 0.7)"`)

Configurable list component. Shows a table of information, according to the given configuration. If the `scrollLoader` prop is present, the list will be rendered with virtual scrolling, and the loader function will be called everytime the user scrolls close to the botton of the list. Props for controlling infinite scroll can be found in documentation of the `withInfiniteScroll` HOC, which is used to add this functionality.

See also the more [detailed documentation for list components](lists.md).

## LookupSelect

A select control which loads its values from a lookup definition.

## Modal

- `look`: The appearance of the dialog box. One of `'default'` or `'dark'`.
- `anchor`: A React render function to be rendered as the anchor element. This should take a `toggle` function as parameter, which when invoked will toggle visibility of the dialog.
- `content`: A React render function to be rendered as the dialog contents. This should take a `toggle` function as parameter, which when invoked will toggle visibility of the dialog.

Shows a modal dialog box, which will close if clicked outside.

## Modules

- `modules`: An object containing module data: A `label` (typically a message descriptor), an `icon` identifier, a `component` to render the module with, and any `pages` under the module, defined by component and title. See [documentation](moduleFile.md).

Intended to convert a module table into a page rendering system, it sets up a `Navigation` bar (q.v.) and a set of `Route` elements (from `react-router`, via the Routing components in this library) that render the components associated with different routes. Typically used by feeding it the application's module table and placing it as the child of the `AppFrame`.

## MultiSelector

- `options`: A list of objects containing a `label` and `value` field, used to populate the options list.
- `placeholder`: A placeholder text to show if no option is selected.
- `value`: An array of currently selected values.
- `update`: A function which updates the `value` (in application state, typically).

A styled replacement for the `<selector multiple />` element, based on [Selector](#selector) below.

## Navigation

- `modules`: The module object of the application. See [documentation](moduleFile.md).

Renders a tabbed navigation bar for the currently selected module. Used by (Modules)[#modules], above, should not generally be used on its own.

## Placeholder

- `icon`: The `id` of an icon to be shown.
- `title`: A string or message descriptor to be rendered as large text.
- `subtitle`: A string or message descriptor to be shown below the title, slightly smaller.
- `animate`: A flag, if set the icon will rotate.
- `warn`: A flag, if set the placeholder is shown in dark red rather than grey.

Shows an element suitable for being used as a placeholder or load spinner in e.g. lists without content.

## Provision

- `store`: The redux store of the application.
- `theme`: The theme object to be used in the app.

Sets up the various providers and wrappers needed for an application. Should have one child element, in most cases a redux-connected `<AppFrame>`.

## Radio

- `name`: The name used to reference the value of the control.
- `label`: The label for the control.
- `defaultVal`: The default input element value.
- `row`: Displays the group of buttons in a compact row.
- `radios`: The radio buttons to be used, see usage below.
- `disabled`: If defined, the disabled state for all radio buttons
- `update`: The update handler that will be called if the radiobuttun option changes.
- `value`: The current value of the radio button selected.

Allows radio buttons to be displayed and be handled for updates.

The radios option is an array of radio buttons to use, with the following options: - `value`: The value of the radio button. Will be used when calling the update function. - `label`: The label for the radio button. - `disabled`: If disabled is not defined by the group, will determing if the radio button is disabled.

## Relogin

Checks the state, and if logged out renders an iframe that will log in the user again via Azure Active Directory. Used by [Provision](#provision) and should not be used independently.

## Routing Components

These components are used to route and display components according to URL paths. They are primarily internal, and should not be used directly. Instead, see [Modules](#modules).

## Scope

- `filterPlaceholder`: A message descriptor to be used as the placeholder in the filter input.

A component that shows a scope bar with slide-out scope selector. Uses Redux view state to control scope selector panel visibility, scope filtering, and the scope tree state. Included in [AppFrame](#appframe), should probably not be called directly.

The scope object supports a property that isActive; the default is 'true'. If isActive is 'false', then it uses theme.palette.secondary.light colour for the label.

## Selector

- `options`: A list of objects containing a `label` and `value` field, used to populate the options list.
- `placeholder`: A placeholder text to show if no option is selected.
- `value`: The value of the currently selected option.
- `update`: A function which updates the `value` (in application state, typically).

A styled replacement for the standard `<select>` element, widely known for its resistance to styling. Renders a dropdown selector with a list of options, selectable by mouse or keyboard.

## Sidepanel

- `timeout`: The time taken for the sliding animation, in milliseconds. Default 1000.
- `width`: The width of the panel. Controls both element size and animation. Default 200px.

Renders a side panel which will slide into view from the left side of the screen. Can and should be styled with `styled-components`.

## SpriteSheet

Displays all available icons along with the ids to access them.

## StepperModal

- `steps`: The steps (or pages) that are to be available in the component.
- `title`: The title of the component (shown on all steps).
- `open`: True when this component is to be rendered.
- `closeCallback`: The function to call when the cancel button is pressed.
- `confirmCallback`: The function to call when the last step is diplayed and the user selects finish.
- `backdropCallback`: The function to call when the use clicks outside of the component.
- `confirmTitle`: The text for the confirm button on the final step.
- `type`: The type of Moal to use when rendering the component, default is `wide`, options are: `normal`, `wide`, `fullwidth`.

Renders a wizard like component with seperate steps and a Next and Previous button to move between steps

## Switch

- `onCaption`: A string or message descriptor (as used by `react-intl`) to be shown when the switch is on.
- `offCaption`: A string or message descriptor (as used by `react-intl`) to be shown when the switch is off.
- `onColor`: A string containing a CSS color value. The switch will show this color when on.
- `offColor`: A string containing a CSS color value. The switch will show this color when off.

Displays a horizontal toggle switch. This is a wrapper around a `<input type="checkbox" />`, so any props that work with that will also work here. Use `value` to set the value, not `checked`. If no `id` is passed, one will be generated and used.

## Text

- `message`: A string or `react-intl` message descriptor to be rendered.

Will selectively render a plain text string or a translated `react-intl` message. If the message requires values but does not have them along (in `message.values`), will render a placeholder. If it fails (e.g. there is no message or it is faulty) will render the error message in bold bright red.

If `message.value` contains a function, this is interpreted as a Redux selector, and used as such. It is expected to return an object containing values, which will be validated as mentioned above.

## ToastList

- `toasts`: An array containing prop objects for the toasts to be shown, each as follows:
  - `message`: A string or message descriptor containing the text to be shown.
  - `type`: A string denoting the type of toast.
  - `closeFunc`: A function that is called when the close icon is clicked. Optional.

Shows a list of message boxes in the upper right corner, displaying the selected icon and message. It is up to the showing component to determine when to remove a toast, to this end a close function hook is provided to allow user interaction. Types may be defined in the theme by setting `toastColors` and `icons.toast`: each of these should be an object with type names as keys, giving the background color and icon of the toast type, respectively. The list is rendered in a portal with the id `"toast"`, which is automatically created.

## Toolbar

- `tools`: Array of objects denoting the tools to be shown.

Shows a toolbar. The buttons etc. shown on this toolbar are defined via the `tools` prop, which contains an array of objects. Each of these has a type, one of `input`, `button`, `group`, `label`, `separator` and `spacer`, as well as the props to be passed to that tool element.

`input` and `button` will show suitably styled versions of the DOM elements of the same name, and take the same props. `button` also takes a label prop, which can contain an `icon` id and/or a `text`, as per [IconButton](#iconbutton).

`group` has its own `tools` prop, which can be an array of `input` and/or `button` configurations, which will be shown as a joined group of controls.

The `label` type takes a string or message descriptor in its `label` field, and shows it on the toolbar, suitably formatted.

Lastly, `separator` will show a vertical bar, and `spacer` will take up any surplus space available on the toolbar - this can be used to right-justify some tools, in the otherwise left-justified toolbar.

For examples of use, it is recommended to consult the [test file](../src/components/Toolbar.test.js), which demonstrates the available functionality.

## Tooltip

- `message`: The text to be shown, may be a plain string or a message descriptor.

When hovering over the parent element of the tooltip, it will be shown on screen after a 1.5 second delay. It will be positioned to the right of the element. The parent element must be positioned (i.e. must have a `position` style property), or the tooltip will appear in an undefined location.

The tooltip is hidden by moving it outside of view. This is by design, as it allows screen readers to access the text, enabling use by visually impaired users.

## Treeview

- `Content`: A React component. This will render the leaf nodes of the tree. Default: a null component.
- `getNode`: A function which takes a node id, and returns a data object for the node containing at least the node id, and the ids of any children. If no object is returned, the node will not be rendered. Default: Returns null.
- `name`: A name to indicate the view state to use.
- `rootId`: An id identifying the root node of the tree.
- `openAll`: If truthy all nodes are rendered as open, regardless of `nodeState`.

Renders a tree view, with opening and closing nodes and visual indication of the tree's structure. The data for a given node, as well as any extra props (beyond the ones listed above) given to the Treeview, will be passed on to any rendered `Content` elements as props. This means that an onClick handler on `Treeview` will be given to all its `Content` elements, for instance.

`<Content />` must render to exactly 40 pixels height, as otherwise the indicator lines for the tree structure will look wrong. (This limitation will hopefully be removed in future.)
