import { createStore } from 'redux'
import { TopLevelState, SplitTimezoneName, ReactSelectWrapped } from './datatypes';

function getInitialState() : TopLevelState {
    return {
        selectedPlaces: []   
    }
}

function reassignKey<TObj extends Object, TKey extends keyof TObj>(old: TObj, key: TKey, next: TObj[TKey]){
    const nextState = { ...(old as Object) } as TObj // workaround for known issue in typescript not thinking T extends Object can be object spreaded.
    nextState[key] = next
    return nextState
}

// because currently very simple and small scale can have the actions stores and reducers
// all in the same file, should move these when more complex.
export type ASetSelectedPlaces= {
    type: "SET_SELECTED_PLACES";
    selection: ReactSelectWrapped<SplitTimezoneName>[]
}

function topLevelReducer(state: TopLevelState, action){
    let nextState = state;
    switch (action.type) {
        case "SET_SELECTED_PLACES":
            nextState = reassignKey(state,"selectedPlaces", (action as ASetSelectedPlaces).selection)
        default:
    }
    return nextState
}

export const store = createStore(topLevelReducer, getInitialState())