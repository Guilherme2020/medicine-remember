import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";
import moment from "moment";
function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits() {
  const classes = useStyles();
  const dateFormat = () => {
    const dateFormat = moment(new Date()).format(`DD/MM/YYYY`);
    return dateFormat;
  };
  return (
    <React.Fragment>
      <Title>Número de agendamentos</Title>
      <Typography component="p" variant="h4">
        30024
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        em {dateFormat()}
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          {/* View balance */}
        </Link>
      </div>
    </React.Fragment>
  );
}
