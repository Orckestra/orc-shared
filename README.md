# Shared code for Orckestra applications

A collection of useful, generally applicable pieces of code, used to build Orckestra applications.

## Actions

### `makeApiAction(name, endpoint, method, options)`

Returns a valid RSAA from the argumnents given, with sensible defaults. Name and endpoint parameters are required.

`name`: The base name of the action types that will be used to signal beginning and conclusion of the request. Actions used will be generated with `makeActionTypes(name)`.

`endpoint`: The URL of the endpoint that is being accessed.

`method`: The HTTP method used to access the endpoint. Defaults to 'GET'.

`options`: An object with optional settings. Allowed options are `headers`, `body`, `options`, `credentials`, `bailout`. Apart from `bailout`, these are used directly as `fetch()` options and should fulfill appropriate format. `bailout` is a function that, when called with the current state at the start of the request will cancel the request if it returns true.

### `makeActionTypes(name)`

Creates an array of three action types, based on `name`. The action types will be `<name>_REQUEST`, dispatched at the start of the request, `<name>_SUCCESS`, dispatched at successful conclusion of the request, and `<name>_FAILURE`, which is dispatched in case of error.

## Components

### AppFrame

`sidebarConfig`: An object containing the needed information to configure an app frame.

`children`: Children of the component will be rendered into the view port.

Intended as the outermost visual component of an application, and handles the sidebar with the application selector and main menu, and the top bar with breadcrumb trail, user menu and help popup.

### Icon

`id`: ID of the icon to display.

Shows a single SVG icon, according to the icon id given. Requires `content/icons.svg` (or another, similarly structured SVG sprite sheet) to have been inserted in the DOM. Size is controlled by setting the CSS font-size.

### SpriteSheet

Displays all available icons along with the ids to access them.

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
