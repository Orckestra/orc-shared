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
		dataPath: ["dataObjects", "organizations"],
		dataIdParam: ["orgId"],
		component: OrganizationPage,
		pages: {
			"/members" {
				label: "Member list"
				component: OrgMembers,
			}
		}
	}
}
```

Segment views are presented to the user as a list on the left side of the page, with the currently active view shown on the right - to this end it must have a label and component both. A view with segments under it may omit having its own component configured, and may not have subpages as this clashes with segment rendering.

Page views must have their own component to show, and a label. They can have subpages, as well. A page view will open a tab showing its label, allowing easy navigation to it.

Subpages are very limited, in that they do not have labels, and cannot have pages, segments of subpages beneath them. They open as an overlay to their parent view, showing its component.

## Labels, data paths and ID parameters

In the above example two views have labels which are not simple strings. `/info/locations` has an object containing an id and a default message, which makes it a `react-intl` message descriptor, and allows it to be translated. This is recommended.

`/:orgId` has this too, but the default message includes the substring `{organizationName}`. This is a variable substitution, which allows insertion of values from a data object into the label - in this case the name of an organization. To access this data object, the two settings `dataPath` and `dataIdParam` are used. The former is an array of names, indicating where in the application state (in the Redux store) to find the data object. `dataIdParam` appends the value of the URL param (identified by a colon-prefixed name in the path, i.e. `orgId`, matching `"/:orgId"`, in the example) to the `dataPath`, pointing to a specific item in a list. So if our current path name is `/contoso`, the effective data path becomes `["dataObjects", "organizations", "contoso"]` - and that data object's `organizationName` member then gets inserted into the label.
