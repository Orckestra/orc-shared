import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { IntlProvider } from "react-intl";
import { Ignore } from "unexpected-reaction";
import Icon from "./MaterialUI/DataDisplay/Icon";
import FullToastList, { Toast } from "./ToastList";
import { CSSTransition } from "react-transition-group";

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
				<CSSTransition in>
					<div>
						<span>[No message]</span>
					</div>
				</CSSTransition>,
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
			<CSSTransition in>
				<div>
					<span>this is a toast</span>
				</div>
			</CSSTransition>,
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
					<Toast in message={{ id: "test.toast", defaultMessage: "This is a toast" }} />
				</IntlProvider>
			</Provider>,
			"when mounted",
			"to satisfy",
			<CSSTransition in>
				<div>
					<span>This is a toast</span>
				</div>
			</CSSTransition>,
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
			<CSSTransition in>
				<div>
					<Ignore />
				</div>
			</CSSTransition>,
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
			<CSSTransition in>
				<div>
					<Ignore />
					<Icon id="close" onClick={expect.it("to be a function")} />
				</div>
			</CSSTransition>,
		));
});
