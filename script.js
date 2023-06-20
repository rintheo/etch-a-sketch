let dim = 16;
const dimChange = document.querySelector('#dimChange');
const screen = document.querySelector('#screenContainer')

function createGrid(dim) {
    const pixelTotal = dim * dim;
    const pixelDimPercentage = 100 / dim;

    for (i = 0; i < pixelTotal; i++){
        const pixel = document.createElement('div');
        pixel.classList.add('pixel');
        pixel.style.height = `${pixelDimPercentage}%`
        pixel.style.width = `${pixelDimPercentage}%`
        screen.appendChild(pixel);
    }   
    setupGridEtch();
}

function clearGrid(parent) {
    while(parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function setupGridEtch() {
    const pixels = document.querySelectorAll('.pixel');
    pixels.forEach(pixelListener);
}

function pixelListener(pixel) {
    pixel.addEventListener('mouseenter', etch);
}

function etch(e) {
    this.classList.add('etched');
}

function changeDimension(e){
    while(true){
        let newDim = prompt("Input new dimension for each side (1-100):");
        if (newDim !== null) {
            newDim = parseInt(newDim);
            if (!isNaN(newDim) &
            newDim >= 1 &
            newDim <= 100) {
                dim = newDim;
                clearGrid(screen);
                createGrid(dim);
                break;
            }
            else alert('Invalid input!');
        }
        else break;
    }
}

dimChange.addEventListener('click', changeDimension);
createGrid(dim);

