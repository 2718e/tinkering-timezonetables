import Select from 'react-select'
import { SplitTimezoneName, ReactSelectWrapped } from '../../datatypes';
import * as React from 'react'

export interface PlaceSelectorProps {
    zones: SplitTimezoneName[],
    currentSelection: ReactSelectWrapped<SplitTimezoneName>[],
    onSelect: (nextData: ReactSelectWrapped<SplitTimezoneName>[]) => void
}

export const PlaceSelector = (props: PlaceSelectorProps) => <Select isMulti
    value={props.currentSelection}
    isClearable={false}
    options={props.zones.map(name => { return { label: name.placeName + " (" + name.regionName + ")", value: name } })}
    onChange={props.onSelect} />
