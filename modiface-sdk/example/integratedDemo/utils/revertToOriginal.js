async function revertToOriginal() {
    const origCoords = window.MFE_VTO.getOriginalCoords();
    const ele = document.getElementsByClassName('div-dot');
    let canvasToContainer;

    // Retrieve original coords
    const origFP = origCoords.facePoints;
    const adjFP = adjustableCoords.facePoints;
    adjFP[feature] = origFP[feature].map(coord => coord);
    if (feature === 'extendedOuterMouth2D') {
        adjFP.innerMouth2D = origFP.innerMouth2D.map(coord => coord);
    }

    // Loop through all dots for reset
    for (let i = 0; i < ele.length; i += 1) {
        if (i < adjFP[feature].length) {
            const featureCoord = adjFP[feature][i];
            canvasToContainer = newTransform.transform([featureCoord.x, featureCoord.y]);
        } else {
            if (adjustableCoords.mouthopen === false) break;
            const innerlipCoord = adjFP.innerMouth2D[i - adjFP[feature].length];
            canvasToContainer = newTransform.transform([innerlipCoord.x, innerlipCoord.y]);
        }
        Object.assign(ele[i].style, {
            position: 'absolute',
            top: canvasToContainer[1],
            left: canvasToContainer[0],
        });
    }
    setMask();
}
