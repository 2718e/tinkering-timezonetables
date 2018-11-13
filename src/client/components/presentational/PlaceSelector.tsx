import Select from 'react-select'
import { NamedValue } from '../../persistence/datatypes';
import { splitTimeZone } from '../../helpers'
import * as React from 'react'

export interface PlaceSelectorProps {
  zones: string[],
  currentSelection: NamedValue<string>[],
  onSelect: (nextData: NamedValue<string>[]) => void
}

function formatLabel(name: string){
  const split = splitTimeZone(name)
  const suffix = split.regionName ? ` (${split.regionName})`: ''
  return split.placeName + suffix
}


export const PlaceSelector = (props: PlaceSelectorProps) => <Select isMulti
  value={props.currentSelection}
  isClearable={false}
  options={props.zones.map(timezone => ({
    label: formatLabel(timezone),
    value: timezone
  })
  )}
  onChange={props.onSelect} />
