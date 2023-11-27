function adjustFeature(currFeature) {
    // Set global variable
    feature = currFeature;

    // Show adjustable-container
    disableBeforeAfter();
    enableAdjustPanelButtons();

    // Zoom into feature
    centerFeature(feature, zoomFactor[feature]);

    // Adjustable canvas mask
    const canv = document.createElement('canvas');
    canv.width = document.getElementById('app-container').offsetWidth;
    canv.height = document.getElementById('app-container').offsetHeight;
    canv.setAttribute('class', 'mask');
    canv.setAttribute('id', 'mask');

    const maskFeatureCSS = maskStyle(savedCoords, canv);
    Object.assign(canv.style, {
        position: 'absolute',
        ...maskFeatureCSS,
    });
    document.getElementById('adjust-container').appendChild(canv);

    // Create movable div for each coordinate
    const adjFP = adjustableCoords.facePoints;
    adjustableCoords.mouthopen = savedCoords.mouthopen;
    adjFP.innerMouth2D = savedCoords.facePoints.innerMouth2D.map(coord => coord);
    adjFP[feature] = savedCoords.facePoints[feature].map(coord => coord);
    adjFP[feature].forEach((coord, i) => {
        createCoordinateDiv(coord.x, coord.y, i);
    });

    // Directives for innerlip: automatically show
    if (savedCoords.mouthopen) document.getElementById('checkmark').style.display = 'block';
    else document.getElementById('checkmark').style.display = 'none';
    if (currFeature === 'extendedOuterMouth2D' && savedCoords.mouthopen === true) {
        adjustableCoords.mouthopen = false;
        toggleMouth();
    }
}
