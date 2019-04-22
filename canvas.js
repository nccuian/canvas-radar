const canvas = document.getElementById('mycanvas');
const c = canvas.getContext('2d');
let ww, wh; //window width, window height
let center; // center point

const capNum = document.getElementsByClassName('cap-num')[0]

const setWindow = () => {
    ww = canvas.width = window.innerWidth;
    wh = canvas.height = window.innerHeight;
    center = {x: ww/2, y: wh/2};
    //將整個畫布起點移至中心點 (0,0)現在在中心點
    c.restore();
    c.translate(center.x, center.y);
}
window.addEventListener('resize', setWindow); //確保視窗更改時仍保持中心點與大小
setWindow();

//用來畫點的function
const Point = (r, deg) => {
    return {
        x: r*Math.cos(deg*(Math.PI/180)),
        y: r*Math.sin(deg*(Math.PI/180))
    } 
}
//main color of radar
const Color = (opacity) => {
    return `rgba(0,202,0,${opacity})`
}
//enemies arr
let enemies = []

class Bar {
    constructor(args) {
        let def = {
            x:0,
            y:0,
            vertical: false,
            h: 100,
            w: 100,
            v1: 1.01,
            v2: 0.99
        }
        Object.assign(def, args)
        Object.assign(this, def)
    }
    draw(x,y) {
        c.fillStyle = 'white';
        c.beginPath()
        c.fillRect(x, y, this.w, this.h)
    }
    update() {
        let x, y
        if(this.vertical) {
            x = ww/2 - this.x;
            y = -wh/2 + 50
            if(this.h>=50 && this.h<=200) {
                let ran = Math.floor(Math.random()*10)
                if(ran%2==0) {
                    this.h *= this.v1
                } else {
                    this.h *= this.v2
                }
            } else {
                if(this.h<50) {
                    this.h = 100
                } else {
                    this.h = 200
                }
            }
        } else {
            x = -ww/2+50;
            y = wh/2 - this.y
            if(this.w>=50 && this.w<=200) {
                let ran = Math.floor(Math.random()*10)
                if(ran%2==0) {
                    this.w *= this.v1
                } else {
                    this.w *= this.v2
                }
            } else {
                if(this.w<50) {
                    this.w = 100
                } else {
                    this.w = 200
                }
            }
        }
        this.draw(x,y)
    }
}
const bar1 = new Bar({
    x:-ww/2+50,
    y:50,
    h: 30
})
const bar2 = new Bar({
    x:-ww/2+50,
    y:90,
    h: 30,
    v1: 1.05,
    v2: 0.95
})
const bar3 = new Bar({
    x:-ww/2+50,
    y:130,
    h: 30,
    v1: 1.03,
    v2: 0.97
})
const v_bar1 = new Bar({
    x: 50,
    w: 30,
    vertical: true
}) 
const v_bar2 = new Bar({
    x: 90,
    w: 30,
    vertical: true,
    v1: 1.03,
    v2: 0.97
}) 
const v_bar3 = new Bar({
    x: 130,
    w: 30,
    vertical: true
}) 
const v_bar4 = new Bar({
    x: 170,
    w: 30,
    vertical: true,
    v1: 1.05,
    v2: 0.95
}) 


let cap_num = 0
let time = 0; //記錄程式時間，來做一些動畫

//globle var above^^^^^^^^^^

//draw anything 
const draw = () => {
    //refrash 
    window.requestAnimationFrame(draw);
    // c.clearRect(-ww/2, -wh/2, ww, wh)
    c.fillStyle = '#111';
    c.fillRect(-ww/2, -wh/2, ww, wh);

    //x軸, y軸
    c.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    c.lineWidth = 1;
    c.beginPath();
    c.moveTo(-ww/2, 0);
    c.lineTo(ww/2, 0);
    c.moveTo(0, -wh/2); 
    c.lineTo(0, wh/2);
    c.stroke();

    time += 1;
    //繪製雷達扇型
    const line_deg_length = 100;
    const line_r = 200;
    let line_deg = time%360;
    for(let i = 0; i < line_deg_length; i++) {
        const p1 = Point(line_r, line_deg-i)
        const p2 = Point(line_r, line_deg-i-1)
        let opacity = 1-(i/line_deg_length) // change opacity from 1 to 0
        c.fillStyle = Color(opacity) 
        c.beginPath();
        c.moveTo(0,0)
        c.lineTo(p1.x,p1.y)
        c.lineTo(p2.x,p2.y)
        c.fill()
    }

    //enemies
    if(time%50==0) {
        let enemy = {
            r: Math.random()*400,
            deg: Math.random()*360,
            opacity: 0,
            g: 0
        }
        enemies.push(enemy) //每隔一小段時間新增一個敵人
    }
    
    
    enemies.forEach((e, index) => {
        e.g+=1.3 //往中心跑
        let p = Point(e.r-e.g, e.deg) 
        // -0.9<=p.x<=0.9 && -0.9<=p.y<=0.9
        if(Math.abs(p.x)*Math.abs(p.x)+Math.abs(p.y)*Math.abs(p.y) < 1) {
            enemies.splice(index,1)
            c.save()
                c.fillStyle = 'red'
                c.beginPath()
                c.shadowColor = 'red';
                c.shadowBlur = 10;
                c.arc(0,0,8,0,Math.PI*2)
                c.fill()
            c.restore() 
            cap_num++
            capNum.innerText = cap_num
        } else {
            if(Math.abs(e.deg - line_deg <= 1)) {
                e.opacity = 1
            }
            e.opacity*=0.99
            c.fillStyle = Color(e.opacity)
            c.beginPath()
            c.arc(p.x, p.y, 6, 0, Math.PI*2)
            c.fill()

            //畫x
            c.save()
                const x_size = 8
                c.lineWidth = 4
                c.strokeStyle = Color(e.opacity)
                c.beginPath()
                c.moveTo(p.x-x_size,p.y-x_size)
                c.lineTo(p.x+x_size,p.y+x_size)
                c.moveTo(p.x-x_size,p.y+x_size)
                c.lineTo(p.x+x_size,p.y-x_size)
                c.stroke()
            c.restore()
            // 畫內圈跟外圈
            c.save()
                c.strokeStyle = Color(e.opacity)
                c.beginPath()
                c.arc(p.x,p.y,8,0,Math.PI*2)
                c.stroke()
            c.restore()
            c.save()
                c.strokeStyle = Color(e.opacity)
                c.beginPath()
                c.arc(p.x, p.y, 60*(1-e.opacity), 0, Math.PI*2)
                c.stroke()
            c.restore()
        }
    })

    //畫刻度
    const split = 120;
    let split_len = 5;
    const split_main = 15;
    c.strokeStyle = Color(1)
    for(let i = 0; i<split; i++) {
        let deg = (i/split)*360 //讓i從0-120變成0-360，畫整圈
        if(i%split_main==0) {
            c.lineWidth = 4;
            split_len = 15
        } else {
            c.lineWidth = 1;
            split_len = 5
        }
        let p1 = Point(230, deg)
        let p2 = Point(230+split_len, deg)
        c.beginPath()
        c.moveTo(p1.x,p1.y)
        c.lineTo(p2.x,p2.y)
        c.stroke()
    }
    
    const circleDraw = (r, width, func) => {
        c.strokeStyle = Color(1)
        c.lineWidth = width
        c.beginPath()
        for(let i =0; i<=360; i++) {
            let p = Point(r, i)
            if(func(i)) {
                c.lineTo(p.x,p.y)
            } else {
                c.moveTo(p.x,p.y)
            }
        }
        c.stroke()
    }
    circleDraw(300, 5, (deg) => {
        return (deg+time/3)%180 < 90
    })
    circleDraw(100, 1, (deg) => {
        return (deg+time/20)%3 < 1
    })
    circleDraw(200, 1, (deg) => {
        return true
    })

    //畫左上水平的bar
    c.fillStyle = 'white';
    c.beginPath()
    c.fillRect(-ww/2+40, wh/2-130, 5, 110)
    bar1.update()
    bar2.update()
    bar3.update()
    
    //畫右下垂直的bar
    c.strokeStyle = 'white'
    c.beginPath()
    c.strokeRect(ww/2-180, -wh/2+40, 170, 120)
    v_bar1.update()
    v_bar2.update()
    v_bar3.update()
    v_bar4.update()
}

draw()