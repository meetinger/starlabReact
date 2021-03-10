import React from 'react';
import styles from './Main.module.scss'
import {Navbar} from "../Navbar/Navbar";
import {HRDiagram} from "../HRdiagram/HRDiagram";
import {Structure} from "../Structure/Structure";

export class Main extends React.Component {
    let
    calculated = [
        {
            structure: [{
                matter: "H",
                color: [255, 50, 0],
                size: "20rem"
            }, {
                matter: "He",
                color: [255, 234, 100],
                size: "3rem"
            }
            ],
            properties: {
                luminosity: 1,
                temperature: 5600,
                stage: "Main Sequence",
                age: 0,
                radius: 1
            },
            delay: 1000
        },
        {
            structure: [{
                matter: "H",
                color: [255, 50, 0],
                size: "25rem"
            }, {
                matter: "He",
                color: [255, 234, 100],
                size: "4rem"
            }
            ],
            properties: {
                luminosity: 2,
                temperature: 4000,
                stage: "SubGiant",
                age: 0,
                radius: 2
            },
            delay: 2000
        },
        {
            structure: [{
                matter: "H",
                color: [255, 50, 0],
                size: "25rem"
            }, {
                matter: "He",
                color: [255, 234, 100],
                size: "7rem"
            }, {
                matter: "С",
                color: [0, 0, 0],
                size: "2rem"
            }
            ],
            properties: {
                luminosity: 10,
                temperature: 3000,
                stage: "RGB",
                age: 0,
                radius: 3
            },
            delay: 2000
        },
    ]

    constructor(props) {
        super(props);
        // this.state.stage = this.calculated[0]
        this.state = {
            stage: this.calculated[0]
        }
        this.start()
        this.massField = React.createRef()
        this.massFieldHandler = this.massFieldHandler.bind(this)
    }

    massFieldHandler(){
        alert(this.massField.value)
    }

    setStage(stg) {
        this.setState({
                stage: stg
            }
        )
        console.log("STG: ", stg)
    }

    start() {
        let delay = 0;
        for (let j = 0; j < 5; ++j) {
            for (let i of this.calculated) {
                delay += i.delay
                setTimeout(this.setStage.bind(this), delay, i);
            }
        }
    }

    extractTrack(arr) {
        let track = []
        for (let i of arr) {
            track.push({luminosity: i.properties.luminosity, temperature: i.properties.temperature})
        }
        return track
    }

    startAlert(){
        alert(this.massField.value)
    }



    render() {

        return (<div className={styles.main}>
            {Navbar}
            <div className={styles.body}>
                {/*<p>{this.state.stage.properties.stage}</p>*/}
                <div className={styles.section}>
                    <HRDiagram properties={this.state.stage.properties}
                               track={this.extractTrack(this.calculated)}/>
                    <div className={styles.structureWrapper}>
                        {/*<div></div>*/}
                        <Structure shells={this.state.stage.structure}/>
                    </div>
                </div>
                <div>
                    <div className={styles.properties}>
                        <div style={{width: "55%"}}>

                            <div className="input-group input-group-without-padding">
                                <div>
                                    <small className="input-label">Mass:</small>
                                </div>
                                <div>
                                    <input ref={this.massField} className="input-field" type="text" placeholder="1"/>
                                </div>
                            </div>
                            <button onClick={this.massFieldHandler}>Start!</button>

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


    calcEvolution(mass){
        let calculated = []
        let mainSequenceLifeTime=Math.pow(10, 10)*Math.pow(1.0/mass, 2.5)
    }

}