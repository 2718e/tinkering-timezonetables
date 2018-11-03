import * as moment from 'moment-timezone'
import * as groupBy from 'lodash/groupBy'
import * as range from 'lodash/range'
import * as keys from 'lodash/keys'
import { SplitTimezoneName } from '../../datatypes'

export type ColumnInfo = {
  offset: string
  sampleZoneName: string,
  nameDatas: SplitTimezoneName[]
}

export enum RelativeDay {
  YESTERDAY,
  TODAY,
  TOMORROW
}

export type TimeWithDayDiff = {
  time: string,
  dayDiff: RelativeDay
}

export type TimeGrid = { [key: string]: TimeWithDayDiff[] }

export function prepareColumns(data: SplitTimezoneName[]): ColumnInfo[] {
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

export function getTimeGridKey(zoneName: string){ return moment.tz(zoneName).format("Z") }

//
export function computeTimeGrid(zones: string[], baseZoneName: string, timeFormat: string, atDateString: string): TimeGrid {
  const result = {};
  const baseDate = moment(atDateString)
  zones.forEach(zone => {
    const key = this.getTimeGridKey(zone)
    result[key] = computeHoursColumn(zone, baseZoneName, timeFormat, atDateString)
  })
  return result
}

function computeHoursColumn(targetZoneName: string, baseZoneName: string, timeFormat: string, atDateString: string): TimeWithDayDiff[] {
  return range(0, 24).map(hour => {
    const baseMoment = moment.tz(atDateString, baseZoneName)
    baseMoment.hour(hour)
    baseMoment.minute(0)
    const zoneMoment = baseMoment.clone().tz(targetZoneName)
    return ({
      time: zoneMoment.format(timeFormat),
      dayDiff: dayDiff(baseMoment, zoneMoment)})
  })
}

function dayDiff(baseMoment, zoneMoment) : RelativeDay {
  const baseYear = baseMoment.year()
  const zoneYear = zoneMoment.year()
  const baseDay = baseMoment.dayOfYear()
  const zoneDay = zoneMoment.dayOfYear()
  if (baseYear > zoneYear){
    return RelativeDay.YESTERDAY
  } else if (baseYear < zoneYear){
    return RelativeDay.TOMORROW
  } else if (baseDay > zoneDay) {
    return RelativeDay.YESTERDAY
  } else if (baseDay < zoneDay) {
    return RelativeDay.TOMORROW
  }
  return RelativeDay.TODAY
}