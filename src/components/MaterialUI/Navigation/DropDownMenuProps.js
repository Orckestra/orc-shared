import ComponentProps from "../componentProps";

class DropDownMenuProps extends ComponentProps {
	static propNames = {
		autoFocus: "autoFocus",
		disabled: "disabled",
	};

	constructor() {
		super();
		this.componentProps.set(this.constructor.propNames.autoFocus, true);
		this.componentProps.set(this.constructor.propNames.disabled, false);

		this._isDropDownMenuProps = true;
	}
}

export const isDropDownMenuProps = function (value) {
	if (value == null) return true;
	return typeof value === "object" && (value instanceof DropDownMenuProps || value._isDropDownMenuProps === true);
};

export default DropDownMenuProps;
