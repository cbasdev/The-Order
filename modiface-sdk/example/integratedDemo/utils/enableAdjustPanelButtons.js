function displayAdjustText(lips, leftEye, rightEye, text) {
    document.getElementById('mouth-open-chk').style.display = lips;
    document.getElementById('left-adjust-image').style.display = leftEye;
    document.getElementById('right-adjust-image').style.display = rightEye;
    document.getElementById('feature-text').innerHTML = text;
}

function enableAdjustPanelButtons() {
    document.getElementById('adjust-container').style.display = 'block';
    document.getElementById('save-coords').style.display = 'block';
    document.getElementById('adjust-cancel').style.display = 'block';
    document.getElementById('adjust-reset').style.display = 'block';
    document.getElementById('instruction-panel').style.display = 'block';
    if (feature === 'extendedOuterMouth2D') {
        displayAdjustText('block', 'none', 'none', 'lips');
    } else if (feature === 'leftExtendedEye2D') {
        displayAdjustText('none', 'block', 'none', 'left eye');
    } else displayAdjustText('none', 'none', 'block', 'right eye');
}
