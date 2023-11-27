// Turns off all swatches for selected category
function deselectCategorySwatches(category) {
    const swatchClassName = `${category}-swatch`;
    const swatches = document.getElementsByClassName(swatchClassName);
    Array.from(swatches).forEach((swatch) => {
        swatch.classList.remove('selected-border');
    });
}
