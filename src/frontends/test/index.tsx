import React from 'react';
import { getSharedData } from "../shared";

export const App = () => {
    return <h1>TEST app {getSharedData()}</h1>
}


export const render = () => <App/>

console.log('test')