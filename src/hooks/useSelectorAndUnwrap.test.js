import React from "react";
import { useSelectorAndUnwrap } from "./useSelectorAndUnwrap";
import sinon from "sinon";
import * as ReactReduxMock from "react-redux";
import { mount } from "enzyme";
import Immutable from "immutable";

describe("useSelectorAndUnwrap", () => {
	it("Executes selector and unwraps result", () => {
		const selectorSpy = sinon.spy();
		const selectorPlainJSResult = { test: "something" };

		const TestComp = () => {
			const result = useSelectorAndUnwrap(selectorSpy);
			return <p>{result.test}</p>;
		};

		const selectorResult = Immutable.fromJS(selectorPlainJSResult);
		const useSelectorStub = sinon.stub(ReactReduxMock, "useSelector").returns(selectorResult);

		const component = <TestComp />;

		const mountedComponent = mount(component);

		expect(useSelectorStub, "to have a call satisfying", { args: [selectorSpy] });

		expect(mountedComponent.contains(<p>something</p>), "to be true");

		useSelectorStub.restore();
	});
});
