import { useIntl } from "react-intl";
import useLabelMessage from "../../../hooks/useLabelMessage";

const TabLabel = ({ label }) => {
  const { formatMessage } = useIntl();

  const buildMessage = message => formatMessage(message, message.values);
  const [labelMessage] = useLabelMessage(label, buildMessage);

  return labelMessage;
};

export default TabLabel;