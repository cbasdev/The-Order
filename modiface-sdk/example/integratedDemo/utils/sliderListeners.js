function touchSlide(event) {
    if (event.currentTarget === event.target) return;
    const target = event.currentTarget;

    // prevent default scroll behaviour
    event.preventDefault();

    const max = document.getElementById('app-container').clientWidth;
    const touchX = event.touches[0].clientX;
    let startX = window.getComputedStyle(target).left;
    startX = parseFloat(startX); // already in px

    const onTouchMove = (e) => {
        // prevent default scroll behaviour
        e.preventDefault();
        e.stopPropagation();

        const leftDistance = `${clamp(startX + (e.touches[0].clientX - touchX), 0, max) / max * 100}%`;
        document.getElementById('rendered-canvas-container').style.width = leftDistance;
        document.getElementById('compare-slider').style.left = leftDistance;
    };

    document.addEventListener('touchmove', onTouchMove, { passive: false });

    target.ontouchend = () => {
        document.removeEventListener('touchmove', onTouchMove);
        document.removeEventListener('touchend', target.ontouchend);
        target.ontouchend = null;
    };
    document.addEventListener('touchend', target.ontouchend);
}

function mouseSlide(event) {
    if (event.currentTarget === event.target) return;

    const target = event.currentTarget;

    const max = document.getElementById('app-container').clientWidth;
    const mouseX = event.clientX;
    let startX = window.getComputedStyle(target).left;
    startX = parseFloat(startX); // already in px

    const onMouseMove = (e) => {
        const leftDistance = `${clamp(startX + (e.clientX - mouseX), 0, max) / max * 100}%`;
        document.getElementById('rendered-canvas-container').style.width = leftDistance;
        document.getElementById('compare-slider').style.left = leftDistance;
    };

    document.addEventListener('mousemove', onMouseMove);

    target.onmouseup = () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', target.onmouseup);
        target.onmouseup = null;
    };
    document.addEventListener('mouseup', target.onmouseup);
}
