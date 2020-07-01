import React from "react";
import CardMui from "@material-ui/core/Card";
import CardContent from '@material-ui/core/CardContent';

const Card = (content) => {
  return (
    <CardMui>
      <CardContent>
        {content}
      </CardContent>
    </CardMui>
  );
};

export default Card;