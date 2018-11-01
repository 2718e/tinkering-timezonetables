// utility functions for persisting the app state (redux) between sessions
// pretty much copied from https://medium.com/@jrcreencia/persisting-redux-state-to-local-storage-f81eb0b90e7e
import * as throttle  from 'lodash/throttle'
import * as merge from 'lodash/merge'
import { TopLevelState } from '../datatypes'
import {Store} from 'redux'
import * as moment from 'moment-timezone'
import {DATE_FORMAT} from '../helpers'

export function loadState(): TopLevelState {
    try {
        const serializedState = localStorage.getItem('app-state') || '{}'
        // merge with default state for migration, i.e. so can add more parts to app state without invalidating existing user settings
        return merge(getDefaultState(), JSON.parse(serializedState))
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

function getDefaultState(): TopLevelState {
    return {
        selectedPlaces: [],
        config: {
            use24hour: true,
            baseZone: 'Pacific/Auckland',
            dateInBaseZone: moment().format(DATE_FORMAT)
        }
    }
}

export function autoSaveRedux(store: Store, rateMilliseconds: number ) {
    store.subscribe(throttle(() => saveState(store.getState()),rateMilliseconds))
}