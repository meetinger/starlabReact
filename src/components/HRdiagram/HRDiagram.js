import React from 'react';
import ReactDOM from 'react-dom';
import styles from './HRDiagram.module.scss'
import {Point} from "../Point/Point";

// console.table(styles)

export class HRDiagram extends React.Component {

    flag = false;

    constructor(props) {
        super(props);
        this.state = {
            pointX: props.x,
            pointY: props.y
        }
        // this.state.pointX = props.x;
        // this.state.pointY = props.y;
        // this.setState({
        //     pointX: this.props.x,
        //     pointY: this.props.y
        // });
        console.log(this.state)
    }

    setPointX(x) {
        this.setState({
            pointX: x
        })
    }

    setPointY(y) {
        this.setState({
            pointY: y
        })
    }

    getPointX() {
        return this.state.pointX;
    }

    getPointY() {
        return this.state.pointY;
    }

    incX() {
        this.setState({
            pointX: this.state.pointX + 1
        })
    }

    incY() {
        this.setState({
            pointY: this.state.pointY + 1
        })
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
        if(this.flag){
            this.setState({
                pointX:65,
                pointY:75
            });
            this.flag=false
        }else{
            this.setState({
                pointX:70,
                pointY:20
            });
            this.flag=true;
        }

        console.log("X: " + this.getPointX() + " Y:" + this.getPointY())
        console.log("StateX: " + this.state.x + " StateY:" + this.state.y)
        console.log("State:",this.state)
        console.log("Comp: " + this.getComponent())
        // render()
    }

    render() {
        // console.log(11111)
        // this.startTimer();
        return (
            // const
            <div className={styles.HRDiagramWrapper}>
                <div className={styles.HRDiagram}>
                    <div className={styles.point}
                         style={{top: this.state.pointY + "%", left: this.state.pointX + "%"}}/>
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


            </div>);


    }

    getComponent() {
        return (<HRDiagram x={this.state.pointX} y={this.state.pointY}/>);
    }

    getPoint() {
        return this.point;
    }

}