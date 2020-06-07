import React from 'react'
import { Route, useRouteMatch } from 'react-router-dom'

import { Authentication } from '../pages'

const AuthenticationNavigation = () => {
  const match = useRouteMatch()
  return (
    <Route path={`${match.url}`}>
      <Authentication />
    </Route>
  )
}

export default AuthenticationNavigation
