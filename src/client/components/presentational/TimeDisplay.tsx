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

type ColumnInfo = {
    offset: string
    sampleZoneName: string,
    nameDatas: SplitTimezoneName[]
}


function prepareColumns(data: SplitTimezoneName[]): ColumnInfo[] {
    const augmented = data.map(d => {
        return {
            nameData: d,
            offset: moment.tz(d.fullZoneName).format("Z"),
        }
    })
    const groups = groupBy(augmented, d => d.offset)
    const columns = keys(groups).map(k => {
        const nameDatas = groups[k].map(item => item.nameData)
        return {
            offset: k,
            sampleZoneName: nameDatas[0].fullZoneName,
            nameDatas: nameDatas
        }
    })
    return columns
}

function computeHoursColumn(targetZoneName, baseZoneName, timeFormat): string[] {
    return range(0, 24).map(hour => {
        return moment.tz({ h: hour }, baseZoneName).tz(targetZoneName).format(timeFormat)
    })
}

type TimeGrid = { [key: string]: string[] }

export class TimeDisplay extends React.Component<TimeDisplayProps> {


    getTimeGridKey = (zoneName: string) => { return moment.tz(zoneName).format("Z") }

    computeTimeGrid = (zones: string[], baseZoneName: string): TimeGrid => {
        const result = {};
        zones.forEach(zone => {
            const key = this.getTimeGridKey(zone)
            result[key] = computeHoursColumn(zone, baseZoneName, this.props.timeFormat)
        })
        return result
    }

    makeLinkButton = (nameData: SplitTimezoneName) => {
        return <div
            key={nameData.placeName}
            onClick={() => this.props.onClickPlace(nameData)} >
            {nameData.placeName}
        </div>
    }

    render() {
        const { places } = this.props
        let result;
        if (places && places.length > 0) {
            const columns = prepareColumns(places)
            const hourData = this.computeTimeGrid(columns.map(col => col.sampleZoneName), this.props.baseZoneName)
            const offSetHeaders = columns.map(col => <TableCell key={col.offset + "offsethead"}>Utc offset {col.offset}</TableCell>)
            const placeNameHeaders = columns.map(col => <TableCell
                key={col.offset + "placehead"}
                onClick={() => this.props.onClickPlace(col.nameDatas[0])}>
                {col.nameDatas.map(d => <div key={d.placeName} >{d.placeName}</div>)}
            </TableCell>)
            const bodyContent = range(0, 24).map(hour => <TableRow key={"hour" + hour}>
                {columns.map(place => <TableCell key={place.offset + "hour" + hour}>
                    {hourData[this.getTimeGridKey(place.sampleZoneName)][hour]}
                </TableCell>
                )}
            </TableRow>
            )

            result = <Table>
                <TableHead >
                    <TableRow key="offsetHeaders">
                        {offSetHeaders}
                    </TableRow>
                    <TableRow key="placeNameHeaders">
                        {placeNameHeaders}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {bodyContent}
                </TableBody>
            </Table>
        } else {
            result = <div>Please select some places</div>
        }
        return result
    }

}

