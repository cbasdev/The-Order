// Positions before/after images
function adjustMargin(id, idRendered) {
    const canvasDiv = document.getElementById(id);
    const canvas = canvasDiv.firstChild;
    const dashboard = document.getElementById('app-container');
    let leftDist = dashboard.clientHeight
        * CANVAS_CONTAINER_HEIGHT_RATIO * canvas.width / canvas.height;
    leftDist = (dashboard.clientWidth - leftDist) / 2;
    canvasDiv.querySelector('canvas').style.left = Math.round(leftDist);
    document.getElementById(idRendered).querySelector('canvas').style.left = Math.round(leftDist);
}
