# Module structure

The module map is the primary means of configuring the application structure. It consists of an object with keys describing module names, and values containing config objects for the respective module.

```js
export const modules = {
	users: {
		label: "Users",
		icon: "person",
		component: UserList,
		pages: { ... },
		subpages: { ... },
		...
	},
	photos: {
		label: "Photo Album",
		icon: "camera",
		segments: { ... }
		...
	},
	demos: {
		...
	},
	...
}
```

A module is described firstly with a label and an icon, which will be used to show it in the module list (the dark sidebar menu with icons, to the left of the application screen). It should have a component as well (but see below), as this will be shown as the module's main page.

## View configurations

Under a module or other view you may have segments, pages, and/or subpages. Each of these is a map of path segments (such as `"/info"` or `"/:pageId"`) to view configurations.

```js
{
	"/info": {
		label: "Info",
		segments: {
			"/names": {
				label: "Names",
				component: NameForm,
			},
			"/locations": {
				label: { id: "info.site.label" defaultMessage: "Office locations" },
				component: LocationMap,
				subpages: {
					"/address": {
						component: LocationAddress,
					}
				}
			}
		}
	},
	"/:orgId": {
		label: { id: "org.label", defaultMessage: "Org: {organizationName}" },
		labelValueSelector: selectOrganization,
		component: OrganizationPage,
		pages: {
			"/members" {
				label: { id: "org.label", defaultMessage: "Members of {shortName}" },
				labelValueSelector: selectOrganization,
				component: OrgMembers,
			}
		}
	}
}
```

Segment views are presented to the user as a list on the left side of the page, with the currently active view shown on the right - to this end it must have a label and component both. A view with segments under it may not have its own component, and may not have pages or subpages directly under it as this clashes with segment rendering. Pages and subpages under the segments themselves are permitted.

Page views must have their own component to show, and a label. They can have subpages, as well. A page view will open a tab showing its label, allowing easy navigation to it.

Subpages do not have labels, and cannot have pages, segments or subpages beneath them. They open as an overlay to their parent view, showing its component. They may also have a `toolStateSelector`, a selector function in their configuration, which returns a Toolbar tool configuration that will be shown together with the button to close the subpage itself (see [the Toolbar test file](../src/components/Toolbar.test.js) for what that configuration should look like). If a `toolFuncSelector` function is added, this will be called with the redux store's `dispatch` function, and the results passed to `toolStateSelector` as its second parameter.

## Labels and label value selectors

In the above example two views have labels which are not simple strings. `/info/locations` has an object containing an id and a default message, which makes it a `react-intl` message descriptor, and allows it to be translated. This is recommended.

`/:orgId` has this too, but the default message includes the substring `{organizationName}`. This is a variable substitution, which allows insertion of values from a data object into the label - in this case the name of an organization. This data is found via a selector, set in the `labelValueSelector` field, which is passed the state, and the match params of the tab it labels. The type format of this selector should be `(params : object) => (state : Immutable.Map) => values : object`. This parameter object will follow the format used by `react-router` - so if the tab path name is `/contoso/members/4`, matched as `/:orgId/members/:memberId`, `params` will be `{ orgId: "contoso", memberId: "4" }`.

In the above example, the selector used would be defined as something like this:

```js
const selectOrganization = params => state =>
	state.getIn(["organizations", params.orgId]);
```

This means we expect that the organization data in the state contains at least an `organizationName` and a `shortName` field.
