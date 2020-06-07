import './index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker'
import { PersistGate } from 'redux-persist/integration/react'

import { Store } from './helpers'
import Navigation from './navigations'

import '@progress/kendo-theme-default/dist/all.css'

const Application = () => (
  <Provider store={Store.store}>
    <PersistGate persistor={Store.persistor}>
      <Navigation />
    </PersistGate>
  </Provider>
)

const wrapper = document.getElementById('root')
ReactDOM.render(<Application />, wrapper)
serviceWorker.unregister()
