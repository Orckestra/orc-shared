import React from "react";
import Modal from "./../Modal";
import ModalProps from "./../modalProps";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import sharedMessages from "../../../../sharedMessages";
import { FormattedMessage } from "react-intl";

const useStyles = makeStyles(theme => ({
  actionPanel: {
    float: "right"
  },
  cancelButton: {
    marginRight: theme.spacing(1)
  },
  title: {
    fontSize: theme.typography.h3Size,
    color: theme.palette.primary.main,
    textTransform: theme.typography.button.textTransform,
    fontFamily: theme.typography.button.fontFamily,
    fontWeight: theme.typography.button.fontWeight
  }
}));

const ConfirmationModal = ({ message, open, okCallback, cancelCallback, backdropClickCallback }) => {
  const classes = useStyles();

  const modalProps = new ModalProps();

  const titleComponent = (
    <Typography
      className={classes.title}
      children={<FormattedMessage {...sharedMessages.confirmation} />}
    />
  );
  const messageComponent = <Typography children={message} />;

  modalProps.set(ModalProps.propNames.title, titleComponent);
  modalProps.set(ModalProps.propNames.open, open);
  modalProps.set(ModalProps.propNames.backdropClickCallback, backdropClickCallback);

  const actionPanel = (
    <div className={classes.actionPanel}>
      <Button
        className={classes.cancelButton}
        variant="outlined"
        onClick={() => cancelCallback()}
      >
        <FormattedMessage {...sharedMessages.cancel} />
      </Button>
      <Button variant="contained" color="primary" onClick={() => okCallback()}>
        <FormattedMessage {...sharedMessages.ok} />
      </Button>
    </div>
  );

  modalProps.set(ModalProps.propNames.actionPanel, actionPanel);


  return <Modal message={messageComponent} modalProps={modalProps} />
};

export default ConfirmationModal;