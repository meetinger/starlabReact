import React from 'react';
import styles from './Main.module.scss'
import {Navbar} from "../Navbar/Navbar";
import {HRDiagram} from "../HRdiagram/HRDiagram";
import {Structure} from "../Structure/Structure";

export class Main extends React.Component {
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
                <HRDiagram x={20} y={70}/>
                <div className={styles.structureWrapper}>
                    <Structure shells={arr}/>
                </div>
            </div>
        </div>)
    }
}