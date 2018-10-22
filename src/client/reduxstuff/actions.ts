import { SplitTimezoneName, ReactSelectWrapped } from '../datatypes';

export type ASetSelectedPlaces = {
    type: "SET_SELECTED_PLACES";
    selection: ReactSelectWrapped<SplitTimezoneName>[]
}

export type ASetUse24Hour = {
    type: "SET_USE_24_HOUR",
    use24Hour: boolean
}

export type ASetBaseZone = {
    type: "SET_BASE_ZONE",
    fullZoneName: string
}