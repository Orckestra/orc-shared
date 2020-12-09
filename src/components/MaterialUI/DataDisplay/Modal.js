import React from "react";
import ModalMui from '@material-ui/core/Modal';
import { makeStyles } from "@material-ui/core/styles";
import ModalProps, { isModalProps } from "./modalProps";

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    minWidth: theme.spacing(48),
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    backgroundColor: theme.palette.primary.contrastText,
  },
  title: {
    height: theme.spacing(4),
    backgroundColor: theme.palette.grey.lighter,
    padding: `0 ${theme.spacing(2)}`
  },
  message: {
    minHeight: theme.spacing(10),
    backgroundColor: theme.palette.primary.contrastText,
    padding: `${theme.spacing(2)} ${theme.spacing(2)}`
  },
  actionPanel: {
    padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
    backgroundColor: theme.palette.grey.lighter
  }
}));

const Modal = ({ message, modalProps }) => {
  const classes = useStyles();

  if (isModalProps(modalProps) === false) {
    throw new TypeError("modalProps property is not of type ModalProps");
  }

  const open = modalProps?.get(ModalProps.propNames.open) ?? false;
  const title = modalProps?.get(ModalProps.propNames.title);
  const actionPanel = modalProps?.get(ModalProps.propNames.actionPanel);

  const model = (
    <ModalMui
      disablePortal
      disableEnforceFocus
      disableAutoFocus
      open={open}
      className={classes.modal}
    >
      <div className={classes.container}>
        <div className={classes.title}>
          {title}
        </div>
        <div className={classes.message}>
          {message}
        </div>
        <div className={classes.actionPanel}>
          {actionPanel}
        </div>
      </div>
    </ModalMui>
  );

  return model;
};

export default Modal;