function Sw(n,a){for(var s=0;s<a.length;s++){const o=a[s];if(typeof o!="string"&&!Array.isArray(o)){for(const u in o)if(u!=="default"&&!(u in n)){const h=Object.getOwnPropertyDescriptor(o,u);h&&Object.defineProperty(n,u,h.get?h:{enumerable:!0,get:()=>o[u]})}}}return Object.freeze(Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}))}(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const u of document.querySelectorAll('link[rel="modulepreload"]'))o(u);new MutationObserver(u=>{for(const h of u)if(h.type==="childList")for(const f of h.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&o(f)}).observe(document,{childList:!0,subtree:!0});function s(u){const h={};return u.integrity&&(h.integrity=u.integrity),u.referrerPolicy&&(h.referrerPolicy=u.referrerPolicy),u.crossOrigin==="use-credentials"?h.credentials="include":u.crossOrigin==="anonymous"?h.credentials="omit":h.credentials="same-origin",h}function o(u){if(u.ep)return;u.ep=!0;const h=s(u);fetch(u.href,h)}})();function sx(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}var Yu={exports:{}},qi={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Wg;function ww(){if(Wg)return qi;Wg=1;var n=Symbol.for("react.transitional.element"),a=Symbol.for("react.fragment");function s(o,u,h){var f=null;if(h!==void 0&&(f=""+h),u.key!==void 0&&(f=""+u.key),"key"in u){h={};for(var m in u)m!=="key"&&(h[m]=u[m])}else h=u;return u=h.ref,{$$typeof:n,type:o,key:f,ref:u!==void 0?u:null,props:h}}return qi.Fragment=a,qi.jsx=s,qi.jsxs=s,qi}var Ig;function jw(){return Ig||(Ig=1,Yu.exports=ww()),Yu.exports}var l=jw(),Gu={exports:{}},Se={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ey;function Ew(){if(ey)return Se;ey=1;var n=Symbol.for("react.transitional.element"),a=Symbol.for("react.portal"),s=Symbol.for("react.fragment"),o=Symbol.for("react.strict_mode"),u=Symbol.for("react.profiler"),h=Symbol.for("react.consumer"),f=Symbol.for("react.context"),m=Symbol.for("react.forward_ref"),p=Symbol.for("react.suspense"),g=Symbol.for("react.memo"),v=Symbol.for("react.lazy"),x=Symbol.for("react.activity"),b=Symbol.iterator;function j(C){return C===null||typeof C!="object"?null:(C=b&&C[b]||C["@@iterator"],typeof C=="function"?C:null)}var E={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},T=Object.assign,D={};function O(C,R,I){this.props=C,this.context=R,this.refs=D,this.updater=I||E}O.prototype.isReactComponent={},O.prototype.setState=function(C,R){if(typeof C!="object"&&typeof C!="function"&&C!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,C,R,"setState")},O.prototype.forceUpdate=function(C){this.updater.enqueueForceUpdate(this,C,"forceUpdate")};function k(){}k.prototype=O.prototype;function B(C,R,I){this.props=C,this.context=R,this.refs=D,this.updater=I||E}var _=B.prototype=new k;_.constructor=B,T(_,O.prototype),_.isPureReactComponent=!0;var U=Array.isArray;function q(){}var N={H:null,A:null,T:null,S:null},M=Object.prototype.hasOwnProperty;function V(C,R,I){var ie=I.ref;return{$$typeof:n,type:C,key:R,ref:ie!==void 0?ie:null,props:I}}function $(C,R){return V(C.type,R,C.props)}function J(C){return typeof C=="object"&&C!==null&&C.$$typeof===n}function re(C){var R={"=":"=0",":":"=2"};return"$"+C.replace(/[=:]/g,function(I){return R[I]})}var pe=/\/+/g;function le(C,R){return typeof C=="object"&&C!==null&&C.key!=null?re(""+C.key):R.toString(36)}function ve(C){switch(C.status){case"fulfilled":return C.value;case"rejected":throw C.reason;default:switch(typeof C.status=="string"?C.then(q,q):(C.status="pending",C.then(function(R){C.status==="pending"&&(C.status="fulfilled",C.value=R)},function(R){C.status==="pending"&&(C.status="rejected",C.reason=R)})),C.status){case"fulfilled":return C.value;case"rejected":throw C.reason}}throw C}function H(C,R,I,ie,oe){var fe=typeof C;(fe==="undefined"||fe==="boolean")&&(C=null);var ye=!1;if(C===null)ye=!0;else switch(fe){case"bigint":case"string":case"number":ye=!0;break;case"object":switch(C.$$typeof){case n:case a:ye=!0;break;case v:return ye=C._init,H(ye(C._payload),R,I,ie,oe)}}if(ye)return oe=oe(C),ye=ie===""?"."+le(C,0):ie,U(oe)?(I="",ye!=null&&(I=ye.replace(pe,"$&/")+"/"),H(oe,R,I,"",function(ue){return ue})):oe!=null&&(J(oe)&&(oe=$(oe,I+(oe.key==null||C&&C.key===oe.key?"":(""+oe.key).replace(pe,"$&/")+"/")+ye)),R.push(oe)),1;ye=0;var ae=ie===""?".":ie+":";if(U(C))for(var Q=0;Q<C.length;Q++)ie=C[Q],fe=ae+le(ie,Q),ye+=H(ie,R,I,fe,oe);else if(Q=j(C),typeof Q=="function")for(C=Q.call(C),Q=0;!(ie=C.next()).done;)ie=ie.value,fe=ae+le(ie,Q++),ye+=H(ie,R,I,fe,oe);else if(fe==="object"){if(typeof C.then=="function")return H(ve(C),R,I,ie,oe);throw R=String(C),Error("Objects are not valid as a React child (found: "+(R==="[object Object]"?"object with keys {"+Object.keys(C).join(", ")+"}":R)+"). If you meant to render a collection of children, use an array instead.")}return ye}function se(C,R,I){if(C==null)return C;var ie=[],oe=0;return H(C,ie,"","",function(fe){return R.call(I,fe,oe++)}),ie}function K(C){if(C._status===-1){var R=C._result;R=R(),R.then(function(I){(C._status===0||C._status===-1)&&(C._status=1,C._result=I)},function(I){(C._status===0||C._status===-1)&&(C._status=2,C._result=I)}),C._status===-1&&(C._status=0,C._result=R)}if(C._status===1)return C._result.default;throw C._result}var P=typeof reportError=="function"?reportError:function(C){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var R=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof C=="object"&&C!==null&&typeof C.message=="string"?String(C.message):String(C),error:C});if(!window.dispatchEvent(R))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",C);return}console.error(C)},ne={map:se,forEach:function(C,R,I){se(C,function(){R.apply(this,arguments)},I)},count:function(C){var R=0;return se(C,function(){R++}),R},toArray:function(C){return se(C,function(R){return R})||[]},only:function(C){if(!J(C))throw Error("React.Children.only expected to receive a single React element child.");return C}};return Se.Activity=x,Se.Children=ne,Se.Component=O,Se.Fragment=s,Se.Profiler=u,Se.PureComponent=B,Se.StrictMode=o,Se.Suspense=p,Se.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=N,Se.__COMPILER_RUNTIME={__proto__:null,c:function(C){return N.H.useMemoCache(C)}},Se.cache=function(C){return function(){return C.apply(null,arguments)}},Se.cacheSignal=function(){return null},Se.cloneElement=function(C,R,I){if(C==null)throw Error("The argument must be a React element, but you passed "+C+".");var ie=T({},C.props),oe=C.key;if(R!=null)for(fe in R.key!==void 0&&(oe=""+R.key),R)!M.call(R,fe)||fe==="key"||fe==="__self"||fe==="__source"||fe==="ref"&&R.ref===void 0||(ie[fe]=R[fe]);var fe=arguments.length-2;if(fe===1)ie.children=I;else if(1<fe){for(var ye=Array(fe),ae=0;ae<fe;ae++)ye[ae]=arguments[ae+2];ie.children=ye}return V(C.type,oe,ie)},Se.createContext=function(C){return C={$$typeof:f,_currentValue:C,_currentValue2:C,_threadCount:0,Provider:null,Consumer:null},C.Provider=C,C.Consumer={$$typeof:h,_context:C},C},Se.createElement=function(C,R,I){var ie,oe={},fe=null;if(R!=null)for(ie in R.key!==void 0&&(fe=""+R.key),R)M.call(R,ie)&&ie!=="key"&&ie!=="__self"&&ie!=="__source"&&(oe[ie]=R[ie]);var ye=arguments.length-2;if(ye===1)oe.children=I;else if(1<ye){for(var ae=Array(ye),Q=0;Q<ye;Q++)ae[Q]=arguments[Q+2];oe.children=ae}if(C&&C.defaultProps)for(ie in ye=C.defaultProps,ye)oe[ie]===void 0&&(oe[ie]=ye[ie]);return V(C,fe,oe)},Se.createRef=function(){return{current:null}},Se.forwardRef=function(C){return{$$typeof:m,render:C}},Se.isValidElement=J,Se.lazy=function(C){return{$$typeof:v,_payload:{_status:-1,_result:C},_init:K}},Se.memo=function(C,R){return{$$typeof:g,type:C,compare:R===void 0?null:R}},Se.startTransition=function(C){var R=N.T,I={};N.T=I;try{var ie=C(),oe=N.S;oe!==null&&oe(I,ie),typeof ie=="object"&&ie!==null&&typeof ie.then=="function"&&ie.then(q,P)}catch(fe){P(fe)}finally{R!==null&&I.types!==null&&(R.types=I.types),N.T=R}},Se.unstable_useCacheRefresh=function(){return N.H.useCacheRefresh()},Se.use=function(C){return N.H.use(C)},Se.useActionState=function(C,R,I){return N.H.useActionState(C,R,I)},Se.useCallback=function(C,R){return N.H.useCallback(C,R)},Se.useContext=function(C){return N.H.useContext(C)},Se.useDebugValue=function(){},Se.useDeferredValue=function(C,R){return N.H.useDeferredValue(C,R)},Se.useEffect=function(C,R){return N.H.useEffect(C,R)},Se.useEffectEvent=function(C){return N.H.useEffectEvent(C)},Se.useId=function(){return N.H.useId()},Se.useImperativeHandle=function(C,R,I){return N.H.useImperativeHandle(C,R,I)},Se.useInsertionEffect=function(C,R){return N.H.useInsertionEffect(C,R)},Se.useLayoutEffect=function(C,R){return N.H.useLayoutEffect(C,R)},Se.useMemo=function(C,R){return N.H.useMemo(C,R)},Se.useOptimistic=function(C,R){return N.H.useOptimistic(C,R)},Se.useReducer=function(C,R,I){return N.H.useReducer(C,R,I)},Se.useRef=function(C){return N.H.useRef(C)},Se.useState=function(C){return N.H.useState(C)},Se.useSyncExternalStore=function(C,R,I){return N.H.useSyncExternalStore(C,R,I)},Se.useTransition=function(){return N.H.useTransition()},Se.version="19.2.8",Se}var ty;function of(){return ty||(ty=1,Gu.exports=Ew()),Gu.exports}var S=of();const ox=sx(S),is=Sw({__proto__:null,default:ox},[S]);var Pu={exports:{}},Yi={},Fu={exports:{}},Xu={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ny;function Tw(){return ny||(ny=1,(function(n){function a(H,se){var K=H.length;H.push(se);e:for(;0<K;){var P=K-1>>>1,ne=H[P];if(0<u(ne,se))H[P]=se,H[K]=ne,K=P;else break e}}function s(H){return H.length===0?null:H[0]}function o(H){if(H.length===0)return null;var se=H[0],K=H.pop();if(K!==se){H[0]=K;e:for(var P=0,ne=H.length,C=ne>>>1;P<C;){var R=2*(P+1)-1,I=H[R],ie=R+1,oe=H[ie];if(0>u(I,K))ie<ne&&0>u(oe,I)?(H[P]=oe,H[ie]=K,P=ie):(H[P]=I,H[R]=K,P=R);else if(ie<ne&&0>u(oe,K))H[P]=oe,H[ie]=K,P=ie;else break e}}return se}function u(H,se){var K=H.sortIndex-se.sortIndex;return K!==0?K:H.id-se.id}if(n.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var h=performance;n.unstable_now=function(){return h.now()}}else{var f=Date,m=f.now();n.unstable_now=function(){return f.now()-m}}var p=[],g=[],v=1,x=null,b=3,j=!1,E=!1,T=!1,D=!1,O=typeof setTimeout=="function"?setTimeout:null,k=typeof clearTimeout=="function"?clearTimeout:null,B=typeof setImmediate<"u"?setImmediate:null;function _(H){for(var se=s(g);se!==null;){if(se.callback===null)o(g);else if(se.startTime<=H)o(g),se.sortIndex=se.expirationTime,a(p,se);else break;se=s(g)}}function U(H){if(T=!1,_(H),!E)if(s(p)!==null)E=!0,q||(q=!0,re());else{var se=s(g);se!==null&&ve(U,se.startTime-H)}}var q=!1,N=-1,M=5,V=-1;function $(){return D?!0:!(n.unstable_now()-V<M)}function J(){if(D=!1,q){var H=n.unstable_now();V=H;var se=!0;try{e:{E=!1,T&&(T=!1,k(N),N=-1),j=!0;var K=b;try{t:{for(_(H),x=s(p);x!==null&&!(x.expirationTime>H&&$());){var P=x.callback;if(typeof P=="function"){x.callback=null,b=x.priorityLevel;var ne=P(x.expirationTime<=H);if(H=n.unstable_now(),typeof ne=="function"){x.callback=ne,_(H),se=!0;break t}x===s(p)&&o(p),_(H)}else o(p);x=s(p)}if(x!==null)se=!0;else{var C=s(g);C!==null&&ve(U,C.startTime-H),se=!1}}break e}finally{x=null,b=K,j=!1}se=void 0}}finally{se?re():q=!1}}}var re;if(typeof B=="function")re=function(){B(J)};else if(typeof MessageChannel<"u"){var pe=new MessageChannel,le=pe.port2;pe.port1.onmessage=J,re=function(){le.postMessage(null)}}else re=function(){O(J,0)};function ve(H,se){N=O(function(){H(n.unstable_now())},se)}n.unstable_IdlePriority=5,n.unstable_ImmediatePriority=1,n.unstable_LowPriority=4,n.unstable_NormalPriority=3,n.unstable_Profiling=null,n.unstable_UserBlockingPriority=2,n.unstable_cancelCallback=function(H){H.callback=null},n.unstable_forceFrameRate=function(H){0>H||125<H?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):M=0<H?Math.floor(1e3/H):5},n.unstable_getCurrentPriorityLevel=function(){return b},n.unstable_next=function(H){switch(b){case 1:case 2:case 3:var se=3;break;default:se=b}var K=b;b=se;try{return H()}finally{b=K}},n.unstable_requestPaint=function(){D=!0},n.unstable_runWithPriority=function(H,se){switch(H){case 1:case 2:case 3:case 4:case 5:break;default:H=3}var K=b;b=H;try{return se()}finally{b=K}},n.unstable_scheduleCallback=function(H,se,K){var P=n.unstable_now();switch(typeof K=="object"&&K!==null?(K=K.delay,K=typeof K=="number"&&0<K?P+K:P):K=P,H){case 1:var ne=-1;break;case 2:ne=250;break;case 5:ne=1073741823;break;case 4:ne=1e4;break;default:ne=5e3}return ne=K+ne,H={id:v++,callback:se,priorityLevel:H,startTime:K,expirationTime:ne,sortIndex:-1},K>P?(H.sortIndex=K,a(g,H),s(p)===null&&H===s(g)&&(T?(k(N),N=-1):T=!0,ve(U,K-P))):(H.sortIndex=ne,a(p,H),E||j||(E=!0,q||(q=!0,re()))),H},n.unstable_shouldYield=$,n.unstable_wrapCallback=function(H){var se=b;return function(){var K=b;b=se;try{return H.apply(this,arguments)}finally{b=K}}}})(Xu)),Xu}var ry;function Cw(){return ry||(ry=1,Fu.exports=Tw()),Fu.exports}var $u={exports:{}},gt={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ay;function Dw(){if(ay)return gt;ay=1;var n=of();function a(p){var g="https://react.dev/errors/"+p;if(1<arguments.length){g+="?args[]="+encodeURIComponent(arguments[1]);for(var v=2;v<arguments.length;v++)g+="&args[]="+encodeURIComponent(arguments[v])}return"Minified React error #"+p+"; visit "+g+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function s(){}var o={d:{f:s,r:function(){throw Error(a(522))},D:s,C:s,L:s,m:s,X:s,S:s,M:s},p:0,findDOMNode:null},u=Symbol.for("react.portal");function h(p,g,v){var x=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:u,key:x==null?null:""+x,children:p,containerInfo:g,implementation:v}}var f=n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function m(p,g){if(p==="font")return"";if(typeof g=="string")return g==="use-credentials"?g:""}return gt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=o,gt.createPortal=function(p,g){var v=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!g||g.nodeType!==1&&g.nodeType!==9&&g.nodeType!==11)throw Error(a(299));return h(p,g,null,v)},gt.flushSync=function(p){var g=f.T,v=o.p;try{if(f.T=null,o.p=2,p)return p()}finally{f.T=g,o.p=v,o.d.f()}},gt.preconnect=function(p,g){typeof p=="string"&&(g?(g=g.crossOrigin,g=typeof g=="string"?g==="use-credentials"?g:"":void 0):g=null,o.d.C(p,g))},gt.prefetchDNS=function(p){typeof p=="string"&&o.d.D(p)},gt.preinit=function(p,g){if(typeof p=="string"&&g&&typeof g.as=="string"){var v=g.as,x=m(v,g.crossOrigin),b=typeof g.integrity=="string"?g.integrity:void 0,j=typeof g.fetchPriority=="string"?g.fetchPriority:void 0;v==="style"?o.d.S(p,typeof g.precedence=="string"?g.precedence:void 0,{crossOrigin:x,integrity:b,fetchPriority:j}):v==="script"&&o.d.X(p,{crossOrigin:x,integrity:b,fetchPriority:j,nonce:typeof g.nonce=="string"?g.nonce:void 0})}},gt.preinitModule=function(p,g){if(typeof p=="string")if(typeof g=="object"&&g!==null){if(g.as==null||g.as==="script"){var v=m(g.as,g.crossOrigin);o.d.M(p,{crossOrigin:v,integrity:typeof g.integrity=="string"?g.integrity:void 0,nonce:typeof g.nonce=="string"?g.nonce:void 0})}}else g==null&&o.d.M(p)},gt.preload=function(p,g){if(typeof p=="string"&&typeof g=="object"&&g!==null&&typeof g.as=="string"){var v=g.as,x=m(v,g.crossOrigin);o.d.L(p,v,{crossOrigin:x,integrity:typeof g.integrity=="string"?g.integrity:void 0,nonce:typeof g.nonce=="string"?g.nonce:void 0,type:typeof g.type=="string"?g.type:void 0,fetchPriority:typeof g.fetchPriority=="string"?g.fetchPriority:void 0,referrerPolicy:typeof g.referrerPolicy=="string"?g.referrerPolicy:void 0,imageSrcSet:typeof g.imageSrcSet=="string"?g.imageSrcSet:void 0,imageSizes:typeof g.imageSizes=="string"?g.imageSizes:void 0,media:typeof g.media=="string"?g.media:void 0})}},gt.preloadModule=function(p,g){if(typeof p=="string")if(g){var v=m(g.as,g.crossOrigin);o.d.m(p,{as:typeof g.as=="string"&&g.as!=="script"?g.as:void 0,crossOrigin:v,integrity:typeof g.integrity=="string"?g.integrity:void 0})}else o.d.m(p)},gt.requestFormReset=function(p){o.d.r(p)},gt.unstable_batchedUpdates=function(p,g){return p(g)},gt.useFormState=function(p,g,v){return f.H.useFormState(p,g,v)},gt.useFormStatus=function(){return f.H.useHostTransitionStatus()},gt.version="19.2.8",gt}var iy;function lx(){if(iy)return $u.exports;iy=1;function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(a){console.error(a)}}return n(),$u.exports=Dw(),$u.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var sy;function Nw(){if(sy)return Yi;sy=1;var n=Cw(),a=of(),s=lx();function o(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var r=2;r<arguments.length;r++)t+="&args[]="+encodeURIComponent(arguments[r])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function u(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function h(e){var t=e,r=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(r=t.return),e=t.return;while(e)}return t.tag===3?r:null}function f(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function m(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function p(e){if(h(e)!==e)throw Error(o(188))}function g(e){var t=e.alternate;if(!t){if(t=h(e),t===null)throw Error(o(188));return t!==e?null:e}for(var r=e,i=t;;){var c=r.return;if(c===null)break;var d=c.alternate;if(d===null){if(i=c.return,i!==null){r=i;continue}break}if(c.child===d.child){for(d=c.child;d;){if(d===r)return p(c),e;if(d===i)return p(c),t;d=d.sibling}throw Error(o(188))}if(r.return!==i.return)r=c,i=d;else{for(var y=!1,w=c.child;w;){if(w===r){y=!0,r=c,i=d;break}if(w===i){y=!0,i=c,r=d;break}w=w.sibling}if(!y){for(w=d.child;w;){if(w===r){y=!0,r=d,i=c;break}if(w===i){y=!0,i=d,r=c;break}w=w.sibling}if(!y)throw Error(o(189))}}if(r.alternate!==i)throw Error(o(190))}if(r.tag!==3)throw Error(o(188));return r.stateNode.current===r?e:t}function v(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=v(e),t!==null)return t;e=e.sibling}return null}var x=Object.assign,b=Symbol.for("react.element"),j=Symbol.for("react.transitional.element"),E=Symbol.for("react.portal"),T=Symbol.for("react.fragment"),D=Symbol.for("react.strict_mode"),O=Symbol.for("react.profiler"),k=Symbol.for("react.consumer"),B=Symbol.for("react.context"),_=Symbol.for("react.forward_ref"),U=Symbol.for("react.suspense"),q=Symbol.for("react.suspense_list"),N=Symbol.for("react.memo"),M=Symbol.for("react.lazy"),V=Symbol.for("react.activity"),$=Symbol.for("react.memo_cache_sentinel"),J=Symbol.iterator;function re(e){return e===null||typeof e!="object"?null:(e=J&&e[J]||e["@@iterator"],typeof e=="function"?e:null)}var pe=Symbol.for("react.client.reference");function le(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===pe?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case T:return"Fragment";case O:return"Profiler";case D:return"StrictMode";case U:return"Suspense";case q:return"SuspenseList";case V:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case E:return"Portal";case B:return e.displayName||"Context";case k:return(e._context.displayName||"Context")+".Consumer";case _:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case N:return t=e.displayName||null,t!==null?t:le(e.type)||"Memo";case M:t=e._payload,e=e._init;try{return le(e(t))}catch{}}return null}var ve=Array.isArray,H=a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,se=s.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,K={pending:!1,data:null,method:null,action:null},P=[],ne=-1;function C(e){return{current:e}}function R(e){0>ne||(e.current=P[ne],P[ne]=null,ne--)}function I(e,t){ne++,P[ne]=e.current,e.current=t}var ie=C(null),oe=C(null),fe=C(null),ye=C(null);function ae(e,t){switch(I(fe,t),I(oe,e),I(ie,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?Sg(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=Sg(t),e=wg(t,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}R(ie),I(ie,e)}function Q(){R(ie),R(oe),R(fe)}function ue(e){e.memoizedState!==null&&I(ye,e);var t=ie.current,r=wg(t,e.type);t!==r&&(I(oe,e),I(ie,r))}function te(e){oe.current===e&&(R(ie),R(oe)),ye.current===e&&(R(ye),Bi._currentValue=K)}var he,Ce;function Oe(e){if(he===void 0)try{throw Error()}catch(r){var t=r.stack.trim().match(/\n( *(at )?)/);he=t&&t[1]||"",Ce=-1<r.stack.indexOf(`
    at`)?" (<anonymous>)":-1<r.stack.indexOf("@")?"@unknown:0:0":""}return`
`+he+e+Ce}var Qe=!1;function Xe(e,t){if(!e||Qe)return"";Qe=!0;var r=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var i={DetermineComponentFrameRoot:function(){try{if(t){var ee=function(){throw Error()};if(Object.defineProperty(ee.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(ee,[])}catch(X){var F=X}Reflect.construct(e,[],ee)}else{try{ee.call()}catch(X){F=X}e.call(ee.prototype)}}else{try{throw Error()}catch(X){F=X}(ee=e())&&typeof ee.catch=="function"&&ee.catch(function(){})}}catch(X){if(X&&F&&typeof X.stack=="string")return[X.stack,F.stack]}return[null,null]}};i.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var c=Object.getOwnPropertyDescriptor(i.DetermineComponentFrameRoot,"name");c&&c.configurable&&Object.defineProperty(i.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var d=i.DetermineComponentFrameRoot(),y=d[0],w=d[1];if(y&&w){var A=y.split(`
`),G=w.split(`
`);for(c=i=0;i<A.length&&!A[i].includes("DetermineComponentFrameRoot");)i++;for(;c<G.length&&!G[c].includes("DetermineComponentFrameRoot");)c++;if(i===A.length||c===G.length)for(i=A.length-1,c=G.length-1;1<=i&&0<=c&&A[i]!==G[c];)c--;for(;1<=i&&0<=c;i--,c--)if(A[i]!==G[c]){if(i!==1||c!==1)do if(i--,c--,0>c||A[i]!==G[c]){var Z=`
`+A[i].replace(" at new "," at ");return e.displayName&&Z.includes("<anonymous>")&&(Z=Z.replace("<anonymous>",e.displayName)),Z}while(1<=i&&0<=c);break}}}finally{Qe=!1,Error.prepareStackTrace=r}return(r=e?e.displayName||e.name:"")?Oe(r):""}function yt(e,t){switch(e.tag){case 26:case 27:case 5:return Oe(e.type);case 16:return Oe("Lazy");case 13:return e.child!==t&&t!==null?Oe("Suspense Fallback"):Oe("Suspense");case 19:return Oe("SuspenseList");case 0:case 15:return Xe(e.type,!1);case 11:return Xe(e.type.render,!1);case 1:return Xe(e.type,!0);case 31:return Oe("Activity");default:return""}}function Wf(e){try{var t="",r=null;do t+=yt(e,r),r=e,e=e.return;while(e);return t}catch(i){return`
Error generating stack: `+i.message+`
`+i.stack}}var Dl=Object.prototype.hasOwnProperty,Nl=n.unstable_scheduleCallback,Al=n.unstable_cancelCallback,I0=n.unstable_shouldYield,e1=n.unstable_requestPaint,At=n.unstable_now,t1=n.unstable_getCurrentPriorityLevel,If=n.unstable_ImmediatePriority,eh=n.unstable_UserBlockingPriority,fs=n.unstable_NormalPriority,n1=n.unstable_LowPriority,th=n.unstable_IdlePriority,r1=n.log,a1=n.unstable_setDisableYieldValue,Za=null,Mt=null;function qn(e){if(typeof r1=="function"&&a1(e),Mt&&typeof Mt.setStrictMode=="function")try{Mt.setStrictMode(Za,e)}catch{}}var kt=Math.clz32?Math.clz32:o1,i1=Math.log,s1=Math.LN2;function o1(e){return e>>>=0,e===0?32:31-(i1(e)/s1|0)|0}var hs=256,ms=262144,ps=4194304;function br(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function gs(e,t,r){var i=e.pendingLanes;if(i===0)return 0;var c=0,d=e.suspendedLanes,y=e.pingedLanes;e=e.warmLanes;var w=i&134217727;return w!==0?(i=w&~d,i!==0?c=br(i):(y&=w,y!==0?c=br(y):r||(r=w&~e,r!==0&&(c=br(r))))):(w=i&~d,w!==0?c=br(w):y!==0?c=br(y):r||(r=i&~e,r!==0&&(c=br(r)))),c===0?0:t!==0&&t!==c&&(t&d)===0&&(d=c&-c,r=t&-t,d>=r||d===32&&(r&4194048)!==0)?t:c}function Qa(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function l1(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function nh(){var e=ps;return ps<<=1,(ps&62914560)===0&&(ps=4194304),e}function Ml(e){for(var t=[],r=0;31>r;r++)t.push(e);return t}function Ja(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function c1(e,t,r,i,c,d){var y=e.pendingLanes;e.pendingLanes=r,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=r,e.entangledLanes&=r,e.errorRecoveryDisabledLanes&=r,e.shellSuspendCounter=0;var w=e.entanglements,A=e.expirationTimes,G=e.hiddenUpdates;for(r=y&~r;0<r;){var Z=31-kt(r),ee=1<<Z;w[Z]=0,A[Z]=-1;var F=G[Z];if(F!==null)for(G[Z]=null,Z=0;Z<F.length;Z++){var X=F[Z];X!==null&&(X.lane&=-536870913)}r&=~ee}i!==0&&rh(e,i,0),d!==0&&c===0&&e.tag!==0&&(e.suspendedLanes|=d&~(y&~t))}function rh(e,t,r){e.pendingLanes|=t,e.suspendedLanes&=~t;var i=31-kt(t);e.entangledLanes|=t,e.entanglements[i]=e.entanglements[i]|1073741824|r&261930}function ah(e,t){var r=e.entangledLanes|=t;for(e=e.entanglements;r;){var i=31-kt(r),c=1<<i;c&t|e[i]&t&&(e[i]|=t),r&=~c}}function ih(e,t){var r=t&-t;return r=(r&42)!==0?1:kl(r),(r&(e.suspendedLanes|t))!==0?0:r}function kl(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function Rl(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function sh(){var e=se.p;return e!==0?e:(e=window.event,e===void 0?32:Fg(e.type))}function oh(e,t){var r=se.p;try{return se.p=e,t()}finally{se.p=r}}var Yn=Math.random().toString(36).slice(2),ct="__reactFiber$"+Yn,wt="__reactProps$"+Yn,$r="__reactContainer$"+Yn,Ol="__reactEvents$"+Yn,u1="__reactListeners$"+Yn,d1="__reactHandles$"+Yn,lh="__reactResources$"+Yn,Wa="__reactMarker$"+Yn;function zl(e){delete e[ct],delete e[wt],delete e[Ol],delete e[u1],delete e[d1]}function Kr(e){var t=e[ct];if(t)return t;for(var r=e.parentNode;r;){if(t=r[$r]||r[ct]){if(r=t.alternate,t.child!==null||r!==null&&r.child!==null)for(e=Ag(e);e!==null;){if(r=e[ct])return r;e=Ag(e)}return t}e=r,r=e.parentNode}return null}function Zr(e){if(e=e[ct]||e[$r]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function Ia(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(o(33))}function Qr(e){var t=e[lh];return t||(t=e[lh]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function st(e){e[Wa]=!0}var ch=new Set,uh={};function Sr(e,t){Jr(e,t),Jr(e+"Capture",t)}function Jr(e,t){for(uh[e]=t,e=0;e<t.length;e++)ch.add(t[e])}var f1=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),dh={},fh={};function h1(e){return Dl.call(fh,e)?!0:Dl.call(dh,e)?!1:f1.test(e)?fh[e]=!0:(dh[e]=!0,!1)}function ys(e,t,r){if(h1(t))if(r===null)e.removeAttribute(t);else{switch(typeof r){case"undefined":case"function":case"symbol":e.removeAttribute(t);return;case"boolean":var i=t.toLowerCase().slice(0,5);if(i!=="data-"&&i!=="aria-"){e.removeAttribute(t);return}}e.setAttribute(t,""+r)}}function vs(e,t,r){if(r===null)e.removeAttribute(t);else{switch(typeof r){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(t);return}e.setAttribute(t,""+r)}}function bn(e,t,r,i){if(i===null)e.removeAttribute(r);else{switch(typeof i){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(r);return}e.setAttributeNS(t,r,""+i)}}function qt(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function hh(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function m1(e,t,r){var i=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&typeof i<"u"&&typeof i.get=="function"&&typeof i.set=="function"){var c=i.get,d=i.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return c.call(this)},set:function(y){r=""+y,d.call(this,y)}}),Object.defineProperty(e,t,{enumerable:i.enumerable}),{getValue:function(){return r},setValue:function(y){r=""+y},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function _l(e){if(!e._valueTracker){var t=hh(e)?"checked":"value";e._valueTracker=m1(e,t,""+e[t])}}function mh(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var r=t.getValue(),i="";return e&&(i=hh(e)?e.checked?"true":"false":e.value),e=i,e!==r?(t.setValue(e),!0):!1}function xs(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var p1=/[\n"\\]/g;function Yt(e){return e.replace(p1,function(t){return"\\"+t.charCodeAt(0).toString(16)+" "})}function Vl(e,t,r,i,c,d,y,w){e.name="",y!=null&&typeof y!="function"&&typeof y!="symbol"&&typeof y!="boolean"?e.type=y:e.removeAttribute("type"),t!=null?y==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+qt(t)):e.value!==""+qt(t)&&(e.value=""+qt(t)):y!=="submit"&&y!=="reset"||e.removeAttribute("value"),t!=null?Bl(e,y,qt(t)):r!=null?Bl(e,y,qt(r)):i!=null&&e.removeAttribute("value"),c==null&&d!=null&&(e.defaultChecked=!!d),c!=null&&(e.checked=c&&typeof c!="function"&&typeof c!="symbol"),w!=null&&typeof w!="function"&&typeof w!="symbol"&&typeof w!="boolean"?e.name=""+qt(w):e.removeAttribute("name")}function ph(e,t,r,i,c,d,y,w){if(d!=null&&typeof d!="function"&&typeof d!="symbol"&&typeof d!="boolean"&&(e.type=d),t!=null||r!=null){if(!(d!=="submit"&&d!=="reset"||t!=null)){_l(e);return}r=r!=null?""+qt(r):"",t=t!=null?""+qt(t):r,w||t===e.value||(e.value=t),e.defaultValue=t}i=i??c,i=typeof i!="function"&&typeof i!="symbol"&&!!i,e.checked=w?e.checked:!!i,e.defaultChecked=!!i,y!=null&&typeof y!="function"&&typeof y!="symbol"&&typeof y!="boolean"&&(e.name=y),_l(e)}function Bl(e,t,r){t==="number"&&xs(e.ownerDocument)===e||e.defaultValue===""+r||(e.defaultValue=""+r)}function Wr(e,t,r,i){if(e=e.options,t){t={};for(var c=0;c<r.length;c++)t["$"+r[c]]=!0;for(r=0;r<e.length;r++)c=t.hasOwnProperty("$"+e[r].value),e[r].selected!==c&&(e[r].selected=c),c&&i&&(e[r].defaultSelected=!0)}else{for(r=""+qt(r),t=null,c=0;c<e.length;c++){if(e[c].value===r){e[c].selected=!0,i&&(e[c].defaultSelected=!0);return}t!==null||e[c].disabled||(t=e[c])}t!==null&&(t.selected=!0)}}function gh(e,t,r){if(t!=null&&(t=""+qt(t),t!==e.value&&(e.value=t),r==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=r!=null?""+qt(r):""}function yh(e,t,r,i){if(t==null){if(i!=null){if(r!=null)throw Error(o(92));if(ve(i)){if(1<i.length)throw Error(o(93));i=i[0]}r=i}r==null&&(r=""),t=r}r=qt(t),e.defaultValue=r,i=e.textContent,i===r&&i!==""&&i!==null&&(e.value=i),_l(e)}function Ir(e,t){if(t){var r=e.firstChild;if(r&&r===e.lastChild&&r.nodeType===3){r.nodeValue=t;return}}e.textContent=t}var g1=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function vh(e,t,r){var i=t.indexOf("--")===0;r==null||typeof r=="boolean"||r===""?i?e.setProperty(t,""):t==="float"?e.cssFloat="":e[t]="":i?e.setProperty(t,r):typeof r!="number"||r===0||g1.has(t)?t==="float"?e.cssFloat=r:e[t]=(""+r).trim():e[t]=r+"px"}function xh(e,t,r){if(t!=null&&typeof t!="object")throw Error(o(62));if(e=e.style,r!=null){for(var i in r)!r.hasOwnProperty(i)||t!=null&&t.hasOwnProperty(i)||(i.indexOf("--")===0?e.setProperty(i,""):i==="float"?e.cssFloat="":e[i]="");for(var c in t)i=t[c],t.hasOwnProperty(c)&&r[c]!==i&&vh(e,c,i)}else for(var d in t)t.hasOwnProperty(d)&&vh(e,d,t[d])}function Ll(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var y1=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),v1=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function bs(e){return v1.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function Sn(){}var Ul=null;function Hl(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var ea=null,ta=null;function bh(e){var t=Zr(e);if(t&&(e=t.stateNode)){var r=e[wt]||null;e:switch(e=t.stateNode,t.type){case"input":if(Vl(e,r.value,r.defaultValue,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name),t=r.name,r.type==="radio"&&t!=null){for(r=e;r.parentNode;)r=r.parentNode;for(r=r.querySelectorAll('input[name="'+Yt(""+t)+'"][type="radio"]'),t=0;t<r.length;t++){var i=r[t];if(i!==e&&i.form===e.form){var c=i[wt]||null;if(!c)throw Error(o(90));Vl(i,c.value,c.defaultValue,c.defaultValue,c.checked,c.defaultChecked,c.type,c.name)}}for(t=0;t<r.length;t++)i=r[t],i.form===e.form&&mh(i)}break e;case"textarea":gh(e,r.value,r.defaultValue);break e;case"select":t=r.value,t!=null&&Wr(e,!!r.multiple,t,!1)}}}var ql=!1;function Sh(e,t,r){if(ql)return e(t,r);ql=!0;try{var i=e(t);return i}finally{if(ql=!1,(ea!==null||ta!==null)&&(oo(),ea&&(t=ea,e=ta,ta=ea=null,bh(t),e)))for(t=0;t<e.length;t++)bh(e[t])}}function ei(e,t){var r=e.stateNode;if(r===null)return null;var i=r[wt]||null;if(i===null)return null;r=i[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(e=e.type,i=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!i;break e;default:e=!1}if(e)return null;if(r&&typeof r!="function")throw Error(o(231,t,typeof r));return r}var wn=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Yl=!1;if(wn)try{var ti={};Object.defineProperty(ti,"passive",{get:function(){Yl=!0}}),window.addEventListener("test",ti,ti),window.removeEventListener("test",ti,ti)}catch{Yl=!1}var Gn=null,Gl=null,Ss=null;function wh(){if(Ss)return Ss;var e,t=Gl,r=t.length,i,c="value"in Gn?Gn.value:Gn.textContent,d=c.length;for(e=0;e<r&&t[e]===c[e];e++);var y=r-e;for(i=1;i<=y&&t[r-i]===c[d-i];i++);return Ss=c.slice(e,1<i?1-i:void 0)}function ws(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function js(){return!0}function jh(){return!1}function jt(e){function t(r,i,c,d,y){this._reactName=r,this._targetInst=c,this.type=i,this.nativeEvent=d,this.target=y,this.currentTarget=null;for(var w in e)e.hasOwnProperty(w)&&(r=e[w],this[w]=r?r(d):d[w]);return this.isDefaultPrevented=(d.defaultPrevented!=null?d.defaultPrevented:d.returnValue===!1)?js:jh,this.isPropagationStopped=jh,this}return x(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var r=this.nativeEvent;r&&(r.preventDefault?r.preventDefault():typeof r.returnValue!="unknown"&&(r.returnValue=!1),this.isDefaultPrevented=js)},stopPropagation:function(){var r=this.nativeEvent;r&&(r.stopPropagation?r.stopPropagation():typeof r.cancelBubble!="unknown"&&(r.cancelBubble=!0),this.isPropagationStopped=js)},persist:function(){},isPersistent:js}),t}var wr={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Es=jt(wr),ni=x({},wr,{view:0,detail:0}),x1=jt(ni),Pl,Fl,ri,Ts=x({},ni,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:$l,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==ri&&(ri&&e.type==="mousemove"?(Pl=e.screenX-ri.screenX,Fl=e.screenY-ri.screenY):Fl=Pl=0,ri=e),Pl)},movementY:function(e){return"movementY"in e?e.movementY:Fl}}),Eh=jt(Ts),b1=x({},Ts,{dataTransfer:0}),S1=jt(b1),w1=x({},ni,{relatedTarget:0}),Xl=jt(w1),j1=x({},wr,{animationName:0,elapsedTime:0,pseudoElement:0}),E1=jt(j1),T1=x({},wr,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),C1=jt(T1),D1=x({},wr,{data:0}),Th=jt(D1),N1={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},A1={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},M1={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function k1(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=M1[e])?!!t[e]:!1}function $l(){return k1}var R1=x({},ni,{key:function(e){if(e.key){var t=N1[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=ws(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?A1[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:$l,charCode:function(e){return e.type==="keypress"?ws(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?ws(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),O1=jt(R1),z1=x({},Ts,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Ch=jt(z1),_1=x({},ni,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:$l}),V1=jt(_1),B1=x({},wr,{propertyName:0,elapsedTime:0,pseudoElement:0}),L1=jt(B1),U1=x({},Ts,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),H1=jt(U1),q1=x({},wr,{newState:0,oldState:0}),Y1=jt(q1),G1=[9,13,27,32],Kl=wn&&"CompositionEvent"in window,ai=null;wn&&"documentMode"in document&&(ai=document.documentMode);var P1=wn&&"TextEvent"in window&&!ai,Dh=wn&&(!Kl||ai&&8<ai&&11>=ai),Nh=" ",Ah=!1;function Mh(e,t){switch(e){case"keyup":return G1.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function kh(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var na=!1;function F1(e,t){switch(e){case"compositionend":return kh(t);case"keypress":return t.which!==32?null:(Ah=!0,Nh);case"textInput":return e=t.data,e===Nh&&Ah?null:e;default:return null}}function X1(e,t){if(na)return e==="compositionend"||!Kl&&Mh(e,t)?(e=wh(),Ss=Gl=Gn=null,na=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Dh&&t.locale!=="ko"?null:t.data;default:return null}}var $1={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Rh(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!$1[e.type]:t==="textarea"}function Oh(e,t,r,i){ea?ta?ta.push(i):ta=[i]:ea=i,t=po(t,"onChange"),0<t.length&&(r=new Es("onChange","change",null,r,i),e.push({event:r,listeners:t}))}var ii=null,si=null;function K1(e){pg(e,0)}function Cs(e){var t=Ia(e);if(mh(t))return e}function zh(e,t){if(e==="change")return t}var _h=!1;if(wn){var Zl;if(wn){var Ql="oninput"in document;if(!Ql){var Vh=document.createElement("div");Vh.setAttribute("oninput","return;"),Ql=typeof Vh.oninput=="function"}Zl=Ql}else Zl=!1;_h=Zl&&(!document.documentMode||9<document.documentMode)}function Bh(){ii&&(ii.detachEvent("onpropertychange",Lh),si=ii=null)}function Lh(e){if(e.propertyName==="value"&&Cs(si)){var t=[];Oh(t,si,e,Hl(e)),Sh(K1,t)}}function Z1(e,t,r){e==="focusin"?(Bh(),ii=t,si=r,ii.attachEvent("onpropertychange",Lh)):e==="focusout"&&Bh()}function Q1(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Cs(si)}function J1(e,t){if(e==="click")return Cs(t)}function W1(e,t){if(e==="input"||e==="change")return Cs(t)}function I1(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Rt=typeof Object.is=="function"?Object.is:I1;function oi(e,t){if(Rt(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var r=Object.keys(e),i=Object.keys(t);if(r.length!==i.length)return!1;for(i=0;i<r.length;i++){var c=r[i];if(!Dl.call(t,c)||!Rt(e[c],t[c]))return!1}return!0}function Uh(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Hh(e,t){var r=Uh(e);e=0;for(var i;r;){if(r.nodeType===3){if(i=e+r.textContent.length,e<=t&&i>=t)return{node:r,offset:t-e};e=i}e:{for(;r;){if(r.nextSibling){r=r.nextSibling;break e}r=r.parentNode}r=void 0}r=Uh(r)}}function qh(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?qh(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Yh(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=xs(e.document);t instanceof e.HTMLIFrameElement;){try{var r=typeof t.contentWindow.location.href=="string"}catch{r=!1}if(r)e=t.contentWindow;else break;t=xs(e.document)}return t}function Jl(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}var eS=wn&&"documentMode"in document&&11>=document.documentMode,ra=null,Wl=null,li=null,Il=!1;function Gh(e,t,r){var i=r.window===r?r.document:r.nodeType===9?r:r.ownerDocument;Il||ra==null||ra!==xs(i)||(i=ra,"selectionStart"in i&&Jl(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),li&&oi(li,i)||(li=i,i=po(Wl,"onSelect"),0<i.length&&(t=new Es("onSelect","select",null,t,r),e.push({event:t,listeners:i}),t.target=ra)))}function jr(e,t){var r={};return r[e.toLowerCase()]=t.toLowerCase(),r["Webkit"+e]="webkit"+t,r["Moz"+e]="moz"+t,r}var aa={animationend:jr("Animation","AnimationEnd"),animationiteration:jr("Animation","AnimationIteration"),animationstart:jr("Animation","AnimationStart"),transitionrun:jr("Transition","TransitionRun"),transitionstart:jr("Transition","TransitionStart"),transitioncancel:jr("Transition","TransitionCancel"),transitionend:jr("Transition","TransitionEnd")},ec={},Ph={};wn&&(Ph=document.createElement("div").style,"AnimationEvent"in window||(delete aa.animationend.animation,delete aa.animationiteration.animation,delete aa.animationstart.animation),"TransitionEvent"in window||delete aa.transitionend.transition);function Er(e){if(ec[e])return ec[e];if(!aa[e])return e;var t=aa[e],r;for(r in t)if(t.hasOwnProperty(r)&&r in Ph)return ec[e]=t[r];return e}var Fh=Er("animationend"),Xh=Er("animationiteration"),$h=Er("animationstart"),tS=Er("transitionrun"),nS=Er("transitionstart"),rS=Er("transitioncancel"),Kh=Er("transitionend"),Zh=new Map,tc="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");tc.push("scrollEnd");function tn(e,t){Zh.set(e,t),Sr(t,[e])}var Ds=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},Gt=[],ia=0,nc=0;function Ns(){for(var e=ia,t=nc=ia=0;t<e;){var r=Gt[t];Gt[t++]=null;var i=Gt[t];Gt[t++]=null;var c=Gt[t];Gt[t++]=null;var d=Gt[t];if(Gt[t++]=null,i!==null&&c!==null){var y=i.pending;y===null?c.next=c:(c.next=y.next,y.next=c),i.pending=c}d!==0&&Qh(r,c,d)}}function As(e,t,r,i){Gt[ia++]=e,Gt[ia++]=t,Gt[ia++]=r,Gt[ia++]=i,nc|=i,e.lanes|=i,e=e.alternate,e!==null&&(e.lanes|=i)}function rc(e,t,r,i){return As(e,t,r,i),Ms(e)}function Tr(e,t){return As(e,null,null,t),Ms(e)}function Qh(e,t,r){e.lanes|=r;var i=e.alternate;i!==null&&(i.lanes|=r);for(var c=!1,d=e.return;d!==null;)d.childLanes|=r,i=d.alternate,i!==null&&(i.childLanes|=r),d.tag===22&&(e=d.stateNode,e===null||e._visibility&1||(c=!0)),e=d,d=d.return;return e.tag===3?(d=e.stateNode,c&&t!==null&&(c=31-kt(r),e=d.hiddenUpdates,i=e[c],i===null?e[c]=[t]:i.push(t),t.lane=r|536870912),d):null}function Ms(e){if(50<Mi)throw Mi=0,fu=null,Error(o(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var sa={};function aS(e,t,r,i){this.tag=e,this.key=r,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Ot(e,t,r,i){return new aS(e,t,r,i)}function ac(e){return e=e.prototype,!(!e||!e.isReactComponent)}function jn(e,t){var r=e.alternate;return r===null?(r=Ot(e.tag,t,e.key,e.mode),r.elementType=e.elementType,r.type=e.type,r.stateNode=e.stateNode,r.alternate=e,e.alternate=r):(r.pendingProps=t,r.type=e.type,r.flags=0,r.subtreeFlags=0,r.deletions=null),r.flags=e.flags&65011712,r.childLanes=e.childLanes,r.lanes=e.lanes,r.child=e.child,r.memoizedProps=e.memoizedProps,r.memoizedState=e.memoizedState,r.updateQueue=e.updateQueue,t=e.dependencies,r.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},r.sibling=e.sibling,r.index=e.index,r.ref=e.ref,r.refCleanup=e.refCleanup,r}function Jh(e,t){e.flags&=65011714;var r=e.alternate;return r===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=r.childLanes,e.lanes=r.lanes,e.child=r.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=r.memoizedProps,e.memoizedState=r.memoizedState,e.updateQueue=r.updateQueue,e.type=r.type,t=r.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function ks(e,t,r,i,c,d){var y=0;if(i=e,typeof e=="function")ac(e)&&(y=1);else if(typeof e=="string")y=cw(e,r,ie.current)?26:e==="html"||e==="head"||e==="body"?27:5;else e:switch(e){case V:return e=Ot(31,r,t,c),e.elementType=V,e.lanes=d,e;case T:return Cr(r.children,c,d,t);case D:y=8,c|=24;break;case O:return e=Ot(12,r,t,c|2),e.elementType=O,e.lanes=d,e;case U:return e=Ot(13,r,t,c),e.elementType=U,e.lanes=d,e;case q:return e=Ot(19,r,t,c),e.elementType=q,e.lanes=d,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case B:y=10;break e;case k:y=9;break e;case _:y=11;break e;case N:y=14;break e;case M:y=16,i=null;break e}y=29,r=Error(o(130,e===null?"null":typeof e,"")),i=null}return t=Ot(y,r,t,c),t.elementType=e,t.type=i,t.lanes=d,t}function Cr(e,t,r,i){return e=Ot(7,e,i,t),e.lanes=r,e}function ic(e,t,r){return e=Ot(6,e,null,t),e.lanes=r,e}function Wh(e){var t=Ot(18,null,null,0);return t.stateNode=e,t}function sc(e,t,r){return t=Ot(4,e.children!==null?e.children:[],e.key,t),t.lanes=r,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var Ih=new WeakMap;function Pt(e,t){if(typeof e=="object"&&e!==null){var r=Ih.get(e);return r!==void 0?r:(t={value:e,source:t,stack:Wf(t)},Ih.set(e,t),t)}return{value:e,source:t,stack:Wf(t)}}var oa=[],la=0,Rs=null,ci=0,Ft=[],Xt=0,Pn=null,cn=1,un="";function En(e,t){oa[la++]=ci,oa[la++]=Rs,Rs=e,ci=t}function em(e,t,r){Ft[Xt++]=cn,Ft[Xt++]=un,Ft[Xt++]=Pn,Pn=e;var i=cn;e=un;var c=32-kt(i)-1;i&=~(1<<c),r+=1;var d=32-kt(t)+c;if(30<d){var y=c-c%5;d=(i&(1<<y)-1).toString(32),i>>=y,c-=y,cn=1<<32-kt(t)+c|r<<c|i,un=d+e}else cn=1<<d|r<<c|i,un=e}function oc(e){e.return!==null&&(En(e,1),em(e,1,0))}function lc(e){for(;e===Rs;)Rs=oa[--la],oa[la]=null,ci=oa[--la],oa[la]=null;for(;e===Pn;)Pn=Ft[--Xt],Ft[Xt]=null,un=Ft[--Xt],Ft[Xt]=null,cn=Ft[--Xt],Ft[Xt]=null}function tm(e,t){Ft[Xt++]=cn,Ft[Xt++]=un,Ft[Xt++]=Pn,cn=t.id,un=t.overflow,Pn=e}var ut=null,Ge=null,Ae=!1,Fn=null,$t=!1,cc=Error(o(519));function Xn(e){var t=Error(o(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw ui(Pt(t,e)),cc}function nm(e){var t=e.stateNode,r=e.type,i=e.memoizedProps;switch(t[ct]=e,t[wt]=i,r){case"dialog":Te("cancel",t),Te("close",t);break;case"iframe":case"object":case"embed":Te("load",t);break;case"video":case"audio":for(r=0;r<Ri.length;r++)Te(Ri[r],t);break;case"source":Te("error",t);break;case"img":case"image":case"link":Te("error",t),Te("load",t);break;case"details":Te("toggle",t);break;case"input":Te("invalid",t),ph(t,i.value,i.defaultValue,i.checked,i.defaultChecked,i.type,i.name,!0);break;case"select":Te("invalid",t);break;case"textarea":Te("invalid",t),yh(t,i.value,i.defaultValue,i.children)}r=i.children,typeof r!="string"&&typeof r!="number"&&typeof r!="bigint"||t.textContent===""+r||i.suppressHydrationWarning===!0||xg(t.textContent,r)?(i.popover!=null&&(Te("beforetoggle",t),Te("toggle",t)),i.onScroll!=null&&Te("scroll",t),i.onScrollEnd!=null&&Te("scrollend",t),i.onClick!=null&&(t.onclick=Sn),t=!0):t=!1,t||Xn(e,!0)}function rm(e){for(ut=e.return;ut;)switch(ut.tag){case 5:case 31:case 13:$t=!1;return;case 27:case 3:$t=!0;return;default:ut=ut.return}}function ca(e){if(e!==ut)return!1;if(!Ae)return rm(e),Ae=!0,!1;var t=e.tag,r;if((r=t!==3&&t!==27)&&((r=t===5)&&(r=e.type,r=!(r!=="form"&&r!=="button")||Du(e.type,e.memoizedProps)),r=!r),r&&Ge&&Xn(e),rm(e),t===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(o(317));Ge=Ng(e)}else if(t===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(o(317));Ge=Ng(e)}else t===27?(t=Ge,sr(e.type)?(e=Ru,Ru=null,Ge=e):Ge=t):Ge=ut?Zt(e.stateNode.nextSibling):null;return!0}function Dr(){Ge=ut=null,Ae=!1}function uc(){var e=Fn;return e!==null&&(Dt===null?Dt=e:Dt.push.apply(Dt,e),Fn=null),e}function ui(e){Fn===null?Fn=[e]:Fn.push(e)}var dc=C(null),Nr=null,Tn=null;function $n(e,t,r){I(dc,t._currentValue),t._currentValue=r}function Cn(e){e._currentValue=dc.current,R(dc)}function fc(e,t,r){for(;e!==null;){var i=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,i!==null&&(i.childLanes|=t)):i!==null&&(i.childLanes&t)!==t&&(i.childLanes|=t),e===r)break;e=e.return}}function hc(e,t,r,i){var c=e.child;for(c!==null&&(c.return=e);c!==null;){var d=c.dependencies;if(d!==null){var y=c.child;d=d.firstContext;e:for(;d!==null;){var w=d;d=c;for(var A=0;A<t.length;A++)if(w.context===t[A]){d.lanes|=r,w=d.alternate,w!==null&&(w.lanes|=r),fc(d.return,r,e),i||(y=null);break e}d=w.next}}else if(c.tag===18){if(y=c.return,y===null)throw Error(o(341));y.lanes|=r,d=y.alternate,d!==null&&(d.lanes|=r),fc(y,r,e),y=null}else y=c.child;if(y!==null)y.return=c;else for(y=c;y!==null;){if(y===e){y=null;break}if(c=y.sibling,c!==null){c.return=y.return,y=c;break}y=y.return}c=y}}function ua(e,t,r,i){e=null;for(var c=t,d=!1;c!==null;){if(!d){if((c.flags&524288)!==0)d=!0;else if((c.flags&262144)!==0)break}if(c.tag===10){var y=c.alternate;if(y===null)throw Error(o(387));if(y=y.memoizedProps,y!==null){var w=c.type;Rt(c.pendingProps.value,y.value)||(e!==null?e.push(w):e=[w])}}else if(c===ye.current){if(y=c.alternate,y===null)throw Error(o(387));y.memoizedState.memoizedState!==c.memoizedState.memoizedState&&(e!==null?e.push(Bi):e=[Bi])}c=c.return}e!==null&&hc(t,e,r,i),t.flags|=262144}function Os(e){for(e=e.firstContext;e!==null;){if(!Rt(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Ar(e){Nr=e,Tn=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function dt(e){return am(Nr,e)}function zs(e,t){return Nr===null&&Ar(e),am(e,t)}function am(e,t){var r=t._currentValue;if(t={context:t,memoizedValue:r,next:null},Tn===null){if(e===null)throw Error(o(308));Tn=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else Tn=Tn.next=t;return r}var iS=typeof AbortController<"u"?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(r,i){e.push(i)}};this.abort=function(){t.aborted=!0,e.forEach(function(r){return r()})}},sS=n.unstable_scheduleCallback,oS=n.unstable_NormalPriority,Ie={$$typeof:B,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function mc(){return{controller:new iS,data:new Map,refCount:0}}function di(e){e.refCount--,e.refCount===0&&sS(oS,function(){e.controller.abort()})}var fi=null,pc=0,da=0,fa=null;function lS(e,t){if(fi===null){var r=fi=[];pc=0,da=vu(),fa={status:"pending",value:void 0,then:function(i){r.push(i)}}}return pc++,t.then(im,im),t}function im(){if(--pc===0&&fi!==null){fa!==null&&(fa.status="fulfilled");var e=fi;fi=null,da=0,fa=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function cS(e,t){var r=[],i={status:"pending",value:null,reason:null,then:function(c){r.push(c)}};return e.then(function(){i.status="fulfilled",i.value=t;for(var c=0;c<r.length;c++)(0,r[c])(t)},function(c){for(i.status="rejected",i.reason=c,c=0;c<r.length;c++)(0,r[c])(void 0)}),i}var sm=H.S;H.S=function(e,t){Gp=At(),typeof t=="object"&&t!==null&&typeof t.then=="function"&&lS(e,t),sm!==null&&sm(e,t)};var Mr=C(null);function gc(){var e=Mr.current;return e!==null?e:He.pooledCache}function _s(e,t){t===null?I(Mr,Mr.current):I(Mr,t.pool)}function om(){var e=gc();return e===null?null:{parent:Ie._currentValue,pool:e}}var ha=Error(o(460)),yc=Error(o(474)),Vs=Error(o(542)),Bs={then:function(){}};function lm(e){return e=e.status,e==="fulfilled"||e==="rejected"}function cm(e,t,r){switch(r=e[r],r===void 0?e.push(t):r!==t&&(t.then(Sn,Sn),t=r),t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,dm(e),e;default:if(typeof t.status=="string")t.then(Sn,Sn);else{if(e=He,e!==null&&100<e.shellSuspendCounter)throw Error(o(482));e=t,e.status="pending",e.then(function(i){if(t.status==="pending"){var c=t;c.status="fulfilled",c.value=i}},function(i){if(t.status==="pending"){var c=t;c.status="rejected",c.reason=i}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,dm(e),e}throw Rr=t,ha}}function kr(e){try{var t=e._init;return t(e._payload)}catch(r){throw r!==null&&typeof r=="object"&&typeof r.then=="function"?(Rr=r,ha):r}}var Rr=null;function um(){if(Rr===null)throw Error(o(459));var e=Rr;return Rr=null,e}function dm(e){if(e===ha||e===Vs)throw Error(o(483))}var ma=null,hi=0;function Ls(e){var t=hi;return hi+=1,ma===null&&(ma=[]),cm(ma,e,t)}function mi(e,t){t=t.props.ref,e.ref=t!==void 0?t:null}function Us(e,t){throw t.$$typeof===b?Error(o(525)):(e=Object.prototype.toString.call(t),Error(o(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)))}function fm(e){function t(L,z){if(e){var Y=L.deletions;Y===null?(L.deletions=[z],L.flags|=16):Y.push(z)}}function r(L,z){if(!e)return null;for(;z!==null;)t(L,z),z=z.sibling;return null}function i(L){for(var z=new Map;L!==null;)L.key!==null?z.set(L.key,L):z.set(L.index,L),L=L.sibling;return z}function c(L,z){return L=jn(L,z),L.index=0,L.sibling=null,L}function d(L,z,Y){return L.index=Y,e?(Y=L.alternate,Y!==null?(Y=Y.index,Y<z?(L.flags|=67108866,z):Y):(L.flags|=67108866,z)):(L.flags|=1048576,z)}function y(L){return e&&L.alternate===null&&(L.flags|=67108866),L}function w(L,z,Y,W){return z===null||z.tag!==6?(z=ic(Y,L.mode,W),z.return=L,z):(z=c(z,Y),z.return=L,z)}function A(L,z,Y,W){var ge=Y.type;return ge===T?Z(L,z,Y.props.children,W,Y.key):z!==null&&(z.elementType===ge||typeof ge=="object"&&ge!==null&&ge.$$typeof===M&&kr(ge)===z.type)?(z=c(z,Y.props),mi(z,Y),z.return=L,z):(z=ks(Y.type,Y.key,Y.props,null,L.mode,W),mi(z,Y),z.return=L,z)}function G(L,z,Y,W){return z===null||z.tag!==4||z.stateNode.containerInfo!==Y.containerInfo||z.stateNode.implementation!==Y.implementation?(z=sc(Y,L.mode,W),z.return=L,z):(z=c(z,Y.children||[]),z.return=L,z)}function Z(L,z,Y,W,ge){return z===null||z.tag!==7?(z=Cr(Y,L.mode,W,ge),z.return=L,z):(z=c(z,Y),z.return=L,z)}function ee(L,z,Y){if(typeof z=="string"&&z!==""||typeof z=="number"||typeof z=="bigint")return z=ic(""+z,L.mode,Y),z.return=L,z;if(typeof z=="object"&&z!==null){switch(z.$$typeof){case j:return Y=ks(z.type,z.key,z.props,null,L.mode,Y),mi(Y,z),Y.return=L,Y;case E:return z=sc(z,L.mode,Y),z.return=L,z;case M:return z=kr(z),ee(L,z,Y)}if(ve(z)||re(z))return z=Cr(z,L.mode,Y,null),z.return=L,z;if(typeof z.then=="function")return ee(L,Ls(z),Y);if(z.$$typeof===B)return ee(L,zs(L,z),Y);Us(L,z)}return null}function F(L,z,Y,W){var ge=z!==null?z.key:null;if(typeof Y=="string"&&Y!==""||typeof Y=="number"||typeof Y=="bigint")return ge!==null?null:w(L,z,""+Y,W);if(typeof Y=="object"&&Y!==null){switch(Y.$$typeof){case j:return Y.key===ge?A(L,z,Y,W):null;case E:return Y.key===ge?G(L,z,Y,W):null;case M:return Y=kr(Y),F(L,z,Y,W)}if(ve(Y)||re(Y))return ge!==null?null:Z(L,z,Y,W,null);if(typeof Y.then=="function")return F(L,z,Ls(Y),W);if(Y.$$typeof===B)return F(L,z,zs(L,Y),W);Us(L,Y)}return null}function X(L,z,Y,W,ge){if(typeof W=="string"&&W!==""||typeof W=="number"||typeof W=="bigint")return L=L.get(Y)||null,w(z,L,""+W,ge);if(typeof W=="object"&&W!==null){switch(W.$$typeof){case j:return L=L.get(W.key===null?Y:W.key)||null,A(z,L,W,ge);case E:return L=L.get(W.key===null?Y:W.key)||null,G(z,L,W,ge);case M:return W=kr(W),X(L,z,Y,W,ge)}if(ve(W)||re(W))return L=L.get(Y)||null,Z(z,L,W,ge,null);if(typeof W.then=="function")return X(L,z,Y,Ls(W),ge);if(W.$$typeof===B)return X(L,z,Y,zs(z,W),ge);Us(z,W)}return null}function ce(L,z,Y,W){for(var ge=null,Me=null,me=z,je=z=0,Ne=null;me!==null&&je<Y.length;je++){me.index>je?(Ne=me,me=null):Ne=me.sibling;var ke=F(L,me,Y[je],W);if(ke===null){me===null&&(me=Ne);break}e&&me&&ke.alternate===null&&t(L,me),z=d(ke,z,je),Me===null?ge=ke:Me.sibling=ke,Me=ke,me=Ne}if(je===Y.length)return r(L,me),Ae&&En(L,je),ge;if(me===null){for(;je<Y.length;je++)me=ee(L,Y[je],W),me!==null&&(z=d(me,z,je),Me===null?ge=me:Me.sibling=me,Me=me);return Ae&&En(L,je),ge}for(me=i(me);je<Y.length;je++)Ne=X(me,L,je,Y[je],W),Ne!==null&&(e&&Ne.alternate!==null&&me.delete(Ne.key===null?je:Ne.key),z=d(Ne,z,je),Me===null?ge=Ne:Me.sibling=Ne,Me=Ne);return e&&me.forEach(function(dr){return t(L,dr)}),Ae&&En(L,je),ge}function xe(L,z,Y,W){if(Y==null)throw Error(o(151));for(var ge=null,Me=null,me=z,je=z=0,Ne=null,ke=Y.next();me!==null&&!ke.done;je++,ke=Y.next()){me.index>je?(Ne=me,me=null):Ne=me.sibling;var dr=F(L,me,ke.value,W);if(dr===null){me===null&&(me=Ne);break}e&&me&&dr.alternate===null&&t(L,me),z=d(dr,z,je),Me===null?ge=dr:Me.sibling=dr,Me=dr,me=Ne}if(ke.done)return r(L,me),Ae&&En(L,je),ge;if(me===null){for(;!ke.done;je++,ke=Y.next())ke=ee(L,ke.value,W),ke!==null&&(z=d(ke,z,je),Me===null?ge=ke:Me.sibling=ke,Me=ke);return Ae&&En(L,je),ge}for(me=i(me);!ke.done;je++,ke=Y.next())ke=X(me,L,je,ke.value,W),ke!==null&&(e&&ke.alternate!==null&&me.delete(ke.key===null?je:ke.key),z=d(ke,z,je),Me===null?ge=ke:Me.sibling=ke,Me=ke);return e&&me.forEach(function(bw){return t(L,bw)}),Ae&&En(L,je),ge}function Le(L,z,Y,W){if(typeof Y=="object"&&Y!==null&&Y.type===T&&Y.key===null&&(Y=Y.props.children),typeof Y=="object"&&Y!==null){switch(Y.$$typeof){case j:e:{for(var ge=Y.key;z!==null;){if(z.key===ge){if(ge=Y.type,ge===T){if(z.tag===7){r(L,z.sibling),W=c(z,Y.props.children),W.return=L,L=W;break e}}else if(z.elementType===ge||typeof ge=="object"&&ge!==null&&ge.$$typeof===M&&kr(ge)===z.type){r(L,z.sibling),W=c(z,Y.props),mi(W,Y),W.return=L,L=W;break e}r(L,z);break}else t(L,z);z=z.sibling}Y.type===T?(W=Cr(Y.props.children,L.mode,W,Y.key),W.return=L,L=W):(W=ks(Y.type,Y.key,Y.props,null,L.mode,W),mi(W,Y),W.return=L,L=W)}return y(L);case E:e:{for(ge=Y.key;z!==null;){if(z.key===ge)if(z.tag===4&&z.stateNode.containerInfo===Y.containerInfo&&z.stateNode.implementation===Y.implementation){r(L,z.sibling),W=c(z,Y.children||[]),W.return=L,L=W;break e}else{r(L,z);break}else t(L,z);z=z.sibling}W=sc(Y,L.mode,W),W.return=L,L=W}return y(L);case M:return Y=kr(Y),Le(L,z,Y,W)}if(ve(Y))return ce(L,z,Y,W);if(re(Y)){if(ge=re(Y),typeof ge!="function")throw Error(o(150));return Y=ge.call(Y),xe(L,z,Y,W)}if(typeof Y.then=="function")return Le(L,z,Ls(Y),W);if(Y.$$typeof===B)return Le(L,z,zs(L,Y),W);Us(L,Y)}return typeof Y=="string"&&Y!==""||typeof Y=="number"||typeof Y=="bigint"?(Y=""+Y,z!==null&&z.tag===6?(r(L,z.sibling),W=c(z,Y),W.return=L,L=W):(r(L,z),W=ic(Y,L.mode,W),W.return=L,L=W),y(L)):r(L,z)}return function(L,z,Y,W){try{hi=0;var ge=Le(L,z,Y,W);return ma=null,ge}catch(me){if(me===ha||me===Vs)throw me;var Me=Ot(29,me,null,L.mode);return Me.lanes=W,Me.return=L,Me}finally{}}}var Or=fm(!0),hm=fm(!1),Kn=!1;function vc(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function xc(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Zn(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function Qn(e,t,r){var i=e.updateQueue;if(i===null)return null;if(i=i.shared,(Re&2)!==0){var c=i.pending;return c===null?t.next=t:(t.next=c.next,c.next=t),i.pending=t,t=Ms(e),Qh(e,null,r),t}return As(e,i,t,r),Ms(e)}function pi(e,t,r){if(t=t.updateQueue,t!==null&&(t=t.shared,(r&4194048)!==0)){var i=t.lanes;i&=e.pendingLanes,r|=i,t.lanes=r,ah(e,r)}}function bc(e,t){var r=e.updateQueue,i=e.alternate;if(i!==null&&(i=i.updateQueue,r===i)){var c=null,d=null;if(r=r.firstBaseUpdate,r!==null){do{var y={lane:r.lane,tag:r.tag,payload:r.payload,callback:null,next:null};d===null?c=d=y:d=d.next=y,r=r.next}while(r!==null);d===null?c=d=t:d=d.next=t}else c=d=t;r={baseState:i.baseState,firstBaseUpdate:c,lastBaseUpdate:d,shared:i.shared,callbacks:i.callbacks},e.updateQueue=r;return}e=r.lastBaseUpdate,e===null?r.firstBaseUpdate=t:e.next=t,r.lastBaseUpdate=t}var Sc=!1;function gi(){if(Sc){var e=fa;if(e!==null)throw e}}function yi(e,t,r,i){Sc=!1;var c=e.updateQueue;Kn=!1;var d=c.firstBaseUpdate,y=c.lastBaseUpdate,w=c.shared.pending;if(w!==null){c.shared.pending=null;var A=w,G=A.next;A.next=null,y===null?d=G:y.next=G,y=A;var Z=e.alternate;Z!==null&&(Z=Z.updateQueue,w=Z.lastBaseUpdate,w!==y&&(w===null?Z.firstBaseUpdate=G:w.next=G,Z.lastBaseUpdate=A))}if(d!==null){var ee=c.baseState;y=0,Z=G=A=null,w=d;do{var F=w.lane&-536870913,X=F!==w.lane;if(X?(De&F)===F:(i&F)===F){F!==0&&F===da&&(Sc=!0),Z!==null&&(Z=Z.next={lane:0,tag:w.tag,payload:w.payload,callback:null,next:null});e:{var ce=e,xe=w;F=t;var Le=r;switch(xe.tag){case 1:if(ce=xe.payload,typeof ce=="function"){ee=ce.call(Le,ee,F);break e}ee=ce;break e;case 3:ce.flags=ce.flags&-65537|128;case 0:if(ce=xe.payload,F=typeof ce=="function"?ce.call(Le,ee,F):ce,F==null)break e;ee=x({},ee,F);break e;case 2:Kn=!0}}F=w.callback,F!==null&&(e.flags|=64,X&&(e.flags|=8192),X=c.callbacks,X===null?c.callbacks=[F]:X.push(F))}else X={lane:F,tag:w.tag,payload:w.payload,callback:w.callback,next:null},Z===null?(G=Z=X,A=ee):Z=Z.next=X,y|=F;if(w=w.next,w===null){if(w=c.shared.pending,w===null)break;X=w,w=X.next,X.next=null,c.lastBaseUpdate=X,c.shared.pending=null}}while(!0);Z===null&&(A=ee),c.baseState=A,c.firstBaseUpdate=G,c.lastBaseUpdate=Z,d===null&&(c.shared.lanes=0),tr|=y,e.lanes=y,e.memoizedState=ee}}function mm(e,t){if(typeof e!="function")throw Error(o(191,e));e.call(t)}function pm(e,t){var r=e.callbacks;if(r!==null)for(e.callbacks=null,e=0;e<r.length;e++)mm(r[e],t)}var pa=C(null),Hs=C(0);function gm(e,t){e=_n,I(Hs,e),I(pa,t),_n=e|t.baseLanes}function wc(){I(Hs,_n),I(pa,pa.current)}function jc(){_n=Hs.current,R(pa),R(Hs)}var zt=C(null),Kt=null;function Jn(e){var t=e.alternate;I(Je,Je.current&1),I(zt,e),Kt===null&&(t===null||pa.current!==null||t.memoizedState!==null)&&(Kt=e)}function Ec(e){I(Je,Je.current),I(zt,e),Kt===null&&(Kt=e)}function ym(e){e.tag===22?(I(Je,Je.current),I(zt,e),Kt===null&&(Kt=e)):Wn()}function Wn(){I(Je,Je.current),I(zt,zt.current)}function _t(e){R(zt),Kt===e&&(Kt=null),R(Je)}var Je=C(0);function qs(e){for(var t=e;t!==null;){if(t.tag===13){var r=t.memoizedState;if(r!==null&&(r=r.dehydrated,r===null||Mu(r)||ku(r)))return t}else if(t.tag===19&&(t.memoizedProps.revealOrder==="forwards"||t.memoizedProps.revealOrder==="backwards"||t.memoizedProps.revealOrder==="unstable_legacy-backwards"||t.memoizedProps.revealOrder==="together")){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Dn=0,we=null,Ve=null,et=null,Ys=!1,ga=!1,zr=!1,Gs=0,vi=0,ya=null,uS=0;function $e(){throw Error(o(321))}function Tc(e,t){if(t===null)return!1;for(var r=0;r<t.length&&r<e.length;r++)if(!Rt(e[r],t[r]))return!1;return!0}function Cc(e,t,r,i,c,d){return Dn=d,we=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,H.H=e===null||e.memoizedState===null?ep:qc,zr=!1,d=r(i,c),zr=!1,ga&&(d=xm(t,r,i,c)),vm(e),d}function vm(e){H.H=Si;var t=Ve!==null&&Ve.next!==null;if(Dn=0,et=Ve=we=null,Ys=!1,vi=0,ya=null,t)throw Error(o(300));e===null||tt||(e=e.dependencies,e!==null&&Os(e)&&(tt=!0))}function xm(e,t,r,i){we=e;var c=0;do{if(ga&&(ya=null),vi=0,ga=!1,25<=c)throw Error(o(301));if(c+=1,et=Ve=null,e.updateQueue!=null){var d=e.updateQueue;d.lastEffect=null,d.events=null,d.stores=null,d.memoCache!=null&&(d.memoCache.index=0)}H.H=tp,d=t(r,i)}while(ga);return d}function dS(){var e=H.H,t=e.useState()[0];return t=typeof t.then=="function"?xi(t):t,e=e.useState()[0],(Ve!==null?Ve.memoizedState:null)!==e&&(we.flags|=1024),t}function Dc(){var e=Gs!==0;return Gs=0,e}function Nc(e,t,r){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~r}function Ac(e){if(Ys){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}Ys=!1}Dn=0,et=Ve=we=null,ga=!1,vi=Gs=0,ya=null}function vt(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return et===null?we.memoizedState=et=e:et=et.next=e,et}function We(){if(Ve===null){var e=we.alternate;e=e!==null?e.memoizedState:null}else e=Ve.next;var t=et===null?we.memoizedState:et.next;if(t!==null)et=t,Ve=e;else{if(e===null)throw we.alternate===null?Error(o(467)):Error(o(310));Ve=e,e={memoizedState:Ve.memoizedState,baseState:Ve.baseState,baseQueue:Ve.baseQueue,queue:Ve.queue,next:null},et===null?we.memoizedState=et=e:et=et.next=e}return et}function Ps(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function xi(e){var t=vi;return vi+=1,ya===null&&(ya=[]),e=cm(ya,e,t),t=we,(et===null?t.memoizedState:et.next)===null&&(t=t.alternate,H.H=t===null||t.memoizedState===null?ep:qc),e}function Fs(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return xi(e);if(e.$$typeof===B)return dt(e)}throw Error(o(438,String(e)))}function Mc(e){var t=null,r=we.updateQueue;if(r!==null&&(t=r.memoCache),t==null){var i=we.alternate;i!==null&&(i=i.updateQueue,i!==null&&(i=i.memoCache,i!=null&&(t={data:i.data.map(function(c){return c.slice()}),index:0})))}if(t==null&&(t={data:[],index:0}),r===null&&(r=Ps(),we.updateQueue=r),r.memoCache=t,r=t.data[t.index],r===void 0)for(r=t.data[t.index]=Array(e),i=0;i<e;i++)r[i]=$;return t.index++,r}function Nn(e,t){return typeof t=="function"?t(e):t}function Xs(e){var t=We();return kc(t,Ve,e)}function kc(e,t,r){var i=e.queue;if(i===null)throw Error(o(311));i.lastRenderedReducer=r;var c=e.baseQueue,d=i.pending;if(d!==null){if(c!==null){var y=c.next;c.next=d.next,d.next=y}t.baseQueue=c=d,i.pending=null}if(d=e.baseState,c===null)e.memoizedState=d;else{t=c.next;var w=y=null,A=null,G=t,Z=!1;do{var ee=G.lane&-536870913;if(ee!==G.lane?(De&ee)===ee:(Dn&ee)===ee){var F=G.revertLane;if(F===0)A!==null&&(A=A.next={lane:0,revertLane:0,gesture:null,action:G.action,hasEagerState:G.hasEagerState,eagerState:G.eagerState,next:null}),ee===da&&(Z=!0);else if((Dn&F)===F){G=G.next,F===da&&(Z=!0);continue}else ee={lane:0,revertLane:G.revertLane,gesture:null,action:G.action,hasEagerState:G.hasEagerState,eagerState:G.eagerState,next:null},A===null?(w=A=ee,y=d):A=A.next=ee,we.lanes|=F,tr|=F;ee=G.action,zr&&r(d,ee),d=G.hasEagerState?G.eagerState:r(d,ee)}else F={lane:ee,revertLane:G.revertLane,gesture:G.gesture,action:G.action,hasEagerState:G.hasEagerState,eagerState:G.eagerState,next:null},A===null?(w=A=F,y=d):A=A.next=F,we.lanes|=ee,tr|=ee;G=G.next}while(G!==null&&G!==t);if(A===null?y=d:A.next=w,!Rt(d,e.memoizedState)&&(tt=!0,Z&&(r=fa,r!==null)))throw r;e.memoizedState=d,e.baseState=y,e.baseQueue=A,i.lastRenderedState=d}return c===null&&(i.lanes=0),[e.memoizedState,i.dispatch]}function Rc(e){var t=We(),r=t.queue;if(r===null)throw Error(o(311));r.lastRenderedReducer=e;var i=r.dispatch,c=r.pending,d=t.memoizedState;if(c!==null){r.pending=null;var y=c=c.next;do d=e(d,y.action),y=y.next;while(y!==c);Rt(d,t.memoizedState)||(tt=!0),t.memoizedState=d,t.baseQueue===null&&(t.baseState=d),r.lastRenderedState=d}return[d,i]}function bm(e,t,r){var i=we,c=We(),d=Ae;if(d){if(r===void 0)throw Error(o(407));r=r()}else r=t();var y=!Rt((Ve||c).memoizedState,r);if(y&&(c.memoizedState=r,tt=!0),c=c.queue,_c(jm.bind(null,i,c,e),[e]),c.getSnapshot!==t||y||et!==null&&et.memoizedState.tag&1){if(i.flags|=2048,va(9,{destroy:void 0},wm.bind(null,i,c,r,t),null),He===null)throw Error(o(349));d||(Dn&127)!==0||Sm(i,t,r)}return r}function Sm(e,t,r){e.flags|=16384,e={getSnapshot:t,value:r},t=we.updateQueue,t===null?(t=Ps(),we.updateQueue=t,t.stores=[e]):(r=t.stores,r===null?t.stores=[e]:r.push(e))}function wm(e,t,r,i){t.value=r,t.getSnapshot=i,Em(t)&&Tm(e)}function jm(e,t,r){return r(function(){Em(t)&&Tm(e)})}function Em(e){var t=e.getSnapshot;e=e.value;try{var r=t();return!Rt(e,r)}catch{return!0}}function Tm(e){var t=Tr(e,2);t!==null&&Nt(t,e,2)}function Oc(e){var t=vt();if(typeof e=="function"){var r=e;if(e=r(),zr){qn(!0);try{r()}finally{qn(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Nn,lastRenderedState:e},t}function Cm(e,t,r,i){return e.baseState=r,kc(e,Ve,typeof i=="function"?i:Nn)}function fS(e,t,r,i,c){if(Zs(e))throw Error(o(485));if(e=t.action,e!==null){var d={payload:c,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(y){d.listeners.push(y)}};H.T!==null?r(!0):d.isTransition=!1,i(d),r=t.pending,r===null?(d.next=t.pending=d,Dm(t,d)):(d.next=r.next,t.pending=r.next=d)}}function Dm(e,t){var r=t.action,i=t.payload,c=e.state;if(t.isTransition){var d=H.T,y={};H.T=y;try{var w=r(c,i),A=H.S;A!==null&&A(y,w),Nm(e,t,w)}catch(G){zc(e,t,G)}finally{d!==null&&y.types!==null&&(d.types=y.types),H.T=d}}else try{d=r(c,i),Nm(e,t,d)}catch(G){zc(e,t,G)}}function Nm(e,t,r){r!==null&&typeof r=="object"&&typeof r.then=="function"?r.then(function(i){Am(e,t,i)},function(i){return zc(e,t,i)}):Am(e,t,r)}function Am(e,t,r){t.status="fulfilled",t.value=r,Mm(t),e.state=r,t=e.pending,t!==null&&(r=t.next,r===t?e.pending=null:(r=r.next,t.next=r,Dm(e,r)))}function zc(e,t,r){var i=e.pending;if(e.pending=null,i!==null){i=i.next;do t.status="rejected",t.reason=r,Mm(t),t=t.next;while(t!==i)}e.action=null}function Mm(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function km(e,t){return t}function Rm(e,t){if(Ae){var r=He.formState;if(r!==null){e:{var i=we;if(Ae){if(Ge){t:{for(var c=Ge,d=$t;c.nodeType!==8;){if(!d){c=null;break t}if(c=Zt(c.nextSibling),c===null){c=null;break t}}d=c.data,c=d==="F!"||d==="F"?c:null}if(c){Ge=Zt(c.nextSibling),i=c.data==="F!";break e}}Xn(i)}i=!1}i&&(t=r[0])}}return r=vt(),r.memoizedState=r.baseState=t,i={pending:null,lanes:0,dispatch:null,lastRenderedReducer:km,lastRenderedState:t},r.queue=i,r=Jm.bind(null,we,i),i.dispatch=r,i=Oc(!1),d=Hc.bind(null,we,!1,i.queue),i=vt(),c={state:t,dispatch:null,action:e,pending:null},i.queue=c,r=fS.bind(null,we,c,d,r),c.dispatch=r,i.memoizedState=e,[t,r,!1]}function Om(e){var t=We();return zm(t,Ve,e)}function zm(e,t,r){if(t=kc(e,t,km)[0],e=Xs(Nn)[0],typeof t=="object"&&t!==null&&typeof t.then=="function")try{var i=xi(t)}catch(y){throw y===ha?Vs:y}else i=t;t=We();var c=t.queue,d=c.dispatch;return r!==t.memoizedState&&(we.flags|=2048,va(9,{destroy:void 0},hS.bind(null,c,r),null)),[i,d,e]}function hS(e,t){e.action=t}function _m(e){var t=We(),r=Ve;if(r!==null)return zm(t,r,e);We(),t=t.memoizedState,r=We();var i=r.queue.dispatch;return r.memoizedState=e,[t,i,!1]}function va(e,t,r,i){return e={tag:e,create:r,deps:i,inst:t,next:null},t=we.updateQueue,t===null&&(t=Ps(),we.updateQueue=t),r=t.lastEffect,r===null?t.lastEffect=e.next=e:(i=r.next,r.next=e,e.next=i,t.lastEffect=e),e}function Vm(){return We().memoizedState}function $s(e,t,r,i){var c=vt();we.flags|=e,c.memoizedState=va(1|t,{destroy:void 0},r,i===void 0?null:i)}function Ks(e,t,r,i){var c=We();i=i===void 0?null:i;var d=c.memoizedState.inst;Ve!==null&&i!==null&&Tc(i,Ve.memoizedState.deps)?c.memoizedState=va(t,d,r,i):(we.flags|=e,c.memoizedState=va(1|t,d,r,i))}function Bm(e,t){$s(8390656,8,e,t)}function _c(e,t){Ks(2048,8,e,t)}function mS(e){we.flags|=4;var t=we.updateQueue;if(t===null)t=Ps(),we.updateQueue=t,t.events=[e];else{var r=t.events;r===null?t.events=[e]:r.push(e)}}function Lm(e){var t=We().memoizedState;return mS({ref:t,nextImpl:e}),function(){if((Re&2)!==0)throw Error(o(440));return t.impl.apply(void 0,arguments)}}function Um(e,t){return Ks(4,2,e,t)}function Hm(e,t){return Ks(4,4,e,t)}function qm(e,t){if(typeof t=="function"){e=e();var r=t(e);return function(){typeof r=="function"?r():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Ym(e,t,r){r=r!=null?r.concat([e]):null,Ks(4,4,qm.bind(null,t,e),r)}function Vc(){}function Gm(e,t){var r=We();t=t===void 0?null:t;var i=r.memoizedState;return t!==null&&Tc(t,i[1])?i[0]:(r.memoizedState=[e,t],e)}function Pm(e,t){var r=We();t=t===void 0?null:t;var i=r.memoizedState;if(t!==null&&Tc(t,i[1]))return i[0];if(i=e(),zr){qn(!0);try{e()}finally{qn(!1)}}return r.memoizedState=[i,t],i}function Bc(e,t,r){return r===void 0||(Dn&1073741824)!==0&&(De&261930)===0?e.memoizedState=t:(e.memoizedState=r,e=Fp(),we.lanes|=e,tr|=e,r)}function Fm(e,t,r,i){return Rt(r,t)?r:pa.current!==null?(e=Bc(e,r,i),Rt(e,t)||(tt=!0),e):(Dn&42)===0||(Dn&1073741824)!==0&&(De&261930)===0?(tt=!0,e.memoizedState=r):(e=Fp(),we.lanes|=e,tr|=e,t)}function Xm(e,t,r,i,c){var d=se.p;se.p=d!==0&&8>d?d:8;var y=H.T,w={};H.T=w,Hc(e,!1,t,r);try{var A=c(),G=H.S;if(G!==null&&G(w,A),A!==null&&typeof A=="object"&&typeof A.then=="function"){var Z=cS(A,i);bi(e,t,Z,Lt(e))}else bi(e,t,i,Lt(e))}catch(ee){bi(e,t,{then:function(){},status:"rejected",reason:ee},Lt())}finally{se.p=d,y!==null&&w.types!==null&&(y.types=w.types),H.T=y}}function pS(){}function Lc(e,t,r,i){if(e.tag!==5)throw Error(o(476));var c=$m(e).queue;Xm(e,c,t,K,r===null?pS:function(){return Km(e),r(i)})}function $m(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:K,baseState:K,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Nn,lastRenderedState:K},next:null};var r={};return t.next={memoizedState:r,baseState:r,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Nn,lastRenderedState:r},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function Km(e){var t=$m(e);t.next===null&&(t=e.alternate.memoizedState),bi(e,t.next.queue,{},Lt())}function Uc(){return dt(Bi)}function Zm(){return We().memoizedState}function Qm(){return We().memoizedState}function gS(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var r=Lt();e=Zn(r);var i=Qn(t,e,r);i!==null&&(Nt(i,t,r),pi(i,t,r)),t={cache:mc()},e.payload=t;return}t=t.return}}function yS(e,t,r){var i=Lt();r={lane:i,revertLane:0,gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},Zs(e)?Wm(t,r):(r=rc(e,t,r,i),r!==null&&(Nt(r,e,i),Im(r,t,i)))}function Jm(e,t,r){var i=Lt();bi(e,t,r,i)}function bi(e,t,r,i){var c={lane:i,revertLane:0,gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null};if(Zs(e))Wm(t,c);else{var d=e.alternate;if(e.lanes===0&&(d===null||d.lanes===0)&&(d=t.lastRenderedReducer,d!==null))try{var y=t.lastRenderedState,w=d(y,r);if(c.hasEagerState=!0,c.eagerState=w,Rt(w,y))return As(e,t,c,0),He===null&&Ns(),!1}catch{}finally{}if(r=rc(e,t,c,i),r!==null)return Nt(r,e,i),Im(r,t,i),!0}return!1}function Hc(e,t,r,i){if(i={lane:2,revertLane:vu(),gesture:null,action:i,hasEagerState:!1,eagerState:null,next:null},Zs(e)){if(t)throw Error(o(479))}else t=rc(e,r,i,2),t!==null&&Nt(t,e,2)}function Zs(e){var t=e.alternate;return e===we||t!==null&&t===we}function Wm(e,t){ga=Ys=!0;var r=e.pending;r===null?t.next=t:(t.next=r.next,r.next=t),e.pending=t}function Im(e,t,r){if((r&4194048)!==0){var i=t.lanes;i&=e.pendingLanes,r|=i,t.lanes=r,ah(e,r)}}var Si={readContext:dt,use:Fs,useCallback:$e,useContext:$e,useEffect:$e,useImperativeHandle:$e,useLayoutEffect:$e,useInsertionEffect:$e,useMemo:$e,useReducer:$e,useRef:$e,useState:$e,useDebugValue:$e,useDeferredValue:$e,useTransition:$e,useSyncExternalStore:$e,useId:$e,useHostTransitionStatus:$e,useFormState:$e,useActionState:$e,useOptimistic:$e,useMemoCache:$e,useCacheRefresh:$e};Si.useEffectEvent=$e;var ep={readContext:dt,use:Fs,useCallback:function(e,t){return vt().memoizedState=[e,t===void 0?null:t],e},useContext:dt,useEffect:Bm,useImperativeHandle:function(e,t,r){r=r!=null?r.concat([e]):null,$s(4194308,4,qm.bind(null,t,e),r)},useLayoutEffect:function(e,t){return $s(4194308,4,e,t)},useInsertionEffect:function(e,t){$s(4,2,e,t)},useMemo:function(e,t){var r=vt();t=t===void 0?null:t;var i=e();if(zr){qn(!0);try{e()}finally{qn(!1)}}return r.memoizedState=[i,t],i},useReducer:function(e,t,r){var i=vt();if(r!==void 0){var c=r(t);if(zr){qn(!0);try{r(t)}finally{qn(!1)}}}else c=t;return i.memoizedState=i.baseState=c,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:c},i.queue=e,e=e.dispatch=yS.bind(null,we,e),[i.memoizedState,e]},useRef:function(e){var t=vt();return e={current:e},t.memoizedState=e},useState:function(e){e=Oc(e);var t=e.queue,r=Jm.bind(null,we,t);return t.dispatch=r,[e.memoizedState,r]},useDebugValue:Vc,useDeferredValue:function(e,t){var r=vt();return Bc(r,e,t)},useTransition:function(){var e=Oc(!1);return e=Xm.bind(null,we,e.queue,!0,!1),vt().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,r){var i=we,c=vt();if(Ae){if(r===void 0)throw Error(o(407));r=r()}else{if(r=t(),He===null)throw Error(o(349));(De&127)!==0||Sm(i,t,r)}c.memoizedState=r;var d={value:r,getSnapshot:t};return c.queue=d,Bm(jm.bind(null,i,d,e),[e]),i.flags|=2048,va(9,{destroy:void 0},wm.bind(null,i,d,r,t),null),r},useId:function(){var e=vt(),t=He.identifierPrefix;if(Ae){var r=un,i=cn;r=(i&~(1<<32-kt(i)-1)).toString(32)+r,t="_"+t+"R_"+r,r=Gs++,0<r&&(t+="H"+r.toString(32)),t+="_"}else r=uS++,t="_"+t+"r_"+r.toString(32)+"_";return e.memoizedState=t},useHostTransitionStatus:Uc,useFormState:Rm,useActionState:Rm,useOptimistic:function(e){var t=vt();t.memoizedState=t.baseState=e;var r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=r,t=Hc.bind(null,we,!0,r),r.dispatch=t,[e,t]},useMemoCache:Mc,useCacheRefresh:function(){return vt().memoizedState=gS.bind(null,we)},useEffectEvent:function(e){var t=vt(),r={impl:e};return t.memoizedState=r,function(){if((Re&2)!==0)throw Error(o(440));return r.impl.apply(void 0,arguments)}}},qc={readContext:dt,use:Fs,useCallback:Gm,useContext:dt,useEffect:_c,useImperativeHandle:Ym,useInsertionEffect:Um,useLayoutEffect:Hm,useMemo:Pm,useReducer:Xs,useRef:Vm,useState:function(){return Xs(Nn)},useDebugValue:Vc,useDeferredValue:function(e,t){var r=We();return Fm(r,Ve.memoizedState,e,t)},useTransition:function(){var e=Xs(Nn)[0],t=We().memoizedState;return[typeof e=="boolean"?e:xi(e),t]},useSyncExternalStore:bm,useId:Zm,useHostTransitionStatus:Uc,useFormState:Om,useActionState:Om,useOptimistic:function(e,t){var r=We();return Cm(r,Ve,e,t)},useMemoCache:Mc,useCacheRefresh:Qm};qc.useEffectEvent=Lm;var tp={readContext:dt,use:Fs,useCallback:Gm,useContext:dt,useEffect:_c,useImperativeHandle:Ym,useInsertionEffect:Um,useLayoutEffect:Hm,useMemo:Pm,useReducer:Rc,useRef:Vm,useState:function(){return Rc(Nn)},useDebugValue:Vc,useDeferredValue:function(e,t){var r=We();return Ve===null?Bc(r,e,t):Fm(r,Ve.memoizedState,e,t)},useTransition:function(){var e=Rc(Nn)[0],t=We().memoizedState;return[typeof e=="boolean"?e:xi(e),t]},useSyncExternalStore:bm,useId:Zm,useHostTransitionStatus:Uc,useFormState:_m,useActionState:_m,useOptimistic:function(e,t){var r=We();return Ve!==null?Cm(r,Ve,e,t):(r.baseState=e,[e,r.queue.dispatch])},useMemoCache:Mc,useCacheRefresh:Qm};tp.useEffectEvent=Lm;function Yc(e,t,r,i){t=e.memoizedState,r=r(i,t),r=r==null?t:x({},t,r),e.memoizedState=r,e.lanes===0&&(e.updateQueue.baseState=r)}var Gc={enqueueSetState:function(e,t,r){e=e._reactInternals;var i=Lt(),c=Zn(i);c.payload=t,r!=null&&(c.callback=r),t=Qn(e,c,i),t!==null&&(Nt(t,e,i),pi(t,e,i))},enqueueReplaceState:function(e,t,r){e=e._reactInternals;var i=Lt(),c=Zn(i);c.tag=1,c.payload=t,r!=null&&(c.callback=r),t=Qn(e,c,i),t!==null&&(Nt(t,e,i),pi(t,e,i))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var r=Lt(),i=Zn(r);i.tag=2,t!=null&&(i.callback=t),t=Qn(e,i,r),t!==null&&(Nt(t,e,r),pi(t,e,r))}};function np(e,t,r,i,c,d,y){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(i,d,y):t.prototype&&t.prototype.isPureReactComponent?!oi(r,i)||!oi(c,d):!0}function rp(e,t,r,i){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(r,i),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(r,i),t.state!==e&&Gc.enqueueReplaceState(t,t.state,null)}function _r(e,t){var r=t;if("ref"in t){r={};for(var i in t)i!=="ref"&&(r[i]=t[i])}if(e=e.defaultProps){r===t&&(r=x({},r));for(var c in e)r[c]===void 0&&(r[c]=e[c])}return r}function ap(e){Ds(e)}function ip(e){console.error(e)}function sp(e){Ds(e)}function Qs(e,t){try{var r=e.onUncaughtError;r(t.value,{componentStack:t.stack})}catch(i){setTimeout(function(){throw i})}}function op(e,t,r){try{var i=e.onCaughtError;i(r.value,{componentStack:r.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(c){setTimeout(function(){throw c})}}function Pc(e,t,r){return r=Zn(r),r.tag=3,r.payload={element:null},r.callback=function(){Qs(e,t)},r}function lp(e){return e=Zn(e),e.tag=3,e}function cp(e,t,r,i){var c=r.type.getDerivedStateFromError;if(typeof c=="function"){var d=i.value;e.payload=function(){return c(d)},e.callback=function(){op(t,r,i)}}var y=r.stateNode;y!==null&&typeof y.componentDidCatch=="function"&&(e.callback=function(){op(t,r,i),typeof c!="function"&&(nr===null?nr=new Set([this]):nr.add(this));var w=i.stack;this.componentDidCatch(i.value,{componentStack:w!==null?w:""})})}function vS(e,t,r,i,c){if(r.flags|=32768,i!==null&&typeof i=="object"&&typeof i.then=="function"){if(t=r.alternate,t!==null&&ua(t,r,c,!0),r=zt.current,r!==null){switch(r.tag){case 31:case 13:return Kt===null?lo():r.alternate===null&&Ke===0&&(Ke=3),r.flags&=-257,r.flags|=65536,r.lanes=c,i===Bs?r.flags|=16384:(t=r.updateQueue,t===null?r.updateQueue=new Set([i]):t.add(i),pu(e,i,c)),!1;case 22:return r.flags|=65536,i===Bs?r.flags|=16384:(t=r.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([i])},r.updateQueue=t):(r=t.retryQueue,r===null?t.retryQueue=new Set([i]):r.add(i)),pu(e,i,c)),!1}throw Error(o(435,r.tag))}return pu(e,i,c),lo(),!1}if(Ae)return t=zt.current,t!==null?((t.flags&65536)===0&&(t.flags|=256),t.flags|=65536,t.lanes=c,i!==cc&&(e=Error(o(422),{cause:i}),ui(Pt(e,r)))):(i!==cc&&(t=Error(o(423),{cause:i}),ui(Pt(t,r))),e=e.current.alternate,e.flags|=65536,c&=-c,e.lanes|=c,i=Pt(i,r),c=Pc(e.stateNode,i,c),bc(e,c),Ke!==4&&(Ke=2)),!1;var d=Error(o(520),{cause:i});if(d=Pt(d,r),Ai===null?Ai=[d]:Ai.push(d),Ke!==4&&(Ke=2),t===null)return!0;i=Pt(i,r),r=t;do{switch(r.tag){case 3:return r.flags|=65536,e=c&-c,r.lanes|=e,e=Pc(r.stateNode,i,e),bc(r,e),!1;case 1:if(t=r.type,d=r.stateNode,(r.flags&128)===0&&(typeof t.getDerivedStateFromError=="function"||d!==null&&typeof d.componentDidCatch=="function"&&(nr===null||!nr.has(d))))return r.flags|=65536,c&=-c,r.lanes|=c,c=lp(c),cp(c,e,r,i),bc(r,c),!1}r=r.return}while(r!==null);return!1}var Fc=Error(o(461)),tt=!1;function ft(e,t,r,i){t.child=e===null?hm(t,null,r,i):Or(t,e.child,r,i)}function up(e,t,r,i,c){r=r.render;var d=t.ref;if("ref"in i){var y={};for(var w in i)w!=="ref"&&(y[w]=i[w])}else y=i;return Ar(t),i=Cc(e,t,r,y,d,c),w=Dc(),e!==null&&!tt?(Nc(e,t,c),An(e,t,c)):(Ae&&w&&oc(t),t.flags|=1,ft(e,t,i,c),t.child)}function dp(e,t,r,i,c){if(e===null){var d=r.type;return typeof d=="function"&&!ac(d)&&d.defaultProps===void 0&&r.compare===null?(t.tag=15,t.type=d,fp(e,t,d,i,c)):(e=ks(r.type,null,i,t,t.mode,c),e.ref=t.ref,e.return=t,t.child=e)}if(d=e.child,!Ic(e,c)){var y=d.memoizedProps;if(r=r.compare,r=r!==null?r:oi,r(y,i)&&e.ref===t.ref)return An(e,t,c)}return t.flags|=1,e=jn(d,i),e.ref=t.ref,e.return=t,t.child=e}function fp(e,t,r,i,c){if(e!==null){var d=e.memoizedProps;if(oi(d,i)&&e.ref===t.ref)if(tt=!1,t.pendingProps=i=d,Ic(e,c))(e.flags&131072)!==0&&(tt=!0);else return t.lanes=e.lanes,An(e,t,c)}return Xc(e,t,r,i,c)}function hp(e,t,r,i){var c=i.children,d=e!==null?e.memoizedState:null;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),i.mode==="hidden"){if((t.flags&128)!==0){if(d=d!==null?d.baseLanes|r:r,e!==null){for(i=t.child=e.child,c=0;i!==null;)c=c|i.lanes|i.childLanes,i=i.sibling;i=c&~d}else i=0,t.child=null;return mp(e,t,d,r,i)}if((r&536870912)!==0)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&_s(t,d!==null?d.cachePool:null),d!==null?gm(t,d):wc(),ym(t);else return i=t.lanes=536870912,mp(e,t,d!==null?d.baseLanes|r:r,r,i)}else d!==null?(_s(t,d.cachePool),gm(t,d),Wn(),t.memoizedState=null):(e!==null&&_s(t,null),wc(),Wn());return ft(e,t,c,r),t.child}function wi(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function mp(e,t,r,i,c){var d=gc();return d=d===null?null:{parent:Ie._currentValue,pool:d},t.memoizedState={baseLanes:r,cachePool:d},e!==null&&_s(t,null),wc(),ym(t),e!==null&&ua(e,t,i,!0),t.childLanes=c,null}function Js(e,t){return t=Is({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function pp(e,t,r){return Or(t,e.child,null,r),e=Js(t,t.pendingProps),e.flags|=2,_t(t),t.memoizedState=null,e}function xS(e,t,r){var i=t.pendingProps,c=(t.flags&128)!==0;if(t.flags&=-129,e===null){if(Ae){if(i.mode==="hidden")return e=Js(t,i),t.lanes=536870912,wi(null,e);if(Ec(t),(e=Ge)?(e=Dg(e,$t),e=e!==null&&e.data==="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Pn!==null?{id:cn,overflow:un}:null,retryLane:536870912,hydrationErrors:null},r=Wh(e),r.return=t,t.child=r,ut=t,Ge=null)):e=null,e===null)throw Xn(t);return t.lanes=536870912,null}return Js(t,i)}var d=e.memoizedState;if(d!==null){var y=d.dehydrated;if(Ec(t),c)if(t.flags&256)t.flags&=-257,t=pp(e,t,r);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(o(558));else if(tt||ua(e,t,r,!1),c=(r&e.childLanes)!==0,tt||c){if(i=He,i!==null&&(y=ih(i,r),y!==0&&y!==d.retryLane))throw d.retryLane=y,Tr(e,y),Nt(i,e,y),Fc;lo(),t=pp(e,t,r)}else e=d.treeContext,Ge=Zt(y.nextSibling),ut=t,Ae=!0,Fn=null,$t=!1,e!==null&&tm(t,e),t=Js(t,i),t.flags|=4096;return t}return e=jn(e.child,{mode:i.mode,children:i.children}),e.ref=t.ref,t.child=e,e.return=t,e}function Ws(e,t){var r=t.ref;if(r===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof r!="function"&&typeof r!="object")throw Error(o(284));(e===null||e.ref!==r)&&(t.flags|=4194816)}}function Xc(e,t,r,i,c){return Ar(t),r=Cc(e,t,r,i,void 0,c),i=Dc(),e!==null&&!tt?(Nc(e,t,c),An(e,t,c)):(Ae&&i&&oc(t),t.flags|=1,ft(e,t,r,c),t.child)}function gp(e,t,r,i,c,d){return Ar(t),t.updateQueue=null,r=xm(t,i,r,c),vm(e),i=Dc(),e!==null&&!tt?(Nc(e,t,d),An(e,t,d)):(Ae&&i&&oc(t),t.flags|=1,ft(e,t,r,d),t.child)}function yp(e,t,r,i,c){if(Ar(t),t.stateNode===null){var d=sa,y=r.contextType;typeof y=="object"&&y!==null&&(d=dt(y)),d=new r(i,d),t.memoizedState=d.state!==null&&d.state!==void 0?d.state:null,d.updater=Gc,t.stateNode=d,d._reactInternals=t,d=t.stateNode,d.props=i,d.state=t.memoizedState,d.refs={},vc(t),y=r.contextType,d.context=typeof y=="object"&&y!==null?dt(y):sa,d.state=t.memoizedState,y=r.getDerivedStateFromProps,typeof y=="function"&&(Yc(t,r,y,i),d.state=t.memoizedState),typeof r.getDerivedStateFromProps=="function"||typeof d.getSnapshotBeforeUpdate=="function"||typeof d.UNSAFE_componentWillMount!="function"&&typeof d.componentWillMount!="function"||(y=d.state,typeof d.componentWillMount=="function"&&d.componentWillMount(),typeof d.UNSAFE_componentWillMount=="function"&&d.UNSAFE_componentWillMount(),y!==d.state&&Gc.enqueueReplaceState(d,d.state,null),yi(t,i,d,c),gi(),d.state=t.memoizedState),typeof d.componentDidMount=="function"&&(t.flags|=4194308),i=!0}else if(e===null){d=t.stateNode;var w=t.memoizedProps,A=_r(r,w);d.props=A;var G=d.context,Z=r.contextType;y=sa,typeof Z=="object"&&Z!==null&&(y=dt(Z));var ee=r.getDerivedStateFromProps;Z=typeof ee=="function"||typeof d.getSnapshotBeforeUpdate=="function",w=t.pendingProps!==w,Z||typeof d.UNSAFE_componentWillReceiveProps!="function"&&typeof d.componentWillReceiveProps!="function"||(w||G!==y)&&rp(t,d,i,y),Kn=!1;var F=t.memoizedState;d.state=F,yi(t,i,d,c),gi(),G=t.memoizedState,w||F!==G||Kn?(typeof ee=="function"&&(Yc(t,r,ee,i),G=t.memoizedState),(A=Kn||np(t,r,A,i,F,G,y))?(Z||typeof d.UNSAFE_componentWillMount!="function"&&typeof d.componentWillMount!="function"||(typeof d.componentWillMount=="function"&&d.componentWillMount(),typeof d.UNSAFE_componentWillMount=="function"&&d.UNSAFE_componentWillMount()),typeof d.componentDidMount=="function"&&(t.flags|=4194308)):(typeof d.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=i,t.memoizedState=G),d.props=i,d.state=G,d.context=y,i=A):(typeof d.componentDidMount=="function"&&(t.flags|=4194308),i=!1)}else{d=t.stateNode,xc(e,t),y=t.memoizedProps,Z=_r(r,y),d.props=Z,ee=t.pendingProps,F=d.context,G=r.contextType,A=sa,typeof G=="object"&&G!==null&&(A=dt(G)),w=r.getDerivedStateFromProps,(G=typeof w=="function"||typeof d.getSnapshotBeforeUpdate=="function")||typeof d.UNSAFE_componentWillReceiveProps!="function"&&typeof d.componentWillReceiveProps!="function"||(y!==ee||F!==A)&&rp(t,d,i,A),Kn=!1,F=t.memoizedState,d.state=F,yi(t,i,d,c),gi();var X=t.memoizedState;y!==ee||F!==X||Kn||e!==null&&e.dependencies!==null&&Os(e.dependencies)?(typeof w=="function"&&(Yc(t,r,w,i),X=t.memoizedState),(Z=Kn||np(t,r,Z,i,F,X,A)||e!==null&&e.dependencies!==null&&Os(e.dependencies))?(G||typeof d.UNSAFE_componentWillUpdate!="function"&&typeof d.componentWillUpdate!="function"||(typeof d.componentWillUpdate=="function"&&d.componentWillUpdate(i,X,A),typeof d.UNSAFE_componentWillUpdate=="function"&&d.UNSAFE_componentWillUpdate(i,X,A)),typeof d.componentDidUpdate=="function"&&(t.flags|=4),typeof d.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof d.componentDidUpdate!="function"||y===e.memoizedProps&&F===e.memoizedState||(t.flags|=4),typeof d.getSnapshotBeforeUpdate!="function"||y===e.memoizedProps&&F===e.memoizedState||(t.flags|=1024),t.memoizedProps=i,t.memoizedState=X),d.props=i,d.state=X,d.context=A,i=Z):(typeof d.componentDidUpdate!="function"||y===e.memoizedProps&&F===e.memoizedState||(t.flags|=4),typeof d.getSnapshotBeforeUpdate!="function"||y===e.memoizedProps&&F===e.memoizedState||(t.flags|=1024),i=!1)}return d=i,Ws(e,t),i=(t.flags&128)!==0,d||i?(d=t.stateNode,r=i&&typeof r.getDerivedStateFromError!="function"?null:d.render(),t.flags|=1,e!==null&&i?(t.child=Or(t,e.child,null,c),t.child=Or(t,null,r,c)):ft(e,t,r,c),t.memoizedState=d.state,e=t.child):e=An(e,t,c),e}function vp(e,t,r,i){return Dr(),t.flags|=256,ft(e,t,r,i),t.child}var $c={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Kc(e){return{baseLanes:e,cachePool:om()}}function Zc(e,t,r){return e=e!==null?e.childLanes&~r:0,t&&(e|=Bt),e}function xp(e,t,r){var i=t.pendingProps,c=!1,d=(t.flags&128)!==0,y;if((y=d)||(y=e!==null&&e.memoizedState===null?!1:(Je.current&2)!==0),y&&(c=!0,t.flags&=-129),y=(t.flags&32)!==0,t.flags&=-33,e===null){if(Ae){if(c?Jn(t):Wn(),(e=Ge)?(e=Dg(e,$t),e=e!==null&&e.data!=="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Pn!==null?{id:cn,overflow:un}:null,retryLane:536870912,hydrationErrors:null},r=Wh(e),r.return=t,t.child=r,ut=t,Ge=null)):e=null,e===null)throw Xn(t);return ku(e)?t.lanes=32:t.lanes=536870912,null}var w=i.children;return i=i.fallback,c?(Wn(),c=t.mode,w=Is({mode:"hidden",children:w},c),i=Cr(i,c,r,null),w.return=t,i.return=t,w.sibling=i,t.child=w,i=t.child,i.memoizedState=Kc(r),i.childLanes=Zc(e,y,r),t.memoizedState=$c,wi(null,i)):(Jn(t),Qc(t,w))}var A=e.memoizedState;if(A!==null&&(w=A.dehydrated,w!==null)){if(d)t.flags&256?(Jn(t),t.flags&=-257,t=Jc(e,t,r)):t.memoizedState!==null?(Wn(),t.child=e.child,t.flags|=128,t=null):(Wn(),w=i.fallback,c=t.mode,i=Is({mode:"visible",children:i.children},c),w=Cr(w,c,r,null),w.flags|=2,i.return=t,w.return=t,i.sibling=w,t.child=i,Or(t,e.child,null,r),i=t.child,i.memoizedState=Kc(r),i.childLanes=Zc(e,y,r),t.memoizedState=$c,t=wi(null,i));else if(Jn(t),ku(w)){if(y=w.nextSibling&&w.nextSibling.dataset,y)var G=y.dgst;y=G,i=Error(o(419)),i.stack="",i.digest=y,ui({value:i,source:null,stack:null}),t=Jc(e,t,r)}else if(tt||ua(e,t,r,!1),y=(r&e.childLanes)!==0,tt||y){if(y=He,y!==null&&(i=ih(y,r),i!==0&&i!==A.retryLane))throw A.retryLane=i,Tr(e,i),Nt(y,e,i),Fc;Mu(w)||lo(),t=Jc(e,t,r)}else Mu(w)?(t.flags|=192,t.child=e.child,t=null):(e=A.treeContext,Ge=Zt(w.nextSibling),ut=t,Ae=!0,Fn=null,$t=!1,e!==null&&tm(t,e),t=Qc(t,i.children),t.flags|=4096);return t}return c?(Wn(),w=i.fallback,c=t.mode,A=e.child,G=A.sibling,i=jn(A,{mode:"hidden",children:i.children}),i.subtreeFlags=A.subtreeFlags&65011712,G!==null?w=jn(G,w):(w=Cr(w,c,r,null),w.flags|=2),w.return=t,i.return=t,i.sibling=w,t.child=i,wi(null,i),i=t.child,w=e.child.memoizedState,w===null?w=Kc(r):(c=w.cachePool,c!==null?(A=Ie._currentValue,c=c.parent!==A?{parent:A,pool:A}:c):c=om(),w={baseLanes:w.baseLanes|r,cachePool:c}),i.memoizedState=w,i.childLanes=Zc(e,y,r),t.memoizedState=$c,wi(e.child,i)):(Jn(t),r=e.child,e=r.sibling,r=jn(r,{mode:"visible",children:i.children}),r.return=t,r.sibling=null,e!==null&&(y=t.deletions,y===null?(t.deletions=[e],t.flags|=16):y.push(e)),t.child=r,t.memoizedState=null,r)}function Qc(e,t){return t=Is({mode:"visible",children:t},e.mode),t.return=e,e.child=t}function Is(e,t){return e=Ot(22,e,null,t),e.lanes=0,e}function Jc(e,t,r){return Or(t,e.child,null,r),e=Qc(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function bp(e,t,r){e.lanes|=t;var i=e.alternate;i!==null&&(i.lanes|=t),fc(e.return,t,r)}function Wc(e,t,r,i,c,d){var y=e.memoizedState;y===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:i,tail:r,tailMode:c,treeForkCount:d}:(y.isBackwards=t,y.rendering=null,y.renderingStartTime=0,y.last=i,y.tail=r,y.tailMode=c,y.treeForkCount=d)}function Sp(e,t,r){var i=t.pendingProps,c=i.revealOrder,d=i.tail;i=i.children;var y=Je.current,w=(y&2)!==0;if(w?(y=y&1|2,t.flags|=128):y&=1,I(Je,y),ft(e,t,i,r),i=Ae?ci:0,!w&&e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&bp(e,r,t);else if(e.tag===19)bp(e,r,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(c){case"forwards":for(r=t.child,c=null;r!==null;)e=r.alternate,e!==null&&qs(e)===null&&(c=r),r=r.sibling;r=c,r===null?(c=t.child,t.child=null):(c=r.sibling,r.sibling=null),Wc(t,!1,c,r,d,i);break;case"backwards":case"unstable_legacy-backwards":for(r=null,c=t.child,t.child=null;c!==null;){if(e=c.alternate,e!==null&&qs(e)===null){t.child=c;break}e=c.sibling,c.sibling=r,r=c,c=e}Wc(t,!0,r,null,d,i);break;case"together":Wc(t,!1,null,null,void 0,i);break;default:t.memoizedState=null}return t.child}function An(e,t,r){if(e!==null&&(t.dependencies=e.dependencies),tr|=t.lanes,(r&t.childLanes)===0)if(e!==null){if(ua(e,t,r,!1),(r&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(o(153));if(t.child!==null){for(e=t.child,r=jn(e,e.pendingProps),t.child=r,r.return=t;e.sibling!==null;)e=e.sibling,r=r.sibling=jn(e,e.pendingProps),r.return=t;r.sibling=null}return t.child}function Ic(e,t){return(e.lanes&t)!==0?!0:(e=e.dependencies,!!(e!==null&&Os(e)))}function bS(e,t,r){switch(t.tag){case 3:ae(t,t.stateNode.containerInfo),$n(t,Ie,e.memoizedState.cache),Dr();break;case 27:case 5:ue(t);break;case 4:ae(t,t.stateNode.containerInfo);break;case 10:$n(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,Ec(t),null;break;case 13:var i=t.memoizedState;if(i!==null)return i.dehydrated!==null?(Jn(t),t.flags|=128,null):(r&t.child.childLanes)!==0?xp(e,t,r):(Jn(t),e=An(e,t,r),e!==null?e.sibling:null);Jn(t);break;case 19:var c=(e.flags&128)!==0;if(i=(r&t.childLanes)!==0,i||(ua(e,t,r,!1),i=(r&t.childLanes)!==0),c){if(i)return Sp(e,t,r);t.flags|=128}if(c=t.memoizedState,c!==null&&(c.rendering=null,c.tail=null,c.lastEffect=null),I(Je,Je.current),i)break;return null;case 22:return t.lanes=0,hp(e,t,r,t.pendingProps);case 24:$n(t,Ie,e.memoizedState.cache)}return An(e,t,r)}function wp(e,t,r){if(e!==null)if(e.memoizedProps!==t.pendingProps)tt=!0;else{if(!Ic(e,r)&&(t.flags&128)===0)return tt=!1,bS(e,t,r);tt=(e.flags&131072)!==0}else tt=!1,Ae&&(t.flags&1048576)!==0&&em(t,ci,t.index);switch(t.lanes=0,t.tag){case 16:e:{var i=t.pendingProps;if(e=kr(t.elementType),t.type=e,typeof e=="function")ac(e)?(i=_r(e,i),t.tag=1,t=yp(null,t,e,i,r)):(t.tag=0,t=Xc(null,t,e,i,r));else{if(e!=null){var c=e.$$typeof;if(c===_){t.tag=11,t=up(null,t,e,i,r);break e}else if(c===N){t.tag=14,t=dp(null,t,e,i,r);break e}}throw t=le(e)||e,Error(o(306,t,""))}}return t;case 0:return Xc(e,t,t.type,t.pendingProps,r);case 1:return i=t.type,c=_r(i,t.pendingProps),yp(e,t,i,c,r);case 3:e:{if(ae(t,t.stateNode.containerInfo),e===null)throw Error(o(387));i=t.pendingProps;var d=t.memoizedState;c=d.element,xc(e,t),yi(t,i,null,r);var y=t.memoizedState;if(i=y.cache,$n(t,Ie,i),i!==d.cache&&hc(t,[Ie],r,!0),gi(),i=y.element,d.isDehydrated)if(d={element:i,isDehydrated:!1,cache:y.cache},t.updateQueue.baseState=d,t.memoizedState=d,t.flags&256){t=vp(e,t,i,r);break e}else if(i!==c){c=Pt(Error(o(424)),t),ui(c),t=vp(e,t,i,r);break e}else{switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName==="HTML"?e.ownerDocument.body:e}for(Ge=Zt(e.firstChild),ut=t,Ae=!0,Fn=null,$t=!0,r=hm(t,null,i,r),t.child=r;r;)r.flags=r.flags&-3|4096,r=r.sibling}else{if(Dr(),i===c){t=An(e,t,r);break e}ft(e,t,i,r)}t=t.child}return t;case 26:return Ws(e,t),e===null?(r=Og(t.type,null,t.pendingProps,null))?t.memoizedState=r:Ae||(r=t.type,e=t.pendingProps,i=go(fe.current).createElement(r),i[ct]=t,i[wt]=e,ht(i,r,e),st(i),t.stateNode=i):t.memoizedState=Og(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return ue(t),e===null&&Ae&&(i=t.stateNode=Mg(t.type,t.pendingProps,fe.current),ut=t,$t=!0,c=Ge,sr(t.type)?(Ru=c,Ge=Zt(i.firstChild)):Ge=c),ft(e,t,t.pendingProps.children,r),Ws(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&Ae&&((c=i=Ge)&&(i=QS(i,t.type,t.pendingProps,$t),i!==null?(t.stateNode=i,ut=t,Ge=Zt(i.firstChild),$t=!1,c=!0):c=!1),c||Xn(t)),ue(t),c=t.type,d=t.pendingProps,y=e!==null?e.memoizedProps:null,i=d.children,Du(c,d)?i=null:y!==null&&Du(c,y)&&(t.flags|=32),t.memoizedState!==null&&(c=Cc(e,t,dS,null,null,r),Bi._currentValue=c),Ws(e,t),ft(e,t,i,r),t.child;case 6:return e===null&&Ae&&((e=r=Ge)&&(r=JS(r,t.pendingProps,$t),r!==null?(t.stateNode=r,ut=t,Ge=null,e=!0):e=!1),e||Xn(t)),null;case 13:return xp(e,t,r);case 4:return ae(t,t.stateNode.containerInfo),i=t.pendingProps,e===null?t.child=Or(t,null,i,r):ft(e,t,i,r),t.child;case 11:return up(e,t,t.type,t.pendingProps,r);case 7:return ft(e,t,t.pendingProps,r),t.child;case 8:return ft(e,t,t.pendingProps.children,r),t.child;case 12:return ft(e,t,t.pendingProps.children,r),t.child;case 10:return i=t.pendingProps,$n(t,t.type,i.value),ft(e,t,i.children,r),t.child;case 9:return c=t.type._context,i=t.pendingProps.children,Ar(t),c=dt(c),i=i(c),t.flags|=1,ft(e,t,i,r),t.child;case 14:return dp(e,t,t.type,t.pendingProps,r);case 15:return fp(e,t,t.type,t.pendingProps,r);case 19:return Sp(e,t,r);case 31:return xS(e,t,r);case 22:return hp(e,t,r,t.pendingProps);case 24:return Ar(t),i=dt(Ie),e===null?(c=gc(),c===null&&(c=He,d=mc(),c.pooledCache=d,d.refCount++,d!==null&&(c.pooledCacheLanes|=r),c=d),t.memoizedState={parent:i,cache:c},vc(t),$n(t,Ie,c)):((e.lanes&r)!==0&&(xc(e,t),yi(t,null,null,r),gi()),c=e.memoizedState,d=t.memoizedState,c.parent!==i?(c={parent:i,cache:i},t.memoizedState=c,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=c),$n(t,Ie,i)):(i=d.cache,$n(t,Ie,i),i!==c.cache&&hc(t,[Ie],r,!0))),ft(e,t,t.pendingProps.children,r),t.child;case 29:throw t.pendingProps}throw Error(o(156,t.tag))}function Mn(e){e.flags|=4}function eu(e,t,r,i,c){if((t=(e.mode&32)!==0)&&(t=!1),t){if(e.flags|=16777216,(c&335544128)===c)if(e.stateNode.complete)e.flags|=8192;else if(Zp())e.flags|=8192;else throw Rr=Bs,yc}else e.flags&=-16777217}function jp(e,t){if(t.type!=="stylesheet"||(t.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!Lg(t))if(Zp())e.flags|=8192;else throw Rr=Bs,yc}function eo(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag!==22?nh():536870912,e.lanes|=t,wa|=t)}function ji(e,t){if(!Ae)switch(e.tailMode){case"hidden":t=e.tail;for(var r=null;t!==null;)t.alternate!==null&&(r=t),t=t.sibling;r===null?e.tail=null:r.sibling=null;break;case"collapsed":r=e.tail;for(var i=null;r!==null;)r.alternate!==null&&(i=r),r=r.sibling;i===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:i.sibling=null}}function Pe(e){var t=e.alternate!==null&&e.alternate.child===e.child,r=0,i=0;if(t)for(var c=e.child;c!==null;)r|=c.lanes|c.childLanes,i|=c.subtreeFlags&65011712,i|=c.flags&65011712,c.return=e,c=c.sibling;else for(c=e.child;c!==null;)r|=c.lanes|c.childLanes,i|=c.subtreeFlags,i|=c.flags,c.return=e,c=c.sibling;return e.subtreeFlags|=i,e.childLanes=r,t}function SS(e,t,r){var i=t.pendingProps;switch(lc(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Pe(t),null;case 1:return Pe(t),null;case 3:return r=t.stateNode,i=null,e!==null&&(i=e.memoizedState.cache),t.memoizedState.cache!==i&&(t.flags|=2048),Cn(Ie),Q(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(ca(t)?Mn(t):e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,uc())),Pe(t),null;case 26:var c=t.type,d=t.memoizedState;return e===null?(Mn(t),d!==null?(Pe(t),jp(t,d)):(Pe(t),eu(t,c,null,i,r))):d?d!==e.memoizedState?(Mn(t),Pe(t),jp(t,d)):(Pe(t),t.flags&=-16777217):(e=e.memoizedProps,e!==i&&Mn(t),Pe(t),eu(t,c,e,i,r)),null;case 27:if(te(t),r=fe.current,c=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==i&&Mn(t);else{if(!i){if(t.stateNode===null)throw Error(o(166));return Pe(t),null}e=ie.current,ca(t)?nm(t):(e=Mg(c,i,r),t.stateNode=e,Mn(t))}return Pe(t),null;case 5:if(te(t),c=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==i&&Mn(t);else{if(!i){if(t.stateNode===null)throw Error(o(166));return Pe(t),null}if(d=ie.current,ca(t))nm(t);else{var y=go(fe.current);switch(d){case 1:d=y.createElementNS("http://www.w3.org/2000/svg",c);break;case 2:d=y.createElementNS("http://www.w3.org/1998/Math/MathML",c);break;default:switch(c){case"svg":d=y.createElementNS("http://www.w3.org/2000/svg",c);break;case"math":d=y.createElementNS("http://www.w3.org/1998/Math/MathML",c);break;case"script":d=y.createElement("div"),d.innerHTML="<script><\/script>",d=d.removeChild(d.firstChild);break;case"select":d=typeof i.is=="string"?y.createElement("select",{is:i.is}):y.createElement("select"),i.multiple?d.multiple=!0:i.size&&(d.size=i.size);break;default:d=typeof i.is=="string"?y.createElement(c,{is:i.is}):y.createElement(c)}}d[ct]=t,d[wt]=i;e:for(y=t.child;y!==null;){if(y.tag===5||y.tag===6)d.appendChild(y.stateNode);else if(y.tag!==4&&y.tag!==27&&y.child!==null){y.child.return=y,y=y.child;continue}if(y===t)break e;for(;y.sibling===null;){if(y.return===null||y.return===t)break e;y=y.return}y.sibling.return=y.return,y=y.sibling}t.stateNode=d;e:switch(ht(d,c,i),c){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}i&&Mn(t)}}return Pe(t),eu(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,r),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==i&&Mn(t);else{if(typeof i!="string"&&t.stateNode===null)throw Error(o(166));if(e=fe.current,ca(t)){if(e=t.stateNode,r=t.memoizedProps,i=null,c=ut,c!==null)switch(c.tag){case 27:case 5:i=c.memoizedProps}e[ct]=t,e=!!(e.nodeValue===r||i!==null&&i.suppressHydrationWarning===!0||xg(e.nodeValue,r)),e||Xn(t,!0)}else e=go(e).createTextNode(i),e[ct]=t,t.stateNode=e}return Pe(t),null;case 31:if(r=t.memoizedState,e===null||e.memoizedState!==null){if(i=ca(t),r!==null){if(e===null){if(!i)throw Error(o(318));if(e=t.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(o(557));e[ct]=t}else Dr(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;Pe(t),e=!1}else r=uc(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=r),e=!0;if(!e)return t.flags&256?(_t(t),t):(_t(t),null);if((t.flags&128)!==0)throw Error(o(558))}return Pe(t),null;case 13:if(i=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(c=ca(t),i!==null&&i.dehydrated!==null){if(e===null){if(!c)throw Error(o(318));if(c=t.memoizedState,c=c!==null?c.dehydrated:null,!c)throw Error(o(317));c[ct]=t}else Dr(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;Pe(t),c=!1}else c=uc(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=c),c=!0;if(!c)return t.flags&256?(_t(t),t):(_t(t),null)}return _t(t),(t.flags&128)!==0?(t.lanes=r,t):(r=i!==null,e=e!==null&&e.memoizedState!==null,r&&(i=t.child,c=null,i.alternate!==null&&i.alternate.memoizedState!==null&&i.alternate.memoizedState.cachePool!==null&&(c=i.alternate.memoizedState.cachePool.pool),d=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(d=i.memoizedState.cachePool.pool),d!==c&&(i.flags|=2048)),r!==e&&r&&(t.child.flags|=8192),eo(t,t.updateQueue),Pe(t),null);case 4:return Q(),e===null&&wu(t.stateNode.containerInfo),Pe(t),null;case 10:return Cn(t.type),Pe(t),null;case 19:if(R(Je),i=t.memoizedState,i===null)return Pe(t),null;if(c=(t.flags&128)!==0,d=i.rendering,d===null)if(c)ji(i,!1);else{if(Ke!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(d=qs(e),d!==null){for(t.flags|=128,ji(i,!1),e=d.updateQueue,t.updateQueue=e,eo(t,e),t.subtreeFlags=0,e=r,r=t.child;r!==null;)Jh(r,e),r=r.sibling;return I(Je,Je.current&1|2),Ae&&En(t,i.treeForkCount),t.child}e=e.sibling}i.tail!==null&&At()>io&&(t.flags|=128,c=!0,ji(i,!1),t.lanes=4194304)}else{if(!c)if(e=qs(d),e!==null){if(t.flags|=128,c=!0,e=e.updateQueue,t.updateQueue=e,eo(t,e),ji(i,!0),i.tail===null&&i.tailMode==="hidden"&&!d.alternate&&!Ae)return Pe(t),null}else 2*At()-i.renderingStartTime>io&&r!==536870912&&(t.flags|=128,c=!0,ji(i,!1),t.lanes=4194304);i.isBackwards?(d.sibling=t.child,t.child=d):(e=i.last,e!==null?e.sibling=d:t.child=d,i.last=d)}return i.tail!==null?(e=i.tail,i.rendering=e,i.tail=e.sibling,i.renderingStartTime=At(),e.sibling=null,r=Je.current,I(Je,c?r&1|2:r&1),Ae&&En(t,i.treeForkCount),e):(Pe(t),null);case 22:case 23:return _t(t),jc(),i=t.memoizedState!==null,e!==null?e.memoizedState!==null!==i&&(t.flags|=8192):i&&(t.flags|=8192),i?(r&536870912)!==0&&(t.flags&128)===0&&(Pe(t),t.subtreeFlags&6&&(t.flags|=8192)):Pe(t),r=t.updateQueue,r!==null&&eo(t,r.retryQueue),r=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(r=e.memoizedState.cachePool.pool),i=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(i=t.memoizedState.cachePool.pool),i!==r&&(t.flags|=2048),e!==null&&R(Mr),null;case 24:return r=null,e!==null&&(r=e.memoizedState.cache),t.memoizedState.cache!==r&&(t.flags|=2048),Cn(Ie),Pe(t),null;case 25:return null;case 30:return null}throw Error(o(156,t.tag))}function wS(e,t){switch(lc(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Cn(Ie),Q(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return te(t),null;case 31:if(t.memoizedState!==null){if(_t(t),t.alternate===null)throw Error(o(340));Dr()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(_t(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(o(340));Dr()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return R(Je),null;case 4:return Q(),null;case 10:return Cn(t.type),null;case 22:case 23:return _t(t),jc(),e!==null&&R(Mr),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return Cn(Ie),null;case 25:return null;default:return null}}function Ep(e,t){switch(lc(t),t.tag){case 3:Cn(Ie),Q();break;case 26:case 27:case 5:te(t);break;case 4:Q();break;case 31:t.memoizedState!==null&&_t(t);break;case 13:_t(t);break;case 19:R(Je);break;case 10:Cn(t.type);break;case 22:case 23:_t(t),jc(),e!==null&&R(Mr);break;case 24:Cn(Ie)}}function Ei(e,t){try{var r=t.updateQueue,i=r!==null?r.lastEffect:null;if(i!==null){var c=i.next;r=c;do{if((r.tag&e)===e){i=void 0;var d=r.create,y=r.inst;i=d(),y.destroy=i}r=r.next}while(r!==c)}}catch(w){_e(t,t.return,w)}}function In(e,t,r){try{var i=t.updateQueue,c=i!==null?i.lastEffect:null;if(c!==null){var d=c.next;i=d;do{if((i.tag&e)===e){var y=i.inst,w=y.destroy;if(w!==void 0){y.destroy=void 0,c=t;var A=r,G=w;try{G()}catch(Z){_e(c,A,Z)}}}i=i.next}while(i!==d)}}catch(Z){_e(t,t.return,Z)}}function Tp(e){var t=e.updateQueue;if(t!==null){var r=e.stateNode;try{pm(t,r)}catch(i){_e(e,e.return,i)}}}function Cp(e,t,r){r.props=_r(e.type,e.memoizedProps),r.state=e.memoizedState;try{r.componentWillUnmount()}catch(i){_e(e,t,i)}}function Ti(e,t){try{var r=e.ref;if(r!==null){switch(e.tag){case 26:case 27:case 5:var i=e.stateNode;break;case 30:i=e.stateNode;break;default:i=e.stateNode}typeof r=="function"?e.refCleanup=r(i):r.current=i}}catch(c){_e(e,t,c)}}function dn(e,t){var r=e.ref,i=e.refCleanup;if(r!==null)if(typeof i=="function")try{i()}catch(c){_e(e,t,c)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof r=="function")try{r(null)}catch(c){_e(e,t,c)}else r.current=null}function Dp(e){var t=e.type,r=e.memoizedProps,i=e.stateNode;try{e:switch(t){case"button":case"input":case"select":case"textarea":r.autoFocus&&i.focus();break e;case"img":r.src?i.src=r.src:r.srcSet&&(i.srcset=r.srcSet)}}catch(c){_e(e,e.return,c)}}function tu(e,t,r){try{var i=e.stateNode;PS(i,e.type,r,t),i[wt]=t}catch(c){_e(e,e.return,c)}}function Np(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&sr(e.type)||e.tag===4}function nu(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Np(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&sr(e.type)||e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function ru(e,t,r){var i=e.tag;if(i===5||i===6)e=e.stateNode,t?(r.nodeType===9?r.body:r.nodeName==="HTML"?r.ownerDocument.body:r).insertBefore(e,t):(t=r.nodeType===9?r.body:r.nodeName==="HTML"?r.ownerDocument.body:r,t.appendChild(e),r=r._reactRootContainer,r!=null||t.onclick!==null||(t.onclick=Sn));else if(i!==4&&(i===27&&sr(e.type)&&(r=e.stateNode,t=null),e=e.child,e!==null))for(ru(e,t,r),e=e.sibling;e!==null;)ru(e,t,r),e=e.sibling}function to(e,t,r){var i=e.tag;if(i===5||i===6)e=e.stateNode,t?r.insertBefore(e,t):r.appendChild(e);else if(i!==4&&(i===27&&sr(e.type)&&(r=e.stateNode),e=e.child,e!==null))for(to(e,t,r),e=e.sibling;e!==null;)to(e,t,r),e=e.sibling}function Ap(e){var t=e.stateNode,r=e.memoizedProps;try{for(var i=e.type,c=t.attributes;c.length;)t.removeAttributeNode(c[0]);ht(t,i,r),t[ct]=e,t[wt]=r}catch(d){_e(e,e.return,d)}}var kn=!1,nt=!1,au=!1,Mp=typeof WeakSet=="function"?WeakSet:Set,ot=null;function jS(e,t){if(e=e.containerInfo,Tu=jo,e=Yh(e),Jl(e)){if("selectionStart"in e)var r={start:e.selectionStart,end:e.selectionEnd};else e:{r=(r=e.ownerDocument)&&r.defaultView||window;var i=r.getSelection&&r.getSelection();if(i&&i.rangeCount!==0){r=i.anchorNode;var c=i.anchorOffset,d=i.focusNode;i=i.focusOffset;try{r.nodeType,d.nodeType}catch{r=null;break e}var y=0,w=-1,A=-1,G=0,Z=0,ee=e,F=null;t:for(;;){for(var X;ee!==r||c!==0&&ee.nodeType!==3||(w=y+c),ee!==d||i!==0&&ee.nodeType!==3||(A=y+i),ee.nodeType===3&&(y+=ee.nodeValue.length),(X=ee.firstChild)!==null;)F=ee,ee=X;for(;;){if(ee===e)break t;if(F===r&&++G===c&&(w=y),F===d&&++Z===i&&(A=y),(X=ee.nextSibling)!==null)break;ee=F,F=ee.parentNode}ee=X}r=w===-1||A===-1?null:{start:w,end:A}}else r=null}r=r||{start:0,end:0}}else r=null;for(Cu={focusedElem:e,selectionRange:r},jo=!1,ot=t;ot!==null;)if(t=ot,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,ot=e;else for(;ot!==null;){switch(t=ot,d=t.alternate,e=t.flags,t.tag){case 0:if((e&4)!==0&&(e=t.updateQueue,e=e!==null?e.events:null,e!==null))for(r=0;r<e.length;r++)c=e[r],c.ref.impl=c.nextImpl;break;case 11:case 15:break;case 1:if((e&1024)!==0&&d!==null){e=void 0,r=t,c=d.memoizedProps,d=d.memoizedState,i=r.stateNode;try{var ce=_r(r.type,c);e=i.getSnapshotBeforeUpdate(ce,d),i.__reactInternalSnapshotBeforeUpdate=e}catch(xe){_e(r,r.return,xe)}}break;case 3:if((e&1024)!==0){if(e=t.stateNode.containerInfo,r=e.nodeType,r===9)Au(e);else if(r===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":Au(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(o(163))}if(e=t.sibling,e!==null){e.return=t.return,ot=e;break}ot=t.return}}function kp(e,t,r){var i=r.flags;switch(r.tag){case 0:case 11:case 15:On(e,r),i&4&&Ei(5,r);break;case 1:if(On(e,r),i&4)if(e=r.stateNode,t===null)try{e.componentDidMount()}catch(y){_e(r,r.return,y)}else{var c=_r(r.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(c,t,e.__reactInternalSnapshotBeforeUpdate)}catch(y){_e(r,r.return,y)}}i&64&&Tp(r),i&512&&Ti(r,r.return);break;case 3:if(On(e,r),i&64&&(e=r.updateQueue,e!==null)){if(t=null,r.child!==null)switch(r.child.tag){case 27:case 5:t=r.child.stateNode;break;case 1:t=r.child.stateNode}try{pm(e,t)}catch(y){_e(r,r.return,y)}}break;case 27:t===null&&i&4&&Ap(r);case 26:case 5:On(e,r),t===null&&i&4&&Dp(r),i&512&&Ti(r,r.return);break;case 12:On(e,r);break;case 31:On(e,r),i&4&&zp(e,r);break;case 13:On(e,r),i&4&&_p(e,r),i&64&&(e=r.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(r=RS.bind(null,r),WS(e,r))));break;case 22:if(i=r.memoizedState!==null||kn,!i){t=t!==null&&t.memoizedState!==null||nt,c=kn;var d=nt;kn=i,(nt=t)&&!d?zn(e,r,(r.subtreeFlags&8772)!==0):On(e,r),kn=c,nt=d}break;case 30:break;default:On(e,r)}}function Rp(e){var t=e.alternate;t!==null&&(e.alternate=null,Rp(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&zl(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var Fe=null,Et=!1;function Rn(e,t,r){for(r=r.child;r!==null;)Op(e,t,r),r=r.sibling}function Op(e,t,r){if(Mt&&typeof Mt.onCommitFiberUnmount=="function")try{Mt.onCommitFiberUnmount(Za,r)}catch{}switch(r.tag){case 26:nt||dn(r,t),Rn(e,t,r),r.memoizedState?r.memoizedState.count--:r.stateNode&&(r=r.stateNode,r.parentNode.removeChild(r));break;case 27:nt||dn(r,t);var i=Fe,c=Et;sr(r.type)&&(Fe=r.stateNode,Et=!1),Rn(e,t,r),zi(r.stateNode),Fe=i,Et=c;break;case 5:nt||dn(r,t);case 6:if(i=Fe,c=Et,Fe=null,Rn(e,t,r),Fe=i,Et=c,Fe!==null)if(Et)try{(Fe.nodeType===9?Fe.body:Fe.nodeName==="HTML"?Fe.ownerDocument.body:Fe).removeChild(r.stateNode)}catch(d){_e(r,t,d)}else try{Fe.removeChild(r.stateNode)}catch(d){_e(r,t,d)}break;case 18:Fe!==null&&(Et?(e=Fe,Tg(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,r.stateNode),Ma(e)):Tg(Fe,r.stateNode));break;case 4:i=Fe,c=Et,Fe=r.stateNode.containerInfo,Et=!0,Rn(e,t,r),Fe=i,Et=c;break;case 0:case 11:case 14:case 15:In(2,r,t),nt||In(4,r,t),Rn(e,t,r);break;case 1:nt||(dn(r,t),i=r.stateNode,typeof i.componentWillUnmount=="function"&&Cp(r,t,i)),Rn(e,t,r);break;case 21:Rn(e,t,r);break;case 22:nt=(i=nt)||r.memoizedState!==null,Rn(e,t,r),nt=i;break;default:Rn(e,t,r)}}function zp(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Ma(e)}catch(r){_e(t,t.return,r)}}}function _p(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Ma(e)}catch(r){_e(t,t.return,r)}}function ES(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new Mp),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new Mp),t;default:throw Error(o(435,e.tag))}}function no(e,t){var r=ES(e);t.forEach(function(i){if(!r.has(i)){r.add(i);var c=OS.bind(null,e,i);i.then(c,c)}})}function Tt(e,t){var r=t.deletions;if(r!==null)for(var i=0;i<r.length;i++){var c=r[i],d=e,y=t,w=y;e:for(;w!==null;){switch(w.tag){case 27:if(sr(w.type)){Fe=w.stateNode,Et=!1;break e}break;case 5:Fe=w.stateNode,Et=!1;break e;case 3:case 4:Fe=w.stateNode.containerInfo,Et=!0;break e}w=w.return}if(Fe===null)throw Error(o(160));Op(d,y,c),Fe=null,Et=!1,d=c.alternate,d!==null&&(d.return=null),c.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)Vp(t,e),t=t.sibling}var nn=null;function Vp(e,t){var r=e.alternate,i=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:Tt(t,e),Ct(e),i&4&&(In(3,e,e.return),Ei(3,e),In(5,e,e.return));break;case 1:Tt(t,e),Ct(e),i&512&&(nt||r===null||dn(r,r.return)),i&64&&kn&&(e=e.updateQueue,e!==null&&(i=e.callbacks,i!==null&&(r=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=r===null?i:r.concat(i))));break;case 26:var c=nn;if(Tt(t,e),Ct(e),i&512&&(nt||r===null||dn(r,r.return)),i&4){var d=r!==null?r.memoizedState:null;if(i=e.memoizedState,r===null)if(i===null)if(e.stateNode===null){e:{i=e.type,r=e.memoizedProps,c=c.ownerDocument||c;t:switch(i){case"title":d=c.getElementsByTagName("title")[0],(!d||d[Wa]||d[ct]||d.namespaceURI==="http://www.w3.org/2000/svg"||d.hasAttribute("itemprop"))&&(d=c.createElement(i),c.head.insertBefore(d,c.querySelector("head > title"))),ht(d,i,r),d[ct]=e,st(d),i=d;break e;case"link":var y=Vg("link","href",c).get(i+(r.href||""));if(y){for(var w=0;w<y.length;w++)if(d=y[w],d.getAttribute("href")===(r.href==null||r.href===""?null:r.href)&&d.getAttribute("rel")===(r.rel==null?null:r.rel)&&d.getAttribute("title")===(r.title==null?null:r.title)&&d.getAttribute("crossorigin")===(r.crossOrigin==null?null:r.crossOrigin)){y.splice(w,1);break t}}d=c.createElement(i),ht(d,i,r),c.head.appendChild(d);break;case"meta":if(y=Vg("meta","content",c).get(i+(r.content||""))){for(w=0;w<y.length;w++)if(d=y[w],d.getAttribute("content")===(r.content==null?null:""+r.content)&&d.getAttribute("name")===(r.name==null?null:r.name)&&d.getAttribute("property")===(r.property==null?null:r.property)&&d.getAttribute("http-equiv")===(r.httpEquiv==null?null:r.httpEquiv)&&d.getAttribute("charset")===(r.charSet==null?null:r.charSet)){y.splice(w,1);break t}}d=c.createElement(i),ht(d,i,r),c.head.appendChild(d);break;default:throw Error(o(468,i))}d[ct]=e,st(d),i=d}e.stateNode=i}else Bg(c,e.type,e.stateNode);else e.stateNode=_g(c,i,e.memoizedProps);else d!==i?(d===null?r.stateNode!==null&&(r=r.stateNode,r.parentNode.removeChild(r)):d.count--,i===null?Bg(c,e.type,e.stateNode):_g(c,i,e.memoizedProps)):i===null&&e.stateNode!==null&&tu(e,e.memoizedProps,r.memoizedProps)}break;case 27:Tt(t,e),Ct(e),i&512&&(nt||r===null||dn(r,r.return)),r!==null&&i&4&&tu(e,e.memoizedProps,r.memoizedProps);break;case 5:if(Tt(t,e),Ct(e),i&512&&(nt||r===null||dn(r,r.return)),e.flags&32){c=e.stateNode;try{Ir(c,"")}catch(ce){_e(e,e.return,ce)}}i&4&&e.stateNode!=null&&(c=e.memoizedProps,tu(e,c,r!==null?r.memoizedProps:c)),i&1024&&(au=!0);break;case 6:if(Tt(t,e),Ct(e),i&4){if(e.stateNode===null)throw Error(o(162));i=e.memoizedProps,r=e.stateNode;try{r.nodeValue=i}catch(ce){_e(e,e.return,ce)}}break;case 3:if(xo=null,c=nn,nn=yo(t.containerInfo),Tt(t,e),nn=c,Ct(e),i&4&&r!==null&&r.memoizedState.isDehydrated)try{Ma(t.containerInfo)}catch(ce){_e(e,e.return,ce)}au&&(au=!1,Bp(e));break;case 4:i=nn,nn=yo(e.stateNode.containerInfo),Tt(t,e),Ct(e),nn=i;break;case 12:Tt(t,e),Ct(e);break;case 31:Tt(t,e),Ct(e),i&4&&(i=e.updateQueue,i!==null&&(e.updateQueue=null,no(e,i)));break;case 13:Tt(t,e),Ct(e),e.child.flags&8192&&e.memoizedState!==null!=(r!==null&&r.memoizedState!==null)&&(ao=At()),i&4&&(i=e.updateQueue,i!==null&&(e.updateQueue=null,no(e,i)));break;case 22:c=e.memoizedState!==null;var A=r!==null&&r.memoizedState!==null,G=kn,Z=nt;if(kn=G||c,nt=Z||A,Tt(t,e),nt=Z,kn=G,Ct(e),i&8192)e:for(t=e.stateNode,t._visibility=c?t._visibility&-2:t._visibility|1,c&&(r===null||A||kn||nt||Vr(e)),r=null,t=e;;){if(t.tag===5||t.tag===26){if(r===null){A=r=t;try{if(d=A.stateNode,c)y=d.style,typeof y.setProperty=="function"?y.setProperty("display","none","important"):y.display="none";else{w=A.stateNode;var ee=A.memoizedProps.style,F=ee!=null&&ee.hasOwnProperty("display")?ee.display:null;w.style.display=F==null||typeof F=="boolean"?"":(""+F).trim()}}catch(ce){_e(A,A.return,ce)}}}else if(t.tag===6){if(r===null){A=t;try{A.stateNode.nodeValue=c?"":A.memoizedProps}catch(ce){_e(A,A.return,ce)}}}else if(t.tag===18){if(r===null){A=t;try{var X=A.stateNode;c?Cg(X,!0):Cg(A.stateNode,!1)}catch(ce){_e(A,A.return,ce)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;r===t&&(r=null),t=t.return}r===t&&(r=null),t.sibling.return=t.return,t=t.sibling}i&4&&(i=e.updateQueue,i!==null&&(r=i.retryQueue,r!==null&&(i.retryQueue=null,no(e,r))));break;case 19:Tt(t,e),Ct(e),i&4&&(i=e.updateQueue,i!==null&&(e.updateQueue=null,no(e,i)));break;case 30:break;case 21:break;default:Tt(t,e),Ct(e)}}function Ct(e){var t=e.flags;if(t&2){try{for(var r,i=e.return;i!==null;){if(Np(i)){r=i;break}i=i.return}if(r==null)throw Error(o(160));switch(r.tag){case 27:var c=r.stateNode,d=nu(e);to(e,d,c);break;case 5:var y=r.stateNode;r.flags&32&&(Ir(y,""),r.flags&=-33);var w=nu(e);to(e,w,y);break;case 3:case 4:var A=r.stateNode.containerInfo,G=nu(e);ru(e,G,A);break;default:throw Error(o(161))}}catch(Z){_e(e,e.return,Z)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Bp(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;Bp(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function On(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)kp(e,t.alternate,t),t=t.sibling}function Vr(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:In(4,t,t.return),Vr(t);break;case 1:dn(t,t.return);var r=t.stateNode;typeof r.componentWillUnmount=="function"&&Cp(t,t.return,r),Vr(t);break;case 27:zi(t.stateNode);case 26:case 5:dn(t,t.return),Vr(t);break;case 22:t.memoizedState===null&&Vr(t);break;case 30:Vr(t);break;default:Vr(t)}e=e.sibling}}function zn(e,t,r){for(r=r&&(t.subtreeFlags&8772)!==0,t=t.child;t!==null;){var i=t.alternate,c=e,d=t,y=d.flags;switch(d.tag){case 0:case 11:case 15:zn(c,d,r),Ei(4,d);break;case 1:if(zn(c,d,r),i=d,c=i.stateNode,typeof c.componentDidMount=="function")try{c.componentDidMount()}catch(G){_e(i,i.return,G)}if(i=d,c=i.updateQueue,c!==null){var w=i.stateNode;try{var A=c.shared.hiddenCallbacks;if(A!==null)for(c.shared.hiddenCallbacks=null,c=0;c<A.length;c++)mm(A[c],w)}catch(G){_e(i,i.return,G)}}r&&y&64&&Tp(d),Ti(d,d.return);break;case 27:Ap(d);case 26:case 5:zn(c,d,r),r&&i===null&&y&4&&Dp(d),Ti(d,d.return);break;case 12:zn(c,d,r);break;case 31:zn(c,d,r),r&&y&4&&zp(c,d);break;case 13:zn(c,d,r),r&&y&4&&_p(c,d);break;case 22:d.memoizedState===null&&zn(c,d,r),Ti(d,d.return);break;case 30:break;default:zn(c,d,r)}t=t.sibling}}function iu(e,t){var r=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(r=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==r&&(e!=null&&e.refCount++,r!=null&&di(r))}function su(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&di(e))}function rn(e,t,r,i){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)Lp(e,t,r,i),t=t.sibling}function Lp(e,t,r,i){var c=t.flags;switch(t.tag){case 0:case 11:case 15:rn(e,t,r,i),c&2048&&Ei(9,t);break;case 1:rn(e,t,r,i);break;case 3:rn(e,t,r,i),c&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&di(e)));break;case 12:if(c&2048){rn(e,t,r,i),e=t.stateNode;try{var d=t.memoizedProps,y=d.id,w=d.onPostCommit;typeof w=="function"&&w(y,t.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(A){_e(t,t.return,A)}}else rn(e,t,r,i);break;case 31:rn(e,t,r,i);break;case 13:rn(e,t,r,i);break;case 23:break;case 22:d=t.stateNode,y=t.alternate,t.memoizedState!==null?d._visibility&2?rn(e,t,r,i):Ci(e,t):d._visibility&2?rn(e,t,r,i):(d._visibility|=2,xa(e,t,r,i,(t.subtreeFlags&10256)!==0||!1)),c&2048&&iu(y,t);break;case 24:rn(e,t,r,i),c&2048&&su(t.alternate,t);break;default:rn(e,t,r,i)}}function xa(e,t,r,i,c){for(c=c&&((t.subtreeFlags&10256)!==0||!1),t=t.child;t!==null;){var d=e,y=t,w=r,A=i,G=y.flags;switch(y.tag){case 0:case 11:case 15:xa(d,y,w,A,c),Ei(8,y);break;case 23:break;case 22:var Z=y.stateNode;y.memoizedState!==null?Z._visibility&2?xa(d,y,w,A,c):Ci(d,y):(Z._visibility|=2,xa(d,y,w,A,c)),c&&G&2048&&iu(y.alternate,y);break;case 24:xa(d,y,w,A,c),c&&G&2048&&su(y.alternate,y);break;default:xa(d,y,w,A,c)}t=t.sibling}}function Ci(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var r=e,i=t,c=i.flags;switch(i.tag){case 22:Ci(r,i),c&2048&&iu(i.alternate,i);break;case 24:Ci(r,i),c&2048&&su(i.alternate,i);break;default:Ci(r,i)}t=t.sibling}}var Di=8192;function ba(e,t,r){if(e.subtreeFlags&Di)for(e=e.child;e!==null;)Up(e,t,r),e=e.sibling}function Up(e,t,r){switch(e.tag){case 26:ba(e,t,r),e.flags&Di&&e.memoizedState!==null&&uw(r,nn,e.memoizedState,e.memoizedProps);break;case 5:ba(e,t,r);break;case 3:case 4:var i=nn;nn=yo(e.stateNode.containerInfo),ba(e,t,r),nn=i;break;case 22:e.memoizedState===null&&(i=e.alternate,i!==null&&i.memoizedState!==null?(i=Di,Di=16777216,ba(e,t,r),Di=i):ba(e,t,r));break;default:ba(e,t,r)}}function Hp(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function Ni(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var r=0;r<t.length;r++){var i=t[r];ot=i,Yp(i,e)}Hp(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)qp(e),e=e.sibling}function qp(e){switch(e.tag){case 0:case 11:case 15:Ni(e),e.flags&2048&&In(9,e,e.return);break;case 3:Ni(e);break;case 12:Ni(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,ro(e)):Ni(e);break;default:Ni(e)}}function ro(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var r=0;r<t.length;r++){var i=t[r];ot=i,Yp(i,e)}Hp(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:In(8,t,t.return),ro(t);break;case 22:r=t.stateNode,r._visibility&2&&(r._visibility&=-3,ro(t));break;default:ro(t)}e=e.sibling}}function Yp(e,t){for(;ot!==null;){var r=ot;switch(r.tag){case 0:case 11:case 15:In(8,r,t);break;case 23:case 22:if(r.memoizedState!==null&&r.memoizedState.cachePool!==null){var i=r.memoizedState.cachePool.pool;i!=null&&i.refCount++}break;case 24:di(r.memoizedState.cache)}if(i=r.child,i!==null)i.return=r,ot=i;else e:for(r=e;ot!==null;){i=ot;var c=i.sibling,d=i.return;if(Rp(i),i===r){ot=null;break e}if(c!==null){c.return=d,ot=c;break e}ot=d}}}var TS={getCacheForType:function(e){var t=dt(Ie),r=t.data.get(e);return r===void 0&&(r=e(),t.data.set(e,r)),r},cacheSignal:function(){return dt(Ie).controller.signal}},CS=typeof WeakMap=="function"?WeakMap:Map,Re=0,He=null,Ee=null,De=0,ze=0,Vt=null,er=!1,Sa=!1,ou=!1,_n=0,Ke=0,tr=0,Br=0,lu=0,Bt=0,wa=0,Ai=null,Dt=null,cu=!1,ao=0,Gp=0,io=1/0,so=null,nr=null,at=0,rr=null,ja=null,Vn=0,uu=0,du=null,Pp=null,Mi=0,fu=null;function Lt(){return(Re&2)!==0&&De!==0?De&-De:H.T!==null?vu():sh()}function Fp(){if(Bt===0)if((De&536870912)===0||Ae){var e=ms;ms<<=1,(ms&3932160)===0&&(ms=262144),Bt=e}else Bt=536870912;return e=zt.current,e!==null&&(e.flags|=32),Bt}function Nt(e,t,r){(e===He&&(ze===2||ze===9)||e.cancelPendingCommit!==null)&&(Ea(e,0),ar(e,De,Bt,!1)),Ja(e,r),((Re&2)===0||e!==He)&&(e===He&&((Re&2)===0&&(Br|=r),Ke===4&&ar(e,De,Bt,!1)),fn(e))}function Xp(e,t,r){if((Re&6)!==0)throw Error(o(327));var i=!r&&(t&127)===0&&(t&e.expiredLanes)===0||Qa(e,t),c=i?AS(e,t):mu(e,t,!0),d=i;do{if(c===0){Sa&&!i&&ar(e,t,0,!1);break}else{if(r=e.current.alternate,d&&!DS(r)){c=mu(e,t,!1),d=!1;continue}if(c===2){if(d=t,e.errorRecoveryDisabledLanes&d)var y=0;else y=e.pendingLanes&-536870913,y=y!==0?y:y&536870912?536870912:0;if(y!==0){t=y;e:{var w=e;c=Ai;var A=w.current.memoizedState.isDehydrated;if(A&&(Ea(w,y).flags|=256),y=mu(w,y,!1),y!==2){if(ou&&!A){w.errorRecoveryDisabledLanes|=d,Br|=d,c=4;break e}d=Dt,Dt=c,d!==null&&(Dt===null?Dt=d:Dt.push.apply(Dt,d))}c=y}if(d=!1,c!==2)continue}}if(c===1){Ea(e,0),ar(e,t,0,!0);break}e:{switch(i=e,d=c,d){case 0:case 1:throw Error(o(345));case 4:if((t&4194048)!==t)break;case 6:ar(i,t,Bt,!er);break e;case 2:Dt=null;break;case 3:case 5:break;default:throw Error(o(329))}if((t&62914560)===t&&(c=ao+300-At(),10<c)){if(ar(i,t,Bt,!er),gs(i,0,!0)!==0)break e;Vn=t,i.timeoutHandle=jg($p.bind(null,i,r,Dt,so,cu,t,Bt,Br,wa,er,d,"Throttled",-0,0),c);break e}$p(i,r,Dt,so,cu,t,Bt,Br,wa,er,d,null,-0,0)}}break}while(!0);fn(e)}function $p(e,t,r,i,c,d,y,w,A,G,Z,ee,F,X){if(e.timeoutHandle=-1,ee=t.subtreeFlags,ee&8192||(ee&16785408)===16785408){ee={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Sn},Up(t,d,ee);var ce=(d&62914560)===d?ao-At():(d&4194048)===d?Gp-At():0;if(ce=dw(ee,ce),ce!==null){Vn=d,e.cancelPendingCommit=ce(tg.bind(null,e,t,d,r,i,c,y,w,A,Z,ee,null,F,X)),ar(e,d,y,!G);return}}tg(e,t,d,r,i,c,y,w,A)}function DS(e){for(var t=e;;){var r=t.tag;if((r===0||r===11||r===15)&&t.flags&16384&&(r=t.updateQueue,r!==null&&(r=r.stores,r!==null)))for(var i=0;i<r.length;i++){var c=r[i],d=c.getSnapshot;c=c.value;try{if(!Rt(d(),c))return!1}catch{return!1}}if(r=t.child,t.subtreeFlags&16384&&r!==null)r.return=t,t=r;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function ar(e,t,r,i){t&=~lu,t&=~Br,e.suspendedLanes|=t,e.pingedLanes&=~t,i&&(e.warmLanes|=t),i=e.expirationTimes;for(var c=t;0<c;){var d=31-kt(c),y=1<<d;i[d]=-1,c&=~y}r!==0&&rh(e,r,t)}function oo(){return(Re&6)===0?(ki(0),!1):!0}function hu(){if(Ee!==null){if(ze===0)var e=Ee.return;else e=Ee,Tn=Nr=null,Ac(e),ma=null,hi=0,e=Ee;for(;e!==null;)Ep(e.alternate,e),e=e.return;Ee=null}}function Ea(e,t){var r=e.timeoutHandle;r!==-1&&(e.timeoutHandle=-1,$S(r)),r=e.cancelPendingCommit,r!==null&&(e.cancelPendingCommit=null,r()),Vn=0,hu(),He=e,Ee=r=jn(e.current,null),De=t,ze=0,Vt=null,er=!1,Sa=Qa(e,t),ou=!1,wa=Bt=lu=Br=tr=Ke=0,Dt=Ai=null,cu=!1,(t&8)!==0&&(t|=t&32);var i=e.entangledLanes;if(i!==0)for(e=e.entanglements,i&=t;0<i;){var c=31-kt(i),d=1<<c;t|=e[c],i&=~d}return _n=t,Ns(),r}function Kp(e,t){we=null,H.H=Si,t===ha||t===Vs?(t=um(),ze=3):t===yc?(t=um(),ze=4):ze=t===Fc?8:t!==null&&typeof t=="object"&&typeof t.then=="function"?6:1,Vt=t,Ee===null&&(Ke=1,Qs(e,Pt(t,e.current)))}function Zp(){var e=zt.current;return e===null?!0:(De&4194048)===De?Kt===null:(De&62914560)===De||(De&536870912)!==0?e===Kt:!1}function Qp(){var e=H.H;return H.H=Si,e===null?Si:e}function Jp(){var e=H.A;return H.A=TS,e}function lo(){Ke=4,er||(De&4194048)!==De&&zt.current!==null||(Sa=!0),(tr&134217727)===0&&(Br&134217727)===0||He===null||ar(He,De,Bt,!1)}function mu(e,t,r){var i=Re;Re|=2;var c=Qp(),d=Jp();(He!==e||De!==t)&&(so=null,Ea(e,t)),t=!1;var y=Ke;e:do try{if(ze!==0&&Ee!==null){var w=Ee,A=Vt;switch(ze){case 8:hu(),y=6;break e;case 3:case 2:case 9:case 6:zt.current===null&&(t=!0);var G=ze;if(ze=0,Vt=null,Ta(e,w,A,G),r&&Sa){y=0;break e}break;default:G=ze,ze=0,Vt=null,Ta(e,w,A,G)}}NS(),y=Ke;break}catch(Z){Kp(e,Z)}while(!0);return t&&e.shellSuspendCounter++,Tn=Nr=null,Re=i,H.H=c,H.A=d,Ee===null&&(He=null,De=0,Ns()),y}function NS(){for(;Ee!==null;)Wp(Ee)}function AS(e,t){var r=Re;Re|=2;var i=Qp(),c=Jp();He!==e||De!==t?(so=null,io=At()+500,Ea(e,t)):Sa=Qa(e,t);e:do try{if(ze!==0&&Ee!==null){t=Ee;var d=Vt;t:switch(ze){case 1:ze=0,Vt=null,Ta(e,t,d,1);break;case 2:case 9:if(lm(d)){ze=0,Vt=null,Ip(t);break}t=function(){ze!==2&&ze!==9||He!==e||(ze=7),fn(e)},d.then(t,t);break e;case 3:ze=7;break e;case 4:ze=5;break e;case 7:lm(d)?(ze=0,Vt=null,Ip(t)):(ze=0,Vt=null,Ta(e,t,d,7));break;case 5:var y=null;switch(Ee.tag){case 26:y=Ee.memoizedState;case 5:case 27:var w=Ee;if(y?Lg(y):w.stateNode.complete){ze=0,Vt=null;var A=w.sibling;if(A!==null)Ee=A;else{var G=w.return;G!==null?(Ee=G,co(G)):Ee=null}break t}}ze=0,Vt=null,Ta(e,t,d,5);break;case 6:ze=0,Vt=null,Ta(e,t,d,6);break;case 8:hu(),Ke=6;break e;default:throw Error(o(462))}}MS();break}catch(Z){Kp(e,Z)}while(!0);return Tn=Nr=null,H.H=i,H.A=c,Re=r,Ee!==null?0:(He=null,De=0,Ns(),Ke)}function MS(){for(;Ee!==null&&!I0();)Wp(Ee)}function Wp(e){var t=wp(e.alternate,e,_n);e.memoizedProps=e.pendingProps,t===null?co(e):Ee=t}function Ip(e){var t=e,r=t.alternate;switch(t.tag){case 15:case 0:t=gp(r,t,t.pendingProps,t.type,void 0,De);break;case 11:t=gp(r,t,t.pendingProps,t.type.render,t.ref,De);break;case 5:Ac(t);default:Ep(r,t),t=Ee=Jh(t,_n),t=wp(r,t,_n)}e.memoizedProps=e.pendingProps,t===null?co(e):Ee=t}function Ta(e,t,r,i){Tn=Nr=null,Ac(t),ma=null,hi=0;var c=t.return;try{if(vS(e,c,t,r,De)){Ke=1,Qs(e,Pt(r,e.current)),Ee=null;return}}catch(d){if(c!==null)throw Ee=c,d;Ke=1,Qs(e,Pt(r,e.current)),Ee=null;return}t.flags&32768?(Ae||i===1?e=!0:Sa||(De&536870912)!==0?e=!1:(er=e=!0,(i===2||i===9||i===3||i===6)&&(i=zt.current,i!==null&&i.tag===13&&(i.flags|=16384))),eg(t,e)):co(t)}function co(e){var t=e;do{if((t.flags&32768)!==0){eg(t,er);return}e=t.return;var r=SS(t.alternate,t,_n);if(r!==null){Ee=r;return}if(t=t.sibling,t!==null){Ee=t;return}Ee=t=e}while(t!==null);Ke===0&&(Ke=5)}function eg(e,t){do{var r=wS(e.alternate,e);if(r!==null){r.flags&=32767,Ee=r;return}if(r=e.return,r!==null&&(r.flags|=32768,r.subtreeFlags=0,r.deletions=null),!t&&(e=e.sibling,e!==null)){Ee=e;return}Ee=e=r}while(e!==null);Ke=6,Ee=null}function tg(e,t,r,i,c,d,y,w,A){e.cancelPendingCommit=null;do uo();while(at!==0);if((Re&6)!==0)throw Error(o(327));if(t!==null){if(t===e.current)throw Error(o(177));if(d=t.lanes|t.childLanes,d|=nc,c1(e,r,d,y,w,A),e===He&&(Ee=He=null,De=0),ja=t,rr=e,Vn=r,uu=d,du=c,Pp=i,(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,zS(fs,function(){return sg(),null})):(e.callbackNode=null,e.callbackPriority=0),i=(t.flags&13878)!==0,(t.subtreeFlags&13878)!==0||i){i=H.T,H.T=null,c=se.p,se.p=2,y=Re,Re|=4;try{jS(e,t,r)}finally{Re=y,se.p=c,H.T=i}}at=1,ng(),rg(),ag()}}function ng(){if(at===1){at=0;var e=rr,t=ja,r=(t.flags&13878)!==0;if((t.subtreeFlags&13878)!==0||r){r=H.T,H.T=null;var i=se.p;se.p=2;var c=Re;Re|=4;try{Vp(t,e);var d=Cu,y=Yh(e.containerInfo),w=d.focusedElem,A=d.selectionRange;if(y!==w&&w&&w.ownerDocument&&qh(w.ownerDocument.documentElement,w)){if(A!==null&&Jl(w)){var G=A.start,Z=A.end;if(Z===void 0&&(Z=G),"selectionStart"in w)w.selectionStart=G,w.selectionEnd=Math.min(Z,w.value.length);else{var ee=w.ownerDocument||document,F=ee&&ee.defaultView||window;if(F.getSelection){var X=F.getSelection(),ce=w.textContent.length,xe=Math.min(A.start,ce),Le=A.end===void 0?xe:Math.min(A.end,ce);!X.extend&&xe>Le&&(y=Le,Le=xe,xe=y);var L=Hh(w,xe),z=Hh(w,Le);if(L&&z&&(X.rangeCount!==1||X.anchorNode!==L.node||X.anchorOffset!==L.offset||X.focusNode!==z.node||X.focusOffset!==z.offset)){var Y=ee.createRange();Y.setStart(L.node,L.offset),X.removeAllRanges(),xe>Le?(X.addRange(Y),X.extend(z.node,z.offset)):(Y.setEnd(z.node,z.offset),X.addRange(Y))}}}}for(ee=[],X=w;X=X.parentNode;)X.nodeType===1&&ee.push({element:X,left:X.scrollLeft,top:X.scrollTop});for(typeof w.focus=="function"&&w.focus(),w=0;w<ee.length;w++){var W=ee[w];W.element.scrollLeft=W.left,W.element.scrollTop=W.top}}jo=!!Tu,Cu=Tu=null}finally{Re=c,se.p=i,H.T=r}}e.current=t,at=2}}function rg(){if(at===2){at=0;var e=rr,t=ja,r=(t.flags&8772)!==0;if((t.subtreeFlags&8772)!==0||r){r=H.T,H.T=null;var i=se.p;se.p=2;var c=Re;Re|=4;try{kp(e,t.alternate,t)}finally{Re=c,se.p=i,H.T=r}}at=3}}function ag(){if(at===4||at===3){at=0,e1();var e=rr,t=ja,r=Vn,i=Pp;(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?at=5:(at=0,ja=rr=null,ig(e,e.pendingLanes));var c=e.pendingLanes;if(c===0&&(nr=null),Rl(r),t=t.stateNode,Mt&&typeof Mt.onCommitFiberRoot=="function")try{Mt.onCommitFiberRoot(Za,t,void 0,(t.current.flags&128)===128)}catch{}if(i!==null){t=H.T,c=se.p,se.p=2,H.T=null;try{for(var d=e.onRecoverableError,y=0;y<i.length;y++){var w=i[y];d(w.value,{componentStack:w.stack})}}finally{H.T=t,se.p=c}}(Vn&3)!==0&&uo(),fn(e),c=e.pendingLanes,(r&261930)!==0&&(c&42)!==0?e===fu?Mi++:(Mi=0,fu=e):Mi=0,ki(0)}}function ig(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,di(t)))}function uo(){return ng(),rg(),ag(),sg()}function sg(){if(at!==5)return!1;var e=rr,t=uu;uu=0;var r=Rl(Vn),i=H.T,c=se.p;try{se.p=32>r?32:r,H.T=null,r=du,du=null;var d=rr,y=Vn;if(at=0,ja=rr=null,Vn=0,(Re&6)!==0)throw Error(o(331));var w=Re;if(Re|=4,qp(d.current),Lp(d,d.current,y,r),Re=w,ki(0,!1),Mt&&typeof Mt.onPostCommitFiberRoot=="function")try{Mt.onPostCommitFiberRoot(Za,d)}catch{}return!0}finally{se.p=c,H.T=i,ig(e,t)}}function og(e,t,r){t=Pt(r,t),t=Pc(e.stateNode,t,2),e=Qn(e,t,2),e!==null&&(Ja(e,2),fn(e))}function _e(e,t,r){if(e.tag===3)og(e,e,r);else for(;t!==null;){if(t.tag===3){og(t,e,r);break}else if(t.tag===1){var i=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(nr===null||!nr.has(i))){e=Pt(r,e),r=lp(2),i=Qn(t,r,2),i!==null&&(cp(r,i,t,e),Ja(i,2),fn(i));break}}t=t.return}}function pu(e,t,r){var i=e.pingCache;if(i===null){i=e.pingCache=new CS;var c=new Set;i.set(t,c)}else c=i.get(t),c===void 0&&(c=new Set,i.set(t,c));c.has(r)||(ou=!0,c.add(r),e=kS.bind(null,e,t,r),t.then(e,e))}function kS(e,t,r){var i=e.pingCache;i!==null&&i.delete(t),e.pingedLanes|=e.suspendedLanes&r,e.warmLanes&=~r,He===e&&(De&r)===r&&(Ke===4||Ke===3&&(De&62914560)===De&&300>At()-ao?(Re&2)===0&&Ea(e,0):lu|=r,wa===De&&(wa=0)),fn(e)}function lg(e,t){t===0&&(t=nh()),e=Tr(e,t),e!==null&&(Ja(e,t),fn(e))}function RS(e){var t=e.memoizedState,r=0;t!==null&&(r=t.retryLane),lg(e,r)}function OS(e,t){var r=0;switch(e.tag){case 31:case 13:var i=e.stateNode,c=e.memoizedState;c!==null&&(r=c.retryLane);break;case 19:i=e.stateNode;break;case 22:i=e.stateNode._retryCache;break;default:throw Error(o(314))}i!==null&&i.delete(t),lg(e,r)}function zS(e,t){return Nl(e,t)}var fo=null,Ca=null,gu=!1,ho=!1,yu=!1,ir=0;function fn(e){e!==Ca&&e.next===null&&(Ca===null?fo=Ca=e:Ca=Ca.next=e),ho=!0,gu||(gu=!0,VS())}function ki(e,t){if(!yu&&ho){yu=!0;do for(var r=!1,i=fo;i!==null;){if(e!==0){var c=i.pendingLanes;if(c===0)var d=0;else{var y=i.suspendedLanes,w=i.pingedLanes;d=(1<<31-kt(42|e)+1)-1,d&=c&~(y&~w),d=d&201326741?d&201326741|1:d?d|2:0}d!==0&&(r=!0,fg(i,d))}else d=De,d=gs(i,i===He?d:0,i.cancelPendingCommit!==null||i.timeoutHandle!==-1),(d&3)===0||Qa(i,d)||(r=!0,fg(i,d));i=i.next}while(r);yu=!1}}function _S(){cg()}function cg(){ho=gu=!1;var e=0;ir!==0&&XS()&&(e=ir);for(var t=At(),r=null,i=fo;i!==null;){var c=i.next,d=ug(i,t);d===0?(i.next=null,r===null?fo=c:r.next=c,c===null&&(Ca=r)):(r=i,(e!==0||(d&3)!==0)&&(ho=!0)),i=c}at!==0&&at!==5||ki(e),ir!==0&&(ir=0)}function ug(e,t){for(var r=e.suspendedLanes,i=e.pingedLanes,c=e.expirationTimes,d=e.pendingLanes&-62914561;0<d;){var y=31-kt(d),w=1<<y,A=c[y];A===-1?((w&r)===0||(w&i)!==0)&&(c[y]=l1(w,t)):A<=t&&(e.expiredLanes|=w),d&=~w}if(t=He,r=De,r=gs(e,e===t?r:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),i=e.callbackNode,r===0||e===t&&(ze===2||ze===9)||e.cancelPendingCommit!==null)return i!==null&&i!==null&&Al(i),e.callbackNode=null,e.callbackPriority=0;if((r&3)===0||Qa(e,r)){if(t=r&-r,t===e.callbackPriority)return t;switch(i!==null&&Al(i),Rl(r)){case 2:case 8:r=eh;break;case 32:r=fs;break;case 268435456:r=th;break;default:r=fs}return i=dg.bind(null,e),r=Nl(r,i),e.callbackPriority=t,e.callbackNode=r,t}return i!==null&&i!==null&&Al(i),e.callbackPriority=2,e.callbackNode=null,2}function dg(e,t){if(at!==0&&at!==5)return e.callbackNode=null,e.callbackPriority=0,null;var r=e.callbackNode;if(uo()&&e.callbackNode!==r)return null;var i=De;return i=gs(e,e===He?i:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),i===0?null:(Xp(e,i,t),ug(e,At()),e.callbackNode!=null&&e.callbackNode===r?dg.bind(null,e):null)}function fg(e,t){if(uo())return null;Xp(e,t,!0)}function VS(){KS(function(){(Re&6)!==0?Nl(If,_S):cg()})}function vu(){if(ir===0){var e=da;e===0&&(e=hs,hs<<=1,(hs&261888)===0&&(hs=256)),ir=e}return ir}function hg(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:bs(""+e)}function mg(e,t){var r=t.ownerDocument.createElement("input");return r.name=t.name,r.value=t.value,e.id&&r.setAttribute("form",e.id),t.parentNode.insertBefore(r,t),e=new FormData(e),r.parentNode.removeChild(r),e}function BS(e,t,r,i,c){if(t==="submit"&&r&&r.stateNode===c){var d=hg((c[wt]||null).action),y=i.submitter;y&&(t=(t=y[wt]||null)?hg(t.formAction):y.getAttribute("formAction"),t!==null&&(d=t,y=null));var w=new Es("action","action",null,i,c);e.push({event:w,listeners:[{instance:null,listener:function(){if(i.defaultPrevented){if(ir!==0){var A=y?mg(c,y):new FormData(c);Lc(r,{pending:!0,data:A,method:c.method,action:d},null,A)}}else typeof d=="function"&&(w.preventDefault(),A=y?mg(c,y):new FormData(c),Lc(r,{pending:!0,data:A,method:c.method,action:d},d,A))},currentTarget:c}]})}}for(var xu=0;xu<tc.length;xu++){var bu=tc[xu],LS=bu.toLowerCase(),US=bu[0].toUpperCase()+bu.slice(1);tn(LS,"on"+US)}tn(Fh,"onAnimationEnd"),tn(Xh,"onAnimationIteration"),tn($h,"onAnimationStart"),tn("dblclick","onDoubleClick"),tn("focusin","onFocus"),tn("focusout","onBlur"),tn(tS,"onTransitionRun"),tn(nS,"onTransitionStart"),tn(rS,"onTransitionCancel"),tn(Kh,"onTransitionEnd"),Jr("onMouseEnter",["mouseout","mouseover"]),Jr("onMouseLeave",["mouseout","mouseover"]),Jr("onPointerEnter",["pointerout","pointerover"]),Jr("onPointerLeave",["pointerout","pointerover"]),Sr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),Sr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),Sr("onBeforeInput",["compositionend","keypress","textInput","paste"]),Sr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),Sr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),Sr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Ri="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),HS=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Ri));function pg(e,t){t=(t&4)!==0;for(var r=0;r<e.length;r++){var i=e[r],c=i.event;i=i.listeners;e:{var d=void 0;if(t)for(var y=i.length-1;0<=y;y--){var w=i[y],A=w.instance,G=w.currentTarget;if(w=w.listener,A!==d&&c.isPropagationStopped())break e;d=w,c.currentTarget=G;try{d(c)}catch(Z){Ds(Z)}c.currentTarget=null,d=A}else for(y=0;y<i.length;y++){if(w=i[y],A=w.instance,G=w.currentTarget,w=w.listener,A!==d&&c.isPropagationStopped())break e;d=w,c.currentTarget=G;try{d(c)}catch(Z){Ds(Z)}c.currentTarget=null,d=A}}}}function Te(e,t){var r=t[Ol];r===void 0&&(r=t[Ol]=new Set);var i=e+"__bubble";r.has(i)||(gg(t,e,2,!1),r.add(i))}function Su(e,t,r){var i=0;t&&(i|=4),gg(r,e,i,t)}var mo="_reactListening"+Math.random().toString(36).slice(2);function wu(e){if(!e[mo]){e[mo]=!0,ch.forEach(function(r){r!=="selectionchange"&&(HS.has(r)||Su(r,!1,e),Su(r,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[mo]||(t[mo]=!0,Su("selectionchange",!1,t))}}function gg(e,t,r,i){switch(Fg(t)){case 2:var c=mw;break;case 8:c=pw;break;default:c=Bu}r=c.bind(null,t,r,e),c=void 0,!Yl||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(c=!0),i?c!==void 0?e.addEventListener(t,r,{capture:!0,passive:c}):e.addEventListener(t,r,!0):c!==void 0?e.addEventListener(t,r,{passive:c}):e.addEventListener(t,r,!1)}function ju(e,t,r,i,c){var d=i;if((t&1)===0&&(t&2)===0&&i!==null)e:for(;;){if(i===null)return;var y=i.tag;if(y===3||y===4){var w=i.stateNode.containerInfo;if(w===c)break;if(y===4)for(y=i.return;y!==null;){var A=y.tag;if((A===3||A===4)&&y.stateNode.containerInfo===c)return;y=y.return}for(;w!==null;){if(y=Kr(w),y===null)return;if(A=y.tag,A===5||A===6||A===26||A===27){i=d=y;continue e}w=w.parentNode}}i=i.return}Sh(function(){var G=d,Z=Hl(r),ee=[];e:{var F=Zh.get(e);if(F!==void 0){var X=Es,ce=e;switch(e){case"keypress":if(ws(r)===0)break e;case"keydown":case"keyup":X=O1;break;case"focusin":ce="focus",X=Xl;break;case"focusout":ce="blur",X=Xl;break;case"beforeblur":case"afterblur":X=Xl;break;case"click":if(r.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":X=Eh;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":X=S1;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":X=V1;break;case Fh:case Xh:case $h:X=E1;break;case Kh:X=L1;break;case"scroll":case"scrollend":X=x1;break;case"wheel":X=H1;break;case"copy":case"cut":case"paste":X=C1;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":X=Ch;break;case"toggle":case"beforetoggle":X=Y1}var xe=(t&4)!==0,Le=!xe&&(e==="scroll"||e==="scrollend"),L=xe?F!==null?F+"Capture":null:F;xe=[];for(var z=G,Y;z!==null;){var W=z;if(Y=W.stateNode,W=W.tag,W!==5&&W!==26&&W!==27||Y===null||L===null||(W=ei(z,L),W!=null&&xe.push(Oi(z,W,Y))),Le)break;z=z.return}0<xe.length&&(F=new X(F,ce,null,r,Z),ee.push({event:F,listeners:xe}))}}if((t&7)===0){e:{if(F=e==="mouseover"||e==="pointerover",X=e==="mouseout"||e==="pointerout",F&&r!==Ul&&(ce=r.relatedTarget||r.fromElement)&&(Kr(ce)||ce[$r]))break e;if((X||F)&&(F=Z.window===Z?Z:(F=Z.ownerDocument)?F.defaultView||F.parentWindow:window,X?(ce=r.relatedTarget||r.toElement,X=G,ce=ce?Kr(ce):null,ce!==null&&(Le=h(ce),xe=ce.tag,ce!==Le||xe!==5&&xe!==27&&xe!==6)&&(ce=null)):(X=null,ce=G),X!==ce)){if(xe=Eh,W="onMouseLeave",L="onMouseEnter",z="mouse",(e==="pointerout"||e==="pointerover")&&(xe=Ch,W="onPointerLeave",L="onPointerEnter",z="pointer"),Le=X==null?F:Ia(X),Y=ce==null?F:Ia(ce),F=new xe(W,z+"leave",X,r,Z),F.target=Le,F.relatedTarget=Y,W=null,Kr(Z)===G&&(xe=new xe(L,z+"enter",ce,r,Z),xe.target=Y,xe.relatedTarget=Le,W=xe),Le=W,X&&ce)t:{for(xe=qS,L=X,z=ce,Y=0,W=L;W;W=xe(W))Y++;W=0;for(var ge=z;ge;ge=xe(ge))W++;for(;0<Y-W;)L=xe(L),Y--;for(;0<W-Y;)z=xe(z),W--;for(;Y--;){if(L===z||z!==null&&L===z.alternate){xe=L;break t}L=xe(L),z=xe(z)}xe=null}else xe=null;X!==null&&yg(ee,F,X,xe,!1),ce!==null&&Le!==null&&yg(ee,Le,ce,xe,!0)}}e:{if(F=G?Ia(G):window,X=F.nodeName&&F.nodeName.toLowerCase(),X==="select"||X==="input"&&F.type==="file")var Me=zh;else if(Rh(F))if(_h)Me=W1;else{Me=Q1;var me=Z1}else X=F.nodeName,!X||X.toLowerCase()!=="input"||F.type!=="checkbox"&&F.type!=="radio"?G&&Ll(G.elementType)&&(Me=zh):Me=J1;if(Me&&(Me=Me(e,G))){Oh(ee,Me,r,Z);break e}me&&me(e,F,G),e==="focusout"&&G&&F.type==="number"&&G.memoizedProps.value!=null&&Bl(F,"number",F.value)}switch(me=G?Ia(G):window,e){case"focusin":(Rh(me)||me.contentEditable==="true")&&(ra=me,Wl=G,li=null);break;case"focusout":li=Wl=ra=null;break;case"mousedown":Il=!0;break;case"contextmenu":case"mouseup":case"dragend":Il=!1,Gh(ee,r,Z);break;case"selectionchange":if(eS)break;case"keydown":case"keyup":Gh(ee,r,Z)}var je;if(Kl)e:{switch(e){case"compositionstart":var Ne="onCompositionStart";break e;case"compositionend":Ne="onCompositionEnd";break e;case"compositionupdate":Ne="onCompositionUpdate";break e}Ne=void 0}else na?Mh(e,r)&&(Ne="onCompositionEnd"):e==="keydown"&&r.keyCode===229&&(Ne="onCompositionStart");Ne&&(Dh&&r.locale!=="ko"&&(na||Ne!=="onCompositionStart"?Ne==="onCompositionEnd"&&na&&(je=wh()):(Gn=Z,Gl="value"in Gn?Gn.value:Gn.textContent,na=!0)),me=po(G,Ne),0<me.length&&(Ne=new Th(Ne,e,null,r,Z),ee.push({event:Ne,listeners:me}),je?Ne.data=je:(je=kh(r),je!==null&&(Ne.data=je)))),(je=P1?F1(e,r):X1(e,r))&&(Ne=po(G,"onBeforeInput"),0<Ne.length&&(me=new Th("onBeforeInput","beforeinput",null,r,Z),ee.push({event:me,listeners:Ne}),me.data=je)),BS(ee,e,G,r,Z)}pg(ee,t)})}function Oi(e,t,r){return{instance:e,listener:t,currentTarget:r}}function po(e,t){for(var r=t+"Capture",i=[];e!==null;){var c=e,d=c.stateNode;if(c=c.tag,c!==5&&c!==26&&c!==27||d===null||(c=ei(e,r),c!=null&&i.unshift(Oi(e,c,d)),c=ei(e,t),c!=null&&i.push(Oi(e,c,d))),e.tag===3)return i;e=e.return}return[]}function qS(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function yg(e,t,r,i,c){for(var d=t._reactName,y=[];r!==null&&r!==i;){var w=r,A=w.alternate,G=w.stateNode;if(w=w.tag,A!==null&&A===i)break;w!==5&&w!==26&&w!==27||G===null||(A=G,c?(G=ei(r,d),G!=null&&y.unshift(Oi(r,G,A))):c||(G=ei(r,d),G!=null&&y.push(Oi(r,G,A)))),r=r.return}y.length!==0&&e.push({event:t,listeners:y})}var YS=/\r\n?/g,GS=/\u0000|\uFFFD/g;function vg(e){return(typeof e=="string"?e:""+e).replace(YS,`
`).replace(GS,"")}function xg(e,t){return t=vg(t),vg(e)===t}function Be(e,t,r,i,c,d){switch(r){case"children":typeof i=="string"?t==="body"||t==="textarea"&&i===""||Ir(e,i):(typeof i=="number"||typeof i=="bigint")&&t!=="body"&&Ir(e,""+i);break;case"className":vs(e,"class",i);break;case"tabIndex":vs(e,"tabindex",i);break;case"dir":case"role":case"viewBox":case"width":case"height":vs(e,r,i);break;case"style":xh(e,i,d);break;case"data":if(t!=="object"){vs(e,"data",i);break}case"src":case"href":if(i===""&&(t!=="a"||r!=="href")){e.removeAttribute(r);break}if(i==null||typeof i=="function"||typeof i=="symbol"||typeof i=="boolean"){e.removeAttribute(r);break}i=bs(""+i),e.setAttribute(r,i);break;case"action":case"formAction":if(typeof i=="function"){e.setAttribute(r,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof d=="function"&&(r==="formAction"?(t!=="input"&&Be(e,t,"name",c.name,c,null),Be(e,t,"formEncType",c.formEncType,c,null),Be(e,t,"formMethod",c.formMethod,c,null),Be(e,t,"formTarget",c.formTarget,c,null)):(Be(e,t,"encType",c.encType,c,null),Be(e,t,"method",c.method,c,null),Be(e,t,"target",c.target,c,null)));if(i==null||typeof i=="symbol"||typeof i=="boolean"){e.removeAttribute(r);break}i=bs(""+i),e.setAttribute(r,i);break;case"onClick":i!=null&&(e.onclick=Sn);break;case"onScroll":i!=null&&Te("scroll",e);break;case"onScrollEnd":i!=null&&Te("scrollend",e);break;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(o(61));if(r=i.__html,r!=null){if(c.children!=null)throw Error(o(60));e.innerHTML=r}}break;case"multiple":e.multiple=i&&typeof i!="function"&&typeof i!="symbol";break;case"muted":e.muted=i&&typeof i!="function"&&typeof i!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(i==null||typeof i=="function"||typeof i=="boolean"||typeof i=="symbol"){e.removeAttribute("xlink:href");break}r=bs(""+i),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",r);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":i!=null&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(r,""+i):e.removeAttribute(r);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":i&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(r,""):e.removeAttribute(r);break;case"capture":case"download":i===!0?e.setAttribute(r,""):i!==!1&&i!=null&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(r,i):e.removeAttribute(r);break;case"cols":case"rows":case"size":case"span":i!=null&&typeof i!="function"&&typeof i!="symbol"&&!isNaN(i)&&1<=i?e.setAttribute(r,i):e.removeAttribute(r);break;case"rowSpan":case"start":i==null||typeof i=="function"||typeof i=="symbol"||isNaN(i)?e.removeAttribute(r):e.setAttribute(r,i);break;case"popover":Te("beforetoggle",e),Te("toggle",e),ys(e,"popover",i);break;case"xlinkActuate":bn(e,"http://www.w3.org/1999/xlink","xlink:actuate",i);break;case"xlinkArcrole":bn(e,"http://www.w3.org/1999/xlink","xlink:arcrole",i);break;case"xlinkRole":bn(e,"http://www.w3.org/1999/xlink","xlink:role",i);break;case"xlinkShow":bn(e,"http://www.w3.org/1999/xlink","xlink:show",i);break;case"xlinkTitle":bn(e,"http://www.w3.org/1999/xlink","xlink:title",i);break;case"xlinkType":bn(e,"http://www.w3.org/1999/xlink","xlink:type",i);break;case"xmlBase":bn(e,"http://www.w3.org/XML/1998/namespace","xml:base",i);break;case"xmlLang":bn(e,"http://www.w3.org/XML/1998/namespace","xml:lang",i);break;case"xmlSpace":bn(e,"http://www.w3.org/XML/1998/namespace","xml:space",i);break;case"is":ys(e,"is",i);break;case"innerText":case"textContent":break;default:(!(2<r.length)||r[0]!=="o"&&r[0]!=="O"||r[1]!=="n"&&r[1]!=="N")&&(r=y1.get(r)||r,ys(e,r,i))}}function Eu(e,t,r,i,c,d){switch(r){case"style":xh(e,i,d);break;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(o(61));if(r=i.__html,r!=null){if(c.children!=null)throw Error(o(60));e.innerHTML=r}}break;case"children":typeof i=="string"?Ir(e,i):(typeof i=="number"||typeof i=="bigint")&&Ir(e,""+i);break;case"onScroll":i!=null&&Te("scroll",e);break;case"onScrollEnd":i!=null&&Te("scrollend",e);break;case"onClick":i!=null&&(e.onclick=Sn);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!uh.hasOwnProperty(r))e:{if(r[0]==="o"&&r[1]==="n"&&(c=r.endsWith("Capture"),t=r.slice(2,c?r.length-7:void 0),d=e[wt]||null,d=d!=null?d[r]:null,typeof d=="function"&&e.removeEventListener(t,d,c),typeof i=="function")){typeof d!="function"&&d!==null&&(r in e?e[r]=null:e.hasAttribute(r)&&e.removeAttribute(r)),e.addEventListener(t,i,c);break e}r in e?e[r]=i:i===!0?e.setAttribute(r,""):ys(e,r,i)}}}function ht(e,t,r){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":Te("error",e),Te("load",e);var i=!1,c=!1,d;for(d in r)if(r.hasOwnProperty(d)){var y=r[d];if(y!=null)switch(d){case"src":i=!0;break;case"srcSet":c=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(o(137,t));default:Be(e,t,d,y,r,null)}}c&&Be(e,t,"srcSet",r.srcSet,r,null),i&&Be(e,t,"src",r.src,r,null);return;case"input":Te("invalid",e);var w=d=y=c=null,A=null,G=null;for(i in r)if(r.hasOwnProperty(i)){var Z=r[i];if(Z!=null)switch(i){case"name":c=Z;break;case"type":y=Z;break;case"checked":A=Z;break;case"defaultChecked":G=Z;break;case"value":d=Z;break;case"defaultValue":w=Z;break;case"children":case"dangerouslySetInnerHTML":if(Z!=null)throw Error(o(137,t));break;default:Be(e,t,i,Z,r,null)}}ph(e,d,w,A,G,y,c,!1);return;case"select":Te("invalid",e),i=y=d=null;for(c in r)if(r.hasOwnProperty(c)&&(w=r[c],w!=null))switch(c){case"value":d=w;break;case"defaultValue":y=w;break;case"multiple":i=w;default:Be(e,t,c,w,r,null)}t=d,r=y,e.multiple=!!i,t!=null?Wr(e,!!i,t,!1):r!=null&&Wr(e,!!i,r,!0);return;case"textarea":Te("invalid",e),d=c=i=null;for(y in r)if(r.hasOwnProperty(y)&&(w=r[y],w!=null))switch(y){case"value":i=w;break;case"defaultValue":c=w;break;case"children":d=w;break;case"dangerouslySetInnerHTML":if(w!=null)throw Error(o(91));break;default:Be(e,t,y,w,r,null)}yh(e,i,c,d);return;case"option":for(A in r)if(r.hasOwnProperty(A)&&(i=r[A],i!=null))switch(A){case"selected":e.selected=i&&typeof i!="function"&&typeof i!="symbol";break;default:Be(e,t,A,i,r,null)}return;case"dialog":Te("beforetoggle",e),Te("toggle",e),Te("cancel",e),Te("close",e);break;case"iframe":case"object":Te("load",e);break;case"video":case"audio":for(i=0;i<Ri.length;i++)Te(Ri[i],e);break;case"image":Te("error",e),Te("load",e);break;case"details":Te("toggle",e);break;case"embed":case"source":case"link":Te("error",e),Te("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(G in r)if(r.hasOwnProperty(G)&&(i=r[G],i!=null))switch(G){case"children":case"dangerouslySetInnerHTML":throw Error(o(137,t));default:Be(e,t,G,i,r,null)}return;default:if(Ll(t)){for(Z in r)r.hasOwnProperty(Z)&&(i=r[Z],i!==void 0&&Eu(e,t,Z,i,r,void 0));return}}for(w in r)r.hasOwnProperty(w)&&(i=r[w],i!=null&&Be(e,t,w,i,r,null))}function PS(e,t,r,i){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var c=null,d=null,y=null,w=null,A=null,G=null,Z=null;for(X in r){var ee=r[X];if(r.hasOwnProperty(X)&&ee!=null)switch(X){case"checked":break;case"value":break;case"defaultValue":A=ee;default:i.hasOwnProperty(X)||Be(e,t,X,null,i,ee)}}for(var F in i){var X=i[F];if(ee=r[F],i.hasOwnProperty(F)&&(X!=null||ee!=null))switch(F){case"type":d=X;break;case"name":c=X;break;case"checked":G=X;break;case"defaultChecked":Z=X;break;case"value":y=X;break;case"defaultValue":w=X;break;case"children":case"dangerouslySetInnerHTML":if(X!=null)throw Error(o(137,t));break;default:X!==ee&&Be(e,t,F,X,i,ee)}}Vl(e,y,w,A,G,Z,d,c);return;case"select":X=y=w=F=null;for(d in r)if(A=r[d],r.hasOwnProperty(d)&&A!=null)switch(d){case"value":break;case"multiple":X=A;default:i.hasOwnProperty(d)||Be(e,t,d,null,i,A)}for(c in i)if(d=i[c],A=r[c],i.hasOwnProperty(c)&&(d!=null||A!=null))switch(c){case"value":F=d;break;case"defaultValue":w=d;break;case"multiple":y=d;default:d!==A&&Be(e,t,c,d,i,A)}t=w,r=y,i=X,F!=null?Wr(e,!!r,F,!1):!!i!=!!r&&(t!=null?Wr(e,!!r,t,!0):Wr(e,!!r,r?[]:"",!1));return;case"textarea":X=F=null;for(w in r)if(c=r[w],r.hasOwnProperty(w)&&c!=null&&!i.hasOwnProperty(w))switch(w){case"value":break;case"children":break;default:Be(e,t,w,null,i,c)}for(y in i)if(c=i[y],d=r[y],i.hasOwnProperty(y)&&(c!=null||d!=null))switch(y){case"value":F=c;break;case"defaultValue":X=c;break;case"children":break;case"dangerouslySetInnerHTML":if(c!=null)throw Error(o(91));break;default:c!==d&&Be(e,t,y,c,i,d)}gh(e,F,X);return;case"option":for(var ce in r)if(F=r[ce],r.hasOwnProperty(ce)&&F!=null&&!i.hasOwnProperty(ce))switch(ce){case"selected":e.selected=!1;break;default:Be(e,t,ce,null,i,F)}for(A in i)if(F=i[A],X=r[A],i.hasOwnProperty(A)&&F!==X&&(F!=null||X!=null))switch(A){case"selected":e.selected=F&&typeof F!="function"&&typeof F!="symbol";break;default:Be(e,t,A,F,i,X)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var xe in r)F=r[xe],r.hasOwnProperty(xe)&&F!=null&&!i.hasOwnProperty(xe)&&Be(e,t,xe,null,i,F);for(G in i)if(F=i[G],X=r[G],i.hasOwnProperty(G)&&F!==X&&(F!=null||X!=null))switch(G){case"children":case"dangerouslySetInnerHTML":if(F!=null)throw Error(o(137,t));break;default:Be(e,t,G,F,i,X)}return;default:if(Ll(t)){for(var Le in r)F=r[Le],r.hasOwnProperty(Le)&&F!==void 0&&!i.hasOwnProperty(Le)&&Eu(e,t,Le,void 0,i,F);for(Z in i)F=i[Z],X=r[Z],!i.hasOwnProperty(Z)||F===X||F===void 0&&X===void 0||Eu(e,t,Z,F,i,X);return}}for(var L in r)F=r[L],r.hasOwnProperty(L)&&F!=null&&!i.hasOwnProperty(L)&&Be(e,t,L,null,i,F);for(ee in i)F=i[ee],X=r[ee],!i.hasOwnProperty(ee)||F===X||F==null&&X==null||Be(e,t,ee,F,i,X)}function bg(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function FS(){if(typeof performance.getEntriesByType=="function"){for(var e=0,t=0,r=performance.getEntriesByType("resource"),i=0;i<r.length;i++){var c=r[i],d=c.transferSize,y=c.initiatorType,w=c.duration;if(d&&w&&bg(y)){for(y=0,w=c.responseEnd,i+=1;i<r.length;i++){var A=r[i],G=A.startTime;if(G>w)break;var Z=A.transferSize,ee=A.initiatorType;Z&&bg(ee)&&(A=A.responseEnd,y+=Z*(A<w?1:(w-G)/(A-G)))}if(--i,t+=8*(d+y)/(c.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var Tu=null,Cu=null;function go(e){return e.nodeType===9?e:e.ownerDocument}function Sg(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function wg(e,t){if(e===0)switch(t){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&t==="foreignObject"?0:e}function Du(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.children=="bigint"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Nu=null;function XS(){var e=window.event;return e&&e.type==="popstate"?e===Nu?!1:(Nu=e,!0):(Nu=null,!1)}var jg=typeof setTimeout=="function"?setTimeout:void 0,$S=typeof clearTimeout=="function"?clearTimeout:void 0,Eg=typeof Promise=="function"?Promise:void 0,KS=typeof queueMicrotask=="function"?queueMicrotask:typeof Eg<"u"?function(e){return Eg.resolve(null).then(e).catch(ZS)}:jg;function ZS(e){setTimeout(function(){throw e})}function sr(e){return e==="head"}function Tg(e,t){var r=t,i=0;do{var c=r.nextSibling;if(e.removeChild(r),c&&c.nodeType===8)if(r=c.data,r==="/$"||r==="/&"){if(i===0){e.removeChild(c),Ma(t);return}i--}else if(r==="$"||r==="$?"||r==="$~"||r==="$!"||r==="&")i++;else if(r==="html")zi(e.ownerDocument.documentElement);else if(r==="head"){r=e.ownerDocument.head,zi(r);for(var d=r.firstChild;d;){var y=d.nextSibling,w=d.nodeName;d[Wa]||w==="SCRIPT"||w==="STYLE"||w==="LINK"&&d.rel.toLowerCase()==="stylesheet"||r.removeChild(d),d=y}}else r==="body"&&zi(e.ownerDocument.body);r=c}while(r);Ma(t)}function Cg(e,t){var r=e;e=0;do{var i=r.nextSibling;if(r.nodeType===1?t?(r._stashedDisplay=r.style.display,r.style.display="none"):(r.style.display=r._stashedDisplay||"",r.getAttribute("style")===""&&r.removeAttribute("style")):r.nodeType===3&&(t?(r._stashedText=r.nodeValue,r.nodeValue=""):r.nodeValue=r._stashedText||""),i&&i.nodeType===8)if(r=i.data,r==="/$"){if(e===0)break;e--}else r!=="$"&&r!=="$?"&&r!=="$~"&&r!=="$!"||e++;r=i}while(r)}function Au(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var r=t;switch(t=t.nextSibling,r.nodeName){case"HTML":case"HEAD":case"BODY":Au(r),zl(r);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(r.rel.toLowerCase()==="stylesheet")continue}e.removeChild(r)}}function QS(e,t,r,i){for(;e.nodeType===1;){var c=r;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!i&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(i){if(!e[Wa])switch(t){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(d=e.getAttribute("rel"),d==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(d!==c.rel||e.getAttribute("href")!==(c.href==null||c.href===""?null:c.href)||e.getAttribute("crossorigin")!==(c.crossOrigin==null?null:c.crossOrigin)||e.getAttribute("title")!==(c.title==null?null:c.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(d=e.getAttribute("src"),(d!==(c.src==null?null:c.src)||e.getAttribute("type")!==(c.type==null?null:c.type)||e.getAttribute("crossorigin")!==(c.crossOrigin==null?null:c.crossOrigin))&&d&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(t==="input"&&e.type==="hidden"){var d=c.name==null?null:""+c.name;if(c.type==="hidden"&&e.getAttribute("name")===d)return e}else return e;if(e=Zt(e.nextSibling),e===null)break}return null}function JS(e,t,r){if(t==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!r||(e=Zt(e.nextSibling),e===null))return null;return e}function Dg(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!t||(e=Zt(e.nextSibling),e===null))return null;return e}function Mu(e){return e.data==="$?"||e.data==="$~"}function ku(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function WS(e,t){var r=e.ownerDocument;if(e.data==="$~")e._reactRetry=t;else if(e.data!=="$?"||r.readyState!=="loading")t();else{var i=function(){t(),r.removeEventListener("DOMContentLoaded",i)};r.addEventListener("DOMContentLoaded",i),e._reactRetry=i}}function Zt(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?"||t==="$~"||t==="&"||t==="F!"||t==="F")break;if(t==="/$"||t==="/&")return null}}return e}var Ru=null;function Ng(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var r=e.data;if(r==="/$"||r==="/&"){if(t===0)return Zt(e.nextSibling);t--}else r!=="$"&&r!=="$!"&&r!=="$?"&&r!=="$~"&&r!=="&"||t++}e=e.nextSibling}return null}function Ag(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var r=e.data;if(r==="$"||r==="$!"||r==="$?"||r==="$~"||r==="&"){if(t===0)return e;t--}else r!=="/$"&&r!=="/&"||t++}e=e.previousSibling}return null}function Mg(e,t,r){switch(t=go(r),e){case"html":if(e=t.documentElement,!e)throw Error(o(452));return e;case"head":if(e=t.head,!e)throw Error(o(453));return e;case"body":if(e=t.body,!e)throw Error(o(454));return e;default:throw Error(o(451))}}function zi(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);zl(e)}var Qt=new Map,kg=new Set;function yo(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var Bn=se.d;se.d={f:IS,r:ew,D:tw,C:nw,L:rw,m:aw,X:sw,S:iw,M:ow};function IS(){var e=Bn.f(),t=oo();return e||t}function ew(e){var t=Zr(e);t!==null&&t.tag===5&&t.type==="form"?Km(t):Bn.r(e)}var Da=typeof document>"u"?null:document;function Rg(e,t,r){var i=Da;if(i&&typeof t=="string"&&t){var c=Yt(t);c='link[rel="'+e+'"][href="'+c+'"]',typeof r=="string"&&(c+='[crossorigin="'+r+'"]'),kg.has(c)||(kg.add(c),e={rel:e,crossOrigin:r,href:t},i.querySelector(c)===null&&(t=i.createElement("link"),ht(t,"link",e),st(t),i.head.appendChild(t)))}}function tw(e){Bn.D(e),Rg("dns-prefetch",e,null)}function nw(e,t){Bn.C(e,t),Rg("preconnect",e,t)}function rw(e,t,r){Bn.L(e,t,r);var i=Da;if(i&&e&&t){var c='link[rel="preload"][as="'+Yt(t)+'"]';t==="image"&&r&&r.imageSrcSet?(c+='[imagesrcset="'+Yt(r.imageSrcSet)+'"]',typeof r.imageSizes=="string"&&(c+='[imagesizes="'+Yt(r.imageSizes)+'"]')):c+='[href="'+Yt(e)+'"]';var d=c;switch(t){case"style":d=Na(e);break;case"script":d=Aa(e)}Qt.has(d)||(e=x({rel:"preload",href:t==="image"&&r&&r.imageSrcSet?void 0:e,as:t},r),Qt.set(d,e),i.querySelector(c)!==null||t==="style"&&i.querySelector(_i(d))||t==="script"&&i.querySelector(Vi(d))||(t=i.createElement("link"),ht(t,"link",e),st(t),i.head.appendChild(t)))}}function aw(e,t){Bn.m(e,t);var r=Da;if(r&&e){var i=t&&typeof t.as=="string"?t.as:"script",c='link[rel="modulepreload"][as="'+Yt(i)+'"][href="'+Yt(e)+'"]',d=c;switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":d=Aa(e)}if(!Qt.has(d)&&(e=x({rel:"modulepreload",href:e},t),Qt.set(d,e),r.querySelector(c)===null)){switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(r.querySelector(Vi(d)))return}i=r.createElement("link"),ht(i,"link",e),st(i),r.head.appendChild(i)}}}function iw(e,t,r){Bn.S(e,t,r);var i=Da;if(i&&e){var c=Qr(i).hoistableStyles,d=Na(e);t=t||"default";var y=c.get(d);if(!y){var w={loading:0,preload:null};if(y=i.querySelector(_i(d)))w.loading=5;else{e=x({rel:"stylesheet",href:e,"data-precedence":t},r),(r=Qt.get(d))&&Ou(e,r);var A=y=i.createElement("link");st(A),ht(A,"link",e),A._p=new Promise(function(G,Z){A.onload=G,A.onerror=Z}),A.addEventListener("load",function(){w.loading|=1}),A.addEventListener("error",function(){w.loading|=2}),w.loading|=4,vo(y,t,i)}y={type:"stylesheet",instance:y,count:1,state:w},c.set(d,y)}}}function sw(e,t){Bn.X(e,t);var r=Da;if(r&&e){var i=Qr(r).hoistableScripts,c=Aa(e),d=i.get(c);d||(d=r.querySelector(Vi(c)),d||(e=x({src:e,async:!0},t),(t=Qt.get(c))&&zu(e,t),d=r.createElement("script"),st(d),ht(d,"link",e),r.head.appendChild(d)),d={type:"script",instance:d,count:1,state:null},i.set(c,d))}}function ow(e,t){Bn.M(e,t);var r=Da;if(r&&e){var i=Qr(r).hoistableScripts,c=Aa(e),d=i.get(c);d||(d=r.querySelector(Vi(c)),d||(e=x({src:e,async:!0,type:"module"},t),(t=Qt.get(c))&&zu(e,t),d=r.createElement("script"),st(d),ht(d,"link",e),r.head.appendChild(d)),d={type:"script",instance:d,count:1,state:null},i.set(c,d))}}function Og(e,t,r,i){var c=(c=fe.current)?yo(c):null;if(!c)throw Error(o(446));switch(e){case"meta":case"title":return null;case"style":return typeof r.precedence=="string"&&typeof r.href=="string"?(t=Na(r.href),r=Qr(c).hoistableStyles,i=r.get(t),i||(i={type:"style",instance:null,count:0,state:null},r.set(t,i)),i):{type:"void",instance:null,count:0,state:null};case"link":if(r.rel==="stylesheet"&&typeof r.href=="string"&&typeof r.precedence=="string"){e=Na(r.href);var d=Qr(c).hoistableStyles,y=d.get(e);if(y||(c=c.ownerDocument||c,y={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},d.set(e,y),(d=c.querySelector(_i(e)))&&!d._p&&(y.instance=d,y.state.loading=5),Qt.has(e)||(r={rel:"preload",as:"style",href:r.href,crossOrigin:r.crossOrigin,integrity:r.integrity,media:r.media,hrefLang:r.hrefLang,referrerPolicy:r.referrerPolicy},Qt.set(e,r),d||lw(c,e,r,y.state))),t&&i===null)throw Error(o(528,""));return y}if(t&&i!==null)throw Error(o(529,""));return null;case"script":return t=r.async,r=r.src,typeof r=="string"&&t&&typeof t!="function"&&typeof t!="symbol"?(t=Aa(r),r=Qr(c).hoistableScripts,i=r.get(t),i||(i={type:"script",instance:null,count:0,state:null},r.set(t,i)),i):{type:"void",instance:null,count:0,state:null};default:throw Error(o(444,e))}}function Na(e){return'href="'+Yt(e)+'"'}function _i(e){return'link[rel="stylesheet"]['+e+"]"}function zg(e){return x({},e,{"data-precedence":e.precedence,precedence:null})}function lw(e,t,r,i){e.querySelector('link[rel="preload"][as="style"]['+t+"]")?i.loading=1:(t=e.createElement("link"),i.preload=t,t.addEventListener("load",function(){return i.loading|=1}),t.addEventListener("error",function(){return i.loading|=2}),ht(t,"link",r),st(t),e.head.appendChild(t))}function Aa(e){return'[src="'+Yt(e)+'"]'}function Vi(e){return"script[async]"+e}function _g(e,t,r){if(t.count++,t.instance===null)switch(t.type){case"style":var i=e.querySelector('style[data-href~="'+Yt(r.href)+'"]');if(i)return t.instance=i,st(i),i;var c=x({},r,{"data-href":r.href,"data-precedence":r.precedence,href:null,precedence:null});return i=(e.ownerDocument||e).createElement("style"),st(i),ht(i,"style",c),vo(i,r.precedence,e),t.instance=i;case"stylesheet":c=Na(r.href);var d=e.querySelector(_i(c));if(d)return t.state.loading|=4,t.instance=d,st(d),d;i=zg(r),(c=Qt.get(c))&&Ou(i,c),d=(e.ownerDocument||e).createElement("link"),st(d);var y=d;return y._p=new Promise(function(w,A){y.onload=w,y.onerror=A}),ht(d,"link",i),t.state.loading|=4,vo(d,r.precedence,e),t.instance=d;case"script":return d=Aa(r.src),(c=e.querySelector(Vi(d)))?(t.instance=c,st(c),c):(i=r,(c=Qt.get(d))&&(i=x({},r),zu(i,c)),e=e.ownerDocument||e,c=e.createElement("script"),st(c),ht(c,"link",i),e.head.appendChild(c),t.instance=c);case"void":return null;default:throw Error(o(443,t.type))}else t.type==="stylesheet"&&(t.state.loading&4)===0&&(i=t.instance,t.state.loading|=4,vo(i,r.precedence,e));return t.instance}function vo(e,t,r){for(var i=r.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),c=i.length?i[i.length-1]:null,d=c,y=0;y<i.length;y++){var w=i[y];if(w.dataset.precedence===t)d=w;else if(d!==c)break}d?d.parentNode.insertBefore(e,d.nextSibling):(t=r.nodeType===9?r.head:r,t.insertBefore(e,t.firstChild))}function Ou(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.title==null&&(e.title=t.title)}function zu(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.integrity==null&&(e.integrity=t.integrity)}var xo=null;function Vg(e,t,r){if(xo===null){var i=new Map,c=xo=new Map;c.set(r,i)}else c=xo,i=c.get(r),i||(i=new Map,c.set(r,i));if(i.has(e))return i;for(i.set(e,null),r=r.getElementsByTagName(e),c=0;c<r.length;c++){var d=r[c];if(!(d[Wa]||d[ct]||e==="link"&&d.getAttribute("rel")==="stylesheet")&&d.namespaceURI!=="http://www.w3.org/2000/svg"){var y=d.getAttribute(t)||"";y=e+y;var w=i.get(y);w?w.push(d):i.set(y,[d])}}return i}function Bg(e,t,r){e=e.ownerDocument||e,e.head.insertBefore(r,t==="title"?e.querySelector("head > title"):null)}function cw(e,t,r){if(r===1||t.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof t.precedence!="string"||typeof t.href!="string"||t.href==="")break;return!0;case"link":if(typeof t.rel!="string"||typeof t.href!="string"||t.href===""||t.onLoad||t.onError)break;switch(t.rel){case"stylesheet":return e=t.disabled,typeof t.precedence=="string"&&e==null;default:return!0}case"script":if(t.async&&typeof t.async!="function"&&typeof t.async!="symbol"&&!t.onLoad&&!t.onError&&t.src&&typeof t.src=="string")return!0}return!1}function Lg(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function uw(e,t,r,i){if(r.type==="stylesheet"&&(typeof i.media!="string"||matchMedia(i.media).matches!==!1)&&(r.state.loading&4)===0){if(r.instance===null){var c=Na(i.href),d=t.querySelector(_i(c));if(d){t=d._p,t!==null&&typeof t=="object"&&typeof t.then=="function"&&(e.count++,e=bo.bind(e),t.then(e,e)),r.state.loading|=4,r.instance=d,st(d);return}d=t.ownerDocument||t,i=zg(i),(c=Qt.get(c))&&Ou(i,c),d=d.createElement("link"),st(d);var y=d;y._p=new Promise(function(w,A){y.onload=w,y.onerror=A}),ht(d,"link",i),r.instance=d}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(r,t),(t=r.state.preload)&&(r.state.loading&3)===0&&(e.count++,r=bo.bind(e),t.addEventListener("load",r),t.addEventListener("error",r))}}var _u=0;function dw(e,t){return e.stylesheets&&e.count===0&&wo(e,e.stylesheets),0<e.count||0<e.imgCount?function(r){var i=setTimeout(function(){if(e.stylesheets&&wo(e,e.stylesheets),e.unsuspend){var d=e.unsuspend;e.unsuspend=null,d()}},6e4+t);0<e.imgBytes&&_u===0&&(_u=62500*FS());var c=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&wo(e,e.stylesheets),e.unsuspend)){var d=e.unsuspend;e.unsuspend=null,d()}},(e.imgBytes>_u?50:800)+t);return e.unsuspend=r,function(){e.unsuspend=null,clearTimeout(i),clearTimeout(c)}}:null}function bo(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)wo(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var So=null;function wo(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,So=new Map,t.forEach(fw,e),So=null,bo.call(e))}function fw(e,t){if(!(t.state.loading&4)){var r=So.get(e);if(r)var i=r.get(null);else{r=new Map,So.set(e,r);for(var c=e.querySelectorAll("link[data-precedence],style[data-precedence]"),d=0;d<c.length;d++){var y=c[d];(y.nodeName==="LINK"||y.getAttribute("media")!=="not all")&&(r.set(y.dataset.precedence,y),i=y)}i&&r.set(null,i)}c=t.instance,y=c.getAttribute("data-precedence"),d=r.get(y)||i,d===i&&r.set(null,c),r.set(y,c),this.count++,i=bo.bind(this),c.addEventListener("load",i),c.addEventListener("error",i),d?d.parentNode.insertBefore(c,d.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(c,e.firstChild)),t.state.loading|=4}}var Bi={$$typeof:B,Provider:null,Consumer:null,_currentValue:K,_currentValue2:K,_threadCount:0};function hw(e,t,r,i,c,d,y,w,A){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Ml(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Ml(0),this.hiddenUpdates=Ml(null),this.identifierPrefix=i,this.onUncaughtError=c,this.onCaughtError=d,this.onRecoverableError=y,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=A,this.incompleteTransitions=new Map}function Ug(e,t,r,i,c,d,y,w,A,G,Z,ee){return e=new hw(e,t,r,y,A,G,Z,ee,w),t=1,d===!0&&(t|=24),d=Ot(3,null,null,t),e.current=d,d.stateNode=e,t=mc(),t.refCount++,e.pooledCache=t,t.refCount++,d.memoizedState={element:i,isDehydrated:r,cache:t},vc(d),e}function Hg(e){return e?(e=sa,e):sa}function qg(e,t,r,i,c,d){c=Hg(c),i.context===null?i.context=c:i.pendingContext=c,i=Zn(t),i.payload={element:r},d=d===void 0?null:d,d!==null&&(i.callback=d),r=Qn(e,i,t),r!==null&&(Nt(r,e,t),pi(r,e,t))}function Yg(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var r=e.retryLane;e.retryLane=r!==0&&r<t?r:t}}function Vu(e,t){Yg(e,t),(e=e.alternate)&&Yg(e,t)}function Gg(e){if(e.tag===13||e.tag===31){var t=Tr(e,67108864);t!==null&&Nt(t,e,67108864),Vu(e,67108864)}}function Pg(e){if(e.tag===13||e.tag===31){var t=Lt();t=kl(t);var r=Tr(e,t);r!==null&&Nt(r,e,t),Vu(e,t)}}var jo=!0;function mw(e,t,r,i){var c=H.T;H.T=null;var d=se.p;try{se.p=2,Bu(e,t,r,i)}finally{se.p=d,H.T=c}}function pw(e,t,r,i){var c=H.T;H.T=null;var d=se.p;try{se.p=8,Bu(e,t,r,i)}finally{se.p=d,H.T=c}}function Bu(e,t,r,i){if(jo){var c=Lu(i);if(c===null)ju(e,t,i,Eo,r),Xg(e,i);else if(yw(c,e,t,r,i))i.stopPropagation();else if(Xg(e,i),t&4&&-1<gw.indexOf(e)){for(;c!==null;){var d=Zr(c);if(d!==null)switch(d.tag){case 3:if(d=d.stateNode,d.current.memoizedState.isDehydrated){var y=br(d.pendingLanes);if(y!==0){var w=d;for(w.pendingLanes|=2,w.entangledLanes|=2;y;){var A=1<<31-kt(y);w.entanglements[1]|=A,y&=~A}fn(d),(Re&6)===0&&(io=At()+500,ki(0))}}break;case 31:case 13:w=Tr(d,2),w!==null&&Nt(w,d,2),oo(),Vu(d,2)}if(d=Lu(i),d===null&&ju(e,t,i,Eo,r),d===c)break;c=d}c!==null&&i.stopPropagation()}else ju(e,t,i,null,r)}}function Lu(e){return e=Hl(e),Uu(e)}var Eo=null;function Uu(e){if(Eo=null,e=Kr(e),e!==null){var t=h(e);if(t===null)e=null;else{var r=t.tag;if(r===13){if(e=f(t),e!==null)return e;e=null}else if(r===31){if(e=m(t),e!==null)return e;e=null}else if(r===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return Eo=e,null}function Fg(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(t1()){case If:return 2;case eh:return 8;case fs:case n1:return 32;case th:return 268435456;default:return 32}default:return 32}}var Hu=!1,or=null,lr=null,cr=null,Li=new Map,Ui=new Map,ur=[],gw="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function Xg(e,t){switch(e){case"focusin":case"focusout":or=null;break;case"dragenter":case"dragleave":lr=null;break;case"mouseover":case"mouseout":cr=null;break;case"pointerover":case"pointerout":Li.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Ui.delete(t.pointerId)}}function Hi(e,t,r,i,c,d){return e===null||e.nativeEvent!==d?(e={blockedOn:t,domEventName:r,eventSystemFlags:i,nativeEvent:d,targetContainers:[c]},t!==null&&(t=Zr(t),t!==null&&Gg(t)),e):(e.eventSystemFlags|=i,t=e.targetContainers,c!==null&&t.indexOf(c)===-1&&t.push(c),e)}function yw(e,t,r,i,c){switch(t){case"focusin":return or=Hi(or,e,t,r,i,c),!0;case"dragenter":return lr=Hi(lr,e,t,r,i,c),!0;case"mouseover":return cr=Hi(cr,e,t,r,i,c),!0;case"pointerover":var d=c.pointerId;return Li.set(d,Hi(Li.get(d)||null,e,t,r,i,c)),!0;case"gotpointercapture":return d=c.pointerId,Ui.set(d,Hi(Ui.get(d)||null,e,t,r,i,c)),!0}return!1}function $g(e){var t=Kr(e.target);if(t!==null){var r=h(t);if(r!==null){if(t=r.tag,t===13){if(t=f(r),t!==null){e.blockedOn=t,oh(e.priority,function(){Pg(r)});return}}else if(t===31){if(t=m(r),t!==null){e.blockedOn=t,oh(e.priority,function(){Pg(r)});return}}else if(t===3&&r.stateNode.current.memoizedState.isDehydrated){e.blockedOn=r.tag===3?r.stateNode.containerInfo:null;return}}}e.blockedOn=null}function To(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var r=Lu(e.nativeEvent);if(r===null){r=e.nativeEvent;var i=new r.constructor(r.type,r);Ul=i,r.target.dispatchEvent(i),Ul=null}else return t=Zr(r),t!==null&&Gg(t),e.blockedOn=r,!1;t.shift()}return!0}function Kg(e,t,r){To(e)&&r.delete(t)}function vw(){Hu=!1,or!==null&&To(or)&&(or=null),lr!==null&&To(lr)&&(lr=null),cr!==null&&To(cr)&&(cr=null),Li.forEach(Kg),Ui.forEach(Kg)}function Co(e,t){e.blockedOn===t&&(e.blockedOn=null,Hu||(Hu=!0,n.unstable_scheduleCallback(n.unstable_NormalPriority,vw)))}var Do=null;function Zg(e){Do!==e&&(Do=e,n.unstable_scheduleCallback(n.unstable_NormalPriority,function(){Do===e&&(Do=null);for(var t=0;t<e.length;t+=3){var r=e[t],i=e[t+1],c=e[t+2];if(typeof i!="function"){if(Uu(i||r)===null)continue;break}var d=Zr(r);d!==null&&(e.splice(t,3),t-=3,Lc(d,{pending:!0,data:c,method:r.method,action:i},i,c))}}))}function Ma(e){function t(A){return Co(A,e)}or!==null&&Co(or,e),lr!==null&&Co(lr,e),cr!==null&&Co(cr,e),Li.forEach(t),Ui.forEach(t);for(var r=0;r<ur.length;r++){var i=ur[r];i.blockedOn===e&&(i.blockedOn=null)}for(;0<ur.length&&(r=ur[0],r.blockedOn===null);)$g(r),r.blockedOn===null&&ur.shift();if(r=(e.ownerDocument||e).$$reactFormReplay,r!=null)for(i=0;i<r.length;i+=3){var c=r[i],d=r[i+1],y=c[wt]||null;if(typeof d=="function")y||Zg(r);else if(y){var w=null;if(d&&d.hasAttribute("formAction")){if(c=d,y=d[wt]||null)w=y.formAction;else if(Uu(c)!==null)continue}else w=y.action;typeof w=="function"?r[i+1]=w:(r.splice(i,3),i-=3),Zg(r)}}}function Qg(){function e(d){d.canIntercept&&d.info==="react-transition"&&d.intercept({handler:function(){return new Promise(function(y){return c=y})},focusReset:"manual",scroll:"manual"})}function t(){c!==null&&(c(),c=null),i||setTimeout(r,20)}function r(){if(!i&&!navigation.transition){var d=navigation.currentEntry;d&&d.url!=null&&navigation.navigate(d.url,{state:d.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var i=!1,c=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",t),navigation.addEventListener("navigateerror",t),setTimeout(r,100),function(){i=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",t),navigation.removeEventListener("navigateerror",t),c!==null&&(c(),c=null)}}}function qu(e){this._internalRoot=e}No.prototype.render=qu.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(o(409));var r=t.current,i=Lt();qg(r,i,e,t,null,null)},No.prototype.unmount=qu.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;qg(e.current,2,null,e,null,null),oo(),t[$r]=null}};function No(e){this._internalRoot=e}No.prototype.unstable_scheduleHydration=function(e){if(e){var t=sh();e={blockedOn:null,target:e,priority:t};for(var r=0;r<ur.length&&t!==0&&t<ur[r].priority;r++);ur.splice(r,0,e),r===0&&$g(e)}};var Jg=a.version;if(Jg!=="19.2.8")throw Error(o(527,Jg,"19.2.8"));se.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(o(188)):(e=Object.keys(e).join(","),Error(o(268,e)));return e=g(t),e=e!==null?v(e):null,e=e===null?null:e.stateNode,e};var xw={bundleType:0,version:"19.2.8",rendererPackageName:"react-dom",currentDispatcherRef:H,reconcilerVersion:"19.2.8"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Ao=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Ao.isDisabled&&Ao.supportsFiber)try{Za=Ao.inject(xw),Mt=Ao}catch{}}return Yi.createRoot=function(e,t){if(!u(e))throw Error(o(299));var r=!1,i="",c=ap,d=ip,y=sp;return t!=null&&(t.unstable_strictMode===!0&&(r=!0),t.identifierPrefix!==void 0&&(i=t.identifierPrefix),t.onUncaughtError!==void 0&&(c=t.onUncaughtError),t.onCaughtError!==void 0&&(d=t.onCaughtError),t.onRecoverableError!==void 0&&(y=t.onRecoverableError)),t=Ug(e,1,!1,null,null,r,i,null,c,d,y,Qg),e[$r]=t.current,wu(e),new qu(t)},Yi.hydrateRoot=function(e,t,r){if(!u(e))throw Error(o(299));var i=!1,c="",d=ap,y=ip,w=sp,A=null;return r!=null&&(r.unstable_strictMode===!0&&(i=!0),r.identifierPrefix!==void 0&&(c=r.identifierPrefix),r.onUncaughtError!==void 0&&(d=r.onUncaughtError),r.onCaughtError!==void 0&&(y=r.onCaughtError),r.onRecoverableError!==void 0&&(w=r.onRecoverableError),r.formState!==void 0&&(A=r.formState)),t=Ug(e,1,!0,t,r??null,i,c,A,d,y,w,Qg),t.context=Hg(null),r=t.current,i=Lt(),i=kl(i),c=Zn(i),c.callback=null,Qn(r,c,i),r=i,t.current.lanes=r,Ja(t,r),fn(t),e[$r]=t.current,wu(e),new No(t)},Yi.version="19.2.8",Yi}var oy;function Aw(){if(oy)return Pu.exports;oy=1;function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(a){console.error(a)}}return n(),Pu.exports=Nw(),Pu.exports}var lf=Aw();const Mw=sx(lf),cf=S.createContext({});function uf(n){const a=S.useRef(null);return a.current===null&&(a.current=n()),a.current}const kw=typeof window<"u",df=kw?S.useLayoutEffect:S.useEffect,xl=S.createContext(null);function ff(n,a){n.indexOf(a)===-1&&n.push(a)}function el(n,a){const s=n.indexOf(a);s>-1&&n.splice(s,1)}const vn=(n,a,s)=>s>a?a:s<n?n:s;let bl=()=>{};const gr={},cx=n=>/^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(n),ux=n=>typeof n=="object"&&n!==null,dx=n=>/^0[^.\s]+$/u.test(n);function fx(n){let a;return()=>(a===void 0&&(a=n()),a)}const It=n=>n,ss=(...n)=>n.reduce((a,s)=>o=>s(a(o))),Wi=(n,a,s)=>{const o=a-n;return o?(s-n)/o:1};class hf{constructor(){this.subscriptions=[]}add(a){return ff(this.subscriptions,a),()=>el(this.subscriptions,a)}notify(a,s,o){const u=this.subscriptions.length;if(u)if(u===1)this.subscriptions[0](a,s,o);else for(let h=0;h<u;h++){const f=this.subscriptions[h];f&&f(a,s,o)}}getSize(){return this.subscriptions.length}clear(){this.subscriptions.length=0}}const Ht=n=>n*1e3,Wt=n=>n/1e3,hx=(n,a)=>a?n*(1e3/a):0,mx=(n,a,s)=>(((1-3*s+3*a)*n+(3*s-6*a))*n+3*a)*n,Rw=1e-7,Ow=12;function zw(n,a,s,o,u){let h,f,m=0;do f=a+(s-a)/2,h=mx(f,o,u)-n,h>0?s=f:a=f;while(Math.abs(h)>Rw&&++m<Ow);return f}function os(n,a,s,o){if(n===a&&s===o)return It;const u=h=>zw(h,0,1,n,s);return h=>h===0||h===1?h:mx(u(h),a,o)}const px=n=>a=>a<=.5?n(2*a)/2:(2-n(2*(1-a)))/2,gx=n=>a=>1-n(1-a),yx=os(.33,1.53,.69,.99),mf=gx(yx),vx=px(mf),xx=n=>n>=1?1:(n*=2)<1?.5*mf(n):.5*(2-Math.pow(2,-10*(n-1))),pf=n=>1-Math.sin(Math.acos(n)),bx=gx(pf),Sx=px(pf),_w=os(.42,0,1,1),Vw=os(0,0,.58,1),wx=os(.42,0,.58,1),Bw=n=>Array.isArray(n)&&typeof n[0]!="number",jx=n=>Array.isArray(n)&&typeof n[0]=="number",Lw={linear:It,easeIn:_w,easeInOut:wx,easeOut:Vw,circIn:pf,circInOut:Sx,circOut:bx,backIn:mf,backInOut:vx,backOut:yx,anticipate:xx},Uw=n=>typeof n=="string",ly=n=>{if(jx(n)){bl(n.length===4);const[a,s,o,u]=n;return os(a,s,o,u)}else if(Uw(n))return Lw[n];return n},Mo=["setup","read","resolveKeyframes","preUpdate","update","preRender","render","postRender"];function Hw(n){let a=new Set,s=new Set,o=!1,u=!1;const h=new WeakSet;let f={delta:0,timestamp:0,isProcessing:!1};function m(g){h.has(g)&&(p.schedule(g),n()),g(f)}const p={schedule:(g,v=!1,x=!1)=>{const j=x&&o?a:s;return v&&h.add(g),j.add(g),g},cancel:g=>{s.delete(g),h.delete(g)},process:g=>{if(f=g,o){u=!0;return}o=!0;const v=a;a=s,s=v,a.forEach(m),a.clear(),o=!1,u&&(u=!1,p.process(g))}};return p}const qw=40;function Ex(n,a){let s=!1,o=!0;const u={delta:0,timestamp:0,isProcessing:!1},h=()=>s=!0,f=Mo.reduce((B,_)=>(B[_]=Hw(h),B),{}),{setup:m,read:p,resolveKeyframes:g,preUpdate:v,update:x,preRender:b,render:j,postRender:E}=f,T=()=>{const B=gr.useManualTiming,_=B?u.timestamp:performance.now();s=!1,B||(u.delta=o?1e3/60:Math.max(Math.min(_-u.timestamp,qw),1)),u.timestamp=_,u.isProcessing=!0,m.process(u),p.process(u),g.process(u),v.process(u),x.process(u),b.process(u),j.process(u),E.process(u),u.isProcessing=!1,s&&a&&(o=!1,n(T))},D=()=>{s=!0,o=!0,u.isProcessing||n(T)};return{schedule:Mo.reduce((B,_)=>{const U=f[_];return B[_]=(q,N=!1,M=!1)=>(s||D(),U.schedule(q,N,M)),B},{}),cancel:B=>{for(let _=0;_<Mo.length;_++)f[Mo[_]].cancel(B)},state:u,steps:f}}const{schedule:Ye,cancel:yr,state:mt,steps:Ku}=Ex(typeof requestAnimationFrame<"u"?requestAnimationFrame:It,!0);let Go;function Yw(){Go=void 0}const xt={now:()=>(Go===void 0&&xt.set(mt.isProcessing||gr.useManualTiming?mt.timestamp:performance.now()),Go),set:n=>{Go=n,queueMicrotask(Yw)}},Tx=n=>a=>typeof a=="string"&&a.startsWith(n),Cx=Tx("--"),Gw=Tx("var(--"),gf=n=>Gw(n)?Pw.test(n.split("/*")[0].trim()):!1,Pw=/var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;function cy(n){return typeof n!="string"?!1:n.split("/*")[0].includes("var(--")}const Pa={test:n=>typeof n=="number",parse:parseFloat,transform:n=>n},Ii={...Pa,transform:n=>vn(0,1,n)},ko={...Pa,default:1},$i=n=>Math.round(n*1e5)/1e5,yf=/-?(?:\d+(?:\.\d+)?|\.\d+)/gu;function Fw(n){return n==null}const Xw=/^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu,vf=(n,a)=>s=>!!(typeof s=="string"&&Xw.test(s)&&s.startsWith(n)||a&&!Fw(s)&&Object.prototype.hasOwnProperty.call(s,a)),Dx=(n,a,s)=>o=>{if(typeof o!="string")return o;const[u,h,f,m]=o.match(yf);return{[n]:parseFloat(u),[a]:parseFloat(h),[s]:parseFloat(f),alpha:m!==void 0?parseFloat(m):1}},$w=n=>vn(0,255,n),Zu={...Pa,transform:n=>Math.round($w(n))},Hr={test:vf("rgb","red"),parse:Dx("red","green","blue"),transform:({red:n,green:a,blue:s,alpha:o=1})=>"rgba("+Zu.transform(n)+", "+Zu.transform(a)+", "+Zu.transform(s)+", "+$i(Ii.transform(o))+")"};function Kw(n){let a="",s="",o="",u="";return n.length>5?(a=n.substring(1,3),s=n.substring(3,5),o=n.substring(5,7),u=n.substring(7,9)):(a=n.substring(1,2),s=n.substring(2,3),o=n.substring(3,4),u=n.substring(4,5),a+=a,s+=s,o+=o,u+=u),{red:parseInt(a,16),green:parseInt(s,16),blue:parseInt(o,16),alpha:u?parseInt(u,16)/255:1}}const wd={test:vf("#"),parse:Kw,transform:Hr.transform},ls=n=>({test:a=>typeof a=="string"&&a.endsWith(n)&&a.split(" ").length===1,parse:parseFloat,transform:a=>`${a}${n}`}),Ln=ls("deg"),yn=ls("%"),de=ls("px"),Zw=ls("vh"),Qw=ls("vw"),uy={...yn,parse:n=>yn.parse(n)/100,transform:n=>yn.transform(n*100)},Va={test:vf("hsl","hue"),parse:Dx("hue","saturation","lightness"),transform:({hue:n,saturation:a,lightness:s,alpha:o=1})=>"hsla("+Math.round(n)+", "+yn.transform($i(a))+", "+yn.transform($i(s))+", "+$i(Ii.transform(o))+")"},rt={test:n=>Hr.test(n)||wd.test(n)||Va.test(n),parse:n=>Hr.test(n)?Hr.parse(n):Va.test(n)?Va.parse(n):wd.parse(n),transform:n=>typeof n=="string"?n:n.hasOwnProperty("red")?Hr.transform(n):Va.transform(n),getAnimatableNone:n=>{const a=rt.parse(n);return a.alpha=0,rt.transform(a)}},Jw=/(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;function Ww(n){var a,s;return isNaN(n)&&typeof n=="string"&&(((a=n.match(yf))==null?void 0:a.length)||0)+(((s=n.match(Jw))==null?void 0:s.length)||0)>0}const Nx="number",Ax="color",Iw="var",e2="var(",dy="${}",t2=/var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;function Ha(n){const a=n.toString(),s=[],o={color:[],number:[],var:[]},u=[];let h=0;const m=a.replace(t2,p=>(rt.test(p)?(o.color.push(h),u.push(Ax),s.push(rt.parse(p))):p.startsWith(e2)?(o.var.push(h),u.push(Iw),s.push(p)):(o.number.push(h),u.push(Nx),s.push(parseFloat(p))),++h,dy)).split(dy);return{values:s,split:m,indexes:o,types:u}}function n2(n){return Ha(n).values}function Mx({split:n,types:a}){const s=n.length;return o=>{let u="";for(let h=0;h<s;h++)if(u+=n[h],o[h]!==void 0){const f=a[h];f===Nx?u+=$i(o[h]):f===Ax?u+=rt.transform(o[h]):u+=o[h]}return u}}function r2(n){return Mx(Ha(n))}const a2=n=>typeof n=="number"?0:rt.test(n)?rt.getAnimatableNone(n):n,i2=(n,a)=>typeof n=="number"?a!=null&&a.trim().endsWith("/")?n:0:a2(n);function s2(n){const a=Ha(n);return Mx(a)(a.values.map((o,u)=>i2(o,a.split[u])))}const on={test:Ww,parse:n2,createTransformer:r2,getAnimatableNone:s2};function Qu(n,a,s){return s<0&&(s+=1),s>1&&(s-=1),s<1/6?n+(a-n)*6*s:s<1/2?a:s<2/3?n+(a-n)*(2/3-s)*6:n}function o2({hue:n,saturation:a,lightness:s,alpha:o}){n/=360,a/=100,s/=100;let u=0,h=0,f=0;if(!a)u=h=f=s;else{const m=s<.5?s*(1+a):s+a-s*a,p=2*s-m;u=Qu(p,m,n+1/3),h=Qu(p,m,n),f=Qu(p,m,n-1/3)}return{red:Math.round(u*255),green:Math.round(h*255),blue:Math.round(f*255),alpha:o}}function tl(n,a){return s=>s>0?a:n}const qe=(n,a,s)=>n+(a-n)*s,Ju=(n,a,s)=>{const o=n*n,u=s*(a*a-o)+o;return u<0?0:Math.sqrt(u)},l2=[wd,Hr,Va],c2=n=>l2.find(a=>a.test(n));function fy(n){const a=c2(n);if(!a)return!1;let s=a.parse(n);return a===Va&&(s=o2(s)),s}const hy=(n,a)=>{const s=fy(n),o=fy(a);if(!s||!o)return tl(n,a);const u={...s};return h=>(u.red=Ju(s.red,o.red,h),u.green=Ju(s.green,o.green,h),u.blue=Ju(s.blue,o.blue,h),u.alpha=qe(s.alpha,o.alpha,h),Hr.transform(u))},jd=new Set(["none","hidden"]);function u2(n,a){return jd.has(n)?s=>s<=0?n:a:s=>s>=1?a:n}function d2(n,a){return s=>qe(n,a,s)}function xf(n){return typeof n=="number"?d2:typeof n=="string"?gf(n)?tl:rt.test(n)?hy:m2:Array.isArray(n)?kx:typeof n=="object"?rt.test(n)?hy:f2:tl}function kx(n,a){const s=[...n],o=s.length,u=n.map((h,f)=>xf(h)(h,a[f]));return h=>{for(let f=0;f<o;f++)s[f]=u[f](h);return s}}function f2(n,a){const s={...n,...a},o={};for(const u in s)n[u]!==void 0&&a[u]!==void 0&&(o[u]=xf(n[u])(n[u],a[u]));return u=>{for(const h in o)s[h]=o[h](u);return s}}function h2(n,a){const s=[],o={color:0,var:0,number:0};for(let u=0;u<a.values.length;u++){const h=a.types[u],f=n.indexes[h][o[h]],m=n.values[f]??0;s[u]=m,o[h]++}return s}const m2=(n,a)=>{const s=on.createTransformer(a),o=Ha(n),u=Ha(a);return o.indexes.var.length===u.indexes.var.length&&o.indexes.color.length===u.indexes.color.length&&o.indexes.number.length>=u.indexes.number.length?jd.has(n)&&!u.values.length||jd.has(a)&&!o.values.length?u2(n,a):ss(kx(h2(o,u),u.values),s):tl(n,a)};function Rx(n,a,s){return typeof n=="number"&&typeof a=="number"&&typeof s=="number"?qe(n,a,s):xf(n)(n,a)}const p2=n=>{const a=({timestamp:s})=>n(s);return{start:(s=!0)=>Ye.update(a,s),stop:()=>yr(a),now:()=>mt.isProcessing?mt.timestamp:xt.now()}},Ox=(n,a,s=10)=>{let o="";const u=Math.max(Math.round(a/s),2);for(let h=0;h<u;h++)o+=Math.round(n(h/(u-1))*1e4)/1e4+", ";return`linear(${o.substring(0,o.length-2)})`},nl=2e4;function bf(n){let a=0;const s=50;let o=n.next(a);for(;!o.done&&a<nl;)a+=s,o=n.next(a);return a>=nl?1/0:a}function g2(n,a=100,s){const o=s({...n,keyframes:[0,a]}),u=Math.min(bf(o),nl);return{type:"keyframes",ease:h=>o.next(u*h).value/a,duration:Wt(u)}}const Ze={stiffness:100,damping:10,mass:1,velocity:0,duration:800,bounce:.3,visualDuration:.3,restSpeed:{granular:.01,default:2},restDelta:{granular:.005,default:.5},minDuration:.01,maxDuration:10,minDamping:.05,maxDamping:1};function Ed(n,a){return n*Math.sqrt(1-a*a)}const y2=12;function v2(n,a,s){let o=s;for(let u=1;u<y2;u++)o=o-n(o)/a(o);return o}const Wu=.001;function x2({duration:n=Ze.duration,bounce:a=Ze.bounce,velocity:s=Ze.velocity,mass:o=Ze.mass}){let u,h,f=1-a;f=vn(Ze.minDamping,Ze.maxDamping,f),n=vn(Ze.minDuration,Ze.maxDuration,Wt(n)),f<1?(u=g=>{const v=g*f,x=v*n,b=v-s,j=Ed(g,f),E=Math.exp(-x);return Wu-b/j*E},h=g=>{const x=g*f*n,b=x*s+s,j=Math.pow(f,2)*Math.pow(g,2)*n,E=Math.exp(-x),T=Ed(Math.pow(g,2),f);return(-u(g)+Wu>0?-1:1)*((b-j)*E)/T}):(u=g=>{const v=Math.exp(-g*n),x=(g-s)*n+1;return-Wu+v*x},h=g=>{const v=Math.exp(-g*n),x=(s-g)*(n*n);return v*x});const m=5/n,p=v2(u,h,m);if(n=Ht(n),isNaN(p))return{stiffness:Ze.stiffness,damping:Ze.damping,duration:n};{const g=Math.pow(p,2)*o;return{stiffness:g,damping:f*2*Math.sqrt(o*g),duration:n}}}const b2=["duration","bounce"],S2=["stiffness","damping","mass"];function my(n,a){return a.some(s=>n[s]!==void 0)}function w2(n){let a={velocity:Ze.velocity,stiffness:Ze.stiffness,damping:Ze.damping,mass:Ze.mass,isResolvedFromDuration:!1,...n};if(!my(n,S2)&&my(n,b2))if(a.velocity=0,n.visualDuration){const s=n.visualDuration,o=2*Math.PI/(s*1.2),u=o*o,h=2*vn(.05,1,1-(n.bounce||0))*Math.sqrt(u);a={...a,mass:Ze.mass,stiffness:u,damping:h}}else{const s=x2({...n,velocity:0});a={...a,...s,mass:Ze.mass},a.isResolvedFromDuration=!0}return a}function rl(n=Ze.visualDuration,a=Ze.bounce){const s=typeof n!="object"?{visualDuration:n,keyframes:[0,1],bounce:a}:n;let{restSpeed:o,restDelta:u}=s;const h=s.keyframes[0],f=s.keyframes[s.keyframes.length-1],m={done:!1,value:h},{stiffness:p,damping:g,mass:v,duration:x,velocity:b,isResolvedFromDuration:j}=w2({...s,velocity:-Wt(s.velocity||0)}),E=b||0,T=g/(2*Math.sqrt(p*v)),D=f-h,O=Wt(Math.sqrt(p/v)),k=Math.abs(D)<5;o||(o=k?Ze.restSpeed.granular:Ze.restSpeed.default),u||(u=k?Ze.restDelta.granular:Ze.restDelta.default);let B,_,U,q,N,M;if(T<1)U=Ed(O,T),q=(E+T*O*D)/U,B=$=>{const J=Math.exp(-T*O*$);return f-J*(q*Math.sin(U*$)+D*Math.cos(U*$))},N=T*O*q+D*U,M=T*O*D-q*U,_=$=>Math.exp(-T*O*$)*(N*Math.sin(U*$)+M*Math.cos(U*$));else if(T===1){B=J=>f-Math.exp(-O*J)*(D+(E+O*D)*J);const $=E+O*D;_=J=>Math.exp(-O*J)*(O*$*J-E)}else{const $=O*Math.sqrt(T*T-1);B=le=>{const ve=Math.exp(-T*O*le),H=Math.min($*le,300);return f-ve*((E+T*O*D)*Math.sinh(H)+$*D*Math.cosh(H))/$};const J=(E+T*O*D)/$,re=T*O*J-D*$,pe=T*O*D-J*$;_=le=>{const ve=Math.exp(-T*O*le),H=Math.min($*le,300);return ve*(re*Math.sinh(H)+pe*Math.cosh(H))}}const V={calculatedDuration:j&&x||null,velocity:$=>Ht(_($)),next:$=>{if(!j&&T<1){const re=Math.exp(-T*O*$),pe=Math.sin(U*$),le=Math.cos(U*$),ve=f-re*(q*pe+D*le),H=Ht(re*(N*pe+M*le));return m.done=Math.abs(H)<=o&&Math.abs(f-ve)<=u,m.value=m.done?f:ve,m}const J=B($);if(j)m.done=$>=x;else{const re=Ht(_($));m.done=Math.abs(re)<=o&&Math.abs(f-J)<=u}return m.value=m.done?f:J,m},toString:()=>{const $=Math.min(bf(V),nl),J=Ox(re=>V.next($*re).value,$,30);return $+"ms "+J},toTransition:()=>{}};return V}rl.applyToOptions=n=>{const a=g2(n,100,rl);return n.ease=a.ease,n.duration=Ht(a.duration),n.type="keyframes",n};const j2=5;function zx(n,a,s){const o=Math.max(a-j2,0);return hx(s-n(o),a-o)}function Td({keyframes:n,velocity:a=0,power:s=.8,timeConstant:o=325,bounceDamping:u=10,bounceStiffness:h=500,modifyTarget:f,min:m,max:p,restDelta:g=.5,restSpeed:v}){const x=n[0],b={done:!1,value:x},j=M=>m!==void 0&&M<m||p!==void 0&&M>p,E=M=>m===void 0?p:p===void 0||Math.abs(m-M)<Math.abs(p-M)?m:p;let T=s*a;const D=x+T,O=f===void 0?D:f(D);O!==D&&(T=O-x);const k=M=>-T*Math.exp(-M/o),B=M=>O+k(M),_=M=>{const V=k(M),$=B(M);b.done=Math.abs(V)<=g,b.value=b.done?O:$};let U,q;const N=M=>{j(b.value)&&(U=M,q=rl({keyframes:[b.value,E(b.value)],velocity:zx(B,M,b.value),damping:u,stiffness:h,restDelta:g,restSpeed:v}))};return N(0),{calculatedDuration:null,next:M=>{let V=!1;return!q&&U===void 0&&(V=!0,_(M),N(M)),U!==void 0&&M>=U?q.next(M-U):(!V&&_(M),b)}}}function E2(n,a,s){const o=[],u=s||gr.mix||Rx,h=n.length-1;for(let f=0;f<h;f++){let m=u(n[f],n[f+1]);if(a){const p=Array.isArray(a)?a[f]||It:a;m=ss(p,m)}o.push(m)}return o}function T2(n,a,{clamp:s=!0,ease:o,mixer:u}={}){const h=n.length;if(bl(h===a.length),h===1)return()=>a[0];if(h===2&&a[0]===a[1])return()=>a[1];const f=n[0]===n[1];n[0]>n[h-1]&&(n=[...n].reverse(),a=[...a].reverse());const m=E2(a,o,u),p=m.length,g=v=>{if(f&&v<n[0])return a[0];let x=0;if(p>1)for(;x<n.length-2&&!(v<n[x+1]);x++);const b=Wi(n[x],n[x+1],v);return m[x](b)};return s?v=>g(vn(n[0],n[h-1],v)):g}function C2(n,a){const s=n[n.length-1];for(let o=1;o<=a;o++){const u=Wi(0,a,o);n.push(qe(s,1,u))}}function D2(n){const a=[0];return C2(a,n.length-1),a}function N2(n,a){return n.map(s=>s*a)}function A2(n,a){return n.map(()=>a||wx).splice(0,n.length-1)}function Ki({duration:n=300,keyframes:a,times:s,ease:o="easeInOut"}){const u=Bw(o)?o.map(ly):ly(o),h={done:!1,value:a[0]},f=N2(s&&s.length===a.length?s:D2(a),n),m=T2(f,a,{ease:Array.isArray(u)?u:A2(a,u)});return{calculatedDuration:n,next:p=>(h.value=m(p),h.done=p>=n,h)}}const M2=n=>n!==null;function Sl(n,{repeat:a,repeatType:s="loop"},o,u=1){const h=n.filter(M2),m=u<0||a&&s!=="loop"&&a%2===1?0:h.length-1;return!m||o===void 0?h[m]:o}const k2={decay:Td,inertia:Td,tween:Ki,keyframes:Ki,spring:rl};function _x(n){typeof n.type=="string"&&(n.type=k2[n.type])}class Sf{constructor(){this.updateFinished()}get finished(){return this._finished}updateFinished(){this._finished=new Promise(a=>{this.resolve=a})}notifyFinished(){this.resolve()}then(a,s){return this.finished.then(a,s)}}const R2=n=>n/100;class al extends Sf{constructor(a){super(),this.state="idle",this.startTime=null,this.isStopped=!1,this.currentTime=0,this.holdTime=null,this.playbackSpeed=1,this.delayState={done:!1,value:void 0},this.stop=()=>{var o,u;const{motionValue:s}=this.options;s&&s.updatedAt!==xt.now()&&this.tick(xt.now()),this.isStopped=!0,this.state!=="idle"&&(this.teardown(),(u=(o=this.options).onStop)==null||u.call(o))},this.options=a,this.initAnimation(),this.play(),a.autoplay===!1&&this.pause()}initAnimation(){const{options:a}=this;_x(a);const{type:s=Ki,repeat:o=0,repeatDelay:u=0,repeatType:h,velocity:f=0}=a;let{keyframes:m}=a;const p=s||Ki;p!==Ki&&typeof m[0]!="number"&&(this.mixKeyframes=ss(R2,Rx(m[0],m[1])),m=[0,100]);const g=p({...a,keyframes:m});h==="mirror"&&(this.mirroredGenerator=p({...a,keyframes:[...m].reverse(),velocity:-f})),g.calculatedDuration===null&&(g.calculatedDuration=bf(g));const{calculatedDuration:v}=g;this.calculatedDuration=v,this.resolvedDuration=v+u,this.totalDuration=this.resolvedDuration*(o+1)-u,this.generator=g}updateTime(a){const s=Math.round(a-this.startTime)*this.playbackSpeed;this.holdTime!==null?this.currentTime=this.holdTime:this.currentTime=s}tick(a,s=!1){const{generator:o,totalDuration:u,mixKeyframes:h,mirroredGenerator:f,resolvedDuration:m,calculatedDuration:p}=this;if(this.startTime===null)return o.next(0);const{delay:g=0,keyframes:v,repeat:x,repeatType:b,repeatDelay:j,type:E,onUpdate:T,finalKeyframe:D}=this.options;this.speed>0?this.startTime=Math.min(this.startTime,a):this.speed<0&&(this.startTime=Math.min(a-u/this.speed,this.startTime)),s?this.currentTime=a:this.updateTime(a);const O=this.currentTime-g*(this.playbackSpeed>=0?1:-1),k=this.playbackSpeed>=0?O<0:O>u;this.currentTime=Math.max(O,0),this.state==="finished"&&this.holdTime===null&&(this.currentTime=u);let B=this.currentTime,_=o;if(x){const M=Math.min(this.currentTime,u)/m;let V=Math.floor(M),$=M%1;!$&&M>=1&&($=1),$===1&&V--,V=Math.min(V,x+1),!!(V%2)&&(b==="reverse"?($=1-$,j&&($-=j/m)):b==="mirror"&&(_=f)),B=vn(0,1,$)*m}let U;k?(this.delayState.value=v[0],U=this.delayState):U=_.next(B),h&&!k&&(U.value=h(U.value));let{done:q}=U;!k&&p!==null&&(q=this.playbackSpeed>=0?this.currentTime>=u:this.currentTime<=0);const N=this.holdTime===null&&(this.state==="finished"||this.state==="running"&&q);return N&&E!==Td&&(U.value=Sl(v,this.options,D,this.speed)),T&&T(U.value),N&&this.finish(),U}then(a,s){return this.finished.then(a,s)}get duration(){return Wt(this.calculatedDuration)}get iterationDuration(){const{delay:a=0}=this.options||{};return this.duration+Wt(a)}get time(){return Wt(this.currentTime)}set time(a){a=Ht(a),this.currentTime=a,this.startTime===null||this.holdTime!==null||this.playbackSpeed===0?this.holdTime=a:this.driver&&(this.startTime=this.driver.now()-a/this.playbackSpeed),this.driver?this.driver.start(!1):(this.startTime=0,this.state="paused",this.holdTime=a,this.tick(a))}getGeneratorVelocity(){const a=this.currentTime;if(a<=0)return this.options.velocity||0;if(this.generator.velocity)return this.generator.velocity(a);const s=this.generator.next(a).value;return zx(o=>this.generator.next(o).value,a,s)}get speed(){return this.playbackSpeed}set speed(a){const s=this.playbackSpeed!==a;s&&this.driver&&this.updateTime(xt.now()),this.playbackSpeed=a,s&&this.driver&&(this.time=Wt(this.currentTime))}play(){var u,h;if(this.isStopped)return;const{driver:a=p2,startTime:s}=this.options;this.driver||(this.driver=a(f=>this.tick(f))),(h=(u=this.options).onPlay)==null||h.call(u);const o=this.driver.now();this.state==="finished"?(this.updateFinished(),this.startTime=o):this.holdTime!==null?this.startTime=o-this.holdTime:this.startTime||(this.startTime=s??o),this.state==="finished"&&this.speed<0&&(this.startTime+=this.calculatedDuration),this.holdTime=null,this.state="running",this.driver.start()}pause(){this.state="paused",this.updateTime(xt.now()),this.holdTime=this.currentTime}complete(){this.state!=="running"&&this.play(),this.state="finished",this.holdTime=null}finish(){var a,s;this.notifyFinished(),this.teardown(),this.state="finished",(s=(a=this.options).onComplete)==null||s.call(a)}cancel(){var a,s;this.holdTime=null,this.startTime=0,this.tick(0),this.teardown(),(s=(a=this.options).onCancel)==null||s.call(a)}teardown(){this.state="idle",this.stopDriver(),this.startTime=this.holdTime=null}stopDriver(){this.driver&&(this.driver.stop(),this.driver=void 0)}sample(a){return this.startTime=0,this.tick(a,!0)}attachTimeline(a){var s;return this.options.allowFlatten&&(this.options.type="keyframes",this.options.ease="linear",this.initAnimation()),(s=this.driver)==null||s.stop(),a.observe(this)}}function O2(n){for(let a=1;a<n.length;a++)n[a]??(n[a]=n[a-1])}const qr=n=>n*180/Math.PI,Cd=n=>{const a=qr(Math.atan2(n[1],n[0]));return Dd(a)},z2={x:4,y:5,translateX:4,translateY:5,scaleX:0,scaleY:3,scale:n=>(Math.abs(n[0])+Math.abs(n[3]))/2,rotate:Cd,rotateZ:Cd,skewX:n=>qr(Math.atan(n[1])),skewY:n=>qr(Math.atan(n[2])),skew:n=>(Math.abs(n[1])+Math.abs(n[2]))/2},Dd=n=>(n=n%360,n<0&&(n+=360),n),py=Cd,gy=n=>Math.sqrt(n[0]*n[0]+n[1]*n[1]),yy=n=>Math.sqrt(n[4]*n[4]+n[5]*n[5]),_2={x:12,y:13,z:14,translateX:12,translateY:13,translateZ:14,scaleX:gy,scaleY:yy,scale:n=>(gy(n)+yy(n))/2,rotateX:n=>Dd(qr(Math.atan2(n[6],n[5]))),rotateY:n=>Dd(qr(Math.atan2(-n[2],n[0]))),rotateZ:py,rotate:py,skewX:n=>qr(Math.atan(n[4])),skewY:n=>qr(Math.atan(n[1])),skew:n=>(Math.abs(n[1])+Math.abs(n[4]))/2};function Nd(n){return n.includes("scale")?1:0}function Ad(n,a){if(!n||n==="none")return Nd(a);const s=n.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);let o,u;if(s)o=_2,u=s;else{const m=n.match(/^matrix\(([-\d.e\s,]+)\)$/u);o=z2,u=m}if(!u)return Nd(a);const h=o[a],f=u[1].split(",").map(B2);return typeof h=="function"?h(f):f[h]}const V2=(n,a)=>{const{transform:s="none"}=getComputedStyle(n);return Ad(s,a)};function B2(n){return parseFloat(n.trim())}const Fa=["transformPerspective","x","y","z","translateX","translateY","translateZ","scale","scaleX","scaleY","rotate","rotateX","rotateY","rotateZ","skew","skewX","skewY"],Xa=new Set([...Fa,"pathRotation"]),vy=n=>n===Pa||n===de,L2=new Set(["x","y","z"]),U2=Fa.filter(n=>!L2.has(n));function H2(n){const a=[];return U2.forEach(s=>{const o=n.getValue(s);o!==void 0&&(a.push([s,o.get()]),o.set(s.startsWith("scale")?1:0))}),a}const mr={width:({x:n},{paddingLeft:a="0",paddingRight:s="0",boxSizing:o})=>{const u=n.max-n.min;return o==="border-box"?u:u-parseFloat(a)-parseFloat(s)},height:({y:n},{paddingTop:a="0",paddingBottom:s="0",boxSizing:o})=>{const u=n.max-n.min;return o==="border-box"?u:u-parseFloat(a)-parseFloat(s)},top:(n,{top:a})=>parseFloat(a),left:(n,{left:a})=>parseFloat(a),bottom:({y:n},{top:a})=>parseFloat(a)+(n.max-n.min),right:({x:n},{left:a})=>parseFloat(a)+(n.max-n.min),x:(n,{transform:a})=>Ad(a,"x"),y:(n,{transform:a})=>Ad(a,"y")};mr.translateX=mr.x;mr.translateY=mr.y;const Yr=new Set;let Md=!1,kd=!1,Rd=!1;function Vx(){if(kd){const n=Array.from(Yr).filter(o=>o.needsMeasurement),a=new Set(n.map(o=>o.element)),s=new Map;a.forEach(o=>{const u=H2(o);u.length&&(s.set(o,u),o.render())}),n.forEach(o=>o.measureInitialState()),a.forEach(o=>{o.render();const u=s.get(o);u&&u.forEach(([h,f])=>{var m;(m=o.getValue(h))==null||m.set(f)})}),n.forEach(o=>o.measureEndState()),n.forEach(o=>{o.suspendedScrollY!==void 0&&window.scrollTo(0,o.suspendedScrollY)})}kd=!1,Md=!1,Yr.forEach(n=>n.complete(Rd)),Yr.clear()}function Bx(){Yr.forEach(n=>{n.readKeyframes(),n.needsMeasurement&&(kd=!0)})}function q2(){Rd=!0,Bx(),Vx(),Rd=!1}class wf{constructor(a,s,o,u,h,f=!1){this.state="pending",this.isAsync=!1,this.needsMeasurement=!1,this.unresolvedKeyframes=[...a],this.onComplete=s,this.name=o,this.motionValue=u,this.element=h,this.isAsync=f}scheduleResolve(){this.state="scheduled",this.isAsync?(Yr.add(this),Md||(Md=!0,Ye.read(Bx),Ye.resolveKeyframes(Vx))):(this.readKeyframes(),this.complete())}readKeyframes(){const{unresolvedKeyframes:a,name:s,element:o,motionValue:u}=this;if(a[0]===null){const h=u==null?void 0:u.get(),f=a[a.length-1];if(h!==void 0)a[0]=h;else if(o&&s){const m=o.readValue(s,f);m!=null&&(a[0]=m)}a[0]===void 0&&(a[0]=f),u&&h===void 0&&u.set(a[0])}O2(a)}setFinalKeyframe(){}measureInitialState(){}renderEndStyles(){}measureEndState(){}complete(a=!1){this.state="complete",this.onComplete(this.unresolvedKeyframes,this.finalKeyframe,a),Yr.delete(this)}cancel(){this.state==="scheduled"&&(Yr.delete(this),this.state="pending")}resume(){this.state==="pending"&&this.scheduleResolve()}}const Y2=n=>n.startsWith("--");function Lx(n,a,s){Y2(a)?n.style.setProperty(a,s):n.style[a]=s}const G2={};function Ux(n,a){const s=fx(n);return()=>G2[a]??s()}const P2=Ux(()=>window.ScrollTimeline!==void 0,"scrollTimeline"),Hx=Ux(()=>{try{document.createElement("div").animate({opacity:0},{easing:"linear(0, 1)"})}catch{return!1}return!0},"linearEasing"),Fi=([n,a,s,o])=>`cubic-bezier(${n}, ${a}, ${s}, ${o})`,xy={linear:"linear",ease:"ease",easeIn:"ease-in",easeOut:"ease-out",easeInOut:"ease-in-out",circIn:Fi([0,.65,.55,1]),circOut:Fi([.55,0,1,.45]),backIn:Fi([.31,.01,.66,-.59]),backOut:Fi([.33,1.53,.69,.99])};function qx(n,a){if(n)return typeof n=="function"?Hx()?Ox(n,a):"ease-out":jx(n)?Fi(n):Array.isArray(n)?n.map(s=>qx(s,a)||xy.easeOut):xy[n]}function F2(n,a,s,{delay:o=0,duration:u=300,repeat:h=0,repeatType:f="loop",ease:m="easeOut",times:p}={},g=void 0){const v={[a]:s};p&&(v.offset=p);const x=qx(m,u);Array.isArray(x)&&(v.easing=x);const b={delay:o,duration:u,easing:Array.isArray(x)?"linear":x,fill:"both",iterations:h+1,direction:f==="reverse"?"alternate":"normal"};return g&&(b.pseudoElement=g),n.animate(v,b)}function Yx(n){return typeof n=="function"&&"applyToOptions"in n}function X2({type:n,...a}){return Yx(n)&&Hx()?n.applyToOptions(a):(a.duration??(a.duration=300),a.ease??(a.ease="easeOut"),a)}class Gx extends Sf{constructor(a){if(super(),this.finishedTime=null,this.isStopped=!1,this.manualStartTime=null,!a)return;const{element:s,name:o,keyframes:u,pseudoElement:h,allowFlatten:f=!1,finalKeyframe:m,onComplete:p}=a;this.isPseudoElement=!!h,this.allowFlatten=f,this.options=a,bl(typeof a.type!="string");const g=X2(a);this.animation=F2(s,o,u,g,h),g.autoplay===!1&&this.animation.pause(),this.animation.onfinish=()=>{if(this.finishedTime=this.time,!h){const v=Sl(u,this.options,m,this.speed);this.updateMotionValue&&this.updateMotionValue(v),Lx(s,o,v),this.animation.cancel()}p==null||p(),this.notifyFinished()}}play(){this.isStopped||(this.manualStartTime=null,this.animation.play(),this.state==="finished"&&this.updateFinished())}pause(){this.animation.pause()}complete(){var a,s;(s=(a=this.animation).finish)==null||s.call(a)}cancel(){try{this.animation.cancel()}catch{}}stop(){if(this.isStopped)return;this.isStopped=!0;const{state:a}=this;a==="idle"||a==="finished"||(this.updateMotionValue?this.updateMotionValue():this.commitStyles(),this.isPseudoElement||this.cancel())}commitStyles(){var s,o,u;const a=(s=this.options)==null?void 0:s.element;!this.isPseudoElement&&(a!=null&&a.isConnected)&&((u=(o=this.animation).commitStyles)==null||u.call(o))}get duration(){var s,o;const a=((o=(s=this.animation.effect)==null?void 0:s.getComputedTiming)==null?void 0:o.call(s).duration)||0;return Wt(Number(a))}get iterationDuration(){const{delay:a=0}=this.options||{};return this.duration+Wt(a)}get time(){return Wt(Number(this.animation.currentTime)||0)}set time(a){const s=this.finishedTime!==null;this.manualStartTime=null,this.finishedTime=null,this.animation.currentTime=Ht(a),s&&this.animation.pause()}get speed(){return this.animation.playbackRate}set speed(a){a<0&&(this.finishedTime=null),this.animation.playbackRate=a}get state(){return this.finishedTime!==null?"finished":this.animation.playState}get startTime(){return this.manualStartTime??Number(this.animation.startTime)}set startTime(a){this.manualStartTime=this.animation.startTime=a}attachTimeline({timeline:a,rangeStart:s,rangeEnd:o,observe:u}){var h;return this.allowFlatten&&((h=this.animation.effect)==null||h.updateTiming({easing:"linear"})),this.animation.onfinish=null,a&&P2()?(this.animation.timeline=a,s&&(this.animation.rangeStart=s),o&&(this.animation.rangeEnd=o),It):u(this)}}const Px={anticipate:xx,backInOut:vx,circInOut:Sx};function $2(n){return n in Px}function K2(n){typeof n.ease=="string"&&$2(n.ease)&&(n.ease=Px[n.ease])}const Iu=10;class Z2 extends Gx{constructor(a){K2(a),_x(a),super(a),a.startTime!==void 0&&a.autoplay!==!1&&(this.startTime=a.startTime),this.options=a}updateMotionValue(a){const{motionValue:s,onUpdate:o,onComplete:u,element:h,...f}=this.options;if(!s)return;if(a!==void 0){s.set(a);return}const m=new al({...f,autoplay:!1}),p=Math.max(Iu,xt.now()-this.startTime),g=vn(0,Iu,p-Iu),v=m.sample(p).value,{name:x}=this.options;h&&x&&Lx(h,x,v),s.setWithVelocity(m.sample(Math.max(0,p-g)).value,v,g),m.stop()}}const by=(n,a)=>a==="zIndex"?!1:!!(typeof n=="number"||Array.isArray(n)||typeof n=="string"&&(on.test(n)||n==="0")&&!n.startsWith("url("));function Q2(n){const a=n[0];if(n.length===1)return!0;for(let s=0;s<n.length;s++)if(n[s]!==a)return!0}function J2(n,a,s,o){const u=n[0];if(u===null)return!1;if(a==="display"||a==="visibility")return!0;const h=n[n.length-1],f=by(u,a),m=by(h,a);return!f||!m?!1:Q2(n)||(s==="spring"||Yx(s))&&o}function Od(n){n.duration=0,n.type="keyframes"}const Fx=new Set(["opacity","clipPath","filter","transform","backgroundColor"]),W2=/^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;function I2(n){for(let a=0;a<n.length;a++)if(typeof n[a]=="string"&&W2.test(n[a]))return!0;return!1}const ej=new Set(["color","backgroundColor","outlineColor","fill","stroke","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor"]),tj=fx(()=>Object.hasOwnProperty.call(Element.prototype,"animate"));function nj(n){var x;const{motionValue:a,name:s,repeatDelay:o,repeatType:u,damping:h,type:f,keyframes:m}=n,p=(x=a==null?void 0:a.owner)==null?void 0:x.current;if(!(p instanceof HTMLElement)&&!(p instanceof SVGElement))return!1;const{onUpdate:g,transformTemplate:v}=a.owner.getProps();return tj()&&s&&(Fx.has(s)||ej.has(s)&&I2(m))&&(s!=="transform"||!v)&&!g&&!o&&u!=="mirror"&&h!==0&&f!=="inertia"}const rj=40;class aj extends Sf{constructor({autoplay:a=!0,delay:s=0,type:o="keyframes",repeat:u=0,repeatDelay:h=0,repeatType:f="loop",keyframes:m,name:p,motionValue:g,element:v,...x}){var E;super(),this.stop=()=>{var T,D;this._animation&&(this._animation.stop(),(T=this.stopTimeline)==null||T.call(this)),(D=this.keyframeResolver)==null||D.cancel()},this.createdAt=xt.now();const b={autoplay:a,delay:s,type:o,repeat:u,repeatDelay:h,repeatType:f,name:p,motionValue:g,element:v,...x},j=(v==null?void 0:v.KeyframeResolver)||wf;this.keyframeResolver=new j(m,(T,D,O)=>this.onKeyframesResolved(T,D,b,!O),p,g,v),(E=this.keyframeResolver)==null||E.scheduleResolve()}onKeyframesResolved(a,s,o,u){var O,k;this.keyframeResolver=void 0;const{name:h,type:f,velocity:m,delay:p,isHandoff:g,onUpdate:v}=o;this.resolvedAt=xt.now();let x=!0;J2(a,h,f,m)||(x=!1,(gr.instantAnimations||!p)&&(v==null||v(Sl(a,o,s))),a[0]=a[a.length-1],Od(o),o.repeat=0);const j={startTime:u?this.resolvedAt?this.resolvedAt-this.createdAt>rj?this.resolvedAt:this.createdAt:this.createdAt:void 0,finalKeyframe:s,...o,keyframes:a},E=x&&!g&&nj(j),T=(k=(O=j.motionValue)==null?void 0:O.owner)==null?void 0:k.current;let D;if(E)try{D=new Z2({...j,element:T})}catch{D=new al(j)}else D=new al(j);D.finished.then(()=>{this.notifyFinished()}).catch(It),this.pendingTimeline&&(this.stopTimeline=D.attachTimeline(this.pendingTimeline),this.pendingTimeline=void 0),this._animation=D}get finished(){return this._animation?this.animation.finished:this._finished}then(a,s){return this.finished.finally(a).then(()=>{})}get animation(){var a;return this._animation||((a=this.keyframeResolver)==null||a.resume(),q2()),this._animation}get duration(){return this.animation.duration}get iterationDuration(){return this.animation.iterationDuration}get time(){return this.animation.time}set time(a){this.animation.time=a}get speed(){return this.animation.speed}get state(){return this.animation.state}set speed(a){this.animation.speed=a}get startTime(){return this.animation.startTime}attachTimeline(a){return this._animation?this.stopTimeline=this.animation.attachTimeline(a):this.pendingTimeline=a,()=>this.stop()}play(){this.animation.play()}pause(){this.animation.pause()}complete(){this.animation.complete()}cancel(){var a;this._animation&&this.animation.cancel(),(a=this.keyframeResolver)==null||a.cancel()}}function Xx(n,a,s,o=0,u=1){const h=Array.from(n).sort((g,v)=>g.sortNodePosition(v)).indexOf(a),f=n.size,m=(f-1)*o;return typeof s=="function"?s(h,f):u===1?h*o:m-h*o}const Sy=30,ij=n=>!isNaN(parseFloat(n));class sj{constructor(a,s={}){this.canTrackVelocity=null,this.events={},this.updateAndNotify=o=>{var h;const u=xt.now();if(this.updatedAt!==u&&this.setPrevFrameValue(),this.prev=this.current,this.setCurrent(o),this.current!==this.prev&&((h=this.events.change)==null||h.notify(this.current),this.dependents))for(const f of this.dependents)f.dirty()},this.hasAnimated=!1,this.setCurrent(a),this.owner=s.owner}setCurrent(a){this.current=a,this.updatedAt=xt.now(),this.canTrackVelocity===null&&a!==void 0&&(this.canTrackVelocity=ij(this.current))}setPrevFrameValue(a=this.current){this.prevFrameValue=a,this.prevUpdatedAt=this.updatedAt}onChange(a){return this.on("change",a)}on(a,s){this.events[a]||(this.events[a]=new hf);const o=this.events[a].add(s);return a==="change"?()=>{o(),Ye.read(()=>{this.events.change.getSize()||this.stop()})}:o}clearListeners(){for(const a in this.events)this.events[a].clear()}attach(a,s){this.passiveEffect=a,this.stopPassiveEffect=s}set(a){this.passiveEffect?this.passiveEffect(a,this.updateAndNotify):this.updateAndNotify(a)}setWithVelocity(a,s,o){this.set(s),this.prev=void 0,this.prevFrameValue=a,this.prevUpdatedAt=this.updatedAt-o}jump(a,s=!0){this.updateAndNotify(a),this.prev=a,this.prevUpdatedAt=this.prevFrameValue=void 0,s&&this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}dirty(){var a;(a=this.events.change)==null||a.notify(this.current)}addDependent(a){this.dependents||(this.dependents=new Set),this.dependents.add(a)}removeDependent(a){this.dependents&&this.dependents.delete(a)}get(){return this.current}getPrevious(){return this.prev}getVelocity(){const a=xt.now();if(!this.canTrackVelocity||this.prevFrameValue===void 0||a-this.updatedAt>Sy)return 0;const s=Math.min(this.updatedAt-this.prevUpdatedAt,Sy);return hx(parseFloat(this.current)-parseFloat(this.prevFrameValue),s)}start(a){return this.stop(),new Promise(s=>{this.hasAnimated=!0,this.animation=a(s),this.events.animationStart&&this.events.animationStart.notify()}).then(()=>{this.events.animationComplete&&this.events.animationComplete.notify(),this.clearAnimation()})}stop(){this.animation&&(this.animation.stop(),this.events.animationCancel&&this.events.animationCancel.notify()),this.clearAnimation()}isAnimating(){return!!this.animation}clearAnimation(){delete this.animation}destroy(){var a,s;(a=this.dependents)==null||a.clear(),(s=this.events.destroy)==null||s.notify(),this.clearListeners(),this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}}function qa(n,a){return new sj(n,a)}function $x(n,a){if(n!=null&&n.inherit&&a){const{inherit:s,...o}=n;return{...a,...o}}return n}function jf(n,a){const s=(n==null?void 0:n[a])??(n==null?void 0:n.default)??n;return s!==n?$x(s,n):s}const oj={type:"spring",stiffness:500,damping:25,restSpeed:10},lj=n=>({type:"spring",stiffness:550,damping:n===0?2*Math.sqrt(550):30,restSpeed:10}),cj={type:"keyframes",duration:.8},uj={type:"keyframes",ease:[.25,.1,.35,1],duration:.3},dj=(n,{keyframes:a})=>a.length>2?cj:Xa.has(n)?n.startsWith("scale")?lj(a[1]):oj:uj,fj=new Set(["when","delay","delayChildren","staggerChildren","staggerDirection","repeat","repeatType","repeatDelay","from","elapsed"]);function hj(n){for(const a in n)if(!fj.has(a))return!0;return!1}const Ef=(n,a,s,o={},u,h)=>f=>{const m=jf(o,n)||{},p=m.delay||o.delay||0;let{elapsed:g=0}=o;g=g-Ht(p);const v={keyframes:Array.isArray(s)?s:[null,s],ease:"easeOut",velocity:a.getVelocity(),...m,delay:-g,onUpdate:b=>{a.set(b),m.onUpdate&&m.onUpdate(b)},onComplete:()=>{f(),m.onComplete&&m.onComplete()},name:n,motionValue:a,element:h?void 0:u};hj(m)||Object.assign(v,dj(n,v)),v.duration&&(v.duration=Ht(v.duration)),v.repeatDelay&&(v.repeatDelay=Ht(v.repeatDelay)),v.from!==void 0&&(v.keyframes[0]=v.from);let x=!1;if((v.type===!1||v.duration===0&&!v.repeatDelay)&&(Od(v),v.delay===0&&(x=!0)),(gr.instantAnimations||gr.skipAnimations||u!=null&&u.shouldSkipAnimations||m.skipAnimations)&&(x=!0,Od(v),v.delay=0),v.allowFlatten=!m.type&&!m.ease,x&&!h&&a.get()!==void 0){const b=Sl(v.keyframes,m);if(b!==void 0){Ye.update(()=>{v.onUpdate(b),v.onComplete()});return}}return m.isSync?new al(v):new aj(v)},mj=/^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;function pj(n){const a=mj.exec(n);if(!a)return[,];const[,s,o,u]=a;return[`--${s??o}`,u]}function Kx(n,a,s=1){const[o,u]=pj(n);if(!o)return;const h=window.getComputedStyle(a).getPropertyValue(o);if(h){const f=h.trim();return cx(f)?parseFloat(f):f}return gf(u)?Kx(u,a,s+1):u}function wy(n){const a=[{},{}];return n==null||n.values.forEach((s,o)=>{a[0][o]=s.get(),a[1][o]=s.getVelocity()}),a}function Tf(n,a,s,o){if(typeof a=="function"){const[u,h]=wy(o);a=a(s!==void 0?s:n.custom,u,h)}if(typeof a=="string"&&(a=n.variants&&n.variants[a]),typeof a=="function"){const[u,h]=wy(o);a=a(s!==void 0?s:n.custom,u,h)}return a}function Gr(n,a,s){const o=n.getProps();return Tf(o,a,s!==void 0?s:o.custom,n)}const Zx=new Set(["width","height","top","left","right","bottom",...Fa]),zd=n=>Array.isArray(n);function gj(n,a,s){n.hasValue(a)?n.getValue(a).set(s):n.addValue(a,qa(s))}function yj(n){return zd(n)?n[n.length-1]||0:n}function vj(n,a){const s=Gr(n,a);let{transitionEnd:o={},transition:u={},...h}=s||{};h={...h,...o};for(const f in h){const m=yj(h[f]);gj(n,f,m)}}const pt=n=>!!(n&&n.getVelocity);function xj(n){return!!(pt(n)&&n.add)}function _d(n,a){const s=n.getValue("willChange");if(xj(s))return s.add(a);if(!s&&gr.WillChange){const o=new gr.WillChange("auto");n.addValue("willChange",o),o.add(a)}}function Cf(n){return n.replace(/([A-Z])/g,a=>`-${a.toLowerCase()}`)}const bj="framerAppearId",Qx="data-"+Cf(bj);function Jx(n){return n.props[Qx]}function Sj({protectedKeys:n,needsAnimating:a},s){const o=n.hasOwnProperty(s)&&a[s]!==!0;return a[s]=!1,o}function Wx(n,a,{delay:s=0,transitionOverride:o,type:u}={}){let{transition:h,transitionEnd:f,...m}=a;const p=n.getDefaultTransition();h=h?$x(h,p):p;const g=h==null?void 0:h.reduceMotion,v=h==null?void 0:h.skipAnimations;o&&(h=o);const x=[],b=u&&n.animationState&&n.animationState.getState()[u],j=h==null?void 0:h.path;j&&j.animateVisualElement(n,m,h,s,x);for(const E in m){const T=n.getValue(E,n.latestValues[E]??null),D=m[E];if(D===void 0||b&&Sj(b,E))continue;const O={delay:s,...jf(h||{},E)};v&&(O.skipAnimations=!0);const k=T.get();if(k!==void 0&&!T.isAnimating()&&!Array.isArray(D)&&D===k&&!O.velocity){Ye.update(()=>T.set(D));continue}let B=!1;if(window.MotionHandoffAnimation){const q=Jx(n);if(q){const N=window.MotionHandoffAnimation(q,E,Ye);N!==null&&(O.startTime=N,B=!0)}}_d(n,E);const _=g??n.shouldReduceMotion;T.start(Ef(E,T,D,_&&Zx.has(E)?{type:!1}:O,n,B));const U=T.animation;U&&x.push(U)}if(f){const E=()=>Ye.update(()=>{f&&vj(n,f)});x.length?Promise.all(x).then(E):E()}return x}function Vd(n,a,s={}){var p;const o=Gr(n,a,s.type==="exit"?(p=n.presenceContext)==null?void 0:p.custom:void 0);let{transition:u=n.getDefaultTransition()||{}}=o||{};s.transitionOverride&&(u=s.transitionOverride);const h=o?()=>Promise.all(Wx(n,o,s)):()=>Promise.resolve(),f=n.variantChildren&&n.variantChildren.size?(g=0)=>{const{delayChildren:v=0,staggerChildren:x,staggerDirection:b}=u;return wj(n,a,g,v,x,b,s)}:()=>Promise.resolve(),{when:m}=u;if(m){const[g,v]=m==="beforeChildren"?[h,f]:[f,h];return g().then(()=>v())}else return Promise.all([h(),f(s.delay)])}function wj(n,a,s=0,o=0,u=0,h=1,f){const m=[];for(const p of n.variantChildren)p.notify("AnimationStart",a),m.push(Vd(p,a,{...f,delay:s+(typeof o=="function"?0:o)+Xx(n.variantChildren,p,o,u,h)}).then(()=>p.notify("AnimationComplete",a)));return Promise.all(m)}function jj(n,a,s={}){n.notify("AnimationStart",a);let o;if(Array.isArray(a)){const u=a.map(h=>Vd(n,h,s));o=Promise.all(u)}else if(typeof a=="string")o=Vd(n,a,s);else{const u=typeof a=="function"?Gr(n,a,s.custom):a;o=Promise.all(Wx(n,u,s))}return o.then(()=>{n.notify("AnimationComplete",a)})}const Ej={test:n=>n==="auto",parse:n=>n},Ix=n=>a=>a.test(n),eb=[Pa,de,yn,Ln,Qw,Zw,Ej],jy=n=>eb.find(Ix(n));function Tj(n){return typeof n=="number"?n===0:n!==null?n==="none"||n==="0"||dx(n):!0}const Cj=new Set(["brightness","contrast","saturate","opacity"]);function Dj(n){const[a,s]=n.slice(0,-1).split("(");if(a==="drop-shadow")return n;const[o]=s.match(yf)||[];if(!o)return n;const u=s.replace(o,"");let h=Cj.has(a)?1:0;return o!==s&&(h*=100),a+"("+h+u+")"}const Nj=/\b([a-z-]*)\(.*?\)/gu,Bd={...on,getAnimatableNone:n=>{const a=n.match(Nj);return a?a.map(Dj).join(" "):n}},Ld={...on,getAnimatableNone:n=>{const a=on.parse(n);return on.createTransformer(n)(a.map(o=>typeof o=="number"?0:typeof o=="object"?{...o,alpha:1}:o))}},Ey={...Pa,transform:Math.round},Aj={rotate:Ln,pathRotation:Ln,rotateX:Ln,rotateY:Ln,rotateZ:Ln,scale:ko,scaleX:ko,scaleY:ko,scaleZ:ko,skew:Ln,skewX:Ln,skewY:Ln,distance:de,translateX:de,translateY:de,translateZ:de,x:de,y:de,z:de,perspective:de,transformPerspective:de,opacity:Ii,originX:uy,originY:uy,originZ:de},il={borderWidth:de,borderTopWidth:de,borderRightWidth:de,borderBottomWidth:de,borderLeftWidth:de,borderRadius:de,borderTopLeftRadius:de,borderTopRightRadius:de,borderBottomRightRadius:de,borderBottomLeftRadius:de,width:de,maxWidth:de,height:de,maxHeight:de,top:de,right:de,bottom:de,left:de,inset:de,insetBlock:de,insetBlockStart:de,insetBlockEnd:de,insetInline:de,insetInlineStart:de,insetInlineEnd:de,padding:de,paddingTop:de,paddingRight:de,paddingBottom:de,paddingLeft:de,paddingBlock:de,paddingBlockStart:de,paddingBlockEnd:de,paddingInline:de,paddingInlineStart:de,paddingInlineEnd:de,margin:de,marginTop:de,marginRight:de,marginBottom:de,marginLeft:de,marginBlock:de,marginBlockStart:de,marginBlockEnd:de,marginInline:de,marginInlineStart:de,marginInlineEnd:de,fontSize:de,backgroundPositionX:de,backgroundPositionY:de,...Aj,zIndex:Ey,fillOpacity:Ii,strokeOpacity:Ii,numOctaves:Ey},Mj={...il,color:rt,backgroundColor:rt,outlineColor:rt,fill:rt,stroke:rt,borderColor:rt,borderTopColor:rt,borderRightColor:rt,borderBottomColor:rt,borderLeftColor:rt,filter:Bd,WebkitFilter:Bd,mask:Ld,WebkitMask:Ld},tb=n=>Mj[n],kj=new Set([Bd,Ld]);function nb(n,a){let s=tb(n);return kj.has(s)||(s=on),s.getAnimatableNone?s.getAnimatableNone(a):void 0}const Rj=new Set(["auto","none","0"]);function Oj(n,a,s){let o=0,u;for(;o<n.length&&!u;){const h=n[o];typeof h=="string"&&!Rj.has(h)&&Ha(h).values.length&&(u=n[o]),o++}if(u&&s)for(const h of a)n[h]=nb(s,u)}class zj extends wf{constructor(a,s,o,u,h){super(a,s,o,u,h,!0)}readKeyframes(){const{unresolvedKeyframes:a,element:s,name:o}=this;if(!s||!s.current)return;super.readKeyframes();for(let v=0;v<a.length;v++){let x=a[v];if(typeof x=="string"&&(x=x.trim(),gf(x))){const b=Kx(x,s.current);b!==void 0&&(a[v]=b),v===a.length-1&&(this.finalKeyframe=x)}}if(this.resolveNoneKeyframes(),!Zx.has(o)||a.length!==2)return;const[u,h]=a,f=jy(u),m=jy(h),p=cy(u),g=cy(h);if(p!==g&&mr[o]){this.needsMeasurement=!0;return}if(f!==m)if(vy(f)&&vy(m))for(let v=0;v<a.length;v++){const x=a[v];typeof x=="string"&&(a[v]=parseFloat(x))}else mr[o]&&(this.needsMeasurement=!0)}resolveNoneKeyframes(){const{unresolvedKeyframes:a,name:s}=this,o=[];for(let u=0;u<a.length;u++)(a[u]===null||Tj(a[u]))&&o.push(u);o.length&&Oj(a,o,s)}measureInitialState(){const{element:a,unresolvedKeyframes:s,name:o}=this;if(!a||!a.current)return;o==="height"&&(this.suspendedScrollY=window.pageYOffset),this.measuredOrigin=mr[o](a.measureViewportBox(),window.getComputedStyle(a.current)),s[0]=this.measuredOrigin;const u=s[s.length-1];u!==void 0&&a.getValue(o,u).jump(u,!1)}measureEndState(){var m;const{element:a,name:s,unresolvedKeyframes:o}=this;if(!a||!a.current)return;const u=a.getValue(s);u&&u.jump(this.measuredOrigin,!1);const h=o.length-1,f=o[h];o[h]=mr[s](a.measureViewportBox(),window.getComputedStyle(a.current)),f!==null&&this.finalKeyframe===void 0&&(this.finalKeyframe=f),(m=this.removedTransforms)!=null&&m.length&&this.removedTransforms.forEach(([p,g])=>{a.getValue(p).set(g)}),this.resolveNoneKeyframes()}}const Df=["borderTopLeftRadius","borderTopRightRadius","borderBottomRightRadius","borderBottomLeftRadius"];function rb(n,a,s){if(n==null)return[];if(n instanceof EventTarget)return[n];if(typeof n=="string"){let o=document;const u=(s==null?void 0:s[n])??o.querySelectorAll(n);return u?Array.from(u):[]}return Array.from(n).filter(o=>o!=null)}const Ud=(n,a)=>a&&typeof n=="number"?a.transform(n):n;function Po(n){return ux(n)&&"offsetHeight"in n&&!("ownerSVGElement"in n)}const{schedule:Nf}=Ex(queueMicrotask,!1),sn={x:!1,y:!1};function ab(){return sn.x||sn.y}function _j(n){return n==="x"||n==="y"?sn[n]?null:(sn[n]=!0,()=>{sn[n]=!1}):sn.x||sn.y?null:(sn.x=sn.y=!0,()=>{sn.x=sn.y=!1})}function ib(n,a){const s=rb(n),o=new AbortController,u={passive:!0,...a,signal:o.signal};return[s,u,()=>o.abort()]}function Vj(n){return!(n.pointerType==="touch"||ab())}function Bj(n,a,s={}){const[o,u,h]=ib(n,s);return o.forEach(f=>{let m=!1,p=!1,g;const v=()=>{f.removeEventListener("pointerleave",E)},x=D=>{g&&(g(D),g=void 0),v()},b=D=>{m=!1,window.removeEventListener("pointerup",b),window.removeEventListener("pointercancel",b),p&&(p=!1,x(D))},j=()=>{m=!0,window.addEventListener("pointerup",b,u),window.addEventListener("pointercancel",b,u)},E=D=>{if(D.pointerType!=="touch"){if(m){p=!0;return}x(D)}},T=D=>{if(!Vj(D))return;p=!1;const O=a(f,D);typeof O=="function"&&(g=O,f.addEventListener("pointerleave",E,u))};f.addEventListener("pointerenter",T,u),f.addEventListener("pointerdown",j,u)}),h}const sb=(n,a)=>a?n===a?!0:sb(n,a.parentElement):!1,Af=n=>n.pointerType==="mouse"?typeof n.button!="number"||n.button<=0:n.isPrimary!==!1,Lj=new Set(["BUTTON","INPUT","SELECT","TEXTAREA","A"]);function Uj(n){return Lj.has(n.tagName)||n.isContentEditable===!0}const Hj=new Set(["INPUT","SELECT","TEXTAREA"]);function qj(n){return Hj.has(n.tagName)||n.isContentEditable===!0}const Fo=new WeakSet;function Ty(n){return a=>{a.key==="Enter"&&n(a)}}function ed(n,a){n.dispatchEvent(new PointerEvent("pointer"+a,{isPrimary:!0,bubbles:!0}))}const Yj=(n,a)=>{const s=n.currentTarget;if(!s)return;const o=Ty(()=>{if(Fo.has(s))return;ed(s,"down");const u=Ty(()=>{ed(s,"up")}),h=()=>ed(s,"cancel");s.addEventListener("keyup",u,a),s.addEventListener("blur",h,a)});s.addEventListener("keydown",o,a),s.addEventListener("blur",()=>s.removeEventListener("keydown",o),a)};function Cy(n){return Af(n)&&!ab()}const Dy=new WeakSet;function Gj(n,a,s={}){const[o,u,h]=ib(n,s),f=m=>{const p=m.currentTarget;if(!Cy(m)||Dy.has(m))return;Fo.add(p),s.stopPropagation&&Dy.add(m);const g=a(p,m),v={...u,capture:!0},x=(E,T)=>{window.removeEventListener("pointerup",b,v),window.removeEventListener("pointercancel",j,v),Fo.has(p)&&Fo.delete(p),Cy(E)&&typeof g=="function"&&g(E,{success:T})},b=E=>{x(E,p===window||p===document||s.useGlobalTarget||sb(p,E.target))},j=E=>{x(E,!1)};window.addEventListener("pointerup",b,v),window.addEventListener("pointercancel",j,v)};return o.forEach(m=>{(s.useGlobalTarget?window:m).addEventListener("pointerdown",f,u),Po(m)&&(m.addEventListener("focus",g=>Yj(g,u)),!Uj(m)&&!m.hasAttribute("tabindex")&&(m.tabIndex=0))}),h}function Mf(n){return ux(n)&&"ownerSVGElement"in n}const Xo=new WeakMap;let fr;const ob=(n,a,s)=>(o,u)=>u&&u[0]?u[0][n+"Size"]:Mf(o)&&"getBBox"in o?o.getBBox()[a]:o[s],Pj=ob("inline","width","offsetWidth"),Fj=ob("block","height","offsetHeight");function Xj({target:n,borderBoxSize:a}){var s;(s=Xo.get(n))==null||s.forEach(o=>{o(n,{get width(){return Pj(n,a)},get height(){return Fj(n,a)}})})}function $j(n){n.forEach(Xj)}function Kj(){typeof ResizeObserver>"u"||(fr=new ResizeObserver($j))}function Zj(n,a){fr||Kj();const s=rb(n);return s.forEach(o=>{let u=Xo.get(o);u||(u=new Set,Xo.set(o,u)),u.add(a),fr==null||fr.observe(o)}),()=>{s.forEach(o=>{const u=Xo.get(o);u==null||u.delete(a),u!=null&&u.size||fr==null||fr.unobserve(o)})}}const $o=new Set;let Ba;function Qj(){Ba=()=>{const n={get width(){return window.innerWidth},get height(){return window.innerHeight}};$o.forEach(a=>a(n))},window.addEventListener("resize",Ba)}function Jj(n){return $o.add(n),Ba||Qj(),()=>{$o.delete(n),!$o.size&&typeof Ba=="function"&&(window.removeEventListener("resize",Ba),Ba=void 0)}}function Ny(n,a){return typeof n=="function"?Jj(n):Zj(n,a)}function Wj(n){return Mf(n)&&n.tagName==="svg"}const Ij=[...eb,rt,on],eE=n=>Ij.find(Ix(n)),Ay=()=>({translate:0,scale:1,origin:0,originPoint:0}),La=()=>({x:Ay(),y:Ay()}),My=()=>({min:0,max:0}),it=()=>({x:My(),y:My()}),tE=new WeakMap;function wl(n){return n!==null&&typeof n=="object"&&typeof n.start=="function"}function es(n){return typeof n=="string"||Array.isArray(n)}const kf=["animate","whileInView","whileFocus","whileHover","whileTap","whileDrag","exit"],Rf=["initial",...kf];function jl(n){return wl(n.animate)||Rf.some(a=>es(n[a]))}function lb(n){return!!(jl(n)||n.variants)}function nE(n,a,s){for(const o in a){const u=a[o],h=s[o];if(pt(u))n.addValue(o,u);else if(pt(h))n.addValue(o,qa(u,{owner:n}));else if(h!==u)if(n.hasValue(o)){const f=n.getValue(o);f.liveStyle===!0?f.jump(u):f.hasAnimated||f.set(u)}else{const f=n.getStaticValue(o);n.addValue(o,qa(f!==void 0?f:u,{owner:n}))}}for(const o in s)a[o]===void 0&&n.removeValue(o);return a}const sl={current:null},Of={current:!1},rE=typeof window<"u";function cb(){if(Of.current=!0,!!rE)if(window.matchMedia){const n=window.matchMedia("(prefers-reduced-motion)"),a=()=>sl.current=n.matches;n.addEventListener("change",a),a()}else sl.current=!1}const ky=["AnimationStart","AnimationComplete","Update","BeforeLayoutMeasure","LayoutMeasure","LayoutAnimationStart","LayoutAnimationComplete"];let ol={};function ub(n){ol=n}function aE(){return ol}class iE{scrapeMotionValuesFromProps(a,s,o){return{}}constructor({parent:a,props:s,presenceContext:o,reducedMotionConfig:u,skipAnimations:h,blockInitialAnimation:f,visualState:m},p={}){this.current=null,this.children=new Set,this.isVariantNode=!1,this.isControllingVariants=!1,this.shouldReduceMotion=null,this.shouldSkipAnimations=!1,this.values=new Map,this.KeyframeResolver=wf,this.features={},this.valueSubscriptions=new Map,this.prevMotionValues={},this.hasBeenMounted=!1,this.events={},this.propEventSubscriptions={},this.notifyUpdate=()=>this.notify("Update",this.latestValues),this.render=()=>{this.current&&(this.triggerBuild(),this.renderInstance(this.current,this.renderState,this.props.style,this.projection))},this.renderScheduledAt=0,this.scheduleRender=()=>{const j=xt.now();this.renderScheduledAt<j&&(this.renderScheduledAt=j,Ye.render(this.render,!1,!0))};const{latestValues:g,renderState:v}=m;this.latestValues=g,this.baseTarget={...g},this.initialValues=s.initial?{...g}:{},this.renderState=v,this.parent=a,this.props=s,this.presenceContext=o,this.depth=a?a.depth+1:0,this.reducedMotionConfig=u,this.skipAnimationsConfig=h,this.options=p,this.blockInitialAnimation=!!f,this.isControllingVariants=jl(s),this.isVariantNode=lb(s),this.isVariantNode&&(this.variantChildren=new Set),this.manuallyAnimateOnMount=!!(a&&a.current);const{willChange:x,...b}=this.scrapeMotionValuesFromProps(s,{},this);for(const j in b){const E=b[j];g[j]!==void 0&&pt(E)&&E.set(g[j])}}mount(a){var s,o;if(this.hasBeenMounted)for(const u in this.initialValues)(s=this.values.get(u))==null||s.jump(this.initialValues[u]),this.latestValues[u]=this.initialValues[u];this.current=a,tE.set(a,this),this.projection&&!this.projection.instance&&this.projection.mount(a),this.parent&&this.isVariantNode&&!this.isControllingVariants&&(this.removeFromVariantTree=this.parent.addVariantChild(this)),this.values.forEach((u,h)=>this.bindToMotionValue(h,u)),this.reducedMotionConfig==="never"?this.shouldReduceMotion=!1:this.reducedMotionConfig==="always"?this.shouldReduceMotion=!0:(Of.current||cb(),this.shouldReduceMotion=sl.current),this.shouldSkipAnimations=this.skipAnimationsConfig??!1,(o=this.parent)==null||o.addChild(this),this.update(this.props,this.presenceContext),this.hasBeenMounted=!0}unmount(){var a;this.projection&&this.projection.unmount(),yr(this.notifyUpdate),yr(this.render),this.valueSubscriptions.forEach(s=>s()),this.valueSubscriptions.clear(),this.removeFromVariantTree&&this.removeFromVariantTree(),(a=this.parent)==null||a.removeChild(this);for(const s in this.events)this.events[s].clear();for(const s in this.features){const o=this.features[s];o&&(o.unmount(),o.isMounted=!1)}this.current=null}addChild(a){this.children.add(a),this.enteringChildren??(this.enteringChildren=new Set),this.enteringChildren.add(a)}removeChild(a){this.children.delete(a),this.enteringChildren&&this.enteringChildren.delete(a)}bindToMotionValue(a,s){if(this.valueSubscriptions.has(a)&&this.valueSubscriptions.get(a)(),s.accelerate&&Fx.has(a)&&this.current instanceof HTMLElement){const{factory:f,keyframes:m,times:p,ease:g,duration:v}=s.accelerate,x=new Gx({element:this.current,name:a,keyframes:m,times:p,ease:g,duration:Ht(v)}),b=f(x);this.valueSubscriptions.set(a,()=>{b(),x.cancel()});return}const o=Xa.has(a);o&&this.onBindTransform&&this.onBindTransform();const u=s.on("change",f=>{this.latestValues[a]=f,this.props.onUpdate&&Ye.preRender(this.notifyUpdate),o&&this.projection&&(this.projection.isTransformDirty=!0),this.scheduleRender()});let h;typeof window<"u"&&window.MotionCheckAppearSync&&(h=window.MotionCheckAppearSync(this,a,s)),this.valueSubscriptions.set(a,()=>{u(),h&&h()})}sortNodePosition(a){return!this.current||!this.sortInstanceNodePosition||this.type!==a.type?0:this.sortInstanceNodePosition(this.current,a.current)}updateFeatures(){let a="animation";for(a in ol){const s=ol[a];if(!s)continue;const{isEnabled:o,Feature:u}=s;if(!this.features[a]&&u&&o(this.props)&&(this.features[a]=new u(this)),this.features[a]){const h=this.features[a];h.isMounted?h.update():(h.mount(),h.isMounted=!0)}}}triggerBuild(){this.build(this.renderState,this.latestValues,this.props)}measureViewportBox(){return this.current?this.measureInstanceViewportBox(this.current,this.props):it()}getStaticValue(a){return this.latestValues[a]}setStaticValue(a,s){this.latestValues[a]=s}update(a,s){(a.transformTemplate||this.props.transformTemplate)&&this.scheduleRender(),this.prevProps=this.props,this.props=a,this.prevPresenceContext=this.presenceContext,this.presenceContext=s;for(let o=0;o<ky.length;o++){const u=ky[o];this.propEventSubscriptions[u]&&(this.propEventSubscriptions[u](),delete this.propEventSubscriptions[u]);const h="on"+u,f=a[h];f&&(this.propEventSubscriptions[u]=this.on(u,f))}this.prevMotionValues=nE(this,this.scrapeMotionValuesFromProps(a,this.prevProps||{},this),this.prevMotionValues),this.handleChildMotionValue&&this.handleChildMotionValue()}getProps(){return this.props}getVariant(a){return this.props.variants?this.props.variants[a]:void 0}getDefaultTransition(){return this.props.transition}getTransformPagePoint(){return this.props.transformPagePoint}getClosestVariantNode(){return this.isVariantNode?this:this.parent?this.parent.getClosestVariantNode():void 0}addVariantChild(a){const s=this.getClosestVariantNode();if(s)return s.variantChildren&&s.variantChildren.add(a),()=>s.variantChildren.delete(a)}addValue(a,s){const o=this.values.get(a);s!==o&&(o&&this.removeValue(a),this.bindToMotionValue(a,s),this.values.set(a,s),this.latestValues[a]=s.get())}removeValue(a){this.values.delete(a);const s=this.valueSubscriptions.get(a);s&&(s(),this.valueSubscriptions.delete(a)),delete this.latestValues[a],this.removeValueFromRenderState(a,this.renderState)}hasValue(a){return this.values.has(a)}getValue(a,s){if(this.props.values&&this.props.values[a])return this.props.values[a];let o=this.values.get(a);return o===void 0&&s!==void 0&&(o=qa(s===null?void 0:s,{owner:this}),this.addValue(a,o)),o}readValue(a,s){let o=this.latestValues[a]!==void 0||!this.current?this.latestValues[a]:this.getBaseTargetFromProps(this.props,a)??this.readValueFromInstance(this.current,a,this.options);return o!=null&&(typeof o=="string"&&(cx(o)||dx(o))?o=parseFloat(o):!eE(o)&&on.test(s)&&(o=nb(a,s)),this.setBaseTarget(a,pt(o)?o.get():o)),pt(o)?o.get():o}setBaseTarget(a,s){this.baseTarget[a]=s}getBaseTarget(a){var h;const{initial:s}=this.props;let o;if(typeof s=="string"||typeof s=="object"){const f=Tf(this.props,s,(h=this.presenceContext)==null?void 0:h.custom);f&&(o=f[a])}if(s&&o!==void 0)return o;const u=this.getBaseTargetFromProps(this.props,a);return u!==void 0&&!pt(u)?u:this.initialValues[a]!==void 0&&o===void 0?void 0:this.baseTarget[a]}on(a,s){return this.events[a]||(this.events[a]=new hf),this.events[a].add(s)}notify(a,...s){this.events[a]&&this.events[a].notify(...s)}scheduleRenderMicrotask(){Nf.render(this.render)}}class db extends iE{constructor(){super(...arguments),this.KeyframeResolver=zj}sortInstanceNodePosition(a,s){return a.compareDocumentPosition(s)&2?1:-1}getBaseTargetFromProps(a,s){const o=a.style;return o?o[s]:void 0}removeValueFromRenderState(a,{vars:s,style:o}){delete s[a],delete o[a]}handleChildMotionValue(){this.childSubscription&&(this.childSubscription(),delete this.childSubscription);const{children:a}=this.props;pt(a)&&(this.childSubscription=a.on("change",s=>{this.current&&(this.current.textContent=`${s}`)}))}}class xr{constructor(a){this.isMounted=!1,this.node=a}update(){}}function fb({top:n,left:a,right:s,bottom:o}){return{x:{min:a,max:s},y:{min:n,max:o}}}function sE({x:n,y:a}){return{top:a.min,right:n.max,bottom:a.max,left:n.min}}function oE(n,a){if(!a)return n;const s=a({x:n.left,y:n.top}),o=a({x:n.right,y:n.bottom});return{top:s.y,left:s.x,bottom:o.y,right:o.x}}function td(n){return n===void 0||n===1}function Hd({scale:n,scaleX:a,scaleY:s}){return!td(n)||!td(a)||!td(s)}function Ur(n){return Hd(n)||hb(n)||n.z||n.rotate||n.rotateX||n.rotateY||n.skewX||n.skewY}function hb(n){return Ry(n.x)||Ry(n.y)}function Ry(n){return n&&n!=="0%"}function ll(n,a,s){const o=n-s,u=a*o;return s+u}function Oy(n,a,s,o,u){return u!==void 0&&(n=ll(n,u,o)),ll(n,s,o)+a}function qd(n,a=0,s=1,o,u){n.min=Oy(n.min,a,s,o,u),n.max=Oy(n.max,a,s,o,u)}function mb(n,{x:a,y:s}){qd(n.x,a.translate,a.scale,a.originPoint),qd(n.y,s.translate,s.scale,s.originPoint)}const zy=.999999999999,_y=1.0000000000001;function lE(n,a,s,o=!1){var m;const u=s.length;if(!u)return;a.x=a.y=1;let h,f;for(let p=0;p<u;p++){h=s[p],f=h.projectionDelta;const{visualElement:g}=h.options;g&&g.props.style&&g.props.style.display==="contents"||(o&&h.options.layoutScroll&&h.scroll&&h!==h.root&&(pn(n.x,-h.scroll.offset.x),pn(n.y,-h.scroll.offset.y)),f&&(a.x*=f.x.scale,a.y*=f.y.scale,mb(n,f)),o&&Ur(h.latestValues)&&Ko(n,h.latestValues,(m=h.layout)==null?void 0:m.layoutBox))}a.x<_y&&a.x>zy&&(a.x=1),a.y<_y&&a.y>zy&&(a.y=1)}function pn(n,a){n.min+=a,n.max+=a}function Vy(n,a,s,o,u=.5){const h=qe(n.min,n.max,u);qd(n,a,s,h,o)}function By(n,a){return typeof n=="string"?parseFloat(n)/100*(a.max-a.min):n}function Ko(n,a,s){const o=s??n;Vy(n.x,By(a.x,o.x),a.scaleX,a.scale,a.originX),Vy(n.y,By(a.y,o.y),a.scaleY,a.scale,a.originY)}function pb(n,a){return fb(oE(n.getBoundingClientRect(),a))}function cE(n,a,s){const o=pb(n,s),{scroll:u}=a;return u&&(pn(o.x,u.offset.x),pn(o.y,u.offset.y)),o}const uE={x:"translateX",y:"translateY",z:"translateZ",transformPerspective:"perspective"},dE=Fa.length;function fE(n,a,s){let o="",u=!0;for(let f=0;f<dE;f++){const m=Fa[f],p=n[m];if(p===void 0)continue;let g=!0;if(typeof p=="number")g=p===(m.startsWith("scale")?1:0);else{const v=parseFloat(p);g=m.startsWith("scale")?v===1:v===0}if(!g||s){const v=Ud(p,il[m]);if(!g){u=!1;const x=uE[m]||m;o+=`${x}(${v}) `}s&&(a[m]=v)}}const h=n.pathRotation;return h&&(u=!1,o+=`rotate(${Ud(h,il.pathRotation)}) `),o=o.trim(),s?o=s(a,u?"":o):u&&(o="none"),o}function zf(n,a,s){const{style:o,vars:u,transformOrigin:h}=n;let f=!1,m=!1;for(const p in a){const g=a[p];if(Xa.has(p)){f=!0;continue}else if(Cx(p)){u[p]=g;continue}else{const v=Ud(g,il[p]);p.startsWith("origin")?(m=!0,h[p]=v):o[p]=v}}if(a.transform||(f||s?o.transform=fE(a,n.transform,s):o.transform&&(o.transform="none")),m){const{originX:p="50%",originY:g="50%",originZ:v=0}=h;o.transformOrigin=`${p} ${g} ${v}`}}function gb(n,{style:a,vars:s},o,u){const h=n.style;let f;for(f in a)h[f]=a[f];u==null||u.applyProjectionStyles(h,o);for(f in s)h.setProperty(f,s[f])}function Ly(n,a){return a.max===a.min?0:n/(a.max-a.min)*100}const Gi={correct:(n,a)=>{if(!a.target)return n;if(typeof n=="string")if(de.test(n))n=parseFloat(n);else return n;const s=Ly(n,a.target.x),o=Ly(n,a.target.y);return`${s}% ${o}%`}},hE={correct:(n,{treeScale:a,projectionDelta:s})=>{const o=n,u=on.parse(n);if(u.length>5)return o;const h=on.createTransformer(n),f=typeof u[0]!="number"?1:0,m=s.x.scale*a.x,p=s.y.scale*a.y;u[0+f]/=m,u[1+f]/=p;const g=qe(m,p,.5);return typeof u[2+f]=="number"&&(u[2+f]/=g),typeof u[3+f]=="number"&&(u[3+f]/=g),h(u)}},Yd={borderRadius:{...Gi,applyTo:[...Df]},borderTopLeftRadius:Gi,borderTopRightRadius:Gi,borderBottomLeftRadius:Gi,borderBottomRightRadius:Gi,boxShadow:hE};function yb(n,{layout:a,layoutId:s}){return Xa.has(n)||n.startsWith("origin")||(a||s!==void 0)&&(!!Yd[n]||n==="opacity")}function _f(n,a,s){var f;const o=n.style,u=a==null?void 0:a.style,h={};if(!o)return h;for(const m in o)(pt(o[m])||u&&pt(u[m])||yb(m,n)||((f=s==null?void 0:s.getValue(m))==null?void 0:f.liveStyle)!==void 0)&&(h[m]=o[m]);return h}function mE(n){return window.getComputedStyle(n)}class pE extends db{constructor(){super(...arguments),this.type="html",this.renderInstance=gb}mount(a){bl(!!a.style),super.mount(a)}readValueFromInstance(a,s){var o;if(Xa.has(s))return(o=this.projection)!=null&&o.isProjecting?Nd(s):V2(a,s);{const u=mE(a),h=(Cx(s)?u.getPropertyValue(s):u[s])||0;return typeof h=="string"?h.trim():h}}measureInstanceViewportBox(a,{transformPagePoint:s}){return pb(a,s)}build(a,s,o){zf(a,s,o.transformTemplate)}scrapeMotionValuesFromProps(a,s,o){return _f(a,s,o)}}const gE={offset:"stroke-dashoffset",array:"stroke-dasharray"},yE={offset:"strokeDashoffset",array:"strokeDasharray"};function vE(n,a,s=1,o=0,u=!0){n.pathLength=1;const h=u?gE:yE;n[h.offset]=`${-o}`,n[h.array]=`${a} ${s}`}const xE=["offsetDistance","offsetPath","offsetRotate","offsetAnchor"];function vb(n,{attrX:a,attrY:s,attrScale:o,pathLength:u,pathSpacing:h=1,pathOffset:f=0,...m},p,g,v){if(zf(n,m,g),p){n.style.viewBox&&(n.attrs.viewBox=n.style.viewBox);return}n.attrs=n.style,n.style={};const{attrs:x,style:b}=n;x.transform&&(b.transform=x.transform,delete x.transform),(b.transform||x.transformOrigin)&&(b.transformOrigin=x.transformOrigin??"50% 50%",delete x.transformOrigin),b.transform&&(b.transformBox=(v==null?void 0:v.transformBox)??"fill-box",delete x.transformBox);for(const j of xE)x[j]!==void 0&&(b[j]=x[j],delete x[j]);a!==void 0&&(x.x=a),s!==void 0&&(x.y=s),o!==void 0&&(x.scale=o),u!==void 0&&vE(x,u,h,f,!1)}const xb=new Set(["baseFrequency","diffuseConstant","kernelMatrix","kernelUnitLength","keySplines","keyTimes","limitingConeAngle","markerHeight","markerWidth","numOctaves","targetX","targetY","surfaceScale","specularConstant","specularExponent","stdDeviation","tableValues","viewBox","gradientTransform","pathLength","startOffset","textLength","lengthAdjust"]),bb=n=>typeof n=="string"&&n.toLowerCase()==="svg";function bE(n,a,s,o){gb(n,a,void 0,o);for(const u in a.attrs)n.setAttribute(xb.has(u)?u:Cf(u),a.attrs[u])}function Sb(n,a,s){const o=_f(n,a,s);for(const u in n)if(pt(n[u])||pt(a[u])){const h=Fa.indexOf(u)!==-1?"attr"+u.charAt(0).toUpperCase()+u.substring(1):u;o[h]=n[u]}return o}class SE extends db{constructor(){super(...arguments),this.type="svg",this.isSVGTag=!1,this.measureInstanceViewportBox=it}getBaseTargetFromProps(a,s){return a[s]}readValueFromInstance(a,s){if(Xa.has(s)){const o=tb(s);return o&&o.default||0}return s=xb.has(s)?s:Cf(s),a.getAttribute(s)}scrapeMotionValuesFromProps(a,s,o){return Sb(a,s,o)}build(a,s,o){vb(a,s,this.isSVGTag,o.transformTemplate,o.style)}renderInstance(a,s,o,u){bE(a,s,o,u)}mount(a){this.isSVGTag=bb(a.tagName),super.mount(a)}}const wE=Rf.length;function wb(n){if(!n)return;if(!n.isControllingVariants){const s=n.parent?wb(n.parent)||{}:{};return n.props.initial!==void 0&&(s.initial=n.props.initial),s}const a={};for(let s=0;s<wE;s++){const o=Rf[s],u=n.props[o];(es(u)||u===!1)&&(a[o]=u)}return a}function jb(n,a){if(!Array.isArray(a))return!1;const s=a.length;if(s!==n.length)return!1;for(let o=0;o<s;o++)if(a[o]!==n[o])return!1;return!0}const jE=[...kf].reverse(),EE=kf.length;function TE(n){return a=>Promise.all(a.map(({animation:s,options:o})=>jj(n,s,o)))}function CE(n){let a=TE(n),s=Uy(),o=!0,u=!1;const h=g=>(v,x)=>{var j;const b=Gr(n,x,g==="exit"?(j=n.presenceContext)==null?void 0:j.custom:void 0);if(b){const{transition:E,transitionEnd:T,...D}=b;v={...v,...D,...T}}return v};function f(g){a=g(n)}function m(g){const{props:v}=n,x=wb(n.parent)||{},b=[],j=new Set;let E={},T=1/0;for(let O=0;O<EE;O++){const k=jE[O],B=s[k],_=v[k]!==void 0?v[k]:x[k],U=es(_),q=k===g?B.isActive:null;q===!1&&(T=O);let N=_===x[k]&&_!==v[k]&&U;if(N&&(o||u)&&n.manuallyAnimateOnMount&&(N=!1),B.protectedKeys={...E},!B.isActive&&q===null||!_&&!B.prevProp||wl(_)||typeof _=="boolean")continue;if(k==="exit"&&B.isActive&&q!==!0){B.prevResolvedValues&&(E={...E,...B.prevResolvedValues});continue}const M=DE(B.prevProp,_);let V=M||k===g&&B.isActive&&!N&&U||O>T&&U,$=!1;const J=Array.isArray(_)?_:[_];let re=J.reduce(h(k),{});q===!1&&(re={});const{prevResolvedValues:pe={}}=B,le={...pe,...re},ve=K=>{V=!0,j.has(K)&&($=!0,j.delete(K)),B.needsAnimating[K]=!0;const P=n.getValue(K);P&&(P.liveStyle=!1)};for(const K in le){const P=re[K],ne=pe[K];if(E.hasOwnProperty(K))continue;let C=!1;zd(P)&&zd(ne)?C=!jb(P,ne)||M:C=P!==ne,C?P!=null?ve(K):j.add(K):P!==void 0&&j.has(K)?ve(K):B.protectedKeys[K]=!0}B.prevProp=_,B.prevResolvedValues=re,B.isActive&&(E={...E,...re}),(o||u)&&n.blockInitialAnimation&&(V=!1);const H=N&&M;V&&(!H||$)&&b.push(...J.map(K=>{const P={type:k};if(typeof K=="string"&&(o||u)&&!H&&n.manuallyAnimateOnMount&&n.parent){const{parent:ne}=n,C=Gr(ne,K);if(ne.enteringChildren&&C){const{delayChildren:R}=C.transition||{};P.delay=Xx(ne.enteringChildren,n,R)}}return{animation:K,options:P}}))}if(j.size){const O={};if(typeof v.initial!="boolean"){const k=Gr(n,Array.isArray(v.initial)?v.initial[0]:v.initial);k&&k.transition&&(O.transition=k.transition)}j.forEach(k=>{const B=n.getBaseTarget(k),_=n.getValue(k);_&&(_.liveStyle=!0),O[k]=B??null}),b.push({animation:O})}let D=!!b.length;return o&&(v.initial===!1||v.initial===v.animate)&&!n.manuallyAnimateOnMount&&(D=!1),o=!1,u=!1,D?a(b):Promise.resolve()}function p(g,v){var b;if(s[g].isActive===v)return Promise.resolve();(b=n.variantChildren)==null||b.forEach(j=>{var E;return(E=j.animationState)==null?void 0:E.setActive(g,v)}),s[g].isActive=v;const x=m(g);for(const j in s)s[j].protectedKeys={};return x}return{animateChanges:m,setActive:p,setAnimateFunction:f,getState:()=>s,reset:()=>{s=Uy(),u=!0}}}function DE(n,a){return typeof a=="string"?a!==n:Array.isArray(a)?!jb(a,n):!1}function Lr(n=!1){return{isActive:n,protectedKeys:{},needsAnimating:{},prevResolvedValues:{}}}function Uy(){return{animate:Lr(!0),whileInView:Lr(),whileHover:Lr(),whileTap:Lr(),whileDrag:Lr(),whileFocus:Lr(),exit:Lr()}}function Gd(n,a){n.min=a.min,n.max=a.max}function an(n,a){Gd(n.x,a.x),Gd(n.y,a.y)}function Hy(n,a){n.translate=a.translate,n.scale=a.scale,n.originPoint=a.originPoint,n.origin=a.origin}const Eb=1e-4,NE=1-Eb,AE=1+Eb,Tb=.01,ME=0-Tb,kE=0+Tb;function bt(n){return n.max-n.min}function RE(n,a,s){return Math.abs(n-a)<=s}function qy(n,a,s,o=.5){n.origin=o,n.originPoint=qe(a.min,a.max,n.origin),n.scale=bt(s)/bt(a),n.translate=qe(s.min,s.max,n.origin)-n.originPoint,(n.scale>=NE&&n.scale<=AE||isNaN(n.scale))&&(n.scale=1),(n.translate>=ME&&n.translate<=kE||isNaN(n.translate))&&(n.translate=0)}function Zi(n,a,s,o){qy(n.x,a.x,s.x,o?o.originX:void 0),qy(n.y,a.y,s.y,o?o.originY:void 0)}function Yy(n,a,s,o=0){const u=o?qe(s.min,s.max,o):s.min;n.min=u+a.min,n.max=n.min+bt(a)}function OE(n,a,s,o){Yy(n.x,a.x,s.x,o==null?void 0:o.x),Yy(n.y,a.y,s.y,o==null?void 0:o.y)}function Gy(n,a,s,o=0){const u=o?qe(s.min,s.max,o):s.min;n.min=a.min-u,n.max=n.min+bt(a)}function cl(n,a,s,o){Gy(n.x,a.x,s.x,o==null?void 0:o.x),Gy(n.y,a.y,s.y,o==null?void 0:o.y)}function Py(n,a,s,o,u){return n-=a,n=ll(n,1/s,o),u!==void 0&&(n=ll(n,1/u,o)),n}function zE(n,a=0,s=1,o=.5,u,h=n,f=n){if(yn.test(a)&&(a=parseFloat(a),a=qe(f.min,f.max,a/100)-f.min),typeof a!="number")return;let m=qe(h.min,h.max,o);n===h&&(m-=a),n.min=Py(n.min,a,s,m,u),n.max=Py(n.max,a,s,m,u)}function Fy(n,a,[s,o,u],h,f){zE(n,a[s],a[o],a[u],a.scale,h,f)}const _E=["x","scaleX","originX"],VE=["y","scaleY","originY"];function Xy(n,a,s,o){Fy(n.x,a,_E,s?s.x:void 0,o?o.x:void 0),Fy(n.y,a,VE,s?s.y:void 0,o?o.y:void 0)}function $y(n){return n.translate===0&&n.scale===1}function Cb(n){return $y(n.x)&&$y(n.y)}function Ky(n,a){return n.min===a.min&&n.max===a.max}function BE(n,a){return Ky(n.x,a.x)&&Ky(n.y,a.y)}function Zy(n,a){return Math.round(n.min)===Math.round(a.min)&&Math.round(n.max)===Math.round(a.max)}function Db(n,a){return Zy(n.x,a.x)&&Zy(n.y,a.y)}function Qy(n){return bt(n.x)/bt(n.y)}function Jy(n,a){return n.translate===a.translate&&n.scale===a.scale&&n.originPoint===a.originPoint}function mn(n){return[n("x"),n("y")]}function LE(n,a,s){let o="";const u=n.x.translate/a.x,h=n.y.translate/a.y,f=(s==null?void 0:s.z)||0;if((u||h||f)&&(o=`translate3d(${u}px, ${h}px, ${f}px) `),(a.x!==1||a.y!==1)&&(o+=`scale(${1/a.x}, ${1/a.y}) `),s){const{transformPerspective:g,rotate:v,pathRotation:x,rotateX:b,rotateY:j,skewX:E,skewY:T}=s;g&&(o=`perspective(${g}px) ${o}`),v&&(o+=`rotate(${v}deg) `),x&&(o+=`rotate(${x}deg) `),b&&(o+=`rotateX(${b}deg) `),j&&(o+=`rotateY(${j}deg) `),E&&(o+=`skewX(${E}deg) `),T&&(o+=`skewY(${T}deg) `)}const m=n.x.scale*a.x,p=n.y.scale*a.y;return(m!==1||p!==1)&&(o+=`scale(${m}, ${p})`),o||"none"}const UE=Df.length,Wy=n=>typeof n=="string"?parseFloat(n):n,Iy=n=>typeof n=="number"||de.test(n);function HE(n,a,s,o,u,h){u?(n.opacity=qe(0,s.opacity??1,qE(o)),n.opacityExit=qe(a.opacity??1,0,YE(o))):h&&(n.opacity=qe(a.opacity??1,s.opacity??1,o));for(let f=0;f<UE;f++){const m=Df[f];let p=ev(a,m),g=ev(s,m);if(p===void 0&&g===void 0)continue;p||(p=0),g||(g=0),p===0||g===0||Iy(p)===Iy(g)?(n[m]=Math.max(qe(Wy(p),Wy(g),o),0),(yn.test(g)||yn.test(p))&&(n[m]+="%")):n[m]=g}(a.rotate||s.rotate)&&(n.rotate=qe(a.rotate||0,s.rotate||0,o))}function ev(n,a){return n[a]!==void 0?n[a]:n.borderRadius}const qE=Nb(0,.5,bx),YE=Nb(.5,.95,It);function Nb(n,a,s){return o=>o<n?0:o>a?1:s(Wi(n,a,o))}function GE(n,a,s){const o=pt(n)?n:qa(n);return o.start(Ef("",o,a,s)),o.animation}function ts(n,a,s,o={passive:!0}){return n.addEventListener(a,s,o),()=>n.removeEventListener(a,s,o)}const PE=(n,a)=>n.depth-a.depth;class FE{constructor(){this.children=[],this.isDirty=!1}add(a){ff(this.children,a),this.isDirty=!0}remove(a){el(this.children,a),this.isDirty=!0}forEach(a){this.isDirty&&this.children.sort(PE),this.isDirty=!1,this.children.forEach(a)}}function XE(n,a){const s=xt.now(),o=({timestamp:u})=>{const h=u-s;h>=a&&(yr(o),n(h-a))};return Ye.setup(o,!0),()=>yr(o)}function Zo(n){return pt(n)?n.get():n}class $E{constructor(){this.members=[]}add(a){ff(this.members,a);for(let s=this.members.length-1;s>=0;s--){const o=this.members[s];if(o===a||o===this.lead||o===this.prevLead)continue;const u=o.instance;(!u||u.isConnected===!1)&&!o.snapshot&&(el(this.members,o),o.unmount())}a.scheduleRender()}remove(a){if(el(this.members,a),a===this.prevLead&&(this.prevLead=void 0),a===this.lead){const s=this.members[this.members.length-1];s&&this.promote(s)}}relegate(a){var s;for(let o=this.members.indexOf(a)-1;o>=0;o--){const u=this.members[o];if(u.isPresent!==!1&&((s=u.instance)==null?void 0:s.isConnected)!==!1)return this.promote(u),!0}return!1}promote(a,s){var u;const o=this.lead;if(a!==o&&(this.prevLead=o,this.lead=a,a.show(),o)){o.updateSnapshot(),a.scheduleRender();const{layoutDependency:h}=o.options,{layoutDependency:f}=a.options;(h===void 0||h!==f)&&(a.resumeFrom=o,s&&(o.preserveOpacity=!0),o.snapshot&&(a.snapshot=o.snapshot,a.snapshot.latestValues=o.animationValues||o.latestValues),(u=a.root)!=null&&u.isUpdating&&(a.isLayoutDirty=!0)),a.options.crossfade===!1&&o.hide()}}exitAnimationComplete(){this.members.forEach(a=>{var s,o,u,h,f;(o=(s=a.options).onExitComplete)==null||o.call(s),(f=(u=a.resumingFrom)==null?void 0:(h=u.options).onExitComplete)==null||f.call(h)})}scheduleRender(){this.members.forEach(a=>a.instance&&a.scheduleRender(!1))}removeLeadSnapshot(){var a;(a=this.lead)!=null&&a.snapshot&&(this.lead.snapshot=void 0)}}const Qo={hasAnimatedSinceResize:!0,hasEverUpdated:!1},nd=["","X","Y","Z"],KE=1e3;let ZE=0;function rd(n,a,s,o){const{latestValues:u}=a;u[n]&&(s[n]=u[n],a.setStaticValue(n,0),o&&(o[n]=0))}function Ab(n){if(n.hasCheckedOptimisedAppear=!0,n.root===n)return;const{visualElement:a}=n.options;if(!a)return;const s=Jx(a);if(window.MotionHasOptimisedAnimation(s,"transform")){const{layout:u,layoutId:h}=n.options;window.MotionCancelOptimisedAnimation(s,"transform",Ye,!(u||h))}const{parent:o}=n;o&&!o.hasCheckedOptimisedAppear&&Ab(o)}function Mb({attachResizeListener:n,defaultParent:a,measureScroll:s,checkIsScrollRoot:o,resetTransform:u}){return class{constructor(f={},m=a==null?void 0:a()){this.id=ZE++,this.animationId=0,this.animationCommitId=0,this.children=new Set,this.options={},this.isTreeAnimating=!1,this.isAnimationBlocked=!1,this.isLayoutDirty=!1,this.isProjectionDirty=!1,this.isSharedProjectionDirty=!1,this.isTransformDirty=!1,this.updateManuallyBlocked=!1,this.updateBlockedByResize=!1,this.isUpdating=!1,this.isSVG=!1,this.needsReset=!1,this.shouldResetTransform=!1,this.hasCheckedOptimisedAppear=!1,this.treeScale={x:1,y:1},this.eventHandlers=new Map,this.hasTreeAnimated=!1,this.layoutVersion=0,this.updateScheduled=!1,this.scheduleUpdate=()=>this.update(),this.projectionUpdateScheduled=!1,this.checkUpdateFailed=()=>{this.isUpdating&&(this.isUpdating=!1,this.clearAllSnapshots())},this.updateProjection=()=>{this.projectionUpdateScheduled=!1,this.nodes.forEach(WE),this.nodes.forEach(aT),this.nodes.forEach(iT),this.nodes.forEach(IE)},this.resolvedRelativeTargetAt=0,this.linkedParentVersion=0,this.hasProjected=!1,this.isVisible=!0,this.animationProgress=0,this.sharedNodes=new Map,this.latestValues=f,this.root=m?m.root||m:this,this.path=m?[...m.path,m]:[],this.parent=m,this.depth=m?m.depth+1:0;for(let p=0;p<this.path.length;p++)this.path[p].shouldResetTransform=!0;this.root===this&&(this.nodes=new FE)}addEventListener(f,m){return this.eventHandlers.has(f)||this.eventHandlers.set(f,new hf),this.eventHandlers.get(f).add(m)}notifyListeners(f,...m){const p=this.eventHandlers.get(f);p&&p.notify(...m)}hasListeners(f){return this.eventHandlers.has(f)}mount(f){if(this.instance)return;this.isSVG=Mf(f)&&!Wj(f),this.instance=f;const{layoutId:m,layout:p,visualElement:g}=this.options;if(g&&!g.current&&g.mount(f),this.root.nodes.add(this),this.parent&&this.parent.children.add(this),this.root.hasTreeAnimated&&(p||m)&&(this.isLayoutDirty=!0),n){let v,x=0;const b=()=>this.root.updateBlockedByResize=!1;Ye.read(()=>{x=window.innerWidth}),n(f,()=>{const j=window.innerWidth;j!==x&&(x=j,this.root.updateBlockedByResize=!0,v&&v(),v=XE(b,250),Qo.hasAnimatedSinceResize&&(Qo.hasAnimatedSinceResize=!1,this.nodes.forEach(rv)))})}m&&this.root.registerSharedNode(m,this),this.options.animate!==!1&&g&&(m||p)&&this.addEventListener("didUpdate",({delta:v,hasLayoutChanged:x,hasRelativeLayoutChanged:b,layout:j})=>{if(this.isTreeAnimationBlocked()){this.target=void 0,this.relativeTarget=void 0;return}const E=this.options.transition||g.getDefaultTransition()||uT,{onLayoutAnimationStart:T,onLayoutAnimationComplete:D}=g.getProps(),O=!this.targetLayout||!Db(this.targetLayout,j),k=!x&&b;if(this.options.layoutRoot||this.resumeFrom||k||x&&(O||!this.currentAnimation)){this.resumeFrom&&(this.resumingFrom=this.resumeFrom,this.resumingFrom.resumingFrom=void 0);const B={...jf(E,"layout"),onPlay:T,onComplete:D};(g.shouldReduceMotion||this.options.layoutRoot)&&(B.delay=0,B.type=!1),this.startAnimation(B),this.setAnimationOrigin(v,k,B.path)}else x||rv(this),this.isLead()&&this.options.onExitComplete&&this.options.onExitComplete();this.targetLayout=j})}unmount(){this.options.layoutId&&this.willUpdate(),this.root.nodes.remove(this);const f=this.getStack();f&&f.remove(this),this.parent&&this.parent.children.delete(this),this.instance=void 0,this.eventHandlers.clear(),yr(this.updateProjection)}blockUpdate(){this.updateManuallyBlocked=!0}unblockUpdate(){this.updateManuallyBlocked=!1}isUpdateBlocked(){return this.updateManuallyBlocked||this.updateBlockedByResize}isTreeAnimationBlocked(){return this.isAnimationBlocked||this.parent&&this.parent.isTreeAnimationBlocked()||!1}startUpdate(){this.isUpdateBlocked()||(this.isUpdating=!0,this.nodes&&this.nodes.forEach(sT),this.animationId++)}getTransformTemplate(){const{visualElement:f}=this.options;return f&&f.getProps().transformTemplate}willUpdate(f=!0){if(this.root.hasTreeAnimated=!0,this.root.isUpdateBlocked()){this.options.onExitComplete&&this.options.onExitComplete();return}if(window.MotionCancelOptimisedAnimation&&!this.hasCheckedOptimisedAppear&&Ab(this),!this.root.isUpdating&&this.root.startUpdate(),this.isLayoutDirty)return;this.isLayoutDirty=!0;for(let v=0;v<this.path.length;v++){const x=this.path[v];x.shouldResetTransform=!0,(typeof x.latestValues.x=="string"||typeof x.latestValues.y=="string")&&(x.isLayoutDirty=!0),x.updateScroll("snapshot"),x.options.layoutRoot&&x.willUpdate(!1)}const{layoutId:m,layout:p}=this.options;if(m===void 0&&!p)return;const g=this.getTransformTemplate();this.prevTransformTemplateValue=g?g(this.latestValues,""):void 0,this.updateSnapshot(),f&&this.notifyListeners("willUpdate")}update(){if(this.updateScheduled=!1,this.isUpdateBlocked()){const p=this.updateBlockedByResize;this.unblockUpdate(),this.updateBlockedByResize=!1,this.clearAllSnapshots(),p&&this.nodes.forEach(tT),this.nodes.forEach(tv);return}if(this.animationId<=this.animationCommitId){this.nodes.forEach(nv);return}this.animationCommitId=this.animationId,this.isUpdating?(this.isUpdating=!1,this.nodes.forEach(nT),this.nodes.forEach(rT),this.nodes.forEach(QE),this.nodes.forEach(JE)):this.nodes.forEach(nv),this.clearAllSnapshots();const m=xt.now();mt.delta=vn(0,1e3/60,m-mt.timestamp),mt.timestamp=m,mt.isProcessing=!0,Ku.update.process(mt),Ku.preRender.process(mt),Ku.render.process(mt),mt.isProcessing=!1}didUpdate(){this.updateScheduled||(this.updateScheduled=!0,Nf.read(this.scheduleUpdate))}clearAllSnapshots(){this.nodes.forEach(eT),this.sharedNodes.forEach(oT)}scheduleUpdateProjection(){this.projectionUpdateScheduled||(this.projectionUpdateScheduled=!0,Ye.preRender(this.updateProjection,!1,!0))}scheduleCheckAfterUnmount(){Ye.postRender(()=>{this.isLayoutDirty?this.root.didUpdate():this.root.checkUpdateFailed()})}updateSnapshot(){this.snapshot||!this.instance||(this.snapshot=this.measure(),this.snapshot&&!bt(this.snapshot.measuredBox.x)&&!bt(this.snapshot.measuredBox.y)&&(this.snapshot=void 0))}updateLayout(){if(!this.instance||(this.updateScroll(),!(this.options.alwaysMeasureLayout&&this.isLead())&&!this.isLayoutDirty))return;if(this.resumeFrom&&!this.resumeFrom.instance)for(let p=0;p<this.path.length;p++)this.path[p].updateScroll();const f=this.layout;this.layout=this.measure(!1),this.layoutVersion++,this.layoutCorrected||(this.layoutCorrected=it()),this.isLayoutDirty=!1,this.projectionDelta=void 0,this.notifyListeners("measure",this.layout.layoutBox);const{visualElement:m}=this.options;m&&m.notify("LayoutMeasure",this.layout.layoutBox,f?f.layoutBox:void 0)}updateScroll(f="measure"){let m=!!(this.options.layoutScroll&&this.instance);if(this.scroll&&this.scroll.animationId===this.root.animationId&&this.scroll.phase===f&&(m=!1),m&&this.instance){const p=o(this.instance);this.scroll={animationId:this.root.animationId,phase:f,isRoot:p,offset:s(this.instance),wasRoot:this.scroll?this.scroll.isRoot:p}}}resetTransform(){if(!u)return;const f=this.isLayoutDirty||this.shouldResetTransform||this.options.alwaysMeasureLayout,m=this.projectionDelta&&!Cb(this.projectionDelta),p=this.getTransformTemplate(),g=p?p(this.latestValues,""):void 0,v=g!==this.prevTransformTemplateValue;f&&this.instance&&(m||Ur(this.latestValues)||v)&&(u(this.instance,g),this.shouldResetTransform=!1,this.scheduleRender())}measure(f=!0){const m=this.measurePageBox();let p=this.removeElementScroll(m);return f&&(p=this.removeTransform(p)),dT(p),{animationId:this.root.animationId,measuredBox:m,layoutBox:p,latestValues:{},source:this.id}}measurePageBox(){var g;const{visualElement:f}=this.options;if(!f)return it();const m=f.measureViewportBox();if(!(((g=this.scroll)==null?void 0:g.wasRoot)||this.path.some(fT))){const{scroll:v}=this.root;v&&(pn(m.x,v.offset.x),pn(m.y,v.offset.y))}return m}removeElementScroll(f){var p;const m=it();if(an(m,f),(p=this.scroll)!=null&&p.wasRoot)return m;for(let g=0;g<this.path.length;g++){const v=this.path[g],{scroll:x,options:b}=v;v!==this.root&&x&&b.layoutScroll&&(x.wasRoot&&an(m,f),pn(m.x,x.offset.x),pn(m.y,x.offset.y))}return m}applyTransform(f,m=!1,p){var v,x;const g=p||it();an(g,f);for(let b=0;b<this.path.length;b++){const j=this.path[b];!m&&j.options.layoutScroll&&j.scroll&&j!==j.root&&(pn(g.x,-j.scroll.offset.x),pn(g.y,-j.scroll.offset.y)),Ur(j.latestValues)&&Ko(g,j.latestValues,(v=j.layout)==null?void 0:v.layoutBox)}return Ur(this.latestValues)&&Ko(g,this.latestValues,(x=this.layout)==null?void 0:x.layoutBox),g}removeTransform(f){var p;const m=it();an(m,f);for(let g=0;g<this.path.length;g++){const v=this.path[g];if(!Ur(v.latestValues))continue;let x;v.instance&&(Hd(v.latestValues)&&v.updateSnapshot(),x=it(),an(x,v.measurePageBox())),Xy(m,v.latestValues,(p=v.snapshot)==null?void 0:p.layoutBox,x)}return Ur(this.latestValues)&&Xy(m,this.latestValues),m}setTargetDelta(f){this.targetDelta=f,this.root.scheduleUpdateProjection(),this.isProjectionDirty=!0}setOptions(f){this.options={...this.options,...f,crossfade:f.crossfade!==void 0?f.crossfade:!0}}clearMeasurements(){this.scroll=void 0,this.layout=void 0,this.snapshot=void 0,this.prevTransformTemplateValue=void 0,this.targetDelta=void 0,this.target=void 0,this.isLayoutDirty=!1}forceRelativeParentToResolveTarget(){this.relativeParent&&this.relativeParent.resolvedRelativeTargetAt!==mt.timestamp&&this.relativeParent.resolveTargetDelta(!0)}resolveTargetDelta(f=!1){var j;const m=this.getLead();this.isProjectionDirty||(this.isProjectionDirty=m.isProjectionDirty),this.isTransformDirty||(this.isTransformDirty=m.isTransformDirty),this.isSharedProjectionDirty||(this.isSharedProjectionDirty=m.isSharedProjectionDirty);const p=!!this.resumingFrom||this!==m;if(!(f||p&&this.isSharedProjectionDirty||this.isProjectionDirty||(j=this.parent)!=null&&j.isProjectionDirty||this.attemptToResolveRelativeTarget||this.root.updateBlockedByResize))return;const{layout:v,layoutId:x}=this.options;if(!this.layout||!(v||x))return;this.resolvedRelativeTargetAt=mt.timestamp;const b=this.getClosestProjectingParent();b&&this.linkedParentVersion!==b.layoutVersion&&!b.options.layoutRoot&&this.removeRelativeTarget(),!this.targetDelta&&!this.relativeTarget&&(this.options.layoutAnchor!==!1&&b&&b.layout?this.createRelativeTarget(b,this.layout.layoutBox,b.layout.layoutBox):this.removeRelativeTarget()),!(!this.relativeTarget&&!this.targetDelta)&&(this.target||(this.target=it(),this.targetWithTransforms=it()),this.relativeTarget&&this.relativeTargetOrigin&&this.relativeParent&&this.relativeParent.target?(this.forceRelativeParentToResolveTarget(),OE(this.target,this.relativeTarget,this.relativeParent.target,this.options.layoutAnchor||void 0)):this.targetDelta?(this.resumingFrom?this.applyTransform(this.layout.layoutBox,!1,this.target):an(this.target,this.layout.layoutBox),mb(this.target,this.targetDelta)):an(this.target,this.layout.layoutBox),this.attemptToResolveRelativeTarget&&(this.attemptToResolveRelativeTarget=!1,this.options.layoutAnchor!==!1&&b&&!!b.resumingFrom==!!this.resumingFrom&&!b.options.layoutScroll&&b.target&&this.animationProgress!==1?this.createRelativeTarget(b,this.target,b.target):this.relativeParent=this.relativeTarget=void 0))}getClosestProjectingParent(){if(!(!this.parent||Hd(this.parent.latestValues)||hb(this.parent.latestValues)))return this.parent.isProjecting()?this.parent:this.parent.getClosestProjectingParent()}isProjecting(){return!!((this.relativeTarget||this.targetDelta||this.options.layoutRoot)&&this.layout)}createRelativeTarget(f,m,p){this.relativeParent=f,this.linkedParentVersion=f.layoutVersion,this.forceRelativeParentToResolveTarget(),this.relativeTarget=it(),this.relativeTargetOrigin=it(),cl(this.relativeTargetOrigin,m,p,this.options.layoutAnchor||void 0),an(this.relativeTarget,this.relativeTargetOrigin)}removeRelativeTarget(){this.relativeParent=this.relativeTarget=void 0}calcProjection(){var E;const f=this.getLead(),m=!!this.resumingFrom||this!==f;let p=!0;if((this.isProjectionDirty||(E=this.parent)!=null&&E.isProjectionDirty)&&(p=!1),m&&(this.isSharedProjectionDirty||this.isTransformDirty)&&(p=!1),this.resolvedRelativeTargetAt===mt.timestamp&&(p=!1),p)return;const{layout:g,layoutId:v}=this.options;if(this.isTreeAnimating=!!(this.parent&&this.parent.isTreeAnimating||this.currentAnimation||this.pendingAnimation),this.isTreeAnimating||(this.targetDelta=this.relativeTarget=void 0),!this.layout||!(g||v))return;an(this.layoutCorrected,this.layout.layoutBox);const x=this.treeScale.x,b=this.treeScale.y;lE(this.layoutCorrected,this.treeScale,this.path,m),f.layout&&!f.target&&(this.treeScale.x!==1||this.treeScale.y!==1)&&(f.target=f.layout.layoutBox,f.targetWithTransforms=it());const{target:j}=f;if(!j){this.prevProjectionDelta&&(this.createProjectionDeltas(),this.scheduleRender());return}!this.projectionDelta||!this.prevProjectionDelta?this.createProjectionDeltas():(Hy(this.prevProjectionDelta.x,this.projectionDelta.x),Hy(this.prevProjectionDelta.y,this.projectionDelta.y)),Zi(this.projectionDelta,this.layoutCorrected,j,this.latestValues),(this.treeScale.x!==x||this.treeScale.y!==b||!Jy(this.projectionDelta.x,this.prevProjectionDelta.x)||!Jy(this.projectionDelta.y,this.prevProjectionDelta.y))&&(this.hasProjected=!0,this.scheduleRender(),this.notifyListeners("projectionUpdate",j))}hide(){this.isVisible=!1}show(){this.isVisible=!0}scheduleRender(f=!0){var m;if((m=this.options.visualElement)==null||m.scheduleRender(),f){const p=this.getStack();p&&p.scheduleRender()}this.resumingFrom&&!this.resumingFrom.instance&&(this.resumingFrom=void 0)}createProjectionDeltas(){this.prevProjectionDelta=La(),this.projectionDelta=La(),this.projectionDeltaWithTransform=La()}setAnimationOrigin(f,m=!1,p){const g=this.snapshot,v=g?g.latestValues:{},x={...this.latestValues},b=La();(!this.relativeParent||!this.relativeParent.options.layoutRoot)&&(this.relativeTarget=this.relativeTargetOrigin=void 0),this.attemptToResolveRelativeTarget=!m;const j=it(),E=g?g.source:void 0,T=this.layout?this.layout.source:void 0,D=E!==T,O=this.getStack(),k=!O||O.members.length<=1,B=!!(D&&!k&&this.options.crossfade===!0&&!this.path.some(cT));this.animationProgress=0;let _;const U=p==null?void 0:p.interpolateProjection(f);this.mixTargetDelta=q=>{const N=q/1e3,M=U==null?void 0:U(N);M?(b.x.translate=M.x,b.x.scale=qe(f.x.scale,1,N),b.x.origin=f.x.origin,b.x.originPoint=f.x.originPoint,b.y.translate=M.y,b.y.scale=qe(f.y.scale,1,N),b.y.origin=f.y.origin,b.y.originPoint=f.y.originPoint):(av(b.x,f.x,N),av(b.y,f.y,N)),this.setTargetDelta(b),this.relativeTarget&&this.relativeTargetOrigin&&this.layout&&this.relativeParent&&this.relativeParent.layout&&(cl(j,this.layout.layoutBox,this.relativeParent.layout.layoutBox,this.options.layoutAnchor||void 0),lT(this.relativeTarget,this.relativeTargetOrigin,j,N),_&&BE(this.relativeTarget,_)&&(this.isProjectionDirty=!1),_||(_=it()),an(_,this.relativeTarget)),D&&(this.animationValues=x,HE(x,v,this.latestValues,N,B,k)),M&&M.rotate!==void 0&&(this.animationValues||(this.animationValues=x),this.animationValues.pathRotation=M.rotate),this.root.scheduleUpdateProjection(),this.scheduleRender(),this.animationProgress=N},this.mixTargetDelta(this.options.layoutRoot?1e3:0)}startAnimation(f){var m,p,g;this.notifyListeners("animationStart"),(m=this.currentAnimation)==null||m.stop(),(g=(p=this.resumingFrom)==null?void 0:p.currentAnimation)==null||g.stop(),this.pendingAnimation&&(yr(this.pendingAnimation),this.pendingAnimation=void 0),this.pendingAnimation=Ye.update(()=>{Qo.hasAnimatedSinceResize=!0,this.motionValue||(this.motionValue=qa(0)),this.motionValue.jump(0,!1),this.currentAnimation=GE(this.motionValue,[0,1e3],{...f,velocity:0,isSync:!0,onUpdate:v=>{this.mixTargetDelta(v),f.onUpdate&&f.onUpdate(v)},onComplete:()=>{f.onComplete&&f.onComplete(),this.completeAnimation()}}),this.resumingFrom&&(this.resumingFrom.currentAnimation=this.currentAnimation),this.pendingAnimation=void 0})}completeAnimation(){this.resumingFrom&&(this.resumingFrom.currentAnimation=void 0,this.resumingFrom.preserveOpacity=void 0);const f=this.getStack();f&&f.exitAnimationComplete(),this.resumingFrom=this.currentAnimation=this.animationValues=void 0,this.notifyListeners("animationComplete")}finishAnimation(){this.currentAnimation&&(this.mixTargetDelta&&this.mixTargetDelta(KE),this.currentAnimation.stop()),this.completeAnimation()}applyTransformsToTarget(){const f=this.getLead();let{targetWithTransforms:m,target:p,layout:g,latestValues:v}=f;if(!(!m||!p||!g)){if(this!==f&&this.layout&&g&&kb(this.options.animationType,this.layout.layoutBox,g.layoutBox)){p=this.target||it();const x=bt(this.layout.layoutBox.x);p.x.min=f.target.x.min,p.x.max=p.x.min+x;const b=bt(this.layout.layoutBox.y);p.y.min=f.target.y.min,p.y.max=p.y.min+b}an(m,p),Ko(m,v),Zi(this.projectionDeltaWithTransform,this.layoutCorrected,m,v)}}registerSharedNode(f,m){this.sharedNodes.has(f)||this.sharedNodes.set(f,new $E),this.sharedNodes.get(f).add(m);const g=m.options.initialPromotionConfig;m.promote({transition:g?g.transition:void 0,preserveFollowOpacity:g&&g.shouldPreserveFollowOpacity?g.shouldPreserveFollowOpacity(m):void 0})}isLead(){const f=this.getStack();return f?f.lead===this:!0}getLead(){var m;const{layoutId:f}=this.options;return f?((m=this.getStack())==null?void 0:m.lead)||this:this}getPrevLead(){var m;const{layoutId:f}=this.options;return f?(m=this.getStack())==null?void 0:m.prevLead:void 0}getStack(){const{layoutId:f}=this.options;if(f)return this.root.sharedNodes.get(f)}promote({needsReset:f,transition:m,preserveFollowOpacity:p}={}){const g=this.getStack();g&&g.promote(this,p),f&&(this.projectionDelta=void 0,this.needsReset=!0),m&&this.setOptions({transition:m})}relegate(){const f=this.getStack();return f?f.relegate(this):!1}resetSkewAndRotation(){const{visualElement:f}=this.options;if(!f)return;let m=!1;const{latestValues:p}=f;if((p.z||p.rotate||p.rotateX||p.rotateY||p.rotateZ||p.skewX||p.skewY)&&(m=!0),!m)return;const g={};p.z&&rd("z",f,g,this.animationValues);for(let v=0;v<nd.length;v++)rd(`rotate${nd[v]}`,f,g,this.animationValues),rd(`skew${nd[v]}`,f,g,this.animationValues);f.render();for(const v in g)f.setStaticValue(v,g[v]),this.animationValues&&(this.animationValues[v]=g[v]);f.scheduleRender()}applyProjectionStyles(f,m){if(!this.instance||this.isSVG)return;if(!this.isVisible){f.visibility="hidden";return}const p=this.getTransformTemplate();if(this.needsReset){this.needsReset=!1,f.visibility="",f.opacity="",f.pointerEvents=Zo(m==null?void 0:m.pointerEvents)||"",f.transform=p?p(this.latestValues,""):"none";return}const g=this.getLead();if(!this.projectionDelta||!this.layout||!g.target){this.options.layoutId&&(f.opacity=this.latestValues.opacity!==void 0?this.latestValues.opacity:1,f.pointerEvents=Zo(m==null?void 0:m.pointerEvents)||""),this.hasProjected&&!Ur(this.latestValues)&&(f.transform=p?p({},""):"none",this.hasProjected=!1);return}f.visibility="";const v=g.animationValues||g.latestValues;this.applyTransformsToTarget();let x=LE(this.projectionDeltaWithTransform,this.treeScale,v);p&&(x=p(v,x)),f.transform=x;const{x:b,y:j}=this.projectionDelta;f.transformOrigin=`${b.origin*100}% ${j.origin*100}% 0`,g.animationValues?f.opacity=g===this?v.opacity??this.latestValues.opacity??1:this.preserveOpacity?this.latestValues.opacity:v.opacityExit:f.opacity=g===this?v.opacity!==void 0?v.opacity:"":v.opacityExit!==void 0?v.opacityExit:0;for(const E in Yd){if(v[E]===void 0)continue;const{correct:T,applyTo:D,isCSSVariable:O}=Yd[E],k=x==="none"?v[E]:T(v[E],g);if(D){const B=D.length;for(let _=0;_<B;_++)f[D[_]]=k}else O?this.options.visualElement.renderState.vars[E]=k:f[E]=k}this.options.layoutId&&(f.pointerEvents=g===this?Zo(m==null?void 0:m.pointerEvents)||"":"none")}clearSnapshot(){this.resumeFrom=this.snapshot=void 0}resetTree(){this.root.nodes.forEach(f=>{var m;return(m=f.currentAnimation)==null?void 0:m.stop()}),this.root.nodes.forEach(tv),this.root.sharedNodes.clear()}}}function QE(n){n.updateLayout()}function JE(n){var s;const a=((s=n.resumeFrom)==null?void 0:s.snapshot)||n.snapshot;if(n.isLead()&&n.layout&&a&&n.hasListeners("didUpdate")){const{layoutBox:o,measuredBox:u}=n.layout,{animationType:h}=n.options,f=a.source!==n.layout.source;if(h==="size")mn(x=>{const b=f?a.measuredBox[x]:a.layoutBox[x],j=bt(b);b.min=o[x].min,b.max=b.min+j});else if(h==="x"||h==="y"){const x=h==="x"?"y":"x";Gd(f?a.measuredBox[x]:a.layoutBox[x],o[x])}else kb(h,a.layoutBox,o)&&mn(x=>{const b=f?a.measuredBox[x]:a.layoutBox[x],j=bt(o[x]);b.max=b.min+j,n.relativeTarget&&!n.currentAnimation&&(n.isProjectionDirty=!0,n.relativeTarget[x].max=n.relativeTarget[x].min+j)});const m=La();Zi(m,o,a.layoutBox);const p=La();f?Zi(p,n.applyTransform(u,!0),a.measuredBox):Zi(p,o,a.layoutBox);const g=!Cb(m);let v=!1;if(!n.resumeFrom){const x=n.getClosestProjectingParent();if(x&&!x.resumeFrom){const{snapshot:b,layout:j}=x;if(b&&j){const E=n.options.layoutAnchor||void 0,T=it();cl(T,a.layoutBox,b.layoutBox,E);const D=it();cl(D,o,j.layoutBox,E),Db(T,D)||(v=!0),x.options.layoutRoot&&(n.relativeTarget=D,n.relativeTargetOrigin=T,n.relativeParent=x)}}}n.notifyListeners("didUpdate",{layout:o,snapshot:a,delta:p,layoutDelta:m,hasLayoutChanged:g,hasRelativeLayoutChanged:v})}else if(n.isLead()){const{onExitComplete:o}=n.options;o&&o()}n.options.transition=void 0}function WE(n){n.parent&&(n.isProjecting()||(n.isProjectionDirty=n.parent.isProjectionDirty),n.isSharedProjectionDirty||(n.isSharedProjectionDirty=!!(n.isProjectionDirty||n.parent.isProjectionDirty||n.parent.isSharedProjectionDirty)),n.isTransformDirty||(n.isTransformDirty=n.parent.isTransformDirty))}function IE(n){n.isProjectionDirty=n.isSharedProjectionDirty=n.isTransformDirty=!1}function eT(n){n.clearSnapshot()}function tv(n){n.clearMeasurements()}function tT(n){n.isLayoutDirty=!0,n.updateLayout()}function nv(n){n.isLayoutDirty=!1}function nT(n){n.isAnimationBlocked&&n.layout&&!n.isLayoutDirty&&(n.snapshot=n.layout,n.isLayoutDirty=!0)}function rT(n){const{visualElement:a}=n.options;a&&a.getProps().onBeforeLayoutMeasure&&a.notify("BeforeLayoutMeasure"),n.resetTransform()}function rv(n){n.finishAnimation(),n.targetDelta=n.relativeTarget=n.target=void 0,n.isProjectionDirty=!0}function aT(n){n.resolveTargetDelta()}function iT(n){n.calcProjection()}function sT(n){n.resetSkewAndRotation()}function oT(n){n.removeLeadSnapshot()}function av(n,a,s){n.translate=qe(a.translate,0,s),n.scale=qe(a.scale,1,s),n.origin=a.origin,n.originPoint=a.originPoint}function iv(n,a,s,o){n.min=qe(a.min,s.min,o),n.max=qe(a.max,s.max,o)}function lT(n,a,s,o){iv(n.x,a.x,s.x,o),iv(n.y,a.y,s.y,o)}function cT(n){return n.animationValues&&n.animationValues.opacityExit!==void 0}const uT={duration:.45,ease:[.4,0,.1,1]},sv=n=>typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().includes(n),ov=sv("applewebkit/")&&!sv("chrome/")?Math.round:It;function lv(n){n.min=ov(n.min),n.max=ov(n.max)}function dT(n){lv(n.x),lv(n.y)}function kb(n,a,s){return n==="position"||n==="preserve-aspect"&&!RE(Qy(a),Qy(s),.2)}function fT(n){var a;return n!==n.root&&((a=n.scroll)==null?void 0:a.wasRoot)}const hT=Mb({attachResizeListener:(n,a)=>ts(n,"resize",a),measureScroll:()=>{var n,a;return{x:document.documentElement.scrollLeft||((n=document.body)==null?void 0:n.scrollLeft)||0,y:document.documentElement.scrollTop||((a=document.body)==null?void 0:a.scrollTop)||0}},checkIsScrollRoot:()=>!0}),ad={current:void 0},Rb=Mb({measureScroll:n=>({x:n.scrollLeft,y:n.scrollTop}),defaultParent:()=>{if(!ad.current){const n=new hT({});n.mount(window),n.setOptions({layoutScroll:!0}),ad.current=n}return ad.current},resetTransform:(n,a)=>{n.style.transform=a!==void 0?a:"none"},checkIsScrollRoot:n=>window.getComputedStyle(n).position==="fixed"}),Vf=S.createContext({transformPagePoint:n=>n,isStatic:!1,reducedMotion:"never"});function cv(n,a){if(typeof n=="function")return n(a);n!=null&&(n.current=a)}function mT(...n){return a=>{let s=!1;const o=n.map(u=>{const h=cv(u,a);return!s&&typeof h=="function"&&(s=!0),h});if(s)return()=>{for(let u=0;u<o.length;u++){const h=o[u];typeof h=="function"?h():cv(n[u],null)}}}}function pT(...n){return S.useCallback(mT(...n),n)}class gT extends S.Component{getSnapshotBeforeUpdate(a){const s=this.props.childRef.current;if(Po(s)&&a.isPresent&&!this.props.isPresent&&this.props.pop!==!1){const o=s.offsetParent,u=Po(o)&&o.offsetWidth||0,h=Po(o)&&o.offsetHeight||0,f=getComputedStyle(s),m=this.props.sizeRef.current;m.height=parseFloat(f.height),m.width=parseFloat(f.width),m.top=s.offsetTop,m.left=s.offsetLeft,m.right=u-m.width-m.left,m.bottom=h-m.height-m.top,m.direction=f.direction}return null}componentDidUpdate(){}render(){return this.props.children}}function yT({children:n,isPresent:a,anchorX:s,anchorY:o,root:u,pop:h}){var b;const f=S.useId(),m=S.useRef(null),p=S.useRef({width:0,height:0,top:0,left:0,right:0,bottom:0,direction:"ltr"}),{nonce:g}=S.useContext(Vf),v=h!==!1?((b=n.props)==null?void 0:b.ref)??(n==null?void 0:n.ref):void 0,x=pT(m,v);return S.useInsertionEffect(()=>{const{width:j,height:E,top:T,left:D,right:O,bottom:k,direction:B}=p.current;if(a||h===!1||!m.current||!j||!E)return;const _=B==="rtl",U=s==="left"?_?`right: ${O}`:`left: ${D}`:_?`left: ${D}`:`right: ${O}`,q=o==="bottom"?`bottom: ${k}`:`top: ${T}`;m.current.dataset.motionPopId=f;const N=document.createElement("style");g&&(N.nonce=g);const M=u??document.head;return M.appendChild(N),N.sheet&&N.sheet.insertRule(`
          [data-motion-pop-id="${f}"] {
            position: absolute !important;
            width: ${j}px !important;
            height: ${E}px !important;
            ${U}px !important;
            ${q}px !important;
          }
        `),()=>{var V;(V=m.current)==null||V.removeAttribute("data-motion-pop-id"),M.contains(N)&&M.removeChild(N)}},[a]),l.jsx(gT,{isPresent:a,childRef:m,sizeRef:p,pop:h,children:h===!1?n:S.cloneElement(n,{ref:x})})}const vT=({children:n,initial:a,isPresent:s,onExitComplete:o,custom:u,presenceAffectsLayout:h,mode:f,anchorX:m,anchorY:p,root:g})=>{const v=uf(xT),x=S.useId(),b=S.useRef(s),j=S.useRef(o);df(()=>{b.current=s,j.current=o});let E=!0,T=S.useMemo(()=>(E=!1,{id:x,initial:a,isPresent:s,custom:u,onExitComplete:D=>{v.set(D,!0);for(const O of v.values())if(!O)return;o&&o()},register:D=>(v.set(D,!1),()=>{var O;v.delete(D),!b.current&&!v.size&&((O=j.current)==null||O.call(j))})}),[s,v,o]);return h&&E&&(T={...T}),S.useMemo(()=>{v.forEach((D,O)=>v.set(O,!1))},[s]),S.useEffect(()=>{!s&&!v.size&&o&&o()},[s]),n=l.jsx(yT,{pop:f==="popLayout",isPresent:s,anchorX:m,anchorY:p,root:g,children:n}),l.jsx(xl.Provider,{value:T,children:n})};function xT(){return new Map}function Ob(n=!0){const a=S.useContext(xl);if(a===null)return[!0,null];const{isPresent:s,onExitComplete:o,register:u}=a,h=S.useId();S.useEffect(()=>{if(n)return u(h)},[n]);const f=S.useCallback(()=>n&&o&&o(h),[h,o,n]);return!s&&o?[!1,f]:[!0]}const Ro=n=>n.key||"";function uv(n){const a=[];return S.Children.forEach(n,s=>{S.isValidElement(s)&&a.push(s)}),a}const bT=({children:n,custom:a,initial:s=!0,onExitComplete:o,presenceAffectsLayout:u=!0,mode:h="sync",propagate:f=!1,anchorX:m="left",anchorY:p="top",root:g})=>{const[v,x]=Ob(f),b=S.useMemo(()=>uv(n),[n]),j=f&&!v?[]:b.map(Ro),E=S.useRef(!0),T=S.useRef(b),D=uf(()=>new Map),O=S.useRef(new Set),[k,B]=S.useState(b),[_,U]=S.useState(b);df(()=>{E.current=!1,T.current=b;for(let M=0;M<_.length;M++){const V=Ro(_[M]);j.includes(V)?(D.delete(V),O.current.delete(V)):D.get(V)!==!0&&D.set(V,!1)}},[_,j.length,j.join("-")]);const q=[];if(b!==k){let M=[...b];for(let V=0;V<_.length;V++){const $=_[V],J=Ro($);j.includes(J)||(M.splice(V,0,$),q.push($))}return h==="wait"&&q.length&&(M=q),U(uv(M)),B(b),null}const{forceRender:N}=S.useContext(cf);return l.jsx(l.Fragment,{children:_.map(M=>{const V=Ro(M),$=f&&!v?!1:b===_||j.includes(V),J=()=>{if(O.current.has(V))return;if(D.has(V))O.current.add(V),D.set(V,!0);else return;let re=!0;D.forEach(pe=>{pe||(re=!1)}),re&&(N==null||N(),U(T.current),f&&(x==null||x()),o&&o())};return l.jsx(vT,{isPresent:$,initial:!E.current||s?void 0:!1,custom:a,presenceAffectsLayout:u,mode:h,root:g,onExitComplete:$?void 0:J,anchorX:m,anchorY:p,children:M},V)})})},zb=S.createContext({strict:!1}),dv={animation:["animate","variants","whileHover","whileTap","exit","whileInView","whileFocus","whileDrag"],exit:["exit"],drag:["drag","dragControls"],focus:["whileFocus"],hover:["whileHover","onHoverStart","onHoverEnd"],tap:["whileTap","onTap","onTapStart","onTapCancel"],pan:["onPan","onPanStart","onPanSessionStart","onPanEnd"],inView:["whileInView","onViewportEnter","onViewportLeave"],layout:["layout","layoutId"]};let fv=!1;function ST(){if(fv)return;const n={};for(const a in dv)n[a]={isEnabled:s=>dv[a].some(o=>!!s[o])};ub(n),fv=!0}function _b(){return ST(),aE()}function wT(n){const a=_b();for(const s in n)a[s]={...a[s],...n[s]};ub(a)}const jT=new Set(["animate","exit","variants","initial","style","values","variants","transition","transformTemplate","custom","inherit","onBeforeLayoutMeasure","onAnimationStart","onAnimationComplete","onUpdate","onDragStart","onDrag","onDragEnd","onMeasureDragConstraints","onDirectionLock","onDragTransitionEnd","_dragX","_dragY","onHoverStart","onHoverEnd","onViewportEnter","onViewportLeave","globalTapTarget","propagate","ignoreStrict","viewport"]);function ul(n){return n.startsWith("while")||n.startsWith("drag")&&n!=="draggable"||n.startsWith("layout")||n.startsWith("onTap")||n.startsWith("onPan")||n.startsWith("onLayout")||jT.has(n)}let Vb=n=>!ul(n);function ET(n){typeof n=="function"&&(Vb=a=>a.startsWith("on")?!ul(a):n(a))}try{ET(require("@emotion/is-prop-valid").default)}catch{}function TT(n,a,s){const o={};for(const u in n)u==="values"&&typeof n.values=="object"||pt(n[u])||(Vb(u)||s===!0&&ul(u)||!a&&!ul(u)||n.draggable&&u.startsWith("onDrag"))&&(o[u]=n[u]);return o}const El=S.createContext({});function CT(n,a){if(jl(n)){const{initial:s,animate:o}=n;return{initial:s===!1||es(s)?s:void 0,animate:es(o)?o:void 0}}return n.inherit!==!1?a:{}}function DT(n){const{initial:a,animate:s}=CT(n,S.useContext(El));return S.useMemo(()=>({initial:a,animate:s}),[hv(a),hv(s)])}function hv(n){return Array.isArray(n)?n.join(" "):n}const Bf=()=>({style:{},transform:{},transformOrigin:{},vars:{}});function Bb(n,a,s){for(const o in a)!pt(a[o])&&!yb(o,s)&&(n[o]=a[o])}function NT({transformTemplate:n},a){return S.useMemo(()=>{const s=Bf();return zf(s,a,n),Object.assign({},s.vars,s.style)},[a])}function AT(n,a){const s=n.style||{},o={};return Bb(o,s,n),Object.assign(o,NT(n,a)),o}function MT(n,a){const s={},o=AT(n,a);return n.drag&&n.dragListener!==!1&&(s.draggable=!1,o.userSelect=o.WebkitUserSelect=o.WebkitTouchCallout="none",o.touchAction=n.drag===!0?"none":`pan-${n.drag==="x"?"y":"x"}`),n.tabIndex===void 0&&(n.onTap||n.onTapStart||n.whileTap)&&(s.tabIndex=0),s.style=o,s}const Lb=()=>({...Bf(),attrs:{}});function kT(n,a,s,o){const u=S.useMemo(()=>{const h=Lb();return vb(h,a,bb(o),n.transformTemplate,n.style),{...h.attrs,style:{...h.style}}},[a]);if(n.style){const h={};Bb(h,n.style,n),u.style={...h,...u.style}}return u}const RT=["animate","circle","defs","desc","ellipse","g","image","line","filter","marker","mask","metadata","path","pattern","polygon","polyline","rect","stop","switch","symbol","svg","text","tspan","use","view"];function Lf(n){return typeof n!="string"||n.includes("-")?!1:!!(RT.indexOf(n)>-1||/[A-Z]/u.test(n))}function OT(n,a,s,{latestValues:o},u,h=!1,f){const p=(f??Lf(n)?kT:MT)(a,o,u,n),g=TT(a,typeof n=="string",h),v=n!==S.Fragment?{...g,...p,ref:s}:{},{children:x}=a,b=S.useMemo(()=>pt(x)?x.get():x,[x]);return S.createElement(n,{...v,children:b})}function zT({scrapeMotionValuesFromProps:n,createRenderState:a},s,o,u){return{latestValues:_T(s,o,u,n),renderState:a()}}function _T(n,a,s,o){const u={},h=o(n,{});for(const b in h)u[b]=Zo(h[b]);let{initial:f,animate:m}=n;const p=jl(n),g=lb(n);a&&g&&!p&&n.inherit!==!1&&(f===void 0&&(f=a.initial),m===void 0&&(m=a.animate));let v=s?s.initial===!1:!1;v=v||f===!1;const x=v?m:f;if(x&&typeof x!="boolean"&&!wl(x)){const b=Array.isArray(x)?x:[x];for(let j=0;j<b.length;j++){const E=Tf(n,b[j]);if(E){const{transitionEnd:T,transition:D,...O}=E;for(const k in O){let B=O[k];if(Array.isArray(B)){const _=v?B.length-1:0;B=B[_]}B!==null&&(u[k]=B)}for(const k in T)u[k]=T[k]}}}return u}const Ub=n=>(a,s)=>{const o=S.useContext(El),u=S.useContext(xl),h=()=>zT(n,a,o,u);return s?h():uf(h)},VT=Ub({scrapeMotionValuesFromProps:_f,createRenderState:Bf}),BT=Ub({scrapeMotionValuesFromProps:Sb,createRenderState:Lb}),LT=Symbol.for("motionComponentSymbol");function UT(n,a,s){const o=S.useRef(s);S.useInsertionEffect(()=>{o.current=s});const u=S.useRef(null);return S.useCallback(h=>{var m;h&&((m=n.onMount)==null||m.call(n,h)),a&&(h?a.mount(h):a.unmount());const f=o.current;if(typeof f=="function")if(h){const p=f(h);typeof p=="function"&&(u.current=p)}else u.current?(u.current(),u.current=null):f(h);else f&&(f.current=h)},[a])}const Hb=S.createContext({});function za(n){return n&&typeof n=="object"&&Object.prototype.hasOwnProperty.call(n,"current")}function HT(n,a,s,o,u,h){var B,_;const{visualElement:f}=S.useContext(El),m=S.useContext(zb),p=S.useContext(xl),g=S.useContext(Vf),v=g.reducedMotion,x=g.skipAnimations,b=S.useRef(null),j=S.useRef(!1);o=o||m.renderer,!b.current&&o&&(b.current=o(n,{visualState:a,parent:f,props:s,presenceContext:p,blockInitialAnimation:p?p.initial===!1:!1,reducedMotionConfig:v,skipAnimations:x,isSVG:h}),j.current&&b.current&&(b.current.manuallyAnimateOnMount=!0));const E=b.current,T=S.useContext(Hb);E&&!E.projection&&u&&(E.type==="html"||E.type==="svg")&&qT(b.current,s,u,T);const D=S.useRef(!1);S.useInsertionEffect(()=>{E&&D.current&&E.update(s,p)});const O=s[Qx],k=S.useRef(!!O&&typeof window<"u"&&!((B=window.MotionHandoffIsComplete)!=null&&B.call(window,O))&&((_=window.MotionHasOptimisedAnimation)==null?void 0:_.call(window,O)));return df(()=>{j.current=!0,E&&(D.current=!0,window.MotionIsMounted=!0,E.updateFeatures(),E.scheduleRenderMicrotask(),k.current&&E.animationState&&E.animationState.animateChanges())}),S.useEffect(()=>{E&&(!k.current&&E.animationState&&E.animationState.animateChanges(),k.current&&(queueMicrotask(()=>{var U;(U=window.MotionHandoffMarkAsComplete)==null||U.call(window,O)}),k.current=!1),E.enteringChildren=void 0)}),E}function qT(n,a,s,o){const{layoutId:u,layout:h,drag:f,dragConstraints:m,layoutScroll:p,layoutRoot:g,layoutAnchor:v,layoutCrossfade:x}=a;n.projection=new s(n.latestValues,a["data-framer-portal-id"]?void 0:qb(n.parent)),n.projection.setOptions({layoutId:u,layout:h,alwaysMeasureLayout:!!f||m&&za(m),visualElement:n,animationType:typeof h=="string"?h:"both",initialPromotionConfig:o,crossfade:x,layoutScroll:p,layoutRoot:g,layoutAnchor:v})}function qb(n){if(n)return n.options.allowProjection!==!1?n.projection:qb(n.parent)}function id(n,{forwardMotionProps:a=!1,type:s}={},o,u){o&&wT(o);const h=s?s==="svg":Lf(n),f=h?BT:VT;function m(g,v){let x;const b={...S.useContext(Vf),...g,layoutId:YT(g)},{isStatic:j}=b,E=DT(g),T=f(g,j);if(!j&&typeof window<"u"){GT();const D=PT(b);x=D.MeasureLayout,E.visualElement=HT(n,T,b,u,D.ProjectionNode,h)}return l.jsxs(El.Provider,{value:E,children:[x&&E.visualElement?l.jsx(x,{visualElement:E.visualElement,...b}):null,OT(n,g,UT(T,E.visualElement,v),T,j,a,h)]})}m.displayName=`motion.${typeof n=="string"?n:`create(${n.displayName??n.name??""})`}`;const p=S.forwardRef(m);return p[LT]=n,p}function YT({layoutId:n}){const a=S.useContext(cf).id;return a&&n!==void 0?a+"-"+n:n}function GT(n,a){S.useContext(zb).strict}function PT(n){const a=_b(),{drag:s,layout:o}=a;if(!s&&!o)return{};const u={...s,...o};return{MeasureLayout:s!=null&&s.isEnabled(n)||o!=null&&o.isEnabled(n)?u.MeasureLayout:void 0,ProjectionNode:u.ProjectionNode}}function FT(n,a){if(typeof Proxy>"u")return id;const s=new Map,o=(h,f)=>id(h,f,n,a),u=(h,f)=>o(h,f);return new Proxy(u,{get:(h,f)=>f==="create"?o:(s.has(f)||s.set(f,id(f,void 0,n,a)),s.get(f))})}const XT=(n,a)=>a.isSVG??Lf(n)?new SE(a):new pE(a,{allowProjection:n!==S.Fragment});class $T extends xr{constructor(a){super(a),a.animationState||(a.animationState=CE(a))}updateAnimationControlsSubscription(){const{animate:a}=this.node.getProps();wl(a)&&(this.unmountControls=a.subscribe(this.node))}mount(){this.updateAnimationControlsSubscription()}update(){const{animate:a}=this.node.getProps(),{animate:s}=this.node.prevProps||{};a!==s&&this.updateAnimationControlsSubscription()}unmount(){var a;this.node.animationState.reset(),(a=this.unmountControls)==null||a.call(this)}}let KT=0;class ZT extends xr{constructor(){super(...arguments),this.id=KT++,this.isExitComplete=!1}update(){var h;if(!this.node.presenceContext)return;const{isPresent:a,onExitComplete:s}=this.node.presenceContext,{isPresent:o}=this.node.prevPresenceContext||{};if(!this.node.animationState||a===o)return;if(a&&o===!1){if(this.isExitComplete){const{initial:f,custom:m}=this.node.getProps();if(typeof f=="string"||typeof f=="object"&&f!==null&&!Array.isArray(f)){const p=Gr(this.node,f,m);if(p){const{transition:g,transitionEnd:v,...x}=p;for(const b in x)(h=this.node.getValue(b))==null||h.jump(x[b])}}this.node.animationState.reset(),this.node.animationState.animateChanges()}else this.node.animationState.setActive("exit",!1);this.isExitComplete=!1;return}const u=this.node.animationState.setActive("exit",!a);s&&!a&&u.then(()=>{this.isExitComplete=!0,s(this.id)})}mount(){const{register:a,onExitComplete:s}=this.node.presenceContext||{};s&&s(this.id),a&&(this.unmount=a(this.id))}unmount(){}}const QT={animation:{Feature:$T},exit:{Feature:ZT}};function cs(n){return{point:{x:n.pageX,y:n.pageY}}}const JT=n=>a=>Af(a)&&n(a,cs(a));function Qi(n,a,s,o){return ts(n,a,JT(s),o)}const Yb=({current:n})=>n?n.ownerDocument.defaultView:null,mv=(n,a)=>Math.abs(n-a);function WT(n,a){const s=mv(n.x,a.x),o=mv(n.y,a.y);return Math.sqrt(s**2+o**2)}const pv=new Set(["auto","scroll"]);class Gb{constructor(a,s,{transformPagePoint:o,contextWindow:u=window,dragSnapToOrigin:h=!1,distanceThreshold:f=3,element:m}={}){if(this.startEvent=null,this.lastMoveEvent=null,this.lastMoveEventInfo=null,this.lastRawMoveEventInfo=null,this.handlers={},this.contextWindow=window,this.scrollPositions=new Map,this.removeScrollListeners=null,this.onElementScroll=E=>{this.handleScroll(E.target)},this.onWindowScroll=()=>{this.handleScroll(window)},this.updatePoint=()=>{if(!(this.lastMoveEvent&&this.lastMoveEventInfo))return;this.lastRawMoveEventInfo&&(this.lastMoveEventInfo=Oo(this.lastRawMoveEventInfo,this.transformPagePoint));const E=sd(this.lastMoveEventInfo,this.history),T=this.startEvent!==null,D=WT(E.offset,{x:0,y:0})>=this.distanceThreshold;if(!T&&!D)return;const{point:O}=E,{timestamp:k}=mt;this.history.push({...O,timestamp:k});const{onStart:B,onMove:_}=this.handlers;T||(B&&B(this.lastMoveEvent,E),this.startEvent=this.lastMoveEvent),_&&_(this.lastMoveEvent,E)},this.handlePointerMove=(E,T)=>{this.lastMoveEvent=E,this.lastRawMoveEventInfo=T,this.lastMoveEventInfo=Oo(T,this.transformPagePoint),Ye.update(this.updatePoint,!0)},this.handlePointerUp=(E,T)=>{this.end();const{onEnd:D,onSessionEnd:O,resumeAnimation:k}=this.handlers;if((this.dragSnapToOrigin||!this.startEvent)&&k&&k(),!(this.lastMoveEvent&&this.lastMoveEventInfo))return;const B=sd(E.type==="pointercancel"?this.lastMoveEventInfo:Oo(T,this.transformPagePoint),this.history);this.startEvent&&D&&D(E,B),O&&O(E,B)},!Af(a))return;this.dragSnapToOrigin=h,this.handlers=s,this.transformPagePoint=o,this.distanceThreshold=f,this.contextWindow=u||window;const p=cs(a),g=Oo(p,this.transformPagePoint),{point:v}=g,{timestamp:x}=mt;this.history=[{...v,timestamp:x}];const{onSessionStart:b}=s;b&&b(a,sd(g,this.history));const j={passive:!0,capture:!0};this.removeListeners=ss(Qi(this.contextWindow,"pointermove",this.handlePointerMove,j),Qi(this.contextWindow,"pointerup",this.handlePointerUp,j),Qi(this.contextWindow,"pointercancel",this.handlePointerUp,j)),m&&this.startScrollTracking(m)}startScrollTracking(a){let s=a.parentElement;for(;s;){const o=getComputedStyle(s);(pv.has(o.overflowX)||pv.has(o.overflowY))&&this.scrollPositions.set(s,{x:s.scrollLeft,y:s.scrollTop}),s=s.parentElement}this.scrollPositions.set(window,{x:window.scrollX,y:window.scrollY}),window.addEventListener("scroll",this.onElementScroll,{capture:!0}),window.addEventListener("scroll",this.onWindowScroll),this.removeScrollListeners=()=>{window.removeEventListener("scroll",this.onElementScroll,{capture:!0}),window.removeEventListener("scroll",this.onWindowScroll)}}handleScroll(a){const s=this.scrollPositions.get(a);if(!s)return;const o=a===window,u=o?{x:window.scrollX,y:window.scrollY}:{x:a.scrollLeft,y:a.scrollTop},h={x:u.x-s.x,y:u.y-s.y};h.x===0&&h.y===0||(o?this.lastMoveEventInfo&&(this.lastMoveEventInfo.point.x+=h.x,this.lastMoveEventInfo.point.y+=h.y):this.history.length>0&&(this.history[0].x-=h.x,this.history[0].y-=h.y),this.scrollPositions.set(a,u),Ye.update(this.updatePoint,!0))}updateHandlers(a){this.handlers=a}end(){this.removeListeners&&this.removeListeners(),this.removeScrollListeners&&this.removeScrollListeners(),this.scrollPositions.clear(),yr(this.updatePoint)}}function Oo(n,a){return a?{point:a(n.point)}:n}function gv(n,a){return{x:n.x-a.x,y:n.y-a.y}}function sd({point:n},a){return{point:n,delta:gv(n,Pb(a)),offset:gv(n,IT(a)),velocity:eC(a,.1)}}function IT(n){return n[0]}function Pb(n){return n[n.length-1]}function eC(n,a){if(n.length<2)return{x:0,y:0};let s=n.length-1,o=null;const u=Pb(n);for(;s>=0&&(o=n[s],!(u.timestamp-o.timestamp>Ht(a)));)s--;if(!o)return{x:0,y:0};o===n[0]&&n.length>2&&u.timestamp-o.timestamp>Ht(a)*2&&(o=n[1]);const h=Wt(u.timestamp-o.timestamp);if(h===0)return{x:0,y:0};const f={x:(u.x-o.x)/h,y:(u.y-o.y)/h};return f.x===1/0&&(f.x=0),f.y===1/0&&(f.y=0),f}function tC(n,{min:a,max:s},o){return a!==void 0&&n<a?n=o?qe(a,n,o.min):Math.max(n,a):s!==void 0&&n>s&&(n=o?qe(s,n,o.max):Math.min(n,s)),n}function yv(n,a,s){return{min:a!==void 0?n.min+a:void 0,max:s!==void 0?n.max+s-(n.max-n.min):void 0}}function nC(n,{top:a,left:s,bottom:o,right:u}){return{x:yv(n.x,s,u),y:yv(n.y,a,o)}}function vv(n,a){let s=a.min-n.min,o=a.max-n.max;return a.max-a.min<n.max-n.min&&([s,o]=[o,s]),{min:s,max:o}}function rC(n,a){return{x:vv(n.x,a.x),y:vv(n.y,a.y)}}function aC(n,a){let s=.5;const o=bt(n),u=bt(a);return u>o?s=Wi(a.min,a.max-o,n.min):o>u&&(s=Wi(n.min,n.max-u,a.min)),vn(0,1,s)}function iC(n,a){const s={};return a.min!==void 0&&(s.min=a.min-n.min),a.max!==void 0&&(s.max=a.max-n.min),s}const Pd=.35;function sC(n=Pd){return n===!1?n=0:n===!0&&(n=Pd),{x:xv(n,"left","right"),y:xv(n,"top","bottom")}}function xv(n,a,s){return{min:bv(n,a),max:bv(n,s)}}function bv(n,a){return typeof n=="number"?n:n[a]||0}const oC=new WeakMap;class lC{constructor(a){this.openDragLock=null,this.isDragging=!1,this.currentDirection=null,this.originPoint={x:0,y:0},this.constraints=!1,this.hasMutatedConstraints=!1,this.elastic=it(),this.latestPointerEvent=null,this.latestPanInfo=null,this.visualElement=a}start(a,{snapToCursor:s=!1,distanceThreshold:o}={}){const{presenceContext:u}=this.visualElement;if(u&&u.isPresent===!1)return;const h=x=>{s&&this.snapToCursor(cs(x).point),this.stopAnimation()},f=(x,b)=>{const{drag:j,dragPropagation:E,onDragStart:T}=this.getProps();if(j&&!E&&(this.openDragLock&&this.openDragLock(),this.openDragLock=_j(j),!this.openDragLock))return;this.latestPointerEvent=x,this.latestPanInfo=b,this.isDragging=!0,this.currentDirection=null,this.resolveConstraints(),this.visualElement.projection&&(this.visualElement.projection.isAnimationBlocked=!0,this.visualElement.projection.target=void 0),mn(O=>{let k=this.getAxisMotionValue(O).get()||0;if(yn.test(k)){const{projection:B}=this.visualElement;if(B&&B.layout){const _=B.layout.layoutBox[O];_&&(k=bt(_)*(parseFloat(k)/100))}}this.originPoint[O]=k}),T&&Ye.update(()=>T(x,b),!1,!0),_d(this.visualElement,"transform");const{animationState:D}=this.visualElement;D&&D.setActive("whileDrag",!0)},m=(x,b)=>{this.latestPointerEvent=x,this.latestPanInfo=b;const{dragPropagation:j,dragDirectionLock:E,onDirectionLock:T,onDrag:D}=this.getProps();if(!j&&!this.openDragLock)return;const{offset:O}=b;if(E&&this.currentDirection===null){this.currentDirection=uC(O),this.currentDirection!==null&&T&&T(this.currentDirection);return}this.updateAxis("x",b.point,O),this.updateAxis("y",b.point,O),this.visualElement.render(),D&&Ye.update(()=>D(x,b),!1,!0)},p=(x,b)=>{this.latestPointerEvent=x,this.latestPanInfo=b,this.stop(x,b),this.latestPointerEvent=null,this.latestPanInfo=null},g=()=>{const{dragSnapToOrigin:x}=this.getProps();(x||this.constraints)&&this.startAnimation({x:0,y:0})},{dragSnapToOrigin:v}=this.getProps();this.panSession=new Gb(a,{onSessionStart:h,onStart:f,onMove:m,onSessionEnd:p,resumeAnimation:g},{transformPagePoint:this.visualElement.getTransformPagePoint(),dragSnapToOrigin:v,distanceThreshold:o,contextWindow:Yb(this.visualElement),element:this.visualElement.current})}stop(a,s){const o=a||this.latestPointerEvent,u=s||this.latestPanInfo,h=this.isDragging;if(this.cancel(),!h||!u||!o)return;const{velocity:f}=u;this.startAnimation(f);const{onDragEnd:m}=this.getProps();m&&Ye.postRender(()=>m(o,u))}cancel(){this.isDragging=!1;const{projection:a,animationState:s}=this.visualElement;a&&(a.isAnimationBlocked=!1),this.endPanSession();const{dragPropagation:o}=this.getProps();!o&&this.openDragLock&&(this.openDragLock(),this.openDragLock=null),s&&s.setActive("whileDrag",!1)}endPanSession(){this.panSession&&this.panSession.end(),this.panSession=void 0}updateAxis(a,s,o){const{drag:u}=this.getProps();if(!o||!zo(a,u,this.currentDirection))return;const h=this.getAxisMotionValue(a);let f=this.originPoint[a]+o[a];this.constraints&&this.constraints[a]&&(f=tC(f,this.constraints[a],this.elastic[a])),h.set(f)}resolveConstraints(){var h;const{dragConstraints:a,dragElastic:s}=this.getProps(),o=this.visualElement.projection&&!this.visualElement.projection.layout?this.visualElement.projection.measure(!1):(h=this.visualElement.projection)==null?void 0:h.layout,u=this.constraints;a&&za(a)?this.constraints||(this.constraints=this.resolveRefConstraints()):a&&o?this.constraints=nC(o.layoutBox,a):this.constraints=!1,this.elastic=sC(s),u!==this.constraints&&!za(a)&&o&&this.constraints&&!this.hasMutatedConstraints&&mn(f=>{this.constraints!==!1&&this.getAxisMotionValue(f)&&(this.constraints[f]=iC(o.layoutBox[f],this.constraints[f]))})}resolveRefConstraints(){const{dragConstraints:a,onMeasureDragConstraints:s}=this.getProps();if(!a||!za(a))return!1;const o=a.current,{projection:u}=this.visualElement;if(!u||!u.layout)return!1;u.root&&(u.root.scroll=void 0,u.root.updateScroll());const h=cE(o,u.root,this.visualElement.getTransformPagePoint());let f=rC(u.layout.layoutBox,h);if(s){const m=s(sE(f));this.hasMutatedConstraints=!!m,m&&(f=fb(m))}return f}startAnimation(a){const{drag:s,dragMomentum:o,dragElastic:u,dragTransition:h,dragSnapToOrigin:f,onDragTransitionEnd:m}=this.getProps(),p=this.constraints||{},g=mn(v=>{if(!zo(v,s,this.currentDirection))return;let x=p&&p[v]||{};(f===!0||f===v)&&(x={min:0,max:0});const b=u?200:1e6,j=u?40:1e7,E={type:"inertia",velocity:o?a[v]:0,bounceStiffness:b,bounceDamping:j,timeConstant:750,restDelta:1,restSpeed:10,...h,...x};return this.startAxisValueAnimation(v,E)});return Promise.all(g).then(m)}startAxisValueAnimation(a,s){const o=this.getAxisMotionValue(a);return _d(this.visualElement,a),o.start(Ef(a,o,0,s,this.visualElement,!1))}stopAnimation(){mn(a=>this.getAxisMotionValue(a).stop())}getAxisMotionValue(a){const s=`_drag${a.toUpperCase()}`,u=this.visualElement.getProps()[s];return u||this.visualElement.getValue(a,this.visualElement.latestValues[a]??0)}snapToCursor(a){mn(s=>{const{drag:o}=this.getProps();if(!zo(s,o,this.currentDirection))return;const{projection:u}=this.visualElement,h=this.getAxisMotionValue(s);if(u&&u.layout){const{min:f,max:m}=u.layout.layoutBox[s],p=h.get()||0;h.set(a[s]-qe(f,m,.5)+p)}})}scalePositionWithinConstraints(){if(!this.visualElement.current)return;const{drag:a,dragConstraints:s}=this.getProps(),{projection:o}=this.visualElement;if(!za(s)||!o||!this.constraints)return;this.stopAnimation();const u={x:0,y:0};mn(f=>{const m=this.getAxisMotionValue(f);if(m&&this.constraints!==!1){const p=m.get();u[f]=aC({min:p,max:p},this.constraints[f])}});const{transformTemplate:h}=this.visualElement.getProps();this.visualElement.current.style.transform=h?h({},""):"none",o.root&&o.root.updateScroll(),o.updateLayout(),this.constraints=!1,this.resolveConstraints(),mn(f=>{if(!zo(f,a,null))return;const m=this.getAxisMotionValue(f),{min:p,max:g}=this.constraints[f];m.set(qe(p,g,u[f]))}),this.visualElement.render()}addListeners(){if(!this.visualElement.current)return;oC.set(this.visualElement,this);const a=this.visualElement.current,s=Qi(a,"pointerdown",g=>{const{drag:v,dragListener:x=!0}=this.getProps(),b=g.target,j=b!==a&&qj(b);v&&x&&!j&&this.start(g)});let o;const u=()=>{const{dragConstraints:g}=this.getProps();za(g)&&g.current&&(this.constraints=this.resolveRefConstraints(),o||(o=cC(a,g.current,()=>this.scalePositionWithinConstraints())))},{projection:h}=this.visualElement,f=h.addEventListener("measure",u);h&&!h.layout&&(h.root&&h.root.updateScroll(),h.updateLayout()),Ye.read(u);const m=ts(window,"resize",()=>this.scalePositionWithinConstraints()),p=h.addEventListener("didUpdate",(({delta:g,hasLayoutChanged:v})=>{this.isDragging&&v&&(mn(x=>{const b=this.getAxisMotionValue(x);b&&(this.originPoint[x]+=g[x].translate,b.set(b.get()+g[x].translate))}),this.visualElement.render())}));return()=>{m(),s(),f(),p&&p(),o&&o()}}getProps(){const a=this.visualElement.getProps(),{drag:s=!1,dragDirectionLock:o=!1,dragPropagation:u=!1,dragConstraints:h=!1,dragElastic:f=Pd,dragMomentum:m=!0}=a;return{...a,drag:s,dragDirectionLock:o,dragPropagation:u,dragConstraints:h,dragElastic:f,dragMomentum:m}}}function Sv(n){let a=!0;return()=>{if(a){a=!1;return}n()}}function cC(n,a,s){const o=Ny(n,Sv(s)),u=Ny(a,Sv(s));return()=>{o(),u()}}function zo(n,a,s){return(a===!0||a===n)&&(s===null||s===n)}function uC(n,a=10){let s=null;return Math.abs(n.y)>a?s="y":Math.abs(n.x)>a&&(s="x"),s}class dC extends xr{constructor(a){super(a),this.removeGroupControls=It,this.removeListeners=It,this.controls=new lC(a)}mount(){const{dragControls:a}=this.node.getProps();a&&(this.removeGroupControls=a.subscribe(this.controls)),this.removeListeners=this.controls.addListeners()||It}update(){const{dragControls:a}=this.node.getProps(),{dragControls:s}=this.node.prevProps||{};a!==s&&(this.removeGroupControls(),a&&(this.removeGroupControls=a.subscribe(this.controls)))}unmount(){this.removeGroupControls(),this.removeListeners(),this.controls.isDragging||this.controls.endPanSession()}}const od=n=>(a,s)=>{n&&Ye.update(()=>n(a,s),!1,!0)};class fC extends xr{constructor(){super(...arguments),this.removePointerDownListener=It}onPointerDown(a){this.session=new Gb(a,this.createPanHandlers(),{transformPagePoint:this.node.getTransformPagePoint(),contextWindow:Yb(this.node)})}createPanHandlers(){const{onPanSessionStart:a,onPanStart:s,onPan:o,onPanEnd:u}=this.node.getProps();return{onSessionStart:od(a),onStart:od(s),onMove:od(o),onEnd:(h,f)=>{delete this.session,u&&Ye.postRender(()=>u(h,f))}}}mount(){this.removePointerDownListener=Qi(this.node.current,"pointerdown",a=>this.onPointerDown(a))}update(){this.session&&this.session.updateHandlers(this.createPanHandlers())}unmount(){this.removePointerDownListener(),this.session&&this.session.end()}}let ld=!1;class hC extends S.Component{componentDidMount(){const{visualElement:a,layoutGroup:s,switchLayoutGroup:o,layoutId:u}=this.props,{projection:h}=a;h&&(s.group&&s.group.add(h),o&&o.register&&u&&o.register(h),ld&&h.root.didUpdate(),h.addEventListener("animationComplete",()=>{this.safeToRemove()}),h.setOptions({...h.options,layoutDependency:this.props.layoutDependency,onExitComplete:()=>this.safeToRemove()})),Qo.hasEverUpdated=!0}getSnapshotBeforeUpdate(a){const{layoutDependency:s,visualElement:o,drag:u,isPresent:h}=this.props,{projection:f}=o;return f&&(f.isPresent=h,a.layoutDependency!==s&&f.setOptions({...f.options,layoutDependency:s}),ld=!0,u||a.layoutDependency!==s||s===void 0||a.isPresent!==h?f.willUpdate():this.safeToRemove(),a.isPresent!==h&&(h?f.promote():f.relegate()||Ye.postRender(()=>{const m=f.getStack();(!m||!m.members.length)&&this.safeToRemove()}))),null}componentDidUpdate(){const{visualElement:a,layoutAnchor:s}=this.props,{projection:o}=a;o&&(o.options.layoutAnchor=s,o.root.didUpdate(),Nf.postRender(()=>{!o.currentAnimation&&o.isLead()&&this.safeToRemove()}))}componentWillUnmount(){const{visualElement:a,layoutGroup:s,switchLayoutGroup:o}=this.props,{projection:u}=a;ld=!0,u&&(u.scheduleCheckAfterUnmount(),s&&s.group&&s.group.remove(u),o&&o.deregister&&o.deregister(u))}safeToRemove(){const{safeToRemove:a}=this.props;a&&a()}render(){return null}}function Fb(n){const[a,s]=Ob(),o=S.useContext(cf);return l.jsx(hC,{...n,layoutGroup:o,switchLayoutGroup:S.useContext(Hb),isPresent:a,safeToRemove:s})}const mC={pan:{Feature:fC},drag:{Feature:dC,ProjectionNode:Rb,MeasureLayout:Fb}};function wv(n,a,s){const{props:o}=n;n.animationState&&o.whileHover&&n.animationState.setActive("whileHover",s==="Start");const u="onHover"+s,h=o[u];h&&Ye.postRender(()=>h(a,cs(a)))}class pC extends xr{mount(){const{current:a}=this.node;a&&(this.unmount=Bj(a,(s,o)=>(wv(this.node,o,"Start"),u=>wv(this.node,u,"End"))))}unmount(){}}class gC extends xr{constructor(){super(...arguments),this.isActive=!1}onFocus(){let a=!1;try{a=this.node.current.matches(":focus-visible")}catch{a=!0}!a||!this.node.animationState||(this.node.animationState.setActive("whileFocus",!0),this.isActive=!0)}onBlur(){!this.isActive||!this.node.animationState||(this.node.animationState.setActive("whileFocus",!1),this.isActive=!1)}mount(){this.unmount=ss(ts(this.node.current,"focus",()=>this.onFocus()),ts(this.node.current,"blur",()=>this.onBlur()))}unmount(){}}function jv(n,a,s){const{props:o}=n;if(n.current instanceof HTMLButtonElement&&n.current.disabled)return;n.animationState&&o.whileTap&&n.animationState.setActive("whileTap",s==="Start");const u="onTap"+(s==="End"?"":s),h=o[u];h&&Ye.postRender(()=>h(a,cs(a)))}class yC extends xr{mount(){const{current:a}=this.node;if(!a)return;const{globalTapTarget:s,propagate:o}=this.node.props;this.unmount=Gj(a,(u,h)=>(jv(this.node,h,"Start"),(f,{success:m})=>jv(this.node,f,m?"End":"Cancel")),{useGlobalTarget:s,stopPropagation:(o==null?void 0:o.tap)===!1})}unmount(){}}const Fd=new WeakMap,cd=new WeakMap,vC=n=>{const a=Fd.get(n.target);a&&a(n)},xC=n=>{n.forEach(vC)};function bC({root:n,...a}){const s=n||document;cd.has(s)||cd.set(s,{});const o=cd.get(s),u=JSON.stringify(a);return o[u]||(o[u]=new IntersectionObserver(xC,{root:n,...a})),o[u]}function SC(n,a,s){const o=bC(a);return Fd.set(n,s),o.observe(n),()=>{Fd.delete(n),o.unobserve(n)}}const wC={some:0,all:1};class jC extends xr{constructor(){super(...arguments),this.hasEnteredView=!1,this.isInView=!1}startObserver(){var p;(p=this.stopObserver)==null||p.call(this);const{viewport:a={}}=this.node.getProps(),{root:s,margin:o,amount:u="some",once:h}=a,f={root:s?s.current:void 0,rootMargin:o,threshold:typeof u=="number"?u:wC[u]},m=g=>{const{isIntersecting:v}=g;if(this.isInView===v||(this.isInView=v,h&&!v&&this.hasEnteredView))return;v&&(this.hasEnteredView=!0),this.node.animationState&&this.node.animationState.setActive("whileInView",v);const{onViewportEnter:x,onViewportLeave:b}=this.node.getProps(),j=v?x:b;j&&j(g)};this.stopObserver=SC(this.node.current,f,m)}mount(){this.startObserver()}update(){if(typeof IntersectionObserver>"u")return;const{props:a,prevProps:s}=this.node;["amount","margin","root"].some(EC(a,s))&&this.startObserver()}unmount(){var a;(a=this.stopObserver)==null||a.call(this),this.hasEnteredView=!1,this.isInView=!1}}function EC({viewport:n={}},{viewport:a={}}={}){return s=>n[s]!==a[s]}const TC={inView:{Feature:jC},tap:{Feature:yC},focus:{Feature:gC},hover:{Feature:pC}},CC={layout:{ProjectionNode:Rb,MeasureLayout:Fb}},DC={...QT,...TC,...mC,...CC},NC=FT(DC,XT);function Xb(){!Of.current&&cb();const[n]=S.useState(sl.current);return n}const Uf=NC,dl=new Map,Ev=new Set;let AC=0;const Hf=()=>{var n;return(n=window.chrome)==null?void 0:n.webview};function MC(n){var s;const a=dl.get(n.id);if(a){if(n.type==="progress"){(s=a.progress)==null||s.call(a,n.data);return}window.clearTimeout(a.timer),dl.delete(n.id),n.ok?a.resolve(n.data):a.reject(new Error(n.error||"操作失败"))}}var ix;(ix=Hf())==null||ix.addEventListener("message",n=>MC(n.data));function kC(n,a){var s;a&&Ev.has(a)||(a&&Ev.add(a),(s=Hf())==null||s.postMessage({type:"app.ready",route:n,navigation:a}))}function be(n,a,s=3e4,o){const u=Hf();if(!u)return Promise.reject(new Error("当前页面未连接到桌面宿主"));const h=`${Date.now()}-${++AC}`;return new Promise((f,m)=>{const p=window.setTimeout(()=>{dl.delete(h),m(new Error("操作超时，请重试"))},s);dl.set(h,{resolve:g=>f(g),reject:m,timer:p,progress:o}),u.postMessage({id:h,operation:n,payload:a})})}var qf=lx();/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const RC=n=>n.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),$b=(...n)=>n.filter((a,s,o)=>!!a&&a.trim()!==""&&o.indexOf(a)===s).join(" ").trim();/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var OC={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zC=S.forwardRef(({color:n="currentColor",size:a=24,strokeWidth:s=2,absoluteStrokeWidth:o,className:u="",children:h,iconNode:f,...m},p)=>S.createElement("svg",{ref:p,...OC,width:a,height:a,stroke:n,strokeWidth:o?Number(s)*24/Number(a):s,className:$b("lucide",u),...m},[...f.map(([g,v])=>S.createElement(g,v)),...Array.isArray(h)?h:[h]]));/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ue=(n,a)=>{const s=S.forwardRef(({className:o,...u},h)=>S.createElement(zC,{ref:h,iconNode:a,className:$b(`lucide-${RC(n)}`,o),...u}));return s.displayName=`${n}`,s};/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ns=Ue("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _C=Ue("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const VC=Ue("CalendarDays",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}],["path",{d:"M8 14h.01",key:"6423bh"}],["path",{d:"M12 14h.01",key:"1etili"}],["path",{d:"M16 14h.01",key:"1gbofw"}],["path",{d:"M8 18h.01",key:"lrp35t"}],["path",{d:"M12 18h.01",key:"mhygvu"}],["path",{d:"M16 18h.01",key:"kzsmim"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const BC=Ue("Calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const us=Ue("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const LC=Ue("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kb=Ue("ChevronLeft",[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zb=Ue("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const UC=Ue("CircleAlert",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const HC=Ue("Copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xd=Ue("Database",[["ellipse",{cx:"12",cy:"5",rx:"9",ry:"3",key:"msslwz"}],["path",{d:"M3 5V19A9 3 0 0 0 21 19V5",key:"1wlel7"}],["path",{d:"M3 12A9 3 0 0 0 21 12",key:"mv7ke4"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qC=Ue("Ellipsis",[["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}],["circle",{cx:"19",cy:"12",r:"1",key:"1wjl8i"}],["circle",{cx:"5",cy:"12",r:"1",key:"1pcz8c"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tv=Ue("FileCheck2",[["path",{d:"M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4",key:"1pf5j1"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"m3 15 2 2 4-4",key:"1lhrkk"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cv=Ue("FileSpreadsheet",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M8 13h2",key:"yr2amv"}],["path",{d:"M14 13h2",key:"un5t4a"}],["path",{d:"M8 17h2",key:"2yhykz"}],["path",{d:"M14 17h2",key:"10kma7"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const YC=Ue("FileText",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dv=Ue("FolderOpen",[["path",{d:"m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",key:"usdka0"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fr=Ue("LoaderCircle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const GC=Ue("Play",[["polygon",{points:"6 3 20 12 6 21 6 3",key:"1oa8hb"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const PC=Ue("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qb=Ue("RefreshCw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const FC=Ue("RotateCw",[["path",{d:"M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8",key:"1p45f6"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const XC=Ue("Rows3",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M21 9H3",key:"1338ky"}],["path",{d:"M21 15H3",key:"9uk58r"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $C=Ue("Settings2",[["path",{d:"M20 7h-9",key:"3s1dr2"}],["path",{d:"M14 17H5",key:"gfn3mx"}],["circle",{cx:"17",cy:"17",r:"3",key:"18b49y"}],["circle",{cx:"7",cy:"7",r:"3",key:"dfmy0x"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const KC=Ue("Sigma",[["path",{d:"M18 7V5a1 1 0 0 0-1-1H6.5a.5.5 0 0 0-.4.8l4.5 6a2 2 0 0 1 0 2.4l-4.5 6a.5.5 0 0 0 .4.8H17a1 1 0 0 0 1-1v-2",key:"wuwx1p"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ZC=Ue("SlidersHorizontal",[["line",{x1:"21",x2:"14",y1:"4",y2:"4",key:"obuewd"}],["line",{x1:"10",x2:"3",y1:"4",y2:"4",key:"1q6298"}],["line",{x1:"21",x2:"12",y1:"12",y2:"12",key:"1iu8h1"}],["line",{x1:"8",x2:"3",y1:"12",y2:"12",key:"ntss68"}],["line",{x1:"21",x2:"16",y1:"20",y2:"20",key:"14d8ph"}],["line",{x1:"12",x2:"3",y1:"20",y2:"20",key:"m0wm8r"}],["line",{x1:"14",x2:"14",y1:"2",y2:"6",key:"14e1ph"}],["line",{x1:"8",x2:"8",y1:"10",y2:"14",key:"1i6ji0"}],["line",{x1:"16",x2:"16",y1:"18",y2:"22",key:"1lctlv"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const QC=Ue("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const JC=Ue("TriangleAlert",[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yf=Ue("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]),WC=["一","二","三","四","五","六","日"],IC=Array.from({length:12},(n,a)=>`${a+1}月`);function eD(n){if(!n)return null;const[a,s,o=1]=n.split("-").map(Number);return!a||!s||!o?null:new Date(a,s-1,o)}function Nv(n){const a=n.getFullYear(),s=String(n.getMonth()+1).padStart(2,"0"),o=String(n.getDate()).padStart(2,"0");return`${a}-${s}-${o}`}function tD(n){const a=n.getFullYear(),s=String(n.getMonth()+1).padStart(2,"0"),o=String(n.getDate()).padStart(2,"0");return`${a}/${s}/${o}`}function nD(n,a){const s=new Date(n,a,1).getDay();return s===0?6:s-1}function rD(n,a){return new Date(n,a+1,0).getDate()}function Av(n,a){return n.getFullYear()===a.getFullYear()&&n.getMonth()===a.getMonth()&&n.getDate()===a.getDate()}function aD(n){return Math.floor(n/12)*12}function Ya({value:n,onChange:a,label:s,disabled:o=!1,selectionMode:u="day"}){var C;const h=S.useId(),f=S.useMemo(()=>eD(n),[n]),[m,p]=S.useState(!1),[g,v]=S.useState(u),[x,b]=S.useState(f??new Date),[j,E]=S.useState({top:0,left:0}),[T,D]=S.useState("bottom"),O=S.useRef(null),k=S.useRef(null),B=S.useRef(null);S.useEffect(()=>{f&&b(f)},[n]);function _(){const R=O.current,I=B.current;if(!R||!I)return;const ie=R.ownerDocument.defaultView||window,oe=R.getBoundingClientRect(),fe=I.getBoundingClientRect(),ye=fe.width,ae=fe.height,Q=8,ue=12,te=ie.innerHeight-oe.bottom-ue,he=oe.top-ue,Ce=ae>te&&he>te,Oe=Ce?"top":"bottom";let Qe=Ce?oe.top-ae-Q:oe.bottom+Q;Qe<ue&&(Qe=ue),Qe+ae>ie.innerHeight-ue&&(Qe=Math.max(ue,ie.innerHeight-ae-ue));let Xe=oe.left;Xe+ye>ie.innerWidth-ue&&(Xe=ie.innerWidth-ye-ue),Xe<ue&&(Xe=ue),D(Oe),E({top:Qe,left:Xe})}S.useLayoutEffect(()=>{m&&_()},[m,g]),S.useEffect(()=>{var ie;if(!m)return;const R=((ie=O.current)==null?void 0:ie.ownerDocument.defaultView)||window;function I(){_()}return R.addEventListener("resize",I),R.addEventListener("scroll",I,!0),()=>{R.removeEventListener("resize",I),R.removeEventListener("scroll",I,!0)}},[m,g]),S.useEffect(()=>{var oe;const R=((oe=k.current)==null?void 0:oe.ownerDocument)||document;function I(fe){var ue,te;const ye=fe.target,ae=(ue=k.current)==null?void 0:ue.contains(ye),Q=(te=B.current)==null?void 0:te.contains(ye);!ae&&!Q&&(p(!1),v(u))}function ie(fe){fe.key==="Escape"&&(p(!1),v(u))}return R.addEventListener("mousedown",I),R.addEventListener("keydown",ie),()=>{R.removeEventListener("mousedown",I),R.removeEventListener("keydown",ie)}},[u]);const U=x.getFullYear(),q=x.getMonth(),N=rD(U,q),M=nD(U,q),V=aD(U),$=Array.from({length:12},(R,I)=>V+I),J=[];for(let R=0;R<M;R+=1)J.push(null);for(let R=1;R<=N;R+=1)J.push(R);function re(){if(g==="day"){b(new Date(U,q-1,1));return}if(g==="month"){b(new Date(U-1,q,1));return}b(new Date(U-12,q,1))}function pe(){if(g==="day"){b(new Date(U,q+1,1));return}if(g==="month"){b(new Date(U+1,q,1));return}b(new Date(U+12,q,1))}function le(){if(u==="month"){v(g==="month"?"year":"month");return}if(g==="day"){v("month");return}if(g==="month"){v("year");return}v("day")}function ve(R){const I=new Date(U,q,R);a(Nv(I)),p(!1),v("day")}function H(R){if(u==="month"){a(`${U}-${String(R+1).padStart(2,"0")}`),b(new Date(U,R,1)),p(!1),v("month");return}b(new Date(U,R,1)),v("day")}function se(R){b(new Date(R,q,1)),v("month")}function K(){const R=new Date;b(R),a(u==="month"?`${R.getFullYear()}-${String(R.getMonth()+1).padStart(2,"0")}`:Nv(R)),v(u),p(!1)}function P(){return g==="day"?`${U}年 ${q+1}月`:g==="month"?`${U}年`:`${V} - ${V+11}`}const ne=m?l.jsxs("div",{ref:B,className:`date-picker-popover date-picker-popover-${T}`,style:{top:j.top,left:j.left},children:[l.jsxs("div",{className:"date-picker-header",children:[l.jsx("button",{type:"button",className:"date-picker-nav-button",onClick:re,"aria-label":"上一页",children:l.jsx(Kb,{size:17,strokeWidth:1.7})}),l.jsx("button",{type:"button",className:"date-picker-title-button",onClick:le,children:P()}),l.jsx("button",{type:"button",className:"date-picker-nav-button",onClick:pe,"aria-label":"下一页",children:l.jsx(Zb,{size:17,strokeWidth:1.7})})]}),g==="day"&&l.jsxs(l.Fragment,{children:[l.jsx("div",{className:"date-picker-weekdays",children:WC.map(R=>l.jsx("div",{children:R},R))}),l.jsx("div",{className:"date-picker-grid",children:J.map((R,I)=>{if(R===null)return l.jsx("div",{},`empty-${I}`);const ie=new Date(U,q,R),oe=f?Av(ie,f):!1,fe=Av(ie,new Date);return l.jsx("button",{type:"button",className:["date-picker-day",oe?"date-picker-day-selected":"",fe&&!oe?"date-picker-day-today":""].filter(Boolean).join(" "),onClick:()=>ve(R),children:R},`${U}-${q}-${R}`)})})]}),g==="month"&&l.jsx("div",{className:"date-picker-month-grid",children:IC.map((R,I)=>{const ie=f&&f.getFullYear()===U&&f.getMonth()===I,oe=new Date().getFullYear()===U&&new Date().getMonth()===I;return l.jsx("button",{type:"button",className:["date-picker-month-item",ie?"date-picker-month-item-selected":"",oe&&!ie?"date-picker-month-item-current":""].filter(Boolean).join(" "),onClick:()=>H(I),children:R},R)})}),g==="year"&&l.jsx("div",{className:"date-picker-year-grid",children:$.map(R=>{const I=f&&f.getFullYear()===R,ie=new Date().getFullYear()===R;return l.jsx("button",{type:"button",className:["date-picker-year-item",I?"date-picker-year-item-selected":"",ie&&!I?"date-picker-year-item-current":""].filter(Boolean).join(" "),onClick:()=>se(R),children:R},R)})}),l.jsx("div",{className:"date-picker-footer",children:l.jsx("button",{type:"button",className:"date-picker-today-button",onClick:K,children:u==="month"?"回到本月":"回到今天"})})]}):null;return l.jsxs(l.Fragment,{children:[l.jsxs("div",{ref:k,className:"date-picker",children:[s&&l.jsx("label",{id:`${h}-label`,className:"date-picker-label",children:s}),l.jsxs("button",{ref:O,type:"button",disabled:o,className:`date-picker-trigger ${m?"date-picker-trigger-open":""}`,onClick:()=>{o||p(R=>{const I=!R;return I&&v(u),I})},"aria-expanded":m,"aria-labelledby":s?`${h}-label ${h}-value`:void 0,"aria-label":s?void 0:u==="month"?"选择月份":"选择日期",children:[l.jsx("span",{id:`${h}-value`,className:f?"":"date-picker-placeholder",children:f?u==="month"?`${f.getFullYear()} / ${String(f.getMonth()+1).padStart(2,"0")}`:tD(f):u==="month"?"选择月份":"选择日期"}),l.jsx(BC,{className:"date-picker-calendar-icon",size:16,strokeWidth:1.7})]})]}),ne&&qf.createPortal(ne,((C=k.current)==null?void 0:C.ownerDocument.body)||document.body)]})}const Jb=`/* Generated from tools/experiments/production_message/production_assistant_demo/src/index.css and App.css.\r
   Do not redesign this file; run npm run sync:production-message-demo after Demo changes. */\r
.production-message-demo, .production-message-demo :where(*:not(svg):not(svg *)) { all: revert; box-sizing: border-box; }\r
.production-message-demo svg, .production-message-demo svg * { box-sizing: border-box; }\r
.production-message-demo { line-height: normal; }\r
.production-message-demo, body:has(.production-message-demo) {\r
  font-family:\r
    "Inter Variable",\r
    "Noto Sans SC Variable",\r
    "Microsoft YaHei UI",\r
    "Segoe UI",\r
    sans-serif;\r
\r
  font-synthesis: none;\r
  text-rendering: optimizeLegibility;\r
\r
  color: #1c1917;\r
  background: #fafaf9;\r
}\r
\r
.production-message-demo {\r
  scrollbar-gutter: stable;\r
}\r
\r
.production-message-demo, .production-message-demo, .production-message-demo {\r
  width: 100%;\r
  min-width: 320px;\r
  min-height: 100%;\r
  margin: 0;\r
}\r
\r
.production-message-demo {\r
  min-height: 100vh;\r
\r
  background: #fafaf9;\r
\r
  -webkit-font-smoothing: antialiased;\r
  -moz-osx-font-smoothing: grayscale;\r
}\r
\r
.production-message-demo button, .production-message-demo input, .production-message-demo textarea, .production-message-demo select {\r
  font-family: inherit;\r
}\r
\r
.production-message-demo, body:has(.production-message-demo) {\r
  /* =======================================================\r
     LAYOUT\r
  ======================================================= */\r
\r
  --page-content-width:\r
    1050px;\r
\r
  --step-content-width:\r
    760px;\r
\r
\r
  /* =======================================================\r
     基础中性色\r
  ======================================================= */\r
\r
  --bg-page:\r
    #fafaf9;\r
\r
  --bg-card:\r
    #ffffff;\r
\r
  --border-subtle:\r
    #e7e5e4;\r
\r
  /*\r
   * 更轻的内部线。\r
   */\r
  --border-soft:\r
    #f0efed;\r
\r
  --text-primary:\r
    #292524;\r
\r
  --text-secondary:\r
    #78716c;\r
\r
\r
/* =======================================================\r
   品牌色\r
   仅用于：\r
   - 主按钮\r
   - 当前步骤\r
   - 已完成步骤\r
======================================================= */\r
\r
--brand: #C2703D;\r
--brand-hover: #A85C2E;\r
--brand-soft: #F5EBE3;\r
\r
\r
  /* =======================================================\r
     状态色\r
  ======================================================= */\r
\r
  --status-ok-text:\r
    #15803d;\r
\r
  --status-ok-bg:\r
    #f0fdf4;\r
\r
\r
  --status-info-text:\r
    #57534e;\r
\r
  --status-info-bg:\r
    #f5f5f4;\r
\r
\r
  --status-warn-text:\r
    #b91c1c;\r
\r
  --status-warn-bg:\r
    #fef2f2;\r
\r
\r
  /* =======================================================\r
     INPUT\r
  ======================================================= */\r
\r
  /*\r
   * 保留之前确定的输入框边框。\r
   */\r
  --input-border:\r
    rgb(215, 215, 214);\r
\r
  --input-border-hover:\r
    rgb(182, 182, 180);\r
\r
  --input-border-focus:\r
    rgb(160, 158, 156);\r
\r
  --input-bg:\r
    #fafaf9;\r
\r
\r
  /* =======================================================\r
     SIDEBAR\r
  ======================================================= */\r
\r
  --sidebar-bg:\r
    rgb(251, 251, 249);\r
\r
  --sidebar-hover:\r
    rgb(240, 239, 236);\r
\r
\r
  /* =======================================================\r
     RADIUS\r
  ======================================================= */\r
\r
  --radius-sm:\r
    14px;\r
\r
  --radius-md:\r
    17px;\r
\r
  --radius-lg:\r
    20px;\r
}\r
\r
\r
/* =========================================================\r
   BASE\r
========================================================= */\r
\r
.production-message-demo {\r
  min-height:\r
    100vh;\r
}\r
\r
\r
.production-message-demo * {\r
  box-sizing:\r
    border-box;\r
}\r
\r
\r
.production-message-demo button, .production-message-demo input, .production-message-demo textarea, .production-message-demo select {\r
  font:\r
    inherit;\r
}\r
\r
\r
.production-message-demo button {\r
  color:\r
    inherit;\r
}\r
\r
\r
/* =========================================================\r
   APP\r
========================================================= */\r
\r
.production-message-demo .app-shell {\r
  min-height:\r
    100vh;\r
\r
  display:\r
    flex;\r
\r
  background:\r
    var(--bg-page);\r
\r
  color:\r
    var(--text-primary);\r
}\r
\r
\r
/* =========================================================\r
   SIDEBAR\r
========================================================= */\r
\r
.production-message-demo .sidebar {\r
  width:\r
    222px;\r
\r
  min-width:\r
    222px;\r
\r
  min-height:\r
    100vh;\r
\r
  display:\r
    flex;\r
\r
  flex-direction:\r
    column;\r
\r
  background:\r
    var(--sidebar-bg);\r
\r
  border-right:\r
    1px solid\r
    var(--border-subtle);\r
}\r
\r
\r
.production-message-demo .sidebar-top {\r
  height:\r
    72px;\r
\r
  display:\r
    flex;\r
\r
  align-items:\r
    center;\r
}\r
\r
\r
.production-message-demo .sidebar-brand {\r
  padding:\r
    0 20px;\r
\r
  font-size:\r
    16px;\r
\r
  font-weight:\r
    560;\r
\r
  letter-spacing:\r
    -0.2px;\r
}\r
\r
\r
/* =========================================================\r
   SIDEBAR NAV\r
========================================================= */\r
\r
.production-message-demo .sidebar-nav {\r
  padding:\r
    8px;\r
}\r
\r
\r
.production-message-demo .sidebar-item {\r
  position:\r
    relative;\r
\r
  width:\r
    100%;\r
\r
  height:\r
    40px;\r
\r
  padding:\r
    0 10px;\r
\r
  display:\r
    flex;\r
\r
  align-items:\r
    center;\r
\r
  gap:\r
    11px;\r
\r
  border:\r
    none;\r
\r
  border-radius:\r
    7px;\r
\r
  background:\r
    transparent;\r
\r
  color:\r
    #44403c;\r
\r
  font-size:\r
    14px;\r
\r
  font-weight:\r
    440;\r
\r
  text-align:\r
    left;\r
\r
  cursor:\r
    pointer;\r
\r
  transition:\r
    background-color\r
      120ms ease,\r
    color\r
      120ms ease,\r
    transform\r
      100ms ease;\r
}\r
\r
\r
.production-message-demo .sidebar-item:hover {\r
  background:\r
    var(--sidebar-hover);\r
\r
  color:\r
    var(--text-primary);\r
}\r
\r
\r
.production-message-demo .sidebar-item:active {\r
  transform:\r
    scale(0.99);\r
}\r
\r
\r
.production-message-demo .sidebar-item-active {\r
  background:\r
    var(--sidebar-hover);\r
\r
  color:\r
    var(--text-primary);\r
\r
  font-weight:\r
    520;\r
}\r
\r
\r
.production-message-demo .sidebar-bottom {\r
  margin-top:\r
    auto;\r
\r
  padding:\r
    8px;\r
\r
  border-top:\r
    1px solid\r
    var(--border-subtle);\r
}\r
\r
\r
/* =========================================================\r
   NAV ICON\r
========================================================= */\r
\r
.production-message-demo .nav-icon {\r
  width:\r
    18px;\r
\r
  height:\r
    18px;\r
\r
  flex:\r
    none;\r
\r
  overflow:\r
    visible;\r
\r
  fill:\r
    none;\r
\r
  stroke:\r
    currentColor;\r
\r
  stroke-width:\r
    1.55;\r
\r
  stroke-linecap:\r
    round;\r
\r
  stroke-linejoin:\r
    round;\r
\r
  color:\r
    #57534e;\r
\r
  transition:\r
    color\r
      130ms ease,\r
    transform\r
      160ms ease;\r
}\r
\r
\r
.production-message-demo .sidebar-item:hover\r
.nav-icon {\r
  color:\r
    var(--text-primary);\r
}\r
\r
\r
/* =========================================================\r
   NAV ANIMATIONS\r
========================================================= */\r
\r
.production-message-demo .sidebar-item-active\r
.home-roof {\r
  animation:\r
    home-roof-enter\r
    320ms\r
    cubic-bezier(\r
      0.2,\r
      0.8,\r
      0.2,\r
      1\r
    );\r
}\r
\r
\r
.production-message-demo .sidebar-item-active\r
.home-door {\r
  animation:\r
    fade-rise\r
    280ms\r
    ease-out;\r
}\r
\r
\r
@keyframes\r
home-roof-enter {\r
  0% {\r
    transform:\r
      translateY(2px);\r
  }\r
\r
  65% {\r
    transform:\r
      translateY(-1px);\r
  }\r
\r
  100% {\r
    transform:\r
      translateY(0);\r
  }\r
}\r
\r
\r
.production-message-demo .sidebar-item-active\r
.folder-lid {\r
  animation:\r
    folder-open\r
    320ms\r
    ease-out;\r
}\r
\r
\r
@keyframes\r
folder-open {\r
  0% {\r
    transform:\r
      translateY(2px);\r
  }\r
\r
  60% {\r
    transform:\r
      translateY(-1px);\r
  }\r
\r
  100% {\r
    transform:\r
      translateY(0);\r
  }\r
}\r
\r
\r
.production-message-demo .daily-check {\r
  stroke-dasharray:\r
    10;\r
\r
  stroke-dashoffset:\r
    0;\r
}\r
\r
\r
.production-message-demo .sidebar-item-active\r
.daily-check {\r
  animation:\r
    check-draw\r
    360ms\r
    ease-out;\r
}\r
\r
\r
@keyframes\r
check-draw {\r
  from {\r
    stroke-dashoffset:\r
      10;\r
  }\r
\r
  to {\r
    stroke-dashoffset:\r
      0;\r
  }\r
}\r
\r
\r
.production-message-demo .sidebar-item-active\r
.inbox-arrow {\r
  animation:\r
    inbox-drop\r
    360ms\r
    cubic-bezier(\r
      0.2,\r
      0.8,\r
      0.2,\r
      1\r
    );\r
}\r
\r
\r
.production-message-demo .sidebar-item-active\r
.inbox-tray {\r
  animation:\r
    inbox-tray-enter\r
    300ms\r
    ease-out;\r
}\r
\r
\r
@keyframes\r
inbox-drop {\r
  0% {\r
    opacity:\r
      0;\r
\r
    transform:\r
      translateY(-4px);\r
  }\r
\r
  70% {\r
    opacity:\r
      1;\r
\r
    transform:\r
      translateY(1px);\r
  }\r
\r
  100% {\r
    transform:\r
      translateY(0);\r
  }\r
}\r
\r
\r
@keyframes\r
inbox-tray-enter {\r
  from {\r
    transform:\r
      scaleX(0.88);\r
  }\r
\r
  to {\r
    transform:\r
      scaleX(1);\r
  }\r
}\r
\r
\r
.production-message-demo .report-bar {\r
  transform-box:\r
    fill-box;\r
\r
  transform-origin:\r
    center bottom;\r
}\r
\r
\r
.production-message-demo .sidebar-item-active\r
.report-bar-one {\r
  animation:\r
    report-rise\r
    260ms\r
    ease-out;\r
}\r
\r
\r
.production-message-demo .sidebar-item-active\r
.report-bar-two {\r
  animation:\r
    report-rise\r
    330ms\r
    ease-out;\r
}\r
\r
\r
.production-message-demo .sidebar-item-active\r
.report-bar-three {\r
  animation:\r
    report-rise\r
    400ms\r
    ease-out;\r
}\r
\r
\r
@keyframes\r
report-rise {\r
  from {\r
    opacity:\r
      0.35;\r
\r
    transform:\r
      scaleY(0.2);\r
  }\r
\r
  to {\r
    opacity:\r
      1;\r
\r
    transform:\r
      scaleY(1);\r
  }\r
}\r
\r
\r
.production-message-demo .sidebar-item-active\r
.settings-ring {\r
  transform-origin:\r
    center;\r
\r
  animation:\r
    settings-turn\r
    380ms\r
    ease-out;\r
}\r
\r
\r
@keyframes\r
settings-turn {\r
  from {\r
    transform:\r
      rotate(-28deg);\r
  }\r
\r
  to {\r
    transform:\r
      rotate(0);\r
  }\r
}\r
\r
\r
/* =========================================================\r
   MAIN\r
========================================================= */\r
\r
.production-message-demo .main-content {\r
  flex:\r
    1;\r
\r
  width:\r
    0;\r
\r
  min-width:\r
    0;\r
\r
  background:\r
    var(--bg-page);\r
}\r
\r
\r
/* =========================================================\r
   PAGE TITLE\r
========================================================= */\r
\r
.production-message-demo .content-header {\r
  width:\r
    min(\r
      calc(100% - 80px),\r
      var(--page-content-width)\r
    );\r
\r
  margin:\r
    0 auto;\r
\r
  padding:\r
    42px 0 24px;\r
\r
  display:\r
    flex;\r
\r
  align-items:\r
    center;\r
}\r
\r
\r
.production-message-demo .content-header h1 {\r
  margin:\r
    0;\r
\r
  color:\r
    var(--text-primary);\r
\r
  font-size:\r
    26px;\r
\r
  font-weight:\r
    570;\r
\r
  letter-spacing:\r
    -0.55px;\r
}\r
\r
\r
.production-message-demo .content-header p {\r
  margin:\r
    8px 0 0;\r
\r
  color:\r
    var(--text-secondary);\r
\r
  font-size:\r
    13px;\r
\r
  font-weight:\r
    430;\r
}\r
\r
\r
/* =========================================================\r
   STEPPER\r
========================================================= */\r
\r
.production-message-demo .step-bar {\r
  width:\r
    min(\r
      calc(100% - 80px),\r
      var(--step-content-width)\r
    );\r
\r
  height:\r
    62px;\r
\r
  margin:\r
    0 auto 30px;\r
\r
  display:\r
    grid;\r
\r
  grid-template-columns:\r
    max-content\r
    minmax(70px, 1fr)\r
    max-content\r
    minmax(70px, 1fr)\r
    max-content;\r
\r
  column-gap:\r
    18px;\r
\r
  align-items:\r
    center;\r
}\r
\r
\r
.production-message-demo .step {\r
  display:\r
    flex;\r
\r
  align-items:\r
    center;\r
\r
  gap:\r
    10px;\r
\r
  color:\r
    var(--text-secondary);\r
\r
  font-size:\r
    14px;\r
\r
  font-weight:\r
    450;\r
\r
  white-space:\r
    nowrap;\r
}\r
\r
\r
.production-message-demo .step-active {\r
  color:\r
    var(--text-primary);\r
\r
  font-weight:\r
    550;\r
}\r
\r
\r
.production-message-demo .step-done {\r
  color:\r
    #57534e;\r
\r
  font-weight:\r
    500;\r
}\r
\r
\r
/* =========================================================\r
   STEP CIRCLE\r
========================================================= */\r
\r
.production-message-demo .step-circle {\r
  width:\r
    32px;\r
\r
  height:\r
    32px;\r
\r
  flex:\r
    none;\r
\r
  border-radius:\r
    50%;\r
\r
  display:\r
    flex;\r
\r
  align-items:\r
    center;\r
\r
  justify-content:\r
    center;\r
\r
  font-size:\r
    14px;\r
\r
  font-weight:\r
    600;\r
\r
  transition:\r
    background-color\r
      180ms ease,\r
    border-color\r
      180ms ease,\r
    color\r
      180ms ease,\r
    box-shadow\r
      180ms ease,\r
    transform\r
      180ms ease;\r
}\r
\r
\r
/* 未开始 */\r
\r
.production-message-demo .step-circle.pending {\r
  border:\r
    1.5px solid\r
    #d6d3d1;\r
\r
  background:\r
    #ffffff;\r
\r
  color:\r
    #a8a29e;\r
}\r
\r
\r
/* 当前 */\r
\r
.production-message-demo .step-circle.active {\r
  border:\r
    1.5px solid\r
    var(--brand);\r
\r
  background:\r
    var(--brand);\r
\r
  color:\r
    #ffffff;\r
\r
box-shadow:\r
  0 0 0 4px\r
  rgba(\r
    194,\r
    112,\r
    61,\r
    0.12\r
  );\r
\r
  animation:\r
    step-active-enter\r
    260ms\r
    cubic-bezier(\r
      0.2,\r
      0.8,\r
      0.2,\r
      1\r
    );\r
}\r
\r
\r
@keyframes\r
step-active-enter {\r
  0% {\r
    transform:\r
      scale(0.88);\r
  }\r
\r
  70% {\r
    transform:\r
      scale(1.05);\r
  }\r
\r
  100% {\r
    transform:\r
      scale(1);\r
  }\r
}\r
\r
\r
/* 已完成 */\r
\r
.production-message-demo .step-circle.done {\r
  border:\r
    1.5px solid\r
    var(--brand);\r
\r
  background:\r
    var(--brand-soft);\r
\r
  color:\r
    var(--brand);\r
}\r
\r
\r
.production-message-demo .step-circle.done svg {\r
  width:\r
    17px;\r
\r
  height:\r
    17px;\r
\r
  fill:\r
    none;\r
\r
  stroke:\r
    currentColor;\r
\r
  stroke-width:\r
    1.8;\r
\r
  stroke-linecap:\r
    round;\r
\r
  stroke-linejoin:\r
    round;\r
\r
  stroke-dasharray:\r
    20;\r
\r
  animation:\r
    step-check-draw\r
    320ms\r
    ease-out;\r
}\r
\r
\r
@keyframes\r
step-check-draw {\r
  from {\r
    stroke-dashoffset:\r
      20;\r
  }\r
\r
  to {\r
    stroke-dashoffset:\r
      0;\r
  }\r
}\r
\r
\r
/* =========================================================\r
   STEP LINE\r
========================================================= */\r
\r
.production-message-demo .step-line {\r
  height:\r
    1px;\r
\r
  width:\r
    100%;\r
}\r
\r
\r
.production-message-demo .step-line.done {\r
  background:\r
    var(--brand);\r
}\r
\r
\r
.production-message-demo .step-line.pending {\r
  background:\r
    var(--border-subtle);\r
}\r
\r
\r
/*\r
 * 当前到未来。\r
 *\r
 * 左侧带一点品牌色，\r
 * 很快淡到浅灰。\r
 */\r
.production-message-demo .step-line.transition {\r
  background:\r
    linear-gradient(\r
      to right,\r
      var(--brand) 0%,\r
      rgba(\r
        234,\r
        88,\r
        12,\r
        0.34\r
      ) 18%,\r
      var(--border-subtle) 42%,\r
      var(--border-subtle) 100%\r
    );\r
}\r
\r
\r
/* =========================================================\r
   MAIN WORK PANEL\r
========================================================= */\r
\r
.production-message-demo .workspace-panel {\r
  width:\r
    min(\r
      calc(100% - 80px),\r
      var(--page-content-width)\r
    );\r
\r
  min-height:\r
    560px;\r
\r
  margin:\r
    0 auto 48px;\r
\r
  display:\r
    grid;\r
\r
  /*\r
   * 一个统一面板，\r
   * 左右只是两个 View。\r
   */\r
  grid-template-columns:\r
    400px\r
    minmax(0, 1fr);\r
\r
  background:\r
    var(--bg-card);\r
\r
  border:\r
    1px solid\r
    var(--border-subtle);\r
\r
border-radius:\r
  var(--radius-lg);\r
\r
  overflow:\r
    visible;\r
\r
\r
  /*\r
   * 整个静态大面板不加阴影。\r
   */\r
  box-shadow:\r
    none;\r
}\r
\r
\r
/* =========================================================\r
   LEFT\r
========================================================= */\r
\r
.production-message-demo .message-pane {\r
  min-width:\r
    0;\r
\r
  padding:\r
    28px 30px 36px;\r
\r
  /*\r
   * 只有这一条竖线。\r
   *\r
   * 使用非常浅的颜色，\r
   * 把两个 view 分开，\r
   * 而不是做成两个盒子。\r
   */\r
  border-right:\r
    1px solid\r
    var(--border-soft);\r
}\r
\r
\r
.production-message-demo .pane-title h2, .production-message-demo .review-header h2, .production-message-demo .review-empty h2 {\r
  margin:\r
    0;\r
\r
  color:\r
    var(--text-primary);\r
\r
  font-size:\r
    16px;\r
\r
  font-weight:\r
    560;\r
}\r
\r
\r
.production-message-demo .pane-title p {\r
  margin:\r
    8px 0 0;\r
\r
  color:\r
    var(--text-secondary);\r
\r
  font-size:\r
    13px;\r
\r
  line-height:\r
    1.6;\r
}\r
\r
\r
/* =========================================================\r
   MESSAGE\r
========================================================= */\r
\r
.production-message-demo .message-textarea {\r
  width:\r
    100%;\r
\r
  height:\r
    330px;\r
\r
  margin-top:\r
    22px;\r
\r
  padding:\r
    17px 18px;\r
\r
  resize:\r
    none;\r
\r
  outline:\r
    none;\r
\r
  border:\r
    1px solid\r
    var(--input-border);\r
\r
border-radius:\r
  var(--radius-sm);\r
\r
  background:\r
    var(--input-bg);\r
\r
  color:\r
    var(--text-primary);\r
\r
  font-size:\r
    15px;\r
\r
  font-weight:\r
    430;\r
\r
  line-height:\r
    1.8;\r
\r
\r
  /*\r
   * 静态输入区没有阴影。\r
   */\r
  box-shadow:\r
    none;\r
\r
  transition:\r
    border-color\r
      120ms ease,\r
    background-color\r
      120ms ease;\r
}\r
\r
\r
.production-message-demo .message-textarea:hover {\r
  border-color:\r
    var(--input-border-hover);\r
}\r
\r
\r
.production-message-demo .message-textarea:focus {\r
  background:\r
    var(--input-bg);\r
\r
  border-color:\r
    var(--input-border-hover);\r
\r
  box-shadow:\r
    none;\r
}\r
\r
\r
.production-message-demo .message-textarea::placeholder {\r
  color:\r
    #a8a29e;\r
}\r
\r
\r
.production-message-demo .parse-action {\r
  margin-top:\r
    20px;\r
\r
  display:\r
    flex;\r
\r
  justify-content:\r
    flex-end;\r
}\r
\r
\r
/* =========================================================\r
   PRIMARY BUTTON\r
========================================================= */\r
\r
.production-message-demo .primary-button {\r
  min-width:\r
    112px;\r
\r
  height:\r
    40px;\r
\r
  padding:\r
    0 18px;\r
\r
  display:\r
    inline-flex;\r
\r
  align-items:\r
    center;\r
\r
  justify-content:\r
    center;\r
\r
  gap:\r
    8px;\r
\r
  border:\r
    1px solid\r
    var(--brand);\r
\r
border-radius:\r
  var(--radius-sm);\r
\r
  background:\r
    var(--brand);\r
\r
  color:\r
    #ffffff;\r
\r
  font-size:\r
    14px;\r
\r
  font-weight:\r
    550;\r
\r
  cursor:\r
    pointer;\r
\r
  box-shadow:\r
    none;\r
\r
  transition:\r
    background-color\r
      120ms ease,\r
    border-color\r
      120ms ease,\r
    box-shadow\r
      120ms ease,\r
    transform\r
      90ms ease,\r
    opacity\r
      120ms ease;\r
}\r
\r
\r
.production-message-demo .primary-button:hover:not(\r
  :disabled\r
) {\r
  background:\r
    var(--brand-hover);\r
\r
  border-color:\r
    var(--brand-hover);\r
\r
  box-shadow:\r
    0 1px 2px\r
    rgba(\r
      0,\r
      0,\r
      0,\r
      0.08\r
    );\r
}\r
\r
\r
.production-message-demo .primary-button:active:not(\r
  :disabled\r
) {\r
  transform:\r
    translateY(1px);\r
\r
  box-shadow:\r
    none;\r
}\r
\r
\r
.production-message-demo .primary-button:disabled {\r
  opacity:\r
    0.32;\r
\r
  cursor:\r
    not-allowed;\r
}\r
\r
\r
.production-message-demo .button-icon {\r
  width:\r
    16px;\r
\r
  height:\r
    16px;\r
\r
  fill:\r
    none;\r
\r
  stroke:\r
    currentColor;\r
\r
  stroke-width:\r
    1.7;\r
\r
  stroke-linecap:\r
    round;\r
\r
  stroke-linejoin:\r
    round;\r
}\r
\r
\r
.production-message-demo .refresh-icon {\r
  animation:\r
    refresh-enter\r
    360ms\r
    ease-out;\r
}\r
\r
\r
@keyframes\r
refresh-enter {\r
  from {\r
    transform:\r
      rotate(-90deg);\r
  }\r
\r
  to {\r
    transform:\r
      rotate(0);\r
  }\r
}\r
\r
\r
/* =========================================================\r
   RIGHT\r
========================================================= */\r
\r
.production-message-demo .review-pane {\r
  min-width:\r
    0;\r
\r
  padding:\r
    28px 30px 36px;\r
\r
  overflow:\r
    visible;\r
}\r
\r
\r
.production-message-demo .review-empty p {\r
  margin:\r
    12px 0 0;\r
\r
  color:\r
    var(--text-secondary);\r
\r
  font-size:\r
    13px;\r
}\r
\r
\r
/* =========================================================\r
   REVIEW HEADER\r
========================================================= */\r
\r
.production-message-demo .review-header {\r
  min-height:\r
    46px;\r
\r
  display:\r
    flex;\r
\r
  align-items:\r
    flex-start;\r
\r
  justify-content:\r
    space-between;\r
\r
  gap:\r
    22px;\r
\r
  animation:\r
    content-enter\r
    220ms\r
    ease-out\r
    both;\r
}\r
\r
\r
.production-message-demo .review-summary {\r
  display:\r
    flex;\r
\r
  align-items:\r
    center;\r
\r
  gap:\r
    7px;\r
\r
  color:\r
    var(--text-secondary);\r
\r
  font-size:\r
    12px;\r
\r
  font-weight:\r
    430;\r
\r
  white-space:\r
    nowrap;\r
}\r
\r
\r
.production-message-demo .review-summary span {\r
  display:\r
    inline-flex;\r
\r
  align-items:\r
    baseline;\r
\r
  gap:\r
    4px;\r
}\r
\r
\r
.production-message-demo .review-summary strong {\r
  color:\r
    var(--text-primary);\r
\r
  font-weight:\r
    600;\r
\r
  font-variant-numeric:\r
    tabular-nums;\r
}\r
\r
\r
.production-message-demo .review-summary i {\r
  color:\r
    #d6d3d1;\r
\r
  font-style:\r
    normal;\r
}\r
\r
\r
/* =========================================================\r
   IDENTITY\r
========================================================= */\r
\r
.production-message-demo .identity-section {\r
  display:\r
    grid;\r
\r
  grid-template-columns:\r
    210px\r
    250px;\r
\r
  gap:\r
    24px;\r
\r
  padding:\r
    18px 0 20px;\r
\r
  animation:\r
    content-enter\r
    240ms\r
    30ms\r
    ease-out\r
    both;\r
}\r
\r
\r
.production-message-demo .identity-field label {\r
  display:\r
    block;\r
\r
  margin-bottom:\r
    8px;\r
\r
  color:\r
    var(--text-secondary);\r
\r
  font-size:\r
    13px;\r
\r
  font-weight:\r
    440;\r
}\r
\r
\r
/* =========================================================\r
   INPUTS\r
========================================================= */\r
\r
.production-message-demo .field-input {\r
  width:\r
    100%;\r
\r
  height:\r
    44px;\r
\r
  padding:\r
    0 14px;\r
\r
  outline:\r
    none;\r
\r
  border:\r
    1px solid\r
    var(--input-border);\r
\r
border-radius:\r
  var(--radius-sm);\r
\r
  background:\r
    var(--input-bg);\r
\r
  color:\r
    var(--text-primary);\r
\r
  font-size:\r
    14px;\r
\r
  font-weight:\r
    440;\r
\r
\r
  /*\r
   * 不使用阴影。\r
   */\r
  box-shadow:\r
    none;\r
\r
  transition:\r
    border-color\r
      120ms ease,\r
    background-color\r
      120ms ease;\r
\r
font-variant-numeric:\r
	tabular-nums;\r
}\r
\r
\r
.production-message-demo .field-input:hover {\r
  border-color:\r
    var(--input-border-hover);\r
}\r
\r
\r
.production-message-demo .field-input:focus {\r
  background:\r
    var(--input-bg);\r
\r
  border-color:\r
    var(--input-border-hover);\r
\r
  box-shadow:\r
    none;\r
}\r
\r
\r
/* =========================================================\r
   MATCH\r
========================================================= */\r
\r
.production-message-demo .match-status {\r
  min-height:\r
    42px;\r
\r
  padding-bottom:\r
    18px;\r
\r
  display:\r
    flex;\r
\r
  align-items:\r
    center;\r
\r
  gap:\r
    8px;\r
\r
  color:\r
    var(--text-secondary);\r
\r
  font-size:\r
    13px;\r
\r
  border-bottom:\r
    1px solid\r
    var(--border-soft);\r
\r
  animation:\r
    content-enter\r
    250ms\r
    50ms\r
    ease-out\r
    both;\r
}\r
\r
\r
.production-message-demo .match-check {\r
  width:\r
    18px;\r
\r
  height:\r
    18px;\r
\r
  flex:\r
    none;\r
\r
  display:\r
    flex;\r
\r
  align-items:\r
    center;\r
\r
  justify-content:\r
    center;\r
\r
  color:\r
    var(--status-ok-text);\r
}\r
\r
\r
.production-message-demo .match-check svg {\r
  width:\r
    16px;\r
\r
  height:\r
    16px;\r
\r
  fill:\r
    none;\r
\r
  stroke:\r
    currentColor;\r
\r
  stroke-width:\r
    1.8;\r
\r
  stroke-linecap:\r
    round;\r
\r
  stroke-linejoin:\r
    round;\r
}\r
\r
\r
.production-message-demo .new-record-icon {\r
  width:\r
    18px;\r
\r
  height:\r
    18px;\r
\r
  flex:\r
    none;\r
\r
  display:\r
    flex;\r
\r
  align-items:\r
    center;\r
\r
  justify-content:\r
    center;\r
\r
  color:\r
    var(--status-info-text);\r
\r
  font-size:\r
    16px;\r
}\r
\r
\r
.production-message-demo .status-loader {\r
  width:\r
    17px;\r
\r
  height:\r
    17px;\r
\r
  flex:\r
    none;\r
\r
  border:\r
    2px solid\r
    var(--border-subtle);\r
\r
  border-top-color:\r
    #78716c;\r
\r
  border-radius:\r
    50%;\r
\r
  animation:\r
    spinner\r
    650ms\r
    linear\r
    infinite;\r
}\r
\r
\r
@keyframes\r
spinner {\r
  to {\r
    transform:\r
      rotate(360deg);\r
  }\r
}\r
\r
\r
/* =========================================================\r
   DATA TITLE\r
========================================================= */\r
\r
.production-message-demo .data-title {\r
  padding:\r
    21px 0 13px;\r
\r
  color:\r
    var(--text-primary);\r
\r
  font-size:\r
    14px;\r
\r
  font-weight:\r
    560;\r
\r
  /*\r
   * 很浅。\r
   */\r
  border-bottom:\r
    1px solid\r
    var(--border-soft);\r
\r
  animation:\r
    content-enter\r
    260ms\r
    70ms\r
    ease-out\r
    both;\r
}\r
\r
\r
/* =========================================================\r
   FIELD TABLE\r
========================================================= */\r
\r
.production-message-demo .field-table {\r
  width:\r
    100%;\r
\r
  min-width:\r
    540px;\r
\r
  animation:\r
    content-enter\r
    280ms\r
    90ms\r
    ease-out\r
    both;\r
}\r
\r
\r
.production-message-demo .field-table-header, .production-message-demo .field-row {\r
  display:\r
    grid;\r
\r
  /*\r
   * 字段列不再按字符做奇怪的两端对齐。\r
   *\r
   * 直接给足够宽度，\r
   * 所有内容左对齐。\r
   */\r
  grid-template-columns:\r
    96px\r
    176px\r
    130px\r
    94px;\r
\r
  column-gap:\r
    24px;\r
\r
  align-items:\r
    center;\r
}\r
\r
\r
.production-message-demo .field-table-header {\r
  min-height:\r
    42px;\r
\r
  color:\r
    var(--text-secondary);\r
\r
  font-size:\r
    12px;\r
\r
  font-weight:\r
    520;\r
\r
  border-bottom:\r
    1px solid\r
    var(--border-soft);\r
}\r
\r
\r
.production-message-demo .field-row {\r
  min-height:\r
    62px;\r
\r
  border-bottom:\r
    1px solid\r
    var(--border-soft);\r
\r
  transition:\r
    background-color\r
      120ms ease;\r
}\r
\r
\r
.production-message-demo .field-row:hover {\r
  background:\r
    #fafaf9;\r
}\r
\r
\r
.production-message-demo .field-row-conflict {\r
  border-bottom:\r
    none;\r
}\r
\r
\r
/* =========================================================\r
   FIELD NAME\r
========================================================= */\r
\r
.production-message-demo .field-name {\r
  width:\r
    96px;\r
\r
  color:\r
    #44403c;\r
\r
  font-size:\r
    14px;\r
\r
  font-weight:\r
    440;\r
\r
  white-space:\r
    nowrap;\r
\r
  text-align:\r
    left;\r
}\r
\r
\r
/* =========================================================\r
   FIELD EDITOR\r
========================================================= */\r
\r
.production-message-demo .field-editor {\r
  width:\r
    140px;\r
}\r
\r
\r
.production-message-demo .compact-input {\r
  width:\r
    140px;\r
}\r
\r
\r
.production-message-demo .input-unit-wrap {\r
  position:\r
    relative;\r
\r
  width:\r
    140px;\r
}\r
\r
\r
.production-message-demo .input-unit-wrap\r
.field-input {\r
  padding-right:\r
    42px;\r
}\r
\r
\r
.production-message-demo .input-unit-wrap\r
span {\r
  position:\r
    absolute;\r
\r
  right:\r
    12px;\r
\r
  top:\r
    50%;\r
\r
  transform:\r
    translateY(-50%);\r
\r
  color:\r
    var(--text-secondary);\r
\r
  font-size:\r
    12px;\r
\r
  pointer-events:\r
    none;\r
}\r
\r
\r
/* =========================================================\r
   DATABASE VALUE\r
========================================================= */\r
\r
.production-message-demo .database-value {\r
  width:\r
    130px;\r
\r
  color:\r
    #57534e;\r
\r
  font-size:\r
    14px;\r
\r
  font-weight:\r
    440;\r
\r
  font-variant-numeric:\r
    tabular-nums;\r
\r
  white-space:\r
    nowrap;\r
}\r
\r
\r
/* =========================================================\r
   PILLS\r
========================================================= */\r
\r
.production-message-demo .pill {\r
  display: inline-flex;\r
  align-items: center;\r
  justify-content: center;\r
  min-height: 24px;\r
  padding:\r
    2px 10px;\r
\r
  border:\r
    none;\r
\r
  border-radius:\r
    999px;\r
\r
  font-size:\r
    12px;\r
\r
  font-weight:\r
    500;\r
\r
  line-height:\r
    1.5;\r
\r
  white-space:\r
    nowrap;\r
}\r
\r
\r
.production-message-demo .pill-ok {\r
  color:\r
    var(--status-ok-text);\r
\r
  background:\r
    var(--status-ok-bg);\r
}\r
\r
\r
.production-message-demo .pill-info {\r
  color:\r
    var(--status-info-text);\r
\r
  background:\r
    var(--status-info-bg);\r
}\r
\r
\r
.production-message-demo .pill-warn {\r
  color:\r
    var(--status-warn-text);\r
\r
  background:\r
    var(--status-warn-bg);\r
}\r
\r
\r
/* =========================================================\r
   CONFLICT PANEL\r
========================================================= */\r
\r
.production-message-demo .conflict-panel {\r
  width:\r
    100%;\r
\r
  min-height:\r
    78px;\r
\r
  margin:\r
    4px 0 10px;\r
\r
  padding:\r
    15px 18px;\r
\r
  display:\r
    flex;\r
\r
  align-items:\r
    center;\r
\r
  justify-content:\r
    space-between;\r
\r
  gap:\r
    20px;\r
\r
  border:\r
    1px solid\r
    #fecaca;\r
\r
  border-radius:\r
    8px;\r
\r
  background:\r
    var(--status-warn-bg);\r
\r
\r
  /*\r
   * 这是少数真正浮起来的东西。\r
   */\r
  box-shadow:\r
    0 1px 3px\r
    rgba(\r
      0,\r
      0,\r
      0,\r
      0.06\r
    ),\r
    0 1px 2px\r
    rgba(\r
      0,\r
      0,\r
      0,\r
      0.04\r
    );\r
\r
  animation:\r
    conflict-enter\r
    200ms\r
    ease-out\r
    both;\r
}\r
\r
\r
.production-message-demo .conflict-message {\r
  min-width:\r
    155px;\r
\r
  display:\r
    flex;\r
\r
  flex-direction:\r
    column;\r
\r
  gap:\r
    4px;\r
\r
  color:\r
    #7f1d1d;\r
\r
  font-size:\r
    12px;\r
}\r
\r
\r
.production-message-demo .conflict-message strong {\r
  color:\r
    var(--status-warn-text);\r
\r
  font-size:\r
    13px;\r
\r
  font-weight:\r
    600;\r
}\r
\r
\r
.production-message-demo .conflict-options {\r
  display:\r
    flex;\r
\r
  align-items:\r
    center;\r
\r
  gap:\r
    18px;\r
}\r
\r
\r
.production-message-demo .conflict-options label {\r
  display:\r
    flex;\r
\r
  align-items:\r
    center;\r
\r
  gap:\r
    6px;\r
\r
  color:\r
    #57534e;\r
\r
  font-size:\r
    12px;\r
\r
  white-space:\r
    nowrap;\r
\r
  cursor:\r
    pointer;\r
}\r
\r
\r
.production-message-demo .conflict-options strong {\r
  color:\r
    var(--text-primary);\r
\r
  font-weight:\r
    550;\r
}\r
\r
\r
.production-message-demo .conflict-options input {\r
  width:\r
    15px;\r
\r
  height:\r
    15px;\r
\r
  accent-color:\r
    var(--status-warn-text);\r
}\r
\r
\r
/* =========================================================\r
   REVIEW FOOTER\r
========================================================= */\r
\r
.production-message-demo .review-footer {\r
  min-height:\r
    82px;\r
\r
  display:\r
    flex;\r
\r
  align-items:\r
    center;\r
\r
  justify-content:\r
    space-between;\r
\r
  gap:\r
    20px;\r
}\r
\r
\r
.production-message-demo .review-footer-text {\r
  color:\r
    var(--text-secondary);\r
\r
  font-size:\r
    13px;\r
}\r
\r
\r
.production-message-demo .confirm-button {\r
  min-width:\r
    118px;\r
}\r
\r
\r
/* =========================================================\r
   COMPLETE\r
========================================================= */\r
\r
.production-message-demo .complete-view {\r
  width:\r
    min(\r
      calc(100% - 80px),\r
      var(--page-content-width)\r
    );\r
\r
  min-height:\r
    520px;\r
\r
  margin:\r
    0 auto;\r
\r
  display:\r
    flex;\r
\r
  flex-direction:\r
    column;\r
\r
  align-items:\r
    center;\r
\r
  justify-content:\r
    center;\r
\r
  background:\r
    var(--bg-card);\r
\r
  border:\r
    1px solid\r
    var(--border-subtle);\r
\r
border-radius:\r
  var(--radius-lg);\r
}\r
\r
\r
.production-message-demo .complete-icon {\r
  width:\r
    46px;\r
\r
  height:\r
    46px;\r
\r
  display:\r
    flex;\r
\r
  align-items:\r
    center;\r
\r
  justify-content:\r
    center;\r
\r
  border:\r
    1.5px solid\r
    var(--brand);\r
\r
  border-radius:\r
    50%;\r
\r
  background:\r
    var(--brand-soft);\r
\r
  color:\r
    var(--brand);\r
}\r
\r
\r
.production-message-demo .complete-icon svg {\r
  width:\r
    23px;\r
\r
  height:\r
    23px;\r
\r
  fill:\r
    none;\r
\r
  stroke:\r
    currentColor;\r
\r
  stroke-width:\r
    1.8;\r
\r
  stroke-linecap:\r
    round;\r
\r
  stroke-linejoin:\r
    round;\r
}\r
\r
\r
.production-message-demo .complete-view h2 {\r
  margin:\r
    20px 0 0;\r
\r
  color:\r
    var(--text-primary);\r
\r
  font-size:\r
    20px;\r
\r
  font-weight:\r
    570;\r
}\r
\r
\r
.production-message-demo .complete-view p {\r
  margin:\r
    12px 0 30px;\r
\r
  color:\r
    var(--text-secondary);\r
\r
  font-size:\r
    14px;\r
}\r
\r
\r
/* =========================================================\r
   ANIMATIONS\r
========================================================= */\r
\r
@keyframes\r
content-enter {\r
  from {\r
    opacity:\r
      0;\r
\r
    transform:\r
      translateY(4px);\r
  }\r
\r
  to {\r
    opacity:\r
      1;\r
\r
    transform:\r
      translateY(0);\r
  }\r
}\r
\r
\r
@keyframes\r
conflict-enter {\r
  from {\r
    opacity:\r
      0;\r
\r
    transform:\r
      translateY(-3px);\r
  }\r
\r
  to {\r
    opacity:\r
      1;\r
\r
    transform:\r
      translateY(0);\r
  }\r
}\r
\r
\r
@keyframes\r
fade-rise {\r
  from {\r
    opacity:\r
      0;\r
\r
    transform:\r
      translateY(2px);\r
  }\r
\r
  to {\r
    opacity:\r
      1;\r
\r
    transform:\r
      translateY(0);\r
  }\r
}\r
\r
\r
/* =========================================================\r
   NUMBER INPUT\r
========================================================= */\r
\r
.production-message-demo input[type="number"] {\r
  appearance:\r
    textfield;\r
\r
  -moz-appearance:\r
    textfield;\r
}\r
\r
\r
.production-message-demo input[type="number"]::-webkit-outer-spin-button, .production-message-demo input[type="number"]::-webkit-inner-spin-button {\r
  -webkit-appearance: none;\r
	margin: 0;\r
}\r
\r
\r
/* =========================================================\r
   RESPONSIVE\r
========================================================= */\r
\r
@media (\r
  max-width: 1320px\r
) {\r
  .production-message-demo, body:has(.production-message-demo) {\r
    --page-content-width:\r
      960px;\r
  }\r
\r
\r
  .production-message-demo .sidebar {\r
    width:\r
      198px;\r
\r
    min-width:\r
      198px;\r
  }\r
\r
\r
  .production-message-demo .workspace-panel {\r
    grid-template-columns:\r
      360px\r
      minmax(\r
        0,\r
        1fr\r
      );\r
  }\r
\r
\r
  .production-message-demo .message-pane {\r
    padding:\r
      26px 26px 34px;\r
  }\r
\r
\r
  .production-message-demo .review-pane {\r
    padding:\r
      26px 26px 34px;\r
  }\r
\r
\r
  .production-message-demo .identity-section {\r
    grid-template-columns:\r
      195px\r
      230px;\r
\r
    gap:\r
      20px;\r
  }\r
\r
\r
  .production-message-demo .field-table-header, .production-message-demo .field-row {\r
    grid-template-columns:\r
      88px\r
      160px\r
      118px\r
      88px;\r
\r
    column-gap:\r
      20px;\r
  }\r
\r
 .production-message-demo .field-table-header > div:last-child {\r
	text-align: center;\r
}\r
\r
  .production-message-demo .field-name {\r
    width:\r
      88px;\r
  }\r
\r
\r
  .production-message-demo .field-editor, .production-message-demo .compact-input, .production-message-demo .input-unit-wrap {\r
    width:\r
      160px;\r
  }\r
\r
\r
  .production-message-demo .database-value {\r
    width:\r
      118px;\r
  }\r
\r
\r
  .production-message-demo .conflict-panel {\r
    flex-direction:\r
      column;\r
\r
    align-items:\r
      flex-start;\r
  }\r
}\r
\r
.production-message-demo .field-status {\r
	display: flex;\r
	justify-content: center;\r
}\r
\r
/* =========================================================\r
   SMALL WINDOW\r
========================================================= */\r
\r
@media (\r
  max-width: 1080px\r
) {\r
  .production-message-demo .content-header, .production-message-demo .workspace-panel, .production-message-demo .complete-view {\r
    width:\r
      calc(\r
        100% - 40px\r
      );\r
  }\r
\r
\r
  .production-message-demo .step-bar {\r
    width:\r
      min(\r
        calc(\r
          100% - 40px\r
        ),\r
        660px\r
      );\r
  }\r
\r
\r
  .production-message-demo .workspace-panel {\r
    grid-template-columns:\r
      330px\r
      minmax(\r
        520px,\r
        1fr\r
      );\r
  }\r
\r
\r
  .production-message-demo .main-content {\r
    overflow-x:\r
      auto;\r
  }\r
}\r
\r
\r
/* =========================================================\r
   REDUCED MOTION\r
========================================================= */\r
\r
@media (\r
  prefers-reduced-motion:\r
    reduce\r
) {\r
  .production-message-demo *, .production-message-demo *::before, .production-message-demo *::after {\r
    animation-duration:\r
      0.01ms !important;\r
\r
    animation-iteration-count:\r
      1 !important;\r
\r
    transition-duration:\r
      0.01ms !important;\r
  }\r
}\r
\r
\r
/* =========================================================\r
   DATE PICKER\r
========================================================= */\r
\r
body:has(.production-message-demo) .date-picker {\r
  position:\r
    relative;\r
\r
  width:\r
    100%;\r
}\r
\r
body:has(.production-message-demo) .date-picker-label {\r
  display:\r
    block;\r
\r
  margin-bottom:\r
    8px;\r
\r
  color:\r
    var(--text-secondary);\r
\r
  font-size:\r
    13px;\r
\r
  font-weight:\r
    440;\r
}\r
\r
\r
/* =========================================================\r
   TRIGGER\r
========================================================= */\r
\r
body:has(.production-message-demo) .date-picker-trigger {\r
  width:\r
    100%;\r
\r
  height:\r
    44px;\r
\r
  padding:\r
    0 14px;\r
\r
  display:\r
    flex;\r
\r
  align-items:\r
    center;\r
\r
  justify-content:\r
    space-between;\r
\r
  gap:\r
    12px;\r
\r
  border:\r
    1px solid\r
    var(--input-border);\r
\r
border-radius:\r
  var(--radius-sm);\r
\r
  background:\r
    var(--input-bg);\r
\r
  color:\r
    var(--text-primary);\r
\r
  font-size:\r
    14px;\r
\r
  font-weight:\r
    440;\r
\r
  text-align:\r
    left;\r
\r
  cursor:\r
    pointer;\r
\r
  outline:\r
    none;\r
\r
  box-shadow:\r
    none;\r
\r
  transition:\r
    border-color\r
      120ms ease,\r
    background-color\r
      120ms ease,\r
    box-shadow\r
      120ms ease;\r
}\r
\r
body:has(.production-message-demo) .date-picker-trigger:hover {\r
  border-color:\r
    var(--input-border-hover);\r
}\r
\r
body:has(.production-message-demo) .date-picker-trigger-open {\r
  border-color:\r
    var(--input-border-hover);\r
\r
  background:\r
    var(--input-bg);\r
\r
  box-shadow:none;\r
   /* 0 0 0 3px\r
    rgba(\r
      194,\r
      112,\r
      61,\r
      0.08\r
    );*/\r
}\r
\r
body:has(.production-message-demo) .date-picker-placeholder {\r
  color:\r
    #a8a29e;\r
}\r
\r
body:has(.production-message-demo) .date-picker-calendar-icon {\r
  flex:\r
    none;\r
\r
  color:\r
    var(--text-secondary);\r
}\r
\r
\r
/* =========================================================\r
   PORTAL POPOVER\r
========================================================= */\r
\r
body:has(.production-message-demo) .date-picker-popover {\r
  position:\r
    fixed;\r
\r
  z-index:\r
    9999;\r
\r
  width:\r
    312px;\r
\r
  padding:\r
    18px;\r
\r
  border:\r
    1px solid\r
    var(--border-subtle);\r
\r
border-radius:\r
  var(--radius-lg);\r
\r
  background:\r
    #ffffff;\r
\r
  opacity:\r
    1;\r
\r
  transform:\r
    scale(1);\r
\r
  color:\r
    var(--text-primary);\r
\r
  box-shadow:\r
    0 8px 20px\r
      rgba(\r
        41,\r
        37,\r
        36,\r
        0.08\r
      ),\r
    0 2px 6px\r
      rgba(\r
        41,\r
        37,\r
        36,\r
        0.05\r
      );\r
\r
\r
\r
}\r
/* Chrome 139+ 增强圆角 */\r
@supports (corner-shape: squircle) {\r
  body:has(.production-message-demo) .date-picker-popover {\r
    corner-shape: squircle;\r
  }\r
}\r
/* 向下展开 */\r
body:has(.production-message-demo) .date-picker-popover-bottom {\r
\r
  transform-origin:\r
    top left;\r
\r
  animation:\r
    date-picker-enter-bottom\r
    140ms\r
    ease-out\r
    both;\r
\r
}\r
\r
\r
/* 向上展开 */\r
body:has(.production-message-demo) .date-picker-popover-top {\r
\r
  transform-origin:\r
    bottom left;\r
\r
  animation:\r
    date-picker-enter-top\r
    140ms\r
    ease-out\r
    both;\r
\r
}\r
\r
\r
\r
/* 从上方出现 */\r
\r
@keyframes date-picker-enter-bottom {\r
\r
  from {\r
\r
    opacity:\r
      0;\r
\r
    transform:\r
      translateY(-2px)\r
      scale(0.99);\r
\r
  }\r
\r
\r
  to {\r
\r
    opacity:\r
      1;\r
\r
    transform:\r
      translateY(0)\r
      scale(1);\r
\r
  }\r
\r
}\r
\r
\r
\r
/* 从下方出现 */\r
\r
@keyframes date-picker-enter-top {\r
\r
  from {\r
\r
    opacity:\r
      0;\r
\r
    transform:\r
      translateY(2px)\r
      scale(0.99);\r
\r
  }\r
\r
\r
  to {\r
\r
    opacity:\r
      1;\r
\r
    transform:\r
      translateY(0)\r
      scale(1);\r
\r
  }\r
\r
}\r
\r
/* =========================================================\r
   HEADER\r
========================================================= */\r
\r
body:has(.production-message-demo) .date-picker-header {\r
  height:\r
    36px;\r
\r
  display:\r
    flex;\r
\r
  align-items:\r
    center;\r
\r
  justify-content:\r
    space-between;\r
\r
  margin-bottom:\r
    14px;\r
}\r
\r
body:has(.production-message-demo) .date-picker-title-button {\r
  padding:\r
    0 10px;\r
\r
  height:\r
    32px;\r
\r
  border:\r
    none;\r
\r
  border-radius:\r
    8px;\r
\r
  background:\r
    transparent;\r
\r
  color:\r
    var(--text-primary);\r
\r
  font-size:\r
    15px;\r
\r
  font-weight:\r
    600;\r
\r
  font-variant-numeric:\r
    tabular-nums;\r
\r
  cursor:\r
    pointer;\r
\r
  transition:\r
    background-color\r
      110ms ease,\r
    color\r
      110ms ease;\r
}\r
\r
body:has(.production-message-demo) .date-picker-title-button:hover {\r
  background:\r
    #f5f5f4;\r
}\r
\r
body:has(.production-message-demo) .date-picker-nav-button {\r
  width:\r
    30px;\r
\r
  height:\r
    30px;\r
\r
  padding:\r
    0;\r
\r
  display:\r
    flex;\r
\r
  align-items:\r
    center;\r
\r
  justify-content:\r
    center;\r
\r
  border:\r
    none;\r
\r
  border-radius:\r
    7px;\r
\r
  background:\r
    transparent;\r
\r
  color:\r
    var(--text-secondary);\r
\r
  cursor:\r
    pointer;\r
\r
  transition:\r
    background-color\r
      110ms ease,\r
    color\r
      110ms ease,\r
    transform\r
      90ms ease;\r
}\r
\r
body:has(.production-message-demo) .date-picker-nav-button:hover {\r
  background:\r
    #f5f5f4;\r
\r
  color:\r
    var(--text-primary);\r
}\r
\r
body:has(.production-message-demo) .date-picker-nav-button:active {\r
  transform:\r
    scale(0.94);\r
}\r
\r
\r
/* =========================================================\r
   WEEKDAYS\r
========================================================= */\r
\r
body:has(.production-message-demo) .date-picker-weekdays {\r
  display:\r
    grid;\r
\r
  grid-template-columns:\r
    repeat(\r
      7,\r
      1fr\r
    );\r
\r
  margin-bottom:\r
    8px;\r
}\r
\r
body:has(.production-message-demo) .date-picker-weekdays div {\r
  height:\r
    30px;\r
\r
  display:\r
    flex;\r
\r
  align-items:\r
    center;\r
\r
  justify-content:\r
    center;\r
\r
  color:\r
    var(--text-secondary);\r
\r
  font-size:\r
    12px;\r
\r
  font-weight:\r
    500;\r
}\r
\r
\r
/* =========================================================\r
   DAY GRID\r
========================================================= */\r
\r
body:has(.production-message-demo) .date-picker-grid {\r
  display:\r
    grid;\r
\r
  grid-template-columns:\r
    repeat(\r
      7,\r
      1fr\r
    );\r
\r
  gap:\r
    4px;\r
}\r
\r
body:has(.production-message-demo) .date-picker-day {\r
  width:\r
    36px;\r
\r
  height:\r
    36px;\r
\r
  padding:\r
    0;\r
\r
  justify-self:\r
    center;\r
\r
  display:\r
    flex;\r
\r
  align-items:\r
    center;\r
\r
  justify-content:\r
    center;\r
\r
  border:\r
    1px solid\r
    transparent;\r
\r
  border-radius:\r
    10px;\r
\r
  background:\r
    transparent;\r
\r
  color:\r
    var(--text-primary);\r
\r
  font-size:\r
    13px;\r
\r
  font-weight:\r
    430;\r
\r
  font-variant-numeric:\r
    tabular-nums;\r
\r
  cursor:\r
    pointer;\r
\r
  transition:\r
    background-color\r
      100ms ease,\r
    border-color\r
      100ms ease,\r
    color\r
      100ms ease,\r
    transform\r
      80ms ease;\r
}\r
\r
body:has(.production-message-demo) .date-picker-day:hover {\r
  background:\r
    var(--brand-soft);\r
}\r
\r
body:has(.production-message-demo) .date-picker-day:active {\r
  transform:\r
    scale(0.93);\r
}\r
\r
body:has(.production-message-demo) .date-picker-day-today {\r
  border-color:\r
    var(--brand);\r
\r
  color:\r
    var(--brand);\r
\r
  font-weight:\r
    550;\r
}\r
\r
body:has(.production-message-demo) .date-picker-day-selected {\r
  border-color:\r
    var(--brand);\r
\r
  background:\r
    var(--brand);\r
\r
  color:\r
    #ffffff;\r
\r
  font-weight:\r
    600;\r
}\r
\r
body:has(.production-message-demo) .date-picker-day-selected:hover {\r
  background:\r
    var(--brand-hover);\r
\r
  border-color:\r
    var(--brand-hover);\r
}\r
\r
\r
/* =========================================================\r
   MONTH / YEAR GRID\r
========================================================= */\r
\r
body:has(.production-message-demo) .date-picker-month-grid, body:has(.production-message-demo) .date-picker-year-grid {\r
  display:\r
    grid;\r
\r
  grid-template-columns:\r
    repeat(\r
      3,\r
      1fr\r
    );\r
\r
  gap:\r
    8px;\r
\r
  padding:\r
    4px 0 6px;\r
}\r
\r
body:has(.production-message-demo) .date-picker-month-item, body:has(.production-message-demo) .date-picker-year-item {\r
  height:\r
    40px;\r
\r
  padding:\r
    0 10px;\r
\r
  display:\r
    flex;\r
\r
  align-items:\r
    center;\r
\r
  justify-content:\r
    center;\r
\r
  border:\r
    1px solid\r
    transparent;\r
\r
  border-radius:\r
    10px;\r
\r
  background:\r
    transparent;\r
\r
  color:\r
    var(--text-primary);\r
\r
  font-size:\r
    13px;\r
\r
  font-weight:\r
    500;\r
\r
  cursor:\r
    pointer;\r
\r
  transition:\r
    background-color\r
      100ms ease,\r
    border-color\r
      100ms ease,\r
    color\r
      100ms ease,\r
    transform\r
      80ms ease;\r
}\r
\r
body:has(.production-message-demo) .date-picker-month-item:hover, body:has(.production-message-demo) .date-picker-year-item:hover {\r
  background:\r
    var(--brand-soft);\r
}\r
\r
body:has(.production-message-demo) .date-picker-month-item:active, body:has(.production-message-demo) .date-picker-year-item:active {\r
  transform:\r
    scale(0.97);\r
}\r
\r
body:has(.production-message-demo) .date-picker-month-item-current, body:has(.production-message-demo) .date-picker-year-item-current {\r
  border-color:\r
    var(--brand);\r
\r
  color:\r
    var(--brand);\r
}\r
\r
body:has(.production-message-demo) .date-picker-month-item-selected, body:has(.production-message-demo) .date-picker-year-item-selected {\r
  border-color:\r
    var(--brand);\r
\r
  background:\r
    var(--brand);\r
\r
  color:\r
    #ffffff;\r
\r
  font-weight:\r
    600;\r
}\r
\r
body:has(.production-message-demo) .date-picker-month-item-selected:hover, body:has(.production-message-demo) .date-picker-year-item-selected:hover {\r
  background:\r
    var(--brand-hover);\r
\r
  border-color:\r
    var(--brand-hover);\r
}\r
\r
\r
/* =========================================================\r
   FOOTER\r
========================================================= */\r
\r
body:has(.production-message-demo) .date-picker-footer {\r
  margin-top:\r
    14px;\r
\r
  padding-top:\r
    12px;\r
\r
  border-top:\r
    1px solid\r
    var(--border-soft);\r
}\r
\r
body:has(.production-message-demo) .date-picker-today-button {\r
  height:\r
    30px;\r
\r
  padding:\r
    0 6px;\r
\r
  border:\r
    none;\r
\r
  border-radius:\r
    6px;\r
\r
  background:\r
    transparent;\r
\r
  color:\r
    var(--brand);\r
\r
  font-size:\r
    13px;\r
\r
  font-weight:\r
    550;\r
\r
  cursor:\r
    pointer;\r
\r
  transition:\r
    background-color\r
      100ms ease,\r
    color\r
      100ms ease;\r
}\r
\r
body:has(.production-message-demo) .date-picker-today-button:hover {\r
  background:\r
    var(--brand-soft);\r
\r
  color:\r
    var(--brand-hover);\r
}\r
\r
/* =========================================================\r
   SQUIRCLE CORNER ENHANCEMENT\r
   Chrome 139+\r
========================================================= */\r
\r
@supports (corner-shape: squircle) {\r
\r
  .production-message-demo button, .production-message-demo input, .production-message-demo textarea, .production-message-demo select, .production-message-demo .workspace-panel, .production-message-demo .complete-view, body:has(.production-message-demo) .date-picker-popover, body:has(.production-message-demo) .date-picker-trigger, .production-message-demo .field-input, .production-message-demo .message-textarea, .production-message-demo .primary-button, .production-message-demo .conflict-panel, .production-message-demo .sidebar-item, body:has(.production-message-demo) .date-picker-day, body:has(.production-message-demo) .date-picker-month-item, body:has(.production-message-demo) .date-picker-year-item, body:has(.production-message-demo) .date-picker-title-button, body:has(.production-message-demo) .date-picker-nav-button, body:has(.production-message-demo) .date-picker-today-button, .production-message-demo .pill {\r
    corner-shape: squircle;\r
  }\r
\r
}\r
`,Wb=`/* Shared controls: normal typography, neutral focus and unobtrusive scrollbars. */\r
* { scrollbar-width: thin; scrollbar-color: #d1d0cd transparent; }\r
*::-webkit-scrollbar { width: 6px; height: 6px; }\r
*::-webkit-scrollbar-thumb { background: #d1d0cd; border-radius: 6px; }\r
*::-webkit-scrollbar-track { background: transparent; margin-block: 10px; }\r
*::-webkit-scrollbar-button { display: none; width: 0; height: 0; }\r
*::-webkit-scrollbar-corner { background: transparent; }\r
button, input, select, textarea, button span, .picker-trigger > span, .choice-popover button.selected, .time-column button.selected { font-weight: 400 !important; }\r
button:focus-visible, input:focus-visible, select:focus-visible, textarea:focus-visible, [tabindex]:focus-visible { outline: 1px solid var(--text-muted); outline-offset: 2px; box-shadow: none; }\r
.daily-focus-card label, .progressive-field-picker label, .preview-action-group label { font-weight: 400; }\r
.daily-focus-card input, .daily-focus-card select { background: var(--surface); border-radius: var(--radius-control); corner-shape: squircle; }\r
.daily-focus-card input:focus, .daily-focus-card select:focus, .picker-trigger.open, .picker-trigger:focus-visible, .daily-focus-card .picker-trigger.open, .daily-focus-card .picker-trigger:focus-visible { border-color: var(--text-muted); box-shadow: none; outline: none; }\r
.picker-popover { border-radius: var(--radius-panel); corner-shape: squircle; box-shadow: 0 4px 14px #0000000a; }\r
.choice-popover button.selected, .choice-popover button:hover { background: var(--surface-muted); color: var(--text); }\r
.time-trigger svg, .time-done { color: var(--text-muted); }\r
.time-column button.selected, .time-popover .time-done { background: var(--surface-muted); color: var(--text); }\r
.report-editor .ProseMirror:focus, .report-editor .ProseMirror:focus-visible { outline: none; box-shadow: none; }\r
.report-editor:focus-within { border-color: var(--text-muted); box-shadow: none; }\r
.daily-workbench-detail .report-editor { overflow-y: auto; }\r
.daily-workbench .system-variable button { text-decoration: none; color: var(--text); }\r
.daily-runs-toggle { display: flex; align-items: center; gap: 8px; text-decoration: none; }\r
.daily-runs-toggle svg { width: 14px; height: 14px; }\r
.daily-runs-toggle[aria-expanded="true"] svg { transform: rotate(90deg); }\r
/* The title stays outside the scrolling body, including its scrollbar. */\r
.desktop-shell-content:has(.daily-workbench-detail) { overflow: hidden; }\r
.daily-workbench-detail.page { height: calc(100vh - 48px); min-height: 0; display: flex; flex-direction: column; padding-bottom: 0; }\r
.daily-workbench-detail > header { flex-shrink: 0; margin-bottom: 0; padding-bottom: 18px; }\r
.daily-detail-scroll { min-height: 0; overflow-y: auto; padding: 18px 12px 32px 0; margin-right: -12px; }\r
.daily-task-settings { height: auto; min-height: 0; padding: 28px; }\r
.daily-task-settings .daily-focus-card { min-height: 0; box-shadow: none; }\r
.daily-task-settings .daily-page, .daily-task-settings .daily-workbench { min-height: 0; }\r
.daily-task-settings .focus-form { display: grid; grid-template-columns: 1fr; gap: 20px; }\r
.daily-task-settings .primary { background: var(--text); color: var(--surface); border-color: var(--text); }\r
.daily-task-settings .focus-actions { margin: 24px 0; padding-top: 16px; border-top: 1px solid var(--border); }\r
.daily-task-settings .time-trigger > svg:first-child { color: var(--text-muted); }\r
.daily-task-settings .focus-form > label { margin: 0; }\r
.daily-task-settings .focus-form { row-gap: 16px; }\r
.daily-workbench .daily-split-workspace { overflow: visible; }\r
.daily-workbench .progressive-field-picker { border-radius: 0 var(--radius-panel) var(--radius-panel) 0; corner-shape: squircle; }\r
.daily-workbench-detail > header { display: flex; align-items: center; gap: 16px; }\r
.daily-title-line { display: flex; align-items: center; gap: 10px; min-width: 0; flex: 1; }\r
.daily-title-line .back-link { margin: 0; padding: 6px; flex-shrink: 0; }\r
.daily-workbench-detail .daily-title-line h1 { margin: 0; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 18px; }\r
.daily-workbench-detail .daily-title-line p { margin: 0; font-size: 12px; white-space: nowrap; flex-shrink: 0; }\r
.daily-workbench-detail > header > button { flex-shrink: 0; }\r
.daily-workbench .preview-action-group { gap: 8px; }\r
.preview-date-action { order: 1; width: 154px; }\r
.preview-action-group > .primary { order: 0; }\r
.preview-action-group > .secondary { order: 2; }\r
\r
.daily-workbench .preview-action-group > button { padding-inline: 8px; font-size: 13px; min-height: 40px; gap: 5px; }\r
.daily-workbench .preview-action-group > button svg { width: 14px; height: 14px; }\r
.preview-date-action { width: 140px; }\r
body:has(.production-message-demo) .preview-date-action .date-picker-trigger { min-height: 40px; height: 40px; padding-inline: 9px; font-size: 13px; }\r
.field-selection-stage { height: auto; overflow: visible; flex-shrink: 0; }\r
\r
.field-breadcrumbs { display: flex; align-items: center; gap: 4px; height: 40px; flex-wrap: nowrap; border-bottom: 1px solid var(--border); overflow: hidden; }\r
.field-breadcrumbs button { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; padding: 4px; border: 0; background: transparent; color: var(--text); }\r
.field-breadcrumbs svg { width: 12px; height: 12px; flex-shrink: 0; color: var(--text-muted); }\r
.field-drill-list { height: auto; max-height: 210px; overflow-y: auto; padding: 8px 0; margin-bottom: 14px; }\r
.field-drill-list p { color: var(--text-muted); font-size: 13px; margin: 0 0 8px; }\r
.field-drill-list > button { width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 8px; text-align: left; border: 0; border-radius: var(--radius-control); corner-shape: squircle; background: transparent; color: var(--text); padding: 9px 10px; }\r
.field-drill-list > button:hover, .field-drill-list > button[aria-pressed="true"] { background: var(--surface-muted); }\r
.field-drill-list > button svg { width: 16px; height: 16px; flex-shrink: 0; }\r
.field-breadcrumbs .field-refresh { margin-left: auto; flex-shrink: 0; font-size: 12px; color: var(--text-muted); }\r
\r
.message-template-host {height:calc(100vh - 48px);min-height:0;}\r
.message-template-host iframe{width:100%;height:100%;border:0;display:block;}\r
.desktop-shell-content:has(.message-template-host){overflow:hidden;}\r
`,iD=`<!doctype html>\r
<html lang="zh-CN"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>日报消息编辑器 · 交互 Demo</title>\r
<style>\r
:root{--font-ui:"Inter Variable","Noto Sans SC Variable",sans-serif}\r
@font-face{font-family:"Inter Variable";src:url('../../src/ProductionAssistant.App/Assets/Fonts/Inter.ttf')}@font-face{font-family:"Noto Sans SC Variable";src:url('../../src/ProductionAssistant.App/Assets/Fonts/NotoSansSC.ttf')}\r
*{box-sizing:border-box;scrollbar-width:thin;scrollbar-color:#d1d0cd transparent}body{margin:0;background:#fafaf9;color:#292524;font:14px var(--font-ui)}button,input,select{font:inherit;color:inherit}button{cursor:pointer;background:white;border:1px solid #deddd9;border-radius:14px;corner-shape:squircle;padding:9px 13px}button:hover{background:#f1f0ed}button:disabled{color:#a8a29e;background:#fafaf9;cursor:default}button:focus-visible,input:focus-visible,select:focus-visible{outline:1px solid #78716c;outline-offset:2px}small,.muted{color:#78716c}main{max-width:1420px;margin:auto;padding:30px 36px}header{display:flex;align-items:center;gap:14px;margin-bottom:24px}h1{font-size:20px;margin:0;font-weight:600;flex:1}header small{white-space:nowrap}h2{font-size:15px;font-weight:500;margin:0 0 10px}p{line-height:1.7}.work{display:grid;grid-template-columns:minmax(0,1.5fr) minmax(0,1fr);border:1px solid #deddd9;border-radius:20px;corner-shape:squircle;background:white;overflow:hidden}.pane{padding:24px;min-width:0}.pane+ .pane{border-left:1px solid #e7e5e4}.pane-head{display:flex;align-items:center;justify-content:space-between;gap:10px;height:42px;margin-bottom:12px}.pane-head h2{margin:0}.editor{min-height:440px;height:calc(100vh - 310px);max-height:700px;overflow:auto;border:1px solid #deddd9;border-radius:14px;corner-shape:squircle;padding:20px;line-height:2.05;font-size:15px;white-space:pre-wrap;outline:none}.editor:focus{border-color:#78716c}.token{display:inline-block;white-space:nowrap;background:#f1f0ed;border-radius:10px;corner-shape:squircle;padding:0 7px;line-height:28px;cursor:pointer;vertical-align:baseline;font-size:14px}.token.bad{border-left:2px solid #c2703d}#preview{white-space:pre-wrap;line-height:2.05;font-size:15px;margin:12px 0;max-height:calc(100vh - 320px);overflow:auto}input,select{background:white;border:1px solid #deddd9;border-radius:12px;corner-shape:squircle;padding:8px;width:100%}input[type=date]{width:146px}footer{display:flex;justify-content:space-between;gap:12px;margin-top:16px;color:#78716c;font-size:12px}.popup{position:fixed;width:350px;max-width:calc(100vw - 24px);max-height:380px;overflow:auto;background:white;border:1px solid #deddd9;border-radius:18px;corner-shape:squircle;box-shadow:0 10px 30px #29252418;padding:10px;z-index:10}.popup h2{padding:8px;font-size:13px;color:#78716c}.popup button{display:flex;width:100%;justify-content:space-between;text-align:left;border:0;padding:10px;border-radius:12px;background:none}.popup button.active,.popup button[aria-pressed=true]{background:#f1f0ed}.popup small{padding-left:10px}.popup .custom{border-top:1px solid #e7e5e4;margin-top:6px}.hidden,[hidden]{display:none!important}dialog{width:430px;border:1px solid #deddd9;border-radius:20px;corner-shape:squircle;padding:24px;color:#292524}dialog::backdrop{background:#0005}dialog label{display:grid;gap:8px;margin:16px 0}dialog .actions{display:flex;justify-content:flex-end;gap:8px;margin-top:24px}.dark{background:#292524;color:white}.dark:hover{background:#44403c}.notice{border-left:2px solid #c2703d;padding:8px 12px;margin-top:14px}.empty{padding:50px;text-align:center;color:#78716c}.status{color:#78716c;font-size:12px}#demo-tools{display:flex;gap:12px;align-items:center;margin-top:20px;font-size:12px;color:#78716c}#demo-tools button{font-size:12px;padding:6px 10px}@media(max-width:800px){main{padding:18px}.work{grid-template-columns:1fr}.pane+.pane{border-left:0;border-top:1px solid #deddd9}header small{display:none}.editor{height:360px;min-height:300px}}\r
#settings-open{display:inline-flex;align-items:center;justify-content:center;padding:10px}#runs{margin-top:22px;border-top:1px solid #deddd9;padding-top:16px}#runs summary{cursor:pointer;padding:4px 0}#runs p{padding:8px 16px;margin:0}header h1{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}</style>\r
<main><header><span aria-hidden="true">←</span><h1>塔筒生产日报</h1><small id="saved">已保存</small><button id="save">保存</button><button id="settings-open" aria-label="任务设置" title="任务设置"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="m9 3 6 0 1 3 3 1 2 5-2 5-3 1-1 3H9l-1-3-3-1-2-5 2-5 3-1Z"/><circle cx="12" cy="12" r="3"/></svg></button></header>\r
<section id="message"><div class="work"><div class="pane"><div class="pane-head"><h2>消息内容</h2><small>输入 / 插入数据</small></div><div id="editor" class="editor" role="textbox" aria-label="消息内容" aria-multiline="true" contenteditable="true"></div></div><div class="pane"><div class="pane-head"><h2>最终预览</h2><input id="date" type="hidden" value="2026-09-06"><span id="date-picker"></span><button id="preview-generate" class="dark">生成预览</button></div><small class="status" id="preview-status">示例数据 · 仅演示交互</small><div id="preview"></div></div></div><footer><span>↑ ↓ 选择 · Enter 插入 · Esc 关闭</span></footer></section>\r
<details id="runs"><summary>运行记录</summary><p class="muted">暂无运行记录 · Demo 不执行发送任务</p></details>\r
<div id="demo-tools"><span>交互 Demo · 所有数值均为示例，不连接 Notion 或发送消息</span><button id="fail">模拟单个指标失败</button></div>\r
</main><div id="menu" class="popup" role="listbox" aria-label="插入数据" hidden></div><div id="quick" class="popup" role="dialog" aria-label="修改数据口径" hidden></div>\r
<dialog id="settings" aria-labelledby="settings-title"><h2 id="settings-title">任务设置</h2><label>任务名称<input id="task-name" value="塔筒生产日报"></label><label>每天发送时间<input id="send-time" type="time" value="17:30"></label><p class="muted">业务上下文：塔筒生产日报</p><div class="actions"><button id="settings-close">取消</button><button id="settings-save" class="dark">保存设置</button></div></dialog>\r
<dialog id="advanced"><h2>自定义数据</h2><p class="muted">保存后可通过 / 搜索复用。</p><label>指标<select id="metric"></select></label><label>统计口径<select id="scope"><option value="day">日（业务日当天）</option><option value="mtd">月累计（月初至业务日）</option><option value="ytd">年累计（年初至业务日）</option><option value="fullyear">全年</option></select></label><label>年份<select id="scope-year"><option value="0">今年</option><option value="-1">去年</option><option value="-2">前年</option></select></label><label>显示名称<input id="custom-name" placeholder="如：去年同期月焊接量"></label><div class="actions"><button id="cancel">取消</button><button id="create" class="dark">保存并插入</button></div></dialog>\r
<script>\r
const runtime=window.frameElement?.dailyRuntime;\r
const $=s=>document.querySelector(s),ed=$('#editor'),menu=$('#menu'),quick=$('#quick');\r
const metrics=runtime?.metrics || [['weld','焊接量','焊 焊量 weld',42.17],['cut','下料量','下料 切割 cut',48.36],['plate','板材入库','板 钢板',32.15],['section','型材入库','型材',15.62],['output','产出量','产量 套',4],['plan','焊接月计划','焊 月 计划',1160]];\r
const scopes=[['today','今日',1],['mtd','本月',5.608],['ytd','本年',83.437],['last','去年同期',78.2],['full','去年全年',103.4]];\r
const storagePrefix=runtime ? 'daily-slash-'+runtime.id : 'slash-demo';\r
let custom=runtime ? [] : JSON.parse(localStorage.getItem(storagePrefix+'-custom')||'[]'),recent=JSON.parse(localStorage.getItem(storagePrefix+'-recent')||'[]');\r
const defaults=runtime?.definitions || metrics.flatMap(m=>(m[0]==='plan'?[['month','本月',1]]:scopes).map(s=>({key:m[0]+'.'+s[0],metric:m[0],scope:s[0],label:m[0]==='plan'?m[1]:s[1]+m[1],keywords:m[2]+' '+s[1]})));\r
let index=0,results=[],slashRange=null,query='',target=null,insertion=null,failed=false,timer;\r
const dateChoices=[['year','业务年份','年'],['month','业务月份','月'],['day','业务日','日'],['date','完整业务日期','完整日期']].map(([key,label,words])=>({key:'system.'+key,metric:'date',scope:key,label,keywords:'业务日期 '+words}));\r
const definitions=()=>[...defaults,...custom,...dateChoices];\r
function value(d){if(runtime)return runtime.value(d);if(d.metric==='date')return $('#date').value;if(failed&&d.metric==='weld'&&d.scope==='today')return '⚠ 获取失败';const m=metrics.find(m=>m[0]===d.metric),day=Number($('#date').value.slice(-2))||1;let scale=scopes.find(s=>s[0]===d.scope)?.[2]||4.8;return (m[3]*(d.metric==='plan'?1:scale*(day/6))).toFixed(2)}\r
function pill(d){let el=document.createElement('span');el.className='token';el.contentEditable='false';el.dataset.key=d.key;el.textContent=d.label;el.tabIndex=0;el.setAttribute('role','button');return el}\r
function initial(){if(runtime){runtime.mount(ed,pill);$('h1').textContent=runtime.name;$('#task-name').value=runtime.name;$('#send-time').value=runtime.sendTime;$('#demo-tools').hidden=true;$('#preview-status').textContent='尚未生成预览';$('#preview').textContent='选择日期后，点击“生成预览”读取数据。';$('#date').value=runtime.businessDate;return}ed.append(document.createTextNode('塔筒生产日报\\n\\n日期：'),pill(definitions().at(-1)),document.createTextNode('\\n\\n今日焊接：'),pill(defaults[0]),document.createTextNode(' t\\n本月累计：'),pill(defaults[1]),document.createTextNode(' t\\n\\n今日下料：'),pill(defaults[5]),document.createTextNode(' t\\n\\n'))}initial();\r
let previewVersion=0;\r
async function preview(){if(runtime&&(!menu.hidden||ed.contentEditable==='false'))return;if(runtime){const version=++previewVersion;$('#preview-generate').disabled=true;$('#preview-status').textContent='正在读取数据…';try{const result=await runtime.preview(ed,$('#date').value);if(version!==previewVersion)return;$('#preview').textContent=result.text;$('#preview-status').textContent=result.message || '已更新';ed.querySelectorAll('.token').forEach(el=>{el.classList.toggle('bad',result.errors.some(error=>error.placeholder===el.dataset.key));el.title=result.errors.find(error=>error.placeholder===el.dataset.key)?.message||''});$('#saved').textContent='已保存'}catch(error){if(version===previewVersion){$('#preview-status').textContent=error.message;$('#saved').textContent='保存或预览失败'}}finally{$('#preview-generate').disabled=false}return}const copy=ed.cloneNode(true);copy.querySelectorAll('.token').forEach(el=>{let d=definitions().find(d=>d.key===el.dataset.key);el.replaceWith(document.createTextNode(d?value(d):'⚠ 无法识别'))});$('#preview').textContent=copy.innerText;ed.querySelectorAll('.token').forEach(el=>el.classList.toggle('bad',value(definitions().find(d=>d.key===el.dataset.key)).startsWith('⚠')));$('#saved').textContent='已保存'}\r
async function save(){if(!runtime)return preview();if(!menu.hidden||ed.contentEditable==='false')return;try{await runtime.save(ed);$('#saved').textContent='已保存'}catch(error){$('#saved').textContent='保存失败';$('#preview-status').textContent=error.message}}\r
function changed(){runtime?.dirty();previewVersion++;if(runtime)$('#preview-status').textContent='内容已修改，点击生成预览';$('#saved').textContent='保存中…';clearTimeout(timer);timer=setTimeout(save,350)}\r
function position(el,rect){el.hidden=false;const r=el.getBoundingClientRect();el.style.left=Math.max(12,Math.min(rect.left,innerWidth-r.width-12))+'px';el.style.top=Math.max(12,rect.bottom+r.height+8<innerHeight?rect.bottom+8:rect.top-r.height-8)+'px'}\r
function close(){menu.hidden=true;quick.hidden=true;slashRange=null}\r
function search(){const words=query.trim().toLowerCase().split(/\\s+/).filter(Boolean);results=definitions().filter(d=>words.every(w=>(d.label+' '+d.key+' '+d.keywords).toLowerCase().includes(w))).sort((a,b)=>{const ai=recent.indexOf(a.key),bi=recent.indexOf(b.key);return (ai<0?999:ai)-(bi<0?999:bi)}).slice(0,8);index=Math.min(index,results.length);menu.replaceChildren();let heading=document.createElement('h2');heading.textContent=query?'搜索：'+query:'最近使用 / 常用数据';menu.append(heading);results.forEach((d,i)=>{let b=document.createElement('button');b.setAttribute('role','option');b.setAttribute('aria-selected',i===index);b.className=i===index?'active':'';b.append(document.createTextNode(d.label));let v=document.createElement('small');v.textContent=value(d);b.append(v);b.onmousedown=e=>{e.preventDefault();insert(d)};menu.append(b)});let b=document.createElement('button');b.className='custom '+(index===results.length?'active':'');b.textContent='创建自定义数据…';b.onmousedown=e=>{e.preventDefault();openAdvanced()};menu.append(b);const rect=slashRange?.getBoundingClientRect()||ed.getBoundingClientRect();position(menu,rect)}\r
function detect(){let sel=getSelection();if(!sel.isCollapsed||!ed.contains(sel.anchorNode))return close();let n=sel.anchorNode;if(n.nodeType!==3)return close();let before=n.textContent.slice(0,sel.anchorOffset),match=before.match(/\\/([^/\\n]*)$/);if(!match)return close();slashRange=document.createRange();slashRange.setStart(n,sel.anchorOffset-match[0].length);slashRange.setEnd(n,sel.anchorOffset);query=match[1];target=null;insertion=null;index=0;search()}\r
async function insert(d){const range=(slashRange||insertion)?.cloneRange();if(!range)return;menu.hidden=true;ed.contentEditable='false';try{if(runtime)d=await runtime.materialize(d);}catch(error){$('#preview-status').textContent=error.message;return}finally{ed.contentEditable='true'}range.deleteContents();const el=pill(d);range.insertNode(el);range.setStartAfter(el);range.collapse(true);getSelection().removeAllRanges();getSelection().addRange(range);ed.focus();recent=[d.key,...recent.filter(k=>k!==d.key)].slice(0,8);localStorage.setItem(storagePrefix+'-recent',JSON.stringify(recent));close();changed()}\r
ed.addEventListener('input',e=>{changed();if(!e.isComposing)detect()});ed.addEventListener('compositionend',detect);\r
ed.addEventListener('paste',e=>{e.preventDefault();document.execCommand('insertText',false,e.clipboardData.getData('text/plain'))});\r
ed.addEventListener('keydown',e=>{if(e.isComposing)return;if(!menu.hidden){if(['ArrowDown','ArrowUp','Enter','Escape'].includes(e.key)){e.preventDefault();if(e.key==='Escape'){close();changed();return;}if(e.key==='Enter')return index===results.length?openAdvanced():insert(results[index]);index=(index+(e.key==='ArrowDown'?1:-1)+results.length+1)%(results.length+1);search();return}}if(e.target.classList.contains('token')&&['Backspace','Delete'].includes(e.key)){e.preventDefault();e.target.remove();changed()}});\r
function editToken(el){target=el;insertion=null;let d=definitions().find(d=>d.key===el.dataset.key);if(!d&&el.dataset.key.startsWith('today('))d={metric:'date',label:'业务日期'};if(!d)return;quick.replaceChildren();let title=document.createElement('h2');title.textContent=d.label+(value(d)?' · '+(runtime?'当前值 ':'示例值 ')+value(d):'');quick.append(title);if(d.metric==='date'){title.textContent='业务日期 · 选择显示粒度';dateChoices.forEach(choice=>{const b=document.createElement('button');b.textContent=choice.label;b.onclick=()=>{el.replaceWith(pill(choice));close();changed()};quick.append(b)});position(quick,el.getBoundingClientRect());return}const choices=defaults.filter(x=>x.metric===d.metric);choices.forEach(x=>{let b=document.createElement('button');b.textContent=x.label+(x.key===d.key?' ✓':'');b.setAttribute('aria-pressed',x.key===d.key);b.onclick=async()=>{try{b.disabled=true;const next=runtime?await runtime.materialize(x):x;el.replaceWith(pill(next));close();changed()}catch(error){title.textContent=error.message;b.disabled=false}};quick.append(b)});let b=document.createElement('button');b.textContent='高级设置…';b.onclick=()=>openAdvanced(d);quick.append(b);position(quick,el.getBoundingClientRect())}\r
ed.onclick=e=>{let el=e.target.closest('.token');if(el)editToken(el)};ed.addEventListener('keydown',e=>{if(e.target.classList.contains('token')&&e.key==='Enter'){e.preventDefault();editToken(e.target)}});\r
function openAdvanced(d){insertion=d?null:slashRange?.cloneRange();menu.hidden=true;quick.hidden=true;$('#metric').replaceChildren(...metrics.map(m=>new Option(m[1],m[0])));$('#metric').value=d?.metric||metrics[0]?.[0]||'';$('#custom-name').value='';runtime?.configureAdvanced($('#metric').value,$('#scope'));$('#advanced').showModal()}\r
$('#metric').onchange=()=>runtime?.configureAdvanced($('#metric').value,$('#scope'));\r
$('#cancel').onclick=()=>$('#advanced').close();$('#create').onclick=async()=>{let name=$('#custom-name').value.trim();if(!name){$('#custom-name').focus();return}let d={key:'custom.'+Date.now(),metric:$('#metric').value,scope:runtime?runtime.resolveAdvanced($('#scope').value,$('#scope-year').value):$('#scope').value,label:name,keywords:name};if(runtime){try{d=await runtime.materialize(d)}catch(error){$('#preview-status').textContent=error.message;return}}else{custom.push(d);localStorage.setItem(storagePrefix+'-custom',JSON.stringify(custom))}$('#advanced').close();if(target&&!insertion){target.replaceWith(pill(d));target=null;changed()}else insert(d)};\r
$('#date').onchange=()=>{if(!runtime)return preview();runtime.dirty();previewVersion++;$('#preview-status').textContent='日期已修改，点击生成预览'};$('#preview-generate').onclick=preview;$('#save').onclick=save;$('#fail').onclick=()=>{failed=!failed;$('#fail').textContent=failed?'恢复示例数据':'模拟单个指标失败';preview()};document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});document.addEventListener('mousedown',e=>{if(!e.target.closest('.popup')&&!e.target.closest('.token')&&!e.target.closest('#editor'))close()});$('#settings-open').onclick=()=>{close();$('#task-name').value=$('h1').textContent;$('#settings').showModal()};$('#settings-close').onclick=()=>$('#settings').close();$('#settings-save').onclick=async()=>{const name=$('#task-name').value.trim();if(!name){$('#task-name').focus();return}if(runtime){try{await runtime.saveBasics(name,$('#send-time').value)}catch(error){$('#preview-status').textContent=error.message;return}}$('h1').textContent=name;$('#settings').close()};if(runtime)runtime.connect(document);else preview();\r
<\/script></html>\r
`,Ib=""+new URL("Inter-VF2RPR_K.ttf",import.meta.url).href,e0=""+new URL("NotoSansSC-Dz1u1FRy.ttf",import.meta.url).href,Xi=new Map;function sD(n,a,s=!1){const o=JSON.stringify([n,a]),u=`daily-field-cache-v1:${o}`;let h=s?void 0:Xi.get(o);if(!h&&!s)try{const f=JSON.parse(localStorage.getItem(u)||"null");f&&Array.isArray(f.metrics)&&f.metrics.every(m=>m&&typeof m.id=="string"&&typeof m.name=="string")&&(h=Promise.resolve(f),Xi.set(o,h))}catch{}return h||(h=be("daily.getProperties",{id:n,sourceId:a}).then(f=>{try{localStorage.setItem(u,JSON.stringify(f))}catch{}return f}).catch(f=>{throw Xi.delete(o),f}),Xi.set(o,h)),h}function oD(n=!1){if(Xi.clear(),n)try{Object.keys(localStorage).filter(a=>a.startsWith("daily-field-cache-v1:")).forEach(a=>localStorage.removeItem(a))}catch{}}const _o=[0,-1,-2].flatMap(n=>[{granularity:"day",key:n===0?"today":`day${n}`,label:n===0?"今日":`${n===-1?"去年":"前年"}同日`},{granularity:"mtd",key:n===0?"mtd":n===-1?"lastmonth":"mtd-2",label:n===0?"本月累计":`${n===-1?"去年":"前年"}同期月累计`},{granularity:"ytd",key:n===0?"ytd":n===-1?"last":"ytd-2",label:n===0?"本年累计":`${n===-1?"去年":"前年"}同期`},{granularity:"fullyear",key:n===0?"fullyear":n===-1?"full":"full-2",label:`${n===0?"今年":n===-1?"去年":"前年"}全年`}].map(a=>({key:a.key,label:a.label,spec:{granularity:a.granularity,yearOffset:n}}))),t0={"system.date":'today("yyyy年M月d日")',"system.year":'today("yyyy年")',"system.month":'today("M月")',"system.day":'today("d日")'};function lD(n){return t0[n]||n}function Mv(n){const a=[[]];function s(u){u.replace(/\u00a0/g," ").split(`
`).forEach((h,f)=>{var p;if(f&&a.push([]),!h)return;const m=a.at(-1);((p=m.at(-1))==null?void 0:p.type)==="text"?m.at(-1).text+=h:m.push({type:"text",text:h})})}function o(u){var h;if(u.nodeType===3){s(u.textContent||"");return}if(u instanceof n.ownerDocument.defaultView.HTMLElement){if(u.dataset.key){const f=lD(u.dataset.key);a.at(-1).push({type:f.startsWith("today(")?"dateToken":"fieldToken",attrs:{placeholder:f,label:u.textContent||"",...u.dataset.legacySpec?{dateRangeSpec:JSON.parse(u.dataset.legacySpec)}:{}}});return}if(u.tagName==="BR"){s(`
`);return}u!==n&&["DIV","P"].includes(u.tagName)&&u.childNodes.length===1&&((h=u.firstChild)==null?void 0:h.nodeName)==="BR"||Array.from(u.childNodes).forEach((f,m)=>{m&&f.nodeType===1&&["DIV","P"].includes(f.tagName)&&s(`
`),o(f)})}}return o(n),{text:a.map(u=>u.map(h=>h.type==="text"?h.text:h.attrs.placeholder).join("")).join(`
`),document:JSON.stringify({type:"doc",content:a.map(u=>({type:"paragraph",content:u}))})}}function cD(n,a,s,o){const u=[...s,...Object.entries(t0).map(([f,m])=>({key:m,label:f==="system.date"?"业务日期":f==="system.year"?"业务年份":f==="system.month"?"业务月份":"业务日",metric:"date",scope:"date",keywords:"",field:void 0}))].filter(f=>f.field||f.metric==="date").sort((f,m)=>m.key.length-f.key.length);let h=a;for(;h;){const f=u.map(m=>({d:m,index:h.indexOf(m.key)})).filter(m=>m.index>=0).sort((m,p)=>m.index-p.index)[0];if(!f){n.append(n.ownerDocument.createTextNode(h));break}f.index&&n.append(n.ownerDocument.createTextNode(h.slice(0,f.index))),n.append(o(f.d)),h=h.slice(f.index+f.d.key.length)}}function uD(n,a,s,o){if(!a)return!1;let u;try{u=JSON.parse(a)}catch{return!1}if(u.type!=="doc")return!1;function h(f){var m,p,g,v;if(f.type==="text"){n.append(n.ownerDocument.createTextNode(f.text||""));return}if(f.type==="hardBreak"){n.append(n.ownerDocument.createTextNode(`
`));return}if(f.type==="fieldToken"||f.type==="dateToken"){const x=((m=f.attrs)==null?void 0:m.placeholder)||"";let b=s.find(E=>E.key===x);b||(b={key:x,label:f.type==="dateToken"?"业务日期":((p=f.attrs)==null?void 0:p.label)||"已有数据",metric:f.type==="dateToken"?"date":"legacy",scope:"legacy",keywords:((g=f.attrs)==null?void 0:g.label)||""},s.push(b));const j=o(b);(v=f.attrs)!=null&&v.dateRangeSpec&&(j.dataset.legacySpec=JSON.stringify(f.attrs.dateRangeSpec)),n.append(j);return}(f.content||[]).forEach((x,b)=>{f.type==="doc"&&b&&n.append(n.ownerDocument.createTextNode(`
`)),h(x)})}return h(u),!0}function n0({id:n,back:a,changed:s,openSettings:o}){const u=S.useRef(null),[h,f]=S.useState("");return S.useEffect(()=>{let m=!1;const p=u.current;return be("daily.get",{id:n}).then(g=>{if(m)return;const v=dD(g,{back:a,changed:s,openSettings:o});p.dailyRuntime=v,p.srcdoc=iD.replace("../../src/ProductionAssistant.App/Assets/Fonts/Inter.ttf",new URL(Ib,window.location.href).href).replace("../../src/ProductionAssistant.App/Assets/Fonts/NotoSansSC.ttf",new URL(e0,window.location.href).href)}).catch(g=>{m||f(String(g.message||g))}),()=>{var g;m=!0,(g=p.dailyRuntime)==null||g.dispose()}},[n]),l.jsxs("div",{className:"message-template-host",children:[h&&l.jsx("p",{role:"alert",children:h}),l.jsx("iframe",{ref:u,title:"日报消息模板"})]})}function dD(n,a){var q;let s=!1,o=!1,u,h,f=Promise.resolve(),m=0,p;const g=new Date,v=n.fields.map(N=>{var M,V,$;return{key:N.placeholder,label:N.label.replace(" · ",""),metric:`${N.databaseId||((M=N.binding)==null?void 0:M.dataSourceId)}:${N.businessId||((V=N.binding)==null?void 0:V.businessMetricId)}`,scope:(($=_o.find(J=>JSON.stringify(J.spec)===JSON.stringify(N.dateRangeSpec)))==null?void 0:$.key)||"legacy",keywords:N.label,field:N}}),x=[];let b=(q=n.metricSourceIds)!=null&&q.length?n.metricSourceIds:[...new Set(n.fields.map(N=>{var M;return N.databaseId||((M=N.binding)==null?void 0:M.dataSourceId)}).filter(Boolean))];const j=new Map(n.fields.map(N=>[N.placeholder,N])),E=new Map;function T(N){const M=h==null?void 0:h.querySelector("#preview-status");M&&(M.textContent=N)}function D(){h==null||h.querySelectorAll("[data-send]").forEach(N=>N.disabled=o||!n.notificationConfigured)}async function O(N){N.text===n.draftTemplate&&N.document===n.draftTemplateDocument||(await be("daily.saveTemplate",{id:_,...N}),n.draftTemplate=N.text,n.draftTemplateDocument=N.document)}async function k(){var N;try{const M=await be("daily.get",{id:_});if(s)return;n.notificationConfigured=M.notificationConfigured,n.sources=M.sources,D(),(N=h==null?void 0:h.querySelector("[data-notification-notice]"))==null||N.toggleAttribute("hidden",!!n.notificationConfigured),await B()}catch(M){T(String(M))}}async function B(){var M;const N=await Promise.allSettled(b.map(async V=>({sourceId:V,metrics:(await sD(_,V)).metrics})));if(!s){v.splice(0,v.length,...v.filter(V=>V.field)),x.length=0;for(const V of N)if(V.status==="fulfilled")for(const $ of V.value.metrics){const J=`${V.value.sourceId}:${$.id}`;x.push([J,$.name,$.name,0]);const re=$.granularity==="monthly"?[{key:"month",label:"本月"}]:_o;for(const pe of re)v.push({key:`${J}:${pe.key}`,metric:J,scope:pe.key,label:$.granularity==="monthly"?$.name:pe.label+$.name,keywords:$.name+" "+pe.label+" "+(((M=n.sources.find(le=>le.id===V.value.sourceId))==null?void 0:M.name)||""),sourceId:V.value.sourceId,metricId:$.id});for(const pe of v.filter(le=>le.metric===J&&le.field))pe.sourceId=V.value.sourceId,pe.metricId=$.id}N.some(V=>V.status==="rejected")?T("部分指标目录读取失败，请到系统设置刷新数据库。"):b.length||T("请在右上角任务设置中配置本任务的指标范围。")}}const _=n.id,U={dirty(){m++,p=void 0},id:_,name:n.name,sendTime:n.sendTime,businessDate:`${g.getFullYear()}-${String(g.getMonth()+1).padStart(2,"0")}-${String(g.getDate()).padStart(2,"0")}`,definitions:v,metrics:x,value:N=>{var M,V,$;return N.metric==="date"?"业务日期":((M=p==null?void 0:p.fieldValues)==null?void 0:M[N.key])||(($=p==null?void 0:p.fieldValues)==null?void 0:$[((V=v.find(J=>J.field&&J.metric===N.metric&&J.scope===N.scope))==null?void 0:V.key)||""])||""},mount:(N,M)=>{uD(N,n.draftTemplateDocument,v,M)||cD(N,n.draftTemplate,v,M)},async materialize(N){var pe;if(N.field||N.metric==="date")return N;const M=v.find(le=>le.metric===N.metric&&le.sourceId),V=N.sourceId||(M==null?void 0:M.sourceId),$=N.metricId||(M==null?void 0:M.metricId);if(!V||!$)throw new Error("此字段缺少可用的指标定义，请在任务设置中刷新指标。");const J=JSON.stringify([V,$,N.scope,N.label]);let re=E.get(J);return re||(re=be("daily.addField",{id:_,sourceId:V,metricId:$,placeholder:"",displayName:N.label,...N.scope==="month"?{rangeKind:"current-month"}:{dateRangeSpec:(pe=_o.find(le=>le.key===N.scope))==null?void 0:pe.spec}}).then(({field:le})=>{j.set(le.placeholder,le);const ve={...N,key:le.placeholder,field:le,sourceId:V,metricId:$};return v.some(H=>H.key===ve.key)||v.push(ve),a.changed(),ve}).catch(le=>{throw E.delete(J),le}),E.set(J,re)),re},save(N){const M=Mv(N),V=f.catch(()=>{}).then(()=>s?void 0:O(M));return f=V,V},preview(N,M){const V=Mv(N),$=++m,J=f.catch(()=>{}).then(async()=>{if(s||$!==m)return{succeeded:!1,text:"",message:"内容已修改，请重新生成预览",errors:[]};await O(V);const re=await be("daily.preview",{id:_,businessDate:M},12e4),pe={...re,errors:re.fieldErrors||[],message:re.succeeded?"已生成 · "+M:re.message};return $===m&&!s&&(p=pe),pe});return f=J,J},async send(N,M,V){if(!o){if(!n.notificationConfigured)throw new Error("请先在系统设置中配置通知渠道。");o=!0,D();try{await U.save(N);const $=await be(M==="test"?"daily.test":"daily.sendToday",M==="test"?{id:_,businessDate:V}:{id:_},12e4);if(!$.succeeded)throw new Error($.message||"发送失败，请查看运行记录");T($.alreadySent?"今日当前内容已发送":M==="test"?"测试发送成功":"今日消息已发送"),a.changed()}finally{o=!1,D()}}},configureAdvanced(N,M){const V=v.some(re=>re.metric===N&&re.scope==="month"),$=V?[{key:"month",label:"本月计划"}]:[{key:"day",label:"日（业务日当天）"},{key:"mtd",label:"月累计（月初至业务日）"},{key:"ytd",label:"年累计（年初至业务日）"},{key:"fullyear",label:"全年"}];M.replaceChildren(...$.map(re=>new Option(re.label,re.key)));const J=M.ownerDocument.querySelector("#scope-year");J&&(J.disabled=V,J.value="0")},resolveAdvanced(N,M){return N==="month"?"month":_o.find(V=>V.spec.granularity===N&&V.spec.yearOffset===Number(M)).key},async saveBasics(N,M){const V=Array.from((h==null?void 0:h.querySelectorAll("[data-context-source]:checked"))||[]).map($=>$.value);await be("daily.saveBasics",{id:_,name:N,sendTime:M,metricSourceIds:V}),n.name=N,n.sendTime=M,b=V,U.name=N,await B(),a.changed()},connect(N){var K;h=N,N.title=n.name,N.querySelector("#runs p").textContent="";const M=N.querySelector("header > span");M.removeAttribute("aria-hidden"),M.setAttribute("role","button"),M.setAttribute("tabindex","0"),M.setAttribute("aria-label","返回任务列表");const V=async()=>{const P=N.querySelector("#editor");P.contentEditable="false",m++;try{await U.save(P),a.back()}catch(ne){T(String(ne)),P.contentEditable="true"}};M.addEventListener("click",V),M.addEventListener("keydown",P=>{P.key==="Enter"&&V()});const $=N.querySelector("#settings"),J=N.createElement("fieldset");J.style.cssText="border:0;padding:0;max-height:180px;overflow:auto";const re=N.createElement("legend");re.textContent="本任务的指标范围",J.append(re);for(const P of n.sources){const ne=N.createElement("label");ne.style.cssText="display:flex;gap:8px;margin:8px 0";const C=N.createElement("input");C.type="checkbox",C.value=P.id,C.dataset.contextSource="",C.checked=b.includes(P.id),C.style.width="auto",ne.append(C,N.createTextNode(P.name)),J.append(ne)}(K=$.querySelector("p"))==null||K.replaceWith(J);const pe=N.createElement("button");pe.textContent="数据库设置",pe.type="button",pe.onclick=()=>{var P;$.close(),(P=a.openSettings)==null||P.call(a)},J.after(pe);const le=N.querySelector("footer");for(const[P,ne]of[["test","测试发送"],["today","发送今日消息"]]){const C=N.createElement("button");C.textContent=ne,C.dataset.send=P,C.onclick=async()=>{const R=N.querySelector("#editor");R.contentEditable="false";try{await U.send(R,P,N.querySelector("#date").value)}catch(I){T(String(I))}finally{R.contentEditable="true"}},le.append(C)}const ve=N.createElement("style");ve.textContent=Jb+`
`+Wb+`
body{font-family:var(--font-ui)}#date-picker{width:154px}`,N.head.append(ve);const H=N.createElement("span");H.className="production-message-demo",H.hidden=!0,N.body.append(H),u=lf.createRoot(N.querySelector("#date-picker")),u.render(l.jsx(fD,{input:N.querySelector("#date")})),window.addEventListener("production-settings-updated",k);const se=N.querySelector("#runs");if(se.ontoggle=async()=>{if(!se.open)return;const P=se.querySelector("p");P.textContent="正在读取…";try{const ne=await be("daily.runs",{id:_});P.textContent=ne.runs.length?"":"暂无运行记录";for(const C of ne.runs){const R=N.createElement("div");R.textContent=`${C.time} · ${C.status} · ${C.businessDate}${C.error?" · "+C.error:""}`,P.append(R)}}catch(ne){P.textContent=String(ne)}},!n.notificationConfigured){const P=N.createElement("div");P.className="notice",P.dataset.notificationNotice="",P.append(N.createTextNode("通知渠道尚未配置。 "));const ne=N.createElement("button");ne.textContent="通知设置",ne.onclick=a.openSettings||null,P.append(ne),N.querySelector("#message").before(P)}D(),B().catch(P=>T(String(P)))},dispose(){s=!0,m++,u==null||u.unmount(),window.removeEventListener("production-settings-updated",k)}};return U}function fD({input:n}){const[a,s]=S.useState(n.value);return l.jsx(Ya,{value:a,onChange:o=>{var u;s(o),n.value=o,n.dispatchEvent(new(((u=n.ownerDocument.defaultView)==null?void 0:u.Event)||Event)("change",{bubbles:!0}))}})}const hD=`<!doctype html>
<html lang="zh-CN">
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>原材料自动入库</title>
<style>
@font-face{font-family:"Inter Variable";src:url('../../src/ProductionAssistant.App/Assets/Fonts/Inter.ttf');font-weight:100 900}@font-face{font-family:"Noto Sans SC Variable";src:url('../../src/ProductionAssistant.App/Assets/Fonts/NotoSansSC.ttf');font-weight:100 900}
:root{font-family:"Inter Variable","Noto Sans SC Variable",sans-serif;color:#292524;background:#fafaf9;font-size:15px;--line:#e7e5e4;--muted:#78716c;--accent:#c2703d}*{box-sizing:border-box;scrollbar-width:thin;scrollbar-color:#d1d0cd transparent}body{margin:0}button,input,select{font:inherit;color:inherit}button,input,select,.work,dialog{corner-shape:squircle}button{height:44px;border:1px solid #e7e5e4;border-radius:14px;padding:0 16px;background:white;cursor:pointer;white-space:nowrap;font-weight:400}button:hover{background:#f5f5f4}button:disabled{color:#a8a29e;background:#fafaf9;cursor:default}button:focus-visible,input:focus-visible,select:focus-visible,summary:focus-visible{outline:2px solid #78716c;outline-offset:3px}.primary{background:var(--accent);border-color:var(--accent);color:white}.primary:hover{background:#a85c2e}.quiet{border:0;background:transparent}.icon{width:44px;padding:0;display:grid;place-items:center}svg{width:19px;height:19px;fill:none;stroke:currentColor;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}h1,h2,h3,p{margin:0}h1{font-size:26px;font-weight:600;letter-spacing:-.02em}h2{font-size:16px;font-weight:500}h3{font-size:15px;font-weight:500}small,.muted{font-size:14px;color:var(--muted)}p{line-height:1.7}main{max-width:1420px;margin:auto;padding:30px 36px}.top{display:flex;align-items:center;gap:14px;padding-bottom:24px;background:#fafaf9;position:sticky;top:0;z-index:2}.title{flex:1;min-width:0}.title h1{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.title small{display:block;margin-top:7px}.pill{font-size:14px;border-radius:999px;background:#f5f5f4;padding:5px 10px;white-space:nowrap}.work{display:grid;grid-template-columns:minmax(0,1.5fr) minmax(0,1fr);border:1px solid #e7e5e4;border-radius:20px;background:white;overflow:hidden;min-height:440px}.pane{padding:24px;min-width:0}.pane+.pane{border-left:1px solid var(--line)}.pane-head{display:flex;gap:12px;align-items:center;justify-content:space-between;margin-bottom:24px;min-height:44px}.datebar{display:flex;align-items:center;gap:10px;margin-bottom:20px;flex-wrap:wrap}input,select{height:44px;background:#fafaf9;border:1px solid #e7e5e4;border-radius:14px;padding:0 12px;min-width:0}input[type=date]{width:163px}.plain{padding:0 4px;height:32px;background:none;border:0;color:var(--muted)}.sheet{border-top:1px solid var(--line)}.line{display:flex;align-items:center;justify-content:space-between;gap:20px;padding:18px 0;border-bottom:1px solid var(--line)}.line .number{font-size:24px;font-weight:500;font-variant-numeric:tabular-nums}.line small{margin-left:6px}.line.total{border-bottom:0}.line.total .number{font-size:18px}.annotation{margin-top:24px;display:flex;align-items:flex-start;gap:9px;color:var(--muted);font-size:14px;line-height:1.7}.annotation svg{flex-shrink:0;margin-top:2px}.empty{min-height:230px;display:flex;justify-content:center;flex-direction:column;align-items:center;gap:12px;color:var(--muted);text-align:center;line-height:1.8}.empty svg{width:32px;height:32px;stroke:#a8a29e}.empty strong{color:#57534e;font-weight:500}.record{margin-top:22px}.record .line{font-size:15px;padding:13px 0}.record .line span:first-child{color:var(--muted)}.record .line span:last-child{text-align:right}.callout{background:#f5f5f4;border-radius:14px;corner-shape:squircle;padding:13px 15px;margin-top:20px;font-size:14px;line-height:1.7}.callout.error{background:#fef2f2;color:#b91c1c}.callout.warn{background:rgb(249, 220, 164);color:#57534e}.action-row{display:flex;align-items:center;justify-content:flex-end;gap:16px;margin-top:16px}.action-row p{font-size:14px;color:var(--muted);flex:1}.action-row button{flex-shrink:0}details.runs{margin-top:24px;border-top:1px solid var(--line)}summary{cursor:pointer;padding:18px 0;font-size:15px}summary::marker{color:var(--muted)}.runs-body{padding-bottom:15px}.run{border-top:1px solid var(--line);padding:14px 0;display:grid;grid-template-columns:85px 1fr auto;gap:16px;font-size:14px}.run p{color:var(--muted);font-size:14px}.demo{display:flex;align-items:center;gap:12px;flex-wrap:wrap;border-top:1px dashed #e7e5e4;padding-top:16px;margin-top:12px;color:var(--muted);font-size:14px}.demo select{height:36px;font-size:14px}.demo button{height:36px;font-size:14px}.demo label{margin-left:auto;display:flex;align-items:center;gap:8px}dialog{width:510px;max-width:calc(100vw - 32px);max-height:calc(100vh - 48px);overflow:auto;border:1px solid #e7e5e4;border-radius:20px;padding:24px;color:#292524}dialog::backdrop{background:#29252460}dialog header{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px}dialog label{display:grid;gap:8px;font-size:14px;margin-top:16px}dialog label input{width:100%}.two{display:grid;grid-template-columns:1fr 1fr;gap:16px}.section{border-top:1px solid var(--line);margin-top:22px;padding-top:20px}.actions{display:flex;justify-content:flex-end;gap:8px;margin-top:24px}.switch-row{display:flex;align-items:center;justify-content:space-between;gap:15px}.switch-row small{display:block;margin-top:6px}.toggle{width:44px;height:26px;border-radius:999px;padding:3px;background:#d6d3d1;border:0;corner-shape:round}.toggle::after{content:'';display:block;width:20px;height:20px;background:white;border-radius:50%;transition:transform .15s}.toggle[aria-checked=true]{background:#57534e}.toggle[aria-checked=true]::after{transform:translateX(18px)}[hidden]{display:none!important}#feedback{margin:0 0 18px}#feedback:empty{display:none}@media(max-width:900px){main{padding:24px}.pane{padding:20px}.work{grid-template-columns:1.2fr 1fr}.datebar{gap:8px}.top{gap:10px}.top>small{display:none}}@media(max-width:700px){main{padding:16px}.work{grid-template-columns:1fr}.pane+.pane{border-left:0;border-top:1px solid var(--line)}h1{font-size:22px}.action-row{align-items:flex-start;flex-wrap:wrap}.demo label{margin-left:0}.two{grid-template-columns:1fr}.top{position:static}.run{grid-template-columns:70px 1fr}.run>small{display:none}}@media(prefers-reduced-motion:reduce){*{transition:none!important}}
</style>
<main>
<header class="top"><button class="icon quiet" id="back" aria-label="返回任务列表"><svg viewBox="0 0 24 24"><path d="m14 6-6 6 6 6M8 12h12"/></svg></button><div class="title"><h1 id="name">原材料入库自动填报</h1></div><span class="pill" id="enabled">未启用</span><button class="icon" id="settings-open" aria-label="任务设置" title="任务设置"><svg viewBox="0 0 24 24"><path d="m9 3 6 0 1 3 3 1 2 5-2 5-3 1-1 3H9l-1-3-3-1-2-5 2-5 3-1Z"/><circle cx="12" cy="12" r="3"/></svg></button></header>
<p id="feedback" role="status" aria-live="polite"></p>
<section class="work" aria-label="入库工作区"><div class="pane"><div class="pane-head"><h2>入库数据</h2></div><div class="datebar"><span id="date-label">业务日期</span><input type="hidden" id="date"><span id="date-picker"></span><button class="plain" id="yesterday">昨天</button><button id="preview" class="primary">生成预览</button></div><div id="source-empty" class="empty"><svg viewBox="0 0 24 24"><path d="M5 5h14v15H5zM8 3v4m8-4v4M5 10h14m-10 4h6m-6 3h4"/></svg><strong>选择日期，查看入库汇总</strong><span>手动读取板材、型材重量<br>同时检查 Notion 中是否已有记录</span></div><div id="source-values" hidden><div class="sheet"><div class="line"><span>板材</span><span><b class="number" id="plate">—</b><small>吨</small></span></div><div class="line"><span>型材</span><span><b class="number" id="section">—</b><small>吨</small></span></div><div class="line total"><span>合计</span><span><b class="number" id="total">—</b><small>吨</small></span></div></div></div><div id="source-error" class="callout error" role="alert" hidden></div></div>
<div class="pane"><div class="pane-head"><h2>写入预览</h2><span class="pill">Notion</span></div><small id="target-name">原材料入库数据库</small><div id="target-empty" class="empty"><strong>尚未生成预览</strong><span>预览只读取数据，不会新增记录</span></div><div class="record" id="record" hidden><div class="line"><span>业务</span><span id="record-title"></span></div><div class="line"><span>日期</span><span id="record-date"></span></div><div class="line"><span>板材</span><span id="record-plate"></span></div><div class="line"><span>型材</span><span id="record-section"></span></div></div><div id="target-status" class="callout" role="status" hidden></div></div></section>
<div class="action-row"><button id="source-test">仅测试 93 读取</button><button id="run" disabled>执行本日期</button></div>
<details class="runs"><summary>运行记录 <small id="run-count"></small></summary><div class="runs-body" id="runs-body"><p class="muted">暂无运行记录</p></div></details>
</main>
<dialog id="settings" aria-labelledby="settings-title"><form id="settings-form"><header><h2 id="settings-title">任务设置</h2><button type="button" class="icon quiet" data-close="settings" aria-label="关闭任务设置">✕</button></header><label>任务名称<input id="task-name" required maxlength="80"></label><div class="section"><h3>93 系统连接</h3><label>材料入库业务页面<input type="url" id="url" required placeholder="http://服务器/业务页面"></label><div class="two"><label>用户名<input id="username" required autocomplete="off"></label><label>密码<input id="password" type="password" placeholder="已保存；留空不修改" autocomplete="new-password"></label></div></div><div class="section"><div class="switch-row"><div><h3>定时入库</h3><small>填报前一天</small></div><button type="button" id="toggle" class="toggle" role="switch" aria-checked="false" aria-label="定时入库"></button></div><label>每天执行时间<input id="run-time" type="time" step="60" required></label><p id="schedule-hint" class="muted" style="margin-top:12px">完成一次“生成预览”后可启用。</p></div><div class="section"><h3>固定写入目标</h3><p class="muted" style="margin-top:8px"><span id="settings-target-name">原材料入库数据库</span> · 业务、日期、板材、型材<br>Notion 连接与数据库目录在系统设置中维护。<br><button type="button" class="plain" id="system-settings">打开系统设置</button></p></div><p class="callout" id="settings-note">修改名称或连接后，需重新预览并启用定时任务。</p><div class="actions"><button type="button" data-close="settings">取消</button><button class="primary" type="submit">保存设置</button></div></form></dialog>
<dialog id="confirm" aria-labelledby="confirm-title"><header><h2 id="confirm-title">执行本日期</h2><button class="icon quiet" data-close="confirm" aria-label="关闭确认">✕</button></header><p id="confirm-copy"></p><p class="callout">执行时会重新读取并查重，以当时的数据为准；已有记录则跳过。</p><div class="actions"><button data-close="confirm">取消</button><button class="primary" id="confirm-run">确认执行</button></div></dialog>

</html>
`,kv=()=>{const n=new Date;return n.setDate(n.getDate()-1),`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}-${String(n.getDate()).padStart(2,"0")}`};function r0({id:n,...a}){const s=S.useRef(null),[o,u]=S.useState("");return S.useEffect(()=>{let h=!1,f;const m=s.current;return u(""),be("notionFill.get",{id:n}).then(p=>{h||(f=mD(p,a),m.onload=()=>{var g;!h&&((g=m.contentDocument)!=null&&g.getElementById("date-picker"))&&f.connect(m.contentDocument)},m.srcdoc=hD.replace("../../src/ProductionAssistant.App/Assets/Fonts/Inter.ttf",new URL(Ib,window.location.href).href).replace("../../src/ProductionAssistant.App/Assets/Fonts/NotoSansSC.ttf",new URL(e0,window.location.href).href))}).catch(p=>{h||u(String(p.message||p))}),()=>{h=!0,m.onload=null,f==null||f.dispose()}},[n]),l.jsxs("div",{className:"message-template-host",children:[o&&l.jsx("p",{role:"alert",children:o}),l.jsx("iframe",{ref:s,title:"原材料自动入库"})]})}function mD(n,a){let s={...n,runTime:n.runTime||"00:00"},o,u,h=!1,f=!1,m=0,p=0,g=kv(),v,x=s.isEnabled;const b=P=>o.getElementById(P),j=P=>b(P),E=P=>b(P),T=P=>b(P),D=P=>P instanceof Error?P.message:String(P),O=P=>P.toLocaleString("zh-CN",{minimumFractionDigits:3,maximumFractionDigits:3});function k(P,ne=!1){b("feedback").textContent=P,b("feedback").className=ne?"callout error":""}function B(){return!!(s.sourcePageUrl&&s.username&&s.passwordConfigured)}function _(){u==null||u.render(l.jsx(Ya,{value:g,disabled:f,onChange:N}))}function U(){for(const P of["preview","source-test","yesterday","settings-open","back","confirm-run"])E(P).disabled=f;E("preview").disabled=f||!B()||!s.notionConfigured,E("source-test").disabled=f||!B(),E("run").disabled=f||!v,o.querySelectorAll("#settings button, #settings input").forEach(P=>P.disabled=f),E("toggle").disabled=f||!s.schedulingAvailable,E("preview").textContent=f?"处理中…":"生成预览",b("name").textContent=s.name,b("enabled").textContent=s.isEnabled?s.schedulerInstalled?"已启用":"计划异常":"未启用",b("target-name").textContent=s.targetDataSourceName,b("settings-target-name").textContent=s.targetDataSourceName,j("password").placeholder=s.passwordConfigured?"已保存；留空不修改":"请输入 93 系统密码",_()}function q(P="尚未生成预览"){m++,v=void 0,b("source-empty").hidden=!1,b("source-values").hidden=!0,b("source-error").hidden=!0,b("record").hidden=!0,b("target-status").hidden=!0,b("target-empty").hidden=!1,b("target-empty").querySelector("strong").textContent=P,b("target-empty").querySelector("span").textContent="预览只读取数据，不会新增记录",E("run").textContent="执行本日期",E("run").disabled=!0,T("confirm").open&&T("confirm").close()}function N(P){f||(g=P,j("date").value=P,q("待重新预览"),k(""),_())}function M(P){b("source-empty").hidden=!0,b("source-values").hidden=!1;for(const[ne,C]of[["plate",P.plateWeight],["section",P.sectionWeight],["total",P.totalWeight]])b(ne).textContent=O(C)}function V(P){M(P),b("target-empty").hidden=!0,b("record").hidden=!1,b("record-title").textContent=`${P.businessDate} 入库`,b("record-date").textContent=P.businessDate,b("record-plate").textContent=`${O(P.plateWeight)} 吨`,b("record-section").textContent=`${O(P.sectionWeight)} 吨`,b("target-status").hidden=!1,b("target-status").textContent=P.targetRecordExists?"该日期已有记录，无需新增。":"可新增 1 条入库记录。",E("run").textContent=P.targetRecordExists?"验证查重":"执行本日期"}function $(P){b("run-count").textContent=P.length?`· ${P.length}`:"";const ne=P.map(C=>{const R=o.createElement("div");R.className="run";const I=o.createElement("span");I.textContent={"source-test":"93 测试",test:"只读预览",manual:"手动执行",automatic:"自动执行"}[C.source]||C.source;const ie=o.createElement("div");ie.textContent=C.error||C.message||(C.status==="created"?"已新增":C.status==="failed"?"执行失败":"已检查"),C.status==="failed"&&(ie.style.color="#B91C1C");const oe=o.createElement("p");oe.textContent=C.status==="failed"?C.businessDate:`${C.businessDate} · 板材 ${O(C.plateWeight)} 吨 · 型材 ${O(C.sectionWeight)} 吨`,ie.append(oe);const fe=o.createElement("small");return fe.textContent=C.time,R.append(I,ie,fe),R});b("runs-body").replaceChildren(...ne),P.length||(b("runs-body").textContent="暂无运行记录")}async function J(){const P=++p;try{const ne=await be("notionFill.runs",{id:s.id});!h&&P===p&&$(ne.runs)}catch(ne){!h&&P===p&&(b("runs-body").textContent=`运行记录读取失败：${D(ne)}；重新展开可重试。`)}}function re(){Promise.resolve(a.changed()).catch(()=>{})}async function pe(P){if(f||!g)return;f=!0,q("正在读取…");const ne=m;U(),k("");try{const C=await be(P?"notionFill.testSource":"notionFill.test",{id:s.id,businessDate:g},12e4);if(h||ne!==m)return;if(!C.succeeded)throw new Error(C.message||"读取失败");P?(M(C),b("target-empty").querySelector("strong").textContent="尚未检查 Notion",b("target-empty").querySelector("span").textContent="点击“生成预览”完成读取与查重"):(s.validated=!0,v=C,V(C)),re()}catch(C){if(h||ne!==m)return;q("本次预览未完成"),b("source-error").hidden=!1,b("source-error").textContent=D(C)}finally{h||(f=!1,U(),J())}}async function le(){if(f||!v||!T("confirm").open)return;const P=v.businessDate;T("confirm").close(),f=!0,U(),k("");try{const ne=await be("notionFill.runNow",{id:s.id,businessDate:P},12e4);if(h)return;if(!ne.succeeded)throw new Error(ne.message||"执行失败");v={...v,targetRecordExists:!0},b("target-status").textContent=ne.message,E("run").textContent="验证查重",k(ne.created?"Notion 写入成功。":"该日期已有记录，本次已跳过。"),re()}catch(ne){h||(q("执行未完成，请重新预览"),k(D(ne),!0))}finally{h||(f=!1,U(),J())}}function ve(){return j("task-name").value.trim()!==s.name||j("url").value.trim().replace(/\/+$/,"")!==s.sourcePageUrl||j("username").value.trim()!==s.username||!!j("password").value}function H(){E("toggle").setAttribute("aria-checked",String(x)),b("schedule-hint").textContent=s.schedulingAvailable?ve()?"配置已修改：保存后需重新预览，再启用。":s.isEnabled&&!s.schedulerInstalled?s.schedulerMessage:s.validated?"只读预览已通过，可以启用定时入库。":"完成一次“生成预览”后可启用。":"当前运行环境不支持定时启停，预览与手动执行仍可使用。"}async function se(P){if(P.preventDefault(),f)return;const ne=j("task-name").value.trim(),C=j("username").value.trim();if(!ne||!C){b("settings-note").textContent="任务名称和用户名不能为空。";return}const R=ve(),I=j("run-time").value;if(!/^([01]\d|2[0-3]):[0-5]\d$/.test(I)){b("settings-note").textContent="请选择有效的执行时间。";return}const ie=R||I!==s.runTime,oe=R?!1:x;let fe=!1;f=!0,U();try{if(ie){const ae=j("url").value.trim().replace(/\/+$/,""),Q=j("password").value;if(await be("notionFill.save",{id:s.id,name:ne,sourcePageUrl:ae,username:C,password:Q,runTime:I}),h)return;fe=!0,s={...s,name:ne,sourcePageUrl:ae,username:C,runTime:I,passwordConfigured:s.passwordConfigured||!!Q,isEnabled:R?!1:s.isEnabled,validated:R?!1:s.validated},j("password").value="",R&&q("配置已修改，请重新预览")}if(oe!==s.isEnabled){const ae=await be("automation.setEnabled",{id:s.id,taskType:"notion_fill",enabled:oe});if(h)return;if(s.isEnabled=ae.enabled,ae.enabled!==oe)throw new Error(ae.message||"定时任务状态未更新");fe=!0}const ye=await be("notionFill.get",{id:s.id});if(h)return;s=ye,T("settings").close(),k(R?"配置已保存，请重新预览后启用。":"任务设置已保存。")}catch(ye){h||(b("settings-note").textContent=`${fe?"设置已更新，但后续操作失败：":""}${D(ye)}`)}finally{h||(f=!1,x=s.isEnabled,U(),H(),fe&&re())}}async function K(){if(f||h)return;const P=m;try{const ne=await be("notionFill.get",{id:s.id});if(h||f||P!==m)return;s=ne,q("系统设置已更新，请重新预览"),U(),k(s.notionConfigured?"系统设置已更新，点击“生成预览”读取数据。":"Notion 连接尚未配置，仍可仅测试 93 读取。")}catch(ne){h||k(D(ne),!0)}}return{connect(P){u==null||u.unmount(),o=P;const ne=o.createElement("style");ne.textContent=Jb+`
`+Wb+`
body{color:#292524}#date-picker{width:163px;display:inline-block}`,o.head.append(ne);const C=o.createElement("span");C.className="production-message-demo",C.hidden=!0,o.body.append(C),u=lf.createRoot(b("date-picker")),j("date").value=g,j("date").onchange=()=>N(j("date").value),E("yesterday").onclick=()=>N(kv()),E("preview").onclick=()=>{pe(!1)},E("source-test").onclick=()=>{pe(!0)},E("back").onclick=a.back,E("run").onclick=()=>{f||!v||(b("confirm-title").textContent=v.targetRecordExists?"验证查重":"执行本日期",b("confirm-copy").textContent=v.targetRecordExists?`${v.businessDate} 已有记录，本次执行应跳过。`:`将向“${s.targetDataSourceName}”新增 ${v.businessDate} 的记录：板材 ${O(v.plateWeight)} 吨，型材 ${O(v.sectionWeight)} 吨。`,T("confirm").showModal())},E("confirm-run").onclick=()=>{le()},E("settings-open").onclick=()=>{j("task-name").value=s.name,j("url").value=s.sourcePageUrl,j("username").value=s.username,j("password").value="",j("run-time").value=s.runTime,j("password").required=!s.passwordConfigured,b("settings-note").textContent="修改名称或连接后，需重新预览并启用定时任务。",x=s.isEnabled,H(),T("settings").showModal()},E("toggle").onclick=()=>{if(s.schedulingAvailable){if(!x&&(!s.validated||ve())){b("schedule-hint").textContent="请先保存配置并完成“生成预览”，再启用定时入库。";return}x=!x,H()}};for(const R of["task-name","url","username","password"])j(R).oninput=()=>{ve()&&(x=!1),H()};b("settings-form").onsubmit=R=>{se(R)},T("settings").onclose=()=>{j("password").value=""},T("settings").oncancel=R=>{f&&R.preventDefault()},o.querySelectorAll("[data-close]").forEach(R=>R.onclick=()=>{f||T(R.dataset.close).close()}),E("system-settings").hidden=!a.openSettings,E("system-settings").onclick=()=>{var R;T("settings").close(),(R=a.openSettings)==null||R.call(a)},o.querySelector(".runs").ontoggle=R=>{R.currentTarget.open&&J()},window.addEventListener("production-settings-updated",K),q(),U(),B()?s.notionConfigured||k("Notion 连接尚未配置，请从任务设置打开系统设置；仍可仅测试 93 读取。"):k("请先在任务设置中补全 93 系统连接配置。")},dispose(){h=!0,m++,p++,u==null||u.unmount(),window.removeEventListener("production-settings-updated",K)}}}var pD=Object.defineProperty,$a=(n,a)=>pD(n,"name",{value:a,configurable:!0}),a0=!!(typeof window<"u"&&window.document&&window.document.createElement);function pr(n,a,{checkForDefaultPrevented:s=!0}={}){return $a(function(u){if(n==null||n(u),s===!1||!u||!u.defaultPrevented)return a==null?void 0:a(u)},"handleEvent")}$a(pr,"composeEventHandlers");function gD(n){var a;if(!a0)throw new Error("Cannot access window outside of the DOM");return((a=n==null?void 0:n.ownerDocument)==null?void 0:a.defaultView)??window}$a(gD,"getOwnerWindow");function $d(n){if(!a0)throw new Error("Cannot access document outside of the DOM");return(n==null?void 0:n.ownerDocument)??document}$a($d,"getOwnerDocument");function i0(n,a=!1){const{activeElement:s}=$d(n);if(!(s!=null&&s.nodeName))return null;if(s0(s)&&s.contentDocument)return i0(s.contentDocument.body,a);if(a){const o=s.getAttribute("aria-activedescendant");if(o){const u=$d(s).getElementById(o);if(u)return u}}return s}$a(i0,"getActiveElement");function s0(n){return n.tagName==="IFRAME"}$a(s0,"isFrame");var yD=Object.defineProperty,Gf=(n,a)=>yD(n,"name",{value:a,configurable:!0});function Kd(n,a){if(typeof n=="function")return n(a);n!=null&&(n.current=a)}Gf(Kd,"setRef");function o0(...n){return a=>{let s=!1;const o=n.map(u=>{const h=Kd(u,a);return!s&&typeof h=="function"&&(s=!0),h});if(s)return()=>{for(let u=0;u<o.length;u++){const h=o[u];typeof h=="function"?h():Kd(n[u],null)}}}}Gf(o0,"composeRefs");function Ka(...n){return S.useCallback(o0(...n),n)}Gf(Ka,"useComposedRefs");var vD=Object.defineProperty,Jt=(n,a)=>vD(n,"name",{value:a,configurable:!0});function xD(n,a){const s=S.createContext(a);s.displayName=n+"Context";const o=Jt(h=>{const{children:f,...m}=h,p=S.useMemo(()=>m,Object.values(m));return l.jsx(s.Provider,{value:p,children:f})},"Provider");o.displayName=n+"Provider";function u(h,f={}){const{optional:m=!1}=f,p=S.useContext(s);if(p)return p;if(a!==void 0)return a;if(!m)throw new Error(`\`${h}\` must be used within \`${n}\``)}return Jt(u,"useContext"),[o,u]}Jt(xD,"createContext");function l0(n,a=[]){let s=[];function o(h,f){const m=S.createContext(f);m.displayName=h+"Context";const p=s.length;s=[...s,f];const g=Jt(x=>{var O;const{scope:b,children:j,...E}=x,T=((O=b==null?void 0:b[n])==null?void 0:O[p])||m,D=S.useMemo(()=>E,Object.values(E));return l.jsx(T.Provider,{value:D,children:j})},"Provider");g.displayName=h+"Provider";function v(x,b,j={}){var O;const{optional:E=!1}=j,T=((O=b==null?void 0:b[n])==null?void 0:O[p])||m,D=S.useContext(T);if(D)return D;if(f!==void 0)return f;if(!E)throw new Error(`\`${x}\` must be used within \`${h}\``)}return Jt(v,"useContext"),[g,v]}Jt(o,"createContext");const u=Jt(()=>{const h=s.map(f=>S.createContext(f));return Jt(function(m){const p=(m==null?void 0:m[n])||h;return S.useMemo(()=>({[`__scope${n}`]:{...m,[n]:p}}),[m,p])},"useScope")},"createScope");return u.scopeName=n,[o,c0(u,...a)]}Jt(l0,"createContextScope");function c0(...n){const a=n[0];if(n.length===1)return a;const s=Jt(()=>{const o=n.map(u=>({useScope:u(),scopeName:u.scopeName}));return Jt(function(h){const f=o.reduce((m,{useScope:p,scopeName:g})=>{const x=p(h)[`__scope${g}`];return{...m,...x}},{});return S.useMemo(()=>({[`__scope${a.scopeName}`]:f}),[f])},"useComposedScopes")},"createScope");return s.scopeName=a.scopeName,s}Jt(c0,"composeContextScopes");var vr=globalThis!=null&&globalThis.document?S.useLayoutEffect:()=>{},bD=Object.defineProperty,SD=(n,a)=>bD(n,"name",{value:a,configurable:!0}),wD=is[" useId ".trim().toString()]||(()=>{}),jD=0;function Jo(n){const[a,s]=S.useState(wD());return vr(()=>{n||s(o=>o??String(jD++))},[n]),n||(a?`radix-${a}`:"")}SD(Jo,"useId");var ED=Object.defineProperty,TD=(n,a)=>ED(n,"name",{value:a,configurable:!0}),Rv=is[" useEffectEvent ".trim().toString()],Ov=is[" useInsertionEffect ".trim().toString()];function u0(n){if(typeof Rv=="function")return Rv(n);const a=S.useRef(()=>{throw new Error("Cannot call an event handler while rendering.")});return typeof Ov=="function"?Ov(()=>{a.current=n}):vr(()=>{a.current=n}),S.useMemo(()=>((...s)=>{var o;return(o=a.current)==null?void 0:o.call(a,...s)}),[])}TD(u0,"useEffectEvent");var CD=Object.defineProperty,ds=(n,a)=>CD(n,"name",{value:a,configurable:!0}),DD=is[" useInsertionEffect ".trim().toString()]||vr;function d0({prop:n,defaultProp:a,onChange:s=ds(()=>{},"onChange"),caller:o}){const[u,h,f]=f0({defaultProp:a,onChange:s}),m=n!==void 0,p=m?n:u,g=S.useCallback(v=>{var x;if(m){const b=h0(v)?v(n):v;b!==n&&((x=f.current)==null||x.call(f,b))}else h(v)},[m,n,h,f]);return[p,g]}ds(d0,"useControllableState");function f0({defaultProp:n,onChange:a}){const[s,o]=S.useState(n),u=S.useRef(s),h=S.useRef(a);return DD(()=>{h.current=a},[a]),S.useEffect(()=>{var f;u.current!==s&&((f=h.current)==null||f.call(h,s),u.current=s)},[s,u]),[s,o,h]}ds(f0,"useUncontrolledState");function h0(n){return typeof n=="function"}ds(h0,"isFunction");var zv=Symbol("RADIX:SYNC_STATE");function ND(n,a,s,o){const{prop:u,defaultProp:h,onChange:f,caller:m}=a,p=u!==void 0,g=u0(f),v=[{...s,state:h}];o&&v.push(o);const[x,b]=S.useReducer((D,O)=>{if(O.type===zv)return{...D,state:O.state};const k=n(D,O);return p&&!Object.is(k.state,D.state)&&g(k.state),k},...v),j=x.state,E=S.useRef(j);S.useEffect(()=>{E.current!==j&&(E.current=j,p||g(j))},[j,E,p]);const T=S.useMemo(()=>u!==void 0?{...x,state:u}:x,[x,u]);return S.useEffect(()=>{p&&!Object.is(u,x.state)&&b({type:zv,state:u})},[u,x.state,p]),[T,b]}ds(ND,"useControllableStateReducer");var AD=Object.defineProperty,ln=(n,a)=>AD(n,"name",{value:a,configurable:!0});function Pf(n){const a=S.forwardRef((s,o)=>{let{children:u,...h}=s,f=null,m=!1;const p=[];Zd(u)&&typeof Vo=="function"&&(u=Vo(u._payload)),S.Children.forEach(u,b=>{var j;if(y0(b)){m=!0;const E=b;let T="child"in E.props?E.props.child:E.props.children;Zd(T)&&typeof Vo=="function"&&(T=Vo(T._payload)),f=kD(E,T),p.push((j=f==null?void 0:f.props)==null?void 0:j.children)}else p.push(b)}),f?f=S.cloneElement(f,void 0,p):!m&&S.Children.count(u)===1&&S.isValidElement(u)&&(f=u);const g=f?g0(f):void 0,v=Ka(o,g);if(!f){if(u||u===0)throw new Error(m?zD(n):OD(n));return u}const x=p0(h,f.props??{});return f.type!==S.Fragment&&(x.ref=o?v:g),S.cloneElement(f,x)});return a.displayName=`${n}.Slot`,a}ln(Pf,"createSlot");var m0=Symbol.for("radix.slottable");function MD(n){const a=ln(s=>"child"in s?s.children(s.child):s.children,"Slottable");return a.displayName=`${n}.Slottable`,a.__radixId=m0,a}ln(MD,"createSlottable");var kD=ln((n,a)=>{if("child"in n.props){const s=n.props.child;return S.isValidElement(s)?S.cloneElement(s,void 0,n.props.children(s.props.children)):null}return S.isValidElement(a)?a:null},"getSlottableElementFromSlottable");function p0(n,a){const s={...a};for(const o in a){const u=n[o],h=a[o];/^on[A-Z]/.test(o)?u&&h?s[o]=(...m)=>{const p=h(...m);return u(...m),p}:u&&(s[o]=u):o==="style"?s[o]={...u,...h}:o==="className"&&(s[o]=[u,h].filter(Boolean).join(" "))}return{...n,...s}}ln(p0,"mergeProps");function g0(n){var o,u;let a=(o=Object.getOwnPropertyDescriptor(n.props,"ref"))==null?void 0:o.get,s=a&&"isReactWarning"in a&&a.isReactWarning;return s?n.ref:(a=(u=Object.getOwnPropertyDescriptor(n,"ref"))==null?void 0:u.get,s=a&&"isReactWarning"in a&&a.isReactWarning,s?n.props.ref:n.props.ref||n.ref)}ln(g0,"getElementRef");function y0(n){return S.isValidElement(n)&&typeof n.type=="function"&&"__radixId"in n.type&&n.type.__radixId===m0}ln(y0,"isSlottable");var RD=Symbol.for("react.lazy");function Zd(n){return n!=null&&typeof n=="object"&&"$$typeof"in n&&n.$$typeof===RD&&"_payload"in n&&v0(n._payload)}ln(Zd,"isLazyComponent");function v0(n){return typeof n=="object"&&n!==null&&"then"in n}ln(v0,"isPromiseLike");var OD=ln(n=>`${n} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`,"createSlotError"),zD=ln(n=>`${n} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`,"createSlottableError"),Vo=is[" use ".trim().toString()],_D=Object.defineProperty,VD=(n,a)=>_D(n,"name",{value:a,configurable:!0}),BD=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","select","span","svg","ul"],Xr=BD.reduce((n,a)=>{const s=Pf(`Primitive.${a}`),o=S.forwardRef((u,h)=>{const{asChild:f,...m}=u,p=f?s:a;return typeof window<"u"&&(window[Symbol.for("radix-ui")]=!0),l.jsx(p,{...m,ref:h})});return o.displayName=`Primitive.${a}`,{...n,[a]:o}},{});function x0(n,a){n&&qf.flushSync(()=>n.dispatchEvent(a))}VD(x0,"dispatchDiscreteCustomEvent");var LD=Object.defineProperty,UD=(n,a)=>LD(n,"name",{value:a,configurable:!0});function Ga(n){const a=S.useRef(n);return S.useEffect(()=>{a.current=n}),S.useMemo(()=>((...s)=>{var o;return(o=a.current)==null?void 0:o.call(a,...s)}),[])}UD(Ga,"useCallbackRef");var HD=Object.defineProperty,lt=(n,a)=>HD(n,"name",{value:a,configurable:!0}),Qd="dismissableLayer.update",qD="dismissableLayer.pointerDownOutside",YD="dismissableLayer.focusOutside",_v,b0=S.createContext({layers:new Set,layersWithOutsidePointerEventsDisabled:new Set,branches:new Set,dismissableSurfaces:new Set}),GD=S.forwardRef(lt(function(a,s){const{disableOutsidePointerEvents:o=!1,deferPointerDownOutside:u=!1,onEscapeKeyDown:h,onPointerDownOutside:f,onFocusOutside:m,onInteractOutside:p,onDismiss:g,...v}=a,x=S.useContext(b0),[b,j]=S.useState(null),E=(b==null?void 0:b.ownerDocument)??(globalThis==null?void 0:globalThis.document),[,T]=S.useState({}),D=Ka(s,j),O=Array.from(x.layers),[k]=[...x.layersWithOutsidePointerEventsDisabled].slice(-1),B=k?O.indexOf(k):-1,_=b?O.indexOf(b):-1,U=x.layersWithOutsidePointerEventsDisabled.size>0,q=_>=B,N=S.useRef(!1),M=w0(re=>{f==null||f(re),p==null||p(re),re.defaultPrevented||g==null||g()},{ownerDocument:E,deferPointerDownOutside:u,isDeferredPointerDownOutsideRef:N,dismissableSurfaces:x.dismissableSurfaces,shouldHandlePointerDownOutside:S.useCallback(re=>{if(!(re instanceof Node))return!1;const pe=[...x.branches].some(le=>le.contains(re));return q&&!pe},[x.branches,q])}),V=j0(re=>{if(u&&N.current)return;const pe=re.target;[...x.branches].some(ve=>ve.contains(pe))||(m==null||m(re),p==null||p(re),re.defaultPrevented||g==null||g())},E),$=b?_===O.length-1:!1,J=Ga(re=>{re.key==="Escape"&&(h==null||h(re),!re.defaultPrevented&&g&&(re.preventDefault(),g()))});return S.useEffect(()=>{if($)return E.addEventListener("keydown",J,{capture:!0}),()=>E.removeEventListener("keydown",J,{capture:!0})},[E,$,J]),S.useEffect(()=>{if(b)return o&&(x.layersWithOutsidePointerEventsDisabled.size===0&&(_v=E.body.style.pointerEvents,E.body.style.pointerEvents="none"),x.layersWithOutsidePointerEventsDisabled.add(b)),x.layers.add(b),Jd(),()=>{o&&(x.layersWithOutsidePointerEventsDisabled.delete(b),x.layersWithOutsidePointerEventsDisabled.size===0&&(E.body.style.pointerEvents=_v))}},[b,E,o,x]),S.useEffect(()=>()=>{b&&(x.layers.delete(b),x.layersWithOutsidePointerEventsDisabled.delete(b),Jd())},[b,x]),S.useEffect(()=>{const re=lt(()=>T({}),"handleUpdate");return document.addEventListener(Qd,re),()=>document.removeEventListener(Qd,re)},[]),l.jsx(Xr.div,{...v,ref:D,style:{pointerEvents:U?q?"auto":"none":void 0,...a.style},onFocusCapture:pr(a.onFocusCapture,V.onFocusCapture),onBlurCapture:pr(a.onBlurCapture,V.onBlurCapture),onPointerDownCapture:pr(a.onPointerDownCapture,M.onPointerDownCapture)})},"DismissableLayer"));function S0(){const n=S.useContext(b0),[a,s]=S.useState(null);return S.useEffect(()=>{if(a)return n.dismissableSurfaces.add(a),()=>{n.dismissableSurfaces.delete(a)}},[a,n.dismissableSurfaces]),s}lt(S0,"useDismissableLayerSurface");var PD=lt(()=>!0,"IS_TRUE");function w0(n,a){const{ownerDocument:s=globalThis==null?void 0:globalThis.document,deferPointerDownOutside:o=!1,isDeferredPointerDownOutsideRef:u,dismissableSurfaces:h,shouldHandlePointerDownOutside:f=PD}=a,m=Ga(n),p=S.useRef(!1),g=S.useRef(!1),v=S.useRef(new Map),x=S.useRef(()=>{});return S.useEffect(()=>{function b(){g.current=!1,u.current=!1,v.current.clear()}lt(b,"resetOutsideInteraction");function j(){return Array.from(v.current.values()).some(Boolean)}lt(j,"isOutsideInteractionIntercepted");function E(B){if(!g.current)return;const _=B.target;_ instanceof Node&&[...h].some(q=>q.contains(_))||v.current.set(B.type,!0),B.type==="click"&&window.setTimeout(()=>{g.current&&x.current()},0)}lt(E,"handleInteractionCapture");function T(B){g.current&&v.current.set(B.type,!1)}lt(T,"handleInteractionBubble");const D=lt(B=>{if(B.target&&!p.current){let _=function(){s.removeEventListener("click",x.current);const q=j();b(),q||Ff(qD,m,U,{discrete:!0})};if(lt(_,"handleAndDispatchPointerDownOutsideEvent"),!f(B.target)){s.removeEventListener("click",x.current),b(),p.current=!1;return}const U={originalEvent:B};g.current=!0,u.current=o&&B.button===0,v.current.clear(),!o||B.button!==0?_():(s.removeEventListener("click",x.current),x.current=_,s.addEventListener("click",x.current,{once:!0}))}else s.removeEventListener("click",x.current),b();p.current=!1},"handlePointerDown"),O=["pointerup","mousedown","mouseup","touchstart","touchend","click"];for(const B of O)s.addEventListener(B,E,!0),s.addEventListener(B,T);const k=window.setTimeout(()=>{s.addEventListener("pointerdown",D)},0);return()=>{window.clearTimeout(k),s.removeEventListener("pointerdown",D),s.removeEventListener("click",x.current);for(const B of O)s.removeEventListener(B,E,!0),s.removeEventListener(B,T)}},[s,m,o,u,h,f]),{onPointerDownCapture:lt(()=>p.current=!0,"onPointerDownCapture")}}lt(w0,"usePointerDownOutside");function j0(n,a=globalThis==null?void 0:globalThis.document){const s=Ga(n),o=S.useRef(!1);return S.useEffect(()=>{const u=lt(h=>{h.target&&!o.current&&Ff(YD,s,{originalEvent:h},{discrete:!1})},"handleFocus");return a.addEventListener("focusin",u),()=>a.removeEventListener("focusin",u)},[a,s]),{onFocusCapture:lt(()=>o.current=!0,"onFocusCapture"),onBlurCapture:lt(()=>o.current=!1,"onBlurCapture")}}lt(j0,"useFocusOutside");function Jd(){const n=new CustomEvent(Qd);document.dispatchEvent(n)}lt(Jd,"dispatchUpdate");function Ff(n,a,s,{discrete:o}){const u=s.originalEvent.target,h=new CustomEvent(n,{bubbles:!1,cancelable:!0,detail:s});a&&u.addEventListener(n,a,{once:!0}),o?x0(u,h):u.dispatchEvent(h)}lt(Ff,"handleAndDispatchCustomEvent");var FD=Object.defineProperty,St=(n,a)=>FD(n,"name",{value:a,configurable:!0}),ud="focusScope.autoFocusOnMount",dd="focusScope.autoFocusOnUnmount",Vv={bubbles:!1,cancelable:!0},XD=S.forwardRef(St(function(a,s){const{loop:o=!1,trapped:u=!1,onMountAutoFocus:h,onUnmountAutoFocus:f,...m}=a,[p,g]=S.useState(null),v=Ga(h),x=Ga(f),b=S.useRef(null),j=Ka(s,g),E=S.useRef({paused:!1,pause(){this.paused=!0},resume(){this.paused=!1}}).current;S.useEffect(()=>{if(u){let D=function(_){if(E.paused||!p)return;const U=_.target;p.contains(U)?b.current=U:Un(b.current,{select:!0})},O=function(_){if(E.paused||!p)return;const U=_.relatedTarget;U!==null&&(p.contains(U)||Un(b.current,{select:!0}))},k=function(_){if(document.activeElement===document.body)for(const q of _)q.removedNodes.length>0&&Un(p)};St(D,"handleFocusIn"),St(O,"handleFocusOut"),St(k,"handleMutations"),document.addEventListener("focusin",D),document.addEventListener("focusout",O);const B=new MutationObserver(k);return p&&B.observe(p,{childList:!0,subtree:!0}),()=>{document.removeEventListener("focusin",D),document.removeEventListener("focusout",O),B.disconnect()}}},[u,p,E.paused]),S.useEffect(()=>{if(p){Bv.add(E);const D=document.activeElement;if(!p.contains(D)){const k=new CustomEvent(ud,Vv);p.addEventListener(ud,v),p.dispatchEvent(k),k.defaultPrevented||(E0(A0(Xf(p)),{select:!0}),document.activeElement===D&&Un(p))}return()=>{p.removeEventListener(ud,v),setTimeout(()=>{const k=new CustomEvent(dd,Vv);p.addEventListener(dd,x),p.dispatchEvent(k),k.defaultPrevented||Un(D??document.body,{select:!0}),p.removeEventListener(dd,x),Bv.remove(E)},0)}}},[p,v,x,E]);const T=S.useCallback(D=>{if(!o&&!u||E.paused)return;const O=D.key==="Tab"&&!D.altKey&&!D.ctrlKey&&!D.metaKey,k=document.activeElement;if(O&&k){const B=D.currentTarget,[_,U]=T0(B);_&&U?!D.shiftKey&&k===U?(D.preventDefault(),o&&Un(_,{select:!0})):D.shiftKey&&k===_&&(D.preventDefault(),o&&Un(U,{select:!0})):k===B&&D.preventDefault()}},[o,u,E.paused]);return l.jsx(Xr.div,{tabIndex:-1,...m,ref:j,onKeyDown:T})},"FocusScope"));function E0(n,{select:a=!1}={}){const s=document.activeElement;for(const o of n)if(Un(o,{select:a}),document.activeElement!==s)return}St(E0,"focusFirst");function T0(n){const a=Xf(n),s=Wd(a,n),o=Wd(a.reverse(),n);return[s,o]}St(T0,"getTabbableEdges");function Xf(n){const a=[],s=document.createTreeWalker(n,NodeFilter.SHOW_ELEMENT,{acceptNode:St(o=>{const u=o.tagName==="INPUT"&&o.type==="hidden";return o.disabled||o.hidden||u?NodeFilter.FILTER_SKIP:o.tabIndex>=0?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP},"acceptNode")});for(;s.nextNode();)a.push(s.currentNode);return a}St(Xf,"getTabbableCandidates");function Wd(n,a){const s=typeof a.checkVisibility=="function"&&a.checkVisibility({checkVisibilityCSS:!0});for(const o of n)if(!(s?!o.checkVisibility({checkVisibilityCSS:!0}):C0(o,{upTo:a})))return o}St(Wd,"findVisible");function C0(n,{upTo:a}){if(getComputedStyle(n).visibility==="hidden")return!0;for(;n;){if(a!==void 0&&n===a)return!1;if(getComputedStyle(n).display==="none")return!0;n=n.parentElement}return!1}St(C0,"isHidden");function D0(n){return n instanceof HTMLInputElement&&"select"in n}St(D0,"isSelectableInput");function Un(n,{select:a=!1}={}){if(n&&n.focus){const s=document.activeElement;n.focus({preventScroll:!0}),n!==s&&D0(n)&&a&&n.select()}}St(Un,"focus");var Bv=N0();function N0(){let n=[];return{add(a){const s=n[0];a!==s&&(s==null||s.pause()),n=Id(n,a),n.unshift(a)},remove(a){var s;n=Id(n,a),(s=n[0])==null||s.resume()}}}St(N0,"createFocusScopesStack");function Id(n,a){const s=[...n],o=s.indexOf(a);return o!==-1&&s.splice(o,1),s}St(Id,"arrayRemove");function A0(n){return n.filter(a=>a.tagName!=="A")}St(A0,"removeLinks");var $D=Object.defineProperty,KD=(n,a)=>$D(n,"name",{value:a,configurable:!0}),ZD=S.forwardRef(KD(function(a,s){var p;const{container:o,...u}=a,[h,f]=S.useState(!1);vr(()=>f(!0),[]);const m=o||h&&((p=globalThis==null?void 0:globalThis.document)==null?void 0:p.body);return m?qf.createPortal(l.jsx(Xr.div,{...u,ref:s}),m):null},"Portal")),QD=Object.defineProperty,Hn=(n,a)=>QD(n,"name",{value:a,configurable:!0});function M0(n,a){return S.useReducer((s,o)=>a[s][o]??s,n)}Hn(M0,"useStateMachine");var $f=Hn(n=>{const{present:a,children:s}=n,o=k0(a),u=typeof s=="function"?s({present:o.isPresent}):S.Children.only(s),h=R0(o.ref,O0(u));return typeof s=="function"||o.isPresent?S.cloneElement(u,{ref:h}):null},"Presence");function k0(n){const[a,s]=S.useState(),o=S.useRef(null),u=S.useRef(n),h=S.useRef("none"),f=S.useRef(void 0),m=n?"mounted":"unmounted",[p,g]=M0(m,{mounted:{UNMOUNT:"unmounted",ANIMATION_OUT:"unmountSuspended"},unmountSuspended:{MOUNT:"mounted",ANIMATION_END:"unmounted"},unmounted:{MOUNT:"mounted"}});return S.useEffect(()=>{p==="mounted"?(h.current=f.current??_a(o.current),f.current=void 0):h.current="none"},[p]),vr(()=>{const v=o.current,x=u.current;if(x!==n){const j=h.current,E=_a(v);n?(f.current=E,g("MOUNT")):E==="none"||(v==null?void 0:v.display)==="none"?g("UNMOUNT"):g(x&&j!==E?"ANIMATION_OUT":"UNMOUNT"),u.current=n}},[n,g]),vr(()=>{if(a){let v;const x=a.ownerDocument.defaultView??window,b=Hn(E=>{const D=_a(o.current).includes(CSS.escape(E.animationName));if(E.target===a&&D&&(g("ANIMATION_END"),!u.current)){const O=a.style.animationFillMode;a.style.animationFillMode="forwards",v=x.setTimeout(()=>{a.style.animationFillMode==="forwards"&&(a.style.animationFillMode=O)})}},"handleAnimationEnd"),j=Hn(E=>{E.target===a&&(h.current=_a(o.current))},"handleAnimationStart");return a.addEventListener("animationstart",j),a.addEventListener("animationcancel",b),a.addEventListener("animationend",b),()=>{x.clearTimeout(v),a.removeEventListener("animationstart",j),a.removeEventListener("animationcancel",b),a.removeEventListener("animationend",b)}}else g("ANIMATION_END")},[a,g]),{isPresent:["mounted","unmountSuspended"].includes(p),ref:S.useCallback(v=>{if(v){const x=getComputedStyle(v);o.current=x,f.current=_a(x)}else o.current=null;s(v)},[])}}Hn(k0,"usePresence");function ef(n,a){if(typeof n=="function")return n(a);n!=null&&(n.current=a)}Hn(ef,"setRef");function R0(...n){const a=S.useRef(n);return a.current=n,S.useCallback(s=>{const o=a.current;let u=!1;const h=o.map(f=>{const m=ef(f,s);return!u&&typeof m=="function"&&(u=!0),m});if(u)return()=>{for(let f=0;f<h.length;f++){const m=h[f];typeof m=="function"?m():ef(o[f],null)}}},[])}Hn(R0,"useStableComposedRefs");function _a(n){return(n==null?void 0:n.animationName)||"none"}Hn(_a,"getAnimationName");function O0(n){var o,u;let a=(o=Object.getOwnPropertyDescriptor(n.props,"ref"))==null?void 0:o.get,s=a&&"isReactWarning"in a&&a.isReactWarning;return s?n.ref:(a=(u=Object.getOwnPropertyDescriptor(n,"ref"))==null?void 0:u.get,s=a&&"isReactWarning"in a&&a.isReactWarning,s?n.props.ref:n.props.ref||n.ref)}Hn(O0,"getElementRef");var JD=Object.defineProperty,Kf=(n,a)=>JD(n,"name",{value:a,configurable:!0}),Bo=0,hn=null;function WD(n){return Zf(),n.children}Kf(WD,"FocusGuards");function Zf(){S.useEffect(()=>{hn||(hn={start:tf(),end:tf()});const{start:n,end:a}=hn;return document.body.firstElementChild!==n&&document.body.insertAdjacentElement("afterbegin",n),document.body.lastElementChild!==a&&document.body.insertAdjacentElement("beforeend",a),Bo++,()=>{Bo===1&&(hn==null||hn.start.remove(),hn==null||hn.end.remove(),hn=null),Bo=Math.max(0,Bo-1)}},[])}Kf(Zf,"useFocusGuards");function tf(){const n=document.createElement("span");return n.setAttribute("data-radix-focus-guard",""),n.tabIndex=0,n.style.outline="none",n.style.opacity="0",n.style.position="fixed",n.style.pointerEvents="none",n}Kf(tf,"createFocusGuard");var gn=function(){return gn=Object.assign||function(a){for(var s,o=1,u=arguments.length;o<u;o++){s=arguments[o];for(var h in s)Object.prototype.hasOwnProperty.call(s,h)&&(a[h]=s[h])}return a},gn.apply(this,arguments)};function z0(n,a){var s={};for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&a.indexOf(o)<0&&(s[o]=n[o]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var u=0,o=Object.getOwnPropertySymbols(n);u<o.length;u++)a.indexOf(o[u])<0&&Object.prototype.propertyIsEnumerable.call(n,o[u])&&(s[o[u]]=n[o[u]]);return s}function ID(n,a,s){if(s||arguments.length===2)for(var o=0,u=a.length,h;o<u;o++)(h||!(o in a))&&(h||(h=Array.prototype.slice.call(a,0,o)),h[o]=a[o]);return n.concat(h||Array.prototype.slice.call(a))}var Wo="right-scroll-bar-position",Io="width-before-scroll-bar",eN="with-scroll-bars-hidden",tN="--removed-body-scroll-bar-size";function fd(n,a){return typeof n=="function"?n(a):n&&(n.current=a),n}function nN(n,a){var s=S.useState(function(){return{value:n,callback:a,facade:{get current(){return s.value},set current(o){var u=s.value;u!==o&&(s.value=o,s.callback(o,u))}}}})[0];return s.callback=a,s.facade}var rN=typeof window<"u"?S.useLayoutEffect:S.useEffect,Lv=new WeakMap;function aN(n,a){var s=nN(null,function(o){return n.forEach(function(u){return fd(u,o)})});return rN(function(){var o=Lv.get(s);if(o){var u=new Set(o),h=new Set(n),f=s.current;u.forEach(function(m){h.has(m)||fd(m,null)}),h.forEach(function(m){u.has(m)||fd(m,f)})}Lv.set(s,n)},[n]),s}function iN(n){return n}function sN(n,a){a===void 0&&(a=iN);var s=[],o=!1,u={read:function(){if(o)throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");return s.length?s[s.length-1]:n},useMedium:function(h){var f=a(h,o);return s.push(f),function(){s=s.filter(function(m){return m!==f})}},assignSyncMedium:function(h){for(o=!0;s.length;){var f=s;s=[],f.forEach(h)}s={push:function(m){return h(m)},filter:function(){return s}}},assignMedium:function(h){o=!0;var f=[];if(s.length){var m=s;s=[],m.forEach(h),f=s}var p=function(){var v=f;f=[],v.forEach(h)},g=function(){return Promise.resolve().then(p)};g(),s={push:function(v){f.push(v),g()},filter:function(v){return f=f.filter(v),s}}}};return u}function oN(n){n===void 0&&(n={});var a=sN(null);return a.options=gn({async:!0,ssr:!1},n),a}var _0=function(n){var a=n.sideCar,s=z0(n,["sideCar"]);if(!a)throw new Error("Sidecar: please provide `sideCar` property to import the right car");var o=a.read();if(!o)throw new Error("Sidecar medium not found");return S.createElement(o,gn({},s))};_0.isSideCarExport=!0;function lN(n,a){return n.useMedium(a),_0}var V0=oN(),hd=function(){},Tl=S.forwardRef(function(n,a){var s=S.useRef(null),o=S.useState({onScrollCapture:hd,onWheelCapture:hd,onTouchMoveCapture:hd}),u=o[0],h=o[1],f=n.forwardProps,m=n.children,p=n.className,g=n.removeScrollBar,v=n.enabled,x=n.shards,b=n.sideCar,j=n.noRelative,E=n.noIsolation,T=n.inert,D=n.allowPinchZoom,O=n.as,k=O===void 0?"div":O,B=n.gapMode,_=z0(n,["forwardProps","children","className","removeScrollBar","enabled","shards","sideCar","noRelative","noIsolation","inert","allowPinchZoom","as","gapMode"]),U=b,q=aN([s,a]),N=gn(gn({},_),u);return S.createElement(S.Fragment,null,v&&S.createElement(U,{sideCar:V0,removeScrollBar:g,shards:x,noRelative:j,noIsolation:E,inert:T,setCallbacks:h,allowPinchZoom:!!D,lockRef:s,gapMode:B}),f?S.cloneElement(S.Children.only(m),gn(gn({},N),{ref:q})):S.createElement(k,gn({},N,{className:p,ref:q}),m))});Tl.defaultProps={enabled:!0,removeScrollBar:!0,inert:!1};Tl.classNames={fullWidth:Io,zeroRight:Wo};var cN=function(){if(typeof __webpack_nonce__<"u")return __webpack_nonce__};function uN(){if(!document)return null;var n=document.createElement("style");n.type="text/css";var a=cN();return a&&n.setAttribute("nonce",a),n}function dN(n,a){n.styleSheet?n.styleSheet.cssText=a:n.appendChild(document.createTextNode(a))}function fN(n){var a=document.head||document.getElementsByTagName("head")[0];a.appendChild(n)}var hN=function(){var n=0,a=null;return{add:function(s){n==0&&(a=uN())&&(dN(a,s),fN(a)),n++},remove:function(){n--,!n&&a&&(a.parentNode&&a.parentNode.removeChild(a),a=null)}}},mN=function(){var n=hN();return function(a,s){S.useEffect(function(){return n.add(a),function(){n.remove()}},[a&&s])}},B0=function(){var n=mN(),a=function(s){var o=s.styles,u=s.dynamic;return n(o,u),null};return a},pN={left:0,top:0,right:0,gap:0},md=function(n){return parseInt(n||"",10)||0},gN=function(n){var a=window.getComputedStyle(document.body),s=a[n==="padding"?"paddingLeft":"marginLeft"],o=a[n==="padding"?"paddingTop":"marginTop"],u=a[n==="padding"?"paddingRight":"marginRight"];return[md(s),md(o),md(u)]},yN=function(n){if(n===void 0&&(n="margin"),typeof window>"u")return pN;var a=gN(n),s=document.documentElement.clientWidth,o=window.innerWidth;return{left:a[0],top:a[1],right:a[2],gap:Math.max(0,o-s+a[2]-a[0])}},vN=B0(),Ua="data-scroll-locked",xN=function(n,a,s,o){var u=n.left,h=n.top,f=n.right,m=n.gap;return s===void 0&&(s="margin"),`
  .`.concat(eN,` {
   overflow: hidden `).concat(o,`;
   padding-right: `).concat(m,"px ").concat(o,`;
  }
  body[`).concat(Ua,`] {
    overflow: hidden `).concat(o,`;
    overscroll-behavior: contain;
    `).concat([a&&"position: relative ".concat(o,";"),s==="margin"&&`
    padding-left: `.concat(u,`px;
    padding-top: `).concat(h,`px;
    padding-right: `).concat(f,`px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(m,"px ").concat(o,`;
    `),s==="padding"&&"padding-right: ".concat(m,"px ").concat(o,";")].filter(Boolean).join(""),`
  }
  
  .`).concat(Wo,` {
    right: `).concat(m,"px ").concat(o,`;
  }
  
  .`).concat(Io,` {
    margin-right: `).concat(m,"px ").concat(o,`;
  }
  
  .`).concat(Wo," .").concat(Wo,` {
    right: 0 `).concat(o,`;
  }
  
  .`).concat(Io," .").concat(Io,` {
    margin-right: 0 `).concat(o,`;
  }
  
  body[`).concat(Ua,`] {
    `).concat(tN,": ").concat(m,`px;
  }
`)},Uv=function(){var n=parseInt(document.body.getAttribute(Ua)||"0",10);return isFinite(n)?n:0},bN=function(){S.useEffect(function(){return document.body.setAttribute(Ua,(Uv()+1).toString()),function(){var n=Uv()-1;n<=0?document.body.removeAttribute(Ua):document.body.setAttribute(Ua,n.toString())}},[])},SN=function(n){var a=n.noRelative,s=n.noImportant,o=n.gapMode,u=o===void 0?"margin":o;bN();var h=S.useMemo(function(){return yN(u)},[u]);return S.createElement(vN,{styles:xN(h,!a,u,s?"":"!important")})},nf=!1;if(typeof window<"u")try{var Lo=Object.defineProperty({},"passive",{get:function(){return nf=!0,!0}});window.addEventListener("test",Lo,Lo),window.removeEventListener("test",Lo,Lo)}catch{nf=!1}var ka=nf?{passive:!1}:!1,wN=function(n){return n.tagName==="TEXTAREA"},L0=function(n,a){if(!(n instanceof Element))return!1;var s=window.getComputedStyle(n);return s[a]!=="hidden"&&!(s.overflowY===s.overflowX&&!wN(n)&&s[a]==="visible")},jN=function(n){return L0(n,"overflowY")},EN=function(n){return L0(n,"overflowX")},Hv=function(n,a){var s=a.ownerDocument,o=a;do{typeof ShadowRoot<"u"&&o instanceof ShadowRoot&&(o=o.host);var u=U0(n,o);if(u){var h=H0(n,o),f=h[1],m=h[2];if(f>m)return!0}o=o.parentNode}while(o&&o!==s.body);return!1},TN=function(n){var a=n.scrollTop,s=n.scrollHeight,o=n.clientHeight;return[a,s,o]},CN=function(n){var a=n.scrollLeft,s=n.scrollWidth,o=n.clientWidth;return[a,s,o]},U0=function(n,a){return n==="v"?jN(a):EN(a)},H0=function(n,a){return n==="v"?TN(a):CN(a)},DN=function(n,a){return n==="h"&&a==="rtl"?-1:1},NN=function(n,a,s,o,u){var h=DN(n,window.getComputedStyle(a).direction),f=h*o,m=s.target,p=a.contains(m),g=!1,v=f>0,x=0,b=0;do{if(!m)break;var j=H0(n,m),E=j[0],T=j[1],D=j[2],O=T-D-h*E;(E||O)&&U0(n,m)&&(x+=O,b+=E);var k=m.parentNode;m=k&&k.nodeType===Node.DOCUMENT_FRAGMENT_NODE?k.host:k}while(!p&&m!==document.body||p&&(a.contains(m)||a===m));return(v&&Math.abs(x)<1||!v&&Math.abs(b)<1)&&(g=!0),g},Uo=function(n){return"changedTouches"in n?[n.changedTouches[0].clientX,n.changedTouches[0].clientY]:[0,0]},qv=function(n){return[n.deltaX,n.deltaY]},Yv=function(n){return n&&"current"in n?n.current:n},AN=function(n,a){return n[0]===a[0]&&n[1]===a[1]},MN=function(n){return`
  .block-interactivity-`.concat(n,` {pointer-events: none;}
  .allow-interactivity-`).concat(n,` {pointer-events: all;}
`)},kN=0,Ra=[];function RN(n){var a=S.useRef([]),s=S.useRef([0,0]),o=S.useRef(),u=S.useState(kN++)[0],h=S.useState(B0)[0],f=S.useRef(n);S.useEffect(function(){f.current=n},[n]),S.useEffect(function(){if(n.inert){document.body.classList.add("block-interactivity-".concat(u));var T=ID([n.lockRef.current],(n.shards||[]).map(Yv),!0).filter(Boolean);return T.forEach(function(D){return D.classList.add("allow-interactivity-".concat(u))}),function(){document.body.classList.remove("block-interactivity-".concat(u)),T.forEach(function(D){return D.classList.remove("allow-interactivity-".concat(u))})}}},[n.inert,n.lockRef.current,n.shards]);var m=S.useCallback(function(T,D){if("touches"in T&&T.touches.length===2||T.type==="wheel"&&T.ctrlKey)return!f.current.allowPinchZoom;var O=Uo(T),k=s.current,B="deltaX"in T?T.deltaX:k[0]-O[0],_="deltaY"in T?T.deltaY:k[1]-O[1],U,q=T.target,N=Math.abs(B)>Math.abs(_)?"h":"v";if("touches"in T&&N==="h"&&q.type==="range")return!1;var M=window.getSelection(),V=M&&M.anchorNode,$=V?V===q||V.contains(q):!1;if($)return!1;var J=Hv(N,q);if(!J)return!0;if(J?U=N:(U=N==="v"?"h":"v",J=Hv(N,q)),!J)return!1;if(!o.current&&"changedTouches"in T&&(B||_)&&(o.current=U),!U)return!0;var re=o.current||U;return NN(re,D,T,re==="h"?B:_)},[]),p=S.useCallback(function(T){var D=T;if(!(!Ra.length||Ra[Ra.length-1]!==h)){var O="deltaY"in D?qv(D):Uo(D),k=a.current.filter(function(U){return U.name===D.type&&(U.target===D.target||D.target===U.shadowParent)&&AN(U.delta,O)})[0];if(k&&k.should){D.cancelable&&D.preventDefault();return}if(!k){var B=(f.current.shards||[]).map(Yv).filter(Boolean).filter(function(U){return U.contains(D.target)}),_=B.length>0?m(D,B[0]):!f.current.noIsolation;_&&D.cancelable&&D.preventDefault()}}},[]),g=S.useCallback(function(T,D,O,k){var B={name:T,delta:D,target:O,should:k,shadowParent:ON(O)};a.current.push(B),setTimeout(function(){a.current=a.current.filter(function(_){return _!==B})},1)},[]),v=S.useCallback(function(T){s.current=Uo(T),o.current=void 0},[]),x=S.useCallback(function(T){g(T.type,qv(T),T.target,m(T,n.lockRef.current))},[]),b=S.useCallback(function(T){g(T.type,Uo(T),T.target,m(T,n.lockRef.current))},[]);S.useEffect(function(){return Ra.push(h),n.setCallbacks({onScrollCapture:x,onWheelCapture:x,onTouchMoveCapture:b}),document.addEventListener("wheel",p,ka),document.addEventListener("touchmove",p,ka),document.addEventListener("touchstart",v,ka),function(){Ra=Ra.filter(function(T){return T!==h}),document.removeEventListener("wheel",p,ka),document.removeEventListener("touchmove",p,ka),document.removeEventListener("touchstart",v,ka)}},[]);var j=n.removeScrollBar,E=n.inert;return S.createElement(S.Fragment,null,E?S.createElement(h,{styles:MN(u)}):null,j?S.createElement(SN,{noRelative:n.noRelative,gapMode:n.gapMode}):null)}function ON(n){for(var a=null;n!==null;)n instanceof ShadowRoot&&(a=n.host,n=n.host),n=n.parentNode;return a}const zN=lN(V0,RN);var q0=S.forwardRef(function(n,a){return S.createElement(Tl,gn({},n,{ref:a,sideCar:zN}))});q0.classNames=Tl.classNames;var _N=function(n){if(typeof document>"u")return null;var a=Array.isArray(n)?n[0]:n;return a.ownerDocument.body},Oa=new WeakMap,Ho=new WeakMap,qo={},pd=0,Y0=function(n){return n&&(n.host||Y0(n.parentNode))},VN=function(n,a){return a.map(function(s){if(n.contains(s))return s;var o=Y0(s);return o&&n.contains(o)?o:(console.error("aria-hidden",s,"in not contained inside",n,". Doing nothing"),null)}).filter(function(s){return!!s})},BN=function(n,a,s,o){var u=VN(a,Array.isArray(n)?n:[n]);qo[s]||(qo[s]=new WeakMap);var h=qo[s],f=[],m=new Set,p=new Set(u),g=function(x){!x||m.has(x)||(m.add(x),g(x.parentNode))};u.forEach(g);var v=function(x){!x||p.has(x)||Array.prototype.forEach.call(x.children,function(b){if(m.has(b))v(b);else try{var j=b.getAttribute(o),E=j!==null&&j!=="false",T=(Oa.get(b)||0)+1,D=(h.get(b)||0)+1;Oa.set(b,T),h.set(b,D),f.push(b),T===1&&E&&Ho.set(b,!0),D===1&&b.setAttribute(s,"true"),E||b.setAttribute(o,"true")}catch(O){console.error("aria-hidden: cannot operate on ",b,O)}})};return v(a),m.clear(),pd++,function(){f.forEach(function(x){var b=Oa.get(x)-1,j=h.get(x)-1;Oa.set(x,b),h.set(x,j),b||(Ho.has(x)||x.removeAttribute(o),Ho.delete(x)),j||x.removeAttribute(s)}),pd--,pd||(Oa=new WeakMap,Oa=new WeakMap,Ho=new WeakMap,qo={})}},LN=function(n,a,s){s===void 0&&(s="data-aria-hidden");var o=Array.from(Array.isArray(n)?n:[n]),u=_N(n);return u?(o.push.apply(o,Array.from(u.querySelectorAll("[aria-live], script"))),BN(o,u,s,"aria-hidden")):function(){return null}},UN=Object.defineProperty,en=(n,a)=>UN(n,"name",{value:a,configurable:!0}),Qf="Dialog",[G0,_A]=l0(Qf),[HN,xn]=G0(Qf),fl=en(n=>{const{__scopeDialog:a,children:s,open:o,defaultOpen:u,onOpenChange:h,modal:f=!0}=n,m=S.useRef(null),p=S.useRef(null),[g,v]=d0({prop:o,defaultProp:u??!1,onChange:h,caller:Qf}),[x,b]=S.useState(0),[j,E]=S.useState(0);return l.jsx(HN,{scope:a,triggerRef:m,contentRef:p,contentId:Jo(),titleId:Jo(),descriptionId:Jo(),titlePresent:x>0,descriptionPresent:j>0,setTitleCount:b,setDescriptionCount:E,open:g,onOpenChange:v,onOpenToggle:S.useCallback(()=>v(T=>!T),[v]),modal:f,children:s})},"Dialog"),P0="DialogPortal",[qN,F0]=G0(P0,{forceMount:void 0}),hl=en(n=>{const{__scopeDialog:a,forceMount:s,children:o,container:u}=n,h=xn(P0,a);return l.jsx(qN,{scope:a,forceMount:s,children:S.Children.map(o,f=>l.jsx($f,{present:s||h.open,children:l.jsx(ZD,{asChild:!0,container:u,children:f})}))})},"DialogPortal"),rf="DialogOverlay",ml=S.forwardRef(en(function(a,s){const o=F0(rf,a.__scopeDialog),{forceMount:u=o.forceMount,...h}=a,f=xn(rf,a.__scopeDialog);return f.modal?l.jsx($f,{present:u||f.open,children:l.jsx(GN,{...h,ref:s})}):null},"DialogOverlay")),YN=Pf("DialogOverlay.RemoveScroll"),GN=S.forwardRef(en(function(a,s){const{__scopeDialog:o,...u}=a,h=xn(rf,o),f=S0(),m=Ka(s,f);return l.jsx(q0,{as:YN,allowPinchZoom:!0,shards:[h.contentRef],children:l.jsx(Xr.div,{"data-state":Jf(h.open),...u,ref:m,style:{pointerEvents:"auto",...u.style}})})},"DialogOverlayImpl")),rs="DialogContent",pl=S.forwardRef(en(function(a,s){const o=F0(rs,a.__scopeDialog),{forceMount:u=o.forceMount,...h}=a,f=xn(rs,a.__scopeDialog);return l.jsx($f,{present:u||f.open,children:f.modal?l.jsx(PN,{...h,ref:s}):l.jsx(FN,{...h,ref:s})})},"DialogContent")),PN=S.forwardRef(en(function(a,s){const o=xn(rs,a.__scopeDialog),u=S.useRef(null),h=Ka(s,o.contentRef,u);return S.useEffect(()=>{const f=u.current;if(f)return LN(f)},[]),l.jsx(X0,{...a,ref:h,trapFocus:o.open,disableOutsidePointerEvents:o.open,onCloseAutoFocus:pr(a.onCloseAutoFocus,f=>{var m;f.preventDefault(),(m=o.triggerRef.current)==null||m.focus()}),onPointerDownOutside:pr(a.onPointerDownOutside,f=>{const m=f.detail.originalEvent,p=m.button===0&&m.ctrlKey===!0;(m.button===2||p)&&f.preventDefault()}),onFocusOutside:pr(a.onFocusOutside,f=>f.preventDefault())})},"DialogContentModal")),FN=S.forwardRef(en(function(a,s){const o=xn(rs,a.__scopeDialog),u=S.useRef(!1),h=S.useRef(!1);return l.jsx(X0,{...a,ref:s,trapFocus:!1,disableOutsidePointerEvents:!1,onCloseAutoFocus:f=>{var m,p;(m=a.onCloseAutoFocus)==null||m.call(a,f),f.defaultPrevented||(u.current||(p=o.triggerRef.current)==null||p.focus(),f.preventDefault()),u.current=!1,h.current=!1},onInteractOutside:f=>{var g,v;(g=a.onInteractOutside)==null||g.call(a,f),f.defaultPrevented||(u.current=!0,f.detail.originalEvent.type==="pointerdown"&&(h.current=!0));const m=f.target;((v=o.triggerRef.current)==null?void 0:v.contains(m))&&f.preventDefault(),f.detail.originalEvent.type==="focusin"&&h.current&&f.preventDefault()}})},"DialogContentNonModal")),X0=S.forwardRef(en(function(a,s){const{__scopeDialog:o,trapFocus:u,onOpenAutoFocus:h,onCloseAutoFocus:f,...m}=a,p=xn(rs,o);return Zf(),l.jsx(l.Fragment,{children:l.jsx(XD,{asChild:!0,loop:!0,trapped:u,onMountAutoFocus:h,onUnmountAutoFocus:f,children:l.jsx(GD,{role:"dialog",id:p.contentId,"aria-describedby":p.descriptionPresent?p.descriptionId:void 0,"aria-labelledby":p.titlePresent?p.titleId:void 0,"data-state":Jf(p.open),...m,ref:s,deferPointerDownOutside:!0,onDismiss:()=>p.onOpenChange(!1)})})})},"DialogContentImpl")),XN="DialogTitle",gl=S.forwardRef(en(function(a,s){const{__scopeDialog:o,...u}=a,h=xn(XN,o),{setTitleCount:f}=h;return vr(()=>(f(m=>m+1),()=>f(m=>m-1)),[f]),l.jsx(Xr.h2,{id:h.titleId,...u,ref:s})},"DialogTitle")),$N="DialogDescription",yl=S.forwardRef(en(function(a,s){const{__scopeDialog:o,...u}=a,h=xn($N,o),{setDescriptionCount:f}=h;return vr(()=>(f(m=>m+1),()=>f(m=>m-1)),[f]),l.jsx(Xr.p,{id:h.descriptionId,...u,ref:s})},"DialogDescription")),KN="DialogClose",vl=S.forwardRef(en(function(a,s){const{__scopeDialog:o,...u}=a,h=xn(KN,o);return l.jsx(Xr.button,{type:"button",...u,ref:s,onClick:pr(a.onClick,()=>h.onOpenChange(!1))})},"DialogClose"));function Jf(n){return n?"open":"closed"}en(Jf,"getState");function ZN({onCreated:n,onBack:a,onCancel:s}){const[o,u]=S.useState(2),[h,f]=S.useState("日报任务"),[m,p]=S.useState("17:30"),[g,v]=S.useState(!1),[x,b]=S.useState("");async function j(){v(!0),b("");try{const E=await be("daily.create",{name:h.trim(),sendTime:m});await n(E)}catch(E){b(E instanceof Error?E.message:String(E))}finally{v(!1)}}return l.jsxs(l.Fragment,{children:[l.jsx(QN,{current:o}),x&&l.jsx("div",{className:"notice error",role:"alert",children:l.jsxs("div",{children:[l.jsx("strong",{children:"创建失败"}),l.jsx("span",{children:x})]})}),o===2?l.jsxs("div",{className:"automation-create-step",children:[l.jsxs("div",{children:[l.jsx("h3",{children:"基本信息"}),l.jsx("p",{children:"名称用于在自动化任务列表中识别这份日报。"})]}),l.jsxs("label",{children:["任务名称",l.jsx("input",{value:h,autoFocus:!0,onChange:E=>f(E.target.value)})]}),l.jsxs("div",{className:"dialog-actions",children:[l.jsxs("button",{className:"ghost",onClick:a,children:[l.jsx(ns,{}),"返回选择类型"]}),l.jsx("button",{className:"primary",disabled:!h.trim(),onClick:()=>u(3),children:"下一步"})]})]}):l.jsxs("div",{className:"automation-create-step",children:[l.jsxs("div",{children:[l.jsx("h3",{children:"日报必要配置"}),l.jsx("p",{children:"先确定每天的发送时间；消息字段和测试发送在创建后的专用 Tab 中完成。"})]}),l.jsxs("label",{children:["每天发送时间",l.jsx("input",{type:"time",value:m,onChange:E=>p(E.target.value)})]}),l.jsxs("div",{className:"automation-create-summary",children:[l.jsx("span",{children:"任务类型"}),l.jsx("strong",{children:"日报推送"}),l.jsx("span",{children:"创建后继续"}),l.jsx("strong",{children:"消息内容 → 预览与测试"})]}),l.jsxs("div",{className:"dialog-actions",children:[l.jsxs("button",{className:"ghost",disabled:g,onClick:()=>u(2),children:[l.jsx(ns,{}),"上一步"]}),l.jsx("button",{className:"secondary",disabled:g,onClick:s,children:"取消"}),l.jsxs("button",{className:"primary",disabled:g||!m,onClick:j,children:[g&&l.jsx(Fr,{className:"spin"}),"创建任务"]})]})]})]})}function QN({current:n}){return l.jsxs("ol",{className:"automation-create-progress","aria-label":"新建任务进度",children:[l.jsx("li",{className:"done",children:"1 选择类型"}),l.jsx("li",{className:n===2?"current":"done",children:"2 基本信息"}),l.jsx("li",{className:n===3?"current":"",children:"3 必要配置"})]})}function JN({onCreated:n,onBack:a,onCancel:s}){const[o,u]=S.useState(2),[h,f]=S.useState("原材料入库自动填报"),[m,p]=S.useState(""),[g,v]=S.useState(""),[x,b]=S.useState(""),[j,E]=S.useState(!1),[T,D]=S.useState("");async function O(){E(!0),D("");try{const k=await be("notionFill.create",{name:h.trim(),sourcePageUrl:m.trim(),username:g.trim(),password:x});await n(k)}catch(k){D(k instanceof Error?k.message:String(k))}finally{E(!1)}}return l.jsxs(l.Fragment,{children:[l.jsx(WN,{current:o}),T&&l.jsx("div",{className:"notice error",role:"alert",children:l.jsxs("div",{children:[l.jsx("strong",{children:"创建失败"}),l.jsx("span",{children:T})]})}),o===2?l.jsxs("div",{className:"automation-create-step",children:[l.jsxs("div",{children:[l.jsx("h3",{children:"基本信息"}),l.jsx("p",{children:"名称用于在自动化任务列表中识别这份填报任务。"})]}),l.jsxs("label",{children:["任务名称",l.jsx("input",{value:h,autoFocus:!0,onChange:k=>f(k.target.value)})]}),l.jsxs("div",{className:"dialog-actions",children:[l.jsxs("button",{className:"ghost",onClick:a,children:[l.jsx(ns,{}),"返回选择类型"]}),l.jsx("button",{className:"primary",disabled:!h.trim(),onClick:()=>u(3),children:"下一步"})]})]}):l.jsxs("div",{className:"automation-create-step",children:[l.jsxs("div",{children:[l.jsx("h3",{children:"93 系统连接"}),l.jsx("p",{children:"凭据只归 NotionFill 任务所有，并使用现有 Windows 加密存储。"})]}),l.jsxs("label",{children:["材料入库业务页面",l.jsx("input",{type:"url",value:m,placeholder:"http://服务器/业务页面",autoFocus:!0,onChange:k=>p(k.target.value)})]}),l.jsxs("label",{children:["93 系统用户名",l.jsx("input",{value:g,autoComplete:"username",onChange:k=>v(k.target.value)})]}),l.jsxs("label",{children:["93 系统密码",l.jsx("input",{type:"password",value:x,autoComplete:"new-password",onChange:k=>b(k.target.value)})]}),l.jsxs("div",{className:"automation-create-summary",children:[l.jsx("span",{children:"填报目标"}),l.jsx("strong",{children:"原材料入库数据库"}),l.jsx("span",{children:"执行时间"}),l.jsx("strong",{children:"每天 00:00 · 填报前一天"}),l.jsx("span",{children:"写入方式"}),l.jsx("strong",{children:"按日期查重，仅新增"})]}),l.jsxs("div",{className:"dialog-actions",children:[l.jsxs("button",{className:"ghost",disabled:j,onClick:()=>u(2),children:[l.jsx(ns,{}),"上一步"]}),l.jsx("button",{className:"secondary",disabled:j,onClick:s,children:"取消"}),l.jsxs("button",{className:"primary",disabled:j||!m.trim()||!g.trim()||!x,onClick:O,children:[j&&l.jsx(Fr,{className:"spin"}),"创建任务"]})]})]})]})}function WN({current:n}){return l.jsxs("ol",{className:"automation-create-progress","aria-label":"新建任务进度",children:[l.jsx("li",{className:"done",children:"1 选择类型"}),l.jsx("li",{className:n===2?"current":"done",children:"2 基本信息"}),l.jsx("li",{className:n===3?"current":"",children:"3 必要配置"})]})}const $0=[{taskType:"daily_report",name:"日报推送",description:"查询日报数据、生成消息并发送钉钉。",renderCreate:n=>l.jsx(ZN,{...n}),taskTabs:[{id:"configuration",label:"任务配置"},{id:"execution",label:"运行与测试"}],resolveSection:n=>n==="basics"?"basics":n==="template"?"configuration":"execution",issueTitle:n=>n==="notification"?"通知渠道未就绪":n==="template"?"日报配置尚未验证":"基本信息不完整",renderEditor:n=>l.jsx(n0,{id:n.id,back:()=>n.navigate("list"),changed:n.changed,openSettings:n.openSettings}),loadRuns:n=>be("daily.runs",{id:n}).then(({runs:a})=>a.map(s=>({id:s.id,time:s.time,source:s.source,status:s.status,title:s.textSummary||`业务日期 ${s.businessDate||"—"}`,details:[`业务日期：${s.businessDate||"—"}`,`阶段：${s.stage}`,`尝试：${s.attempts}`],error:s.error})))},{taskType:"notion_fill",name:"Notion 自动填报",description:"读取 93 系统前一天入库数据并新增到 Notion。",renderCreate:n=>l.jsx(JN,{...n}),taskTabs:[{id:"configuration",label:"任务配置"},{id:"execution",label:"运行与测试"}],resolveSection:n=>n==="basics"?"basics":n==="test"?"execution":"configuration",issueTitle:n=>n==="connection"?"93 系统连接未就绪":n==="target"?"Notion 填报目标未就绪":n==="test"?"任务尚未完成只读测试":"基本信息不完整",renderEditor:n=>l.jsx(r0,{id:n.id,back:()=>n.navigate("list"),changed:n.changed,openSettings:n.openSettings}),loadRuns:n=>be("notionFill.runs",{id:n}).then(({runs:a})=>a.map(s=>({id:s.id,time:s.time,source:s.source==="source-test"?"93读取测试":s.source==="test"?"只读测试":s.source==="manual"?"手动执行":"自动执行",status:s.status==="created"?"已新增":s.status==="checked"?"已检查":"失败",title:`${s.businessDate} · 板材 ${s.plateWeight.toLocaleString("zh-CN",{maximumFractionDigits:3})} 吨 · 型材 ${s.sectionWeight.toLocaleString("zh-CN",{maximumFractionDigits:3})} 吨`,details:[s.message].filter(Boolean),error:s.error})))}];function Gv(n){return $0.find(a=>a.taskType===n)}const gd=n=>({tone:"error",title:"操作失败",message:n instanceof Error?n.message:String(n)});function IN({openSettings:n}){var N;const[a,s]=S.useState([]),[o,u]=S.useState(),[h,f]=S.useState(""),[m,p]=S.useState(""),[g,v]=S.useState(),[x,b]=S.useState(),[j,E]=S.useState(),[T,D]=S.useState(!1),[O,k]=S.useState(""),B=()=>be("automation.list").then(M=>{const V=Array.isArray(M.tasks)?M.tasks:a;return s(V),u($=>$&&(V.find(J=>J.taskType===$.taskType&&J.id===$.id)||$)),V});S.useEffect(()=>{B().catch(M=>v(gd(M)))},[]),S.useEffect(()=>{if(!x)return;const M=()=>b(void 0),V=$=>$.key==="Escape"&&M();return window.addEventListener("pointerdown",M),window.addEventListener("keydown",V),window.addEventListener("blur",M),()=>{window.removeEventListener("pointerdown",M),window.removeEventListener("keydown",V),window.removeEventListener("blur",M)}},[x]);async function _(M,V){const $=await B();D(!1),k(""),u($.find(J=>J.taskType===M&&J.id===V.id))}async function U(M){p(M.id),v(void 0);try{const V=await be("automation.setEnabled",{taskType:M.taskType,id:M.id,enabled:!M.isEnabled},6e4);V.missingStep?(f(V.missingStep),u(M),v({tone:"warning",title:"配置尚未完成",message:V.message||""})):await B()}catch(V){v(gd(V))}finally{p("")}}async function q(M){if(!M.isEnabled){p(M.id);try{await be("automation.delete",{taskType:M.taskType,id:M.id}),E(void 0),await B()}catch(V){v(gd(V))}finally{p("")}}}if(o){const M=Gv(o.taskType);if(M)return l.jsx(eA,{openSettings:n,task:o,definition:M,focusStep:h,notice:g,refresh:B,back:()=>{u(void 0),f(""),v(void 0),B()}})}return l.jsxs("div",{className:"page daily-page automation-list-page",children:[l.jsxs("header",{children:[l.jsxs("div",{children:[l.jsx("h1",{children:"自动化任务"}),l.jsx("p",{children:"管理定时推送与自动填报，查看任务配置和运行情况。"})]}),l.jsx("div",{className:"header-actions",children:l.jsxs("button",{className:"primary",onClick:()=>D(!0),children:[l.jsx(PC,{}),"新建任务"]})})]}),g&&l.jsx("div",{className:`notice ${g.tone}`,role:"status",children:l.jsxs("div",{children:[l.jsx("strong",{children:g.title}),l.jsx("span",{children:g.message})]})}),l.jsxs("section",{className:"daily-job-list","aria-label":"任务列表",children:[a.map(M=>l.jsxs("article",{className:`daily-job-card${["incomplete","pending-test","schedule-error"].includes(M.status)?" needs-attention":""}`,onClick:()=>u(M),onContextMenu:V=>{V.preventDefault(),b({task:M,x:Math.min(V.clientX,window.innerWidth-176),y:Math.min(V.clientY,window.innerHeight-58)})},children:[l.jsxs("div",{className:"job-copy",children:[l.jsx("h2",{children:l.jsx("button",{type:"button",className:"automation-task-name",onClick:V=>{V.stopPropagation(),u(M)},children:M.name||"未命名任务"})}),l.jsxs("p",{children:[M.taskTypeName," · ",M.schedule," · ",M.connectionStatus]})]}),l.jsxs("div",{className:"job-actions",onClick:V=>V.stopPropagation(),children:[l.jsx("span",{className:`job-status ${M.status}`,children:K0(M.status)}),l.jsxs("label",{className:"switch",children:[l.jsx("input",{type:"checkbox","aria-label":`启用${M.name||"未命名任务"}`,checked:M.isEnabled,disabled:!M.schedulingAvailable||m===M.id,title:M.schedulingAvailable?void 0:"Development 环境默认不启用定时任务",onChange:()=>U(M)}),l.jsx("span",{})]}),l.jsx("button",{type:"button",className:"automation-task-more","aria-label":`${M.name||"未命名任务"}的更多操作`,"aria-haspopup":"menu",onClick:V=>{const $=V.currentTarget.getBoundingClientRect();b({task:M,x:Math.min($.left,window.innerWidth-176),y:Math.min($.bottom+4,window.innerHeight-58)})},children:l.jsx(qC,{})})]}),l.jsxs("div",{className:"automation-card-footer",children:["最近运行：",M.lastRun]})]},`${M.taskType}:${M.id}`)),!a.length&&l.jsxs("div",{className:"empty-state",children:[l.jsx(YC,{}),l.jsx("h2",{children:"还没有自动化任务"}),l.jsx("p",{children:"选择一种任务类型，新建后进入对应的专用配置界面。"})]})]}),!!a.length&&l.jsx("p",{className:"automation-list-help",children:"点击任务名称进入配置。日报配置通知后即可开启，执行结果见运行记录。"}),x&&l.jsx("div",{className:"job-context-menu",role:"menu",style:{left:x.x,top:x.y},onPointerDown:M=>M.stopPropagation(),children:l.jsxs("button",{className:"danger-quiet",role:"menuitem",disabled:x.task.isEnabled||m===x.task.id,onClick:()=>{E(x.task),b(void 0)},children:[l.jsx(QC,{}),x.task.isEnabled?"停用后可删除":"删除任务"]})}),l.jsx(fl,{open:!!j,onOpenChange:M=>!M&&E(void 0),children:l.jsxs(hl,{children:[l.jsx(ml,{className:"dialog-overlay"}),l.jsxs(pl,{className:"dialog",children:[l.jsx(gl,{children:"删除自动化任务？"}),l.jsxs(yl,{children:["将删除“",j==null?void 0:j.name,"”及其业务记录，此操作无法撤销。"]}),l.jsxs("div",{className:"dialog-actions",children:[l.jsx("button",{className:"secondary",onClick:()=>E(void 0),children:"取消"}),l.jsx("button",{className:"danger",disabled:!!m,onClick:()=>j&&q(j),children:"确认删除"})]})]})]})}),l.jsx(fl,{open:T,onOpenChange:M=>{D(M),M||k("")},children:l.jsxs(hl,{children:[l.jsx(ml,{className:"dialog-overlay"}),l.jsxs(pl,{className:"dialog automation-create-dialog",children:[l.jsx(gl,{children:"新建自动化任务"}),l.jsx(yl,{children:O?"填写任务信息，创建后可随时通过 Tab 修改。":"先选择任务类型，后续配置由对应任务自己提供。"}),O?(N=Gv(O))==null?void 0:N.renderCreate({onCreated:M=>_(O,M),onBack:()=>k(""),onCancel:()=>{D(!1),k("")}}):l.jsx("div",{className:"automation-create-types",children:$0.map(M=>l.jsxs("button",{onClick:()=>k(M.taskType),children:[l.jsx("strong",{children:M.name}),l.jsx("span",{children:M.description})]},M.taskType))})]})]})})]})}function eA({openSettings:n,task:a,definition:s,focusStep:o,notice:u,refresh:h,back:f}){const[m,p]=S.useState(o?s.resolveSection(o):"basics"),g=a.taskType==="daily_report",[v,x]=S.useState(),[b,j]=S.useState(""),[E,T]=S.useState(!1),D=[{id:"basics",label:"基本信息"},...s.taskTabs,{id:"runs",label:"运行记录"}],O=[...a.missingMessage?[{id:`configuration:${a.missingStep||"unknown"}`,title:s.issueTitle(a.missingStep||""),message:a.missingMessage,section:s.resolveSection(a.missingStep||"")}]:[],...a.status==="schedule-error"&&a.schedulerMessage?[{id:"scheduler",title:"计划任务异常",message:a.schedulerMessage,section:"basics"}]:[]];async function k(){T(!0),j("");try{x(await s.loadRuns(a.id))}catch(_){j(_ instanceof Error?_.message:String(_))}finally{T(!1)}}S.useEffect(()=>{m==="runs"&&v===void 0&&k()},[m,v]);function B(_,U){var N;if(_.key!=="ArrowLeft"&&_.key!=="ArrowRight")return;_.preventDefault();const q=(U+(_.key==="ArrowRight"?1:-1)+D.length)%D.length;p(D[q].id),D[q].id==="basics"&&h().catch(()=>{}),(N=document.getElementById(`automation-tab-${D[q].id}`))==null||N.focus()}return g?l.jsx(n0,{id:a.id,back:f,changed:h,openSettings:n}):a.taskType==="notion_fill"?l.jsx(r0,{id:a.id,back:f,changed:h,openSettings:n}):l.jsxs("div",{className:"page daily-page automation-detail",children:[l.jsxs("header",{children:[l.jsxs("div",{children:[l.jsxs("button",{className:"back-link","aria-label":"返回任务列表",onClick:f,children:[l.jsx(ns,{}),"返回任务列表"]}),l.jsx("h1",{title:a.name||"未命名任务",children:a.name||"未命名任务"}),l.jsxs("p",{children:[a.taskTypeName," · ",a.schedule]})]}),l.jsx("span",{className:`job-status ${a.status}`,children:K0(a.status)})]}),l.jsx("div",{className:"automation-tabs",role:"tablist","aria-label":"任务详情",children:D.map((_,U)=>l.jsx("button",{type:"button",role:"tab",id:`automation-tab-${_.id}`,"aria-selected":m===_.id,"aria-controls":`automation-panel-${_.id}`,tabIndex:m===_.id?0:-1,onClick:()=>{p(_.id),_.id==="basics"&&h().catch(()=>{})},onKeyDown:q=>B(q,U),children:_.label},_.id))}),l.jsxs("div",{children:[u&&l.jsx("div",{className:`notice ${u.tone}`,role:"status",children:l.jsxs("div",{children:[l.jsx("strong",{children:u.title}),l.jsx("span",{children:u.message})]})}),!!O.length&&l.jsxs("section",{className:"automation-issues","aria-labelledby":"automation-issues-title",children:[l.jsxs("div",{className:"automation-issues-heading",children:[l.jsx(JC,{}),l.jsxs("div",{children:[l.jsx("h2",{id:"automation-issues-title",children:"配置问题"}),l.jsx("p",{children:"完成以下项目后才能安全启用任务。"})]}),l.jsxs("span",{children:[O.length," 项"]})]}),l.jsx("ul",{children:O.map(_=>{var U;return l.jsxs("li",{children:[l.jsxs("div",{children:[l.jsx("strong",{children:_.title}),l.jsx("span",{children:_.message})]}),l.jsxs("button",{type:"button",onClick:()=>{p(_.section)},children:["前往",((U=D.find(q=>q.id===_.section))==null?void 0:U.label)||"处理",l.jsx(_C,{})]})]},_.id)})})]}),l.jsxs("div",{className:"automation-tab-panel",role:"tabpanel",id:`automation-panel-${m}`,"aria-labelledby":`automation-tab-${m}`,children:[l.jsx("div",{hidden:m==="runs",children:s.renderEditor({id:a.id,section:m,openSettings:n,navigate:p,changed:()=>{h().catch(()=>{})}})}),m==="runs"&&l.jsxs("section",{className:"surface automation-runs",children:[l.jsxs("div",{className:"automation-runs-heading",children:[l.jsxs("div",{children:[l.jsx("h2",{children:"运行记录"}),l.jsx("p",{children:"查看任务执行结果和错误详情。"})]}),l.jsxs("button",{className:"secondary",disabled:E,onClick:k,children:[E?l.jsx(Fr,{className:"spin"}):l.jsx(FC,{}),"刷新"]})]}),b&&l.jsx("div",{className:"notice error",role:"alert",children:l.jsxs("div",{children:[l.jsx("strong",{children:"运行记录读取失败"}),l.jsx("span",{children:b})]})}),l.jsx("div",{className:"automation-run-list",children:v==null?void 0:v.map(_=>l.jsxs("details",{children:[l.jsxs("summary",{children:[l.jsx("span",{children:_.time}),l.jsx("span",{children:_.source}),l.jsx("strong",{children:_.title}),l.jsx("b",{className:_.error?"error-text":"",children:_.status})]}),l.jsxs("div",{children:[_.details.map(U=>l.jsx("p",{children:U},U)),_.error&&l.jsxs("p",{className:"run-error",children:["错误：",_.error]})]})]},_.id))}),!E&&v&&!v.length&&l.jsx("p",{className:"automation-empty",children:"暂无运行记录"})]})]})]})]})}function K0(n){return{incomplete:"配置未完成","pending-test":"待测试",ready:"可启用",enabled:"已启用","schedule-error":"计划异常"}[n]||n}function tA(n){const a=n-5;return Array.from({length:12},(s,o)=>a+o)}function nA(n,a){const s=new Date(n,a,1),o=new Date(n,a,1-s.getDay());return Array.from({length:42},(u,h)=>{const f=new Date(o.getFullYear(),o.getMonth(),o.getDate()+h);return{date:Z0(f),day:f.getDate(),currentMonth:f.getMonth()===a}})}function Z0(n){const a=n.getFullYear(),s=String(n.getMonth()+1).padStart(2,"0"),o=String(n.getDate()).padStart(2,"0");return`${a}-${s}-${o}`}function Pv(n){const[a,s,o]=n.split("-").map(Number),u=new Date(a,s-1,o);return a&&s&&o&&u.getFullYear()===a&&u.getMonth()===s-1&&u.getDate()===o?u:new Date}function hr({value:n,options:a,placeholder:s,disabled:o,ariaLabel:u,onChange:h}){const[f,m]=S.useState(!1),p=Xb(),g=a.find(v=>v.value===n);return l.jsxs("div",{className:"form-picker",children:[l.jsxs("button",{type:"button",className:`picker-trigger ${f?"open":""}`,disabled:o,"aria-label":u,"aria-haspopup":"listbox","aria-expanded":f,onClick:()=>m(!f),children:[l.jsx("span",{className:g?"":"picker-placeholder",children:(g==null?void 0:g.label)||s}),l.jsx(LC,{})]}),f&&l.jsxs(l.Fragment,{children:[l.jsx("button",{type:"button",className:"picker-backdrop","aria-label":"关闭选项",onClick:()=>m(!1)}),l.jsxs(Uf.div,{className:"picker-popover choice-popover",role:"listbox",initial:p?!1:{opacity:0,y:-5},animate:{opacity:1,y:0,transitionEnd:{transform:"none"}},transition:{duration:p?0:.12},children:[a.map(v=>l.jsxs("button",{type:"button",role:"option","aria-selected":v.value===n,className:v.value===n?"selected":"",onClick:()=>{h(v.value),m(!1)},children:[l.jsx("span",{children:v.label}),v.value===n&&l.jsx(us,{})]},v.value)),!a.length&&l.jsx("span",{className:"picker-empty",children:"暂无可选项"})]})]})]})}function yd({value:n,onChange:a}){const s=Pv(n),[o,u]=S.useState(!1),[h,f]=S.useState("days"),[m,p]=S.useState(()=>new Date(s.getFullYear(),s.getMonth(),1)),g=nA(m.getFullYear(),m.getMonth()),v=tA(m.getFullYear()),x=Z0(new Date),b=T=>{a(T),u(!1);const D=Pv(T);p(new Date(D.getFullYear(),D.getMonth(),1))},j=()=>{const T=!o;u(T),f("days"),T&&p(new Date(s.getFullYear(),s.getMonth(),1))},E=T=>p(h==="days"?new Date(m.getFullYear(),m.getMonth()+T,1):new Date(m.getFullYear()+T*(h==="years"?12:1),m.getMonth(),1));return l.jsxs("div",{className:"date-picker",children:[l.jsxs("button",{type:"button",className:`date-trigger ${o?"open":""}`,"aria-haspopup":"dialog","aria-expanded":o,onClick:j,children:[l.jsx("span",{children:n?n.replaceAll("-","/"):"选择日期"}),l.jsx(VC,{})]}),o&&l.jsxs(l.Fragment,{children:[l.jsx("button",{type:"button",className:"date-backdrop","aria-label":"关闭日期选择器",onClick:()=>u(!1)}),l.jsxs(Uf.div,{className:"calendar-popover",role:"dialog","aria-label":"选择日期",initial:{opacity:0,y:-6},animate:{opacity:1,y:0,transitionEnd:{transform:"none"}},transition:{duration:.14},children:[l.jsxs("div",{className:"calendar-head",children:[l.jsx("button",{type:"button","aria-label":"上一页",onClick:()=>E(-1),children:l.jsx(Kb,{})}),l.jsx("button",{type:"button",className:"calendar-title",onClick:()=>f(T=>T==="days"?"months":"years"),children:h==="years"?`${v[0]}–${v[11]} 年`:`${m.getFullYear()} 年${h==="days"?` ${m.getMonth()+1} 月`:""}`}),l.jsx("button",{type:"button","aria-label":"下一页",onClick:()=>E(1),children:l.jsx(Zb,{})})]}),h==="days"?l.jsxs(l.Fragment,{children:[l.jsx("div",{className:"weekdays",children:["日","一","二","三","四","五","六"].map(T=>l.jsx("span",{children:T},T))}),l.jsx("div",{className:"calendar-grid",children:g.map(T=>l.jsx("button",{type:"button",className:`${T.currentMonth?"":"outside"} ${T.date===n?"selected":""} ${T.date===x?"today":""}`,onClick:()=>b(T.date),children:T.day},T.date))})]}):h==="months"?l.jsx("div",{className:"month-grid",children:Array.from({length:12},(T,D)=>l.jsxs("button",{type:"button",className:s.getFullYear()===m.getFullYear()&&s.getMonth()===D?"selected":"",onClick:()=>{p(new Date(m.getFullYear(),D,1)),f("days")},children:[D+1," 月"]},D))}):l.jsx("div",{className:"month-grid year-grid",children:v.map(T=>l.jsx("button",{type:"button",className:s.getFullYear()===T?"selected":"",onClick:()=>{p(new Date(T,m.getMonth(),1)),f("months")},children:T},T))}),l.jsx("div",{className:"calendar-footer",children:l.jsx("button",{type:"button",onClick:()=>b(x),children:"今天"})})]})]})]})}function Fv({value:n,onChange:a,unit:s,className:o="",disabled:u,ariaLabel:h,onKeyDown:f}){return l.jsxs("div",{className:`numeric-input ${o}`.trim(),children:[l.jsx("input",{type:"text",inputMode:"decimal",value:n,disabled:u,"aria-label":h,onChange:m=>a(m.target.value),onKeyDown:f}),s&&l.jsx("span",{children:s})]})}function Q0({current:n,titles:a,label:s}){const o=a.map((u,h)=>({number:h+1,title:u}));return l.jsx("div",{className:"step-bar","aria-label":s,children:o.map((u,h)=>{const f=u.number<n?"done":u.number===n?"active":"pending";return l.jsxs(S.Fragment,{children:[l.jsxs("div",{className:`step step-${f}`,"aria-current":f==="active"?"step":void 0,children:[l.jsx("div",{className:`step-circle ${f}`,children:f==="done"?l.jsx(us,{}):u.number}),l.jsx("span",{children:u.title})]}),h<o.length-1&&l.jsx("div",{className:`step-line ${u.number<n?"done":u.number===n?"transition":"pending"}`})]},u.number)})})}const Xv={configured:!1,binding:{bound:!1,name:"",path:""},usesBusinessSections:!1,businessSections:[],sources:[],selected:""};function rA(){const n=new Date;return`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}`}function aA({openSettings:n}){const[a,s]=S.useState(1),[o,u]=S.useState(rA),[h,f]=S.useState(""),[m,p]=S.useState([]),[g,v]=S.useState(Xv),[x,b]=S.useState(!1),[j,E]=S.useState("database"),[T,D]=S.useState(""),[O,k]=S.useState(""),[B,_]=S.useState(!1),[U,q]=S.useState("state"),[N,M]=S.useState(""),[V,$]=S.useState(""),[J,re]=S.useState(),pe=S.useRef(!1),le=S.useRef(!1);S.useEffect(()=>{be("weld.getState").then(Q=>{var te;const ue=Q!=null&&Q.binding&&Array.isArray(Q.sources)?Q:Xv;v(ue),D(((te=ue.sources.find(he=>he.id===ue.selected))==null?void 0:te.businessSection)||""),k(ue.selected)}).catch(Q=>M(Q instanceof Error?Q.message:"读取 Notion 配置失败")).finally(()=>q(void 0))},[]);const ve=/^\d+$/.test(h)&&Number(h)>0,H=S.useMemo(()=>m.reduce((Q,ue)=>Q+Number(ue.qty||0),0),[m]),se=H-Number(h||0),K=m.length>0&&m.every(Q=>/^\d+$/.test(Q.qty))&&se===0,P=g.usesBusinessSections?g.sources.filter(Q=>Q.businessSection===T):g.sources,ne=U==="generate"||U==="check"||U==="write";async function C(){if(!(!ve||ne)){q("generate"),M("");try{const Q=await be("weld.generate",{month:o,total:h});p(Q.map(ue=>({...ue,qty:String(ue.qty)}))),s(2)}catch(Q){M(Q instanceof Error?Q.message:"拆分失败")}finally{q(void 0)}}}function R(Q,ue){ue!==""&&!/^\d+$/.test(ue)||p(te=>te.map((he,Ce)=>Ce===Q?{...he,qty:ue}:he))}async function I(){if(O){q("binding"),M("");try{const Q=await be("weld.saveBinding",{sourceId:O});v(Q),k(Q.selected),b(!1)}catch(Q){M(Q instanceof Error?Q.message:"绑定失败")}finally{q(void 0)}}}async function ie(){if(!K||!g.binding.bound||ne||pe.current)return;pe.current=!0,q("check"),M("");const Q={month:o,total:h,rows:m.map(ue=>({date:ue.date,qty:ue.qty}))};try{if((await be("weld.check",Q,12e4)).hasExistingData){_(!0);return}await oe(Q,!1)}catch(ue){M(ue instanceof Error?ue.message:"Notion 数据检查失败")}finally{pe.current=!1,q(ue=>ue==="check"?void 0:ue)}}async function oe(Q,ue){if(!le.current){le.current=!0,q("write"),M(""),re(void 0);try{const te=await be("weld.write",{...Q,overwriteExisting:ue},12e4,he=>re(he));$(te.message),_(!1),s(3)}catch(te){M(te instanceof Error?te.message:"写入 Notion 失败")}finally{le.current=!1,q(void 0)}}}function fe(){s(1),p([]),f(""),$(""),M(""),re(void 0)}function ye(){M(""),E("database"),b(!0)}const ae={month:o,total:h,rows:m.map(Q=>({date:Q.date,qty:Q.qty}))};return l.jsx("div",{className:"app-shell",children:l.jsxs("main",{className:"main-content",children:[l.jsxs("header",{className:"content-header",children:[l.jsxs("div",{children:[l.jsx("h1",{children:"月度焊接计划拆分"}),l.jsx("p",{children:"按自然日模拟产量浮动，确认后写入 Notion 焊接数据库"})]}),l.jsx("button",{type:"button",className:"template-config-button",disabled:U==="state",onClick:ye,children:"焊接设置"})]}),l.jsxs("div",{className:"production-message-scroll daily-weld-page",children:[l.jsx(Q0,{current:a,titles:["录入计划","拆分预览","完成"],label:"焊接计划拆分进度"}),N&&l.jsx("div",{className:"weld-notice error",role:"alert",children:N}),a===1&&l.jsxs("section",{className:"weld-plan-card","aria-labelledby":"weld-plan-title",children:[l.jsxs("div",{className:"weld-section-heading",children:[l.jsx("h2",{id:"weld-plan-title",children:"计划信息"}),l.jsx("p",{children:"输入本月计划焊接总量，下一步将生成每日拆分预览。"})]}),l.jsxs("div",{className:"weld-fields",children:[l.jsx(Ya,{label:"计划月份",value:o,selectionMode:"month",disabled:ne,onChange:u}),l.jsxs("label",{className:"weld-field",children:[l.jsx("span",{children:"计划焊接总量（吨）"}),l.jsx(Fv,{value:h,disabled:ne,onChange:Q=>{(Q===""||/^\d+$/.test(Q))&&f(Q)},unit:"吨",ariaLabel:"计划焊接总量"})]})]}),l.jsxs("div",{className:"weld-method-note",children:[l.jsx("strong",{children:"按自然日分配 · 模拟真实产量浮动"}),l.jsx("span",{children:"工作日与周末采用不同权重，并叠加波动；每日取整后自动配平至计划总量。"})]}),l.jsx("div",{className:"weld-actions",children:l.jsx("button",{type:"button",className:"primary-button",disabled:!ve||ne,onClick:C,children:U==="generate"?"正在拆分…":"下一步：拆分预览"})})]}),a===2&&l.jsxs("section",{className:"weld-preview","aria-labelledby":"weld-preview-title",children:[l.jsxs("div",{className:"weld-preview-heading",children:[l.jsxs("div",{children:[l.jsxs("h2",{id:"weld-preview-title",children:[o.replace("-"," 年 ")," 月每日拆分详情"]}),l.jsx("p",{children:"可直接修改任意一天的数值；不满意本次浮动效果可重新模拟。"})]}),l.jsxs("button",{type:"button",className:"secondary",disabled:ne,onClick:C,children:[l.jsx(Qb,{}),"重新模拟浮动"]})]}),l.jsx("div",{className:"weld-table-wrap",children:l.jsxs("table",{children:[l.jsx("thead",{children:l.jsxs("tr",{children:[l.jsx("th",{children:"日期"}),l.jsx("th",{children:"星期"}),l.jsx("th",{children:"类型"}),l.jsx("th",{children:"计划量（吨）"})]})}),l.jsx("tbody",{children:m.map((Q,ue)=>l.jsxs("tr",{children:[l.jsx("td",{children:Q.date}),l.jsx("td",{children:Q.weekday}),l.jsx("td",{children:l.jsx("span",{className:`weld-day-pill ${Q.isWeekend?"weekend":""}`,children:Q.isWeekend?"休息日":"工作日"})}),l.jsx("td",{children:l.jsx(Fv,{value:Q.qty,disabled:ne,onChange:te=>R(ue,te),unit:"吨",ariaLabel:`${Q.date} 计划量`})})]},Q.date))})]})}),l.jsxs("div",{className:"weld-summary",children:[l.jsxs("span",{children:["共 ",m.length," 天 · 计划总量 ",l.jsx("strong",{children:h})," 吨"]}),l.jsxs("span",{children:["拆分合计 ",l.jsx("strong",{children:H})," 吨 ",se===0?l.jsx("em",{className:"match",children:"与计划总量一致"}):l.jsxs("em",{className:"mismatch",children:["偏差 ",se>0?"+":"",se," 吨，可手动调整"]})]})]}),U==="write"&&l.jsx("div",{className:"weld-write-progress",role:"status","aria-live":"polite",children:J?`正在写入 ${J.date.slice(0,10)}（${J.current}/${J.total}）`:"正在准备 Notion 层级数据…"}),l.jsxs("div",{className:"weld-actions split",children:[l.jsx("button",{type:"button",className:"secondary",disabled:ne,onClick:()=>s(1),children:"返回修改"}),l.jsx("button",{type:"button",className:"primary-button",disabled:!K||!g.binding.bound||ne,onClick:ie,children:U==="check"?"正在检查…":U==="write"?"正在写入…":"确认并写入 Notion"})]})]}),a===3&&l.jsxs("section",{className:"complete-view weld-complete",children:[l.jsx("div",{className:"complete-icon",children:l.jsx(us,{})}),l.jsx("h2",{children:"入库完成"}),l.jsx("p",{children:V||`${o} 共 ${m.length} 天的焊接计划数据已写入 Notion。`}),l.jsx("button",{className:"primary-button",onClick:fe,children:"拆分下一个月"})]})]}),x&&l.jsx("div",{className:"weld-settings-overlay",children:l.jsxs("section",{className:"weld-settings-dialog",role:"dialog","aria-modal":"true","aria-labelledby":"weld-settings-title",children:[l.jsxs("aside",{className:"weld-settings-nav",children:[l.jsx("h2",{id:"weld-settings-title",children:"焊接设置"}),l.jsxs("nav",{"aria-label":"焊接设置分类",children:[l.jsxs("button",{type:"button",className:j==="rules"?"active":"",onClick:()=>E("rules"),children:[l.jsx(ZC,{}),"拆分规则"]}),l.jsxs("button",{type:"button",className:j==="database"?"active":"",onClick:()=>E("database"),children:[l.jsx(Xd,{}),"数据库绑定"]})]})]}),l.jsxs("div",{className:"weld-settings-main",children:[l.jsx("button",{type:"button",className:"weld-settings-close","aria-label":"关闭焊接设置",disabled:U==="binding",onClick:()=>b(!1),children:l.jsx(Yf,{})}),j==="rules"?l.jsxs(l.Fragment,{children:[l.jsxs("div",{className:"weld-settings-heading",children:[l.jsx("h3",{children:"拆分规则"}),l.jsx("p",{children:"当前规则用于生成每日焊接计划，修改每日数值后仍需保证月度合计一致。"})]}),l.jsxs("dl",{className:"weld-rule-list",children:[l.jsxs("div",{children:[l.jsx("dt",{children:"分配周期"}),l.jsx("dd",{children:"按所选月份的全部自然日"})]}),l.jsxs("div",{children:[l.jsx("dt",{children:"产量浮动"}),l.jsx("dd",{children:"基准量叠加 22% 随机波动"})]}),l.jsxs("div",{children:[l.jsx("dt",{children:"周末权重"}),l.jsx("dd",{children:"周六、周日自动降低计划权重"})]}),l.jsxs("div",{children:[l.jsx("dt",{children:"总量配平"}),l.jsx("dd",{children:"每日取整后自动配平至月度计划"})]})]})]}):l.jsxs(l.Fragment,{children:[l.jsxs("div",{className:"weld-settings-heading",children:[l.jsx("h3",{children:"数据库绑定"}),l.jsx("p",{children:"每项业务只绑定一个主写入数据库，汇总数据库由系统自动维护。"})]}),N&&l.jsx("div",{className:"weld-notice error",role:"alert",children:N}),l.jsxs("section",{className:"weld-business-binding","aria-labelledby":"weld-business-title",children:[l.jsxs("div",{className:"weld-business-title",children:[l.jsxs("div",{children:[l.jsx("h4",{id:"weld-business-title",children:"焊接业务"}),l.jsx("p",{children:"每日焊接计划的主写入数据库"})]}),l.jsx("span",{className:g.binding.bound?"bound":"",children:g.binding.bound?"已绑定":"未绑定"})]}),!g.configured||!g.sources.length?l.jsx("div",{className:"weld-notice",children:"请先在系统设置中完成数据库连接并刷新数据源。"}):l.jsxs("div",{className:"weld-dialog-field",children:[g.usesBusinessSections&&l.jsxs(l.Fragment,{children:[l.jsx("span",{children:"业务板块"}),l.jsx(hr,{value:T,options:g.businessSections.map(Q=>({value:Q,label:Q})),placeholder:"选择焊接业务板块",ariaLabel:"焊接业务板块",disabled:U==="binding",onChange:Q=>{D(Q),k("")}})]}),l.jsx("span",{children:"主写入数据库"}),l.jsx(hr,{value:O,options:P.map(Q=>({value:Q.id,label:Q.name})),placeholder:"选择每日焊接量数据库",ariaLabel:"焊接业务主写入数据库",disabled:g.usesBusinessSections&&!T||U==="binding",onChange:k})]}),l.jsx("p",{className:"weld-binding-help",children:"月度和周度汇总数据库由系统在写入时自动维护，无需单独绑定。"})]}),l.jsxs("div",{className:"weld-settings-actions",children:[l.jsx("button",{type:"button",disabled:U==="binding",onClick:()=>b(!1),children:"取消"}),!g.configured||!g.sources.length?l.jsx("button",{type:"button",className:"primary-button",onClick:n,children:"前往系统设置"}):l.jsx("button",{type:"button",className:"primary-button",disabled:!O||U==="binding",onClick:I,children:U==="binding"?"正在检测…":"保存绑定"})]})]})]})]})}),B&&l.jsx("div",{className:"pm-dialog-overlay",children:l.jsxs("section",{className:"pm-dialog weld-confirm-dialog",role:"alertdialog","aria-modal":"true","aria-labelledby":"weld-overwrite-title",children:[l.jsx("h2",{id:"weld-overwrite-title",children:"确认覆盖已有产量"}),l.jsxs("p",{children:[o," 已存在产量数据。继续后将按本次拆分结果覆盖该月每日产量，并更新月、周、日关联。"]}),N&&l.jsx("div",{className:"weld-notice error",role:"alert",children:N}),U==="write"&&l.jsx("div",{className:"weld-write-progress",role:"status","aria-live":"polite",children:J?`正在写入 ${J.date.slice(0,10)}（${J.current}/${J.total}）`:"正在准备 Notion 层级数据…"}),l.jsxs("div",{className:"pm-dialog-actions",children:[l.jsx("button",{type:"button",disabled:U==="write",onClick:()=>_(!1),children:"取消"}),l.jsx("button",{type:"button",className:"primary-button",disabled:U==="write",onClick:()=>oe(ae,!0),children:U==="write"?"正在写入…":"确认覆盖并写入"})]})]})})]})})}const J0=[{category:"数据文件处理",name:"挂网计划 PDF 导出"},{category:"数据文件处理",name:"生产会资料拆分"},{category:"数据文件处理",name:"文件统计汇总"},{category:"数据同步",name:"每日焊接数据模拟"},{category:"数据同步",name:"生产消息 Notion 入库"},{category:"数据同步",name:"数据库查看"},{category:"自动化",name:"自动化任务"}],iA=[...new Set(J0.map(n=>n.category))];function sA(n){switch(n){case"挂网计划 PDF 导出":return"plan-pdf";case"生产会资料拆分":return"production-meeting";case"每日焊接数据模拟":return"daily-weld";case"生产消息 Notion 入库":return"production-message";case"数据库查看":return"database-viewer";case"文件统计汇总":return"report-center";case"自动化任务":return"daily-report";default:return"plan-pdf"}}function oA({active:n,navigate:a,openSettings:s}){return l.jsxs("aside",{className:"sidebar",children:[l.jsx("div",{className:"sidebar-top",children:l.jsx("div",{className:"sidebar-brand",children:"生产助手"})}),l.jsx("nav",{className:"sidebar-nav","aria-label":"业务模块",children:iA.map(o=>l.jsxs("section",{className:"sidebar-section",children:[l.jsx("div",{className:"sidebar-section-label",children:o}),J0.filter(u=>u.category===o).map(u=>{const h=sA(u.name),f=h===n;return l.jsxs("button",{className:`sidebar-item ${f?"sidebar-item-active":""}`,"aria-current":f?"page":void 0,onClick:()=>a(h),children:[l.jsx($v,{name:u.name}),l.jsx("span",{children:u.name})]},u.name)})]},o))}),l.jsx("div",{className:"sidebar-bottom",children:l.jsxs("button",{className:"sidebar-item","aria-haspopup":"dialog",onClick:s,children:[l.jsx($v,{name:"设置"}),l.jsx("span",{children:"设置"})]})})]})}function $v({name:n}){return n==="挂网计划 PDF 导出"||n==="生产会资料拆分"?l.jsxs("svg",{className:"nav-icon",viewBox:"0 0 24 24","aria-hidden":"true",children:[l.jsx("path",{className:"folder-lid",d:"M3.5 7h6l1.8 2h9.2"}),l.jsx("path",{d:"M4.2 7h15.6l-1.3 11H5.5L4.2 7Z"})]}):n==="每日焊接数据模拟"||n==="自动化任务"?l.jsxs("svg",{className:"nav-icon",viewBox:"0 0 24 24","aria-hidden":"true",children:[l.jsx("rect",{x:"5",y:"4.5",width:"14",height:"15",rx:"2"}),l.jsx("path",{d:"M8 3v3M16 3v3M5 9h14"}),l.jsx("path",{className:"daily-check",d:"m8.5 14 2 2 4.5-4.5"})]}):n==="生产消息 Notion 入库"?l.jsxs("svg",{className:"nav-icon",viewBox:"0 0 24 24","aria-hidden":"true",children:[l.jsx("path",{d:"M4 14.5 6.2 6h11.6l2.2 8.5V19H4v-4.5Z"}),l.jsx("path",{className:"inbox-tray",d:"M4.3 14h4.1l1.2 2h4.8l1.2-2h4.1"}),l.jsx("path",{className:"inbox-arrow",d:"M12 5v7m-2.5-2.5L12 12l2.5-2.5"})]}):n==="数据库查看"?l.jsxs("svg",{className:"nav-icon",viewBox:"0 0 24 24","aria-hidden":"true",children:[l.jsx("ellipse",{cx:"12",cy:"6",rx:"7",ry:"3"}),l.jsx("path",{d:"M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"})]}):n==="文件统计汇总"?l.jsxs("svg",{className:"nav-icon",viewBox:"0 0 24 24","aria-hidden":"true",children:[l.jsx("path",{d:"M4.5 19h15"}),l.jsx("rect",{className:"report-bar report-bar-one",x:"6",y:"12",width:"2.5",height:"6",rx:"0.5"}),l.jsx("rect",{className:"report-bar report-bar-two",x:"10.75",y:"8",width:"2.5",height:"10",rx:"0.5"}),l.jsx("rect",{className:"report-bar report-bar-three",x:"15.5",y:"5",width:"2.5",height:"13",rx:"0.5"})]}):l.jsxs("svg",{className:"nav-icon",viewBox:"0 0 24 24","aria-hidden":"true",children:[l.jsx("circle",{cx:"12",cy:"12",r:"3"}),l.jsx("path",{className:"settings-ring",d:"M12 3.5v2M12 18.5v2M3.5 12h2M18.5 12h2M6 6l1.4 1.4M16.6 16.6 18 18M18 6l-1.4 1.4M7.4 16.6 6 18"})]})}const Kv=new Set(["raw_message","message_type","parser_version","unit"]),lA=new Set(["piece_count","weight","sheet_in_stock","profile_in_stock","cutting","welding","daily_output","monthly_output","yearly_output","monthly_reference","output_sections"]),cA=/(公斤|千克|kg|吨|t|张|件|套|节|台|米|m)$/i,uA={piece_count:"张",weight:"吨",sheet_in_stock:"吨",profile_in_stock:"吨",cutting:"吨",welding:"吨",daily_output:"套",output_sections:"节"};function vd(){const n=new Date;return`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}-${String(n.getDate()).padStart(2,"0")}`}function Pi(n){return n instanceof Error?n.message:String(n)}function af(n,a=""){const s=n.trim().match(cA);return{value:s?n.trim().slice(0,-s[0].length).trim():n,unit:(s==null?void 0:s[0])||a}}function dA(n,a){return n.trim()?`${n}${a}`:""}function fA(n,a){const s=af(a).value.trim(),o=af(n.databaseValue).value.trim(),u=n.propertyType==="number"&&!Number.isFinite(Number(s.replaceAll(",",""))),h=!s||u?"exception":o?n.propertyType==="number"?Number(s.replaceAll(",",""))===Number(o.replaceAll(",",""))?"same":"confirm":s===o?"same":"confirm":"new";return{...n,parsedValue:a,status:h,message:h==="exception"?`${n.name}的输入值无效`:h==="confirm"?"与数据库现值不同":""}}function hA(n){return{new:"新增",same:"一致",confirm:"待确认",exception:"异常",unchecked:"待检查"}[n]||"异常"}function mA(){const[n,a]=S.useState(""),[s,o]=S.useState(""),[u,h]=S.useState([]),[f,m]=S.useState(),[p,g]=S.useState(),[v,x]=S.useState(),[b,j]=S.useState(""),[E,T]=S.useState({}),[D,O]=S.useState(!1),[k,B]=S.useState(),[_,U]=S.useState(""),[q,N]=S.useState([]),[M,V]=S.useState({}),[$,J]=S.useState(!1),[re,pe]=S.useState({cutting:"",towerDaily:""}),le=u.length>0,ve=le&&n!==s,H=!!f;S.useEffect(()=>{be("production.getBindings").then(ae=>{B(ae),pe({cutting:ae.selected.cutting||"",towerDaily:ae.selected.towerDaily||""})}).catch(ae=>U(Pi(ae)))},[]);async function se(){U("");try{await be("production.saveBindings",re,12e4);const ae=await be("production.getBindings");B(ae),J(!1)}catch(ae){U(Pi(ae))}}async function K(ae){m("check"),j(""),T({});try{const Q=await be("production.check",{drafts:ae,defaultDate:vd()});g(Q)}catch(Q){j(Pi(Q))}finally{m(void 0)}}async function P(){if(!(!n.trim()||H)){m("parse"),j(""),O(!1),x(void 0),g(void 0),T({});try{const ae=await be("production.parse",{text:n,defaultDate:vd()});if(h(ae),o(n),!ae.length){j("没有解析到可核对的数据，请检查消息内容后重试。");return}ae.every(Q=>Q.canWrite)&&await K(ae)}catch(ae){h([]),g(void 0),j(Pi(ae))}finally{m(ae=>ae==="parse"?void 0:ae)}}}async function ne(ae,Q){const ue=u.map(te=>te.index===ae?{...te,businessDate:Q,canWrite:!!Q,warningText:Q?"":te.warningText}:te);h(ue),g(void 0),T({}),ue.every(te=>te.canWrite)&&await K(ue)}function C(ae,Q,ue){const te=`${ae}:${Q}`;h(he=>he.map(Ce=>Ce.index===ae?{...Ce,canWrite:!!Ce.businessDate&&Ce.kind!=="Unknown",fields:{...Ce.fields,[Q]:ue},previewFields:Ce.previewFields.map(Oe=>Oe.key===Q?{...Oe,value:ue}:Oe)}:Ce)),T(he=>Object.fromEntries(Object.entries(he).filter(([Ce])=>Ce!==te))),g(he=>{if(!he)return he;const Ce=he.items.map(Oe=>{if(Oe.index!==ae||!Oe.fields)return Oe;const Qe=Oe.fields.map(yt=>yt.key===Q?fA(yt,ue):yt),Xe=Qe.some(yt=>yt.status==="exception")?"error":Qe.some(yt=>yt.status==="confirm")?"existing":"ready";return{...Oe,fields:Qe,status:Xe}});return{...he,items:Ce,succeeded:Ce.every(Oe=>Oe.status!=="error")}})}async function R(ae){if(!(!p||H)){m("write"),j("");try{const Q=await be("production.write",{drafts:u,defaultDate:vd(),overwriteExisting:!1,fieldChoices:E,monthlyPlans:ae},12e4);if(x(Q),Q.requiredMonths.length){N(Q.requiredMonths),V({});return}Q.succeeded?O(!0):j(Q.message||"Notion 写入未完成。")}catch(Q){j(Pi(Q))}finally{m(void 0)}}}function I(){a(""),o(""),h([]),g(void 0),x(void 0),T({}),O(!1),j("")}const ie=S.useMemo(()=>u.flatMap(ae=>{var ue;const Q=(ue=p==null?void 0:p.items.find(te=>te.index===ae.index))==null?void 0:ue.fields;return Q!=null&&Q.length?Q.filter(te=>!Kv.has(te.key)).map(te=>({draft:ae,key:te.key,name:te.name,propertyType:te.propertyType,parsedValue:ae.fields[te.key]??te.parsedValue,databaseValue:te.databaseValue,status:te.status,message:te.message})):ae.previewFields.filter(te=>!Kv.has(te.key)).map(te=>({draft:ae,key:te.key,name:te.label,propertyType:lA.has(te.key)?"number":"",parsedValue:ae.fields[te.key]??te.value,databaseValue:"",status:ae.canWrite?"unchecked":"exception",message:ae.warningText}))}),[u,p]),oe=S.useMemo(()=>({newFields:ie.filter(ae=>ae.status==="new").length,same:ie.filter(ae=>ae.status==="same").length,confirm:ie.filter(ae=>ae.status==="confirm").length,exception:ie.filter(ae=>ae.status==="exception").length}),[ie]),fe=ie.filter(ae=>ae.status==="confirm"),ye=le&&!ve&&!H&&!!(p!=null&&p.succeeded)&&u.every(ae=>ae.canWrite&&!!ae.businessDate)&&ie.every(ae=>ae.status!=="exception"&&ae.status!=="unchecked")&&fe.every(ae=>!!E[`${ae.draft.index}:${ae.key}`]);return D?l.jsxs("div",{className:"app-shell",children:[l.jsxs("main",{className:"main-content",children:[l.jsx(Qv,{configure:()=>J(!0)}),l.jsxs("div",{className:"production-message-scroll",children:[l.jsx(Jv,{current:3}),l.jsxs("section",{className:"complete-view",children:[l.jsx("div",{className:"complete-icon",children:l.jsx(us,{})}),l.jsx("h2",{children:"入库完成"}),l.jsx("p",{children:(v==null?void 0:v.message)||`${u.length} 条消息已写入 Notion`}),l.jsx("button",{className:"primary-button",onClick:I,children:"录入下一条"})]})]})]}),$&&k&&l.jsx(Zv,{state:k,selections:re,setSelections:pe,error:_,close:()=>J(!1),save:se})]}):l.jsxs("div",{className:"app-shell",children:[l.jsxs("main",{className:"main-content",children:[l.jsx(Qv,{configure:()=>J(!0)}),l.jsxs("div",{className:"production-message-scroll",children:[l.jsx(Jv,{current:le?2:1}),l.jsxs("div",{className:"workspace-panel",children:[l.jsxs("section",{className:"message-pane",children:[l.jsxs("div",{className:"pane-title",children:[l.jsx("h2",{children:"原始消息"}),l.jsx("p",{children:"输入生产消息，系统将自动解析并检查已有数据。"})]}),l.jsx("textarea",{className:"message-textarea",value:n,disabled:H,onChange:ae=>a(ae.target.value),placeholder:"请输入生产消息"}),l.jsx("div",{className:"parse-action",children:l.jsxs("button",{className:"primary-button",disabled:!n.trim()||H,onClick:P,children:[le&&l.jsx(Qb,{className:"button-icon refresh-icon"}),l.jsx("span",{children:f==="parse"?"正在解析…":le?"重新解析":"解析消息"})]})})]}),l.jsx("section",{className:"review-pane",children:le?l.jsxs(l.Fragment,{children:[l.jsxs("div",{className:"review-header",children:[l.jsx("h2",{children:"解析结果"}),l.jsxs("div",{className:"review-summary",children:[l.jsxs("span",{children:["新增",l.jsx("strong",{children:oe.newFields})]}),l.jsx("i",{children:"·"}),l.jsxs("span",{children:["一致",l.jsx("strong",{children:oe.same})]}),l.jsx("i",{children:"·"}),l.jsxs("span",{children:["待确认",l.jsx("strong",{children:oe.confirm})]}),l.jsx("i",{children:"·"}),l.jsxs("span",{children:["异常",l.jsx("strong",{children:oe.exception})]})]})]}),l.jsx("div",{className:"date-groups",children:u.map(ae=>{const Q=ie.filter(he=>he.draft.index===ae.index),ue=Q.filter(he=>he.status==="confirm"),te=p?{...p,items:p.items.filter(he=>he.index===ae.index)}:void 0;return l.jsxs("section",{className:"date-group","data-business-date":ae.businessDate,children:[l.jsxs("div",{className:"identity-section",children:[l.jsx("div",{className:"identity-field",children:l.jsx(Ya,{label:"日期",value:ae.businessDate||"",disabled:H,onChange:he=>ne(ae.index,he)})}),l.jsxs("div",{className:"identity-field",children:[l.jsx("label",{children:"业务 / 产线"}),l.jsx("input",{className:"field-input",value:ae.typeDisplay||"",readOnly:!0,disabled:H})]})]}),l.jsx(pA,{busy:f==="check",result:te,error:b,needsReparse:ve,invalidCount:ae.canWrite?0:1,fieldStatuses:Q.map(he=>he.status)}),l.jsx("div",{className:"data-title",children:"数据字段"}),l.jsxs("div",{className:"field-table",children:[l.jsxs("div",{className:"field-table-header",children:[l.jsx("div",{children:"字段"}),l.jsx("div",{children:"本次解析值"}),l.jsx("div",{children:"数据库值"}),l.jsx("div",{className:"header-status",children:"状态"})]}),Q.map(he=>{const Ce=af(he.parsedValue,he.propertyType==="number"&&uA[he.key]||""),Oe=`${he.draft.index}:${he.key}`;return l.jsxs("div",{className:"field-row",children:[l.jsx("div",{className:"field-name",children:he.name}),l.jsx("div",{className:"field-editor",children:l.jsxs("div",{className:"input-unit-wrap",children:[l.jsx("input",{className:"field-input compact-input",value:Ce.value,disabled:H,"aria-invalid":he.status==="exception",onChange:Qe=>C(he.draft.index,he.key,dA(Qe.target.value,Ce.unit)),onKeyDown:Qe=>{Qe.key==="Enter"&&Qe.currentTarget.blur()}}),Ce.unit&&l.jsx("span",{children:Ce.unit})]})}),l.jsx("div",{className:"database-value",children:he.databaseValue||"—"}),l.jsx("div",{className:"field-status",children:he.status!=="unchecked"&&l.jsx("span",{className:`pill pill-${he.status}`,title:he.message,children:hA(he.status)})})]},Oe)})]}),ue.length>0&&l.jsxs("section",{className:"conflict-section","aria-label":`${ae.businessDate} 待确认字段`,children:[l.jsx("div",{className:"conflict-section-title",children:"待确认字段"}),ue.map(he=>{const Ce=`${he.draft.index}:${he.key}`;return l.jsxs("div",{className:"conflict-panel",children:[l.jsxs("div",{className:"conflict-message",children:[l.jsx("strong",{children:he.name}),l.jsx("span",{children:"原值与新值不同，请选择保留项。"})]}),l.jsxs("div",{className:"conflict-options",children:[l.jsxs("label",{children:[l.jsx("input",{type:"radio",name:`conflict-${Ce}`,checked:E[Ce]==="keep",onChange:()=>T(Oe=>({...Oe,[Ce]:"keep"}))}),l.jsxs("span",{children:[l.jsx("small",{children:"原值"}),l.jsx("strong",{children:he.databaseValue||"—"})]})]}),l.jsxs("label",{children:[l.jsx("input",{type:"radio",name:`conflict-${Ce}`,checked:E[Ce]==="use",onChange:()=>T(Oe=>({...Oe,[Ce]:"use"}))}),l.jsxs("span",{children:[l.jsx("small",{children:"新值"}),l.jsx("strong",{children:he.parsedValue||"—"})]})]})]})]},Ce)})]})]},ae.index)})}),l.jsxs("div",{className:"review-footer",children:[l.jsx("span",{className:"review-footer-text",children:u.length>1?`本次共 ${u.length} 条消息，将整批写入 Notion。`:"确认后将把本次解析结果写入 Notion。"}),l.jsx("button",{className:"primary-button confirm-button",disabled:!ye,onClick:()=>R(),children:f==="write"?"正在入库…":"确认入库"})]})]}):l.jsxs("div",{className:"review-empty",children:[l.jsx("h2",{children:"解析结果"}),l.jsx("p",{children:"解析消息后，Notion 数据检查结果将在这里显示。"}),(_||(k==null?void 0:k.configured)===!1||k&&(!k.cutting.bound||!k.towerDaily.bound))&&l.jsx("div",{className:"pm-notice",role:"alert",children:_||((k==null?void 0:k.configured)===!1?"Notion 连接尚未配置。":"数据库已变更，请点击右上角“数据库绑定”重新选择下料和塔筒主数据库。")})]})})]})]})]}),q.length>0&&l.jsx(gA,{months:q,values:M,setValues:V,close:()=>N([]),submit:ae=>{N([]),R(ae)}}),$&&k&&l.jsx(Zv,{state:k,selections:re,setSelections:pe,error:_,close:()=>J(!1),save:se})]})}function pA({busy:n,result:a,error:s,needsReparse:o,invalidCount:u,fieldStatuses:h}){if(n)return l.jsxs("div",{className:"match-status",role:"status","aria-live":"polite",children:[l.jsx("span",{className:"status-loader"}),l.jsx("span",{className:"match-status-copy",children:"正在检查 Notion 数据…"})]});if(o)return l.jsxs("div",{className:"match-status match-status-error",role:"alert",children:[l.jsx("span",{className:"new-record-icon",children:"!"}),l.jsx("span",{className:"match-status-copy",children:"原始消息已修改，请重新解析"})]});if(u)return l.jsxs("div",{className:"match-status match-status-error",role:"alert",children:[l.jsx("span",{className:"new-record-icon",children:"!"}),l.jsxs("span",{className:"match-status-copy",children:["本批有 ",u," 条异常，已停止检查和入库"]})]});if(s)return l.jsxs("div",{className:"match-status match-status-error",role:"alert",children:[l.jsx("span",{className:"new-record-icon",children:"!"}),l.jsxs("span",{className:"match-status-copy",children:["检查失败：",s]})]});const f=a==null?void 0:a.items.some(b=>b.status==="existing"||b.status==="conflict"),m=b=>h.includes(b),p=h.length>0&&h.every(b=>b==="same"),g=m("exception")||a&&!a.succeeded&&h.length===0?"match-status-error":m("confirm")?"match-status-warning":p?"match-status-neutral":"",v=m("exception")?"存在异常，不能入库":m("unchecked")?"字段已修改，等待检查":m("confirm")?"已找到对应记录，有字段待确认":m("new")?f||m("same")?"已找到对应记录，将补充空字段":"未找到对应记录，将新建":p?"已找到对应记录，数据一致":a&&!a.succeeded?"Notion 检查未通过":"等待检查 Notion 数据",x=!!a&&!m("exception")&&!m("confirm")&&!m("unchecked");return l.jsxs("div",{className:`match-status ${g}`,role:g==="match-status-error"?"alert":"status","aria-live":"polite",children:[x?l.jsx("span",{className:"match-check",children:l.jsx(us,{})}):l.jsx("span",{className:"new-record-icon",children:g?"!":"+"}),l.jsx("span",{className:"match-status-copy",children:v})]})}function gA({months:n,values:a,setValues:s,close:o,submit:u}){const h=Object.fromEntries(n.map(m=>[m,Number(a[m])])),f=n.every(m=>{var p;return((p=a[m])==null?void 0:p.trim())&&Number.isFinite(h[m])&&h[m]>=0});return l.jsx("div",{className:"pm-dialog-overlay",children:l.jsxs("section",{className:"pm-dialog",role:"dialog","aria-modal":"true","aria-labelledby":"monthly-plan-title",children:[l.jsx("h2",{id:"monthly-plan-title",children:"补充下料月计划"}),l.jsx("p",{children:"独立月计划库中没有该月份记录，请填写计划下料（吨）。"}),n.map(m=>l.jsxs("label",{children:[m,l.jsx("input",{type:"number",min:"0",value:a[m]||"",onChange:p=>s({...a,[m]:p.target.value})})]},m)),l.jsxs("div",{className:"pm-dialog-actions",children:[l.jsx("button",{onClick:o,children:"取消"}),l.jsx("button",{className:"primary-button",disabled:!f,onClick:()=>u(h),children:"创建并继续"})]})]})})}function Zv({state:n,selections:a,setSelections:s,error:o,close:u,save:h}){var x,b;const[f,m]=S.useState(((x=n.sources.find(j=>j.id===a.cutting))==null?void 0:x.businessSection)||""),[p,g]=S.useState(((b=n.sources.find(j=>j.id===a.towerDaily))==null?void 0:b.businessSection)||""),v=j=>n.usesBusinessSections?n.sources.filter(E=>E.businessSection===j):n.sources;return l.jsx("div",{className:"pm-dialog-overlay",children:l.jsxs("section",{className:"pm-dialog pm-binding-dialog",role:"dialog","aria-modal":"true","aria-labelledby":"binding-title",children:[l.jsx("h2",{id:"binding-title",children:"数据库绑定"}),l.jsx("p",{children:"只绑定每日主数据库。月累计和年累计由软件查询计算；下料月计划库通过主库的 Relation 自动识别。"}),n.usesBusinessSections&&l.jsxs("label",{children:["下料业务板块",l.jsxs("select",{value:f,onChange:j=>{m(j.target.value),s({...a,cutting:""})},children:[l.jsx("option",{value:"",children:"不处理下料消息"}),n.businessSections.map(j=>l.jsx("option",{value:j,children:j},`cutting-business-${j}`))]})]}),l.jsxs("label",{children:["下料主数据库",l.jsxs("select",{value:a.cutting,disabled:n.usesBusinessSections&&!f,onChange:j=>s({...a,cutting:j.target.value}),children:[l.jsx("option",{value:"",children:"不处理下料消息"}),v(f).map(j=>l.jsx("option",{value:j.id,children:j.name},`cutting-${j.id}`))]})]}),n.usesBusinessSections&&l.jsxs("label",{children:["塔筒业务板块",l.jsxs("select",{value:p,onChange:j=>{g(j.target.value),s({...a,towerDaily:""})},children:[l.jsx("option",{value:"",children:"请选择业务板块"}),n.businessSections.map(j=>l.jsx("option",{value:j,children:j},`tower-business-${j}`))]})]}),l.jsxs("label",{children:["塔筒产线主数据库",l.jsxs("select",{value:a.towerDaily,disabled:n.usesBusinessSections&&!p,onChange:j=>s({...a,towerDaily:j.target.value}),children:[l.jsx("option",{value:"",children:"请选择具体数据库"}),v(p).map(j=>l.jsx("option",{value:j.id,children:j.name},`tower-${j.id}`))]})]}),o&&l.jsx("div",{className:"pm-notice",role:"alert",children:o}),l.jsxs("div",{className:"pm-dialog-actions",children:[l.jsx("button",{onClick:u,children:"取消"}),l.jsx("button",{className:"primary-button",disabled:!a.towerDaily,onClick:h,children:"保存绑定"})]})]})})}function Qv({configure:n}){return l.jsxs("header",{className:"content-header",children:[l.jsxs("div",{children:[l.jsx("h1",{children:"生产消息入库"}),l.jsx("p",{children:"解析生产消息，检查已有数据并确认入库"})]}),l.jsx("button",{type:"button",className:"template-config-button",onClick:n,children:"数据库绑定"})]})}function Jv({current:n}){return l.jsx(Q0,{current:n,titles:["录入消息","解析确认","完成"],label:"生产消息入库进度"})}const Wv={audit:"正在检查",repair:"正在备份修复并复查",export:"正在导出",pickFolder:"选择目录",openOutput:"正在打开目录"},Iv=n=>n.split(/[\\/]/).pop();function yA(){const[n,a]=S.useState(""),[s,o]=S.useState(),[u,h]=S.useState(),[f,m]=S.useState(),[p,g]=S.useState(),[v,x]=S.useState(),[b,j]=S.useState(""),[E,T]=S.useState("全部"),[D,O]=S.useState(),k=S.useRef(!1),B=S.useRef(0);S.useEffect(()=>()=>{B.current++},[]);const _=(s==null?void 0:s.issues.filter(V=>V.severity==="错误").length)||0,U=(s==null?void 0:s.issues.filter(V=>V.severity==="警告").length)||0;function q(V){k.current||(a(V),o(void 0),m(void 0),h(void 0),j(""),O(void 0),T("全部"))}async function N(V){if(k.current||V==="audit"&&!n.trim()||["repair","export","openOutput"].includes(V)&&!s)return;const $=++B.current;k.current=!0,g(V),j(""),x(void 0),V==="audit"&&(o(void 0),h(void 0),T("全部")),V==="repair"&&(o(J=>J&&{...J,repaired:!1,canExport:!1}),h(void 0)),["audit","repair","export"].includes(V)&&(m(void 0),O(void 0));try{if(V==="pickFolder"){const J=await be("plan.pickFolder",void 0,6e5);if($!==B.current)return;J.path&&(k.current=!1,q(J.path),k.current=!0)}else{const J=await be(`plan.${V}`,{path:n.trim(),auditId:s==null?void 0:s.auditId,confirmed:V==="repair"||V==="export"},18e5,re=>{$===B.current&&k.current&&O(re)});if($!==B.current)return;if(V==="audit"&&o(J),V==="repair"){const re=J;o(re.audit),h(re.repair)}V==="export"&&m(J)}}catch(J){$===B.current&&(j(J instanceof Error?J.message:String(J)),(V==="repair"||V==="export")&&o(re=>re&&{...re,canExport:!1,repaired:!1}))}finally{$===B.current&&(k.current=!1,g(void 0),O(void 0))}}const M=p?Wv[p]:f?"候选 PDF 已生成":s?_?"存在待处理错误":s.canExport?"可以导出":"检查完成，待修复":"等待检查";return l.jsxs("div",{className:"page plan-pdf-page",children:[l.jsxs("header",{className:"plan-header",children:[l.jsx("h1",{children:"挂网计划导出"}),l.jsx("span",{children:M})]}),l.jsxs("div",{className:"plan-content",children:[l.jsxs("section",{className:"plan-source",children:[l.jsx("label",{htmlFor:"plan-folder",children:"月度目录"}),l.jsxs("div",{children:[l.jsx("input",{id:"plan-folder",value:n,disabled:!!p,placeholder:"选择包含一二三级计划的月份目录",onChange:V=>q(V.target.value)}),l.jsxs("button",{className:"secondary",disabled:!!p,onClick:()=>void N("pickFolder"),children:[l.jsx(Dv,{}),"选择目录"]}),l.jsx("button",{className:"primary",disabled:!!p||!n.trim(),onClick:()=>void N("audit"),children:s?"重新检查":"检查计划"})]})]}),b&&l.jsx("p",{className:"plan-error",role:"alert",children:b}),p&&l.jsxs("div",{className:"plan-progress",role:"status",children:[l.jsxs("span",{children:[l.jsx(Fr,{className:"spin"}),Wv[p]]}),p==="export"&&D&&l.jsxs(l.Fragment,{children:[l.jsxs("span",{children:[D.current," / ",D.total," · ",D.name]}),l.jsx("progress",{"aria-label":"PDF 导出进度",max:D.total||11,value:D.current})]})]}),l.jsxs("div",{className:"plan-workspace",children:[l.jsxs("section",{className:"plan-inspection",children:[l.jsxs("div",{className:"plan-pane-heading",children:[l.jsx("h2",{children:"检查结果"}),s&&l.jsxs("span",{children:[s.sheetCount," 个工作表"]})]}),s?l.jsxs(l.Fragment,{children:[l.jsxs("div",{className:"plan-workbook",children:[l.jsxs("strong",{children:[s.workspace.year," 年 ",s.workspace.month," 月计划"]}),l.jsx("span",{children:Iv(s.workspace.workbookPath)})]}),l.jsx("div",{className:"plan-filters","aria-label":"问题筛选",children:["全部","错误","警告"].map(V=>l.jsxs("button",{"aria-pressed":E===V,onClick:()=>T(V),children:[V," ",l.jsx("span",{children:V==="全部"?s.issues.length:V==="错误"?_:U})]},V))}),l.jsxs("div",{className:"plan-issues",children:[s.issues.filter(V=>E==="全部"||V.severity===E).map((V,$)=>l.jsxs("article",{children:[l.jsxs("div",{children:[l.jsx("span",{className:V.severity==="错误"?"plan-severity-error":"",children:V.severity}),l.jsxs("strong",{children:[V.sheet,V.location&&` · ${V.location}`]}),l.jsx("span",{children:V.canAutoFix?"可自动修复":"需手动处理"})]}),l.jsx("p",{children:V.message})]},$)),!s.issues.some(V=>E==="全部"||V.severity===E)&&l.jsx("p",{className:"plan-clear",children:s.issues.length?`没有${E}`:"未发现检查问题"})]}),l.jsxs("div",{className:"plan-next",children:[l.jsx("span",{children:_?s.repaired?"请手动处理剩余错误，再重新检查。":"修复后自动复查，剩余错误需手动处理。":s.canExport?"复查通过，可以导出候选 PDF。":"继续备份并修复，完成导出前准备。"}),l.jsx("button",{className:"secondary",disabled:!!p,onClick:()=>x("repair"),children:s.repaired?"再次修复":"备份并修复"})]}),u&&l.jsxs("details",{className:"plan-details",children:[l.jsx("summary",{children:"备份与修复明细"}),l.jsxs("p",{children:["已调整 ",u.changedCells," 个单元格、",u.changedRows," 行。"]}),l.jsxs("p",{children:["备份：",u.backupPath]})]})]}):l.jsxs("div",{className:"plan-empty",children:[l.jsx(Tv,{}),l.jsx("strong",{children:"尚未检查计划"}),l.jsx("p",{children:"选择月度目录后，查看需要处理的问题。"})]})]}),l.jsxs("section",{className:"plan-result",children:[l.jsxs("div",{className:"plan-pane-heading",children:[l.jsx("h2",{children:"导出结果"}),f&&l.jsxs("span",{children:[f.files.length," 份 PDF"]})]}),f?l.jsxs(l.Fragment,{children:[l.jsx("div",{className:"plan-file-list",children:f.files.map(V=>l.jsx("p",{children:Iv(V)},V))}),l.jsxs("div",{className:"plan-output",children:[l.jsx("span",{children:"文件位置"}),l.jsx("p",{children:f.outputFolder}),l.jsxs("button",{className:"secondary",disabled:!!p,onClick:()=>void N("openOutput"),children:[l.jsx(Dv,{}),"打开输出目录"]})]})]}):l.jsxs("div",{className:"plan-empty",children:[l.jsx(Tv,{}),l.jsx("strong",{children:p==="export"?"正在生成候选 PDF":"尚未导出"}),l.jsx("p",{children:"完成检查和修复后，生成 11 份候选 PDF。"})]}),l.jsx("div",{className:"plan-export-action",children:l.jsx("button",{className:"primary",disabled:!!p||!(s!=null&&s.canExport),onClick:()=>x("export"),children:f?"重新导出 PDF":"导出 PDF"})})]})]})]}),l.jsx(fl,{open:!!v,onOpenChange:V=>{V||x(void 0)},children:l.jsxs(hl,{children:[l.jsx(ml,{className:"dialog-overlay"}),l.jsxs(pl,{className:"plan-confirm",children:[l.jsxs("div",{children:[l.jsx(gl,{children:v==="repair"?"确认备份并修复":"确认导出 PDF"}),l.jsx(vl,{asChild:!0,children:l.jsx("button",{className:"secondary","aria-label":"关闭确认",children:l.jsx(Yf,{})})})]}),l.jsx(yl,{children:v==="repair"?"将先备份 Excel，再修复格式和序号，并自动复查。":"将生成 11 份候选 PDF，不修改 Excel。"}),l.jsxs("footer",{children:[l.jsx(vl,{asChild:!0,children:l.jsx("button",{className:"secondary",autoFocus:!0,children:"取消"})}),l.jsx("button",{className:"primary",onClick:()=>v&&void N(v),children:v==="repair"?"备份并修复":"确认导出"})]})]})]})})]})}const xd=(n=0)=>{const a=new Date;return{startDate:new Date(Date.UTC(a.getFullYear(),a.getMonth()+n-1,21)).toISOString().slice(0,10),endDate:new Date(Date.UTC(a.getFullYear(),a.getMonth()+n,20)).toISOString().slice(0,10)}},bd={sourceRoot:"",outputRoot:"",reportUrl:"",username:"",password:""},ex=n=>({sourceRoot:n.sourceRoot,outputRoot:n.outputRoot,reportUrl:n.reportUrl,username:n.username,password:""}),Yo=n=>n instanceof Error?n.message:String(n),tx=n=>n?`${n.slice(0,4)} 年 ${Number(n.slice(5,7))} 月`:"—",nx={prepare:"准备中",collect:"正在导出日报",parse:"正在读取数据",summary:"正在生成汇总",complete:"正在完成"};function vA(){const[n,a]=S.useState(),[s,o]=S.useState(xd),[u,h]=S.useState(bd),[f,m]=S.useState(!1),[p,g]=S.useState("load"),[v,x]=S.useState(""),[b,j]=S.useState(""),[E,T]=S.useState(),[D,O]=S.useState(),[k,B]=S.useState(!1),[_,U]=S.useState(!1),q=S.useRef(0),N=S.useRef(!1),M=Math.floor((Date.parse(`${s.endDate}T00:00:00Z`)-Date.parse(`${s.startDate}T00:00:00Z`))/864e5)+1,V=Number.isFinite(M)?M<1?"结束日期不能早于开始日期。":M>366?"单次统计范围不能超过 366 天。":"":"请选择完整日期。",$=D!=null&&D.total?Math.min(100,Math.max(0,Math.round(D.current/D.total*100))):0;async function J(){const K=++q.current;N.current=!0,g("load"),x("");try{const P=await be("report.getState");K===q.current&&a(P)}catch(P){K===q.current&&x(Yo(P))}finally{K===q.current&&(N.current=!1,g(void 0))}}S.useEffect(()=>(J(),()=>{q.current++}),[]);function re(K){N.current||(o(K),T(void 0),O(void 0),B(!1),x(""),U(!1))}function pe(K){N.current||(m(K),j(""),h(K&&n?ex(n):bd))}async function le(K){if(K.preventDefault(),N.current||!n)return;const P={...u,sourceRoot:u.sourceRoot.trim(),outputRoot:u.outputRoot.trim(),reportUrl:u.reportUrl.trim(),username:u.username.trim()};if(JSON.stringify(P)===JSON.stringify(ex(n))){pe(!1);return}const ne=++q.current;N.current=!0,g("save"),j("");try{const C=await be("report.saveConfig",P);if(ne!==q.current)return;a(C),m(!1),h(bd),T(void 0),O(void 0),B(!1),x("")}catch(C){ne===q.current&&j(Yo(C))}finally{ne===q.current&&(N.current=!1,g(void 0))}}async function ve(){if(N.current||!(n!=null&&n.credentialsConfigured))return;const K=++q.current;N.current=!0,g("auth"),x("");try{await be("report.authenticate",void 0,600*1e3);const P=await be("report.getState");K===q.current&&a(P)}catch(P){K===q.current&&x(Yo(P))}finally{K===q.current&&(N.current=!1,g(void 0))}}async function H(){if(N.current||!(n!=null&&n.authenticated)||V)return;const K=++q.current,P={...s};N.current=!0,g("run"),x(""),T(void 0),B(!1),U(!1),O({stage:"prepare",current:0,total:M,message:""});try{const ne=await be("report.run",P,18e5,C=>{K===q.current&&N.current&&O(C)});K===q.current&&(T(ne),O(void 0))}catch(ne){K===q.current&&(x(Yo(ne)),B(!0),O(void 0))}finally{K===q.current&&(N.current=!1,g(void 0))}}async function se(){if(E)try{await navigator.clipboard.writeText(E.summaryPath),U(!0)}catch{x("无法复制，请选中文件路径手动复制。")}}return l.jsxs("div",{className:"page report-center-page",children:[l.jsxs("header",{className:"report-header",children:[l.jsx("h1",{children:"文件统计汇总"}),l.jsxs("div",{className:"report-header-actions",children:[l.jsx("span",{className:"report-status",children:p==="load"?"加载中":n!=null&&n.authenticated?"已验证登录":"未验证登录"}),l.jsx("button",{className:"secondary report-icon-button","aria-label":"报表设置",title:"报表设置",disabled:!!p||!n,onClick:()=>pe(!0),children:l.jsx($C,{})})]})]}),l.jsxs("div",{className:"report-content",children:[v&&l.jsxs("div",{className:"report-error",role:"alert",children:[l.jsx("span",{children:v}),!n&&l.jsx("button",{className:"secondary",disabled:!!p,onClick:()=>void J(),children:"重新加载"})]}),l.jsxs("section",{className:"report-workspace",children:[l.jsxs("div",{className:"report-pane report-period",children:[l.jsxs("div",{className:"report-pane-heading",children:[l.jsx("h2",{children:"统计范围"}),!V&&l.jsxs("span",{children:[M," 天"]})]}),l.jsxs("div",{className:"report-dates",children:[l.jsx(Ya,{label:"开始日期",value:s.startDate,disabled:!!p,onChange:K=>re({...s,startDate:K})}),l.jsx(Ya,{label:"结束日期",value:s.endDate,disabled:!!p,onChange:K=>re({...s,endDate:K})})]}),l.jsxs("div",{className:"report-range-tools",children:[l.jsxs("div",{children:[l.jsx("button",{disabled:!!p,onClick:()=>re(xd()),children:"本期"}),l.jsx("button",{disabled:!!p,onClick:()=>re(xd(-1)),children:"上期"})]}),l.jsx("span",{children:V||`汇总月份 · ${tx(s.endDate)}`})]}),l.jsxs("div",{className:"report-execution",children:[p==="run"&&l.jsxs("div",{className:"report-progress",role:"status",children:[l.jsxs("div",{children:[l.jsxs("span",{children:[l.jsx(Fr,{className:"spin"}),nx[(D==null?void 0:D.stage)||"prepare"]]}),D&&["collect","parse"].includes(D.stage)&&l.jsxs("span",{children:[D.current," / ",D.total]})]}),l.jsx("div",{className:"report-progress-bar",role:"progressbar","aria-label":nx[(D==null?void 0:D.stage)||"prepare"],"aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":$,children:l.jsx("i",{style:{width:`${$}%`}})}),(D==null?void 0:D.message)&&l.jsxs("details",{className:"report-details",children:[l.jsx("summary",{children:"处理详情"}),l.jsx("p",{children:D.message})]})]}),!(n!=null&&n.credentialsConfigured)&&n&&l.jsxs("p",{className:"report-setup",children:["请先配置报表连接。",l.jsx("button",{onClick:()=>pe(!0),children:"报表设置"})]}),(n==null?void 0:n.credentialsConfigured)&&!n.authenticated&&l.jsx("p",{className:"report-setup",children:"请先验证登录。"}),l.jsxs("div",{className:"report-actions",children:[(n==null?void 0:n.credentialsConfigured)&&l.jsxs("button",{className:"secondary",disabled:!!p,onClick:ve,children:[p==="auth"&&l.jsx(Fr,{className:"spin"}),p==="auth"?"验证中…":n!=null&&n.authenticated?"重新验证":"验证登录"]}),l.jsx("button",{className:"primary",disabled:!!p||!(n!=null&&n.authenticated)||!!V,onClick:H,children:p==="run"?"正在汇总…":k?"重新汇总":"开始汇总"})]})]})]}),l.jsxs("div",{className:"report-pane report-result","aria-live":"polite",children:[l.jsxs("div",{className:"report-pane-heading",children:[l.jsx("h2",{children:"汇总结果"}),E&&l.jsx("span",{children:"已完成"})]}),E?l.jsxs(l.Fragment,{children:[l.jsxs("div",{className:"report-file",children:[l.jsx(Cv,{}),l.jsxs("div",{children:[l.jsxs("h3",{children:[tx(E.period.endDate),"设备台时汇总"]}),l.jsxs("p",{children:[E.period.startDate," — ",E.period.endDate]})]})]}),l.jsxs("dl",{className:"report-result-stats",children:[l.jsxs("div",{children:[l.jsx("dt",{children:"日报"}),l.jsxs("dd",{children:[E.parsedReports," / ",E.plannedReports," 份"]})]}),l.jsxs("div",{children:[l.jsx("dt",{children:"设备"}),l.jsxs("dd",{children:[E.deviceCount," 台"]})]})]}),l.jsxs("div",{className:"report-output",children:[l.jsx("span",{children:"文件位置"}),l.jsx("p",{children:E.summaryPath}),l.jsxs("button",{className:"secondary",onClick:se,children:[l.jsx(HC,{}),_?"已复制":"复制路径"]})]}),l.jsxs("details",{className:"report-details",children:[l.jsx("summary",{children:"汇总明细"}),l.jsxs("p",{children:["数据点：",E.actualDataPoints," / ",E.expectedDataPoints]}),E.warnings.map((K,P)=>l.jsx("p",{children:K},P))]})]}):l.jsxs("div",{className:"report-empty",children:[l.jsx(Cv,{}),l.jsx("strong",{children:p==="run"?"正在生成汇总":k?"未生成汇总文件":"尚未生成汇总"}),l.jsx("p",{children:p==="run"?"完成后可在这里查看文件。":k?"处理错误后，可重新汇总。":"选择统计范围后开始汇总。"})]})]})]})]}),l.jsx(fl,{open:f,onOpenChange:pe,children:l.jsxs(hl,{children:[l.jsx(ml,{className:"dialog-overlay"}),l.jsxs(pl,{className:"report-settings-dialog",children:[l.jsxs("div",{className:"report-settings-heading",children:[l.jsx(gl,{children:"报表设置"}),l.jsx(vl,{asChild:!0,children:l.jsx("button",{className:"secondary report-icon-button",disabled:!!p,"aria-label":"关闭报表设置",children:l.jsx(Yf,{})})})]}),l.jsx(yl,{className:"report-sr-only",children:"设置报表连接与文件保存位置。"}),l.jsxs("form",{onSubmit:le,children:[l.jsxs("fieldset",{disabled:!!p,children:[l.jsx("legend",{children:"报表连接"}),l.jsxs("label",{children:["报表网页",l.jsx("input",{type:"url",required:!0,value:u.reportUrl,onChange:K=>h({...u,reportUrl:K.target.value}),placeholder:"https://…"})]}),l.jsxs("div",{className:"report-settings-grid",children:[l.jsxs("label",{children:["账号",l.jsx("input",{required:!0,autoComplete:"username",value:u.username,onChange:K=>h({...u,username:K.target.value})})]}),l.jsxs("label",{children:["密码",l.jsx("input",{type:"password",required:!(n!=null&&n.credentialsConfigured),autoComplete:"new-password",value:u.password,onChange:K=>h({...u,password:K.target.value}),placeholder:n!=null&&n.credentialsConfigured?"留空保持原密码":"请输入密码"})]})]})]}),l.jsxs("fieldset",{disabled:!!p,children:[l.jsx("legend",{children:"保存位置"}),l.jsxs("label",{children:["原始日报",l.jsx("input",{required:!0,value:u.sourceRoot,onChange:K=>h({...u,sourceRoot:K.target.value})})]}),l.jsxs("label",{children:["汇总文件",l.jsx("input",{required:!0,value:u.outputRoot,onChange:K=>h({...u,outputRoot:K.target.value})})]})]}),b&&l.jsx("p",{className:"report-error",role:"alert",children:b}),l.jsxs("div",{className:"report-settings-actions",children:[l.jsx(vl,{asChild:!0,children:l.jsx("button",{className:"secondary",type:"button",disabled:!!p,children:"取消"})}),l.jsx("button",{className:"primary",type:"submit",disabled:!!p,children:p==="save"?"保存中…":"保存设置"})]})]})]})]})})]})}const sf="••••••••••••",rx=[{key:"connection",label:"连接",keywords:"Notion API 令牌 根页面 数据源",icon:l.jsx(CA,{})},{key:"notification",label:"通知",keywords:"钉钉 Webhook Secret 规则",icon:l.jsx(DA,{})},{key:"data",label:"数据与缓存",keywords:"Notion 数据源 缓存 绑定",icon:l.jsx(NA,{})},{key:"about",label:"关于",keywords:"版本 WebView2 React TypeScript",icon:l.jsx(AA,{})}];function xA({open:n,onClose:a}){const[s,o]=S.useState("connection"),[u,h]=S.useState(""),[f,m]=S.useState(null),[p,g]=S.useState(""),[v,x]=S.useState(""),[b,j]=S.useState(""),E=S.useRef(null),T=S.useRef(null);S.useEffect(()=>{if(!n)return;T.current=document.activeElement instanceof HTMLElement?document.activeElement:null,j("settings.open"),x(""),be("settings.open").then(B=>m(B)).catch(B=>x(B instanceof Error?B.message:"设置加载失败，请重试。")).finally(()=>j("")),window.setTimeout(()=>{var B;return(B=E.current)==null?void 0:B.focus()},0);const k=B=>{B.key==="Escape"&&a()};return window.addEventListener("keydown",k),()=>{var B;window.removeEventListener("keydown",k),(B=T.current)==null||B.focus()}},[n,a]),S.useEffect(()=>{if(!p)return;const k=window.setTimeout(()=>g(""),3e3);return()=>window.clearTimeout(k)},[p]);const D=async(k,B)=>{j(k),x(""),g("");try{const _=await be(k,B,6e4);return(k==="settings.refreshDataSources"||k==="settings.saveConnection")&&oD(!0),m(_.state),g(_.message),!0}catch(_){return x(_ instanceof Error?_.message:"操作未完成，请重试。"),!1}finally{j("")}},O=S.useMemo(()=>{const k=u.trim().toLocaleLowerCase("zh-CN");return k?rx.filter(B=>`${B.label} ${B.keywords}`.toLocaleLowerCase("zh-CN").includes(k)):rx},[u]);return n?l.jsx("div",{className:"settings-overlay",onMouseDown:k=>{k.target===k.currentTarget&&a()},children:l.jsxs("div",{className:"settings-window",role:"dialog","aria-modal":"true","aria-label":"设置",children:[l.jsxs("aside",{className:"settings-sidebar",children:[l.jsxs("label",{className:"settings-search",children:[l.jsx(TA,{}),l.jsx("input",{value:u,onChange:k=>h(k.target.value),placeholder:"搜索设置","aria-label":"搜索设置"})]}),l.jsx("div",{className:"settings-sidebar-title",children:"设置"}),l.jsxs("nav",{className:"settings-nav","aria-label":"设置分类",children:[O.map(k=>l.jsxs("button",{type:"button",className:s===k.key?"settings-nav-item active":"settings-nav-item","aria-current":s===k.key?"page":void 0,onClick:()=>o(k.key),children:[l.jsx("span",{className:"settings-nav-icon",children:k.icon}),l.jsx("span",{children:k.label})]},k.key)),O.length===0&&l.jsx("p",{className:"settings-empty-search",children:"没有匹配的设置"})]})]}),l.jsxs("main",{className:"settings-main",children:[l.jsx("button",{ref:E,type:"button",className:"settings-close",onClick:a,"aria-label":"关闭设置",children:l.jsx(MA,{})}),l.jsxs("div",{className:"settings-content",children:[b==="settings.open"&&!f?l.jsx("div",{className:"settings-loading",children:"正在读取本机设置…"}):l.jsxs(l.Fragment,{children:[s==="connection"&&f&&l.jsx(bA,{state:f,busy:b,run:D}),s==="notification"&&f&&l.jsx(SA,{state:f,busy:b,run:D}),s==="data"&&f&&l.jsx(wA,{state:f,busy:b,run:D}),s==="about"&&f&&l.jsx(jA,{state:f})]}),(p||v)&&l.jsx("div",{className:`settings-message ${v?"error":""}`,role:"status","aria-live":"polite",children:v||p})]})]})]})}):null}function bA({state:n,busy:a,run:s}){const[o,u]=S.useState(""),[h,f]=S.useState(!1),[m,p]=S.useState(n.notion.rootPageId);S.useEffect(()=>p(n.notion.rootPageId),[n.notion.rootPageId]);const g=async b=>{await s(b,{token:h?o:"",rootPageId:m})&&(u(""),f(!1))},v=a==="settings.refreshDataSources",x=a==="settings.saveConnection";return l.jsxs(Cl,{title:"连接",description:"管理生产助手使用的外部数据源和服务连接。",children:[l.jsxs(Pr,{title:"Notion",children:[l.jsx(Ut,{title:"连接状态",description:"当前本机连接配置和数据源缓存状态",children:l.jsx(W0,{connected:n.notion.configured,label:n.notion.configured?"已配置":"未配置"})}),l.jsx(Ji,{title:"API 令牌",description:"使用 Windows 当前用户加密后保存在本机",children:l.jsx("input",{className:"settings-input",type:"password",autoComplete:"off",placeholder:"输入 Notion API Token",value:h?o:n.notion.configured?sf:"",onFocus:b=>{!h&&n.notion.configured&&b.currentTarget.select()},onChange:b=>{f(!0),u(b.target.value)}})}),l.jsx(Ji,{title:"根页面 ID",description:"可选。留空时自动发现当前令牌有权限访问的数据源",children:l.jsx("input",{className:"settings-input",value:m,onChange:b=>p(b.target.value)})}),l.jsxs("div",{className:"settings-buttons",children:[l.jsxs("button",{type:"button",className:"settings-button-primary",disabled:!!a,onClick:()=>g("settings.saveConnection"),children:[x&&l.jsx(as,{})," ",x?"正在连接…":"保存并连接"]}),l.jsxs("button",{type:"button",className:"settings-button-secondary",disabled:!!a,onClick:()=>g("settings.refreshDataSources"),children:[v&&l.jsx(as,{})," ",v?"正在刷新…":"刷新数据源"]})]})]}),l.jsxs(Pr,{title:"数据源",children:[l.jsx(Ut,{title:"已发现数据源",description:"最近一次从 Notion 获取的数据源",children:l.jsxs("span",{className:"settings-value",children:[n.notion.dataSourceCount," 个"]})}),l.jsx(Ut,{title:"上次同步",description:"数据源元信息最后更新时间",children:l.jsx("span",{className:"settings-value",children:n.notion.lastSyncedAt||"尚未同步"})})]})]})}function SA({state:n,busy:a,run:s}){const o=n.notification,[u,h]=S.useState(o.enabled),[f,m]=S.useState(o.channelName),[p,g]=S.useState(""),[v,x]=S.useState(""),[b,j]=S.useState(!1),[E,T]=S.useState(!1),[D,O]=S.useState(o.rules);S.useEffect(()=>{h(o.enabled),m(o.channelName),O(o.rules)},[o]);const k={enabled:u,channelName:f,webhook:b?p:"",secret:E?v:""},B=async q=>{await s(q,k)&&(g(""),x(""),j(!1),T(!1))},_=a==="settings.saveNotification",U=a==="settings.testNotification";return l.jsxs(Cl,{title:"通知",description:"配置生产助手全局通知使用的技术通道。业务模块只决定何时通知。",children:[l.jsxs(Pr,{title:"通知服务",children:[l.jsx(Ut,{title:"启用通知",description:"关闭后所有业务模块都不会向外发送通知",children:l.jsx(ax,{checked:u,onChange:h,label:"启用通知"})}),l.jsx(Ut,{title:"发送方式",description:"当前使用的全局通知技术通道",children:l.jsx("span",{className:"settings-value",children:"钉钉机器人 Webhook"})}),l.jsx(Ut,{title:"连接状态",description:o.checkedAt?`上次测试 ${o.checkedAt}`:"尚未发送测试通知",children:l.jsx(W0,{connected:o.connected,label:o.connected===!0?"连接正常":o.connected===!1?"连接失败":"待测试"})})]}),l.jsxs(Pr,{title:"钉钉机器人",children:[l.jsx(Ji,{title:"Webhook URL",description:"使用 Windows 当前用户加密后保存在本机",children:l.jsx("input",{className:"settings-input",type:"password",autoComplete:"off",placeholder:"https://oapi.dingtalk.com/robot/send?...",value:b?p:o.webhookConfigured?sf:"",onFocus:q=>{!b&&o.webhookConfigured&&q.currentTarget.select()},onChange:q=>{j(!0),g(q.target.value)}})}),l.jsx(Ji,{title:"加签密钥",description:"钉钉机器人 Secret，使用 Windows 当前用户加密保存",children:l.jsx("input",{className:"settings-input",type:"password",autoComplete:"off",placeholder:"SEC...",value:E?v:o.secretConfigured?sf:"",onFocus:q=>{!E&&o.secretConfigured&&q.currentTarget.select()},onChange:q=>{T(!0),x(q.target.value)}})}),l.jsx(Ji,{title:"默认接收群",description:"用于识别当前通知渠道",children:l.jsx("input",{className:"settings-input",value:f,onChange:q=>m(q.target.value),placeholder:"生产管理群"})}),l.jsxs("div",{className:"settings-buttons",children:[l.jsxs("button",{type:"button",className:"settings-button-primary",disabled:!!a,onClick:()=>B("settings.saveNotification"),children:[_&&l.jsx(as,{})," ",_?"正在保存…":"保存设置"]}),l.jsxs("button",{type:"button",className:"settings-button-secondary",disabled:!!a,onClick:()=>B("settings.testNotification"),children:[U&&l.jsx(as,{})," ",U?"正在发送…":"发送测试"]})]}),o.status&&l.jsx("p",{className:"settings-inline-status",children:o.status})]}),l.jsxs(Pr,{title:"通知规则",children:[l.jsx("div",{className:"settings-rule-list",children:D.map(q=>l.jsx(Ut,{title:q.name,description:`钉钉 · ${EA(q.level)}`,children:l.jsx(ax,{checked:q.enabled,label:`通知规则：${q.name}`,onChange:N=>O(M=>M.map(V=>V.eventType===q.eventType?{...V,enabled:N}:V))})},q.eventType))}),l.jsx("div",{className:"settings-buttons settings-buttons-end",children:l.jsx("button",{type:"button",className:"settings-button-primary",disabled:!!a,onClick:()=>s("settings.saveNotificationRules",{rules:D}),children:"保存通知规则"})})]})]})}function wA({state:n,busy:a,run:s}){return l.jsx(Cl,{title:"数据与缓存",description:"查看和维护生产助手保存在本机的 Notion 数据源缓存。",children:l.jsxs(Pr,{title:"本地数据",children:[l.jsx(Ut,{title:"Notion 数据源缓存",description:"用于减少重复的网络请求",children:l.jsxs("div",{className:"settings-inline-actions",children:[l.jsxs("span",{className:"settings-value",children:[n.notion.dataSourceCount," 个"]}),l.jsxs("button",{type:"button",className:"settings-text-button",disabled:!!a,onClick:()=>s("settings.refreshDataSources"),children:[a==="settings.refreshDataSources"&&l.jsx(as,{})," ",a==="settings.refreshDataSources"?"刷新中…":"刷新"]})]})}),l.jsx(Ut,{title:"上次同步",description:"数据源元信息最后更新时间",children:l.jsx("span",{className:"settings-value",children:n.notion.lastSyncedAt||"尚未同步"})})]})})}function jA({state:n}){return l.jsx(Cl,{title:"关于",description:"生产助手的版本和运行环境信息。",children:l.jsxs(Pr,{title:"生产助手",children:[l.jsx(Ut,{title:"版本",description:"当前安装版本",children:l.jsx("span",{className:"settings-value",children:n.version})}),l.jsx(Ut,{title:"桌面环境",description:"应用运行容器",children:l.jsx("span",{className:"settings-value",children:"WinUI 3 + WebView2"})}),l.jsx(Ut,{title:"前端",description:"用户界面技术栈",children:l.jsx("span",{className:"settings-value",children:"React + TypeScript"})}),l.jsx(Ut,{title:"本地数据保护",description:"令牌和通知凭据仅保存在本机",children:l.jsx("span",{className:"settings-value",children:"Windows 当前用户加密"})})]})})}function Cl({title:n,description:a,children:s}){return l.jsxs("div",{className:"settings-page",children:[l.jsxs("header",{className:"settings-page-header",children:[l.jsx("h1",{children:n}),l.jsx("p",{children:a})]}),s]})}function Pr({title:n,children:a}){return l.jsxs("section",{className:"settings-section",children:[l.jsx("h2",{children:n}),l.jsx("div",{className:"settings-section-body",children:a})]})}function Ut({title:n,description:a,children:s}){return l.jsxs("div",{className:"settings-row",children:[l.jsxs("div",{className:"settings-row-text",children:[l.jsx("div",{className:"settings-row-title",children:n}),a&&l.jsx("div",{className:"settings-row-description",children:a})]}),l.jsx("div",{className:"settings-row-control",children:s})]})}function Ji({title:n,description:a,children:s}){return l.jsxs("label",{className:"settings-field",children:[l.jsx("span",{className:"settings-field-title",children:n}),a&&l.jsx("span",{className:"settings-field-description",children:a}),l.jsx("span",{className:"settings-field-control",children:s})]})}function ax({checked:n,onChange:a,label:s}){return l.jsx("button",{type:"button",role:"switch","aria-checked":n,"aria-label":s,className:n?"settings-switch checked":"settings-switch",onClick:()=>a(!n),children:l.jsx("span",{})})}function W0({connected:n,label:a}){return l.jsxs("div",{className:`settings-connected ${n===!1?"error":n===null?"pending":""}`,children:[l.jsx("span",{className:"settings-status-dot"}),a]})}function as(){return l.jsx("span",{className:"settings-spinner","aria-hidden":"true"})}const EA=n=>n==="warning"?"警告":n==="info"?"信息":"错误";function TA(){return l.jsxs("svg",{viewBox:"0 0 24 24","aria-hidden":"true",children:[l.jsx("circle",{cx:"11",cy:"11",r:"6.5"}),l.jsx("path",{d:"m16 16 4 4"})]})}function CA(){return l.jsxs("svg",{viewBox:"0 0 24 24","aria-hidden":"true",children:[l.jsx("path",{d:"M10 13a5 5 0 0 0 7.1.1l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1"}),l.jsx("path",{d:"M14 11a5 5 0 0 0-7.1-.1l-2 2A5 5 0 0 0 12 20l1.1-1.1"})]})}function DA(){return l.jsxs("svg",{viewBox:"0 0 24 24","aria-hidden":"true",children:[l.jsx("path",{d:"M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"}),l.jsx("path",{d:"M10 21h4"})]})}function NA(){return l.jsxs("svg",{viewBox:"0 0 24 24","aria-hidden":"true",children:[l.jsx("ellipse",{cx:"12",cy:"5",rx:"7",ry:"3"}),l.jsx("path",{d:"M5 5v6c0 1.7 3.1 3 7 3s7-1.3 7-3V5"}),l.jsx("path",{d:"M5 11v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"})]})}function AA(){return l.jsxs("svg",{viewBox:"0 0 24 24","aria-hidden":"true",children:[l.jsx("circle",{cx:"12",cy:"12",r:"9"}),l.jsx("path",{d:"M12 11v6"}),l.jsx("path",{d:"M12 7h.01"})]})}function MA(){return l.jsxs("svg",{viewBox:"0 0 24 24","aria-hidden":"true",children:[l.jsx("path",{d:"m6 6 12 12"}),l.jsx("path",{d:"m18 6-12 12"})]})}const Sd=new Date().toISOString().slice(0,10);function kA(){const[n,a]=S.useState(""),[s,o]=S.useState(!1),[u,h]=S.useState([]),[f,m]=S.useState(""),[p,g]=S.useState([]),[v,x]=S.useState(""),[b,j]=S.useState([]),[E,T]=S.useState(""),[D,O]=S.useState([]),[k,B]=S.useState(""),[_,U]=S.useState(""),[q,N]=S.useState("day"),[M,V]=S.useState(Sd),[$,J]=S.useState(Sd),[re,pe]=S.useState(Sd),[le,ve]=S.useState("load"),[H,se]=S.useState(""),[K,P]=S.useState();S.useEffect(()=>{be("database.getState").then(te=>{a(te.provider),o(te.usesBusinessSections),h(te.businessSections),g(te.sources)}).catch(te=>se(te instanceof Error?te.message:String(te))).finally(()=>ve(""))},[]);const ne=async te=>{var he,Ce,Oe,Qe;if(x(te),T(""),B(""),U(""),j([]),O([]),P(void 0),se(""),!!te){ve("schema");try{const Xe=await be("database.getSchema",{sourceId:te});O(Xe.fields),j(Xe.datasets),B(((he=Xe.fields.find(yt=>yt.type==="date"))==null?void 0:he.id)||""),U(((Ce=Xe.fields.find(yt=>yt.type==="number"))==null?void 0:Ce.id)||""),T(((Oe=Xe.datasets.find(yt=>yt.name==="本年截止今日"))==null?void 0:Oe.id)||((Qe=Xe.datasets[0])==null?void 0:Qe.id)||"")}catch(Xe){se(Xe instanceof Error?Xe.message:String(Xe))}finally{ve("")}}},C=async()=>{ve("query"),se(""),P(void 0);try{P(await be("database.inspect",{sourceId:v,datasetId:E,dateFieldId:ye?k:"",valueFieldId:ye?_:"",rangeKind:ye?q:"all",businessDate:M,startDate:$,endDate:re},12e4))}catch(te){se(te instanceof Error?te.message:String(te))}finally{ve("")}},R=D.filter(te=>te.type==="date"),I=s?p.filter(te=>te.businessSection===f):p,ie=D.filter(te=>te.type==="number"),oe=D.find(te=>te.id===_),fe=b.find(te=>te.id===E),ye=(fe==null?void 0:fe.name.trim())==="本年截止今日",ae=S.useMemo(()=>{const te=new Set([k,_]);return[...D.filter(he=>te.has(he.id)),...D.filter(he=>!te.has(he.id))]},[D,k,_]),Q=q==="week"||q==="custom",ue=v&&E&&(!ye||k&&(!Q||$&&re));return l.jsxs("div",{className:"page database-viewer-page",children:[l.jsxs("header",{children:[l.jsxs("div",{children:[l.jsx("h1",{children:"数据库查看"}),l.jsx("p",{children:"按当前适配器提供的目录选择数据库并查看真实 View；目录层级不会由界面写死。"})]}),l.jsxs("span",{className:"database-provider",children:[l.jsx(Xd,{}),"当前适配器：",n||"读取中"]})]}),l.jsxs("section",{className:"database-query-panel",children:[l.jsxs("div",{className:"database-query-heading",children:[l.jsx("h2",{children:"查询条件"}),l.jsx("p",{children:"普通 View 读取其完整结果；只有“本年截止今日”可在返回记录内计算日期口径。"})]}),l.jsxs("div",{className:"database-query-grid",children:[s&&l.jsxs("label",{children:["业务板块",l.jsx(hr,{value:f,placeholder:le==="load"?"正在读取业务板块…":"请选择业务板块",disabled:!!le,options:u.map(te=>({value:te,label:te})),onChange:te=>{m(te),ne("")}})]}),l.jsxs("label",{children:["数据库",l.jsx(hr,{value:v,placeholder:"请选择具体数据库",disabled:s&&!f||!!le,options:I.map(te=>({value:te.id,label:te.name})),onChange:ne})]}),l.jsxs("label",{children:["View",l.jsx(hr,{value:E,placeholder:le==="schema"?"正在读取 View…":"请选择 View",disabled:!v||!!le,options:b.map(te=>({value:te.id,label:te.name})),onChange:te=>{T(te),P(void 0)}})]}),ye&&l.jsxs(l.Fragment,{children:[l.jsxs("label",{children:["日期字段",l.jsx(hr,{value:k,placeholder:"请选择日期字段",disabled:!D.length||!!le,options:R.map(te=>({value:te.id,label:te.name})),onChange:B})]}),l.jsxs("label",{children:["累计字段",l.jsx(hr,{value:_,placeholder:"可选择数值字段",disabled:!D.length||!!le,options:ie.map(te=>({value:te.id,label:te.name})),onChange:U})]}),l.jsxs("label",{children:["软件查询口径",l.jsx(hr,{value:q,placeholder:"请选择日期口径",disabled:!!le,options:[{value:"day",label:"指定日期"},{value:"week",label:"指定日期范围"},{value:"month",label:"月初至指定日期"},{value:"year",label:"年初至指定日期"}],onChange:te=>{N(te),P(void 0)}})]}),!Q&&l.jsxs("label",{children:["指定日期",l.jsx(yd,{value:M,onChange:V})]}),Q&&l.jsxs(l.Fragment,{children:[l.jsxs("label",{children:["开始日期",l.jsx(yd,{value:$,onChange:J})]}),l.jsxs("label",{children:["结束日期",l.jsx(yd,{value:re,onChange:pe})]})]})]})]}),l.jsx("div",{className:"database-query-actions",children:l.jsxs("button",{className:"primary",disabled:!ue||!!le,onClick:C,children:[le==="query"?l.jsx(Fr,{className:"spin"}):l.jsx(GC,{}),le==="query"?"正在查询…":"执行查询"]})})]}),H&&l.jsxs("div",{className:"notice error",role:"alert",children:[l.jsx(UC,{}),l.jsxs("div",{children:[l.jsx("strong",{children:"查询失败"}),l.jsx("span",{children:H})]})]}),K?l.jsxs("section",{className:"database-result",children:[l.jsxs("div",{className:"database-result-head",children:[l.jsxs("div",{children:[l.jsxs("h2",{children:[K.sourceName," · ",K.datasetName]}),l.jsx("p",{children:ye?`${K.startDate} ～ ${K.endDate}`:"完整 View 结果"})]}),l.jsxs("dl",{children:[l.jsxs("div",{children:[l.jsxs("dt",{children:[l.jsx(XC,{}),"命中记录"]}),l.jsx("dd",{children:K.recordCount})]}),ye&&l.jsxs("div",{children:[l.jsxs("dt",{children:[l.jsx(KC,{}),(oe==null?void 0:oe.name)||"累计值"]}),l.jsx("dd",{children:K.total??"—"})]})]})]}),l.jsx("div",{className:"database-table-wrap",children:l.jsxs("table",{children:[l.jsx("thead",{children:l.jsx("tr",{children:ae.map(te=>l.jsxs("th",{children:[te.name,l.jsx("small",{children:te.type})]},te.id))})}),l.jsx("tbody",{children:K.records.map(te=>l.jsx("tr",{children:ae.map(he=>l.jsx("td",{children:RA(te.values[he.id])},he.id))},te.id))})]})}),K.truncated&&l.jsx("p",{className:"database-truncated",children:"结果仅展示前 200 条，命中数量和累计值按全部记录计算。"})]}):!le&&!H&&l.jsxs("section",{className:"database-empty",children:[l.jsx(Xd,{}),l.jsx("h2",{children:s?"选择业务板块、数据库和 View 后执行查询":"选择数据库和 View 后执行查询"}),l.jsx("p",{children:"普通 View 显示完整结果；“本年截止今日”可进一步选择日期口径。所有操作均为只读。"})]})]})}function RA(n){return n==null||n===""?"—":typeof n=="boolean"?n?"是":"否":typeof n=="number"?n.toLocaleString("zh-CN",{maximumFractionDigits:2}):String(n)}function OA(){const[n,a]=S.useState(()=>window.location.search),[s,o]=S.useState(!1);S.useEffect(()=>{const j=()=>a(window.location.search);return window.addEventListener("popstate",j),()=>window.removeEventListener("popstate",j)},[]);const u=new URLSearchParams(n),h=u.get("route"),f=h!=null&&h.startsWith("navigation:")||h==="daily-weld"||h==="production-message"||h==="database-viewer"||h==="daily-report"||h==="report-center"||h==="plan-pdf"?h:"production-message",m=u.get("navigation")||"",p=Xb();S.useEffect(()=>{kC(f,m)},[f,m]);const g=j=>be("app.navigateNative",{tag:j}).catch(()=>{}),v=f.startsWith("navigation:")?f.slice(11):f,x=f.startsWith("navigation:");S.useEffect(()=>(document.body.classList.toggle("settings-over-native",x&&s),()=>document.body.classList.remove("settings-over-native")),[x,s]);const b=()=>{o(!1),window.dispatchEvent(new Event("production-settings-updated")),be("settings.close").catch(()=>{})};return l.jsxs("div",{className:`desktop-shell ${x&&s?"settings-over-native":""}`,children:[l.jsx("div",{className:"production-message-demo desktop-shell-navigation",children:l.jsx(oA,{active:v,navigate:g,openSettings:()=>o(!0)})}),l.jsx("div",{className:`desktop-shell-content ${x?"desktop-shell-content-native":""}`,children:x?l.jsx("div",{className:"native-content-slot","aria-hidden":"true"}):f==="production-message"||f==="daily-weld"?l.jsx("div",{className:"production-message-demo production-message-content",children:f==="daily-weld"?l.jsx(aA,{openSettings:()=>o(!0)}):l.jsx(mA,{})}):l.jsx("div",{className:"app-shell",children:l.jsx("main",{children:l.jsx(bT,{mode:"wait",children:l.jsx(Uf.div,{initial:p?!1:{opacity:0,y:8},animate:{opacity:1,y:0},exit:p?void 0:{opacity:0,y:-6},transition:{duration:.2},children:f==="plan-pdf"?l.jsx(yA,{}):f==="database-viewer"?l.jsx(kA,{}):f==="daily-report"?l.jsx(IN,{openSettings:()=>o(!0)}):l.jsx(vA,{})},f)})})})}),l.jsx(xA,{open:s,onClose:b})]})}Mw.createRoot(document.getElementById("root")).render(l.jsx(ox.StrictMode,{children:l.jsx(OA,{})}));
