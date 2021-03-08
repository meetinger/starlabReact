import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {navbar} from './components/Navbar/Navbar'
import {HRDiagram} from './components/HRdiagram/HRDiagram'
import {Point} from "./components/Point/Point";
import {Structure} from "./components/Structure/Structure";

let arr = [{
    matter: "H",
    color: [255, 50, 0],
    size: "50rem"
}, {
    matter: "He",
    color: [255, 234, 100],
    size: "5rem"
},
    {
        matter: "C",
        color: [10, 10, 10],
        size: "3rem"
    }
];
// let structure = new Structure(arr)
// ReactDOM.render(structure.getComponent(), document.getElementById('root'));
ReactDOM.render(<Structure shells = {arr}/>, document.getElementById('root'));
