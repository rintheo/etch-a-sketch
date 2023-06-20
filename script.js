let dim = 16;

function createGrid(dim) {
    console.log('Ran createGrid()'); // For debugging

    const screen = document.querySelector('#screenContainer')
    const pixels = dim * dim;
    const pixelDimPercentage = 100 / dim;

    for (i = 0; i < pixels; i++){
        const pixel = document.createElement('div');
        pixel.classList.add('grid');
        pixel.style.height = `${pixelDimPercentage}%`
        pixel.style.width = `${pixelDimPercentage}%`
        screen.appendChild(pixel);
        
        console.log('Ran loop'); // For debugging
    }   
}

createGrid(dim)