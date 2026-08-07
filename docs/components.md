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

## ApplicationModuleLoader

- `children`: A single child element, rendered once loading completes.

Waits for the default scope and scope list to be loaded (dispatching `getDefaultScope`/`getScopes` per configured application module) before rendering its child, showing a `Loader` in the meantime. Used by [Provision](#provision)/the app bootstrap sequence, not typically used directly by app developers.

## Authenticate

A wrapper component that ensures a user is logged in to the service before rendering anything. Used by [Provision](#provision), (q.v.) thus not to be used directly by app developers.

## ColumnWrapper

This is a default column wrapper (for column layouts) available to be used by the applications. This will ensure all applications experience the same behavior for columns layouts used in lists.

Here is some sample code on usage:

> ```html
> <ColumnWrapper>
> 	<Toolbar name="{name}" tools="{[]}" />
> 	<List {...{ name, columnDefs, rows: locations }} />
> </ColumnWrapper>
> ```

## Culture

Renders nothing itself, but as a side effect registers a `date-fns` locale (derived from the current `react-intl` locale, with day/month names localized via [`useDaysAndMonthsLocalization`](hooks.md#usedaysandmonthslocalization)) with `react-datepicker`, and sets it as the default locale. Include once near the root of the app (inside the `I18n`/intl provider) so `DatePicker`-based inputs show correctly localized calendars.

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

## InternetExplorerWarningMessage

Renders nothing on any browser except Internet Explorer, where it shows a full-screen modal telling the user to switch to a supported browser (with icons/links for Chrome, Firefox, Edge, Safari, Opera). Detects IE via `window.MSInputMethodContext`/`document.documentMode`.

## LookupSelect

A select control which loads its values from a lookup definition.

## MaterialUI components (`src/components/MaterialUI`)

A wrapper layer over `@material-ui/core` (MUI v4), used where a `styled-components` primitive isn't a good fit (data grids, poppers/autocomplete, transfer lists, etc.). Prefer these wrappers to importing `@material-ui/core` directly in areas that already use them, so styling and theming (`muiThemes.js`, derived from the app's `styled-components` theme via `getTheme`) stay consistent. Notable groups:

- **`DataDisplay/`**: `Table` (plus `TableWithInMemoryPaging`, which pairs it with [`useInMemoryPaging`](hooks.md#useinmemorypaging-viewstatename-tableref-records-pagesize-initialsort-initialfilters-sortandfilterfn-), `TableHeaderCell`, `useTableSelection`), `List`/`SelectionList`/`CollapsableList`, `Modal`, `Notification` (snackbar-style toasts, see `Feedback/` below), `Badge`, `Chip`, `Divider`, `Icon`, `Timeline`/`TimelineItem`, `TransferList`, plus a `PredefinedElements/` and `TooltippedElements/` subfolder of ready-made compositions (e.g. `InformationItem`, used by `Registry`/`TaskDetailsModal`).
- **`Inputs/`**: `Autocomplete`, `Checkbox`/`CheckboxGroup`, `DatePicker`, `TimePicker`, `LookupSelect`, `Radio`/`StandaloneRadio`, `Select`, `Switch`, `InputBase` — MUI-based equivalents of the plain input components, each with a matching `*Props` builder class for constructing props in a discoverable way (see e.g. `ModalProps` used by `TaskDetailsModal`).
- **`Navigation/`**: `TabBar` (what `components/Navigation` actually renders into — see the Navigation tab system notes), `DropDownMenu`, `TabLabel`, `ExternalLink`.
- **`ScopeSelector/`**: `ScopeSelector`, `ScopeTreeView`, `TreeItem` — an MUI-based alternative scope tree UI.
- **`Surfaces/`**: `Paper`, `ExpansionPanel`/`SectionExpansionPanel`.
- **`Feedback/`**: `NotificationContext`/`useNotification` (the context consumed by [`useNotificationRequestState`](hooks.md#usenotificationrequeststate-keys-operation-successmessageid-successmessagevalues-successaction-errormessageid-errormessagevalues-erroraction-)), `loadingScreen`.
- **`hocs/`**: `withDeferredPopper`, `withDeferredTooltip` — defer mounting a Popper/Tooltip's content until first shown, for performance.

## MenuButton

- `options`: An array of options. Each option must have the following properties:
  - `key`: A key used to identify the option
  - `component`: A React component this will render the option
  - `disabled`: A boolean the disable or enable the option
  - `action`: A method to call when the option is clicked
- `label`: The button label

Renders a button with an integrated menu. The menu will be positioned below the button. The options are displayed in the order they are defined in the `options` array. The options are divided using the `Divider` component using the `light` and `middle` variant.

## Modal

- `look`: The appearance of the dialog box. One of `'default'` or `'dark'`.
- `anchor`: A React render function to be rendered as the anchor element. This should take a `toggle` function as parameter, which when invoked will toggle visibility of the dialog.
- `content`: A React render function to be rendered as the dialog contents. This should take a `toggle` function as parameter, which when invoked will toggle visibility of the dialog.

Shows a modal dialog box, which will close if clicked outside.

## Modules

- `modules`: An object containing module data: A `label` (typically a message descriptor), an `icon` identifier, a `component` to render the module with, and any `pages` under the module, defined by component and title. See [documentation](moduleFile.md).

Intended to convert a module table into a page rendering system, it sets up a `Navigation` bar (q.v.) and a set of `Route` elements (from `react-router`, via the Routing components in this library) that render the components associated with different routes. Typically used by feeding it the application's module table and placing it as the child of the `AppFrame`.

## Navigation

- `modules`: The module object of the application. See [documentation](moduleFile.md).

Renders a tabbed navigation bar for the currently selected module. Used by (Modules)[#modules], above, should not generally be used on its own.

## Placeholder

- `icon`: The `id` of an icon to be shown.
- `title`: A string or message descriptor to be rendered as large text.
- `subtitle`: A string or message descriptor to be shown below the title, slightly smaller.
- `animateIcon`: A flag, if set the icon will rotate.
- `error`: A flag, if set the placeholder is shown in dark red rather than grey.

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

## Registry

- `dateCreated` / `createdBy` / `lastModifiedDate` / `lastModifiedBy`: Optional; when present, rendered as a localized-date/plain-text information row (only fields that are `!== undefined` are shown).
- `additionalContent`: An array of `{ label, content }` objects, each rendered as an extra information row after the built-in ones.

Displays a small "audit trail" panel (created/last modified date and user) for an entity, using MUI's `InformationItem` under the hood.

## Relogin

Checks the state, and if logged out renders an iframe that will log in the user again via Azure Active Directory. Used by [Provision](#provision) and should not be used independently.

## Routing Components

These components are used to route and display components according to URL paths. They are primarily internal, and should not be used directly. Instead, see [Modules](#modules).

## Scope

- `filterPlaceholder`: A message descriptor to be used as the placeholder in the filter input.

A component that shows a scope bar with slide-out scope selector. Uses Redux view state to control scope selector panel visibility, scope filtering, and the scope tree state. Included in [AppFrame](#appframe), should probably not be called directly.

The scope object supports a property that isActive; the default is 'true'. If isActive is 'false', then it uses theme.palette.secondary.light colour for the label.

## ScopeExtendedConfigurationLoader

Renders nothing; as a side effect, dispatches `getScopeExtendedConfiguration` whenever the currently selected scope changes. Include once near the root of the app (alongside/after `Scope`) so extended per-scope configuration stays loaded as the user switches scopes.

## Sidepanel

- `timeout`: The time taken for the sliding animation, in milliseconds. Default 1000.
- `width`: The width of the panel. Controls both element size and animation. Default 200px.

Renders a side panel which will slide into view from the left side of the screen.

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

## TaskDetailsModal

- `taskId`: The id of the background task to show details for.
- `open`: Whether the modal is shown.
- `closeModal`: Called when the modal is closed.

Shows a modal with a background task's status and log output (loaded/polled via `getTaskInfo`/`getTaskLog` every 10 seconds until the task reaches a terminal status), built on the MUI `Modal`.

## ToastList

- `toasts`: An array containing prop objects for the toasts to be shown, each as follows:
  - `message`: A string or message descriptor containing the text to be shown.
  - `type`: A string denoting the type of toast.
  - `closeFunc`: A function that is called when the close icon is clicked. Optional.

Shows a list of message boxes in the upper right corner, displaying the selected icon and message. It is up to the showing component to determine when to remove a toast, to this end a close function hook is provided to allow user interaction. Types may be defined in the theme by setting `toastColors` and `icons.toast`: each of these should be an object with type names as keys, giving the background color and icon of the toast type, respectively. The list is rendered in a portal with the id `"toast"`, which is automatically created.

## Treeview

- `Content`: A React component. This will render the leaf nodes of the tree. Default: a null component.
- `getNode`: A function which takes a node id, and returns a data object for the node containing at least the node id, and the ids of any children. If no object is returned, the node will not be rendered. Default: Returns null.
- `name`: A name to indicate the view state to use.
- `rootId`: An id identifying the root node of the tree.
- `openAll`: If truthy all nodes are rendered as open, regardless of `nodeState`.

Renders a tree view, with opening and closing nodes and visual indication of the tree's structure. The data for a given node, as well as any extra props (beyond the ones listed above) given to the Treeview, will be passed on to any rendered `Content` elements as props. This means that an onClick handler on `Treeview` will be given to all its `Content` elements, for instance.

`<Content />` must render to exactly 40 pixels height, as otherwise the indicator lines for the tree structure will look wrong. (This limitation will hopefully be removed in future.)
