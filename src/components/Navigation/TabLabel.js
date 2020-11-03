import React from "react";
import { useIntl } from "react-intl";
import useLabelMessage from "../../hooks/useLabelMessage";
import Tab from '@material-ui/core/Tab';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  tab: {
    flex: "0 0 auto"
  },
}));

const TabLabel = ({ label }) => {
  const { formatMessage } = useIntl();

  const buildMessage = message => formatMessage(message, message.values);
  const [labelMessage] = useLabelMessage(label, buildMessage);

  return labelMessage;
};

export default TabLabel;