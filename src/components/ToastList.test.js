import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { IntlProvider } from "react-intl";
import { Ignore } from "unexpected-reaction";
import { ThemeProvider } from "styled-components";
import { shade } from "polished";
import Icon from "./Icon";
import FullToastList, {
	Toast,
	ToastBox,
	ToastIcon,
	CloseIcon,
} from "./ToastList";

class RenderToast extends React.Component {
	render() {
		return (
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<FullToastList {...this.props} />
			</Provider>
		);
	}
}

describe("ToastList", () => {
	describe("full render", () => {
		let appRoot, toastRoot;
		beforeEach(() => {
			appRoot = document.createElement("div");
			appRoot.id = "app";
			document.body.appendChild(appRoot);
			toastRoot = document.getElementById("toast");
		});
		afterEach(() => {
			try {
				ReactDOM.unmountComponentAtNode(appRoot);
			} catch (err) {
				console.error(err);
			}
			document.body.removeChild(appRoot);
		});

		it("renders in a portal", () => {
			ReactDOM.render(<RenderToast toasts={[{ key: 1 }]} />, appRoot);
			return expect(
				toastRoot,
				"to contain",
				<ToastBox in>
					<Ignore />
					[No message]
				</ToastBox>,
			);
		});
	});
});

describe("Toast", () => {
	it("shows a message", () =>
		expect(
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<Toast in message="this is a toast" />
			</Provider>,
			"when mounted",
			"to satisfy",
			<ToastBox in>
				<Ignore />
				this is a toast
			</ToastBox>,
		));

	it("shows a translated message", () =>
		expect(
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<IntlProvider locale="en">
					<Toast
						in
						message={{ id: "test.toast", defaultMessage: "This is a toast" }}
					/>
				</IntlProvider>
			</Provider>,
			"when mounted",
			"to satisfy",
			<ToastBox in>
				<Ignore />
				This is a toast
			</ToastBox>,
		));

	it("shows an icon", () =>
		expect(
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<Toast in type="confirm" />
			</Provider>,
			"when mounted",
			"to satisfy",
			<ToastBox in>
				<ToastIcon type="confirm" />
				<Ignore />
			</ToastBox>,
		));

	it("shows a close icon if a close function is given", () =>
		expect(
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<Toast in closeFunc={() => {}} />
			</Provider>,
			"when mounted",
			"to satisfy",
			<ToastBox in>
				<Ignore />
				<Ignore />
				<CloseIcon onClick={expect.it("to be a function")} />
			</ToastBox>,
		));

	describe("with types", () => {
		let theme;
		beforeEach(() => {
			theme = {
				toastColors: {
					test: "#ff0000",
				},
				icons: {
					toast: {
						test: "test-icon",
					},
				},
			};
		});

		it("renders a default type", () =>
			expect(
				<Provider
					store={{
						subscribe: () => {},
						dispatch: () => {},
						getState: () => ({}),
					}}
				>
					<ThemeProvider theme={theme}>
						<Toast in />
					</ThemeProvider>
				</Provider>,
				"when mounted",
				"to have style rules satisfying",
				"to contain",
				"background-color: #999;",
			).and("when mounted", "to contain", <Icon id="bubble-chat-2" />));

		it("renders a set type", () =>
			expect(
				<Provider
					store={{
						subscribe: () => {},
						dispatch: () => {},
						getState: () => ({}),
					}}
				>
					<ThemeProvider theme={theme}>
						<Toast in type="test" />
					</ThemeProvider>
				</Provider>,
				"when mounted",
				"to have style rules satisfying",
				"to contain",
				"background-color: #ff0000;",
			).and("when mounted", "to contain", <Icon id="test-icon" />));

		it("darkens close icon background on hover", () =>
			expect(
				<ThemeProvider theme={theme}>
					<CloseIcon type="" />
				</ThemeProvider>,
				"when mounted",
				"to have style rules satisfying",
				"to contain",
				":hover {background-color: " + shade(0.3, "#999") + ";}",
			));

		it("darkens close icon background on hover with set type", () =>
			expect(
				<ThemeProvider theme={theme}>
					<CloseIcon type="test" />
				</ThemeProvider>,
				"when mounted",
				"to have style rules satisfying",
				"to contain",
				":hover {background-color: " + shade(0.3, "#ff0000") + ";}",
			));
	});
});
