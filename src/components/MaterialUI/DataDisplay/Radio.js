import React from "react";
import RadioMui from '@material-ui/core/Radio';
import RadioProps, { isRadioProps } from "./radioProps";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";

const useStyles = makeStyles(theme => ({
  root: {
    padding: "0"
  }
}));

const Radio = ({ radioProps }) => {
  const classes = useStyles();

  if (isRadioProps(radioProps) === false) {
    throw new TypeError("radioProps property is not of type RadioProps");
  }

  const checked = radioProps?.get(RadioProps.propNames.checked) || false;
  const disabled = radioProps?.get(RadioProps.propNames.disabled) || false;
  const onChange = radioProps?.get(RadioProps.propNames.onChange) || null;
  const value = radioProps?.get(RadioProps.propNames.value) || undefined;
  const size = radioProps?.get(RadioProps.propNames.size) || 'medium';
  const inputProps = radioProps?.get(RadioProps.propNames.inputProps) || null;

  const radio = (
    <RadioMui
      checked={checked}
      disabled={disabled}
      onChange={onChange}
      value={value}
      size={size}
      inputProps={inputProps}
      classes={{
        root: classNames(classes.root, radioProps?.getStyle(RadioProps.ruleNames.root))
      }}
    />
  );

  return radio;
};

export default Radio;