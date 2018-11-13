import { SplitTimezoneName, NamedValue } from '../persistence/datatypes';

export type ASetSelectedPlaces = {
    type: "SET_SELECTED_PLACES";
    selection: NamedValue<string>[]
}

export type ASetUse24Hour = {
    type: "SET_USE_24_HOUR",
    use24Hour: boolean
}

export type ASetBaseZone = {
    type: "SET_BASE_ZONE",
    fullZoneName: string
}

export type ASetBaseDate = {
    type: "SET_BASE_DATE",
    dateString: string
}