function createCanvas({
    canvas = null, w, h, fill = null,
}) {
    const canv = canvas || document.createElement('canvas');
    canv.width = w;
    canv.height = h;

    if (fill) {
        const cont = canv.getContext('2d');
        cont.fillStyle = fill;
        cont.fillRect(0, 0, w, h);
    }

    return canv;
}

function getBezierPoints(i, points, scaleFactor, isForward) {
    if (points[i].sharp) {
        return points[i];
    }

    let p0; let p2;
    if (i === points.length - 1) {
        [p2] = points;
    } else {
        p2 = points[i + 1];
    }

    if (i === 0) {
        p0 = points[points.length - 1];
    } else {
        p0 = points[i - 1];
    }

    const p1 = points[i];

    // control point 1 distance
    const length = Math.round(Math.sqrt(
        (p2.x - p0.x) * (p2.x - p0.x) + (p2.y - p0.y) * (p2.y - p0.y),
    )) * scaleFactor;

    // control point direction unit vector
    let direction = { x: (p2.x - p0.x), y: (p2.y - p0.y) };
    const magnitude = Math.sqrt((p2.x - p0.x) * (p2.x - p0.x) + (p2.y - p0.y) * (p2.y - p0.y));
    direction = { x: direction.x / magnitude, y: direction.y / magnitude };
    if (isForward) {
        return {
            x: Math.round(p1.x + (direction.x * length)),
            y: Math.round(p1.y + (direction.y * length)),
        };
    }
    return {
        x: Math.round(p1.x - (direction.x * length)),
        y: Math.round(p1.y - (direction.y * length)),
    };
}

function drawCurve(points, ctx, scaleFactor, color = 'rgba(0,0,0,0.3)', startContour = true, closeContour = true) {
    if (points.length < 2) {
        console.log('Error [drawCurve]: points must be at least length of 2');
        return;
    }

    if (startContour) {
        ctx.beginPath();
    }

    ctx.moveTo(points[0].x, points[0].y);

    for (let i = 0; i < points.length - 2; i += 1) {
        const pt1 = getBezierPoints(i, points, scaleFactor, true);
        const pt2 = getBezierPoints(i + 1, points, scaleFactor, false);
        ctx.bezierCurveTo(pt1.x, pt1.y,
            pt2.x, pt2.y, points[i + 1].x, points[i + 1].y);
    }

    const pt1 = getBezierPoints(points.length - 2, points, scaleFactor, true);
    ctx.bezierCurveTo(pt1.x, pt1.y, points[points.length - 1].x,
        points[points.length - 1].y, points[points.length - 1].x, points[points.length - 1].y);

    if (closeContour) {
        ctx.closePath();
        ctx.lineWidth = 0;
        ctx.fillStyle = color;
        ctx.fill();
    }
}

// draw lip mask. color specifies the mask color. size specifies the size of the lip mask and
// scale is used to specify the scale of the canvas element
function lipMask({
    canvas = null, outerlipArray, innerlipArray, lipsOpened, w, h, size = 1.0,
    color = 'rgba(0,0,0,0.3)', scale = null, blurLevel = 0.02, topSize = 1,
}) {
    const canvasTemp = createCanvas({ canvas, w, h });
    const contextTemp = canvasTemp.getContext('2d');
    if (scale) {
        contextTemp.scale(scale.x, scale.y);
    }

    if (outerlipArray.length === 0) {
        console.log('Error: outerlip length is 0');
        return;
    }

    if (innerlipArray.length === 0) {
        console.log('Error: innerlip length is 0');
        return;
    }

    let minx = -1; let
        maxx = -1;
    let miny = -1; let
        maxy = -1;
    for (let i = 0, l = outerlipArray.length; i < l; i += 1) {
        if (minx === -1) {
            minx = outerlipArray[i].x;
        } else if (minx > outerlipArray[i].x) {
            minx = outerlipArray[i].x;
        }

        if (maxx === -1) {
            maxx = outerlipArray[i].x;
        } else if (maxx < outerlipArray[i].x) {
            maxx = outerlipArray[i].x;
        }

        if (miny === -1) {
            miny = outerlipArray[i].y;
        } else if (miny > outerlipArray[i].y) {
            miny = outerlipArray[i].y;
        }

        if (maxy === -1) {
            maxy = outerlipArray[i].y;
        } else if (maxy < outerlipArray[i].y) {
            maxy = outerlipArray[i].y;
        }
    }

    if (miny > maxy) {
        console.log('Error: something wrong with lip coords');
        return;
    }

    const lipbox = [minx, miny, maxx, maxy];

    const lipw = lipbox[2] - lipbox[0];

    // const liph = lipbox[3] - lipbox[1];

    const blurradius = Math.max(1, Math.round(lipw * blurLevel));

    const bluroff = blurradius * 2;
    const newx0 = Math.max(0, lipbox[0] - bluroff);
    const newy0 = Math.max(0, lipbox[1] - bluroff);
    const newx1 = Math.min(w - 1, lipbox[2] + bluroff);
    const newy1 = Math.min(h - 1, lipbox[3] + bluroff);

    const newyAvg = Math.round((newy1 - newy0) / 2);

    const blurw = newx1 - newx0;
    const blurh = newy1 - newy0;

    canvasTemp.width = blurw;
    canvasTemp.height = blurh;

    // contextTemp.clearRect(0, 0, blurw, blurh);

    let curvelevel = 0.36;

    // draw outer lips
    let rmi = 6;

    contextTemp.beginPath();

    contextTemp.moveTo(outerlipArray[0].x - newx0, (outerlipArray[0].y - newy0) * size);

    for (let i = 0, l = outerlipArray.length; i < l; i += 1) {
        const bh0 = (i - 1 + l) % l;
        const p0 = i;
        const p1 = (i + 1) % l;
        const bh1 = (i + 2) % l;

        const bh0pos = [outerlipArray[bh0].x - newx0, outerlipArray[bh0].y - newy0];
        const p0pos = [outerlipArray[p0].x - newx0, outerlipArray[p0].y - newy0];
        const p1pos = [outerlipArray[p1].x - newx0, outerlipArray[p1].y - newy0];
        const bh1pos = [outerlipArray[bh1].x - newx0, outerlipArray[bh1].y - newy0];

        const l0Dist = Math.sqrt((p1pos[0] - bh0pos[0])
            * (p1pos[0] - bh0pos[0]) + (p1pos[1] - bh0pos[1]) * (p1pos[1] - bh0pos[1]));
        const l0Xu = (p1pos[0] - bh0pos[0]) / l0Dist;
        const l0Yu = (p1pos[1] - bh0pos[1]) / l0Dist;

        const l1Dist = Math.sqrt((p0pos[0] - bh1pos[0]) * (p0pos[0] - bh1pos[0])
            + (p0pos[1] - bh1pos[1]) * (p0pos[1] - bh1pos[1]));
        const l1Xu = (p0pos[0] - bh1pos[0]) / l1Dist;
        const l1Yu = (p0pos[1] - bh1pos[1]) / l1Dist;

        const mydist = Math.sqrt((p0pos[0] - p1pos[0]) * (p0pos[0] - p1pos[0])
            + (p0pos[1] - p1pos[1]) * (p0pos[1] - p1pos[1])) * curvelevel;

        let b0pos; let b1pos; let p0TopSize; let p1TopSize;

        if (i === 0 || i === rmi) {
            b0pos = [p0pos[0], p0pos[1]];
        } else {
            b0pos = [p0pos[0] + mydist * l0Xu, p0pos[1] + mydist * l0Yu];
        }

        if (i === rmi - 1 || i === l - 1) {
            b1pos = [p1pos[0], p1pos[1]];
        } else {
            b1pos = [p1pos[0] + mydist * l1Xu, p1pos[1] + mydist * l1Yu];
        }

        if (p0 > 0 && p0 < rmi) {
            p0TopSize = topSize;
        } else {
            p0TopSize = 1;
        }

        if (p1 > 0 && p1 < rmi) {
            p1TopSize = topSize;
        } else {
            p1TopSize = 1;
        }

        contextTemp.bezierCurveTo(b0pos[0], newyAvg + (b0pos[1] * size - newyAvg) * p0TopSize,
            b1pos[0], newyAvg + (b1pos[1] * size - newyAvg) * p1TopSize,
            p1pos[0], newyAvg + (p1pos[1] * size - newyAvg) * p1TopSize);
    }

    if (Boolean(lipsOpened) === true) {
        // temp inner lips
        curvelevel = 0.36;
        rmi = 4;
        const l = innerlipArray.length;

        contextTemp.moveTo(innerlipArray[l - 1].x - newx0, (innerlipArray[l - 1].y - newy0) * size);

        for (let i = l - 1; i >= 0; i -= 1) {
            const bh0 = (i + 1) % l;
            const p0 = i;
            const p1 = (i - 1 + l) % l;
            const bh1 = (i - 2 + l) % l;

            const bh0pos = [innerlipArray[bh0].x - newx0, innerlipArray[bh0].y - newy0];
            const p0pos = [innerlipArray[p0].x - newx0, innerlipArray[p0].y - newy0];
            const p1pos = [innerlipArray[p1].x - newx0, innerlipArray[p1].y - newy0];
            const bh1pos = [innerlipArray[bh1].x - newx0, innerlipArray[bh1].y - newy0];

            const l0Dist = Math.sqrt((p1pos[0] - bh0pos[0]) * (p1pos[0] - bh0pos[0])
                + (p1pos[1] - bh0pos[1]) * (p1pos[1] - bh0pos[1]));
            const l0Xu = (p1pos[0] - bh0pos[0]) / l0Dist;
            const l0Yu = (p1pos[1] - bh0pos[1]) / l0Dist;

            const l1Dist = Math.sqrt((p0pos[0] - bh1pos[0]) * (p0pos[0] - bh1pos[0])
                + (p0pos[1] - bh1pos[1]) * (p0pos[1] - bh1pos[1]));
            const l1Xu = (p0pos[0] - bh1pos[0]) / l1Dist;
            const l1Yu = (p0pos[1] - bh1pos[1]) / l1Dist;

            const mydist = Math.sqrt((p0pos[0] - p1pos[0]) * (p0pos[0] - p1pos[0])
                + (p0pos[1] - p1pos[1]) * (p0pos[1] - p1pos[1])) * curvelevel;

            let b0pos; let b1pos;

            if (i === 0 || i === rmi) {
                b0pos = [p0pos[0], p0pos[1]];
            } else {
                b0pos = [p0pos[0] + mydist * l0Xu, p0pos[1] + mydist * l0Yu];
            }

            if (i === rmi + 1 || i === 1) {
                b1pos = [p1pos[0], p1pos[1]];
            } else {
                b1pos = [p1pos[0] + mydist * l1Xu, p1pos[1] + mydist * l1Yu];
            }

            contextTemp.bezierCurveTo(b0pos[0], b0pos[1] * size, b1pos[0],
                b1pos[1] * size, p1pos[0], p1pos[1] * size);
        }
    }

    contextTemp.closePath();
    contextTemp.fillStyle = color;
    contextTemp.fill();

    return {
        canvas: canvasTemp,
        coords: [
            newx0,
            newy0 + (outerlipArray[0].y - newy0) - ((outerlipArray[0].y - newy0) * size),
            blurw,
            blurh,
        ],
        newx0,
        newy0,
        blurradius,
        lipw,
    };
}

// eyepoints length should be 8
function eyeMask({
    canvas = null, eyepoints, w, h, color = 'rgba(0,0,0,0.3)',
}) {
    const canvasTemp = createCanvas({ canvas, w, h });
    const contextTemp = canvasTemp.getContext('2d');

    const eyepoint = eyepoints;
    eyepoint[0].sharp = true;
    eyepoint[2].sharp = true;

    drawCurve(eyepoint, contextTemp, 0.2, color, true, true);

    return {
        canvas: canvasTemp,
        coords: [0, 0, w, h],
    };
}

function drawMask({
    canvas = null, imgW, imgH, color = 'rgba(0,0,0,0.3)', coordinates,
}) {
    const featureCoords = coordinates.facePoints[feature];
    if (feature === 'extendedOuterMouth2D') {
        return lipMask({
            canvas,
            outerlipArray: featureCoords,
            innerlipArray: coordinates.facePoints.innerMouth2D,
            lipsOpened: coordinates.mouthopen,
            w: imgW,
            h: imgH,
            size: 1.0,
            color,
        });
    }
    if (feature === 'leftExtendedEye2D' || feature === 'rightExtendedEye2D') {
        return eyeMask({
            canvas,
            eyepoints: featureCoords,
            w: imgW,
            h: imgH,
            color,
        });
    }
}
