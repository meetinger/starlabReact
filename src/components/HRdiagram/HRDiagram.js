import React from 'react';
import ReactDOM from 'react-dom';
import styles from './HRDiagram.module.scss'
import {Point} from "../Point/Point";

import diagrambg from './hrdiagram.png'
import {map} from "../../Utils";

// console.table(styles)

export class HRDiagram extends React.Component {

    flag = false;

    constructor(props) {
        super(props);

        if (props.track === undefined) {
            this.state = {
                properties: props.properties,
                track: []
            }
        } else {
            this.state = {
                properties: props.properties,
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
    return 100 - Math.log10(val) * 59.1 + 182.7
    // return map(val,1500, 500000)
}

componentWillReceiveProps(nextProps)
{
    this.setState({
        properties: nextProps.properties,
        track: nextProps.track
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
            top: "calc(" + this.getYByLuminosity(arr[i].luminosity) + "% - 0.075rem)",
            left: "calc(" + this.getXByTemperature(arr[i].temperature) + "% - 0.075rem)"
        }}/>)
    }
    // console.log("GENRTRACK ARR",arr)
    // console.log("GENRTRACK",divs)
    return divs;
}


render()
{
    return (
        <div className={styles.HRDiagramWrapper}>
            <div className={styles.hrheader}>
                <div>Hertzsprung–Russell Diagram</div>
                <div><b>Stage: </b>{this.state.properties.stage}</div>
            </div>
            <div className={styles.HRDiagram}>
                <div className={styles.point}
                     style={{
                         top: "calc(" + this.getYByLuminosity(this.state.properties.luminosity) + "% - 0.25rem)",
                         left: "calc(" + this.getXByTemperature(this.state.properties.temperature) + "% - 0.25rem)"
                     }}/>
                <div/>
                {this.genTrack(this.state.track)}
            </div>
            <div className={styles.hrfooter}/>

        </div>);
}

}