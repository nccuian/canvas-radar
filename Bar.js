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