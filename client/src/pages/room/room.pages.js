import Axios from 'axios'
import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, GridColumn } from '@progress/kendo-react-grid'
import { Typography, Button, TextField } from '@material-ui/core'
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
  },
  input: {
    marginBottom: 10,
  },
}))

const Room = () => {
  const classes = useStyles()

  const [skip, setSkip] = useState(0)
  const [take, setTake] = useState(10)
  const [isAction, setIsAction] = useState(false)
  const [id, setId] = useState(0)
  const [ruangan, setRuangan] = useState([])
  const [waktuMulai, setWaktuMulai] = useState(moment().format('hh:mm'))
  const [waktuSelesai, setWaktuSelesai] = useState(moment().format('hh:mm'))
  const [tanggalMulai, setTanggalMulai] = useState(moment().format('YYYY-MM-DD'))
  const [tanggalSelesai, setTanggalSelesai] = useState(moment().format('YYYY-MM-DD'))
  const [tujuan, setTujuan] = useState('')
  const [keterangan, setKeterangan] = useState('')
  const [jumlah, setJumlah] = useState(0)
  
  const { user } = useSelector((state) => ({
    user: state.UserStorage.user,
  }))

  useEffect(() => {
    GetAllDataRuangan()
    SetData()
  }, [])

  const GetAllDataRuangan = () => {
    const url = `http://localhost:2016/ruangan/view-all`
    Axios.get(url)
      .then((data) => {
        let ruang = []
        if (data.data.result != null) {
          data.data.result.length > 0 &&
            data.data.result.map((dt, i) => {
              dt.no = i + 1
              return ruang.push(dt)
            })
          setRuangan(ruang)
        }
      })
      .catch((err) => {
        console.log(err)
        alert('Error on get fasilitas')
      })
  }

  const SetData = () => {
    setRuangan(ruangan.sort((a, b) => a.no - b.no))
  }

  const pageChange = (event) => {
    setSkip(event.page.skip)
    setTake(event.page.take)
  }

  const OnPinjam = (data) => {
    setIsAction(true)
    setId(data.id)
  }

  const Clear = () => {
    setWaktuMulai(moment().format('hh:mm'))
    setWaktuSelesai(moment().format('hh:mm'))
    setTanggalMulai(moment().format('YYYY-MM-DD'))
    setTanggalSelesai(moment().format('YYYY-MM-DD'))
    setTujuan('')
    setKeterangan('')
    setJumlah(0)
  }

  const SavePeminjamanRuangan = () => {
    let data = {
      waktu_mulai: waktuMulai,
      waktu_selesai: waktuSelesai,
      tanggal_mulai: tanggalMulai,
      tanggal_selesai: tanggalSelesai,
      tujuan: tujuan,
      keterangan: keterangan,
      jumlah_peserta: jumlah,
      status: 1,
      id_ruang: id,
      uuid_user_peminjam: user.idUser,
      uuid_user_penyetuju: null
    }

    const url = `http://localhost:2016/peminjaman_ruangan/add`
    Axios.post(url, data)
      .then(resp => {
        if(resp.data.result !== null) {
          alert('Success Pinjam Ruangan')
          Clear()
          setIsAction(false)
        }
      })
      .catch(err => {
        console.log(err)
        alert('Failed Pinjam Ruangan')
      })
  }

  const Form = () => {
    return (
      <div className={classes.form}>
        <TextField
          type='time'
          variant='outlined'
          label='Waktu Mulai'
          value={waktuMulai}
          className={classes.input}
          onChange={(field) => setWaktuMulai(field.target.value)}
        />
        <TextField
          type='time'
          variant='outlined'
          value={waktuSelesai}
          label='Waktu Selesai'
          className={classes.input}
          onChange={(field) => setWaktuSelesai(field.target.value)}
        />
        <TextField
          type='date'
          variant='outlined'
          label='Tanggal Mulai'
          value={tanggalMulai}
          className={classes.input}
          onChange={(field) => setTanggalMulai(field.target.value)}
        />
        <TextField
          type='date'
          variant='outlined'
          label='Tanggal Selesai'
          value={tanggalSelesai}
          className={classes.input}
          onChange={(field) => setTanggalSelesai(field.target.value)}
        />
        <TextField
          variant='outlined'
          label='Tujuan'
          value={tujuan}
          className={classes.input}
          onChange={(field) => setTujuan(field.target.value)}
        />
        <TextField
          variant='outlined'
          label='Katerangan'
          value={keterangan}
          className={classes.input}
          onChange={(field) => setKeterangan(field.target.value)}
        />
        <TextField
          type='number'
          variant='outlined'
          label='Jumlah Peserta'
          value={jumlah}
          className={classes.input}
          onChange={(field) => setJumlah(field.target.value)}
        />
        <Button
          fullWidth
          type='submit'
          color='default'
          variant='contained'
          className={classes.submit}
          onClick={() => SavePeminjamanRuangan()}
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
          <Grid
            skip={skip}
            take={take}
            pageable={true}
            total={ruangan.length}
            className={classes.table}
            onPageChange={pageChange}
            data={ruangan.slice(skip, take + skip)}
          >
            <GridColumn
              field='no'
              title='No'
              width={50}
              className={classes.center}
              headerClassName={classes.center}
            />
            <GridColumn
              field='nama'
              width={350}
              title='Nama'
              headerClassName={classes.center}
            />
            <GridColumn
              width={125}
              field='kapasitas'
              title='Kapasitas'
              className={classes.center}
              headerClassName={classes.center}
            />
            {
              user.id_role === 3 || user.id_role === 4 ?
              <GridColumn
                width={200}
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
                      onClick={() => OnPinjam(props.dataItem)}
                    >
                      Pinjam
                    </Button>
                  </td>
                )}
              /> : null
            }
          </Grid>
          {isAction && Form()}
        </div>
      </div>
    </Wrapper>
  )
}

export default Room
