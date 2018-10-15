import * as moment from 'moment-timezone'
import {ISplitTimezoneName} from './stores/datatypes'

export function range(start: number, end:number){
    return new Array(end-start).fill(0).map( (n,i) => start+i)
}

export function hourInZone(hourInSrcZone: number, srcZoneOffset: number, destZoneOffset: number) {
    return (hourInSrcZone - srcZoneOffset+destZoneOffset+48) % 24
}

function splitTimeZone(timeZoneName: string) : ISplitTimezoneName {
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

export function getTimezoneList() : ISplitTimezoneName[] {
    return moment.tz.names()
        .map(splitTimeZone)
        .filter(data => data !== null && data.regionName.toUpperCase() !== "ETC")
}

export const identity = x=>x