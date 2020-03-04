import React, { useState, useEffect } from 'react';
import Link from '@material-ui/core/Link';
import api from '../../services/api';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fade from '@material-ui/core/Fade';
import Title from './Title';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(0, '16 Mar, 2019', 'Elvis Presley', 'Tupelo, MS', 'VISA ⠀•••• 3719', 312.44),
  createData(1, '16 Mar, 2019', 'Paul McCartney', 'London, UK', 'VISA ⠀•••• 2574', 866.99),
  createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
  createData(3, '16 Mar, 2019', 'Michael Jackson', 'Gary, IN', 'AMEX ⠀•••• 2000', 654.39),
  createData(4, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 'VISA ⠀•••• 5919', 212.79),
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function Orders() {
  const classes = useStyles();
  const [medicines, setMedicines] = useState([0]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState('');
  const [hour, setHour] = useState('');
  const [selectedDate, setSelectedDate] = React.useState(new Date());




  useEffect(() => {
    loadData();
  }, [])
  const loadData = async () => {

    await api.get('/medicine')
      .then((response) => {
        console.log("response of medicine", response.data);
        setMedicines(response.data);
      })
      .catch((e) => console.log(e));

  }
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setName('')
    setDate(new Date());
    setDescription('');
    setHour('');

  };
  const handleDateChange = date => {
    setSelectedDate(date);
  };
  const register = async () => {

    const dateFormat = moment(date).format(`DD/MM/YYYY ${hour}:00`);

    let url = '/medicine';
    let body = {
      name: name,
      description: description,
      hour,
      date: dateFormat,
    }
    console.log('body', body);
    const user_id = localStorage.getItem('user');
    console.log(user_id)
    
    await api.post(url, body, {
      headers: {
        user_id: user_id,
        "Content-Type": "application/json"
      }
    }).then((response) => {
      console.log(response.data)
      //loading api
      loadData();
      handleClose();
    }).catch((err) => { 
      handleClose();
      console.log(err.response)});

  }
  const renderModal = () => {
    return (
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
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
            // autoFocus
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
            // value={moment(date).format('DD/MM/YYYY')}
            onChange={(event) => setDate(event.target.value)}
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
    )
  }
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
            {/* <TableCell align="right">Sale Amount</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {medicines && medicines.map(row => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{moment(row.date).format('DD/MM/YYYY HH:mm:ss')}</TableCell>
              <TableCell>{row.hour}</TableCell>
              <TableCell>{row.description}</TableCell>
              {/* <TableCell align="right">{row.amount}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {renderModal()}
      <div className={classes.seeMore}>
        <button onClick={handleOpen}>
          Adicionar um Alarme de medicamento
        </button>

      </div>

    </React.Fragment>
  );
}