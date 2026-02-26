import React from "react";
import useWindowSize from "./useWindowSize";
import { mount, unmount, act } from "unexpected-reaction";

let renderingCount = 0;

const TestComp = () => {
	const windowSize = useWindowSize();

	const allDimensions = `${windowSize.innerWidth},${windowSize.innerHeight},${windowSize.outerWidth},${windowSize.outerHeight},${++renderingCount}`;

	return <div>{allDimensions}</div>;
};

function setViewport(width, height) {
	Object.defineProperty(window, "innerWidth", { configurable: true, value: width });
	Object.defineProperty(window, "innerHeight", { configurable: true, value: height });
	Object.defineProperty(window, "outerWidth", { configurable: true, value: width + 20 });
	Object.defineProperty(window, "outerHeight", { configurable: true, value: height + 25 });
}

describe("useWindowSize", () => {
	let element = null;

	beforeEach(() => {
		renderingCount = 0;
		setViewport(1440, 720);
		window.dispatchEvent(new Event("resize"));
	});

	afterEach(() => {
		if (element !== null) {
			unmount(element);
		}
	});

	it("display window dimensions properly after first render", () => {
		element = mount(<TestComp />);

		expect(element, "to satisfy", <div>1440,720,1460,745,1</div>);
	});

	it("display window dimensions properly after resize event", () => {
		element = mount(<TestComp />);

		expect(element, "to satisfy", <div>1440,720,1460,745,1</div>);

		act(() => {
			setViewport(843, 487);
			window.dispatchEvent(new Event("resize"));
		});

		expect(element, "to satisfy", <div>843,487,863,512,2</div>);
	});

	it("display window dimensions properly after resize event with unchanged dimensions", () => {
		element = mount(<TestComp />);

		expect(element, "to satisfy", <div>1440,720,1460,745,1</div>);

		act(() => {
			setViewport(1440, 720);
			window.dispatchEvent(new Event("resize"));
		});

		expect(element, "to satisfy", <div>1440,720,1460,745,1</div>);
	});
});
