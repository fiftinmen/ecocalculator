function sum (acc,item,index,arr){
    return acc+item;
}


function drawchart(canvas, data, labels, palette)
{
    ctx = canvas.getContext('2d');
    let total = data.reduce (sum);
    let centerX = canvas.width / 2;
    let centerY = canvas.height / 2;
    let explodeOffset = 10;
    let radius = Math.min(canvas.width, canvas.height) / 2 - explodeOffset*2;
    let startAngle = -Math.PI / 2;
    
    for (let i = 0; i < data.length; i++) {
        let sliceAngle = (data[i] / total) * 2 * Math.PI;
        let endAngle = startAngle + sliceAngle;

        // Explode the slice
        let xExplode = Math.cos(startAngle + sliceAngle / 2) * explodeOffset;
        let yExplode = Math.sin(startAngle + sliceAngle / 2) * explodeOffset;

        ctx.beginPath();
        ctx.arc(centerX + xExplode, centerY + yExplode, radius, startAngle, endAngle);
        ctx.lineTo(centerX, centerY);
        ctx.fillStyle = colors[i];
        ctx.fill();

        startAngle = endAngle;
    }

    // Add legend
    for (let i = 0; i < labels.length; i++) {
        ctx.fillStyle = colors[i];
        ctx.fillRect(30, 30 + i * 20, 10, 10);
        ctx.fillText(labels[i], 50, 40 + i * 20);
      }
    

}