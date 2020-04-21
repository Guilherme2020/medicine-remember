import React, { useState, useEffect } from "react";
import api from "../../services/api";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Title from "./Title";

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function AlarmsSchedules() {
  const classes = useStyles();
  const [medicines, setMedicines] = useState([0]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState("");
  const [hour, setHour] = useState("");
  const [errModal, setErrModal] = useState(false);
  useEffect(() => {
    loadData();
  }, []);
  const loadData = async () => {
    await api
      .get("/medicine")
      .then((response) => {
        console.log("response of medicine", response.data);
        setMedicines(response.data);
      })
      .catch((e) => console.log(e));
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleCloseErrModal = () => {
    setErrModal(false);
  };

  const handleClose = () => {
    setOpen(false);
    setName("");
    setDate(new Date());
    setDescription("");
    setHour("");
  };

  const register = async () => {
    // const dateFormat = moment(date).format(`DD/MM/YYYY ${hour}:00`);
    // const dateFormat = moment(date).format(`yyyy-MM-dd ${hour}:00`);
    const dateFormat = `${date} ${hour}:00`;

    console.log("dateFormat", dateFormat);
    // yyyy-MM-dd
    let url = "/medicine";
    let body = {
      name: name,
      description: description,
      hour,
      date: dateFormat,
    };
    console.log("body", body);
    const user_id = localStorage.getItem("user");
    console.log(user_id);
    if (name !== "" && description !== "" && hour !== "" && date !== "") {
      await api
        .post(url, body, {
          headers: {
            user_id: user_id,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log("create", response.data);
          //loading api
          loadData();
          handleClose();
        })
        .catch((err) => {
          handleClose();
          console.log(err);
          // console.log(err.response)
        });
    } else {
      setErrModal(true);
    }
  };
  const renderModal = () => {
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Adicionar um medicamento
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Cadastre uma descrição do medicamento bem como o horário que deseja
            receber o alerta.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            value={name}
            onChange={(event) => setName(event.target.value)}
            id="name"
            label="Nome do Medicamento"
            type="email"
            fullWidth
          />
          <TextField
            margin="dense"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            id="description"
            label="Descrição"
            fullWidth
          />
          <TextField
            id="date"
            label="Data do agendamento"
            type="date"
            defaultValue={date}
            className={classes.textField}
            value={date}
            onChange={(event) => {
              console.log("data", event.target.value);
              setDate(event.target.value);
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="time"
            label="hora"
            type="time"
            defaultValue={hour}
            value={hour}
            onChange={(event) => setHour(event.target.value)}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={() => register()} color="primary">
            Cadastrar
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  const renderModalAlertErr = () => {
    return (
      <Dialog
        open={errModal}
        onClose={handleCloseErrModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Por Favor Preencha todos os campos :)
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseErrModal} color="primary">
            ok
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  return (
    <React.Fragment>
      <Title>Agendamento Recentes</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Data</TableCell>
            <TableCell>Horário</TableCell>
            <TableCell>Descrição</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {medicines &&
            medicines.map((row) => (
              <TableRow key={row._id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>
                  {moment(row.date).format("DD/MM/YYYY")}
                </TableCell>
                <TableCell>{row.hour}</TableCell>
                <TableCell>{row.description}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {renderModal()}
      {renderModalAlertErr()}
      <div className={classes.seeMore}>
        <button onClick={handleOpen}>Adicionar um Medicamento</button>
      </div>
    </React.Fragment>
  );
}
