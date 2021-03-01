import React from 'react';
import ReactDOM from 'react-dom';
import styles from './HRdiagram.scss';

function genList(a, b, multiplier) {
    let buf = []
    for (let i = Math.min(a, b); i <= Math.max(a, b); i *= multiplier) {
        buf.push((<li>{i}</li>))
    }
    return buf;
}

export let HRdiagram = (
    <div>
        <div className={styles.HRDiagramWrapper}>
            <div className={styles.leftScale}>
                <ul>
                    {genList(0.00001, 1000000, 10)}
                </ul>
            </div>
            <div className={styles.HRDiagram}></div>
            <div className={styles.bottomScale}>
                <ul>
                    {genList(1000, 100000, 10)}
                </ul>
            </div>
        </div>
    </div>
)

