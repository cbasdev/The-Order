var photoResourceLoaded = true;
function displayAdjustCtas() {
    document.getElementById('adjust-cta').style.display = 'block';
    document.getElementById('adjust-collapse-cta').style.display = 'block';
    document.getElementById('adjust-left-eye-cta').style.display = 'block';
    document.getElementById('adjust-right-eye-cta').style.display = 'block';
    document.getElementById('adjust-lips-cta').style.display = 'block';
}

async function startPhoto(base64Image) {
    currentMode = 'PHOTO_MODE';
    loading();

    try {
        adjustableCoords = await window.MFE_VTO.startPhotoMode({ imgUri: base64Image });
    } catch (e) {
        document.getElementById('gif-loader').style.display = 'none';
        document.getElementById('error-screen').style.display = 'block';
        return;
    }
    const canvas = await window.MFE_VTO.setPhotoLook({ lookId: 'canvas', lookObject: Object.values(currentLookObj) });
    const originalCanvas = await window.MFE_VTO.getPhotoOriginalCanvas();

    // For adjust
    renderedCanvasHeight = canvas.renderedCanvas.height;
    renderedCanvasWidth = canvas.renderedCanvas.width;
    savedCoords = window.MFE_VTO.getOriginalCoords();

    // Css settings
    document.getElementById('rendered-canvas-container').appendChild(canvas.renderedCanvas);
    document.getElementById('orig-canvas-container').appendChild(originalCanvas);
    resetAll();
    displayAdjustCtas();

    // Set center and size of image
    const canvasContainerHeight = document.getElementById('rendered-canvas-container').offsetHeight;
    const canvasContainerWidth = document.getElementById('rendered-canvas-container').offsetWidth;
    // Image is portrait
    if (canvas.renderedCanvas.height / canvas.renderedCanvas.width
        > canvasContainerHeight / canvasContainerWidth) {
        originalCanvas.style.width = '100%';
        canvas.renderedCanvas.style.width = `${canvasContainerWidth}px`;
    } else { // Image is landscape
        canvas.renderedCanvas.style.height = '100%';
        originalCanvas.style.height = '100%';
        adjustMargin('orig-canvas-container', 'rendered-canvas-container');
    }
    loaded();
}
