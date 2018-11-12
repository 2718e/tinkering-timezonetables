
type ValueWithTime<TValue> = {
  time: number,
  value: TValue
}

function getNow(): any {
  return Date.now()
}

/**
 * wraps and manages a javascript map object, automatically deleting stale entries periodically
 * 
 */
export class DecayingMap<TKey, TValue> {

  private map: Map<TKey, ValueWithTime<TValue>>
  private timeout: any

  constructor(private periodMillis: number) {
    this.map = new Map<TKey, ValueWithTime<TValue>>()
    this.timeout = null
  }

  clearStaleData = () => {
    const now = getNow()
    this.map.forEach( (v,k,m) => {
      if (v.time + this.periodMillis < now){
        m.delete(k)
      }
    })
    if (this.map.size > 0){
      this.timeout = setTimeout(this.clearStaleData, this.periodMillis)
    } else {
      this.timeout = null
    }
  }

  setItem = (key: TKey, val: TValue) => {
    this.map.set(key, { time: getNow(), value: val })
    if (!this.timeout){
      this.timeout = setTimeout(this.clearStaleData, this.periodMillis)
    }
  }

  getItem = (key: TKey) => {
    const item = this.map.get(key)
    if (item) {
      item.time = getNow()
      return item.value
    }
    return null
  }

}