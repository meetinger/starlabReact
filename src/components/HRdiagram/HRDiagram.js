import React from 'react';
import ReactDOM from 'react-dom';
import styles from './HRDiagram.module.scss'
import {Point} from "../Point/Point";

import diagrambg from './hrdiagram.png'

// console.table(styles)

export class HRDiagram extends React.Component {

    flag = false;

    constructor(props) {
        super(props);

        if (props.track === undefined) {
            this.state = {
                temperature: props.temperature,
                luminosity: props.luminosity,
                track: []
            }
        } else {
            this.state = {
                temperature: props.temperature,
                luminosity: props.luminosity,
                track: props.track
            }
        }
    }


getYByLuminosity(val)
{
    return 100 -
        (50 + Math.log10(val) * 7)
}


getXByTemperature(val)
{
    return 100 - Math.log10(val) * 80 + 268.2
}

componentWillReceiveProps(nextProps)
{
    this.setState({
        temperature: nextProps.temperature,
        luminosity: nextProps.luminosity
    });
}


genList(a, b, multiplier)
{
    let buf = []
    for (let i = Math.min(a, b); i <= Math.max(a, b); i *= multiplier) {
        buf.push((<li>{i}</li>))
    }
    return buf;
}

getPointsDist(a, b)
{
    return Math.sqrt(Math.pow(b.temperature - a.temperature, 2) + Math.pow(b.luminosity - a.luminosity, 2))
}

genTrack(arr)
{
    let divs = []
    for (let i = 0; i < arr.length; ++i) {
        //TODO add interpolation
        divs.push(<div className={styles.track} style={{
            top: "calc(" + this.getYByLuminosity(arr[i].luminosity) + "% - 0.1rem)",
            left: "calc(" + this.getXByTemperature(arr[i].temperature) + "% - 0.1rem)"
        }}/>)
    }
    return divs;
}


render()
{
    return (
        <div className={styles.HRDiagramWrapper}>
            <div className={styles.hrheader}>Hertzsprung–Russell Diagram</div>
            <div className={styles.HRDiagram}>
                <div className={styles.point}
                     style={{
                         top: "calc(" + this.getYByLuminosity(this.state.luminosity) + "% - 0.25rem)",
                         left: "calc(" + this.getXByTemperature(this.state.temperature) + "% - 0.25rem)"
                     }}/>
                <div></div>
                {this.genTrack(this.state.track)}
            </div>
            <div className={styles.hrfooter}></div>

        </div>);
}

getComponent()
{
    return (<HRDiagram x={this.state.pointX} y={this.state.pointY}/>);
}

getPoint()
{
    return this.point;
}

}