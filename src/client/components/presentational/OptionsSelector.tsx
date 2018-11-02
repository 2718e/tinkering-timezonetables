import { ZoneDisplayConfig } from '../../datatypes';
import * as React from 'react'
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel'
import DatePicker from 'react-datepicker';
import * as moment from 'moment-timezone'
import {DATE_FORMAT} from '../../helpers'

import 'react-datepicker/dist/react-datepicker.css';

export type OptionsSelectorProps = {
    currentConfig: ZoneDisplayConfig
    onToggle24Hour: (nextValue: boolean) => void
    onChangeDate: (nextValue: boolean) => void
}

export const OptionsSelector = (props: OptionsSelectorProps) =>
    <div >
        <div key="24hr">
        <FormControlLabel labelPlacement='start' control={
            <Switch color="primary" checked={props.currentConfig.use24hour}
                onChange={e => props.onToggle24Hour(e.target.checked)} />}
            label="24 hour time format" />
        </div>
        <div key="date">
        <FormControlLabel labelPlacement='start' control={
            <DatePicker 
                selected={moment(props.currentConfig.dateInBaseZone, DATE_FORMAT)}
                onChange={props.onChangeDate} />
        } label="Convert at date?" />
        </div>
    </div>