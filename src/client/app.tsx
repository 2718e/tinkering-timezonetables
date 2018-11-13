import * as React from 'react' // need to import * as React rather than import React otherwise parcel renames it - which then breaks when the jsx is transformed assuming the name is React
import * as ReactDOM from 'react-dom'
import { RootRCC } from './components/container/containercomponents'

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(registration => {
            console.log('SW registered: ', registration);
        }).catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
        });
    });
}

ReactDOM.render(
    <RootRCC />,
    document.getElementById('react-mount-point')
);
