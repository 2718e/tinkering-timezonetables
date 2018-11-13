import { TopLevelState } from "./datatypes";
import * as moment from 'moment-timezone'
import { DATE_FORMAT } from '../helpers'

export function migrateIfNeeded(oldState: any): TopLevelState {
  if (!oldState.hasOwnProperty('version')) {
    return getDefaultState()
  }
  return oldState; // only changed the schema once since started having migrations. So know the state is a proper one if there is no version
}

export function getDefaultState(): TopLevelState {
  return {
    version: 1,
    selectedPlaces: [],
    config: {
      use24hour: true,
      baseZone: 'Pacific/Auckland',
      dateInBaseZone: moment().format(DATE_FORMAT)
    }
  }
}