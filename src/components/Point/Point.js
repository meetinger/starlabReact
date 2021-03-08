import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Point.module.scss'

// console.table(styles)

export class Point extends React.Component {
    x = 0;
    y = 0;

    constructor(props) {
        super(props);

        this.x = props.x;
        this.y = props.y;
    }

    setX(x) {
        this.x = x;
        // this.updateCoords()
    }

    setY(y) {
        this.y = y;
        // this.updateCoords()
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    incX(){
        this.x++;
    }

    incY(){
        this.y++;
    }

    updateCoords() {
        // styles.point.left = this.x+"%";
        // styles.point.top = this.y+"%";
        // render();
    }

    render() {

        return (<div className={styles.point} style={{top:this.y+"%", left:this.x+"%"}}>
        </div>);

        // return React.cloneElement(this.doRender(), {
        //     style: {top:this.y+"%", left:this.x+"%"}
        // });
    }
    getComponent(){
        return <Point x={this.getX()} y={this.getY()}/>
    }
}
