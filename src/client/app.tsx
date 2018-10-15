import * as React from 'react' // need to import * as React rather than import React otherwise parcel renames it - which then breaks when the jsx is transformed assuming the name is React
import * as ReactDOM from 'react-dom'
import { getTimezoneList, identity } from './helpers'
import {Coordinator} from './coordinator'

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(registration => {
            console.log('SW registered: ', registration);
        }).catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
        });
    });
}

const AppRoot = () => <Coordinator />

ReactDOM.render(
    <AppRoot />,
    document.getElementById('react-mount-point')
);

console.log(getTimezoneList())