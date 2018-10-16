import { connect, Provider } from 'react-redux'
import * as React from 'react'
import {wotevToEmptyObject} from '../../helpers'
import { TopLevelState } from '../../stores/datatypes'
import { store, ASetSelectedPlaces } from '../../stores/toplevel' // may reorganize this sturucture later (i.e. put store and reducers in separate files and coordinate them here)
import { PlaceSelector } from '../presentational/placeselector'
import { TimeDisplay } from '../presentational/timedisplay'
import { getTimezoneList } from '../../helpers'

const zones = getTimezoneList()

const PlaceSelectorRCC = connect(
    (state: TopLevelState) => {
        return { currentSelection: state.selectedPlaces }
    },
    (dispatch) => {
        return {
            onSelect: (nextData) => dispatch({
                type: "SET_SELECTED_PLACES",
                selection: nextData
            } as ASetSelectedPlaces)
        }
    }
)(PlaceSelector)

const TimeDisplayRCC = connect(
    (state: TopLevelState) => { return { places: state.selectedPlaces.map(x=>x.value) } },
    wotevToEmptyObject
)(TimeDisplay)

export const RootRCC = () => <Provider store={store}>
    <>
        <h2>Time Zone conversion table</h2>
        <h3>Select places</h3>
        <PlaceSelectorRCC zones={zones} />
        <h3>Results</h3>
        <TimeDisplayRCC />
    </>
</Provider>
