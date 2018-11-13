// utility functions for persisting the app state (redux) between sessions
// pretty much copied from https://medium.com/@jrcreencia/persisting-redux-state-to-local-storage-f81eb0b90e7e
import * as throttle  from 'lodash/throttle'
import * as merge from 'lodash/merge'
import { TopLevelState } from './datatypes'
import {Store} from 'redux'
import {migrateIfNeeded, getDefaultState} from './migrations'


export function loadState(): TopLevelState {
    try {
        const serializedState = localStorage.getItem('app-state') || '{}'
        return migrateIfNeeded(JSON.parse(serializedState))
    } catch (err) {
        return getDefaultState()
    }
};

function saveState(state: TopLevelState) {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('app-state', serializedState);
    } catch {
        // ignore write errors
    }
};



export function autoSaveRedux(store: Store, rateMilliseconds: number ) {
    store.subscribe(throttle(() => saveState(store.getState()),rateMilliseconds))
}