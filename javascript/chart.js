

function line(x1,y1,x2,y2,color,width){
    let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1",x1);
    line.setAttribute("y1",y1);
    line.setAttribute("x2",x2);
    line.setAttribute("y2",y2);
    line.setAttribute("stroke",color);
    line.setAttribute("stroke-width",width);
    return line;
}
function circle(cx, cy, r, fillColor, strokeColor,strokeWidth){
    let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", cx);
    circle.setAttribute("cy", cy);
    circle.setAttribute("r", r);
    circle.setAttribute("fill", fillColor);
    circle.setAttribute("stroke", strokeColor);
    circle.setAttribute("stroke-width", strokeWidth);
    return circle;
}



function homunculus(personNumber){
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    let color = '#3a3';
    let strokeWidth = 1.7;
    svg.setAttribute("viewBox", "0 -5 24 24");
    svg.setAttribute("width", "25");
    svg.setAttribute("height", "25");
    svg.setAttribute("person-number", personNumber);
    svg.appendChild(circle(12, 6, 4, color, color, strokeWidth));
    svg.appendChild(line(12, 10, 12, 16, color, strokeWidth));
    svg.appendChild(line(8, 12, 16, 12, color, strokeWidth));
    svg.appendChild(line(12, 16, 8, 20, color, strokeWidth));
    svg.appendChild(line(12, 16, 16, 20, color, strokeWidth));
    return svg;
}




function sum (acc,item,index,arr){
    return acc+item;
}


function drawchart(canvas, data, colors , width, height)
{
    const ratio = window.devicePixelRatio;
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    
    canvas.getContext("2d").scale(ratio, ratio);
    ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let total = data.reduce (sum);
    let explodeOffset = 10;
    let radius = Math.min(width, height) / 2 - explodeOffset*2;
    let centerX = radius + explodeOffset*2;
    let centerY = radius +explodeOffset*2;
    let startAngle = -Math.PI / 2;
    for (let i = 0; i < data.length; i++) {
        if (data[i]>0)
        {
            let share_of_item = data[i] / total;
            let sliceAngle = share_of_item * 2 * Math.PI;
            let endAngle = startAngle + sliceAngle;

            // Explode the slice
            let xExplode = Math.cos(startAngle + sliceAngle / 2) * explodeOffset;
            let yExplode = Math.sin(startAngle + sliceAngle / 2) * explodeOffset;

            ctx.beginPath();
            ctx.arc(centerX + xExplode, centerY + yExplode, radius, startAngle, endAngle);
            ctx.lineTo(centerX+xExplode, centerY+yExplode);
            ctx.fillStyle = colors[i];
            ctx.fill();

            startAngle = endAngle;
        }
    }    
    canvas.style.display = "inline-flex";
}