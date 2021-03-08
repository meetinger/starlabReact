import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {navbar} from './components/Navbar/Navbar'
import {HRDiagram} from './components/HRdiagram/HRDiagram'
import {Point} from "./components/Point/Point";
import {Structure} from "./components/Structure/Structure";

// ReactDOM.render(<App />, document.getElementById('root'));
// ReactDOM.render(navbar, document.getElementById('root'));
ReactDOM.render(<Structure />, document.getElementById('root'));

// console.log("X: "+element.getPointX()+" Y:" +element.getPointY())


// let element = new HRDiagram({x:10, y:10})
// ReactDOM.render(element.getComponent(), document.getElementById('root'));
// element.setPointX(30)

// ReactDOM.render(element.getComponent(), document.getElementById('root'));

// let element = <HRDiagram x={10} y={5}/>
// ReactDOM.render(element, document.getElementById('root'))
// element.incX();


