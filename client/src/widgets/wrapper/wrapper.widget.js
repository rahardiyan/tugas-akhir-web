import clsx from 'clsx'
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import {
  List,
  Drawer,
  AppBar,
  Toolbar,
  Divider,
  ListItem,
  Typography,
  IconButton,
  CssBaseline,
  ListItemText,
  ListItemIcon,
  Link,
  Modal,
  Fade,
  Backdrop,
  TextField,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import MailIcon from '@material-ui/icons/Mail'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import { useTheme, makeStyles } from '@material-ui/core/styles'
import { USER } from '../../redux/actions'
import { useSelector } from 'react-redux'

const drawerWidth = 300

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    flexShrink: 0,
    width: drawerWidth,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    ...theme.mixins.toolbar,
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(2.5),
    justifyContent: 'space-between',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  headerContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  modal: {
    display: 'flex',
    marginTop: '-15%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    maxWidth: '30%',
    maxHeight: '50%',
    borderRadius: '1%',
    padding: theme.spacing(2, 4, 3),
    backgroundColor: theme.palette.background.paper,
  },
}))

const PUSTAKAWAN_MENU = [
  'Home',
  'Buku',
  'Peminjaman',
  'Pengadaan'
]

const GURU_MENU = [
  'Home',
  'Buku',
  'Peminjaman',
  'Pengadaan'
]

const SISWA_MENU = [
  'Home',
  'Buku',
  'Peminjaman',
  'Pengadaan'
]

const ROLE_MENU = [
  {
    id: 3,
    menu: GURU_MENU
  },{
    id: 4,
    menu: SISWA_MENU
  },
  {
    id: 5,
    menu: PUSTAKAWAN_MENU
  },
]

const Wrapper = ({ children }) => {
  const location = useLocation()
  const dispatch = useDispatch()
  const classes = useStyles()
  const theme = useTheme()
  const [open, setOpen] = useState(true)
  const [openModal, setOpenModal] = useState(false)
  const [menu, setMenu] = useState([])

  const { user } = useSelector((state) => ({
    user: state.UserStorage.user,
  }))

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const logout = () => {
    dispatch({
      type: USER.SET_LOGOUT,
    })
  }

  useEffect(() => {
    SetData()
  },[])

  const SetData = () => {
    let activeMenu = ROLE_MENU.filter(rl => rl.id === user.id_role)
    setMenu(activeMenu[0].menu)
  }

  const UserProfile = () => {
    return (
      <Modal
        open={openModal}
        closeAfterTransition
        className={classes.modal}
        BackdropComponent={Backdrop}
        onClose={() => setOpenModal(false)}
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <div className={classes.paper}>
            <TextField
              fullWidth
              disabled
              id='username'
              name='username'
              margin='normal'
              label='Username'
              variant='outlined'
              value={user.username}
            />
            <TextField
              fullWidth
              disabled
              id='nama'
              name='nama'
              margin='normal'
              label='Nama'
              variant='outlined'
              value={user.nama}
            />
            <TextField
              fullWidth
              disabled
              id='tempat_lahir'
              name='tempat_lahir'
              margin='normal'
              label='Tempat Lahir'
              variant='outlined'
              value={user.tempatLahir}
            />
            <TextField
              fullWidth
              disabled
              margin='normal'
              id='date'
              type='date'
              variant='outlined'
              label='Tanggal Lahir'
              defaultValue={user.tanggalLahir}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              fullWidth
              disabled
              id='alamat'
              name='alamat'
              margin='normal'
              label='Alamat'
              variant='outlined'
              value={user.alamat}
            />
            <TextField
              fullWidth
              disabled
              id='telepon'
              name='telepon'
              margin='normal'
              label='Telepon'
              variant='outlined'
              value={user.telepon}
            />
          </div>
        </Fade>
      </Modal>
    )
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position='fixed'
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
        color='white'
      >
        <div className={classes.headerContent}>
          <Toolbar>
            <IconButton
              edge='start'
              color='inherit'
              aria-label='open drawer'
              onClick={handleDrawerOpen}
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
          <div>
            <IconButton
              edge='start'
              color='inherit'
              aria-label='open drawer'
              onClick={() => setOpenModal(true)}
            >
              <AccountCircleIcon />
            </IconButton>
            <IconButton
              edge='start'
              color='inherit'
              aria-label='open drawer'
              onClick={() => logout()}
            >
              <ExitToAppIcon />
            </IconButton>
          </div>
        </div>
      </AppBar>
      <Drawer
        open={open}
        anchor='left'
        variant='persistent'
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <b>{`Hallo, ${user.username}`}</b>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {menu && menu.length > 0 && menu.map((text, index) => {
            const color = location.pathname.replace('/', '') ===  text.toLowerCase()
              ? 'black'
              : 'grey'
            return (
              <Link
                key={index}
                href={`#/${text.toLowerCase()}`}
                style={{ color: color, fontWeight: 'bold' }}
              >
                <ListItem button>
                  <ListItemIcon>
                    {index % 2 !== 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText>{text}</ListItemText>
                </ListItem>
              </Link>
            )
          })}
        </List>
        <Divider />
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {UserProfile()}
        {children}
      </main>
    </div>
  )
}

export default Wrapper
