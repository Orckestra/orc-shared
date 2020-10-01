import ComponentProps from "../componentProps";

class RadioProps extends ComponentProps {
  static propNames = {
    checked: "checked",
    disabled: "disabled",
    onChange: "onChange",
    size: "size",
    value: "value",
    inputProps: "inputProps"
  };

  static ruleNames = {
    root: "root"
  };

  constructor() {
    super();
    this.componentProps.set(this.constructor.propNames.checked, null);
    this.componentProps.set(this.constructor.propNames.disabled, null);
    this.componentProps.set(this.constructor.propNames.onChange, null);
    this.componentProps.set(this.constructor.propNames.size, null);
    this.componentProps.set(this.constructor.propNames.value, null);
    this.componentProps.set(this.constructor.propNames.inputProps, null);

    this.componentClasses.set(this.constructor.ruleNames.root, null);

    this._isRadioProps = true;
  }
}

export const isRadioProps = function (value) {
  if (value == null) return true;
  return typeof value === "object" && (value instanceof RadioProps || value._isRadioProps === true);
};

export default RadioProps;
