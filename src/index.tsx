// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement
// );
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();


import ReactDOM from 'react-dom';

// const getIndexFile = () => {
//     const environments: any = {
//         ANDI: 'index-andi',
//         SUPPLIER: 'index-supplier',
//         TEST: 'index-test',
//         HEP: 'index-hep',   
//     }

//     const buildTarget = process.env.REACT_APP_TARGET;

//     console.log(buildTarget)

//     if (buildTarget) {
//         const result = environments[buildTarget]
//         // A check to avoid typo
//         if (!result) {
//             throw new Error(`Incorrect REACT_APP_TARGET: ${buildTarget}`)
//         }

//         console.log(result)
//         return result
//     }

//     // console.log("TE", window.location.hostname);
//     // switch (window.location.hostname) {
//     //     case 'andi.project.com':
//     //         return environments.ANDI
//     //     case 'supplier.project.com':
//     //         return environments.SUPPLIER
//     //     default:
//     //         throw new Error(`Unknown host ${window.location.hostname}`)
//     // }
// }

// import(`./index/${getIndexFile()}`).then(({ render }) => {
//     ReactDOM.render(render(), document.getElementById('root'))
// })


// No need ./index folder
function importTarget(): Promise<any> {
    if (process.env.REACT_APP_TARGET === "HEP") {
      return import("./frontends/hep");
    }
    if (process.env.REACT_APP_TARGET === "SUPPLIER") {
        return import("./frontends/supplier");
    }
    if (process.env.REACT_APP_TARGET === "TEST") {
        return import("./frontends/test");
    }
    if (process.env.REACT_APP_TARGET === "ANDI") {
        return import("./frontends/andi");
    }
    return import("./frontends/andi");
  }
  
  // in dev env, both HEP app and Andi will be served with index HTML.
  // Apps will be differentiated by the env variable REACT_APP_TARGET
importTarget().then(({ render }) => {
    ReactDOM.render(render(), document.getElementById('root'))
})
