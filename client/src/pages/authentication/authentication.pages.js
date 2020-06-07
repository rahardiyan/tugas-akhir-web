import Axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  Box,
  Link,
  Avatar,
  Button,
  Container,
  TextField,
  Typography,
  CssBaseline,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import moment from 'moment'

import { Colors } from '../../styles'
import { USER } from '../../redux/actions'

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: theme.spacing(20),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: Colors.Purple,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    fontWeight: 'bold',
    margin: theme.spacing(3, 0, 2),
  },
  signup: {
    fontWeight: 'bold',
    margin: theme.spacing(1, 0, 2),
  },
  formControl: {
    minWidth: 120,
    width: '100%',
    marginBottom: theme.spacing(1),
  },
}))

const Authentication = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [nama, setNama] = useState('')
  const [tempatLahir, setTempatLahir] = useState('')
  const [tanggalLahir, setTanggalLahir] = useState(moment().format('YYYY-MM-DD'))
  const [alamat, setAlamat] = useState('')
  const [telepon, setTelepon] = useState('')

  const [isSignIn, setIsSignIn] = useState(true)
  const [isSignUp, setIsSignUp] = useState(false)

  const RandomId = (length) => {
    let result           = ''
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let charactersLength = characters.length
    for ( let i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
 }

  const Login = () => {
    const url = `http://localhost:2016/user/view/${username}&${password}`
    Axios.get(url)
      .then((data) => {
        if (data.data.result != null) {
          const id_role = data.data.result.id_role
          const user_url = `http://localhost:2016/user/view-user-profile/${username}`
          Axios.get(user_url)
            .then((data) => {
              let user = {}
              if (data.data.result != null) {
                user = data.data.result
              }
              user.username = username
              user.id_role = id_role
              dispatch({
                type: USER.SET_LOGIN,
                payload: {
                  user,
                },
              })
            })
            .catch((err) => {
              console.log(err)
              alert('Username or Password Incorrect')
            })
        } else {
          alert('Username or Password Incorrect')
        }
      })
      .catch((err) => {
        console.log(err)
        alert('Username or Password Incorrect')
      })
  }

  const Register = () => {
    let user = {
      idUser: RandomId(32),
      nama: nama,
      tempatLahir: tempatLahir,
      tanggalLahir: tanggalLahir,
      alamat: alamat,
      telepon: telepon,
    }
    
    user.nip = `P${moment(tanggalLahir).format('DDMMYYYY')}${user.idUser}`
    let url = `http://localhost:2016/user/add-pustakawan/${username}&${password}`
    Axios.post(url, user)
      .then(data => {
        if (data.data.result != null) {
          alert('Success to Register')
          setIsSignUp(false)
          setIsSignIn(true)
        } else {
          alert('Failed to Register, please Try Again!')
        }
      })
      .catch(err => {
        console.log(err)
        alert('Failed to Register, please Try Again!')
      })
  }
  const Copyright = () => {
    return (
      <Typography variant='body2' color='textSecondary' align='center'>
        {'Copyright © '}
        <Link color='inherit'>Sistem Informasi APAP</Link>{' '}
        {new Date().getFullYear()}
      </Typography>
    )
  }

  const SignUp = () => {
    return (
      <div className={classes.paper}>
        <Typography component='h1' variant='h5'>
          DAFTAR
        </Typography>
        <div className={classes.form} noValidate>
          <TextField
            required
            fullWidth
            autoFocus
            id='username'
            name='username'
            margin='normal'
            label='Username'
            value={username}
            onChange={(field) => setUsername(field.target.value)}
          />
          <TextField
            required
            fullWidth
            id='password'
            margin='normal'
            name='password'
            type='password'
            label='Password'
            value={password}
            onChange={(field) => setPassword(field.target.value)}
          />
          <TextField
            required
            fullWidth
            autoFocus
            id='nama'
            name='nama'
            margin='normal'
            label='Nama'
            value={nama}
            onChange={(field) => setNama(field.target.value)}
          />
          <TextField
            required
            fullWidth
            autoFocus
            id='tempat_lahir'
            name='tempat_lahir'
            margin='normal'
            label='Tempat Lahir'
            value={tempatLahir}
            onChange={(field) => setTempatLahir(field.target.value)}
          />
          <TextField
            required
            fullWidth
            autoFocus
            margin='normal'
            id='date'
            type='date'
            label='Tanggal Lahir'
            InputLabelProps={{
              shrink: true,
            }}
             value={tanggalLahir}
            onChange={(field) => setTanggalLahir(field.target.value)}
          />
          <TextField
            required
            fullWidth
            autoFocus
            id='alamat'
            name='alamat'
            margin='normal'
            label='Alamat'
            value={alamat}
            onChange={(field) => setAlamat(field.target.value)}
          />
          <TextField
            required
            fullWidth
            autoFocus
            id='telepon'
            name='telepon'
            margin='normal'
            label='Telepon'
            value={telepon}
            onChange={(field) => setTelepon(field.target.value)}
          />
          <Button
            fullWidth
            type='submit'
            color='default'
            variant='contained'
            className={classes.submit}
            onClick={() => {
              Register()
            }}
          >
            DAFTAR
          </Button>
          <Button
            fullWidth
            type='submit'
            color='default'
            variant='contained'
            className={classes.signup}
            onClick={() => {
              setIsSignUp(false)
              setIsSignIn(true)
            }}
          >
            MASUK
          </Button>
        </div>
      </div>
    )
  }

  const SignIn = () => {
    return (
      <div className={classes.paper}>
        <Typography component='h1' variant='h5'>
          MASUK
        </Typography>
        <div className={classes.form} noValidate>
          <TextField
            required
            fullWidth
            autoFocus
            id='username'
            name='username'
            margin='normal'
            label='Username'
            value={username}
            onChange={(field) => setUsername(field.target.value)}
          />
          <TextField
            required
            fullWidth
            id='password'
            margin='normal'
            name='password'
            type='password'
            label='Password'
            value={password}
            onChange={(field) => setPassword(field.target.value)}
          />
          <Button
            fullWidth
            type='submit'
            color='default'
            variant='contained'
            className={classes.submit}
            onClick={() => Login()}
          >
            MASUK
          </Button>
          <Button
            fullWidth
            type='submit'
            color='default'
            variant='contained'
            className={classes.signup}
            onClick={() => {
              setIsSignIn(false)
              setIsSignUp(true)
            }}
          >
            DAFTAR
          </Button>
        </div>
      </div>
    )
  }

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      {isSignIn && SignIn()}
      {isSignUp && SignUp()}
    </Container>
  )
}

export default Authentication
