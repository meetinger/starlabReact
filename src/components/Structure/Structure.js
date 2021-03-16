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
    divider = 1;

    constructor(props) {
        super(props);
        this.state = {
            stage: props.stage,
        }
        console.log("PROPS: ", props)
        // console.log("State: ",this.state)
    }

    genShells(arr, index) {
        let i = arr[index];

        if (index < arr.length) {
            let shellStyle = {
                backgroundColor: "rgb(" + i.color + ")",
                width: (parseFloat(i.size) / this.divider) + "rem",
                height: (parseFloat(i.size) / this.divider) + "rem",
            }
            console.log("DIVIDER:", this.divider)
            console.log("WIDTH:", shellStyle.width)
            if (index === 0) {
                shellStyle.backgroundColor = "rgb(" + colorTemperatureToRGB(this.state.stage.properties.temperature) + ")"
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

    getDivider(radius) {
        let i = 1
        while (2 * parseInt(radius) / i > 24) {
            i *= 10;
        }
        console.log("getDivider: ", i)
        return i;
    }

    genStructure(stage) {
        if (stage.structure === false) {

            this.divider = this.getDivider(stage.properties.radius)

            let style = {
                backgroundColor: "rgb(" + colorTemperatureToRGB(stage.properties.temperature) + ")",
                width: 2 * parseFloat(stage.properties.radius) / this.divider + "rem",
                height: 2 * parseFloat(stage.properties.radius) / this.divider + "rem",
                borderRadius: 2 * parseFloat(stage.properties.radius) / this.divider + "rem",
            }
            return <div>
                <div style={style} className={styles.shell}/>
            </div>
        } else {

            this.divider = this.getDivider(stage.structure[0].size)

            return this.genShells(stage.structure, 0)
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            stage: nextProps.stage,
        });
    }

    render() {
        let curStructure = this.genStructure(this.state.stage)
        if (this.divider===1) {
            return <div className={styles.structureWrapper}>
                <div>{curStructure}</div>
            </div>
        } else {
            return (
                <div>
                    <div className={styles.structureWrapper}>
                        <div>{curStructure}
                        </div>
                    </div>
                    <div style={{textAlign:"right"}}>Scale: 1/{this.divider}</div>
                </div>)
        }
    }

}