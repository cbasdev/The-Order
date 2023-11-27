function getImageUri(uploadedImaged) {
    return new Promise((resolve) => {
        // convert to base64
        const reader = new FileReader();
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.readAsDataURL(uploadedImaged);
    });
}

function triggerImageUpload() {
    document.getElementById('image-upload').click();
}

async function uploadImage(event) {
    if (event.value === '') return;
    const base64Image = await getImageUri(event.target.files[0]);
    startPhoto(base64Image);
}

// this is a workaround of the Firefox-only issue
// where the first click of the photo-upload button would not do anything
function firefoxFirstClick() {
    if (navigator.userAgent.indexOf('Firefox') > 0) {
        document.getElementById('image-upload').click();
    }
}
