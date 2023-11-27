function maskStyle(maskCoords, mask) {
    const maskObj = drawMask({
        canvas: mask,
        imgW: renderedCanvasWidth,
        imgH: renderedCanvasHeight,
        color: 'rgba(0,0,0,0.3)',
        coordinates: maskCoords,
    });
    const newCoord = newTransform.transform([maskObj.coords[0], maskObj.coords[1]]);
    const transformMatrix = newTransform.getCanvasTransformMatrix();
    return {
        left: `${newCoord[0]}px`,
        top: `${newCoord[1]}px`,
        width: `${maskObj.coords[2] * transformMatrix[0]}px`,
        height: `${maskObj.coords[3] * transformMatrix[3]}px`,
    };
}

function setMask() {
    const canv = document.getElementById('mask');
    Object.assign(canv.style, {
        position: 'absolute',
        ...maskStyle(adjustableCoords, canv),
    });
}
