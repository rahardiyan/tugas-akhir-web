import thunk from 'redux-thunk'
import storage from 'redux-persist/lib/storage'
import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import { composeWithDevTools } from 'redux-devtools-extension'

import all_reducer from '../redux/reducers'

const persist_config = {
  key: 'harvest_web',
  storage
}

const persisted_reducer = persistReducer(persist_config, all_reducer)

const store = createStore(
  persisted_reducer,
  composeWithDevTools(applyMiddleware(thunk))
)
const persistor = persistStore(store)

export default { store, persistor }
