import React from 'react'
import { useSelector } from 'react-redux'
import { HashRouter, Switch } from 'react-router-dom'

import AppNavigation from './app.navigation'
import AuthenticationNavigation from './authentication.navigation'

const Navigation = () => {
  const { version, is_login, is_error } = useSelector((state) => ({
    version: state.AppStorage.version,
    is_error: state.AppStorage.is_error,
    is_login: state.UserStorage.is_login,
  }))

  return (
    <HashRouter>
      <Switch>
        {is_login ? <AppNavigation /> : <AuthenticationNavigation />}
      </Switch>
    </HashRouter>
  )
}

export default Navigation
