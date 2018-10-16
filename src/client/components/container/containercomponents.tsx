import { connect, Provider } from 'react-redux'
import * as React from 'react'
import {wotevToEmptyObject} from '../../helpers'
import { TopLevelState } from '../../stores/datatypes'
import { store, ASetSelectedPlaces, ASetUse24Hour } from '../../stores/toplevel' // may reorganize this sturucture later (i.e. put store and reducers in separate files and coordinate them here)
import { PlaceSelector } from '../presentational/placeselector'
import { TimeDisplay } from '../presentational/timedisplay'
import { OptionsSelector } from '../presentational/OptionsSelector'
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

const OptionsSelectorRCC = connect(
    (state: TopLevelState) => { return { currentConfig: state.config } },
    (dispatch) => {
        return {
            onToggle24Hour: (use24Hour) => dispatch({
                type: "SET_USE_24_HOUR",
                use24Hour: use24Hour
            } as ASetUse24Hour)
        }
    }
)(OptionsSelector)

const TimeDisplayRCC = connect(
    (state: TopLevelState) => { return { 
        places: state.selectedPlaces.map(x=>x.value),
        timeFormat: state.config.use24hour ? "HH:mm" : "h:mm a"
    }},
    wotevToEmptyObject
)(TimeDisplay)



export const RootRCC = () => <Provider store={store}>
    <>
        <h2>Time Zone conversion table</h2>
        <h3>Select places</h3>
        <PlaceSelectorRCC zones={zones} />
        <h3>Options</h3>
        <OptionsSelectorRCC />
        <h3>Results</h3>
        <TimeDisplayRCC />
    </>
</Provider>
