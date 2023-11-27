function disableAdjustButtons() {
    while (document.getElementById('adjust-container').firstChild) {
        document.getElementById('adjust-container').removeChild(document.getElementById('adjust-container').firstChild);
    }
    // Remove adjustment container
    document.getElementById('adjust-container').style.display = 'none';
    document.getElementById('save-coords').style.display = 'none';
    document.getElementById('adjust-cancel').style.display = 'none';
    document.getElementById('adjust-reset').style.display = 'none';
    document.getElementById('instruction-panel').style.display = 'none';
}
