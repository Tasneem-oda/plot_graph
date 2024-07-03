document.getElementById('generate').addEventListener('click', generateGraph);

function generateGraph() {
    const input = document.getElementById('hours').value.trim();
    const hoursArray = input.split(',').map(hour => parseFloat(hour.trim()));
    
    const canvas = document.getElementById('graph');
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.clearRect(0, 0, width, height);
    
    // Drawing axes
    ctx.beginPath();
    ctx.moveTo(50, 10);
    ctx.lineTo(50, height - 20);
    ctx.lineTo(width - 20, height - 20);
    ctx.stroke();
    
    // Plotting points
    const numDays = hoursArray.length;
    const maxHours = Math.max(...hoursArray);
    const xGap = (width - 70) / (numDays - 1);
    const yGap = (height - 30) / maxHours;
    
    ctx.fillStyle = '#007bff';
    for (let i = 0; i < numDays; i++) {
        const x = 50 + i * xGap;
        const y = height - 20 - hoursArray[i] * yGap;
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
        
        // Drawing lines
        if (i > 0) {
            const prevX = 50 + (i - 1) * xGap;
            const prevY = height - 20 - hoursArray[i - 1] * yGap;
            ctx.beginPath();
            ctx.moveTo(prevX, prevY);
            ctx.lineTo(x, y);
            ctx.stroke();
        }
        
        // Labeling x-axis
        ctx.fillText(`Day ${i + 1}`, x - 10, height - 5);
    }
    
    // Labeling y-axis
    ctx.fillText('Hours', 10, 10);
    ctx.fillText(maxHours.toString(), 10, 20);
}
