import React from 'react';
import styles from './Main.module.scss'
import {Navbar} from "../Navbar/Navbar";
import {HRDiagram} from "../HRdiagram/HRDiagram";
import {Structure} from "../Structure/Structure";
import {TextField} from "../TextField/TextField";
import {useRef} from "react/cjs/react.production.min";
import {colorTemperatureToRGB, getLuminosityByMassMS, getTemperatureByMassMS} from "../../Utils";

export class Main extends React.Component {
    // let
    // calculated = [
    //     {
    //         structure: [{
    //             matter: "H",
    //             color: [255, 50, 0],
    //             size: "20rem"
    //         }, {
    //             matter: "He",
    //             color: [255, 234, 100],
    //             size: "3rem"
    //         }
    //         ],
    //         properties: {
    //             luminosity: 1,
    //             temperature: 5600,
    //             stage: "Main Sequence",
    //             age: 0,
    //             radius: 1
    //         },
    //         delay: 1000
    //     },
    //     {
    //         structure: [{
    //             matter: "H",
    //             color: [255, 50, 0],
    //             size: "25rem"
    //         }, {
    //             matter: "He",
    //             color: [255, 234, 100],
    //             size: "4rem"
    //         }
    //         ],
    //         properties: {
    //             luminosity: 2,
    //             temperature: 4000,
    //             stage: "SubGiant",
    //             age: 0,
    //             radius: 2
    //         },
    //         delay: 2000
    //     },
    //     {
    //         structure: [{
    //             matter: "H",
    //             color: [255, 50, 0],
    //             size: "25rem"
    //         }, {
    //             matter: "He",
    //             color: [255, 234, 100],
    //             size: "7rem"
    //         }, {
    //             matter: "С",
    //             color: [0, 0, 0],
    //             size: "2rem"
    //         }
    //         ],
    //         properties: {
    //             luminosity: 10,
    //             temperature: 3000,
    //             stage: "RGB",
    //             age: 0,
    //             radius: 3
    //         },
    //         delay: 2000
    //     },
    // ]

    // calculated = []

    constructor(props) {
        super(props);
        // this.state.stage = this.calculated[0]
        this.state = {
            calculated: [],
            stage: {
                structure: [{
                    matter: "H",
                    color: [255, 50, 0],
                    size: "20rem"
                }],
                properties: {
                    luminosity: 0,
                    temperature: 0,
                    stage: "",
                    age: 0,
                    radius: 0
                }
            }
        }
        this.massForm = React.createRef();
        // this.start(this.calculated)
    }


    setStage(stg) {
        this.setState({
                stage: stg
            }
        )
    }

    start(arr) {
        let delay = 0;
        // for (let j = 0; j < 5; ++j) {
        for (let i of arr) {
            delay += i.delay
            setTimeout(this.setStage.bind(this), delay, i);
        }
        // }
    }

    extractTrack(arr) {
        let track = []
        console.log("TRACK", arr)
        for (let i of arr) {
            track.push({luminosity: i.properties.luminosity, temperature: i.properties.temperature})
        }
        return track
    }

    handleClickEvent() {
        console.log("CLICKED!")
        const form = this.massForm.current
        let mass = `${form['mass'].value}`
        console.log("MASS: ", mass)
        let calculatedEvo = this.calcEvolution(mass);
        console.log("Calculated:", calculatedEvo)
        this.setState({
            calculated: calculatedEvo
        })
        console.log("calculated state", this.state)
        this.start(calculatedEvo)
    }

    render() {

        return (<div className={styles.main}>
            {Navbar}
            <div className={styles.body}>
                {/*<p>{this.state.stage.properties.stage}</p>*/}
                <div className={styles.section}>
                    <HRDiagram properties={this.state.stage.properties}
                               track={this.extractTrack(this.state.calculated)}/>
                    <div className={styles.structureWrapper}>
                        {/*<div></div>*/}
                        <Structure shells={this.state.stage.structure}/>
                    </div>
                </div>
                <div>
                    <div className={styles.properties}>
                        <div style={{width: "55%"}}>

                            <div>
                                <form ref={this.massForm}>
                                    <div>
                                        <small>Mass:</small>
                                    </div>
                                    <div>
                                        <input name="mass" type="text"/>
                                        {/*<input ref={this.massField} className="input-field" type="text" placeholder="1"/>*/}
                                        {/*<TextField name="mass" placeholder="1"/>*/}
                                    </div>
                                </form>
                            </div>
                            <button onClick={this.handleClickEvent.bind(this)}>Start!</button>

                        </div>
                        <div style={{width: "45%"}}>
                            <div><b>Age: </b>{this.state.stage.properties.age}</div>
                            <div><b>Luminosity: </b>{this.state.stage.properties.luminosity}</div>
                            <div><b>Temperature: </b>{this.state.stage.properties.temperature}</div>
                            <div><b>Radius: </b>{this.state.stage.properties.radius}</div>
                            <div><b>Stage: </b>{this.state.stage.properties.stage}</div>
                        </div>
                    </div>
                    {/*<div className="text-center margin-1rem">Properties:</div>*/}
                    {/*<div className={styles.doubleInputGroup}>*/}
                    {/*    <div className={styles.inputGroup}>*/}
                    {/*        <div>*/}
                    {/*            <small className={styles.inputLabel}>Mass:</small>*/}
                    {/*        </div>*/}
                    {/*        <div>*/}
                    {/*            <input className={styles.inputField} type="text" placeholder="Mass"/>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
            </div>
        </div>)
    }


    calcEvolution(mass) {
        let calculated = []
        let mainSequenceLifeTime = Math.pow(10, 10) * Math.pow(1.0 / mass, 2.5)
        let mainSequence = []
        // for (let i = 0; i < mainSequenceLifeTime; i += mainSequenceLifeTime / 10) {
        //     let counter = i / mainSequenceLifeTime * 10
        //     mainSequence.push({
        //         structure: [{
        //             matter: "H",
        //             color: [255, 50, 0],
        //             size: 5 + counter + "rem"
        //         }, {
        //             matter: "He",
        //             color: [255, 234, 100],
        //             size: 1 + counter/2+"rem"
        //         }
        //         ],
        //         properties: {
        //             luminosity: 1+counter/10,
        //             temperature: 5600-counter*100,
        //             stage: "Main Sequence",
        //             age: i,
        //             radius: counter
        //         },
        //         delay: 1000
        //     })
        // }
        for (let i = 0.1; i < 40; i += 0.05) {
            mainSequence.push({
                structure: [
                    {
                        matter: "H",
                        color: colorTemperatureToRGB(getTemperatureByMassMS(i)),
                        size: 20 + "rem"
                    }
                ],
                properties: {
                    luminosity: getLuminosityByMassMS(i),
                    temperature: getTemperatureByMassMS(i),
                    stage: "Main Sequence",
                    age: i,
                    radius: i
                },
                delay: 1000

            })

        }
        return mainSequence
    }

}