import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import { shade } from "polished";
import Text from "./Text";
import Icon from "./Icon";
import FullToast, { Toast, ToastBox, ToastIcon, CloseIcon } from "./Toast";

class RenderToast extends React.Component {
	render() {
		return <FullToast {...this.props} />;
	}
}

describe("Toast", () => {
	it("shows a message", () =>
		expect(
			<Toast message="this is a toast" />,
			"to render as",
			<ToastBox>
				<Text message="this is a toast" />
			</ToastBox>,
		));

	it("shows a translated message", () =>
		expect(
			<Toast
				message={{ id: "test.toast", defaultMessage: "This is a toast" }}
			/>,
			"to render as",
			<ToastBox>
				<Text
					message={{ id: "test.toast", defaultMessage: "This is a toast" }}
				/>
			</ToastBox>,
		));

	it("shows an icon", () =>
		expect(
			<Toast type="confirm" />,
			"to render as",
			<ToastBox>
				<ToastIcon type="confirm" />
			</ToastBox>,
		));

	it("shows a close icon if a close function is given", () =>
		expect(
			<Toast closeFunc={() => {}} />,
			"to render as",
			<ToastBox>
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
				<ThemeProvider theme={theme}>
					<Toast />
				</ThemeProvider>,
				"to render style rules",
				"to contain",
				"background-color: #999;",
			).and("when deeply rendered", "to contain", <Icon id="bubble-chat-2" />));

		it("renders a set type", () =>
			expect(
				<ThemeProvider theme={theme}>
					<Toast type="test" />
				</ThemeProvider>,
				"to render style rules",
				"to contain",
				"background-color: #ff0000;",
			).and("when deeply rendered", "to contain", <Icon id="test-icon" />));

		it("darkens close icon background on hover", () =>
			expect(
				<ThemeProvider theme={theme}>
					<CloseIcon type="" />
				</ThemeProvider>,
				"to render style rules",
				"to contain",
				":hover {background-color: " + shade(0.3, "#999") + ";}",
			));

		it("darkens close icon background on hover with set type", () =>
			expect(
				<ThemeProvider theme={theme}>
					<CloseIcon type="test" />
				</ThemeProvider>,
				"to render style rules",
				"to contain",
				":hover {background-color: " + shade(0.3, "#ff0000") + ";}",
			));
	});

	describe("full render", () => {
		let appRoot, modalRoot;
		beforeEach(() => {
			appRoot = document.createElement("div");
			appRoot.id = "app";
			document.body.appendChild(appRoot);
			modalRoot = document.getElementById("toast");
		});
		afterEach(() => {
			try {
				ReactDOM.unmountComponentAtNode(appRoot);
			} catch (_) {}
			document.body.removeChild(appRoot);
		});

		it("renders in a portal", () => {
			const render = ReactDOM.render(<RenderToast />, appRoot);
			return expect(
				render,
				"queried for",
				<Text message="[No message]" />,
			).then(elm => {
				let node = ReactDOM.findDOMNode(elm);
				while (node.parentNode !== document.body) {
					node = node.parentNode;
				}
				return expect(node, "to be", modalRoot);
			});
		});
	});
});
