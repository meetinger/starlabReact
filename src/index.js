import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {navbar} from './components/Navbar/Navbar'
import {HRDiagram} from './components/HRdiagram/HRDiagram'

// ReactDOM.render(<App />, document.getElementById('root'));
// ReactDOM.render(navbar, document.getElementById('root'));
let element = new HRDiagram({x:10, y:10})
// console.log("X: "+element.getPointX()+" Y:" +element.getPointY())

ReactDOM.render(element.getComponent(), document.getElementById('root'));
