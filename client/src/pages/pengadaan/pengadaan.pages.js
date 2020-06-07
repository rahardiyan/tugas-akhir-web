import Axios from 'axios'
import { useSelector } from 'react-redux'
import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, GridColumn } from '@progress/kendo-react-grid'
import {
  FormControl,
  Button,
  TextField,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core'
import { Wrapper } from '../../widgets'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(0.5),
      width: '100%',
    },
  },
  title: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  add: {
    width: '10%',
  },
  table: {
    fontSize: 16,
    color: 'black',
    minHeight: 500,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  center: {
    color: 'black',
    textAlign: 'center !important',
  },
  action: {
    marginLeft: 10,
    marginRight: 10,
  },
  form: {
    marginTop: 20,
    width: '80%',
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    marginBottom: 10,
  },
  formControl: {
    minWidth: 120,
    marginBottom: theme.spacing(1),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}))

const status_list = [
  {
    id: 1,
    status: 'Menunggu Persetujuan',
  },
  {
    id: 2,
    status: 'Usulan Pengguna',
  },
]

const STATUS_PENGADAAN = [
  {
    id: 0,
    status: 'Usulan Pengguna'
  },
  {
    id: 1,
    status: 'Menunggu Persetujuan'
  },
  {
    id: 2,
    status: 'Ditolak'
  },
  {
    id: 3,
    status: 'Disetujui'
  },
]

const Pengadaan = () => {
  const classes = useStyles()

  const [skip, setSkip] = useState(0)
  const [take, setTake] = useState(10)
  const [isAction, setIsAction] = useState(false)
  const [action, setAction] = useState('')
  const [judul, setJudul] = useState('')
  const [pengarang, setPengarang] = useState('')
  const [penerbit, setPenerbit] = useState('')
  const [jumlah, setJumlah] = useState(0)
  const [harga, setHarga] = useState(0)
  const [status, setStatus] = useState(0)
  const [idRuangan, setIdRuangan] = useState(0)
  const [id, setId] = useState(0)
  const [pengadaan, setPengadaan] = useState([])

  const { user } = useSelector((state) => ({
    user: state.UserStorage.user,
  }))

  useEffect(() => {
    GetAllDataBookPurchase()
  }, [])

  const GetAllDataBookPurchase = () => {
    const url = `http://localhost:2016/book-purchase/view-all`
    Axios.get(url)
      .then((data) => {
        let pengadaan = []
        if (data.data.result != null) {
          let datas = data.data.result
          if(user.id_role !== 5) {
            datas = datas.filter(dta => dta.uuid_user === user.idUser)
          }
          datas.length > 0 &&
            datas.map((dt, i) => {
              dt.no = i + 1
                return pengadaan.push(dt)
            })
          setPengadaan(pengadaan)
        }
      })
      .catch((err) => {
        console.log(err)
        alert('Error on get pengadaan fasilitas')
      })
  }

  const pageChange = (event) => {
    setSkip(event.page.skip)
    setTake(event.page.take)
  }

  const OnTambah = () => {
    setIsAction(true)
    setAction('tambah')
    setJudul('')
    setPenerbit('')
    setPengarang('')
    setJumlah(0)
    setHarga(0)
    setId(0)
  }

  const OnHapus = (id) => {
    const url = `http://localhost:2016/book-purchase/delete?id=${id}`
    Axios.delete(url)
      .then((data) => {
        console.log(data)
        GetAllDataBookPurchase()
      })
      .catch((err) => {
        console.log(err)
        alert('Error on get pengadaan fasilitas')
      })
    setIsAction(false)
  }

  const SavePengadaan = () => {
    const purchase = {
      judul,
      pengarang,
      penerbit,
      jumlah,
      harga,
      status: user.id_role === 5 ? 1 : 0,
      uuid_user: user.idUser,
    }

      const url = `http://localhost:2016/book-purchase/add`
      Axios.post(url, purchase)
        .then((data) => {
          console.log(data)
          GetAllDataBookPurchase()
        })
        .catch((err) => {
          console.log(err)
          alert('Error on get pengadaan')
        })

    setIsAction(false)
  }

  const Form = () => {
    return (
      <div className={classes.form}>
        <TextField
          label='Judul'
          variant='outlined'
          className={classes.input}
          value={judul}
          onChange={(field) => setJudul(field.target.value)}
        />
        <TextField
          label='Pengarang'
          variant='outlined'
          className={classes.input}
          value={pengarang}
          onChange={(field) => setPengarang(field.target.value)}
        />
        <TextField
          label='Penerbit'
          variant='outlined'
          className={classes.input}
          value={penerbit}
          onChange={(field) => setPenerbit(field.target.value)}
        />
        <TextField
          type={'number'}
          label='Jumlah'
          value={jumlah}
          variant='outlined'
          className={classes.input}
          onChange={(field) => setJumlah(field.target.value)}
        />
        <TextField
          type={'number'}
          label='Harga'
          value={harga}
          variant='outlined'
          className={classes.input}
          onChange={(field) => setHarga(field.target.value)}
        />
        <Button
          fullWidth
          type='submit'
          color='default'
          variant='contained'
          className={classes.submit}
          onClick={() => SavePengadaan()}
        >
          Simpan
        </Button>
      </div>
    )
  }

  return (
    <Wrapper>
      <div className={classes.root} noValidate autoComplete='off'>
        <div className={classes.title}>
          <Button
            fullWidth
            type='submit'
            color='default'
            variant='contained'
            className={classes.add}
            onClick={() => OnTambah()}
          >
            Tambah
          </Button>
        </div>
        <div>
          <Grid
            skip={skip}
            take={take}
            pageable={true}
            total={pengadaan.length}
            className={classes.table}
            onPageChange={pageChange}
            data={pengadaan.slice(skip, take + skip)}
          >
            <GridColumn
              field='no'
              title='No'
              width={50}
              className={classes.center}
              headerClassName={classes.center}
            />
            <GridColumn
              field='judul'
              width={200}
              title='Judul'
              headerClassName={classes.center}
            />
            <GridColumn
              field='pengarang'
              width={200}
              title='Pengarang'
              headerClassName={classes.center}
            />
            <GridColumn
              field='penerbit'
              width={200}
              title='Penerbit'
              headerClassName={classes.center}
            />
            <GridColumn
              width={150}
              field='jumlah'
              title='Jumlah'
              className={classes.center}
              headerClassName={classes.center}
            />
            <GridColumn
              width={225}
              field='harga'
              title='Harga'
              className={classes.center}
              headerClassName={classes.center}
            />
            <GridColumn
              width={375}
              field='statusPengadaan'
              title='Status'
              className={classes.center}
              headerClassName={classes.center}
              cell={(props) => {
                let status = STATUS_PENGADAAN.filter(
                  (st) => st.id === props.dataItem[props.field]
                )
                status = status.length > 0 ? status[0].status : ''
                return (
                  <td
                    style={{
                      color: 'black',
                      textAlign: 'center',
                    }}
                  >
                    {status}
                  </td>
                )
              }}
            />
            <GridColumn
              title='Action'
              headerClassName={classes.center}
              cell={(props) => (
                <td
                  style={{
                    color: 'black',
                    display: 'flex',
                    textAlign: 'center',
                    justifyContent: 'space-around',
                  }}
                >
                  <Button
                    fullWidth
                    type='submit'
                    color='default'
                    variant='contained'
                    className={classes.action}
                    onClick={() => OnHapus(props.dataItem.id)}
                  >
                    Hapus
                  </Button>
                </td>
              )}
            />
          </Grid>
          {isAction && Form()}
        </div>
      </div>
    </Wrapper>
  )
}

export default Pengadaan
