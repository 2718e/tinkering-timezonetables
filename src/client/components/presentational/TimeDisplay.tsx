import * as React from 'react'
import { SplitTimezoneName } from '../../persistence/datatypes'
import { ColumnInfo, TimeGrid, prepareColumns, computeTimeGrid, getTimeGridKey, RelativeDay } from './TimeGrid'
import * as range from 'lodash/range'
import { css } from 'emotion'
import { DATE_FORMAT } from '../../helpers'
import * as moment from 'moment-timezone'
import { tapOrClick } from '../../taporclick'

type TimeDisplayProps = {
    zones: string[]
    baseZoneName: string
    dateStringBaseZone: string
    timeFormat: string
    onClickPlace: (placeData: SplitTimezoneName) => void
}

// styles
const cellStyle = css({ padding: 4, minWidth: 64, minHeight: 24 })
const tableStyle = css({ fontSize: 12, fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif` })

const offsetStyle = css({
    color: 'grey'
}, cellStyle)

const headerStyle = css({
    cursor: 'pointer',
    color: 'blue',
    ':hover': { textDecoration: 'underline' }
}, cellStyle)

let hourStyles = {}

hourStyles[RelativeDay.YESTERDAY] = css({ backgroundColor: 'lightblue' }, cellStyle)
hourStyles[RelativeDay.TODAY] = cellStyle
hourStyles[RelativeDay.TOMORROW] = css({ backgroundColor: 'orange' }, cellStyle)

const getOffsetHeaders = (columns: ColumnInfo[]) => {
    return columns.map(col => <td className={offsetStyle} key={col.offset + "offsethead"}>Utc offset {col.offset}</td>)
}

// rendering subsections
const getPlaceNameHeaders = (props: TimeDisplayProps, columns: ColumnInfo[]) => {
    return columns.map(col => <td
        className={headerStyle}
        key={col.offset + "placehead"}
        {...tapOrClick(() => props.onClickPlace(col.nameDatas[0]))}>
        {col.nameDatas.map(d => <div key={d.placeName} >{d.placeName}</div>)}
    </td>)
}

const makeTableBody = (hourData: TimeGrid, columns: ColumnInfo[]) => {
    return range(0, 24).map(hour => <tr key={"hour" + hour}>
        {columns.map(place => {
            const hourDatum = hourData[getTimeGridKey(place.sampleZoneName)][hour]
            const cssClass = hourStyles[hourDatum.dayDiff]
            return <td className={cssClass} key={place.offset + "hour" + hour} >
                {hourDatum.time}
            </td>
        })}
    </tr>
    )
}


type ColorKeyProps = { dateStringBaseZone: string }
export const ColorKey = (props: ColorKeyProps) => {
    const yesterday = moment(props.dateStringBaseZone).add(-1, 'days').format(DATE_FORMAT)
    const tommorow = moment(props.dateStringBaseZone).add(1, 'days').format(DATE_FORMAT)
    return <div key="colorcodes">
        <table key="colorcode" className={tableStyle}>
            <tbody>
                <tr>
                    <td>Previous Day ({yesterday}): </td>
                    <td className={hourStyles[RelativeDay.YESTERDAY]}></td>
                </tr>
                <tr>
                    <td>Next Day ({tommorow}): </td>
                    <td className={hourStyles[RelativeDay.TOMORROW]}></td>
                </tr>
            </tbody>
        </table>
    </div>
}
// main render function
export const TimeDisplay = (props: TimeDisplayProps) => {
    const { zones, baseZoneName, timeFormat, dateStringBaseZone } = props
    let result;
    if (zones && zones.length > 0) {
        const columns = prepareColumns(zones)
        const hourData = computeTimeGrid(columns.map(col => col.sampleZoneName), baseZoneName, timeFormat, dateStringBaseZone)
        const offSetHeaders = getOffsetHeaders(columns)
        const placeNameHeaders = getPlaceNameHeaders(props, columns)
        const bodyContent = makeTableBody(hourData, columns)
        result = <>
            <table key="results" className={tableStyle}>
                <thead>
                    <tr key="offsetHeaders">{offSetHeaders}</tr>
                    <tr key="placeNameHeaders">{placeNameHeaders}</tr>
                </thead>
                <tbody>
                    {bodyContent}
                </tbody>
            </table>
            <ColorKey dateStringBaseZone={dateStringBaseZone} />
        </>
    } else {
        result = <div>Please select some places</div>
    }
    return result
}
