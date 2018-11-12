import * as React from 'react'
import {DecayingMap} from './decayingmap'

const targetsToHandle = new DecayingMap<EventTarget,boolean>(5000)
type MouseOrTouchEvent = React.MouseEvent<any> | React.TouchEvent<any>

/**
 * utility function to set up (synthetic) event handlers on a React element such that:
 * 
 * - the given handler will be called on TouchEnd immediately (i.e. without waiting for the simulated click event and introducing poor responsiveness)
 * - the given handler will be called on a click event if no TouchEnd is received, but not be called twice if both Touchend and a simulated click are received, 
 * furthermore, this property will hold even if the handler for the touch event calls the render function (and hence this function) again 
 * -If the user swipes to scroll while touching the element instead of tapping it, the handler won't be called at all
 * 
 * Note that because of the implementation, long touches also may not be responded to
 * 
 * @param handler the callback to respond to
 */
export function tapOrClick(handler: (e: MouseOrTouchEvent) => void) {
  const handleClickIfNotIgnored = (e: React.MouseEvent<any>) => {
    const shouldHandle = targetsToHandle.getItem(e.target)
    if(shouldHandle || shouldHandle === null){
      handler(e)
    }
  }
  const handleAndSetIgnoreClick = (e: MouseOrTouchEvent) => {
    if (targetsToHandle.getItem(e.target) ) {
      handler(e)
    }
    targetsToHandle.setItem(e.target,false)
  }

  return ({
      onClick: handleClickIfNotIgnored,
      onTouchStart: (e: React.TouchEvent<any>) => targetsToHandle.setItem(e.target,true),
      onTouchMove: (e: React.TouchEvent<any>) => targetsToHandle.setItem(e.target,false),
      onTouchEnd: handleAndSetIgnoreClick
  })
}