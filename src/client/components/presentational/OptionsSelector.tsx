import { ZoneDisplayConfig } from '../../datatypes';
import * as React from 'react'
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel'
import * as moment from 'moment-timezone'
import { DATE_FORMAT } from '../../helpers'
import { SingleDatePicker } from 'react-dates'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'

export type OptionsSelectorProps = {
    currentConfig: ZoneDisplayConfig
    onToggle24Hour: (nextValue: boolean) => void
    onChangeDate: (nextValue: boolean) => void
}

type OptionsSelectorState = {
    datePickerFocused: boolean
}

export class OptionsSelector extends React.Component<OptionsSelectorProps, OptionsSelectorState>{

    constructor(props: OptionsSelectorProps){
        super(props)
        this.state = {datePickerFocused: false}
    }

    render() {
        const { onChangeDate, currentConfig, onToggle24Hour } = this.props
        const { use24hour, dateInBaseZone } = currentConfig
        return <div >
            <div key="24hr">
                <FormControlLabel labelPlacement='start' control={
                    <Switch color="primary" checked={use24hour}
                        onChange={e => onToggle24Hour(e.target.checked)} />}
                    label="24 hour time format" />
            </div>
            <div key="date">
                <FormControlLabel labelPlacement='start' control={
                    <SingleDatePicker
                        id="convertAtDateSelector"
                        numberOfMonths={1}
                        readOnly={true} small={true}
                        isOutsideRange={()=>false}
                        date={moment(dateInBaseZone, DATE_FORMAT)}
                        focused={this.state.datePickerFocused} // PropTypes.bool
                        onFocusChange={({ focused }) => this.setState({ datePickerFocused: focused })} // PropTypes.func.isRequired
                        displayFormat={DATE_FORMAT}
                        onDateChange={onChangeDate} />
                } label="Convert at date?" />
            </div>
        </div>
    }
}