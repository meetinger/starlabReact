import React from 'react';
import styles from './Main.module.scss'
import {Navbar} from "../Navbar/Navbar";
import {HRDiagram} from "../HRdiagram/HRDiagram";
import {Structure} from "../Structure/Structure";
import {data} from "../../db/mass1.mjs"
import {TextField} from "../TextField/TextField";
import {useRef} from "react/cjs/react.production.min";
import {
    colorTemperatureToRGB,
    convertToStarLab,
    getLuminosityByMassMS,
    getRadius,
    getTemperatureByMassMS,
    map
} from "../../Utils";

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
                    size: "10"
                }],
                properties: {
                    luminosity: 0,
                    temperature: 0,
                    stage: "",
                    age: 0,
                    radius: 0,
                    mass: 0
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
        // console.log("TRACK", arr)
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
        let calculatedEvo = this.calcEvolution(parseInt(mass));
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
                        <Structure stage={this.state.stage}/>
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
                            <div><b>Age: </b>{this.state.stage.properties.age} Myrs</div>
                            <div><b>Luminosity: </b>{this.state.stage.properties.luminosity.toFixed(2)}</div>
                            <div><b>Temperature: </b>{this.state.stage.properties.temperature.toFixed(0)}</div>
                            <div><b>Radius: </b>{this.state.stage.properties.radius.toFixed(2)}</div>
                            <div><b>Mass: </b>{this.state.stage.properties.mass.toFixed(2)}</div>
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
        let mainSequenceLifeTime = Math.pow(10, 10) * Math.pow(1.0 / mass, 2.5) / 1000000
        let mainSequence = []

        calculated = convertToStarLab(data)

        // if (mass === 1) {
        //     for (let i = 100; i < 7370; i+=30) {
        //         let tL0 = map(i, 100, 7370, 0.7, 1.3)
        //         let tT = map(i, 100, 7370, 5580, 5841)
        //         calculated.push({
        //                 structure: false,
        //                 properties: {
        //                     luminosity: tL0,
        //                     temperature: tT,
        //                     stage: "Main Sequence",
        //                     age: i,
        //                     radius: getRadius(tL0, tT),
        //                     mass: mass
        //                 },
        //                 delay: 20
        //
        //             }
        //         )
        //     }
        //
        //     for (let i = 7370; i < 10400; i+=20) {
        //         let tL0 = map(i, 7370, 10400, 1.3, 1.9)
        //         let tT = map(i, 7370,  10400, 5675, 5841)
        //         calculated.push({
        //                 structure: false,
        //                 properties: {
        //                     luminosity: tL0,
        //                     temperature: tT,
        //                     stage: "Main Sequence",
        //                     age: i,
        //                     radius: getRadius(tL0, tT),
        //                     mass: mass
        //                 },
        //                 delay: 30
        //
        //             }
        //         )
        //     }
        //
        //     for (let i = 10400; i < 11600; i+=20) {
        //         let tL0 = map(i, 10400, 11600, 1.9, 2.7)
        //         let tT = map(i, 10400,  11600, 5675, 4900)
        //         calculated.push({
        //                 structure: false,
        //                 properties: {
        //                     luminosity: tL0,
        //                     temperature: tT,
        //                     stage: "Subgiant",
        //                     age: i,
        //                     radius: getRadius(tL0, tT),
        //                     mass: mass
        //                 },
        //                 delay: 100
        //
        //             }
        //         )
        //     }
        //     for (let i = 11600; i < 12250; i+=1) {
        //         let tL0 = map(i, 11600, 12250, 2.7, 2500)
        //         let tT = map(i, 11600,  12250, 4900, 3000)
        //         calculated.push({
        //                 structure: false,
        //                 properties: {
        //                     luminosity: tL0,
        //                     temperature: tT,
        //                     stage: "Giant",
        //                     age: i,
        //                     radius: getRadius(tL0, tT),
        //                     mass: map(i, 11600,  12250, 1, 0.75)
        //                 },
        //                 delay: 100
        //
        //             }
        //         )
        //     }
        // }
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
        // for (let i = 0.1; i < 100; i += 0.1) {
        //     mainSequence.push({
        //         structure: false,
        //         properties: {
        //             luminosity: getLuminosityByMassMS(i),
        //             temperature: getTemperatureByMassMS(i),
        //             stage: "Main Sequence",
        //             age: i,
        //             radius: i,
        //             mass: i
        //         },
        //         delay: 1000
        //
        //     })
        //
        // }
        // for(let i = 0;i<=mainSequenceLifeTime;i+=mainSequenceLifeTime/50){
        //     // console.log("CALCULATING: ", i*100/mainSequenceLifeTime+"% DONE!")
        //
        //     let Ltmp = getLuminosityByMassMS(mass)
        //     let L0 = Ltmp+map(i,0,mainSequenceLifeTime, 0, Ltmp*0.4)
        //
        //     let Ttmp = getTemperatureByMassMS(mass)
        //     let T = Ttmp-map(i,0,mainSequenceLifeTime, 0, Ttmp*0.1)
        //     mainSequence.push({
        //         structure: false,
        //         properties: {
        //             luminosity: L0,
        //             temperature: T,
        //             stage: "Main Sequence",
        //             age: i,
        //             radius: getRadius(L0, T)
        //         },
        //         delay: 100
        //     })
        // }

        return calculated
    }

}