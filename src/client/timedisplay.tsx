import * as React from 'react'
import { ISplitTimezoneName } from './stores/datatypes'
import * as Helpers from './helpers'
import * as moment from 'moment-timezone'
import * as groupBy from 'lodash/groupBy'
import * as keys from 'lodash/keys'
import * as minBy from 'lodash/minBy'
import * as orderBy from 'lodash/orderBy'
import * as range from 'lodash/range'

interface ITimeDisplayProps {
    places: ISplitTimezoneName[]
}

function prepareColumns(data: ISplitTimezoneName[]) {
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

function computeHoursColumn(offsetMins, baseOffset) {
    // very dirty hack for now just to test table works. need to replace this with a properly formatted time
    return range(0, 24).map(hour => (48 + hour + (offsetMins - baseOffset) / 60) % 24)
}

export class TimeDisplay extends React.Component<ITimeDisplayProps> {

    private cache: { [key: number]: string[] } = {}

    computeTimeGrid = (offsetsMins: number[], baseOffset: number) => {
        const nextCache = {};
        offsetsMins.forEach(offsetMins => nextCache[offsetMins - baseOffset] = this.cache[offsetMins - baseOffset] || computeHoursColumn(offsetMins, baseOffset))
        this.cache = nextCache
        return nextCache
    }

    render() {
        const { places } = this.props
        let result;
        if (places && places.length > 0) {
            const columns = prepareColumns(places)
            const baseOffset = columns[0].offsetMins
            const hourData = this.computeTimeGrid(columns.map(col=>col.offsetMins), baseOffset)
            result = <>
                <table>
                    <thead>
                        <tr>
                            {columns.map(col => <th key={col.offsetMins + "head"}>
                                <div>Utc offset {col.offsetMins/60}</div>
                                {col.names.map(name=> <div>{name}</div>)}
                            </th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {Helpers.range(0, 24).map(hour => <tr key={"hour" + hour}>
                            {columns.map(place => <td key={place.offsetMins + "hour" + hour}>
                                {hourData[place.offsetMins-baseOffset][hour]}
                            </td>
                            )}
                        </tr>
                        )}
                    </tbody>
                </table>
            </>
        } else {
            result = <div>Please select some places</div>
        }
        return result
    }

}

