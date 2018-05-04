import React, { Fragment } from "react";
import FullModal, { Modal } from "./index";
import Wrapper from "./Wrapper";
import Background from "./Background";
import Dialog from "./Dialog";
import withClickOutside from "../../hocs/withClickOutside";

const ActiveDialog = withClickOutside(Dialog);

const TestComp1 = () => <div />;
const TestComp2 = () => <div />;

describe("Modal", () => {
	let toggle;
	beforeEach(() => {
		toggle = () => {};
	});

	it("renders the structure of a modal dialog", () =>
		expect(
			<Modal
				show={true}
				toggle={toggle}
				anchor={<TestComp1 />}
				content={<TestComp2 />}
				look="dark"
			/>,
			"to render as",
			<Fragment>
				<TestComp1 toggle={toggle} />
				<Wrapper timeout={300}>
					<Background />
					<ActiveDialog look="dark" onClickOutside={toggle}>
						<TestComp2 toggle={toggle} />
					</ActiveDialog>
				</Wrapper>
			</Fragment>,
		));

	describe("with state handling", () => {
		it("adds toggleable show flag", () =>
			expect(
				<FullModal
					anchor={<TestComp1 />}
					content={<TestComp2 />}
					look="dark"
				/>,
				"to render as",
				<Modal
					show={false}
					toggle={expect.it("to be a function")}
					anchor={<TestComp1 />}
					content={<TestComp2 />}
					look="dark"
				/>,
			));
	});
});
