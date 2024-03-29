import withDeferredTooltip from "./withDeferredTooltip";
import React from "react";
import { shallow } from "enzyme";
import MuiTooltip from "@material-ui/core/Tooltip";

describe("withDeferredTooltip", () => {
	const ComponentToBeTooltipped = () => {
		return (
			<div>
				<p>Test</p>
			</div>
		);
	};

	it("Renders passed component if mouse enter event wasn't triggered", () => {
		const Wrapper = props => <ComponentToBeTooltipped {...props} />;

		const TooltippedCompponent = withDeferredTooltip(Wrapper);

		const mountedTooltippedComponent = shallow(<TooltippedCompponent titleValue="test" />);

		expect(mountedTooltippedComponent.containsMatchingElement(<Wrapper />), "to be true");
	});

	it("Wraps passed component in Mui tooltip if mouse enter event was triggered", () => {
		const Wrapper = props => <ComponentToBeTooltipped {...props} />;

		const TooltippedCompponent = withDeferredTooltip(Wrapper);

		const mountedTooltippedComponent = shallow(<TooltippedCompponent titleValue="test" />);

		const event = {
			target: {
				offsetWidth: 100,
				scrollWidth: 110,
			},
		};

		mountedTooltippedComponent.find(Wrapper).invoke("onMouseEnter")(event);

		let expected = (
			<MuiTooltip>
				<Wrapper />
			</MuiTooltip>
		);

		expect(mountedTooltippedComponent.containsMatchingElement(expected), "to be true");
	});

	it("Does not wrap passed component in Mui tooltip if scrollWidth is same as offsetWidth", () => {
		const Wrapper = props => <ComponentToBeTooltipped {...props} />;

		const TooltippedCompponent = withDeferredTooltip(Wrapper);

		const mountedTooltippedComponent = shallow(<TooltippedCompponent titleValue="test" />);

		const event = {
			target: {
				offsetWidth: 100,
				scrollWidth: 100,
			},
		};

		mountedTooltippedComponent.find(Wrapper).invoke("onMouseEnter")(event);

		expect(mountedTooltippedComponent.containsMatchingElement(<Wrapper />), "to be true");
	});

	it("Displays passed title in tooltip", () => {
		const Wrapper = props => <ComponentToBeTooltipped {...props} />;

		const TooltippedCompponent = withDeferredTooltip(Wrapper);

		const mountedTooltippedComponent = shallow(<TooltippedCompponent titleValue="test" />);

		const event = {
			target: {
				offsetWidth: 100,
				scrollWidth: 110,
			},
		};

		mountedTooltippedComponent.find(Wrapper).invoke("onMouseEnter")(event);

		let expected = (
			<MuiTooltip title="test">
				<Wrapper />
			</MuiTooltip>
		);

		expect(mountedTooltippedComponent.containsMatchingElement(expected), "to be true");
	});

	it("Always displayes passed title in tooltip if always display is set", () => {
		const Wrapper = props => <ComponentToBeTooltipped {...props} />;

		const TooltippedCompponent = withDeferredTooltip(Wrapper);

		const mountedTooltippedComponent = shallow(<TooltippedCompponent alwaysDisplay titleValue="test" />);

		const event = {
			target: {
				offsetWidth: 100,
				scrollWidth: 100,
			},
		};

		mountedTooltippedComponent.find(Wrapper).invoke("onMouseEnter")(event);

		let expected = (
			<MuiTooltip title="test">
				<Wrapper />
			</MuiTooltip>
		);

		expect(mountedTooltippedComponent.containsMatchingElement(expected), "to be true");
	});

	it("Retrieves passed component without any changes if title is undefined", () => {
		const Wrapper = props => <ComponentToBeTooltipped {...props} />;

		const TooltippedCompponent = withDeferredTooltip(Wrapper);

		const mountedTooltippedComponent = shallow(<TooltippedCompponent />);

		const wrapper = mountedTooltippedComponent.find(Wrapper);

		expect(wrapper.prop("onMouseEnter"), "to be", undefined);
	});

	it("Retrieves passed component without any changes if title is whitespace string", () => {
		const Wrapper = props => <ComponentToBeTooltipped {...props} />;

		const TooltippedCompponent = withDeferredTooltip(Wrapper);

		const whitespace = "                   ";

		const mountedTooltippedComponent = shallow(<TooltippedCompponent titleValue={whitespace} />);

		const wrapper = mountedTooltippedComponent.find(Wrapper);

		expect(wrapper.prop("onMouseEnter"), "to be", undefined);
	});

	it("Retrieves passed component without any changes if title is not react component", () => {
		const Wrapper = props => <ComponentToBeTooltipped {...props} />;

		const TooltippedCompponent = withDeferredTooltip(Wrapper);

		const notReactComponent = { key: "titleValue" };

		const mountedTooltippedComponent = shallow(<TooltippedCompponent titleValue={notReactComponent} />);

		const wrapper = mountedTooltippedComponent.find(Wrapper);

		expect(wrapper.prop("onMouseEnter"), "to be", undefined);
	});

	it("Always displays passed title in tooltip with tooltip classes when specified", () => {
		const Wrapper = props => <ComponentToBeTooltipped {...props} />;

		const TooltippedCompponent = withDeferredTooltip(Wrapper);

		const mountedTooltippedComponent = shallow(
			<TooltippedCompponent alwaysDisplay titleValue="test" tooltipClasses={{ classTest: "testMyMojo" }} />,
		);

		const event = {
			target: {
				offsetWidth: 100,
				scrollWidth: 100,
			},
		};

		mountedTooltippedComponent.find(Wrapper).invoke("onMouseEnter")(event);

		let expected = (
			<MuiTooltip title="test" classes={{ classTest: "testMyMojo" }}>
				<Wrapper />
			</MuiTooltip>
		);

		expect(mountedTooltippedComponent.containsMatchingElement(expected), "to be true");
	});

	it("Always displays passed title in tooltip without tooltip classes when not specified", () => {
		const Wrapper = props => <ComponentToBeTooltipped {...props} />;

		const TooltippedCompponent = withDeferredTooltip(Wrapper);

		const mountedTooltippedComponent = shallow(<TooltippedCompponent alwaysDisplay titleValue="test" />);

		const event = {
			target: {
				offsetWidth: 100,
				scrollWidth: 100,
			},
		};

		mountedTooltippedComponent.find(Wrapper).invoke("onMouseEnter")(event);

		let expected = (
			<MuiTooltip title="test" classes={null}>
				<Wrapper />
			</MuiTooltip>
		);

		expect(mountedTooltippedComponent.containsMatchingElement(expected), "to be true");
	});
});
