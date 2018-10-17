import * as React from 'react'
import { SplitTimezoneName } from '../../datatypes'
import * as moment from 'moment-timezone'
import * as groupBy from 'lodash/groupBy'
import * as range from 'lodash/range'
import * as keys from 'lodash/keys'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'

type TimeDisplayProps = {
    places: SplitTimezoneName[]
    baseZoneName: string
    timeFormat: string
    onClickPlace: (placeData: SplitTimezoneName) => void
}

function prepareColumns(data: SplitTimezoneName[]) {
    const augmented = data.map(d => {
        return {
            nameData: d,
            offsetMins: moment.tz(d.fullZoneName).utcOffset(),
        }
    })
    const groups = groupBy(augmented, d => d.offsetMins)
    const columns = keys(groups).map(k=> {
        return {
            offsetMins: k,
            nameDatas: groups[k]
        }
    })
    return columns
}

function computeHoursColumn(offsetMins, baseOffset, timeFormat) {
    // very dirty hack for now just to test table works. need to replace this with a properly formatted time
    return range(0, 24).map(hour => {
        const hourInTargetZone = (48 + hour + (offsetMins - baseOffset) / 60) % 24
        return moment({ h: hourInTargetZone }).format(timeFormat)
    })
}

export class TimeDisplay extends React.Component<TimeDisplayProps> {


    getTimeGridKey = (offsetMins: number, baseOffset: number) => { return offsetMins - baseOffset }

    computeTimeGrid = (offsetsMins: number[], baseOffset: number) => {
        const result = {};
        offsetsMins.forEach(offsetMins => {
            const key = this.getTimeGridKey(offsetMins, baseOffset)
            result[key] = computeHoursColumn(offsetMins, baseOffset, this.props.timeFormat)
        })
        return result
    }

    makeLinkButton = (nameData: SplitTimezoneName) => {
        return <div 
            key={nameData.placeName} 
            onClick={()=>this.props.onClickPlace(nameData)} >
            {nameData.placeName}
        </div>
    }

    render() {
        const { places } = this.props
        let result;
        if (places && places.length > 0) {
            const columns = prepareColumns(places)
            const baseOffset = moment.tz(this.props.baseZoneName).utcOffset()
            const hourData = this.computeTimeGrid(columns.map(col => col.offsetMins), baseOffset)
            result = <Table>
                <TableHead>
                    <TableRow key="offsetHeaders">
                        {columns.map(col => <TableCell key={col.offsetMins + "offsethead"}>Utc offset {col.offsetMins / 60}</TableCell>)}
                    </TableRow>
                    <TableRow key="placeNameHeaders">
                        {columns.map(col => <TableCell key={col.offsetMins + "placehead"} onClick={() => this.props.onClickPlace(col.nameDatas[0].nameData)}>
                                {col.nameDatas.map(d=> <div key={d.nameData.placeName} >{d.nameData.placeName}</div>)}
                        </TableCell>)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {range(0, 24).map(hour => <TableRow key={"hour" + hour}>
                        {columns.map(place => <TableCell key={place.offsetMins + "hour" + hour}>
                            {hourData[this.getTimeGridKey(place.offsetMins, baseOffset)][hour]}
                        </TableCell>
                        )}
                    </TableRow>
                    )}
                </TableBody>
            </Table>
        } else {
            result = <div>Please select some places</div>
        }
        return result
    }

}

