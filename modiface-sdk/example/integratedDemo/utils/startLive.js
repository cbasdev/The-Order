var liveResourceLoaded = true;
function hideAdjustCtas() {
    document.getElementById('adjust-cta').style.display = 'none';
    document.getElementById('adjust-collapse-cta').style.display = 'none';
    document.getElementById('adjust-left-eye-cta').style.display = 'none';
    document.getElementById('adjust-right-eye-cta').style.display = 'none';
    document.getElementById('adjust-lips-cta').style.display = 'none';
}

async function startLive() {
    currentMode = 'LIVE_MODE';
    loading();

    try {
        await window.MFE_VTO.startLiveMode();
    } catch (e) {
        document.getElementById('gif-loader').style.display = 'none';
        document.getElementById('error-screen').style.display = 'block';
        return;
    }

    const canvas = await window.MFE_VTO.setLiveLook({ lookId: 'canvas', lookObject: Object.values(currentLookObj) });
    const originalCanvas = await window.MFE_VTO.setLiveLook({ lookId: 'canvas-original', lookObject: [] });
    canvas.renderedCanvas.style.height = '100%';
    originalCanvas.renderedCanvas.style.height = '100%';

    // Css settings
    document.getElementById('rendered-canvas-container').appendChild(canvas.renderedCanvas);
    document.getElementById('orig-canvas-container').appendChild(originalCanvas.renderedCanvas);
    adjustMargin('orig-canvas-container', 'rendered-canvas-container');
    resetAll();
    hideAdjustCtas();
    loaded();
}
