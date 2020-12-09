import React from "react";
import Modal from "./../Modal";
import ModalProps from "./../modalProps";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  actionPanel: {
    display: "flex",
    marginLeft: "auto"
  },
  cancelButton: {
    marginRight: theme.spacing(1)
  }
}));

const ConfirmationModal = ({ message, title, open, okCallback, cancelCallback }) => {
  const classes = useStyles();

  const modalProps = new ModalProps();

  modalProps.set(ModalProps.propNames.title, title);
  modalProps.set(ModalProps.propNames.open, open);

  const actionPanel = (
    <div className={classes.actionPanel}>
      <Button
        className={classes.cancelButton}
        variant="outlined"
        color="primary"
        onClick={() => cancelCallback()}
      >
        Cancel
      </Button>
      <Button variant="contained" color="primary" onClick={() => okCallback()}>OK</Button>
    </div>
  );

  modalProps.set(ModalProps.propNames.actionPanel, actionPanel);


  return <Modal message={message} modalProps={modalProps} />
};

export default ConfirmationModal;