class TransformCoordinates {
    /**
     * Let C1 denotes the coordinate system of the original image and
     *     C2 denotes the coordinate system of the container
     */


    /** ******** public functions ********* */

    /**
     * constructor.
     * @param {Array<number>} srcTopLeft: top-left point(in format [x, y]) on C1
     * @param {Array<number>} srcBottomRight: bottom-right point(in format [x, y]) on C1
     * @param {number} containerWidth: width of the rectangle on C2
     * @param {number} containerHeight: height of the rectangle on C2
     * @param {number} expectedRatio: the expected ratio on C2
     */
    constructor(srcTopLeft, srcBottomRight, containerWidth, containerHeight, expectedRatio) {
        const srcWidth = this.getX(srcBottomRight) - this.getX(srcTopLeft);
        const srcHeight = this.getY(srcBottomRight) - this.getY(srcTopLeft);

        this.scale = Math.min(containerWidth / srcWidth, containerHeight / srcHeight)
            * expectedRatio;
        this.xTranslation = -1 * ((this.getX(srcTopLeft) * this.scale)
            + (srcWidth / 2 * this.scale) - (containerWidth / 2));
        this.yTranslation = -1 * ((this.getY(srcTopLeft) * this.scale)
            + (srcHeight / 2 * this.scale) - (containerHeight / 2));

        this.transformMatrix = math.multiply(math.multiply(
            this.getTranslateXMatrix(this.xTranslation),
            this.getTranslateYMatrix(this.yTranslation),
        ),
        this.getScaleMatrix(this.scale));

        this.inverseTransformMatrix = math.multiply(math.multiply(
            this.getScaleMatrix(1 / this.scale),
            this.getTranslateYMatrix(-1 * this.yTranslation),
        ),
        this.getTranslateXMatrix(-1 * this.xTranslation));
    }

    /**
     * transform points from C1 to C2.
     * @param {Array<number>} points: points on C1
     *     e.g.) [x1, y1, x2, y2] for points (x1, y1), (x2, y2) on C1
     * @returns {Array<number>} the projection of point on C2
     *     e.g.) [x1', y1', x2', y2'] if (x1', y1') is the projection of (x1, y1) on C2 and
     *     (x2', y2') is the projection of (x2, y2) on C2
     */
    transform(points) {
        const transformPoints = [];
        for (let i = 0; i < points.length; i += 2) {
            const point = this.arrayToVector([points[i], points[i + 1]]);
            const transformedPoint = math.multiply(this.transformMatrix, point);
            transformPoints.push(transformedPoint.get([0, 0]));
            transformPoints.push(transformedPoint.get([1, 0]));
        }
        return transformPoints;
    }

    /**
     * transform points from C2 to C1.
     * @param {Array<number>} points: points on C2
     *     e.g.) [x1, y1, x2, y2] for points (x1, y1), (x2, y2) on C2
     * @returns {Array<number>} the projection of point on C2
     *     e.g.) [x1', y1', x2', y2'] if (x1', y1') is the projection of (x1, y1) on C1 and
     *     (x2', y2') is the projection of (x2, y2) on C2
     */
    inverseTransform(points) {
        const inversedPoints = [];
        for (let i = 0; i < points.length; i += 2) {
            const point = this.arrayToVector([points[i], points[i + 1]]);
            const inversedPoint = math.multiply(this.inverseTransformMatrix, point);
            inversedPoints.push(inversedPoint.get([0, 0]));
            inversedPoints.push(inversedPoint.get([1, 0]));
        }
        return inversedPoints;
    }

    /**
     * get the transform matrix in format for the css transform property
     *
     * @returns {string} the transform matrix in css format
     *                  e.g.) 'matrix(a,b,c,d,tx,ty)' for transform matrix
     *                         [[a, c, tx],
     *                          [b, d, ty],
     *                          [0 ,0, 1]]
     */
    getCSSTransformMatrix() {
        let cssTransformMatrix = 'matrix(';
        for (let col = 0; col < 3; col += 1) {
            for (let row = 0; row < 2; row += 1) {
                cssTransformMatrix += `${this.transformMatrix.get([row, col])},`;
            }
        }
        if (cssTransformMatrix.charAt(cssTransformMatrix.length - 1) === ',') {
            cssTransformMatrix = cssTransformMatrix.substring(0, cssTransformMatrix.length - 1);
        }
        cssTransformMatrix += ')';
        return cssTransformMatrix;
    }

    /**
     * get the transform matrix in format for the HTML5 canvas
     *
     * @returns {string} the transform matrix in css format
     *                  e.g.) [a, b, c, d, tx, ty] for transform matrix
     *                         [[a, c, tx],
     *                          [b, d, ty],
     *                          [0 ,0, 1]]
     */
    getCanvasTransformMatrix() {
        const transformMatrixArray = [];
        for (let col = 0; col < 3; col += 1) {
            for (let row = 0; row < 2; row += 1) {
                transformMatrixArray.push(this.transformMatrix.get([row, col]));
            }
        }
        return transformMatrixArray;
    }

    /**
     * get the CSS transform style
     *
     * @returns an object that can be used as html style tag.
     *          e.g.) transform matrix [[a, c, tx],
     *                                  [b, d, ty],
     *                                  [0 ,0, 1]]:
     *           {  'transform-origin': '0 0',
     *              '-webkit-transform-origin': '0 0',
     *              '-ms-transform-origin': '0 0',
     *
     *              'transform': 'matrix(a,b,c,d,tx,ty)'
     *              '-webkit-transform': 'matrix(a,b,c,d,tx,ty)'
     *              '-ms-transform': 'matrix(a,b,c,d,tx,ty)'  }
     */
    getCSSTransformStyle() {
        const cssMatrix = this.getCSSTransformMatrix();

        return {
            'transform-origin': '0 0',
            '-webkit-transform-origin': '0 0', // Chrome, Safari, Opera
            '-ms-transform-origin': '0 0', // IE 9

            transform: cssMatrix,
            '-webkit-transform': cssMatrix, // Chrome, Safari, Opera
            '-ms-transform': cssMatrix, // IE 9
        };
    }

    /**
     * get the CSS transform style
     * @param {number} realWidth: real width of the original image in px
     * @param {number} realHeight: real height of the original image in px
     * @returns an object that can be used as html style tag.
     *          e.g.) transform matrix [[a, c, tx],
     *                                  [b, d, ty],
     *                                  [0 ,0, 1]]:
     *           {  'position': 'absolute',
     *              'left': 'this.xTranslation',
     *              'top': 'this.yTranslation',
     *
     *              'width': this.scale * realWidth + 'px'
     *              'height': 'auto'
     */
    getStyle(realWidth, realHeight) {
        return {
            position: 'absolute',

            left: this.xTranslation,
            top: this.yTranslation, // Chrome, Safari, Opera
            width: `${this.scale * realWidth}px`, // IE 9
            height: `${this.scale * realHeight}px`,
        };
    }

    /** ******** private functions ********* */

    getX(point) {
        return point[0];
    }

    getY(point) {
        return point[1];
    }

    getScaleMatrix(scalar) {
        return math.matrix([[scalar, 0, 0], [0, scalar, 0], [0, 0, 1]]);
    }

    getTranslateXMatrix(xTranslation) {
        return math.matrix([[1, 0, xTranslation], [0, 1, 0], [0, 0, 1]]);
    }

    getTranslateYMatrix(yTranslation) {
        return math.matrix([[1, 0, 0], [0, 1, yTranslation], [0, 0, 1]]);
    }

    arrayToVector(array) {
        return math.matrix(array).resize([3, 1], 1);
    }
}

class TransformCoordinatesForFace extends TransformCoordinates {
    /**
    * constructor.
    * @param {Array<number>} srcTopLeft: top-left point(in format [x, y]) on C1
    * @param {Array<number>} srcBottomRight: bottom-right point(in format [x, y]) on C1
    * @param {number} origImgWidth: width of the original image on C1
    * @param {number} origImgHeight: height of the original image on C1
    * @param {number} containerWidth: width of the rectangle on C2
    * @param {number} containerHeight: height of the rectangle on C2
    * @param {number} expectedRatio: the expected ratio on C2
    */
    constructor(srcTopLeft, srcBottomRight, origImgWidth, origImgHeight,
        containerWidth, containerHeight, expectedRatio) {
        super(srcTopLeft, srcBottomRight, containerWidth, containerHeight, expectedRatio);

        const srcWidth = this.getX(srcBottomRight) - this.getX(srcTopLeft);
        const srcHeight = this.getY(srcBottomRight) - this.getY(srcTopLeft);

        // ======================== scale ========================
        const maxEditRatioToShowWholeFace = Math.min(
            containerWidth / srcWidth, containerHeight / srcHeight,
        );
        const minEditRatioToCoverCustomContainer = Math.max(
            containerWidth / origImgWidth, containerHeight / origImgHeight,
        );

        let scale = maxEditRatioToShowWholeFace * expectedRatio;
        scale = scale < minEditRatioToCoverCustomContainer
            ? Math.min(maxEditRatioToShowWholeFace, minEditRatioToCoverCustomContainer) : scale;
        // =============================================================================

        // ======================== xTranslation & yTranslation ========================
        let xTranslation = -1 * ((this.getX(srcTopLeft) * scale)
            + (srcWidth / 2 * scale) - (containerWidth / 2));
        let yTranslation = -1 * ((this.getY(srcTopLeft) * scale)
            + (srcHeight / 2 * scale) - (containerHeight / 2));

        // new algorithm to fill up the margins that are still visible in the custom container
        const scaledWidth = origImgWidth * scale;
        const scaledHeight = origImgHeight * scale;

        const leftMargin = xTranslation;
        const rightMargin = containerWidth - leftMargin - scaledWidth;

        // if the custom container is not fully filled in horizontal dimension
        if (leftMargin > 0 || rightMargin > 0) {
            // if image width < container width, center the image
            if (scaledWidth < containerWidth) {
                xTranslation = (leftMargin + rightMargin) / 2;
            } else {
                // otherwise, fill up the margin (left or right)
                xTranslation = (leftMargin > 0) ? 0 : (leftMargin + rightMargin);
            }
        }

        const topMargin = yTranslation;
        const bottomMargin = containerHeight - topMargin - scaledHeight;

        // if the custom container is not fully filled in vertical dimension
        if (topMargin > 0 || bottomMargin > 0) {
            // if image height < container height, center the image
            if (scaledHeight < containerHeight) {
                yTranslation = (topMargin + bottomMargin) / 2;
            } else {
                // otherwise, fill up the margin (top or bottom)
                yTranslation = (topMargin > 0) ? 0 : (topMargin + bottomMargin);
            }
        }
        // ================================================================================

        this.transformMatrix = math.multiply(math.multiply(this.getTranslateXMatrix(xTranslation),
            this.getTranslateYMatrix(yTranslation)),
        this.getScaleMatrix(scale));

        this.inverseTransformMatrix = math.multiply(math.multiply(this.getScaleMatrix(1 / scale),
            this.getTranslateYMatrix(-1 * yTranslation)),
        this.getTranslateXMatrix(-1 * xTranslation));
    }
}
