import React from 'react'
import { Route, useRouteMatch, Redirect } from 'react-router-dom'

import { Home, InternalServerError, Book, Room, Pengadaan, Peminjaman } from '../pages'

const AppNavigation = () => {
  const match = useRouteMatch()
  return (
    <Route>
      <Route exact path={`${match.url}`}>
        <Home />
      </Route>
      <Route exact path={`${match.url}home`}>
        <Home />
      </Route>
      <Route exact path={`${match.url}buku`}>
        <Book />
      </Route>
      <Route exact path={`${match.url}peminjaman`}>
        <Peminjaman />
      </Route>
      <Route exact path={`${match.url}pengadaan`}>
        <Pengadaan />
      </Route>
      <Route path={`${match.url}internal-error-server`}>
        <InternalServerError />
      </Route>
      {/* <Redirect to='internal-error-server' /> */}
    </Route>
  )
}
export default AppNavigation
