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

export type TimeGrid = { [key: string]: string[] }

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
export function computeTimeGrid(zones: string[], baseZoneName: string, timeFormat: string): TimeGrid {
  const result = {};
  zones.forEach(zone => {
    const key = this.getTimeGridKey(zone)
    result[key] = computeHoursColumn(zone, baseZoneName, timeFormat)
  })
  return result
}

function computeHoursColumn(targetZoneName, baseZoneName, timeFormat): string[] {
  return range(0, 24).map(hour => {
    return moment.tz({ h: hour }, baseZoneName).tz(targetZoneName).format(timeFormat)
  })
}