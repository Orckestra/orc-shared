import ComponentProps from "../componentProps";

class ChipProps extends ComponentProps {
	static propNames = {
		avatar: "avatar",
		clickable: "clickable",
		disabled: "disabled",
		onDelete: "onDelete",
		variant: "variant",
	};

	static ruleNames = {
		root: "root",
	};

	constructor() {
		super();
		this.componentProps.set(this.constructor.propNames.avatar, null);
		this.componentProps.set(this.constructor.propNames.clickable, null);
		this.componentProps.set(this.constructor.propNames.disabled, null);
		this.componentProps.set(this.constructor.propNames.onDelete, null);
		this.componentProps.set(this.constructor.propNames.variant, null);

		this.componentClasses.set(this.constructor.ruleNames.root, null);

		this._isChipProps = true;
	}
}

export const isChipProps = function (value) {
	if (value == null) return true;
	return typeof value === "object" && (value instanceof ChipProps || value._isChipProps === true);
};

export default ChipProps;
