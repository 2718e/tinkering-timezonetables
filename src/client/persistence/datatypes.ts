export type SplitTimezoneName = {
    placeName: string;
    regionName: string;
    fullZoneName: string;
}

export type NamedValue<TWrapped> = {
    name: string;
    value: TWrapped;
}

export type ZoneDisplayConfig = {
    use24hour: boolean
    baseZone: string
    dateInBaseZone: string
}

export type TopLevelState = {
    version: 1,
    selectedPlaces: NamedValue<string>[],
    config: ZoneDisplayConfig
}

