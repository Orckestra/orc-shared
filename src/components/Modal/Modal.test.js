import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { Modal } from "./index";
import Wrapper from "./Wrapper";
import Background from "./Background";
import Dialog from "./Dialog";

const TestComp1 = () => <div />;
const TestComp2 = () => <div />;

describe("Modal", () => {
	let appRoot, modalRoot, toggle;
	beforeEach(() => {
		appRoot = document.createElement("div");
		appRoot.id = "app";
		document.body.appendChild(appRoot);
		modalRoot = document.createElement("div");
		modalRoot.id = "modal";
		document.body.appendChild(modalRoot);
		toggle = () => {};
	});
	afterEach(() => {
		try {
			ReactDOM.unmountComponentAtNode(appRoot);
		} catch (_) {}
		document.body.removeChild(appRoot);
		document.body.removeChild(modalRoot);
	});

	it("renders the structure of a modal dialog", () =>
		expect(
			<Modal
				initShow={true}
				anchor={toggle => <TestComp1 toggle={toggle} />}
				content={toggle => <TestComp2 toggle={toggle} />}
				look="dark"
			/>,
			"when mounted",
			"to satisfy",
			<Fragment>
				<TestComp1 toggle={toggle} />
				<Wrapper timeout={300}>
					<Background />
					<Dialog look="dark" onClickOutside={toggle}>
						<TestComp2 toggle={toggle} />
					</Dialog>
				</Wrapper>
			</Fragment>,
		));
});
