function stopLive() {
    window.MFE_VTO.stopLiveMode().then(window.MFE_VTO.destroyLiveModule()).catch(() => {
        // ignore module does not exist error and removeChild on Node error
    });
}

async function stopPhoto() {
    await window.MFE_VTO.destroyPhotoModule();
    document.getElementById('image-upload').value = '';
}

function stopMakeupApp() {
    loading();
    if (currentMode === 'LIVE_MODE') stopLive();
    else stopPhoto();
    disableBeforeAfter();

    // Css settings
    document.getElementById('ui-interface').style.display = 'none';
    document.getElementById('rendered-canvas-container').style.display = 'none';
    loaded();
}
