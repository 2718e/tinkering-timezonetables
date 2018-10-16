export type SplitTimezoneName = {
    placeName: string;
    regionName: string;
    fullZoneName: string;
}

export type ReactSelectWrapped<TWrapped> = {
    name: string;
    value: TWrapped;
}

export type TopLevelState = {
    selectedPlaces: ReactSelectWrapped<SplitTimezoneName>[]
}

