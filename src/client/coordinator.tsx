// root level component that controls the other ones. designed to be a quick and dirty implementation -
// intent is to use a state manager of some kind if and when complexity grows more.
import {PlaceSelector} from './placeselector' 
import { ISplitTimezoneName } from './stores/datatypes';
import { getTimezoneList } from './helpers'
import * as React from 'react'
import { TimeDisplay } from './timedisplay';

interface ICoordinatorProps{}

interface ICoordinatorState{
    selectedPlaces: any
}

const availablePlaces = getTimezoneList()

export class Coordinator extends React.Component<ICoordinatorProps, ICoordinatorState> {

    updatePlaces = (nextSelectedPlaces: any ) => this.setState({selectedPlaces: nextSelectedPlaces})

    constructor(props) {
        super(props);
        this.state = {selectedPlaces: []};
      }

    render(){
        return  <>
        <h2>Time zone conversion app</h2>
        <h3>Select places</h3>
        <PlaceSelector 
            currentSelection={this.state.selectedPlaces}
            zones={availablePlaces} 
            onSelect={this.updatePlaces}/>
        <h3>Times</h3>
        <TimeDisplay places={this.state.selectedPlaces.map(x=>x.value)} />
    </>
    }

}