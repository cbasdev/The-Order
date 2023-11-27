function getbox(pointsArray) {
    let minx;
    let miny;
    let maxx;
    let maxy;
    minx = pointsArray[0].x;
    maxx = pointsArray[0].x;
    miny = pointsArray[0].y;
    maxy = pointsArray[0].y;
    for (let i = 1; i < pointsArray.length; i += 1) {
        minx = (minx < pointsArray[i].x) ? minx : pointsArray[i].x;
        miny = (miny < pointsArray[i].y) ? miny : pointsArray[i].y;
        maxx = (maxx > pointsArray[i].x) ? maxx : pointsArray[i].x;
        maxy = (maxy > pointsArray[i].y) ? maxy : pointsArray[i].y;
    }

    return [minx, miny, maxx, maxy];
}

async function centerFeature(feature, scale) {
    const canvasContainer = document.getElementById('app-container');
    const simImg = document.createElement('img');
    simImg.setAttribute('draggable', 'false');
    document.getElementById('adjust-container').appendChild(simImg);

    // Find top left point and bottom right point
    const coords = window.MFE_VTO.getOriginalCoords();

    const lipCoords = coords.facePoints[feature];
    const boxCoords = getbox(lipCoords);
    const topLeft = boxCoords.slice(0, 2);
    const bottomRight = boxCoords.slice(2, 4);

    // Centers feature
    newTransform = new TransformCoordinatesForFace(topLeft, bottomRight,
        renderedCanvasWidth, renderedCanvasHeight, canvasContainer.offsetWidth,
        canvasContainer.offsetHeight, scale);
    const centerFeatureCSS = newTransform.getCSSTransformStyle();
    const originalCanvas = await window.MFE_VTO.getPhotoOriginalCanvas();
    simImg.src = originalCanvas.toDataURL();
    Object.assign(simImg.style, {
        position: 'absolute',
        top: 0,
        left: 0,
        ...centerFeatureCSS,
    });
}
