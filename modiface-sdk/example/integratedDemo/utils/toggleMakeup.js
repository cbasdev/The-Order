function selectSwatch(category, id) {
    deselectCategorySwatches(category);
    document.getElementById(id).classList.add('selected-border');
}

function deselectSwatch(id) {
    document.getElementById(id).classList.remove('selected-border');
}

function toggleMakeup(category, color) {
    if (category !== 'eyeshadow' && category !== 'lipcolor') console.error('toggleMakeup used in invalid makeup category');

    // Selection border
    const id = `${category}-swatch-${color}`;
    if (!document.getElementById(id).classList.contains('selected-border')) {
        selectSwatch(category, id);
        currentLookObj[category] = lookObjInput[category][color];
    } else {
        deselectSwatch(id);
        currentLookObj[category] = (category === 'eyeshadow') ? DEFAULT_EYESHADOW : DEFAULT_LIPCOLOR;
    }

    // Set makeup
    window.MFE_VTO.lookChangeFromProduct({ mode: currentMode, lookId: 'canvas', lookObject: Object.values(currentLookObj) });
}
