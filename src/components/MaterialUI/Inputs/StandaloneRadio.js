import React from "react";
import RadioMui from '@material-ui/core/Radio';
import RadioProps, { isRadioProps } from "./standaloneRadioProps";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";

const useStyles = makeStyles(theme => ({
  radioIcon: {
    border: "1px solid",
    borderColor: theme.palette.grey.borders,
    width: theme.spacing(1.6),
    height: theme.spacing(1.6),
    borderRadius: "50%",
    ".MuiRadio-root:focus &, .MuiRadio-root:active &": {
      boxShadow: `0 0 4px ${theme.palette.focus}`,
      outline: "none",
    },
  },
  radioIconChecked: {
    borderColor: "currentColor",
    "&:before": {
      content: `" "`,
      backgroundColor: "currentColor",
      width: theme.spacing(1),
      height: theme.spacing(1),
      position: "absolute",
      borderRadius: "50%",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
  },
  radioReadOnlyChecked: {
    "&:before": {
      content: `" "`,
      position: "absolute",
      left: theme.spacing(0.7),
      top: theme.spacing(0.4),
      width: theme.spacing(0.9),
      height: theme.spacing(0.3),
      backgroundColor: theme.palette.grey.dark,
      borderRadius: 3,
      transform: "rotate(46deg)",
    },
    "&:after": {
      content: `" "`,
      position: "absolute",
      left: theme.spacing(1.6),
      top: theme.spacing(-0.4),
      width: theme.spacing(0.3),
      height: theme.spacing(1.4),
      backgroundColor: theme.palette.grey.dark,
      borderRadius: 3,
      transform: "rotate(33deg)",
    },
  },
  radioReadOnly: {
    display: "none"
  },
  root: {
    padding: "0"
  }
}));

const StandaloneRadio = ({ radioProps }) => {
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
  const name = radioProps?.get(RadioProps.propNames.name) || null;
  const readOnly = radioProps?.get(RadioProps.propNames.readOnly) || false;

  const clickHandler = onChange != null ? event => onChange(event.target.value, name) : null;

  const radio = (
    <RadioMui
      checked={checked}
      disabled={disabled}
      onChange={clickHandler}
      value={value}
      size={size}
      inputProps={inputProps}
      name={name}
      checkedIcon={<span className={classNames({
        [`${classes.radioIcon}`]: !readOnly,
        [`${classes.radioIconChecked}`]: !readOnly && checked,
        [`${classes.radioReadOnlyChecked}`]: readOnly && checked
      })} />}
      icon={<span className={classNames({
        [`${classes.radioIcon}`]: !readOnly,
        [`${classes.radioReadOnly}`]: readOnly
      })} />}
      classes={{
        root: classNames(classes.root, radioProps?.getStyle(RadioProps.ruleNames.root))
      }}
    />
  );

  return radio;
};

export default StandaloneRadio;