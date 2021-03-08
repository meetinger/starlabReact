import React from 'react';
import styles from './Structure.module.scss'


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
        console.log(i)

        console.log(index)

        if (index < arr.length) {
            let shellStyle = {
                backgroundColor: "rgb(" + i.color + ")",
                width: i.size,
                height: i.size,
                borderRadius: i.size,

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
            return "";
        }
    }

    constructor(props) {
        super(props);
    }

    render() {
        let arr = [{
            matter: "H",
            color: [255, 50, 0],
            size: "50rem"
        }, {
            matter: "He",
            color: [255, 234, 100],
            size: "5rem"
        },
            {
                matter: "C",
                color: [10, 10, 10],
                size: "3rem"
            }
        ]
        return this.genShells(arr, 0)
    }
}