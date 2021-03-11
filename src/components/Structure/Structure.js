import React from 'react';
import styles from './Structure.module.scss'
import {colorTemperatureToRGB} from "../../Utils";


export class Structure extends React.Component {
    // genShells(arr) {
    //     let str = ""
    //     for (let i in arr) {
    //         let style = {
    //             backgroundColor: "rgb(" + i.color + ")",
    //             width: i.size,
    //             height: i.size,
    //             borderRadius: i.size
    //         }
    //         let head=<div style={style}><div className={styles.matterLabel}>{i.matter}</div>;
    //     }
    //
    //
    // }
    genShells(arr, index) {
        let i = arr[index];

        if (index < arr.length) {
            let shellStyle = {
                backgroundColor: "rgb(" + i.color + ")",
                width: i.size,
                height: i.size,
                borderRadius: i.size,
            }
            if(index === 0){
                shellStyle.backgroundColor = "rgb("+colorTemperatureToRGB(this.state.stage.properties.temperature)+")"
            }
            let labelStyle = {
                color: "black"
            }
            if (i.color.some((value) => value < 100)) {
                labelStyle = {color: "white"}
            }
            return <div style={shellStyle} className={styles.shell}>
                <div style={labelStyle} className={styles.matterLabel}>{i.matter}</div>
                {this.genShells(arr, index + 1)}</div>;
        } else {
            return;
        }
    }

    genStructure(stage){
        if(stage.structure===false){
            let style = {
                backgroundColor: colorTemperatureToRGB(stage.properties.temperature),
                width: stage.properties.radius,
                height: stage.properties.radius,
                borderRadius: stage.properties.radius,
            }
            return <div><div style={style} className={styles.shell}/></div>
        }else {
            return this.genShells(stage.structure, 0)
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            stage: props.stage,
        }
        console.log("PROPS: ", props)
        // console.log("State: ",this.state)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ stage: nextProps.stage });
    }

    render() {
        return (<div>{this.genStructure(this.state.stage)}</div>)
    }

}