export type SplitTimezoneName = {
    placeName: string;
    regionName: string;
    fullZoneName: string;
}

export type ReactSelectWrapped<TWrapped> = {
    name: string;
    value: TWrapped;
}

export type ZoneDisplayConfig = {
    use24hour: boolean
    baseZone: string
    dateInBaseZone: string
}

export type TopLevelState = {
    selectedPlaces: ReactSelectWrapped<SplitTimezoneName>[],
    config: ZoneDisplayConfig
}

