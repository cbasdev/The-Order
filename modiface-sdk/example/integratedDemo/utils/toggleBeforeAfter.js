function toggleBeforeAfter() {
    const compareSlider = document.querySelector('#compare-slider');
    const sliderStyle = window.getComputedStyle(compareSlider);
    if (sliderStyle.getPropertyValue('display') === 'none') {
        enableBeforeAfter();
    } else {
        disableBeforeAfter();
    }
}
