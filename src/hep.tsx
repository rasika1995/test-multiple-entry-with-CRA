import * as React from "react";
import * as ReactDOM from "react-dom";


// const Root: React.FunctionComponent = () => {
//   return (
//     <App />
//   );
// };

// const mountNode = document.getElementById("different-hep");

// ReactDOM.render(<Root />, mountNode);

function importTarget(): Promise<any> {
   
    return import("./frontends/hep");
  }
  
  // in dev env, both HEP app and Andi will be served with index HTML.
  // Apps will be differentiated by the env variable REACT_APP_TARGET
importTarget().then(({ render }) => {
    ReactDOM.render(render(), document.getElementById('different-hep'))
})