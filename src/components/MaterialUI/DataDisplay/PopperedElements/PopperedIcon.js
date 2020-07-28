import React from "react";
import withDeferredPopper from "../../hocs/withDeferredPopper";
import Icon from "../Icon";

export default withDeferredPopper(
  React.forwardRef((props, ref) => {
    return <Icon ref={ref} {...props} />
  })
);