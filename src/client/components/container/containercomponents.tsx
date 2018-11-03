import { connect, Provider } from 'react-redux'
import * as React from 'react'
import { TopLevelState, SplitTimezoneName } from '../../datatypes'
import { store } from '../../reduxstuff/stores'
import { ASetSelectedPlaces, ASetUse24Hour, ASetBaseZone, ASetBaseDate } from '../../reduxstuff/actions'
import { PlaceSelector } from '../presentational/PlaceSelector'
import { TimeDisplay } from '../presentational/TimeDisplay'
import { OptionsSelector } from '../presentational/OptionsSelector'
import { getTimezoneList } from '../../helpers'
import { FootNote } from '../presentational/footer'

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
            } as ASetUse24Hour),
            onChangeDate: (nextDateString) => dispatch({
                type: "SET_BASE_DATE",
                dateString: nextDateString
            } as ASetBaseDate)
        }
    }
)(OptionsSelector)

const TimeDisplayRCC = connect(
    (state: TopLevelState) => {
        return {
            places: state.selectedPlaces.map(x => x.value),
            timeFormat: state.config.use24hour ? "HH:mm" : "h:mm a",
            baseZoneName: state.config.baseZone,
            dateStringBaseZone: state.config.dateInBaseZone
        }
    },
    dispatch => {
        return {
            onClickPlace: (place: SplitTimezoneName) => dispatch({
                type: "SET_BASE_ZONE",
                fullZoneName: place.fullZoneName
            } as ASetBaseZone)
        }
    }
)(TimeDisplay)



export const RootRCC = () => <Provider store={store}>
    <>
        <h2>Time Zones</h2>
        <h3>Select places</h3>
        <PlaceSelectorRCC zones={zones} />
        <h3>Options</h3>
        <OptionsSelectorRCC />
        <h3>Results</h3>
        <TimeDisplayRCC />
        <FootNote/>
    </>
</Provider>
