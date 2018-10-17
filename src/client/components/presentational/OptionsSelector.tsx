import { ZoneDisplayConfig } from '../../datatypes';
import * as React from 'react'
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel'

export type OptionsSelectorProps = {
    currentConfig: ZoneDisplayConfig
    onToggle24Hour: (nextValue: boolean) => void
}

export const OptionsSelector = (props: OptionsSelectorProps) =>
    <FormControlLabel control={
    <Switch checked={props.currentConfig.use24hour}
        onChange={e => props.onToggle24Hour(e.target.checked)} />}
        label="24 hour time format"/>