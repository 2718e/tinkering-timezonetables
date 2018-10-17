import * as React from 'react'
import { SplitTimezoneName } from '../../stores/datatypes'
import * as moment from 'moment-timezone'
import * as groupBy from 'lodash/groupBy'
import * as keys from 'lodash/keys'
import * as minBy from 'lodash/minBy'
import * as orderBy from 'lodash/orderBy'
import * as range from 'lodash/range'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'

type TimeDisplayProps = {
    places: SplitTimezoneName[]
    timeFormat: string
}

function prepareColumns(data: SplitTimezoneName[]) {
    const transformed = data.map((d, i) => {
        return {
            placeName: d.placeName,
            offsetMins: moment.tz(d.fullZoneName).utcOffset(),
            ordinal: i
        }
    })
    const groups = groupBy(transformed, d => d.offsetMins)
    const columns = orderBy(keys(groups).map(k => {
        const group = groups[k]
        return {
            names: group.map(item => item.placeName),
            offsetMins: k,
            ordinal: minBy(group, item => item.ordinal)
        }
    }), grp => grp.ordinal)
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

    render() {
        const { places } = this.props
        let result;
        if (places && places.length > 0) {
            const columns = prepareColumns(places)
            const baseOffset = columns[0].offsetMins
            const hourData = this.computeTimeGrid(columns.map(col => col.offsetMins), baseOffset)
            result = <Table>
                <TableHead>
                    <TableRow key="offsetHeaders">
                        {columns.map(col => <TableCell key={col.offsetMins + "offsethead"}>Utc offset {col.offsetMins / 60}</TableCell>)}
                    </TableRow>
                    <TableRow key="placeNameHeaders">
                        {columns.map(col => <TableCell key={col.offsetMins + "placehead"}>
                            {col.names.map(name => <div key={name} >{name}</div>)}
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

