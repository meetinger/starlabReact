import React from 'react';
import styles from './Main.module.scss'
import {Navbar} from "../Navbar/Navbar";
import {HRDiagram} from "../HRdiagram/HRDiagram";
import {Structure} from "../Structure/Structure";

export class Main extends React.Component {
    let
    calculated = [
        {
            structure: {},
            state: {
                luminosity: 1,
                temperature: 5000,
                stage: "Main Sequence"
            },
            delay: 0
        }
    ]

    constructor(props) {
        super(props);
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
                <div className={styles.section}>
                    <HRDiagram x={50} y={50}/>
                    <div className={styles.structureWrapper}>
                        {/*<div></div>*/}
                        <Structure shells={arr}/>
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