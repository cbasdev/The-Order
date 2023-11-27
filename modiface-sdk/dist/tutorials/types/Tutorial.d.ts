import { Color } from 'libmfecommonlite-web';
import { MakeupLayer, EyeLinerLayer, MascaraLayer, EyeshadowLayer, BlushLayer, LipstickLayer, ConcealerLayer, FoundationLayer, DeformableCustomLayer } from 'libmfemakeuplite-web';
export declare class ReferencePoint {
    anchor: string;
    offsetUp: number;
    offsetRight: number;
    constructor(anchor?: string, offsetUp?: number, offsetRight?: number);
}
export declare class ArrowParameters {
    startPoint: ReferencePoint;
    endPoint: ReferencePoint;
    text: string;
    curveAmount: number;
    lineThickness: number;
    arrowSize: number;
    constructor(startPoint: ReferencePoint, endPoint: ReferencePoint, text?: string, curveAmount?: number, lineThickness?: number, arrowSize?: number);
}
export declare class WipeParameters {
    angle: number;
}
export declare class Step {
    makeupLayer: MakeupLayer;
    overlayColor: Color;
    /** Specifies the opacity of the animation effect. This normally ranges from 0.0 to 1.0,
        but is allowed to exceed 1.0. Default value is 1.0 if not specified.
     */
    overlayIntensity: number;
    category: string;
    animationType: string;
    lipstickLayer: (LipstickLayer | DeformableCustomLayer);
    blushLayer: (BlushLayer | DeformableCustomLayer);
    eyeLinerLayer: (EyeLinerLayer | DeformableCustomLayer);
    mascaraLayer: (MascaraLayer | DeformableCustomLayer);
    eyeShadowLayer: (EyeshadowLayer | DeformableCustomLayer);
    concealerLayer: (ConcealerLayer | DeformableCustomLayer);
    foundationLayer: (FoundationLayer | DeformableCustomLayer);
    isLeftMask: (boolean);
    arrowParameters: (ArrowParameters)[];
    wipeParameters?: WipeParameters;
}
export declare class TutorialData {
    steps: (Step)[];
}
