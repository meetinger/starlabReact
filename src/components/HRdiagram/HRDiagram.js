import React from 'react';
import ReactDOM from 'react-dom';
import styles from './HRDiagram.module.scss'
import {Point} from "../Point/Point";

// console.table(styles)

export class HRDiagram extends React.Component {
    point;
    constructor(props) {
        super(props);
        this.point = new Point({x:props.x, y:props.y});
    }

    setPointX(x){
        this.point.setX(x);
    }

    setPointY(y){
        this.point.setY(y);
    }
    getPointX(){
        return this.point.getX();
    }
    getPointY(){
        return this.point.getY();
    }

    incX(){
        let x = this.getPointX();
        this.point.setX(x+1);
    }

    incY(){
        let y = this.getPointY();
        this.point.setY(y+1);
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
        this.incX()
        this.incY()
        let x = this.getPointX();
        let y = this.getPointY();
        this.setState({      point:     new Point(x, y)
        });
        console.log("X: "+this.getPointX()+" Y:" +this.getPointY())
        console.log("Comp: " +this.getComponent())
    }

    render() {
        // console.log(11111)
        // this.startTimer();
        return (
            // const
            <div>
                <div className={styles.HRDiagramWrapper}>
                    <div className={styles.HRDiagram}>
                        {this.point.getComponent()}
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
    getComponent(){
        return (<HRDiagram x = {this.getPointX()} y = {this.getPointX()} />);
    }
    getPoint(){
        return this.point;
    }
}