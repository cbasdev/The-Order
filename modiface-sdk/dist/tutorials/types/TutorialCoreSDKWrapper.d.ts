import { PixelData, FacePointsInterface } from 'libmfemakeuplite-web';
import { TutorialSDKModule, WebAssemblyExports, WebAssemblyImports } from './TutorialCoreSDKModule';
import { TutorialData } from './Tutorial';
export declare type TutorialCoreSDKConstructor = (module: TutorialSDKModule) => TutorialSDKModule;
/**
 * The image handler takes in a path to an image and load the image as pixel data.
 * If grayscale is true, it should load it as a 1-channel image.
 * If false, it should load it as a RGBA image with premultiplied-alpha.
 * The parameter isBuiltInResource indicates whether this is an image that comes with the library.
 */
declare type LoadImageHandler = (path: string, isGrayscale: boolean, isBuiltInResource: boolean) => Promise<PixelData>;
declare type LoadJSONHandler = (path: string) => Promise<string>;
export default class TutorialCoreSDKWrapper {
    private module;
    private cameraArraySize;
    private cameraArrayPtr;
    private cameraArray;
    private cameraWidth;
    private cameraHeight;
    private loadImageHandler;
    private loadJSONHandler;
    private currentTutorial;
    private loadedMasks;
    private loadedJSONs;
    private emscriptenConstructor;
    /**
     * Allows overriding the Emscripten locateFile function for accessing resources.
     * Can be useful if the resources are hosted elsewhere.
     * See https://emscripten.org/docs/api_reference/module.html#Module.locateFile.
     */
    emscriptenLocateFileFunc: (path: string, prefix: string) => string;
    /**
     * Allows to provide an alternative implementation of XMLHttpRequest for platforms
     * where that doesn't exist.
     */
    requestOverride: any;
    /**
     * Overrides the handler for logging messages.
     * By default logs are printed to the console, but this can be overridden with custom
     * logging behaviour.
     */
    printOverride: (text: String) => void;
    /**
     * If enabled, this will attempt to parallelize the loading of tutorial resources. This requires
     * that LoadImageHandler and LoadJSONHandler be free of race conditions as they may be called
     * multiple times in parallel. Enabling this can help improve performance of the "setTutorialData"
     * function.
     *
     * Default value is false.
     */
    loadTutorialResourcesInParallel: boolean;
    /**
     * Overrides the instantiateWasm function in the Emscripten module.
     * This is useful for when you want to change how the WASM file gets loaded.
     */
    instantiateWasmOverride: (imports: WebAssemblyImports, successCallback: (module: WebAssembly.Module) => void) => WebAssemblyExports;
    /**
     * @param emscriptenConstructor Pass in the constructor for Core SDK Emscripten module here
     */
    constructor(emscriptenConstructor: TutorialCoreSDKConstructor);
    /**
     * Loads the rendering module
     * @param canvas The output canvas element or canvas-like object
     * @param width The width of the canvas in pixels
     * @param height The height of the canvas in pixels
     */
    load(canvas: HTMLCanvasElement, width: number, height: number): Promise<void>;
    private log;
    private allocateCameraBuffer;
    private preloadMask;
    private preloadJSON;
    private static isDeformableLayer;
    private preloadFilesForTutorial;
    /**
     * Frees the allocated data. This should be called when the module is no longer needed.
     */
    destroy(): void;
    /**
     * Sets the handler to be called when image data is needed. This must be set before calling load.
     * @param handler The image handler
     */
    setLoadImageHandler(handler: LoadImageHandler): void;
    /**
     * Sets the handler to be called when JSON data is needed. This must be set before calling load.
     * @param handler The json handler
     */
    setLoadJSONHandler(handler: LoadJSONHandler): void;
    /**
     * Sets the makeup look to apply on the after side (or main image if comparison mode is disabled).
     * @param look The look to apply
     */
    setTutorial(tutorial: TutorialData): Promise<void>;
    /**
     * Returns a copy of the look for the after side.
     */
    getTutorialData(): TutorialData;
    /**
     * Set the step index to be played.
     * Must be within number of steps in the tutorial data.
     * @param step the step index to be set
     */
    setTutorialStep(step: number): void;
    /**
     * Sets the face tracker data
     * @param facePts Face points
     * @param width Width of the input image
     * @param height Height of the input image
     * @param fbX Facebox X position
     * @param fbY Facebox Y position
     * @param fbW Facebox width
     * @param fbH Facebox height
     */
    setFaceTrackerData(facePts: FacePointsInterface, width: number, height: number, fbX: number, fbY: number, fbW: number, fbH: number): void;
    /**
     * Clears the set face tracker data (as if no face was found).
     */
    resetTrackerData(): void;
    startTutorial(): void;
    pauseTutorial(): void;
    resumeTutorial(): void;
    stopTutorial(): void;
    shouldDrawMakeup(): boolean;
    shouldDrawTutorial(): boolean;
    /**
     * Returns the progress of the animation (ranges from 0 to 1).
     */
    getProgress(): number;
    /**
     * Sets the number of times to play the animation. Negative if loop
     * forever. (default: 1)
     * @param count The number of times to play the animation
     */
    setPlayCount(count: number): void;
    /**
     * Sets the time in seconds for the animation (default: 2.0)
     * @param duration The animation duration
     */
    setStepAnimationDuration(duration: number): void;
    /**
     * Sets the time in seconds to pause for after the animation completes before
     * starting again, when looping (default: 1.0)
     * @param delay The time to pause
     */
    setDelayBeforeRepeat(delay: number): void;
    /**
     * Sets whether to show makeup after the tutorial animation is done. (default: true)
     * @param show Whether to show makeup or not
     */
    setShowMakeupWhenStepDone(show: boolean): void;
    /**
     * Sets if the input image should be drawn. (default: true)
     * @param shouldDrawOriginal Whether to draw the input image or not
     */
    setShouldDrawOriginal(shouldDrawOriginal: boolean): void;
    /**
     * Performs rendering onto the canvas
     * @param arrayBufferRGBA Input image data as RGBA pixel array
     * @param width Width of the inpout image in pixels
     * @param height Height of the input image in pixels
     */
    render(arrayBufferRGBA: Uint8Array, width: number, height: number): void;
    /**
     * Resizes the output view
     * @param width New output width in pixels
     * @param height New output height in pixels
     */
    resizeView(width: number, height: number): void;
    /**
     * Redraws with the previous frame data. If no previous frame data, this method does nothing.
     */
    redraw(): void;
}
export {};
