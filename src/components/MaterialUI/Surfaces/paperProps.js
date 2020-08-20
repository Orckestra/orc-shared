import ComponentProps from "../componentProps";

class PaperProps extends ComponentProps {
  static propNames = {
    elevation: "elevation",
    square: "square",
    variant: "variant"
  };

  static ruleNames = {
    root: "root"
  };

  constructor() {
    super();
    this.componentProps.set(this.constructor.propNames.elevation, null);
    this.componentProps.set(this.constructor.propNames.square, null);
    this.componentProps.set(this.constructor.propNames.variant, null);

    this.componentClasses.set(this.constructor.ruleNames.root, null);
  }
}

export default PaperProps;