import Axios from 'axios'
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
import { useSelector } from 'react-redux'
import moment from 'moment'

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
    marginLeft: 20,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    minWidth: 500
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

const Book = () => {
  const classes = useStyles()

  const [skip, setSkip] = useState(0)
  const [take, setTake] = useState(10)
  const [isAction, setIsAction] = useState(false)
  const [action, setAction] = useState('')
  const [judul, setJudul] = useState('')
  const [pengarang, setPengarang] = useState('')
  const [penerbit, setPenerbit] = useState('')
  const [jumlah, setJumlah] = useState(0)
  const [idJenisBuku, setIdJenisBuku] = useState(0)
  const [id, setId] = useState(0)
  const [book, setBook] = useState([])
  const [jenisBuku, setJenisBuku] = useState([])
  const [tanggalPinjam, setTanggalPinjam] = useState(moment().format('YYYY-MM-DD'))
  const [tanggalKembali, setTanggalKembali] = useState(moment().format('YYYY-MM-DD'))
  const [status, setStatus] = useState(0)

  useEffect(() => {
    GetAllDataBook()
    GetAllJenisBuku()
  }, [])

  const { user } = useSelector((state) => ({
    user: state.UserStorage.user,
  }))

  const GetAllDataBook = () => {
    const url = `http://localhost:2016/book/view-all`
    Axios.get(url)
      .then((data) => {
        let fac = []
        if (data.data.result != null) {
          data.data.result.length > 0 &&
            data.data.result.map((dt, i) => {
              dt.no = i + 1
              return fac.push(dt)
            })
          setBook(fac)
        }
      })
      .catch((err) => {
        console.log(err)
        alert('Error on get book')
      })
  }

  const GetAllJenisBuku = () => {
    const url = `http://localhost:2016/book/view-all-jenis-buku`
    Axios.get(url)
      .then((data) => {
        let fac = []
        if (data.data.result != null) {
          data.data.result.length > 0 &&
            data.data.result.map((dt, i) => {
              dt.no = i + 1
              return fac.push(dt)
            })
          setJenisBuku(fac)
        }
      })
      .catch((err) => {
        console.log(err)
        alert('Error on get book')
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
    setJumlah(0)
    setPenerbit('')
    setPengarang('')
    setIdJenisBuku(0)
    setId(0)
  }

  const OnEdit = (data) => {
    setIsAction(true)
    setAction('edit')
    setJudul(data.judul)
    setPenerbit(data.penerbit)
    setPengarang(data.pengarang)
    setJumlah(data.jumlahBuku)
    setIdJenisBuku(data.idJenisBuku)
    setId(data.id)
  }

  const OnHapus = (id) => {
    const url = `http://localhost:2016/book/delete?id=${id}`
    Axios.delete(url)
      .then((data) => {
        console.log(data)
        GetAllDataBook()
      })
      .catch((err) => {
        console.log(err)
        alert('Error on get book')
      })
    setIsAction(false)
  }

  const OnPinjam = (id) => {
    setAction('pinjam')
    setStatus(0)
    setId(id)
  }

  const SaveBook = () => {
    const book = {
      judul,
      pengarang,
      penerbit,
      jumlahBuku: jumlah,
      idJenisBuku: idJenisBuku,
    }

    if (action === 'tambah') {
      const url = `http://localhost:2016/book/add`
      Axios.post(url, book)
        .then((data) => {
          console.log(data)
          GetAllDataBook()
        })
        .catch((err) => {
          console.log(err)
          alert('Error on get book')
        })
    } else {
      const url = `http://localhost:2016/book/update/${id}?jumlah=${jumlah}`
      Axios.put(url)
        .then((data) => {
          console.log(data)
          GetAllDataBook()
        })
        .catch((err) => {
          console.log(err)
          alert('Error on get book')
        })
    }
    setIsAction(false)
  }

  const SavePinjam = () => {
    console.log(user)
    const borrow = {
      tanggalPeminjaman: tanggalPinjam,
      tanggalPengembalian: tanggalKembali,
      statusPeminjaman: status,
      idBuku: id,
      uuid_user: user.idUser
    }

    const url = `http://localhost:2016/book-borrow/add`
      Axios.post(url, borrow)
        .then((data) => {
          console.log(data)
          GetAllDataBook()
        })
        .catch((err) => {
          console.log(err)
          alert('Error on get book')
        })
      
        setAction('')
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
          <FormControl variant='filled' className={classes.formControl}>
            <InputLabel id='select-jenisBuku-label'>JenisBuku</InputLabel>
            <Select
              label='JenisBuku'
              value={idJenisBuku}
              id='select-jenisBuku'
              labelId='select-jenisBuku-label'
              onChange={(field) => setIdJenisBuku(field.target.value)}
            >
              {jenisBuku.length > 0 &&
                jenisBuku.map((ruang) => {
                  return (
                    <MenuItem key={ruang.id} value={ruang.id}>
                      {ruang.jenis_buku}
                    </MenuItem>
                  )
                })}
            </Select>
          </FormControl>
        <Button
          fullWidth
          type='submit'
          color='default'
          variant='contained'
          className={classes.submit}
          onClick={() => SaveBook()}
        >
          Simpan
        </Button>
      </div>
    )
  }

  const FormPinjam = () => {
    return (
      <div className={classes.form}>
        <TextField
          type='date'
          label='Tanggal Peminjaman'
          variant='outlined'
          className={classes.input}
          value={tanggalPinjam}
          onChange={(field) => setTanggalPinjam(field.target.value)}
        />
        <TextField
          type='date'
          label='Tanggal Pengembalian'
          variant='outlined'
          className={classes.input}
          value={tanggalKembali}
          onChange={(field) => setTanggalKembali(field.target.value)}
        />
        <Button
          fullWidth
          type='submit'
          color='default'
          variant='contained'
          className={classes.submit}
          onClick={() => SavePinjam()}
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
        <div className={classes.title}>
          <Grid
            skip={skip}
            take={take}
            pageable={true}
            total={book.length}
            className={classes.table}
            onPageChange={pageChange}
            data={book.slice(skip, take + skip)}
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
              title='Judul'
              headerClassName={classes.center}
            />
            <GridColumn
              field='penerbit'
              title='Penerbit'
              headerClassName={classes.center}
            />
            <GridColumn
              field='pengarang'
              title='Pengarang'
              headerClassName={classes.center}
            />
            <GridColumn
              width={100}
              field='jumlahBuku'
              title='Jumlah'
              className={classes.center}
              headerClassName={classes.center}
            />
            <GridColumn
              width={250}
              field='idJenisBuku'
              title='Jenis Buku'
              headerClassName={classes.center}
              cell={(props) => {
                let jenis = jenisBuku.filter(
                  (ru) => ru.id === props.dataItem[props.field]
                )
                jenis = jenis.length > 0 ? jenis[0].jenis_buku : ''
                return (
                  <td
                    style={{
                      color: 'black',
                      textAlign: 'center',
                    }}
                  >
                    {jenis}
                  </td>
                )
              }}
            />
            <GridColumn
              width={300}
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
                  onClick={() => OnPinjam(props.dataItem.id)}
                >
                  Pinjam
                </Button>
                  <Button
                    fullWidth
                    type='submit'
                    color='default'
                    variant='contained'
                    className={classes.action}
                    onClick={() => OnEdit(props.dataItem)}
                  >
                    Edit
                  </Button>
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
        {action === 'pinjam' && FormPinjam()}
      </div>
    </Wrapper>
  )
}

export default Book
