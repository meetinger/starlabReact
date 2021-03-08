import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Main} from "./components/Main/Main";

// let arr = [{
//     matter: "H",
//     color: [255, 50, 0],
//     size: "50rem"
// }, {
//     matter: "He",
//     color: [255, 234, 100],
//     size: "5rem"
// },
//     {
//         matter: "C",
//         color: [10, 10, 10],
//         size: "3rem"
//     }
// ];

// let structure = <Structure shells = {arr}/>
//
// ReactDOM.render(structure, document.getElementById('root'));
//
// arr[0].size = "20rem"
//
// structure = <Structure shells = {arr}/>

ReactDOM.render(<Main />, document.getElementById('root'));