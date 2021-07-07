import ComponentProps from "../componentProps";

class AutocompleteProps extends ComponentProps {
	static propNames = {
		update: "update",
		value: "value",
		disabled: "disabled",
		error: "error",
	};

	static ruleNames = {
		root: "root",
		paper: "paper",
	};

	constructor() {
		super();
		this.componentProps.set(this.constructor.propNames.update, null);
		this.componentProps.set(this.constructor.propNames.value, null);
		this.componentProps.set(this.constructor.propNames.disabled, null);
		this.componentProps.set(this.constructor.propNames.error, null);

		this._isAutocompleteProps = true;
	}
}

export const isAutocompleteProps = function (value) {
	if (value == null) return true;
	return typeof value === "object" && (value instanceof AutocompleteProps || value._isAutocompleteProps === true);
};

export default AutocompleteProps;
