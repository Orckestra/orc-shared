import React from "react";
import { ignoreConsoleError } from "~/utils/testUtils";
import Modal from "./Modal";
import ModalProps from "./modalProps";
import { mount } from "enzyme";
import ModalMui from "@material-ui/core/Modal";
import sinon from "sinon";

describe("Modal", () => {
	const modalMessage = "Modal message";

	it("Throws an error if modalProps has wrong type", () => {
		ignoreConsoleError(() => {
			const component = <Modal modalProps="Wrong Type" />;
			expect(() => mount(component), "to throw a", TypeError).then(error => {
				expect(error, "to have message", "modalProps property is not of type ModalProps");
			});
		});
	});

	it("Renders Modal properly when opened and only messages was passed", () => {
		const modalProps = new ModalProps();
		modalProps.set(ModalProps.propNames.open, true);

		const component = <Modal message={modalMessage} modalProps={modalProps} />;

		const expected = (
			<ModalMui disablePortal disableEnforceFocus disableAutoFocus open={true}>
				<div>
					<div></div>
					<div>{modalMessage}</div>
					<div></div>
				</div>
			</ModalMui>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Renders Modal properly when opened and all props were passed", () => {
		const modalProps = new ModalProps();
		modalProps.set(ModalProps.propNames.open, true);
		const actionPanel = <div>Action Panel</div>;
		const title = <div>Title</div>;
		modalProps.set(ModalProps.propNames.title, title);
		modalProps.set(ModalProps.propNames.actionPanel, actionPanel);

		const component = <Modal message={modalMessage} modalProps={modalProps} />;

		const expected = (
			<ModalMui disablePortal disableEnforceFocus disableAutoFocus open={true}>
				<div>
					<div>{title}</div>
					<div>{modalMessage}</div>
					<div>{actionPanel}</div>
				</div>
			</ModalMui>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Renders nothing when modal is closed", () => {
		const component = <Modal />;

		expect(component, "when mounted", "to satisfy", null);
	});

	it("Calls passed backdropClickCallback on backdrop click event", () => {
		const backdropClickCallbackSpy = sinon.spy();

		const modalProps = new ModalProps();
		modalProps.set(ModalProps.propNames.open, true);
		modalProps.set(ModalProps.propNames.backdropClickCallback, backdropClickCallbackSpy);

		const component = <Modal modalProps={modalProps} />;

		const mountedComponent = mount(component);

		const muiModal = mountedComponent.find(ModalMui);

		muiModal.invoke("onBackdropClick")();

		expect(backdropClickCallbackSpy, "was called");
	});
});
