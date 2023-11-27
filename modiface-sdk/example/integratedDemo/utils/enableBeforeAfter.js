function resetSlider() {
    document.getElementById('compare-slider').style.left = '50%';
    document.getElementById('rendered-canvas-container').style.width = '50%';
    document.getElementById('orig-canvas-container').style.display = 'block';
}

function enableBeforeAfter() {
    document.getElementById('before-after-cta').src = './assets/images/before_after_active.png';
    document.getElementById('compare-slider').style.display = 'block';
    resetSlider();
}
