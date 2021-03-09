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
                size: "10rem"
            }
            ],
            properties: {
                luminosity: 1,
                temperature: 100000,
                stage: "Main Sequence",
                age: 0
            },
            delay: 2000
        },
        // {
        //     structure: [{
        //         matter: "H",
        //         color: [255, 50, 0],
        //         size: "20rem"
        //     }, {
        //         matter: "He",
        //         color: [255, 234, 100],
        //         size: "15rem"
        //     }
        //     ],
        //     properties: {
        //         luminosity: 75,
        //         temperature: 20,
        //         stage: "AGB",
        //         age: 100000
        //     },
        //     delay: 2000
        // }
    ]

    constructor(props) {
        super(props);
        // this.state.stage = this.calculated[0]
        this.state = {
            stage: this.calculated[0]
        }
        this.start()

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
        for (let i of this.calculated) {
            delay+=i.delay
            setTimeout(this.setStage.bind(this), delay, i);
        }
    }

    render() {
        let arr = [{
            matter: "H",
            color: [255, 50, 0],
            size: "20rem"
        }, {
            matter: "He",
            color: [255, 234, 100],
            size: "10rem"
        },
            {
                matter: "C",
                color: [10, 10, 10],
                size: "2rem"
            }
        ]


        return (<div className={styles.main}>
            {Navbar}
            <div className={styles.body}>
                <p>{this.state.stage.properties.stage}</p>
                <div className={styles.section}>
                    <HRDiagram x={this.state.stage.properties.temperature} y={this.state.stage.properties.luminosity}/>
                    <div className={styles.structureWrapper}>
                        {/*<div></div>*/}
                        <Structure shells={this.state.stage.structure}/>
                    </div>
                </div>
                <div>
                    <div className="text-center margin-1rem">Properties:</div>
                    <div className={styles.doubleInputGroup}>
                        <div className={styles.inputGroup}>
                            <div>
                                <small className={styles.inputLabel}>Mass:</small>
                            </div>
                            <div>
                                <input className={styles.inputField} type="text" placeholder="Mass"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
    }
}