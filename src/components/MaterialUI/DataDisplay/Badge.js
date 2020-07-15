import React from "react";
import BadgeMui from '@material-ui/core/Badge';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  badge: {
    color: theme.palette.background.default,
    width: theme.spacing(3.5),
    height: theme.spacing(3.5),
    borderRadius: "30px"
  }
}));

const Badge = ({ children, badge }) => {
  const classes = useStyles();

  return (
    <BadgeMui overlap="circle" color="primary" max={999} badgeContent={badge} classes={{ badge: classes.badge }}>
      {children}
    </BadgeMui>
  );
};

export default Badge;