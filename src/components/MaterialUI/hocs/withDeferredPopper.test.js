import React from "react";
import withDeferredPopper, { Arrow } from "./withDeferredPopper";
import { shallow, mount } from "enzyme";
import Popper from "@material-ui/core/Popper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { ignoreConsoleError } from "./../../../utils/testUtils";
import sinon from "sinon";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "../Surfaces/Paper";

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

		expect(mountedPopperedComponent.containsMatchingElement(<Wrapper />), "to be true");

		mountedPopperedComponent = shallow(<PopperedCompponent popperValue={emptyString} />);

		expect(mountedPopperedComponent.containsMatchingElement(<Wrapper />), "to be true");

		mountedPopperedComponent = shallow(<PopperedCompponent popperValue={notReactComponent} />);

		expect(mountedPopperedComponent.containsMatchingElement(<Wrapper />), "to be true");
	});

	it("Renders component correctly with classprop not null", () => {
		const useStyles = makeStyles(theme => ({
			popper: {
				zIndex: 9999,
			},
			arrow: {
				position: "absolute",
				border: "1px solid",
				backgroundColor: theme.palette.background.paper,
			},
			popperContainer: {
				cursor: "pointer",
			},
		}));

		const Wrapper = props => {
			const customClass = useStyles();
			return <ComponentToBePoppered {...props} classprop={customClass} />;
		};

		const PopperedCompponent = withDeferredPopper(Wrapper);
		const popperValue = <Paper content="hello" />;

		let myProps = {};

		const Holder = () => {
			myProps = useStyles();
			return <PopperedCompponent popperValue={popperValue} classprop={myProps} />;
		};

		let mountHolder = mount(<Holder />);

		ignoreConsoleError(() => {
			const mountedProps = mountHolder.find(PopperedCompponent).prop("classprop");

			expect(mountedProps, "not to be null");

			expect(mountHolder.containsMatchingElement(<PopperedCompponent />), "to be true");
		});
	});

	it("Renders component correctly with classProp.popper not defined", () => {
		const useStyles = makeStyles(theme => ({
			arrow: {
				position: "absolute",
				border: "1px solid",
				backgroundColor: theme.palette.background.paper,
			},
			popperContainer: {
				cursor: "pointer",
			},
		}));

		const Wrapper = props => {
			const customClass = useStyles();
			return <ComponentToBePoppered {...props} classprop={customClass} />;
		};

		const PopperedCompponent = withDeferredPopper(Wrapper);
		const popperValue = <Paper content="hello" />;

		let myProps = {};

		const Holder = () => {
			myProps = useStyles();
			return <PopperedCompponent popperValue={popperValue} classprop={myProps} />;
		};

		let mountHolder = mount(<Holder />);

		ignoreConsoleError(() => {
			const mountedProps = mountHolder.find(PopperedCompponent).prop("classprop");

			const expected = "makeStyles-popper-1";

			expect(mountedProps.popper, "to equal", expected);
		});
	});

	it("Renders component correctly with classProp.arrow not defined", () => {
		const useStyles = makeStyles(theme => ({
			popper: {
				zIndex: 9999,
			},
			popperContainer: {
				cursor: "pointer",
			},
		}));

		const Wrapper = props => {
			const customClass = useStyles();
			return <ComponentToBePoppered {...props} classprop={customClass} />;
		};

		const PopperedCompponent = withDeferredPopper(Wrapper);
		const popperValue = <Paper content="hello" />;

		let myProps = {};

		const Holder = () => {
			myProps = useStyles();
			return <PopperedCompponent popperValue={popperValue} classprop={myProps} />;
		};

		let mountHolder = mount(<Holder />);

		ignoreConsoleError(() => {
			const mountedProps = mountHolder.find(PopperedCompponent).prop("classprop");
			const expected = "makeStyles-arrow-2";

			expect(mountedProps.arrow, "to equal", expected);
		});
	});

	it("Renders component correctly with classProp.popperContainer not defined", () => {
		const useStyles = makeStyles(theme => ({
			popper: {
				zIndex: 9999,
			},
			arrow: {
				position: "absolute",
				border: "1px solid",
				backgroundColor: theme.palette.background.paper,
			},
		}));

		const Wrapper = props => {
			const customClass = useStyles();
			return <ComponentToBePoppered {...props} classprop={customClass} />;
		};

		const PopperedCompponent = withDeferredPopper(Wrapper);
		const popperValue = <Paper content="hello" />;

		let myProps = {};

		const Holder = () => {
			myProps = useStyles();
			return <PopperedCompponent popperValue={popperValue} classprop={myProps} />;
		};

		let mountHolder = mount(<Holder />);

		ignoreConsoleError(() => {
			const mountedProps = mountHolder.find(PopperedCompponent).prop("classprop");
			const expected = "makeStyles-popperContainer-3";

			expect(mountedProps.popperContainer, "to equal", expected);
		});
	});

	it("Prevents default click behaviour if parent is a link <a></a>", () => {
		const parentCallback = sinon.spy();

		const Wrapper = props => <ComponentToBePoppered {...props} />;

		const PopperedCompponent = withDeferredPopper(Wrapper);

		const popperValue = "test";

		const mountedPopperedComponent = mount(
			<a href="#hash" onClick={parentCallback}>
				<PopperedCompponent popperValue={popperValue} />
			</a>,
		);

		const wrapper = mountedPopperedComponent.find(Wrapper);

		ignoreConsoleError(() => {
			const event = {
				currentTarget: wrapper,
				stopPropagation: jest.fn(),
				preventDefault: jest.fn(),
				_dispatchInstances: [{ elementType: "a" }, { elementType: "div" }, { elementType: "span" }],
			};

			wrapper.invoke("onClick")(event);

			let popper = mountedPopperedComponent.find(Popper);

			expect(popper.prop("open"), "to be true");

			expect(parentCallback, "was not called");
		});
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
				stopPropagation: jest.fn(),
			};

			wrapper.invoke("onClick")(event);

			let popper = mountedPopperedComponent.find(Popper);

			expect(popper.prop("open"), "to be true");

			mountedPopperedComponent.find(ClickAwayListener).invoke("onClickAway")();

			popper = mountedPopperedComponent.find(Popper);

			expect(popper.prop("open"), "to be false");
		});
	});

	it("Does not close popper when clickAway event occurs with null event currentTarget", () => {
		const Wrapper = props => <ComponentToBePoppered {...props} />;

		const PopperedCompponent = withDeferredPopper(Wrapper);

		const popperValue = "test";

		const mountedPopperedComponent = mount(<PopperedCompponent popperValue={popperValue} />);

		const wrapper = mountedPopperedComponent.find(Wrapper);

		ignoreConsoleError(() => {
			const event = {
				currentTarget: null,
				stopPropagation: jest.fn(),
			};

			wrapper.invoke("onClick")(event);

			let popper = mountedPopperedComponent.find(Popper);

			expect(popper.prop("open"), "to be true");

			mountedPopperedComponent.find(ClickAwayListener).invoke("onClickAway")();

			popper = mountedPopperedComponent.find(Popper);

			expect(popper.prop("open"), "to be true");
		});
	});

	it("Renders arrow", () => {
		const mountedComponent = shallow(<Arrow />);

		expect(mountedComponent.containsMatchingElement(<div />), "to be true");
	});
});
