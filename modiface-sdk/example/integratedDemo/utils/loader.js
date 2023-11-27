function loading() {
    document.getElementById('loading-overlay').style.display = 'block';
    document.getElementById('gif-loader').style.display = 'block';
}

function loaded() {
    document.getElementById('loading-overlay').style.display = 'none';
    document.getElementById('gif-loader').style.display = 'none';
}
