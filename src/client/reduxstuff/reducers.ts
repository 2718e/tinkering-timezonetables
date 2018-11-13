import {TopLevelState} from '../persistence/datatypes'
import {ASetSelectedPlaces, ASetUse24Hour, ASetBaseZone, ASetBaseDate} from './actions'

// function for immutable reassigning - shallow copies object excpet for the specified key
function reassignKey<TObj extends Object, TKey extends keyof TObj>(old: TObj, key: TKey, next: TObj[TKey]) {
    const nextState = { ...(old as Object) } as TObj // workaround for known issue in typescript not thinking T extends Object can be object spreaded.
    nextState[key] = next
    return nextState
}

export function topLevelReducer(state: TopLevelState, action) {
    let nextState = state;
    switch (action.type) {
        case "SET_SELECTED_PLACES":
            nextState = reassignKey(state, "selectedPlaces", (action as ASetSelectedPlaces).selection)
            break
        case "SET_USE_24_HOUR":
            nextState = reassignKey(state, "config",
                reassignKey(state.config, "use24hour", (action as ASetUse24Hour).use24Hour))
            break
        case "SET_BASE_ZONE":
            nextState = reassignKey(state, "config",
            reassignKey(state.config, "baseZone", (action as ASetBaseZone).fullZoneName))
            break
        case "SET_BASE_DATE":
            nextState = reassignKey(state, "config",
            reassignKey(state.config, "dateInBaseZone", (action as ASetBaseDate).dateString))
            break
        default:
            break
    }
    return nextState
}