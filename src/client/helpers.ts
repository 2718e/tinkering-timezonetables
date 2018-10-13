export function range(start: number, end:number){
    return new Array(end-start).fill(0).map( (n,i) => start+i)
}

export function hourInZone(hourInSrcZone: number, srcZoneOffset: number, destZoneOffset: number) {
    return (hourInSrcZone - srcZoneOffset+destZoneOffset+48) % 24
}