import { ZoneDisplayConfig } from '../../datatypes';
import * as React from 'react'
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel'
import DatePicker from 'react-datepicker';
import * as moment from 'moment-timezone'
import { DATE_FORMAT } from '../../helpers'
import { css } from 'emotion'

import 'react-datepicker/dist/react-datepicker.css';

export type OptionsSelectorProps = {
    currentConfig: ZoneDisplayConfig
    onToggle24Hour: (nextValue: boolean) => void
    onChangeDate: (nextValue: boolean) => void
}

const optionsControlContainer = css({
    display: 'block'
})

const optionsControl = css({
    display: 'inline-block'
})

export const OptionsSelector = (props: OptionsSelectorProps) => <div className={optionsControlContainer}>
    <div className={optionsControl}>
        <FormControlLabel control={
            <Switch color="primary" checked={props.currentConfig.use24hour}
                onChange={e => props.onToggle24Hour(e.target.checked)} />}
            label="24 hour time format" />
    </div>
    <div className={optionsControl}>
        <div>At which date? (may affect conversions due to e.g. daylight times)</div>
        <DatePicker
            selected={moment(props.currentConfig.dateInBaseZone, DATE_FORMAT)}
            onChange={props.onChangeDate} />
    </div>
</div>