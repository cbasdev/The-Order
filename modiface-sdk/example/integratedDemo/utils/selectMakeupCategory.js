function highlightCategory(category) {
    // Remove hover for category selected
    const currentBoxStyle = document.getElementById(`${category}-box`).style;
    document.getElementById(`${category}-box`).classList.remove('gray-hover');

    // Add hover for category not selected
    const otherId = (category === 'lipcolor') ? 'eyeshadow-box' : 'lipcolor-box';
    const otherBoxStyle = document.getElementById(otherId).style;
    document.getElementById(otherId).classList.add('gray-hover');

    // Toggle background/color by category selected and category not selected
    currentBoxStyle.background = 'white';
    currentBoxStyle.color = 'black';
    otherBoxStyle.background = 'black';
    otherBoxStyle.color = 'white';
}

// Swatches shown depend on category selected
function selectSwatchesDisplayed(category) {
    if (category === 'eyeshadow') {
        document.getElementById('eyeshadow-swatch-container').style.display = 'flex';
        document.getElementById('lipcolor-swatch-container').style.display = 'none';
    } else {
        document.getElementById('eyeshadow-swatch-container').style.display = 'none';
        document.getElementById('lipcolor-swatch-container').style.display = 'flex';
    }
}

// Toggles swatches and sets colors per category selected
function selectMakeupCategory(category) {
    if (category !== 'eyeshadow' && category !== 'lipcolor') console.error('selected invalid makeup category');

    highlightCategory(category);
    selectSwatchesDisplayed(category);
}
