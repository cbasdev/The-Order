function containerCoordToCanvas(coordX, coordY) {
    const x = parseFloat(coordX);
    const y = parseFloat(coordY);
    const centerFeatureCoord = newTransform.inverseTransform([x, y]);
    return {
        x: centerFeatureCoord[0],
        y: centerFeatureCoord[1],
    };
}

function createCoordinateDiv(x, y, i, dotFeature = feature) {
    const ele = document.createElement('div');
    ele.setAttribute('class', 'div-dot');
    const canvasToContainerCoord = newTransform.transform([x, y]);
    Object.assign(ele.style, {
        position: 'absolute',
        top: canvasToContainerCoord[1],
        left: canvasToContainerCoord[0],
    });

    // Drag element for touch
    ele.ontouchstart = (event) => {
        const target = event.currentTarget;

        // prevent default scroll behaviour
        event.preventDefault();

        const maxX = document.getElementById('app-container').clientWidth;
        const mouseX = event.touches[0].clientX;
        let startX = window.getComputedStyle(target).left;
        startX = parseFloat(startX);
        const maxY = document.getElementById('app-container').clientHeight;
        const mouseY = event.touches[0].clientY;
        let startY = window.getComputedStyle(target).top;
        startY = parseFloat(startY);

        const onTouchMove = (e) => {
            // prevent default scroll behaviour
            e.preventDefault();
            e.stopPropagation();

            const leftDist = `${clamp(startX + (e.touches[0].clientX - mouseX), 0, maxX)}px`;
            const topDist = `${clamp(startY + (e.touches[0].clientY - mouseY), 0, maxY)}px`;
            target.style.left = leftDist;
            target.style.top = topDist;

            // adjust canvas mask
            adjustableCoords.facePoints[dotFeature][i] = {
                ...containerCoordToCanvas(leftDist, topDist),
            };
            setMask();
        };

        document.addEventListener('touchmove', onTouchMove, { passive: false });

        target.ontouchend = () => {
            document.removeEventListener('touchmove', onTouchMove);
            document.removeEventListener('touchend', target.ontouchend);
            target.ontouchend = null;
        };
        document.addEventListener('touchend', target.ontouchend);
    };

    // Drag element for mouse
    ele.onmousedown = (event) => {
        const target = event.currentTarget;

        const maxX = document.getElementById('app-container').clientWidth;
        const mouseX = event.clientX;
        let startX = window.getComputedStyle(target).left;
        startX = parseFloat(startX);
        const maxY = document.getElementById('app-container').clientHeight;
        const mouseY = event.clientY;
        let startY = window.getComputedStyle(target).top;
        startY = parseFloat(startY);

        const onMouseMove = (e) => {
            const leftDist = `${clamp(startX + (e.clientX - mouseX), 0, maxX)}px`;
            const topDist = `${clamp(startY + (e.clientY - mouseY), 0, maxY)}px`;
            target.style.left = leftDist;
            target.style.top = topDist;

            // adjust canvas mask
            adjustableCoords.facePoints[dotFeature][i] = {
                ...containerCoordToCanvas(leftDist, topDist),
            };
            setMask();
        };

        document.addEventListener('mousemove', onMouseMove);

        target.onmouseup = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', target.onmouseup);
            target.onmouseup = null;
        };
        document.addEventListener('mouseup', target.onmouseup);
    };
    document.getElementById('adjust-container').appendChild(ele);
}
