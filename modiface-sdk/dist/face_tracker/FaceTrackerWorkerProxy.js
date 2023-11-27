/**
 * @license
 *
 * This library contains code from TypeScript:
 * 
 * Copyright (c) Microsoft Corporation.
 * 
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
 * REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
 * AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
 * INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
 * LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
 * OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
 * PERFORMANCE OF THIS SOFTWARE.
 * 
 * This library contains code from tfjs:
 * 
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * 
 */

class t{constructor(){this.numFramesForDetection=30,this.enableLightingCheck=!1,this.lightingCheckingInterval=1,this.enableStabilization=!0,this.lightingCheckThreshold=.5,this.licenceKey=null,this.maxFaces=1,this.onlyUseWasmBackend=!0,this.faceBoxValidationMinThreshold=.1,this.faceBoxValidationMaxThreshold=1.3,this.detectFaceMasks=!1,this.faceMaskDetectionInterval=30,this.maxOptFlowWidth=240,this.skipDetectionIfOptFlowGood=!0,this.optFlowErrorThreshold=.08,this.maxSecondsForPointRedetection=.15,this.stabilizationRefWindowSize=30,this.stabilizationRefDistanceBlendingNorm=5,this.stabilizationTransitionSpeedFactor=.8,this.includeLegacyPts=!1,this.enableRedetectOnAngleThreshold=!0,this.angleThreshold=Math.PI/180*10}}class e{constructor(){this.settings=new t,this.instantiateWasmOverride=null}}const s=(t,e=null)=>{if(!t)throw console.trace(),new Error(`Assertion failed: ${e}`)};class i extends e{constructor(t="./FaceTracker.worker.js"){super(),this.responseHandlers=[],this.requestCounter=0,this.workerScriptPath=t}async postMessage(t){const e=this.requestCounter,s={...t,requestID:e};return this.requestCounter+=1,new Promise((t=>{this.responseHandlers.push({requestID:e,handler:t}),this.faceTrackerWorker.postMessage(s)}))}async load(t,e){const i=new URL(this.workerScriptPath,import.meta.url);this.faceTrackerWorker=new Worker(i),this.faceTrackerWorker.onmessage=t=>{const e=t.data,i=this.responseHandlers.filter((t=>t.requestID===e.requestID));s(1===i.length,`Response handler is missing or more than one found for requestID ${e.requestID}`);const n=i[0];this.responseHandlers=this.responseHandlers.filter((t=>t.requestID!==e.requestID)),n.handler(t.data.contents)};const n={command:"load",data:{settings:this.settings,resources:t,isEncrypted:e}};return this.postMessage(n)}async warmup(){return this.postMessage({command:"warmup"})}async reset(){return this.postMessage({command:"reset"})}async detect(t){return this.postMessage({command:"detect",data:{inputPixelData:t,settings:this.settings}})}async detectMulti(t){return this.postMessage({command:"detectMulti",data:{inputPixelData:t,settings:this.settings}})}async destroy(){return this.postMessage({command:"destroy"})}async getDebugInfo(){return this.postMessage({command:"getDebugInfo"})}}class n{constructor(){this.facebox=null,this.origFacebox=null,this.targetOrigFacebox=null,this.facePoints=null,this.facePointsLegacy=null,this.isBadLighting=!1,this.allPoints=null,this.hasFaceMask=!1}}class r{constructor(){this.boxDetectionTime=0,this.boxDetectionTimeAmortized=0,this.makeCroppedResizedTensor=0,this.pointDetectionTime=0,this.emscriptenModuleTime=0,this.totalTime=0,this.frameToFrame=0,this.opticalFlow=0,this.skipsFrequency=0}}class o{constructor(){this.faceRotation=null,this.faceTranslation=null,this.modelViewProjectionMatrix=null,this.modelMatrix=null,this.projectionViewMatrix=null}}class a{constructor(t,e,s,i){this.x=t,this.y=e,this.width=s,this.height=i}}class h{constructor(t,e,i){s(t.length===e*i*4,"Buffer must be the correct size"),this.buffer=t,this.width=e,this.height=i}}export{e as AbstractFaceTracker,n as FaceDetectionResult,o as FacePoints,t as FaceTrackerSettings,i as FaceTrackerWorkerProxy,h as PixelData,a as Rect,r as TimingStats};
