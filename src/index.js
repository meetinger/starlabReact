import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {navbar} from './components/Navbar/Navbar'
import {HRDiagram} from './components/HRdiagram/HRDiagram'

// ReactDOM.render(<App />, document.getElementById('root'));
// ReactDOM.render(navbar, document.getElementById('root'));
ReactDOM.render(<HRDiagram/>, document.getElementById('root'));
