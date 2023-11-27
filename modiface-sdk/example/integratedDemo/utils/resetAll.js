function removeMakeup() {
    currentLookObj.lipcolor = DEFAULT_LIPCOLOR;
    currentLookObj.eyeshadow = DEFAULT_EYESHADOW;
    window.MFE_VTO.lookChangeFromProduct({ mode: currentMode, lookId: 'canvas', lookObject: Object.values(currentLookObj) });
}

function resetAll() {
    removeMakeup();
    deselectCategorySwatches('lipcolor');
    deselectCategorySwatches('eyeshadow');
    document.getElementById('rendered-canvas-container').style.display = 'block';
    document.getElementById('ui-interface').style.display = 'block';
}
