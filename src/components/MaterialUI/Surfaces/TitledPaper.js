import React from "react";
import CardMui from "@material-ui/core/Card";
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  card: {
    border: `1px solid ${theme.palette.grey.borders}`,
    borderRadius: theme.spacing(0.3),
    backgroundColor: theme.palette.grey.lighter,
    boxShadow: "none"
  }
}));

const TitledPaper = ({ title, content }) => {
  const classes = useStyles();

  return (
    <CardMui className={classes.card}>
      <CardContent>
        {content}
      </CardContent>
    </CardMui>
  );
};

export default TitledPaper;