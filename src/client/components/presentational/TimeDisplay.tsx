import * as React from 'react'
import { SplitTimezoneName } from '../../datatypes'
import {ColumnInfo, TimeGrid, prepareColumns, computeTimeGrid, getTimeGridKey} from './TimeGrid'
import * as range from 'lodash/range'
import { css } from 'emotion'

type TimeDisplayProps = {
    places: SplitTimezoneName[]
    baseZoneName: string
    timeFormat: string
    onClickPlace: (placeData: SplitTimezoneName) => void
}

// styles
const cellStyle = css({padding: 4, minWidth: 64, minHeight:24})

const offsetStyle = css({
    color: 'grey'
}, cellStyle)

const headerStyle = css({
    cursor: 'pointer',
    color: 'blue',
    ':hover' : {textDecoration: 'underline'}
},cellStyle)

const hourStyle = css({},cellStyle)

const getOffsetHeaders = (columns: ColumnInfo[]) => {
    return columns.map(col => <td className={offsetStyle} key={col.offset + "offsethead"}>Utc offset {col.offset}</td>)
}

// rendering subsections
const getPlaceNameHeaders = (props: TimeDisplayProps, columns: ColumnInfo[]) => {
    return columns.map(col => <td
        className={headerStyle}
        key={col.offset + "placehead"}
        onClick={() => props.onClickPlace(col.nameDatas[0])}>
        {col.nameDatas.map(d => <div key={d.placeName} >{d.placeName}</div>)}
    </td>)
}

const makeTableBody = (hourData: TimeGrid, columns: ColumnInfo[]) => {
    return range(0, 24).map(hour => <tr key={"hour" + hour}>
        {columns.map(place => <td className={hourStyle}  key={place.offset + "hour" + hour}>
            {hourData[getTimeGridKey(place.sampleZoneName)][hour]}
        </td>
        )}
    </tr>
    )
}




export const TimeDisplay = (props: TimeDisplayProps) => {
    const { places, baseZoneName, timeFormat } = props
    let result;
    if (places && places.length > 0) {
        const columns = prepareColumns(places)
        const hourData = computeTimeGrid(columns.map(col => col.sampleZoneName), baseZoneName, timeFormat)
        const offSetHeaders = getOffsetHeaders(columns)
        const placeNameHeaders = getPlaceNameHeaders(props, columns)
        const bodyContent = makeTableBody(hourData, columns)
        result = <table>
            <thead>
                <tr key="offsetHeaders">{offSetHeaders}</tr>
                <tr key="placeNameHeaders">{placeNameHeaders}</tr>
            </thead>
            <tbody>
                {bodyContent}
            </tbody>
        </table>
    } else {
        result = <div>Please select some places</div>
    }
    return result
}


