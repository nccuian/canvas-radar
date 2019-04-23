class ClockCircle {
    constructor(color) {
        this.split = 120
        this.split_len = 5
        this.split_main = 15
        this.color = color
    }

    draw() {
        c.strokeStyle = this.color
        for(let i = 0; i<this.split; i++) {
            let deg = (i/this.split)*360 //讓i從0-120變成0-360，畫整圈
            if(i%this.split_main==0) {
                c.lineWidth = 4;
                this.split_len = 15
            } else {
                c.lineWidth = 1;
                this.split_len = 5
            }
            let p1 = Point(230, deg)
            let p2 = Point(230+this.split_len, deg)
            c.beginPath()
            c.moveTo(p1.x,p1.y)
            c.lineTo(p2.x,p2.y)
            c.stroke()
        }
    }
}

// const split = 120;
// let split_len = 5;
// const split_main = 15;
// c.strokeStyle = Color(1)
// for(let i = 0; i<split; i++) {
//     let deg = (i/split)*360 //讓i從0-120變成0-360，畫整圈
//     if(i%split_main==0) {
//         c.lineWidth = 4;
//         split_len = 15
//     } else {
//         c.lineWidth = 1;
//         split_len = 5
//     }
//     let p1 = Point(230, deg)
//     let p2 = Point(230+split_len, deg)
//     c.beginPath()
//     c.moveTo(p1.x,p1.y)
//     c.lineTo(p2.x,p2.y)
//     c.stroke()
// }
