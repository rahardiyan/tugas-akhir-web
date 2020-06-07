import Axios from 'axios'
import { useSelector } from 'react-redux'
import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, GridColumn } from '@progress/kendo-react-grid'
import {
  Button, FormControl, InputLabel, MenuItem, Select,
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

const STATUS_PINJAM = [
  {
    id: 0,
    status: 'Menunggu Persetujuan'
  },
  {
    id: 1,
    status: 'Ditolak'
  },
  {
    id: 2,
    status: 'Disetujui'
  },
  {
    id: 3,
    status: 'Sudah Diambil'
  },
  {
    id: 4,
    status: 'Sudah Dikembalikan'
  },
  {
    id: 5,
    status: 'Overdue'
  }
]

const Peminjaman = () => {
  const classes = useStyles()

  const [skip, setSkip] = useState(0)
  const [take, setTake] = useState(10)
  const [peminjaman, setPeminjaman] = useState([])
  const [book, setBook] = useState([])
  const [status, setStatus] = useState()

  const { user } = useSelector((state) => ({
    user: state.UserStorage.user,
  }))

  useEffect(() => {
    GetAllDataPeminjamanFasilitas()
    GetAllDataBook()
  }, [])

  const GetAllDataPeminjamanFasilitas = () => {
    const url = `http://localhost:2016/book-borrow/view-all`
    Axios.get(url)
      .then((data) => {
        let peminjaman = []
        if (data.data.result != null) {
          let datas = data.data.result
          if(user.id_role !== 5) {
            datas = datas.filter(dta => dta.uuid_user === user.idUser)
          }
          datas.length > 0 &&
            datas.map((dt, i) => {
              dt.no = i + 1
              return peminjaman.push(dt)
            })
          setPeminjaman(peminjaman)
        }
      })
      .catch((err) => {
        console.log(err)
        alert('Error on get peminjaman fasilitas')
      })
  }

  const GetAllDataBook = () => {
    const url = `http://localhost:2016/book/view-all`
    Axios.get(url)
      .then((data) => {
        let book = []
        if (data.data.result != null) {
          let datas = data.data.result
          datas.length > 0 &&
            datas.map((dt, i) => {
              dt.no = i + 1
              return book.push(dt)
            })
          setBook(book)
        }
      })
      .catch((err) => {
        console.log(err)
        alert('Error on get peminjaman fasilitas')
      })
  }

  const pageChange = (event) => {
    setSkip(event.page.skip)
    setTake(event.page.take)
  }

  const UpdateStatus = (id) => {
      const url = `http://localhost:2016/book-borrow/update/${id}?status=${status}`
      Axios.put(url)
        .then((data) => {
          console.log(data)
          GetAllDataPeminjamanFasilitas()
        })
        .catch((err) => {
          console.log(err)
          alert('Error on get peminjaman fasilitas')
        })
      setStatus(0)
  }

  return (
    <Wrapper>
      <div className={classes.root} noValidate autoComplete='off'>
        <div>
          <Grid
            skip={skip}
            take={take}
            pageable={true}
            total={peminjaman.length}
            className={classes.table}
            onPageChange={pageChange}
            data={peminjaman.slice(skip, take + skip)}
          >
            <GridColumn
              field='no'
              title='No'
              width={50}
              className={classes.center}
              headerClassName={classes.center}
            />
            <GridColumn
              width={250}
              field='idBuku'
              title='Buku'
              className={classes.center}
              headerClassName={classes.center}
              cell={(props) => {
                let books = book.filter(bk => bk.id === props.dataItem[props.field])
                return (
                <td
                  style={{
                    color: 'black',
                    textAlign: 'center',
                  }}
                >
                  {books && books.length > 0 ? books[0].judul : ''}
                </td>
              )}}
            />
            <GridColumn
              width={200}
              field='tanggalPeminjaman'
              title='Tanggal Peminjaman'
              className={classes.center}
              headerClassName={classes.center}
            />
            <GridColumn
              width={200}
              field='tanggalPengembalian'
              title='Tanggal Pengembalian'
              className={classes.center}
              headerClassName={classes.center}
            />
            <GridColumn
              field='statusPeminjaman'
              title='Status Peminjaman'
              className={classes.center}
              headerClassName={classes.center}
              cell={(props) => {
                let stats = STATUS_PINJAM.filter(stat => stat.id === props.dataItem[props.field])
                return (
                <td
                  style={{
                    color: 'black',
                    textAlign: 'center',
                  }}
                >
                  {stats[0].status}
                </td>
              )}}
            />
            {
              user.id_role === 5 && <GridColumn
              width={450}
              title='Action'
              headerClassName={classes.center}
              cell={(props) => {
                return (
                <td
                  style={{
                    color: 'black',
                    display: 'flex',
                    textAlign: 'center',
                    justifyContent: 'space-around',
                  }}
                >
                  <FormControl variant='filled' className={classes.formControl}>
                    <InputLabel id='select-status-label'>Status</InputLabel>
                    <Select
                      style={{ width: 200 }}
                      label='Status'
                      value={status}
                      id='select-status'
                      labelId='select-status-label'
                      onChange={(field) => setStatus(field.target.value)}
                    >
                      {STATUS_PINJAM.length > 0 &&
                        STATUS_PINJAM.map((stat) => {
                          return (
                            <MenuItem key={stat.id} value={stat.id}>
                              {stat.status}
                            </MenuItem>
                          )
                        })}
                    </Select>
                  </FormControl>
                    <Button
                      style={{ width: 200 }}
                      fullWidth
                      type='submit'
                      color='default'
                      variant='contained'
                      className={classes.action}
                      onClick={() => UpdateStatus(props.dataItem.id)}
                    >
                      Update Status
                    </Button>
                </td>
                )}}
            />
            }
          </Grid>
        </div>
      </div>
    </Wrapper>
  )
}

export default Peminjaman
