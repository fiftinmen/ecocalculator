

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
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("width", "25");
    svg.setAttribute("height", "25");
    svg.setAttribute("person-number", personNumber);
    svg.appendChild(circle(12, 6, 4, "#7b7", "#5a5", 1));
    svg.appendChild(line(12, 10, 12, 16, "#5a5", 1));
    svg.appendChild(line(8, 12, 16, 12, "#5a5", 1));
    svg.appendChild(line(12, 16, 8, 20, "#5a5", 1));
    svg.appendChild(line(12, 16, 16, 20, "#5a5", 1));
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
    //ctx.fillStyle = 'black';
    //ctx.fillRect(0, 0, canvas.width, canvas.height);
    let total = data.reduce (sum);
    let explodeOffset = 10;
    let radius = Math.min(width, height) / 2 - explodeOffset*2;
    let centerX = radius + explodeOffset*2;
    let centerY = radius +explodeOffset*2;
    let startAngle = -Math.PI / 2;
    ctx.font = "20px serif"; 
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

            /* add legend
            x = radius * 2 + explodeOffset*5;
            y = 30 + i*50;
            rect_width = 20;
            rect_height = 20;
            ctx.fillStyle = colors[i];
            ctx.fillRect(x, y, rect_width, rect_height);
            ctx.rect(x,y,rect_width, rect_height);
            
            ctx.fillStyle = 'black';
            percent_of_item = (share_of_item*100).toLocaleString('en-EN',{minimumFractionDigits:0, maximumFractionDigits:2});

            ctx.fillText(labels[i]+" - " + percent_of_item + "%", x + rect_width*1.3, y+rect_height*0.8); */
        }
    }

    
    canvas.style.display = "inline-flex";
    

}