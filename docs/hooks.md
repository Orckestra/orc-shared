# Hooks

For documentation on how to use hooks, please see [the React documentation](https://reactjs.org/docs/hooks-intro.html).

## `useLoader(loadActions, cutoutSelector)`

This hook sets up a side effect, such that whenever the `cutoutSelector` returns a falsy value (such as if there are zero rows in a list, for example) it will dispatch the `loadActions` (which can be a single action object or an array of them) on render. Be mindful of changing the `loadActions`, such as for example constructing the value in a function call -- this will cause the action(s) to be dispatched, as the hook checks on each rendering. Memoizing functions or creating static action objects for use with this hook is beneficial.

## `useToggle(init)`

Returns `[flag, toggle, reset]` of a flag value with toggle and reset functions. The `init` parameter specifies the initial value of the flag.
