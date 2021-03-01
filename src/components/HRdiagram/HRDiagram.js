import React from 'react';
import ReactDOM from 'react-dom';
import styles from './HRDiagram.module.scss'

// console.table(styles)

export class HRDiagram extends React.Component {

    constructor(props) {
        super();
    }

    genList(a, b, multiplier) {
        let buf = []
        for (let i = Math.min(a, b); i <= Math.max(a, b); i *= multiplier) {
            buf.push((<li>{i}</li>))
        }
        return buf;
    }

    render() {
        console.log(11111)
        return (
            <div>
                <div className={styles.HRDiagramWrapper}>

                    <div className={styles.HRDiagram}>
                        <div className={styles.leftScale}>
                            <ul>
                                {this.genList(0.00001, 1000000, 10)}
                            </ul>
                        </div>

                        <div className={styles.bottomScale}>
                            <ul>
                                {this.genList(1000, 100000, 10)}
                            </ul>
                        </div>
                    </div>

                </div>
            </div>);
    }
}
