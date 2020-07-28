import ComponentProps from "../componentProps";

class PaperProps extends ComponentProps {
  static ruleNames = {
    root: "root"
  };

  constructor() {
    super();
    this.componentClasses.set(this.constructor.ruleNames.root, null);
  }
}

export default PaperProps;