import * as React from 'react'
import { ILocationWithZone } from './stores/datatypes'
import * as Helpers from '../shared/helpers'

interface ITimeDisplayProps {
    places: ILocationWithZone[]
}

export const TimeDisplay = (props: ITimeDisplayProps) => {
    let result;
    if (props.places && props.places.length > 0) {
        result = <table>
            <thead>
                <tr>
                    {props.places.map(place => <th key={place.location + "head"}>{place.location}</th>)}
                </tr>
            </thead>
            <tbody>
                {Helpers.range(0, 24).map(hour => <tr key={"hour" + hour}>
                    {props.places.map(place => <td key={place.location + "hour" + hour}>
                        {Helpers.hourInZone(hour, props.places[0].utcOffset, place.utcOffset)}
                    </td>
                    )}
                </tr>
                )}
            </tbody>
        </table>
    } else {
        result = <div>Please select some places</div>
    }
    return result
}
