import"./modulepreload-polyfill-B5Qt9EMX.js";import{g as _i}from"./pdf-generator-RNoVd9ok.js";const Uu=()=>{};var ca={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sl=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},ju=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const s=n[t++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const o=n[t++];e[r++]=String.fromCharCode((s&31)<<6|o&63)}else if(s>239&&s<365){const o=n[t++],a=n[t++],u=n[t++],h=((s&7)<<18|(o&63)<<12|(a&63)<<6|u&63)-65536;e[r++]=String.fromCharCode(55296+(h>>10)),e[r++]=String.fromCharCode(56320+(h&1023))}else{const o=n[t++],a=n[t++];e[r++]=String.fromCharCode((s&15)<<12|(o&63)<<6|a&63)}}return e.join("")},bl={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const o=n[s],a=s+1<n.length,u=a?n[s+1]:0,h=s+2<n.length,f=h?n[s+2]:0,_=o>>2,v=(o&3)<<4|u>>4;let b=(u&15)<<2|f>>6,P=f&63;h||(P=64,a||(b=64)),r.push(t[_],t[v],t[b],t[P])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Sl(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):ju(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const o=t[n.charAt(s++)],u=s<n.length?t[n.charAt(s)]:0;++s;const f=s<n.length?t[n.charAt(s)]:64;++s;const v=s<n.length?t[n.charAt(s)]:64;if(++s,o==null||u==null||f==null||v==null)throw new $u;const b=o<<2|u>>4;if(r.push(b),f!==64){const P=u<<4&240|f>>2;if(r.push(P),v!==64){const N=f<<6&192|v;r.push(N)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class $u extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const qu=function(n){const e=Sl(n);return bl.encodeByteArray(e,!0)},Cs=function(n){return qu(n).replace(/\./g,"")},Cl=function(n){try{return bl.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gu(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hu=()=>Gu().__FIREBASE_DEFAULTS__,zu=()=>{if(typeof process>"u"||typeof ca>"u")return;const n=ca.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Wu=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&Cl(n[1]);return e&&JSON.parse(e)},Ws=()=>{try{return Uu()||Hu()||zu()||Wu()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Rl=n=>{var e,t;return(t=(e=Ws())==null?void 0:e.emulatorHosts)==null?void 0:t[n]},Ku=n=>{const e=Rl(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},Pl=()=>{var n;return(n=Ws())==null?void 0:n.config},kl=n=>{var e;return(e=Ws())==null?void 0:e[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qu{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ju(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",s=n.iat||0,o=n.sub||n.user_id;if(!o)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a={iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:o,user_id:o,firebase:{sign_in_provider:"custom",identities:{}},...n};return[Cs(JSON.stringify(t)),Cs(JSON.stringify(a)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $e(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Xu(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test($e())}function Yu(){var e;const n=(e=Ws())==null?void 0:e.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Zu(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function eh(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function th(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function nh(){const n=$e();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function rh(){return!Yu()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function sh(){try{return typeof indexedDB=="object"}catch{return!1}}function ih(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var o;e(((o=s.error)==null?void 0:o.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oh="FirebaseError";class Mt extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=oh,Object.setPrototypeOf(this,Mt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Mr.prototype.create)}}class Mr{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},s=`${this.service}/${e}`,o=this.errors[e],a=o?ah(o,r):"Error",u=`${this.serviceName}: ${a} (${s}).`;return new Mt(s,u,r)}}function ah(n,e){return n.replace(lh,(t,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const lh=/\{\$([^}]+)}/g;function ch(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function En(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const s of t){if(!r.includes(s))return!1;const o=n[s],a=e[s];if(ua(o)&&ua(a)){if(!En(o,a))return!1}else if(o!==a)return!1}for(const s of r)if(!t.includes(s))return!1;return!0}function ua(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lr(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function uh(n,e){const t=new hh(n,e);return t.subscribe.bind(t)}class hh{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let s;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");dh(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:r},s.next===void 0&&(s.next=Ei),s.error===void 0&&(s.error=Ei),s.complete===void 0&&(s.complete=Ei);const o=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),o}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function dh(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Ei(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ht(n){return n&&n._delegate?n._delegate:n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Br(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Nl(n){return(await fetch(n,{credentials:"include"})).ok}class In{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pn="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fh{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new Qu;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),r=(e==null?void 0:e.optional)??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(s){if(r)return null;throw s}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(mh(e))try{this.getOrInitializeService({instanceIdentifier:pn})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const o=this.getOrInitializeService({instanceIdentifier:s});r.resolve(o)}catch{}}}}clearInstance(e=pn){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=pn){return this.instances.has(e)}getOptions(e=pn){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[o,a]of this.instancesDeferred.entries()){const u=this.normalizeInstanceIdentifier(o);r===u&&a.resolve(s)}return s}onInit(e,t){const r=this.normalizeInstanceIdentifier(t),s=this.onInitCallbacks.get(r)??new Set;s.add(e),this.onInitCallbacks.set(r,s);const o=this.instances.get(r);return o&&e(o,r),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const s of r)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:ph(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=pn){return this.component?this.component.multipleInstances?e:pn:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function ph(n){return n===pn?void 0:n}function mh(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gh{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new fh(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var j;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(j||(j={}));const yh={debug:j.DEBUG,verbose:j.VERBOSE,info:j.INFO,warn:j.WARN,error:j.ERROR,silent:j.SILENT},_h=j.INFO,Eh={[j.DEBUG]:"log",[j.VERBOSE]:"log",[j.INFO]:"info",[j.WARN]:"warn",[j.ERROR]:"error"},Ih=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),s=Eh[e];if(s)console[s](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Xi{constructor(e){this.name=e,this._logLevel=_h,this._logHandler=Ih,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in j))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?yh[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,j.DEBUG,...e),this._logHandler(this,j.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,j.VERBOSE,...e),this._logHandler(this,j.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,j.INFO,...e),this._logHandler(this,j.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,j.WARN,...e),this._logHandler(this,j.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,j.ERROR,...e),this._logHandler(this,j.ERROR,...e)}}const vh=(n,e)=>e.some(t=>n instanceof t);let ha,da;function Th(){return ha||(ha=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function wh(){return da||(da=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Dl=new WeakMap,Ni=new WeakMap,Ol=new WeakMap,Ii=new WeakMap,Yi=new WeakMap;function Ah(n){const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("success",o),n.removeEventListener("error",a)},o=()=>{t(Qt(n.result)),s()},a=()=>{r(n.error),s()};n.addEventListener("success",o),n.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&Dl.set(t,n)}).catch(()=>{}),Yi.set(e,n),e}function Sh(n){if(Ni.has(n))return;const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("complete",o),n.removeEventListener("error",a),n.removeEventListener("abort",a)},o=()=>{t(),s()},a=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",o),n.addEventListener("error",a),n.addEventListener("abort",a)});Ni.set(n,e)}let Di={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Ni.get(n);if(e==="objectStoreNames")return n.objectStoreNames||Ol.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Qt(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function bh(n){Di=n(Di)}function Ch(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(vi(this),e,...t);return Ol.set(r,e.sort?e.sort():[e]),Qt(r)}:wh().includes(n)?function(...e){return n.apply(vi(this),e),Qt(Dl.get(this))}:function(...e){return Qt(n.apply(vi(this),e))}}function Rh(n){return typeof n=="function"?Ch(n):(n instanceof IDBTransaction&&Sh(n),vh(n,Th())?new Proxy(n,Di):n)}function Qt(n){if(n instanceof IDBRequest)return Ah(n);if(Ii.has(n))return Ii.get(n);const e=Rh(n);return e!==n&&(Ii.set(n,e),Yi.set(e,n)),e}const vi=n=>Yi.get(n);function Ph(n,e,{blocked:t,upgrade:r,blocking:s,terminated:o}={}){const a=indexedDB.open(n,e),u=Qt(a);return r&&a.addEventListener("upgradeneeded",h=>{r(Qt(a.result),h.oldVersion,h.newVersion,Qt(a.transaction),h)}),t&&a.addEventListener("blocked",h=>t(h.oldVersion,h.newVersion,h)),u.then(h=>{o&&h.addEventListener("close",()=>o()),s&&h.addEventListener("versionchange",f=>s(f.oldVersion,f.newVersion,f))}).catch(()=>{}),u}const kh=["get","getKey","getAll","getAllKeys","count"],Nh=["put","add","delete","clear"],Ti=new Map;function fa(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Ti.get(e))return Ti.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,s=Nh.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(s||kh.includes(t)))return;const o=async function(a,...u){const h=this.transaction(a,s?"readwrite":"readonly");let f=h.store;return r&&(f=f.index(u.shift())),(await Promise.all([f[t](...u),s&&h.done]))[0]};return Ti.set(e,o),o}bh(n=>({...n,get:(e,t,r)=>fa(e,t)||n.get(e,t,r),has:(e,t)=>!!fa(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dh{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Oh(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function Oh(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Oi="@firebase/app",pa="0.14.12";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ot=new Xi("@firebase/app"),Vh="@firebase/app-compat",xh="@firebase/analytics-compat",Mh="@firebase/analytics",Lh="@firebase/app-check-compat",Bh="@firebase/app-check",Fh="@firebase/auth",Uh="@firebase/auth-compat",jh="@firebase/database",$h="@firebase/data-connect",qh="@firebase/database-compat",Gh="@firebase/functions",Hh="@firebase/functions-compat",zh="@firebase/installations",Wh="@firebase/installations-compat",Kh="@firebase/messaging",Qh="@firebase/messaging-compat",Jh="@firebase/performance",Xh="@firebase/performance-compat",Yh="@firebase/remote-config",Zh="@firebase/remote-config-compat",ed="@firebase/storage",td="@firebase/storage-compat",nd="@firebase/firestore",rd="@firebase/ai",sd="@firebase/firestore-compat",id="firebase",od="12.13.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vi="[DEFAULT]",ad={[Oi]:"fire-core",[Vh]:"fire-core-compat",[Mh]:"fire-analytics",[xh]:"fire-analytics-compat",[Bh]:"fire-app-check",[Lh]:"fire-app-check-compat",[Fh]:"fire-auth",[Uh]:"fire-auth-compat",[jh]:"fire-rtdb",[$h]:"fire-data-connect",[qh]:"fire-rtdb-compat",[Gh]:"fire-fn",[Hh]:"fire-fn-compat",[zh]:"fire-iid",[Wh]:"fire-iid-compat",[Kh]:"fire-fcm",[Qh]:"fire-fcm-compat",[Jh]:"fire-perf",[Xh]:"fire-perf-compat",[Yh]:"fire-rc",[Zh]:"fire-rc-compat",[ed]:"fire-gcs",[td]:"fire-gcs-compat",[nd]:"fire-fst",[sd]:"fire-fst-compat",[rd]:"fire-vertex","fire-js":"fire-js",[id]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rs=new Map,ld=new Map,xi=new Map;function ma(n,e){try{n.container.addComponent(e)}catch(t){Ot.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Kn(n){const e=n.name;if(xi.has(e))return Ot.debug(`There were multiple attempts to register component ${e}.`),!1;xi.set(e,n);for(const t of Rs.values())ma(t,n);for(const t of ld.values())ma(t,n);return!0}function Zi(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function _t(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cd={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Jt=new Mr("app","Firebase",cd);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ud{constructor(e,t,r){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new In("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Jt.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const er=od;function Vl(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r={name:Vi,automaticDataCollectionEnabled:!0,...e},s=r.name;if(typeof s!="string"||!s)throw Jt.create("bad-app-name",{appName:String(s)});if(t||(t=Pl()),!t)throw Jt.create("no-options");const o=Rs.get(s);if(o){if(En(t,o.options)&&En(r,o.config))return o;throw Jt.create("duplicate-app",{appName:s})}const a=new gh(s);for(const h of xi.values())a.addComponent(h);const u=new ud(t,r,a);return Rs.set(s,u),u}function xl(n=Vi){const e=Rs.get(n);if(!e&&n===Vi&&Pl())return Vl();if(!e)throw Jt.create("no-app",{appName:n});return e}function Xt(n,e,t){let r=ad[n]??n;t&&(r+=`-${t}`);const s=r.match(/\s|\//),o=e.match(/\s|\//);if(s||o){const a=[`Unable to register library "${r}" with version "${e}":`];s&&a.push(`library name "${r}" contains illegal characters (whitespace or "/")`),s&&o&&a.push("and"),o&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Ot.warn(a.join(" "));return}Kn(new In(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hd="firebase-heartbeat-database",dd=1,Pr="firebase-heartbeat-store";let wi=null;function Ml(){return wi||(wi=Ph(hd,dd,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Pr)}catch(t){console.warn(t)}}}}).catch(n=>{throw Jt.create("idb-open",{originalErrorMessage:n.message})})),wi}async function fd(n){try{const t=(await Ml()).transaction(Pr),r=await t.objectStore(Pr).get(Ll(n));return await t.done,r}catch(e){if(e instanceof Mt)Ot.warn(e.message);else{const t=Jt.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Ot.warn(t.message)}}}async function ga(n,e){try{const r=(await Ml()).transaction(Pr,"readwrite");await r.objectStore(Pr).put(e,Ll(n)),await r.done}catch(t){if(t instanceof Mt)Ot.warn(t.message);else{const r=Jt.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});Ot.warn(r.message)}}}function Ll(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pd=1024,md=30;class gd{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new _d(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),o=ya();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===o||this._heartbeatsCache.heartbeats.some(a=>a.date===o))return;if(this._heartbeatsCache.heartbeats.push({date:o,agent:s}),this._heartbeatsCache.heartbeats.length>md){const a=Ed(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(a,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){Ot.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=ya(),{heartbeatsToSend:r,unsentEntries:s}=yd(this._heartbeatsCache.heartbeats),o=Cs(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),o}catch(t){return Ot.warn(t),""}}}function ya(){return new Date().toISOString().substring(0,10)}function yd(n,e=pd){const t=[];let r=n.slice();for(const s of n){const o=t.find(a=>a.agent===s.agent);if(o){if(o.dates.push(s.date),_a(t)>e){o.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),_a(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class _d{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return sh()?ih().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await fd(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return ga(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return ga(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function _a(n){return Cs(JSON.stringify({version:2,heartbeats:n})).length}function Ed(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Id(n){Kn(new In("platform-logger",e=>new Dh(e),"PRIVATE")),Kn(new In("heartbeat",e=>new gd(e),"PRIVATE")),Xt(Oi,pa,n),Xt(Oi,pa,"esm2020"),Xt("fire-js","")}Id("");var vd="firebase",Td="12.13.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Xt(vd,Td,"app");function Bl(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const wd=Bl,Fl=new Mr("auth","Firebase",Bl());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ps=new Xi("@firebase/auth");function Ad(n,...e){Ps.logLevel<=j.WARN&&Ps.warn(`Auth (${er}): ${n}`,...e)}function _s(n,...e){Ps.logLevel<=j.ERROR&&Ps.error(`Auth (${er}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vt(n,...e){throw eo(n,...e)}function Et(n,...e){return eo(n,...e)}function Ul(n,e,t){const r={...wd(),[e]:t};return new Mr("auth","Firebase",r).create(e,{appName:n.name})}function gn(n){return Ul(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function eo(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return Fl.create(n,...e)}function L(n,e,...t){if(!n)throw eo(e,...t)}function Pt(n){const e="INTERNAL ASSERTION FAILED: "+n;throw _s(e),new Error(e)}function xt(n,e){n||Pt(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mi(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.href)||""}function Sd(){return Ea()==="http:"||Ea()==="https:"}function Ea(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bd(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Sd()||eh()||"connection"in navigator)?navigator.onLine:!0}function Cd(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fr{constructor(e,t){this.shortDelay=e,this.longDelay=t,xt(t>e,"Short delay should be less than long delay!"),this.isMobile=Xu()||th()}get(){return bd()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function to(n,e){xt(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jl{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Pt("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Pt("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Pt("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rd={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pd=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],kd=new Fr(3e4,6e4);function no(n,e){return n.tenantId&&!e.tenantId?{...e,tenantId:n.tenantId}:e}async function tr(n,e,t,r,s={}){return $l(n,s,async()=>{let o={},a={};r&&(e==="GET"?a=r:o={body:JSON.stringify(r)});const u=Lr({key:n.config.apiKey,...a}).slice(1),h=await n._getAdditionalHeaders();h["Content-Type"]="application/json",n.languageCode&&(h["X-Firebase-Locale"]=n.languageCode);const f={method:e,headers:h,...o};return Zu()||(f.referrerPolicy="no-referrer"),n.emulatorConfig&&Br(n.emulatorConfig.host)&&(f.credentials="include"),jl.fetch()(await ql(n,n.config.apiHost,t,u),f)})}async function $l(n,e,t){n._canInitEmulator=!1;const r={...Rd,...e};try{const s=new Dd(n),o=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const a=await o.json();if("needConfirmation"in a)throw ls(n,"account-exists-with-different-credential",a);if(o.ok&&!("errorMessage"in a))return a;{const u=o.ok?a.errorMessage:a.error.message,[h,f]=u.split(" : ");if(h==="FEDERATED_USER_ID_ALREADY_LINKED")throw ls(n,"credential-already-in-use",a);if(h==="EMAIL_EXISTS")throw ls(n,"email-already-in-use",a);if(h==="USER_DISABLED")throw ls(n,"user-disabled",a);const _=r[h]||h.toLowerCase().replace(/[_\s]+/g,"-");if(f)throw Ul(n,_,f);Vt(n,_)}}catch(s){if(s instanceof Mt)throw s;Vt(n,"network-request-failed",{message:String(s)})}}async function Nd(n,e,t,r,s={}){const o=await tr(n,e,t,r,s);return"mfaPendingCredential"in o&&Vt(n,"multi-factor-auth-required",{_serverResponse:o}),o}async function ql(n,e,t,r){const s=`${e}${t}?${r}`,o=n,a=o.config.emulator?to(n.config,s):`${n.config.apiScheme}://${s}`;return Pd.includes(t)&&(await o._persistenceManagerAvailable,o._getPersistenceType()==="COOKIE")?o._getPersistence()._getFinalTarget(a).toString():a}class Dd{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(Et(this.auth,"network-request-failed")),kd.get())})}}function ls(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const s=Et(n,e,r);return s.customData._tokenResponse=t,s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Od(n,e){return tr(n,"POST","/v1/accounts:delete",e)}async function ks(n,e){return tr(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tr(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Vd(n,e=!1){const t=ht(n),r=await t.getIdToken(e),s=ro(r);L(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const o=typeof s.firebase=="object"?s.firebase:void 0,a=o==null?void 0:o.sign_in_provider;return{claims:s,token:r,authTime:Tr(Ai(s.auth_time)),issuedAtTime:Tr(Ai(s.iat)),expirationTime:Tr(Ai(s.exp)),signInProvider:a||null,signInSecondFactor:(o==null?void 0:o.sign_in_second_factor)||null}}function Ai(n){return Number(n)*1e3}function ro(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return _s("JWT malformed, contained fewer than 3 sections"),null;try{const s=Cl(t);return s?JSON.parse(s):(_s("Failed to decode base64 JWT payload"),null)}catch(s){return _s("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function Ia(n){const e=ro(n);return L(e,"internal-error"),L(typeof e.exp<"u","internal-error"),L(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function kr(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof Mt&&xd(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function xd({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Md{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const r=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Li{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Tr(this.lastLoginAt),this.creationTime=Tr(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ns(n){var v;const e=n.auth,t=await n.getIdToken(),r=await kr(n,ks(e,{idToken:t}));L(r==null?void 0:r.users.length,e,"internal-error");const s=r.users[0];n._notifyReloadListener(s);const o=(v=s.providerUserInfo)!=null&&v.length?Gl(s.providerUserInfo):[],a=Bd(n.providerData,o),u=n.isAnonymous,h=!(n.email&&s.passwordHash)&&!(a!=null&&a.length),f=u?h:!1,_={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:a,metadata:new Li(s.createdAt,s.lastLoginAt),isAnonymous:f};Object.assign(n,_)}async function Ld(n){const e=ht(n);await Ns(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Bd(n,e){return[...n.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function Gl(n){return n.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Fd(n,e){const t=await $l(n,{},async()=>{const r=Lr({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:o}=n.config,a=await ql(n,s,"/v1/token",`key=${o}`),u=await n._getAdditionalHeaders();u["Content-Type"]="application/x-www-form-urlencoded";const h={method:"POST",headers:u,body:r};return n.emulatorConfig&&Br(n.emulatorConfig.host)&&(h.credentials="include"),jl.fetch()(a,h)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function Ud(n,e){return tr(n,"POST","/v2/accounts:revokeToken",no(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $n{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){L(e.idToken,"internal-error"),L(typeof e.idToken<"u","internal-error"),L(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Ia(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){L(e.length!==0,"internal-error");const t=Ia(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(L(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:s,expiresIn:o}=await Fd(e,t);this.updateTokensAndExpiration(r,s,Number(o))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:s,expirationTime:o}=t,a=new $n;return r&&(L(typeof r=="string","internal-error",{appName:e}),a.refreshToken=r),s&&(L(typeof s=="string","internal-error",{appName:e}),a.accessToken=s),o&&(L(typeof o=="number","internal-error",{appName:e}),a.expirationTime=o),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new $n,this.toJSON())}_performRefresh(){return Pt("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gt(n,e){L(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class ct{constructor({uid:e,auth:t,stsTokenManager:r,...s}){this.providerId="firebase",this.proactiveRefresh=new Md(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new Li(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await kr(this,this.stsTokenManager.getToken(this.auth,e));return L(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return Vd(this,e)}reload(){return Ld(this)}_assign(e){this!==e&&(L(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new ct({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){L(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await Ns(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(_t(this.auth.app))return Promise.reject(gn(this.auth));const e=await this.getIdToken();return await kr(this,Od(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const r=t.displayName??void 0,s=t.email??void 0,o=t.phoneNumber??void 0,a=t.photoURL??void 0,u=t.tenantId??void 0,h=t._redirectEventId??void 0,f=t.createdAt??void 0,_=t.lastLoginAt??void 0,{uid:v,emailVerified:b,isAnonymous:P,providerData:N,stsTokenManager:M}=t;L(v&&M,e,"internal-error");const x=$n.fromJSON(this.name,M);L(typeof v=="string",e,"internal-error"),Gt(r,e.name),Gt(s,e.name),L(typeof b=="boolean",e,"internal-error"),L(typeof P=="boolean",e,"internal-error"),Gt(o,e.name),Gt(a,e.name),Gt(u,e.name),Gt(h,e.name),Gt(f,e.name),Gt(_,e.name);const W=new ct({uid:v,auth:e,email:s,emailVerified:b,displayName:r,isAnonymous:P,photoURL:a,phoneNumber:o,tenantId:u,stsTokenManager:x,createdAt:f,lastLoginAt:_});return N&&Array.isArray(N)&&(W.providerData=N.map(G=>({...G}))),h&&(W._redirectEventId=h),W}static async _fromIdTokenResponse(e,t,r=!1){const s=new $n;s.updateFromServerResponse(t);const o=new ct({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await Ns(o),o}static async _fromGetAccountInfoResponse(e,t,r){const s=t.users[0];L(s.localId!==void 0,"internal-error");const o=s.providerUserInfo!==void 0?Gl(s.providerUserInfo):[],a=!(s.email&&s.passwordHash)&&!(o!=null&&o.length),u=new $n;u.updateFromIdToken(r);const h=new ct({uid:s.localId,auth:e,stsTokenManager:u,isAnonymous:a}),f={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:o,metadata:new Li(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(o!=null&&o.length)};return Object.assign(h,f),h}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const va=new Map;function kt(n){xt(n instanceof Function,"Expected a class definition");let e=va.get(n);return e?(xt(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,va.set(n,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hl{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Hl.type="NONE";const Ta=Hl;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Es(n,e,t){return`firebase:${n}:${e}:${t}`}class qn{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:s,name:o}=this.auth;this.fullUserKey=Es(this.userKey,s.apiKey,o),this.fullPersistenceKey=Es("persistence",s.apiKey,o),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await ks(this.auth,{idToken:e}).catch(()=>{});return t?ct._fromGetAccountInfoResponse(this.auth,t,e):null}return ct._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new qn(kt(Ta),e,r);const s=(await Promise.all(t.map(async f=>{if(await f._isAvailable())return f}))).filter(f=>f);let o=s[0]||kt(Ta);const a=Es(r,e.config.apiKey,e.name);let u=null;for(const f of t)try{const _=await f._get(a);if(_){let v;if(typeof _=="string"){const b=await ks(e,{idToken:_}).catch(()=>{});if(!b)break;v=await ct._fromGetAccountInfoResponse(e,b,_)}else v=ct._fromJSON(e,_);f!==o&&(u=v),o=f;break}}catch{}const h=s.filter(f=>f._shouldAllowMigration);return!o._shouldAllowMigration||!h.length?new qn(o,e,r):(o=h[0],u&&await o._set(a,u.toJSON()),await Promise.all(t.map(async f=>{if(f!==o)try{await f._remove(a)}catch{}})),new qn(o,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wa(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Ql(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(zl(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Xl(e))return"Blackberry";if(Yl(e))return"Webos";if(Wl(e))return"Safari";if((e.includes("chrome/")||Kl(e))&&!e.includes("edge/"))return"Chrome";if(Jl(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function zl(n=$e()){return/firefox\//i.test(n)}function Wl(n=$e()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Kl(n=$e()){return/crios\//i.test(n)}function Ql(n=$e()){return/iemobile/i.test(n)}function Jl(n=$e()){return/android/i.test(n)}function Xl(n=$e()){return/blackberry/i.test(n)}function Yl(n=$e()){return/webos/i.test(n)}function so(n=$e()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function jd(n=$e()){var e;return so(n)&&!!((e=window.navigator)!=null&&e.standalone)}function $d(){return nh()&&document.documentMode===10}function Zl(n=$e()){return so(n)||Jl(n)||Yl(n)||Xl(n)||/windows phone/i.test(n)||Ql(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ec(n,e=[]){let t;switch(n){case"Browser":t=wa($e());break;case"Worker":t=`${wa($e())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${er}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qd{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=o=>new Promise((a,u)=>{try{const h=e(o);a(h)}catch(h){u(h)}});r.onAbort=t,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Gd(n,e={}){return tr(n,"GET","/v2/passwordPolicy",no(n,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hd=6;class zd{constructor(e){var r;const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??Hd,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((r=e.allowedNonAlphanumericCharacters)==null?void 0:r.join(""))??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,s,o){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=o))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wd{constructor(e,t,r,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Aa(this),this.idTokenSubscription=new Aa(this),this.beforeStateQueue=new qd(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Fl,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(o=>this._resolvePersistenceManagerAvailable=o)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=kt(t)),this._initializationPromise=this.queue(async()=>{var r,s,o;if(!this._deleted&&(this.persistenceManager=await qn.create(this,e),(r=this._resolvePersistenceManagerAvailable)==null||r.call(this),!this._deleted)){if((s=this._popupRedirectResolver)!=null&&s._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((o=this.currentUser)==null?void 0:o.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await ks(this,{idToken:e}),r=await ct._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var o;if(_t(this.app)){const a=this.app.settings.authIdToken;return a?new Promise(u=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(a).then(u,u))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let r=t,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const a=(o=this.redirectUser)==null?void 0:o._redirectEventId,u=r==null?void 0:r._redirectEventId,h=await this.tryRedirectSignIn(e);(!a||a===u)&&(h!=null&&h.user)&&(r=h.user,s=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(r)}catch(a){r=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(a))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return L(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Ns(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Cd()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(_t(this.app))return Promise.reject(gn(this));const t=e?ht(e):null;return t&&L(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&L(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return _t(this.app)?Promise.reject(gn(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return _t(this.app)?Promise.reject(gn(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(kt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await Gd(this),t=new zd(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new Mr("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await Ud(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)==null?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&kt(e)||this._popupRedirectResolver;L(t,this,"argument-error"),this.redirectPersistenceManager=await qn.create(this,[kt(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)==null?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)==null?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=((t=this.currentUser)==null?void 0:t.uid)??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,s){if(this._deleted)return()=>{};const o=typeof t=="function"?t:t.next.bind(t);let a=!1;const u=this._isInitialized?Promise.resolve():this._initializationPromise;if(L(u,this,"internal-error"),u.then(()=>{a||o(this.currentUser)}),typeof t=="function"){const h=e.addObserver(t,r,s);return()=>{a=!0,h()}}else{const h=e.addObserver(t);return()=>{a=!0,h()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return L(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=ec(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var s;const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await((s=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:s.getHeartbeatsHeader());t&&(e["X-Firebase-Client"]=t);const r=await this._getAppCheckToken();return r&&(e["X-Firebase-AppCheck"]=r),e}async _getAppCheckToken(){var t;if(_t(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await((t=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:t.getToken());return e!=null&&e.error&&Ad(`Error while retrieving App Check token: ${e.error}`),e==null?void 0:e.token}}function io(n){return ht(n)}class Aa{constructor(e){this.auth=e,this.observer=null,this.addObserver=uh(t=>this.observer=t)}get next(){return L(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let oo={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Kd(n){oo=n}function Qd(n){return oo.loadJS(n)}function Jd(){return oo.gapiScript}function Xd(n){return`__${n}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yd(n,e){const t=Zi(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),o=t.getOptions();if(En(o,e??{}))return s;Vt(s,"already-initialized")}return t.initialize({options:e})}function Zd(n,e){const t=(e==null?void 0:e.persistence)||[],r=(Array.isArray(t)?t:[t]).map(kt);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function ef(n,e,t){const r=io(n);L(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,o=tc(e),{host:a,port:u}=tf(e),h=u===null?"":`:${u}`,f={url:`${o}//${a}${h}/`},_=Object.freeze({host:a,port:u,protocol:o.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!r._canInitEmulator){L(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),L(En(f,r.config.emulator)&&En(_,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=f,r.emulatorConfig=_,r.settings.appVerificationDisabledForTesting=!0,Br(a)?Nl(`${o}//${a}${h}`):nf()}function tc(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function tf(n){const e=tc(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const o=s[1];return{host:o,port:Sa(r.substr(o.length+1))}}else{const[o,a]=r.split(":");return{host:o,port:Sa(a)}}}function Sa(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function nf(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nc{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Pt("not implemented")}_getIdTokenResponse(e){return Pt("not implemented")}_linkToIdToken(e,t){return Pt("not implemented")}_getReauthenticationResolver(e){return Pt("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Gn(n,e){return Nd(n,"POST","/v1/accounts:signInWithIdp",no(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rf="http://localhost";class vn extends nc{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new vn(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):Vt("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s,...o}=t;if(!r||!s)return null;const a=new vn(r,s);return a.idToken=o.idToken||void 0,a.accessToken=o.accessToken||void 0,a.secret=o.secret,a.nonce=o.nonce,a.pendingToken=o.pendingToken||null,a}_getIdTokenResponse(e){const t=this.buildRequest();return Gn(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,Gn(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Gn(e,t)}buildRequest(){const e={requestUri:rf,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Lr(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rc{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ur extends rc{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ht extends Ur{constructor(){super("facebook.com")}static credential(e){return vn._fromParams({providerId:Ht.PROVIDER_ID,signInMethod:Ht.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Ht.credentialFromTaggedObject(e)}static credentialFromError(e){return Ht.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Ht.credential(e.oauthAccessToken)}catch{return null}}}Ht.FACEBOOK_SIGN_IN_METHOD="facebook.com";Ht.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zt extends Ur{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return vn._fromParams({providerId:zt.PROVIDER_ID,signInMethod:zt.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return zt.credentialFromTaggedObject(e)}static credentialFromError(e){return zt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return zt.credential(t,r)}catch{return null}}}zt.GOOGLE_SIGN_IN_METHOD="google.com";zt.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wt extends Ur{constructor(){super("github.com")}static credential(e){return vn._fromParams({providerId:Wt.PROVIDER_ID,signInMethod:Wt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Wt.credentialFromTaggedObject(e)}static credentialFromError(e){return Wt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Wt.credential(e.oauthAccessToken)}catch{return null}}}Wt.GITHUB_SIGN_IN_METHOD="github.com";Wt.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kt extends Ur{constructor(){super("twitter.com")}static credential(e,t){return vn._fromParams({providerId:Kt.PROVIDER_ID,signInMethod:Kt.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Kt.credentialFromTaggedObject(e)}static credentialFromError(e){return Kt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return Kt.credential(t,r)}catch{return null}}}Kt.TWITTER_SIGN_IN_METHOD="twitter.com";Kt.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qn{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,s=!1){const o=await ct._fromIdTokenResponse(e,r,s),a=ba(r);return new Qn({user:o,providerId:a,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const s=ba(r);return new Qn({user:e,providerId:s,_tokenResponse:r,operationType:t})}}function ba(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ds extends Mt{constructor(e,t,r,s){super(t.code,t.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,Ds.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,s){return new Ds(e,t,r,s)}}function sc(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(o=>{throw o.code==="auth/multi-factor-auth-required"?Ds._fromErrorAndOperation(n,o,e,r):o})}async function sf(n,e,t=!1){const r=await kr(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return Qn._forOperation(n,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function of(n,e,t=!1){const{auth:r}=n;if(_t(r.app))return Promise.reject(gn(r));const s="reauthenticate";try{const o=await kr(n,sc(r,s,e,n),t);L(o.idToken,r,"internal-error");const a=ro(o.idToken);L(a,r,"internal-error");const{sub:u}=a;return L(n.uid===u,r,"user-mismatch"),Qn._forOperation(n,s,o)}catch(o){throw(o==null?void 0:o.code)==="auth/user-not-found"&&Vt(r,"user-mismatch"),o}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function af(n,e,t=!1){if(_t(n.app))return Promise.reject(gn(n));const r="signIn",s=await sc(n,r,e),o=await Qn._fromIdTokenResponse(n,r,s);return t||await n._updateCurrentUser(o.user),o}function lf(n,e,t,r){return ht(n).onIdTokenChanged(e,t,r)}function cf(n,e,t){return ht(n).beforeAuthStateChanged(e,t)}const Os="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ic{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Os,"1"),this.storage.removeItem(Os),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uf=1e3,hf=10;class oc extends ic{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Zl(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),s=this.localCache[t];r!==s&&e(t,s,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,u,h)=>{this.notifyListeners(a,h)});return}const r=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const a=this.storage.getItem(r);!t&&this.localCache[r]===a||this.notifyListeners(r,a)},o=this.storage.getItem(r);$d()&&o!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,hf):s()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},uf)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}oc.type="LOCAL";const df=oc;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ac extends ic{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}ac.type="SESSION";const lc=ac;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ff(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ks{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const r=new Ks(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:s,data:o}=t.data,a=this.handlersMap[s];if(!(a!=null&&a.size))return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const u=Array.from(a).map(async f=>f(t.origin,o)),h=await ff(u);t.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:h})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Ks.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ao(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pf{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let o,a;return new Promise((u,h)=>{const f=ao("",20);s.port1.start();const _=setTimeout(()=>{h(new Error("unsupported_event"))},r);a={messageChannel:s,onMessage(v){const b=v;if(b.data.eventId===f)switch(b.data.status){case"ack":clearTimeout(_),o=setTimeout(()=>{h(new Error("timeout"))},3e3);break;case"done":clearTimeout(o),u(b.data.response);break;default:clearTimeout(_),clearTimeout(o),h(new Error("invalid_response"));break}}},this.handlers.add(a),s.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:f,data:t},[s.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function It(){return window}function mf(n){It().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cc(){return typeof It().WorkerGlobalScope<"u"&&typeof It().importScripts=="function"}async function gf(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function yf(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)==null?void 0:n.controller)||null}function _f(){return cc()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uc="firebaseLocalStorageDb",Ef=1,Vs="firebaseLocalStorage",hc="fbase_key";class jr{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Qs(n,e){return n.transaction([Vs],e?"readwrite":"readonly").objectStore(Vs)}function If(){const n=indexedDB.deleteDatabase(uc);return new jr(n).toPromise()}function Bi(){const n=indexedDB.open(uc,Ef);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(Vs,{keyPath:hc})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(Vs)?e(r):(r.close(),await If(),e(await Bi()))})})}async function Ca(n,e,t){const r=Qs(n,!0).put({[hc]:e,value:t});return new jr(r).toPromise()}async function vf(n,e){const t=Qs(n,!1).get(e),r=await new jr(t).toPromise();return r===void 0?null:r.value}function Ra(n,e){const t=Qs(n,!0).delete(e);return new jr(t).toPromise()}const Tf=800,wf=3;class dc{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Bi(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>wf)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return cc()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Ks._getInstance(_f()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var t,r;if(this.activeServiceWorker=await gf(),!this.activeServiceWorker)return;this.sender=new pf(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&(t=e[0])!=null&&t.fulfilled&&(r=e[0])!=null&&r.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||yf()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Bi();return await Ca(e,Os,"1"),await Ra(e,Os),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>Ca(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>vf(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Ra(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const o=Qs(s,!1).getAll();return new jr(o).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:o}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(o)&&(this.notifyListeners(s,o),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Tf)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}dc.type="LOCAL";const Af=dc;new Fr(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sf(n,e){return e?kt(e):(L(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lo extends nc{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Gn(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Gn(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Gn(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function bf(n){return af(n.auth,new lo(n),n.bypassAuthState)}function Cf(n){const{auth:e,user:t}=n;return L(t,e,"internal-error"),of(t,new lo(n),n.bypassAuthState)}async function Rf(n){const{auth:e,user:t}=n;return L(t,e,"internal-error"),sf(t,new lo(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fc{constructor(e,t,r,s,o=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=o,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:s,tenantId:o,error:a,type:u}=e;if(a){this.reject(a);return}const h={auth:this.auth,requestUri:t,sessionId:r,tenantId:o||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(u)(h))}catch(f){this.reject(f)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return bf;case"linkViaPopup":case"linkViaRedirect":return Rf;case"reauthViaPopup":case"reauthViaRedirect":return Cf;default:Vt(this.auth,"internal-error")}}resolve(e){xt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){xt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pf=new Fr(2e3,1e4);class jn extends fc{constructor(e,t,r,s,o){super(e,t,s,o),this.provider=r,this.authWindow=null,this.pollId=null,jn.currentPopupAction&&jn.currentPopupAction.cancel(),jn.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return L(e,this.auth,"internal-error"),e}async onExecution(){xt(this.filter.length===1,"Popup operations only handle one event");const e=ao();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Et(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)==null?void 0:e.associatedEvent)||null}cancel(){this.reject(Et(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,jn.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if((r=(t=this.authWindow)==null?void 0:t.window)!=null&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Et(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,Pf.get())};e()}}jn.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kf="pendingRedirect",Is=new Map;class Nf extends fc{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=Is.get(this.auth._key());if(!e){try{const r=await Df(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}Is.set(this.auth._key(),e)}return this.bypassAuthState||Is.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Df(n,e){const t=xf(e),r=Vf(n);if(!await r._isAvailable())return!1;const s=await r._get(t)==="true";return await r._remove(t),s}function Of(n,e){Is.set(n._key(),e)}function Vf(n){return kt(n._redirectPersistence)}function xf(n){return Es(kf,n.config.apiKey,n.name)}async function Mf(n,e,t=!1){if(_t(n.app))return Promise.reject(gn(n));const r=io(n),s=Sf(r,e),a=await new Nf(r,s,t).execute();return a&&!t&&(delete a.user._redirectEventId,await r._persistUserIfCurrent(a.user),await r._setRedirectUser(null,e)),a}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lf=600*1e3;class Bf{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Ff(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!pc(e)){const s=((r=e.error.code)==null?void 0:r.split("auth/")[1])||"internal-error";t.onError(Et(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Lf&&this.cachedEventUids.clear(),this.cachedEventUids.has(Pa(e))}saveEventToCache(e){this.cachedEventUids.add(Pa(e)),this.lastProcessedEventTime=Date.now()}}function Pa(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function pc({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function Ff(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return pc(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Uf(n,e={}){return tr(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jf=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,$f=/^https?/;async function qf(n){if(n.config.emulator)return;const{authorizedDomains:e}=await Uf(n);for(const t of e)try{if(Gf(t))return}catch{}Vt(n,"unauthorized-domain")}function Gf(n){const e=Mi(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const a=new URL(n);return a.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===r}if(!$f.test(t))return!1;if(jf.test(n))return r===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hf=new Fr(3e4,6e4);function ka(){const n=It().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function zf(n){return new Promise((e,t)=>{var s,o,a;function r(){ka(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{ka(),t(Et(n,"network-request-failed"))},timeout:Hf.get()})}if((o=(s=It().gapi)==null?void 0:s.iframes)!=null&&o.Iframe)e(gapi.iframes.getContext());else if((a=It().gapi)!=null&&a.load)r();else{const u=Xd("iframefcb");return It()[u]=()=>{gapi.load?r():t(Et(n,"network-request-failed"))},Qd(`${Jd()}?onload=${u}`).catch(h=>t(h))}}).catch(e=>{throw vs=null,e})}let vs=null;function Wf(n){return vs=vs||zf(n),vs}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kf=new Fr(5e3,15e3),Qf="__/auth/iframe",Jf="emulator/auth/iframe",Xf={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Yf=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Zf(n){const e=n.config;L(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?to(e,Jf):`https://${n.config.authDomain}/${Qf}`,r={apiKey:e.apiKey,appName:n.name,v:er},s=Yf.get(n.config.apiHost);s&&(r.eid=s);const o=n._getFrameworks();return o.length&&(r.fw=o.join(",")),`${t}?${Lr(r).slice(1)}`}async function ep(n){const e=await Wf(n),t=It().gapi;return L(t,n,"internal-error"),e.open({where:document.body,url:Zf(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Xf,dontclear:!0},r=>new Promise(async(s,o)=>{await r.restyle({setHideOnLeave:!1});const a=Et(n,"network-request-failed"),u=It().setTimeout(()=>{o(a)},Kf.get());function h(){It().clearTimeout(u),s(r)}r.ping(h).then(h,()=>{o(a)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tp={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},np=500,rp=600,sp="_blank",ip="http://localhost";class Na{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function op(n,e,t,r=np,s=rp){const o=Math.max((window.screen.availHeight-s)/2,0).toString(),a=Math.max((window.screen.availWidth-r)/2,0).toString();let u="";const h={...tp,width:r.toString(),height:s.toString(),top:o,left:a},f=$e().toLowerCase();t&&(u=Kl(f)?sp:t),zl(f)&&(e=e||ip,h.scrollbars="yes");const _=Object.entries(h).reduce((b,[P,N])=>`${b}${P}=${N},`,"");if(jd(f)&&u!=="_self")return ap(e||"",u),new Na(null);const v=window.open(e||"",u,_);L(v,n,"popup-blocked");try{v.focus()}catch{}return new Na(v)}function ap(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lp="__/auth/handler",cp="emulator/auth/handler",up=encodeURIComponent("fac");async function Da(n,e,t,r,s,o){L(n.config.authDomain,n,"auth-domain-config-required"),L(n.config.apiKey,n,"invalid-api-key");const a={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:er,eventId:s};if(e instanceof rc){e.setDefaultLanguage(n.languageCode),a.providerId=e.providerId||"",ch(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[_,v]of Object.entries({}))a[_]=v}if(e instanceof Ur){const _=e.getScopes().filter(v=>v!=="");_.length>0&&(a.scopes=_.join(","))}n.tenantId&&(a.tid=n.tenantId);const u=a;for(const _ of Object.keys(u))u[_]===void 0&&delete u[_];const h=await n._getAppCheckToken(),f=h?`#${up}=${encodeURIComponent(h)}`:"";return`${hp(n)}?${Lr(u).slice(1)}${f}`}function hp({config:n}){return n.emulator?to(n,cp):`https://${n.authDomain}/${lp}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Si="webStorageSupport";class dp{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=lc,this._completeRedirectFn=Mf,this._overrideRedirectResult=Of}async _openPopup(e,t,r,s){var a;xt((a=this.eventManagers[e._key()])==null?void 0:a.manager,"_initialize() not called before _openPopup()");const o=await Da(e,t,r,Mi(),s);return op(e,o,ao())}async _openRedirect(e,t,r,s){await this._originValidation(e);const o=await Da(e,t,r,Mi(),s);return mf(o),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:o}=this.eventManagers[t];return s?Promise.resolve(s):(xt(o,"If manager is not set, promise should be"),o)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await ep(e),r=new Bf(e);return t.register("authEvent",s=>(L(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Si,{type:Si},s=>{var a;const o=(a=s==null?void 0:s[0])==null?void 0:a[Si];o!==void 0&&t(!!o),Vt(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=qf(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Zl()||Wl()||so()}}const fp=dp;var Oa="@firebase/auth",Va="1.13.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pp{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)==null?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){L(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mp(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function gp(n){Kn(new In("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),o=e.getProvider("app-check-internal"),{apiKey:a,authDomain:u}=r.options;L(a&&!a.includes(":"),"invalid-api-key",{appName:r.name});const h={apiKey:a,authDomain:u,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:ec(n)},f=new Wd(r,s,o,h);return Zd(f,t),f},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),Kn(new In("auth-internal",e=>{const t=io(e.getProvider("auth").getImmediate());return(r=>new pp(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Xt(Oa,Va,mp(n)),Xt(Oa,Va,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yp=300,_p=kl("authIdTokenMaxAge")||yp;let xa=null;const Ep=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>_p)return;const s=t==null?void 0:t.token;xa!==s&&(xa=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function Ip(n=xl()){const e=Zi(n,"auth");if(e.isInitialized())return e.getImmediate();const t=Yd(n,{popupRedirectResolver:fp,persistence:[Af,df,lc]}),r=kl("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const o=new URL(r,location.origin);if(location.origin===o.origin){const a=Ep(o.toString());cf(t,a,()=>a(t.currentUser)),lf(t,u=>a(u))}}const s=Rl("auth");return s&&ef(t,`http://${s}`),t}function vp(){var n;return((n=document.getElementsByTagName("head"))==null?void 0:n[0])??document}Kd({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=s=>{const o=Et("internal-error");o.customData=s,t(o)},r.type="text/javascript",r.charset="UTF-8",vp().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});gp("Browser");var Ma=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var co;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(E,p){function y(){}y.prototype=p.prototype,E.F=p.prototype,E.prototype=new y,E.prototype.constructor=E,E.D=function(I,m,w){for(var g=Array(arguments.length-2),Ce=2;Ce<arguments.length;Ce++)g[Ce-2]=arguments[Ce];return p.prototype[m].apply(I,g)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(r,t),r.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(E,p,y){y||(y=0);const I=Array(16);if(typeof p=="string")for(var m=0;m<16;++m)I[m]=p.charCodeAt(y++)|p.charCodeAt(y++)<<8|p.charCodeAt(y++)<<16|p.charCodeAt(y++)<<24;else for(m=0;m<16;++m)I[m]=p[y++]|p[y++]<<8|p[y++]<<16|p[y++]<<24;p=E.g[0],y=E.g[1],m=E.g[2];let w=E.g[3],g;g=p+(w^y&(m^w))+I[0]+3614090360&4294967295,p=y+(g<<7&4294967295|g>>>25),g=w+(m^p&(y^m))+I[1]+3905402710&4294967295,w=p+(g<<12&4294967295|g>>>20),g=m+(y^w&(p^y))+I[2]+606105819&4294967295,m=w+(g<<17&4294967295|g>>>15),g=y+(p^m&(w^p))+I[3]+3250441966&4294967295,y=m+(g<<22&4294967295|g>>>10),g=p+(w^y&(m^w))+I[4]+4118548399&4294967295,p=y+(g<<7&4294967295|g>>>25),g=w+(m^p&(y^m))+I[5]+1200080426&4294967295,w=p+(g<<12&4294967295|g>>>20),g=m+(y^w&(p^y))+I[6]+2821735955&4294967295,m=w+(g<<17&4294967295|g>>>15),g=y+(p^m&(w^p))+I[7]+4249261313&4294967295,y=m+(g<<22&4294967295|g>>>10),g=p+(w^y&(m^w))+I[8]+1770035416&4294967295,p=y+(g<<7&4294967295|g>>>25),g=w+(m^p&(y^m))+I[9]+2336552879&4294967295,w=p+(g<<12&4294967295|g>>>20),g=m+(y^w&(p^y))+I[10]+4294925233&4294967295,m=w+(g<<17&4294967295|g>>>15),g=y+(p^m&(w^p))+I[11]+2304563134&4294967295,y=m+(g<<22&4294967295|g>>>10),g=p+(w^y&(m^w))+I[12]+1804603682&4294967295,p=y+(g<<7&4294967295|g>>>25),g=w+(m^p&(y^m))+I[13]+4254626195&4294967295,w=p+(g<<12&4294967295|g>>>20),g=m+(y^w&(p^y))+I[14]+2792965006&4294967295,m=w+(g<<17&4294967295|g>>>15),g=y+(p^m&(w^p))+I[15]+1236535329&4294967295,y=m+(g<<22&4294967295|g>>>10),g=p+(m^w&(y^m))+I[1]+4129170786&4294967295,p=y+(g<<5&4294967295|g>>>27),g=w+(y^m&(p^y))+I[6]+3225465664&4294967295,w=p+(g<<9&4294967295|g>>>23),g=m+(p^y&(w^p))+I[11]+643717713&4294967295,m=w+(g<<14&4294967295|g>>>18),g=y+(w^p&(m^w))+I[0]+3921069994&4294967295,y=m+(g<<20&4294967295|g>>>12),g=p+(m^w&(y^m))+I[5]+3593408605&4294967295,p=y+(g<<5&4294967295|g>>>27),g=w+(y^m&(p^y))+I[10]+38016083&4294967295,w=p+(g<<9&4294967295|g>>>23),g=m+(p^y&(w^p))+I[15]+3634488961&4294967295,m=w+(g<<14&4294967295|g>>>18),g=y+(w^p&(m^w))+I[4]+3889429448&4294967295,y=m+(g<<20&4294967295|g>>>12),g=p+(m^w&(y^m))+I[9]+568446438&4294967295,p=y+(g<<5&4294967295|g>>>27),g=w+(y^m&(p^y))+I[14]+3275163606&4294967295,w=p+(g<<9&4294967295|g>>>23),g=m+(p^y&(w^p))+I[3]+4107603335&4294967295,m=w+(g<<14&4294967295|g>>>18),g=y+(w^p&(m^w))+I[8]+1163531501&4294967295,y=m+(g<<20&4294967295|g>>>12),g=p+(m^w&(y^m))+I[13]+2850285829&4294967295,p=y+(g<<5&4294967295|g>>>27),g=w+(y^m&(p^y))+I[2]+4243563512&4294967295,w=p+(g<<9&4294967295|g>>>23),g=m+(p^y&(w^p))+I[7]+1735328473&4294967295,m=w+(g<<14&4294967295|g>>>18),g=y+(w^p&(m^w))+I[12]+2368359562&4294967295,y=m+(g<<20&4294967295|g>>>12),g=p+(y^m^w)+I[5]+4294588738&4294967295,p=y+(g<<4&4294967295|g>>>28),g=w+(p^y^m)+I[8]+2272392833&4294967295,w=p+(g<<11&4294967295|g>>>21),g=m+(w^p^y)+I[11]+1839030562&4294967295,m=w+(g<<16&4294967295|g>>>16),g=y+(m^w^p)+I[14]+4259657740&4294967295,y=m+(g<<23&4294967295|g>>>9),g=p+(y^m^w)+I[1]+2763975236&4294967295,p=y+(g<<4&4294967295|g>>>28),g=w+(p^y^m)+I[4]+1272893353&4294967295,w=p+(g<<11&4294967295|g>>>21),g=m+(w^p^y)+I[7]+4139469664&4294967295,m=w+(g<<16&4294967295|g>>>16),g=y+(m^w^p)+I[10]+3200236656&4294967295,y=m+(g<<23&4294967295|g>>>9),g=p+(y^m^w)+I[13]+681279174&4294967295,p=y+(g<<4&4294967295|g>>>28),g=w+(p^y^m)+I[0]+3936430074&4294967295,w=p+(g<<11&4294967295|g>>>21),g=m+(w^p^y)+I[3]+3572445317&4294967295,m=w+(g<<16&4294967295|g>>>16),g=y+(m^w^p)+I[6]+76029189&4294967295,y=m+(g<<23&4294967295|g>>>9),g=p+(y^m^w)+I[9]+3654602809&4294967295,p=y+(g<<4&4294967295|g>>>28),g=w+(p^y^m)+I[12]+3873151461&4294967295,w=p+(g<<11&4294967295|g>>>21),g=m+(w^p^y)+I[15]+530742520&4294967295,m=w+(g<<16&4294967295|g>>>16),g=y+(m^w^p)+I[2]+3299628645&4294967295,y=m+(g<<23&4294967295|g>>>9),g=p+(m^(y|~w))+I[0]+4096336452&4294967295,p=y+(g<<6&4294967295|g>>>26),g=w+(y^(p|~m))+I[7]+1126891415&4294967295,w=p+(g<<10&4294967295|g>>>22),g=m+(p^(w|~y))+I[14]+2878612391&4294967295,m=w+(g<<15&4294967295|g>>>17),g=y+(w^(m|~p))+I[5]+4237533241&4294967295,y=m+(g<<21&4294967295|g>>>11),g=p+(m^(y|~w))+I[12]+1700485571&4294967295,p=y+(g<<6&4294967295|g>>>26),g=w+(y^(p|~m))+I[3]+2399980690&4294967295,w=p+(g<<10&4294967295|g>>>22),g=m+(p^(w|~y))+I[10]+4293915773&4294967295,m=w+(g<<15&4294967295|g>>>17),g=y+(w^(m|~p))+I[1]+2240044497&4294967295,y=m+(g<<21&4294967295|g>>>11),g=p+(m^(y|~w))+I[8]+1873313359&4294967295,p=y+(g<<6&4294967295|g>>>26),g=w+(y^(p|~m))+I[15]+4264355552&4294967295,w=p+(g<<10&4294967295|g>>>22),g=m+(p^(w|~y))+I[6]+2734768916&4294967295,m=w+(g<<15&4294967295|g>>>17),g=y+(w^(m|~p))+I[13]+1309151649&4294967295,y=m+(g<<21&4294967295|g>>>11),g=p+(m^(y|~w))+I[4]+4149444226&4294967295,p=y+(g<<6&4294967295|g>>>26),g=w+(y^(p|~m))+I[11]+3174756917&4294967295,w=p+(g<<10&4294967295|g>>>22),g=m+(p^(w|~y))+I[2]+718787259&4294967295,m=w+(g<<15&4294967295|g>>>17),g=y+(w^(m|~p))+I[9]+3951481745&4294967295,E.g[0]=E.g[0]+p&4294967295,E.g[1]=E.g[1]+(m+(g<<21&4294967295|g>>>11))&4294967295,E.g[2]=E.g[2]+m&4294967295,E.g[3]=E.g[3]+w&4294967295}r.prototype.v=function(E,p){p===void 0&&(p=E.length);const y=p-this.blockSize,I=this.C;let m=this.h,w=0;for(;w<p;){if(m==0)for(;w<=y;)s(this,E,w),w+=this.blockSize;if(typeof E=="string"){for(;w<p;)if(I[m++]=E.charCodeAt(w++),m==this.blockSize){s(this,I),m=0;break}}else for(;w<p;)if(I[m++]=E[w++],m==this.blockSize){s(this,I),m=0;break}}this.h=m,this.o+=p},r.prototype.A=function(){var E=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);E[0]=128;for(var p=1;p<E.length-8;++p)E[p]=0;p=this.o*8;for(var y=E.length-8;y<E.length;++y)E[y]=p&255,p/=256;for(this.v(E),E=Array(16),p=0,y=0;y<4;++y)for(let I=0;I<32;I+=8)E[p++]=this.g[y]>>>I&255;return E};function o(E,p){var y=u;return Object.prototype.hasOwnProperty.call(y,E)?y[E]:y[E]=p(E)}function a(E,p){this.h=p;const y=[];let I=!0;for(let m=E.length-1;m>=0;m--){const w=E[m]|0;I&&w==p||(y[m]=w,I=!1)}this.g=y}var u={};function h(E){return-128<=E&&E<128?o(E,function(p){return new a([p|0],p<0?-1:0)}):new a([E|0],E<0?-1:0)}function f(E){if(isNaN(E)||!isFinite(E))return v;if(E<0)return x(f(-E));const p=[];let y=1;for(let I=0;E>=y;I++)p[I]=E/y|0,y*=4294967296;return new a(p,0)}function _(E,p){if(E.length==0)throw Error("number format error: empty string");if(p=p||10,p<2||36<p)throw Error("radix out of range: "+p);if(E.charAt(0)=="-")return x(_(E.substring(1),p));if(E.indexOf("-")>=0)throw Error('number format error: interior "-" character');const y=f(Math.pow(p,8));let I=v;for(let w=0;w<E.length;w+=8){var m=Math.min(8,E.length-w);const g=parseInt(E.substring(w,w+m),p);m<8?(m=f(Math.pow(p,m)),I=I.j(m).add(f(g))):(I=I.j(y),I=I.add(f(g)))}return I}var v=h(0),b=h(1),P=h(16777216);n=a.prototype,n.m=function(){if(M(this))return-x(this).m();let E=0,p=1;for(let y=0;y<this.g.length;y++){const I=this.i(y);E+=(I>=0?I:4294967296+I)*p,p*=4294967296}return E},n.toString=function(E){if(E=E||10,E<2||36<E)throw Error("radix out of range: "+E);if(N(this))return"0";if(M(this))return"-"+x(this).toString(E);const p=f(Math.pow(E,6));var y=this;let I="";for(;;){const m=Ve(y,p).g;y=W(y,m.j(p));let w=((y.g.length>0?y.g[0]:y.h)>>>0).toString(E);if(y=m,N(y))return w+I;for(;w.length<6;)w="0"+w;I=w+I}},n.i=function(E){return E<0?0:E<this.g.length?this.g[E]:this.h};function N(E){if(E.h!=0)return!1;for(let p=0;p<E.g.length;p++)if(E.g[p]!=0)return!1;return!0}function M(E){return E.h==-1}n.l=function(E){return E=W(this,E),M(E)?-1:N(E)?0:1};function x(E){const p=E.g.length,y=[];for(let I=0;I<p;I++)y[I]=~E.g[I];return new a(y,~E.h).add(b)}n.abs=function(){return M(this)?x(this):this},n.add=function(E){const p=Math.max(this.g.length,E.g.length),y=[];let I=0;for(let m=0;m<=p;m++){let w=I+(this.i(m)&65535)+(E.i(m)&65535),g=(w>>>16)+(this.i(m)>>>16)+(E.i(m)>>>16);I=g>>>16,w&=65535,g&=65535,y[m]=g<<16|w}return new a(y,y[y.length-1]&-2147483648?-1:0)};function W(E,p){return E.add(x(p))}n.j=function(E){if(N(this)||N(E))return v;if(M(this))return M(E)?x(this).j(x(E)):x(x(this).j(E));if(M(E))return x(this.j(x(E)));if(this.l(P)<0&&E.l(P)<0)return f(this.m()*E.m());const p=this.g.length+E.g.length,y=[];for(var I=0;I<2*p;I++)y[I]=0;for(I=0;I<this.g.length;I++)for(let m=0;m<E.g.length;m++){const w=this.i(I)>>>16,g=this.i(I)&65535,Ce=E.i(m)>>>16,dt=E.i(m)&65535;y[2*I+2*m]+=g*dt,G(y,2*I+2*m),y[2*I+2*m+1]+=w*dt,G(y,2*I+2*m+1),y[2*I+2*m+1]+=g*Ce,G(y,2*I+2*m+1),y[2*I+2*m+2]+=w*Ce,G(y,2*I+2*m+2)}for(E=0;E<p;E++)y[E]=y[2*E+1]<<16|y[2*E];for(E=p;E<2*p;E++)y[E]=0;return new a(y,0)};function G(E,p){for(;(E[p]&65535)!=E[p];)E[p+1]+=E[p]>>>16,E[p]&=65535,p++}function X(E,p){this.g=E,this.h=p}function Ve(E,p){if(N(p))throw Error("division by zero");if(N(E))return new X(v,v);if(M(E))return p=Ve(x(E),p),new X(x(p.g),x(p.h));if(M(p))return p=Ve(E,x(p)),new X(x(p.g),p.h);if(E.g.length>30){if(M(E)||M(p))throw Error("slowDivide_ only works with positive integers.");for(var y=b,I=p;I.l(E)<=0;)y=pe(y),I=pe(I);var m=me(y,1),w=me(I,1);for(I=me(I,2),y=me(y,2);!N(I);){var g=w.add(I);g.l(E)<=0&&(m=m.add(y),w=g),I=me(I,1),y=me(y,1)}return p=W(E,m.j(p)),new X(m,p)}for(m=v;E.l(p)>=0;){for(y=Math.max(1,Math.floor(E.m()/p.m())),I=Math.ceil(Math.log(y)/Math.LN2),I=I<=48?1:Math.pow(2,I-48),w=f(y),g=w.j(p);M(g)||g.l(E)>0;)y-=I,w=f(y),g=w.j(p);N(w)&&(w=b),m=m.add(w),E=W(E,g)}return new X(m,E)}n.B=function(E){return Ve(this,E).h},n.and=function(E){const p=Math.max(this.g.length,E.g.length),y=[];for(let I=0;I<p;I++)y[I]=this.i(I)&E.i(I);return new a(y,this.h&E.h)},n.or=function(E){const p=Math.max(this.g.length,E.g.length),y=[];for(let I=0;I<p;I++)y[I]=this.i(I)|E.i(I);return new a(y,this.h|E.h)},n.xor=function(E){const p=Math.max(this.g.length,E.g.length),y=[];for(let I=0;I<p;I++)y[I]=this.i(I)^E.i(I);return new a(y,this.h^E.h)};function pe(E){const p=E.g.length+1,y=[];for(let I=0;I<p;I++)y[I]=E.i(I)<<1|E.i(I-1)>>>31;return new a(y,E.h)}function me(E,p){const y=p>>5;p%=32;const I=E.g.length-y,m=[];for(let w=0;w<I;w++)m[w]=p>0?E.i(w+y)>>>p|E.i(w+y+1)<<32-p:E.i(w+y);return new a(m,E.h)}r.prototype.digest=r.prototype.A,r.prototype.reset=r.prototype.u,r.prototype.update=r.prototype.v,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.B,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=f,a.fromString=_,co=a}).apply(typeof Ma<"u"?Ma:typeof self<"u"?self:typeof window<"u"?window:{});var cs=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var mc,vr,gc,Ts,Fi,yc,_c,Ec;(function(){var n,e=Object.defineProperty;function t(i){i=[typeof globalThis=="object"&&globalThis,i,typeof window=="object"&&window,typeof self=="object"&&self,typeof cs=="object"&&cs];for(var l=0;l<i.length;++l){var c=i[l];if(c&&c.Math==Math)return c}throw Error("Cannot find global object")}var r=t(this);function s(i,l){if(l)e:{var c=r;i=i.split(".");for(var d=0;d<i.length-1;d++){var T=i[d];if(!(T in c))break e;c=c[T]}i=i[i.length-1],d=c[i],l=l(d),l!=d&&l!=null&&e(c,i,{configurable:!0,writable:!0,value:l})}}s("Symbol.dispose",function(i){return i||Symbol("Symbol.dispose")}),s("Array.prototype.values",function(i){return i||function(){return this[Symbol.iterator]()}}),s("Object.entries",function(i){return i||function(l){var c=[],d;for(d in l)Object.prototype.hasOwnProperty.call(l,d)&&c.push([d,l[d]]);return c}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},a=this||self;function u(i){var l=typeof i;return l=="object"&&i!=null||l=="function"}function h(i,l,c){return i.call.apply(i.bind,arguments)}function f(i,l,c){return f=h,f.apply(null,arguments)}function _(i,l){var c=Array.prototype.slice.call(arguments,1);return function(){var d=c.slice();return d.push.apply(d,arguments),i.apply(this,d)}}function v(i,l){function c(){}c.prototype=l.prototype,i.Z=l.prototype,i.prototype=new c,i.prototype.constructor=i,i.Ob=function(d,T,A){for(var R=Array(arguments.length-2),F=2;F<arguments.length;F++)R[F-2]=arguments[F];return l.prototype[T].apply(d,R)}}var b=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?i=>i&&AsyncContext.Snapshot.wrap(i):i=>i;function P(i){const l=i.length;if(l>0){const c=Array(l);for(let d=0;d<l;d++)c[d]=i[d];return c}return[]}function N(i,l){for(let d=1;d<arguments.length;d++){const T=arguments[d];var c=typeof T;if(c=c!="object"?c:T?Array.isArray(T)?"array":c:"null",c=="array"||c=="object"&&typeof T.length=="number"){c=i.length||0;const A=T.length||0;i.length=c+A;for(let R=0;R<A;R++)i[c+R]=T[R]}else i.push(T)}}class M{constructor(l,c){this.i=l,this.j=c,this.h=0,this.g=null}get(){let l;return this.h>0?(this.h--,l=this.g,this.g=l.next,l.next=null):l=this.i(),l}}function x(i){a.setTimeout(()=>{throw i},0)}function W(){var i=E;let l=null;return i.g&&(l=i.g,i.g=i.g.next,i.g||(i.h=null),l.next=null),l}class G{constructor(){this.h=this.g=null}add(l,c){const d=X.get();d.set(l,c),this.h?this.h.next=d:this.g=d,this.h=d}}var X=new M(()=>new Ve,i=>i.reset());class Ve{constructor(){this.next=this.g=this.h=null}set(l,c){this.h=l,this.g=c,this.next=null}reset(){this.next=this.g=this.h=null}}let pe,me=!1,E=new G,p=()=>{const i=Promise.resolve(void 0);pe=()=>{i.then(y)}};function y(){for(var i;i=W();){try{i.h.call(i.g)}catch(c){x(c)}var l=X;l.j(i),l.h<100&&(l.h++,i.next=l.g,l.g=i)}me=!1}function I(){this.u=this.u,this.C=this.C}I.prototype.u=!1,I.prototype.dispose=function(){this.u||(this.u=!0,this.N())},I.prototype[Symbol.dispose]=function(){this.dispose()},I.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function m(i,l){this.type=i,this.g=this.target=l,this.defaultPrevented=!1}m.prototype.h=function(){this.defaultPrevented=!0};var w=(function(){if(!a.addEventListener||!Object.defineProperty)return!1;var i=!1,l=Object.defineProperty({},"passive",{get:function(){i=!0}});try{const c=()=>{};a.addEventListener("test",c,l),a.removeEventListener("test",c,l)}catch{}return i})();function g(i){return/^[\s\xa0]*$/.test(i)}function Ce(i,l){m.call(this,i?i.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,i&&this.init(i,l)}v(Ce,m),Ce.prototype.init=function(i,l){const c=this.type=i.type,d=i.changedTouches&&i.changedTouches.length?i.changedTouches[0]:null;this.target=i.target||i.srcElement,this.g=l,l=i.relatedTarget,l||(c=="mouseover"?l=i.fromElement:c=="mouseout"&&(l=i.toElement)),this.relatedTarget=l,d?(this.clientX=d.clientX!==void 0?d.clientX:d.pageX,this.clientY=d.clientY!==void 0?d.clientY:d.pageY,this.screenX=d.screenX||0,this.screenY=d.screenY||0):(this.clientX=i.clientX!==void 0?i.clientX:i.pageX,this.clientY=i.clientY!==void 0?i.clientY:i.pageY,this.screenX=i.screenX||0,this.screenY=i.screenY||0),this.button=i.button,this.key=i.key||"",this.ctrlKey=i.ctrlKey,this.altKey=i.altKey,this.shiftKey=i.shiftKey,this.metaKey=i.metaKey,this.pointerId=i.pointerId||0,this.pointerType=i.pointerType,this.state=i.state,this.i=i,i.defaultPrevented&&Ce.Z.h.call(this)},Ce.prototype.h=function(){Ce.Z.h.call(this);const i=this.i;i.preventDefault?i.preventDefault():i.returnValue=!1};var dt="closure_listenable_"+(Math.random()*1e6|0),Kr=0;function si(i,l,c,d,T){this.listener=i,this.proxy=null,this.src=l,this.type=c,this.capture=!!d,this.ha=T,this.key=++Kr,this.da=this.fa=!1}function Rn(i){i.da=!0,i.listener=null,i.proxy=null,i.src=null,i.ha=null}function sn(i,l,c){for(const d in i)l.call(c,i[d],d,i)}function ii(i,l){for(const c in i)l.call(void 0,i[c],c,i)}function Pn(i){const l={};for(const c in i)l[c]=i[c];return l}const kn="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function At(i,l){let c,d;for(let T=1;T<arguments.length;T++){d=arguments[T];for(c in d)i[c]=d[c];for(let A=0;A<kn.length;A++)c=kn[A],Object.prototype.hasOwnProperty.call(d,c)&&(i[c]=d[c])}}function ie(i){this.src=i,this.g={},this.h=0}ie.prototype.add=function(i,l,c,d,T){const A=i.toString();i=this.g[A],i||(i=this.g[A]=[],this.h++);const R=on(i,l,d,T);return R>-1?(l=i[R],c||(l.fa=!1)):(l=new si(l,this.src,A,!!d,T),l.fa=c,i.push(l)),l};function rt(i,l){const c=l.type;if(c in i.g){var d=i.g[c],T=Array.prototype.indexOf.call(d,l,void 0),A;(A=T>=0)&&Array.prototype.splice.call(d,T,1),A&&(Rn(l),i.g[c].length==0&&(delete i.g[c],i.h--))}}function on(i,l,c,d){for(let T=0;T<i.length;++T){const A=i[T];if(!A.da&&A.listener==l&&A.capture==!!c&&A.ha==d)return T}return-1}var sr="closure_lm_"+(Math.random()*1e6|0),Qr={};function Jr(i,l,c,d,T){if(Array.isArray(l)){for(let A=0;A<l.length;A++)Jr(i,l[A],c,d,T);return null}return c=ye(c),i&&i[dt]?i.J(l,c,u(d)?!!d.capture:!1,T):qe(i,l,c,!1,d,T)}function qe(i,l,c,d,T,A){if(!l)throw Error("Invalid event type");const R=u(T)?!!T.capture:!!T;let F=ne(i);if(F||(i[sr]=F=new ie(i)),c=F.add(l,c,d,R,A),c.proxy)return c;if(d=O(),c.proxy=d,d.src=i,d.listener=c,i.addEventListener)w||(T=R),T===void 0&&(T=!1),i.addEventListener(l.toString(),d,T);else if(i.attachEvent)i.attachEvent(K(l.toString()),d);else if(i.addListener&&i.removeListener)i.addListener(d);else throw Error("addEventListener and attachEvent are unavailable.");return c}function O(){function i(c){return l.call(i.src,i.listener,c)}const l=H;return i}function Z(i,l,c,d,T){if(Array.isArray(l))for(var A=0;A<l.length;A++)Z(i,l[A],c,d,T);else d=u(d)?!!d.capture:!!d,c=ye(c),i&&i[dt]?(i=i.i,A=String(l).toString(),A in i.g&&(l=i.g[A],c=on(l,c,d,T),c>-1&&(Rn(l[c]),Array.prototype.splice.call(l,c,1),l.length==0&&(delete i.g[A],i.h--)))):i&&(i=ne(i))&&(l=i.g[l.toString()],i=-1,l&&(i=on(l,c,d,T)),(c=i>-1?l[i]:null)&&le(c))}function le(i){if(typeof i!="number"&&i&&!i.da){var l=i.src;if(l&&l[dt])rt(l.i,i);else{var c=i.type,d=i.proxy;l.removeEventListener?l.removeEventListener(c,d,i.capture):l.detachEvent?l.detachEvent(K(c),d):l.addListener&&l.removeListener&&l.removeListener(d),(c=ne(l))?(rt(c,i),c.h==0&&(c.src=null,l[sr]=null)):Rn(i)}}}function K(i){return i in Qr?Qr[i]:Qr[i]="on"+i}function H(i,l){if(i.da)i=!0;else{l=new Ce(l,this);const c=i.listener,d=i.ha||i.src;i.fa&&le(i),i=c.call(d,l)}return i}function ne(i){return i=i[sr],i instanceof ie?i:null}var ge="__closure_events_fn_"+(Math.random()*1e9>>>0);function ye(i){return typeof i=="function"?i:(i[ge]||(i[ge]=function(l){return i.handleEvent(l)}),i[ge])}function k(){I.call(this),this.i=new ie(this),this.M=this,this.G=null}v(k,I),k.prototype[dt]=!0,k.prototype.removeEventListener=function(i,l,c,d){Z(this,i,l,c,d)};function $(i,l){var c,d=i.G;if(d)for(c=[];d;d=d.G)c.push(d);if(i=i.M,d=l.type||l,typeof l=="string")l=new m(l,i);else if(l instanceof m)l.target=l.target||i;else{var T=l;l=new m(d,i),At(l,T)}T=!0;let A,R;if(c)for(R=c.length-1;R>=0;R--)A=l.g=c[R],T=he(A,d,!0,l)&&T;if(A=l.g=i,T=he(A,d,!0,l)&&T,T=he(A,d,!1,l)&&T,c)for(R=0;R<c.length;R++)A=l.g=c[R],T=he(A,d,!1,l)&&T}k.prototype.N=function(){if(k.Z.N.call(this),this.i){var i=this.i;for(const l in i.g){const c=i.g[l];for(let d=0;d<c.length;d++)Rn(c[d]);delete i.g[l],i.h--}}this.G=null},k.prototype.J=function(i,l,c,d){return this.i.add(String(i),l,!1,c,d)},k.prototype.K=function(i,l,c,d){return this.i.add(String(i),l,!0,c,d)};function he(i,l,c,d){if(l=i.i.g[String(l)],!l)return!0;l=l.concat();let T=!0;for(let A=0;A<l.length;++A){const R=l[A];if(R&&!R.da&&R.capture==c){const F=R.listener,Te=R.ha||R.src;R.fa&&rt(i.i,R),T=F.call(Te,d)!==!1&&T}}return T&&!d.defaultPrevented}function xe(i,l){if(typeof i!="function")if(i&&typeof i.handleEvent=="function")i=f(i.handleEvent,i);else throw Error("Invalid listener argument");return Number(l)>2147483647?-1:a.setTimeout(i,l||0)}function Re(i){i.g=xe(()=>{i.g=null,i.i&&(i.i=!1,Re(i))},i.l);const l=i.h;i.h=null,i.m.apply(null,l)}class st extends I{constructor(l,c){super(),this.m=l,this.l=c,this.h=null,this.i=!1,this.g=null}j(l){this.h=arguments,this.g?this.i=!0:Re(this)}N(){super.N(),this.g&&(a.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function _e(i){I.call(this),this.h=i,this.g={}}v(_e,I);var Ke=[];function Ze(i){sn(i.g,function(l,c){this.g.hasOwnProperty(c)&&le(l)},i),i.g={}}_e.prototype.N=function(){_e.Z.N.call(this),Ze(this)},_e.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var ee=a.JSON.stringify,et=a.JSON.parse,Nn=class{stringify(i){return a.JSON.stringify(i,void 0)}parse(i){return a.JSON.parse(i,void 0)}};function ir(){}function Dn(){}var St={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function or(){m.call(this,"d")}v(or,m);function ar(){m.call(this,"c")}v(ar,m);var ft={},Xr=null;function de(){return Xr=Xr||new k}ft.Ia="serverreachability";function Me(i){m.call(this,ft.Ia,i)}v(Me,m);function we(i){const l=de();$(l,new Me(l))}ft.STAT_EVENT="statevent";function Ge(i,l){m.call(this,ft.STAT_EVENT,i),this.stat=l}v(Ge,m);function Q(i){const l=de();$(l,new Ge(l,i))}ft.Ja="timingevent";function He(i,l){m.call(this,ft.Ja,i),this.size=l}v(He,m);function Lt(i,l){if(typeof i!="function")throw Error("Fn must not be null and must be a function");return a.setTimeout(function(){i()},l)}function an(){this.g=!0}an.prototype.ua=function(){this.g=!1};function lr(i,l,c,d,T,A){i.info(function(){if(i.g)if(A){var R="",F=A.split("&");for(let J=0;J<F.length;J++){var Te=F[J].split("=");if(Te.length>1){const Ae=Te[0];Te=Te[1];const gt=Ae.split("_");R=gt.length>=2&&gt[1]=="type"?R+(Ae+"="+Te+"&"):R+(Ae+"=redacted&")}}}else R=null;else R=A;return"XMLHTTP REQ ("+d+") [attempt "+T+"]: "+l+`
`+c+`
`+R})}function Yr(i,l,c,d,T,A,R){i.info(function(){return"XMLHTTP RESP ("+d+") [ attempt "+T+"]: "+l+`
`+c+`
`+A+" "+R})}function Qe(i,l,c,d){i.info(function(){return"XMLHTTP TEXT ("+l+"): "+On(i,c)+(d?" "+d:"")})}function Bt(i,l){i.info(function(){return"TIMEOUT: "+l})}an.prototype.info=function(){};function On(i,l){if(!i.g)return l;if(!l)return null;try{const A=JSON.parse(l);if(A){for(i=0;i<A.length;i++)if(Array.isArray(A[i])){var c=A[i];if(!(c.length<2)){var d=c[1];if(Array.isArray(d)&&!(d.length<1)){var T=d[0];if(T!="noop"&&T!="stop"&&T!="close")for(let R=1;R<d.length;R++)d[R]=""}}}}return ee(A)}catch{return l}}var bt={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},pt={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},ln;function Je(){}v(Je,ir),Je.prototype.g=function(){return new XMLHttpRequest},ln=new Je;function tt(i){return encodeURIComponent(String(i))}function cn(i){var l=1;i=i.split(":");const c=[];for(;l>0&&i.length;)c.push(i.shift()),l--;return i.length&&c.push(i.join(":")),c}function Xe(i,l,c,d){this.j=i,this.i=l,this.l=c,this.S=d||1,this.V=new _e(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new oi}function oi(){this.i=null,this.g="",this.h=!1}var ai={},un={};function Vn(i,l,c){i.M=1,i.A=es(mt(l)),i.u=c,i.R=!0,xn(i,null)}function xn(i,l){i.F=Date.now(),Ct(i),i.B=mt(i.A);var c=i.B,d=i.S;Array.isArray(d)||(d=[String(d)]),jo(c.i,"t",d),i.C=0,c=i.j.L,i.h=new oi,i.g=ia(i.j,c?l:null,!i.u),i.P>0&&(i.O=new st(f(i.Y,i,i.g),i.P)),l=i.V,c=i.g,d=i.ba;var T="readystatechange";Array.isArray(T)||(T&&(Ke[0]=T.toString()),T=Ke);for(let A=0;A<T.length;A++){const R=Jr(c,T[A],d||l.handleEvent,!1,l.h||l);if(!R)break;l.g[R.key]=R}l=i.J?Pn(i.J):{},i.u?(i.v||(i.v="POST"),l["Content-Type"]="application/x-www-form-urlencoded",i.g.ea(i.B,i.v,i.u,l)):(i.v="GET",i.g.ea(i.B,i.v,null,l)),we(),lr(i.i,i.v,i.B,i.l,i.S,i.u)}Xe.prototype.ba=function(i){i=i.target;const l=this.O;l&&jt(i)==3?l.j():this.Y(i)},Xe.prototype.Y=function(i){try{if(i==this.g)e:{const F=jt(this.g),Te=this.g.ya(),J=this.g.ca();if(!(F<3)&&(F!=3||this.g&&(this.h.h||this.g.la()||Ko(this.g)))){this.K||F!=4||Te==7||(Te==8||J<=0?we(3):we(2)),Ee(this);var l=this.g.ca();this.X=l;var c=Zr(this);if(this.o=l==200,Yr(this.i,this.v,this.B,this.l,this.S,F,l),this.o){if(this.U&&!this.L){t:{if(this.g){var d,T=this.g;if((d=T.g?T.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!g(d)){var A=d;break t}}A=null}if(i=A)Qe(this.i,this.l,i,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,Rt(this,i);else{this.o=!1,this.m=3,Q(12),nt(this),Pe(this);break e}}if(this.R){i=!0;let Ae;for(;!this.K&&this.C<c.length;)if(Ae=it(this,c),Ae==un){F==4&&(this.m=4,Q(14),i=!1),Qe(this.i,this.l,null,"[Incomplete Response]");break}else if(Ae==ai){this.m=4,Q(15),Qe(this.i,this.l,c,"[Invalid Chunk]"),i=!1;break}else Qe(this.i,this.l,Ae,null),Rt(this,Ae);if(cr(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),F!=4||c.length!=0||this.h.h||(this.m=1,Q(16),i=!1),this.o=this.o&&i,!i)Qe(this.i,this.l,c,"[Invalid Chunked Response]"),nt(this),Pe(this);else if(c.length>0&&!this.W){this.W=!0;var R=this.j;R.g==this&&R.aa&&!R.P&&(R.j.info("Great, no buffering proxy detected. Bytes received: "+c.length),gi(R),R.P=!0,Q(11))}}else Qe(this.i,this.l,c,null),Rt(this,c);F==4&&nt(this),this.o&&!this.K&&(F==4?ta(this.j,this):(this.o=!1,Ct(this)))}else Bu(this.g),l==400&&c.indexOf("Unknown SID")>0?(this.m=3,Q(12)):(this.m=0,Q(13)),nt(this),Pe(this)}}}catch{}finally{}};function Zr(i){if(!cr(i))return i.g.la();const l=Ko(i.g);if(l==="")return"";let c="";const d=l.length,T=jt(i.g)==4;if(!i.h.i){if(typeof TextDecoder>"u")return nt(i),Pe(i),"";i.h.i=new a.TextDecoder}for(let A=0;A<d;A++)i.h.h=!0,c+=i.h.i.decode(l[A],{stream:!(T&&A==d-1)});return l.length=0,i.h.g+=c,i.C=0,i.h.g}function cr(i){return i.g?i.v=="GET"&&i.M!=2&&i.j.Aa:!1}function it(i,l){var c=i.C,d=l.indexOf(`
`,c);return d==-1?un:(c=Number(l.substring(c,d)),isNaN(c)?ai:(d+=1,d+c>l.length?un:(l=l.slice(d,d+c),i.C=d+c,l)))}Xe.prototype.cancel=function(){this.K=!0,nt(this)};function Ct(i){i.T=Date.now()+i.H,fe(i,i.H)}function fe(i,l){if(i.D!=null)throw Error("WatchDog timer not null");i.D=Lt(f(i.aa,i),l)}function Ee(i){i.D&&(a.clearTimeout(i.D),i.D=null)}Xe.prototype.aa=function(){this.D=null;const i=Date.now();i-this.T>=0?(Bt(this.i,this.B),this.M!=2&&(we(),Q(17)),nt(this),this.m=2,Pe(this)):fe(this,this.T-i)};function Pe(i){i.j.I==0||i.K||ta(i.j,i)}function nt(i){Ee(i);var l=i.O;l&&typeof l.dispose=="function"&&l.dispose(),i.O=null,Ze(i.V),i.g&&(l=i.g,i.g=null,l.abort(),l.dispose())}function Rt(i,l){try{var c=i.j;if(c.I!=0&&(c.g==i||ci(c.h,i))){if(!i.L&&ci(c.h,i)&&c.I==3){try{var d=c.Ba.g.parse(l)}catch{d=null}if(Array.isArray(d)&&d.length==3){var T=d;if(T[0]==0){e:if(!c.v){if(c.g)if(c.g.F+3e3<i.F)is(c),rs(c);else break e;mi(c),Q(18)}}else c.xa=T[1],0<c.xa-c.K&&T[2]<37500&&c.F&&c.A==0&&!c.C&&(c.C=Lt(f(c.Va,c),6e3));Oo(c.h)<=1&&c.ta&&(c.ta=void 0)}else dn(c,11)}else if((i.L||c.g==i)&&is(c),!g(l))for(T=c.Ba.g.parse(l),l=0;l<T.length;l++){let J=T[l];const Ae=J[0];if(!(Ae<=c.K))if(c.K=Ae,J=J[1],c.I==2)if(J[0]=="c"){c.M=J[1],c.ba=J[2];const gt=J[3];gt!=null&&(c.ka=gt,c.j.info("VER="+c.ka));const fn=J[4];fn!=null&&(c.za=fn,c.j.info("SVER="+c.za));const $t=J[5];$t!=null&&typeof $t=="number"&&$t>0&&(d=1.5*$t,c.O=d,c.j.info("backChannelRequestTimeoutMs_="+d)),d=c;const qt=i.g;if(qt){const as=qt.g?qt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(as){var A=d.h;A.g||as.indexOf("spdy")==-1&&as.indexOf("quic")==-1&&as.indexOf("h2")==-1||(A.j=A.l,A.g=new Set,A.h&&(ui(A,A.h),A.h=null))}if(d.G){const yi=qt.g?qt.g.getResponseHeader("X-HTTP-Session-Id"):null;yi&&(d.wa=yi,te(d.J,d.G,yi))}}c.I=3,c.l&&c.l.ra(),c.aa&&(c.T=Date.now()-i.F,c.j.info("Handshake RTT: "+c.T+"ms")),d=c;var R=i;if(d.na=sa(d,d.L?d.ba:null,d.W),R.L){Vo(d.h,R);var F=R,Te=d.O;Te&&(F.H=Te),F.D&&(Ee(F),Ct(F)),d.g=R}else Zo(d);c.i.length>0&&ss(c)}else J[0]!="stop"&&J[0]!="close"||dn(c,7);else c.I==3&&(J[0]=="stop"||J[0]=="close"?J[0]=="stop"?dn(c,7):pi(c):J[0]!="noop"&&c.l&&c.l.qa(J),c.A=0)}}we(4)}catch{}}var li=class{constructor(i,l){this.g=i,this.map=l}};function oe(i){this.l=i||10,a.PerformanceNavigationTiming?(i=a.performance.getEntriesByType("navigation"),i=i.length>0&&(i[0].nextHopProtocol=="hq"||i[0].nextHopProtocol=="h2")):i=!!(a.chrome&&a.chrome.loadTimes&&a.chrome.loadTimes()&&a.chrome.loadTimes().wasFetchedViaSpdy),this.j=i?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function Le(i){return i.h?!0:i.g?i.g.size>=i.j:!1}function Oo(i){return i.h?1:i.g?i.g.size:0}function ci(i,l){return i.h?i.h==l:i.g?i.g.has(l):!1}function ui(i,l){i.g?i.g.add(l):i.h=l}function Vo(i,l){i.h&&i.h==l?i.h=null:i.g&&i.g.has(l)&&i.g.delete(l)}oe.prototype.cancel=function(){if(this.i=xo(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const i of this.g.values())i.cancel();this.g.clear()}};function xo(i){if(i.h!=null)return i.i.concat(i.h.G);if(i.g!=null&&i.g.size!==0){let l=i.i;for(const c of i.g.values())l=l.concat(c.G);return l}return P(i.i)}var Mo=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function bu(i,l){if(i){i=i.split("&");for(let c=0;c<i.length;c++){const d=i[c].indexOf("=");let T,A=null;d>=0?(T=i[c].substring(0,d),A=i[c].substring(d+1)):T=i[c],l(T,A?decodeURIComponent(A.replace(/\+/g," ")):"")}}}function Ft(i){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let l;i instanceof Ft?(this.l=i.l,ur(this,i.j),this.o=i.o,this.g=i.g,hr(this,i.u),this.h=i.h,hi(this,$o(i.i)),this.m=i.m):i&&(l=String(i).match(Mo))?(this.l=!1,ur(this,l[1]||"",!0),this.o=dr(l[2]||""),this.g=dr(l[3]||"",!0),hr(this,l[4]),this.h=dr(l[5]||"",!0),hi(this,l[6]||"",!0),this.m=dr(l[7]||"")):(this.l=!1,this.i=new pr(null,this.l))}Ft.prototype.toString=function(){const i=[];var l=this.j;l&&i.push(fr(l,Lo,!0),":");var c=this.g;return(c||l=="file")&&(i.push("//"),(l=this.o)&&i.push(fr(l,Lo,!0),"@"),i.push(tt(c).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),c=this.u,c!=null&&i.push(":",String(c))),(c=this.h)&&(this.g&&c.charAt(0)!="/"&&i.push("/"),i.push(fr(c,c.charAt(0)=="/"?Pu:Ru,!0))),(c=this.i.toString())&&i.push("?",c),(c=this.m)&&i.push("#",fr(c,Nu)),i.join("")},Ft.prototype.resolve=function(i){const l=mt(this);let c=!!i.j;c?ur(l,i.j):c=!!i.o,c?l.o=i.o:c=!!i.g,c?l.g=i.g:c=i.u!=null;var d=i.h;if(c)hr(l,i.u);else if(c=!!i.h){if(d.charAt(0)!="/")if(this.g&&!this.h)d="/"+d;else{var T=l.h.lastIndexOf("/");T!=-1&&(d=l.h.slice(0,T+1)+d)}if(T=d,T==".."||T==".")d="";else if(T.indexOf("./")!=-1||T.indexOf("/.")!=-1){d=T.lastIndexOf("/",0)==0,T=T.split("/");const A=[];for(let R=0;R<T.length;){const F=T[R++];F=="."?d&&R==T.length&&A.push(""):F==".."?((A.length>1||A.length==1&&A[0]!="")&&A.pop(),d&&R==T.length&&A.push("")):(A.push(F),d=!0)}d=A.join("/")}else d=T}return c?l.h=d:c=i.i.toString()!=="",c?hi(l,$o(i.i)):c=!!i.m,c&&(l.m=i.m),l};function mt(i){return new Ft(i)}function ur(i,l,c){i.j=c?dr(l,!0):l,i.j&&(i.j=i.j.replace(/:$/,""))}function hr(i,l){if(l){if(l=Number(l),isNaN(l)||l<0)throw Error("Bad port number "+l);i.u=l}else i.u=null}function hi(i,l,c){l instanceof pr?(i.i=l,Du(i.i,i.l)):(c||(l=fr(l,ku)),i.i=new pr(l,i.l))}function te(i,l,c){i.i.set(l,c)}function es(i){return te(i,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),i}function dr(i,l){return i?l?decodeURI(i.replace(/%25/g,"%2525")):decodeURIComponent(i):""}function fr(i,l,c){return typeof i=="string"?(i=encodeURI(i).replace(l,Cu),c&&(i=i.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),i):null}function Cu(i){return i=i.charCodeAt(0),"%"+(i>>4&15).toString(16)+(i&15).toString(16)}var Lo=/[#\/\?@]/g,Ru=/[#\?:]/g,Pu=/[#\?]/g,ku=/[#\?@]/g,Nu=/#/g;function pr(i,l){this.h=this.g=null,this.i=i||null,this.j=!!l}function hn(i){i.g||(i.g=new Map,i.h=0,i.i&&bu(i.i,function(l,c){i.add(decodeURIComponent(l.replace(/\+/g," ")),c)}))}n=pr.prototype,n.add=function(i,l){hn(this),this.i=null,i=Mn(this,i);let c=this.g.get(i);return c||this.g.set(i,c=[]),c.push(l),this.h+=1,this};function Bo(i,l){hn(i),l=Mn(i,l),i.g.has(l)&&(i.i=null,i.h-=i.g.get(l).length,i.g.delete(l))}function Fo(i,l){return hn(i),l=Mn(i,l),i.g.has(l)}n.forEach=function(i,l){hn(this),this.g.forEach(function(c,d){c.forEach(function(T){i.call(l,T,d,this)},this)},this)};function Uo(i,l){hn(i);let c=[];if(typeof l=="string")Fo(i,l)&&(c=c.concat(i.g.get(Mn(i,l))));else for(i=Array.from(i.g.values()),l=0;l<i.length;l++)c=c.concat(i[l]);return c}n.set=function(i,l){return hn(this),this.i=null,i=Mn(this,i),Fo(this,i)&&(this.h-=this.g.get(i).length),this.g.set(i,[l]),this.h+=1,this},n.get=function(i,l){return i?(i=Uo(this,i),i.length>0?String(i[0]):l):l};function jo(i,l,c){Bo(i,l),c.length>0&&(i.i=null,i.g.set(Mn(i,l),P(c)),i.h+=c.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const i=[],l=Array.from(this.g.keys());for(let d=0;d<l.length;d++){var c=l[d];const T=tt(c);c=Uo(this,c);for(let A=0;A<c.length;A++){let R=T;c[A]!==""&&(R+="="+tt(c[A])),i.push(R)}}return this.i=i.join("&")};function $o(i){const l=new pr;return l.i=i.i,i.g&&(l.g=new Map(i.g),l.h=i.h),l}function Mn(i,l){return l=String(l),i.j&&(l=l.toLowerCase()),l}function Du(i,l){l&&!i.j&&(hn(i),i.i=null,i.g.forEach(function(c,d){const T=d.toLowerCase();d!=T&&(Bo(this,d),jo(this,T,c))},i)),i.j=l}function Ou(i,l){const c=new an;if(a.Image){const d=new Image;d.onload=_(Ut,c,"TestLoadImage: loaded",!0,l,d),d.onerror=_(Ut,c,"TestLoadImage: error",!1,l,d),d.onabort=_(Ut,c,"TestLoadImage: abort",!1,l,d),d.ontimeout=_(Ut,c,"TestLoadImage: timeout",!1,l,d),a.setTimeout(function(){d.ontimeout&&d.ontimeout()},1e4),d.src=i}else l(!1)}function Vu(i,l){const c=new an,d=new AbortController,T=setTimeout(()=>{d.abort(),Ut(c,"TestPingServer: timeout",!1,l)},1e4);fetch(i,{signal:d.signal}).then(A=>{clearTimeout(T),A.ok?Ut(c,"TestPingServer: ok",!0,l):Ut(c,"TestPingServer: server error",!1,l)}).catch(()=>{clearTimeout(T),Ut(c,"TestPingServer: error",!1,l)})}function Ut(i,l,c,d,T){try{T&&(T.onload=null,T.onerror=null,T.onabort=null,T.ontimeout=null),d(c)}catch{}}function xu(){this.g=new Nn}function di(i){this.i=i.Sb||null,this.h=i.ab||!1}v(di,ir),di.prototype.g=function(){return new ts(this.i,this.h)};function ts(i,l){k.call(this),this.H=i,this.o=l,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}v(ts,k),n=ts.prototype,n.open=function(i,l){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=i,this.D=l,this.readyState=1,gr(this)},n.send=function(i){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const l={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};i&&(l.body=i),(this.H||a).fetch(new Request(this.D,l)).then(this.Pa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,mr(this)),this.readyState=0},n.Pa=function(i){if(this.g&&(this.l=i,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=i.headers,this.readyState=2,gr(this)),this.g&&(this.readyState=3,gr(this),this.g)))if(this.responseType==="arraybuffer")i.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof a.ReadableStream<"u"&&"body"in i){if(this.j=i.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;qo(this)}else i.text().then(this.Oa.bind(this),this.ga.bind(this))};function qo(i){i.j.read().then(i.Ma.bind(i)).catch(i.ga.bind(i))}n.Ma=function(i){if(this.g){if(this.o&&i.value)this.response.push(i.value);else if(!this.o){var l=i.value?i.value:new Uint8Array(0);(l=this.B.decode(l,{stream:!i.done}))&&(this.response=this.responseText+=l)}i.done?mr(this):gr(this),this.readyState==3&&qo(this)}},n.Oa=function(i){this.g&&(this.response=this.responseText=i,mr(this))},n.Na=function(i){this.g&&(this.response=i,mr(this))},n.ga=function(){this.g&&mr(this)};function mr(i){i.readyState=4,i.l=null,i.j=null,i.B=null,gr(i)}n.setRequestHeader=function(i,l){this.A.append(i,l)},n.getResponseHeader=function(i){return this.h&&this.h.get(i.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const i=[],l=this.h.entries();for(var c=l.next();!c.done;)c=c.value,i.push(c[0]+": "+c[1]),c=l.next();return i.join(`\r
`)};function gr(i){i.onreadystatechange&&i.onreadystatechange.call(i)}Object.defineProperty(ts.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(i){this.m=i?"include":"same-origin"}});function Go(i){let l="";return sn(i,function(c,d){l+=d,l+=":",l+=c,l+=`\r
`}),l}function fi(i,l,c){e:{for(d in c){var d=!1;break e}d=!0}d||(c=Go(c),typeof i=="string"?c!=null&&tt(c):te(i,l,c))}function ce(i){k.call(this),this.headers=new Map,this.L=i||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}v(ce,k);var Mu=/^https?$/i,Lu=["POST","PUT"];n=ce.prototype,n.Fa=function(i){this.H=i},n.ea=function(i,l,c,d){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+i);l=l?l.toUpperCase():"GET",this.D=i,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():ln.g(),this.g.onreadystatechange=b(f(this.Ca,this));try{this.B=!0,this.g.open(l,String(i),!0),this.B=!1}catch(A){Ho(this,A);return}if(i=c||"",c=new Map(this.headers),d)if(Object.getPrototypeOf(d)===Object.prototype)for(var T in d)c.set(T,d[T]);else if(typeof d.keys=="function"&&typeof d.get=="function")for(const A of d.keys())c.set(A,d.get(A));else throw Error("Unknown input type for opt_headers: "+String(d));d=Array.from(c.keys()).find(A=>A.toLowerCase()=="content-type"),T=a.FormData&&i instanceof a.FormData,!(Array.prototype.indexOf.call(Lu,l,void 0)>=0)||d||T||c.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[A,R]of c)this.g.setRequestHeader(A,R);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(i),this.v=!1}catch(A){Ho(this,A)}};function Ho(i,l){i.h=!1,i.g&&(i.j=!0,i.g.abort(),i.j=!1),i.l=l,i.o=5,zo(i),ns(i)}function zo(i){i.A||(i.A=!0,$(i,"complete"),$(i,"error"))}n.abort=function(i){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=i||7,$(this,"complete"),$(this,"abort"),ns(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),ns(this,!0)),ce.Z.N.call(this)},n.Ca=function(){this.u||(this.B||this.v||this.j?Wo(this):this.Xa())},n.Xa=function(){Wo(this)};function Wo(i){if(i.h&&typeof o<"u"){if(i.v&&jt(i)==4)setTimeout(i.Ca.bind(i),0);else if($(i,"readystatechange"),jt(i)==4){i.h=!1;try{const A=i.ca();e:switch(A){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var l=!0;break e;default:l=!1}var c;if(!(c=l)){var d;if(d=A===0){let R=String(i.D).match(Mo)[1]||null;!R&&a.self&&a.self.location&&(R=a.self.location.protocol.slice(0,-1)),d=!Mu.test(R?R.toLowerCase():"")}c=d}if(c)$(i,"complete"),$(i,"success");else{i.o=6;try{var T=jt(i)>2?i.g.statusText:""}catch{T=""}i.l=T+" ["+i.ca()+"]",zo(i)}}finally{ns(i)}}}}function ns(i,l){if(i.g){i.m&&(clearTimeout(i.m),i.m=null);const c=i.g;i.g=null,l||$(i,"ready");try{c.onreadystatechange=null}catch{}}}n.isActive=function(){return!!this.g};function jt(i){return i.g?i.g.readyState:0}n.ca=function(){try{return jt(this)>2?this.g.status:-1}catch{return-1}},n.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.La=function(i){if(this.g){var l=this.g.responseText;return i&&l.indexOf(i)==0&&(l=l.substring(i.length)),et(l)}};function Ko(i){try{if(!i.g)return null;if("response"in i.g)return i.g.response;switch(i.F){case"":case"text":return i.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in i.g)return i.g.mozResponseArrayBuffer}return null}catch{return null}}function Bu(i){const l={};i=(i.g&&jt(i)>=2&&i.g.getAllResponseHeaders()||"").split(`\r
`);for(let d=0;d<i.length;d++){if(g(i[d]))continue;var c=cn(i[d]);const T=c[0];if(c=c[1],typeof c!="string")continue;c=c.trim();const A=l[T]||[];l[T]=A,A.push(c)}ii(l,function(d){return d.join(", ")})}n.ya=function(){return this.o},n.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function yr(i,l,c){return c&&c.internalChannelParams&&c.internalChannelParams[i]||l}function Qo(i){this.za=0,this.i=[],this.j=new an,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=yr("failFast",!1,i),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=yr("baseRetryDelayMs",5e3,i),this.Za=yr("retryDelaySeedMs",1e4,i),this.Ta=yr("forwardChannelMaxRetries",2,i),this.va=yr("forwardChannelRequestTimeoutMs",2e4,i),this.ma=i&&i.xmlHttpFactory||void 0,this.Ua=i&&i.Rb||void 0,this.Aa=i&&i.useFetchStreams||!1,this.O=void 0,this.L=i&&i.supportsCrossDomainXhr||!1,this.M="",this.h=new oe(i&&i.concurrentRequestLimit),this.Ba=new xu,this.S=i&&i.fastHandshake||!1,this.R=i&&i.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=i&&i.Pb||!1,i&&i.ua&&this.j.ua(),i&&i.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&i&&i.detectBufferingProxy||!1,this.ia=void 0,i&&i.longPollingTimeout&&i.longPollingTimeout>0&&(this.ia=i.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}n=Qo.prototype,n.ka=8,n.I=1,n.connect=function(i,l,c,d){Q(0),this.W=i,this.H=l||{},c&&d!==void 0&&(this.H.OSID=c,this.H.OAID=d),this.F=this.X,this.J=sa(this,null,this.W),ss(this)};function pi(i){if(Jo(i),i.I==3){var l=i.V++,c=mt(i.J);if(te(c,"SID",i.M),te(c,"RID",l),te(c,"TYPE","terminate"),_r(i,c),l=new Xe(i,i.j,l),l.M=2,l.A=es(mt(c)),c=!1,a.navigator&&a.navigator.sendBeacon)try{c=a.navigator.sendBeacon(l.A.toString(),"")}catch{}!c&&a.Image&&(new Image().src=l.A,c=!0),c||(l.g=ia(l.j,null),l.g.ea(l.A)),l.F=Date.now(),Ct(l)}ra(i)}function rs(i){i.g&&(gi(i),i.g.cancel(),i.g=null)}function Jo(i){rs(i),i.v&&(a.clearTimeout(i.v),i.v=null),is(i),i.h.cancel(),i.m&&(typeof i.m=="number"&&a.clearTimeout(i.m),i.m=null)}function ss(i){if(!Le(i.h)&&!i.m){i.m=!0;var l=i.Ea;pe||p(),me||(pe(),me=!0),E.add(l,i),i.D=0}}function Fu(i,l){return Oo(i.h)>=i.h.j-(i.m?1:0)?!1:i.m?(i.i=l.G.concat(i.i),!0):i.I==1||i.I==2||i.D>=(i.Sa?0:i.Ta)?!1:(i.m=Lt(f(i.Ea,i,l),na(i,i.D)),i.D++,!0)}n.Ea=function(i){if(this.m)if(this.m=null,this.I==1){if(!i){this.V=Math.floor(Math.random()*1e5),i=this.V++;const T=new Xe(this,this.j,i);let A=this.o;if(this.U&&(A?(A=Pn(A),At(A,this.U)):A=this.U),this.u!==null||this.R||(T.J=A,A=null),this.S)e:{for(var l=0,c=0;c<this.i.length;c++){t:{var d=this.i[c];if("__data__"in d.map&&(d=d.map.__data__,typeof d=="string")){d=d.length;break t}d=void 0}if(d===void 0)break;if(l+=d,l>4096){l=c;break e}if(l===4096||c===this.i.length-1){l=c+1;break e}}l=1e3}else l=1e3;l=Yo(this,T,l),c=mt(this.J),te(c,"RID",i),te(c,"CVER",22),this.G&&te(c,"X-HTTP-Session-Id",this.G),_r(this,c),A&&(this.R?l="headers="+tt(Go(A))+"&"+l:this.u&&fi(c,this.u,A)),ui(this.h,T),this.Ra&&te(c,"TYPE","init"),this.S?(te(c,"$req",l),te(c,"SID","null"),T.U=!0,Vn(T,c,null)):Vn(T,c,l),this.I=2}}else this.I==3&&(i?Xo(this,i):this.i.length==0||Le(this.h)||Xo(this))};function Xo(i,l){var c;l?c=l.l:c=i.V++;const d=mt(i.J);te(d,"SID",i.M),te(d,"RID",c),te(d,"AID",i.K),_r(i,d),i.u&&i.o&&fi(d,i.u,i.o),c=new Xe(i,i.j,c,i.D+1),i.u===null&&(c.J=i.o),l&&(i.i=l.G.concat(i.i)),l=Yo(i,c,1e3),c.H=Math.round(i.va*.5)+Math.round(i.va*.5*Math.random()),ui(i.h,c),Vn(c,d,l)}function _r(i,l){i.H&&sn(i.H,function(c,d){te(l,d,c)}),i.l&&sn({},function(c,d){te(l,d,c)})}function Yo(i,l,c){c=Math.min(i.i.length,c);const d=i.l?f(i.l.Ka,i.l,i):null;e:{var T=i.i;let F=-1;for(;;){const Te=["count="+c];F==-1?c>0?(F=T[0].g,Te.push("ofs="+F)):F=0:Te.push("ofs="+F);let J=!0;for(let Ae=0;Ae<c;Ae++){var A=T[Ae].g;const gt=T[Ae].map;if(A-=F,A<0)F=Math.max(0,T[Ae].g-100),J=!1;else try{A="req"+A+"_"||"";try{var R=gt instanceof Map?gt:Object.entries(gt);for(const[fn,$t]of R){let qt=$t;u($t)&&(qt=ee($t)),Te.push(A+fn+"="+encodeURIComponent(qt))}}catch(fn){throw Te.push(A+"type="+encodeURIComponent("_badmap")),fn}}catch{d&&d(gt)}}if(J){R=Te.join("&");break e}}R=void 0}return i=i.i.splice(0,c),l.G=i,R}function Zo(i){if(!i.g&&!i.v){i.Y=1;var l=i.Da;pe||p(),me||(pe(),me=!0),E.add(l,i),i.A=0}}function mi(i){return i.g||i.v||i.A>=3?!1:(i.Y++,i.v=Lt(f(i.Da,i),na(i,i.A)),i.A++,!0)}n.Da=function(){if(this.v=null,ea(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var i=4*this.T;this.j.info("BP detection timer enabled: "+i),this.B=Lt(f(this.Wa,this),i)}},n.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,Q(10),rs(this),ea(this))};function gi(i){i.B!=null&&(a.clearTimeout(i.B),i.B=null)}function ea(i){i.g=new Xe(i,i.j,"rpc",i.Y),i.u===null&&(i.g.J=i.o),i.g.P=0;var l=mt(i.na);te(l,"RID","rpc"),te(l,"SID",i.M),te(l,"AID",i.K),te(l,"CI",i.F?"0":"1"),!i.F&&i.ia&&te(l,"TO",i.ia),te(l,"TYPE","xmlhttp"),_r(i,l),i.u&&i.o&&fi(l,i.u,i.o),i.O&&(i.g.H=i.O);var c=i.g;i=i.ba,c.M=1,c.A=es(mt(l)),c.u=null,c.R=!0,xn(c,i)}n.Va=function(){this.C!=null&&(this.C=null,rs(this),mi(this),Q(19))};function is(i){i.C!=null&&(a.clearTimeout(i.C),i.C=null)}function ta(i,l){var c=null;if(i.g==l){is(i),gi(i),i.g=null;var d=2}else if(ci(i.h,l))c=l.G,Vo(i.h,l),d=1;else return;if(i.I!=0){if(l.o)if(d==1){c=l.u?l.u.length:0,l=Date.now()-l.F;var T=i.D;d=de(),$(d,new He(d,c)),ss(i)}else Zo(i);else if(T=l.m,T==3||T==0&&l.X>0||!(d==1&&Fu(i,l)||d==2&&mi(i)))switch(c&&c.length>0&&(l=i.h,l.i=l.i.concat(c)),T){case 1:dn(i,5);break;case 4:dn(i,10);break;case 3:dn(i,6);break;default:dn(i,2)}}}function na(i,l){let c=i.Qa+Math.floor(Math.random()*i.Za);return i.isActive()||(c*=2),c*l}function dn(i,l){if(i.j.info("Error code "+l),l==2){var c=f(i.bb,i),d=i.Ua;const T=!d;d=new Ft(d||"//www.google.com/images/cleardot.gif"),a.location&&a.location.protocol=="http"||ur(d,"https"),es(d),T?Ou(d.toString(),c):Vu(d.toString(),c)}else Q(2);i.I=0,i.l&&i.l.pa(l),ra(i),Jo(i)}n.bb=function(i){i?(this.j.info("Successfully pinged google.com"),Q(2)):(this.j.info("Failed to ping google.com"),Q(1))};function ra(i){if(i.I=0,i.ja=[],i.l){const l=xo(i.h);(l.length!=0||i.i.length!=0)&&(N(i.ja,l),N(i.ja,i.i),i.h.i.length=0,P(i.i),i.i.length=0),i.l.oa()}}function sa(i,l,c){var d=c instanceof Ft?mt(c):new Ft(c);if(d.g!="")l&&(d.g=l+"."+d.g),hr(d,d.u);else{var T=a.location;d=T.protocol,l=l?l+"."+T.hostname:T.hostname,T=+T.port;const A=new Ft(null);d&&ur(A,d),l&&(A.g=l),T&&hr(A,T),c&&(A.h=c),d=A}return c=i.G,l=i.wa,c&&l&&te(d,c,l),te(d,"VER",i.ka),_r(i,d),d}function ia(i,l,c){if(l&&!i.L)throw Error("Can't create secondary domain capable XhrIo object.");return l=i.Aa&&!i.ma?new ce(new di({ab:c})):new ce(i.ma),l.Fa(i.L),l}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function oa(){}n=oa.prototype,n.ra=function(){},n.qa=function(){},n.pa=function(){},n.oa=function(){},n.isActive=function(){return!0},n.Ka=function(){};function os(){}os.prototype.g=function(i,l){return new Ye(i,l)};function Ye(i,l){k.call(this),this.g=new Qo(l),this.l=i,this.h=l&&l.messageUrlParams||null,i=l&&l.messageHeaders||null,l&&l.clientProtocolHeaderRequired&&(i?i["X-Client-Protocol"]="webchannel":i={"X-Client-Protocol":"webchannel"}),this.g.o=i,i=l&&l.initMessageHeaders||null,l&&l.messageContentType&&(i?i["X-WebChannel-Content-Type"]=l.messageContentType:i={"X-WebChannel-Content-Type":l.messageContentType}),l&&l.sa&&(i?i["X-WebChannel-Client-Profile"]=l.sa:i={"X-WebChannel-Client-Profile":l.sa}),this.g.U=i,(i=l&&l.Qb)&&!g(i)&&(this.g.u=i),this.A=l&&l.supportsCrossDomainXhr||!1,this.v=l&&l.sendRawJson||!1,(l=l&&l.httpSessionIdParam)&&!g(l)&&(this.g.G=l,i=this.h,i!==null&&l in i&&(i=this.h,l in i&&delete i[l])),this.j=new Ln(this)}v(Ye,k),Ye.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},Ye.prototype.close=function(){pi(this.g)},Ye.prototype.o=function(i){var l=this.g;if(typeof i=="string"){var c={};c.__data__=i,i=c}else this.v&&(c={},c.__data__=ee(i),i=c);l.i.push(new li(l.Ya++,i)),l.I==3&&ss(l)},Ye.prototype.N=function(){this.g.l=null,delete this.j,pi(this.g),delete this.g,Ye.Z.N.call(this)};function aa(i){or.call(this),i.__headers__&&(this.headers=i.__headers__,this.statusCode=i.__status__,delete i.__headers__,delete i.__status__);var l=i.__sm__;if(l){e:{for(const c in l){i=c;break e}i=void 0}(this.i=i)&&(i=this.i,l=l!==null&&i in l?l[i]:void 0),this.data=l}else this.data=i}v(aa,or);function la(){ar.call(this),this.status=1}v(la,ar);function Ln(i){this.g=i}v(Ln,oa),Ln.prototype.ra=function(){$(this.g,"a")},Ln.prototype.qa=function(i){$(this.g,new aa(i))},Ln.prototype.pa=function(i){$(this.g,new la)},Ln.prototype.oa=function(){$(this.g,"b")},os.prototype.createWebChannel=os.prototype.g,Ye.prototype.send=Ye.prototype.o,Ye.prototype.open=Ye.prototype.m,Ye.prototype.close=Ye.prototype.close,Ec=function(){return new os},_c=function(){return de()},yc=ft,Fi={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},bt.NO_ERROR=0,bt.TIMEOUT=8,bt.HTTP_ERROR=6,Ts=bt,pt.COMPLETE="complete",gc=pt,Dn.EventType=St,St.OPEN="a",St.CLOSE="b",St.ERROR="c",St.MESSAGE="d",k.prototype.listen=k.prototype.J,vr=Dn,ce.prototype.listenOnce=ce.prototype.K,ce.prototype.getLastError=ce.prototype.Ha,ce.prototype.getLastErrorCode=ce.prototype.ya,ce.prototype.getStatus=ce.prototype.ca,ce.prototype.getResponseJson=ce.prototype.La,ce.prototype.getResponseText=ce.prototype.la,ce.prototype.send=ce.prototype.ea,ce.prototype.setWithCredentials=ce.prototype.Fa,mc=ce}).apply(typeof cs<"u"?cs:typeof self<"u"?self:typeof window<"u"?window:{});/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fe{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Fe.UNAUTHENTICATED=new Fe(null),Fe.GOOGLE_CREDENTIALS=new Fe("google-credentials-uid"),Fe.FIRST_PARTY=new Fe("first-party-uid"),Fe.MOCK_USER=new Fe("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let nr="12.13.0";function Tp(n){nr=n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tn=new Xi("@firebase/firestore");function Fn(){return Tn.logLevel}function D(n,...e){if(Tn.logLevel<=j.DEBUG){const t=e.map(uo);Tn.debug(`Firestore (${nr}): ${n}`,...t)}}function wn(n,...e){if(Tn.logLevel<=j.ERROR){const t=e.map(uo);Tn.error(`Firestore (${nr}): ${n}`,...t)}}function Nr(n,...e){if(Tn.logLevel<=j.WARN){const t=e.map(uo);Tn.warn(`Firestore (${nr}): ${n}`,...t)}}function uo(n){if(typeof n=="string")return n;try{return(function(t){return JSON.stringify(t)})(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function U(n,e,t){let r="Unexpected state";typeof e=="string"?r=e:t=e,Ic(n,r,t)}function Ic(n,e,t){let r=`FIRESTORE (${nr}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{r+=" CONTEXT: "+JSON.stringify(t)}catch{r+=" CONTEXT: "+t}throw wn(r),new Error(r)}function ue(n,e,t,r){let s="Unexpected state";typeof t=="string"?s=t:r=t,n||Ic(e,s,r)}function Y(n,e){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const C={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class V extends Mt{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yn{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vc{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class wp{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable((()=>t(Fe.UNAUTHENTICATED)))}shutdown(){}}class Ap{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable((()=>t(this.token.user)))}shutdown(){this.changeListener=null}}class Sp{constructor(e){this.t=e,this.currentUser=Fe.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){ue(this.o===void 0,42304);let r=this.i;const s=h=>this.i!==r?(r=this.i,t(h)):Promise.resolve();let o=new yn;this.o=()=>{this.i++,this.currentUser=this.u(),o.resolve(),o=new yn,e.enqueueRetryable((()=>s(this.currentUser)))};const a=()=>{const h=o;e.enqueueRetryable((async()=>{await h.promise,await s(this.currentUser)}))},u=h=>{D("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=h,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit((h=>u(h))),setTimeout((()=>{if(!this.auth){const h=this.t.getImmediate({optional:!0});h?u(h):(D("FirebaseAuthCredentialsProvider","Auth not yet detected"),o.resolve(),o=new yn)}}),0),a()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then((r=>this.i!==e?(D("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(ue(typeof r.accessToken=="string",31837,{l:r}),new vc(r.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return ue(e===null||typeof e=="string",2055,{h:e}),new Fe(e)}}class bp{constructor(e,t,r){this.P=e,this.T=t,this.I=r,this.type="FirstParty",this.user=Fe.FIRST_PARTY,this.R=new Map}A(){return this.I?this.I():null}get headers(){this.R.set("X-Goog-AuthUser",this.P);const e=this.A();return e&&this.R.set("Authorization",e),this.T&&this.R.set("X-Goog-Iam-Authorization-Token",this.T),this.R}}class Cp{constructor(e,t,r){this.P=e,this.T=t,this.I=r}getToken(){return Promise.resolve(new bp(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable((()=>t(Fe.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class La{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Rp{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,_t(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){ue(this.o===void 0,3512);const r=o=>{o.error!=null&&D("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${o.error.message}`);const a=o.token!==this.m;return this.m=o.token,D("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?t(o.token):Promise.resolve()};this.o=o=>{e.enqueueRetryable((()=>r(o)))};const s=o=>{D("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=o,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit((o=>s(o))),setTimeout((()=>{if(!this.appCheck){const o=this.V.getImmediate({optional:!0});o?s(o):D("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){if(this.p)return Promise.resolve(new La(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then((t=>t?(ue(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new La(t.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pp(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ho{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=Pp(40);for(let o=0;o<s.length;++o)r.length<20&&s[o]<t&&(r+=e.charAt(s[o]%62))}return r}}function z(n,e){return n<e?-1:n>e?1:0}function Ui(n,e){const t=Math.min(n.length,e.length);for(let r=0;r<t;r++){const s=n.charAt(r),o=e.charAt(r);if(s!==o)return bi(s)===bi(o)?z(s,o):bi(s)?1:-1}return z(n.length,e.length)}const kp=55296,Np=57343;function bi(n){const e=n.charCodeAt(0);return e>=kp&&e<=Np}function Jn(n,e,t){return n.length===e.length&&n.every(((r,s)=>t(r,e[s])))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ba="__name__";class yt{constructor(e,t,r){t===void 0?t=0:t>e.length&&U(637,{offset:t,range:e.length}),r===void 0?r=e.length-t:r>e.length-t&&U(1746,{length:r,range:e.length-t}),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return yt.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof yt?e.forEach((r=>{t.push(r)})):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let s=0;s<r;s++){const o=yt.compareSegments(e.get(s),t.get(s));if(o!==0)return o}return z(e.length,t.length)}static compareSegments(e,t){const r=yt.isNumericId(e),s=yt.isNumericId(t);return r&&!s?-1:!r&&s?1:r&&s?yt.extractNumericId(e).compare(yt.extractNumericId(t)):Ui(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return co.fromString(e.substring(4,e.length-2))}}class ae extends yt{construct(e,t,r){return new ae(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new V(C.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter((s=>s.length>0)))}return new ae(t)}static emptyPath(){return new ae([])}}const Dp=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class De extends yt{construct(e,t,r){return new De(e,t,r)}static isValidIdentifier(e){return Dp.test(e)}canonicalString(){return this.toArray().map((e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),De.isValidIdentifier(e)||(e="`"+e+"`"),e))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Ba}static keyField(){return new De([Ba])}static fromServerFormat(e){const t=[];let r="",s=0;const o=()=>{if(r.length===0)throw new V(C.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let a=!1;for(;s<e.length;){const u=e[s];if(u==="\\"){if(s+1===e.length)throw new V(C.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const h=e[s+1];if(h!=="\\"&&h!=="."&&h!=="`")throw new V(C.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=h,s+=2}else u==="`"?(a=!a,s++):u!=="."||a?(r+=u,s++):(o(),s++)}if(o(),a)throw new V(C.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new De(t)}static emptyPath(){return new De([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class B{constructor(e){this.path=e}static fromPath(e){return new B(ae.fromString(e))}static fromName(e){return new B(ae.fromString(e).popFirst(5))}static empty(){return new B(ae.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&ae.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return ae.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new B(new ae(e.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tc(n,e,t){if(!t)throw new V(C.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function Op(n,e,t,r){if(e===!0&&r===!0)throw new V(C.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function Fa(n){if(!B.isDocumentKey(n))throw new V(C.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function Ua(n){if(B.isDocumentKey(n))throw new V(C.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function wc(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function fo(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=(function(r){return r.constructor?r.constructor.name:null})(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":U(12329,{type:typeof n})}function Ac(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new V(C.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=fo(n);throw new V(C.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ve(n,e){const t={typeString:n};return e&&(t.value=e),t}function $r(n,e){if(!wc(n))throw new V(C.INVALID_ARGUMENT,"JSON must be an object");let t;for(const r in e)if(e[r]){const s=e[r].typeString,o="value"in e[r]?{value:e[r].value}:void 0;if(!(r in n)){t=`JSON missing required field: '${r}'`;break}const a=n[r];if(s&&typeof a!==s){t=`JSON field '${r}' must be a ${s}.`;break}if(o!==void 0&&a!==o.value){t=`Expected '${r}' field to equal '${o.value}'`;break}}if(t)throw new V(C.INVALID_ARGUMENT,t);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ja=-62135596800,$a=1e6;class se{static now(){return se.fromMillis(Date.now())}static fromDate(e){return se.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*$a);return new se(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new V(C.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new V(C.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<ja)throw new V(C.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new V(C.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/$a}_compareTo(e){return this.seconds===e.seconds?z(this.nanoseconds,e.nanoseconds):z(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:se._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if($r(e,se._jsonSchema))return new se(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-ja;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}se._jsonSchemaVersion="firestore/timestamp/1.0",se._jsonSchema={type:ve("string",se._jsonSchemaVersion),seconds:ve("number"),nanoseconds:ve("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class re{static fromTimestamp(e){return new re(e)}static min(){return new re(new se(0,0))}static max(){return new re(new se(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dr=-1;function Vp(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=re.fromTimestamp(r===1e9?new se(t+1,0):new se(t,r));return new Zt(s,B.empty(),e)}function xp(n){return new Zt(n.readTime,n.key,Dr)}class Zt{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new Zt(re.min(),B.empty(),Dr)}static max(){return new Zt(re.max(),B.empty(),Dr)}}function Mp(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=B.comparator(n.documentKey,e.documentKey),t!==0?t:z(n.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lp="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Bp{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((e=>e()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function po(n){if(n.code!==C.FAILED_PRECONDITION||n.message!==Lp)throw n;D("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class S{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e((t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)}),(t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)}))}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&U(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new S(((r,s)=>{this.nextCallback=o=>{this.wrapSuccess(e,o).next(r,s)},this.catchCallback=o=>{this.wrapFailure(t,o).next(r,s)}}))}toPromise(){return new Promise(((e,t)=>{this.next(e,t)}))}wrapUserFunction(e){try{const t=e();return t instanceof S?t:S.resolve(t)}catch(t){return S.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction((()=>e(t))):S.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction((()=>e(t))):S.reject(t)}static resolve(e){return new S(((t,r)=>{t(e)}))}static reject(e){return new S(((t,r)=>{r(e)}))}static waitFor(e){return new S(((t,r)=>{let s=0,o=0,a=!1;e.forEach((u=>{++s,u.next((()=>{++o,a&&o===s&&t()}),(h=>r(h)))})),a=!0,o===s&&t()}))}static or(e){let t=S.resolve(!1);for(const r of e)t=t.next((s=>s?S.resolve(s):r()));return t}static forEach(e,t){const r=[];return e.forEach(((s,o)=>{r.push(t.call(this,s,o))})),this.waitFor(r)}static mapArray(e,t){return new S(((r,s)=>{const o=e.length,a=new Array(o);let u=0;for(let h=0;h<o;h++){const f=h;t(e[f]).next((_=>{a[f]=_,++u,u===o&&r(a)}),(_=>s(_)))}}))}static doWhile(e,t){return new S(((r,s)=>{const o=()=>{e()===!0?t().next((()=>{o()}),s):r()};o()}))}}function Fp(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function qr(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mo{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.ae(r),this.ue=r=>t.writeSequenceNumber(r))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}mo.ce=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const go=-1;function yo(n){return n==null}function xs(n){return n===0&&1/n==-1/0}function Up(n){return typeof n=="number"&&Number.isInteger(n)&&!xs(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sc="";function jp(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=qa(e)),e=$p(n.get(t),e);return qa(e)}function $p(n,e){let t=e;const r=n.length;for(let s=0;s<r;s++){const o=n.charAt(s);switch(o){case"\0":t+="";break;case Sc:t+="";break;default:t+=o}}return t}function qa(n){return n+Sc+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ga(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function rr(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function bc(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class We{constructor(e,t){this.comparator=e,this.root=t||ke.EMPTY}insert(e,t){return new We(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,ke.BLACK,null,null))}remove(e){return new We(this.comparator,this.root.remove(e,this.comparator).copy(null,null,ke.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return t+r.left.size;s<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal(((t,r)=>(e(t,r),!1)))}toString(){const e=[];return this.inorderTraversal(((t,r)=>(e.push(`${t}:${r}`),!1))),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new us(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new us(this.root,e,this.comparator,!1)}getReverseIterator(){return new us(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new us(this.root,e,this.comparator,!0)}}class us{constructor(e,t,r,s){this.isReverse=s,this.nodeStack=[];let o=1;for(;!e.isEmpty();)if(o=t?r(e.key,t):1,t&&s&&(o*=-1),o<0)e=this.isReverse?e.left:e.right;else{if(o===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class ke{constructor(e,t,r,s,o){this.key=e,this.value=t,this.color=r??ke.RED,this.left=s??ke.EMPTY,this.right=o??ke.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,s,o){return new ke(e??this.key,t??this.value,r??this.color,s??this.left,o??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let s=this;const o=r(e,s.key);return s=o<0?s.copy(null,null,null,s.left.insert(e,t,r),null):o===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return ke.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return ke.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,ke.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,ke.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw U(43730,{key:this.key,value:this.value});if(this.right.isRed())throw U(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw U(27949);return e+(this.isRed()?0:1)}}ke.EMPTY=null,ke.RED=!0,ke.BLACK=!1;ke.EMPTY=new class{constructor(){this.size=0}get key(){throw U(57766)}get value(){throw U(16141)}get color(){throw U(16727)}get left(){throw U(29726)}get right(){throw U(36894)}copy(e,t,r,s,o){return this}insert(e,t,r){return new ke(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oe{constructor(e){this.comparator=e,this.data=new We(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal(((t,r)=>(e(t),!1)))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Ha(this.data.getIterator())}getIteratorFrom(e){return new Ha(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach((r=>{t=t.add(r)})),t}isEqual(e){if(!(e instanceof Oe)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,o=r.getNext().key;if(this.comparator(s,o)!==0)return!1}return!0}toArray(){const e=[];return this.forEach((t=>{e.push(t)})),e}toString(){const e=[];return this.forEach((t=>e.push(t))),"SortedSet("+e.toString()+")"}copy(e){const t=new Oe(this.comparator);return t.data=e,t}}class Ha{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ut{constructor(e){this.fields=e,e.sort(De.comparator)}static empty(){return new ut([])}unionWith(e){let t=new Oe(De.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new ut(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Jn(this.fields,e.fields,((t,r)=>t.isEqual(r)))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qp extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tt{constructor(e){this.binaryString=e}static fromBase64String(e){const t=(function(s){try{return atob(s)}catch(o){throw typeof DOMException<"u"&&o instanceof DOMException?new qp("Invalid base64 string: "+o):o}})(e);return new Tt(t)}static fromUint8Array(e){const t=(function(s){let o="";for(let a=0;a<s.length;++a)o+=String.fromCharCode(s[a]);return o})(e);return new Tt(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(t){return btoa(t)})(this.binaryString)}toUint8Array(){return(function(t){const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return z(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Tt.EMPTY_BYTE_STRING=new Tt("");const Gp=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function An(n){if(ue(!!n,39018),typeof n=="string"){let e=0;const t=Gp.exec(n);if(ue(!!t,46558,{timestamp:n}),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:Ne(n.seconds),nanos:Ne(n.nanos)}}function Ne(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function Xn(n){return typeof n=="string"?Tt.fromBase64String(n):Tt.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cc="server_timestamp",Rc="__type__",Pc="__previous_value__",kc="__local_write_time__";function _o(n){var t,r;return((r=(((t=n==null?void 0:n.mapValue)==null?void 0:t.fields)||{})[Rc])==null?void 0:r.stringValue)===Cc}function Eo(n){const e=n.mapValue.fields[Pc];return _o(e)?Eo(e):e}function Ms(n){const e=An(n.mapValue.fields[kc].timestampValue);return new se(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hp{constructor(e,t,r,s,o,a,u,h,f,_,v){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=s,this.ssl=o,this.forceLongPolling=a,this.autoDetectLongPolling=u,this.longPollingOptions=h,this.useFetchStreams=f,this.isUsingEmulator=_,this.apiKey=v}}const Ls="(default)";class Bs{constructor(e,t){this.projectId=e,this.database=t||Ls}static empty(){return new Bs("","")}get isDefaultDatabase(){return this.database===Ls}isEqual(e){return e instanceof Bs&&e.projectId===this.projectId&&e.database===this.database}}function zp(n,e){if(!Object.prototype.hasOwnProperty.apply(n.options,["projectId"]))throw new V(C.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Bs(n.options.projectId,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nc="__type__",Wp="__max__",hs={mapValue:{}},Dc="__vector__",ji="value";function Sn(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?_o(n)?4:Qp(n)?9007199254740991:Kp(n)?10:11:U(28295,{value:n})}function wt(n,e){if(n===e)return!0;const t=Sn(n);if(t!==Sn(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return Ms(n).isEqual(Ms(e));case 3:return(function(s,o){if(typeof s.timestampValue=="string"&&typeof o.timestampValue=="string"&&s.timestampValue.length===o.timestampValue.length)return s.timestampValue===o.timestampValue;const a=An(s.timestampValue),u=An(o.timestampValue);return a.seconds===u.seconds&&a.nanos===u.nanos})(n,e);case 5:return n.stringValue===e.stringValue;case 6:return(function(s,o){return Xn(s.bytesValue).isEqual(Xn(o.bytesValue))})(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return(function(s,o){return Ne(s.geoPointValue.latitude)===Ne(o.geoPointValue.latitude)&&Ne(s.geoPointValue.longitude)===Ne(o.geoPointValue.longitude)})(n,e);case 2:return(function(s,o){if("integerValue"in s&&"integerValue"in o)return Ne(s.integerValue)===Ne(o.integerValue);if("doubleValue"in s&&"doubleValue"in o){const a=Ne(s.doubleValue),u=Ne(o.doubleValue);return a===u?xs(a)===xs(u):isNaN(a)&&isNaN(u)}return!1})(n,e);case 9:return Jn(n.arrayValue.values||[],e.arrayValue.values||[],wt);case 10:case 11:return(function(s,o){const a=s.mapValue.fields||{},u=o.mapValue.fields||{};if(Ga(a)!==Ga(u))return!1;for(const h in a)if(a.hasOwnProperty(h)&&(u[h]===void 0||!wt(a[h],u[h])))return!1;return!0})(n,e);default:return U(52216,{left:n})}}function Or(n,e){return(n.values||[]).find((t=>wt(t,e)))!==void 0}function Yn(n,e){if(n===e)return 0;const t=Sn(n),r=Sn(e);if(t!==r)return z(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return z(n.booleanValue,e.booleanValue);case 2:return(function(o,a){const u=Ne(o.integerValue||o.doubleValue),h=Ne(a.integerValue||a.doubleValue);return u<h?-1:u>h?1:u===h?0:isNaN(u)?isNaN(h)?0:-1:1})(n,e);case 3:return za(n.timestampValue,e.timestampValue);case 4:return za(Ms(n),Ms(e));case 5:return Ui(n.stringValue,e.stringValue);case 6:return(function(o,a){const u=Xn(o),h=Xn(a);return u.compareTo(h)})(n.bytesValue,e.bytesValue);case 7:return(function(o,a){const u=o.split("/"),h=a.split("/");for(let f=0;f<u.length&&f<h.length;f++){const _=z(u[f],h[f]);if(_!==0)return _}return z(u.length,h.length)})(n.referenceValue,e.referenceValue);case 8:return(function(o,a){const u=z(Ne(o.latitude),Ne(a.latitude));return u!==0?u:z(Ne(o.longitude),Ne(a.longitude))})(n.geoPointValue,e.geoPointValue);case 9:return Wa(n.arrayValue,e.arrayValue);case 10:return(function(o,a){var b,P,N,M;const u=o.fields||{},h=a.fields||{},f=(b=u[ji])==null?void 0:b.arrayValue,_=(P=h[ji])==null?void 0:P.arrayValue,v=z(((N=f==null?void 0:f.values)==null?void 0:N.length)||0,((M=_==null?void 0:_.values)==null?void 0:M.length)||0);return v!==0?v:Wa(f,_)})(n.mapValue,e.mapValue);case 11:return(function(o,a){if(o===hs.mapValue&&a===hs.mapValue)return 0;if(o===hs.mapValue)return 1;if(a===hs.mapValue)return-1;const u=o.fields||{},h=Object.keys(u),f=a.fields||{},_=Object.keys(f);h.sort(),_.sort();for(let v=0;v<h.length&&v<_.length;++v){const b=Ui(h[v],_[v]);if(b!==0)return b;const P=Yn(u[h[v]],f[_[v]]);if(P!==0)return P}return z(h.length,_.length)})(n.mapValue,e.mapValue);default:throw U(23264,{he:t})}}function za(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return z(n,e);const t=An(n),r=An(e),s=z(t.seconds,r.seconds);return s!==0?s:z(t.nanos,r.nanos)}function Wa(n,e){const t=n.values||[],r=e.values||[];for(let s=0;s<t.length&&s<r.length;++s){const o=Yn(t[s],r[s]);if(o)return o}return z(t.length,r.length)}function Zn(n){return $i(n)}function $i(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?(function(t){const r=An(t);return`time(${r.seconds},${r.nanos})`})(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?(function(t){return Xn(t).toBase64()})(n.bytesValue):"referenceValue"in n?(function(t){return B.fromName(t).toString()})(n.referenceValue):"geoPointValue"in n?(function(t){return`geo(${t.latitude},${t.longitude})`})(n.geoPointValue):"arrayValue"in n?(function(t){let r="[",s=!0;for(const o of t.values||[])s?s=!1:r+=",",r+=$i(o);return r+"]"})(n.arrayValue):"mapValue"in n?(function(t){const r=Object.keys(t.fields||{}).sort();let s="{",o=!0;for(const a of r)o?o=!1:s+=",",s+=`${a}:${$i(t.fields[a])}`;return s+"}"})(n.mapValue):U(61005,{value:n})}function ws(n){switch(Sn(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=Eo(n);return e?16+ws(e):16;case 5:return 2*n.stringValue.length;case 6:return Xn(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return(function(r){return(r.values||[]).reduce(((s,o)=>s+ws(o)),0)})(n.arrayValue);case 10:case 11:return(function(r){let s=0;return rr(r.fields,((o,a)=>{s+=o.length+ws(a)})),s})(n.mapValue);default:throw U(13486,{value:n})}}function qi(n){return!!n&&"integerValue"in n}function Io(n){return!!n&&"arrayValue"in n}function As(n){return!!n&&"mapValue"in n}function Kp(n){var t,r;return((r=(((t=n==null?void 0:n.mapValue)==null?void 0:t.fields)||{})[Nc])==null?void 0:r.stringValue)===Dc}function wr(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){const e={mapValue:{fields:{}}};return rr(n.mapValue.fields,((t,r)=>e.mapValue.fields[t]=wr(r))),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=wr(n.arrayValue.values[t]);return e}return{...n}}function Qp(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===Wp}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class at{constructor(e){this.value=e}static empty(){return new at({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!As(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=wr(t)}setAll(e){let t=De.emptyPath(),r={},s=[];e.forEach(((a,u)=>{if(!t.isImmediateParentOf(u)){const h=this.getFieldsMap(t);this.applyChanges(h,r,s),r={},s=[],t=u.popLast()}a?r[u.lastSegment()]=wr(a):s.push(u.lastSegment())}));const o=this.getFieldsMap(t);this.applyChanges(o,r,s)}delete(e){const t=this.field(e.popLast());As(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return wt(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=t.mapValue.fields[e.get(r)];As(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,r){rr(t,((s,o)=>e[s]=o));for(const s of r)delete e[s]}clone(){return new at(wr(this.value))}}function Oc(n){const e=[];return rr(n.fields,((t,r)=>{const s=new De([t]);if(As(r)){const o=Oc(r.mapValue).fields;if(o.length===0)e.push(s);else for(const a of o)e.push(s.child(a))}else e.push(s)})),new ut(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ot{constructor(e,t,r,s,o,a,u){this.key=e,this.documentType=t,this.version=r,this.readTime=s,this.createTime=o,this.data=a,this.documentState=u}static newInvalidDocument(e){return new ot(e,0,re.min(),re.min(),re.min(),at.empty(),0)}static newFoundDocument(e,t,r,s){return new ot(e,1,t,re.min(),r,s,0)}static newNoDocument(e,t){return new ot(e,2,t,re.min(),re.min(),at.empty(),0)}static newUnknownDocument(e,t){return new ot(e,3,t,re.min(),re.min(),at.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(re.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=at.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=at.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=re.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof ot&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new ot(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fs{constructor(e,t){this.position=e,this.inclusive=t}}function Ka(n,e,t){let r=0;for(let s=0;s<n.position.length;s++){const o=e[s],a=n.position[s];if(o.field.isKeyField()?r=B.comparator(B.fromName(a.referenceValue),t.key):r=Yn(a,t.data.field(o.field)),o.dir==="desc"&&(r*=-1),r!==0)break}return r}function Qa(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!wt(n.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Us{constructor(e,t="asc"){this.field=e,this.dir=t}}function Jp(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vc{}class be extends Vc{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new Yp(e,t,r):t==="array-contains"?new tm(e,r):t==="in"?new nm(e,r):t==="not-in"?new rm(e,r):t==="array-contains-any"?new sm(e,r):new be(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new Zp(e,r):new em(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(Yn(t,this.value)):t!==null&&Sn(this.value)===Sn(t)&&this.matchesComparison(Yn(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return U(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class en extends Vc{constructor(e,t){super(),this.filters=e,this.op=t,this.Pe=null}static create(e,t){return new en(e,t)}matches(e){return xc(this)?this.filters.find((t=>!t.matches(e)))===void 0:this.filters.find((t=>t.matches(e)))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce(((e,t)=>e.concat(t.getFlattenedFilters())),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function xc(n){return n.op==="and"}function Mc(n){return Xp(n)&&xc(n)}function Xp(n){for(const e of n.filters)if(e instanceof en)return!1;return!0}function Gi(n){if(n instanceof be)return n.field.canonicalString()+n.op.toString()+Zn(n.value);if(Mc(n))return n.filters.map((e=>Gi(e))).join(",");{const e=n.filters.map((t=>Gi(t))).join(",");return`${n.op}(${e})`}}function Lc(n,e){return n instanceof be?(function(r,s){return s instanceof be&&r.op===s.op&&r.field.isEqual(s.field)&&wt(r.value,s.value)})(n,e):n instanceof en?(function(r,s){return s instanceof en&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce(((o,a,u)=>o&&Lc(a,s.filters[u])),!0):!1})(n,e):void U(19439)}function Bc(n){return n instanceof be?(function(t){return`${t.field.canonicalString()} ${t.op} ${Zn(t.value)}`})(n):n instanceof en?(function(t){return t.op.toString()+" {"+t.getFilters().map(Bc).join(" ,")+"}"})(n):"Filter"}class Yp extends be{constructor(e,t,r){super(e,t,r),this.key=B.fromName(r.referenceValue)}matches(e){const t=B.comparator(e.key,this.key);return this.matchesComparison(t)}}class Zp extends be{constructor(e,t){super(e,"in",t),this.keys=Fc("in",t)}matches(e){return this.keys.some((t=>t.isEqual(e.key)))}}class em extends be{constructor(e,t){super(e,"not-in",t),this.keys=Fc("not-in",t)}matches(e){return!this.keys.some((t=>t.isEqual(e.key)))}}function Fc(n,e){var t;return(((t=e.arrayValue)==null?void 0:t.values)||[]).map((r=>B.fromName(r.referenceValue)))}class tm extends be{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return Io(t)&&Or(t.arrayValue,this.value)}}class nm extends be{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&Or(this.value.arrayValue,t)}}class rm extends be{constructor(e,t){super(e,"not-in",t)}matches(e){if(Or(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!Or(this.value.arrayValue,t)}}class sm extends be{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!Io(t)||!t.arrayValue.values)&&t.arrayValue.values.some((r=>Or(this.value.arrayValue,r)))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class im{constructor(e,t=null,r=[],s=[],o=null,a=null,u=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=s,this.limit=o,this.startAt=a,this.endAt=u,this.Te=null}}function Ja(n,e=null,t=[],r=[],s=null,o=null,a=null){return new im(n,e,t,r,s,o,a)}function vo(n){const e=Y(n);if(e.Te===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map((r=>Gi(r))).join(","),t+="|ob:",t+=e.orderBy.map((r=>(function(o){return o.field.canonicalString()+o.dir})(r))).join(","),yo(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map((r=>Zn(r))).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map((r=>Zn(r))).join(",")),e.Te=t}return e.Te}function To(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!Jp(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!Lc(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!Qa(n.startAt,e.startAt)&&Qa(n.endAt,e.endAt)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Js{constructor(e,t=null,r=[],s=[],o=null,a="F",u=null,h=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=s,this.limit=o,this.limitType=a,this.startAt=u,this.endAt=h,this.Ie=null,this.Ee=null,this.Re=null,this.startAt,this.endAt}}function om(n,e,t,r,s,o,a,u){return new Js(n,e,t,r,s,o,a,u)}function am(n){return new Js(n)}function Xa(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function lm(n){return B.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function cm(n){return n.collectionGroup!==null}function Ar(n){const e=Y(n);if(e.Ie===null){e.Ie=[];const t=new Set;for(const o of e.explicitOrderBy)e.Ie.push(o),t.add(o.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let u=new Oe(De.comparator);return a.filters.forEach((h=>{h.getFlattenedFilters().forEach((f=>{f.isInequality()&&(u=u.add(f.field))}))})),u})(e).forEach((o=>{t.has(o.canonicalString())||o.isKeyField()||e.Ie.push(new Us(o,r))})),t.has(De.keyField().canonicalString())||e.Ie.push(new Us(De.keyField(),r))}return e.Ie}function _n(n){const e=Y(n);return e.Ee||(e.Ee=um(e,Ar(n))),e.Ee}function um(n,e){if(n.limitType==="F")return Ja(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map((s=>{const o=s.dir==="desc"?"asc":"desc";return new Us(s.field,o)}));const t=n.endAt?new Fs(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new Fs(n.startAt.position,n.startAt.inclusive):null;return Ja(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function Hi(n,e,t){return new Js(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function Uc(n,e){return To(_n(n),_n(e))&&n.limitType===e.limitType}function jc(n){return`${vo(_n(n))}|lt:${n.limitType}`}function Er(n){return`Query(target=${(function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map((s=>Bc(s))).join(", ")}]`),yo(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map((s=>(function(a){return`${a.field.canonicalString()} (${a.dir})`})(s))).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map((s=>Zn(s))).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map((s=>Zn(s))).join(",")),`Target(${r})`})(_n(n))}; limitType=${n.limitType})`}function wo(n,e){return e.isFoundDocument()&&(function(r,s){const o=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(o):B.isDocumentKey(r.path)?r.path.isEqual(o):r.path.isImmediateParentOf(o)})(n,e)&&(function(r,s){for(const o of Ar(r))if(!o.field.isKeyField()&&s.data.field(o.field)===null)return!1;return!0})(n,e)&&(function(r,s){for(const o of r.filters)if(!o.matches(s))return!1;return!0})(n,e)&&(function(r,s){return!(r.startAt&&!(function(a,u,h){const f=Ka(a,u,h);return a.inclusive?f<=0:f<0})(r.startAt,Ar(r),s)||r.endAt&&!(function(a,u,h){const f=Ka(a,u,h);return a.inclusive?f>=0:f>0})(r.endAt,Ar(r),s))})(n,e)}function hm(n){return(e,t)=>{let r=!1;for(const s of Ar(n)){const o=dm(s,e,t);if(o!==0)return o;r=r||s.field.isKeyField()}return 0}}function dm(n,e,t){const r=n.field.isKeyField()?B.comparator(e.key,t.key):(function(o,a,u){const h=a.data.field(o),f=u.data.field(o);return h!==null&&f!==null?Yn(h,f):U(42886)})(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return U(19790,{direction:n.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bn{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[s,o]of r)if(this.equalsFn(s,e))return o}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let o=0;o<s.length;o++)if(this.equalsFn(s[o][0],e))return void(s[o]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[t]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){rr(this.inner,((t,r)=>{for(const[s,o]of r)e(s,o)}))}isEmpty(){return bc(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fm=new We(B.comparator);function js(){return fm}const $c=new We(B.comparator);function ds(...n){let e=$c;for(const t of n)e=e.insert(t.key,t);return e}function qc(n){let e=$c;return n.forEach(((t,r)=>e=e.insert(t,r.overlayedDocument))),e}function mn(){return Sr()}function Gc(){return Sr()}function Sr(){return new bn((n=>n.toString()),((n,e)=>n.isEqual(e)))}const pm=new We(B.comparator),mm=new Oe(B.comparator);function Ue(...n){let e=mm;for(const t of n)e=e.add(t);return e}const gm=new Oe(z);function ym(){return gm}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ao(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:xs(e)?"-0":e}}function Hc(n){return{integerValue:""+n}}function _m(n,e){return Up(e)?Hc(e):Ao(n,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xs{constructor(){this._=void 0}}function Em(n,e,t){return n instanceof $s?(function(s,o){const a={fields:{[Rc]:{stringValue:Cc},[kc]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return o&&_o(o)&&(o=Eo(o)),o&&(a.fields[Pc]=o),{mapValue:a}})(t,e):n instanceof Vr?Wc(n,e):n instanceof xr?Kc(n,e):(function(s,o){const a=zc(s,o),u=Ya(a)+Ya(s.Ae);return qi(a)&&qi(s.Ae)?Hc(u):Ao(s.serializer,u)})(n,e)}function Im(n,e,t){return n instanceof Vr?Wc(n,e):n instanceof xr?Kc(n,e):t}function zc(n,e){return n instanceof qs?(function(r){return qi(r)||(function(o){return!!o&&"doubleValue"in o})(r)})(e)?e:{integerValue:0}:null}class $s extends Xs{}class Vr extends Xs{constructor(e){super(),this.elements=e}}function Wc(n,e){const t=Qc(e);for(const r of n.elements)t.some((s=>wt(s,r)))||t.push(r);return{arrayValue:{values:t}}}class xr extends Xs{constructor(e){super(),this.elements=e}}function Kc(n,e){let t=Qc(e);for(const r of n.elements)t=t.filter((s=>!wt(s,r)));return{arrayValue:{values:t}}}class qs extends Xs{constructor(e,t){super(),this.serializer=e,this.Ae=t}}function Ya(n){return Ne(n.integerValue||n.doubleValue)}function Qc(n){return Io(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}function vm(n,e){return n.field.isEqual(e.field)&&(function(r,s){return r instanceof Vr&&s instanceof Vr||r instanceof xr&&s instanceof xr?Jn(r.elements,s.elements,wt):r instanceof qs&&s instanceof qs?wt(r.Ae,s.Ae):r instanceof $s&&s instanceof $s})(n.transform,e.transform)}class Tm{constructor(e,t){this.version=e,this.transformResults=t}}class Nt{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new Nt}static exists(e){return new Nt(void 0,e)}static updateTime(e){return new Nt(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Ss(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class Ys{}function Jc(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new Yc(n.key,Nt.none()):new Gr(n.key,n.data,Nt.none());{const t=n.data,r=at.empty();let s=new Oe(De.comparator);for(let o of e.fields)if(!s.has(o)){let a=t.field(o);a===null&&o.length>1&&(o=o.popLast(),a=t.field(o)),a===null?r.delete(o):r.set(o,a),s=s.add(o)}return new Cn(n.key,r,new ut(s.toArray()),Nt.none())}}function wm(n,e,t){n instanceof Gr?(function(s,o,a){const u=s.value.clone(),h=el(s.fieldTransforms,o,a.transformResults);u.setAll(h),o.convertToFoundDocument(a.version,u).setHasCommittedMutations()})(n,e,t):n instanceof Cn?(function(s,o,a){if(!Ss(s.precondition,o))return void o.convertToUnknownDocument(a.version);const u=el(s.fieldTransforms,o,a.transformResults),h=o.data;h.setAll(Xc(s)),h.setAll(u),o.convertToFoundDocument(a.version,h).setHasCommittedMutations()})(n,e,t):(function(s,o,a){o.convertToNoDocument(a.version).setHasCommittedMutations()})(0,e,t)}function br(n,e,t,r){return n instanceof Gr?(function(o,a,u,h){if(!Ss(o.precondition,a))return u;const f=o.value.clone(),_=tl(o.fieldTransforms,h,a);return f.setAll(_),a.convertToFoundDocument(a.version,f).setHasLocalMutations(),null})(n,e,t,r):n instanceof Cn?(function(o,a,u,h){if(!Ss(o.precondition,a))return u;const f=tl(o.fieldTransforms,h,a),_=a.data;return _.setAll(Xc(o)),_.setAll(f),a.convertToFoundDocument(a.version,_).setHasLocalMutations(),u===null?null:u.unionWith(o.fieldMask.fields).unionWith(o.fieldTransforms.map((v=>v.field)))})(n,e,t,r):(function(o,a,u){return Ss(o.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):u})(n,e,t)}function Am(n,e){let t=null;for(const r of n.fieldTransforms){const s=e.data.field(r.field),o=zc(r.transform,s||null);o!=null&&(t===null&&(t=at.empty()),t.set(r.field,o))}return t||null}function Za(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!(function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&Jn(r,s,((o,a)=>vm(o,a)))})(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class Gr extends Ys{constructor(e,t,r,s=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class Cn extends Ys{constructor(e,t,r,s,o=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=s,this.fieldTransforms=o,this.type=1}getFieldMask(){return this.fieldMask}}function Xc(n){const e=new Map;return n.fieldMask.fields.forEach((t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}})),e}function el(n,e,t){const r=new Map;ue(n.length===t.length,32656,{Ve:t.length,de:n.length});for(let s=0;s<t.length;s++){const o=n[s],a=o.transform,u=e.data.field(o.field);r.set(o.field,Im(a,u,t[s]))}return r}function tl(n,e,t){const r=new Map;for(const s of n){const o=s.transform,a=t.data.field(s.field);r.set(s.field,Em(o,a,e))}return r}class Yc extends Ys{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class Sm extends Ys{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bm{constructor(e,t,r,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const o=this.mutations[s];o.key.isEqual(e.key)&&wm(o,e,r[s])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=br(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=br(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=Gc();return this.mutations.forEach((s=>{const o=e.get(s.key),a=o.overlayedDocument;let u=this.applyToLocalView(a,o.mutatedFields);u=t.has(s.key)?null:u;const h=Jc(a,u);h!==null&&r.set(s.key,h),a.isValidDocument()||a.convertToNoDocument(re.min())})),r}keys(){return this.mutations.reduce(((e,t)=>e.add(t.key)),Ue())}isEqual(e){return this.batchId===e.batchId&&Jn(this.mutations,e.mutations,((t,r)=>Za(t,r)))&&Jn(this.baseMutations,e.baseMutations,((t,r)=>Za(t,r)))}}class So{constructor(e,t,r,s){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=s}static from(e,t,r){ue(e.mutations.length===r.length,58842,{me:e.mutations.length,fe:r.length});let s=(function(){return pm})();const o=e.mutations;for(let a=0;a<o.length;a++)s=s.insert(o[a].key,r[a].version);return new So(e,t,r,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cm{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ie,q;function Rm(n){switch(n){case C.OK:return U(64938);case C.CANCELLED:case C.UNKNOWN:case C.DEADLINE_EXCEEDED:case C.RESOURCE_EXHAUSTED:case C.INTERNAL:case C.UNAVAILABLE:case C.UNAUTHENTICATED:return!1;case C.INVALID_ARGUMENT:case C.NOT_FOUND:case C.ALREADY_EXISTS:case C.PERMISSION_DENIED:case C.FAILED_PRECONDITION:case C.ABORTED:case C.OUT_OF_RANGE:case C.UNIMPLEMENTED:case C.DATA_LOSS:return!0;default:return U(15467,{code:n})}}function Pm(n){if(n===void 0)return wn("GRPC error has no .code"),C.UNKNOWN;switch(n){case Ie.OK:return C.OK;case Ie.CANCELLED:return C.CANCELLED;case Ie.UNKNOWN:return C.UNKNOWN;case Ie.DEADLINE_EXCEEDED:return C.DEADLINE_EXCEEDED;case Ie.RESOURCE_EXHAUSTED:return C.RESOURCE_EXHAUSTED;case Ie.INTERNAL:return C.INTERNAL;case Ie.UNAVAILABLE:return C.UNAVAILABLE;case Ie.UNAUTHENTICATED:return C.UNAUTHENTICATED;case Ie.INVALID_ARGUMENT:return C.INVALID_ARGUMENT;case Ie.NOT_FOUND:return C.NOT_FOUND;case Ie.ALREADY_EXISTS:return C.ALREADY_EXISTS;case Ie.PERMISSION_DENIED:return C.PERMISSION_DENIED;case Ie.FAILED_PRECONDITION:return C.FAILED_PRECONDITION;case Ie.ABORTED:return C.ABORTED;case Ie.OUT_OF_RANGE:return C.OUT_OF_RANGE;case Ie.UNIMPLEMENTED:return C.UNIMPLEMENTED;case Ie.DATA_LOSS:return C.DATA_LOSS;default:return U(39323,{code:n})}}(q=Ie||(Ie={}))[q.OK=0]="OK",q[q.CANCELLED=1]="CANCELLED",q[q.UNKNOWN=2]="UNKNOWN",q[q.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",q[q.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",q[q.NOT_FOUND=5]="NOT_FOUND",q[q.ALREADY_EXISTS=6]="ALREADY_EXISTS",q[q.PERMISSION_DENIED=7]="PERMISSION_DENIED",q[q.UNAUTHENTICATED=16]="UNAUTHENTICATED",q[q.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",q[q.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",q[q.ABORTED=10]="ABORTED",q[q.OUT_OF_RANGE=11]="OUT_OF_RANGE",q[q.UNIMPLEMENTED=12]="UNIMPLEMENTED",q[q.INTERNAL=13]="INTERNAL",q[q.UNAVAILABLE=14]="UNAVAILABLE",q[q.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */new co([4294967295,4294967295],0);class km{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function zi(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Nm(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function Dm(n,e){return zi(n,e.toTimestamp())}function Hn(n){return ue(!!n,49232),re.fromTimestamp((function(t){const r=An(t);return new se(r.seconds,r.nanos)})(n))}function Zc(n,e){return Wi(n,e).canonicalString()}function Wi(n,e){const t=(function(s){return new ae(["projects",s.projectId,"databases",s.database])})(n).child("documents");return e===void 0?t:t.child(e)}function Om(n){const e=ae.fromString(n);return ue(jm(e),10190,{key:e.toString()}),e}function Ki(n,e){return Zc(n.databaseId,e.path)}function Vm(n){const e=Om(n);return e.length===4?ae.emptyPath():Mm(e)}function xm(n){return new ae(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function Mm(n){return ue(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function nl(n,e,t){return{name:Ki(n,e),fields:t.value.mapValue.fields}}function Lm(n,e){let t;if(e instanceof Gr)t={update:nl(n,e.key,e.value)};else if(e instanceof Yc)t={delete:Ki(n,e.key)};else if(e instanceof Cn)t={update:nl(n,e.key,e.data),updateMask:Um(e.fieldMask)};else{if(!(e instanceof Sm))return U(16599,{dt:e.type});t={verify:Ki(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map((r=>(function(o,a){const u=a.transform;if(u instanceof $s)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(u instanceof Vr)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:u.elements}};if(u instanceof xr)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:u.elements}};if(u instanceof qs)return{fieldPath:a.field.canonicalString(),increment:u.Ae};throw U(20930,{transform:a.transform})})(0,r)))),e.precondition.isNone||(t.currentDocument=(function(s,o){return o.updateTime!==void 0?{updateTime:Dm(s,o.updateTime)}:o.exists!==void 0?{exists:o.exists}:U(27497)})(n,e.precondition)),t}function Bm(n,e){return n&&n.length>0?(ue(e!==void 0,14353),n.map((t=>(function(s,o){let a=s.updateTime?Hn(s.updateTime):Hn(o);return a.isEqual(re.min())&&(a=Hn(o)),new Tm(a,s.transformResults||[])})(t,e)))):[]}function Fm(n){let e=Vm(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let s=null;if(r>0){ue(r===1,65062);const _=t.from[0];_.allDescendants?s=_.collectionId:e=e.child(_.collectionId)}let o=[];t.where&&(o=(function(v){const b=eu(v);return b instanceof en&&Mc(b)?b.getFilters():[b]})(t.where));let a=[];t.orderBy&&(a=(function(v){return v.map((b=>(function(N){return new Us(Un(N.field),(function(x){switch(x){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(N.direction))})(b)))})(t.orderBy));let u=null;t.limit&&(u=(function(v){let b;return b=typeof v=="object"?v.value:v,yo(b)?null:b})(t.limit));let h=null;t.startAt&&(h=(function(v){const b=!!v.before,P=v.values||[];return new Fs(P,b)})(t.startAt));let f=null;return t.endAt&&(f=(function(v){const b=!v.before,P=v.values||[];return new Fs(P,b)})(t.endAt)),om(e,s,a,o,u,"F",h,f)}function eu(n){return n.unaryFilter!==void 0?(function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=Un(t.unaryFilter.field);return be.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=Un(t.unaryFilter.field);return be.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const o=Un(t.unaryFilter.field);return be.create(o,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=Un(t.unaryFilter.field);return be.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return U(61313);default:return U(60726)}})(n):n.fieldFilter!==void 0?(function(t){return be.create(Un(t.fieldFilter.field),(function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return U(58110);default:return U(50506)}})(t.fieldFilter.op),t.fieldFilter.value)})(n):n.compositeFilter!==void 0?(function(t){return en.create(t.compositeFilter.filters.map((r=>eu(r))),(function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return U(1026)}})(t.compositeFilter.op))})(n):U(30097,{filter:n})}function Un(n){return De.fromServerFormat(n.fieldPath)}function Um(n){const e=[];return n.fields.forEach((t=>e.push(t.canonicalString()))),{fieldPaths:e}}function jm(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}function tu(n){return!!n&&typeof n._toProto=="function"&&n._protoValueType==="ProtoValue"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $m{constructor(e){this.yt=e}}function qm(n){const e=Fm({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?Hi(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gm{constructor(){this.bn=new Hm}addToCollectionParentIndex(e,t){return this.bn.add(t),S.resolve()}getCollectionParents(e,t){return S.resolve(this.bn.getEntries(t))}addFieldIndex(e,t){return S.resolve()}deleteFieldIndex(e,t){return S.resolve()}deleteAllFieldIndexes(e){return S.resolve()}createTargetIndexes(e,t){return S.resolve()}getDocumentsMatchingTarget(e,t){return S.resolve(null)}getIndexType(e,t){return S.resolve(0)}getFieldIndexes(e,t){return S.resolve([])}getNextCollectionGroupToUpdate(e){return S.resolve(null)}getMinOffset(e,t){return S.resolve(Zt.min())}getMinOffsetFromCollectionGroup(e,t){return S.resolve(Zt.min())}updateCollectionGroup(e,t,r){return S.resolve()}updateIndexEntries(e,t){return S.resolve()}}class Hm{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t]||new Oe(ae.comparator),o=!s.has(r);return this.index[t]=s.add(r),o}has(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t];return s&&s.has(r)}getEntries(e){return(this.index[e]||new Oe(ae.comparator)).toArray()}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rl={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},nu=41943040;class ze{static withCacheSize(e){return new ze(e,ze.DEFAULT_COLLECTION_PERCENTILE,ze.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ze.DEFAULT_COLLECTION_PERCENTILE=10,ze.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,ze.DEFAULT=new ze(nu,ze.DEFAULT_COLLECTION_PERCENTILE,ze.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),ze.DISABLED=new ze(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tn{constructor(e){this.sr=e}next(){return this.sr+=2,this.sr}static _r(){return new tn(0)}static ar(){return new tn(-1)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sl="LruGarbageCollector",zm=1048576;function il([n,e],[t,r]){const s=z(n,t);return s===0?z(e,r):s}class Wm{constructor(e){this.Pr=e,this.buffer=new Oe(il),this.Tr=0}Ir(){return++this.Tr}Er(e){const t=[e,this.Ir()];if(this.buffer.size<this.Pr)this.buffer=this.buffer.add(t);else{const r=this.buffer.last();il(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}}class Km{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Ar(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Ar(e){D(sl,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,(async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){qr(t)?D(sl,"Ignoring IndexedDB error during garbage collection: ",t):await po(t)}await this.Ar(3e5)}))}}class Qm{constructor(e,t){this.Vr=e,this.params=t}calculateTargetCount(e,t){return this.Vr.dr(e).next((r=>Math.floor(t/100*r)))}nthSequenceNumber(e,t){if(t===0)return S.resolve(mo.ce);const r=new Wm(t);return this.Vr.forEachTarget(e,(s=>r.Er(s.sequenceNumber))).next((()=>this.Vr.mr(e,(s=>r.Er(s))))).next((()=>r.maxValue))}removeTargets(e,t,r){return this.Vr.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.Vr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(D("LruGarbageCollector","Garbage collection skipped; disabled"),S.resolve(rl)):this.getCacheSize(e).next((r=>r<this.params.cacheSizeCollectionThreshold?(D("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),rl):this.gr(e,t)))}getCacheSize(e){return this.Vr.getCacheSize(e)}gr(e,t){let r,s,o,a,u,h,f;const _=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next((v=>(v>this.params.maximumSequenceNumbersToCollect?(D("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${v}`),s=this.params.maximumSequenceNumbersToCollect):s=v,a=Date.now(),this.nthSequenceNumber(e,s)))).next((v=>(r=v,u=Date.now(),this.removeTargets(e,r,t)))).next((v=>(o=v,h=Date.now(),this.removeOrphanedDocuments(e,r)))).next((v=>(f=Date.now(),Fn()<=j.DEBUG&&D("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-_}ms
	Determined least recently used ${s} in `+(u-a)+`ms
	Removed ${o} targets in `+(h-u)+`ms
	Removed ${v} documents in `+(f-h)+`ms
Total Duration: ${f-_}ms`),S.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:o,documentsRemoved:v}))))}}function Jm(n,e){return new Qm(n,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xm{constructor(){this.changes=new bn((e=>e.toString()),((e,t)=>e.isEqual(t))),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,ot.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?S.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ym{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zm{constructor(e,t,r,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next((s=>(r=s,this.remoteDocumentCache.getEntry(e,t)))).next((s=>(r!==null&&br(r.mutation,s,ut.empty(),se.now()),s)))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next((r=>this.getLocalViewOfDocuments(e,r,Ue()).next((()=>r))))}getLocalViewOfDocuments(e,t,r=Ue()){const s=mn();return this.populateOverlays(e,s,t).next((()=>this.computeViews(e,t,s,r).next((o=>{let a=ds();return o.forEach(((u,h)=>{a=a.insert(u,h.overlayedDocument)})),a}))))}getOverlayedDocuments(e,t){const r=mn();return this.populateOverlays(e,r,t).next((()=>this.computeViews(e,t,r,Ue())))}populateOverlays(e,t,r){const s=[];return r.forEach((o=>{t.has(o)||s.push(o)})),this.documentOverlayCache.getOverlays(e,s).next((o=>{o.forEach(((a,u)=>{t.set(a,u)}))}))}computeViews(e,t,r,s){let o=js();const a=Sr(),u=(function(){return Sr()})();return t.forEach(((h,f)=>{const _=r.get(f.key);s.has(f.key)&&(_===void 0||_.mutation instanceof Cn)?o=o.insert(f.key,f):_!==void 0?(a.set(f.key,_.mutation.getFieldMask()),br(_.mutation,f,_.mutation.getFieldMask(),se.now())):a.set(f.key,ut.empty())})),this.recalculateAndSaveOverlays(e,o).next((h=>(h.forEach(((f,_)=>a.set(f,_))),t.forEach(((f,_)=>u.set(f,new Ym(_,a.get(f)??null)))),u)))}recalculateAndSaveOverlays(e,t){const r=Sr();let s=new We(((a,u)=>a-u)),o=Ue();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next((a=>{for(const u of a)u.keys().forEach((h=>{const f=t.get(h);if(f===null)return;let _=r.get(h)||ut.empty();_=u.applyToLocalView(f,_),r.set(h,_);const v=(s.get(u.batchId)||Ue()).add(h);s=s.insert(u.batchId,v)}))})).next((()=>{const a=[],u=s.getReverseIterator();for(;u.hasNext();){const h=u.getNext(),f=h.key,_=h.value,v=Gc();_.forEach((b=>{if(!o.has(b)){const P=Jc(t.get(b),r.get(b));P!==null&&v.set(b,P),o=o.add(b)}})),a.push(this.documentOverlayCache.saveOverlays(e,f,v))}return S.waitFor(a)})).next((()=>r))}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next((r=>this.recalculateAndSaveOverlays(e,r)))}getDocumentsMatchingQuery(e,t,r,s){return lm(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):cm(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,s):this.getDocumentsMatchingCollectionQuery(e,t,r,s)}getNextDocuments(e,t,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,s).next((o=>{const a=s-o.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,s-o.size):S.resolve(mn());let u=Dr,h=o;return a.next((f=>S.forEach(f,((_,v)=>(u<v.largestBatchId&&(u=v.largestBatchId),o.get(_)?S.resolve():this.remoteDocumentCache.getEntry(e,_).next((b=>{h=h.insert(_,b)}))))).next((()=>this.populateOverlays(e,f,o))).next((()=>this.computeViews(e,h,f,Ue()))).next((_=>({batchId:u,changes:qc(_)})))))}))}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new B(t)).next((r=>{let s=ds();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s}))}getDocumentsMatchingCollectionGroupQuery(e,t,r,s){const o=t.collectionGroup;let a=ds();return this.indexManager.getCollectionParents(e,o).next((u=>S.forEach(u,(h=>{const f=(function(v,b){return new Js(b,null,v.explicitOrderBy.slice(),v.filters.slice(),v.limit,v.limitType,v.startAt,v.endAt)})(t,h.child(o));return this.getDocumentsMatchingCollectionQuery(e,f,r,s).next((_=>{_.forEach(((v,b)=>{a=a.insert(v,b)}))}))})).next((()=>a))))}getDocumentsMatchingCollectionQuery(e,t,r,s){let o;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next((a=>(o=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,o,s)))).next((a=>{o.forEach(((h,f)=>{const _=f.getKey();a.get(_)===null&&(a=a.insert(_,ot.newInvalidDocument(_)))}));let u=ds();return a.forEach(((h,f)=>{const _=o.get(h);_!==void 0&&br(_.mutation,f,ut.empty(),se.now()),wo(t,f)&&(u=u.insert(h,f))})),u}))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eg{constructor(e){this.serializer=e,this.Nr=new Map,this.Br=new Map}getBundleMetadata(e,t){return S.resolve(this.Nr.get(t))}saveBundleMetadata(e,t){return this.Nr.set(t.id,(function(s){return{id:s.id,version:s.version,createTime:Hn(s.createTime)}})(t)),S.resolve()}getNamedQuery(e,t){return S.resolve(this.Br.get(t))}saveNamedQuery(e,t){return this.Br.set(t.name,(function(s){return{name:s.name,query:qm(s.bundledQuery),readTime:Hn(s.readTime)}})(t)),S.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tg{constructor(){this.overlays=new We(B.comparator),this.Lr=new Map}getOverlay(e,t){return S.resolve(this.overlays.get(t))}getOverlays(e,t){const r=mn();return S.forEach(t,(s=>this.getOverlay(e,s).next((o=>{o!==null&&r.set(s,o)})))).next((()=>r))}saveOverlays(e,t,r){return r.forEach(((s,o)=>{this.St(e,t,o)})),S.resolve()}removeOverlaysForBatchId(e,t,r){const s=this.Lr.get(r);return s!==void 0&&(s.forEach((o=>this.overlays=this.overlays.remove(o))),this.Lr.delete(r)),S.resolve()}getOverlaysForCollection(e,t,r){const s=mn(),o=t.length+1,a=new B(t.child("")),u=this.overlays.getIteratorFrom(a);for(;u.hasNext();){const h=u.getNext().value,f=h.getKey();if(!t.isPrefixOf(f.path))break;f.path.length===o&&h.largestBatchId>r&&s.set(h.getKey(),h)}return S.resolve(s)}getOverlaysForCollectionGroup(e,t,r,s){let o=new We(((f,_)=>f-_));const a=this.overlays.getIterator();for(;a.hasNext();){const f=a.getNext().value;if(f.getKey().getCollectionGroup()===t&&f.largestBatchId>r){let _=o.get(f.largestBatchId);_===null&&(_=mn(),o=o.insert(f.largestBatchId,_)),_.set(f.getKey(),f)}}const u=mn(),h=o.getIterator();for(;h.hasNext()&&(h.getNext().value.forEach(((f,_)=>u.set(f,_))),!(u.size()>=s)););return S.resolve(u)}St(e,t,r){const s=this.overlays.get(r.key);if(s!==null){const a=this.Lr.get(s.largestBatchId).delete(r.key);this.Lr.set(s.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new Cm(t,r));let o=this.Lr.get(t);o===void 0&&(o=Ue(),this.Lr.set(t,o)),this.Lr.set(t,o.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ng{constructor(){this.sessionToken=Tt.EMPTY_BYTE_STRING}getSessionToken(e){return S.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,S.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bo{constructor(){this.kr=new Oe(Se.Kr),this.qr=new Oe(Se.Ur)}isEmpty(){return this.kr.isEmpty()}addReference(e,t){const r=new Se(e,t);this.kr=this.kr.add(r),this.qr=this.qr.add(r)}$r(e,t){e.forEach((r=>this.addReference(r,t)))}removeReference(e,t){this.Wr(new Se(e,t))}Qr(e,t){e.forEach((r=>this.removeReference(r,t)))}Gr(e){const t=new B(new ae([])),r=new Se(t,e),s=new Se(t,e+1),o=[];return this.qr.forEachInRange([r,s],(a=>{this.Wr(a),o.push(a.key)})),o}zr(){this.kr.forEach((e=>this.Wr(e)))}Wr(e){this.kr=this.kr.delete(e),this.qr=this.qr.delete(e)}jr(e){const t=new B(new ae([])),r=new Se(t,e),s=new Se(t,e+1);let o=Ue();return this.qr.forEachInRange([r,s],(a=>{o=o.add(a.key)})),o}containsKey(e){const t=new Se(e,0),r=this.kr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class Se{constructor(e,t){this.key=e,this.Jr=t}static Kr(e,t){return B.comparator(e.key,t.key)||z(e.Jr,t.Jr)}static Ur(e,t){return z(e.Jr,t.Jr)||B.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rg{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Yn=1,this.Hr=new Oe(Se.Kr)}checkEmpty(e){return S.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,s){const o=this.Yn;this.Yn++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new bm(o,t,r,s);this.mutationQueue.push(a);for(const u of s)this.Hr=this.Hr.add(new Se(u.key,o)),this.indexManager.addToCollectionParentIndex(e,u.key.path.popLast());return S.resolve(a)}lookupMutationBatch(e,t){return S.resolve(this.Zr(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,s=this.Xr(r),o=s<0?0:s;return S.resolve(this.mutationQueue.length>o?this.mutationQueue[o]:null)}getHighestUnacknowledgedBatchId(){return S.resolve(this.mutationQueue.length===0?go:this.Yn-1)}getAllMutationBatches(e){return S.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new Se(t,0),s=new Se(t,Number.POSITIVE_INFINITY),o=[];return this.Hr.forEachInRange([r,s],(a=>{const u=this.Zr(a.Jr);o.push(u)})),S.resolve(o)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new Oe(z);return t.forEach((s=>{const o=new Se(s,0),a=new Se(s,Number.POSITIVE_INFINITY);this.Hr.forEachInRange([o,a],(u=>{r=r.add(u.Jr)}))})),S.resolve(this.Yr(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,s=r.length+1;let o=r;B.isDocumentKey(o)||(o=o.child(""));const a=new Se(new B(o),0);let u=new Oe(z);return this.Hr.forEachWhile((h=>{const f=h.key.path;return!!r.isPrefixOf(f)&&(f.length===s&&(u=u.add(h.Jr)),!0)}),a),S.resolve(this.Yr(u))}Yr(e){const t=[];return e.forEach((r=>{const s=this.Zr(r);s!==null&&t.push(s)})),t}removeMutationBatch(e,t){ue(this.ei(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Hr;return S.forEach(t.mutations,(s=>{const o=new Se(s.key,t.batchId);return r=r.delete(o),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)})).next((()=>{this.Hr=r}))}nr(e){}containsKey(e,t){const r=new Se(t,0),s=this.Hr.firstAfterOrEqual(r);return S.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,S.resolve()}ei(e,t){return this.Xr(e)}Xr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Zr(e){const t=this.Xr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sg{constructor(e){this.ti=e,this.docs=(function(){return new We(B.comparator)})(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,s=this.docs.get(r),o=s?s.size:0,a=this.ti(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:a}),this.size+=a-o,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return S.resolve(r?r.document.mutableCopy():ot.newInvalidDocument(t))}getEntries(e,t){let r=js();return t.forEach((s=>{const o=this.docs.get(s);r=r.insert(s,o?o.document.mutableCopy():ot.newInvalidDocument(s))})),S.resolve(r)}getDocumentsMatchingQuery(e,t,r,s){let o=js();const a=t.path,u=new B(a.child("__id-9223372036854775808__")),h=this.docs.getIteratorFrom(u);for(;h.hasNext();){const{key:f,value:{document:_}}=h.getNext();if(!a.isPrefixOf(f.path))break;f.path.length>a.length+1||Mp(xp(_),r)<=0||(s.has(_.key)||wo(t,_))&&(o=o.insert(_.key,_.mutableCopy()))}return S.resolve(o)}getAllFromCollectionGroup(e,t,r,s){U(9500)}ni(e,t){return S.forEach(this.docs,(r=>t(r)))}newChangeBuffer(e){return new ig(this)}getSize(e){return S.resolve(this.size)}}class ig extends Xm{constructor(e){super(),this.Mr=e}applyChanges(e){const t=[];return this.changes.forEach(((r,s)=>{s.isValidDocument()?t.push(this.Mr.addEntry(e,s)):this.Mr.removeEntry(r)})),S.waitFor(t)}getFromCache(e,t){return this.Mr.getEntry(e,t)}getAllFromCache(e,t){return this.Mr.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class og{constructor(e){this.persistence=e,this.ri=new bn((t=>vo(t)),To),this.lastRemoteSnapshotVersion=re.min(),this.highestTargetId=0,this.ii=0,this.si=new bo,this.targetCount=0,this.oi=tn._r()}forEachTarget(e,t){return this.ri.forEach(((r,s)=>t(s))),S.resolve()}getLastRemoteSnapshotVersion(e){return S.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return S.resolve(this.ii)}allocateTargetId(e){return this.highestTargetId=this.oi.next(),S.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.ii&&(this.ii=t),S.resolve()}lr(e){this.ri.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.oi=new tn(t),this.highestTargetId=t),e.sequenceNumber>this.ii&&(this.ii=e.sequenceNumber)}addTargetData(e,t){return this.lr(t),this.targetCount+=1,S.resolve()}updateTargetData(e,t){return this.lr(t),S.resolve()}removeTargetData(e,t){return this.ri.delete(t.target),this.si.Gr(t.targetId),this.targetCount-=1,S.resolve()}removeTargets(e,t,r){let s=0;const o=[];return this.ri.forEach(((a,u)=>{u.sequenceNumber<=t&&r.get(u.targetId)===null&&(this.ri.delete(a),o.push(this.removeMatchingKeysForTargetId(e,u.targetId)),s++)})),S.waitFor(o).next((()=>s))}getTargetCount(e){return S.resolve(this.targetCount)}getTargetData(e,t){const r=this.ri.get(t)||null;return S.resolve(r)}addMatchingKeys(e,t,r){return this.si.$r(t,r),S.resolve()}removeMatchingKeys(e,t,r){this.si.Qr(t,r);const s=this.persistence.referenceDelegate,o=[];return s&&t.forEach((a=>{o.push(s.markPotentiallyOrphaned(e,a))})),S.waitFor(o)}removeMatchingKeysForTargetId(e,t){return this.si.Gr(t),S.resolve()}getMatchingKeysForTargetId(e,t){const r=this.si.jr(t);return S.resolve(r)}containsKey(e,t){return S.resolve(this.si.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ru{constructor(e,t){this._i={},this.overlays={},this.ai=new mo(0),this.ui=!1,this.ui=!0,this.ci=new ng,this.referenceDelegate=e(this),this.li=new og(this),this.indexManager=new Gm,this.remoteDocumentCache=(function(s){return new sg(s)})((r=>this.referenceDelegate.hi(r))),this.serializer=new $m(t),this.Pi=new eg(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ui=!1,Promise.resolve()}get started(){return this.ui}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new tg,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this._i[e.toKey()];return r||(r=new rg(t,this.referenceDelegate),this._i[e.toKey()]=r),r}getGlobalsCache(){return this.ci}getTargetCache(){return this.li}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Pi}runTransaction(e,t,r){D("MemoryPersistence","Starting transaction:",e);const s=new ag(this.ai.next());return this.referenceDelegate.Ti(),r(s).next((o=>this.referenceDelegate.Ii(s).next((()=>o)))).toPromise().then((o=>(s.raiseOnCommittedEvent(),o)))}Ei(e,t){return S.or(Object.values(this._i).map((r=>()=>r.containsKey(e,t))))}}class ag extends Bp{constructor(e){super(),this.currentSequenceNumber=e}}class Co{constructor(e){this.persistence=e,this.Ri=new bo,this.Ai=null}static Vi(e){return new Co(e)}get di(){if(this.Ai)return this.Ai;throw U(60996)}addReference(e,t,r){return this.Ri.addReference(r,t),this.di.delete(r.toString()),S.resolve()}removeReference(e,t,r){return this.Ri.removeReference(r,t),this.di.add(r.toString()),S.resolve()}markPotentiallyOrphaned(e,t){return this.di.add(t.toString()),S.resolve()}removeTarget(e,t){this.Ri.Gr(t.targetId).forEach((s=>this.di.add(s.toString())));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next((s=>{s.forEach((o=>this.di.add(o.toString())))})).next((()=>r.removeTargetData(e,t)))}Ti(){this.Ai=new Set}Ii(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return S.forEach(this.di,(r=>{const s=B.fromPath(r);return this.mi(e,s).next((o=>{o||t.removeEntry(s,re.min())}))})).next((()=>(this.Ai=null,t.apply(e))))}updateLimboDocument(e,t){return this.mi(e,t).next((r=>{r?this.di.delete(t.toString()):this.di.add(t.toString())}))}hi(e){return 0}mi(e,t){return S.or([()=>S.resolve(this.Ri.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ei(e,t)])}}class Gs{constructor(e,t){this.persistence=e,this.fi=new bn((r=>jp(r.path)),((r,s)=>r.isEqual(s))),this.garbageCollector=Jm(this,t)}static Vi(e,t){return new Gs(e,t)}Ti(){}Ii(e){return S.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}dr(e){const t=this.pr(e);return this.persistence.getTargetCache().getTargetCount(e).next((r=>t.next((s=>r+s))))}pr(e){let t=0;return this.mr(e,(r=>{t++})).next((()=>t))}mr(e,t){return S.forEach(this.fi,((r,s)=>this.wr(e,r,s).next((o=>o?S.resolve():t(s)))))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0;const s=this.persistence.getRemoteDocumentCache(),o=s.newChangeBuffer();return s.ni(e,(a=>this.wr(e,a,t).next((u=>{u||(r++,o.removeEntry(a,re.min()))})))).next((()=>o.apply(e))).next((()=>r))}markPotentiallyOrphaned(e,t){return this.fi.set(t,e.currentSequenceNumber),S.resolve()}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.fi.set(r,e.currentSequenceNumber),S.resolve()}removeReference(e,t,r){return this.fi.set(r,e.currentSequenceNumber),S.resolve()}updateLimboDocument(e,t){return this.fi.set(t,e.currentSequenceNumber),S.resolve()}hi(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=ws(e.data.value)),t}wr(e,t,r){return S.or([()=>this.persistence.Ei(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const s=this.fi.get(t);return S.resolve(s!==void 0&&s>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ro{constructor(e,t,r,s){this.targetId=e,this.fromCache=t,this.Ts=r,this.Is=s}static Es(e,t){let r=Ue(),s=Ue();for(const o of t.docChanges)switch(o.type){case 0:r=r.add(o.doc.key);break;case 1:s=s.add(o.doc.key)}return new Ro(e,t.fromCache,r,s)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lg{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cg{constructor(){this.Rs=!1,this.As=!1,this.Vs=100,this.ds=(function(){return rh()?8:Fp($e())>0?6:4})()}initialize(e,t){this.fs=e,this.indexManager=t,this.Rs=!0}getDocumentsMatchingQuery(e,t,r,s){const o={result:null};return this.gs(e,t).next((a=>{o.result=a})).next((()=>{if(!o.result)return this.ps(e,t,s,r).next((a=>{o.result=a}))})).next((()=>{if(o.result)return;const a=new lg;return this.ys(e,t,a).next((u=>{if(o.result=u,this.As)return this.ws(e,t,a,u.size)}))})).next((()=>o.result))}ws(e,t,r,s){return r.documentReadCount<this.Vs?(Fn()<=j.DEBUG&&D("QueryEngine","SDK will not create cache indexes for query:",Er(t),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),S.resolve()):(Fn()<=j.DEBUG&&D("QueryEngine","Query:",Er(t),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.ds*s?(Fn()<=j.DEBUG&&D("QueryEngine","The SDK decides to create cache indexes for query:",Er(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,_n(t))):S.resolve())}gs(e,t){if(Xa(t))return S.resolve(null);let r=_n(t);return this.indexManager.getIndexType(e,r).next((s=>s===0?null:(t.limit!==null&&s===1&&(t=Hi(t,null,"F"),r=_n(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next((o=>{const a=Ue(...o);return this.fs.getDocuments(e,a).next((u=>this.indexManager.getMinOffset(e,r).next((h=>{const f=this.Ss(t,u);return this.bs(t,f,a,h.readTime)?this.gs(e,Hi(t,null,"F")):this.Ds(e,f,t,h)}))))})))))}ps(e,t,r,s){return Xa(t)||s.isEqual(re.min())?S.resolve(null):this.fs.getDocuments(e,r).next((o=>{const a=this.Ss(t,o);return this.bs(t,a,r,s)?S.resolve(null):(Fn()<=j.DEBUG&&D("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Er(t)),this.Ds(e,a,t,Vp(s,Dr)).next((u=>u)))}))}Ss(e,t){let r=new Oe(hm(e));return t.forEach(((s,o)=>{wo(e,o)&&(r=r.add(o))})),r}bs(e,t,r,s){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const o=e.limitType==="F"?t.last():t.first();return!!o&&(o.hasPendingWrites||o.version.compareTo(s)>0)}ys(e,t,r){return Fn()<=j.DEBUG&&D("QueryEngine","Using full collection scan to execute query:",Er(t)),this.fs.getDocumentsMatchingQuery(e,t,Zt.min(),r)}Ds(e,t,r,s){return this.fs.getDocumentsMatchingQuery(e,r,s).next((o=>(t.forEach((a=>{o=o.insert(a.key,a)})),o)))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ug="LocalStore";class hg{constructor(e,t,r,s){this.persistence=e,this.Cs=t,this.serializer=s,this.vs=new We(z),this.Fs=new bn((o=>vo(o)),To),this.Ms=new Map,this.xs=e.getRemoteDocumentCache(),this.li=e.getTargetCache(),this.Pi=e.getBundleCache(),this.Os(r)}Os(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new Zm(this.xs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.xs.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(t=>e.collect(t,this.vs)))}}function dg(n,e,t,r){return new hg(n,e,t,r)}async function su(n,e){const t=Y(n);return await t.persistence.runTransaction("Handle user change","readonly",(r=>{let s;return t.mutationQueue.getAllMutationBatches(r).next((o=>(s=o,t.Os(e),t.mutationQueue.getAllMutationBatches(r)))).next((o=>{const a=[],u=[];let h=Ue();for(const f of s){a.push(f.batchId);for(const _ of f.mutations)h=h.add(_.key)}for(const f of o){u.push(f.batchId);for(const _ of f.mutations)h=h.add(_.key)}return t.localDocuments.getDocuments(r,h).next((f=>({Ns:f,removedBatchIds:a,addedBatchIds:u})))}))}))}function fg(n,e){const t=Y(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",(r=>{const s=e.batch.keys(),o=t.xs.newChangeBuffer({trackRemovals:!0});return(function(u,h,f,_){const v=f.batch,b=v.keys();let P=S.resolve();return b.forEach((N=>{P=P.next((()=>_.getEntry(h,N))).next((M=>{const x=f.docVersions.get(N);ue(x!==null,48541),M.version.compareTo(x)<0&&(v.applyToRemoteDocument(M,f),M.isValidDocument()&&(M.setReadTime(f.commitVersion),_.addEntry(M)))}))})),P.next((()=>u.mutationQueue.removeMutationBatch(h,v)))})(t,r,e,o).next((()=>o.apply(r))).next((()=>t.mutationQueue.performConsistencyCheck(r))).next((()=>t.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId))).next((()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,(function(u){let h=Ue();for(let f=0;f<u.mutationResults.length;++f)u.mutationResults[f].transformResults.length>0&&(h=h.add(u.batch.mutations[f].key));return h})(e)))).next((()=>t.localDocuments.getDocuments(r,s)))}))}function pg(n){const e=Y(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",(t=>e.li.getLastRemoteSnapshotVersion(t)))}function mg(n,e){const t=Y(n);return t.persistence.runTransaction("Get next mutation batch","readonly",(r=>(e===void 0&&(e=go),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e))))}class ol{constructor(){this.activeTargetIds=ym()}Qs(e){this.activeTargetIds=this.activeTargetIds.add(e)}Gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Ws(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class gg{constructor(){this.vo=new ol,this.Fo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.vo.Qs(e),this.Fo[e]||"not-current"}updateQueryState(e,t,r){this.Fo[e]=t}removeLocalQueryTarget(e){this.vo.Gs(e)}isLocalQueryTarget(e){return this.vo.activeTargetIds.has(e)}clearQueryState(e){delete this.Fo[e]}getAllActiveQueryTargets(){return this.vo.activeTargetIds}isActiveQueryTarget(e){return this.vo.activeTargetIds.has(e)}start(){return this.vo=new ol,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yg{Mo(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const al="ConnectivityMonitor";class ll{constructor(){this.xo=()=>this.Oo(),this.No=()=>this.Bo(),this.Lo=[],this.ko()}Mo(e){this.Lo.push(e)}shutdown(){window.removeEventListener("online",this.xo),window.removeEventListener("offline",this.No)}ko(){window.addEventListener("online",this.xo),window.addEventListener("offline",this.No)}Oo(){D(al,"Network connectivity changed: AVAILABLE");for(const e of this.Lo)e(0)}Bo(){D(al,"Network connectivity changed: UNAVAILABLE");for(const e of this.Lo)e(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let fs=null;function Qi(){return fs===null?fs=(function(){return 268435456+Math.round(2147483648*Math.random())})():fs++,"0x"+fs.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ci="RestConnection",_g={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class Eg{get Ko(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.qo=t+"://"+e.host,this.Uo=`projects/${r}/databases/${s}`,this.$o=this.databaseId.database===Ls?`project_id=${r}`:`project_id=${r}&database_id=${s}`}Wo(e,t,r,s,o){const a=Qi(),u=this.Qo(e,t.toUriEncodedString());D(Ci,`Sending RPC '${e}' ${a}:`,u,r);const h={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.$o};this.Go(h,s,o);const{host:f}=new URL(u),_=Br(f);return this.zo(e,u,h,r,_).then((v=>(D(Ci,`Received RPC '${e}' ${a}: `,v),v)),(v=>{throw Nr(Ci,`RPC '${e}' ${a} failed with error: `,v,"url: ",u,"request:",r),v}))}jo(e,t,r,s,o,a){return this.Wo(e,t,r,s,o)}Go(e,t,r){e["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+nr})(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach(((s,o)=>e[o]=s)),r&&r.headers.forEach(((s,o)=>e[o]=s))}Qo(e,t){const r=_g[e];let s=`${this.qo}/v1/${t}:${r}`;return this.databaseInfo.apiKey&&(s=`${s}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),s}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ig{constructor(e){this.Jo=e.Jo,this.Ho=e.Ho}Zo(e){this.Xo=e}Yo(e){this.e_=e}t_(e){this.n_=e}onMessage(e){this.r_=e}close(){this.Ho()}send(e){this.Jo(e)}i_(){this.Xo()}s_(){this.e_()}o_(e){this.n_(e)}__(e){this.r_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Be="WebChannelConnection",Ir=(n,e,t)=>{n.listen(e,(r=>{try{t(r)}catch(s){setTimeout((()=>{throw s}),0)}}))};class zn extends Eg{constructor(e){super(e),this.a_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}static u_(){if(!zn.c_){const e=_c();Ir(e,yc.STAT_EVENT,(t=>{t.stat===Fi.PROXY?D(Be,"STAT_EVENT: detected buffering proxy"):t.stat===Fi.NOPROXY&&D(Be,"STAT_EVENT: detected no buffering proxy")})),zn.c_=!0}}zo(e,t,r,s,o){const a=Qi();return new Promise(((u,h)=>{const f=new mc;f.setWithCredentials(!0),f.listenOnce(gc.COMPLETE,(()=>{try{switch(f.getLastErrorCode()){case Ts.NO_ERROR:const v=f.getResponseJson();D(Be,`XHR for RPC '${e}' ${a} received:`,JSON.stringify(v)),u(v);break;case Ts.TIMEOUT:D(Be,`RPC '${e}' ${a} timed out`),h(new V(C.DEADLINE_EXCEEDED,"Request time out"));break;case Ts.HTTP_ERROR:const b=f.getStatus();if(D(Be,`RPC '${e}' ${a} failed with status:`,b,"response text:",f.getResponseText()),b>0){let P=f.getResponseJson();Array.isArray(P)&&(P=P[0]);const N=P==null?void 0:P.error;if(N&&N.status&&N.message){const M=(function(W){const G=W.toLowerCase().replace(/_/g,"-");return Object.values(C).indexOf(G)>=0?G:C.UNKNOWN})(N.status);h(new V(M,N.message))}else h(new V(C.UNKNOWN,"Server responded with status "+f.getStatus()))}else h(new V(C.UNAVAILABLE,"Connection failed."));break;default:U(9055,{l_:e,streamId:a,h_:f.getLastErrorCode(),P_:f.getLastError()})}}finally{D(Be,`RPC '${e}' ${a} completed.`)}}));const _=JSON.stringify(s);D(Be,`RPC '${e}' ${a} sending request:`,s),f.send(t,"POST",_,r,15)}))}T_(e,t,r){const s=Qi(),o=[this.qo,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=this.createWebChannelTransport(),u={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},h=this.longPollingOptions.timeoutSeconds;h!==void 0&&(u.longPollingTimeout=Math.round(1e3*h)),this.useFetchStreams&&(u.useFetchStreams=!0),this.Go(u.initMessageHeaders,t,r),u.encodeInitMessageHeaders=!0;const f=o.join("");D(Be,`Creating RPC '${e}' stream ${s}: ${f}`,u);const _=a.createWebChannel(f,u);this.I_(_);let v=!1,b=!1;const P=new Ig({Jo:N=>{b?D(Be,`Not sending because RPC '${e}' stream ${s} is closed:`,N):(v||(D(Be,`Opening RPC '${e}' stream ${s} transport.`),_.open(),v=!0),D(Be,`RPC '${e}' stream ${s} sending:`,N),_.send(N))},Ho:()=>_.close()});return Ir(_,vr.EventType.OPEN,(()=>{b||(D(Be,`RPC '${e}' stream ${s} transport opened.`),P.i_())})),Ir(_,vr.EventType.CLOSE,(()=>{b||(b=!0,D(Be,`RPC '${e}' stream ${s} transport closed`),P.o_(),this.E_(_))})),Ir(_,vr.EventType.ERROR,(N=>{b||(b=!0,Nr(Be,`RPC '${e}' stream ${s} transport errored. Name:`,N.name,"Message:",N.message),P.o_(new V(C.UNAVAILABLE,"The operation could not be completed")))})),Ir(_,vr.EventType.MESSAGE,(N=>{var M;if(!b){const x=N.data[0];ue(!!x,16349);const W=x,G=(W==null?void 0:W.error)||((M=W[0])==null?void 0:M.error);if(G){D(Be,`RPC '${e}' stream ${s} received error:`,G);const X=G.status;let Ve=(function(E){const p=Ie[E];if(p!==void 0)return Pm(p)})(X),pe=G.message;X==="NOT_FOUND"&&pe.includes("database")&&pe.includes("does not exist")&&pe.includes(this.databaseId.database)&&Nr(`Database '${this.databaseId.database}' not found. Please check your project configuration.`),Ve===void 0&&(Ve=C.INTERNAL,pe="Unknown error status: "+X+" with message "+G.message),b=!0,P.o_(new V(Ve,pe)),_.close()}else D(Be,`RPC '${e}' stream ${s} received:`,x),P.__(x)}})),zn.u_(),setTimeout((()=>{P.s_()}),0),P}terminate(){this.a_.forEach((e=>e.close())),this.a_=[]}I_(e){this.a_.push(e)}E_(e){this.a_=this.a_.filter((t=>t===e))}Go(e,t,r){super.Go(e,t,r),this.databaseInfo.apiKey&&(e["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return Ec()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vg(n){return new zn(n)}function Ri(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zs(n){return new km(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */zn.c_=!1;class iu{constructor(e,t,r=1e3,s=1.5,o=6e4){this.Ci=e,this.timerId=t,this.R_=r,this.A_=s,this.V_=o,this.d_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.d_=0}g_(){this.d_=this.V_}p_(e){this.cancel();const t=Math.floor(this.d_+this.y_()),r=Math.max(0,Date.now()-this.f_),s=Math.max(0,t-r);s>0&&D("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.d_} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.m_=this.Ci.enqueueAfterDelay(this.timerId,s,(()=>(this.f_=Date.now(),e()))),this.d_*=this.A_,this.d_<this.R_&&(this.d_=this.R_),this.d_>this.V_&&(this.d_=this.V_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.d_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cl="PersistentStream";class Tg{constructor(e,t,r,s,o,a,u,h){this.Ci=e,this.S_=r,this.b_=s,this.connection=o,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=u,this.listener=h,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new iu(e,t)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Ci.enqueueAfterDelay(this.S_,6e4,(()=>this.k_())))}K_(e){this.q_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}q_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.q_(),this.U_(),this.M_.cancel(),this.D_++,e!==4?this.M_.reset():t&&t.code===C.RESOURCE_EXHAUSTED?(wn(t.toString()),wn("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):t&&t.code===C.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.W_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.t_(t)}W_(){}auth(){this.state=1;const e=this.Q_(this.D_),t=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([r,s])=>{this.D_===t&&this.G_(r,s)}),(r=>{e((()=>{const s=new V(C.UNKNOWN,"Fetching auth token failed: "+r.message);return this.z_(s)}))}))}G_(e,t){const r=this.Q_(this.D_);this.stream=this.j_(e,t),this.stream.Zo((()=>{r((()=>this.listener.Zo()))})),this.stream.Yo((()=>{r((()=>(this.state=2,this.v_=this.Ci.enqueueAfterDelay(this.b_,1e4,(()=>(this.O_()&&(this.state=3),Promise.resolve()))),this.listener.Yo())))})),this.stream.t_((s=>{r((()=>this.z_(s)))})),this.stream.onMessage((s=>{r((()=>++this.F_==1?this.J_(s):this.onNext(s)))}))}N_(){this.state=5,this.M_.p_((async()=>{this.state=0,this.start()}))}z_(e){return D(cl,`close with error: ${e}`),this.stream=null,this.close(4,e)}Q_(e){return t=>{this.Ci.enqueueAndForget((()=>this.D_===e?t():(D(cl,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class wg extends Tg{constructor(e,t,r,s,o,a){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,s,a),this.serializer=o}get Y_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}W_(){this.Y_&&this.ea([])}j_(e,t){return this.connection.T_("Write",e,t)}J_(e){return ue(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,ue(!e.writeResults||e.writeResults.length===0,55816),this.listener.ta()}onNext(e){ue(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();const t=Bm(e.writeResults,e.commitTime),r=Hn(e.commitTime);return this.listener.na(r,t)}ra(){const e={};e.database=xm(this.serializer),this.K_(e)}ea(e){const t={streamToken:this.lastStreamToken,writes:e.map((r=>Lm(this.serializer,r)))};this.K_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ag{}class Sg extends Ag{constructor(e,t,r,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=s,this.ia=!1}sa(){if(this.ia)throw new V(C.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(e,t,r,s){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([o,a])=>this.connection.Wo(e,Wi(t,r),s,o,a))).catch((o=>{throw o.name==="FirebaseError"?(o.code===C.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new V(C.UNKNOWN,o.toString())}))}jo(e,t,r,s,o){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([a,u])=>this.connection.jo(e,Wi(t,r),s,a,u,o))).catch((a=>{throw a.name==="FirebaseError"?(a.code===C.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new V(C.UNKNOWN,a.toString())}))}terminate(){this.ia=!0,this.connection.terminate()}}function bg(n,e,t,r){return new Sg(n,e,t,r)}class Cg{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve()))))}ha(e){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,e==="Online"&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(wn(t),this.aa=!1):D("OnlineStateTracker",t)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hr="RemoteStore";class Rg{constructor(e,t,r,s,o){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.Ta=[],this.Ia=new Map,this.Ea=new Map,this.Ra=new Map,this.Aa=new tn(1e3),this.Va=new tn(1001),this.da=new Set,this.ma=[],this.fa=o,this.fa.Mo((a=>{r.enqueueAndForget((async()=>{Wr(this)&&(D(Hr,"Restarting streams for network reachability change."),await(async function(h){const f=Y(h);f.da.add(4),await zr(f),f.ga.set("Unknown"),f.da.delete(4),await ei(f)})(this))}))})),this.ga=new Cg(r,s)}}async function ei(n){if(Wr(n))for(const e of n.ma)await e(!0)}async function zr(n){for(const e of n.ma)await e(!1)}function Wr(n){return Y(n).da.size===0}async function ou(n,e,t){if(!qr(e))throw e;n.da.add(1),await zr(n),n.ga.set("Offline"),t||(t=()=>pg(n.localStore)),n.asyncQueue.enqueueRetryable((async()=>{D(Hr,"Retrying IndexedDB access"),await t(),n.da.delete(1),await ei(n)}))}function au(n,e){return e().catch((t=>ou(n,t,e)))}async function ti(n){const e=Y(n),t=nn(e);let r=e.Ta.length>0?e.Ta[e.Ta.length-1].batchId:go;for(;Pg(e);)try{const s=await mg(e.localStore,r);if(s===null){e.Ta.length===0&&t.L_();break}r=s.batchId,kg(e,s)}catch(s){await ou(e,s)}lu(e)&&cu(e)}function Pg(n){return Wr(n)&&n.Ta.length<10}function kg(n,e){n.Ta.push(e);const t=nn(n);t.O_()&&t.Y_&&t.ea(e.mutations)}function lu(n){return Wr(n)&&!nn(n).x_()&&n.Ta.length>0}function cu(n){nn(n).start()}async function Ng(n){nn(n).ra()}async function Dg(n){const e=nn(n);for(const t of n.Ta)e.ea(t.mutations)}async function Og(n,e,t){const r=n.Ta.shift(),s=So.from(r,e,t);await au(n,(()=>n.remoteSyncer.applySuccessfulWrite(s))),await ti(n)}async function Vg(n,e){e&&nn(n).Y_&&await(async function(r,s){if((function(a){return Rm(a)&&a!==C.ABORTED})(s.code)){const o=r.Ta.shift();nn(r).B_(),await au(r,(()=>r.remoteSyncer.rejectFailedWrite(o.batchId,s))),await ti(r)}})(n,e),lu(n)&&cu(n)}async function ul(n,e){const t=Y(n);t.asyncQueue.verifyOperationInProgress(),D(Hr,"RemoteStore received new credentials");const r=Wr(t);t.da.add(3),await zr(t),r&&t.ga.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.da.delete(3),await ei(t)}async function xg(n,e){const t=Y(n);e?(t.da.delete(2),await ei(t)):e||(t.da.add(2),await zr(t),t.ga.set("Unknown"))}function nn(n){return n.wa||(n.wa=(function(t,r,s){const o=Y(t);return o.sa(),new wg(r,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,s)})(n.datastore,n.asyncQueue,{Zo:()=>Promise.resolve(),Yo:Ng.bind(null,n),t_:Vg.bind(null,n),ta:Dg.bind(null,n),na:Og.bind(null,n)}),n.ma.push((async e=>{e?(n.wa.B_(),await ti(n)):(await n.wa.stop(),n.Ta.length>0&&(D(Hr,`Stopping write stream with ${n.Ta.length} pending writes`),n.Ta=[]))}))),n.wa}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Po{constructor(e,t,r,s,o){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=s,this.removalCallback=o,this.deferred=new yn,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((a=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,s,o){const a=Date.now()+r,u=new Po(e,t,a,s,o);return u.start(r),u}start(e){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new V(C.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((e=>this.deferred.resolve(e)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function uu(n,e){if(wn("AsyncQueue",`${e}: ${n}`),qr(n))return new V(C.UNAVAILABLE,`${e}: ${n}`);throw n}class Mg{constructor(){this.queries=hl(),this.onlineState="Unknown",this.xa=new Set}terminate(){(function(t,r){const s=Y(t),o=s.queries;s.queries=hl(),o.forEach(((a,u)=>{for(const h of u.va)h.onError(r)}))})(this,new V(C.ABORTED,"Firestore shutting down"))}}function hl(){return new bn((n=>jc(n)),Uc)}function Lg(n){n.xa.forEach((e=>{e.next()}))}var dl,fl;(fl=dl||(dl={})).Ba="default",fl.Cache="cache";const Bg="SyncEngine";class Fg{constructor(e,t,r,s,o,a){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=s,this.currentUser=o,this.maxConcurrentLimboResolutions=a,this.Ru={},this.Au=new bn((u=>jc(u)),Uc),this.Vu=new Map,this.du=new Set,this.mu=new We(B.comparator),this.fu=new Map,this.gu=new bo,this.pu={},this.yu=new Map,this.wu=tn.ar(),this.onlineState="Unknown",this.Su=void 0}get isPrimaryClient(){return this.Su===!0}}async function Ug(n,e,t){const r=Gg(n);try{const s=await(function(a,u){const h=Y(a),f=se.now(),_=u.reduce(((P,N)=>P.add(N.key)),Ue());let v,b;return h.persistence.runTransaction("Locally write mutations","readwrite",(P=>{let N=js(),M=Ue();return h.xs.getEntries(P,_).next((x=>{N=x,N.forEach(((W,G)=>{G.isValidDocument()||(M=M.add(W))}))})).next((()=>h.localDocuments.getOverlayedDocuments(P,N))).next((x=>{v=x;const W=[];for(const G of u){const X=Am(G,v.get(G.key).overlayedDocument);X!=null&&W.push(new Cn(G.key,X,Oc(X.value.mapValue),Nt.exists(!0)))}return h.mutationQueue.addMutationBatch(P,f,W,u)})).next((x=>{b=x;const W=x.applyToLocalDocumentSet(v,M);return h.documentOverlayCache.saveOverlays(P,x.batchId,W)}))})).then((()=>({batchId:b.batchId,changes:qc(v)})))})(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),(function(a,u,h){let f=a.pu[a.currentUser.toKey()];f||(f=new We(z)),f=f.insert(u,h),a.pu[a.currentUser.toKey()]=f})(r,s.batchId,t),await ni(r,s.changes),await ti(r.remoteStore)}catch(s){const o=uu(s,"Failed to persist write");t.reject(o)}}function pl(n,e,t){const r=Y(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const s=[];r.Au.forEach(((o,a)=>{const u=a.view.Oa(e);u.snapshot&&s.push(u.snapshot)})),(function(a,u){const h=Y(a);h.onlineState=u;let f=!1;h.queries.forEach(((_,v)=>{for(const b of v.va)b.Oa(u)&&(f=!0)})),f&&Lg(h)})(r.eventManager,e),s.length&&r.Ru.H_(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function jg(n,e){const t=Y(n),r=e.batch.batchId;try{const s=await fg(t.localStore,e);du(t,r,null),hu(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await ni(t,s)}catch(s){await po(s)}}async function $g(n,e,t){const r=Y(n);try{const s=await(function(a,u){const h=Y(a);return h.persistence.runTransaction("Reject batch","readwrite-primary",(f=>{let _;return h.mutationQueue.lookupMutationBatch(f,u).next((v=>(ue(v!==null,37113),_=v.keys(),h.mutationQueue.removeMutationBatch(f,v)))).next((()=>h.mutationQueue.performConsistencyCheck(f))).next((()=>h.documentOverlayCache.removeOverlaysForBatchId(f,_,u))).next((()=>h.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(f,_))).next((()=>h.localDocuments.getDocuments(f,_)))}))})(r.localStore,e);du(r,e,t),hu(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await ni(r,s)}catch(s){await po(s)}}function hu(n,e){(n.yu.get(e)||[]).forEach((t=>{t.resolve()})),n.yu.delete(e)}function du(n,e,t){const r=Y(n);let s=r.pu[r.currentUser.toKey()];if(s){const o=s.get(e);o&&(t?o.reject(t):o.resolve(),s=s.remove(e)),r.pu[r.currentUser.toKey()]=s}}async function ni(n,e,t){const r=Y(n),s=[],o=[],a=[];r.Au.isEmpty()||(r.Au.forEach(((u,h)=>{a.push(r.bu(h,e,t).then((f=>{var _;if((f||t)&&r.isPrimaryClient){const v=f?!f.fromCache:(_=t==null?void 0:t.targetChanges.get(h.targetId))==null?void 0:_.current;r.sharedClientState.updateQueryState(h.targetId,v?"current":"not-current")}if(f){s.push(f);const v=Ro.Es(h.targetId,f);o.push(v)}})))})),await Promise.all(a),r.Ru.H_(s),await(async function(h,f){const _=Y(h);try{await _.persistence.runTransaction("notifyLocalViewChanges","readwrite",(v=>S.forEach(f,(b=>S.forEach(b.Ts,(P=>_.persistence.referenceDelegate.addReference(v,b.targetId,P))).next((()=>S.forEach(b.Is,(P=>_.persistence.referenceDelegate.removeReference(v,b.targetId,P)))))))))}catch(v){if(!qr(v))throw v;D(ug,"Failed to update sequence numbers: "+v)}for(const v of f){const b=v.targetId;if(!v.fromCache){const P=_.vs.get(b),N=P.snapshotVersion,M=P.withLastLimboFreeSnapshotVersion(N);_.vs=_.vs.insert(b,M)}}})(r.localStore,o))}async function qg(n,e){const t=Y(n);if(!t.currentUser.isEqual(e)){D(Bg,"User change. New user:",e.toKey());const r=await su(t.localStore,e);t.currentUser=e,(function(o,a){o.yu.forEach((u=>{u.forEach((h=>{h.reject(new V(C.CANCELLED,a))}))})),o.yu.clear()})(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await ni(t,r.Ns)}}function Gg(n){const e=Y(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=jg.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=$g.bind(null,e),e}class Hs{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Zs(e.databaseInfo.databaseId),this.sharedClientState=this.Mu(e),this.persistence=this.xu(e),await this.persistence.start(),this.localStore=this.Ou(e),this.gcScheduler=this.Nu(e,this.localStore),this.indexBackfillerScheduler=this.Bu(e,this.localStore)}Nu(e,t){return null}Bu(e,t){return null}Ou(e){return dg(this.persistence,new cg,e.initialUser,this.serializer)}xu(e){return new ru(Co.Vi,this.serializer)}Mu(e){return new gg}async terminate(){var e,t;(e=this.gcScheduler)==null||e.stop(),(t=this.indexBackfillerScheduler)==null||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Hs.provider={build:()=>new Hs};class Hg extends Hs{constructor(e){super(),this.cacheSizeBytes=e}Nu(e,t){ue(this.persistence.referenceDelegate instanceof Gs,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new Km(r,e.asyncQueue,t)}xu(e){const t=this.cacheSizeBytes!==void 0?ze.withCacheSize(this.cacheSizeBytes):ze.DEFAULT;return new ru((r=>Gs.Vi(r,t)),this.serializer)}}class Ji{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>pl(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=qg.bind(null,this.syncEngine),await xg(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return(function(){return new Mg})()}createDatastore(e){const t=Zs(e.databaseInfo.databaseId),r=vg(e.databaseInfo);return bg(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return(function(r,s,o,a,u){return new Rg(r,s,o,a,u)})(this.localStore,this.datastore,e.asyncQueue,(t=>pl(this.syncEngine,t,0)),(function(){return ll.v()?new ll:new yg})())}createSyncEngine(e,t){return(function(s,o,a,u,h,f,_){const v=new Fg(s,o,a,u,h,f);return _&&(v.Su=!0),v})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await(async function(s){const o=Y(s);D(Hr,"RemoteStore shutting down."),o.da.add(5),await zr(o),o.fa.shutdown(),o.ga.set("Unknown")})(this.remoteStore),(e=this.datastore)==null||e.terminate(),(t=this.eventManager)==null||t.terminate()}}Ji.provider={build:()=>new Ji};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rn="FirestoreClient";class zg{constructor(e,t,r,s,o){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this._databaseInfo=s,this.user=Fe.UNAUTHENTICATED,this.clientId=ho.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=o,this.authCredentials.start(r,(async a=>{D(rn,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a})),this.appCheckCredentials.start(r,(a=>(D(rn,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new yn;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=uu(t,"Failed to shutdown persistence");e.reject(r)}})),e.promise}}async function Pi(n,e){n.asyncQueue.verifyOperationInProgress(),D(rn,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener((async s=>{r.isEqual(s)||(await su(e.localStore,s),r=s)})),e.persistence.setDatabaseDeletedListener((()=>n.terminate())),n._offlineComponents=e}async function ml(n,e){n.asyncQueue.verifyOperationInProgress();const t=await Wg(n);D(rn,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener((r=>ul(e.remoteStore,r))),n.setAppCheckTokenChangeListener(((r,s)=>ul(e.remoteStore,s))),n._onlineComponents=e}async function Wg(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){D(rn,"Using user provided OfflineComponentProvider");try{await Pi(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!(function(s){return s.name==="FirebaseError"?s.code===C.FAILED_PRECONDITION||s.code===C.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11})(t))throw t;Nr("Error using user provided cache. Falling back to memory cache: "+t),await Pi(n,new Hs)}}else D(rn,"Using default OfflineComponentProvider"),await Pi(n,new Hg(void 0));return n._offlineComponents}async function Kg(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(D(rn,"Using user provided OnlineComponentProvider"),await ml(n,n._uninitializedComponentsProvider._online)):(D(rn,"Using default OnlineComponentProvider"),await ml(n,new Ji))),n._onlineComponents}function Qg(n){return Kg(n).then((e=>e.syncEngine))}function Jg(n,e){const t=new yn;return n.asyncQueue.enqueueAndForget((async()=>Ug(await Qg(n),e,t))),t.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fu(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xg="ComponentProvider",gl=new Map;function Yg(n,e,t,r,s){return new Hp(n,e,t,s.host,s.ssl,s.experimentalForceLongPolling,s.experimentalAutoDetectLongPolling,fu(s.experimentalLongPollingOptions),s.useFetchStreams,s.isUsingEmulator,r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pu="firestore.googleapis.com",yl=!0;class _l{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new V(C.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=pu,this.ssl=yl}else this.host=e.host,this.ssl=e.ssl??yl;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=nu;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<zm)throw new V(C.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}Op("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=fu(e.experimentalLongPollingOptions??{}),(function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new V(C.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new V(C.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new V(C.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(function(r,s){return r.timeoutSeconds===s.timeoutSeconds})(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class ri{constructor(e,t,r,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new _l({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new V(C.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new V(C.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new _l(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=(function(r){if(!r)return new wp;switch(r.type){case"firstParty":return new Cp(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new V(C.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(t){const r=gl.get(t);r&&(D(Xg,"Removing Datastore"),gl.delete(t),r.terminate())})(this),Promise.resolve()}}function Zg(n,e,t,r={}){var f;n=Ac(n,ri);const s=Br(e),o=n._getSettings(),a={...o,emulatorOptions:n._getEmulatorOptions()},u=`${e}:${t}`;s&&Nl(`https://${u}`),o.host!==pu&&o.host!==u&&Nr("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const h={...o,host:u,ssl:s,emulatorOptions:r};if(!En(h,a)&&(n._setSettings(h),r.mockUserToken)){let _,v;if(typeof r.mockUserToken=="string")_=r.mockUserToken,v=Fe.MOCK_USER;else{_=Ju(r.mockUserToken,(f=n._app)==null?void 0:f.options.projectId);const b=r.mockUserToken.sub||r.mockUserToken.user_id;if(!b)throw new V(C.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");v=new Fe(b)}n._authCredentials=new Ap(new vc(_,v))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ko{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new ko(this.firestore,e,this._query)}}class je{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Yt(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new je(this.firestore,e,this._key)}toJSON(){return{type:je._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,r){if($r(t,je._jsonSchema))return new je(e,r||null,new B(ae.fromString(t.referencePath)))}}je._jsonSchemaVersion="firestore/documentReference/1.0",je._jsonSchema={type:ve("string",je._jsonSchemaVersion),referencePath:ve("string")};class Yt extends ko{constructor(e,t,r){super(e,t,am(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new je(this.firestore,null,new B(e))}withConverter(e){return new Yt(this.firestore,e,this._path)}}function ey(n,e,...t){if(n=ht(n),Tc("collection","path",e),n instanceof ri){const r=ae.fromString(e,...t);return Ua(r),new Yt(n,null,r)}{if(!(n instanceof je||n instanceof Yt))throw new V(C.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(ae.fromString(e,...t));return Ua(r),new Yt(n.firestore,null,r)}}function ty(n,e,...t){if(n=ht(n),arguments.length===1&&(e=ho.newId()),Tc("doc","path",e),n instanceof ri){const r=ae.fromString(e,...t);return Fa(r),new je(n,null,new B(r))}{if(!(n instanceof je||n instanceof Yt))throw new V(C.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(ae.fromString(e,...t));return Fa(r),new je(n.firestore,n instanceof Yt?n.converter:null,new B(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const El="AsyncQueue";class Il{constructor(e=Promise.resolve()){this.rc=[],this.sc=!1,this.oc=[],this._c=null,this.ac=!1,this.uc=!1,this.cc=[],this.M_=new iu(this,"async_queue_retry"),this.lc=()=>{const r=Ri();r&&D(El,"Visibility state changed to "+r.visibilityState),this.M_.w_()},this.hc=e;const t=Ri();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.lc)}get isShuttingDown(){return this.sc}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.Pc(),this.Tc(e)}enterRestrictedMode(e){if(!this.sc){this.sc=!0,this.uc=e||!1;const t=Ri();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.lc)}}enqueue(e){if(this.Pc(),this.sc)return new Promise((()=>{}));const t=new yn;return this.Tc((()=>this.sc&&this.uc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise))).then((()=>t.promise))}enqueueRetryable(e){this.enqueueAndForget((()=>(this.rc.push(e),this.Ic())))}async Ic(){if(this.rc.length!==0){try{await this.rc[0](),this.rc.shift(),this.M_.reset()}catch(e){if(!qr(e))throw e;D(El,"Operation failed with retryable error: "+e)}this.rc.length>0&&this.M_.p_((()=>this.Ic()))}}Tc(e){const t=this.hc.then((()=>(this.ac=!0,e().catch((r=>{throw this._c=r,this.ac=!1,wn("INTERNAL UNHANDLED ERROR: ",vl(r)),r})).then((r=>(this.ac=!1,r))))));return this.hc=t,t}enqueueAfterDelay(e,t,r){this.Pc(),this.cc.indexOf(e)>-1&&(t=0);const s=Po.createAndSchedule(this,e,t,r,(o=>this.Ec(o)));return this.oc.push(s),s}Pc(){this._c&&U(47125,{Rc:vl(this._c)})}verifyOperationInProgress(){}async Ac(){let e;do e=this.hc,await e;while(e!==this.hc)}Vc(e){for(const t of this.oc)if(t.timerId===e)return!0;return!1}dc(e){return this.Ac().then((()=>{this.oc.sort(((t,r)=>t.targetTimeMs-r.targetTimeMs));for(const t of this.oc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Ac()}))}mc(e){this.cc.push(e)}Ec(e){const t=this.oc.indexOf(e);this.oc.splice(t,1)}}function vl(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),e}class mu extends ri{constructor(e,t,r,s){super(e,t,r,s),this.type="firestore",this._queue=new Il,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Il(e),this._firestoreClient=void 0,await e}}}function ny(n,e){const t=typeof n=="object"?n:xl(),r=typeof n=="string"?n:e||Ls,s=Zi(t,"firestore").getImmediate({identifier:r});if(!s._initialized){const o=Ku("firestore");o&&Zg(s,...o)}return s}function ry(n){if(n._terminated)throw new V(C.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||sy(n),n._firestoreClient}function sy(n){var r,s,o,a;const e=n._freezeSettings(),t=Yg(n._databaseId,((r=n._app)==null?void 0:r.options.appId)||"",n._persistenceKey,(s=n._app)==null?void 0:s.options.apiKey,e);n._componentsProvider||(o=e.localCache)!=null&&o._offlineComponentProvider&&((a=e.localCache)!=null&&a._onlineComponentProvider)&&(n._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),n._firestoreClient=new zg(n._authCredentials,n._appCheckCredentials,n._queue,t,n._componentsProvider&&(function(h){const f=h==null?void 0:h._online.build();return{_offline:h==null?void 0:h._offline.build(f),_online:f}})(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lt{constructor(e){this._byteString=e}static fromBase64String(e){try{return new lt(Tt.fromBase64String(e))}catch(t){throw new V(C.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new lt(Tt.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:lt._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if($r(e,lt._jsonSchema))return lt.fromBase64String(e.bytes)}}lt._jsonSchemaVersion="firestore/bytes/1.0",lt._jsonSchema={type:ve("string",lt._jsonSchemaVersion),bytes:ve("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gu{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new V(C.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new De(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yu{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dt{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new V(C.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new V(C.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return z(this._lat,e._lat)||z(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:Dt._jsonSchemaVersion}}static fromJSON(e){if($r(e,Dt._jsonSchema))return new Dt(e.latitude,e.longitude)}}Dt._jsonSchemaVersion="firestore/geoPoint/1.0",Dt._jsonSchema={type:ve("string",Dt._jsonSchemaVersion),latitude:ve("number"),longitude:ve("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vt{constructor(e){this._values=(e||[]).map((t=>t))}toArray(){return this._values.map((e=>e))}isEqual(e){return(function(r,s){if(r.length!==s.length)return!1;for(let o=0;o<r.length;++o)if(r[o]!==s[o])return!1;return!0})(this._values,e._values)}toJSON(){return{type:vt._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if($r(e,vt._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every((t=>typeof t=="number")))return new vt(e.vectorValues);throw new V(C.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}vt._jsonSchemaVersion="firestore/vectorValue/1.0",vt._jsonSchema={type:ve("string",vt._jsonSchemaVersion),vectorValues:ve("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const iy=/^__.*__$/;class oy{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new Cn(e,this.data,this.fieldMask,t,this.fieldTransforms):new Gr(e,this.data,t,this.fieldTransforms)}}function _u(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw U(40011,{dataSource:n})}}class No{constructor(e,t,r,s,o,a){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=s,o===void 0&&this.fc(),this.fieldTransforms=o||[],this.fieldMask=a||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}i(e){return new No({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}yc(e){var s;const t=(s=this.path)==null?void 0:s.child(e),r=this.i({path:t,arrayElement:!1});return r.wc(e),r}Sc(e){var s;const t=(s=this.path)==null?void 0:s.child(e),r=this.i({path:t,arrayElement:!1});return r.fc(),r}bc(e){return this.i({path:void 0,arrayElement:!0})}Dc(e){return zs(e,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(e){return this.fieldMask.find((t=>e.isPrefixOf(t)))!==void 0||this.fieldTransforms.find((t=>e.isPrefixOf(t.field)))!==void 0}fc(){if(this.path)for(let e=0;e<this.path.length;e++)this.wc(this.path.get(e))}wc(e){if(e.length===0)throw this.Dc("Document fields must not be empty");if(_u(this.dataSource)&&iy.test(e))throw this.Dc('Document fields cannot begin and end with "__"')}}class ay{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||Zs(e)}V(e,t,r,s=!1){return new No({dataSource:e,methodName:t,targetDoc:r,path:De.emptyPath(),arrayElement:!1,hasConverter:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function ly(n){const e=n._freezeSettings(),t=Zs(n._databaseId);return new ay(n._databaseId,!!e.ignoreUndefinedProperties,t)}function cy(n,e,t,r,s,o={}){const a=n.V(o.merge||o.mergeFields?2:0,e,t,s);Tu("Data must be an object, but it was:",a,r);const u=Iu(r,a);let h,f;if(o.merge)h=new ut(a.fieldMask),f=a.fieldTransforms;else if(o.mergeFields){const _=[];for(const v of o.mergeFields){const b=Do(e,v,t);if(!a.contains(b))throw new V(C.INVALID_ARGUMENT,`Field '${b}' is specified in your field mask but missing from your input data.`);dy(_,b)||_.push(b)}h=new ut(_),f=a.fieldTransforms.filter((v=>h.covers(v.field)))}else h=null,f=a.fieldTransforms;return new oy(new at(u),h,f)}function Eu(n,e){if(vu(n=ht(n)))return Tu("Unsupported field value:",e,n),Iu(n,e);if(n instanceof yu)return(function(r,s){if(!_u(s.dataSource))throw s.Dc(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.Dc(`${r._methodName}() is not currently supported inside arrays`);const o=r._toFieldTransform(s);o&&s.fieldTransforms.push(o)})(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.arrayElement&&e.dataSource!==4)throw e.Dc("Nested arrays are not supported");return(function(r,s){const o=[];let a=0;for(const u of r){let h=Eu(u,s.bc(a));h==null&&(h={nullValue:"NULL_VALUE"}),o.push(h),a++}return{arrayValue:{values:o}}})(n,e)}return(function(r,s){if((r=ht(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return _m(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const o=se.fromDate(r);return{timestampValue:zi(s.serializer,o)}}if(r instanceof se){const o=new se(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:zi(s.serializer,o)}}if(r instanceof Dt)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof lt)return{bytesValue:Nm(s.serializer,r._byteString)};if(r instanceof je){const o=s.databaseId,a=r.firestore._databaseId;if(!a.isEqual(o))throw s.Dc(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${o.projectId}/${o.database}`);return{referenceValue:Zc(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof vt)return(function(a,u){const h=a instanceof vt?a.toArray():a;return{mapValue:{fields:{[Nc]:{stringValue:Dc},[ji]:{arrayValue:{values:h.map((_=>{if(typeof _!="number")throw u.Dc("VectorValues must only contain numeric values.");return Ao(u.serializer,_)}))}}}}}})(r,s);if(tu(r))return r._toProto(s.serializer);throw s.Dc(`Unsupported field value: ${fo(r)}`)})(n,e)}function Iu(n,e){const t={};return bc(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):rr(n,((r,s)=>{const o=Eu(s,e.yc(r));o!=null&&(t[r]=o)})),{mapValue:{fields:t}}}function vu(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof se||n instanceof Dt||n instanceof lt||n instanceof je||n instanceof yu||n instanceof vt||tu(n))}function Tu(n,e,t){if(!vu(t)||!wc(t)){const r=fo(t);throw r==="an object"?e.Dc(n+" a custom object"):e.Dc(n+" "+r)}}function Do(n,e,t){if((e=ht(e))instanceof gu)return e._internalPath;if(typeof e=="string")return hy(n,e);throw zs("Field path arguments must be of type string or ",n,!1,void 0,t)}const uy=new RegExp("[~\\*/\\[\\]]");function hy(n,e,t){if(e.search(uy)>=0)throw zs(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new gu(...e.split("."))._internalPath}catch{throw zs(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function zs(n,e,t,r,s){const o=r&&!r.isEmpty(),a=s!==void 0;let u=`Function ${e}() called with invalid data`;t&&(u+=" (via `toFirestore()`)"),u+=". ";let h="";return(o||a)&&(h+=" (found",o&&(h+=` in field ${r}`),a&&(h+=` in document ${s}`),h+=")"),new V(C.INVALID_ARGUMENT,u+n+h)}function dy(n,e){return n.some((t=>t.isEqual(e)))}const Tl="@firebase/firestore",wl="4.14.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wu{constructor(e,t,r,s,o){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=s,this._converter=o}get id(){return this._key.path.lastSegment()}get ref(){return new je(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new fy(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){var e;return((e=this._document)==null?void 0:e.data.clone().value.mapValue.fields)??void 0}get(e){if(this._document){const t=this._document.data.field(Do("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class fy extends wu{data(){return super.data()}}function py(n,e,t){let r;return r=n?n.toFirestore(e):e,r}class ps{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Wn extends wu{constructor(e,t,r,s,o,a){super(e,t,r,s,a),this._firestore=e,this._firestoreImpl=e,this.metadata=o}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new bs(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(Do("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new V(C.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=Wn._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}Wn._jsonSchemaVersion="firestore/documentSnapshot/1.0",Wn._jsonSchema={type:ve("string",Wn._jsonSchemaVersion),bundleSource:ve("string","DocumentSnapshot"),bundleName:ve("string"),bundle:ve("string")};class bs extends Wn{data(e={}){return super.data(e)}}class Cr{constructor(e,t,r,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new ps(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach((t=>e.push(t))),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach((r=>{e.call(t,new bs(this._firestore,this._userDataWriter,r.key,r,new ps(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new V(C.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=(function(s,o){if(s._snapshot.oldDocs.isEmpty()){let a=0;return s._snapshot.docChanges.map((u=>{const h=new bs(s._firestore,s._userDataWriter,u.doc.key,u.doc,new ps(s._snapshot.mutatedKeys.has(u.doc.key),s._snapshot.fromCache),s.query.converter);return u.doc,{type:"added",doc:h,oldIndex:-1,newIndex:a++}}))}{let a=s._snapshot.oldDocs;return s._snapshot.docChanges.filter((u=>o||u.type!==3)).map((u=>{const h=new bs(s._firestore,s._userDataWriter,u.doc.key,u.doc,new ps(s._snapshot.mutatedKeys.has(u.doc.key),s._snapshot.fromCache),s.query.converter);let f=-1,_=-1;return u.type!==0&&(f=a.indexOf(u.doc.key),a=a.delete(u.doc.key)),u.type!==1&&(a=a.add(u.doc),_=a.indexOf(u.doc.key)),{type:my(u.type),doc:h,oldIndex:f,newIndex:_}}))}})(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new V(C.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=Cr._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=ho.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],r=[],s=[];return this.docs.forEach((o=>{o._document!==null&&(t.push(o._document),r.push(this._userDataWriter.convertObjectMap(o._document.data.value.mapValue.fields,"previous")),s.push(o.ref.path))})),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function my(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return U(61501,{type:n})}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Cr._jsonSchemaVersion="firestore/querySnapshot/1.0",Cr._jsonSchema={type:ve("string",Cr._jsonSchemaVersion),bundleSource:ve("string","QuerySnapshot"),bundleName:ve("string"),bundle:ve("string")};function gy(n,e){const t=Ac(n.firestore,mu),r=ty(n),s=py(n.converter,e),o=ly(n.firestore);return yy(t,[cy(o,"addDoc",r._key,s,n.converter!==null,{}).toMutation(r._key,Nt.exists(!1))]).then((()=>r))}function yy(n,e){const t=ry(n);return Jg(t,e)}(function(e,t=!0){Tp(er),Kn(new In("firestore",((r,{instanceIdentifier:s,options:o})=>{const a=r.getProvider("app").getImmediate(),u=new mu(new Sp(r.getProvider("auth-internal")),new Rp(a,r.getProvider("app-check-internal")),zp(a,s),a);return o={useFetchStreams:t,...o},u._setSettings(o),u}),"PUBLIC").setMultipleInstances(!0)),Xt(Tl,wl,e),Xt(Tl,wl,"esm2020")})();const _y="gen-lang-client-0273291777",Ey="1:235978759653:web:fb82260c62f98fc80ce30c",Iy="AIzaSyAT1xtn2fSPbxUrIyJvK_r449D_WB6Ete8",vy="gen-lang-client-0273291777.firebaseapp.com",Ty="ai-studio-f7c7f3ec-1f6a-45a9-a332-4733fe85d918",wy="gen-lang-client-0273291777.firebasestorage.app",Ay="235978759653",Sy="",Au={projectId:_y,appId:Ey,apiKey:Iy,authDomain:vy,firestoreDatabaseId:Ty,storageBucket:wy,messagingSenderId:Ay,measurementId:Sy},Su=Vl(Au),by=ny(Su,Au.firestoreDatabaseId);Ip(Su);window.openTab=function(n,e){var t,r,s;for(r=document.getElementsByClassName("contribution-content"),t=0;t<r.length;t++)r[t].style.display="none";for(s=document.getElementsByClassName("seo-tab"),t=0;t<s.length;t++)s[t].className=s[t].className.replace(" active","");document.getElementById(e).style.display="block",n.currentTarget.className+=" active"};window.toggleResultSection=function(n){const e=document.getElementById(n),t=e.querySelector(".toggle-indicator");e.classList.contains("collapsed")?(e.classList.remove("collapsed"),t.textContent="▼"):(e.classList.add("collapsed"),t.textContent="▶")};window._appConfig={googleSheetsScriptUrl:"",socsoSheetsScriptUrl:""};fetch("/api/config").then(function(n){return n.json()}).then(function(n){window._appConfig=n}).catch(function(){});document.addEventListener("DOMContentLoaded",function(){const n=document.getElementById("salaryForm"),e=document.getElementById("resetBtn"),t=document.getElementById("placeholder"),r=document.getElementById("results");let s={salary:0,epf:0,socso:0,eis:0,pcb:0,totalDeductions:0,netSalary:0};n.addEventListener("submit",function(O){O.preventDefault(),Jr()});const o=document.getElementById("socsoForm"),a=document.getElementById("socsoResetBtn"),u=document.getElementById("socsoPlaceholder"),h=document.getElementById("socsoResultsContent");a.addEventListener("click",function(){u.style.display="block",h.classList.remove("show"),document.getElementById("socsoEmployeeCardVal").textContent="RM 0.00",document.getElementById("socsoEmployerCardVal").textContent="RM 0.00"}),o.addEventListener("submit",function(O){O.preventDefault(),_()});function f(O,Z,le="malaysian"){if(!O||O<=0)return{er:0,ee:0,total:0,er_only:0,bracket:0};const K=Math.min(O,6e3);let H=0;K<=30?H=1:K<=50?H=2:K<=70?H=3:K<=100?H=4:K<=140?H=5:K<=200?H=6:O>6e3?H=65:H=Math.floor((K-200.01)/100)+7;const ne=[0,.4,.7,1.1,1.5,2.1,2.95,4.35,6.15,7.85,9.65,11.35,13.15,14.85,16.65,18.35,20.15,21.85,23.65,25.35,27.15,28.85,30.65,32.35,34.15,35.85,37.65,39.35,41.15,42.85,44.65,46.35,48.15,49.85,51.65,53.35,55.15,56.85,58.65,60.35,62.15,63.85,65.65,67.35,69.15,70.85,72.65,74.35,76.15,77.85,79.65,81.35,83.15,84.85,86.65,88.35,90.15,91.85,93.65,95.35,97.15,98.85,100.65,102.35,104.15,104.15],ge=[0,.3,.5,.8,1.1,1.5,2.1,3.1,4.4,5.6,6.9,8.1,9.4,10.6,11.9,13.1,14.4,15.6,16.9,18.1,19.4,20.6,21.9,23.1,24.4,25.6,26.9,28.1,29.4,30.6,31.9,33.1,34.4,35.6,36.9,38.1,39.4,40.6,41.9,43.1,44.4,45.6,46.9,48.1,49.4,50.6,51.9,53.1,54.4,55.6,56.9,58.1,59.4,60.6,61.9,63.1,64.4,65.6,66.9,68.1,69.4,70.6,71.9,73.1,74.4,74.4],ye=[0,.1,.2,.3,.4,.6,.85,1.25,1.75,2.25,2.75,3.25,3.75,4.25,4.75,5.25,5.75,6.25,6.75,7.25,7.75,8.25,8.75,9.25,9.75,10.25,10.75,11.25,11.75,12.25,12.75,13.25,13.75,14.25,14.75,15.25,15.75,16.25,16.75,17.25,17.75,18.25,18.75,19.25,19.75,20.25,20.75,21.25,21.75,22.25,22.75,23.25,23.75,24.25,24.75,25.25,25.75,26.25,26.75,27.25,27.75,28.25,28.75,29.25,29.75,29.75],k=ne[H],$=ge[H],he=ye[H];return Z==="above60"||le==="foreigner"?{er:$,ee:0,total:$,er_only:$,bracket:H}:{er:k,ee:he,total:Number((k+he).toFixed(2)),er_only:$,bracket:H}}function _(){gtag("event","click_calculate_socso",{event_category:"SOCSO Calculator",event_label:"Calculate Button"});const O=parseFloat(document.getElementById("socsoGrossSalary").value)||0,Z=document.querySelector('input[name="socsoAge"]:checked'),le=Z?Z.value:"below60",K=document.querySelector('input[name="socsoNationality"]:checked'),H=K?K.value:"malaysian";if(O<=0)return;const ne=f(O,le,H),ge=ne.er,ye=ne.ee;s={salary:O,epf:0,socso:ye,socsoEmployer:ge,socsoTotal:ne.total,socsoCategory:le==="above60"?"60 years and above (Employment Injury Scheme Only)":"Below 60 years old (Full Coverage)",socsoBracket:ne.bracket,eis:0,pcb:0,totalDeductions:ye,netSalary:O-ye},h.classList.add("show"),u.style.display="none",document.getElementById("socsoEmployeeCardVal").textContent="RM "+ye.toFixed(2),document.getElementById("socsoEmployerCardVal").textContent="RM "+ge.toFixed(2),document.getElementById("socsoTotalCardVal").textContent="RM "+ne.total.toFixed(2)}const v=document.getElementById("layoutSalary"),b=document.getElementById("layoutSocso"),P=document.getElementById("salarySeoContent"),N=document.getElementById("socsoSeoContent"),M=document.getElementById("navBtnSalary"),x=document.getElementById("navBtnSocso"),W=document.getElementById("navBtnPcb"),G=document.getElementById("mobileNavBtnSalary"),X=document.getElementById("mobileNavBtnSocso"),Ve=document.getElementById("mobileNavBtnPcb"),pe=document.getElementById("mobileNavMenu"),me=document.getElementById("mobileMenuToggle");me&&pe&&me.addEventListener("click",()=>{pe.classList.toggle("open")});function E(O,Z=!0,le=!0){if(Z){const xe=document.querySelector(".calculator-area");if(xe){const st=document.body.getBoundingClientRect().top,Ze=xe.getBoundingClientRect().top-st-80;window.scrollTo({top:Ze,behavior:"smooth"})}}const K=document.getElementById("heroTitle"),H=document.getElementById("heroSubtitle");if(O==="salary"){le&&window.history.pushState({tool:"salary"},"","/"),K&&(K.textContent="Salary Calculator Malaysia (Take Home Pay)"),H&&(H.textContent="Calculate Salary, EPF, SOCSO, EIS and PCB Contributions for FREE."),document.title="Salary Calculator Malaysia (Take Home Pay) | EPF, SOCSO, EIS, PCB";var ne=document.querySelector('link[rel="canonical"]');ne&&ne.setAttribute("href","https://salarycalculator.my/");var ge=document.querySelector('meta[property="og:url"]');ge&&ge.setAttribute("content","https://salarycalculator.my/");var ye=document.querySelector('meta[property="og:title"]');ye&&ye.setAttribute("content","Salary Calculator Malaysia (Take Home Pay) | EPF, SOCSO, EIS, PCB");var k=document.querySelector('meta[property="og:description"]');k&&k.setAttribute("content","Calculate your net salary in Malaysia after EPF, SOCSO, EIS, and PCB deductions instantly. Free tool for employees and employers.");var $=document.querySelector('meta[name="twitter:title"]');$&&$.setAttribute("content","Salary Calculator Malaysia (Take Home Pay) | EPF, SOCSO, EIS, PCB");var he=document.querySelector('meta[name="twitter:description"]');he&&he.setAttribute("content","Calculate your net salary in Malaysia after EPF, SOCSO, EIS, and PCB deductions instantly. Free tool for employees and employers."),M&&M.classList.add("active-nav"),x&&x.classList.remove("active-nav");const xe=document.getElementById("navBtnPcb");xe&&xe.classList.remove("active-nav"),G&&G.classList.add("active-nav"),X&&X.classList.remove("active-nav");const Re=document.getElementById("mobileNavBtnPcb");Re&&Re.classList.remove("active-nav"),v&&(v.style.display="",v.style.opacity="1"),b&&(b.style.display="none",b.style.opacity="0"),P&&(P.style.display=""),N&&(N.style.display="none")}else{le&&window.history.pushState({tool:"socso"},"","/socso-perkeso"),K&&(K.textContent="SOCSO (PERKESO) Calculator Malaysia"),H&&(H.textContent="Check employee and employer SOCSO contributions instantly, FAST & FREE."),document.title="SOCSO (PERKESO) Calculator Malaysia | Check employee and employer SOCSO contributions";var ne=document.querySelector('link[rel="canonical"]');ne&&ne.setAttribute("href","https://salarycalculator.my/socso-perkeso");var ge=document.querySelector('meta[property="og:url"]');ge&&ge.setAttribute("content","https://salarycalculator.my/socso-perkeso");var ye=document.querySelector('meta[property="og:title"]');ye&&ye.setAttribute("content","SOCSO (PERKESO) Calculator Malaysia | Check employee and employer SOCSO contributions");var k=document.querySelector('meta[property="og:description"]');k&&k.setAttribute("content","Check employee and employer SOCSO contributions instantly. Free SOCSO (PERKESO) calculator for Malaysia.");var $=document.querySelector('meta[name="twitter:title"]');$&&$.setAttribute("content","SOCSO (PERKESO) Calculator Malaysia | Check employee and employer SOCSO contributions");var he=document.querySelector('meta[name="twitter:description"]');he&&he.setAttribute("content","Check employee and employer SOCSO contributions instantly. Free SOCSO (PERKESO) calculator for Malaysia.");const ee=document.querySelector("#layoutSocso .card-title");ee&&(ee.textContent="SOCSO (PERKESO) Calculator Malaysia"),x&&x.classList.add("active-nav"),M&&M.classList.remove("active-nav");const et=document.getElementById("navBtnPcb");et&&et.classList.remove("active-nav"),X&&X.classList.add("active-nav"),G&&G.classList.remove("active-nav");const Nn=document.getElementById("mobileNavBtnPcb");Nn&&Nn.classList.remove("active-nav"),b&&(b.style.display="",b.style.opacity="1"),v&&(v.style.display="none",v.style.opacity="0"),P&&(P.style.display="none"),N&&(N.style.display="")}pe&&pe.classList.remove("open")}window.location.pathname==="/socso-perkeso"?E("socso",!1,!1):E("salary",!1,!1),window.addEventListener("popstate",O=>{const Z=window.location.pathname;E(Z==="/socso-perkeso"?"socso":"salary",!1,!1)}),M&&M.addEventListener("click",O=>{O.preventDefault(),E("salary")}),x&&x.addEventListener("click",O=>{O.preventDefault(),E("socso")}),W&&W.addEventListener("click",O=>{O.preventDefault(),window.location.href="/pcb-income-tax.html"});const p=document.getElementById("footerLinkSocso");p&&p.addEventListener("click",()=>E("socso")),G&&G.addEventListener("click",O=>{O.preventDefault(),E("salary")}),X&&X.addEventListener("click",O=>{O.preventDefault(),E("socso")}),Ve&&Ve.addEventListener("click",O=>{O.preventDefault(),window.location.href="/pcb-income-tax.html"});const y=document.getElementById("socsoTableWrapper"),I=document.getElementById("toggleSocsoTableBtn"),m=document.getElementById("socsoTableFade");let w=!1;I&&I.addEventListener("click",()=>{if(w=!w,w)y.style.maxHeight=y.scrollHeight+"px",m.style.opacity="0",I.textContent="Show Less";else{y.style.maxHeight="500px",m.style.opacity="1",I.textContent="Show All Contribution Table";const O=y.parentElement.getBoundingClientRect();O.top<0&&window.scrollTo({top:window.scrollY+O.top-80,behavior:"smooth"})}}),e.addEventListener("click",function(){t.style.display="block",r.classList.remove("show"),document.getElementById("incomeGroupSection").style.display="none",document.getElementById("includePcb").checked=!0,document.getElementById("employeeDeductionsContainer").innerHTML="",document.getElementById("employerContributionsContainer").innerHTML="",document.getElementById("resTotalDeductions").textContent="- RM 0.00",document.getElementById("resTotalEmployerContribution").textContent="RM 0.00",document.getElementById("resTotalEmployerCost").textContent="RM 0.00"});const g=document.getElementById("emailModal"),Ce=document.getElementById("downloadReportBtn"),dt=document.getElementById("downloadPayslipBtn"),Kr=document.getElementById("downloadSocsoReportBtn"),si=document.getElementById("closeModal"),Rn=document.getElementById("emailForm"),sn=document.getElementById("modalFormContent"),ii=document.getElementById("modalSuccessContent"),Pn=document.getElementById("modalTitle"),kn=document.getElementById("modalDescription"),At=document.getElementById("modalFeedback");let ie="report";localStorage.getItem("salaryCalc_hasSubmittedEmail");let rt=localStorage.getItem("salaryCalc_userEmail")||"";Ce&&Ce.addEventListener("click",function(){ie="report",on()}),Kr&&Kr.addEventListener("click",function(){ie="socsoreport",on()}),dt&&dt.addEventListener("click",function(){ie="payslip",on()});function on(){sn.style.display="block",ii.style.display="none",At.style.display="none";const O=document.getElementById("userEmail");rt&&(O.value=rt);const Z=document.getElementById("hiringQuestionGroup"),le=document.getElementById("hiringStatus"),K=document.getElementById("hiringError"),H=document.getElementById("companyNameGroup"),ne=document.getElementById("companyName"),ge=document.getElementById("userType");ge.value="",Z.style.display="none",le.required=!1,K.style.display="none",le.value="",H.style.display="none",ne.required=!1,ne.value="",ie==="report"?(Pn.textContent="Download Salary Report",kn.textContent="Enter your email address to receive the detailed salary breakdown and tax report."):ie==="socsoreport"?(Pn.textContent="Download SOCSO Report",kn.textContent="Enter your email address to receive the detailed SOCSO breakdown."):ie==="payslip"&&(Pn.textContent="Download Salary Payslip",kn.textContent="Enter your email address to receive your professional salary payslip."),g.style.display="flex"}function sr(){const O=document.getElementById("mobileActionButtons"),Z=document.getElementById("mobileFallbackText");O&&(O.style.display="none"),Z&&(Z.style.display="none");try{ie==="socsoreport"&&s?(At.textContent="Thank you! The SOCSO report has been downloaded.",_i({title:"SOCSO Contribution Report",fileName:"SOCSO_Report",data:[{label:"Gross Salary",value:`RM ${s.salary}`},{label:"SOCSO Category",value:s.socsoCategory||"-"},{label:"Employee Contribution",value:`RM ${s.socso}`},{label:"Employer Contribution",value:`RM ${s.socsoEmployer}`},{label:"Total SOCSO",value:`RM ${s.socsoTotal}`}]})):ie==="report"&&s?(At.textContent="Thank you! The report has been downloaded.",_i({title:"Salary Breakdown Report",fileName:"Salary_Report",data:[{label:"Gross Salary",value:`RM ${s.salary}`},{label:"EPF Employee (11%)",value:`-RM ${s.epf}`},{label:"SOCSO Employee",value:`-RM ${s.socso}`},{label:"EIS Employee",value:`-RM ${s.eis}`},{label:"PCB / Monthly Tax",value:`-RM ${s.pcb}`},{label:"Net Salary",value:`RM ${s.netSalary}`},{label:"EPF Employer (12/13%)",value:`RM ${s.epfEmployer||"0.00"}`},{label:"SOCSO Employer",value:`RM ${s.socsoEmployer||"0.00"}`},{label:"EIS Employer",value:`RM ${s.eisEmployer||"0.00"}`}]})):ie==="payslip"&&s&&(At.textContent="Thank you! Your professional payslip is downloaded.",_i({title:"Professional Payslip",fileName:"Salary_Payslip",data:[{label:"Gross Earnings",value:`RM ${s.salary}`},{label:"EPF Deduction",value:`-RM ${s.epf}`},{label:"SOCSO Deduction",value:`-RM ${s.socso}`},{label:"EIS Deduction",value:`-RM ${s.eis}`},{label:"PCB Deduction",value:`-RM ${s.pcb}`},{label:"Total Deductions",value:`RM ${s.totalDeductions}`},{label:"Net Pay",value:`RM ${s.netSalary}`}]}))}catch(le){console.error("Failed to generate PDF:",le),At.innerHTML='<span style="color:red">Failed to generate PDF automatically. Check console for errors.</span>'}}si.addEventListener("click",function(){g.style.display="none"}),window.addEventListener("click",function(O){O.target===g&&(g.style.display="none")}),document.getElementById("userType").addEventListener("change",function(){const O=document.getElementById("hiringQuestionGroup"),Z=document.getElementById("hiringStatus"),le=document.getElementById("hiringError"),K=document.getElementById("companyNameGroup"),H=document.getElementById("companyName");this.value==="Employer / HR"?(O.style.display="block",Z.required=!0,K.style.display="block",H.required=!0):(O.style.display="none",Z.required=!1,Z.value="",le.style.display="none",K.style.display="none",H.required=!1,H.value="")}),Rn.addEventListener("submit",async function(O){O.preventDefault();const Z=document.getElementById("userEmail"),le=document.getElementById("userType"),K=document.getElementById("userPhone"),H=document.getElementById("companyName"),ne=document.getElementById("hiringStatus"),ge=document.getElementById("hiringQuestionGroup"),ye=document.getElementById("hiringError"),k=Z.value.trim(),$=le.value,he=K.value.trim(),xe=H.value.trim();let Re="";if(ge.style.display!=="none"&&(Re=ne.value,!Re)){ye.style.display="block";return}if(ye.style.display="none",!k||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(k)){alert("Please enter a valid email address.");return}if(!$){alert("Please select who you are.");return}rt=k,localStorage.setItem("salaryCalc_hasSubmittedEmail","true"),localStorage.setItem("salaryCalc_userEmail",rt);try{let _e="",Ke="";ie==="report"?(_e="Download Salary Report",Ke="report"):ie==="payslip"?(_e="Download Salary Payslip",Ke="payslip"):ie==="socsoreport"&&(_e="Download SOCSO Report",Ke="socsoreport");const Ze={email:rt,userType:$,action:_e,createdAt:new Date().toISOString()};Re&&(Ze.hiringStatus=Re),xe&&(Ze.companyName=xe),he&&(Ze.phoneNumber=he),await gy(ey(by,"leads"),Ze);try{const ee={timestamp:new Date().toISOString(),email:rt,userType:$,hiringStatus:Re,companyName:xe,userPhone:he,download_via:ie==="report"?"Download Salary Report":ie==="payslip"?"Download Salary Payslip":"Download SOCSO Report"};ie==="socsoreport"?await fetch("/api/socso-sheet",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(ee)}):await fetch("/api/salary-sheet",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(ee)})}catch(ee){console.error("Error sending to Google Sheets:",ee)}if(ie==="report"||ie==="payslip")try{const ee=await fetch("/api/deliver-document",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:rt,type:ie,data:s})});if(!ee.ok)try{const et=await ee.json();console.error("Failed to send email:",et.error)}catch{console.error("Failed to send email: Server returned an error (likely 404 when hosted statically)",ee.status)}}catch(ee){console.error("Error calling deliver-document API:",ee)}localStorage.setItem("salaryCalc_downloaded_"+Ke,"true")}catch(_e){console.error("Error adding document: ",_e)}sn.style.display="none",g.style.display="none",At.style.display="block",sr(),setTimeout(()=>{g.style.display="none"},1e4)});function Jr(){try{let et=function(fe,Ee){if(Ee>0){const Pe=document.createElement("div");Pe.className="result-item",Pe.innerHTML=`<span>${fe}</span><span>- ${qe(Ee)}</span>`,Ze.appendChild(Pe),ee+=Ee}},St=function(fe,Ee){if(Ee>0){const Pe=document.createElement("div");Pe.className="result-item",Pe.innerHTML=`<span>${fe}</span><span>${qe(Ee)}</span>`,ir.appendChild(Pe),Dn+=Ee}},cr=function(fe){xn||(xn=fe);let Ee=fe-xn,Pe=Math.min(Math.floor(Ee/Vn*un),un);Zr.textContent=Pe,Ee<Vn?window.requestAnimationFrame(cr):Zr.textContent=un};gtag("event","click_calculate",{event_category:"calculator",event_label:"Calculate Button"});const O=parseFloat(document.getElementById("grossSalary").value)||0,Z=parseFloat(document.getElementById("bonus").value)||0,le=document.getElementById("maritalStatus").value,K=document.getElementById("nationality").value;(!O||isNaN(O))&&Rr("input","Invalid salary input",{grossSalary:document.getElementById("grossSalary").value});const H=document.getElementById("includeEpf").checked,ne=document.getElementById("includeSocso").checked,ge=document.getElementById("includeEis").checked,ye=document.getElementById("includePcb").checked,k=O+Z;let $=0,he=0;H&&K==="malaysian"&&($=k*.11,he=k<=5e3?k*.13:k*.12);let xe=0,Re=0;if(ne){const fe=f(k,"below60",K);xe=fe.ee,Re=fe.er}let st=0,_e=0;if(ge){const fe=Math.min(k,6e3);if(fe<=300)st=.5,_e=.5;else{const Ee=Math.ceil(fe/100);st=Ee*.2-.1,_e=Ee*.2-.1,st=Math.round(st*100)/100,_e=Math.round(_e*100)/100}}let Ke=0;if(ye){const fe=k*12,Ee=Math.min($*12,4e3),Pe=9e3;let nt=0,Rt=0;switch(le){case"single":break;case"married_spouse_not_working_no_child":nt=4e3;break;case"married_1_child_spouse_not_working":nt=4e3,Rt=2e3;break;case"married_2_children_spouse_not_working":nt=4e3,Rt=4e3;break;case"married_spouse_working_no_child":break;case"married_1_child_spouse_working":Rt=2e3;break;case"married_2_children_spouse_working":Rt=4e3;break}const li=Pe+Ee+nt+Rt,oe=fe-li;if(oe>0){let Le=0;oe<=5e3?Le=0:oe<=2e4?Le=(oe-5e3)*.01:oe<=35e3?Le=150+(oe-2e4)*.03:oe<=5e4?Le=600+(oe-35e3)*.08:oe<=7e4?Le=1800+(oe-5e4)*.11:oe<=1e5?Le=4e3+(oe-7e4)*.19:oe<=4e5?Le=9700+(oe-1e5)*.25:oe<=6e5?Le=84700+(oe-4e5)*.26:oe<=2e6?Le=136700+(oe-6e5)*.28:Le=528700+(oe-2e6)*.3,oe<=35e3&&(Le=Math.max(0,Le-400)),Ke=Le/12}}document.getElementById("resGrossMonthly").textContent=qe(k),document.getElementById("resGrossAnnual").textContent=qe(k*12);const Ze=document.getElementById("employeeDeductionsContainer");Ze.innerHTML="";let ee=0;et("EPF (11%)",$),et("SOCSO",xe),et("EIS (0.2%)",st);const Nn=k>0?(Ke/k*100).toFixed(1):0;et(`PCB (${Nn}%)`,Ke),document.getElementById("resTotalDeductions").textContent="- "+qe(ee);const ir=document.getElementById("employerContributionsContainer");ir.innerHTML="";let Dn=0;const or=k<=5e3?"EPF (13%)":"EPF (12%)";St(or,he),St("SOCSO",Re),St("EIS (0.2%)",_e),document.getElementById("resTotalEmployerContribution").textContent=qe(Dn),document.getElementById("resTotalEmployerCost").textContent=qe(k+Dn),document.getElementById("resNetMonthly").textContent=qe(k-ee),document.getElementById("resNetAnnual").textContent=qe((k-ee)*12),s={salary:k.toFixed(2),epf:$.toFixed(2),epfEmployer:he.toFixed(2),socso:xe.toFixed(2),socsoEmployer:Re.toFixed(2),socsoTotal:(xe+Re).toFixed(2),socsoCategory:"Below 60 years old (Full Coverage)",socsoBracket:k<=6e3?k<=200?Math.floor(k/30):Math.floor((k-200.01)/100)+7:65,eis:st.toFixed(2),eisEmployer:_e.toFixed(2),pcb:Ke.toFixed(2),totalDeductions:ee.toFixed(2),netSalary:(k-ee).toFixed(2)},(!s||isNaN(parseFloat(s.netSalary)))&&Rr("calculation","Invalid result generated",{grossSalary:O,bonus:Z},{result:s});const ar=k-ee,ft=k>0?ar/k*100:0,Xr=100-ft;document.getElementById("barNet").style.width=ft+"%",document.getElementById("barDeduction").style.width=Xr+"%";let de="B40",Me="B1",we="#ef4444",Ge="#fef2f2",Q="#fee2e2",He="lower income group";k>=15870?(de="T20",Me="T2",we="#16a34a",Ge="#f0fdf4",Q="#dcfce7",He="top income group"):k>=11820?(de="T20",Me="T1",we="#16a34a",Ge="#f0fdf4",Q="#dcfce7",He="top income group"):k>=9450?(de="M40",Me="M4",we="#ca8a04",Ge="#fefce8",Q="#fef9c3",He="middle income group"):k>=7690?(de="M40",Me="M3",we="#ca8a04",Ge="#fefce8",Q="#fef9c3",He="middle income group"):k>=6340?(de="M40",Me="M2",we="#ca8a04",Ge="#fefce8",Q="#fef9c3",He="middle income group"):k>=5250?(de="M40",Me="M1",we="#ca8a04",Ge="#fefce8",Q="#fef9c3",He="middle income group"):k>=4310?(de="B40",Me="B4",we="#ef4444",Ge="#fef2f2",Q="#fee2e2",He="lower income group"):k>=3440?(de="B40",Me="B3",we="#ef4444",Ge="#fef2f2",Q="#fee2e2",He="lower income group"):k>=2560?(de="B40",Me="B2",we="#ef4444",Ge="#fef2f2",Q="#fee2e2",He="lower income group"):(de="B40",Me="B1",we="#ef4444",Ge="#fef2f2",Q="#fee2e2",He="lower income group");const Lt=document.getElementById("resIncomeGroupLabel");Lt.textContent=`${de} (${Me})`,Lt.style.backgroundColor=we,document.getElementById("groupBarB40").style.opacity=de==="B40"?"1":"0.2",document.getElementById("groupBarM40").style.opacity=de==="M40"?"1":"0.2",document.getElementById("groupBarT20").style.opacity=de==="T20"?"1":"0.2",s.incomeGroup=de,s.subGroup=Me;const an=document.getElementById("resIncomeGroupDescription");an.innerHTML=`With your total monthly income, you’re in the <strong style="color: ${we}; font-weight: 800;">${de} (${Me}) category (${He})</strong> in Malaysia.`;const lr=document.getElementById("incomeGroupSection");lr.style.backgroundColor=Ge,lr.style.borderColor=Q,lr.style.display="block",t.style.display="none",r.classList.add("show");const Yr=document.getElementById("premiumIncomeJourneySection");Yr.style.display="block",setTimeout(()=>{Yr.style.opacity="1"},50);let Qe=0,Bt=0,On="50%",bt="50%",pt="#eab308",ln="#16a34a",Je="#ef4444",tt=document.getElementById("nodeB40"),cn=document.getElementById("nodeM40"),Xe=document.getElementById("nodeT20");tt.style.background="#ffffff",cn.style.background="#ffffff",Xe.style.background="#ffffff";let oi="linear-gradient(90deg, #ef4444 0%, ";if(k<5250)Qe=5250-k,Bt=k/5250*100,On=Bt*.5+"%",bt="0%",tt.style.borderColor=Je,cn.style.borderColor="#e2e8f0",Xe.style.borderColor="#e2e8f0",document.getElementById("journeyTrackFill").style.background=Je,document.getElementById("journeyYouAreHere").style.color=Je,document.getElementById("nextGoalContent").style.display="flex",document.getElementById("nextGoalContent").style.flexDirection="column",document.getElementById("maxGoalContent").style.display="none",document.getElementById("nextGoalTitle").textContent="Next Goal: M40",document.getElementById("nextGoalAmount").textContent=qe(Qe),document.getElementById("insightMilestoneLabelTop").textContent="Next Milestone",document.getElementById("insightMilestoneGroup").textContent="M40 Income Group",document.getElementById("insightMilestoneRange").textContent="RM5,250 - RM11,819",document.getElementById("insightMilestoneIconBg").style.background="#fefce8",document.getElementById("insightMilestoneGroup").style.color=pt,document.getElementById("insightProgressLabel").textContent="to reach M40",document.getElementById("insightProgressRemaining").textContent=qe(Qe)+" more to go";else if(k<11820){Qe=11820-k;let fe=(k-5250)/6570;Bt=100*fe,On=50+fe*50+"%",bt="50%",tt.style.borderColor=Je,tt.style.background=Je,cn.style.borderColor=pt,Xe.style.borderColor="#e2e8f0",document.getElementById("journeyTrackFill").style.background=`linear-gradient(90deg, ${Je} 0%, ${pt} 100%)`,document.getElementById("journeyYouAreHere").style.color=pt,document.getElementById("nextGoalContent").style.display="flex",document.getElementById("nextGoalContent").style.flexDirection="column",document.getElementById("maxGoalContent").style.display="none",document.getElementById("nextGoalTitle").textContent="Next Goal: T20",document.getElementById("nextGoalAmount").textContent=qe(Qe),document.getElementById("insightMilestoneLabelTop").textContent="Next Milestone",document.getElementById("insightMilestoneGroup").textContent="T20 Income Group",document.getElementById("insightMilestoneRange").textContent="RM11,820 & above",document.getElementById("insightMilestoneIconBg").style.background="#e0e7ff",document.getElementById("insightMilestoneGroup").style.color="#4f46e5",document.getElementById("insightProgressLabel").textContent="to reach T20",document.getElementById("insightProgressRemaining").textContent=qe(Qe)+" more to go"}else Bt=100,On="100%",bt="100%",tt.style.borderColor=Je,tt.style.background=Je,cn.style.borderColor=pt,cn.style.background=pt,Xe.style.borderColor=ln,document.getElementById("journeyTrackFill").style.background=`linear-gradient(90deg, ${Je} 0%, ${pt} 50%, ${ln} 100%)`,document.getElementById("journeyYouAreHere").style.color=ln,document.getElementById("nextGoalContent").style.display="none",document.getElementById("maxGoalContent").style.display="block",document.getElementById("insightMilestoneLabelTop").textContent="Current Status",document.getElementById("insightMilestoneGroup").textContent="T20 Income Group",document.getElementById("insightMilestoneRange").textContent="RM11,820 & above",document.getElementById("insightMilestoneIconBg").style.background="#dcfce7",document.getElementById("insightMilestoneGroup").style.color=ln,document.getElementById("insightProgressLabel").textContent="in top bracket",document.getElementById("insightProgressRemaining").textContent="You're in the top household income category!";let ai=0,un=Math.min(100,Math.floor(Bt)),Vn=1e3,xn=null,Zr=document.getElementById("insightProgressPct");window.requestAnimationFrame(cr),document.getElementById("journeyTrackFill").style.width=On,document.getElementById("journeyYouAreHere").style.left=bt,document.getElementById("insightProgressBar").style.width=Math.min(100,Bt)+"%";let it=document.getElementById("journeyCurrentBadge"),Ct="B40";k>=11820?Ct="T20":k>=5250&&(Ct="M40"),Ct==="B40"?(it.textContent="B40",it.style.background="linear-gradient(135deg, #ef4444, #b91c1c)",it.style.boxShadow="0 4px 14px -4px rgba(239, 68, 68, 0.6)"):Ct==="M40"?(it.textContent="M40",it.style.background="linear-gradient(135deg, #eab308, #ca8a04)",it.style.boxShadow="0 4px 14px -4px rgba(202, 138, 4, 0.6)"):(it.textContent="T20",it.style.background="linear-gradient(135deg, #16a34a, #15803d)",it.style.boxShadow="0 4px 14px -4px rgba(22, 163, 74, 0.6)"),setTimeout(()=>{document.getElementById("resultCard").scrollIntoView({behavior:"smooth",block:"start"})},100)}catch(O){throw Rr("calculation",O.message,{grossSalary:document.getElementById("grossSalary").value,bonus:document.getElementById("bonus").value},{stack:O.stack}),O}}function qe(O){return"RM "+O.toLocaleString("en-MY",{minimumFractionDigits:2,maximumFractionDigits:2})}});var Cy={input:"Check that the user entered a valid number in the salary field.",calculation:"Review the calculation logic — check for division by zero or NaN values.",system:"A JavaScript crash occurred. Check the stack trace for the exact file and line.",promise:"An async operation failed. Check API calls or Firebase for errors.",api:"The API request failed. Verify the endpoint URL, payload, and network."},Ry={input:"low",calculation:"high",system:"critical",promise:"high",api:"high"};function Rr(n,e,t,r){t===void 0&&(t={}),r===void 0&&(r={});for(var s=JSON.parse(localStorage.getItem("salary_error_logs")||"[]"),o=null,a=0;a<Math.min(s.length,10);a++)if(s[a].type===n&&s[a].message===e){o=s[a],s.splice(a,1);break}var u={id:Date.now(),timestamp:new Date().toISOString(),type:n,severity:Ry[n]||"medium",message:e,fix:Cy[n]||"Check the code related to this error type.",input:t,extra:r,stack:r&&r.stack?r.stack:null,url:window.location.href,userAgent:navigator.userAgent,count:o?(o.count||1)+1:1,status:"new"};s.unshift(u),s.length>100&&(s=s.slice(0,100)),localStorage.setItem("salary_error_logs",JSON.stringify(s)),console.group("[SalaryCalc Error] "+n.toUpperCase()+" — "+e),console.info("Severity :",u.severity),console.info("Input    :",u.input),console.info("Fix      :",u.fix),u.stack&&console.info("Stack    :",u.stack),console.groupEnd()}function Py(){return JSON.parse(localStorage.getItem("salary_error_logs")||"[]")}window.onerror=function(n,e,t,r,s){Rr("system",n,{},{source:e,lineno:t,colno:r,stack:s?s.stack:null})};window.onunhandledrejection=function(n){Rr("promise",n.reason&&n.reason.message||"Unhandled promise",{},{stack:n.reason?n.reason.stack:null})};var ky="2904",Al=!1;function Ny(n){var e=Py(),t=e,r=document.getElementById("errorLogContent"),s={input:"#f59e0b",calculation:"#ef4444",system:"#8b5cf6",promise:"#3b82f6",api:"#10b981",test:"#64748b"},o={low:"#22c55e",medium:"#f59e0b",high:"#ef4444",critical:"#7f1d1d"},a='<div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:16px;align-items:center;"><span style="color:#64748b;font-size:0.82rem;">Total: <strong>'+e.length+'</strong></span><select onchange="renderLogTable(this.value)" style="font-size:0.8rem;padding:4px 8px;border:1px solid #e2e8f0;border-radius:6px;color:#334155;"><option value="all" selected>All Types</option><option value="input">Input</option><option value="calculation">Calculation</option><option value="system">System</option><option value="promise">Promise</option><option value="api">API</option></select></div>';if(t.length===0){r.innerHTML=a+'<p style="color:#64748b;text-align:center;padding:30px 0;">No errors for this filter.</p>';return}var u=t.map(function(h){var f=s[h.type]||"#64748b",_=o[h.severity]||"#64748b",v=new Date(h.timestamp).toLocaleString("en-MY"),b=Object.keys(h.input||{}).length?JSON.stringify(h.input):"—",P=h.stack?'<details style="margin-top:4px;"><summary style="cursor:pointer;color:#94a3b8;font-size:0.72rem;">View stack trace</summary><pre style="font-size:0.68rem;color:#64748b;white-space:pre-wrap;margin-top:4px;">'+h.stack.substring(0,400)+"</pre></details>":"",N=h.count>1?' <span style="background:#fef3c7;color:#92400e;padding:1px 5px;border-radius:4px;font-size:0.68rem;">x'+h.count+"</span>":"";return'<tr style="border-bottom:1px solid #f1f5f9;vertical-align:top;"><td style="padding:10px 8px;color:#64748b;white-space:nowrap;font-size:0.78rem;">'+v+'</td><td style="padding:10px 8px;"><span style="background:'+f+"20;color:"+f+';padding:2px 8px;border-radius:4px;font-weight:700;text-transform:uppercase;font-size:0.7rem;">'+h.type+'</span></td><td style="padding:10px 8px;"><span style="background:'+_+"20;color:"+_+';padding:2px 8px;border-radius:4px;font-weight:600;font-size:0.7rem;">'+(h.severity||"—")+'</span></td><td style="padding:10px 8px;color:#1e293b;font-size:0.82rem;">'+h.message+N+P+'</td><td style="padding:10px 8px;color:#64748b;font-size:0.75rem;">'+b+'</td><td style="padding:10px 8px;color:#0369a1;font-size:0.75rem;">'+(h.fix||"—")+"</td></tr>"}).join("");r.innerHTML=a+'<div style="overflow-x:auto;"><table style="width:100%;border-collapse:collapse;min-width:700px;"><thead><tr style="background:#f8fafc;"><th style="padding:10px 8px;text-align:left;color:#475569;font-size:0.75rem;white-space:nowrap;">Time</th><th style="padding:10px 8px;text-align:left;color:#475569;font-size:0.75rem;">Type</th><th style="padding:10px 8px;text-align:left;color:#475569;font-size:0.75rem;">Severity</th><th style="padding:10px 8px;text-align:left;color:#475569;font-size:0.75rem;">Message</th><th style="padding:10px 8px;text-align:left;color:#475569;font-size:0.75rem;">Input</th><th style="padding:10px 8px;text-align:left;color:#475569;font-size:0.75rem;">How to Fix</th></tr></thead><tbody>'+u+"</tbody></table></div>"}function Dy(){if(!Al){var n=prompt("Enter PIN to view error logs:");if(n===null)return;if(n!==ky){alert("Incorrect PIN.");return}Al=!0}Ny(),document.getElementById("errorLogModal").style.display="block"}var Bn="",ki="errorlogs";document.addEventListener("keydown",function(n){var e=document.activeElement?document.activeElement.tagName:"";e==="INPUT"||e==="TEXTAREA"||e==="SELECT"||(Bn+=(n.key||"").toLowerCase(),Bn.length>ki.length&&(Bn=Bn.slice(-ki.length)),Bn===ki&&(Bn="",Dy()))});const ms=document.getElementById("toggleClaimsBtn"),gs=document.getElementById("hiddenClaims");ms&&gs&&ms.addEventListener("click",function(){gs.style.display==="none"?(gs.style.display="grid",ms.textContent="Show Less"):(gs.style.display="none",ms.textContent="Show More")});window.shareProgress=async function(n){try{const e=document.getElementById("journeyCurrentBadge").textContent||"B40",t=document.getElementById("insightProgressPct"),r=t?t.textContent:"0",s=document.getElementById("nextGoalAmount"),o=s?s.textContent:"RM 0.00",a=document.getElementById("nextGoalTitle"),u=a&&a.textContent.split(": ")[1]||"M40",h=document.getElementById("maxGoalContent"),f=h&&h.style.display==="block";let _="#ef4444",v="#eab308",b="#16a34a",P=["ls","vt"],N=n==="instagram"||n==="whatsapp";for(let m of P)document.getElementById(m+"CurrentBadge").textContent=e,document.getElementById(m+"CurrentBadge").style.background=e==="B40"?_:e==="M40"?v:b,document.getElementById(m+"Node1").style.borderColor=_,e==="B40"?(document.getElementById(m+"TimelineFill").style.background=_,document.getElementById(m+"TimelineFill").style.width="25%",document.getElementById(m+"Node2").style.borderColor=m==="vt"?"rgba(0,0,0,0.1)":"#e2e8f0",document.getElementById(m+"Node3").style.borderColor=m==="vt"?"rgba(0,0,0,0.1)":"#e2e8f0"):e==="M40"?(document.getElementById(m+"TimelineFill").style.background=`linear-gradient(90deg, ${_} 0%, ${v} 100%)`,document.getElementById(m+"TimelineFill").style.width="50%",document.getElementById(m+"Node2").style.borderColor=v,document.getElementById(m+"Node3").style.borderColor=m==="vt"?"rgba(0,0,0,0.1)":"#e2e8f0"):(document.getElementById(m+"TimelineFill").style.background=`linear-gradient(90deg, ${_} 0%, ${v} 50%, ${b} 100%)`,document.getElementById(m+"TimelineFill").style.width="100%",document.getElementById(m+"Node2").style.borderColor=v,document.getElementById(m+"Node3").style.borderColor=b),f?(document.getElementById(m+"NextGoal").textContent="T20+",document.getElementById(m+"NextGoalRange").textContent="Top Tier",document.getElementById(m+"ProgressPct").textContent="100",document.getElementById(m+"ProgressBar").style.width="100%",document.getElementById(m+"MoreToGo").textContent="You made it!",document.getElementById(m+"FooterText").textContent=`I'm in the top ${e} household income group! 🎉`):(document.getElementById(m+"NextGoal").textContent=u,document.getElementById(m+"NextGoalRange").textContent=u==="M40"?"RM5,250 - RM11,819":"RM11,820 & above",document.getElementById(m+"ProgressPct").textContent=r,document.getElementById(m+"ProgressBar").style.width=Number(r)+"%",document.getElementById(m+"MoreToGo").textContent=o+" more to go",document.getElementById(m+"FooterText").textContent=`I'm ${r}% on the way to ${u}! 🚀`);document.getElementById("shareLoadingModal").style.display="flex",await Oy();const M=document.getElementById(N?"shareCardVertical":"shareCardLandscape"),x=document.getElementById("shareCardTemplateContainer");x.style.opacity="1";const W=await html2canvas(M,{scale:N?1:1.5,backgroundColor:null,useCORS:!0});x.style.opacity="0";const G=W.toDataURL("image/png"),X=await(await fetch(G)).blob(),Ve=new File([X],"IncomeJourneyResult.png",{type:"image/png"});document.getElementById("shareLoadingModal").style.display="none";const me={title:"My Income Journey",text:document.getElementById(N?"vtFooterText":"lsFooterText").textContent+" Track your journey at: "+window.location.href,url:window.location.href};let E=!1;try{if(navigator.clipboard&&navigator.clipboard.write){const m=new ClipboardItem({"image/png":X});await navigator.clipboard.write([m]),E=!0}}catch(m){console.warn("Clipboard write failed",m)}if(n==="instagram"){if(navigator.canShare&&navigator.canShare({files:[Ve]}))try{me.files=[Ve],await navigator.share(me),gtag("event","share",{method:"instagram",content_type:"income_journey",item_id:"share_card"});return}catch(m){console.log("Native share failed",m)}gtag("event","share",{method:"instagram",content_type:"income_journey",item_id:"share_card"}),ys(E?"Image copied! Paste it in your Instagram Story.":"Open Instagram to share your progress."),window.location.href="instagram://story-camera";return}let p=encodeURIComponent(me.text),y=encodeURIComponent(window.location.href),I="";switch(n){case"twitter":I="https://twitter.com/intent/tweet?text="+p+"&hashtags=IncomeJourney";break;case"linkedin":I="https://www.linkedin.com/sharing/share-offsite/?url="+y;break;case"whatsapp":I="https://api.whatsapp.com/send?text="+p;break;case"facebook":I="https://www.facebook.com/sharer/sharer.php?u="+y;break;case"threads":I="https://www.threads.net/intent/post?text="+p;break}I&&(gtag("event","share",{method:n,content_type:"income_journey",item_id:"share_card"}),E?(ys("Share graphic copied to clipboard! Paste it into your post."),setTimeout(()=>{window.open(I,"_blank","noopener,noreferrer")},1200)):window.open(I,"_blank","noopener,noreferrer"))}catch(e){document.getElementById("shareLoadingModal").style.display="none",console.error("Error in shareProgress:",e),ys("Failed to generate image. Please try again.",!0)}};function ys(n,e=!1){let t=document.createElement("div");t.textContent=n,t.style.position="fixed",t.style.bottom="20px",t.style.left="50%",t.style.transform="translateX(-50%)",t.style.background=e?"#ef4444":"#10b981",t.style.color="white",t.style.padding="12px 24px",t.style.borderRadius="8px",t.style.zIndex="10000",t.style.fontFamily="'Inter', sans-serif",t.style.fontWeight="600",t.style.boxShadow="0 10px 15px -3px rgba(0, 0, 0, 0.1)",t.style.transition="opacity 0.3s ease-in-out",document.body.appendChild(t),setTimeout(()=>t.style.opacity="0",3e3),setTimeout(()=>document.body.removeChild(t),3300)}async function Oy(){return window.html2canvas?!0:new Promise(n=>{const e=document.createElement("script");e.src="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js",e.onload=()=>n(!0),e.onerror=()=>n(!1),document.head.appendChild(e)})}
