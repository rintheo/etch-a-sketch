const screen = document.querySelector('#screenContainer');
const dimChangeButton = document.querySelector('#dimChangeButton');
const clearGridButton = document.querySelector('#clearGridButton');
const defaultButton = document.querySelector('#defaultButton');
const rgbButton = document.querySelector('#rgbButton');
const progressiveButton = document.querySelector('#progressiveButton');
let dim = 16;
let mode = 'default';
let isProgressive = false;

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
    if (isProgressive) {
        if (this.style.filter === '') {
            this.style.filter = 'brightness(100%)'; 
        }
        else if (this.style.filter !== 'brightness(0%)') {
            let currentBrightness = this.style.filter.substring(this.style.filter.indexOf('(') + 1,this.style.filter.indexOf('%'));
            this.style.filter = `brightness(${currentBrightness - 10}%)`; 
        }
    }
    else {
        this.style.filter = ''; 
    }
    switch(mode) {
        case 'default':
            this.style.backgroundColor = `#646464`;
            break;
        case 'rgb':
            this.style.backgroundColor = `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`;
            break;
    }    
}

function randomColor() {
    return ~~(Math.random()*255);
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

function changeMode(e) {
    const previous = document.querySelector(`#${mode}Button`);
    previous.addEventListener('click', changeMode);
    previous.classList.remove('toggled');
    mode = this.getAttribute('data-mode');
    this.classList.add('toggled');
    this.removeEventListener('click', changeMode)
}

function toggleProgressive() {
    if (isProgressive) {
        isProgressive = false;
        this.classList.remove('toggled');
    }
    else {
        isProgressive = true;
        this.classList.add('toggled');
    }
}

dimChangeButton.addEventListener('click', changeDimension);
rgbButton.addEventListener('click', changeMode);
progressiveButton.addEventListener('click', toggleProgressive);
clearGridButton.addEventListener('click', (e) => {
    clearGrid(screen);
    createGrid(dim);
});
createGrid(dim);
