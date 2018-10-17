// utility functions for persisting the app state (redux) between sessions
// pretty much copied from https://medium.com/@jrcreencia/persisting-redux-state-to-local-storage-f81eb0b90e7e
import * as throttle  from 'lodash/throttle'
import { TopLevelState } from './datatypes'
import {Store} from 'redux'

export function loadState(): TopLevelState {
    try {
        const serializedState = localStorage.getItem('app-state')
        if (serializedState === null) {
            return getDefaultState();
        }
        return JSON.parse(serializedState)
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
            baseZone: 'Pacific/Auckland'
        }
    }
}

export function autoSaveRedux(store: Store, rateMilliseconds: number ) {
    store.subscribe(throttle(() => saveState(store.getState()),rateMilliseconds))
}