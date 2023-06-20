let dim = 16;

function createGrid(dim) {
    console.log('Ran createGrid()'); // For debugging

    const screen = document.querySelector('#screenContainer')
    const pixelTotal = dim * dim;
    const pixelDimPercentage = 100 / dim;

    for (i = 0; i < pixelTotal; i++){
        const pixel = document.createElement('div');
        pixel.classList.add('pixel');
        pixel.style.height = `${pixelDimPercentage}%`
        pixel.style.width = `${pixelDimPercentage}%`
        screen.appendChild(pixel);
        
        console.log('Ran loop'); // For debugging
    }   
}

function setupGrid() {
    const pixels = document.querySelectorAll('.pixel');
    
    pixels.forEach(pixelListener);
}

function pixelListener(pixel) {
    pixel.addEventListener('mouseenter', etch);
}

function etch(e) {
    this.classList.add('etched');
}

createGrid(dim);
setupGrid();
