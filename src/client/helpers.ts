import * as moment from 'moment-timezone'
import { SplitTimezoneName} from './datatypes'

function splitTimeZone(timeZoneName: string) : SplitTimezoneName {
    const parts = timeZoneName.split('/')
    if (parts.length == 2){
        return {
            placeName: parts[1].replace('_',' '),
            regionName: parts[0],
            fullZoneName: timeZoneName
        }
    }
    return null
}

export function getTimezoneList() : SplitTimezoneName[] {
    return moment.tz.names()
        .map(splitTimeZone)
        .filter(data => data !== null && data.regionName.toUpperCase() !== "ETC")
}

export function wotevToEmptyObject(wotev: any) { return {} }

export const identity = x=>x