# Forms

Form pages are the work horses of the UI. This is where you view and edit the information for the work items the application handles, be they products, shops, market segments or anything else.

To select the column layout, provide a `cols` attribute of an array of numbers. These numbers represent the width of their corresponding column, i.e. `[1,1,1]` represents three columns of the same width, while `[1,2]` represents two columns, the second one twice as wide as the first. The default value of `cols` is `[1,1,1]`. (If the legacy `wide` flag is used, any `cols`value will be overridden to `[1]` instead.) Form elements will be divided into columns evenly, so if you have five elements and three columns, the first column will contain elements 1 and 2, second column will have elements 3 and 4, while 5 will be in the last column.

To provide the values entered into the form, a `value` prop should be provided (most likely from application state). An update function should be provided in the `getUpdater` prop that, given a field name, will return a function that will update that field wih the value passed as parameter (example: `fieldName => value => update(fieldName, value)`). This function can be memoized, which may help performance of large forms.

The actual form fields and layout are defined by an array of data objects in the `fields` prop. The objects all hold at least a `type` string, which defines what further information it can use, and what it will be rendered as. See below for information on the different types of fields. Labels (in the `label` field) can be either plain strings or `react-intl` message descriptors.

The `formName` prop is used to distinguish multiple forms using the same field names from each other. If it isn't set, fields with the same name in different forms may interfere with each other.

## Structuring your form

The `Fieldset` type provides a way to bundle together form elements, rendering them as a coherent field set with a title. The title is set in the `label` field of the data object, and the contained fields are given as an array of data objects in the `fields` property.

If there is a need for fields to be combined on a single line - for example inputting an amount and its currency in separate but connected controls - the `Combination` type provides a way to do so. It, like the field set, takes a list of field definitions, but will place them together on the same line.

The relative amount of space given to each field can be set in the `proportions` property, which takes an array of either CSS size values (e.g. `'30px'`, `'12em'`, treated as rigid size definitions) or numbers (which are interpreted as percentages of full width, and can shrink to accommodate other fields).

Combination fields can have a collective `label`, set on the combination itself, or labels on the component fields. An empty string as label will mean that space is set aside for the label without rendering one.

## Lists

Two types of list are available, fixed and variable length, respectively. Both have the `List` type. Fixed length lists have a `rowCount` field and may have a `staticValues` field containing an array of data to be added to the corresponding row. Variable length lists will have a button to add rows, and each row a button to delete it. The add button should be labeled with the `add` field.

In both cases, lists expect a single field definition object in the `rowField` property, but this may be a combination field. Any label given here will be used to build a list head, with each row being rendered as an unlabeled instance of the field definition. If the `tallRows` flag is set, however, labels and fields are rendered together, with a margin and horizontal bar between them. This is useful to emphasize the individual rows, but should be avoided in cases where there are many entries.

Lists handle values presented as arrays of data objects, with fields in those data objects being mapped to named inputs in the row field. On changes (including addition and deletion of rows), they will call the update function with the entire list contents, updated according to which field was changed.

## Read-only data display

Two types, `ReadOnly` and `LineLabel` provide a way to display data without providing editing functionality. The former is useful for showing data values, while the latter prints larger text and is best used for labelling information, such as day names in a table displaying information over a week. Both of these types will accept plain strings and `react-intl` message descriptors as values.

## Basic input fields

The standard input type, which is used for unspecialized text values, is `TextInput`. This, like other basic inputs, can be provided with a `placeholder` and any other attributes applicable to `<input type="text" />` elements.

An `EmailInput` is equivalent to the above, but uses the DOM `<input type="email" />` element. <!-- Additional field types for url, tel, etc.? -->

The `NumberInput` field type provides a setup for entering numbers. It has spinner buttons to increment or decrement the number given, and uses the `<input type="number" />` element to provide native functions.

For picking one of a set of option, the `Selector` input type will provide a classic selection dropdown, with similar semantics to the DOM `<select />` element. The `options` prop should be an array of the available options given as objects containing `label` and `value` fields. See also [the `<Selector>` component](components.md#selector)

## Advanced input fields

Dates have specific constraints and formats depending on locale, but are held in a homogenized format as data, based on the ISO8601 standard - `YYYY-MM-DD`, e.g. `'2014-05-24'`, `'1980-10-01'`. While there exist built-in data input fields in HTML, these vary in implementation, and are uniformly both very ugly and impossible to style. The `DateInput` field will take this data format and construct a set of input fields that follow the selected locale standards, and which have a calendar dropdown available for visual selection of dates, all styled to fit the look of Orckestra applications.

<!-- TimeInput, awaits finalized function -->

Translations to multiple languages can be handled with the `TranslationInput` type. This will start out showing the default language as an input field, with a clickable control to expand other languages. A translator can then expand these fields and insert the translated strings required. The data format is an object with keys containing locales and values the translated message, for example `{ 'en-US': "Hat", 'fr-FR': "Chapeau" }`. This matches the data format for translated messages in the Orckestra Commerce Suite database.

## On/off inputs

Depending on the particular purpose, binary values can be handled with either `CheckboxInput` or `SwitchInput`, both of which allow a value of true or false. The former shows a standard checkbox, useful where a compact or simple control is preferable, while the latter shows a more advanced switch toggle. The switch can be configured to change color and caption as required, using the `onColor`, `offColor`, `onCaption` and `offCaption` props (see also [the `<Switch>` component](components.md#switch)). The caption props can use plain strings, or message descriptors.

## Miscellaneous

Buttons with text and icons are available in the `Button` type. It follows the normal interface of the [`Button` component](components.md#Button), and uses the update function it is provided as a click handler. It may be provided with an `icon` and a `buttonText` (string or message descriptor).

A variable length list shows a circular button with an icon to delete rows from it, and for this it uses the `SmallButton` type. This control may also be used for other functions. The button must be provided with `icon` and an `altText` property describing the button function, to ensure accessibility.
