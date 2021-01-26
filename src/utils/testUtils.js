import React from "react";
import { isStyledComponent } from "styled-components";
import { mount } from "unexpected-reaction";
import { Ignore } from "unexpected-reaction";
import createThemes from "./../components/MaterialUI/muiThemes";
import { Router, MemoryRouter } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core";
import { StylesProvider } from "@material-ui/core/styles";
import { IntlProvider } from "react-intl";
import { Provider } from "react-redux";

const sinon = require("sinon");

/* istanbul ignore next */
export const spyOnConsole = (spyNames = ["log", "warn", "error"]) => {
	let spiedFuncs;
	beforeEach(() => {
		spiedFuncs = spyNames.map(funcName => {
			const func = sinon.spy().named("console." + funcName);
			const oldFunc = console[funcName];
			console[funcName] = func;
			return oldFunc;
		});
	});
	afterEach(() => {
		spiedFuncs.forEach((func, index) => {
			const name = spyNames[index];
			console[name] = func;
		});
	});
};

export const getElmClasses = (reactElm, container) => {
	const domElm = mount(reactElm, container ? { container } : undefined);
	const classes = domElm.getAttribute("class");
	if (!classes) {
		throw new Error("Class name not found in <" + (reactElm.type.name || reactElm.type) + " />");
	}
	return classes.split(" ");
};

export const getClassName = (reactElm, index = 0, container) => {
	const classes = getElmClasses(reactElm, container);
	return classes[index] || "";
};

export const getClassSelector = (elm, index, container) => {
	if (index < 0) {
		return "." + getElmClasses(elm, container).join(".");
	} else {
		const className = getClassName(elm, index, container) || "";
		return className && "." + className;
	}
};

export const getStyledClassSelector = elm => {
	const component = elm.type || elm;
	if (!isStyledComponent(component)) {
		throw new Error("<" + (component.name || component) + " /> is not a styled component");
	}
	// Styled component toString() function returns a stable class name
	return component.toString();
};

export const firstItemComparator = (a, b) => (a[0] > b[0] ? 1 : a[0] < b[0] ? -1 : 0);

export const PropStruct = React.forwardRef((props, ref) => (
	// TODO: Handle refs sensibly instead of ignoring?
	<dl id={props.id}>
		{Object.entries(props)
			.sort(firstItemComparator)
			.map(([key, value]) =>
				value === undefined || value === null
					? null
					: value === "__ignore"
						? [<Ignore key={"dt-" + key} />, <Ignore key={"dd-" + key} />]
						: [
							<dt key={"dt-" + key}>{`${key}:`}</dt>,
							<dd key={"dd-" + key}>
								{key === "children" ? (
									value
								) : typeof value === "object" ? (
									value["$$typeof"] && value["$$typeof"] === Symbol.for("react.element") ? (
										"React <" + (value.type.name || value.type) + ">"
									) : (
											<PropStruct {...value} />
										)
								) : typeof value === "function" ? (
									"Function"
								) : typeof value === "string" ? (
									`string "${value}"`
								) : typeof value === "symbol" ? (
									`symbol ${value.toString()}`
								) : (
														typeof value + " " + value
													)}
							</dd>,
						],
			)}
	</dl>
));

export const ignoreConsoleError = func => {
	jest.spyOn(console, "error");
	console.error.mockImplementation(() => { });

	func();

	console.error.mockRestore();
};

export const createMuiTheme = () => {
	const applicationTheme = {
		primary: { main: "#1F5B7F" },
	};

	const themeDefinition = {
		palette: {
			primary: {
				lighter: "#f5f5f5",
				light: "#CCC",
				main: "#232323",
				dark: "#000",
				contrastText: "#fff",
			},
		},
	};

	const themes = createThemes(applicationTheme, themeDefinition);

	const muiTheme = themes.muiTheme;

	return muiTheme;
};

export const generateClassName = (rule, styleSheet) => {
	return `${styleSheet.options.classNamePrefix}-${rule.key}`;
};

export function extractMessages() {
	const extractedMessages = {};

	for (let i = 0; i < arguments.length; i++) {
		const messages = arguments[i];
		for (const property in messages) {
			const message = messages[property];
			extractedMessages[message.id] = message.defaultMessage;
		}
	}
	return extractedMessages;
}

export const TestWrapper = ({
	provider,
	intlProvider,
	router,
	memoryRouter,
	stylesProvider,
	muiThemeProvider,
	children
}) => {
	const ProviderWrapper = ({ children }) => {
		if (provider == null) return children;

		return <Provider store={provider.store}>{children}</Provider>
	}

	const IntlProvderWrapper = ({ children }) => {
		if (intlProvider == null) return children;

		return <IntlProvider locale="en-US" timeZone="UTC" messages={intlProvider.messages}>{children}</IntlProvider>;
	}

	const StylesProviderWrapper = ({ children }) => {
		if (stylesProvider == null) return children;

		return <StylesProvider generateClassName={generateClassName}>{children}</StylesProvider>;
	};

	const MuiThemeProviderWrapper = ({ children }) => {
		if (muiThemeProvider == null) return children;

		return <MuiThemeProvider theme={muiThemeProvider.theme}>{children}</MuiThemeProvider>;
	};

	const MemoryRouterWrapper = ({ children }) => {
		if (memoryRouter == null) return children;

		return <MemoryRouter initialEntries={memoryRouter.initialEntries}>{children}</MemoryRouter>;
	};

	const RouterWrapper = ({ children }) => {
		if (router == null) return children;

		return <Router history={router.history}>{children}</Router>;
	};

	return (
		<ProviderWrapper>
			<RouterWrapper>
				<MemoryRouterWrapper>
					<IntlProvderWrapper>
						<StylesProviderWrapper>
							<MuiThemeProviderWrapper>
								{children}
							</MuiThemeProviderWrapper>
						</StylesProviderWrapper>
					</IntlProvderWrapper>
				</MemoryRouterWrapper>
			</RouterWrapper>
		</ProviderWrapper>
	);
};
