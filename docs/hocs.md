# HOCs

Higher order components are useful for providing state to components while keeping from adding render content.

## `withClickOutside(Component)`

Adds support for a `onClickOutside` prop to the component. This prop should be a function, and is used as an event handler for clicks outside the elements rendered by the component. Useful for e.g. closing dropdowns, intercepting clicks outside a modal dialog, etc. Clicks outside are handled during the capture phase, on `window.document`. This permits stopping event propagation at this point, before any DOM elements are allowed to respond to it.

## `withId(name)(Component)`

If no `id` prop is passed to the resulting component, this HOC will generate a pseudo-unique id for the wrapped component to use. Generated ids will be of the shape `"<name><count>"` where `name` is the passed name parameter, and `count` is a counter for that name. Counters are memoized, so subsequent calls to `withId` using the same name will access the same counter.

## `withInfiniteScroll(Component)`

The wrapped component (some form of list which must have consistently vertically sized items) is furnished with the needed functionality to handle infinite scrolling, i.e. a loader function (passed as a prop named `scrollLoader`) is called anytime the user scrolls beyond a certain distance (set via the `loadTrigger` prop, in pixels) of the end of the wrapped component.

Any `onScroll` handler on the resulting component will still be called as per normal.

The resulting component should be given props containing information about the list's current state: `length` should be a count of items currently loaded, `latestPage` should be the page number of the latest page loaded, and `pageLength` can be set if pages contain a different number of items than the default 20.

A `virtual` flag prop will be set on the wrapped component, to signal that it may want to render itself with virtual scrolling for performance reasons.

## `withInitialLoad(loaderName, test)(Component)`

When the wrapped component is mounted, the loader func in the prop named by `loaderName` is called. A `test` function may be included, which takes the props given and should return a boolean - if false, the loader is not called.

## `withLocaleSwitch(Component)`

Provides a click event handler to the component, which will attempt to change the locale to the one given in its `locale` prop.

## `withNavigationLink(Component)`

Sets an `onClick` prop on the wrapped component that will attempt to navigate to the path given in the `href` prop. If this is a local path, browser navigation is prevented, and navigation is handled via Redux and `redux-little-router`.

## `withRequestActivity(request)(Component)`

If the `request` named is currently in progress (i.e. we are between a `<request>_REQUEST` action and a `<request>_SUCCESS` or `<request>_FAILURE` action being dispatched), the wrapped component will have an `active` prop set to true. This allows the component to indicate loading status to the user.

## `withScrollBox(Component)`

The given component will be wrapped in a scrollable `<div>`, and is passed a `height` prop containing the height in pixels of that element as currently rendered, updated on resize.

## `withToggle(propname)(Component)`

Sets up a boolean property on the component, toggled with the `toggle` function property.

## `withViewState(Component)`

Sets the component up with a view state according to the `name` property provided. This includes all keys found in the `view` segment of the state, provided as props, and an `updateViewState(key, value)` function, which sets the appropriate key in the component's view state.
