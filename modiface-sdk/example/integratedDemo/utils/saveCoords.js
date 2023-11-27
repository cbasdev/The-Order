async function saveCoords() {
    const origCoords = window.MFE_VTO.getOriginalCoords();

    savedCoords.facePoints[feature] = adjustableCoords.facePoints[feature].map(coord => coord);

    if (feature === 'extendedOuterMouth2D') {
        savedCoords.mouthopen = adjustableCoords.mouthopen;
        if (savedCoords.mouthopen === false) {
            const origFP = origCoords.facePoints;
            savedCoords.facePoints.innerMouth2D = origFP.innerMouth2D.map(coord => coord);
        } else {
            const adjFP = adjustableCoords.facePoints;
            savedCoords.facePoints.innerMouth2D = adjFP.innerMouth2D.map(coord => coord);
        }
    }

    await window.MFE_VTO.setCoordinate(savedCoords);
    disableAdjustButtons();
}
