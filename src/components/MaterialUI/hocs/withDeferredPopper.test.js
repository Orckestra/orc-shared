import React from "react";
import withDeferredPopper, { Arrow } from "./withDeferredPopper";
import { shallow, mount } from "enzyme";
import Popper from "@material-ui/core/Popper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { ignoreConsoleError } from "./../../../utils/testUtils";

describe("withDeferredPopper", () => {
	const ComponentToBePoppered = () => {
		return (
			<div>
				<p>Test</p>
			</div>
		);
	};

	it("Renders correct component if passed popperValue is not null or empty", () => {
		const Wrapper = props => <ComponentToBePoppered {...props} />;

		const PopperedCompponent = withDeferredPopper(Wrapper);

		const popperValue = "test";

		const mountedPopperedComponent = shallow(<PopperedCompponent popperValue={popperValue} />);

		ignoreConsoleError(() => {
			const expected = (
				<ClickAwayListener>
					<div>
						<Wrapper />
						<Popper open={false}>
							<Arrow />
							{popperValue}
						</Popper>
					</div>
				</ClickAwayListener>
			);
			expect(mountedPopperedComponent.containsMatchingElement(expected), "to be true");
		});
	});

	it("Renders passed component as it is if passed popperValue is null, empty or not react component", () => {
		const Wrapper = props => <ComponentToBePoppered {...props} />;

		const PopperedCompponent = withDeferredPopper(Wrapper);

		const emptyString = "";
		const notReactComponent = { a: "test" };

		let mountedPopperedComponent = shallow(<PopperedCompponent />);

		expect(mountedPopperedComponent.contains(<Wrapper />), "to be true");

		mountedPopperedComponent = shallow(<PopperedCompponent popperValue={emptyString} />);

		expect(mountedPopperedComponent.contains(<Wrapper />), "to be true");

		mountedPopperedComponent = shallow(<PopperedCompponent popperValue={notReactComponent} />);

		expect(mountedPopperedComponent.contains(<Wrapper />), "to be true");
	});

	it("Closes popper when clickAway event occurs", () => {
		const Wrapper = props => <ComponentToBePoppered {...props} />;

		const PopperedCompponent = withDeferredPopper(Wrapper);

		const popperValue = "test";

		const mountedPopperedComponent = mount(<PopperedCompponent popperValue={popperValue} />);

		const wrapper = mountedPopperedComponent.find(Wrapper);

		ignoreConsoleError(() => {
			const event = {
				currentTarget: wrapper,
			};

			wrapper.invoke("onClick")(event);

			let popper = mountedPopperedComponent.find(Popper);

			expect(popper.prop("open"), "to be true");

			mountedPopperedComponent.find(ClickAwayListener).invoke("onClickAway")();

			popper = mountedPopperedComponent.find(Popper);

			expect(popper.prop("open"), "to be false");
		});
	});

	it("Renders arrow", () => {
		const mountedComponent = shallow(<Arrow />);

		expect(mountedComponent.containsMatchingElement(<div />), "to be true");
	});
});
