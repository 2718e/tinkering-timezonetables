import * as React from 'react' // need to import * as React rather than import React otherwise parcel renames it - which then breaks when the jsx is transformed assuming the name is React
import ReactDOM from 'react-dom'
import {TimeDisplay} from './timedisplay'
import {ILocationWithZone} from './stores/datatypes'

// dummy data for testing will eventually want to have the user select cities.
const cities : ILocationWithZone[]= [
    {location: "Wellington", utcOffset: 13},
    {location: "London", utcOffset: 1},
    {location: "Melbourne", utcOffset: 11},
    {location: "Brisbane", utcOffset: 10},
    {location: "Brussels", utcOffset: 2},
    {location: "Berlin", utcOffset: 2},
]

const AppRoot = () => <>
    <h2>Time zone conversion tables</h2>
    <TimeDisplay places={cities}/>
</>

ReactDOM.render(
    <AppRoot />,
    document.getElementById('react-mount-point')
  );
