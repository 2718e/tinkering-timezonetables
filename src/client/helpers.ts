import * as moment from 'moment-timezone'
import { SplitTimezoneName} from './persistence/datatypes'

export function splitTimeZone(timeZoneName: string) : SplitTimezoneName {
    const parts = timeZoneName.split('/')
    if (parts.length === 2){
        return {
            placeName: parts[1].replace('_',' '),
            regionName: parts[0],
            fullZoneName: timeZoneName
        }
    } 
    return {
        placeName: timeZoneName.replace('_',' '),
        regionName: null,
        fullZoneName: timeZoneName
    }
}

export function wotevToEmptyObject(wotev: any) { return {} }

export const DATE_FORMAT = 'YYYY-MM-DD'

export const identity = x=>x