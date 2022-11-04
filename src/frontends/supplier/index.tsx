import React from 'react';
import { getSharedData } from "../shared";

export const App = () => {
    return <h1>Supplier app {getSharedData()}</h1>
}


export const render = () => <App/>

console.log('supplier')