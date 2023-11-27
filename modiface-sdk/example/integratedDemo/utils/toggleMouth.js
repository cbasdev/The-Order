function toggleMouth() {
    if (adjustableCoords.mouthopen === true) {
        // Remove all inner lips dots
        const ele = document.getElementsByClassName('div-dot');
        adjustableCoords.facePoints.innerMouth2D.forEach(() => {
            ele[adjustableCoords.facePoints.extendedOuterMouth2D.length].remove();
        });
    } else {
        // Create inner lip dots
        adjustableCoords.facePoints.innerMouth2D.forEach((coord, i) => {
            createCoordinateDiv(coord.x, coord.y, i, 'innerMouth2D');
        });
    }
    adjustableCoords.mouthopen = !adjustableCoords.mouthopen;
    if (adjustableCoords.mouthopen) {
        document.getElementById('checkmark').style.display = 'block';
    } else {
        document.getElementById('checkmark').style.display = 'none';
    }
    // Adjust mask
    setMask();
}
