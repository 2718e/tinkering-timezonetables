import Select from 'react-select'
import { ISplitTimezoneName } from './stores/datatypes';
import * as React from 'react'

export interface IPlaceSelectorProps {
    zones: ISplitTimezoneName[],
    currentSelection: ISplitTimezoneName[],
    onSelect: (x: any) => void
}

export const PlaceSelector = (props: IPlaceSelectorProps) => <Select isMulti
    value={props.currentSelection}
    isClearable={false}
    options={props.zones.map(name => { return { label: name.placeName + " (" + name.regionName + ")", value: name } })}
    onChange={props.onSelect} />
