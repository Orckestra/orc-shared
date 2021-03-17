import ComponentProps from "../componentProps";

class ModalProps extends ComponentProps {
	static propNames = {
		open: "open",
		title: "title",
		actionPanel: "actionPanel",
		backdropClickCallback: "backdropClickCallback",
		type: "type",
	};

	constructor() {
		super();

		this.componentProps.set(this.constructor.propNames.open, null);
		this.componentProps.set(this.constructor.propNames.title, null);
		this.componentProps.set(this.constructor.propNames.actionPanel, null);
		this.componentProps.set(this.constructor.propNames.backdropClickCallback, null);
		this.componentProps.set(this.constructor.propNames.type, null);
		this._isModalProps = true;
	}
}

export const isModalProps = function (value) {
	if (value == null) return true;
	return typeof value === "object" && (value instanceof ModalProps || value._isModalProps === true);
};

export default ModalProps;
