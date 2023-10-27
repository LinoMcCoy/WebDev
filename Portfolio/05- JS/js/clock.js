
function drawClock() {
    drawFace(ctx, radius);
    drawNumbers(ctx, radius);
    drawTime(ctx, radius);
}

function drawFace(ctx, radius) {
    var grad;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2*Math.PI);

    // Draw the edge circle with gradient
    const gradient = ctx.createRadialGradient(0, 0, radius/2, 0, 0, radius);
    gradient.addColorStop(0, "green");
    gradient.addColorStop(0.9, "white");
    gradient.addColorStop(1,"red");
    ctx.fillStyle = gradient;
    ctx.fill();

    // Center circle
    ctx.beginPath();
    ctx.arc(0, 0, 10, 0, 2*Math.PI);
    ctx.fillStyle = 'black';
    ctx.fill();

}

function drawNumbers(ctx, radius) {
    var ang;
    var num =1;
    for( num =1; num<=12; num++){
        ctx.font = radius*0.15 + "px arial";
        ctx.textBaseline="middle";
        ctx.fillStyle = '#333';
        ctx.textAlign="center";
        ang = num * Math.PI / 6;
        ctx.rotate(ang);
        ctx.translate(0, -radius*0.85);
        ctx.rotate(-ang);
        ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius*0.85);
        ctx.rotate(-ang);
    }
}

function drawTime(ctx, radius){
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    //hour
    hour=hour%12;
    drawHand(ctx, (hour*Math.PI/6) + (minute*Math.PI/(6*60)) + (second*Math.PI/(360*60)), radius*0.5, radius*0.07);
    //minute
    drawHand(ctx, (minute*Math.PI/30) + (second*Math.PI/(30*60)), radius*0.8, radius*0.07);
    // second
    drawHand(ctx, second*(Math.PI/30), radius*0.9, radius*0.02);
}

function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}