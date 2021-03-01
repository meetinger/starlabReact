import React from 'react';
import ReactDOM from 'react-dom';
import styles from './HRDiagram.module.scss'
import {Point} from "../Point/Point";

// console.table(styles)

export class HRDiagram extends React.Component {
    pointX;
    pointY;

    constructor(props) {
        super(props);
        this.pointX = props.x;
        this.pointY = props.y;
    }

    setPointX(x) {
        this.pointX = x;
    }

    setPointY(y) {
        this.pointY = y;
    }

    getPointX() {
        return this.pointX;
    }

    getPointY() {
        return this.pointY;
    }

    incX() {
        this.pointX++;
    }

    incY() {
        this.pointY++;
    }


    genList(a, b, multiplier) {
        let buf = []
        for (let i = Math.min(a, b); i <= Math.max(a, b); i *= multiplier) {
            buf.push((<li>{i}</li>))
        }
        return buf;
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            500
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.incX();
        this.incY();
        this.setState({
            x:this.x,
            y:this.y
        });
        console.log("X: " + this.getPointX() + " Y:" + this.getPointY())
        console.log("Comp: " + this.getComponent())
        // render()
    }

    render() {
        // console.log(11111)
        // this.startTimer();
        return (
            // const
            <div>
                <div className={styles.HRDiagramWrapper}>
                    <div className={styles.HRDiagram}>
                        <div className={styles.point} style={{top: this.y + "%", left: this.x + "%"}}/>
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
    getComponent() {
        return (<HRDiagram x={this.getPointX()} y={this.getPointX()}/>);
    }

    getPoint() {
        return this.point;
    }

}