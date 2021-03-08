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
        // console.log(i)
        //
        // console.log("GENSHELLS: ",i)

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
            return;
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            shells: props.shells,
        }
        console.log("PROPS: ", props)
        // console.log("State: ",this.state)
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
        let tmp = this.state.shells

        let tmp_size = parseInt(tmp[0].size, 10)
        if(tmp_size>15){
            tmp[0].size = (tmp_size-5)+"rem"
        }else{
            tmp[0].size = (tmp_size+5)+"rem"
        }

        this.setState({
            shells: tmp
        });
        // console.log(this.state.shells)
        // render()
    }

    render() {
        console.log("RENDER: ",this.state.shells)
        return this.genShells(this.state.shells, 0)
    }

}