import React, { Component } from "react";
import {hot} from "react-hot-loader";
import "./canvas.css";
import logo from "../../../erecruit_logo.png";

class MyCanvas extends Component {

    constructor(props) {
        super(props);
        this.mycanvas = React.createRef();
        this.mymarquee = React.createRef();
        //this.myDraw = this.canvasDraw.bind(this);
    }

    componentDidMount() {
        const mycanvas = this.mycanvas;
        const mymarquee = this.mymarquee;
        //const ctx = mycanvas.getContext("2d")
        // const img = this.refs.image
        // img.onload = () => {
        //     ctx.drawImage(img, 0, 0)
        // ctx.font = "40px Courier"
        // ctx.fillText(this.props.text, 210, 75)
        // }

            console.log("Inside canvasDraw");
            let linear = document.getElementById("linear");
            let ctx = linear.getContext("2d");

            let lGrad = ctx.createLinearGradient(0, 0, 1285, 0);
            lGrad.addColorStop(0,"#2137ff");
            lGrad.addColorStop(1,"#e0f8ff");

            ctx.fillStyle = lGrad;
            ctx.fillRect(0,0,1285,50);
            ctx.font = "40px Courier"
            //ctx.fillText(this.mymarquee, 210,75);



    }

    // canvasDraw = (canvas) =>
    // {
    //     console.log("Inside canvasDraw");
    //     var linear = document.getElementById("linear");
    //     var con = linear.getContext("2d");
    //
    //     lGrad = con.createLinearGradient(0, 0, 1285, 0);
    //     lGrad.addColorStop(0,"#2137ff");
    //     lGrad.addColorStop(1,"#e0f8ff");
    //
    //     con.fillStyle = lGrad;
    //     con.fillRect(0,0,1285,50);
    // }

    render() {
        {this.myDraw};
        {this.canvasDraw};
        return (
            <div className="MyCanvas">
                <canvas id     = "linear"
                        height = "100"
                        width  = "1285"
                        ref ={this.mycanvas}>

                </canvas>

                <marquee behavior="scroll" direction="left">eRecruit helps you to find your dream
                    job.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    It is developed by CMPE-280 students from San Jose State
                    University.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Major recruiters around the world
                    are using our system.
                </marquee>


            </div>
        );
    }
}

export default MyCanvas;