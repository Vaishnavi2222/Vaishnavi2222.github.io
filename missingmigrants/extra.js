
            // var lat_max = Math.max(...lat)
            // var lat_min = Math.min(...lat)
            // var long_max = Math.max(...long)
            // var long_min = Math.min(...long)

            // function changeCood(x,y)
            // {
            //     var position = (x - long_min) / (long_max - long_min);
            //     var position_2 = (y - lat_min) / (lat_max - lat_min);
            //     x_pos = width * position;
            //     y_pos = height * position;
            //     console.log("xpos - ypos",x_pos,y_pos);
            //     return x_pos ,y_pos
            // }

            // var points_canvas = [];
            // var i=0;

            // points.forEach(point => {
                
            //     console.log("point", point);
            //     changeCood(point.coords[0],point.coords[1])
            //     points_canvas[i] = [x_pos,y_pos];
            //     console.log("coords",points_canvas[i])
            //     i++;
            // });

            // console.log("canvas points",points_canvas)




class Point {
    constructor(origPos, destPos, velocity, a){
        this.origPos = origPos;
        this.destPos = {
            "x": points_canvas[a][0],
            "y": points_canvas[a][1]
        };
        this.velocity = velocity + this.randomRange(-0.01, 0.1); // variation
        this.currentPos = { ...origPos }; // clone object
    }
    lerp() {
        this.currentPos.x = (this.destPos.x - this.currentPos.x) * this.velocity + this.currentPos.x;
        this.currentPos.y = (this.destPos.y - this.currentPos.y) * this.velocity + this.currentPos.y;
    }
    randomRange(min, max) { 
        return Math.random() * (max - min) + min;
    } 
}

const drawDot = (ctx, pos, radius, color) => {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(pos.x, pos.y, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
}

const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");

    const orig = {"x":0,"y":0},
        dest = {"x":500,"y":400},
        velocity = 0.5;

    const myDots = [];
    for (let i=0; i<856; i++){
        myDots.push(new Point(orig, dest, velocity, i));
    }
    console.log(myDots);

    (loop = () => {
        // clear canvas each frame
        context.clearRect(0, 0, canvas.width, canvas.height);
        // draw origin dot
        drawDot(context, orig, 25, "cyan");
        // draw destination dot
        drawDot(context, dest, 25, "cyan");
        // draw animated dots
        myDots.forEach(d=>{
            drawDot(context, d.currentPos, 5, "rgba(255,0,0,0.5)");
            d.lerp();
        });
        requestAnimationFrame(loop); // complete this task before the next repaint
    })();