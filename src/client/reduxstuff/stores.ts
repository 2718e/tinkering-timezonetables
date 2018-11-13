import { createStore } from 'redux'
import { loadState, autoSaveRedux } from '../persistence/persister'
import {topLevelReducer} from './reducers'

export const store = createStore(topLevelReducer, loadState())

autoSaveRedux(store, 10000)