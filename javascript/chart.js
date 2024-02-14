
function sum (acc,item,index,arr){
    return acc+item;
}


function drawchart(canvas, data, labels, colors , width, height)
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
    let radius = Math.min(width, height) / 2 - explodeOffset*4;
    let centerX = radius + explodeOffset*3;
    let centerY = radius +explodeOffset*3;
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
            console.log (xExplode, yExplode);

            ctx.beginPath();
            ctx.arc(centerX + xExplode, centerY + yExplode, radius, startAngle, endAngle);
            ctx.lineTo(centerX+xExplode*0.5, centerY+yExplode*0.5);
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