import React from 'react';
import ReactDOM from 'react-dom';
import styles from './HRDiagram.module.scss'
import {Point} from "../Point/Point";

import diagrambg from './hrdiagram.png'

// console.table(styles)

export class HRDiagram extends React.Component {

    flag = false;

    constructor(props) {
        super(props);
        this.state = {
            pointX: this.getXByTemperature(props.x),
            pointY: this.getYByLuminosity(props.y)
        }
        // this.state.pointX = props.x;
        // this.state.pointY = props.y;
        // this.setState({
        //     pointX: this.props.x,
        //     pointY: this.props.y
        // });
        console.log(this.state)
    }

    getYByLuminosity(val) {
        return 100 -
            (50 + Math.log10(val)*10)
    }


    getXByTemperature(val) {
        return 169-
            ( + Math.log10(val)*27.5)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            pointX: this.getXByTemperature(nextProps.x),
            pointY: this.getYByLuminosity(nextProps.y)
        });
    }


    genList(a, b, multiplier) {
        let buf = []
        for (let i = Math.min(a, b); i <= Math.max(a, b); i *= multiplier) {
            buf.push((<li>{i}</li>))
        }
        return buf;
    }

    // componentDidMount() {
    //     this.timerID = setInterval(
    //         () => this.tick(),
    //         500
    //     );
    // }
    //
    // componentWillUnmount() {
    //     clearInterval(this.timerID);
    // }
    //
    // tick() {
    //     if(this.flag){
    //         this.setState({
    //             pointX:65,
    //             pointY:75
    //         });
    //         this.flag=false
    //     }else{
    //         this.setState({
    //             pointX:70,
    //             pointY:20
    //         });
    //         this.flag=true;
    //     }
    //
    //     console.log("X: " + this.getPointX() + " Y:" + this.getPointY())
    //     console.log("StateX: " + this.state.x + " StateY:" + this.state.y)
    //     console.log("State:",this.state)
    //     console.log("Comp: " + this.getComponent())
    //     // render()
    // }

    render() {
        // console.log(11111)
        // this.startTimer();
        return (
            // const
            <div className={styles.HRDiagramWrapper}>
                <div>Hertzsprung–Russell Diagram</div>
                <div className={styles.HRDiagram}>
                    <div className={styles.point}
                         style={{top: this.state.pointY + "%", left: this.state.pointX + "%"}}/>
                         <div></div>
                </div>
                {/*<div>lol</div>*/}

            </div>);


    }

    getComponent() {
        return (<HRDiagram x={this.state.pointX} y={this.state.pointY}/>);
    }

    getPoint() {
        return this.point;
    }

}