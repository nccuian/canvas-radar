class Axis {
    draw() {
        c.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        c.lineWidth = 1;
        c.beginPath();
        c.moveTo(-ww/2, 0);
        c.lineTo(ww/2, 0);
        c.moveTo(0, -wh/2); 
        c.lineTo(0, wh/2);
        c.stroke();
    }
}

//     c.strokeStyle = 'rgba(255, 255, 255, 0.2)';
//     c.lineWidth = 1;
//     c.beginPath();
//     c.moveTo(-ww/2, 0);
//     c.lineTo(ww/2, 0);
//     c.moveTo(0, -wh/2); 
//     c.lineTo(0, wh/2);
//     c.stroke();
