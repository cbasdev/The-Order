const DEFAULT_LIPCOLOR = {
    category: 'lipcolor', color_a: 0, color_r: 255, color_g: 255, color_b: 255, intensity: 0, placement: 'default',
};
const DEFAULT_EYESHADOW = {
    category: 'eyeshadow', color_a: 0, color_r: 255, color_g: 255, color_b: 255, intensity: 0, placement: 'default',
};
const currentLookObj = {
    lipcolor: DEFAULT_LIPCOLOR,
    eyeshadow: DEFAULT_EYESHADOW,
};

let lookObjInput = {
    lipcolor: {},
    eyeshadow: {},
};
const zoomFactor = {
    extendedOuterMouth2D: 0.6,
    leftExtendedEye2D: 0.4,
    rightExtendedEye2D: 0.4,
};

const CANVAS_CONTAINER_HEIGHT_RATIO = 0.8;

let renderedCanvasWidth;
let renderedCanvasHeight;
let currentMode;
let savedCoords;
let feature;
let adjustableCoords;
let newTransform;