import React from "react";
import ChipMui from '@material-ui/core/Chip';
import ChipProps from "./chipProps";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";

const Chip = ({ label, chipProps }) => {
  const avatar = chipProps?.get(ChipProps.propNames.avatar) || null;
  const clickable = chipProps?.get(ChipProps.propNames.clickable) || false;
  const disabled = chipProps?.get(ChipProps.propNames.disabled) || false;
  const onDelete = chipProps?.get(ChipProps.propNames.onDelete) || null;
  const variant = chipProps?.get(ChipProps.propNames.variant) || 'default';

  const chip = (
    <ChipMui
      label={label}
      avatar={avatar}
      clickable={clickable}
      disabled={disabled}
      onDelete={onDelete}
      variant={variant}
      classes={classNames(chipProps?.getStyle(ChipProps.ruleNames.root))}
    />
  );

  return chip;
};

export default Chip;