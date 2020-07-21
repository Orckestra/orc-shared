import React from "react";
import withDeferredPopper from "../../hocs/withDeferredPopper";
import Icon from "./../../../Icon";
import { makeStyles } from "@material-ui/core/styles";
import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';

const useStyles = makeStyles(theme => ({
  block: {
    display: "inline-block"
  },
}));

const TooltippedIcon = (...props) => {
  const classes = useStyles();

  const DeferredTooltipedIcon = (
    withDeferredPopper(
      React.forwardRef((props, ref) => {
        return <div className={classes.block} {...props} ref={ref}><Icon id={props.id} /></div>;
      })
    )
  );

  return <DeferredTooltipedIcon {...props} />
}

export default withDeferredPopper(
  React.forwardRef((props, ref) => {
    return <Icon ref={ref} {...props} />
  })
);