# Lists

The `List` component is used to show and handle data that consists of an ordered set of objects, each containing a set of fields of the same shape. Configuring a List component, however, can be moderately complex.

A `List` should always have a `name` property which uniquely identifies it, as it needs to maintain view state (using [the `withViewState` HOC](hocs.md#withviewstatecomponent)).

## Data linkage

Row data is fed into the list via the `rows` property. This should contain an array of objects, each object representing one row. The objects should have at least one field which uniquely identifies them, such as an id number or unique name.

Nested objects and arrays in row fields are possible, [see below](#goingdeep).

## Row identity

By default, the row data objects are identified by their `id` field, but it may be that the identifying field has another name. In this case, setting the `keyField` property on the list as an array containing the field name of the uniquely identifying field will cause the `List` to handle it correctly.

An array longer than one element will adress further into a nested row object. An example row object might look as follows:

```js
{
	id: '0f45a',
	name: 'Alfred Hitchcock',
	address: {
		street: "272nd Street"
		number: "1070",
		city: "Aldergrove",
		province: "BC"
	}
}
```

A path array pointing to the street of the row would look like `['address', 'street']`, and using this array as your `keyfield` means the unique id of this row would be `"272nd Street"`.

### Visualization

Rows can be given different background colors with the `rowBackgroundGetter` prop. The function passed here should have the signature `(Object, Integer) => String(Css color)` - the object passed will be the data object for the row, the number will be that row's number. The return value must be a valid [CSS color description](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value) as a string, or a falsy value (e.g. `undefined`, `false`, an empty string). The resulting color will be inserted in the stylesheet for the row as its background.

This can be used to distinguish certain rows by the value of a data field, or to color alternate rows, among other things.

## Column configuration

### The basics

The basic data column configuration is one which shows the row value as plain text, with a column label. As such, it is defined like this:

```js
{
	fieldName: "someData",
	label: "Some data field"
}
```

The `fieldName` is the name of a variable found in the row object, the `label` is a plain string or message descriptor (as useable by `react-intl`) to be displayed as the column header. An array of these column definition objects should be given to the `List` component as the `columnDef` prop.

The value of `fieldName` can also be an array of field names pointing into a nested object, as [described under Row Identity above](#rowidentity).

### Types

A column definition can have a type field, which will show the value formatted in a certain way. Dates can be shown with `type: 'date'` or `type: 'datetime'`, which formates the date and time according to the current user locale.

Amounts of money are best shown using `type: 'currency'`. To correctly show this type, you should also set the `currency` field, which may be a string containing a three-letter ISO 4217 currency code, or an array indicating the field name of the row where the currency string may be found for each row. Note that even if this field is directly on the row object, the `currency` value should be an array to be interpeted this way.

For boolean values, `type: 'switch'` shows a switch control (using the `Switch` component). The configuration (i.e. properties to be given the component, including captions and colors for on and off state) for this control can be entered in the `switch` field of the column definition object. An `onChange` function should be furnished here to allow operating the switch to have an effect.

Lastly, `type: 'custom'` allows a custom component (given as the `component` field) to be shown in place of the cell, and will be passed the entire row data object as properties. Its `fieldName` will not be used for any purpose other than identification - i.e. it should still have one, but it does not need to refer to a data field on the row object. You can also pass functions through to custom components by using `funcs` field, the contents of an object here will be passed to the component as props.

### Column sorting

Setting a `sort` field in the column definition enables sorting. It should contain a function which takes three parameters:

- `descending`: boolean, true if rows should be sorted in descending order.
- `columnId`: string, the `fieldName` of the column to sort by.
- `columnType`: string, the `type` of the column to be sorted by.

When called, this function should cause the data supplied to the list to be sorted according to the given parameters. In other words, sorting is not automatic, this function is a way for the user to signal that they wish the table to be sorted.

### Value transformation

A column definition may contain a `transform` field, which should be a function which takes the field value and outputs a value of the field's type. This can be used to map machine-readable values to human readable values, to coerce values into a form renderable as the desirable type, etc.

### Row selection

Adding a column definition object like `{ type: 'select' }` will insert a selection column. This should be the first column of the list. The selection is stored in the view state for the list (i.e. if the `name` property of the `List` component is `'orderList'`, the selection will be at `state.getIn(['view', 'orderList', 'selection'])`), and consists of an array of row IDs of selected rows.

## Click handling on rows

It's a common UI pattern to have some kind of effect when a user clicks on a row in a list, typically opening the row's data up in a more detailed interface, or selecting it to be shown elsewhere on screen. This is accomplished by setting a handler function in the `rowOnClick` property of the list. The event target will have a `rowId` in its [dataset](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset) identifying the clicked row.

Clicking on selection checkboxes or switches in a row will not fire the row click handler.

## Infinite scroll and virtual rendering

Lists with many items can become slow and unresponsive to interact with. As well, large datasets can be unmanageable to load at once, slowing down user experience unnecessarily. To work around this, the `List` component supports infinite scrolling and virtual rendering. Infinite scrolling means that, as the user scrolls close to the end of the currently available list, a request is sent off to load in more items. Virtual rendering means that the list only renders the items needed to display the current screen, greatly speeding up handling.

To set up infinite scrolling, you will need a way to paginate your data - to divide it into equally sized pages of items. Then, you provide a function which, when called with a page number loads in the items on that page, as the `scrollLoader` property. When the user scrolls close to the bottom of the list (how close can be set by the `loadTrigger` property - it takes a numeric value, in pixels), the function will be called with the next page of information to be loaded.

For keeping track of the current situation, you should provide three pieces of bookkeeping data to the `List`: How many items are currently loaded, in the `length` property, the number of the latest page loaded, in `latestPage`, and the length of a page in items, in `pageLength` - the default is 20.
