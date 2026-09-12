function jj(n,a){for(var s=0;s<a.length;s++){const l=a[s];if(typeof l!="string"&&!Array.isArray(l)){for(const u in l)if(u!=="default"&&!(u in n)){const h=Object.getOwnPropertyDescriptor(l,u);h&&Object.defineProperty(n,u,h.get?h:{enumerable:!0,get:()=>l[u]})}}}return Object.freeze(Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}))}(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const u of document.querySelectorAll('link[rel="modulepreload"]'))l(u);new MutationObserver(u=>{for(const h of u)if(h.type==="childList")for(const f of h.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&l(f)}).observe(document,{childList:!0,subtree:!0});function s(u){const h={};return u.integrity&&(h.integrity=u.integrity),u.referrerPolicy&&(h.referrerPolicy=u.referrerPolicy),u.crossOrigin==="use-credentials"?h.credentials="include":u.crossOrigin==="anonymous"?h.credentials="omit":h.credentials="same-origin",h}function l(u){if(u.ep)return;u.ep=!0;const h=s(u);fetch(u.href,h)}})();function ox(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}var Gu={exports:{}},qi={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ty;function wj(){if(ty)return qi;ty=1;var n=Symbol.for("react.transitional.element"),a=Symbol.for("react.fragment");function s(l,u,h){var f=null;if(h!==void 0&&(f=""+h),u.key!==void 0&&(f=""+u.key),"key"in u){h={};for(var m in u)m!=="key"&&(h[m]=u[m])}else h=u;return u=h.ref,{$$typeof:n,type:l,key:f,ref:u!==void 0?u:null,props:h}}return qi.Fragment=a,qi.jsx=s,qi.jsxs=s,qi}var ny;function Ej(){return ny||(ny=1,Gu.exports=wj()),Gu.exports}var o=Ej(),Fu={exports:{}},we={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ry;function Tj(){if(ry)return we;ry=1;var n=Symbol.for("react.transitional.element"),a=Symbol.for("react.portal"),s=Symbol.for("react.fragment"),l=Symbol.for("react.strict_mode"),u=Symbol.for("react.profiler"),h=Symbol.for("react.consumer"),f=Symbol.for("react.context"),m=Symbol.for("react.forward_ref"),p=Symbol.for("react.suspense"),g=Symbol.for("react.memo"),v=Symbol.for("react.lazy"),x=Symbol.for("react.activity"),b=Symbol.iterator;function E(C){return C===null||typeof C!="object"?null:(C=b&&C[b]||C["@@iterator"],typeof C=="function"?C:null)}var w={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},N=Object.assign,T={};function A(C,z,re){this.props=C,this.context=z,this.refs=T,this.updater=re||w}A.prototype.isReactComponent={},A.prototype.setState=function(C,z){if(typeof C!="object"&&typeof C!="function"&&C!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,C,z,"setState")},A.prototype.forceUpdate=function(C){this.updater.enqueueForceUpdate(this,C,"forceUpdate")};function D(){}D.prototype=A.prototype;function _(C,z,re){this.props=C,this.context=z,this.refs=T,this.updater=re||w}var O=_.prototype=new D;O.constructor=_,N(O,A.prototype),O.isPureReactComponent=!0;var U=Array.isArray;function H(){}var M={H:null,A:null,T:null,S:null},R=Object.prototype.hasOwnProperty;function V(C,z,re){var ce=re.ref;return{$$typeof:n,type:C,key:z,ref:ce!==void 0?ce:null,props:re}}function K(C,z){return V(C.type,z,C.props)}function Q(C){return typeof C=="object"&&C!==null&&C.$$typeof===n}function ie(C){var z={"=":"=0",":":"=2"};return"$"+C.replace(/[=:]/g,function(re){return z[re]})}var J=/\/+/g;function G(C,z){return typeof C=="object"&&C!==null&&C.key!=null?ie(""+C.key):z.toString(36)}function de(C){switch(C.status){case"fulfilled":return C.value;case"rejected":throw C.reason;default:switch(typeof C.status=="string"?C.then(H,H):(C.status="pending",C.then(function(z){C.status==="pending"&&(C.status="fulfilled",C.value=z)},function(z){C.status==="pending"&&(C.status="rejected",C.reason=z)})),C.status){case"fulfilled":return C.value;case"rejected":throw C.reason}}throw C}function L(C,z,re,ce,ue){var fe=typeof C;(fe==="undefined"||fe==="boolean")&&(C=null);var be=!1;if(C===null)be=!0;else switch(fe){case"bigint":case"string":case"number":be=!0;break;case"object":switch(C.$$typeof){case n:case a:be=!0;break;case v:return be=C._init,L(be(C._payload),z,re,ce,ue)}}if(be)return ue=ue(C),be=ce===""?"."+G(C,0):ce,U(ue)?(re="",be!=null&&(re=be.replace(J,"$&/")+"/"),L(ue,z,re,"",function(he){return he})):ue!=null&&(Q(ue)&&(ue=K(ue,re+(ue.key==null||C&&C.key===ue.key?"":(""+ue.key).replace(J,"$&/")+"/")+be)),z.push(ue)),1;be=0;var oe=ce===""?".":ce+":";if(U(C))for(var I=0;I<C.length;I++)ce=C[I],fe=oe+G(ce,I),be+=L(ce,z,re,fe,ue);else if(I=E(C),typeof I=="function")for(C=I.call(C),I=0;!(ce=C.next()).done;)ce=ce.value,fe=oe+G(ce,I++),be+=L(ce,z,re,fe,ue);else if(fe==="object"){if(typeof C.then=="function")return L(de(C),z,re,ce,ue);throw z=String(C),Error("Objects are not valid as a React child (found: "+(z==="[object Object]"?"object with keys {"+Object.keys(C).join(", ")+"}":z)+"). If you meant to render a collection of children, use an array instead.")}return be}function ne(C,z,re){if(C==null)return C;var ce=[],ue=0;return L(C,ce,"","",function(fe){return z.call(re,fe,ue++)}),ce}function W(C){if(C._status===-1){var z=C._result;z=z(),z.then(function(re){(C._status===0||C._status===-1)&&(C._status=1,C._result=re)},function(re){(C._status===0||C._status===-1)&&(C._status=2,C._result=re)}),C._status===-1&&(C._status=0,C._result=z)}if(C._status===1)return C._result.default;throw C._result}var Y=typeof reportError=="function"?reportError:function(C){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var z=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof C=="object"&&C!==null&&typeof C.message=="string"?String(C.message):String(C),error:C});if(!window.dispatchEvent(z))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",C);return}console.error(C)},te={map:ne,forEach:function(C,z,re){ne(C,function(){z.apply(this,arguments)},re)},count:function(C){var z=0;return ne(C,function(){z++}),z},toArray:function(C){return ne(C,function(z){return z})||[]},only:function(C){if(!Q(C))throw Error("React.Children.only expected to receive a single React element child.");return C}};return we.Activity=x,we.Children=te,we.Component=A,we.Fragment=s,we.Profiler=u,we.PureComponent=_,we.StrictMode=l,we.Suspense=p,we.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=M,we.__COMPILER_RUNTIME={__proto__:null,c:function(C){return M.H.useMemoCache(C)}},we.cache=function(C){return function(){return C.apply(null,arguments)}},we.cacheSignal=function(){return null},we.cloneElement=function(C,z,re){if(C==null)throw Error("The argument must be a React element, but you passed "+C+".");var ce=N({},C.props),ue=C.key;if(z!=null)for(fe in z.key!==void 0&&(ue=""+z.key),z)!R.call(z,fe)||fe==="key"||fe==="__self"||fe==="__source"||fe==="ref"&&z.ref===void 0||(ce[fe]=z[fe]);var fe=arguments.length-2;if(fe===1)ce.children=re;else if(1<fe){for(var be=Array(fe),oe=0;oe<fe;oe++)be[oe]=arguments[oe+2];ce.children=be}return V(C.type,ue,ce)},we.createContext=function(C){return C={$$typeof:f,_currentValue:C,_currentValue2:C,_threadCount:0,Provider:null,Consumer:null},C.Provider=C,C.Consumer={$$typeof:h,_context:C},C},we.createElement=function(C,z,re){var ce,ue={},fe=null;if(z!=null)for(ce in z.key!==void 0&&(fe=""+z.key),z)R.call(z,ce)&&ce!=="key"&&ce!=="__self"&&ce!=="__source"&&(ue[ce]=z[ce]);var be=arguments.length-2;if(be===1)ue.children=re;else if(1<be){for(var oe=Array(be),I=0;I<be;I++)oe[I]=arguments[I+2];ue.children=oe}if(C&&C.defaultProps)for(ce in be=C.defaultProps,be)ue[ce]===void 0&&(ue[ce]=be[ce]);return V(C,fe,ue)},we.createRef=function(){return{current:null}},we.forwardRef=function(C){return{$$typeof:m,render:C}},we.isValidElement=Q,we.lazy=function(C){return{$$typeof:v,_payload:{_status:-1,_result:C},_init:W}},we.memo=function(C,z){return{$$typeof:g,type:C,compare:z===void 0?null:z}},we.startTransition=function(C){var z=M.T,re={};M.T=re;try{var ce=C(),ue=M.S;ue!==null&&ue(re,ce),typeof ce=="object"&&ce!==null&&typeof ce.then=="function"&&ce.then(H,Y)}catch(fe){Y(fe)}finally{z!==null&&re.types!==null&&(z.types=re.types),M.T=z}},we.unstable_useCacheRefresh=function(){return M.H.useCacheRefresh()},we.use=function(C){return M.H.use(C)},we.useActionState=function(C,z,re){return M.H.useActionState(C,z,re)},we.useCallback=function(C,z){return M.H.useCallback(C,z)},we.useContext=function(C){return M.H.useContext(C)},we.useDebugValue=function(){},we.useDeferredValue=function(C,z){return M.H.useDeferredValue(C,z)},we.useEffect=function(C,z){return M.H.useEffect(C,z)},we.useEffectEvent=function(C){return M.H.useEffectEvent(C)},we.useId=function(){return M.H.useId()},we.useImperativeHandle=function(C,z,re){return M.H.useImperativeHandle(C,z,re)},we.useInsertionEffect=function(C,z){return M.H.useInsertionEffect(C,z)},we.useLayoutEffect=function(C,z){return M.H.useLayoutEffect(C,z)},we.useMemo=function(C,z){return M.H.useMemo(C,z)},we.useOptimistic=function(C,z){return M.H.useOptimistic(C,z)},we.useReducer=function(C,z,re){return M.H.useReducer(C,z,re)},we.useRef=function(C){return M.H.useRef(C)},we.useState=function(C){return M.H.useState(C)},we.useSyncExternalStore=function(C,z,re){return M.H.useSyncExternalStore(C,z,re)},we.useTransition=function(){return M.H.useTransition()},we.version="19.2.8",we}var ay;function uf(){return ay||(ay=1,Fu.exports=Tj()),Fu.exports}var S=uf();const cx=ox(S),is=jj({__proto__:null,default:cx},[S]);var Xu={exports:{}},Yi={},$u={exports:{}},Ku={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var iy;function Cj(){return iy||(iy=1,(function(n){function a(L,ne){var W=L.length;L.push(ne);e:for(;0<W;){var Y=W-1>>>1,te=L[Y];if(0<u(te,ne))L[Y]=ne,L[W]=te,W=Y;else break e}}function s(L){return L.length===0?null:L[0]}function l(L){if(L.length===0)return null;var ne=L[0],W=L.pop();if(W!==ne){L[0]=W;e:for(var Y=0,te=L.length,C=te>>>1;Y<C;){var z=2*(Y+1)-1,re=L[z],ce=z+1,ue=L[ce];if(0>u(re,W))ce<te&&0>u(ue,re)?(L[Y]=ue,L[ce]=W,Y=ce):(L[Y]=re,L[z]=W,Y=z);else if(ce<te&&0>u(ue,W))L[Y]=ue,L[ce]=W,Y=ce;else break e}}return ne}function u(L,ne){var W=L.sortIndex-ne.sortIndex;return W!==0?W:L.id-ne.id}if(n.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var h=performance;n.unstable_now=function(){return h.now()}}else{var f=Date,m=f.now();n.unstable_now=function(){return f.now()-m}}var p=[],g=[],v=1,x=null,b=3,E=!1,w=!1,N=!1,T=!1,A=typeof setTimeout=="function"?setTimeout:null,D=typeof clearTimeout=="function"?clearTimeout:null,_=typeof setImmediate<"u"?setImmediate:null;function O(L){for(var ne=s(g);ne!==null;){if(ne.callback===null)l(g);else if(ne.startTime<=L)l(g),ne.sortIndex=ne.expirationTime,a(p,ne);else break;ne=s(g)}}function U(L){if(N=!1,O(L),!w)if(s(p)!==null)w=!0,H||(H=!0,ie());else{var ne=s(g);ne!==null&&de(U,ne.startTime-L)}}var H=!1,M=-1,R=5,V=-1;function K(){return T?!0:!(n.unstable_now()-V<R)}function Q(){if(T=!1,H){var L=n.unstable_now();V=L;var ne=!0;try{e:{w=!1,N&&(N=!1,D(M),M=-1),E=!0;var W=b;try{t:{for(O(L),x=s(p);x!==null&&!(x.expirationTime>L&&K());){var Y=x.callback;if(typeof Y=="function"){x.callback=null,b=x.priorityLevel;var te=Y(x.expirationTime<=L);if(L=n.unstable_now(),typeof te=="function"){x.callback=te,O(L),ne=!0;break t}x===s(p)&&l(p),O(L)}else l(p);x=s(p)}if(x!==null)ne=!0;else{var C=s(g);C!==null&&de(U,C.startTime-L),ne=!1}}break e}finally{x=null,b=W,E=!1}ne=void 0}}finally{ne?ie():H=!1}}}var ie;if(typeof _=="function")ie=function(){_(Q)};else if(typeof MessageChannel<"u"){var J=new MessageChannel,G=J.port2;J.port1.onmessage=Q,ie=function(){G.postMessage(null)}}else ie=function(){A(Q,0)};function de(L,ne){M=A(function(){L(n.unstable_now())},ne)}n.unstable_IdlePriority=5,n.unstable_ImmediatePriority=1,n.unstable_LowPriority=4,n.unstable_NormalPriority=3,n.unstable_Profiling=null,n.unstable_UserBlockingPriority=2,n.unstable_cancelCallback=function(L){L.callback=null},n.unstable_forceFrameRate=function(L){0>L||125<L?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):R=0<L?Math.floor(1e3/L):5},n.unstable_getCurrentPriorityLevel=function(){return b},n.unstable_next=function(L){switch(b){case 1:case 2:case 3:var ne=3;break;default:ne=b}var W=b;b=ne;try{return L()}finally{b=W}},n.unstable_requestPaint=function(){T=!0},n.unstable_runWithPriority=function(L,ne){switch(L){case 1:case 2:case 3:case 4:case 5:break;default:L=3}var W=b;b=L;try{return ne()}finally{b=W}},n.unstable_scheduleCallback=function(L,ne,W){var Y=n.unstable_now();switch(typeof W=="object"&&W!==null?(W=W.delay,W=typeof W=="number"&&0<W?Y+W:Y):W=Y,L){case 1:var te=-1;break;case 2:te=250;break;case 5:te=1073741823;break;case 4:te=1e4;break;default:te=5e3}return te=W+te,L={id:v++,callback:ne,priorityLevel:L,startTime:W,expirationTime:te,sortIndex:-1},W>Y?(L.sortIndex=W,a(g,L),s(p)===null&&L===s(g)&&(N?(D(M),M=-1):N=!0,de(U,W-Y))):(L.sortIndex=te,a(p,L),w||E||(w=!0,H||(H=!0,ie()))),L},n.unstable_shouldYield=K,n.unstable_wrapCallback=function(L){var ne=b;return function(){var W=b;b=ne;try{return L.apply(this,arguments)}finally{b=W}}}})(Ku)),Ku}var sy;function Nj(){return sy||(sy=1,$u.exports=Cj()),$u.exports}var Zu={exports:{}},vt={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ly;function Dj(){if(ly)return vt;ly=1;var n=uf();function a(p){var g="https://react.dev/errors/"+p;if(1<arguments.length){g+="?args[]="+encodeURIComponent(arguments[1]);for(var v=2;v<arguments.length;v++)g+="&args[]="+encodeURIComponent(arguments[v])}return"Minified React error #"+p+"; visit "+g+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function s(){}var l={d:{f:s,r:function(){throw Error(a(522))},D:s,C:s,L:s,m:s,X:s,S:s,M:s},p:0,findDOMNode:null},u=Symbol.for("react.portal");function h(p,g,v){var x=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:u,key:x==null?null:""+x,children:p,containerInfo:g,implementation:v}}var f=n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function m(p,g){if(p==="font")return"";if(typeof g=="string")return g==="use-credentials"?g:""}return vt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=l,vt.createPortal=function(p,g){var v=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!g||g.nodeType!==1&&g.nodeType!==9&&g.nodeType!==11)throw Error(a(299));return h(p,g,null,v)},vt.flushSync=function(p){var g=f.T,v=l.p;try{if(f.T=null,l.p=2,p)return p()}finally{f.T=g,l.p=v,l.d.f()}},vt.preconnect=function(p,g){typeof p=="string"&&(g?(g=g.crossOrigin,g=typeof g=="string"?g==="use-credentials"?g:"":void 0):g=null,l.d.C(p,g))},vt.prefetchDNS=function(p){typeof p=="string"&&l.d.D(p)},vt.preinit=function(p,g){if(typeof p=="string"&&g&&typeof g.as=="string"){var v=g.as,x=m(v,g.crossOrigin),b=typeof g.integrity=="string"?g.integrity:void 0,E=typeof g.fetchPriority=="string"?g.fetchPriority:void 0;v==="style"?l.d.S(p,typeof g.precedence=="string"?g.precedence:void 0,{crossOrigin:x,integrity:b,fetchPriority:E}):v==="script"&&l.d.X(p,{crossOrigin:x,integrity:b,fetchPriority:E,nonce:typeof g.nonce=="string"?g.nonce:void 0})}},vt.preinitModule=function(p,g){if(typeof p=="string")if(typeof g=="object"&&g!==null){if(g.as==null||g.as==="script"){var v=m(g.as,g.crossOrigin);l.d.M(p,{crossOrigin:v,integrity:typeof g.integrity=="string"?g.integrity:void 0,nonce:typeof g.nonce=="string"?g.nonce:void 0})}}else g==null&&l.d.M(p)},vt.preload=function(p,g){if(typeof p=="string"&&typeof g=="object"&&g!==null&&typeof g.as=="string"){var v=g.as,x=m(v,g.crossOrigin);l.d.L(p,v,{crossOrigin:x,integrity:typeof g.integrity=="string"?g.integrity:void 0,nonce:typeof g.nonce=="string"?g.nonce:void 0,type:typeof g.type=="string"?g.type:void 0,fetchPriority:typeof g.fetchPriority=="string"?g.fetchPriority:void 0,referrerPolicy:typeof g.referrerPolicy=="string"?g.referrerPolicy:void 0,imageSrcSet:typeof g.imageSrcSet=="string"?g.imageSrcSet:void 0,imageSizes:typeof g.imageSizes=="string"?g.imageSizes:void 0,media:typeof g.media=="string"?g.media:void 0})}},vt.preloadModule=function(p,g){if(typeof p=="string")if(g){var v=m(g.as,g.crossOrigin);l.d.m(p,{as:typeof g.as=="string"&&g.as!=="script"?g.as:void 0,crossOrigin:v,integrity:typeof g.integrity=="string"?g.integrity:void 0})}else l.d.m(p)},vt.requestFormReset=function(p){l.d.r(p)},vt.unstable_batchedUpdates=function(p,g){return p(g)},vt.useFormState=function(p,g,v){return f.H.useFormState(p,g,v)},vt.useFormStatus=function(){return f.H.useHostTransitionStatus()},vt.version="19.2.8",vt}var oy;function ux(){if(oy)return Zu.exports;oy=1;function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(a){console.error(a)}}return n(),Zu.exports=Dj(),Zu.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var cy;function Aj(){if(cy)return Yi;cy=1;var n=Nj(),a=uf(),s=ux();function l(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var r=2;r<arguments.length;r++)t+="&args[]="+encodeURIComponent(arguments[r])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function u(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function h(e){var t=e,r=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(r=t.return),e=t.return;while(e)}return t.tag===3?r:null}function f(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function m(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function p(e){if(h(e)!==e)throw Error(l(188))}function g(e){var t=e.alternate;if(!t){if(t=h(e),t===null)throw Error(l(188));return t!==e?null:e}for(var r=e,i=t;;){var c=r.return;if(c===null)break;var d=c.alternate;if(d===null){if(i=c.return,i!==null){r=i;continue}break}if(c.child===d.child){for(d=c.child;d;){if(d===r)return p(c),e;if(d===i)return p(c),t;d=d.sibling}throw Error(l(188))}if(r.return!==i.return)r=c,i=d;else{for(var y=!1,j=c.child;j;){if(j===r){y=!0,r=c,i=d;break}if(j===i){y=!0,i=c,r=d;break}j=j.sibling}if(!y){for(j=d.child;j;){if(j===r){y=!0,r=d,i=c;break}if(j===i){y=!0,i=d,r=c;break}j=j.sibling}if(!y)throw Error(l(189))}}if(r.alternate!==i)throw Error(l(190))}if(r.tag!==3)throw Error(l(188));return r.stateNode.current===r?e:t}function v(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=v(e),t!==null)return t;e=e.sibling}return null}var x=Object.assign,b=Symbol.for("react.element"),E=Symbol.for("react.transitional.element"),w=Symbol.for("react.portal"),N=Symbol.for("react.fragment"),T=Symbol.for("react.strict_mode"),A=Symbol.for("react.profiler"),D=Symbol.for("react.consumer"),_=Symbol.for("react.context"),O=Symbol.for("react.forward_ref"),U=Symbol.for("react.suspense"),H=Symbol.for("react.suspense_list"),M=Symbol.for("react.memo"),R=Symbol.for("react.lazy"),V=Symbol.for("react.activity"),K=Symbol.for("react.memo_cache_sentinel"),Q=Symbol.iterator;function ie(e){return e===null||typeof e!="object"?null:(e=Q&&e[Q]||e["@@iterator"],typeof e=="function"?e:null)}var J=Symbol.for("react.client.reference");function G(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===J?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case N:return"Fragment";case A:return"Profiler";case T:return"StrictMode";case U:return"Suspense";case H:return"SuspenseList";case V:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case w:return"Portal";case _:return e.displayName||"Context";case D:return(e._context.displayName||"Context")+".Consumer";case O:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case M:return t=e.displayName||null,t!==null?t:G(e.type)||"Memo";case R:t=e._payload,e=e._init;try{return G(e(t))}catch{}}return null}var de=Array.isArray,L=a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,ne=s.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,W={pending:!1,data:null,method:null,action:null},Y=[],te=-1;function C(e){return{current:e}}function z(e){0>te||(e.current=Y[te],Y[te]=null,te--)}function re(e,t){te++,Y[te]=e.current,e.current=t}var ce=C(null),ue=C(null),fe=C(null),be=C(null);function oe(e,t){switch(re(fe,t),re(ue,e),re(ce,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?Eg(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=Eg(t),e=Tg(t,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}z(ce),re(ce,e)}function I(){z(ce),z(ue),z(fe)}function he(e){e.memoizedState!==null&&re(be,e);var t=ce.current,r=Tg(t,e.type);t!==r&&(re(ue,e),re(ce,r))}function se(e){ue.current===e&&(z(ce),z(ue)),be.current===e&&(z(be),Bi._currentValue=W)}var ge,$;function pe(e){if(ge===void 0)try{throw Error()}catch(r){var t=r.stack.trim().match(/\n( *(at )?)/);ge=t&&t[1]||"",$=-1<r.stack.indexOf(`
    at`)?" (<anonymous>)":-1<r.stack.indexOf("@")?"@unknown:0:0":""}return`
`+ge+e+$}var ke=!1;function Xe(e,t){if(!e||ke)return"";ke=!0;var r=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var i={DetermineComponentFrameRoot:function(){try{if(t){var le=function(){throw Error()};if(Object.defineProperty(le.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(le,[])}catch(Z){var X=Z}Reflect.construct(e,[],le)}else{try{le.call()}catch(Z){X=Z}e.call(le.prototype)}}else{try{throw Error()}catch(Z){X=Z}(le=e())&&typeof le.catch=="function"&&le.catch(function(){})}}catch(Z){if(Z&&X&&typeof Z.stack=="string")return[Z.stack,X.stack]}return[null,null]}};i.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var c=Object.getOwnPropertyDescriptor(i.DetermineComponentFrameRoot,"name");c&&c.configurable&&Object.defineProperty(i.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var d=i.DetermineComponentFrameRoot(),y=d[0],j=d[1];if(y&&j){var k=y.split(`
`),F=j.split(`
`);for(c=i=0;i<k.length&&!k[i].includes("DetermineComponentFrameRoot");)i++;for(;c<F.length&&!F[c].includes("DetermineComponentFrameRoot");)c++;if(i===k.length||c===F.length)for(i=k.length-1,c=F.length-1;1<=i&&0<=c&&k[i]!==F[c];)c--;for(;1<=i&&0<=c;i--,c--)if(k[i]!==F[c]){if(i!==1||c!==1)do if(i--,c--,0>c||k[i]!==F[c]){var ee=`
`+k[i].replace(" at new "," at ");return e.displayName&&ee.includes("<anonymous>")&&(ee=ee.replace("<anonymous>",e.displayName)),ee}while(1<=i&&0<=c);break}}}finally{ke=!1,Error.prepareStackTrace=r}return(r=e?e.displayName||e.name:"")?pe(r):""}function lt(e,t){switch(e.tag){case 26:case 27:case 5:return pe(e.type);case 16:return pe("Lazy");case 13:return e.child!==t&&t!==null?pe("Suspense Fallback"):pe("Suspense");case 19:return pe("SuspenseList");case 0:case 15:return Xe(e.type,!1);case 11:return Xe(e.type.render,!1);case 1:return Xe(e.type,!0);case 31:return pe("Activity");default:return""}}function th(e){try{var t="",r=null;do t+=lt(e,r),r=e,e=e.return;while(e);return t}catch(i){return`
Error generating stack: `+i.message+`
`+i.stack}}var Ao=Object.prototype.hasOwnProperty,Mo=n.unstable_scheduleCallback,ko=n.unstable_cancelCallback,e1=n.unstable_shouldYield,t1=n.unstable_requestPaint,Mt=n.unstable_now,n1=n.unstable_getCurrentPriorityLevel,nh=n.unstable_ImmediatePriority,rh=n.unstable_UserBlockingPriority,fs=n.unstable_NormalPriority,r1=n.unstable_LowPriority,ah=n.unstable_IdlePriority,a1=n.log,i1=n.unstable_setDisableYieldValue,Za=null,kt=null;function Gn(e){if(typeof a1=="function"&&i1(e),kt&&typeof kt.setStrictMode=="function")try{kt.setStrictMode(Za,e)}catch{}}var Rt=Math.clz32?Math.clz32:o1,s1=Math.log,l1=Math.LN2;function o1(e){return e>>>=0,e===0?32:31-(s1(e)/l1|0)|0}var hs=256,ms=262144,ps=4194304;function jr(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function gs(e,t,r){var i=e.pendingLanes;if(i===0)return 0;var c=0,d=e.suspendedLanes,y=e.pingedLanes;e=e.warmLanes;var j=i&134217727;return j!==0?(i=j&~d,i!==0?c=jr(i):(y&=j,y!==0?c=jr(y):r||(r=j&~e,r!==0&&(c=jr(r))))):(j=i&~d,j!==0?c=jr(j):y!==0?c=jr(y):r||(r=i&~e,r!==0&&(c=jr(r)))),c===0?0:t!==0&&t!==c&&(t&d)===0&&(d=c&-c,r=t&-t,d>=r||d===32&&(r&4194048)!==0)?t:c}function Qa(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function c1(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function ih(){var e=ps;return ps<<=1,(ps&62914560)===0&&(ps=4194304),e}function Ro(e){for(var t=[],r=0;31>r;r++)t.push(e);return t}function Ja(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function u1(e,t,r,i,c,d){var y=e.pendingLanes;e.pendingLanes=r,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=r,e.entangledLanes&=r,e.errorRecoveryDisabledLanes&=r,e.shellSuspendCounter=0;var j=e.entanglements,k=e.expirationTimes,F=e.hiddenUpdates;for(r=y&~r;0<r;){var ee=31-Rt(r),le=1<<ee;j[ee]=0,k[ee]=-1;var X=F[ee];if(X!==null)for(F[ee]=null,ee=0;ee<X.length;ee++){var Z=X[ee];Z!==null&&(Z.lane&=-536870913)}r&=~le}i!==0&&sh(e,i,0),d!==0&&c===0&&e.tag!==0&&(e.suspendedLanes|=d&~(y&~t))}function sh(e,t,r){e.pendingLanes|=t,e.suspendedLanes&=~t;var i=31-Rt(t);e.entangledLanes|=t,e.entanglements[i]=e.entanglements[i]|1073741824|r&261930}function lh(e,t){var r=e.entangledLanes|=t;for(e=e.entanglements;r;){var i=31-Rt(r),c=1<<i;c&t|e[i]&t&&(e[i]|=t),r&=~c}}function oh(e,t){var r=t&-t;return r=(r&42)!==0?1:Oo(r),(r&(e.suspendedLanes|t))!==0?0:r}function Oo(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function zo(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function ch(){var e=ne.p;return e!==0?e:(e=window.event,e===void 0?32:Kg(e.type))}function uh(e,t){var r=ne.p;try{return ne.p=e,t()}finally{ne.p=r}}var Fn=Math.random().toString(36).slice(2),dt="__reactFiber$"+Fn,wt="__reactProps$"+Fn,Kr="__reactContainer$"+Fn,_o="__reactEvents$"+Fn,d1="__reactListeners$"+Fn,f1="__reactHandles$"+Fn,dh="__reactResources$"+Fn,Wa="__reactMarker$"+Fn;function Vo(e){delete e[dt],delete e[wt],delete e[_o],delete e[d1],delete e[f1]}function Zr(e){var t=e[dt];if(t)return t;for(var r=e.parentNode;r;){if(t=r[Kr]||r[dt]){if(r=t.alternate,t.child!==null||r!==null&&r.child!==null)for(e=Rg(e);e!==null;){if(r=e[dt])return r;e=Rg(e)}return t}e=r,r=e.parentNode}return null}function Qr(e){if(e=e[dt]||e[Kr]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function Ia(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(l(33))}function Jr(e){var t=e[dh];return t||(t=e[dh]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function ot(e){e[Wa]=!0}var fh=new Set,hh={};function wr(e,t){Wr(e,t),Wr(e+"Capture",t)}function Wr(e,t){for(hh[e]=t,e=0;e<t.length;e++)fh.add(t[e])}var h1=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),mh={},ph={};function m1(e){return Ao.call(ph,e)?!0:Ao.call(mh,e)?!1:h1.test(e)?ph[e]=!0:(mh[e]=!0,!1)}function ys(e,t,r){if(m1(t))if(r===null)e.removeAttribute(t);else{switch(typeof r){case"undefined":case"function":case"symbol":e.removeAttribute(t);return;case"boolean":var i=t.toLowerCase().slice(0,5);if(i!=="data-"&&i!=="aria-"){e.removeAttribute(t);return}}e.setAttribute(t,""+r)}}function vs(e,t,r){if(r===null)e.removeAttribute(t);else{switch(typeof r){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(t);return}e.setAttribute(t,""+r)}}function wn(e,t,r,i){if(i===null)e.removeAttribute(r);else{switch(typeof i){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(r);return}e.setAttributeNS(t,r,""+i)}}function Yt(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function gh(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function p1(e,t,r){var i=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&typeof i<"u"&&typeof i.get=="function"&&typeof i.set=="function"){var c=i.get,d=i.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return c.call(this)},set:function(y){r=""+y,d.call(this,y)}}),Object.defineProperty(e,t,{enumerable:i.enumerable}),{getValue:function(){return r},setValue:function(y){r=""+y},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Bo(e){if(!e._valueTracker){var t=gh(e)?"checked":"value";e._valueTracker=p1(e,t,""+e[t])}}function yh(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var r=t.getValue(),i="";return e&&(i=gh(e)?e.checked?"true":"false":e.value),e=i,e!==r?(t.setValue(e),!0):!1}function xs(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var g1=/[\n"\\]/g;function Pt(e){return e.replace(g1,function(t){return"\\"+t.charCodeAt(0).toString(16)+" "})}function Lo(e,t,r,i,c,d,y,j){e.name="",y!=null&&typeof y!="function"&&typeof y!="symbol"&&typeof y!="boolean"?e.type=y:e.removeAttribute("type"),t!=null?y==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+Yt(t)):e.value!==""+Yt(t)&&(e.value=""+Yt(t)):y!=="submit"&&y!=="reset"||e.removeAttribute("value"),t!=null?Uo(e,y,Yt(t)):r!=null?Uo(e,y,Yt(r)):i!=null&&e.removeAttribute("value"),c==null&&d!=null&&(e.defaultChecked=!!d),c!=null&&(e.checked=c&&typeof c!="function"&&typeof c!="symbol"),j!=null&&typeof j!="function"&&typeof j!="symbol"&&typeof j!="boolean"?e.name=""+Yt(j):e.removeAttribute("name")}function vh(e,t,r,i,c,d,y,j){if(d!=null&&typeof d!="function"&&typeof d!="symbol"&&typeof d!="boolean"&&(e.type=d),t!=null||r!=null){if(!(d!=="submit"&&d!=="reset"||t!=null)){Bo(e);return}r=r!=null?""+Yt(r):"",t=t!=null?""+Yt(t):r,j||t===e.value||(e.value=t),e.defaultValue=t}i=i??c,i=typeof i!="function"&&typeof i!="symbol"&&!!i,e.checked=j?e.checked:!!i,e.defaultChecked=!!i,y!=null&&typeof y!="function"&&typeof y!="symbol"&&typeof y!="boolean"&&(e.name=y),Bo(e)}function Uo(e,t,r){t==="number"&&xs(e.ownerDocument)===e||e.defaultValue===""+r||(e.defaultValue=""+r)}function Ir(e,t,r,i){if(e=e.options,t){t={};for(var c=0;c<r.length;c++)t["$"+r[c]]=!0;for(r=0;r<e.length;r++)c=t.hasOwnProperty("$"+e[r].value),e[r].selected!==c&&(e[r].selected=c),c&&i&&(e[r].defaultSelected=!0)}else{for(r=""+Yt(r),t=null,c=0;c<e.length;c++){if(e[c].value===r){e[c].selected=!0,i&&(e[c].defaultSelected=!0);return}t!==null||e[c].disabled||(t=e[c])}t!==null&&(t.selected=!0)}}function xh(e,t,r){if(t!=null&&(t=""+Yt(t),t!==e.value&&(e.value=t),r==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=r!=null?""+Yt(r):""}function bh(e,t,r,i){if(t==null){if(i!=null){if(r!=null)throw Error(l(92));if(de(i)){if(1<i.length)throw Error(l(93));i=i[0]}r=i}r==null&&(r=""),t=r}r=Yt(t),e.defaultValue=r,i=e.textContent,i===r&&i!==""&&i!==null&&(e.value=i),Bo(e)}function ea(e,t){if(t){var r=e.firstChild;if(r&&r===e.lastChild&&r.nodeType===3){r.nodeValue=t;return}}e.textContent=t}var y1=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Sh(e,t,r){var i=t.indexOf("--")===0;r==null||typeof r=="boolean"||r===""?i?e.setProperty(t,""):t==="float"?e.cssFloat="":e[t]="":i?e.setProperty(t,r):typeof r!="number"||r===0||y1.has(t)?t==="float"?e.cssFloat=r:e[t]=(""+r).trim():e[t]=r+"px"}function jh(e,t,r){if(t!=null&&typeof t!="object")throw Error(l(62));if(e=e.style,r!=null){for(var i in r)!r.hasOwnProperty(i)||t!=null&&t.hasOwnProperty(i)||(i.indexOf("--")===0?e.setProperty(i,""):i==="float"?e.cssFloat="":e[i]="");for(var c in t)i=t[c],t.hasOwnProperty(c)&&r[c]!==i&&Sh(e,c,i)}else for(var d in t)t.hasOwnProperty(d)&&Sh(e,d,t[d])}function Ho(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var v1=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),x1=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function bs(e){return x1.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function En(){}var qo=null;function Yo(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var ta=null,na=null;function wh(e){var t=Qr(e);if(t&&(e=t.stateNode)){var r=e[wt]||null;e:switch(e=t.stateNode,t.type){case"input":if(Lo(e,r.value,r.defaultValue,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name),t=r.name,r.type==="radio"&&t!=null){for(r=e;r.parentNode;)r=r.parentNode;for(r=r.querySelectorAll('input[name="'+Pt(""+t)+'"][type="radio"]'),t=0;t<r.length;t++){var i=r[t];if(i!==e&&i.form===e.form){var c=i[wt]||null;if(!c)throw Error(l(90));Lo(i,c.value,c.defaultValue,c.defaultValue,c.checked,c.defaultChecked,c.type,c.name)}}for(t=0;t<r.length;t++)i=r[t],i.form===e.form&&yh(i)}break e;case"textarea":xh(e,r.value,r.defaultValue);break e;case"select":t=r.value,t!=null&&Ir(e,!!r.multiple,t,!1)}}}var Po=!1;function Eh(e,t,r){if(Po)return e(t,r);Po=!0;try{var i=e(t);return i}finally{if(Po=!1,(ta!==null||na!==null)&&(ll(),ta&&(t=ta,e=na,na=ta=null,wh(t),e)))for(t=0;t<e.length;t++)wh(e[t])}}function ei(e,t){var r=e.stateNode;if(r===null)return null;var i=r[wt]||null;if(i===null)return null;r=i[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(e=e.type,i=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!i;break e;default:e=!1}if(e)return null;if(r&&typeof r!="function")throw Error(l(231,t,typeof r));return r}var Tn=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Go=!1;if(Tn)try{var ti={};Object.defineProperty(ti,"passive",{get:function(){Go=!0}}),window.addEventListener("test",ti,ti),window.removeEventListener("test",ti,ti)}catch{Go=!1}var Xn=null,Fo=null,Ss=null;function Th(){if(Ss)return Ss;var e,t=Fo,r=t.length,i,c="value"in Xn?Xn.value:Xn.textContent,d=c.length;for(e=0;e<r&&t[e]===c[e];e++);var y=r-e;for(i=1;i<=y&&t[r-i]===c[d-i];i++);return Ss=c.slice(e,1<i?1-i:void 0)}function js(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function ws(){return!0}function Ch(){return!1}function Et(e){function t(r,i,c,d,y){this._reactName=r,this._targetInst=c,this.type=i,this.nativeEvent=d,this.target=y,this.currentTarget=null;for(var j in e)e.hasOwnProperty(j)&&(r=e[j],this[j]=r?r(d):d[j]);return this.isDefaultPrevented=(d.defaultPrevented!=null?d.defaultPrevented:d.returnValue===!1)?ws:Ch,this.isPropagationStopped=Ch,this}return x(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var r=this.nativeEvent;r&&(r.preventDefault?r.preventDefault():typeof r.returnValue!="unknown"&&(r.returnValue=!1),this.isDefaultPrevented=ws)},stopPropagation:function(){var r=this.nativeEvent;r&&(r.stopPropagation?r.stopPropagation():typeof r.cancelBubble!="unknown"&&(r.cancelBubble=!0),this.isPropagationStopped=ws)},persist:function(){},isPersistent:ws}),t}var Er={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Es=Et(Er),ni=x({},Er,{view:0,detail:0}),b1=Et(ni),Xo,$o,ri,Ts=x({},ni,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Zo,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==ri&&(ri&&e.type==="mousemove"?(Xo=e.screenX-ri.screenX,$o=e.screenY-ri.screenY):$o=Xo=0,ri=e),Xo)},movementY:function(e){return"movementY"in e?e.movementY:$o}}),Nh=Et(Ts),S1=x({},Ts,{dataTransfer:0}),j1=Et(S1),w1=x({},ni,{relatedTarget:0}),Ko=Et(w1),E1=x({},Er,{animationName:0,elapsedTime:0,pseudoElement:0}),T1=Et(E1),C1=x({},Er,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),N1=Et(C1),D1=x({},Er,{data:0}),Dh=Et(D1),A1={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},M1={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},k1={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function R1(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=k1[e])?!!t[e]:!1}function Zo(){return R1}var O1=x({},ni,{key:function(e){if(e.key){var t=A1[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=js(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?M1[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Zo,charCode:function(e){return e.type==="keypress"?js(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?js(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),z1=Et(O1),_1=x({},Ts,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Ah=Et(_1),V1=x({},ni,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Zo}),B1=Et(V1),L1=x({},Er,{propertyName:0,elapsedTime:0,pseudoElement:0}),U1=Et(L1),H1=x({},Ts,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),q1=Et(H1),Y1=x({},Er,{newState:0,oldState:0}),P1=Et(Y1),G1=[9,13,27,32],Qo=Tn&&"CompositionEvent"in window,ai=null;Tn&&"documentMode"in document&&(ai=document.documentMode);var F1=Tn&&"TextEvent"in window&&!ai,Mh=Tn&&(!Qo||ai&&8<ai&&11>=ai),kh=" ",Rh=!1;function Oh(e,t){switch(e){case"keyup":return G1.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function zh(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var ra=!1;function X1(e,t){switch(e){case"compositionend":return zh(t);case"keypress":return t.which!==32?null:(Rh=!0,kh);case"textInput":return e=t.data,e===kh&&Rh?null:e;default:return null}}function $1(e,t){if(ra)return e==="compositionend"||!Qo&&Oh(e,t)?(e=Th(),Ss=Fo=Xn=null,ra=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Mh&&t.locale!=="ko"?null:t.data;default:return null}}var K1={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function _h(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!K1[e.type]:t==="textarea"}function Vh(e,t,r,i){ta?na?na.push(i):na=[i]:ta=i,t=ml(t,"onChange"),0<t.length&&(r=new Es("onChange","change",null,r,i),e.push({event:r,listeners:t}))}var ii=null,si=null;function Z1(e){vg(e,0)}function Cs(e){var t=Ia(e);if(yh(t))return e}function Bh(e,t){if(e==="change")return t}var Lh=!1;if(Tn){var Jo;if(Tn){var Wo="oninput"in document;if(!Wo){var Uh=document.createElement("div");Uh.setAttribute("oninput","return;"),Wo=typeof Uh.oninput=="function"}Jo=Wo}else Jo=!1;Lh=Jo&&(!document.documentMode||9<document.documentMode)}function Hh(){ii&&(ii.detachEvent("onpropertychange",qh),si=ii=null)}function qh(e){if(e.propertyName==="value"&&Cs(si)){var t=[];Vh(t,si,e,Yo(e)),Eh(Z1,t)}}function Q1(e,t,r){e==="focusin"?(Hh(),ii=t,si=r,ii.attachEvent("onpropertychange",qh)):e==="focusout"&&Hh()}function J1(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Cs(si)}function W1(e,t){if(e==="click")return Cs(t)}function I1(e,t){if(e==="input"||e==="change")return Cs(t)}function eS(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Ot=typeof Object.is=="function"?Object.is:eS;function li(e,t){if(Ot(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var r=Object.keys(e),i=Object.keys(t);if(r.length!==i.length)return!1;for(i=0;i<r.length;i++){var c=r[i];if(!Ao.call(t,c)||!Ot(e[c],t[c]))return!1}return!0}function Yh(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Ph(e,t){var r=Yh(e);e=0;for(var i;r;){if(r.nodeType===3){if(i=e+r.textContent.length,e<=t&&i>=t)return{node:r,offset:t-e};e=i}e:{for(;r;){if(r.nextSibling){r=r.nextSibling;break e}r=r.parentNode}r=void 0}r=Yh(r)}}function Gh(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Gh(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Fh(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=xs(e.document);t instanceof e.HTMLIFrameElement;){try{var r=typeof t.contentWindow.location.href=="string"}catch{r=!1}if(r)e=t.contentWindow;else break;t=xs(e.document)}return t}function Io(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}var tS=Tn&&"documentMode"in document&&11>=document.documentMode,aa=null,ec=null,oi=null,tc=!1;function Xh(e,t,r){var i=r.window===r?r.document:r.nodeType===9?r:r.ownerDocument;tc||aa==null||aa!==xs(i)||(i=aa,"selectionStart"in i&&Io(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),oi&&li(oi,i)||(oi=i,i=ml(ec,"onSelect"),0<i.length&&(t=new Es("onSelect","select",null,t,r),e.push({event:t,listeners:i}),t.target=aa)))}function Tr(e,t){var r={};return r[e.toLowerCase()]=t.toLowerCase(),r["Webkit"+e]="webkit"+t,r["Moz"+e]="moz"+t,r}var ia={animationend:Tr("Animation","AnimationEnd"),animationiteration:Tr("Animation","AnimationIteration"),animationstart:Tr("Animation","AnimationStart"),transitionrun:Tr("Transition","TransitionRun"),transitionstart:Tr("Transition","TransitionStart"),transitioncancel:Tr("Transition","TransitionCancel"),transitionend:Tr("Transition","TransitionEnd")},nc={},$h={};Tn&&($h=document.createElement("div").style,"AnimationEvent"in window||(delete ia.animationend.animation,delete ia.animationiteration.animation,delete ia.animationstart.animation),"TransitionEvent"in window||delete ia.transitionend.transition);function Cr(e){if(nc[e])return nc[e];if(!ia[e])return e;var t=ia[e],r;for(r in t)if(t.hasOwnProperty(r)&&r in $h)return nc[e]=t[r];return e}var Kh=Cr("animationend"),Zh=Cr("animationiteration"),Qh=Cr("animationstart"),nS=Cr("transitionrun"),rS=Cr("transitionstart"),aS=Cr("transitioncancel"),Jh=Cr("transitionend"),Wh=new Map,rc="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");rc.push("scrollEnd");function rn(e,t){Wh.set(e,t),wr(t,[e])}var Ns=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},Gt=[],sa=0,ac=0;function Ds(){for(var e=sa,t=ac=sa=0;t<e;){var r=Gt[t];Gt[t++]=null;var i=Gt[t];Gt[t++]=null;var c=Gt[t];Gt[t++]=null;var d=Gt[t];if(Gt[t++]=null,i!==null&&c!==null){var y=i.pending;y===null?c.next=c:(c.next=y.next,y.next=c),i.pending=c}d!==0&&Ih(r,c,d)}}function As(e,t,r,i){Gt[sa++]=e,Gt[sa++]=t,Gt[sa++]=r,Gt[sa++]=i,ac|=i,e.lanes|=i,e=e.alternate,e!==null&&(e.lanes|=i)}function ic(e,t,r,i){return As(e,t,r,i),Ms(e)}function Nr(e,t){return As(e,null,null,t),Ms(e)}function Ih(e,t,r){e.lanes|=r;var i=e.alternate;i!==null&&(i.lanes|=r);for(var c=!1,d=e.return;d!==null;)d.childLanes|=r,i=d.alternate,i!==null&&(i.childLanes|=r),d.tag===22&&(e=d.stateNode,e===null||e._visibility&1||(c=!0)),e=d,d=d.return;return e.tag===3?(d=e.stateNode,c&&t!==null&&(c=31-Rt(r),e=d.hiddenUpdates,i=e[c],i===null?e[c]=[t]:i.push(t),t.lane=r|536870912),d):null}function Ms(e){if(50<Mi)throw Mi=0,mu=null,Error(l(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var la={};function iS(e,t,r,i){this.tag=e,this.key=r,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function zt(e,t,r,i){return new iS(e,t,r,i)}function sc(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Cn(e,t){var r=e.alternate;return r===null?(r=zt(e.tag,t,e.key,e.mode),r.elementType=e.elementType,r.type=e.type,r.stateNode=e.stateNode,r.alternate=e,e.alternate=r):(r.pendingProps=t,r.type=e.type,r.flags=0,r.subtreeFlags=0,r.deletions=null),r.flags=e.flags&65011712,r.childLanes=e.childLanes,r.lanes=e.lanes,r.child=e.child,r.memoizedProps=e.memoizedProps,r.memoizedState=e.memoizedState,r.updateQueue=e.updateQueue,t=e.dependencies,r.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},r.sibling=e.sibling,r.index=e.index,r.ref=e.ref,r.refCleanup=e.refCleanup,r}function em(e,t){e.flags&=65011714;var r=e.alternate;return r===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=r.childLanes,e.lanes=r.lanes,e.child=r.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=r.memoizedProps,e.memoizedState=r.memoizedState,e.updateQueue=r.updateQueue,e.type=r.type,t=r.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function ks(e,t,r,i,c,d){var y=0;if(i=e,typeof e=="function")sc(e)&&(y=1);else if(typeof e=="string")y=uj(e,r,ce.current)?26:e==="html"||e==="head"||e==="body"?27:5;else e:switch(e){case V:return e=zt(31,r,t,c),e.elementType=V,e.lanes=d,e;case N:return Dr(r.children,c,d,t);case T:y=8,c|=24;break;case A:return e=zt(12,r,t,c|2),e.elementType=A,e.lanes=d,e;case U:return e=zt(13,r,t,c),e.elementType=U,e.lanes=d,e;case H:return e=zt(19,r,t,c),e.elementType=H,e.lanes=d,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case _:y=10;break e;case D:y=9;break e;case O:y=11;break e;case M:y=14;break e;case R:y=16,i=null;break e}y=29,r=Error(l(130,e===null?"null":typeof e,"")),i=null}return t=zt(y,r,t,c),t.elementType=e,t.type=i,t.lanes=d,t}function Dr(e,t,r,i){return e=zt(7,e,i,t),e.lanes=r,e}function lc(e,t,r){return e=zt(6,e,null,t),e.lanes=r,e}function tm(e){var t=zt(18,null,null,0);return t.stateNode=e,t}function oc(e,t,r){return t=zt(4,e.children!==null?e.children:[],e.key,t),t.lanes=r,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var nm=new WeakMap;function Ft(e,t){if(typeof e=="object"&&e!==null){var r=nm.get(e);return r!==void 0?r:(t={value:e,source:t,stack:th(t)},nm.set(e,t),t)}return{value:e,source:t,stack:th(t)}}var oa=[],ca=0,Rs=null,ci=0,Xt=[],$t=0,$n=null,dn=1,fn="";function Nn(e,t){oa[ca++]=ci,oa[ca++]=Rs,Rs=e,ci=t}function rm(e,t,r){Xt[$t++]=dn,Xt[$t++]=fn,Xt[$t++]=$n,$n=e;var i=dn;e=fn;var c=32-Rt(i)-1;i&=~(1<<c),r+=1;var d=32-Rt(t)+c;if(30<d){var y=c-c%5;d=(i&(1<<y)-1).toString(32),i>>=y,c-=y,dn=1<<32-Rt(t)+c|r<<c|i,fn=d+e}else dn=1<<d|r<<c|i,fn=e}function cc(e){e.return!==null&&(Nn(e,1),rm(e,1,0))}function uc(e){for(;e===Rs;)Rs=oa[--ca],oa[ca]=null,ci=oa[--ca],oa[ca]=null;for(;e===$n;)$n=Xt[--$t],Xt[$t]=null,fn=Xt[--$t],Xt[$t]=null,dn=Xt[--$t],Xt[$t]=null}function am(e,t){Xt[$t++]=dn,Xt[$t++]=fn,Xt[$t++]=$n,dn=t.id,fn=t.overflow,$n=e}var ft=null,Ge=null,Me=!1,Kn=null,Kt=!1,dc=Error(l(519));function Zn(e){var t=Error(l(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw ui(Ft(t,e)),dc}function im(e){var t=e.stateNode,r=e.type,i=e.memoizedProps;switch(t[dt]=e,t[wt]=i,r){case"dialog":Ne("cancel",t),Ne("close",t);break;case"iframe":case"object":case"embed":Ne("load",t);break;case"video":case"audio":for(r=0;r<Ri.length;r++)Ne(Ri[r],t);break;case"source":Ne("error",t);break;case"img":case"image":case"link":Ne("error",t),Ne("load",t);break;case"details":Ne("toggle",t);break;case"input":Ne("invalid",t),vh(t,i.value,i.defaultValue,i.checked,i.defaultChecked,i.type,i.name,!0);break;case"select":Ne("invalid",t);break;case"textarea":Ne("invalid",t),bh(t,i.value,i.defaultValue,i.children)}r=i.children,typeof r!="string"&&typeof r!="number"&&typeof r!="bigint"||t.textContent===""+r||i.suppressHydrationWarning===!0||jg(t.textContent,r)?(i.popover!=null&&(Ne("beforetoggle",t),Ne("toggle",t)),i.onScroll!=null&&Ne("scroll",t),i.onScrollEnd!=null&&Ne("scrollend",t),i.onClick!=null&&(t.onclick=En),t=!0):t=!1,t||Zn(e,!0)}function sm(e){for(ft=e.return;ft;)switch(ft.tag){case 5:case 31:case 13:Kt=!1;return;case 27:case 3:Kt=!0;return;default:ft=ft.return}}function ua(e){if(e!==ft)return!1;if(!Me)return sm(e),Me=!0,!1;var t=e.tag,r;if((r=t!==3&&t!==27)&&((r=t===5)&&(r=e.type,r=!(r!=="form"&&r!=="button")||Au(e.type,e.memoizedProps)),r=!r),r&&Ge&&Zn(e),sm(e),t===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(l(317));Ge=kg(e)}else if(t===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(l(317));Ge=kg(e)}else t===27?(t=Ge,cr(e.type)?(e=zu,zu=null,Ge=e):Ge=t):Ge=ft?Qt(e.stateNode.nextSibling):null;return!0}function Ar(){Ge=ft=null,Me=!1}function fc(){var e=Kn;return e!==null&&(Dt===null?Dt=e:Dt.push.apply(Dt,e),Kn=null),e}function ui(e){Kn===null?Kn=[e]:Kn.push(e)}var hc=C(null),Mr=null,Dn=null;function Qn(e,t,r){re(hc,t._currentValue),t._currentValue=r}function An(e){e._currentValue=hc.current,z(hc)}function mc(e,t,r){for(;e!==null;){var i=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,i!==null&&(i.childLanes|=t)):i!==null&&(i.childLanes&t)!==t&&(i.childLanes|=t),e===r)break;e=e.return}}function pc(e,t,r,i){var c=e.child;for(c!==null&&(c.return=e);c!==null;){var d=c.dependencies;if(d!==null){var y=c.child;d=d.firstContext;e:for(;d!==null;){var j=d;d=c;for(var k=0;k<t.length;k++)if(j.context===t[k]){d.lanes|=r,j=d.alternate,j!==null&&(j.lanes|=r),mc(d.return,r,e),i||(y=null);break e}d=j.next}}else if(c.tag===18){if(y=c.return,y===null)throw Error(l(341));y.lanes|=r,d=y.alternate,d!==null&&(d.lanes|=r),mc(y,r,e),y=null}else y=c.child;if(y!==null)y.return=c;else for(y=c;y!==null;){if(y===e){y=null;break}if(c=y.sibling,c!==null){c.return=y.return,y=c;break}y=y.return}c=y}}function da(e,t,r,i){e=null;for(var c=t,d=!1;c!==null;){if(!d){if((c.flags&524288)!==0)d=!0;else if((c.flags&262144)!==0)break}if(c.tag===10){var y=c.alternate;if(y===null)throw Error(l(387));if(y=y.memoizedProps,y!==null){var j=c.type;Ot(c.pendingProps.value,y.value)||(e!==null?e.push(j):e=[j])}}else if(c===be.current){if(y=c.alternate,y===null)throw Error(l(387));y.memoizedState.memoizedState!==c.memoizedState.memoizedState&&(e!==null?e.push(Bi):e=[Bi])}c=c.return}e!==null&&pc(t,e,r,i),t.flags|=262144}function Os(e){for(e=e.firstContext;e!==null;){if(!Ot(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function kr(e){Mr=e,Dn=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function ht(e){return lm(Mr,e)}function zs(e,t){return Mr===null&&kr(e),lm(e,t)}function lm(e,t){var r=t._currentValue;if(t={context:t,memoizedValue:r,next:null},Dn===null){if(e===null)throw Error(l(308));Dn=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else Dn=Dn.next=t;return r}var sS=typeof AbortController<"u"?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(r,i){e.push(i)}};this.abort=function(){t.aborted=!0,e.forEach(function(r){return r()})}},lS=n.unstable_scheduleCallback,oS=n.unstable_NormalPriority,et={$$typeof:_,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function gc(){return{controller:new sS,data:new Map,refCount:0}}function di(e){e.refCount--,e.refCount===0&&lS(oS,function(){e.controller.abort()})}var fi=null,yc=0,fa=0,ha=null;function cS(e,t){if(fi===null){var r=fi=[];yc=0,fa=bu(),ha={status:"pending",value:void 0,then:function(i){r.push(i)}}}return yc++,t.then(om,om),t}function om(){if(--yc===0&&fi!==null){ha!==null&&(ha.status="fulfilled");var e=fi;fi=null,fa=0,ha=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function uS(e,t){var r=[],i={status:"pending",value:null,reason:null,then:function(c){r.push(c)}};return e.then(function(){i.status="fulfilled",i.value=t;for(var c=0;c<r.length;c++)(0,r[c])(t)},function(c){for(i.status="rejected",i.reason=c,c=0;c<r.length;c++)(0,r[c])(void 0)}),i}var cm=L.S;L.S=function(e,t){Xp=Mt(),typeof t=="object"&&t!==null&&typeof t.then=="function"&&cS(e,t),cm!==null&&cm(e,t)};var Rr=C(null);function vc(){var e=Rr.current;return e!==null?e:He.pooledCache}function _s(e,t){t===null?re(Rr,Rr.current):re(Rr,t.pool)}function um(){var e=vc();return e===null?null:{parent:et._currentValue,pool:e}}var ma=Error(l(460)),xc=Error(l(474)),Vs=Error(l(542)),Bs={then:function(){}};function dm(e){return e=e.status,e==="fulfilled"||e==="rejected"}function fm(e,t,r){switch(r=e[r],r===void 0?e.push(t):r!==t&&(t.then(En,En),t=r),t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,mm(e),e;default:if(typeof t.status=="string")t.then(En,En);else{if(e=He,e!==null&&100<e.shellSuspendCounter)throw Error(l(482));e=t,e.status="pending",e.then(function(i){if(t.status==="pending"){var c=t;c.status="fulfilled",c.value=i}},function(i){if(t.status==="pending"){var c=t;c.status="rejected",c.reason=i}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,mm(e),e}throw zr=t,ma}}function Or(e){try{var t=e._init;return t(e._payload)}catch(r){throw r!==null&&typeof r=="object"&&typeof r.then=="function"?(zr=r,ma):r}}var zr=null;function hm(){if(zr===null)throw Error(l(459));var e=zr;return zr=null,e}function mm(e){if(e===ma||e===Vs)throw Error(l(483))}var pa=null,hi=0;function Ls(e){var t=hi;return hi+=1,pa===null&&(pa=[]),fm(pa,e,t)}function mi(e,t){t=t.props.ref,e.ref=t!==void 0?t:null}function Us(e,t){throw t.$$typeof===b?Error(l(525)):(e=Object.prototype.toString.call(t),Error(l(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)))}function pm(e){function t(q,B){if(e){var P=q.deletions;P===null?(q.deletions=[B],q.flags|=16):P.push(B)}}function r(q,B){if(!e)return null;for(;B!==null;)t(q,B),B=B.sibling;return null}function i(q){for(var B=new Map;q!==null;)q.key!==null?B.set(q.key,q):B.set(q.index,q),q=q.sibling;return B}function c(q,B){return q=Cn(q,B),q.index=0,q.sibling=null,q}function d(q,B,P){return q.index=P,e?(P=q.alternate,P!==null?(P=P.index,P<B?(q.flags|=67108866,B):P):(q.flags|=67108866,B)):(q.flags|=1048576,B)}function y(q){return e&&q.alternate===null&&(q.flags|=67108866),q}function j(q,B,P,ae){return B===null||B.tag!==6?(B=lc(P,q.mode,ae),B.return=q,B):(B=c(B,P),B.return=q,B)}function k(q,B,P,ae){var Se=P.type;return Se===N?ee(q,B,P.props.children,ae,P.key):B!==null&&(B.elementType===Se||typeof Se=="object"&&Se!==null&&Se.$$typeof===R&&Or(Se)===B.type)?(B=c(B,P.props),mi(B,P),B.return=q,B):(B=ks(P.type,P.key,P.props,null,q.mode,ae),mi(B,P),B.return=q,B)}function F(q,B,P,ae){return B===null||B.tag!==4||B.stateNode.containerInfo!==P.containerInfo||B.stateNode.implementation!==P.implementation?(B=oc(P,q.mode,ae),B.return=q,B):(B=c(B,P.children||[]),B.return=q,B)}function ee(q,B,P,ae,Se){return B===null||B.tag!==7?(B=Dr(P,q.mode,ae,Se),B.return=q,B):(B=c(B,P),B.return=q,B)}function le(q,B,P){if(typeof B=="string"&&B!==""||typeof B=="number"||typeof B=="bigint")return B=lc(""+B,q.mode,P),B.return=q,B;if(typeof B=="object"&&B!==null){switch(B.$$typeof){case E:return P=ks(B.type,B.key,B.props,null,q.mode,P),mi(P,B),P.return=q,P;case w:return B=oc(B,q.mode,P),B.return=q,B;case R:return B=Or(B),le(q,B,P)}if(de(B)||ie(B))return B=Dr(B,q.mode,P,null),B.return=q,B;if(typeof B.then=="function")return le(q,Ls(B),P);if(B.$$typeof===_)return le(q,zs(q,B),P);Us(q,B)}return null}function X(q,B,P,ae){var Se=B!==null?B.key:null;if(typeof P=="string"&&P!==""||typeof P=="number"||typeof P=="bigint")return Se!==null?null:j(q,B,""+P,ae);if(typeof P=="object"&&P!==null){switch(P.$$typeof){case E:return P.key===Se?k(q,B,P,ae):null;case w:return P.key===Se?F(q,B,P,ae):null;case R:return P=Or(P),X(q,B,P,ae)}if(de(P)||ie(P))return Se!==null?null:ee(q,B,P,ae,null);if(typeof P.then=="function")return X(q,B,Ls(P),ae);if(P.$$typeof===_)return X(q,B,zs(q,P),ae);Us(q,P)}return null}function Z(q,B,P,ae,Se){if(typeof ae=="string"&&ae!==""||typeof ae=="number"||typeof ae=="bigint")return q=q.get(P)||null,j(B,q,""+ae,Se);if(typeof ae=="object"&&ae!==null){switch(ae.$$typeof){case E:return q=q.get(ae.key===null?P:ae.key)||null,k(B,q,ae,Se);case w:return q=q.get(ae.key===null?P:ae.key)||null,F(B,q,ae,Se);case R:return ae=Or(ae),Z(q,B,P,ae,Se)}if(de(ae)||ie(ae))return q=q.get(P)||null,ee(B,q,ae,Se,null);if(typeof ae.then=="function")return Z(q,B,P,Ls(ae),Se);if(ae.$$typeof===_)return Z(q,B,P,zs(B,ae),Se);Us(B,ae)}return null}function ye(q,B,P,ae){for(var Se=null,Re=null,xe=B,Te=B=0,Ae=null;xe!==null&&Te<P.length;Te++){xe.index>Te?(Ae=xe,xe=null):Ae=xe.sibling;var Oe=X(q,xe,P[Te],ae);if(Oe===null){xe===null&&(xe=Ae);break}e&&xe&&Oe.alternate===null&&t(q,xe),B=d(Oe,B,Te),Re===null?Se=Oe:Re.sibling=Oe,Re=Oe,xe=Ae}if(Te===P.length)return r(q,xe),Me&&Nn(q,Te),Se;if(xe===null){for(;Te<P.length;Te++)xe=le(q,P[Te],ae),xe!==null&&(B=d(xe,B,Te),Re===null?Se=xe:Re.sibling=xe,Re=xe);return Me&&Nn(q,Te),Se}for(xe=i(xe);Te<P.length;Te++)Ae=Z(xe,q,Te,P[Te],ae),Ae!==null&&(e&&Ae.alternate!==null&&xe.delete(Ae.key===null?Te:Ae.key),B=d(Ae,B,Te),Re===null?Se=Ae:Re.sibling=Ae,Re=Ae);return e&&xe.forEach(function(mr){return t(q,mr)}),Me&&Nn(q,Te),Se}function je(q,B,P,ae){if(P==null)throw Error(l(151));for(var Se=null,Re=null,xe=B,Te=B=0,Ae=null,Oe=P.next();xe!==null&&!Oe.done;Te++,Oe=P.next()){xe.index>Te?(Ae=xe,xe=null):Ae=xe.sibling;var mr=X(q,xe,Oe.value,ae);if(mr===null){xe===null&&(xe=Ae);break}e&&xe&&mr.alternate===null&&t(q,xe),B=d(mr,B,Te),Re===null?Se=mr:Re.sibling=mr,Re=mr,xe=Ae}if(Oe.done)return r(q,xe),Me&&Nn(q,Te),Se;if(xe===null){for(;!Oe.done;Te++,Oe=P.next())Oe=le(q,Oe.value,ae),Oe!==null&&(B=d(Oe,B,Te),Re===null?Se=Oe:Re.sibling=Oe,Re=Oe);return Me&&Nn(q,Te),Se}for(xe=i(xe);!Oe.done;Te++,Oe=P.next())Oe=Z(xe,q,Te,Oe.value,ae),Oe!==null&&(e&&Oe.alternate!==null&&xe.delete(Oe.key===null?Te:Oe.key),B=d(Oe,B,Te),Re===null?Se=Oe:Re.sibling=Oe,Re=Oe);return e&&xe.forEach(function(Sj){return t(q,Sj)}),Me&&Nn(q,Te),Se}function Ue(q,B,P,ae){if(typeof P=="object"&&P!==null&&P.type===N&&P.key===null&&(P=P.props.children),typeof P=="object"&&P!==null){switch(P.$$typeof){case E:e:{for(var Se=P.key;B!==null;){if(B.key===Se){if(Se=P.type,Se===N){if(B.tag===7){r(q,B.sibling),ae=c(B,P.props.children),ae.return=q,q=ae;break e}}else if(B.elementType===Se||typeof Se=="object"&&Se!==null&&Se.$$typeof===R&&Or(Se)===B.type){r(q,B.sibling),ae=c(B,P.props),mi(ae,P),ae.return=q,q=ae;break e}r(q,B);break}else t(q,B);B=B.sibling}P.type===N?(ae=Dr(P.props.children,q.mode,ae,P.key),ae.return=q,q=ae):(ae=ks(P.type,P.key,P.props,null,q.mode,ae),mi(ae,P),ae.return=q,q=ae)}return y(q);case w:e:{for(Se=P.key;B!==null;){if(B.key===Se)if(B.tag===4&&B.stateNode.containerInfo===P.containerInfo&&B.stateNode.implementation===P.implementation){r(q,B.sibling),ae=c(B,P.children||[]),ae.return=q,q=ae;break e}else{r(q,B);break}else t(q,B);B=B.sibling}ae=oc(P,q.mode,ae),ae.return=q,q=ae}return y(q);case R:return P=Or(P),Ue(q,B,P,ae)}if(de(P))return ye(q,B,P,ae);if(ie(P)){if(Se=ie(P),typeof Se!="function")throw Error(l(150));return P=Se.call(P),je(q,B,P,ae)}if(typeof P.then=="function")return Ue(q,B,Ls(P),ae);if(P.$$typeof===_)return Ue(q,B,zs(q,P),ae);Us(q,P)}return typeof P=="string"&&P!==""||typeof P=="number"||typeof P=="bigint"?(P=""+P,B!==null&&B.tag===6?(r(q,B.sibling),ae=c(B,P),ae.return=q,q=ae):(r(q,B),ae=lc(P,q.mode,ae),ae.return=q,q=ae),y(q)):r(q,B)}return function(q,B,P,ae){try{hi=0;var Se=Ue(q,B,P,ae);return pa=null,Se}catch(xe){if(xe===ma||xe===Vs)throw xe;var Re=zt(29,xe,null,q.mode);return Re.lanes=ae,Re.return=q,Re}finally{}}}var _r=pm(!0),gm=pm(!1),Jn=!1;function bc(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Sc(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Wn(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function In(e,t,r){var i=e.updateQueue;if(i===null)return null;if(i=i.shared,(ze&2)!==0){var c=i.pending;return c===null?t.next=t:(t.next=c.next,c.next=t),i.pending=t,t=Ms(e),Ih(e,null,r),t}return As(e,i,t,r),Ms(e)}function pi(e,t,r){if(t=t.updateQueue,t!==null&&(t=t.shared,(r&4194048)!==0)){var i=t.lanes;i&=e.pendingLanes,r|=i,t.lanes=r,lh(e,r)}}function jc(e,t){var r=e.updateQueue,i=e.alternate;if(i!==null&&(i=i.updateQueue,r===i)){var c=null,d=null;if(r=r.firstBaseUpdate,r!==null){do{var y={lane:r.lane,tag:r.tag,payload:r.payload,callback:null,next:null};d===null?c=d=y:d=d.next=y,r=r.next}while(r!==null);d===null?c=d=t:d=d.next=t}else c=d=t;r={baseState:i.baseState,firstBaseUpdate:c,lastBaseUpdate:d,shared:i.shared,callbacks:i.callbacks},e.updateQueue=r;return}e=r.lastBaseUpdate,e===null?r.firstBaseUpdate=t:e.next=t,r.lastBaseUpdate=t}var wc=!1;function gi(){if(wc){var e=ha;if(e!==null)throw e}}function yi(e,t,r,i){wc=!1;var c=e.updateQueue;Jn=!1;var d=c.firstBaseUpdate,y=c.lastBaseUpdate,j=c.shared.pending;if(j!==null){c.shared.pending=null;var k=j,F=k.next;k.next=null,y===null?d=F:y.next=F,y=k;var ee=e.alternate;ee!==null&&(ee=ee.updateQueue,j=ee.lastBaseUpdate,j!==y&&(j===null?ee.firstBaseUpdate=F:j.next=F,ee.lastBaseUpdate=k))}if(d!==null){var le=c.baseState;y=0,ee=F=k=null,j=d;do{var X=j.lane&-536870913,Z=X!==j.lane;if(Z?(De&X)===X:(i&X)===X){X!==0&&X===fa&&(wc=!0),ee!==null&&(ee=ee.next={lane:0,tag:j.tag,payload:j.payload,callback:null,next:null});e:{var ye=e,je=j;X=t;var Ue=r;switch(je.tag){case 1:if(ye=je.payload,typeof ye=="function"){le=ye.call(Ue,le,X);break e}le=ye;break e;case 3:ye.flags=ye.flags&-65537|128;case 0:if(ye=je.payload,X=typeof ye=="function"?ye.call(Ue,le,X):ye,X==null)break e;le=x({},le,X);break e;case 2:Jn=!0}}X=j.callback,X!==null&&(e.flags|=64,Z&&(e.flags|=8192),Z=c.callbacks,Z===null?c.callbacks=[X]:Z.push(X))}else Z={lane:X,tag:j.tag,payload:j.payload,callback:j.callback,next:null},ee===null?(F=ee=Z,k=le):ee=ee.next=Z,y|=X;if(j=j.next,j===null){if(j=c.shared.pending,j===null)break;Z=j,j=Z.next,Z.next=null,c.lastBaseUpdate=Z,c.shared.pending=null}}while(!0);ee===null&&(k=le),c.baseState=k,c.firstBaseUpdate=F,c.lastBaseUpdate=ee,d===null&&(c.shared.lanes=0),ar|=y,e.lanes=y,e.memoizedState=le}}function ym(e,t){if(typeof e!="function")throw Error(l(191,e));e.call(t)}function vm(e,t){var r=e.callbacks;if(r!==null)for(e.callbacks=null,e=0;e<r.length;e++)ym(r[e],t)}var ga=C(null),Hs=C(0);function xm(e,t){e=Ln,re(Hs,e),re(ga,t),Ln=e|t.baseLanes}function Ec(){re(Hs,Ln),re(ga,ga.current)}function Tc(){Ln=Hs.current,z(ga),z(Hs)}var _t=C(null),Zt=null;function er(e){var t=e.alternate;re(Je,Je.current&1),re(_t,e),Zt===null&&(t===null||ga.current!==null||t.memoizedState!==null)&&(Zt=e)}function Cc(e){re(Je,Je.current),re(_t,e),Zt===null&&(Zt=e)}function bm(e){e.tag===22?(re(Je,Je.current),re(_t,e),Zt===null&&(Zt=e)):tr()}function tr(){re(Je,Je.current),re(_t,_t.current)}function Vt(e){z(_t),Zt===e&&(Zt=null),z(Je)}var Je=C(0);function qs(e){for(var t=e;t!==null;){if(t.tag===13){var r=t.memoizedState;if(r!==null&&(r=r.dehydrated,r===null||Ru(r)||Ou(r)))return t}else if(t.tag===19&&(t.memoizedProps.revealOrder==="forwards"||t.memoizedProps.revealOrder==="backwards"||t.memoizedProps.revealOrder==="unstable_legacy-backwards"||t.memoizedProps.revealOrder==="together")){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Mn=0,Ee=null,Be=null,tt=null,Ys=!1,ya=!1,Vr=!1,Ps=0,vi=0,va=null,dS=0;function Ke(){throw Error(l(321))}function Nc(e,t){if(t===null)return!1;for(var r=0;r<t.length&&r<e.length;r++)if(!Ot(e[r],t[r]))return!1;return!0}function Dc(e,t,r,i,c,d){return Mn=d,Ee=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,L.H=e===null||e.memoizedState===null?rp:Pc,Vr=!1,d=r(i,c),Vr=!1,ya&&(d=jm(t,r,i,c)),Sm(e),d}function Sm(e){L.H=Si;var t=Be!==null&&Be.next!==null;if(Mn=0,tt=Be=Ee=null,Ys=!1,vi=0,va=null,t)throw Error(l(300));e===null||nt||(e=e.dependencies,e!==null&&Os(e)&&(nt=!0))}function jm(e,t,r,i){Ee=e;var c=0;do{if(ya&&(va=null),vi=0,ya=!1,25<=c)throw Error(l(301));if(c+=1,tt=Be=null,e.updateQueue!=null){var d=e.updateQueue;d.lastEffect=null,d.events=null,d.stores=null,d.memoCache!=null&&(d.memoCache.index=0)}L.H=ap,d=t(r,i)}while(ya);return d}function fS(){var e=L.H,t=e.useState()[0];return t=typeof t.then=="function"?xi(t):t,e=e.useState()[0],(Be!==null?Be.memoizedState:null)!==e&&(Ee.flags|=1024),t}function Ac(){var e=Ps!==0;return Ps=0,e}function Mc(e,t,r){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~r}function kc(e){if(Ys){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}Ys=!1}Mn=0,tt=Be=Ee=null,ya=!1,vi=Ps=0,va=null}function xt(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return tt===null?Ee.memoizedState=tt=e:tt=tt.next=e,tt}function We(){if(Be===null){var e=Ee.alternate;e=e!==null?e.memoizedState:null}else e=Be.next;var t=tt===null?Ee.memoizedState:tt.next;if(t!==null)tt=t,Be=e;else{if(e===null)throw Ee.alternate===null?Error(l(467)):Error(l(310));Be=e,e={memoizedState:Be.memoizedState,baseState:Be.baseState,baseQueue:Be.baseQueue,queue:Be.queue,next:null},tt===null?Ee.memoizedState=tt=e:tt=tt.next=e}return tt}function Gs(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function xi(e){var t=vi;return vi+=1,va===null&&(va=[]),e=fm(va,e,t),t=Ee,(tt===null?t.memoizedState:tt.next)===null&&(t=t.alternate,L.H=t===null||t.memoizedState===null?rp:Pc),e}function Fs(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return xi(e);if(e.$$typeof===_)return ht(e)}throw Error(l(438,String(e)))}function Rc(e){var t=null,r=Ee.updateQueue;if(r!==null&&(t=r.memoCache),t==null){var i=Ee.alternate;i!==null&&(i=i.updateQueue,i!==null&&(i=i.memoCache,i!=null&&(t={data:i.data.map(function(c){return c.slice()}),index:0})))}if(t==null&&(t={data:[],index:0}),r===null&&(r=Gs(),Ee.updateQueue=r),r.memoCache=t,r=t.data[t.index],r===void 0)for(r=t.data[t.index]=Array(e),i=0;i<e;i++)r[i]=K;return t.index++,r}function kn(e,t){return typeof t=="function"?t(e):t}function Xs(e){var t=We();return Oc(t,Be,e)}function Oc(e,t,r){var i=e.queue;if(i===null)throw Error(l(311));i.lastRenderedReducer=r;var c=e.baseQueue,d=i.pending;if(d!==null){if(c!==null){var y=c.next;c.next=d.next,d.next=y}t.baseQueue=c=d,i.pending=null}if(d=e.baseState,c===null)e.memoizedState=d;else{t=c.next;var j=y=null,k=null,F=t,ee=!1;do{var le=F.lane&-536870913;if(le!==F.lane?(De&le)===le:(Mn&le)===le){var X=F.revertLane;if(X===0)k!==null&&(k=k.next={lane:0,revertLane:0,gesture:null,action:F.action,hasEagerState:F.hasEagerState,eagerState:F.eagerState,next:null}),le===fa&&(ee=!0);else if((Mn&X)===X){F=F.next,X===fa&&(ee=!0);continue}else le={lane:0,revertLane:F.revertLane,gesture:null,action:F.action,hasEagerState:F.hasEagerState,eagerState:F.eagerState,next:null},k===null?(j=k=le,y=d):k=k.next=le,Ee.lanes|=X,ar|=X;le=F.action,Vr&&r(d,le),d=F.hasEagerState?F.eagerState:r(d,le)}else X={lane:le,revertLane:F.revertLane,gesture:F.gesture,action:F.action,hasEagerState:F.hasEagerState,eagerState:F.eagerState,next:null},k===null?(j=k=X,y=d):k=k.next=X,Ee.lanes|=le,ar|=le;F=F.next}while(F!==null&&F!==t);if(k===null?y=d:k.next=j,!Ot(d,e.memoizedState)&&(nt=!0,ee&&(r=ha,r!==null)))throw r;e.memoizedState=d,e.baseState=y,e.baseQueue=k,i.lastRenderedState=d}return c===null&&(i.lanes=0),[e.memoizedState,i.dispatch]}function zc(e){var t=We(),r=t.queue;if(r===null)throw Error(l(311));r.lastRenderedReducer=e;var i=r.dispatch,c=r.pending,d=t.memoizedState;if(c!==null){r.pending=null;var y=c=c.next;do d=e(d,y.action),y=y.next;while(y!==c);Ot(d,t.memoizedState)||(nt=!0),t.memoizedState=d,t.baseQueue===null&&(t.baseState=d),r.lastRenderedState=d}return[d,i]}function wm(e,t,r){var i=Ee,c=We(),d=Me;if(d){if(r===void 0)throw Error(l(407));r=r()}else r=t();var y=!Ot((Be||c).memoizedState,r);if(y&&(c.memoizedState=r,nt=!0),c=c.queue,Bc(Cm.bind(null,i,c,e),[e]),c.getSnapshot!==t||y||tt!==null&&tt.memoizedState.tag&1){if(i.flags|=2048,xa(9,{destroy:void 0},Tm.bind(null,i,c,r,t),null),He===null)throw Error(l(349));d||(Mn&127)!==0||Em(i,t,r)}return r}function Em(e,t,r){e.flags|=16384,e={getSnapshot:t,value:r},t=Ee.updateQueue,t===null?(t=Gs(),Ee.updateQueue=t,t.stores=[e]):(r=t.stores,r===null?t.stores=[e]:r.push(e))}function Tm(e,t,r,i){t.value=r,t.getSnapshot=i,Nm(t)&&Dm(e)}function Cm(e,t,r){return r(function(){Nm(t)&&Dm(e)})}function Nm(e){var t=e.getSnapshot;e=e.value;try{var r=t();return!Ot(e,r)}catch{return!0}}function Dm(e){var t=Nr(e,2);t!==null&&At(t,e,2)}function _c(e){var t=xt();if(typeof e=="function"){var r=e;if(e=r(),Vr){Gn(!0);try{r()}finally{Gn(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:kn,lastRenderedState:e},t}function Am(e,t,r,i){return e.baseState=r,Oc(e,Be,typeof i=="function"?i:kn)}function hS(e,t,r,i,c){if(Zs(e))throw Error(l(485));if(e=t.action,e!==null){var d={payload:c,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(y){d.listeners.push(y)}};L.T!==null?r(!0):d.isTransition=!1,i(d),r=t.pending,r===null?(d.next=t.pending=d,Mm(t,d)):(d.next=r.next,t.pending=r.next=d)}}function Mm(e,t){var r=t.action,i=t.payload,c=e.state;if(t.isTransition){var d=L.T,y={};L.T=y;try{var j=r(c,i),k=L.S;k!==null&&k(y,j),km(e,t,j)}catch(F){Vc(e,t,F)}finally{d!==null&&y.types!==null&&(d.types=y.types),L.T=d}}else try{d=r(c,i),km(e,t,d)}catch(F){Vc(e,t,F)}}function km(e,t,r){r!==null&&typeof r=="object"&&typeof r.then=="function"?r.then(function(i){Rm(e,t,i)},function(i){return Vc(e,t,i)}):Rm(e,t,r)}function Rm(e,t,r){t.status="fulfilled",t.value=r,Om(t),e.state=r,t=e.pending,t!==null&&(r=t.next,r===t?e.pending=null:(r=r.next,t.next=r,Mm(e,r)))}function Vc(e,t,r){var i=e.pending;if(e.pending=null,i!==null){i=i.next;do t.status="rejected",t.reason=r,Om(t),t=t.next;while(t!==i)}e.action=null}function Om(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function zm(e,t){return t}function _m(e,t){if(Me){var r=He.formState;if(r!==null){e:{var i=Ee;if(Me){if(Ge){t:{for(var c=Ge,d=Kt;c.nodeType!==8;){if(!d){c=null;break t}if(c=Qt(c.nextSibling),c===null){c=null;break t}}d=c.data,c=d==="F!"||d==="F"?c:null}if(c){Ge=Qt(c.nextSibling),i=c.data==="F!";break e}}Zn(i)}i=!1}i&&(t=r[0])}}return r=xt(),r.memoizedState=r.baseState=t,i={pending:null,lanes:0,dispatch:null,lastRenderedReducer:zm,lastRenderedState:t},r.queue=i,r=ep.bind(null,Ee,i),i.dispatch=r,i=_c(!1),d=Yc.bind(null,Ee,!1,i.queue),i=xt(),c={state:t,dispatch:null,action:e,pending:null},i.queue=c,r=hS.bind(null,Ee,c,d,r),c.dispatch=r,i.memoizedState=e,[t,r,!1]}function Vm(e){var t=We();return Bm(t,Be,e)}function Bm(e,t,r){if(t=Oc(e,t,zm)[0],e=Xs(kn)[0],typeof t=="object"&&t!==null&&typeof t.then=="function")try{var i=xi(t)}catch(y){throw y===ma?Vs:y}else i=t;t=We();var c=t.queue,d=c.dispatch;return r!==t.memoizedState&&(Ee.flags|=2048,xa(9,{destroy:void 0},mS.bind(null,c,r),null)),[i,d,e]}function mS(e,t){e.action=t}function Lm(e){var t=We(),r=Be;if(r!==null)return Bm(t,r,e);We(),t=t.memoizedState,r=We();var i=r.queue.dispatch;return r.memoizedState=e,[t,i,!1]}function xa(e,t,r,i){return e={tag:e,create:r,deps:i,inst:t,next:null},t=Ee.updateQueue,t===null&&(t=Gs(),Ee.updateQueue=t),r=t.lastEffect,r===null?t.lastEffect=e.next=e:(i=r.next,r.next=e,e.next=i,t.lastEffect=e),e}function Um(){return We().memoizedState}function $s(e,t,r,i){var c=xt();Ee.flags|=e,c.memoizedState=xa(1|t,{destroy:void 0},r,i===void 0?null:i)}function Ks(e,t,r,i){var c=We();i=i===void 0?null:i;var d=c.memoizedState.inst;Be!==null&&i!==null&&Nc(i,Be.memoizedState.deps)?c.memoizedState=xa(t,d,r,i):(Ee.flags|=e,c.memoizedState=xa(1|t,d,r,i))}function Hm(e,t){$s(8390656,8,e,t)}function Bc(e,t){Ks(2048,8,e,t)}function pS(e){Ee.flags|=4;var t=Ee.updateQueue;if(t===null)t=Gs(),Ee.updateQueue=t,t.events=[e];else{var r=t.events;r===null?t.events=[e]:r.push(e)}}function qm(e){var t=We().memoizedState;return pS({ref:t,nextImpl:e}),function(){if((ze&2)!==0)throw Error(l(440));return t.impl.apply(void 0,arguments)}}function Ym(e,t){return Ks(4,2,e,t)}function Pm(e,t){return Ks(4,4,e,t)}function Gm(e,t){if(typeof t=="function"){e=e();var r=t(e);return function(){typeof r=="function"?r():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Fm(e,t,r){r=r!=null?r.concat([e]):null,Ks(4,4,Gm.bind(null,t,e),r)}function Lc(){}function Xm(e,t){var r=We();t=t===void 0?null:t;var i=r.memoizedState;return t!==null&&Nc(t,i[1])?i[0]:(r.memoizedState=[e,t],e)}function $m(e,t){var r=We();t=t===void 0?null:t;var i=r.memoizedState;if(t!==null&&Nc(t,i[1]))return i[0];if(i=e(),Vr){Gn(!0);try{e()}finally{Gn(!1)}}return r.memoizedState=[i,t],i}function Uc(e,t,r){return r===void 0||(Mn&1073741824)!==0&&(De&261930)===0?e.memoizedState=t:(e.memoizedState=r,e=Kp(),Ee.lanes|=e,ar|=e,r)}function Km(e,t,r,i){return Ot(r,t)?r:ga.current!==null?(e=Uc(e,r,i),Ot(e,t)||(nt=!0),e):(Mn&42)===0||(Mn&1073741824)!==0&&(De&261930)===0?(nt=!0,e.memoizedState=r):(e=Kp(),Ee.lanes|=e,ar|=e,t)}function Zm(e,t,r,i,c){var d=ne.p;ne.p=d!==0&&8>d?d:8;var y=L.T,j={};L.T=j,Yc(e,!1,t,r);try{var k=c(),F=L.S;if(F!==null&&F(j,k),k!==null&&typeof k=="object"&&typeof k.then=="function"){var ee=uS(k,i);bi(e,t,ee,Ut(e))}else bi(e,t,i,Ut(e))}catch(le){bi(e,t,{then:function(){},status:"rejected",reason:le},Ut())}finally{ne.p=d,y!==null&&j.types!==null&&(y.types=j.types),L.T=y}}function gS(){}function Hc(e,t,r,i){if(e.tag!==5)throw Error(l(476));var c=Qm(e).queue;Zm(e,c,t,W,r===null?gS:function(){return Jm(e),r(i)})}function Qm(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:W,baseState:W,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:kn,lastRenderedState:W},next:null};var r={};return t.next={memoizedState:r,baseState:r,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:kn,lastRenderedState:r},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function Jm(e){var t=Qm(e);t.next===null&&(t=e.alternate.memoizedState),bi(e,t.next.queue,{},Ut())}function qc(){return ht(Bi)}function Wm(){return We().memoizedState}function Im(){return We().memoizedState}function yS(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var r=Ut();e=Wn(r);var i=In(t,e,r);i!==null&&(At(i,t,r),pi(i,t,r)),t={cache:gc()},e.payload=t;return}t=t.return}}function vS(e,t,r){var i=Ut();r={lane:i,revertLane:0,gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},Zs(e)?tp(t,r):(r=ic(e,t,r,i),r!==null&&(At(r,e,i),np(r,t,i)))}function ep(e,t,r){var i=Ut();bi(e,t,r,i)}function bi(e,t,r,i){var c={lane:i,revertLane:0,gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null};if(Zs(e))tp(t,c);else{var d=e.alternate;if(e.lanes===0&&(d===null||d.lanes===0)&&(d=t.lastRenderedReducer,d!==null))try{var y=t.lastRenderedState,j=d(y,r);if(c.hasEagerState=!0,c.eagerState=j,Ot(j,y))return As(e,t,c,0),He===null&&Ds(),!1}catch{}finally{}if(r=ic(e,t,c,i),r!==null)return At(r,e,i),np(r,t,i),!0}return!1}function Yc(e,t,r,i){if(i={lane:2,revertLane:bu(),gesture:null,action:i,hasEagerState:!1,eagerState:null,next:null},Zs(e)){if(t)throw Error(l(479))}else t=ic(e,r,i,2),t!==null&&At(t,e,2)}function Zs(e){var t=e.alternate;return e===Ee||t!==null&&t===Ee}function tp(e,t){ya=Ys=!0;var r=e.pending;r===null?t.next=t:(t.next=r.next,r.next=t),e.pending=t}function np(e,t,r){if((r&4194048)!==0){var i=t.lanes;i&=e.pendingLanes,r|=i,t.lanes=r,lh(e,r)}}var Si={readContext:ht,use:Fs,useCallback:Ke,useContext:Ke,useEffect:Ke,useImperativeHandle:Ke,useLayoutEffect:Ke,useInsertionEffect:Ke,useMemo:Ke,useReducer:Ke,useRef:Ke,useState:Ke,useDebugValue:Ke,useDeferredValue:Ke,useTransition:Ke,useSyncExternalStore:Ke,useId:Ke,useHostTransitionStatus:Ke,useFormState:Ke,useActionState:Ke,useOptimistic:Ke,useMemoCache:Ke,useCacheRefresh:Ke};Si.useEffectEvent=Ke;var rp={readContext:ht,use:Fs,useCallback:function(e,t){return xt().memoizedState=[e,t===void 0?null:t],e},useContext:ht,useEffect:Hm,useImperativeHandle:function(e,t,r){r=r!=null?r.concat([e]):null,$s(4194308,4,Gm.bind(null,t,e),r)},useLayoutEffect:function(e,t){return $s(4194308,4,e,t)},useInsertionEffect:function(e,t){$s(4,2,e,t)},useMemo:function(e,t){var r=xt();t=t===void 0?null:t;var i=e();if(Vr){Gn(!0);try{e()}finally{Gn(!1)}}return r.memoizedState=[i,t],i},useReducer:function(e,t,r){var i=xt();if(r!==void 0){var c=r(t);if(Vr){Gn(!0);try{r(t)}finally{Gn(!1)}}}else c=t;return i.memoizedState=i.baseState=c,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:c},i.queue=e,e=e.dispatch=vS.bind(null,Ee,e),[i.memoizedState,e]},useRef:function(e){var t=xt();return e={current:e},t.memoizedState=e},useState:function(e){e=_c(e);var t=e.queue,r=ep.bind(null,Ee,t);return t.dispatch=r,[e.memoizedState,r]},useDebugValue:Lc,useDeferredValue:function(e,t){var r=xt();return Uc(r,e,t)},useTransition:function(){var e=_c(!1);return e=Zm.bind(null,Ee,e.queue,!0,!1),xt().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,r){var i=Ee,c=xt();if(Me){if(r===void 0)throw Error(l(407));r=r()}else{if(r=t(),He===null)throw Error(l(349));(De&127)!==0||Em(i,t,r)}c.memoizedState=r;var d={value:r,getSnapshot:t};return c.queue=d,Hm(Cm.bind(null,i,d,e),[e]),i.flags|=2048,xa(9,{destroy:void 0},Tm.bind(null,i,d,r,t),null),r},useId:function(){var e=xt(),t=He.identifierPrefix;if(Me){var r=fn,i=dn;r=(i&~(1<<32-Rt(i)-1)).toString(32)+r,t="_"+t+"R_"+r,r=Ps++,0<r&&(t+="H"+r.toString(32)),t+="_"}else r=dS++,t="_"+t+"r_"+r.toString(32)+"_";return e.memoizedState=t},useHostTransitionStatus:qc,useFormState:_m,useActionState:_m,useOptimistic:function(e){var t=xt();t.memoizedState=t.baseState=e;var r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=r,t=Yc.bind(null,Ee,!0,r),r.dispatch=t,[e,t]},useMemoCache:Rc,useCacheRefresh:function(){return xt().memoizedState=yS.bind(null,Ee)},useEffectEvent:function(e){var t=xt(),r={impl:e};return t.memoizedState=r,function(){if((ze&2)!==0)throw Error(l(440));return r.impl.apply(void 0,arguments)}}},Pc={readContext:ht,use:Fs,useCallback:Xm,useContext:ht,useEffect:Bc,useImperativeHandle:Fm,useInsertionEffect:Ym,useLayoutEffect:Pm,useMemo:$m,useReducer:Xs,useRef:Um,useState:function(){return Xs(kn)},useDebugValue:Lc,useDeferredValue:function(e,t){var r=We();return Km(r,Be.memoizedState,e,t)},useTransition:function(){var e=Xs(kn)[0],t=We().memoizedState;return[typeof e=="boolean"?e:xi(e),t]},useSyncExternalStore:wm,useId:Wm,useHostTransitionStatus:qc,useFormState:Vm,useActionState:Vm,useOptimistic:function(e,t){var r=We();return Am(r,Be,e,t)},useMemoCache:Rc,useCacheRefresh:Im};Pc.useEffectEvent=qm;var ap={readContext:ht,use:Fs,useCallback:Xm,useContext:ht,useEffect:Bc,useImperativeHandle:Fm,useInsertionEffect:Ym,useLayoutEffect:Pm,useMemo:$m,useReducer:zc,useRef:Um,useState:function(){return zc(kn)},useDebugValue:Lc,useDeferredValue:function(e,t){var r=We();return Be===null?Uc(r,e,t):Km(r,Be.memoizedState,e,t)},useTransition:function(){var e=zc(kn)[0],t=We().memoizedState;return[typeof e=="boolean"?e:xi(e),t]},useSyncExternalStore:wm,useId:Wm,useHostTransitionStatus:qc,useFormState:Lm,useActionState:Lm,useOptimistic:function(e,t){var r=We();return Be!==null?Am(r,Be,e,t):(r.baseState=e,[e,r.queue.dispatch])},useMemoCache:Rc,useCacheRefresh:Im};ap.useEffectEvent=qm;function Gc(e,t,r,i){t=e.memoizedState,r=r(i,t),r=r==null?t:x({},t,r),e.memoizedState=r,e.lanes===0&&(e.updateQueue.baseState=r)}var Fc={enqueueSetState:function(e,t,r){e=e._reactInternals;var i=Ut(),c=Wn(i);c.payload=t,r!=null&&(c.callback=r),t=In(e,c,i),t!==null&&(At(t,e,i),pi(t,e,i))},enqueueReplaceState:function(e,t,r){e=e._reactInternals;var i=Ut(),c=Wn(i);c.tag=1,c.payload=t,r!=null&&(c.callback=r),t=In(e,c,i),t!==null&&(At(t,e,i),pi(t,e,i))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var r=Ut(),i=Wn(r);i.tag=2,t!=null&&(i.callback=t),t=In(e,i,r),t!==null&&(At(t,e,r),pi(t,e,r))}};function ip(e,t,r,i,c,d,y){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(i,d,y):t.prototype&&t.prototype.isPureReactComponent?!li(r,i)||!li(c,d):!0}function sp(e,t,r,i){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(r,i),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(r,i),t.state!==e&&Fc.enqueueReplaceState(t,t.state,null)}function Br(e,t){var r=t;if("ref"in t){r={};for(var i in t)i!=="ref"&&(r[i]=t[i])}if(e=e.defaultProps){r===t&&(r=x({},r));for(var c in e)r[c]===void 0&&(r[c]=e[c])}return r}function lp(e){Ns(e)}function op(e){console.error(e)}function cp(e){Ns(e)}function Qs(e,t){try{var r=e.onUncaughtError;r(t.value,{componentStack:t.stack})}catch(i){setTimeout(function(){throw i})}}function up(e,t,r){try{var i=e.onCaughtError;i(r.value,{componentStack:r.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(c){setTimeout(function(){throw c})}}function Xc(e,t,r){return r=Wn(r),r.tag=3,r.payload={element:null},r.callback=function(){Qs(e,t)},r}function dp(e){return e=Wn(e),e.tag=3,e}function fp(e,t,r,i){var c=r.type.getDerivedStateFromError;if(typeof c=="function"){var d=i.value;e.payload=function(){return c(d)},e.callback=function(){up(t,r,i)}}var y=r.stateNode;y!==null&&typeof y.componentDidCatch=="function"&&(e.callback=function(){up(t,r,i),typeof c!="function"&&(ir===null?ir=new Set([this]):ir.add(this));var j=i.stack;this.componentDidCatch(i.value,{componentStack:j!==null?j:""})})}function xS(e,t,r,i,c){if(r.flags|=32768,i!==null&&typeof i=="object"&&typeof i.then=="function"){if(t=r.alternate,t!==null&&da(t,r,c,!0),r=_t.current,r!==null){switch(r.tag){case 31:case 13:return Zt===null?ol():r.alternate===null&&Ze===0&&(Ze=3),r.flags&=-257,r.flags|=65536,r.lanes=c,i===Bs?r.flags|=16384:(t=r.updateQueue,t===null?r.updateQueue=new Set([i]):t.add(i),yu(e,i,c)),!1;case 22:return r.flags|=65536,i===Bs?r.flags|=16384:(t=r.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([i])},r.updateQueue=t):(r=t.retryQueue,r===null?t.retryQueue=new Set([i]):r.add(i)),yu(e,i,c)),!1}throw Error(l(435,r.tag))}return yu(e,i,c),ol(),!1}if(Me)return t=_t.current,t!==null?((t.flags&65536)===0&&(t.flags|=256),t.flags|=65536,t.lanes=c,i!==dc&&(e=Error(l(422),{cause:i}),ui(Ft(e,r)))):(i!==dc&&(t=Error(l(423),{cause:i}),ui(Ft(t,r))),e=e.current.alternate,e.flags|=65536,c&=-c,e.lanes|=c,i=Ft(i,r),c=Xc(e.stateNode,i,c),jc(e,c),Ze!==4&&(Ze=2)),!1;var d=Error(l(520),{cause:i});if(d=Ft(d,r),Ai===null?Ai=[d]:Ai.push(d),Ze!==4&&(Ze=2),t===null)return!0;i=Ft(i,r),r=t;do{switch(r.tag){case 3:return r.flags|=65536,e=c&-c,r.lanes|=e,e=Xc(r.stateNode,i,e),jc(r,e),!1;case 1:if(t=r.type,d=r.stateNode,(r.flags&128)===0&&(typeof t.getDerivedStateFromError=="function"||d!==null&&typeof d.componentDidCatch=="function"&&(ir===null||!ir.has(d))))return r.flags|=65536,c&=-c,r.lanes|=c,c=dp(c),fp(c,e,r,i),jc(r,c),!1}r=r.return}while(r!==null);return!1}var $c=Error(l(461)),nt=!1;function mt(e,t,r,i){t.child=e===null?gm(t,null,r,i):_r(t,e.child,r,i)}function hp(e,t,r,i,c){r=r.render;var d=t.ref;if("ref"in i){var y={};for(var j in i)j!=="ref"&&(y[j]=i[j])}else y=i;return kr(t),i=Dc(e,t,r,y,d,c),j=Ac(),e!==null&&!nt?(Mc(e,t,c),Rn(e,t,c)):(Me&&j&&cc(t),t.flags|=1,mt(e,t,i,c),t.child)}function mp(e,t,r,i,c){if(e===null){var d=r.type;return typeof d=="function"&&!sc(d)&&d.defaultProps===void 0&&r.compare===null?(t.tag=15,t.type=d,pp(e,t,d,i,c)):(e=ks(r.type,null,i,t,t.mode,c),e.ref=t.ref,e.return=t,t.child=e)}if(d=e.child,!tu(e,c)){var y=d.memoizedProps;if(r=r.compare,r=r!==null?r:li,r(y,i)&&e.ref===t.ref)return Rn(e,t,c)}return t.flags|=1,e=Cn(d,i),e.ref=t.ref,e.return=t,t.child=e}function pp(e,t,r,i,c){if(e!==null){var d=e.memoizedProps;if(li(d,i)&&e.ref===t.ref)if(nt=!1,t.pendingProps=i=d,tu(e,c))(e.flags&131072)!==0&&(nt=!0);else return t.lanes=e.lanes,Rn(e,t,c)}return Kc(e,t,r,i,c)}function gp(e,t,r,i){var c=i.children,d=e!==null?e.memoizedState:null;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),i.mode==="hidden"){if((t.flags&128)!==0){if(d=d!==null?d.baseLanes|r:r,e!==null){for(i=t.child=e.child,c=0;i!==null;)c=c|i.lanes|i.childLanes,i=i.sibling;i=c&~d}else i=0,t.child=null;return yp(e,t,d,r,i)}if((r&536870912)!==0)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&_s(t,d!==null?d.cachePool:null),d!==null?xm(t,d):Ec(),bm(t);else return i=t.lanes=536870912,yp(e,t,d!==null?d.baseLanes|r:r,r,i)}else d!==null?(_s(t,d.cachePool),xm(t,d),tr(),t.memoizedState=null):(e!==null&&_s(t,null),Ec(),tr());return mt(e,t,c,r),t.child}function ji(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function yp(e,t,r,i,c){var d=vc();return d=d===null?null:{parent:et._currentValue,pool:d},t.memoizedState={baseLanes:r,cachePool:d},e!==null&&_s(t,null),Ec(),bm(t),e!==null&&da(e,t,i,!0),t.childLanes=c,null}function Js(e,t){return t=Is({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function vp(e,t,r){return _r(t,e.child,null,r),e=Js(t,t.pendingProps),e.flags|=2,Vt(t),t.memoizedState=null,e}function bS(e,t,r){var i=t.pendingProps,c=(t.flags&128)!==0;if(t.flags&=-129,e===null){if(Me){if(i.mode==="hidden")return e=Js(t,i),t.lanes=536870912,ji(null,e);if(Cc(t),(e=Ge)?(e=Mg(e,Kt),e=e!==null&&e.data==="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:$n!==null?{id:dn,overflow:fn}:null,retryLane:536870912,hydrationErrors:null},r=tm(e),r.return=t,t.child=r,ft=t,Ge=null)):e=null,e===null)throw Zn(t);return t.lanes=536870912,null}return Js(t,i)}var d=e.memoizedState;if(d!==null){var y=d.dehydrated;if(Cc(t),c)if(t.flags&256)t.flags&=-257,t=vp(e,t,r);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(l(558));else if(nt||da(e,t,r,!1),c=(r&e.childLanes)!==0,nt||c){if(i=He,i!==null&&(y=oh(i,r),y!==0&&y!==d.retryLane))throw d.retryLane=y,Nr(e,y),At(i,e,y),$c;ol(),t=vp(e,t,r)}else e=d.treeContext,Ge=Qt(y.nextSibling),ft=t,Me=!0,Kn=null,Kt=!1,e!==null&&am(t,e),t=Js(t,i),t.flags|=4096;return t}return e=Cn(e.child,{mode:i.mode,children:i.children}),e.ref=t.ref,t.child=e,e.return=t,e}function Ws(e,t){var r=t.ref;if(r===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof r!="function"&&typeof r!="object")throw Error(l(284));(e===null||e.ref!==r)&&(t.flags|=4194816)}}function Kc(e,t,r,i,c){return kr(t),r=Dc(e,t,r,i,void 0,c),i=Ac(),e!==null&&!nt?(Mc(e,t,c),Rn(e,t,c)):(Me&&i&&cc(t),t.flags|=1,mt(e,t,r,c),t.child)}function xp(e,t,r,i,c,d){return kr(t),t.updateQueue=null,r=jm(t,i,r,c),Sm(e),i=Ac(),e!==null&&!nt?(Mc(e,t,d),Rn(e,t,d)):(Me&&i&&cc(t),t.flags|=1,mt(e,t,r,d),t.child)}function bp(e,t,r,i,c){if(kr(t),t.stateNode===null){var d=la,y=r.contextType;typeof y=="object"&&y!==null&&(d=ht(y)),d=new r(i,d),t.memoizedState=d.state!==null&&d.state!==void 0?d.state:null,d.updater=Fc,t.stateNode=d,d._reactInternals=t,d=t.stateNode,d.props=i,d.state=t.memoizedState,d.refs={},bc(t),y=r.contextType,d.context=typeof y=="object"&&y!==null?ht(y):la,d.state=t.memoizedState,y=r.getDerivedStateFromProps,typeof y=="function"&&(Gc(t,r,y,i),d.state=t.memoizedState),typeof r.getDerivedStateFromProps=="function"||typeof d.getSnapshotBeforeUpdate=="function"||typeof d.UNSAFE_componentWillMount!="function"&&typeof d.componentWillMount!="function"||(y=d.state,typeof d.componentWillMount=="function"&&d.componentWillMount(),typeof d.UNSAFE_componentWillMount=="function"&&d.UNSAFE_componentWillMount(),y!==d.state&&Fc.enqueueReplaceState(d,d.state,null),yi(t,i,d,c),gi(),d.state=t.memoizedState),typeof d.componentDidMount=="function"&&(t.flags|=4194308),i=!0}else if(e===null){d=t.stateNode;var j=t.memoizedProps,k=Br(r,j);d.props=k;var F=d.context,ee=r.contextType;y=la,typeof ee=="object"&&ee!==null&&(y=ht(ee));var le=r.getDerivedStateFromProps;ee=typeof le=="function"||typeof d.getSnapshotBeforeUpdate=="function",j=t.pendingProps!==j,ee||typeof d.UNSAFE_componentWillReceiveProps!="function"&&typeof d.componentWillReceiveProps!="function"||(j||F!==y)&&sp(t,d,i,y),Jn=!1;var X=t.memoizedState;d.state=X,yi(t,i,d,c),gi(),F=t.memoizedState,j||X!==F||Jn?(typeof le=="function"&&(Gc(t,r,le,i),F=t.memoizedState),(k=Jn||ip(t,r,k,i,X,F,y))?(ee||typeof d.UNSAFE_componentWillMount!="function"&&typeof d.componentWillMount!="function"||(typeof d.componentWillMount=="function"&&d.componentWillMount(),typeof d.UNSAFE_componentWillMount=="function"&&d.UNSAFE_componentWillMount()),typeof d.componentDidMount=="function"&&(t.flags|=4194308)):(typeof d.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=i,t.memoizedState=F),d.props=i,d.state=F,d.context=y,i=k):(typeof d.componentDidMount=="function"&&(t.flags|=4194308),i=!1)}else{d=t.stateNode,Sc(e,t),y=t.memoizedProps,ee=Br(r,y),d.props=ee,le=t.pendingProps,X=d.context,F=r.contextType,k=la,typeof F=="object"&&F!==null&&(k=ht(F)),j=r.getDerivedStateFromProps,(F=typeof j=="function"||typeof d.getSnapshotBeforeUpdate=="function")||typeof d.UNSAFE_componentWillReceiveProps!="function"&&typeof d.componentWillReceiveProps!="function"||(y!==le||X!==k)&&sp(t,d,i,k),Jn=!1,X=t.memoizedState,d.state=X,yi(t,i,d,c),gi();var Z=t.memoizedState;y!==le||X!==Z||Jn||e!==null&&e.dependencies!==null&&Os(e.dependencies)?(typeof j=="function"&&(Gc(t,r,j,i),Z=t.memoizedState),(ee=Jn||ip(t,r,ee,i,X,Z,k)||e!==null&&e.dependencies!==null&&Os(e.dependencies))?(F||typeof d.UNSAFE_componentWillUpdate!="function"&&typeof d.componentWillUpdate!="function"||(typeof d.componentWillUpdate=="function"&&d.componentWillUpdate(i,Z,k),typeof d.UNSAFE_componentWillUpdate=="function"&&d.UNSAFE_componentWillUpdate(i,Z,k)),typeof d.componentDidUpdate=="function"&&(t.flags|=4),typeof d.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof d.componentDidUpdate!="function"||y===e.memoizedProps&&X===e.memoizedState||(t.flags|=4),typeof d.getSnapshotBeforeUpdate!="function"||y===e.memoizedProps&&X===e.memoizedState||(t.flags|=1024),t.memoizedProps=i,t.memoizedState=Z),d.props=i,d.state=Z,d.context=k,i=ee):(typeof d.componentDidUpdate!="function"||y===e.memoizedProps&&X===e.memoizedState||(t.flags|=4),typeof d.getSnapshotBeforeUpdate!="function"||y===e.memoizedProps&&X===e.memoizedState||(t.flags|=1024),i=!1)}return d=i,Ws(e,t),i=(t.flags&128)!==0,d||i?(d=t.stateNode,r=i&&typeof r.getDerivedStateFromError!="function"?null:d.render(),t.flags|=1,e!==null&&i?(t.child=_r(t,e.child,null,c),t.child=_r(t,null,r,c)):mt(e,t,r,c),t.memoizedState=d.state,e=t.child):e=Rn(e,t,c),e}function Sp(e,t,r,i){return Ar(),t.flags|=256,mt(e,t,r,i),t.child}var Zc={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Qc(e){return{baseLanes:e,cachePool:um()}}function Jc(e,t,r){return e=e!==null?e.childLanes&~r:0,t&&(e|=Lt),e}function jp(e,t,r){var i=t.pendingProps,c=!1,d=(t.flags&128)!==0,y;if((y=d)||(y=e!==null&&e.memoizedState===null?!1:(Je.current&2)!==0),y&&(c=!0,t.flags&=-129),y=(t.flags&32)!==0,t.flags&=-33,e===null){if(Me){if(c?er(t):tr(),(e=Ge)?(e=Mg(e,Kt),e=e!==null&&e.data!=="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:$n!==null?{id:dn,overflow:fn}:null,retryLane:536870912,hydrationErrors:null},r=tm(e),r.return=t,t.child=r,ft=t,Ge=null)):e=null,e===null)throw Zn(t);return Ou(e)?t.lanes=32:t.lanes=536870912,null}var j=i.children;return i=i.fallback,c?(tr(),c=t.mode,j=Is({mode:"hidden",children:j},c),i=Dr(i,c,r,null),j.return=t,i.return=t,j.sibling=i,t.child=j,i=t.child,i.memoizedState=Qc(r),i.childLanes=Jc(e,y,r),t.memoizedState=Zc,ji(null,i)):(er(t),Wc(t,j))}var k=e.memoizedState;if(k!==null&&(j=k.dehydrated,j!==null)){if(d)t.flags&256?(er(t),t.flags&=-257,t=Ic(e,t,r)):t.memoizedState!==null?(tr(),t.child=e.child,t.flags|=128,t=null):(tr(),j=i.fallback,c=t.mode,i=Is({mode:"visible",children:i.children},c),j=Dr(j,c,r,null),j.flags|=2,i.return=t,j.return=t,i.sibling=j,t.child=i,_r(t,e.child,null,r),i=t.child,i.memoizedState=Qc(r),i.childLanes=Jc(e,y,r),t.memoizedState=Zc,t=ji(null,i));else if(er(t),Ou(j)){if(y=j.nextSibling&&j.nextSibling.dataset,y)var F=y.dgst;y=F,i=Error(l(419)),i.stack="",i.digest=y,ui({value:i,source:null,stack:null}),t=Ic(e,t,r)}else if(nt||da(e,t,r,!1),y=(r&e.childLanes)!==0,nt||y){if(y=He,y!==null&&(i=oh(y,r),i!==0&&i!==k.retryLane))throw k.retryLane=i,Nr(e,i),At(y,e,i),$c;Ru(j)||ol(),t=Ic(e,t,r)}else Ru(j)?(t.flags|=192,t.child=e.child,t=null):(e=k.treeContext,Ge=Qt(j.nextSibling),ft=t,Me=!0,Kn=null,Kt=!1,e!==null&&am(t,e),t=Wc(t,i.children),t.flags|=4096);return t}return c?(tr(),j=i.fallback,c=t.mode,k=e.child,F=k.sibling,i=Cn(k,{mode:"hidden",children:i.children}),i.subtreeFlags=k.subtreeFlags&65011712,F!==null?j=Cn(F,j):(j=Dr(j,c,r,null),j.flags|=2),j.return=t,i.return=t,i.sibling=j,t.child=i,ji(null,i),i=t.child,j=e.child.memoizedState,j===null?j=Qc(r):(c=j.cachePool,c!==null?(k=et._currentValue,c=c.parent!==k?{parent:k,pool:k}:c):c=um(),j={baseLanes:j.baseLanes|r,cachePool:c}),i.memoizedState=j,i.childLanes=Jc(e,y,r),t.memoizedState=Zc,ji(e.child,i)):(er(t),r=e.child,e=r.sibling,r=Cn(r,{mode:"visible",children:i.children}),r.return=t,r.sibling=null,e!==null&&(y=t.deletions,y===null?(t.deletions=[e],t.flags|=16):y.push(e)),t.child=r,t.memoizedState=null,r)}function Wc(e,t){return t=Is({mode:"visible",children:t},e.mode),t.return=e,e.child=t}function Is(e,t){return e=zt(22,e,null,t),e.lanes=0,e}function Ic(e,t,r){return _r(t,e.child,null,r),e=Wc(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function wp(e,t,r){e.lanes|=t;var i=e.alternate;i!==null&&(i.lanes|=t),mc(e.return,t,r)}function eu(e,t,r,i,c,d){var y=e.memoizedState;y===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:i,tail:r,tailMode:c,treeForkCount:d}:(y.isBackwards=t,y.rendering=null,y.renderingStartTime=0,y.last=i,y.tail=r,y.tailMode=c,y.treeForkCount=d)}function Ep(e,t,r){var i=t.pendingProps,c=i.revealOrder,d=i.tail;i=i.children;var y=Je.current,j=(y&2)!==0;if(j?(y=y&1|2,t.flags|=128):y&=1,re(Je,y),mt(e,t,i,r),i=Me?ci:0,!j&&e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&wp(e,r,t);else if(e.tag===19)wp(e,r,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(c){case"forwards":for(r=t.child,c=null;r!==null;)e=r.alternate,e!==null&&qs(e)===null&&(c=r),r=r.sibling;r=c,r===null?(c=t.child,t.child=null):(c=r.sibling,r.sibling=null),eu(t,!1,c,r,d,i);break;case"backwards":case"unstable_legacy-backwards":for(r=null,c=t.child,t.child=null;c!==null;){if(e=c.alternate,e!==null&&qs(e)===null){t.child=c;break}e=c.sibling,c.sibling=r,r=c,c=e}eu(t,!0,r,null,d,i);break;case"together":eu(t,!1,null,null,void 0,i);break;default:t.memoizedState=null}return t.child}function Rn(e,t,r){if(e!==null&&(t.dependencies=e.dependencies),ar|=t.lanes,(r&t.childLanes)===0)if(e!==null){if(da(e,t,r,!1),(r&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(l(153));if(t.child!==null){for(e=t.child,r=Cn(e,e.pendingProps),t.child=r,r.return=t;e.sibling!==null;)e=e.sibling,r=r.sibling=Cn(e,e.pendingProps),r.return=t;r.sibling=null}return t.child}function tu(e,t){return(e.lanes&t)!==0?!0:(e=e.dependencies,!!(e!==null&&Os(e)))}function SS(e,t,r){switch(t.tag){case 3:oe(t,t.stateNode.containerInfo),Qn(t,et,e.memoizedState.cache),Ar();break;case 27:case 5:he(t);break;case 4:oe(t,t.stateNode.containerInfo);break;case 10:Qn(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,Cc(t),null;break;case 13:var i=t.memoizedState;if(i!==null)return i.dehydrated!==null?(er(t),t.flags|=128,null):(r&t.child.childLanes)!==0?jp(e,t,r):(er(t),e=Rn(e,t,r),e!==null?e.sibling:null);er(t);break;case 19:var c=(e.flags&128)!==0;if(i=(r&t.childLanes)!==0,i||(da(e,t,r,!1),i=(r&t.childLanes)!==0),c){if(i)return Ep(e,t,r);t.flags|=128}if(c=t.memoizedState,c!==null&&(c.rendering=null,c.tail=null,c.lastEffect=null),re(Je,Je.current),i)break;return null;case 22:return t.lanes=0,gp(e,t,r,t.pendingProps);case 24:Qn(t,et,e.memoizedState.cache)}return Rn(e,t,r)}function Tp(e,t,r){if(e!==null)if(e.memoizedProps!==t.pendingProps)nt=!0;else{if(!tu(e,r)&&(t.flags&128)===0)return nt=!1,SS(e,t,r);nt=(e.flags&131072)!==0}else nt=!1,Me&&(t.flags&1048576)!==0&&rm(t,ci,t.index);switch(t.lanes=0,t.tag){case 16:e:{var i=t.pendingProps;if(e=Or(t.elementType),t.type=e,typeof e=="function")sc(e)?(i=Br(e,i),t.tag=1,t=bp(null,t,e,i,r)):(t.tag=0,t=Kc(null,t,e,i,r));else{if(e!=null){var c=e.$$typeof;if(c===O){t.tag=11,t=hp(null,t,e,i,r);break e}else if(c===M){t.tag=14,t=mp(null,t,e,i,r);break e}}throw t=G(e)||e,Error(l(306,t,""))}}return t;case 0:return Kc(e,t,t.type,t.pendingProps,r);case 1:return i=t.type,c=Br(i,t.pendingProps),bp(e,t,i,c,r);case 3:e:{if(oe(t,t.stateNode.containerInfo),e===null)throw Error(l(387));i=t.pendingProps;var d=t.memoizedState;c=d.element,Sc(e,t),yi(t,i,null,r);var y=t.memoizedState;if(i=y.cache,Qn(t,et,i),i!==d.cache&&pc(t,[et],r,!0),gi(),i=y.element,d.isDehydrated)if(d={element:i,isDehydrated:!1,cache:y.cache},t.updateQueue.baseState=d,t.memoizedState=d,t.flags&256){t=Sp(e,t,i,r);break e}else if(i!==c){c=Ft(Error(l(424)),t),ui(c),t=Sp(e,t,i,r);break e}else{switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName==="HTML"?e.ownerDocument.body:e}for(Ge=Qt(e.firstChild),ft=t,Me=!0,Kn=null,Kt=!0,r=gm(t,null,i,r),t.child=r;r;)r.flags=r.flags&-3|4096,r=r.sibling}else{if(Ar(),i===c){t=Rn(e,t,r);break e}mt(e,t,i,r)}t=t.child}return t;case 26:return Ws(e,t),e===null?(r=Vg(t.type,null,t.pendingProps,null))?t.memoizedState=r:Me||(r=t.type,e=t.pendingProps,i=pl(fe.current).createElement(r),i[dt]=t,i[wt]=e,pt(i,r,e),ot(i),t.stateNode=i):t.memoizedState=Vg(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return he(t),e===null&&Me&&(i=t.stateNode=Og(t.type,t.pendingProps,fe.current),ft=t,Kt=!0,c=Ge,cr(t.type)?(zu=c,Ge=Qt(i.firstChild)):Ge=c),mt(e,t,t.pendingProps.children,r),Ws(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&Me&&((c=i=Ge)&&(i=JS(i,t.type,t.pendingProps,Kt),i!==null?(t.stateNode=i,ft=t,Ge=Qt(i.firstChild),Kt=!1,c=!0):c=!1),c||Zn(t)),he(t),c=t.type,d=t.pendingProps,y=e!==null?e.memoizedProps:null,i=d.children,Au(c,d)?i=null:y!==null&&Au(c,y)&&(t.flags|=32),t.memoizedState!==null&&(c=Dc(e,t,fS,null,null,r),Bi._currentValue=c),Ws(e,t),mt(e,t,i,r),t.child;case 6:return e===null&&Me&&((e=r=Ge)&&(r=WS(r,t.pendingProps,Kt),r!==null?(t.stateNode=r,ft=t,Ge=null,e=!0):e=!1),e||Zn(t)),null;case 13:return jp(e,t,r);case 4:return oe(t,t.stateNode.containerInfo),i=t.pendingProps,e===null?t.child=_r(t,null,i,r):mt(e,t,i,r),t.child;case 11:return hp(e,t,t.type,t.pendingProps,r);case 7:return mt(e,t,t.pendingProps,r),t.child;case 8:return mt(e,t,t.pendingProps.children,r),t.child;case 12:return mt(e,t,t.pendingProps.children,r),t.child;case 10:return i=t.pendingProps,Qn(t,t.type,i.value),mt(e,t,i.children,r),t.child;case 9:return c=t.type._context,i=t.pendingProps.children,kr(t),c=ht(c),i=i(c),t.flags|=1,mt(e,t,i,r),t.child;case 14:return mp(e,t,t.type,t.pendingProps,r);case 15:return pp(e,t,t.type,t.pendingProps,r);case 19:return Ep(e,t,r);case 31:return bS(e,t,r);case 22:return gp(e,t,r,t.pendingProps);case 24:return kr(t),i=ht(et),e===null?(c=vc(),c===null&&(c=He,d=gc(),c.pooledCache=d,d.refCount++,d!==null&&(c.pooledCacheLanes|=r),c=d),t.memoizedState={parent:i,cache:c},bc(t),Qn(t,et,c)):((e.lanes&r)!==0&&(Sc(e,t),yi(t,null,null,r),gi()),c=e.memoizedState,d=t.memoizedState,c.parent!==i?(c={parent:i,cache:i},t.memoizedState=c,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=c),Qn(t,et,i)):(i=d.cache,Qn(t,et,i),i!==c.cache&&pc(t,[et],r,!0))),mt(e,t,t.pendingProps.children,r),t.child;case 29:throw t.pendingProps}throw Error(l(156,t.tag))}function On(e){e.flags|=4}function nu(e,t,r,i,c){if((t=(e.mode&32)!==0)&&(t=!1),t){if(e.flags|=16777216,(c&335544128)===c)if(e.stateNode.complete)e.flags|=8192;else if(Wp())e.flags|=8192;else throw zr=Bs,xc}else e.flags&=-16777217}function Cp(e,t){if(t.type!=="stylesheet"||(t.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!qg(t))if(Wp())e.flags|=8192;else throw zr=Bs,xc}function el(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag!==22?ih():536870912,e.lanes|=t,wa|=t)}function wi(e,t){if(!Me)switch(e.tailMode){case"hidden":t=e.tail;for(var r=null;t!==null;)t.alternate!==null&&(r=t),t=t.sibling;r===null?e.tail=null:r.sibling=null;break;case"collapsed":r=e.tail;for(var i=null;r!==null;)r.alternate!==null&&(i=r),r=r.sibling;i===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:i.sibling=null}}function Fe(e){var t=e.alternate!==null&&e.alternate.child===e.child,r=0,i=0;if(t)for(var c=e.child;c!==null;)r|=c.lanes|c.childLanes,i|=c.subtreeFlags&65011712,i|=c.flags&65011712,c.return=e,c=c.sibling;else for(c=e.child;c!==null;)r|=c.lanes|c.childLanes,i|=c.subtreeFlags,i|=c.flags,c.return=e,c=c.sibling;return e.subtreeFlags|=i,e.childLanes=r,t}function jS(e,t,r){var i=t.pendingProps;switch(uc(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Fe(t),null;case 1:return Fe(t),null;case 3:return r=t.stateNode,i=null,e!==null&&(i=e.memoizedState.cache),t.memoizedState.cache!==i&&(t.flags|=2048),An(et),I(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(ua(t)?On(t):e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,fc())),Fe(t),null;case 26:var c=t.type,d=t.memoizedState;return e===null?(On(t),d!==null?(Fe(t),Cp(t,d)):(Fe(t),nu(t,c,null,i,r))):d?d!==e.memoizedState?(On(t),Fe(t),Cp(t,d)):(Fe(t),t.flags&=-16777217):(e=e.memoizedProps,e!==i&&On(t),Fe(t),nu(t,c,e,i,r)),null;case 27:if(se(t),r=fe.current,c=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==i&&On(t);else{if(!i){if(t.stateNode===null)throw Error(l(166));return Fe(t),null}e=ce.current,ua(t)?im(t):(e=Og(c,i,r),t.stateNode=e,On(t))}return Fe(t),null;case 5:if(se(t),c=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==i&&On(t);else{if(!i){if(t.stateNode===null)throw Error(l(166));return Fe(t),null}if(d=ce.current,ua(t))im(t);else{var y=pl(fe.current);switch(d){case 1:d=y.createElementNS("http://www.w3.org/2000/svg",c);break;case 2:d=y.createElementNS("http://www.w3.org/1998/Math/MathML",c);break;default:switch(c){case"svg":d=y.createElementNS("http://www.w3.org/2000/svg",c);break;case"math":d=y.createElementNS("http://www.w3.org/1998/Math/MathML",c);break;case"script":d=y.createElement("div"),d.innerHTML="<script><\/script>",d=d.removeChild(d.firstChild);break;case"select":d=typeof i.is=="string"?y.createElement("select",{is:i.is}):y.createElement("select"),i.multiple?d.multiple=!0:i.size&&(d.size=i.size);break;default:d=typeof i.is=="string"?y.createElement(c,{is:i.is}):y.createElement(c)}}d[dt]=t,d[wt]=i;e:for(y=t.child;y!==null;){if(y.tag===5||y.tag===6)d.appendChild(y.stateNode);else if(y.tag!==4&&y.tag!==27&&y.child!==null){y.child.return=y,y=y.child;continue}if(y===t)break e;for(;y.sibling===null;){if(y.return===null||y.return===t)break e;y=y.return}y.sibling.return=y.return,y=y.sibling}t.stateNode=d;e:switch(pt(d,c,i),c){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}i&&On(t)}}return Fe(t),nu(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,r),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==i&&On(t);else{if(typeof i!="string"&&t.stateNode===null)throw Error(l(166));if(e=fe.current,ua(t)){if(e=t.stateNode,r=t.memoizedProps,i=null,c=ft,c!==null)switch(c.tag){case 27:case 5:i=c.memoizedProps}e[dt]=t,e=!!(e.nodeValue===r||i!==null&&i.suppressHydrationWarning===!0||jg(e.nodeValue,r)),e||Zn(t,!0)}else e=pl(e).createTextNode(i),e[dt]=t,t.stateNode=e}return Fe(t),null;case 31:if(r=t.memoizedState,e===null||e.memoizedState!==null){if(i=ua(t),r!==null){if(e===null){if(!i)throw Error(l(318));if(e=t.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(l(557));e[dt]=t}else Ar(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;Fe(t),e=!1}else r=fc(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=r),e=!0;if(!e)return t.flags&256?(Vt(t),t):(Vt(t),null);if((t.flags&128)!==0)throw Error(l(558))}return Fe(t),null;case 13:if(i=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(c=ua(t),i!==null&&i.dehydrated!==null){if(e===null){if(!c)throw Error(l(318));if(c=t.memoizedState,c=c!==null?c.dehydrated:null,!c)throw Error(l(317));c[dt]=t}else Ar(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;Fe(t),c=!1}else c=fc(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=c),c=!0;if(!c)return t.flags&256?(Vt(t),t):(Vt(t),null)}return Vt(t),(t.flags&128)!==0?(t.lanes=r,t):(r=i!==null,e=e!==null&&e.memoizedState!==null,r&&(i=t.child,c=null,i.alternate!==null&&i.alternate.memoizedState!==null&&i.alternate.memoizedState.cachePool!==null&&(c=i.alternate.memoizedState.cachePool.pool),d=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(d=i.memoizedState.cachePool.pool),d!==c&&(i.flags|=2048)),r!==e&&r&&(t.child.flags|=8192),el(t,t.updateQueue),Fe(t),null);case 4:return I(),e===null&&Eu(t.stateNode.containerInfo),Fe(t),null;case 10:return An(t.type),Fe(t),null;case 19:if(z(Je),i=t.memoizedState,i===null)return Fe(t),null;if(c=(t.flags&128)!==0,d=i.rendering,d===null)if(c)wi(i,!1);else{if(Ze!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(d=qs(e),d!==null){for(t.flags|=128,wi(i,!1),e=d.updateQueue,t.updateQueue=e,el(t,e),t.subtreeFlags=0,e=r,r=t.child;r!==null;)em(r,e),r=r.sibling;return re(Je,Je.current&1|2),Me&&Nn(t,i.treeForkCount),t.child}e=e.sibling}i.tail!==null&&Mt()>il&&(t.flags|=128,c=!0,wi(i,!1),t.lanes=4194304)}else{if(!c)if(e=qs(d),e!==null){if(t.flags|=128,c=!0,e=e.updateQueue,t.updateQueue=e,el(t,e),wi(i,!0),i.tail===null&&i.tailMode==="hidden"&&!d.alternate&&!Me)return Fe(t),null}else 2*Mt()-i.renderingStartTime>il&&r!==536870912&&(t.flags|=128,c=!0,wi(i,!1),t.lanes=4194304);i.isBackwards?(d.sibling=t.child,t.child=d):(e=i.last,e!==null?e.sibling=d:t.child=d,i.last=d)}return i.tail!==null?(e=i.tail,i.rendering=e,i.tail=e.sibling,i.renderingStartTime=Mt(),e.sibling=null,r=Je.current,re(Je,c?r&1|2:r&1),Me&&Nn(t,i.treeForkCount),e):(Fe(t),null);case 22:case 23:return Vt(t),Tc(),i=t.memoizedState!==null,e!==null?e.memoizedState!==null!==i&&(t.flags|=8192):i&&(t.flags|=8192),i?(r&536870912)!==0&&(t.flags&128)===0&&(Fe(t),t.subtreeFlags&6&&(t.flags|=8192)):Fe(t),r=t.updateQueue,r!==null&&el(t,r.retryQueue),r=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(r=e.memoizedState.cachePool.pool),i=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(i=t.memoizedState.cachePool.pool),i!==r&&(t.flags|=2048),e!==null&&z(Rr),null;case 24:return r=null,e!==null&&(r=e.memoizedState.cache),t.memoizedState.cache!==r&&(t.flags|=2048),An(et),Fe(t),null;case 25:return null;case 30:return null}throw Error(l(156,t.tag))}function wS(e,t){switch(uc(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return An(et),I(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return se(t),null;case 31:if(t.memoizedState!==null){if(Vt(t),t.alternate===null)throw Error(l(340));Ar()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(Vt(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(l(340));Ar()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return z(Je),null;case 4:return I(),null;case 10:return An(t.type),null;case 22:case 23:return Vt(t),Tc(),e!==null&&z(Rr),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return An(et),null;case 25:return null;default:return null}}function Np(e,t){switch(uc(t),t.tag){case 3:An(et),I();break;case 26:case 27:case 5:se(t);break;case 4:I();break;case 31:t.memoizedState!==null&&Vt(t);break;case 13:Vt(t);break;case 19:z(Je);break;case 10:An(t.type);break;case 22:case 23:Vt(t),Tc(),e!==null&&z(Rr);break;case 24:An(et)}}function Ei(e,t){try{var r=t.updateQueue,i=r!==null?r.lastEffect:null;if(i!==null){var c=i.next;r=c;do{if((r.tag&e)===e){i=void 0;var d=r.create,y=r.inst;i=d(),y.destroy=i}r=r.next}while(r!==c)}}catch(j){Ve(t,t.return,j)}}function nr(e,t,r){try{var i=t.updateQueue,c=i!==null?i.lastEffect:null;if(c!==null){var d=c.next;i=d;do{if((i.tag&e)===e){var y=i.inst,j=y.destroy;if(j!==void 0){y.destroy=void 0,c=t;var k=r,F=j;try{F()}catch(ee){Ve(c,k,ee)}}}i=i.next}while(i!==d)}}catch(ee){Ve(t,t.return,ee)}}function Dp(e){var t=e.updateQueue;if(t!==null){var r=e.stateNode;try{vm(t,r)}catch(i){Ve(e,e.return,i)}}}function Ap(e,t,r){r.props=Br(e.type,e.memoizedProps),r.state=e.memoizedState;try{r.componentWillUnmount()}catch(i){Ve(e,t,i)}}function Ti(e,t){try{var r=e.ref;if(r!==null){switch(e.tag){case 26:case 27:case 5:var i=e.stateNode;break;case 30:i=e.stateNode;break;default:i=e.stateNode}typeof r=="function"?e.refCleanup=r(i):r.current=i}}catch(c){Ve(e,t,c)}}function hn(e,t){var r=e.ref,i=e.refCleanup;if(r!==null)if(typeof i=="function")try{i()}catch(c){Ve(e,t,c)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof r=="function")try{r(null)}catch(c){Ve(e,t,c)}else r.current=null}function Mp(e){var t=e.type,r=e.memoizedProps,i=e.stateNode;try{e:switch(t){case"button":case"input":case"select":case"textarea":r.autoFocus&&i.focus();break e;case"img":r.src?i.src=r.src:r.srcSet&&(i.srcset=r.srcSet)}}catch(c){Ve(e,e.return,c)}}function ru(e,t,r){try{var i=e.stateNode;FS(i,e.type,r,t),i[wt]=t}catch(c){Ve(e,e.return,c)}}function kp(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&cr(e.type)||e.tag===4}function au(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||kp(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&cr(e.type)||e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function iu(e,t,r){var i=e.tag;if(i===5||i===6)e=e.stateNode,t?(r.nodeType===9?r.body:r.nodeName==="HTML"?r.ownerDocument.body:r).insertBefore(e,t):(t=r.nodeType===9?r.body:r.nodeName==="HTML"?r.ownerDocument.body:r,t.appendChild(e),r=r._reactRootContainer,r!=null||t.onclick!==null||(t.onclick=En));else if(i!==4&&(i===27&&cr(e.type)&&(r=e.stateNode,t=null),e=e.child,e!==null))for(iu(e,t,r),e=e.sibling;e!==null;)iu(e,t,r),e=e.sibling}function tl(e,t,r){var i=e.tag;if(i===5||i===6)e=e.stateNode,t?r.insertBefore(e,t):r.appendChild(e);else if(i!==4&&(i===27&&cr(e.type)&&(r=e.stateNode),e=e.child,e!==null))for(tl(e,t,r),e=e.sibling;e!==null;)tl(e,t,r),e=e.sibling}function Rp(e){var t=e.stateNode,r=e.memoizedProps;try{for(var i=e.type,c=t.attributes;c.length;)t.removeAttributeNode(c[0]);pt(t,i,r),t[dt]=e,t[wt]=r}catch(d){Ve(e,e.return,d)}}var zn=!1,rt=!1,su=!1,Op=typeof WeakSet=="function"?WeakSet:Set,ct=null;function ES(e,t){if(e=e.containerInfo,Nu=jl,e=Fh(e),Io(e)){if("selectionStart"in e)var r={start:e.selectionStart,end:e.selectionEnd};else e:{r=(r=e.ownerDocument)&&r.defaultView||window;var i=r.getSelection&&r.getSelection();if(i&&i.rangeCount!==0){r=i.anchorNode;var c=i.anchorOffset,d=i.focusNode;i=i.focusOffset;try{r.nodeType,d.nodeType}catch{r=null;break e}var y=0,j=-1,k=-1,F=0,ee=0,le=e,X=null;t:for(;;){for(var Z;le!==r||c!==0&&le.nodeType!==3||(j=y+c),le!==d||i!==0&&le.nodeType!==3||(k=y+i),le.nodeType===3&&(y+=le.nodeValue.length),(Z=le.firstChild)!==null;)X=le,le=Z;for(;;){if(le===e)break t;if(X===r&&++F===c&&(j=y),X===d&&++ee===i&&(k=y),(Z=le.nextSibling)!==null)break;le=X,X=le.parentNode}le=Z}r=j===-1||k===-1?null:{start:j,end:k}}else r=null}r=r||{start:0,end:0}}else r=null;for(Du={focusedElem:e,selectionRange:r},jl=!1,ct=t;ct!==null;)if(t=ct,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,ct=e;else for(;ct!==null;){switch(t=ct,d=t.alternate,e=t.flags,t.tag){case 0:if((e&4)!==0&&(e=t.updateQueue,e=e!==null?e.events:null,e!==null))for(r=0;r<e.length;r++)c=e[r],c.ref.impl=c.nextImpl;break;case 11:case 15:break;case 1:if((e&1024)!==0&&d!==null){e=void 0,r=t,c=d.memoizedProps,d=d.memoizedState,i=r.stateNode;try{var ye=Br(r.type,c);e=i.getSnapshotBeforeUpdate(ye,d),i.__reactInternalSnapshotBeforeUpdate=e}catch(je){Ve(r,r.return,je)}}break;case 3:if((e&1024)!==0){if(e=t.stateNode.containerInfo,r=e.nodeType,r===9)ku(e);else if(r===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":ku(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(l(163))}if(e=t.sibling,e!==null){e.return=t.return,ct=e;break}ct=t.return}}function zp(e,t,r){var i=r.flags;switch(r.tag){case 0:case 11:case 15:Vn(e,r),i&4&&Ei(5,r);break;case 1:if(Vn(e,r),i&4)if(e=r.stateNode,t===null)try{e.componentDidMount()}catch(y){Ve(r,r.return,y)}else{var c=Br(r.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(c,t,e.__reactInternalSnapshotBeforeUpdate)}catch(y){Ve(r,r.return,y)}}i&64&&Dp(r),i&512&&Ti(r,r.return);break;case 3:if(Vn(e,r),i&64&&(e=r.updateQueue,e!==null)){if(t=null,r.child!==null)switch(r.child.tag){case 27:case 5:t=r.child.stateNode;break;case 1:t=r.child.stateNode}try{vm(e,t)}catch(y){Ve(r,r.return,y)}}break;case 27:t===null&&i&4&&Rp(r);case 26:case 5:Vn(e,r),t===null&&i&4&&Mp(r),i&512&&Ti(r,r.return);break;case 12:Vn(e,r);break;case 31:Vn(e,r),i&4&&Bp(e,r);break;case 13:Vn(e,r),i&4&&Lp(e,r),i&64&&(e=r.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(r=OS.bind(null,r),IS(e,r))));break;case 22:if(i=r.memoizedState!==null||zn,!i){t=t!==null&&t.memoizedState!==null||rt,c=zn;var d=rt;zn=i,(rt=t)&&!d?Bn(e,r,(r.subtreeFlags&8772)!==0):Vn(e,r),zn=c,rt=d}break;case 30:break;default:Vn(e,r)}}function _p(e){var t=e.alternate;t!==null&&(e.alternate=null,_p(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&Vo(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var $e=null,Tt=!1;function _n(e,t,r){for(r=r.child;r!==null;)Vp(e,t,r),r=r.sibling}function Vp(e,t,r){if(kt&&typeof kt.onCommitFiberUnmount=="function")try{kt.onCommitFiberUnmount(Za,r)}catch{}switch(r.tag){case 26:rt||hn(r,t),_n(e,t,r),r.memoizedState?r.memoizedState.count--:r.stateNode&&(r=r.stateNode,r.parentNode.removeChild(r));break;case 27:rt||hn(r,t);var i=$e,c=Tt;cr(r.type)&&($e=r.stateNode,Tt=!1),_n(e,t,r),zi(r.stateNode),$e=i,Tt=c;break;case 5:rt||hn(r,t);case 6:if(i=$e,c=Tt,$e=null,_n(e,t,r),$e=i,Tt=c,$e!==null)if(Tt)try{($e.nodeType===9?$e.body:$e.nodeName==="HTML"?$e.ownerDocument.body:$e).removeChild(r.stateNode)}catch(d){Ve(r,t,d)}else try{$e.removeChild(r.stateNode)}catch(d){Ve(r,t,d)}break;case 18:$e!==null&&(Tt?(e=$e,Dg(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,r.stateNode),ka(e)):Dg($e,r.stateNode));break;case 4:i=$e,c=Tt,$e=r.stateNode.containerInfo,Tt=!0,_n(e,t,r),$e=i,Tt=c;break;case 0:case 11:case 14:case 15:nr(2,r,t),rt||nr(4,r,t),_n(e,t,r);break;case 1:rt||(hn(r,t),i=r.stateNode,typeof i.componentWillUnmount=="function"&&Ap(r,t,i)),_n(e,t,r);break;case 21:_n(e,t,r);break;case 22:rt=(i=rt)||r.memoizedState!==null,_n(e,t,r),rt=i;break;default:_n(e,t,r)}}function Bp(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{ka(e)}catch(r){Ve(t,t.return,r)}}}function Lp(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{ka(e)}catch(r){Ve(t,t.return,r)}}function TS(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new Op),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new Op),t;default:throw Error(l(435,e.tag))}}function nl(e,t){var r=TS(e);t.forEach(function(i){if(!r.has(i)){r.add(i);var c=zS.bind(null,e,i);i.then(c,c)}})}function Ct(e,t){var r=t.deletions;if(r!==null)for(var i=0;i<r.length;i++){var c=r[i],d=e,y=t,j=y;e:for(;j!==null;){switch(j.tag){case 27:if(cr(j.type)){$e=j.stateNode,Tt=!1;break e}break;case 5:$e=j.stateNode,Tt=!1;break e;case 3:case 4:$e=j.stateNode.containerInfo,Tt=!0;break e}j=j.return}if($e===null)throw Error(l(160));Vp(d,y,c),$e=null,Tt=!1,d=c.alternate,d!==null&&(d.return=null),c.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)Up(t,e),t=t.sibling}var an=null;function Up(e,t){var r=e.alternate,i=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:Ct(t,e),Nt(e),i&4&&(nr(3,e,e.return),Ei(3,e),nr(5,e,e.return));break;case 1:Ct(t,e),Nt(e),i&512&&(rt||r===null||hn(r,r.return)),i&64&&zn&&(e=e.updateQueue,e!==null&&(i=e.callbacks,i!==null&&(r=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=r===null?i:r.concat(i))));break;case 26:var c=an;if(Ct(t,e),Nt(e),i&512&&(rt||r===null||hn(r,r.return)),i&4){var d=r!==null?r.memoizedState:null;if(i=e.memoizedState,r===null)if(i===null)if(e.stateNode===null){e:{i=e.type,r=e.memoizedProps,c=c.ownerDocument||c;t:switch(i){case"title":d=c.getElementsByTagName("title")[0],(!d||d[Wa]||d[dt]||d.namespaceURI==="http://www.w3.org/2000/svg"||d.hasAttribute("itemprop"))&&(d=c.createElement(i),c.head.insertBefore(d,c.querySelector("head > title"))),pt(d,i,r),d[dt]=e,ot(d),i=d;break e;case"link":var y=Ug("link","href",c).get(i+(r.href||""));if(y){for(var j=0;j<y.length;j++)if(d=y[j],d.getAttribute("href")===(r.href==null||r.href===""?null:r.href)&&d.getAttribute("rel")===(r.rel==null?null:r.rel)&&d.getAttribute("title")===(r.title==null?null:r.title)&&d.getAttribute("crossorigin")===(r.crossOrigin==null?null:r.crossOrigin)){y.splice(j,1);break t}}d=c.createElement(i),pt(d,i,r),c.head.appendChild(d);break;case"meta":if(y=Ug("meta","content",c).get(i+(r.content||""))){for(j=0;j<y.length;j++)if(d=y[j],d.getAttribute("content")===(r.content==null?null:""+r.content)&&d.getAttribute("name")===(r.name==null?null:r.name)&&d.getAttribute("property")===(r.property==null?null:r.property)&&d.getAttribute("http-equiv")===(r.httpEquiv==null?null:r.httpEquiv)&&d.getAttribute("charset")===(r.charSet==null?null:r.charSet)){y.splice(j,1);break t}}d=c.createElement(i),pt(d,i,r),c.head.appendChild(d);break;default:throw Error(l(468,i))}d[dt]=e,ot(d),i=d}e.stateNode=i}else Hg(c,e.type,e.stateNode);else e.stateNode=Lg(c,i,e.memoizedProps);else d!==i?(d===null?r.stateNode!==null&&(r=r.stateNode,r.parentNode.removeChild(r)):d.count--,i===null?Hg(c,e.type,e.stateNode):Lg(c,i,e.memoizedProps)):i===null&&e.stateNode!==null&&ru(e,e.memoizedProps,r.memoizedProps)}break;case 27:Ct(t,e),Nt(e),i&512&&(rt||r===null||hn(r,r.return)),r!==null&&i&4&&ru(e,e.memoizedProps,r.memoizedProps);break;case 5:if(Ct(t,e),Nt(e),i&512&&(rt||r===null||hn(r,r.return)),e.flags&32){c=e.stateNode;try{ea(c,"")}catch(ye){Ve(e,e.return,ye)}}i&4&&e.stateNode!=null&&(c=e.memoizedProps,ru(e,c,r!==null?r.memoizedProps:c)),i&1024&&(su=!0);break;case 6:if(Ct(t,e),Nt(e),i&4){if(e.stateNode===null)throw Error(l(162));i=e.memoizedProps,r=e.stateNode;try{r.nodeValue=i}catch(ye){Ve(e,e.return,ye)}}break;case 3:if(vl=null,c=an,an=gl(t.containerInfo),Ct(t,e),an=c,Nt(e),i&4&&r!==null&&r.memoizedState.isDehydrated)try{ka(t.containerInfo)}catch(ye){Ve(e,e.return,ye)}su&&(su=!1,Hp(e));break;case 4:i=an,an=gl(e.stateNode.containerInfo),Ct(t,e),Nt(e),an=i;break;case 12:Ct(t,e),Nt(e);break;case 31:Ct(t,e),Nt(e),i&4&&(i=e.updateQueue,i!==null&&(e.updateQueue=null,nl(e,i)));break;case 13:Ct(t,e),Nt(e),e.child.flags&8192&&e.memoizedState!==null!=(r!==null&&r.memoizedState!==null)&&(al=Mt()),i&4&&(i=e.updateQueue,i!==null&&(e.updateQueue=null,nl(e,i)));break;case 22:c=e.memoizedState!==null;var k=r!==null&&r.memoizedState!==null,F=zn,ee=rt;if(zn=F||c,rt=ee||k,Ct(t,e),rt=ee,zn=F,Nt(e),i&8192)e:for(t=e.stateNode,t._visibility=c?t._visibility&-2:t._visibility|1,c&&(r===null||k||zn||rt||Lr(e)),r=null,t=e;;){if(t.tag===5||t.tag===26){if(r===null){k=r=t;try{if(d=k.stateNode,c)y=d.style,typeof y.setProperty=="function"?y.setProperty("display","none","important"):y.display="none";else{j=k.stateNode;var le=k.memoizedProps.style,X=le!=null&&le.hasOwnProperty("display")?le.display:null;j.style.display=X==null||typeof X=="boolean"?"":(""+X).trim()}}catch(ye){Ve(k,k.return,ye)}}}else if(t.tag===6){if(r===null){k=t;try{k.stateNode.nodeValue=c?"":k.memoizedProps}catch(ye){Ve(k,k.return,ye)}}}else if(t.tag===18){if(r===null){k=t;try{var Z=k.stateNode;c?Ag(Z,!0):Ag(k.stateNode,!1)}catch(ye){Ve(k,k.return,ye)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;r===t&&(r=null),t=t.return}r===t&&(r=null),t.sibling.return=t.return,t=t.sibling}i&4&&(i=e.updateQueue,i!==null&&(r=i.retryQueue,r!==null&&(i.retryQueue=null,nl(e,r))));break;case 19:Ct(t,e),Nt(e),i&4&&(i=e.updateQueue,i!==null&&(e.updateQueue=null,nl(e,i)));break;case 30:break;case 21:break;default:Ct(t,e),Nt(e)}}function Nt(e){var t=e.flags;if(t&2){try{for(var r,i=e.return;i!==null;){if(kp(i)){r=i;break}i=i.return}if(r==null)throw Error(l(160));switch(r.tag){case 27:var c=r.stateNode,d=au(e);tl(e,d,c);break;case 5:var y=r.stateNode;r.flags&32&&(ea(y,""),r.flags&=-33);var j=au(e);tl(e,j,y);break;case 3:case 4:var k=r.stateNode.containerInfo,F=au(e);iu(e,F,k);break;default:throw Error(l(161))}}catch(ee){Ve(e,e.return,ee)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Hp(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;Hp(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function Vn(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)zp(e,t.alternate,t),t=t.sibling}function Lr(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:nr(4,t,t.return),Lr(t);break;case 1:hn(t,t.return);var r=t.stateNode;typeof r.componentWillUnmount=="function"&&Ap(t,t.return,r),Lr(t);break;case 27:zi(t.stateNode);case 26:case 5:hn(t,t.return),Lr(t);break;case 22:t.memoizedState===null&&Lr(t);break;case 30:Lr(t);break;default:Lr(t)}e=e.sibling}}function Bn(e,t,r){for(r=r&&(t.subtreeFlags&8772)!==0,t=t.child;t!==null;){var i=t.alternate,c=e,d=t,y=d.flags;switch(d.tag){case 0:case 11:case 15:Bn(c,d,r),Ei(4,d);break;case 1:if(Bn(c,d,r),i=d,c=i.stateNode,typeof c.componentDidMount=="function")try{c.componentDidMount()}catch(F){Ve(i,i.return,F)}if(i=d,c=i.updateQueue,c!==null){var j=i.stateNode;try{var k=c.shared.hiddenCallbacks;if(k!==null)for(c.shared.hiddenCallbacks=null,c=0;c<k.length;c++)ym(k[c],j)}catch(F){Ve(i,i.return,F)}}r&&y&64&&Dp(d),Ti(d,d.return);break;case 27:Rp(d);case 26:case 5:Bn(c,d,r),r&&i===null&&y&4&&Mp(d),Ti(d,d.return);break;case 12:Bn(c,d,r);break;case 31:Bn(c,d,r),r&&y&4&&Bp(c,d);break;case 13:Bn(c,d,r),r&&y&4&&Lp(c,d);break;case 22:d.memoizedState===null&&Bn(c,d,r),Ti(d,d.return);break;case 30:break;default:Bn(c,d,r)}t=t.sibling}}function lu(e,t){var r=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(r=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==r&&(e!=null&&e.refCount++,r!=null&&di(r))}function ou(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&di(e))}function sn(e,t,r,i){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)qp(e,t,r,i),t=t.sibling}function qp(e,t,r,i){var c=t.flags;switch(t.tag){case 0:case 11:case 15:sn(e,t,r,i),c&2048&&Ei(9,t);break;case 1:sn(e,t,r,i);break;case 3:sn(e,t,r,i),c&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&di(e)));break;case 12:if(c&2048){sn(e,t,r,i),e=t.stateNode;try{var d=t.memoizedProps,y=d.id,j=d.onPostCommit;typeof j=="function"&&j(y,t.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(k){Ve(t,t.return,k)}}else sn(e,t,r,i);break;case 31:sn(e,t,r,i);break;case 13:sn(e,t,r,i);break;case 23:break;case 22:d=t.stateNode,y=t.alternate,t.memoizedState!==null?d._visibility&2?sn(e,t,r,i):Ci(e,t):d._visibility&2?sn(e,t,r,i):(d._visibility|=2,ba(e,t,r,i,(t.subtreeFlags&10256)!==0||!1)),c&2048&&lu(y,t);break;case 24:sn(e,t,r,i),c&2048&&ou(t.alternate,t);break;default:sn(e,t,r,i)}}function ba(e,t,r,i,c){for(c=c&&((t.subtreeFlags&10256)!==0||!1),t=t.child;t!==null;){var d=e,y=t,j=r,k=i,F=y.flags;switch(y.tag){case 0:case 11:case 15:ba(d,y,j,k,c),Ei(8,y);break;case 23:break;case 22:var ee=y.stateNode;y.memoizedState!==null?ee._visibility&2?ba(d,y,j,k,c):Ci(d,y):(ee._visibility|=2,ba(d,y,j,k,c)),c&&F&2048&&lu(y.alternate,y);break;case 24:ba(d,y,j,k,c),c&&F&2048&&ou(y.alternate,y);break;default:ba(d,y,j,k,c)}t=t.sibling}}function Ci(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var r=e,i=t,c=i.flags;switch(i.tag){case 22:Ci(r,i),c&2048&&lu(i.alternate,i);break;case 24:Ci(r,i),c&2048&&ou(i.alternate,i);break;default:Ci(r,i)}t=t.sibling}}var Ni=8192;function Sa(e,t,r){if(e.subtreeFlags&Ni)for(e=e.child;e!==null;)Yp(e,t,r),e=e.sibling}function Yp(e,t,r){switch(e.tag){case 26:Sa(e,t,r),e.flags&Ni&&e.memoizedState!==null&&dj(r,an,e.memoizedState,e.memoizedProps);break;case 5:Sa(e,t,r);break;case 3:case 4:var i=an;an=gl(e.stateNode.containerInfo),Sa(e,t,r),an=i;break;case 22:e.memoizedState===null&&(i=e.alternate,i!==null&&i.memoizedState!==null?(i=Ni,Ni=16777216,Sa(e,t,r),Ni=i):Sa(e,t,r));break;default:Sa(e,t,r)}}function Pp(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function Di(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var r=0;r<t.length;r++){var i=t[r];ct=i,Fp(i,e)}Pp(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Gp(e),e=e.sibling}function Gp(e){switch(e.tag){case 0:case 11:case 15:Di(e),e.flags&2048&&nr(9,e,e.return);break;case 3:Di(e);break;case 12:Di(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,rl(e)):Di(e);break;default:Di(e)}}function rl(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var r=0;r<t.length;r++){var i=t[r];ct=i,Fp(i,e)}Pp(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:nr(8,t,t.return),rl(t);break;case 22:r=t.stateNode,r._visibility&2&&(r._visibility&=-3,rl(t));break;default:rl(t)}e=e.sibling}}function Fp(e,t){for(;ct!==null;){var r=ct;switch(r.tag){case 0:case 11:case 15:nr(8,r,t);break;case 23:case 22:if(r.memoizedState!==null&&r.memoizedState.cachePool!==null){var i=r.memoizedState.cachePool.pool;i!=null&&i.refCount++}break;case 24:di(r.memoizedState.cache)}if(i=r.child,i!==null)i.return=r,ct=i;else e:for(r=e;ct!==null;){i=ct;var c=i.sibling,d=i.return;if(_p(i),i===r){ct=null;break e}if(c!==null){c.return=d,ct=c;break e}ct=d}}}var CS={getCacheForType:function(e){var t=ht(et),r=t.data.get(e);return r===void 0&&(r=e(),t.data.set(e,r)),r},cacheSignal:function(){return ht(et).controller.signal}},NS=typeof WeakMap=="function"?WeakMap:Map,ze=0,He=null,Ce=null,De=0,_e=0,Bt=null,rr=!1,ja=!1,cu=!1,Ln=0,Ze=0,ar=0,Ur=0,uu=0,Lt=0,wa=0,Ai=null,Dt=null,du=!1,al=0,Xp=0,il=1/0,sl=null,ir=null,it=0,sr=null,Ea=null,Un=0,fu=0,hu=null,$p=null,Mi=0,mu=null;function Ut(){return(ze&2)!==0&&De!==0?De&-De:L.T!==null?bu():ch()}function Kp(){if(Lt===0)if((De&536870912)===0||Me){var e=ms;ms<<=1,(ms&3932160)===0&&(ms=262144),Lt=e}else Lt=536870912;return e=_t.current,e!==null&&(e.flags|=32),Lt}function At(e,t,r){(e===He&&(_e===2||_e===9)||e.cancelPendingCommit!==null)&&(Ta(e,0),lr(e,De,Lt,!1)),Ja(e,r),((ze&2)===0||e!==He)&&(e===He&&((ze&2)===0&&(Ur|=r),Ze===4&&lr(e,De,Lt,!1)),mn(e))}function Zp(e,t,r){if((ze&6)!==0)throw Error(l(327));var i=!r&&(t&127)===0&&(t&e.expiredLanes)===0||Qa(e,t),c=i?MS(e,t):gu(e,t,!0),d=i;do{if(c===0){ja&&!i&&lr(e,t,0,!1);break}else{if(r=e.current.alternate,d&&!DS(r)){c=gu(e,t,!1),d=!1;continue}if(c===2){if(d=t,e.errorRecoveryDisabledLanes&d)var y=0;else y=e.pendingLanes&-536870913,y=y!==0?y:y&536870912?536870912:0;if(y!==0){t=y;e:{var j=e;c=Ai;var k=j.current.memoizedState.isDehydrated;if(k&&(Ta(j,y).flags|=256),y=gu(j,y,!1),y!==2){if(cu&&!k){j.errorRecoveryDisabledLanes|=d,Ur|=d,c=4;break e}d=Dt,Dt=c,d!==null&&(Dt===null?Dt=d:Dt.push.apply(Dt,d))}c=y}if(d=!1,c!==2)continue}}if(c===1){Ta(e,0),lr(e,t,0,!0);break}e:{switch(i=e,d=c,d){case 0:case 1:throw Error(l(345));case 4:if((t&4194048)!==t)break;case 6:lr(i,t,Lt,!rr);break e;case 2:Dt=null;break;case 3:case 5:break;default:throw Error(l(329))}if((t&62914560)===t&&(c=al+300-Mt(),10<c)){if(lr(i,t,Lt,!rr),gs(i,0,!0)!==0)break e;Un=t,i.timeoutHandle=Cg(Qp.bind(null,i,r,Dt,sl,du,t,Lt,Ur,wa,rr,d,"Throttled",-0,0),c);break e}Qp(i,r,Dt,sl,du,t,Lt,Ur,wa,rr,d,null,-0,0)}}break}while(!0);mn(e)}function Qp(e,t,r,i,c,d,y,j,k,F,ee,le,X,Z){if(e.timeoutHandle=-1,le=t.subtreeFlags,le&8192||(le&16785408)===16785408){le={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:En},Yp(t,d,le);var ye=(d&62914560)===d?al-Mt():(d&4194048)===d?Xp-Mt():0;if(ye=fj(le,ye),ye!==null){Un=d,e.cancelPendingCommit=ye(ag.bind(null,e,t,d,r,i,c,y,j,k,ee,le,null,X,Z)),lr(e,d,y,!F);return}}ag(e,t,d,r,i,c,y,j,k)}function DS(e){for(var t=e;;){var r=t.tag;if((r===0||r===11||r===15)&&t.flags&16384&&(r=t.updateQueue,r!==null&&(r=r.stores,r!==null)))for(var i=0;i<r.length;i++){var c=r[i],d=c.getSnapshot;c=c.value;try{if(!Ot(d(),c))return!1}catch{return!1}}if(r=t.child,t.subtreeFlags&16384&&r!==null)r.return=t,t=r;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function lr(e,t,r,i){t&=~uu,t&=~Ur,e.suspendedLanes|=t,e.pingedLanes&=~t,i&&(e.warmLanes|=t),i=e.expirationTimes;for(var c=t;0<c;){var d=31-Rt(c),y=1<<d;i[d]=-1,c&=~y}r!==0&&sh(e,r,t)}function ll(){return(ze&6)===0?(ki(0),!1):!0}function pu(){if(Ce!==null){if(_e===0)var e=Ce.return;else e=Ce,Dn=Mr=null,kc(e),pa=null,hi=0,e=Ce;for(;e!==null;)Np(e.alternate,e),e=e.return;Ce=null}}function Ta(e,t){var r=e.timeoutHandle;r!==-1&&(e.timeoutHandle=-1,KS(r)),r=e.cancelPendingCommit,r!==null&&(e.cancelPendingCommit=null,r()),Un=0,pu(),He=e,Ce=r=Cn(e.current,null),De=t,_e=0,Bt=null,rr=!1,ja=Qa(e,t),cu=!1,wa=Lt=uu=Ur=ar=Ze=0,Dt=Ai=null,du=!1,(t&8)!==0&&(t|=t&32);var i=e.entangledLanes;if(i!==0)for(e=e.entanglements,i&=t;0<i;){var c=31-Rt(i),d=1<<c;t|=e[c],i&=~d}return Ln=t,Ds(),r}function Jp(e,t){Ee=null,L.H=Si,t===ma||t===Vs?(t=hm(),_e=3):t===xc?(t=hm(),_e=4):_e=t===$c?8:t!==null&&typeof t=="object"&&typeof t.then=="function"?6:1,Bt=t,Ce===null&&(Ze=1,Qs(e,Ft(t,e.current)))}function Wp(){var e=_t.current;return e===null?!0:(De&4194048)===De?Zt===null:(De&62914560)===De||(De&536870912)!==0?e===Zt:!1}function Ip(){var e=L.H;return L.H=Si,e===null?Si:e}function eg(){var e=L.A;return L.A=CS,e}function ol(){Ze=4,rr||(De&4194048)!==De&&_t.current!==null||(ja=!0),(ar&134217727)===0&&(Ur&134217727)===0||He===null||lr(He,De,Lt,!1)}function gu(e,t,r){var i=ze;ze|=2;var c=Ip(),d=eg();(He!==e||De!==t)&&(sl=null,Ta(e,t)),t=!1;var y=Ze;e:do try{if(_e!==0&&Ce!==null){var j=Ce,k=Bt;switch(_e){case 8:pu(),y=6;break e;case 3:case 2:case 9:case 6:_t.current===null&&(t=!0);var F=_e;if(_e=0,Bt=null,Ca(e,j,k,F),r&&ja){y=0;break e}break;default:F=_e,_e=0,Bt=null,Ca(e,j,k,F)}}AS(),y=Ze;break}catch(ee){Jp(e,ee)}while(!0);return t&&e.shellSuspendCounter++,Dn=Mr=null,ze=i,L.H=c,L.A=d,Ce===null&&(He=null,De=0,Ds()),y}function AS(){for(;Ce!==null;)tg(Ce)}function MS(e,t){var r=ze;ze|=2;var i=Ip(),c=eg();He!==e||De!==t?(sl=null,il=Mt()+500,Ta(e,t)):ja=Qa(e,t);e:do try{if(_e!==0&&Ce!==null){t=Ce;var d=Bt;t:switch(_e){case 1:_e=0,Bt=null,Ca(e,t,d,1);break;case 2:case 9:if(dm(d)){_e=0,Bt=null,ng(t);break}t=function(){_e!==2&&_e!==9||He!==e||(_e=7),mn(e)},d.then(t,t);break e;case 3:_e=7;break e;case 4:_e=5;break e;case 7:dm(d)?(_e=0,Bt=null,ng(t)):(_e=0,Bt=null,Ca(e,t,d,7));break;case 5:var y=null;switch(Ce.tag){case 26:y=Ce.memoizedState;case 5:case 27:var j=Ce;if(y?qg(y):j.stateNode.complete){_e=0,Bt=null;var k=j.sibling;if(k!==null)Ce=k;else{var F=j.return;F!==null?(Ce=F,cl(F)):Ce=null}break t}}_e=0,Bt=null,Ca(e,t,d,5);break;case 6:_e=0,Bt=null,Ca(e,t,d,6);break;case 8:pu(),Ze=6;break e;default:throw Error(l(462))}}kS();break}catch(ee){Jp(e,ee)}while(!0);return Dn=Mr=null,L.H=i,L.A=c,ze=r,Ce!==null?0:(He=null,De=0,Ds(),Ze)}function kS(){for(;Ce!==null&&!e1();)tg(Ce)}function tg(e){var t=Tp(e.alternate,e,Ln);e.memoizedProps=e.pendingProps,t===null?cl(e):Ce=t}function ng(e){var t=e,r=t.alternate;switch(t.tag){case 15:case 0:t=xp(r,t,t.pendingProps,t.type,void 0,De);break;case 11:t=xp(r,t,t.pendingProps,t.type.render,t.ref,De);break;case 5:kc(t);default:Np(r,t),t=Ce=em(t,Ln),t=Tp(r,t,Ln)}e.memoizedProps=e.pendingProps,t===null?cl(e):Ce=t}function Ca(e,t,r,i){Dn=Mr=null,kc(t),pa=null,hi=0;var c=t.return;try{if(xS(e,c,t,r,De)){Ze=1,Qs(e,Ft(r,e.current)),Ce=null;return}}catch(d){if(c!==null)throw Ce=c,d;Ze=1,Qs(e,Ft(r,e.current)),Ce=null;return}t.flags&32768?(Me||i===1?e=!0:ja||(De&536870912)!==0?e=!1:(rr=e=!0,(i===2||i===9||i===3||i===6)&&(i=_t.current,i!==null&&i.tag===13&&(i.flags|=16384))),rg(t,e)):cl(t)}function cl(e){var t=e;do{if((t.flags&32768)!==0){rg(t,rr);return}e=t.return;var r=jS(t.alternate,t,Ln);if(r!==null){Ce=r;return}if(t=t.sibling,t!==null){Ce=t;return}Ce=t=e}while(t!==null);Ze===0&&(Ze=5)}function rg(e,t){do{var r=wS(e.alternate,e);if(r!==null){r.flags&=32767,Ce=r;return}if(r=e.return,r!==null&&(r.flags|=32768,r.subtreeFlags=0,r.deletions=null),!t&&(e=e.sibling,e!==null)){Ce=e;return}Ce=e=r}while(e!==null);Ze=6,Ce=null}function ag(e,t,r,i,c,d,y,j,k){e.cancelPendingCommit=null;do ul();while(it!==0);if((ze&6)!==0)throw Error(l(327));if(t!==null){if(t===e.current)throw Error(l(177));if(d=t.lanes|t.childLanes,d|=ac,u1(e,r,d,y,j,k),e===He&&(Ce=He=null,De=0),Ea=t,sr=e,Un=r,fu=d,hu=c,$p=i,(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,_S(fs,function(){return cg(),null})):(e.callbackNode=null,e.callbackPriority=0),i=(t.flags&13878)!==0,(t.subtreeFlags&13878)!==0||i){i=L.T,L.T=null,c=ne.p,ne.p=2,y=ze,ze|=4;try{ES(e,t,r)}finally{ze=y,ne.p=c,L.T=i}}it=1,ig(),sg(),lg()}}function ig(){if(it===1){it=0;var e=sr,t=Ea,r=(t.flags&13878)!==0;if((t.subtreeFlags&13878)!==0||r){r=L.T,L.T=null;var i=ne.p;ne.p=2;var c=ze;ze|=4;try{Up(t,e);var d=Du,y=Fh(e.containerInfo),j=d.focusedElem,k=d.selectionRange;if(y!==j&&j&&j.ownerDocument&&Gh(j.ownerDocument.documentElement,j)){if(k!==null&&Io(j)){var F=k.start,ee=k.end;if(ee===void 0&&(ee=F),"selectionStart"in j)j.selectionStart=F,j.selectionEnd=Math.min(ee,j.value.length);else{var le=j.ownerDocument||document,X=le&&le.defaultView||window;if(X.getSelection){var Z=X.getSelection(),ye=j.textContent.length,je=Math.min(k.start,ye),Ue=k.end===void 0?je:Math.min(k.end,ye);!Z.extend&&je>Ue&&(y=Ue,Ue=je,je=y);var q=Ph(j,je),B=Ph(j,Ue);if(q&&B&&(Z.rangeCount!==1||Z.anchorNode!==q.node||Z.anchorOffset!==q.offset||Z.focusNode!==B.node||Z.focusOffset!==B.offset)){var P=le.createRange();P.setStart(q.node,q.offset),Z.removeAllRanges(),je>Ue?(Z.addRange(P),Z.extend(B.node,B.offset)):(P.setEnd(B.node,B.offset),Z.addRange(P))}}}}for(le=[],Z=j;Z=Z.parentNode;)Z.nodeType===1&&le.push({element:Z,left:Z.scrollLeft,top:Z.scrollTop});for(typeof j.focus=="function"&&j.focus(),j=0;j<le.length;j++){var ae=le[j];ae.element.scrollLeft=ae.left,ae.element.scrollTop=ae.top}}jl=!!Nu,Du=Nu=null}finally{ze=c,ne.p=i,L.T=r}}e.current=t,it=2}}function sg(){if(it===2){it=0;var e=sr,t=Ea,r=(t.flags&8772)!==0;if((t.subtreeFlags&8772)!==0||r){r=L.T,L.T=null;var i=ne.p;ne.p=2;var c=ze;ze|=4;try{zp(e,t.alternate,t)}finally{ze=c,ne.p=i,L.T=r}}it=3}}function lg(){if(it===4||it===3){it=0,t1();var e=sr,t=Ea,r=Un,i=$p;(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?it=5:(it=0,Ea=sr=null,og(e,e.pendingLanes));var c=e.pendingLanes;if(c===0&&(ir=null),zo(r),t=t.stateNode,kt&&typeof kt.onCommitFiberRoot=="function")try{kt.onCommitFiberRoot(Za,t,void 0,(t.current.flags&128)===128)}catch{}if(i!==null){t=L.T,c=ne.p,ne.p=2,L.T=null;try{for(var d=e.onRecoverableError,y=0;y<i.length;y++){var j=i[y];d(j.value,{componentStack:j.stack})}}finally{L.T=t,ne.p=c}}(Un&3)!==0&&ul(),mn(e),c=e.pendingLanes,(r&261930)!==0&&(c&42)!==0?e===mu?Mi++:(Mi=0,mu=e):Mi=0,ki(0)}}function og(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,di(t)))}function ul(){return ig(),sg(),lg(),cg()}function cg(){if(it!==5)return!1;var e=sr,t=fu;fu=0;var r=zo(Un),i=L.T,c=ne.p;try{ne.p=32>r?32:r,L.T=null,r=hu,hu=null;var d=sr,y=Un;if(it=0,Ea=sr=null,Un=0,(ze&6)!==0)throw Error(l(331));var j=ze;if(ze|=4,Gp(d.current),qp(d,d.current,y,r),ze=j,ki(0,!1),kt&&typeof kt.onPostCommitFiberRoot=="function")try{kt.onPostCommitFiberRoot(Za,d)}catch{}return!0}finally{ne.p=c,L.T=i,og(e,t)}}function ug(e,t,r){t=Ft(r,t),t=Xc(e.stateNode,t,2),e=In(e,t,2),e!==null&&(Ja(e,2),mn(e))}function Ve(e,t,r){if(e.tag===3)ug(e,e,r);else for(;t!==null;){if(t.tag===3){ug(t,e,r);break}else if(t.tag===1){var i=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(ir===null||!ir.has(i))){e=Ft(r,e),r=dp(2),i=In(t,r,2),i!==null&&(fp(r,i,t,e),Ja(i,2),mn(i));break}}t=t.return}}function yu(e,t,r){var i=e.pingCache;if(i===null){i=e.pingCache=new NS;var c=new Set;i.set(t,c)}else c=i.get(t),c===void 0&&(c=new Set,i.set(t,c));c.has(r)||(cu=!0,c.add(r),e=RS.bind(null,e,t,r),t.then(e,e))}function RS(e,t,r){var i=e.pingCache;i!==null&&i.delete(t),e.pingedLanes|=e.suspendedLanes&r,e.warmLanes&=~r,He===e&&(De&r)===r&&(Ze===4||Ze===3&&(De&62914560)===De&&300>Mt()-al?(ze&2)===0&&Ta(e,0):uu|=r,wa===De&&(wa=0)),mn(e)}function dg(e,t){t===0&&(t=ih()),e=Nr(e,t),e!==null&&(Ja(e,t),mn(e))}function OS(e){var t=e.memoizedState,r=0;t!==null&&(r=t.retryLane),dg(e,r)}function zS(e,t){var r=0;switch(e.tag){case 31:case 13:var i=e.stateNode,c=e.memoizedState;c!==null&&(r=c.retryLane);break;case 19:i=e.stateNode;break;case 22:i=e.stateNode._retryCache;break;default:throw Error(l(314))}i!==null&&i.delete(t),dg(e,r)}function _S(e,t){return Mo(e,t)}var dl=null,Na=null,vu=!1,fl=!1,xu=!1,or=0;function mn(e){e!==Na&&e.next===null&&(Na===null?dl=Na=e:Na=Na.next=e),fl=!0,vu||(vu=!0,BS())}function ki(e,t){if(!xu&&fl){xu=!0;do for(var r=!1,i=dl;i!==null;){if(e!==0){var c=i.pendingLanes;if(c===0)var d=0;else{var y=i.suspendedLanes,j=i.pingedLanes;d=(1<<31-Rt(42|e)+1)-1,d&=c&~(y&~j),d=d&201326741?d&201326741|1:d?d|2:0}d!==0&&(r=!0,pg(i,d))}else d=De,d=gs(i,i===He?d:0,i.cancelPendingCommit!==null||i.timeoutHandle!==-1),(d&3)===0||Qa(i,d)||(r=!0,pg(i,d));i=i.next}while(r);xu=!1}}function VS(){fg()}function fg(){fl=vu=!1;var e=0;or!==0&&$S()&&(e=or);for(var t=Mt(),r=null,i=dl;i!==null;){var c=i.next,d=hg(i,t);d===0?(i.next=null,r===null?dl=c:r.next=c,c===null&&(Na=r)):(r=i,(e!==0||(d&3)!==0)&&(fl=!0)),i=c}it!==0&&it!==5||ki(e),or!==0&&(or=0)}function hg(e,t){for(var r=e.suspendedLanes,i=e.pingedLanes,c=e.expirationTimes,d=e.pendingLanes&-62914561;0<d;){var y=31-Rt(d),j=1<<y,k=c[y];k===-1?((j&r)===0||(j&i)!==0)&&(c[y]=c1(j,t)):k<=t&&(e.expiredLanes|=j),d&=~j}if(t=He,r=De,r=gs(e,e===t?r:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),i=e.callbackNode,r===0||e===t&&(_e===2||_e===9)||e.cancelPendingCommit!==null)return i!==null&&i!==null&&ko(i),e.callbackNode=null,e.callbackPriority=0;if((r&3)===0||Qa(e,r)){if(t=r&-r,t===e.callbackPriority)return t;switch(i!==null&&ko(i),zo(r)){case 2:case 8:r=rh;break;case 32:r=fs;break;case 268435456:r=ah;break;default:r=fs}return i=mg.bind(null,e),r=Mo(r,i),e.callbackPriority=t,e.callbackNode=r,t}return i!==null&&i!==null&&ko(i),e.callbackPriority=2,e.callbackNode=null,2}function mg(e,t){if(it!==0&&it!==5)return e.callbackNode=null,e.callbackPriority=0,null;var r=e.callbackNode;if(ul()&&e.callbackNode!==r)return null;var i=De;return i=gs(e,e===He?i:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),i===0?null:(Zp(e,i,t),hg(e,Mt()),e.callbackNode!=null&&e.callbackNode===r?mg.bind(null,e):null)}function pg(e,t){if(ul())return null;Zp(e,t,!0)}function BS(){ZS(function(){(ze&6)!==0?Mo(nh,VS):fg()})}function bu(){if(or===0){var e=fa;e===0&&(e=hs,hs<<=1,(hs&261888)===0&&(hs=256)),or=e}return or}function gg(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:bs(""+e)}function yg(e,t){var r=t.ownerDocument.createElement("input");return r.name=t.name,r.value=t.value,e.id&&r.setAttribute("form",e.id),t.parentNode.insertBefore(r,t),e=new FormData(e),r.parentNode.removeChild(r),e}function LS(e,t,r,i,c){if(t==="submit"&&r&&r.stateNode===c){var d=gg((c[wt]||null).action),y=i.submitter;y&&(t=(t=y[wt]||null)?gg(t.formAction):y.getAttribute("formAction"),t!==null&&(d=t,y=null));var j=new Es("action","action",null,i,c);e.push({event:j,listeners:[{instance:null,listener:function(){if(i.defaultPrevented){if(or!==0){var k=y?yg(c,y):new FormData(c);Hc(r,{pending:!0,data:k,method:c.method,action:d},null,k)}}else typeof d=="function"&&(j.preventDefault(),k=y?yg(c,y):new FormData(c),Hc(r,{pending:!0,data:k,method:c.method,action:d},d,k))},currentTarget:c}]})}}for(var Su=0;Su<rc.length;Su++){var ju=rc[Su],US=ju.toLowerCase(),HS=ju[0].toUpperCase()+ju.slice(1);rn(US,"on"+HS)}rn(Kh,"onAnimationEnd"),rn(Zh,"onAnimationIteration"),rn(Qh,"onAnimationStart"),rn("dblclick","onDoubleClick"),rn("focusin","onFocus"),rn("focusout","onBlur"),rn(nS,"onTransitionRun"),rn(rS,"onTransitionStart"),rn(aS,"onTransitionCancel"),rn(Jh,"onTransitionEnd"),Wr("onMouseEnter",["mouseout","mouseover"]),Wr("onMouseLeave",["mouseout","mouseover"]),Wr("onPointerEnter",["pointerout","pointerover"]),Wr("onPointerLeave",["pointerout","pointerover"]),wr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),wr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),wr("onBeforeInput",["compositionend","keypress","textInput","paste"]),wr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),wr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),wr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Ri="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),qS=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Ri));function vg(e,t){t=(t&4)!==0;for(var r=0;r<e.length;r++){var i=e[r],c=i.event;i=i.listeners;e:{var d=void 0;if(t)for(var y=i.length-1;0<=y;y--){var j=i[y],k=j.instance,F=j.currentTarget;if(j=j.listener,k!==d&&c.isPropagationStopped())break e;d=j,c.currentTarget=F;try{d(c)}catch(ee){Ns(ee)}c.currentTarget=null,d=k}else for(y=0;y<i.length;y++){if(j=i[y],k=j.instance,F=j.currentTarget,j=j.listener,k!==d&&c.isPropagationStopped())break e;d=j,c.currentTarget=F;try{d(c)}catch(ee){Ns(ee)}c.currentTarget=null,d=k}}}}function Ne(e,t){var r=t[_o];r===void 0&&(r=t[_o]=new Set);var i=e+"__bubble";r.has(i)||(xg(t,e,2,!1),r.add(i))}function wu(e,t,r){var i=0;t&&(i|=4),xg(r,e,i,t)}var hl="_reactListening"+Math.random().toString(36).slice(2);function Eu(e){if(!e[hl]){e[hl]=!0,fh.forEach(function(r){r!=="selectionchange"&&(qS.has(r)||wu(r,!1,e),wu(r,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[hl]||(t[hl]=!0,wu("selectionchange",!1,t))}}function xg(e,t,r,i){switch(Kg(t)){case 2:var c=pj;break;case 8:c=gj;break;default:c=Uu}r=c.bind(null,t,r,e),c=void 0,!Go||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(c=!0),i?c!==void 0?e.addEventListener(t,r,{capture:!0,passive:c}):e.addEventListener(t,r,!0):c!==void 0?e.addEventListener(t,r,{passive:c}):e.addEventListener(t,r,!1)}function Tu(e,t,r,i,c){var d=i;if((t&1)===0&&(t&2)===0&&i!==null)e:for(;;){if(i===null)return;var y=i.tag;if(y===3||y===4){var j=i.stateNode.containerInfo;if(j===c)break;if(y===4)for(y=i.return;y!==null;){var k=y.tag;if((k===3||k===4)&&y.stateNode.containerInfo===c)return;y=y.return}for(;j!==null;){if(y=Zr(j),y===null)return;if(k=y.tag,k===5||k===6||k===26||k===27){i=d=y;continue e}j=j.parentNode}}i=i.return}Eh(function(){var F=d,ee=Yo(r),le=[];e:{var X=Wh.get(e);if(X!==void 0){var Z=Es,ye=e;switch(e){case"keypress":if(js(r)===0)break e;case"keydown":case"keyup":Z=z1;break;case"focusin":ye="focus",Z=Ko;break;case"focusout":ye="blur",Z=Ko;break;case"beforeblur":case"afterblur":Z=Ko;break;case"click":if(r.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":Z=Nh;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":Z=j1;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":Z=B1;break;case Kh:case Zh:case Qh:Z=T1;break;case Jh:Z=U1;break;case"scroll":case"scrollend":Z=b1;break;case"wheel":Z=q1;break;case"copy":case"cut":case"paste":Z=N1;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":Z=Ah;break;case"toggle":case"beforetoggle":Z=P1}var je=(t&4)!==0,Ue=!je&&(e==="scroll"||e==="scrollend"),q=je?X!==null?X+"Capture":null:X;je=[];for(var B=F,P;B!==null;){var ae=B;if(P=ae.stateNode,ae=ae.tag,ae!==5&&ae!==26&&ae!==27||P===null||q===null||(ae=ei(B,q),ae!=null&&je.push(Oi(B,ae,P))),Ue)break;B=B.return}0<je.length&&(X=new Z(X,ye,null,r,ee),le.push({event:X,listeners:je}))}}if((t&7)===0){e:{if(X=e==="mouseover"||e==="pointerover",Z=e==="mouseout"||e==="pointerout",X&&r!==qo&&(ye=r.relatedTarget||r.fromElement)&&(Zr(ye)||ye[Kr]))break e;if((Z||X)&&(X=ee.window===ee?ee:(X=ee.ownerDocument)?X.defaultView||X.parentWindow:window,Z?(ye=r.relatedTarget||r.toElement,Z=F,ye=ye?Zr(ye):null,ye!==null&&(Ue=h(ye),je=ye.tag,ye!==Ue||je!==5&&je!==27&&je!==6)&&(ye=null)):(Z=null,ye=F),Z!==ye)){if(je=Nh,ae="onMouseLeave",q="onMouseEnter",B="mouse",(e==="pointerout"||e==="pointerover")&&(je=Ah,ae="onPointerLeave",q="onPointerEnter",B="pointer"),Ue=Z==null?X:Ia(Z),P=ye==null?X:Ia(ye),X=new je(ae,B+"leave",Z,r,ee),X.target=Ue,X.relatedTarget=P,ae=null,Zr(ee)===F&&(je=new je(q,B+"enter",ye,r,ee),je.target=P,je.relatedTarget=Ue,ae=je),Ue=ae,Z&&ye)t:{for(je=YS,q=Z,B=ye,P=0,ae=q;ae;ae=je(ae))P++;ae=0;for(var Se=B;Se;Se=je(Se))ae++;for(;0<P-ae;)q=je(q),P--;for(;0<ae-P;)B=je(B),ae--;for(;P--;){if(q===B||B!==null&&q===B.alternate){je=q;break t}q=je(q),B=je(B)}je=null}else je=null;Z!==null&&bg(le,X,Z,je,!1),ye!==null&&Ue!==null&&bg(le,Ue,ye,je,!0)}}e:{if(X=F?Ia(F):window,Z=X.nodeName&&X.nodeName.toLowerCase(),Z==="select"||Z==="input"&&X.type==="file")var Re=Bh;else if(_h(X))if(Lh)Re=I1;else{Re=J1;var xe=Q1}else Z=X.nodeName,!Z||Z.toLowerCase()!=="input"||X.type!=="checkbox"&&X.type!=="radio"?F&&Ho(F.elementType)&&(Re=Bh):Re=W1;if(Re&&(Re=Re(e,F))){Vh(le,Re,r,ee);break e}xe&&xe(e,X,F),e==="focusout"&&F&&X.type==="number"&&F.memoizedProps.value!=null&&Uo(X,"number",X.value)}switch(xe=F?Ia(F):window,e){case"focusin":(_h(xe)||xe.contentEditable==="true")&&(aa=xe,ec=F,oi=null);break;case"focusout":oi=ec=aa=null;break;case"mousedown":tc=!0;break;case"contextmenu":case"mouseup":case"dragend":tc=!1,Xh(le,r,ee);break;case"selectionchange":if(tS)break;case"keydown":case"keyup":Xh(le,r,ee)}var Te;if(Qo)e:{switch(e){case"compositionstart":var Ae="onCompositionStart";break e;case"compositionend":Ae="onCompositionEnd";break e;case"compositionupdate":Ae="onCompositionUpdate";break e}Ae=void 0}else ra?Oh(e,r)&&(Ae="onCompositionEnd"):e==="keydown"&&r.keyCode===229&&(Ae="onCompositionStart");Ae&&(Mh&&r.locale!=="ko"&&(ra||Ae!=="onCompositionStart"?Ae==="onCompositionEnd"&&ra&&(Te=Th()):(Xn=ee,Fo="value"in Xn?Xn.value:Xn.textContent,ra=!0)),xe=ml(F,Ae),0<xe.length&&(Ae=new Dh(Ae,e,null,r,ee),le.push({event:Ae,listeners:xe}),Te?Ae.data=Te:(Te=zh(r),Te!==null&&(Ae.data=Te)))),(Te=F1?X1(e,r):$1(e,r))&&(Ae=ml(F,"onBeforeInput"),0<Ae.length&&(xe=new Dh("onBeforeInput","beforeinput",null,r,ee),le.push({event:xe,listeners:Ae}),xe.data=Te)),LS(le,e,F,r,ee)}vg(le,t)})}function Oi(e,t,r){return{instance:e,listener:t,currentTarget:r}}function ml(e,t){for(var r=t+"Capture",i=[];e!==null;){var c=e,d=c.stateNode;if(c=c.tag,c!==5&&c!==26&&c!==27||d===null||(c=ei(e,r),c!=null&&i.unshift(Oi(e,c,d)),c=ei(e,t),c!=null&&i.push(Oi(e,c,d))),e.tag===3)return i;e=e.return}return[]}function YS(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function bg(e,t,r,i,c){for(var d=t._reactName,y=[];r!==null&&r!==i;){var j=r,k=j.alternate,F=j.stateNode;if(j=j.tag,k!==null&&k===i)break;j!==5&&j!==26&&j!==27||F===null||(k=F,c?(F=ei(r,d),F!=null&&y.unshift(Oi(r,F,k))):c||(F=ei(r,d),F!=null&&y.push(Oi(r,F,k)))),r=r.return}y.length!==0&&e.push({event:t,listeners:y})}var PS=/\r\n?/g,GS=/\u0000|\uFFFD/g;function Sg(e){return(typeof e=="string"?e:""+e).replace(PS,`
`).replace(GS,"")}function jg(e,t){return t=Sg(t),Sg(e)===t}function Le(e,t,r,i,c,d){switch(r){case"children":typeof i=="string"?t==="body"||t==="textarea"&&i===""||ea(e,i):(typeof i=="number"||typeof i=="bigint")&&t!=="body"&&ea(e,""+i);break;case"className":vs(e,"class",i);break;case"tabIndex":vs(e,"tabindex",i);break;case"dir":case"role":case"viewBox":case"width":case"height":vs(e,r,i);break;case"style":jh(e,i,d);break;case"data":if(t!=="object"){vs(e,"data",i);break}case"src":case"href":if(i===""&&(t!=="a"||r!=="href")){e.removeAttribute(r);break}if(i==null||typeof i=="function"||typeof i=="symbol"||typeof i=="boolean"){e.removeAttribute(r);break}i=bs(""+i),e.setAttribute(r,i);break;case"action":case"formAction":if(typeof i=="function"){e.setAttribute(r,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof d=="function"&&(r==="formAction"?(t!=="input"&&Le(e,t,"name",c.name,c,null),Le(e,t,"formEncType",c.formEncType,c,null),Le(e,t,"formMethod",c.formMethod,c,null),Le(e,t,"formTarget",c.formTarget,c,null)):(Le(e,t,"encType",c.encType,c,null),Le(e,t,"method",c.method,c,null),Le(e,t,"target",c.target,c,null)));if(i==null||typeof i=="symbol"||typeof i=="boolean"){e.removeAttribute(r);break}i=bs(""+i),e.setAttribute(r,i);break;case"onClick":i!=null&&(e.onclick=En);break;case"onScroll":i!=null&&Ne("scroll",e);break;case"onScrollEnd":i!=null&&Ne("scrollend",e);break;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(l(61));if(r=i.__html,r!=null){if(c.children!=null)throw Error(l(60));e.innerHTML=r}}break;case"multiple":e.multiple=i&&typeof i!="function"&&typeof i!="symbol";break;case"muted":e.muted=i&&typeof i!="function"&&typeof i!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(i==null||typeof i=="function"||typeof i=="boolean"||typeof i=="symbol"){e.removeAttribute("xlink:href");break}r=bs(""+i),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",r);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":i!=null&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(r,""+i):e.removeAttribute(r);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":i&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(r,""):e.removeAttribute(r);break;case"capture":case"download":i===!0?e.setAttribute(r,""):i!==!1&&i!=null&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(r,i):e.removeAttribute(r);break;case"cols":case"rows":case"size":case"span":i!=null&&typeof i!="function"&&typeof i!="symbol"&&!isNaN(i)&&1<=i?e.setAttribute(r,i):e.removeAttribute(r);break;case"rowSpan":case"start":i==null||typeof i=="function"||typeof i=="symbol"||isNaN(i)?e.removeAttribute(r):e.setAttribute(r,i);break;case"popover":Ne("beforetoggle",e),Ne("toggle",e),ys(e,"popover",i);break;case"xlinkActuate":wn(e,"http://www.w3.org/1999/xlink","xlink:actuate",i);break;case"xlinkArcrole":wn(e,"http://www.w3.org/1999/xlink","xlink:arcrole",i);break;case"xlinkRole":wn(e,"http://www.w3.org/1999/xlink","xlink:role",i);break;case"xlinkShow":wn(e,"http://www.w3.org/1999/xlink","xlink:show",i);break;case"xlinkTitle":wn(e,"http://www.w3.org/1999/xlink","xlink:title",i);break;case"xlinkType":wn(e,"http://www.w3.org/1999/xlink","xlink:type",i);break;case"xmlBase":wn(e,"http://www.w3.org/XML/1998/namespace","xml:base",i);break;case"xmlLang":wn(e,"http://www.w3.org/XML/1998/namespace","xml:lang",i);break;case"xmlSpace":wn(e,"http://www.w3.org/XML/1998/namespace","xml:space",i);break;case"is":ys(e,"is",i);break;case"innerText":case"textContent":break;default:(!(2<r.length)||r[0]!=="o"&&r[0]!=="O"||r[1]!=="n"&&r[1]!=="N")&&(r=v1.get(r)||r,ys(e,r,i))}}function Cu(e,t,r,i,c,d){switch(r){case"style":jh(e,i,d);break;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(l(61));if(r=i.__html,r!=null){if(c.children!=null)throw Error(l(60));e.innerHTML=r}}break;case"children":typeof i=="string"?ea(e,i):(typeof i=="number"||typeof i=="bigint")&&ea(e,""+i);break;case"onScroll":i!=null&&Ne("scroll",e);break;case"onScrollEnd":i!=null&&Ne("scrollend",e);break;case"onClick":i!=null&&(e.onclick=En);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!hh.hasOwnProperty(r))e:{if(r[0]==="o"&&r[1]==="n"&&(c=r.endsWith("Capture"),t=r.slice(2,c?r.length-7:void 0),d=e[wt]||null,d=d!=null?d[r]:null,typeof d=="function"&&e.removeEventListener(t,d,c),typeof i=="function")){typeof d!="function"&&d!==null&&(r in e?e[r]=null:e.hasAttribute(r)&&e.removeAttribute(r)),e.addEventListener(t,i,c);break e}r in e?e[r]=i:i===!0?e.setAttribute(r,""):ys(e,r,i)}}}function pt(e,t,r){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":Ne("error",e),Ne("load",e);var i=!1,c=!1,d;for(d in r)if(r.hasOwnProperty(d)){var y=r[d];if(y!=null)switch(d){case"src":i=!0;break;case"srcSet":c=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(l(137,t));default:Le(e,t,d,y,r,null)}}c&&Le(e,t,"srcSet",r.srcSet,r,null),i&&Le(e,t,"src",r.src,r,null);return;case"input":Ne("invalid",e);var j=d=y=c=null,k=null,F=null;for(i in r)if(r.hasOwnProperty(i)){var ee=r[i];if(ee!=null)switch(i){case"name":c=ee;break;case"type":y=ee;break;case"checked":k=ee;break;case"defaultChecked":F=ee;break;case"value":d=ee;break;case"defaultValue":j=ee;break;case"children":case"dangerouslySetInnerHTML":if(ee!=null)throw Error(l(137,t));break;default:Le(e,t,i,ee,r,null)}}vh(e,d,j,k,F,y,c,!1);return;case"select":Ne("invalid",e),i=y=d=null;for(c in r)if(r.hasOwnProperty(c)&&(j=r[c],j!=null))switch(c){case"value":d=j;break;case"defaultValue":y=j;break;case"multiple":i=j;default:Le(e,t,c,j,r,null)}t=d,r=y,e.multiple=!!i,t!=null?Ir(e,!!i,t,!1):r!=null&&Ir(e,!!i,r,!0);return;case"textarea":Ne("invalid",e),d=c=i=null;for(y in r)if(r.hasOwnProperty(y)&&(j=r[y],j!=null))switch(y){case"value":i=j;break;case"defaultValue":c=j;break;case"children":d=j;break;case"dangerouslySetInnerHTML":if(j!=null)throw Error(l(91));break;default:Le(e,t,y,j,r,null)}bh(e,i,c,d);return;case"option":for(k in r)if(r.hasOwnProperty(k)&&(i=r[k],i!=null))switch(k){case"selected":e.selected=i&&typeof i!="function"&&typeof i!="symbol";break;default:Le(e,t,k,i,r,null)}return;case"dialog":Ne("beforetoggle",e),Ne("toggle",e),Ne("cancel",e),Ne("close",e);break;case"iframe":case"object":Ne("load",e);break;case"video":case"audio":for(i=0;i<Ri.length;i++)Ne(Ri[i],e);break;case"image":Ne("error",e),Ne("load",e);break;case"details":Ne("toggle",e);break;case"embed":case"source":case"link":Ne("error",e),Ne("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(F in r)if(r.hasOwnProperty(F)&&(i=r[F],i!=null))switch(F){case"children":case"dangerouslySetInnerHTML":throw Error(l(137,t));default:Le(e,t,F,i,r,null)}return;default:if(Ho(t)){for(ee in r)r.hasOwnProperty(ee)&&(i=r[ee],i!==void 0&&Cu(e,t,ee,i,r,void 0));return}}for(j in r)r.hasOwnProperty(j)&&(i=r[j],i!=null&&Le(e,t,j,i,r,null))}function FS(e,t,r,i){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var c=null,d=null,y=null,j=null,k=null,F=null,ee=null;for(Z in r){var le=r[Z];if(r.hasOwnProperty(Z)&&le!=null)switch(Z){case"checked":break;case"value":break;case"defaultValue":k=le;default:i.hasOwnProperty(Z)||Le(e,t,Z,null,i,le)}}for(var X in i){var Z=i[X];if(le=r[X],i.hasOwnProperty(X)&&(Z!=null||le!=null))switch(X){case"type":d=Z;break;case"name":c=Z;break;case"checked":F=Z;break;case"defaultChecked":ee=Z;break;case"value":y=Z;break;case"defaultValue":j=Z;break;case"children":case"dangerouslySetInnerHTML":if(Z!=null)throw Error(l(137,t));break;default:Z!==le&&Le(e,t,X,Z,i,le)}}Lo(e,y,j,k,F,ee,d,c);return;case"select":Z=y=j=X=null;for(d in r)if(k=r[d],r.hasOwnProperty(d)&&k!=null)switch(d){case"value":break;case"multiple":Z=k;default:i.hasOwnProperty(d)||Le(e,t,d,null,i,k)}for(c in i)if(d=i[c],k=r[c],i.hasOwnProperty(c)&&(d!=null||k!=null))switch(c){case"value":X=d;break;case"defaultValue":j=d;break;case"multiple":y=d;default:d!==k&&Le(e,t,c,d,i,k)}t=j,r=y,i=Z,X!=null?Ir(e,!!r,X,!1):!!i!=!!r&&(t!=null?Ir(e,!!r,t,!0):Ir(e,!!r,r?[]:"",!1));return;case"textarea":Z=X=null;for(j in r)if(c=r[j],r.hasOwnProperty(j)&&c!=null&&!i.hasOwnProperty(j))switch(j){case"value":break;case"children":break;default:Le(e,t,j,null,i,c)}for(y in i)if(c=i[y],d=r[y],i.hasOwnProperty(y)&&(c!=null||d!=null))switch(y){case"value":X=c;break;case"defaultValue":Z=c;break;case"children":break;case"dangerouslySetInnerHTML":if(c!=null)throw Error(l(91));break;default:c!==d&&Le(e,t,y,c,i,d)}xh(e,X,Z);return;case"option":for(var ye in r)if(X=r[ye],r.hasOwnProperty(ye)&&X!=null&&!i.hasOwnProperty(ye))switch(ye){case"selected":e.selected=!1;break;default:Le(e,t,ye,null,i,X)}for(k in i)if(X=i[k],Z=r[k],i.hasOwnProperty(k)&&X!==Z&&(X!=null||Z!=null))switch(k){case"selected":e.selected=X&&typeof X!="function"&&typeof X!="symbol";break;default:Le(e,t,k,X,i,Z)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var je in r)X=r[je],r.hasOwnProperty(je)&&X!=null&&!i.hasOwnProperty(je)&&Le(e,t,je,null,i,X);for(F in i)if(X=i[F],Z=r[F],i.hasOwnProperty(F)&&X!==Z&&(X!=null||Z!=null))switch(F){case"children":case"dangerouslySetInnerHTML":if(X!=null)throw Error(l(137,t));break;default:Le(e,t,F,X,i,Z)}return;default:if(Ho(t)){for(var Ue in r)X=r[Ue],r.hasOwnProperty(Ue)&&X!==void 0&&!i.hasOwnProperty(Ue)&&Cu(e,t,Ue,void 0,i,X);for(ee in i)X=i[ee],Z=r[ee],!i.hasOwnProperty(ee)||X===Z||X===void 0&&Z===void 0||Cu(e,t,ee,X,i,Z);return}}for(var q in r)X=r[q],r.hasOwnProperty(q)&&X!=null&&!i.hasOwnProperty(q)&&Le(e,t,q,null,i,X);for(le in i)X=i[le],Z=r[le],!i.hasOwnProperty(le)||X===Z||X==null&&Z==null||Le(e,t,le,X,i,Z)}function wg(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function XS(){if(typeof performance.getEntriesByType=="function"){for(var e=0,t=0,r=performance.getEntriesByType("resource"),i=0;i<r.length;i++){var c=r[i],d=c.transferSize,y=c.initiatorType,j=c.duration;if(d&&j&&wg(y)){for(y=0,j=c.responseEnd,i+=1;i<r.length;i++){var k=r[i],F=k.startTime;if(F>j)break;var ee=k.transferSize,le=k.initiatorType;ee&&wg(le)&&(k=k.responseEnd,y+=ee*(k<j?1:(j-F)/(k-F)))}if(--i,t+=8*(d+y)/(c.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var Nu=null,Du=null;function pl(e){return e.nodeType===9?e:e.ownerDocument}function Eg(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function Tg(e,t){if(e===0)switch(t){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&t==="foreignObject"?0:e}function Au(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.children=="bigint"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Mu=null;function $S(){var e=window.event;return e&&e.type==="popstate"?e===Mu?!1:(Mu=e,!0):(Mu=null,!1)}var Cg=typeof setTimeout=="function"?setTimeout:void 0,KS=typeof clearTimeout=="function"?clearTimeout:void 0,Ng=typeof Promise=="function"?Promise:void 0,ZS=typeof queueMicrotask=="function"?queueMicrotask:typeof Ng<"u"?function(e){return Ng.resolve(null).then(e).catch(QS)}:Cg;function QS(e){setTimeout(function(){throw e})}function cr(e){return e==="head"}function Dg(e,t){var r=t,i=0;do{var c=r.nextSibling;if(e.removeChild(r),c&&c.nodeType===8)if(r=c.data,r==="/$"||r==="/&"){if(i===0){e.removeChild(c),ka(t);return}i--}else if(r==="$"||r==="$?"||r==="$~"||r==="$!"||r==="&")i++;else if(r==="html")zi(e.ownerDocument.documentElement);else if(r==="head"){r=e.ownerDocument.head,zi(r);for(var d=r.firstChild;d;){var y=d.nextSibling,j=d.nodeName;d[Wa]||j==="SCRIPT"||j==="STYLE"||j==="LINK"&&d.rel.toLowerCase()==="stylesheet"||r.removeChild(d),d=y}}else r==="body"&&zi(e.ownerDocument.body);r=c}while(r);ka(t)}function Ag(e,t){var r=e;e=0;do{var i=r.nextSibling;if(r.nodeType===1?t?(r._stashedDisplay=r.style.display,r.style.display="none"):(r.style.display=r._stashedDisplay||"",r.getAttribute("style")===""&&r.removeAttribute("style")):r.nodeType===3&&(t?(r._stashedText=r.nodeValue,r.nodeValue=""):r.nodeValue=r._stashedText||""),i&&i.nodeType===8)if(r=i.data,r==="/$"){if(e===0)break;e--}else r!=="$"&&r!=="$?"&&r!=="$~"&&r!=="$!"||e++;r=i}while(r)}function ku(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var r=t;switch(t=t.nextSibling,r.nodeName){case"HTML":case"HEAD":case"BODY":ku(r),Vo(r);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(r.rel.toLowerCase()==="stylesheet")continue}e.removeChild(r)}}function JS(e,t,r,i){for(;e.nodeType===1;){var c=r;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!i&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(i){if(!e[Wa])switch(t){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(d=e.getAttribute("rel"),d==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(d!==c.rel||e.getAttribute("href")!==(c.href==null||c.href===""?null:c.href)||e.getAttribute("crossorigin")!==(c.crossOrigin==null?null:c.crossOrigin)||e.getAttribute("title")!==(c.title==null?null:c.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(d=e.getAttribute("src"),(d!==(c.src==null?null:c.src)||e.getAttribute("type")!==(c.type==null?null:c.type)||e.getAttribute("crossorigin")!==(c.crossOrigin==null?null:c.crossOrigin))&&d&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(t==="input"&&e.type==="hidden"){var d=c.name==null?null:""+c.name;if(c.type==="hidden"&&e.getAttribute("name")===d)return e}else return e;if(e=Qt(e.nextSibling),e===null)break}return null}function WS(e,t,r){if(t==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!r||(e=Qt(e.nextSibling),e===null))return null;return e}function Mg(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!t||(e=Qt(e.nextSibling),e===null))return null;return e}function Ru(e){return e.data==="$?"||e.data==="$~"}function Ou(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function IS(e,t){var r=e.ownerDocument;if(e.data==="$~")e._reactRetry=t;else if(e.data!=="$?"||r.readyState!=="loading")t();else{var i=function(){t(),r.removeEventListener("DOMContentLoaded",i)};r.addEventListener("DOMContentLoaded",i),e._reactRetry=i}}function Qt(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?"||t==="$~"||t==="&"||t==="F!"||t==="F")break;if(t==="/$"||t==="/&")return null}}return e}var zu=null;function kg(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var r=e.data;if(r==="/$"||r==="/&"){if(t===0)return Qt(e.nextSibling);t--}else r!=="$"&&r!=="$!"&&r!=="$?"&&r!=="$~"&&r!=="&"||t++}e=e.nextSibling}return null}function Rg(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var r=e.data;if(r==="$"||r==="$!"||r==="$?"||r==="$~"||r==="&"){if(t===0)return e;t--}else r!=="/$"&&r!=="/&"||t++}e=e.previousSibling}return null}function Og(e,t,r){switch(t=pl(r),e){case"html":if(e=t.documentElement,!e)throw Error(l(452));return e;case"head":if(e=t.head,!e)throw Error(l(453));return e;case"body":if(e=t.body,!e)throw Error(l(454));return e;default:throw Error(l(451))}}function zi(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);Vo(e)}var Jt=new Map,zg=new Set;function gl(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var Hn=ne.d;ne.d={f:ej,r:tj,D:nj,C:rj,L:aj,m:ij,X:lj,S:sj,M:oj};function ej(){var e=Hn.f(),t=ll();return e||t}function tj(e){var t=Qr(e);t!==null&&t.tag===5&&t.type==="form"?Jm(t):Hn.r(e)}var Da=typeof document>"u"?null:document;function _g(e,t,r){var i=Da;if(i&&typeof t=="string"&&t){var c=Pt(t);c='link[rel="'+e+'"][href="'+c+'"]',typeof r=="string"&&(c+='[crossorigin="'+r+'"]'),zg.has(c)||(zg.add(c),e={rel:e,crossOrigin:r,href:t},i.querySelector(c)===null&&(t=i.createElement("link"),pt(t,"link",e),ot(t),i.head.appendChild(t)))}}function nj(e){Hn.D(e),_g("dns-prefetch",e,null)}function rj(e,t){Hn.C(e,t),_g("preconnect",e,t)}function aj(e,t,r){Hn.L(e,t,r);var i=Da;if(i&&e&&t){var c='link[rel="preload"][as="'+Pt(t)+'"]';t==="image"&&r&&r.imageSrcSet?(c+='[imagesrcset="'+Pt(r.imageSrcSet)+'"]',typeof r.imageSizes=="string"&&(c+='[imagesizes="'+Pt(r.imageSizes)+'"]')):c+='[href="'+Pt(e)+'"]';var d=c;switch(t){case"style":d=Aa(e);break;case"script":d=Ma(e)}Jt.has(d)||(e=x({rel:"preload",href:t==="image"&&r&&r.imageSrcSet?void 0:e,as:t},r),Jt.set(d,e),i.querySelector(c)!==null||t==="style"&&i.querySelector(_i(d))||t==="script"&&i.querySelector(Vi(d))||(t=i.createElement("link"),pt(t,"link",e),ot(t),i.head.appendChild(t)))}}function ij(e,t){Hn.m(e,t);var r=Da;if(r&&e){var i=t&&typeof t.as=="string"?t.as:"script",c='link[rel="modulepreload"][as="'+Pt(i)+'"][href="'+Pt(e)+'"]',d=c;switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":d=Ma(e)}if(!Jt.has(d)&&(e=x({rel:"modulepreload",href:e},t),Jt.set(d,e),r.querySelector(c)===null)){switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(r.querySelector(Vi(d)))return}i=r.createElement("link"),pt(i,"link",e),ot(i),r.head.appendChild(i)}}}function sj(e,t,r){Hn.S(e,t,r);var i=Da;if(i&&e){var c=Jr(i).hoistableStyles,d=Aa(e);t=t||"default";var y=c.get(d);if(!y){var j={loading:0,preload:null};if(y=i.querySelector(_i(d)))j.loading=5;else{e=x({rel:"stylesheet",href:e,"data-precedence":t},r),(r=Jt.get(d))&&_u(e,r);var k=y=i.createElement("link");ot(k),pt(k,"link",e),k._p=new Promise(function(F,ee){k.onload=F,k.onerror=ee}),k.addEventListener("load",function(){j.loading|=1}),k.addEventListener("error",function(){j.loading|=2}),j.loading|=4,yl(y,t,i)}y={type:"stylesheet",instance:y,count:1,state:j},c.set(d,y)}}}function lj(e,t){Hn.X(e,t);var r=Da;if(r&&e){var i=Jr(r).hoistableScripts,c=Ma(e),d=i.get(c);d||(d=r.querySelector(Vi(c)),d||(e=x({src:e,async:!0},t),(t=Jt.get(c))&&Vu(e,t),d=r.createElement("script"),ot(d),pt(d,"link",e),r.head.appendChild(d)),d={type:"script",instance:d,count:1,state:null},i.set(c,d))}}function oj(e,t){Hn.M(e,t);var r=Da;if(r&&e){var i=Jr(r).hoistableScripts,c=Ma(e),d=i.get(c);d||(d=r.querySelector(Vi(c)),d||(e=x({src:e,async:!0,type:"module"},t),(t=Jt.get(c))&&Vu(e,t),d=r.createElement("script"),ot(d),pt(d,"link",e),r.head.appendChild(d)),d={type:"script",instance:d,count:1,state:null},i.set(c,d))}}function Vg(e,t,r,i){var c=(c=fe.current)?gl(c):null;if(!c)throw Error(l(446));switch(e){case"meta":case"title":return null;case"style":return typeof r.precedence=="string"&&typeof r.href=="string"?(t=Aa(r.href),r=Jr(c).hoistableStyles,i=r.get(t),i||(i={type:"style",instance:null,count:0,state:null},r.set(t,i)),i):{type:"void",instance:null,count:0,state:null};case"link":if(r.rel==="stylesheet"&&typeof r.href=="string"&&typeof r.precedence=="string"){e=Aa(r.href);var d=Jr(c).hoistableStyles,y=d.get(e);if(y||(c=c.ownerDocument||c,y={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},d.set(e,y),(d=c.querySelector(_i(e)))&&!d._p&&(y.instance=d,y.state.loading=5),Jt.has(e)||(r={rel:"preload",as:"style",href:r.href,crossOrigin:r.crossOrigin,integrity:r.integrity,media:r.media,hrefLang:r.hrefLang,referrerPolicy:r.referrerPolicy},Jt.set(e,r),d||cj(c,e,r,y.state))),t&&i===null)throw Error(l(528,""));return y}if(t&&i!==null)throw Error(l(529,""));return null;case"script":return t=r.async,r=r.src,typeof r=="string"&&t&&typeof t!="function"&&typeof t!="symbol"?(t=Ma(r),r=Jr(c).hoistableScripts,i=r.get(t),i||(i={type:"script",instance:null,count:0,state:null},r.set(t,i)),i):{type:"void",instance:null,count:0,state:null};default:throw Error(l(444,e))}}function Aa(e){return'href="'+Pt(e)+'"'}function _i(e){return'link[rel="stylesheet"]['+e+"]"}function Bg(e){return x({},e,{"data-precedence":e.precedence,precedence:null})}function cj(e,t,r,i){e.querySelector('link[rel="preload"][as="style"]['+t+"]")?i.loading=1:(t=e.createElement("link"),i.preload=t,t.addEventListener("load",function(){return i.loading|=1}),t.addEventListener("error",function(){return i.loading|=2}),pt(t,"link",r),ot(t),e.head.appendChild(t))}function Ma(e){return'[src="'+Pt(e)+'"]'}function Vi(e){return"script[async]"+e}function Lg(e,t,r){if(t.count++,t.instance===null)switch(t.type){case"style":var i=e.querySelector('style[data-href~="'+Pt(r.href)+'"]');if(i)return t.instance=i,ot(i),i;var c=x({},r,{"data-href":r.href,"data-precedence":r.precedence,href:null,precedence:null});return i=(e.ownerDocument||e).createElement("style"),ot(i),pt(i,"style",c),yl(i,r.precedence,e),t.instance=i;case"stylesheet":c=Aa(r.href);var d=e.querySelector(_i(c));if(d)return t.state.loading|=4,t.instance=d,ot(d),d;i=Bg(r),(c=Jt.get(c))&&_u(i,c),d=(e.ownerDocument||e).createElement("link"),ot(d);var y=d;return y._p=new Promise(function(j,k){y.onload=j,y.onerror=k}),pt(d,"link",i),t.state.loading|=4,yl(d,r.precedence,e),t.instance=d;case"script":return d=Ma(r.src),(c=e.querySelector(Vi(d)))?(t.instance=c,ot(c),c):(i=r,(c=Jt.get(d))&&(i=x({},r),Vu(i,c)),e=e.ownerDocument||e,c=e.createElement("script"),ot(c),pt(c,"link",i),e.head.appendChild(c),t.instance=c);case"void":return null;default:throw Error(l(443,t.type))}else t.type==="stylesheet"&&(t.state.loading&4)===0&&(i=t.instance,t.state.loading|=4,yl(i,r.precedence,e));return t.instance}function yl(e,t,r){for(var i=r.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),c=i.length?i[i.length-1]:null,d=c,y=0;y<i.length;y++){var j=i[y];if(j.dataset.precedence===t)d=j;else if(d!==c)break}d?d.parentNode.insertBefore(e,d.nextSibling):(t=r.nodeType===9?r.head:r,t.insertBefore(e,t.firstChild))}function _u(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.title==null&&(e.title=t.title)}function Vu(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.integrity==null&&(e.integrity=t.integrity)}var vl=null;function Ug(e,t,r){if(vl===null){var i=new Map,c=vl=new Map;c.set(r,i)}else c=vl,i=c.get(r),i||(i=new Map,c.set(r,i));if(i.has(e))return i;for(i.set(e,null),r=r.getElementsByTagName(e),c=0;c<r.length;c++){var d=r[c];if(!(d[Wa]||d[dt]||e==="link"&&d.getAttribute("rel")==="stylesheet")&&d.namespaceURI!=="http://www.w3.org/2000/svg"){var y=d.getAttribute(t)||"";y=e+y;var j=i.get(y);j?j.push(d):i.set(y,[d])}}return i}function Hg(e,t,r){e=e.ownerDocument||e,e.head.insertBefore(r,t==="title"?e.querySelector("head > title"):null)}function uj(e,t,r){if(r===1||t.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof t.precedence!="string"||typeof t.href!="string"||t.href==="")break;return!0;case"link":if(typeof t.rel!="string"||typeof t.href!="string"||t.href===""||t.onLoad||t.onError)break;switch(t.rel){case"stylesheet":return e=t.disabled,typeof t.precedence=="string"&&e==null;default:return!0}case"script":if(t.async&&typeof t.async!="function"&&typeof t.async!="symbol"&&!t.onLoad&&!t.onError&&t.src&&typeof t.src=="string")return!0}return!1}function qg(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function dj(e,t,r,i){if(r.type==="stylesheet"&&(typeof i.media!="string"||matchMedia(i.media).matches!==!1)&&(r.state.loading&4)===0){if(r.instance===null){var c=Aa(i.href),d=t.querySelector(_i(c));if(d){t=d._p,t!==null&&typeof t=="object"&&typeof t.then=="function"&&(e.count++,e=xl.bind(e),t.then(e,e)),r.state.loading|=4,r.instance=d,ot(d);return}d=t.ownerDocument||t,i=Bg(i),(c=Jt.get(c))&&_u(i,c),d=d.createElement("link"),ot(d);var y=d;y._p=new Promise(function(j,k){y.onload=j,y.onerror=k}),pt(d,"link",i),r.instance=d}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(r,t),(t=r.state.preload)&&(r.state.loading&3)===0&&(e.count++,r=xl.bind(e),t.addEventListener("load",r),t.addEventListener("error",r))}}var Bu=0;function fj(e,t){return e.stylesheets&&e.count===0&&Sl(e,e.stylesheets),0<e.count||0<e.imgCount?function(r){var i=setTimeout(function(){if(e.stylesheets&&Sl(e,e.stylesheets),e.unsuspend){var d=e.unsuspend;e.unsuspend=null,d()}},6e4+t);0<e.imgBytes&&Bu===0&&(Bu=62500*XS());var c=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&Sl(e,e.stylesheets),e.unsuspend)){var d=e.unsuspend;e.unsuspend=null,d()}},(e.imgBytes>Bu?50:800)+t);return e.unsuspend=r,function(){e.unsuspend=null,clearTimeout(i),clearTimeout(c)}}:null}function xl(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Sl(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var bl=null;function Sl(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,bl=new Map,t.forEach(hj,e),bl=null,xl.call(e))}function hj(e,t){if(!(t.state.loading&4)){var r=bl.get(e);if(r)var i=r.get(null);else{r=new Map,bl.set(e,r);for(var c=e.querySelectorAll("link[data-precedence],style[data-precedence]"),d=0;d<c.length;d++){var y=c[d];(y.nodeName==="LINK"||y.getAttribute("media")!=="not all")&&(r.set(y.dataset.precedence,y),i=y)}i&&r.set(null,i)}c=t.instance,y=c.getAttribute("data-precedence"),d=r.get(y)||i,d===i&&r.set(null,c),r.set(y,c),this.count++,i=xl.bind(this),c.addEventListener("load",i),c.addEventListener("error",i),d?d.parentNode.insertBefore(c,d.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(c,e.firstChild)),t.state.loading|=4}}var Bi={$$typeof:_,Provider:null,Consumer:null,_currentValue:W,_currentValue2:W,_threadCount:0};function mj(e,t,r,i,c,d,y,j,k){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Ro(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Ro(0),this.hiddenUpdates=Ro(null),this.identifierPrefix=i,this.onUncaughtError=c,this.onCaughtError=d,this.onRecoverableError=y,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=k,this.incompleteTransitions=new Map}function Yg(e,t,r,i,c,d,y,j,k,F,ee,le){return e=new mj(e,t,r,y,k,F,ee,le,j),t=1,d===!0&&(t|=24),d=zt(3,null,null,t),e.current=d,d.stateNode=e,t=gc(),t.refCount++,e.pooledCache=t,t.refCount++,d.memoizedState={element:i,isDehydrated:r,cache:t},bc(d),e}function Pg(e){return e?(e=la,e):la}function Gg(e,t,r,i,c,d){c=Pg(c),i.context===null?i.context=c:i.pendingContext=c,i=Wn(t),i.payload={element:r},d=d===void 0?null:d,d!==null&&(i.callback=d),r=In(e,i,t),r!==null&&(At(r,e,t),pi(r,e,t))}function Fg(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var r=e.retryLane;e.retryLane=r!==0&&r<t?r:t}}function Lu(e,t){Fg(e,t),(e=e.alternate)&&Fg(e,t)}function Xg(e){if(e.tag===13||e.tag===31){var t=Nr(e,67108864);t!==null&&At(t,e,67108864),Lu(e,67108864)}}function $g(e){if(e.tag===13||e.tag===31){var t=Ut();t=Oo(t);var r=Nr(e,t);r!==null&&At(r,e,t),Lu(e,t)}}var jl=!0;function pj(e,t,r,i){var c=L.T;L.T=null;var d=ne.p;try{ne.p=2,Uu(e,t,r,i)}finally{ne.p=d,L.T=c}}function gj(e,t,r,i){var c=L.T;L.T=null;var d=ne.p;try{ne.p=8,Uu(e,t,r,i)}finally{ne.p=d,L.T=c}}function Uu(e,t,r,i){if(jl){var c=Hu(i);if(c===null)Tu(e,t,i,wl,r),Zg(e,i);else if(vj(c,e,t,r,i))i.stopPropagation();else if(Zg(e,i),t&4&&-1<yj.indexOf(e)){for(;c!==null;){var d=Qr(c);if(d!==null)switch(d.tag){case 3:if(d=d.stateNode,d.current.memoizedState.isDehydrated){var y=jr(d.pendingLanes);if(y!==0){var j=d;for(j.pendingLanes|=2,j.entangledLanes|=2;y;){var k=1<<31-Rt(y);j.entanglements[1]|=k,y&=~k}mn(d),(ze&6)===0&&(il=Mt()+500,ki(0))}}break;case 31:case 13:j=Nr(d,2),j!==null&&At(j,d,2),ll(),Lu(d,2)}if(d=Hu(i),d===null&&Tu(e,t,i,wl,r),d===c)break;c=d}c!==null&&i.stopPropagation()}else Tu(e,t,i,null,r)}}function Hu(e){return e=Yo(e),qu(e)}var wl=null;function qu(e){if(wl=null,e=Zr(e),e!==null){var t=h(e);if(t===null)e=null;else{var r=t.tag;if(r===13){if(e=f(t),e!==null)return e;e=null}else if(r===31){if(e=m(t),e!==null)return e;e=null}else if(r===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return wl=e,null}function Kg(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(n1()){case nh:return 2;case rh:return 8;case fs:case r1:return 32;case ah:return 268435456;default:return 32}default:return 32}}var Yu=!1,ur=null,dr=null,fr=null,Li=new Map,Ui=new Map,hr=[],yj="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function Zg(e,t){switch(e){case"focusin":case"focusout":ur=null;break;case"dragenter":case"dragleave":dr=null;break;case"mouseover":case"mouseout":fr=null;break;case"pointerover":case"pointerout":Li.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Ui.delete(t.pointerId)}}function Hi(e,t,r,i,c,d){return e===null||e.nativeEvent!==d?(e={blockedOn:t,domEventName:r,eventSystemFlags:i,nativeEvent:d,targetContainers:[c]},t!==null&&(t=Qr(t),t!==null&&Xg(t)),e):(e.eventSystemFlags|=i,t=e.targetContainers,c!==null&&t.indexOf(c)===-1&&t.push(c),e)}function vj(e,t,r,i,c){switch(t){case"focusin":return ur=Hi(ur,e,t,r,i,c),!0;case"dragenter":return dr=Hi(dr,e,t,r,i,c),!0;case"mouseover":return fr=Hi(fr,e,t,r,i,c),!0;case"pointerover":var d=c.pointerId;return Li.set(d,Hi(Li.get(d)||null,e,t,r,i,c)),!0;case"gotpointercapture":return d=c.pointerId,Ui.set(d,Hi(Ui.get(d)||null,e,t,r,i,c)),!0}return!1}function Qg(e){var t=Zr(e.target);if(t!==null){var r=h(t);if(r!==null){if(t=r.tag,t===13){if(t=f(r),t!==null){e.blockedOn=t,uh(e.priority,function(){$g(r)});return}}else if(t===31){if(t=m(r),t!==null){e.blockedOn=t,uh(e.priority,function(){$g(r)});return}}else if(t===3&&r.stateNode.current.memoizedState.isDehydrated){e.blockedOn=r.tag===3?r.stateNode.containerInfo:null;return}}}e.blockedOn=null}function El(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var r=Hu(e.nativeEvent);if(r===null){r=e.nativeEvent;var i=new r.constructor(r.type,r);qo=i,r.target.dispatchEvent(i),qo=null}else return t=Qr(r),t!==null&&Xg(t),e.blockedOn=r,!1;t.shift()}return!0}function Jg(e,t,r){El(e)&&r.delete(t)}function xj(){Yu=!1,ur!==null&&El(ur)&&(ur=null),dr!==null&&El(dr)&&(dr=null),fr!==null&&El(fr)&&(fr=null),Li.forEach(Jg),Ui.forEach(Jg)}function Tl(e,t){e.blockedOn===t&&(e.blockedOn=null,Yu||(Yu=!0,n.unstable_scheduleCallback(n.unstable_NormalPriority,xj)))}var Cl=null;function Wg(e){Cl!==e&&(Cl=e,n.unstable_scheduleCallback(n.unstable_NormalPriority,function(){Cl===e&&(Cl=null);for(var t=0;t<e.length;t+=3){var r=e[t],i=e[t+1],c=e[t+2];if(typeof i!="function"){if(qu(i||r)===null)continue;break}var d=Qr(r);d!==null&&(e.splice(t,3),t-=3,Hc(d,{pending:!0,data:c,method:r.method,action:i},i,c))}}))}function ka(e){function t(k){return Tl(k,e)}ur!==null&&Tl(ur,e),dr!==null&&Tl(dr,e),fr!==null&&Tl(fr,e),Li.forEach(t),Ui.forEach(t);for(var r=0;r<hr.length;r++){var i=hr[r];i.blockedOn===e&&(i.blockedOn=null)}for(;0<hr.length&&(r=hr[0],r.blockedOn===null);)Qg(r),r.blockedOn===null&&hr.shift();if(r=(e.ownerDocument||e).$$reactFormReplay,r!=null)for(i=0;i<r.length;i+=3){var c=r[i],d=r[i+1],y=c[wt]||null;if(typeof d=="function")y||Wg(r);else if(y){var j=null;if(d&&d.hasAttribute("formAction")){if(c=d,y=d[wt]||null)j=y.formAction;else if(qu(c)!==null)continue}else j=y.action;typeof j=="function"?r[i+1]=j:(r.splice(i,3),i-=3),Wg(r)}}}function Ig(){function e(d){d.canIntercept&&d.info==="react-transition"&&d.intercept({handler:function(){return new Promise(function(y){return c=y})},focusReset:"manual",scroll:"manual"})}function t(){c!==null&&(c(),c=null),i||setTimeout(r,20)}function r(){if(!i&&!navigation.transition){var d=navigation.currentEntry;d&&d.url!=null&&navigation.navigate(d.url,{state:d.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var i=!1,c=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",t),navigation.addEventListener("navigateerror",t),setTimeout(r,100),function(){i=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",t),navigation.removeEventListener("navigateerror",t),c!==null&&(c(),c=null)}}}function Pu(e){this._internalRoot=e}Nl.prototype.render=Pu.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(l(409));var r=t.current,i=Ut();Gg(r,i,e,t,null,null)},Nl.prototype.unmount=Pu.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Gg(e.current,2,null,e,null,null),ll(),t[Kr]=null}};function Nl(e){this._internalRoot=e}Nl.prototype.unstable_scheduleHydration=function(e){if(e){var t=ch();e={blockedOn:null,target:e,priority:t};for(var r=0;r<hr.length&&t!==0&&t<hr[r].priority;r++);hr.splice(r,0,e),r===0&&Qg(e)}};var ey=a.version;if(ey!=="19.2.8")throw Error(l(527,ey,"19.2.8"));ne.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(l(188)):(e=Object.keys(e).join(","),Error(l(268,e)));return e=g(t),e=e!==null?v(e):null,e=e===null?null:e.stateNode,e};var bj={bundleType:0,version:"19.2.8",rendererPackageName:"react-dom",currentDispatcherRef:L,reconcilerVersion:"19.2.8"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Dl=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Dl.isDisabled&&Dl.supportsFiber)try{Za=Dl.inject(bj),kt=Dl}catch{}}return Yi.createRoot=function(e,t){if(!u(e))throw Error(l(299));var r=!1,i="",c=lp,d=op,y=cp;return t!=null&&(t.unstable_strictMode===!0&&(r=!0),t.identifierPrefix!==void 0&&(i=t.identifierPrefix),t.onUncaughtError!==void 0&&(c=t.onUncaughtError),t.onCaughtError!==void 0&&(d=t.onCaughtError),t.onRecoverableError!==void 0&&(y=t.onRecoverableError)),t=Yg(e,1,!1,null,null,r,i,null,c,d,y,Ig),e[Kr]=t.current,Eu(e),new Pu(t)},Yi.hydrateRoot=function(e,t,r){if(!u(e))throw Error(l(299));var i=!1,c="",d=lp,y=op,j=cp,k=null;return r!=null&&(r.unstable_strictMode===!0&&(i=!0),r.identifierPrefix!==void 0&&(c=r.identifierPrefix),r.onUncaughtError!==void 0&&(d=r.onUncaughtError),r.onCaughtError!==void 0&&(y=r.onCaughtError),r.onRecoverableError!==void 0&&(j=r.onRecoverableError),r.formState!==void 0&&(k=r.formState)),t=Yg(e,1,!0,t,r??null,i,c,k,d,y,j,Ig),t.context=Pg(null),r=t.current,i=Ut(),i=Oo(i),c=Wn(i),c.callback=null,In(r,c,i),r=i,t.current.lanes=r,Ja(t,r),mn(t),e[Kr]=t.current,Eu(e),new Nl(t)},Yi.version="19.2.8",Yi}var uy;function Mj(){if(uy)return Xu.exports;uy=1;function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(a){console.error(a)}}return n(),Xu.exports=Aj(),Xu.exports}var df=Mj();const kj=ox(df),ff=S.createContext({});function hf(n){const a=S.useRef(null);return a.current===null&&(a.current=n()),a.current}const Rj=typeof window<"u",mf=Rj?S.useLayoutEffect:S.useEffect,So=S.createContext(null);function pf(n,a){n.indexOf(a)===-1&&n.push(a)}function Il(n,a){const s=n.indexOf(a);s>-1&&n.splice(s,1)}const bn=(n,a,s)=>s>a?a:s<n?n:s;let jo=()=>{};const vr={},dx=n=>/^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(n),fx=n=>typeof n=="object"&&n!==null,hx=n=>/^0[^.\s]+$/u.test(n);function mx(n){let a;return()=>(a===void 0&&(a=n()),a)}const en=n=>n,ss=(...n)=>n.reduce((a,s)=>l=>s(a(l))),Wi=(n,a,s)=>{const l=a-n;return l?(s-n)/l:1};class gf{constructor(){this.subscriptions=[]}add(a){return pf(this.subscriptions,a),()=>Il(this.subscriptions,a)}notify(a,s,l){const u=this.subscriptions.length;if(u)if(u===1)this.subscriptions[0](a,s,l);else for(let h=0;h<u;h++){const f=this.subscriptions[h];f&&f(a,s,l)}}getSize(){return this.subscriptions.length}clear(){this.subscriptions.length=0}}const qt=n=>n*1e3,It=n=>n/1e3,px=(n,a)=>a?n*(1e3/a):0,gx=(n,a,s)=>(((1-3*s+3*a)*n+(3*s-6*a))*n+3*a)*n,Oj=1e-7,zj=12;function _j(n,a,s,l,u){let h,f,m=0;do f=a+(s-a)/2,h=gx(f,l,u)-n,h>0?s=f:a=f;while(Math.abs(h)>Oj&&++m<zj);return f}function ls(n,a,s,l){if(n===a&&s===l)return en;const u=h=>_j(h,0,1,n,s);return h=>h===0||h===1?h:gx(u(h),a,l)}const yx=n=>a=>a<=.5?n(2*a)/2:(2-n(2*(1-a)))/2,vx=n=>a=>1-n(1-a),xx=ls(.33,1.53,.69,.99),yf=vx(xx),bx=yx(yf),Sx=n=>n>=1?1:(n*=2)<1?.5*yf(n):.5*(2-Math.pow(2,-10*(n-1))),vf=n=>1-Math.sin(Math.acos(n)),jx=vx(vf),wx=yx(vf),Vj=ls(.42,0,1,1),Bj=ls(0,0,.58,1),Ex=ls(.42,0,.58,1),Lj=n=>Array.isArray(n)&&typeof n[0]!="number",Tx=n=>Array.isArray(n)&&typeof n[0]=="number",Uj={linear:en,easeIn:Vj,easeInOut:Ex,easeOut:Bj,circIn:vf,circInOut:wx,circOut:jx,backIn:yf,backInOut:bx,backOut:xx,anticipate:Sx},Hj=n=>typeof n=="string",dy=n=>{if(Tx(n)){jo(n.length===4);const[a,s,l,u]=n;return ls(a,s,l,u)}else if(Hj(n))return Uj[n];return n},Al=["setup","read","resolveKeyframes","preUpdate","update","preRender","render","postRender"];function qj(n){let a=new Set,s=new Set,l=!1,u=!1;const h=new WeakSet;let f={delta:0,timestamp:0,isProcessing:!1};function m(g){h.has(g)&&(p.schedule(g),n()),g(f)}const p={schedule:(g,v=!1,x=!1)=>{const E=x&&l?a:s;return v&&h.add(g),E.add(g),g},cancel:g=>{s.delete(g),h.delete(g)},process:g=>{if(f=g,l){u=!0;return}l=!0;const v=a;a=s,s=v,a.forEach(m),a.clear(),l=!1,u&&(u=!1,p.process(g))}};return p}const Yj=40;function Cx(n,a){let s=!1,l=!0;const u={delta:0,timestamp:0,isProcessing:!1},h=()=>s=!0,f=Al.reduce((_,O)=>(_[O]=qj(h),_),{}),{setup:m,read:p,resolveKeyframes:g,preUpdate:v,update:x,preRender:b,render:E,postRender:w}=f,N=()=>{const _=vr.useManualTiming,O=_?u.timestamp:performance.now();s=!1,_||(u.delta=l?1e3/60:Math.max(Math.min(O-u.timestamp,Yj),1)),u.timestamp=O,u.isProcessing=!0,m.process(u),p.process(u),g.process(u),v.process(u),x.process(u),b.process(u),E.process(u),w.process(u),u.isProcessing=!1,s&&a&&(l=!1,n(N))},T=()=>{s=!0,l=!0,u.isProcessing||n(N)};return{schedule:Al.reduce((_,O)=>{const U=f[O];return _[O]=(H,M=!1,R=!1)=>(s||T(),U.schedule(H,M,R)),_},{}),cancel:_=>{for(let O=0;O<Al.length;O++)f[Al[O]].cancel(_)},state:u,steps:f}}const{schedule:Ye,cancel:xr,state:gt,steps:Qu}=Cx(typeof requestAnimationFrame<"u"?requestAnimationFrame:en,!0);let Yl;function Pj(){Yl=void 0}const bt={now:()=>(Yl===void 0&&bt.set(gt.isProcessing||vr.useManualTiming?gt.timestamp:performance.now()),Yl),set:n=>{Yl=n,queueMicrotask(Pj)}},Nx=n=>a=>typeof a=="string"&&a.startsWith(n),Dx=Nx("--"),Gj=Nx("var(--"),xf=n=>Gj(n)?Fj.test(n.split("/*")[0].trim()):!1,Fj=/var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;function fy(n){return typeof n!="string"?!1:n.split("/*")[0].includes("var(--")}const Ga={test:n=>typeof n=="number",parse:parseFloat,transform:n=>n},Ii={...Ga,transform:n=>bn(0,1,n)},Ml={...Ga,default:1},$i=n=>Math.round(n*1e5)/1e5,bf=/-?(?:\d+(?:\.\d+)?|\.\d+)/gu;function Xj(n){return n==null}const $j=/^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu,Sf=(n,a)=>s=>!!(typeof s=="string"&&$j.test(s)&&s.startsWith(n)||a&&!Xj(s)&&Object.prototype.hasOwnProperty.call(s,a)),Ax=(n,a,s)=>l=>{if(typeof l!="string")return l;const[u,h,f,m]=l.match(bf);return{[n]:parseFloat(u),[a]:parseFloat(h),[s]:parseFloat(f),alpha:m!==void 0?parseFloat(m):1}},Kj=n=>bn(0,255,n),Ju={...Ga,transform:n=>Math.round(Kj(n))},Yr={test:Sf("rgb","red"),parse:Ax("red","green","blue"),transform:({red:n,green:a,blue:s,alpha:l=1})=>"rgba("+Ju.transform(n)+", "+Ju.transform(a)+", "+Ju.transform(s)+", "+$i(Ii.transform(l))+")"};function Zj(n){let a="",s="",l="",u="";return n.length>5?(a=n.substring(1,3),s=n.substring(3,5),l=n.substring(5,7),u=n.substring(7,9)):(a=n.substring(1,2),s=n.substring(2,3),l=n.substring(3,4),u=n.substring(4,5),a+=a,s+=s,l+=l,u+=u),{red:parseInt(a,16),green:parseInt(s,16),blue:parseInt(l,16),alpha:u?parseInt(u,16)/255:1}}const Ed={test:Sf("#"),parse:Zj,transform:Yr.transform},os=n=>({test:a=>typeof a=="string"&&a.endsWith(n)&&a.split(" ").length===1,parse:parseFloat,transform:a=>`${a}${n}`}),qn=os("deg"),xn=os("%"),ve=os("px"),Qj=os("vh"),Jj=os("vw"),hy={...xn,parse:n=>xn.parse(n)/100,transform:n=>xn.transform(n*100)},Ba={test:Sf("hsl","hue"),parse:Ax("hue","saturation","lightness"),transform:({hue:n,saturation:a,lightness:s,alpha:l=1})=>"hsla("+Math.round(n)+", "+xn.transform($i(a))+", "+xn.transform($i(s))+", "+$i(Ii.transform(l))+")"},at={test:n=>Yr.test(n)||Ed.test(n)||Ba.test(n),parse:n=>Yr.test(n)?Yr.parse(n):Ba.test(n)?Ba.parse(n):Ed.parse(n),transform:n=>typeof n=="string"?n:n.hasOwnProperty("red")?Yr.transform(n):Ba.transform(n),getAnimatableNone:n=>{const a=at.parse(n);return a.alpha=0,at.transform(a)}},Wj=/(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;function Ij(n){var a,s;return isNaN(n)&&typeof n=="string"&&(((a=n.match(bf))==null?void 0:a.length)||0)+(((s=n.match(Wj))==null?void 0:s.length)||0)>0}const Mx="number",kx="color",ew="var",tw="var(",my="${}",nw=/var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;function qa(n){const a=n.toString(),s=[],l={color:[],number:[],var:[]},u=[];let h=0;const m=a.replace(nw,p=>(at.test(p)?(l.color.push(h),u.push(kx),s.push(at.parse(p))):p.startsWith(tw)?(l.var.push(h),u.push(ew),s.push(p)):(l.number.push(h),u.push(Mx),s.push(parseFloat(p))),++h,my)).split(my);return{values:s,split:m,indexes:l,types:u}}function rw(n){return qa(n).values}function Rx({split:n,types:a}){const s=n.length;return l=>{let u="";for(let h=0;h<s;h++)if(u+=n[h],l[h]!==void 0){const f=a[h];f===Mx?u+=$i(l[h]):f===kx?u+=at.transform(l[h]):u+=l[h]}return u}}function aw(n){return Rx(qa(n))}const iw=n=>typeof n=="number"?0:at.test(n)?at.getAnimatableNone(n):n,sw=(n,a)=>typeof n=="number"?a!=null&&a.trim().endsWith("/")?n:0:iw(n);function lw(n){const a=qa(n);return Rx(a)(a.values.map((l,u)=>sw(l,a.split[u])))}const cn={test:Ij,parse:rw,createTransformer:aw,getAnimatableNone:lw};function Wu(n,a,s){return s<0&&(s+=1),s>1&&(s-=1),s<1/6?n+(a-n)*6*s:s<1/2?a:s<2/3?n+(a-n)*(2/3-s)*6:n}function ow({hue:n,saturation:a,lightness:s,alpha:l}){n/=360,a/=100,s/=100;let u=0,h=0,f=0;if(!a)u=h=f=s;else{const m=s<.5?s*(1+a):s+a-s*a,p=2*s-m;u=Wu(p,m,n+1/3),h=Wu(p,m,n),f=Wu(p,m,n-1/3)}return{red:Math.round(u*255),green:Math.round(h*255),blue:Math.round(f*255),alpha:l}}function eo(n,a){return s=>s>0?a:n}const qe=(n,a,s)=>n+(a-n)*s,Iu=(n,a,s)=>{const l=n*n,u=s*(a*a-l)+l;return u<0?0:Math.sqrt(u)},cw=[Ed,Yr,Ba],uw=n=>cw.find(a=>a.test(n));function py(n){const a=uw(n);if(!a)return!1;let s=a.parse(n);return a===Ba&&(s=ow(s)),s}const gy=(n,a)=>{const s=py(n),l=py(a);if(!s||!l)return eo(n,a);const u={...s};return h=>(u.red=Iu(s.red,l.red,h),u.green=Iu(s.green,l.green,h),u.blue=Iu(s.blue,l.blue,h),u.alpha=qe(s.alpha,l.alpha,h),Yr.transform(u))},Td=new Set(["none","hidden"]);function dw(n,a){return Td.has(n)?s=>s<=0?n:a:s=>s>=1?a:n}function fw(n,a){return s=>qe(n,a,s)}function jf(n){return typeof n=="number"?fw:typeof n=="string"?xf(n)?eo:at.test(n)?gy:pw:Array.isArray(n)?Ox:typeof n=="object"?at.test(n)?gy:hw:eo}function Ox(n,a){const s=[...n],l=s.length,u=n.map((h,f)=>jf(h)(h,a[f]));return h=>{for(let f=0;f<l;f++)s[f]=u[f](h);return s}}function hw(n,a){const s={...n,...a},l={};for(const u in s)n[u]!==void 0&&a[u]!==void 0&&(l[u]=jf(n[u])(n[u],a[u]));return u=>{for(const h in l)s[h]=l[h](u);return s}}function mw(n,a){const s=[],l={color:0,var:0,number:0};for(let u=0;u<a.values.length;u++){const h=a.types[u],f=n.indexes[h][l[h]],m=n.values[f]??0;s[u]=m,l[h]++}return s}const pw=(n,a)=>{const s=cn.createTransformer(a),l=qa(n),u=qa(a);return l.indexes.var.length===u.indexes.var.length&&l.indexes.color.length===u.indexes.color.length&&l.indexes.number.length>=u.indexes.number.length?Td.has(n)&&!u.values.length||Td.has(a)&&!l.values.length?dw(n,a):ss(Ox(mw(l,u),u.values),s):eo(n,a)};function zx(n,a,s){return typeof n=="number"&&typeof a=="number"&&typeof s=="number"?qe(n,a,s):jf(n)(n,a)}const gw=n=>{const a=({timestamp:s})=>n(s);return{start:(s=!0)=>Ye.update(a,s),stop:()=>xr(a),now:()=>gt.isProcessing?gt.timestamp:bt.now()}},_x=(n,a,s=10)=>{let l="";const u=Math.max(Math.round(a/s),2);for(let h=0;h<u;h++)l+=Math.round(n(h/(u-1))*1e4)/1e4+", ";return`linear(${l.substring(0,l.length-2)})`},to=2e4;function wf(n){let a=0;const s=50;let l=n.next(a);for(;!l.done&&a<to;)a+=s,l=n.next(a);return a>=to?1/0:a}function yw(n,a=100,s){const l=s({...n,keyframes:[0,a]}),u=Math.min(wf(l),to);return{type:"keyframes",ease:h=>l.next(u*h).value/a,duration:It(u)}}const Qe={stiffness:100,damping:10,mass:1,velocity:0,duration:800,bounce:.3,visualDuration:.3,restSpeed:{granular:.01,default:2},restDelta:{granular:.005,default:.5},minDuration:.01,maxDuration:10,minDamping:.05,maxDamping:1};function Cd(n,a){return n*Math.sqrt(1-a*a)}const vw=12;function xw(n,a,s){let l=s;for(let u=1;u<vw;u++)l=l-n(l)/a(l);return l}const ed=.001;function bw({duration:n=Qe.duration,bounce:a=Qe.bounce,velocity:s=Qe.velocity,mass:l=Qe.mass}){let u,h,f=1-a;f=bn(Qe.minDamping,Qe.maxDamping,f),n=bn(Qe.minDuration,Qe.maxDuration,It(n)),f<1?(u=g=>{const v=g*f,x=v*n,b=v-s,E=Cd(g,f),w=Math.exp(-x);return ed-b/E*w},h=g=>{const x=g*f*n,b=x*s+s,E=Math.pow(f,2)*Math.pow(g,2)*n,w=Math.exp(-x),N=Cd(Math.pow(g,2),f);return(-u(g)+ed>0?-1:1)*((b-E)*w)/N}):(u=g=>{const v=Math.exp(-g*n),x=(g-s)*n+1;return-ed+v*x},h=g=>{const v=Math.exp(-g*n),x=(s-g)*(n*n);return v*x});const m=5/n,p=xw(u,h,m);if(n=qt(n),isNaN(p))return{stiffness:Qe.stiffness,damping:Qe.damping,duration:n};{const g=Math.pow(p,2)*l;return{stiffness:g,damping:f*2*Math.sqrt(l*g),duration:n}}}const Sw=["duration","bounce"],jw=["stiffness","damping","mass"];function yy(n,a){return a.some(s=>n[s]!==void 0)}function ww(n){let a={velocity:Qe.velocity,stiffness:Qe.stiffness,damping:Qe.damping,mass:Qe.mass,isResolvedFromDuration:!1,...n};if(!yy(n,jw)&&yy(n,Sw))if(a.velocity=0,n.visualDuration){const s=n.visualDuration,l=2*Math.PI/(s*1.2),u=l*l,h=2*bn(.05,1,1-(n.bounce||0))*Math.sqrt(u);a={...a,mass:Qe.mass,stiffness:u,damping:h}}else{const s=bw({...n,velocity:0});a={...a,...s,mass:Qe.mass},a.isResolvedFromDuration=!0}return a}function no(n=Qe.visualDuration,a=Qe.bounce){const s=typeof n!="object"?{visualDuration:n,keyframes:[0,1],bounce:a}:n;let{restSpeed:l,restDelta:u}=s;const h=s.keyframes[0],f=s.keyframes[s.keyframes.length-1],m={done:!1,value:h},{stiffness:p,damping:g,mass:v,duration:x,velocity:b,isResolvedFromDuration:E}=ww({...s,velocity:-It(s.velocity||0)}),w=b||0,N=g/(2*Math.sqrt(p*v)),T=f-h,A=It(Math.sqrt(p/v)),D=Math.abs(T)<5;l||(l=D?Qe.restSpeed.granular:Qe.restSpeed.default),u||(u=D?Qe.restDelta.granular:Qe.restDelta.default);let _,O,U,H,M,R;if(N<1)U=Cd(A,N),H=(w+N*A*T)/U,_=K=>{const Q=Math.exp(-N*A*K);return f-Q*(H*Math.sin(U*K)+T*Math.cos(U*K))},M=N*A*H+T*U,R=N*A*T-H*U,O=K=>Math.exp(-N*A*K)*(M*Math.sin(U*K)+R*Math.cos(U*K));else if(N===1){_=Q=>f-Math.exp(-A*Q)*(T+(w+A*T)*Q);const K=w+A*T;O=Q=>Math.exp(-A*Q)*(A*K*Q-w)}else{const K=A*Math.sqrt(N*N-1);_=G=>{const de=Math.exp(-N*A*G),L=Math.min(K*G,300);return f-de*((w+N*A*T)*Math.sinh(L)+K*T*Math.cosh(L))/K};const Q=(w+N*A*T)/K,ie=N*A*Q-T*K,J=N*A*T-Q*K;O=G=>{const de=Math.exp(-N*A*G),L=Math.min(K*G,300);return de*(ie*Math.sinh(L)+J*Math.cosh(L))}}const V={calculatedDuration:E&&x||null,velocity:K=>qt(O(K)),next:K=>{if(!E&&N<1){const ie=Math.exp(-N*A*K),J=Math.sin(U*K),G=Math.cos(U*K),de=f-ie*(H*J+T*G),L=qt(ie*(M*J+R*G));return m.done=Math.abs(L)<=l&&Math.abs(f-de)<=u,m.value=m.done?f:de,m}const Q=_(K);if(E)m.done=K>=x;else{const ie=qt(O(K));m.done=Math.abs(ie)<=l&&Math.abs(f-Q)<=u}return m.value=m.done?f:Q,m},toString:()=>{const K=Math.min(wf(V),to),Q=_x(ie=>V.next(K*ie).value,K,30);return K+"ms "+Q},toTransition:()=>{}};return V}no.applyToOptions=n=>{const a=yw(n,100,no);return n.ease=a.ease,n.duration=qt(a.duration),n.type="keyframes",n};const Ew=5;function Vx(n,a,s){const l=Math.max(a-Ew,0);return px(s-n(l),a-l)}function Nd({keyframes:n,velocity:a=0,power:s=.8,timeConstant:l=325,bounceDamping:u=10,bounceStiffness:h=500,modifyTarget:f,min:m,max:p,restDelta:g=.5,restSpeed:v}){const x=n[0],b={done:!1,value:x},E=R=>m!==void 0&&R<m||p!==void 0&&R>p,w=R=>m===void 0?p:p===void 0||Math.abs(m-R)<Math.abs(p-R)?m:p;let N=s*a;const T=x+N,A=f===void 0?T:f(T);A!==T&&(N=A-x);const D=R=>-N*Math.exp(-R/l),_=R=>A+D(R),O=R=>{const V=D(R),K=_(R);b.done=Math.abs(V)<=g,b.value=b.done?A:K};let U,H;const M=R=>{E(b.value)&&(U=R,H=no({keyframes:[b.value,w(b.value)],velocity:Vx(_,R,b.value),damping:u,stiffness:h,restDelta:g,restSpeed:v}))};return M(0),{calculatedDuration:null,next:R=>{let V=!1;return!H&&U===void 0&&(V=!0,O(R),M(R)),U!==void 0&&R>=U?H.next(R-U):(!V&&O(R),b)}}}function Tw(n,a,s){const l=[],u=s||vr.mix||zx,h=n.length-1;for(let f=0;f<h;f++){let m=u(n[f],n[f+1]);if(a){const p=Array.isArray(a)?a[f]||en:a;m=ss(p,m)}l.push(m)}return l}function Cw(n,a,{clamp:s=!0,ease:l,mixer:u}={}){const h=n.length;if(jo(h===a.length),h===1)return()=>a[0];if(h===2&&a[0]===a[1])return()=>a[1];const f=n[0]===n[1];n[0]>n[h-1]&&(n=[...n].reverse(),a=[...a].reverse());const m=Tw(a,l,u),p=m.length,g=v=>{if(f&&v<n[0])return a[0];let x=0;if(p>1)for(;x<n.length-2&&!(v<n[x+1]);x++);const b=Wi(n[x],n[x+1],v);return m[x](b)};return s?v=>g(bn(n[0],n[h-1],v)):g}function Nw(n,a){const s=n[n.length-1];for(let l=1;l<=a;l++){const u=Wi(0,a,l);n.push(qe(s,1,u))}}function Dw(n){const a=[0];return Nw(a,n.length-1),a}function Aw(n,a){return n.map(s=>s*a)}function Mw(n,a){return n.map(()=>a||Ex).splice(0,n.length-1)}function Ki({duration:n=300,keyframes:a,times:s,ease:l="easeInOut"}){const u=Lj(l)?l.map(dy):dy(l),h={done:!1,value:a[0]},f=Aw(s&&s.length===a.length?s:Dw(a),n),m=Cw(f,a,{ease:Array.isArray(u)?u:Mw(a,u)});return{calculatedDuration:n,next:p=>(h.value=m(p),h.done=p>=n,h)}}const kw=n=>n!==null;function wo(n,{repeat:a,repeatType:s="loop"},l,u=1){const h=n.filter(kw),m=u<0||a&&s!=="loop"&&a%2===1?0:h.length-1;return!m||l===void 0?h[m]:l}const Rw={decay:Nd,inertia:Nd,tween:Ki,keyframes:Ki,spring:no};function Bx(n){typeof n.type=="string"&&(n.type=Rw[n.type])}class Ef{constructor(){this.updateFinished()}get finished(){return this._finished}updateFinished(){this._finished=new Promise(a=>{this.resolve=a})}notifyFinished(){this.resolve()}then(a,s){return this.finished.then(a,s)}}const Ow=n=>n/100;class ro extends Ef{constructor(a){super(),this.state="idle",this.startTime=null,this.isStopped=!1,this.currentTime=0,this.holdTime=null,this.playbackSpeed=1,this.delayState={done:!1,value:void 0},this.stop=()=>{var l,u;const{motionValue:s}=this.options;s&&s.updatedAt!==bt.now()&&this.tick(bt.now()),this.isStopped=!0,this.state!=="idle"&&(this.teardown(),(u=(l=this.options).onStop)==null||u.call(l))},this.options=a,this.initAnimation(),this.play(),a.autoplay===!1&&this.pause()}initAnimation(){const{options:a}=this;Bx(a);const{type:s=Ki,repeat:l=0,repeatDelay:u=0,repeatType:h,velocity:f=0}=a;let{keyframes:m}=a;const p=s||Ki;p!==Ki&&typeof m[0]!="number"&&(this.mixKeyframes=ss(Ow,zx(m[0],m[1])),m=[0,100]);const g=p({...a,keyframes:m});h==="mirror"&&(this.mirroredGenerator=p({...a,keyframes:[...m].reverse(),velocity:-f})),g.calculatedDuration===null&&(g.calculatedDuration=wf(g));const{calculatedDuration:v}=g;this.calculatedDuration=v,this.resolvedDuration=v+u,this.totalDuration=this.resolvedDuration*(l+1)-u,this.generator=g}updateTime(a){const s=Math.round(a-this.startTime)*this.playbackSpeed;this.holdTime!==null?this.currentTime=this.holdTime:this.currentTime=s}tick(a,s=!1){const{generator:l,totalDuration:u,mixKeyframes:h,mirroredGenerator:f,resolvedDuration:m,calculatedDuration:p}=this;if(this.startTime===null)return l.next(0);const{delay:g=0,keyframes:v,repeat:x,repeatType:b,repeatDelay:E,type:w,onUpdate:N,finalKeyframe:T}=this.options;this.speed>0?this.startTime=Math.min(this.startTime,a):this.speed<0&&(this.startTime=Math.min(a-u/this.speed,this.startTime)),s?this.currentTime=a:this.updateTime(a);const A=this.currentTime-g*(this.playbackSpeed>=0?1:-1),D=this.playbackSpeed>=0?A<0:A>u;this.currentTime=Math.max(A,0),this.state==="finished"&&this.holdTime===null&&(this.currentTime=u);let _=this.currentTime,O=l;if(x){const R=Math.min(this.currentTime,u)/m;let V=Math.floor(R),K=R%1;!K&&R>=1&&(K=1),K===1&&V--,V=Math.min(V,x+1),!!(V%2)&&(b==="reverse"?(K=1-K,E&&(K-=E/m)):b==="mirror"&&(O=f)),_=bn(0,1,K)*m}let U;D?(this.delayState.value=v[0],U=this.delayState):U=O.next(_),h&&!D&&(U.value=h(U.value));let{done:H}=U;!D&&p!==null&&(H=this.playbackSpeed>=0?this.currentTime>=u:this.currentTime<=0);const M=this.holdTime===null&&(this.state==="finished"||this.state==="running"&&H);return M&&w!==Nd&&(U.value=wo(v,this.options,T,this.speed)),N&&N(U.value),M&&this.finish(),U}then(a,s){return this.finished.then(a,s)}get duration(){return It(this.calculatedDuration)}get iterationDuration(){const{delay:a=0}=this.options||{};return this.duration+It(a)}get time(){return It(this.currentTime)}set time(a){a=qt(a),this.currentTime=a,this.startTime===null||this.holdTime!==null||this.playbackSpeed===0?this.holdTime=a:this.driver&&(this.startTime=this.driver.now()-a/this.playbackSpeed),this.driver?this.driver.start(!1):(this.startTime=0,this.state="paused",this.holdTime=a,this.tick(a))}getGeneratorVelocity(){const a=this.currentTime;if(a<=0)return this.options.velocity||0;if(this.generator.velocity)return this.generator.velocity(a);const s=this.generator.next(a).value;return Vx(l=>this.generator.next(l).value,a,s)}get speed(){return this.playbackSpeed}set speed(a){const s=this.playbackSpeed!==a;s&&this.driver&&this.updateTime(bt.now()),this.playbackSpeed=a,s&&this.driver&&(this.time=It(this.currentTime))}play(){var u,h;if(this.isStopped)return;const{driver:a=gw,startTime:s}=this.options;this.driver||(this.driver=a(f=>this.tick(f))),(h=(u=this.options).onPlay)==null||h.call(u);const l=this.driver.now();this.state==="finished"?(this.updateFinished(),this.startTime=l):this.holdTime!==null?this.startTime=l-this.holdTime:this.startTime||(this.startTime=s??l),this.state==="finished"&&this.speed<0&&(this.startTime+=this.calculatedDuration),this.holdTime=null,this.state="running",this.driver.start()}pause(){this.state="paused",this.updateTime(bt.now()),this.holdTime=this.currentTime}complete(){this.state!=="running"&&this.play(),this.state="finished",this.holdTime=null}finish(){var a,s;this.notifyFinished(),this.teardown(),this.state="finished",(s=(a=this.options).onComplete)==null||s.call(a)}cancel(){var a,s;this.holdTime=null,this.startTime=0,this.tick(0),this.teardown(),(s=(a=this.options).onCancel)==null||s.call(a)}teardown(){this.state="idle",this.stopDriver(),this.startTime=this.holdTime=null}stopDriver(){this.driver&&(this.driver.stop(),this.driver=void 0)}sample(a){return this.startTime=0,this.tick(a,!0)}attachTimeline(a){var s;return this.options.allowFlatten&&(this.options.type="keyframes",this.options.ease="linear",this.initAnimation()),(s=this.driver)==null||s.stop(),a.observe(this)}}function zw(n){for(let a=1;a<n.length;a++)n[a]??(n[a]=n[a-1])}const Pr=n=>n*180/Math.PI,Dd=n=>{const a=Pr(Math.atan2(n[1],n[0]));return Ad(a)},_w={x:4,y:5,translateX:4,translateY:5,scaleX:0,scaleY:3,scale:n=>(Math.abs(n[0])+Math.abs(n[3]))/2,rotate:Dd,rotateZ:Dd,skewX:n=>Pr(Math.atan(n[1])),skewY:n=>Pr(Math.atan(n[2])),skew:n=>(Math.abs(n[1])+Math.abs(n[2]))/2},Ad=n=>(n=n%360,n<0&&(n+=360),n),vy=Dd,xy=n=>Math.sqrt(n[0]*n[0]+n[1]*n[1]),by=n=>Math.sqrt(n[4]*n[4]+n[5]*n[5]),Vw={x:12,y:13,z:14,translateX:12,translateY:13,translateZ:14,scaleX:xy,scaleY:by,scale:n=>(xy(n)+by(n))/2,rotateX:n=>Ad(Pr(Math.atan2(n[6],n[5]))),rotateY:n=>Ad(Pr(Math.atan2(-n[2],n[0]))),rotateZ:vy,rotate:vy,skewX:n=>Pr(Math.atan(n[4])),skewY:n=>Pr(Math.atan(n[1])),skew:n=>(Math.abs(n[1])+Math.abs(n[4]))/2};function Md(n){return n.includes("scale")?1:0}function kd(n,a){if(!n||n==="none")return Md(a);const s=n.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);let l,u;if(s)l=Vw,u=s;else{const m=n.match(/^matrix\(([-\d.e\s,]+)\)$/u);l=_w,u=m}if(!u)return Md(a);const h=l[a],f=u[1].split(",").map(Lw);return typeof h=="function"?h(f):f[h]}const Bw=(n,a)=>{const{transform:s="none"}=getComputedStyle(n);return kd(s,a)};function Lw(n){return parseFloat(n.trim())}const Fa=["transformPerspective","x","y","z","translateX","translateY","translateZ","scale","scaleX","scaleY","rotate","rotateX","rotateY","rotateZ","skew","skewX","skewY"],Xa=new Set([...Fa,"pathRotation"]),Sy=n=>n===Ga||n===ve,Uw=new Set(["x","y","z"]),Hw=Fa.filter(n=>!Uw.has(n));function qw(n){const a=[];return Hw.forEach(s=>{const l=n.getValue(s);l!==void 0&&(a.push([s,l.get()]),l.set(s.startsWith("scale")?1:0))}),a}const gr={width:({x:n},{paddingLeft:a="0",paddingRight:s="0",boxSizing:l})=>{const u=n.max-n.min;return l==="border-box"?u:u-parseFloat(a)-parseFloat(s)},height:({y:n},{paddingTop:a="0",paddingBottom:s="0",boxSizing:l})=>{const u=n.max-n.min;return l==="border-box"?u:u-parseFloat(a)-parseFloat(s)},top:(n,{top:a})=>parseFloat(a),left:(n,{left:a})=>parseFloat(a),bottom:({y:n},{top:a})=>parseFloat(a)+(n.max-n.min),right:({x:n},{left:a})=>parseFloat(a)+(n.max-n.min),x:(n,{transform:a})=>kd(a,"x"),y:(n,{transform:a})=>kd(a,"y")};gr.translateX=gr.x;gr.translateY=gr.y;const Gr=new Set;let Rd=!1,Od=!1,zd=!1;function Lx(){if(Od){const n=Array.from(Gr).filter(l=>l.needsMeasurement),a=new Set(n.map(l=>l.element)),s=new Map;a.forEach(l=>{const u=qw(l);u.length&&(s.set(l,u),l.render())}),n.forEach(l=>l.measureInitialState()),a.forEach(l=>{l.render();const u=s.get(l);u&&u.forEach(([h,f])=>{var m;(m=l.getValue(h))==null||m.set(f)})}),n.forEach(l=>l.measureEndState()),n.forEach(l=>{l.suspendedScrollY!==void 0&&window.scrollTo(0,l.suspendedScrollY)})}Od=!1,Rd=!1,Gr.forEach(n=>n.complete(zd)),Gr.clear()}function Ux(){Gr.forEach(n=>{n.readKeyframes(),n.needsMeasurement&&(Od=!0)})}function Yw(){zd=!0,Ux(),Lx(),zd=!1}class Tf{constructor(a,s,l,u,h,f=!1){this.state="pending",this.isAsync=!1,this.needsMeasurement=!1,this.unresolvedKeyframes=[...a],this.onComplete=s,this.name=l,this.motionValue=u,this.element=h,this.isAsync=f}scheduleResolve(){this.state="scheduled",this.isAsync?(Gr.add(this),Rd||(Rd=!0,Ye.read(Ux),Ye.resolveKeyframes(Lx))):(this.readKeyframes(),this.complete())}readKeyframes(){const{unresolvedKeyframes:a,name:s,element:l,motionValue:u}=this;if(a[0]===null){const h=u==null?void 0:u.get(),f=a[a.length-1];if(h!==void 0)a[0]=h;else if(l&&s){const m=l.readValue(s,f);m!=null&&(a[0]=m)}a[0]===void 0&&(a[0]=f),u&&h===void 0&&u.set(a[0])}zw(a)}setFinalKeyframe(){}measureInitialState(){}renderEndStyles(){}measureEndState(){}complete(a=!1){this.state="complete",this.onComplete(this.unresolvedKeyframes,this.finalKeyframe,a),Gr.delete(this)}cancel(){this.state==="scheduled"&&(Gr.delete(this),this.state="pending")}resume(){this.state==="pending"&&this.scheduleResolve()}}const Pw=n=>n.startsWith("--");function Hx(n,a,s){Pw(a)?n.style.setProperty(a,s):n.style[a]=s}const Gw={};function qx(n,a){const s=mx(n);return()=>Gw[a]??s()}const Fw=qx(()=>window.ScrollTimeline!==void 0,"scrollTimeline"),Yx=qx(()=>{try{document.createElement("div").animate({opacity:0},{easing:"linear(0, 1)"})}catch{return!1}return!0},"linearEasing"),Fi=([n,a,s,l])=>`cubic-bezier(${n}, ${a}, ${s}, ${l})`,jy={linear:"linear",ease:"ease",easeIn:"ease-in",easeOut:"ease-out",easeInOut:"ease-in-out",circIn:Fi([0,.65,.55,1]),circOut:Fi([.55,0,1,.45]),backIn:Fi([.31,.01,.66,-.59]),backOut:Fi([.33,1.53,.69,.99])};function Px(n,a){if(n)return typeof n=="function"?Yx()?_x(n,a):"ease-out":Tx(n)?Fi(n):Array.isArray(n)?n.map(s=>Px(s,a)||jy.easeOut):jy[n]}function Xw(n,a,s,{delay:l=0,duration:u=300,repeat:h=0,repeatType:f="loop",ease:m="easeOut",times:p}={},g=void 0){const v={[a]:s};p&&(v.offset=p);const x=Px(m,u);Array.isArray(x)&&(v.easing=x);const b={delay:l,duration:u,easing:Array.isArray(x)?"linear":x,fill:"both",iterations:h+1,direction:f==="reverse"?"alternate":"normal"};return g&&(b.pseudoElement=g),n.animate(v,b)}function Gx(n){return typeof n=="function"&&"applyToOptions"in n}function $w({type:n,...a}){return Gx(n)&&Yx()?n.applyToOptions(a):(a.duration??(a.duration=300),a.ease??(a.ease="easeOut"),a)}class Fx extends Ef{constructor(a){if(super(),this.finishedTime=null,this.isStopped=!1,this.manualStartTime=null,!a)return;const{element:s,name:l,keyframes:u,pseudoElement:h,allowFlatten:f=!1,finalKeyframe:m,onComplete:p}=a;this.isPseudoElement=!!h,this.allowFlatten=f,this.options=a,jo(typeof a.type!="string");const g=$w(a);this.animation=Xw(s,l,u,g,h),g.autoplay===!1&&this.animation.pause(),this.animation.onfinish=()=>{if(this.finishedTime=this.time,!h){const v=wo(u,this.options,m,this.speed);this.updateMotionValue&&this.updateMotionValue(v),Hx(s,l,v),this.animation.cancel()}p==null||p(),this.notifyFinished()}}play(){this.isStopped||(this.manualStartTime=null,this.animation.play(),this.state==="finished"&&this.updateFinished())}pause(){this.animation.pause()}complete(){var a,s;(s=(a=this.animation).finish)==null||s.call(a)}cancel(){try{this.animation.cancel()}catch{}}stop(){if(this.isStopped)return;this.isStopped=!0;const{state:a}=this;a==="idle"||a==="finished"||(this.updateMotionValue?this.updateMotionValue():this.commitStyles(),this.isPseudoElement||this.cancel())}commitStyles(){var s,l,u;const a=(s=this.options)==null?void 0:s.element;!this.isPseudoElement&&(a!=null&&a.isConnected)&&((u=(l=this.animation).commitStyles)==null||u.call(l))}get duration(){var s,l;const a=((l=(s=this.animation.effect)==null?void 0:s.getComputedTiming)==null?void 0:l.call(s).duration)||0;return It(Number(a))}get iterationDuration(){const{delay:a=0}=this.options||{};return this.duration+It(a)}get time(){return It(Number(this.animation.currentTime)||0)}set time(a){const s=this.finishedTime!==null;this.manualStartTime=null,this.finishedTime=null,this.animation.currentTime=qt(a),s&&this.animation.pause()}get speed(){return this.animation.playbackRate}set speed(a){a<0&&(this.finishedTime=null),this.animation.playbackRate=a}get state(){return this.finishedTime!==null?"finished":this.animation.playState}get startTime(){return this.manualStartTime??Number(this.animation.startTime)}set startTime(a){this.manualStartTime=this.animation.startTime=a}attachTimeline({timeline:a,rangeStart:s,rangeEnd:l,observe:u}){var h;return this.allowFlatten&&((h=this.animation.effect)==null||h.updateTiming({easing:"linear"})),this.animation.onfinish=null,a&&Fw()?(this.animation.timeline=a,s&&(this.animation.rangeStart=s),l&&(this.animation.rangeEnd=l),en):u(this)}}const Xx={anticipate:Sx,backInOut:bx,circInOut:wx};function Kw(n){return n in Xx}function Zw(n){typeof n.ease=="string"&&Kw(n.ease)&&(n.ease=Xx[n.ease])}const td=10;class Qw extends Fx{constructor(a){Zw(a),Bx(a),super(a),a.startTime!==void 0&&a.autoplay!==!1&&(this.startTime=a.startTime),this.options=a}updateMotionValue(a){const{motionValue:s,onUpdate:l,onComplete:u,element:h,...f}=this.options;if(!s)return;if(a!==void 0){s.set(a);return}const m=new ro({...f,autoplay:!1}),p=Math.max(td,bt.now()-this.startTime),g=bn(0,td,p-td),v=m.sample(p).value,{name:x}=this.options;h&&x&&Hx(h,x,v),s.setWithVelocity(m.sample(Math.max(0,p-g)).value,v,g),m.stop()}}const wy=(n,a)=>a==="zIndex"?!1:!!(typeof n=="number"||Array.isArray(n)||typeof n=="string"&&(cn.test(n)||n==="0")&&!n.startsWith("url("));function Jw(n){const a=n[0];if(n.length===1)return!0;for(let s=0;s<n.length;s++)if(n[s]!==a)return!0}function Ww(n,a,s,l){const u=n[0];if(u===null)return!1;if(a==="display"||a==="visibility")return!0;const h=n[n.length-1],f=wy(u,a),m=wy(h,a);return!f||!m?!1:Jw(n)||(s==="spring"||Gx(s))&&l}function _d(n){n.duration=0,n.type="keyframes"}const $x=new Set(["opacity","clipPath","filter","transform","backgroundColor"]),Iw=/^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;function e2(n){for(let a=0;a<n.length;a++)if(typeof n[a]=="string"&&Iw.test(n[a]))return!0;return!1}const t2=new Set(["color","backgroundColor","outlineColor","fill","stroke","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor"]),n2=mx(()=>Object.hasOwnProperty.call(Element.prototype,"animate"));function r2(n){var x;const{motionValue:a,name:s,repeatDelay:l,repeatType:u,damping:h,type:f,keyframes:m}=n,p=(x=a==null?void 0:a.owner)==null?void 0:x.current;if(!(p instanceof HTMLElement)&&!(p instanceof SVGElement))return!1;const{onUpdate:g,transformTemplate:v}=a.owner.getProps();return n2()&&s&&($x.has(s)||t2.has(s)&&e2(m))&&(s!=="transform"||!v)&&!g&&!l&&u!=="mirror"&&h!==0&&f!=="inertia"}const a2=40;class i2 extends Ef{constructor({autoplay:a=!0,delay:s=0,type:l="keyframes",repeat:u=0,repeatDelay:h=0,repeatType:f="loop",keyframes:m,name:p,motionValue:g,element:v,...x}){var w;super(),this.stop=()=>{var N,T;this._animation&&(this._animation.stop(),(N=this.stopTimeline)==null||N.call(this)),(T=this.keyframeResolver)==null||T.cancel()},this.createdAt=bt.now();const b={autoplay:a,delay:s,type:l,repeat:u,repeatDelay:h,repeatType:f,name:p,motionValue:g,element:v,...x},E=(v==null?void 0:v.KeyframeResolver)||Tf;this.keyframeResolver=new E(m,(N,T,A)=>this.onKeyframesResolved(N,T,b,!A),p,g,v),(w=this.keyframeResolver)==null||w.scheduleResolve()}onKeyframesResolved(a,s,l,u){var A,D;this.keyframeResolver=void 0;const{name:h,type:f,velocity:m,delay:p,isHandoff:g,onUpdate:v}=l;this.resolvedAt=bt.now();let x=!0;Ww(a,h,f,m)||(x=!1,(vr.instantAnimations||!p)&&(v==null||v(wo(a,l,s))),a[0]=a[a.length-1],_d(l),l.repeat=0);const E={startTime:u?this.resolvedAt?this.resolvedAt-this.createdAt>a2?this.resolvedAt:this.createdAt:this.createdAt:void 0,finalKeyframe:s,...l,keyframes:a},w=x&&!g&&r2(E),N=(D=(A=E.motionValue)==null?void 0:A.owner)==null?void 0:D.current;let T;if(w)try{T=new Qw({...E,element:N})}catch{T=new ro(E)}else T=new ro(E);T.finished.then(()=>{this.notifyFinished()}).catch(en),this.pendingTimeline&&(this.stopTimeline=T.attachTimeline(this.pendingTimeline),this.pendingTimeline=void 0),this._animation=T}get finished(){return this._animation?this.animation.finished:this._finished}then(a,s){return this.finished.finally(a).then(()=>{})}get animation(){var a;return this._animation||((a=this.keyframeResolver)==null||a.resume(),Yw()),this._animation}get duration(){return this.animation.duration}get iterationDuration(){return this.animation.iterationDuration}get time(){return this.animation.time}set time(a){this.animation.time=a}get speed(){return this.animation.speed}get state(){return this.animation.state}set speed(a){this.animation.speed=a}get startTime(){return this.animation.startTime}attachTimeline(a){return this._animation?this.stopTimeline=this.animation.attachTimeline(a):this.pendingTimeline=a,()=>this.stop()}play(){this.animation.play()}pause(){this.animation.pause()}complete(){this.animation.complete()}cancel(){var a;this._animation&&this.animation.cancel(),(a=this.keyframeResolver)==null||a.cancel()}}function Kx(n,a,s,l=0,u=1){const h=Array.from(n).sort((g,v)=>g.sortNodePosition(v)).indexOf(a),f=n.size,m=(f-1)*l;return typeof s=="function"?s(h,f):u===1?h*l:m-h*l}const Ey=30,s2=n=>!isNaN(parseFloat(n));class l2{constructor(a,s={}){this.canTrackVelocity=null,this.events={},this.updateAndNotify=l=>{var h;const u=bt.now();if(this.updatedAt!==u&&this.setPrevFrameValue(),this.prev=this.current,this.setCurrent(l),this.current!==this.prev&&((h=this.events.change)==null||h.notify(this.current),this.dependents))for(const f of this.dependents)f.dirty()},this.hasAnimated=!1,this.setCurrent(a),this.owner=s.owner}setCurrent(a){this.current=a,this.updatedAt=bt.now(),this.canTrackVelocity===null&&a!==void 0&&(this.canTrackVelocity=s2(this.current))}setPrevFrameValue(a=this.current){this.prevFrameValue=a,this.prevUpdatedAt=this.updatedAt}onChange(a){return this.on("change",a)}on(a,s){this.events[a]||(this.events[a]=new gf);const l=this.events[a].add(s);return a==="change"?()=>{l(),Ye.read(()=>{this.events.change.getSize()||this.stop()})}:l}clearListeners(){for(const a in this.events)this.events[a].clear()}attach(a,s){this.passiveEffect=a,this.stopPassiveEffect=s}set(a){this.passiveEffect?this.passiveEffect(a,this.updateAndNotify):this.updateAndNotify(a)}setWithVelocity(a,s,l){this.set(s),this.prev=void 0,this.prevFrameValue=a,this.prevUpdatedAt=this.updatedAt-l}jump(a,s=!0){this.updateAndNotify(a),this.prev=a,this.prevUpdatedAt=this.prevFrameValue=void 0,s&&this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}dirty(){var a;(a=this.events.change)==null||a.notify(this.current)}addDependent(a){this.dependents||(this.dependents=new Set),this.dependents.add(a)}removeDependent(a){this.dependents&&this.dependents.delete(a)}get(){return this.current}getPrevious(){return this.prev}getVelocity(){const a=bt.now();if(!this.canTrackVelocity||this.prevFrameValue===void 0||a-this.updatedAt>Ey)return 0;const s=Math.min(this.updatedAt-this.prevUpdatedAt,Ey);return px(parseFloat(this.current)-parseFloat(this.prevFrameValue),s)}start(a){return this.stop(),new Promise(s=>{this.hasAnimated=!0,this.animation=a(s),this.events.animationStart&&this.events.animationStart.notify()}).then(()=>{this.events.animationComplete&&this.events.animationComplete.notify(),this.clearAnimation()})}stop(){this.animation&&(this.animation.stop(),this.events.animationCancel&&this.events.animationCancel.notify()),this.clearAnimation()}isAnimating(){return!!this.animation}clearAnimation(){delete this.animation}destroy(){var a,s;(a=this.dependents)==null||a.clear(),(s=this.events.destroy)==null||s.notify(),this.clearListeners(),this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}}function Ya(n,a){return new l2(n,a)}function Zx(n,a){if(n!=null&&n.inherit&&a){const{inherit:s,...l}=n;return{...a,...l}}return n}function Cf(n,a){const s=(n==null?void 0:n[a])??(n==null?void 0:n.default)??n;return s!==n?Zx(s,n):s}const o2={type:"spring",stiffness:500,damping:25,restSpeed:10},c2=n=>({type:"spring",stiffness:550,damping:n===0?2*Math.sqrt(550):30,restSpeed:10}),u2={type:"keyframes",duration:.8},d2={type:"keyframes",ease:[.25,.1,.35,1],duration:.3},f2=(n,{keyframes:a})=>a.length>2?u2:Xa.has(n)?n.startsWith("scale")?c2(a[1]):o2:d2,h2=new Set(["when","delay","delayChildren","staggerChildren","staggerDirection","repeat","repeatType","repeatDelay","from","elapsed"]);function m2(n){for(const a in n)if(!h2.has(a))return!0;return!1}const Nf=(n,a,s,l={},u,h)=>f=>{const m=Cf(l,n)||{},p=m.delay||l.delay||0;let{elapsed:g=0}=l;g=g-qt(p);const v={keyframes:Array.isArray(s)?s:[null,s],ease:"easeOut",velocity:a.getVelocity(),...m,delay:-g,onUpdate:b=>{a.set(b),m.onUpdate&&m.onUpdate(b)},onComplete:()=>{f(),m.onComplete&&m.onComplete()},name:n,motionValue:a,element:h?void 0:u};m2(m)||Object.assign(v,f2(n,v)),v.duration&&(v.duration=qt(v.duration)),v.repeatDelay&&(v.repeatDelay=qt(v.repeatDelay)),v.from!==void 0&&(v.keyframes[0]=v.from);let x=!1;if((v.type===!1||v.duration===0&&!v.repeatDelay)&&(_d(v),v.delay===0&&(x=!0)),(vr.instantAnimations||vr.skipAnimations||u!=null&&u.shouldSkipAnimations||m.skipAnimations)&&(x=!0,_d(v),v.delay=0),v.allowFlatten=!m.type&&!m.ease,x&&!h&&a.get()!==void 0){const b=wo(v.keyframes,m);if(b!==void 0){Ye.update(()=>{v.onUpdate(b),v.onComplete()});return}}return m.isSync?new ro(v):new i2(v)},p2=/^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;function g2(n){const a=p2.exec(n);if(!a)return[,];const[,s,l,u]=a;return[`--${s??l}`,u]}function Qx(n,a,s=1){const[l,u]=g2(n);if(!l)return;const h=window.getComputedStyle(a).getPropertyValue(l);if(h){const f=h.trim();return dx(f)?parseFloat(f):f}return xf(u)?Qx(u,a,s+1):u}function Ty(n){const a=[{},{}];return n==null||n.values.forEach((s,l)=>{a[0][l]=s.get(),a[1][l]=s.getVelocity()}),a}function Df(n,a,s,l){if(typeof a=="function"){const[u,h]=Ty(l);a=a(s!==void 0?s:n.custom,u,h)}if(typeof a=="string"&&(a=n.variants&&n.variants[a]),typeof a=="function"){const[u,h]=Ty(l);a=a(s!==void 0?s:n.custom,u,h)}return a}function Fr(n,a,s){const l=n.getProps();return Df(l,a,s!==void 0?s:l.custom,n)}const Jx=new Set(["width","height","top","left","right","bottom",...Fa]),Vd=n=>Array.isArray(n);function y2(n,a,s){n.hasValue(a)?n.getValue(a).set(s):n.addValue(a,Ya(s))}function v2(n){return Vd(n)?n[n.length-1]||0:n}function x2(n,a){const s=Fr(n,a);let{transitionEnd:l={},transition:u={},...h}=s||{};h={...h,...l};for(const f in h){const m=v2(h[f]);y2(n,f,m)}}const yt=n=>!!(n&&n.getVelocity);function b2(n){return!!(yt(n)&&n.add)}function Bd(n,a){const s=n.getValue("willChange");if(b2(s))return s.add(a);if(!s&&vr.WillChange){const l=new vr.WillChange("auto");n.addValue("willChange",l),l.add(a)}}function Af(n){return n.replace(/([A-Z])/g,a=>`-${a.toLowerCase()}`)}const S2="framerAppearId",Wx="data-"+Af(S2);function Ix(n){return n.props[Wx]}function j2({protectedKeys:n,needsAnimating:a},s){const l=n.hasOwnProperty(s)&&a[s]!==!0;return a[s]=!1,l}function eb(n,a,{delay:s=0,transitionOverride:l,type:u}={}){let{transition:h,transitionEnd:f,...m}=a;const p=n.getDefaultTransition();h=h?Zx(h,p):p;const g=h==null?void 0:h.reduceMotion,v=h==null?void 0:h.skipAnimations;l&&(h=l);const x=[],b=u&&n.animationState&&n.animationState.getState()[u],E=h==null?void 0:h.path;E&&E.animateVisualElement(n,m,h,s,x);for(const w in m){const N=n.getValue(w,n.latestValues[w]??null),T=m[w];if(T===void 0||b&&j2(b,w))continue;const A={delay:s,...Cf(h||{},w)};v&&(A.skipAnimations=!0);const D=N.get();if(D!==void 0&&!N.isAnimating()&&!Array.isArray(T)&&T===D&&!A.velocity){Ye.update(()=>N.set(T));continue}let _=!1;if(window.MotionHandoffAnimation){const H=Ix(n);if(H){const M=window.MotionHandoffAnimation(H,w,Ye);M!==null&&(A.startTime=M,_=!0)}}Bd(n,w);const O=g??n.shouldReduceMotion;N.start(Nf(w,N,T,O&&Jx.has(w)?{type:!1}:A,n,_));const U=N.animation;U&&x.push(U)}if(f){const w=()=>Ye.update(()=>{f&&x2(n,f)});x.length?Promise.all(x).then(w):w()}return x}function Ld(n,a,s={}){var p;const l=Fr(n,a,s.type==="exit"?(p=n.presenceContext)==null?void 0:p.custom:void 0);let{transition:u=n.getDefaultTransition()||{}}=l||{};s.transitionOverride&&(u=s.transitionOverride);const h=l?()=>Promise.all(eb(n,l,s)):()=>Promise.resolve(),f=n.variantChildren&&n.variantChildren.size?(g=0)=>{const{delayChildren:v=0,staggerChildren:x,staggerDirection:b}=u;return w2(n,a,g,v,x,b,s)}:()=>Promise.resolve(),{when:m}=u;if(m){const[g,v]=m==="beforeChildren"?[h,f]:[f,h];return g().then(()=>v())}else return Promise.all([h(),f(s.delay)])}function w2(n,a,s=0,l=0,u=0,h=1,f){const m=[];for(const p of n.variantChildren)p.notify("AnimationStart",a),m.push(Ld(p,a,{...f,delay:s+(typeof l=="function"?0:l)+Kx(n.variantChildren,p,l,u,h)}).then(()=>p.notify("AnimationComplete",a)));return Promise.all(m)}function E2(n,a,s={}){n.notify("AnimationStart",a);let l;if(Array.isArray(a)){const u=a.map(h=>Ld(n,h,s));l=Promise.all(u)}else if(typeof a=="string")l=Ld(n,a,s);else{const u=typeof a=="function"?Fr(n,a,s.custom):a;l=Promise.all(eb(n,u,s))}return l.then(()=>{n.notify("AnimationComplete",a)})}const T2={test:n=>n==="auto",parse:n=>n},tb=n=>a=>a.test(n),nb=[Ga,ve,xn,qn,Jj,Qj,T2],Cy=n=>nb.find(tb(n));function C2(n){return typeof n=="number"?n===0:n!==null?n==="none"||n==="0"||hx(n):!0}const N2=new Set(["brightness","contrast","saturate","opacity"]);function D2(n){const[a,s]=n.slice(0,-1).split("(");if(a==="drop-shadow")return n;const[l]=s.match(bf)||[];if(!l)return n;const u=s.replace(l,"");let h=N2.has(a)?1:0;return l!==s&&(h*=100),a+"("+h+u+")"}const A2=/\b([a-z-]*)\(.*?\)/gu,Ud={...cn,getAnimatableNone:n=>{const a=n.match(A2);return a?a.map(D2).join(" "):n}},Hd={...cn,getAnimatableNone:n=>{const a=cn.parse(n);return cn.createTransformer(n)(a.map(l=>typeof l=="number"?0:typeof l=="object"?{...l,alpha:1}:l))}},Ny={...Ga,transform:Math.round},M2={rotate:qn,pathRotation:qn,rotateX:qn,rotateY:qn,rotateZ:qn,scale:Ml,scaleX:Ml,scaleY:Ml,scaleZ:Ml,skew:qn,skewX:qn,skewY:qn,distance:ve,translateX:ve,translateY:ve,translateZ:ve,x:ve,y:ve,z:ve,perspective:ve,transformPerspective:ve,opacity:Ii,originX:hy,originY:hy,originZ:ve},ao={borderWidth:ve,borderTopWidth:ve,borderRightWidth:ve,borderBottomWidth:ve,borderLeftWidth:ve,borderRadius:ve,borderTopLeftRadius:ve,borderTopRightRadius:ve,borderBottomRightRadius:ve,borderBottomLeftRadius:ve,width:ve,maxWidth:ve,height:ve,maxHeight:ve,top:ve,right:ve,bottom:ve,left:ve,inset:ve,insetBlock:ve,insetBlockStart:ve,insetBlockEnd:ve,insetInline:ve,insetInlineStart:ve,insetInlineEnd:ve,padding:ve,paddingTop:ve,paddingRight:ve,paddingBottom:ve,paddingLeft:ve,paddingBlock:ve,paddingBlockStart:ve,paddingBlockEnd:ve,paddingInline:ve,paddingInlineStart:ve,paddingInlineEnd:ve,margin:ve,marginTop:ve,marginRight:ve,marginBottom:ve,marginLeft:ve,marginBlock:ve,marginBlockStart:ve,marginBlockEnd:ve,marginInline:ve,marginInlineStart:ve,marginInlineEnd:ve,fontSize:ve,backgroundPositionX:ve,backgroundPositionY:ve,...M2,zIndex:Ny,fillOpacity:Ii,strokeOpacity:Ii,numOctaves:Ny},k2={...ao,color:at,backgroundColor:at,outlineColor:at,fill:at,stroke:at,borderColor:at,borderTopColor:at,borderRightColor:at,borderBottomColor:at,borderLeftColor:at,filter:Ud,WebkitFilter:Ud,mask:Hd,WebkitMask:Hd},rb=n=>k2[n],R2=new Set([Ud,Hd]);function ab(n,a){let s=rb(n);return R2.has(s)||(s=cn),s.getAnimatableNone?s.getAnimatableNone(a):void 0}const O2=new Set(["auto","none","0"]);function z2(n,a,s){let l=0,u;for(;l<n.length&&!u;){const h=n[l];typeof h=="string"&&!O2.has(h)&&qa(h).values.length&&(u=n[l]),l++}if(u&&s)for(const h of a)n[h]=ab(s,u)}class _2 extends Tf{constructor(a,s,l,u,h){super(a,s,l,u,h,!0)}readKeyframes(){const{unresolvedKeyframes:a,element:s,name:l}=this;if(!s||!s.current)return;super.readKeyframes();for(let v=0;v<a.length;v++){let x=a[v];if(typeof x=="string"&&(x=x.trim(),xf(x))){const b=Qx(x,s.current);b!==void 0&&(a[v]=b),v===a.length-1&&(this.finalKeyframe=x)}}if(this.resolveNoneKeyframes(),!Jx.has(l)||a.length!==2)return;const[u,h]=a,f=Cy(u),m=Cy(h),p=fy(u),g=fy(h);if(p!==g&&gr[l]){this.needsMeasurement=!0;return}if(f!==m)if(Sy(f)&&Sy(m))for(let v=0;v<a.length;v++){const x=a[v];typeof x=="string"&&(a[v]=parseFloat(x))}else gr[l]&&(this.needsMeasurement=!0)}resolveNoneKeyframes(){const{unresolvedKeyframes:a,name:s}=this,l=[];for(let u=0;u<a.length;u++)(a[u]===null||C2(a[u]))&&l.push(u);l.length&&z2(a,l,s)}measureInitialState(){const{element:a,unresolvedKeyframes:s,name:l}=this;if(!a||!a.current)return;l==="height"&&(this.suspendedScrollY=window.pageYOffset),this.measuredOrigin=gr[l](a.measureViewportBox(),window.getComputedStyle(a.current)),s[0]=this.measuredOrigin;const u=s[s.length-1];u!==void 0&&a.getValue(l,u).jump(u,!1)}measureEndState(){var m;const{element:a,name:s,unresolvedKeyframes:l}=this;if(!a||!a.current)return;const u=a.getValue(s);u&&u.jump(this.measuredOrigin,!1);const h=l.length-1,f=l[h];l[h]=gr[s](a.measureViewportBox(),window.getComputedStyle(a.current)),f!==null&&this.finalKeyframe===void 0&&(this.finalKeyframe=f),(m=this.removedTransforms)!=null&&m.length&&this.removedTransforms.forEach(([p,g])=>{a.getValue(p).set(g)}),this.resolveNoneKeyframes()}}const Mf=["borderTopLeftRadius","borderTopRightRadius","borderBottomRightRadius","borderBottomLeftRadius"];function ib(n,a,s){if(n==null)return[];if(n instanceof EventTarget)return[n];if(typeof n=="string"){let l=document;const u=(s==null?void 0:s[n])??l.querySelectorAll(n);return u?Array.from(u):[]}return Array.from(n).filter(l=>l!=null)}const qd=(n,a)=>a&&typeof n=="number"?a.transform(n):n;function Pl(n){return fx(n)&&"offsetHeight"in n&&!("ownerSVGElement"in n)}const{schedule:kf}=Cx(queueMicrotask,!1),on={x:!1,y:!1};function sb(){return on.x||on.y}function V2(n){return n==="x"||n==="y"?on[n]?null:(on[n]=!0,()=>{on[n]=!1}):on.x||on.y?null:(on.x=on.y=!0,()=>{on.x=on.y=!1})}function lb(n,a){const s=ib(n),l=new AbortController,u={passive:!0,...a,signal:l.signal};return[s,u,()=>l.abort()]}function B2(n){return!(n.pointerType==="touch"||sb())}function L2(n,a,s={}){const[l,u,h]=lb(n,s);return l.forEach(f=>{let m=!1,p=!1,g;const v=()=>{f.removeEventListener("pointerleave",w)},x=T=>{g&&(g(T),g=void 0),v()},b=T=>{m=!1,window.removeEventListener("pointerup",b),window.removeEventListener("pointercancel",b),p&&(p=!1,x(T))},E=()=>{m=!0,window.addEventListener("pointerup",b,u),window.addEventListener("pointercancel",b,u)},w=T=>{if(T.pointerType!=="touch"){if(m){p=!0;return}x(T)}},N=T=>{if(!B2(T))return;p=!1;const A=a(f,T);typeof A=="function"&&(g=A,f.addEventListener("pointerleave",w,u))};f.addEventListener("pointerenter",N,u),f.addEventListener("pointerdown",E,u)}),h}const ob=(n,a)=>a?n===a?!0:ob(n,a.parentElement):!1,Rf=n=>n.pointerType==="mouse"?typeof n.button!="number"||n.button<=0:n.isPrimary!==!1,U2=new Set(["BUTTON","INPUT","SELECT","TEXTAREA","A"]);function H2(n){return U2.has(n.tagName)||n.isContentEditable===!0}const q2=new Set(["INPUT","SELECT","TEXTAREA"]);function Y2(n){return q2.has(n.tagName)||n.isContentEditable===!0}const Gl=new WeakSet;function Dy(n){return a=>{a.key==="Enter"&&n(a)}}function nd(n,a){n.dispatchEvent(new PointerEvent("pointer"+a,{isPrimary:!0,bubbles:!0}))}const P2=(n,a)=>{const s=n.currentTarget;if(!s)return;const l=Dy(()=>{if(Gl.has(s))return;nd(s,"down");const u=Dy(()=>{nd(s,"up")}),h=()=>nd(s,"cancel");s.addEventListener("keyup",u,a),s.addEventListener("blur",h,a)});s.addEventListener("keydown",l,a),s.addEventListener("blur",()=>s.removeEventListener("keydown",l),a)};function Ay(n){return Rf(n)&&!sb()}const My=new WeakSet;function G2(n,a,s={}){const[l,u,h]=lb(n,s),f=m=>{const p=m.currentTarget;if(!Ay(m)||My.has(m))return;Gl.add(p),s.stopPropagation&&My.add(m);const g=a(p,m),v={...u,capture:!0},x=(w,N)=>{window.removeEventListener("pointerup",b,v),window.removeEventListener("pointercancel",E,v),Gl.has(p)&&Gl.delete(p),Ay(w)&&typeof g=="function"&&g(w,{success:N})},b=w=>{x(w,p===window||p===document||s.useGlobalTarget||ob(p,w.target))},E=w=>{x(w,!1)};window.addEventListener("pointerup",b,v),window.addEventListener("pointercancel",E,v)};return l.forEach(m=>{(s.useGlobalTarget?window:m).addEventListener("pointerdown",f,u),Pl(m)&&(m.addEventListener("focus",g=>P2(g,u)),!H2(m)&&!m.hasAttribute("tabindex")&&(m.tabIndex=0))}),h}function Of(n){return fx(n)&&"ownerSVGElement"in n}const Fl=new WeakMap;let pr;const cb=(n,a,s)=>(l,u)=>u&&u[0]?u[0][n+"Size"]:Of(l)&&"getBBox"in l?l.getBBox()[a]:l[s],F2=cb("inline","width","offsetWidth"),X2=cb("block","height","offsetHeight");function $2({target:n,borderBoxSize:a}){var s;(s=Fl.get(n))==null||s.forEach(l=>{l(n,{get width(){return F2(n,a)},get height(){return X2(n,a)}})})}function K2(n){n.forEach($2)}function Z2(){typeof ResizeObserver>"u"||(pr=new ResizeObserver(K2))}function Q2(n,a){pr||Z2();const s=ib(n);return s.forEach(l=>{let u=Fl.get(l);u||(u=new Set,Fl.set(l,u)),u.add(a),pr==null||pr.observe(l)}),()=>{s.forEach(l=>{const u=Fl.get(l);u==null||u.delete(a),u!=null&&u.size||pr==null||pr.unobserve(l)})}}const Xl=new Set;let La;function J2(){La=()=>{const n={get width(){return window.innerWidth},get height(){return window.innerHeight}};Xl.forEach(a=>a(n))},window.addEventListener("resize",La)}function W2(n){return Xl.add(n),La||J2(),()=>{Xl.delete(n),!Xl.size&&typeof La=="function"&&(window.removeEventListener("resize",La),La=void 0)}}function ky(n,a){return typeof n=="function"?W2(n):Q2(n,a)}function I2(n){return Of(n)&&n.tagName==="svg"}const eE=[...nb,at,cn],tE=n=>eE.find(tb(n)),Ry=()=>({translate:0,scale:1,origin:0,originPoint:0}),Ua=()=>({x:Ry(),y:Ry()}),Oy=()=>({min:0,max:0}),st=()=>({x:Oy(),y:Oy()}),nE=new WeakMap;function Eo(n){return n!==null&&typeof n=="object"&&typeof n.start=="function"}function es(n){return typeof n=="string"||Array.isArray(n)}const zf=["animate","whileInView","whileFocus","whileHover","whileTap","whileDrag","exit"],_f=["initial",...zf];function To(n){return Eo(n.animate)||_f.some(a=>es(n[a]))}function ub(n){return!!(To(n)||n.variants)}function rE(n,a,s){for(const l in a){const u=a[l],h=s[l];if(yt(u))n.addValue(l,u);else if(yt(h))n.addValue(l,Ya(u,{owner:n}));else if(h!==u)if(n.hasValue(l)){const f=n.getValue(l);f.liveStyle===!0?f.jump(u):f.hasAnimated||f.set(u)}else{const f=n.getStaticValue(l);n.addValue(l,Ya(f!==void 0?f:u,{owner:n}))}}for(const l in s)a[l]===void 0&&n.removeValue(l);return a}const io={current:null},Vf={current:!1},aE=typeof window<"u";function db(){if(Vf.current=!0,!!aE)if(window.matchMedia){const n=window.matchMedia("(prefers-reduced-motion)"),a=()=>io.current=n.matches;n.addEventListener("change",a),a()}else io.current=!1}const zy=["AnimationStart","AnimationComplete","Update","BeforeLayoutMeasure","LayoutMeasure","LayoutAnimationStart","LayoutAnimationComplete"];let so={};function fb(n){so=n}function iE(){return so}class sE{scrapeMotionValuesFromProps(a,s,l){return{}}constructor({parent:a,props:s,presenceContext:l,reducedMotionConfig:u,skipAnimations:h,blockInitialAnimation:f,visualState:m},p={}){this.current=null,this.children=new Set,this.isVariantNode=!1,this.isControllingVariants=!1,this.shouldReduceMotion=null,this.shouldSkipAnimations=!1,this.values=new Map,this.KeyframeResolver=Tf,this.features={},this.valueSubscriptions=new Map,this.prevMotionValues={},this.hasBeenMounted=!1,this.events={},this.propEventSubscriptions={},this.notifyUpdate=()=>this.notify("Update",this.latestValues),this.render=()=>{this.current&&(this.triggerBuild(),this.renderInstance(this.current,this.renderState,this.props.style,this.projection))},this.renderScheduledAt=0,this.scheduleRender=()=>{const E=bt.now();this.renderScheduledAt<E&&(this.renderScheduledAt=E,Ye.render(this.render,!1,!0))};const{latestValues:g,renderState:v}=m;this.latestValues=g,this.baseTarget={...g},this.initialValues=s.initial?{...g}:{},this.renderState=v,this.parent=a,this.props=s,this.presenceContext=l,this.depth=a?a.depth+1:0,this.reducedMotionConfig=u,this.skipAnimationsConfig=h,this.options=p,this.blockInitialAnimation=!!f,this.isControllingVariants=To(s),this.isVariantNode=ub(s),this.isVariantNode&&(this.variantChildren=new Set),this.manuallyAnimateOnMount=!!(a&&a.current);const{willChange:x,...b}=this.scrapeMotionValuesFromProps(s,{},this);for(const E in b){const w=b[E];g[E]!==void 0&&yt(w)&&w.set(g[E])}}mount(a){var s,l;if(this.hasBeenMounted)for(const u in this.initialValues)(s=this.values.get(u))==null||s.jump(this.initialValues[u]),this.latestValues[u]=this.initialValues[u];this.current=a,nE.set(a,this),this.projection&&!this.projection.instance&&this.projection.mount(a),this.parent&&this.isVariantNode&&!this.isControllingVariants&&(this.removeFromVariantTree=this.parent.addVariantChild(this)),this.values.forEach((u,h)=>this.bindToMotionValue(h,u)),this.reducedMotionConfig==="never"?this.shouldReduceMotion=!1:this.reducedMotionConfig==="always"?this.shouldReduceMotion=!0:(Vf.current||db(),this.shouldReduceMotion=io.current),this.shouldSkipAnimations=this.skipAnimationsConfig??!1,(l=this.parent)==null||l.addChild(this),this.update(this.props,this.presenceContext),this.hasBeenMounted=!0}unmount(){var a;this.projection&&this.projection.unmount(),xr(this.notifyUpdate),xr(this.render),this.valueSubscriptions.forEach(s=>s()),this.valueSubscriptions.clear(),this.removeFromVariantTree&&this.removeFromVariantTree(),(a=this.parent)==null||a.removeChild(this);for(const s in this.events)this.events[s].clear();for(const s in this.features){const l=this.features[s];l&&(l.unmount(),l.isMounted=!1)}this.current=null}addChild(a){this.children.add(a),this.enteringChildren??(this.enteringChildren=new Set),this.enteringChildren.add(a)}removeChild(a){this.children.delete(a),this.enteringChildren&&this.enteringChildren.delete(a)}bindToMotionValue(a,s){if(this.valueSubscriptions.has(a)&&this.valueSubscriptions.get(a)(),s.accelerate&&$x.has(a)&&this.current instanceof HTMLElement){const{factory:f,keyframes:m,times:p,ease:g,duration:v}=s.accelerate,x=new Fx({element:this.current,name:a,keyframes:m,times:p,ease:g,duration:qt(v)}),b=f(x);this.valueSubscriptions.set(a,()=>{b(),x.cancel()});return}const l=Xa.has(a);l&&this.onBindTransform&&this.onBindTransform();const u=s.on("change",f=>{this.latestValues[a]=f,this.props.onUpdate&&Ye.preRender(this.notifyUpdate),l&&this.projection&&(this.projection.isTransformDirty=!0),this.scheduleRender()});let h;typeof window<"u"&&window.MotionCheckAppearSync&&(h=window.MotionCheckAppearSync(this,a,s)),this.valueSubscriptions.set(a,()=>{u(),h&&h()})}sortNodePosition(a){return!this.current||!this.sortInstanceNodePosition||this.type!==a.type?0:this.sortInstanceNodePosition(this.current,a.current)}updateFeatures(){let a="animation";for(a in so){const s=so[a];if(!s)continue;const{isEnabled:l,Feature:u}=s;if(!this.features[a]&&u&&l(this.props)&&(this.features[a]=new u(this)),this.features[a]){const h=this.features[a];h.isMounted?h.update():(h.mount(),h.isMounted=!0)}}}triggerBuild(){this.build(this.renderState,this.latestValues,this.props)}measureViewportBox(){return this.current?this.measureInstanceViewportBox(this.current,this.props):st()}getStaticValue(a){return this.latestValues[a]}setStaticValue(a,s){this.latestValues[a]=s}update(a,s){(a.transformTemplate||this.props.transformTemplate)&&this.scheduleRender(),this.prevProps=this.props,this.props=a,this.prevPresenceContext=this.presenceContext,this.presenceContext=s;for(let l=0;l<zy.length;l++){const u=zy[l];this.propEventSubscriptions[u]&&(this.propEventSubscriptions[u](),delete this.propEventSubscriptions[u]);const h="on"+u,f=a[h];f&&(this.propEventSubscriptions[u]=this.on(u,f))}this.prevMotionValues=rE(this,this.scrapeMotionValuesFromProps(a,this.prevProps||{},this),this.prevMotionValues),this.handleChildMotionValue&&this.handleChildMotionValue()}getProps(){return this.props}getVariant(a){return this.props.variants?this.props.variants[a]:void 0}getDefaultTransition(){return this.props.transition}getTransformPagePoint(){return this.props.transformPagePoint}getClosestVariantNode(){return this.isVariantNode?this:this.parent?this.parent.getClosestVariantNode():void 0}addVariantChild(a){const s=this.getClosestVariantNode();if(s)return s.variantChildren&&s.variantChildren.add(a),()=>s.variantChildren.delete(a)}addValue(a,s){const l=this.values.get(a);s!==l&&(l&&this.removeValue(a),this.bindToMotionValue(a,s),this.values.set(a,s),this.latestValues[a]=s.get())}removeValue(a){this.values.delete(a);const s=this.valueSubscriptions.get(a);s&&(s(),this.valueSubscriptions.delete(a)),delete this.latestValues[a],this.removeValueFromRenderState(a,this.renderState)}hasValue(a){return this.values.has(a)}getValue(a,s){if(this.props.values&&this.props.values[a])return this.props.values[a];let l=this.values.get(a);return l===void 0&&s!==void 0&&(l=Ya(s===null?void 0:s,{owner:this}),this.addValue(a,l)),l}readValue(a,s){let l=this.latestValues[a]!==void 0||!this.current?this.latestValues[a]:this.getBaseTargetFromProps(this.props,a)??this.readValueFromInstance(this.current,a,this.options);return l!=null&&(typeof l=="string"&&(dx(l)||hx(l))?l=parseFloat(l):!tE(l)&&cn.test(s)&&(l=ab(a,s)),this.setBaseTarget(a,yt(l)?l.get():l)),yt(l)?l.get():l}setBaseTarget(a,s){this.baseTarget[a]=s}getBaseTarget(a){var h;const{initial:s}=this.props;let l;if(typeof s=="string"||typeof s=="object"){const f=Df(this.props,s,(h=this.presenceContext)==null?void 0:h.custom);f&&(l=f[a])}if(s&&l!==void 0)return l;const u=this.getBaseTargetFromProps(this.props,a);return u!==void 0&&!yt(u)?u:this.initialValues[a]!==void 0&&l===void 0?void 0:this.baseTarget[a]}on(a,s){return this.events[a]||(this.events[a]=new gf),this.events[a].add(s)}notify(a,...s){this.events[a]&&this.events[a].notify(...s)}scheduleRenderMicrotask(){kf.render(this.render)}}class hb extends sE{constructor(){super(...arguments),this.KeyframeResolver=_2}sortInstanceNodePosition(a,s){return a.compareDocumentPosition(s)&2?1:-1}getBaseTargetFromProps(a,s){const l=a.style;return l?l[s]:void 0}removeValueFromRenderState(a,{vars:s,style:l}){delete s[a],delete l[a]}handleChildMotionValue(){this.childSubscription&&(this.childSubscription(),delete this.childSubscription);const{children:a}=this.props;yt(a)&&(this.childSubscription=a.on("change",s=>{this.current&&(this.current.textContent=`${s}`)}))}}class Sr{constructor(a){this.isMounted=!1,this.node=a}update(){}}function mb({top:n,left:a,right:s,bottom:l}){return{x:{min:a,max:s},y:{min:n,max:l}}}function lE({x:n,y:a}){return{top:a.min,right:n.max,bottom:a.max,left:n.min}}function oE(n,a){if(!a)return n;const s=a({x:n.left,y:n.top}),l=a({x:n.right,y:n.bottom});return{top:s.y,left:s.x,bottom:l.y,right:l.x}}function rd(n){return n===void 0||n===1}function Yd({scale:n,scaleX:a,scaleY:s}){return!rd(n)||!rd(a)||!rd(s)}function qr(n){return Yd(n)||pb(n)||n.z||n.rotate||n.rotateX||n.rotateY||n.skewX||n.skewY}function pb(n){return _y(n.x)||_y(n.y)}function _y(n){return n&&n!=="0%"}function lo(n,a,s){const l=n-s,u=a*l;return s+u}function Vy(n,a,s,l,u){return u!==void 0&&(n=lo(n,u,l)),lo(n,s,l)+a}function Pd(n,a=0,s=1,l,u){n.min=Vy(n.min,a,s,l,u),n.max=Vy(n.max,a,s,l,u)}function gb(n,{x:a,y:s}){Pd(n.x,a.translate,a.scale,a.originPoint),Pd(n.y,s.translate,s.scale,s.originPoint)}const By=.999999999999,Ly=1.0000000000001;function cE(n,a,s,l=!1){var m;const u=s.length;if(!u)return;a.x=a.y=1;let h,f;for(let p=0;p<u;p++){h=s[p],f=h.projectionDelta;const{visualElement:g}=h.options;g&&g.props.style&&g.props.style.display==="contents"||(l&&h.options.layoutScroll&&h.scroll&&h!==h.root&&(yn(n.x,-h.scroll.offset.x),yn(n.y,-h.scroll.offset.y)),f&&(a.x*=f.x.scale,a.y*=f.y.scale,gb(n,f)),l&&qr(h.latestValues)&&$l(n,h.latestValues,(m=h.layout)==null?void 0:m.layoutBox))}a.x<Ly&&a.x>By&&(a.x=1),a.y<Ly&&a.y>By&&(a.y=1)}function yn(n,a){n.min+=a,n.max+=a}function Uy(n,a,s,l,u=.5){const h=qe(n.min,n.max,u);Pd(n,a,s,h,l)}function Hy(n,a){return typeof n=="string"?parseFloat(n)/100*(a.max-a.min):n}function $l(n,a,s){const l=s??n;Uy(n.x,Hy(a.x,l.x),a.scaleX,a.scale,a.originX),Uy(n.y,Hy(a.y,l.y),a.scaleY,a.scale,a.originY)}function yb(n,a){return mb(oE(n.getBoundingClientRect(),a))}function uE(n,a,s){const l=yb(n,s),{scroll:u}=a;return u&&(yn(l.x,u.offset.x),yn(l.y,u.offset.y)),l}const dE={x:"translateX",y:"translateY",z:"translateZ",transformPerspective:"perspective"},fE=Fa.length;function hE(n,a,s){let l="",u=!0;for(let f=0;f<fE;f++){const m=Fa[f],p=n[m];if(p===void 0)continue;let g=!0;if(typeof p=="number")g=p===(m.startsWith("scale")?1:0);else{const v=parseFloat(p);g=m.startsWith("scale")?v===1:v===0}if(!g||s){const v=qd(p,ao[m]);if(!g){u=!1;const x=dE[m]||m;l+=`${x}(${v}) `}s&&(a[m]=v)}}const h=n.pathRotation;return h&&(u=!1,l+=`rotate(${qd(h,ao.pathRotation)}) `),l=l.trim(),s?l=s(a,u?"":l):u&&(l="none"),l}function Bf(n,a,s){const{style:l,vars:u,transformOrigin:h}=n;let f=!1,m=!1;for(const p in a){const g=a[p];if(Xa.has(p)){f=!0;continue}else if(Dx(p)){u[p]=g;continue}else{const v=qd(g,ao[p]);p.startsWith("origin")?(m=!0,h[p]=v):l[p]=v}}if(a.transform||(f||s?l.transform=hE(a,n.transform,s):l.transform&&(l.transform="none")),m){const{originX:p="50%",originY:g="50%",originZ:v=0}=h;l.transformOrigin=`${p} ${g} ${v}`}}function vb(n,{style:a,vars:s},l,u){const h=n.style;let f;for(f in a)h[f]=a[f];u==null||u.applyProjectionStyles(h,l);for(f in s)h.setProperty(f,s[f])}function qy(n,a){return a.max===a.min?0:n/(a.max-a.min)*100}const Pi={correct:(n,a)=>{if(!a.target)return n;if(typeof n=="string")if(ve.test(n))n=parseFloat(n);else return n;const s=qy(n,a.target.x),l=qy(n,a.target.y);return`${s}% ${l}%`}},mE={correct:(n,{treeScale:a,projectionDelta:s})=>{const l=n,u=cn.parse(n);if(u.length>5)return l;const h=cn.createTransformer(n),f=typeof u[0]!="number"?1:0,m=s.x.scale*a.x,p=s.y.scale*a.y;u[0+f]/=m,u[1+f]/=p;const g=qe(m,p,.5);return typeof u[2+f]=="number"&&(u[2+f]/=g),typeof u[3+f]=="number"&&(u[3+f]/=g),h(u)}},Gd={borderRadius:{...Pi,applyTo:[...Mf]},borderTopLeftRadius:Pi,borderTopRightRadius:Pi,borderBottomLeftRadius:Pi,borderBottomRightRadius:Pi,boxShadow:mE};function xb(n,{layout:a,layoutId:s}){return Xa.has(n)||n.startsWith("origin")||(a||s!==void 0)&&(!!Gd[n]||n==="opacity")}function Lf(n,a,s){var f;const l=n.style,u=a==null?void 0:a.style,h={};if(!l)return h;for(const m in l)(yt(l[m])||u&&yt(u[m])||xb(m,n)||((f=s==null?void 0:s.getValue(m))==null?void 0:f.liveStyle)!==void 0)&&(h[m]=l[m]);return h}function pE(n){return window.getComputedStyle(n)}class gE extends hb{constructor(){super(...arguments),this.type="html",this.renderInstance=vb}mount(a){jo(!!a.style),super.mount(a)}readValueFromInstance(a,s){var l;if(Xa.has(s))return(l=this.projection)!=null&&l.isProjecting?Md(s):Bw(a,s);{const u=pE(a),h=(Dx(s)?u.getPropertyValue(s):u[s])||0;return typeof h=="string"?h.trim():h}}measureInstanceViewportBox(a,{transformPagePoint:s}){return yb(a,s)}build(a,s,l){Bf(a,s,l.transformTemplate)}scrapeMotionValuesFromProps(a,s,l){return Lf(a,s,l)}}const yE={offset:"stroke-dashoffset",array:"stroke-dasharray"},vE={offset:"strokeDashoffset",array:"strokeDasharray"};function xE(n,a,s=1,l=0,u=!0){n.pathLength=1;const h=u?yE:vE;n[h.offset]=`${-l}`,n[h.array]=`${a} ${s}`}const bE=["offsetDistance","offsetPath","offsetRotate","offsetAnchor"];function bb(n,{attrX:a,attrY:s,attrScale:l,pathLength:u,pathSpacing:h=1,pathOffset:f=0,...m},p,g,v){if(Bf(n,m,g),p){n.style.viewBox&&(n.attrs.viewBox=n.style.viewBox);return}n.attrs=n.style,n.style={};const{attrs:x,style:b}=n;x.transform&&(b.transform=x.transform,delete x.transform),(b.transform||x.transformOrigin)&&(b.transformOrigin=x.transformOrigin??"50% 50%",delete x.transformOrigin),b.transform&&(b.transformBox=(v==null?void 0:v.transformBox)??"fill-box",delete x.transformBox);for(const E of bE)x[E]!==void 0&&(b[E]=x[E],delete x[E]);a!==void 0&&(x.x=a),s!==void 0&&(x.y=s),l!==void 0&&(x.scale=l),u!==void 0&&xE(x,u,h,f,!1)}const Sb=new Set(["baseFrequency","diffuseConstant","kernelMatrix","kernelUnitLength","keySplines","keyTimes","limitingConeAngle","markerHeight","markerWidth","numOctaves","targetX","targetY","surfaceScale","specularConstant","specularExponent","stdDeviation","tableValues","viewBox","gradientTransform","pathLength","startOffset","textLength","lengthAdjust"]),jb=n=>typeof n=="string"&&n.toLowerCase()==="svg";function SE(n,a,s,l){vb(n,a,void 0,l);for(const u in a.attrs)n.setAttribute(Sb.has(u)?u:Af(u),a.attrs[u])}function wb(n,a,s){const l=Lf(n,a,s);for(const u in n)if(yt(n[u])||yt(a[u])){const h=Fa.indexOf(u)!==-1?"attr"+u.charAt(0).toUpperCase()+u.substring(1):u;l[h]=n[u]}return l}class jE extends hb{constructor(){super(...arguments),this.type="svg",this.isSVGTag=!1,this.measureInstanceViewportBox=st}getBaseTargetFromProps(a,s){return a[s]}readValueFromInstance(a,s){if(Xa.has(s)){const l=rb(s);return l&&l.default||0}return s=Sb.has(s)?s:Af(s),a.getAttribute(s)}scrapeMotionValuesFromProps(a,s,l){return wb(a,s,l)}build(a,s,l){bb(a,s,this.isSVGTag,l.transformTemplate,l.style)}renderInstance(a,s,l,u){SE(a,s,l,u)}mount(a){this.isSVGTag=jb(a.tagName),super.mount(a)}}const wE=_f.length;function Eb(n){if(!n)return;if(!n.isControllingVariants){const s=n.parent?Eb(n.parent)||{}:{};return n.props.initial!==void 0&&(s.initial=n.props.initial),s}const a={};for(let s=0;s<wE;s++){const l=_f[s],u=n.props[l];(es(u)||u===!1)&&(a[l]=u)}return a}function Tb(n,a){if(!Array.isArray(a))return!1;const s=a.length;if(s!==n.length)return!1;for(let l=0;l<s;l++)if(a[l]!==n[l])return!1;return!0}const EE=[...zf].reverse(),TE=zf.length;function CE(n){return a=>Promise.all(a.map(({animation:s,options:l})=>E2(n,s,l)))}function NE(n){let a=CE(n),s=Yy(),l=!0,u=!1;const h=g=>(v,x)=>{var E;const b=Fr(n,x,g==="exit"?(E=n.presenceContext)==null?void 0:E.custom:void 0);if(b){const{transition:w,transitionEnd:N,...T}=b;v={...v,...T,...N}}return v};function f(g){a=g(n)}function m(g){const{props:v}=n,x=Eb(n.parent)||{},b=[],E=new Set;let w={},N=1/0;for(let A=0;A<TE;A++){const D=EE[A],_=s[D],O=v[D]!==void 0?v[D]:x[D],U=es(O),H=D===g?_.isActive:null;H===!1&&(N=A);let M=O===x[D]&&O!==v[D]&&U;if(M&&(l||u)&&n.manuallyAnimateOnMount&&(M=!1),_.protectedKeys={...w},!_.isActive&&H===null||!O&&!_.prevProp||Eo(O)||typeof O=="boolean")continue;if(D==="exit"&&_.isActive&&H!==!0){_.prevResolvedValues&&(w={...w,..._.prevResolvedValues});continue}const R=DE(_.prevProp,O);let V=R||D===g&&_.isActive&&!M&&U||A>N&&U,K=!1;const Q=Array.isArray(O)?O:[O];let ie=Q.reduce(h(D),{});H===!1&&(ie={});const{prevResolvedValues:J={}}=_,G={...J,...ie},de=W=>{V=!0,E.has(W)&&(K=!0,E.delete(W)),_.needsAnimating[W]=!0;const Y=n.getValue(W);Y&&(Y.liveStyle=!1)};for(const W in G){const Y=ie[W],te=J[W];if(w.hasOwnProperty(W))continue;let C=!1;Vd(Y)&&Vd(te)?C=!Tb(Y,te)||R:C=Y!==te,C?Y!=null?de(W):E.add(W):Y!==void 0&&E.has(W)?de(W):_.protectedKeys[W]=!0}_.prevProp=O,_.prevResolvedValues=ie,_.isActive&&(w={...w,...ie}),(l||u)&&n.blockInitialAnimation&&(V=!1);const L=M&&R;V&&(!L||K)&&b.push(...Q.map(W=>{const Y={type:D};if(typeof W=="string"&&(l||u)&&!L&&n.manuallyAnimateOnMount&&n.parent){const{parent:te}=n,C=Fr(te,W);if(te.enteringChildren&&C){const{delayChildren:z}=C.transition||{};Y.delay=Kx(te.enteringChildren,n,z)}}return{animation:W,options:Y}}))}if(E.size){const A={};if(typeof v.initial!="boolean"){const D=Fr(n,Array.isArray(v.initial)?v.initial[0]:v.initial);D&&D.transition&&(A.transition=D.transition)}E.forEach(D=>{const _=n.getBaseTarget(D),O=n.getValue(D);O&&(O.liveStyle=!0),A[D]=_??null}),b.push({animation:A})}let T=!!b.length;return l&&(v.initial===!1||v.initial===v.animate)&&!n.manuallyAnimateOnMount&&(T=!1),l=!1,u=!1,T?a(b):Promise.resolve()}function p(g,v){var b;if(s[g].isActive===v)return Promise.resolve();(b=n.variantChildren)==null||b.forEach(E=>{var w;return(w=E.animationState)==null?void 0:w.setActive(g,v)}),s[g].isActive=v;const x=m(g);for(const E in s)s[E].protectedKeys={};return x}return{animateChanges:m,setActive:p,setAnimateFunction:f,getState:()=>s,reset:()=>{s=Yy(),u=!0}}}function DE(n,a){return typeof a=="string"?a!==n:Array.isArray(a)?!Tb(a,n):!1}function Hr(n=!1){return{isActive:n,protectedKeys:{},needsAnimating:{},prevResolvedValues:{}}}function Yy(){return{animate:Hr(!0),whileInView:Hr(),whileHover:Hr(),whileTap:Hr(),whileDrag:Hr(),whileFocus:Hr(),exit:Hr()}}function Fd(n,a){n.min=a.min,n.max=a.max}function ln(n,a){Fd(n.x,a.x),Fd(n.y,a.y)}function Py(n,a){n.translate=a.translate,n.scale=a.scale,n.originPoint=a.originPoint,n.origin=a.origin}const Cb=1e-4,AE=1-Cb,ME=1+Cb,Nb=.01,kE=0-Nb,RE=0+Nb;function St(n){return n.max-n.min}function OE(n,a,s){return Math.abs(n-a)<=s}function Gy(n,a,s,l=.5){n.origin=l,n.originPoint=qe(a.min,a.max,n.origin),n.scale=St(s)/St(a),n.translate=qe(s.min,s.max,n.origin)-n.originPoint,(n.scale>=AE&&n.scale<=ME||isNaN(n.scale))&&(n.scale=1),(n.translate>=kE&&n.translate<=RE||isNaN(n.translate))&&(n.translate=0)}function Zi(n,a,s,l){Gy(n.x,a.x,s.x,l?l.originX:void 0),Gy(n.y,a.y,s.y,l?l.originY:void 0)}function Fy(n,a,s,l=0){const u=l?qe(s.min,s.max,l):s.min;n.min=u+a.min,n.max=n.min+St(a)}function zE(n,a,s,l){Fy(n.x,a.x,s.x,l==null?void 0:l.x),Fy(n.y,a.y,s.y,l==null?void 0:l.y)}function Xy(n,a,s,l=0){const u=l?qe(s.min,s.max,l):s.min;n.min=a.min-u,n.max=n.min+St(a)}function oo(n,a,s,l){Xy(n.x,a.x,s.x,l==null?void 0:l.x),Xy(n.y,a.y,s.y,l==null?void 0:l.y)}function $y(n,a,s,l,u){return n-=a,n=lo(n,1/s,l),u!==void 0&&(n=lo(n,1/u,l)),n}function _E(n,a=0,s=1,l=.5,u,h=n,f=n){if(xn.test(a)&&(a=parseFloat(a),a=qe(f.min,f.max,a/100)-f.min),typeof a!="number")return;let m=qe(h.min,h.max,l);n===h&&(m-=a),n.min=$y(n.min,a,s,m,u),n.max=$y(n.max,a,s,m,u)}function Ky(n,a,[s,l,u],h,f){_E(n,a[s],a[l],a[u],a.scale,h,f)}const VE=["x","scaleX","originX"],BE=["y","scaleY","originY"];function Zy(n,a,s,l){Ky(n.x,a,VE,s?s.x:void 0,l?l.x:void 0),Ky(n.y,a,BE,s?s.y:void 0,l?l.y:void 0)}function Qy(n){return n.translate===0&&n.scale===1}function Db(n){return Qy(n.x)&&Qy(n.y)}function Jy(n,a){return n.min===a.min&&n.max===a.max}function LE(n,a){return Jy(n.x,a.x)&&Jy(n.y,a.y)}function Wy(n,a){return Math.round(n.min)===Math.round(a.min)&&Math.round(n.max)===Math.round(a.max)}function Ab(n,a){return Wy(n.x,a.x)&&Wy(n.y,a.y)}function Iy(n){return St(n.x)/St(n.y)}function ev(n,a){return n.translate===a.translate&&n.scale===a.scale&&n.originPoint===a.originPoint}function gn(n){return[n("x"),n("y")]}function UE(n,a,s){let l="";const u=n.x.translate/a.x,h=n.y.translate/a.y,f=(s==null?void 0:s.z)||0;if((u||h||f)&&(l=`translate3d(${u}px, ${h}px, ${f}px) `),(a.x!==1||a.y!==1)&&(l+=`scale(${1/a.x}, ${1/a.y}) `),s){const{transformPerspective:g,rotate:v,pathRotation:x,rotateX:b,rotateY:E,skewX:w,skewY:N}=s;g&&(l=`perspective(${g}px) ${l}`),v&&(l+=`rotate(${v}deg) `),x&&(l+=`rotate(${x}deg) `),b&&(l+=`rotateX(${b}deg) `),E&&(l+=`rotateY(${E}deg) `),w&&(l+=`skewX(${w}deg) `),N&&(l+=`skewY(${N}deg) `)}const m=n.x.scale*a.x,p=n.y.scale*a.y;return(m!==1||p!==1)&&(l+=`scale(${m}, ${p})`),l||"none"}const HE=Mf.length,tv=n=>typeof n=="string"?parseFloat(n):n,nv=n=>typeof n=="number"||ve.test(n);function qE(n,a,s,l,u,h){u?(n.opacity=qe(0,s.opacity??1,YE(l)),n.opacityExit=qe(a.opacity??1,0,PE(l))):h&&(n.opacity=qe(a.opacity??1,s.opacity??1,l));for(let f=0;f<HE;f++){const m=Mf[f];let p=rv(a,m),g=rv(s,m);if(p===void 0&&g===void 0)continue;p||(p=0),g||(g=0),p===0||g===0||nv(p)===nv(g)?(n[m]=Math.max(qe(tv(p),tv(g),l),0),(xn.test(g)||xn.test(p))&&(n[m]+="%")):n[m]=g}(a.rotate||s.rotate)&&(n.rotate=qe(a.rotate||0,s.rotate||0,l))}function rv(n,a){return n[a]!==void 0?n[a]:n.borderRadius}const YE=Mb(0,.5,jx),PE=Mb(.5,.95,en);function Mb(n,a,s){return l=>l<n?0:l>a?1:s(Wi(n,a,l))}function GE(n,a,s){const l=yt(n)?n:Ya(n);return l.start(Nf("",l,a,s)),l.animation}function ts(n,a,s,l={passive:!0}){return n.addEventListener(a,s,l),()=>n.removeEventListener(a,s,l)}const FE=(n,a)=>n.depth-a.depth;class XE{constructor(){this.children=[],this.isDirty=!1}add(a){pf(this.children,a),this.isDirty=!0}remove(a){Il(this.children,a),this.isDirty=!0}forEach(a){this.isDirty&&this.children.sort(FE),this.isDirty=!1,this.children.forEach(a)}}function $E(n,a){const s=bt.now(),l=({timestamp:u})=>{const h=u-s;h>=a&&(xr(l),n(h-a))};return Ye.setup(l,!0),()=>xr(l)}function Kl(n){return yt(n)?n.get():n}class KE{constructor(){this.members=[]}add(a){pf(this.members,a);for(let s=this.members.length-1;s>=0;s--){const l=this.members[s];if(l===a||l===this.lead||l===this.prevLead)continue;const u=l.instance;(!u||u.isConnected===!1)&&!l.snapshot&&(Il(this.members,l),l.unmount())}a.scheduleRender()}remove(a){if(Il(this.members,a),a===this.prevLead&&(this.prevLead=void 0),a===this.lead){const s=this.members[this.members.length-1];s&&this.promote(s)}}relegate(a){var s;for(let l=this.members.indexOf(a)-1;l>=0;l--){const u=this.members[l];if(u.isPresent!==!1&&((s=u.instance)==null?void 0:s.isConnected)!==!1)return this.promote(u),!0}return!1}promote(a,s){var u;const l=this.lead;if(a!==l&&(this.prevLead=l,this.lead=a,a.show(),l)){l.updateSnapshot(),a.scheduleRender();const{layoutDependency:h}=l.options,{layoutDependency:f}=a.options;(h===void 0||h!==f)&&(a.resumeFrom=l,s&&(l.preserveOpacity=!0),l.snapshot&&(a.snapshot=l.snapshot,a.snapshot.latestValues=l.animationValues||l.latestValues),(u=a.root)!=null&&u.isUpdating&&(a.isLayoutDirty=!0)),a.options.crossfade===!1&&l.hide()}}exitAnimationComplete(){this.members.forEach(a=>{var s,l,u,h,f;(l=(s=a.options).onExitComplete)==null||l.call(s),(f=(u=a.resumingFrom)==null?void 0:(h=u.options).onExitComplete)==null||f.call(h)})}scheduleRender(){this.members.forEach(a=>a.instance&&a.scheduleRender(!1))}removeLeadSnapshot(){var a;(a=this.lead)!=null&&a.snapshot&&(this.lead.snapshot=void 0)}}const Zl={hasAnimatedSinceResize:!0,hasEverUpdated:!1},ad=["","X","Y","Z"],ZE=1e3;let QE=0;function id(n,a,s,l){const{latestValues:u}=a;u[n]&&(s[n]=u[n],a.setStaticValue(n,0),l&&(l[n]=0))}function kb(n){if(n.hasCheckedOptimisedAppear=!0,n.root===n)return;const{visualElement:a}=n.options;if(!a)return;const s=Ix(a);if(window.MotionHasOptimisedAnimation(s,"transform")){const{layout:u,layoutId:h}=n.options;window.MotionCancelOptimisedAnimation(s,"transform",Ye,!(u||h))}const{parent:l}=n;l&&!l.hasCheckedOptimisedAppear&&kb(l)}function Rb({attachResizeListener:n,defaultParent:a,measureScroll:s,checkIsScrollRoot:l,resetTransform:u}){return class{constructor(f={},m=a==null?void 0:a()){this.id=QE++,this.animationId=0,this.animationCommitId=0,this.children=new Set,this.options={},this.isTreeAnimating=!1,this.isAnimationBlocked=!1,this.isLayoutDirty=!1,this.isProjectionDirty=!1,this.isSharedProjectionDirty=!1,this.isTransformDirty=!1,this.updateManuallyBlocked=!1,this.updateBlockedByResize=!1,this.isUpdating=!1,this.isSVG=!1,this.needsReset=!1,this.shouldResetTransform=!1,this.hasCheckedOptimisedAppear=!1,this.treeScale={x:1,y:1},this.eventHandlers=new Map,this.hasTreeAnimated=!1,this.layoutVersion=0,this.updateScheduled=!1,this.scheduleUpdate=()=>this.update(),this.projectionUpdateScheduled=!1,this.checkUpdateFailed=()=>{this.isUpdating&&(this.isUpdating=!1,this.clearAllSnapshots())},this.updateProjection=()=>{this.projectionUpdateScheduled=!1,this.nodes.forEach(IE),this.nodes.forEach(iT),this.nodes.forEach(sT),this.nodes.forEach(eT)},this.resolvedRelativeTargetAt=0,this.linkedParentVersion=0,this.hasProjected=!1,this.isVisible=!0,this.animationProgress=0,this.sharedNodes=new Map,this.latestValues=f,this.root=m?m.root||m:this,this.path=m?[...m.path,m]:[],this.parent=m,this.depth=m?m.depth+1:0;for(let p=0;p<this.path.length;p++)this.path[p].shouldResetTransform=!0;this.root===this&&(this.nodes=new XE)}addEventListener(f,m){return this.eventHandlers.has(f)||this.eventHandlers.set(f,new gf),this.eventHandlers.get(f).add(m)}notifyListeners(f,...m){const p=this.eventHandlers.get(f);p&&p.notify(...m)}hasListeners(f){return this.eventHandlers.has(f)}mount(f){if(this.instance)return;this.isSVG=Of(f)&&!I2(f),this.instance=f;const{layoutId:m,layout:p,visualElement:g}=this.options;if(g&&!g.current&&g.mount(f),this.root.nodes.add(this),this.parent&&this.parent.children.add(this),this.root.hasTreeAnimated&&(p||m)&&(this.isLayoutDirty=!0),n){let v,x=0;const b=()=>this.root.updateBlockedByResize=!1;Ye.read(()=>{x=window.innerWidth}),n(f,()=>{const E=window.innerWidth;E!==x&&(x=E,this.root.updateBlockedByResize=!0,v&&v(),v=$E(b,250),Zl.hasAnimatedSinceResize&&(Zl.hasAnimatedSinceResize=!1,this.nodes.forEach(sv)))})}m&&this.root.registerSharedNode(m,this),this.options.animate!==!1&&g&&(m||p)&&this.addEventListener("didUpdate",({delta:v,hasLayoutChanged:x,hasRelativeLayoutChanged:b,layout:E})=>{if(this.isTreeAnimationBlocked()){this.target=void 0,this.relativeTarget=void 0;return}const w=this.options.transition||g.getDefaultTransition()||dT,{onLayoutAnimationStart:N,onLayoutAnimationComplete:T}=g.getProps(),A=!this.targetLayout||!Ab(this.targetLayout,E),D=!x&&b;if(this.options.layoutRoot||this.resumeFrom||D||x&&(A||!this.currentAnimation)){this.resumeFrom&&(this.resumingFrom=this.resumeFrom,this.resumingFrom.resumingFrom=void 0);const _={...Cf(w,"layout"),onPlay:N,onComplete:T};(g.shouldReduceMotion||this.options.layoutRoot)&&(_.delay=0,_.type=!1),this.startAnimation(_),this.setAnimationOrigin(v,D,_.path)}else x||sv(this),this.isLead()&&this.options.onExitComplete&&this.options.onExitComplete();this.targetLayout=E})}unmount(){this.options.layoutId&&this.willUpdate(),this.root.nodes.remove(this);const f=this.getStack();f&&f.remove(this),this.parent&&this.parent.children.delete(this),this.instance=void 0,this.eventHandlers.clear(),xr(this.updateProjection)}blockUpdate(){this.updateManuallyBlocked=!0}unblockUpdate(){this.updateManuallyBlocked=!1}isUpdateBlocked(){return this.updateManuallyBlocked||this.updateBlockedByResize}isTreeAnimationBlocked(){return this.isAnimationBlocked||this.parent&&this.parent.isTreeAnimationBlocked()||!1}startUpdate(){this.isUpdateBlocked()||(this.isUpdating=!0,this.nodes&&this.nodes.forEach(lT),this.animationId++)}getTransformTemplate(){const{visualElement:f}=this.options;return f&&f.getProps().transformTemplate}willUpdate(f=!0){if(this.root.hasTreeAnimated=!0,this.root.isUpdateBlocked()){this.options.onExitComplete&&this.options.onExitComplete();return}if(window.MotionCancelOptimisedAnimation&&!this.hasCheckedOptimisedAppear&&kb(this),!this.root.isUpdating&&this.root.startUpdate(),this.isLayoutDirty)return;this.isLayoutDirty=!0;for(let v=0;v<this.path.length;v++){const x=this.path[v];x.shouldResetTransform=!0,(typeof x.latestValues.x=="string"||typeof x.latestValues.y=="string")&&(x.isLayoutDirty=!0),x.updateScroll("snapshot"),x.options.layoutRoot&&x.willUpdate(!1)}const{layoutId:m,layout:p}=this.options;if(m===void 0&&!p)return;const g=this.getTransformTemplate();this.prevTransformTemplateValue=g?g(this.latestValues,""):void 0,this.updateSnapshot(),f&&this.notifyListeners("willUpdate")}update(){if(this.updateScheduled=!1,this.isUpdateBlocked()){const p=this.updateBlockedByResize;this.unblockUpdate(),this.updateBlockedByResize=!1,this.clearAllSnapshots(),p&&this.nodes.forEach(nT),this.nodes.forEach(av);return}if(this.animationId<=this.animationCommitId){this.nodes.forEach(iv);return}this.animationCommitId=this.animationId,this.isUpdating?(this.isUpdating=!1,this.nodes.forEach(rT),this.nodes.forEach(aT),this.nodes.forEach(JE),this.nodes.forEach(WE)):this.nodes.forEach(iv),this.clearAllSnapshots();const m=bt.now();gt.delta=bn(0,1e3/60,m-gt.timestamp),gt.timestamp=m,gt.isProcessing=!0,Qu.update.process(gt),Qu.preRender.process(gt),Qu.render.process(gt),gt.isProcessing=!1}didUpdate(){this.updateScheduled||(this.updateScheduled=!0,kf.read(this.scheduleUpdate))}clearAllSnapshots(){this.nodes.forEach(tT),this.sharedNodes.forEach(oT)}scheduleUpdateProjection(){this.projectionUpdateScheduled||(this.projectionUpdateScheduled=!0,Ye.preRender(this.updateProjection,!1,!0))}scheduleCheckAfterUnmount(){Ye.postRender(()=>{this.isLayoutDirty?this.root.didUpdate():this.root.checkUpdateFailed()})}updateSnapshot(){this.snapshot||!this.instance||(this.snapshot=this.measure(),this.snapshot&&!St(this.snapshot.measuredBox.x)&&!St(this.snapshot.measuredBox.y)&&(this.snapshot=void 0))}updateLayout(){if(!this.instance||(this.updateScroll(),!(this.options.alwaysMeasureLayout&&this.isLead())&&!this.isLayoutDirty))return;if(this.resumeFrom&&!this.resumeFrom.instance)for(let p=0;p<this.path.length;p++)this.path[p].updateScroll();const f=this.layout;this.layout=this.measure(!1),this.layoutVersion++,this.layoutCorrected||(this.layoutCorrected=st()),this.isLayoutDirty=!1,this.projectionDelta=void 0,this.notifyListeners("measure",this.layout.layoutBox);const{visualElement:m}=this.options;m&&m.notify("LayoutMeasure",this.layout.layoutBox,f?f.layoutBox:void 0)}updateScroll(f="measure"){let m=!!(this.options.layoutScroll&&this.instance);if(this.scroll&&this.scroll.animationId===this.root.animationId&&this.scroll.phase===f&&(m=!1),m&&this.instance){const p=l(this.instance);this.scroll={animationId:this.root.animationId,phase:f,isRoot:p,offset:s(this.instance),wasRoot:this.scroll?this.scroll.isRoot:p}}}resetTransform(){if(!u)return;const f=this.isLayoutDirty||this.shouldResetTransform||this.options.alwaysMeasureLayout,m=this.projectionDelta&&!Db(this.projectionDelta),p=this.getTransformTemplate(),g=p?p(this.latestValues,""):void 0,v=g!==this.prevTransformTemplateValue;f&&this.instance&&(m||qr(this.latestValues)||v)&&(u(this.instance,g),this.shouldResetTransform=!1,this.scheduleRender())}measure(f=!0){const m=this.measurePageBox();let p=this.removeElementScroll(m);return f&&(p=this.removeTransform(p)),fT(p),{animationId:this.root.animationId,measuredBox:m,layoutBox:p,latestValues:{},source:this.id}}measurePageBox(){var g;const{visualElement:f}=this.options;if(!f)return st();const m=f.measureViewportBox();if(!(((g=this.scroll)==null?void 0:g.wasRoot)||this.path.some(hT))){const{scroll:v}=this.root;v&&(yn(m.x,v.offset.x),yn(m.y,v.offset.y))}return m}removeElementScroll(f){var p;const m=st();if(ln(m,f),(p=this.scroll)!=null&&p.wasRoot)return m;for(let g=0;g<this.path.length;g++){const v=this.path[g],{scroll:x,options:b}=v;v!==this.root&&x&&b.layoutScroll&&(x.wasRoot&&ln(m,f),yn(m.x,x.offset.x),yn(m.y,x.offset.y))}return m}applyTransform(f,m=!1,p){var v,x;const g=p||st();ln(g,f);for(let b=0;b<this.path.length;b++){const E=this.path[b];!m&&E.options.layoutScroll&&E.scroll&&E!==E.root&&(yn(g.x,-E.scroll.offset.x),yn(g.y,-E.scroll.offset.y)),qr(E.latestValues)&&$l(g,E.latestValues,(v=E.layout)==null?void 0:v.layoutBox)}return qr(this.latestValues)&&$l(g,this.latestValues,(x=this.layout)==null?void 0:x.layoutBox),g}removeTransform(f){var p;const m=st();ln(m,f);for(let g=0;g<this.path.length;g++){const v=this.path[g];if(!qr(v.latestValues))continue;let x;v.instance&&(Yd(v.latestValues)&&v.updateSnapshot(),x=st(),ln(x,v.measurePageBox())),Zy(m,v.latestValues,(p=v.snapshot)==null?void 0:p.layoutBox,x)}return qr(this.latestValues)&&Zy(m,this.latestValues),m}setTargetDelta(f){this.targetDelta=f,this.root.scheduleUpdateProjection(),this.isProjectionDirty=!0}setOptions(f){this.options={...this.options,...f,crossfade:f.crossfade!==void 0?f.crossfade:!0}}clearMeasurements(){this.scroll=void 0,this.layout=void 0,this.snapshot=void 0,this.prevTransformTemplateValue=void 0,this.targetDelta=void 0,this.target=void 0,this.isLayoutDirty=!1}forceRelativeParentToResolveTarget(){this.relativeParent&&this.relativeParent.resolvedRelativeTargetAt!==gt.timestamp&&this.relativeParent.resolveTargetDelta(!0)}resolveTargetDelta(f=!1){var E;const m=this.getLead();this.isProjectionDirty||(this.isProjectionDirty=m.isProjectionDirty),this.isTransformDirty||(this.isTransformDirty=m.isTransformDirty),this.isSharedProjectionDirty||(this.isSharedProjectionDirty=m.isSharedProjectionDirty);const p=!!this.resumingFrom||this!==m;if(!(f||p&&this.isSharedProjectionDirty||this.isProjectionDirty||(E=this.parent)!=null&&E.isProjectionDirty||this.attemptToResolveRelativeTarget||this.root.updateBlockedByResize))return;const{layout:v,layoutId:x}=this.options;if(!this.layout||!(v||x))return;this.resolvedRelativeTargetAt=gt.timestamp;const b=this.getClosestProjectingParent();b&&this.linkedParentVersion!==b.layoutVersion&&!b.options.layoutRoot&&this.removeRelativeTarget(),!this.targetDelta&&!this.relativeTarget&&(this.options.layoutAnchor!==!1&&b&&b.layout?this.createRelativeTarget(b,this.layout.layoutBox,b.layout.layoutBox):this.removeRelativeTarget()),!(!this.relativeTarget&&!this.targetDelta)&&(this.target||(this.target=st(),this.targetWithTransforms=st()),this.relativeTarget&&this.relativeTargetOrigin&&this.relativeParent&&this.relativeParent.target?(this.forceRelativeParentToResolveTarget(),zE(this.target,this.relativeTarget,this.relativeParent.target,this.options.layoutAnchor||void 0)):this.targetDelta?(this.resumingFrom?this.applyTransform(this.layout.layoutBox,!1,this.target):ln(this.target,this.layout.layoutBox),gb(this.target,this.targetDelta)):ln(this.target,this.layout.layoutBox),this.attemptToResolveRelativeTarget&&(this.attemptToResolveRelativeTarget=!1,this.options.layoutAnchor!==!1&&b&&!!b.resumingFrom==!!this.resumingFrom&&!b.options.layoutScroll&&b.target&&this.animationProgress!==1?this.createRelativeTarget(b,this.target,b.target):this.relativeParent=this.relativeTarget=void 0))}getClosestProjectingParent(){if(!(!this.parent||Yd(this.parent.latestValues)||pb(this.parent.latestValues)))return this.parent.isProjecting()?this.parent:this.parent.getClosestProjectingParent()}isProjecting(){return!!((this.relativeTarget||this.targetDelta||this.options.layoutRoot)&&this.layout)}createRelativeTarget(f,m,p){this.relativeParent=f,this.linkedParentVersion=f.layoutVersion,this.forceRelativeParentToResolveTarget(),this.relativeTarget=st(),this.relativeTargetOrigin=st(),oo(this.relativeTargetOrigin,m,p,this.options.layoutAnchor||void 0),ln(this.relativeTarget,this.relativeTargetOrigin)}removeRelativeTarget(){this.relativeParent=this.relativeTarget=void 0}calcProjection(){var w;const f=this.getLead(),m=!!this.resumingFrom||this!==f;let p=!0;if((this.isProjectionDirty||(w=this.parent)!=null&&w.isProjectionDirty)&&(p=!1),m&&(this.isSharedProjectionDirty||this.isTransformDirty)&&(p=!1),this.resolvedRelativeTargetAt===gt.timestamp&&(p=!1),p)return;const{layout:g,layoutId:v}=this.options;if(this.isTreeAnimating=!!(this.parent&&this.parent.isTreeAnimating||this.currentAnimation||this.pendingAnimation),this.isTreeAnimating||(this.targetDelta=this.relativeTarget=void 0),!this.layout||!(g||v))return;ln(this.layoutCorrected,this.layout.layoutBox);const x=this.treeScale.x,b=this.treeScale.y;cE(this.layoutCorrected,this.treeScale,this.path,m),f.layout&&!f.target&&(this.treeScale.x!==1||this.treeScale.y!==1)&&(f.target=f.layout.layoutBox,f.targetWithTransforms=st());const{target:E}=f;if(!E){this.prevProjectionDelta&&(this.createProjectionDeltas(),this.scheduleRender());return}!this.projectionDelta||!this.prevProjectionDelta?this.createProjectionDeltas():(Py(this.prevProjectionDelta.x,this.projectionDelta.x),Py(this.prevProjectionDelta.y,this.projectionDelta.y)),Zi(this.projectionDelta,this.layoutCorrected,E,this.latestValues),(this.treeScale.x!==x||this.treeScale.y!==b||!ev(this.projectionDelta.x,this.prevProjectionDelta.x)||!ev(this.projectionDelta.y,this.prevProjectionDelta.y))&&(this.hasProjected=!0,this.scheduleRender(),this.notifyListeners("projectionUpdate",E))}hide(){this.isVisible=!1}show(){this.isVisible=!0}scheduleRender(f=!0){var m;if((m=this.options.visualElement)==null||m.scheduleRender(),f){const p=this.getStack();p&&p.scheduleRender()}this.resumingFrom&&!this.resumingFrom.instance&&(this.resumingFrom=void 0)}createProjectionDeltas(){this.prevProjectionDelta=Ua(),this.projectionDelta=Ua(),this.projectionDeltaWithTransform=Ua()}setAnimationOrigin(f,m=!1,p){const g=this.snapshot,v=g?g.latestValues:{},x={...this.latestValues},b=Ua();(!this.relativeParent||!this.relativeParent.options.layoutRoot)&&(this.relativeTarget=this.relativeTargetOrigin=void 0),this.attemptToResolveRelativeTarget=!m;const E=st(),w=g?g.source:void 0,N=this.layout?this.layout.source:void 0,T=w!==N,A=this.getStack(),D=!A||A.members.length<=1,_=!!(T&&!D&&this.options.crossfade===!0&&!this.path.some(uT));this.animationProgress=0;let O;const U=p==null?void 0:p.interpolateProjection(f);this.mixTargetDelta=H=>{const M=H/1e3,R=U==null?void 0:U(M);R?(b.x.translate=R.x,b.x.scale=qe(f.x.scale,1,M),b.x.origin=f.x.origin,b.x.originPoint=f.x.originPoint,b.y.translate=R.y,b.y.scale=qe(f.y.scale,1,M),b.y.origin=f.y.origin,b.y.originPoint=f.y.originPoint):(lv(b.x,f.x,M),lv(b.y,f.y,M)),this.setTargetDelta(b),this.relativeTarget&&this.relativeTargetOrigin&&this.layout&&this.relativeParent&&this.relativeParent.layout&&(oo(E,this.layout.layoutBox,this.relativeParent.layout.layoutBox,this.options.layoutAnchor||void 0),cT(this.relativeTarget,this.relativeTargetOrigin,E,M),O&&LE(this.relativeTarget,O)&&(this.isProjectionDirty=!1),O||(O=st()),ln(O,this.relativeTarget)),T&&(this.animationValues=x,qE(x,v,this.latestValues,M,_,D)),R&&R.rotate!==void 0&&(this.animationValues||(this.animationValues=x),this.animationValues.pathRotation=R.rotate),this.root.scheduleUpdateProjection(),this.scheduleRender(),this.animationProgress=M},this.mixTargetDelta(this.options.layoutRoot?1e3:0)}startAnimation(f){var m,p,g;this.notifyListeners("animationStart"),(m=this.currentAnimation)==null||m.stop(),(g=(p=this.resumingFrom)==null?void 0:p.currentAnimation)==null||g.stop(),this.pendingAnimation&&(xr(this.pendingAnimation),this.pendingAnimation=void 0),this.pendingAnimation=Ye.update(()=>{Zl.hasAnimatedSinceResize=!0,this.motionValue||(this.motionValue=Ya(0)),this.motionValue.jump(0,!1),this.currentAnimation=GE(this.motionValue,[0,1e3],{...f,velocity:0,isSync:!0,onUpdate:v=>{this.mixTargetDelta(v),f.onUpdate&&f.onUpdate(v)},onComplete:()=>{f.onComplete&&f.onComplete(),this.completeAnimation()}}),this.resumingFrom&&(this.resumingFrom.currentAnimation=this.currentAnimation),this.pendingAnimation=void 0})}completeAnimation(){this.resumingFrom&&(this.resumingFrom.currentAnimation=void 0,this.resumingFrom.preserveOpacity=void 0);const f=this.getStack();f&&f.exitAnimationComplete(),this.resumingFrom=this.currentAnimation=this.animationValues=void 0,this.notifyListeners("animationComplete")}finishAnimation(){this.currentAnimation&&(this.mixTargetDelta&&this.mixTargetDelta(ZE),this.currentAnimation.stop()),this.completeAnimation()}applyTransformsToTarget(){const f=this.getLead();let{targetWithTransforms:m,target:p,layout:g,latestValues:v}=f;if(!(!m||!p||!g)){if(this!==f&&this.layout&&g&&Ob(this.options.animationType,this.layout.layoutBox,g.layoutBox)){p=this.target||st();const x=St(this.layout.layoutBox.x);p.x.min=f.target.x.min,p.x.max=p.x.min+x;const b=St(this.layout.layoutBox.y);p.y.min=f.target.y.min,p.y.max=p.y.min+b}ln(m,p),$l(m,v),Zi(this.projectionDeltaWithTransform,this.layoutCorrected,m,v)}}registerSharedNode(f,m){this.sharedNodes.has(f)||this.sharedNodes.set(f,new KE),this.sharedNodes.get(f).add(m);const g=m.options.initialPromotionConfig;m.promote({transition:g?g.transition:void 0,preserveFollowOpacity:g&&g.shouldPreserveFollowOpacity?g.shouldPreserveFollowOpacity(m):void 0})}isLead(){const f=this.getStack();return f?f.lead===this:!0}getLead(){var m;const{layoutId:f}=this.options;return f?((m=this.getStack())==null?void 0:m.lead)||this:this}getPrevLead(){var m;const{layoutId:f}=this.options;return f?(m=this.getStack())==null?void 0:m.prevLead:void 0}getStack(){const{layoutId:f}=this.options;if(f)return this.root.sharedNodes.get(f)}promote({needsReset:f,transition:m,preserveFollowOpacity:p}={}){const g=this.getStack();g&&g.promote(this,p),f&&(this.projectionDelta=void 0,this.needsReset=!0),m&&this.setOptions({transition:m})}relegate(){const f=this.getStack();return f?f.relegate(this):!1}resetSkewAndRotation(){const{visualElement:f}=this.options;if(!f)return;let m=!1;const{latestValues:p}=f;if((p.z||p.rotate||p.rotateX||p.rotateY||p.rotateZ||p.skewX||p.skewY)&&(m=!0),!m)return;const g={};p.z&&id("z",f,g,this.animationValues);for(let v=0;v<ad.length;v++)id(`rotate${ad[v]}`,f,g,this.animationValues),id(`skew${ad[v]}`,f,g,this.animationValues);f.render();for(const v in g)f.setStaticValue(v,g[v]),this.animationValues&&(this.animationValues[v]=g[v]);f.scheduleRender()}applyProjectionStyles(f,m){if(!this.instance||this.isSVG)return;if(!this.isVisible){f.visibility="hidden";return}const p=this.getTransformTemplate();if(this.needsReset){this.needsReset=!1,f.visibility="",f.opacity="",f.pointerEvents=Kl(m==null?void 0:m.pointerEvents)||"",f.transform=p?p(this.latestValues,""):"none";return}const g=this.getLead();if(!this.projectionDelta||!this.layout||!g.target){this.options.layoutId&&(f.opacity=this.latestValues.opacity!==void 0?this.latestValues.opacity:1,f.pointerEvents=Kl(m==null?void 0:m.pointerEvents)||""),this.hasProjected&&!qr(this.latestValues)&&(f.transform=p?p({},""):"none",this.hasProjected=!1);return}f.visibility="";const v=g.animationValues||g.latestValues;this.applyTransformsToTarget();let x=UE(this.projectionDeltaWithTransform,this.treeScale,v);p&&(x=p(v,x)),f.transform=x;const{x:b,y:E}=this.projectionDelta;f.transformOrigin=`${b.origin*100}% ${E.origin*100}% 0`,g.animationValues?f.opacity=g===this?v.opacity??this.latestValues.opacity??1:this.preserveOpacity?this.latestValues.opacity:v.opacityExit:f.opacity=g===this?v.opacity!==void 0?v.opacity:"":v.opacityExit!==void 0?v.opacityExit:0;for(const w in Gd){if(v[w]===void 0)continue;const{correct:N,applyTo:T,isCSSVariable:A}=Gd[w],D=x==="none"?v[w]:N(v[w],g);if(T){const _=T.length;for(let O=0;O<_;O++)f[T[O]]=D}else A?this.options.visualElement.renderState.vars[w]=D:f[w]=D}this.options.layoutId&&(f.pointerEvents=g===this?Kl(m==null?void 0:m.pointerEvents)||"":"none")}clearSnapshot(){this.resumeFrom=this.snapshot=void 0}resetTree(){this.root.nodes.forEach(f=>{var m;return(m=f.currentAnimation)==null?void 0:m.stop()}),this.root.nodes.forEach(av),this.root.sharedNodes.clear()}}}function JE(n){n.updateLayout()}function WE(n){var s;const a=((s=n.resumeFrom)==null?void 0:s.snapshot)||n.snapshot;if(n.isLead()&&n.layout&&a&&n.hasListeners("didUpdate")){const{layoutBox:l,measuredBox:u}=n.layout,{animationType:h}=n.options,f=a.source!==n.layout.source;if(h==="size")gn(x=>{const b=f?a.measuredBox[x]:a.layoutBox[x],E=St(b);b.min=l[x].min,b.max=b.min+E});else if(h==="x"||h==="y"){const x=h==="x"?"y":"x";Fd(f?a.measuredBox[x]:a.layoutBox[x],l[x])}else Ob(h,a.layoutBox,l)&&gn(x=>{const b=f?a.measuredBox[x]:a.layoutBox[x],E=St(l[x]);b.max=b.min+E,n.relativeTarget&&!n.currentAnimation&&(n.isProjectionDirty=!0,n.relativeTarget[x].max=n.relativeTarget[x].min+E)});const m=Ua();Zi(m,l,a.layoutBox);const p=Ua();f?Zi(p,n.applyTransform(u,!0),a.measuredBox):Zi(p,l,a.layoutBox);const g=!Db(m);let v=!1;if(!n.resumeFrom){const x=n.getClosestProjectingParent();if(x&&!x.resumeFrom){const{snapshot:b,layout:E}=x;if(b&&E){const w=n.options.layoutAnchor||void 0,N=st();oo(N,a.layoutBox,b.layoutBox,w);const T=st();oo(T,l,E.layoutBox,w),Ab(N,T)||(v=!0),x.options.layoutRoot&&(n.relativeTarget=T,n.relativeTargetOrigin=N,n.relativeParent=x)}}}n.notifyListeners("didUpdate",{layout:l,snapshot:a,delta:p,layoutDelta:m,hasLayoutChanged:g,hasRelativeLayoutChanged:v})}else if(n.isLead()){const{onExitComplete:l}=n.options;l&&l()}n.options.transition=void 0}function IE(n){n.parent&&(n.isProjecting()||(n.isProjectionDirty=n.parent.isProjectionDirty),n.isSharedProjectionDirty||(n.isSharedProjectionDirty=!!(n.isProjectionDirty||n.parent.isProjectionDirty||n.parent.isSharedProjectionDirty)),n.isTransformDirty||(n.isTransformDirty=n.parent.isTransformDirty))}function eT(n){n.isProjectionDirty=n.isSharedProjectionDirty=n.isTransformDirty=!1}function tT(n){n.clearSnapshot()}function av(n){n.clearMeasurements()}function nT(n){n.isLayoutDirty=!0,n.updateLayout()}function iv(n){n.isLayoutDirty=!1}function rT(n){n.isAnimationBlocked&&n.layout&&!n.isLayoutDirty&&(n.snapshot=n.layout,n.isLayoutDirty=!0)}function aT(n){const{visualElement:a}=n.options;a&&a.getProps().onBeforeLayoutMeasure&&a.notify("BeforeLayoutMeasure"),n.resetTransform()}function sv(n){n.finishAnimation(),n.targetDelta=n.relativeTarget=n.target=void 0,n.isProjectionDirty=!0}function iT(n){n.resolveTargetDelta()}function sT(n){n.calcProjection()}function lT(n){n.resetSkewAndRotation()}function oT(n){n.removeLeadSnapshot()}function lv(n,a,s){n.translate=qe(a.translate,0,s),n.scale=qe(a.scale,1,s),n.origin=a.origin,n.originPoint=a.originPoint}function ov(n,a,s,l){n.min=qe(a.min,s.min,l),n.max=qe(a.max,s.max,l)}function cT(n,a,s,l){ov(n.x,a.x,s.x,l),ov(n.y,a.y,s.y,l)}function uT(n){return n.animationValues&&n.animationValues.opacityExit!==void 0}const dT={duration:.45,ease:[.4,0,.1,1]},cv=n=>typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().includes(n),uv=cv("applewebkit/")&&!cv("chrome/")?Math.round:en;function dv(n){n.min=uv(n.min),n.max=uv(n.max)}function fT(n){dv(n.x),dv(n.y)}function Ob(n,a,s){return n==="position"||n==="preserve-aspect"&&!OE(Iy(a),Iy(s),.2)}function hT(n){var a;return n!==n.root&&((a=n.scroll)==null?void 0:a.wasRoot)}const mT=Rb({attachResizeListener:(n,a)=>ts(n,"resize",a),measureScroll:()=>{var n,a;return{x:document.documentElement.scrollLeft||((n=document.body)==null?void 0:n.scrollLeft)||0,y:document.documentElement.scrollTop||((a=document.body)==null?void 0:a.scrollTop)||0}},checkIsScrollRoot:()=>!0}),sd={current:void 0},zb=Rb({measureScroll:n=>({x:n.scrollLeft,y:n.scrollTop}),defaultParent:()=>{if(!sd.current){const n=new mT({});n.mount(window),n.setOptions({layoutScroll:!0}),sd.current=n}return sd.current},resetTransform:(n,a)=>{n.style.transform=a!==void 0?a:"none"},checkIsScrollRoot:n=>window.getComputedStyle(n).position==="fixed"}),Uf=S.createContext({transformPagePoint:n=>n,isStatic:!1,reducedMotion:"never"});function fv(n,a){if(typeof n=="function")return n(a);n!=null&&(n.current=a)}function pT(...n){return a=>{let s=!1;const l=n.map(u=>{const h=fv(u,a);return!s&&typeof h=="function"&&(s=!0),h});if(s)return()=>{for(let u=0;u<l.length;u++){const h=l[u];typeof h=="function"?h():fv(n[u],null)}}}}function gT(...n){return S.useCallback(pT(...n),n)}class yT extends S.Component{getSnapshotBeforeUpdate(a){const s=this.props.childRef.current;if(Pl(s)&&a.isPresent&&!this.props.isPresent&&this.props.pop!==!1){const l=s.offsetParent,u=Pl(l)&&l.offsetWidth||0,h=Pl(l)&&l.offsetHeight||0,f=getComputedStyle(s),m=this.props.sizeRef.current;m.height=parseFloat(f.height),m.width=parseFloat(f.width),m.top=s.offsetTop,m.left=s.offsetLeft,m.right=u-m.width-m.left,m.bottom=h-m.height-m.top,m.direction=f.direction}return null}componentDidUpdate(){}render(){return this.props.children}}function vT({children:n,isPresent:a,anchorX:s,anchorY:l,root:u,pop:h}){var b;const f=S.useId(),m=S.useRef(null),p=S.useRef({width:0,height:0,top:0,left:0,right:0,bottom:0,direction:"ltr"}),{nonce:g}=S.useContext(Uf),v=h!==!1?((b=n.props)==null?void 0:b.ref)??(n==null?void 0:n.ref):void 0,x=gT(m,v);return S.useInsertionEffect(()=>{const{width:E,height:w,top:N,left:T,right:A,bottom:D,direction:_}=p.current;if(a||h===!1||!m.current||!E||!w)return;const O=_==="rtl",U=s==="left"?O?`right: ${A}`:`left: ${T}`:O?`left: ${T}`:`right: ${A}`,H=l==="bottom"?`bottom: ${D}`:`top: ${N}`;m.current.dataset.motionPopId=f;const M=document.createElement("style");g&&(M.nonce=g);const R=u??document.head;return R.appendChild(M),M.sheet&&M.sheet.insertRule(`
          [data-motion-pop-id="${f}"] {
            position: absolute !important;
            width: ${E}px !important;
            height: ${w}px !important;
            ${U}px !important;
            ${H}px !important;
          }
        `),()=>{var V;(V=m.current)==null||V.removeAttribute("data-motion-pop-id"),R.contains(M)&&R.removeChild(M)}},[a]),o.jsx(yT,{isPresent:a,childRef:m,sizeRef:p,pop:h,children:h===!1?n:S.cloneElement(n,{ref:x})})}const xT=({children:n,initial:a,isPresent:s,onExitComplete:l,custom:u,presenceAffectsLayout:h,mode:f,anchorX:m,anchorY:p,root:g})=>{const v=hf(bT),x=S.useId(),b=S.useRef(s),E=S.useRef(l);mf(()=>{b.current=s,E.current=l});let w=!0,N=S.useMemo(()=>(w=!1,{id:x,initial:a,isPresent:s,custom:u,onExitComplete:T=>{v.set(T,!0);for(const A of v.values())if(!A)return;l&&l()},register:T=>(v.set(T,!1),()=>{var A;v.delete(T),!b.current&&!v.size&&((A=E.current)==null||A.call(E))})}),[s,v,l]);return h&&w&&(N={...N}),S.useMemo(()=>{v.forEach((T,A)=>v.set(A,!1))},[s]),S.useEffect(()=>{!s&&!v.size&&l&&l()},[s]),n=o.jsx(vT,{pop:f==="popLayout",isPresent:s,anchorX:m,anchorY:p,root:g,children:n}),o.jsx(So.Provider,{value:N,children:n})};function bT(){return new Map}function _b(n=!0){const a=S.useContext(So);if(a===null)return[!0,null];const{isPresent:s,onExitComplete:l,register:u}=a,h=S.useId();S.useEffect(()=>{if(n)return u(h)},[n]);const f=S.useCallback(()=>n&&l&&l(h),[h,l,n]);return!s&&l?[!1,f]:[!0]}const kl=n=>n.key||"";function hv(n){const a=[];return S.Children.forEach(n,s=>{S.isValidElement(s)&&a.push(s)}),a}const ST=({children:n,custom:a,initial:s=!0,onExitComplete:l,presenceAffectsLayout:u=!0,mode:h="sync",propagate:f=!1,anchorX:m="left",anchorY:p="top",root:g})=>{const[v,x]=_b(f),b=S.useMemo(()=>hv(n),[n]),E=f&&!v?[]:b.map(kl),w=S.useRef(!0),N=S.useRef(b),T=hf(()=>new Map),A=S.useRef(new Set),[D,_]=S.useState(b),[O,U]=S.useState(b);mf(()=>{w.current=!1,N.current=b;for(let R=0;R<O.length;R++){const V=kl(O[R]);E.includes(V)?(T.delete(V),A.current.delete(V)):T.get(V)!==!0&&T.set(V,!1)}},[O,E.length,E.join("-")]);const H=[];if(b!==D){let R=[...b];for(let V=0;V<O.length;V++){const K=O[V],Q=kl(K);E.includes(Q)||(R.splice(V,0,K),H.push(K))}return h==="wait"&&H.length&&(R=H),U(hv(R)),_(b),null}const{forceRender:M}=S.useContext(ff);return o.jsx(o.Fragment,{children:O.map(R=>{const V=kl(R),K=f&&!v?!1:b===O||E.includes(V),Q=()=>{if(A.current.has(V))return;if(T.has(V))A.current.add(V),T.set(V,!0);else return;let ie=!0;T.forEach(J=>{J||(ie=!1)}),ie&&(M==null||M(),U(N.current),f&&(x==null||x()),l&&l())};return o.jsx(xT,{isPresent:K,initial:!w.current||s?void 0:!1,custom:a,presenceAffectsLayout:u,mode:h,root:g,onExitComplete:K?void 0:Q,anchorX:m,anchorY:p,children:R},V)})})},Vb=S.createContext({strict:!1}),mv={animation:["animate","variants","whileHover","whileTap","exit","whileInView","whileFocus","whileDrag"],exit:["exit"],drag:["drag","dragControls"],focus:["whileFocus"],hover:["whileHover","onHoverStart","onHoverEnd"],tap:["whileTap","onTap","onTapStart","onTapCancel"],pan:["onPan","onPanStart","onPanSessionStart","onPanEnd"],inView:["whileInView","onViewportEnter","onViewportLeave"],layout:["layout","layoutId"]};let pv=!1;function jT(){if(pv)return;const n={};for(const a in mv)n[a]={isEnabled:s=>mv[a].some(l=>!!s[l])};fb(n),pv=!0}function Bb(){return jT(),iE()}function wT(n){const a=Bb();for(const s in n)a[s]={...a[s],...n[s]};fb(a)}const ET=new Set(["animate","exit","variants","initial","style","values","variants","transition","transformTemplate","custom","inherit","onBeforeLayoutMeasure","onAnimationStart","onAnimationComplete","onUpdate","onDragStart","onDrag","onDragEnd","onMeasureDragConstraints","onDirectionLock","onDragTransitionEnd","_dragX","_dragY","onHoverStart","onHoverEnd","onViewportEnter","onViewportLeave","globalTapTarget","propagate","ignoreStrict","viewport"]);function co(n){return n.startsWith("while")||n.startsWith("drag")&&n!=="draggable"||n.startsWith("layout")||n.startsWith("onTap")||n.startsWith("onPan")||n.startsWith("onLayout")||ET.has(n)}let Lb=n=>!co(n);function TT(n){typeof n=="function"&&(Lb=a=>a.startsWith("on")?!co(a):n(a))}try{TT(require("@emotion/is-prop-valid").default)}catch{}function CT(n,a,s){const l={};for(const u in n)u==="values"&&typeof n.values=="object"||yt(n[u])||(Lb(u)||s===!0&&co(u)||!a&&!co(u)||n.draggable&&u.startsWith("onDrag"))&&(l[u]=n[u]);return l}const Co=S.createContext({});function NT(n,a){if(To(n)){const{initial:s,animate:l}=n;return{initial:s===!1||es(s)?s:void 0,animate:es(l)?l:void 0}}return n.inherit!==!1?a:{}}function DT(n){const{initial:a,animate:s}=NT(n,S.useContext(Co));return S.useMemo(()=>({initial:a,animate:s}),[gv(a),gv(s)])}function gv(n){return Array.isArray(n)?n.join(" "):n}const Hf=()=>({style:{},transform:{},transformOrigin:{},vars:{}});function Ub(n,a,s){for(const l in a)!yt(a[l])&&!xb(l,s)&&(n[l]=a[l])}function AT({transformTemplate:n},a){return S.useMemo(()=>{const s=Hf();return Bf(s,a,n),Object.assign({},s.vars,s.style)},[a])}function MT(n,a){const s=n.style||{},l={};return Ub(l,s,n),Object.assign(l,AT(n,a)),l}function kT(n,a){const s={},l=MT(n,a);return n.drag&&n.dragListener!==!1&&(s.draggable=!1,l.userSelect=l.WebkitUserSelect=l.WebkitTouchCallout="none",l.touchAction=n.drag===!0?"none":`pan-${n.drag==="x"?"y":"x"}`),n.tabIndex===void 0&&(n.onTap||n.onTapStart||n.whileTap)&&(s.tabIndex=0),s.style=l,s}const Hb=()=>({...Hf(),attrs:{}});function RT(n,a,s,l){const u=S.useMemo(()=>{const h=Hb();return bb(h,a,jb(l),n.transformTemplate,n.style),{...h.attrs,style:{...h.style}}},[a]);if(n.style){const h={};Ub(h,n.style,n),u.style={...h,...u.style}}return u}const OT=["animate","circle","defs","desc","ellipse","g","image","line","filter","marker","mask","metadata","path","pattern","polygon","polyline","rect","stop","switch","symbol","svg","text","tspan","use","view"];function qf(n){return typeof n!="string"||n.includes("-")?!1:!!(OT.indexOf(n)>-1||/[A-Z]/u.test(n))}function zT(n,a,s,{latestValues:l},u,h=!1,f){const p=(f??qf(n)?RT:kT)(a,l,u,n),g=CT(a,typeof n=="string",h),v=n!==S.Fragment?{...g,...p,ref:s}:{},{children:x}=a,b=S.useMemo(()=>yt(x)?x.get():x,[x]);return S.createElement(n,{...v,children:b})}function _T({scrapeMotionValuesFromProps:n,createRenderState:a},s,l,u){return{latestValues:VT(s,l,u,n),renderState:a()}}function VT(n,a,s,l){const u={},h=l(n,{});for(const b in h)u[b]=Kl(h[b]);let{initial:f,animate:m}=n;const p=To(n),g=ub(n);a&&g&&!p&&n.inherit!==!1&&(f===void 0&&(f=a.initial),m===void 0&&(m=a.animate));let v=s?s.initial===!1:!1;v=v||f===!1;const x=v?m:f;if(x&&typeof x!="boolean"&&!Eo(x)){const b=Array.isArray(x)?x:[x];for(let E=0;E<b.length;E++){const w=Df(n,b[E]);if(w){const{transitionEnd:N,transition:T,...A}=w;for(const D in A){let _=A[D];if(Array.isArray(_)){const O=v?_.length-1:0;_=_[O]}_!==null&&(u[D]=_)}for(const D in N)u[D]=N[D]}}}return u}const qb=n=>(a,s)=>{const l=S.useContext(Co),u=S.useContext(So),h=()=>_T(n,a,l,u);return s?h():hf(h)},BT=qb({scrapeMotionValuesFromProps:Lf,createRenderState:Hf}),LT=qb({scrapeMotionValuesFromProps:wb,createRenderState:Hb}),UT=Symbol.for("motionComponentSymbol");function HT(n,a,s){const l=S.useRef(s);S.useInsertionEffect(()=>{l.current=s});const u=S.useRef(null);return S.useCallback(h=>{var m;h&&((m=n.onMount)==null||m.call(n,h)),a&&(h?a.mount(h):a.unmount());const f=l.current;if(typeof f=="function")if(h){const p=f(h);typeof p=="function"&&(u.current=p)}else u.current?(u.current(),u.current=null):f(h);else f&&(f.current=h)},[a])}const Yb=S.createContext({});function _a(n){return n&&typeof n=="object"&&Object.prototype.hasOwnProperty.call(n,"current")}function qT(n,a,s,l,u,h){var _,O;const{visualElement:f}=S.useContext(Co),m=S.useContext(Vb),p=S.useContext(So),g=S.useContext(Uf),v=g.reducedMotion,x=g.skipAnimations,b=S.useRef(null),E=S.useRef(!1);l=l||m.renderer,!b.current&&l&&(b.current=l(n,{visualState:a,parent:f,props:s,presenceContext:p,blockInitialAnimation:p?p.initial===!1:!1,reducedMotionConfig:v,skipAnimations:x,isSVG:h}),E.current&&b.current&&(b.current.manuallyAnimateOnMount=!0));const w=b.current,N=S.useContext(Yb);w&&!w.projection&&u&&(w.type==="html"||w.type==="svg")&&YT(b.current,s,u,N);const T=S.useRef(!1);S.useInsertionEffect(()=>{w&&T.current&&w.update(s,p)});const A=s[Wx],D=S.useRef(!!A&&typeof window<"u"&&!((_=window.MotionHandoffIsComplete)!=null&&_.call(window,A))&&((O=window.MotionHasOptimisedAnimation)==null?void 0:O.call(window,A)));return mf(()=>{E.current=!0,w&&(T.current=!0,window.MotionIsMounted=!0,w.updateFeatures(),w.scheduleRenderMicrotask(),D.current&&w.animationState&&w.animationState.animateChanges())}),S.useEffect(()=>{w&&(!D.current&&w.animationState&&w.animationState.animateChanges(),D.current&&(queueMicrotask(()=>{var U;(U=window.MotionHandoffMarkAsComplete)==null||U.call(window,A)}),D.current=!1),w.enteringChildren=void 0)}),w}function YT(n,a,s,l){const{layoutId:u,layout:h,drag:f,dragConstraints:m,layoutScroll:p,layoutRoot:g,layoutAnchor:v,layoutCrossfade:x}=a;n.projection=new s(n.latestValues,a["data-framer-portal-id"]?void 0:Pb(n.parent)),n.projection.setOptions({layoutId:u,layout:h,alwaysMeasureLayout:!!f||m&&_a(m),visualElement:n,animationType:typeof h=="string"?h:"both",initialPromotionConfig:l,crossfade:x,layoutScroll:p,layoutRoot:g,layoutAnchor:v})}function Pb(n){if(n)return n.options.allowProjection!==!1?n.projection:Pb(n.parent)}function ld(n,{forwardMotionProps:a=!1,type:s}={},l,u){l&&wT(l);const h=s?s==="svg":qf(n),f=h?LT:BT;function m(g,v){let x;const b={...S.useContext(Uf),...g,layoutId:PT(g)},{isStatic:E}=b,w=DT(g),N=f(g,E);if(!E&&typeof window<"u"){GT();const T=FT(b);x=T.MeasureLayout,w.visualElement=qT(n,N,b,u,T.ProjectionNode,h)}return o.jsxs(Co.Provider,{value:w,children:[x&&w.visualElement?o.jsx(x,{visualElement:w.visualElement,...b}):null,zT(n,g,HT(N,w.visualElement,v),N,E,a,h)]})}m.displayName=`motion.${typeof n=="string"?n:`create(${n.displayName??n.name??""})`}`;const p=S.forwardRef(m);return p[UT]=n,p}function PT({layoutId:n}){const a=S.useContext(ff).id;return a&&n!==void 0?a+"-"+n:n}function GT(n,a){S.useContext(Vb).strict}function FT(n){const a=Bb(),{drag:s,layout:l}=a;if(!s&&!l)return{};const u={...s,...l};return{MeasureLayout:s!=null&&s.isEnabled(n)||l!=null&&l.isEnabled(n)?u.MeasureLayout:void 0,ProjectionNode:u.ProjectionNode}}function XT(n,a){if(typeof Proxy>"u")return ld;const s=new Map,l=(h,f)=>ld(h,f,n,a),u=(h,f)=>l(h,f);return new Proxy(u,{get:(h,f)=>f==="create"?l:(s.has(f)||s.set(f,ld(f,void 0,n,a)),s.get(f))})}const $T=(n,a)=>a.isSVG??qf(n)?new jE(a):new gE(a,{allowProjection:n!==S.Fragment});class KT extends Sr{constructor(a){super(a),a.animationState||(a.animationState=NE(a))}updateAnimationControlsSubscription(){const{animate:a}=this.node.getProps();Eo(a)&&(this.unmountControls=a.subscribe(this.node))}mount(){this.updateAnimationControlsSubscription()}update(){const{animate:a}=this.node.getProps(),{animate:s}=this.node.prevProps||{};a!==s&&this.updateAnimationControlsSubscription()}unmount(){var a;this.node.animationState.reset(),(a=this.unmountControls)==null||a.call(this)}}let ZT=0;class QT extends Sr{constructor(){super(...arguments),this.id=ZT++,this.isExitComplete=!1}update(){var h;if(!this.node.presenceContext)return;const{isPresent:a,onExitComplete:s}=this.node.presenceContext,{isPresent:l}=this.node.prevPresenceContext||{};if(!this.node.animationState||a===l)return;if(a&&l===!1){if(this.isExitComplete){const{initial:f,custom:m}=this.node.getProps();if(typeof f=="string"||typeof f=="object"&&f!==null&&!Array.isArray(f)){const p=Fr(this.node,f,m);if(p){const{transition:g,transitionEnd:v,...x}=p;for(const b in x)(h=this.node.getValue(b))==null||h.jump(x[b])}}this.node.animationState.reset(),this.node.animationState.animateChanges()}else this.node.animationState.setActive("exit",!1);this.isExitComplete=!1;return}const u=this.node.animationState.setActive("exit",!a);s&&!a&&u.then(()=>{this.isExitComplete=!0,s(this.id)})}mount(){const{register:a,onExitComplete:s}=this.node.presenceContext||{};s&&s(this.id),a&&(this.unmount=a(this.id))}unmount(){}}const JT={animation:{Feature:KT},exit:{Feature:QT}};function cs(n){return{point:{x:n.pageX,y:n.pageY}}}const WT=n=>a=>Rf(a)&&n(a,cs(a));function Qi(n,a,s,l){return ts(n,a,WT(s),l)}const Gb=({current:n})=>n?n.ownerDocument.defaultView:null,yv=(n,a)=>Math.abs(n-a);function IT(n,a){const s=yv(n.x,a.x),l=yv(n.y,a.y);return Math.sqrt(s**2+l**2)}const vv=new Set(["auto","scroll"]);class Fb{constructor(a,s,{transformPagePoint:l,contextWindow:u=window,dragSnapToOrigin:h=!1,distanceThreshold:f=3,element:m}={}){if(this.startEvent=null,this.lastMoveEvent=null,this.lastMoveEventInfo=null,this.lastRawMoveEventInfo=null,this.handlers={},this.contextWindow=window,this.scrollPositions=new Map,this.removeScrollListeners=null,this.onElementScroll=w=>{this.handleScroll(w.target)},this.onWindowScroll=()=>{this.handleScroll(window)},this.updatePoint=()=>{if(!(this.lastMoveEvent&&this.lastMoveEventInfo))return;this.lastRawMoveEventInfo&&(this.lastMoveEventInfo=Rl(this.lastRawMoveEventInfo,this.transformPagePoint));const w=od(this.lastMoveEventInfo,this.history),N=this.startEvent!==null,T=IT(w.offset,{x:0,y:0})>=this.distanceThreshold;if(!N&&!T)return;const{point:A}=w,{timestamp:D}=gt;this.history.push({...A,timestamp:D});const{onStart:_,onMove:O}=this.handlers;N||(_&&_(this.lastMoveEvent,w),this.startEvent=this.lastMoveEvent),O&&O(this.lastMoveEvent,w)},this.handlePointerMove=(w,N)=>{this.lastMoveEvent=w,this.lastRawMoveEventInfo=N,this.lastMoveEventInfo=Rl(N,this.transformPagePoint),Ye.update(this.updatePoint,!0)},this.handlePointerUp=(w,N)=>{this.end();const{onEnd:T,onSessionEnd:A,resumeAnimation:D}=this.handlers;if((this.dragSnapToOrigin||!this.startEvent)&&D&&D(),!(this.lastMoveEvent&&this.lastMoveEventInfo))return;const _=od(w.type==="pointercancel"?this.lastMoveEventInfo:Rl(N,this.transformPagePoint),this.history);this.startEvent&&T&&T(w,_),A&&A(w,_)},!Rf(a))return;this.dragSnapToOrigin=h,this.handlers=s,this.transformPagePoint=l,this.distanceThreshold=f,this.contextWindow=u||window;const p=cs(a),g=Rl(p,this.transformPagePoint),{point:v}=g,{timestamp:x}=gt;this.history=[{...v,timestamp:x}];const{onSessionStart:b}=s;b&&b(a,od(g,this.history));const E={passive:!0,capture:!0};this.removeListeners=ss(Qi(this.contextWindow,"pointermove",this.handlePointerMove,E),Qi(this.contextWindow,"pointerup",this.handlePointerUp,E),Qi(this.contextWindow,"pointercancel",this.handlePointerUp,E)),m&&this.startScrollTracking(m)}startScrollTracking(a){let s=a.parentElement;for(;s;){const l=getComputedStyle(s);(vv.has(l.overflowX)||vv.has(l.overflowY))&&this.scrollPositions.set(s,{x:s.scrollLeft,y:s.scrollTop}),s=s.parentElement}this.scrollPositions.set(window,{x:window.scrollX,y:window.scrollY}),window.addEventListener("scroll",this.onElementScroll,{capture:!0}),window.addEventListener("scroll",this.onWindowScroll),this.removeScrollListeners=()=>{window.removeEventListener("scroll",this.onElementScroll,{capture:!0}),window.removeEventListener("scroll",this.onWindowScroll)}}handleScroll(a){const s=this.scrollPositions.get(a);if(!s)return;const l=a===window,u=l?{x:window.scrollX,y:window.scrollY}:{x:a.scrollLeft,y:a.scrollTop},h={x:u.x-s.x,y:u.y-s.y};h.x===0&&h.y===0||(l?this.lastMoveEventInfo&&(this.lastMoveEventInfo.point.x+=h.x,this.lastMoveEventInfo.point.y+=h.y):this.history.length>0&&(this.history[0].x-=h.x,this.history[0].y-=h.y),this.scrollPositions.set(a,u),Ye.update(this.updatePoint,!0))}updateHandlers(a){this.handlers=a}end(){this.removeListeners&&this.removeListeners(),this.removeScrollListeners&&this.removeScrollListeners(),this.scrollPositions.clear(),xr(this.updatePoint)}}function Rl(n,a){return a?{point:a(n.point)}:n}function xv(n,a){return{x:n.x-a.x,y:n.y-a.y}}function od({point:n},a){return{point:n,delta:xv(n,Xb(a)),offset:xv(n,eC(a)),velocity:tC(a,.1)}}function eC(n){return n[0]}function Xb(n){return n[n.length-1]}function tC(n,a){if(n.length<2)return{x:0,y:0};let s=n.length-1,l=null;const u=Xb(n);for(;s>=0&&(l=n[s],!(u.timestamp-l.timestamp>qt(a)));)s--;if(!l)return{x:0,y:0};l===n[0]&&n.length>2&&u.timestamp-l.timestamp>qt(a)*2&&(l=n[1]);const h=It(u.timestamp-l.timestamp);if(h===0)return{x:0,y:0};const f={x:(u.x-l.x)/h,y:(u.y-l.y)/h};return f.x===1/0&&(f.x=0),f.y===1/0&&(f.y=0),f}function nC(n,{min:a,max:s},l){return a!==void 0&&n<a?n=l?qe(a,n,l.min):Math.max(n,a):s!==void 0&&n>s&&(n=l?qe(s,n,l.max):Math.min(n,s)),n}function bv(n,a,s){return{min:a!==void 0?n.min+a:void 0,max:s!==void 0?n.max+s-(n.max-n.min):void 0}}function rC(n,{top:a,left:s,bottom:l,right:u}){return{x:bv(n.x,s,u),y:bv(n.y,a,l)}}function Sv(n,a){let s=a.min-n.min,l=a.max-n.max;return a.max-a.min<n.max-n.min&&([s,l]=[l,s]),{min:s,max:l}}function aC(n,a){return{x:Sv(n.x,a.x),y:Sv(n.y,a.y)}}function iC(n,a){let s=.5;const l=St(n),u=St(a);return u>l?s=Wi(a.min,a.max-l,n.min):l>u&&(s=Wi(n.min,n.max-u,a.min)),bn(0,1,s)}function sC(n,a){const s={};return a.min!==void 0&&(s.min=a.min-n.min),a.max!==void 0&&(s.max=a.max-n.min),s}const Xd=.35;function lC(n=Xd){return n===!1?n=0:n===!0&&(n=Xd),{x:jv(n,"left","right"),y:jv(n,"top","bottom")}}function jv(n,a,s){return{min:wv(n,a),max:wv(n,s)}}function wv(n,a){return typeof n=="number"?n:n[a]||0}const oC=new WeakMap;class cC{constructor(a){this.openDragLock=null,this.isDragging=!1,this.currentDirection=null,this.originPoint={x:0,y:0},this.constraints=!1,this.hasMutatedConstraints=!1,this.elastic=st(),this.latestPointerEvent=null,this.latestPanInfo=null,this.visualElement=a}start(a,{snapToCursor:s=!1,distanceThreshold:l}={}){const{presenceContext:u}=this.visualElement;if(u&&u.isPresent===!1)return;const h=x=>{s&&this.snapToCursor(cs(x).point),this.stopAnimation()},f=(x,b)=>{const{drag:E,dragPropagation:w,onDragStart:N}=this.getProps();if(E&&!w&&(this.openDragLock&&this.openDragLock(),this.openDragLock=V2(E),!this.openDragLock))return;this.latestPointerEvent=x,this.latestPanInfo=b,this.isDragging=!0,this.currentDirection=null,this.resolveConstraints(),this.visualElement.projection&&(this.visualElement.projection.isAnimationBlocked=!0,this.visualElement.projection.target=void 0),gn(A=>{let D=this.getAxisMotionValue(A).get()||0;if(xn.test(D)){const{projection:_}=this.visualElement;if(_&&_.layout){const O=_.layout.layoutBox[A];O&&(D=St(O)*(parseFloat(D)/100))}}this.originPoint[A]=D}),N&&Ye.update(()=>N(x,b),!1,!0),Bd(this.visualElement,"transform");const{animationState:T}=this.visualElement;T&&T.setActive("whileDrag",!0)},m=(x,b)=>{this.latestPointerEvent=x,this.latestPanInfo=b;const{dragPropagation:E,dragDirectionLock:w,onDirectionLock:N,onDrag:T}=this.getProps();if(!E&&!this.openDragLock)return;const{offset:A}=b;if(w&&this.currentDirection===null){this.currentDirection=dC(A),this.currentDirection!==null&&N&&N(this.currentDirection);return}this.updateAxis("x",b.point,A),this.updateAxis("y",b.point,A),this.visualElement.render(),T&&Ye.update(()=>T(x,b),!1,!0)},p=(x,b)=>{this.latestPointerEvent=x,this.latestPanInfo=b,this.stop(x,b),this.latestPointerEvent=null,this.latestPanInfo=null},g=()=>{const{dragSnapToOrigin:x}=this.getProps();(x||this.constraints)&&this.startAnimation({x:0,y:0})},{dragSnapToOrigin:v}=this.getProps();this.panSession=new Fb(a,{onSessionStart:h,onStart:f,onMove:m,onSessionEnd:p,resumeAnimation:g},{transformPagePoint:this.visualElement.getTransformPagePoint(),dragSnapToOrigin:v,distanceThreshold:l,contextWindow:Gb(this.visualElement),element:this.visualElement.current})}stop(a,s){const l=a||this.latestPointerEvent,u=s||this.latestPanInfo,h=this.isDragging;if(this.cancel(),!h||!u||!l)return;const{velocity:f}=u;this.startAnimation(f);const{onDragEnd:m}=this.getProps();m&&Ye.postRender(()=>m(l,u))}cancel(){this.isDragging=!1;const{projection:a,animationState:s}=this.visualElement;a&&(a.isAnimationBlocked=!1),this.endPanSession();const{dragPropagation:l}=this.getProps();!l&&this.openDragLock&&(this.openDragLock(),this.openDragLock=null),s&&s.setActive("whileDrag",!1)}endPanSession(){this.panSession&&this.panSession.end(),this.panSession=void 0}updateAxis(a,s,l){const{drag:u}=this.getProps();if(!l||!Ol(a,u,this.currentDirection))return;const h=this.getAxisMotionValue(a);let f=this.originPoint[a]+l[a];this.constraints&&this.constraints[a]&&(f=nC(f,this.constraints[a],this.elastic[a])),h.set(f)}resolveConstraints(){var h;const{dragConstraints:a,dragElastic:s}=this.getProps(),l=this.visualElement.projection&&!this.visualElement.projection.layout?this.visualElement.projection.measure(!1):(h=this.visualElement.projection)==null?void 0:h.layout,u=this.constraints;a&&_a(a)?this.constraints||(this.constraints=this.resolveRefConstraints()):a&&l?this.constraints=rC(l.layoutBox,a):this.constraints=!1,this.elastic=lC(s),u!==this.constraints&&!_a(a)&&l&&this.constraints&&!this.hasMutatedConstraints&&gn(f=>{this.constraints!==!1&&this.getAxisMotionValue(f)&&(this.constraints[f]=sC(l.layoutBox[f],this.constraints[f]))})}resolveRefConstraints(){const{dragConstraints:a,onMeasureDragConstraints:s}=this.getProps();if(!a||!_a(a))return!1;const l=a.current,{projection:u}=this.visualElement;if(!u||!u.layout)return!1;u.root&&(u.root.scroll=void 0,u.root.updateScroll());const h=uE(l,u.root,this.visualElement.getTransformPagePoint());let f=aC(u.layout.layoutBox,h);if(s){const m=s(lE(f));this.hasMutatedConstraints=!!m,m&&(f=mb(m))}return f}startAnimation(a){const{drag:s,dragMomentum:l,dragElastic:u,dragTransition:h,dragSnapToOrigin:f,onDragTransitionEnd:m}=this.getProps(),p=this.constraints||{},g=gn(v=>{if(!Ol(v,s,this.currentDirection))return;let x=p&&p[v]||{};(f===!0||f===v)&&(x={min:0,max:0});const b=u?200:1e6,E=u?40:1e7,w={type:"inertia",velocity:l?a[v]:0,bounceStiffness:b,bounceDamping:E,timeConstant:750,restDelta:1,restSpeed:10,...h,...x};return this.startAxisValueAnimation(v,w)});return Promise.all(g).then(m)}startAxisValueAnimation(a,s){const l=this.getAxisMotionValue(a);return Bd(this.visualElement,a),l.start(Nf(a,l,0,s,this.visualElement,!1))}stopAnimation(){gn(a=>this.getAxisMotionValue(a).stop())}getAxisMotionValue(a){const s=`_drag${a.toUpperCase()}`,u=this.visualElement.getProps()[s];return u||this.visualElement.getValue(a,this.visualElement.latestValues[a]??0)}snapToCursor(a){gn(s=>{const{drag:l}=this.getProps();if(!Ol(s,l,this.currentDirection))return;const{projection:u}=this.visualElement,h=this.getAxisMotionValue(s);if(u&&u.layout){const{min:f,max:m}=u.layout.layoutBox[s],p=h.get()||0;h.set(a[s]-qe(f,m,.5)+p)}})}scalePositionWithinConstraints(){if(!this.visualElement.current)return;const{drag:a,dragConstraints:s}=this.getProps(),{projection:l}=this.visualElement;if(!_a(s)||!l||!this.constraints)return;this.stopAnimation();const u={x:0,y:0};gn(f=>{const m=this.getAxisMotionValue(f);if(m&&this.constraints!==!1){const p=m.get();u[f]=iC({min:p,max:p},this.constraints[f])}});const{transformTemplate:h}=this.visualElement.getProps();this.visualElement.current.style.transform=h?h({},""):"none",l.root&&l.root.updateScroll(),l.updateLayout(),this.constraints=!1,this.resolveConstraints(),gn(f=>{if(!Ol(f,a,null))return;const m=this.getAxisMotionValue(f),{min:p,max:g}=this.constraints[f];m.set(qe(p,g,u[f]))}),this.visualElement.render()}addListeners(){if(!this.visualElement.current)return;oC.set(this.visualElement,this);const a=this.visualElement.current,s=Qi(a,"pointerdown",g=>{const{drag:v,dragListener:x=!0}=this.getProps(),b=g.target,E=b!==a&&Y2(b);v&&x&&!E&&this.start(g)});let l;const u=()=>{const{dragConstraints:g}=this.getProps();_a(g)&&g.current&&(this.constraints=this.resolveRefConstraints(),l||(l=uC(a,g.current,()=>this.scalePositionWithinConstraints())))},{projection:h}=this.visualElement,f=h.addEventListener("measure",u);h&&!h.layout&&(h.root&&h.root.updateScroll(),h.updateLayout()),Ye.read(u);const m=ts(window,"resize",()=>this.scalePositionWithinConstraints()),p=h.addEventListener("didUpdate",(({delta:g,hasLayoutChanged:v})=>{this.isDragging&&v&&(gn(x=>{const b=this.getAxisMotionValue(x);b&&(this.originPoint[x]+=g[x].translate,b.set(b.get()+g[x].translate))}),this.visualElement.render())}));return()=>{m(),s(),f(),p&&p(),l&&l()}}getProps(){const a=this.visualElement.getProps(),{drag:s=!1,dragDirectionLock:l=!1,dragPropagation:u=!1,dragConstraints:h=!1,dragElastic:f=Xd,dragMomentum:m=!0}=a;return{...a,drag:s,dragDirectionLock:l,dragPropagation:u,dragConstraints:h,dragElastic:f,dragMomentum:m}}}function Ev(n){let a=!0;return()=>{if(a){a=!1;return}n()}}function uC(n,a,s){const l=ky(n,Ev(s)),u=ky(a,Ev(s));return()=>{l(),u()}}function Ol(n,a,s){return(a===!0||a===n)&&(s===null||s===n)}function dC(n,a=10){let s=null;return Math.abs(n.y)>a?s="y":Math.abs(n.x)>a&&(s="x"),s}class fC extends Sr{constructor(a){super(a),this.removeGroupControls=en,this.removeListeners=en,this.controls=new cC(a)}mount(){const{dragControls:a}=this.node.getProps();a&&(this.removeGroupControls=a.subscribe(this.controls)),this.removeListeners=this.controls.addListeners()||en}update(){const{dragControls:a}=this.node.getProps(),{dragControls:s}=this.node.prevProps||{};a!==s&&(this.removeGroupControls(),a&&(this.removeGroupControls=a.subscribe(this.controls)))}unmount(){this.removeGroupControls(),this.removeListeners(),this.controls.isDragging||this.controls.endPanSession()}}const cd=n=>(a,s)=>{n&&Ye.update(()=>n(a,s),!1,!0)};class hC extends Sr{constructor(){super(...arguments),this.removePointerDownListener=en}onPointerDown(a){this.session=new Fb(a,this.createPanHandlers(),{transformPagePoint:this.node.getTransformPagePoint(),contextWindow:Gb(this.node)})}createPanHandlers(){const{onPanSessionStart:a,onPanStart:s,onPan:l,onPanEnd:u}=this.node.getProps();return{onSessionStart:cd(a),onStart:cd(s),onMove:cd(l),onEnd:(h,f)=>{delete this.session,u&&Ye.postRender(()=>u(h,f))}}}mount(){this.removePointerDownListener=Qi(this.node.current,"pointerdown",a=>this.onPointerDown(a))}update(){this.session&&this.session.updateHandlers(this.createPanHandlers())}unmount(){this.removePointerDownListener(),this.session&&this.session.end()}}let ud=!1;class mC extends S.Component{componentDidMount(){const{visualElement:a,layoutGroup:s,switchLayoutGroup:l,layoutId:u}=this.props,{projection:h}=a;h&&(s.group&&s.group.add(h),l&&l.register&&u&&l.register(h),ud&&h.root.didUpdate(),h.addEventListener("animationComplete",()=>{this.safeToRemove()}),h.setOptions({...h.options,layoutDependency:this.props.layoutDependency,onExitComplete:()=>this.safeToRemove()})),Zl.hasEverUpdated=!0}getSnapshotBeforeUpdate(a){const{layoutDependency:s,visualElement:l,drag:u,isPresent:h}=this.props,{projection:f}=l;return f&&(f.isPresent=h,a.layoutDependency!==s&&f.setOptions({...f.options,layoutDependency:s}),ud=!0,u||a.layoutDependency!==s||s===void 0||a.isPresent!==h?f.willUpdate():this.safeToRemove(),a.isPresent!==h&&(h?f.promote():f.relegate()||Ye.postRender(()=>{const m=f.getStack();(!m||!m.members.length)&&this.safeToRemove()}))),null}componentDidUpdate(){const{visualElement:a,layoutAnchor:s}=this.props,{projection:l}=a;l&&(l.options.layoutAnchor=s,l.root.didUpdate(),kf.postRender(()=>{!l.currentAnimation&&l.isLead()&&this.safeToRemove()}))}componentWillUnmount(){const{visualElement:a,layoutGroup:s,switchLayoutGroup:l}=this.props,{projection:u}=a;ud=!0,u&&(u.scheduleCheckAfterUnmount(),s&&s.group&&s.group.remove(u),l&&l.deregister&&l.deregister(u))}safeToRemove(){const{safeToRemove:a}=this.props;a&&a()}render(){return null}}function $b(n){const[a,s]=_b(),l=S.useContext(ff);return o.jsx(mC,{...n,layoutGroup:l,switchLayoutGroup:S.useContext(Yb),isPresent:a,safeToRemove:s})}const pC={pan:{Feature:hC},drag:{Feature:fC,ProjectionNode:zb,MeasureLayout:$b}};function Tv(n,a,s){const{props:l}=n;n.animationState&&l.whileHover&&n.animationState.setActive("whileHover",s==="Start");const u="onHover"+s,h=l[u];h&&Ye.postRender(()=>h(a,cs(a)))}class gC extends Sr{mount(){const{current:a}=this.node;a&&(this.unmount=L2(a,(s,l)=>(Tv(this.node,l,"Start"),u=>Tv(this.node,u,"End"))))}unmount(){}}class yC extends Sr{constructor(){super(...arguments),this.isActive=!1}onFocus(){let a=!1;try{a=this.node.current.matches(":focus-visible")}catch{a=!0}!a||!this.node.animationState||(this.node.animationState.setActive("whileFocus",!0),this.isActive=!0)}onBlur(){!this.isActive||!this.node.animationState||(this.node.animationState.setActive("whileFocus",!1),this.isActive=!1)}mount(){this.unmount=ss(ts(this.node.current,"focus",()=>this.onFocus()),ts(this.node.current,"blur",()=>this.onBlur()))}unmount(){}}function Cv(n,a,s){const{props:l}=n;if(n.current instanceof HTMLButtonElement&&n.current.disabled)return;n.animationState&&l.whileTap&&n.animationState.setActive("whileTap",s==="Start");const u="onTap"+(s==="End"?"":s),h=l[u];h&&Ye.postRender(()=>h(a,cs(a)))}class vC extends Sr{mount(){const{current:a}=this.node;if(!a)return;const{globalTapTarget:s,propagate:l}=this.node.props;this.unmount=G2(a,(u,h)=>(Cv(this.node,h,"Start"),(f,{success:m})=>Cv(this.node,f,m?"End":"Cancel")),{useGlobalTarget:s,stopPropagation:(l==null?void 0:l.tap)===!1})}unmount(){}}const $d=new WeakMap,dd=new WeakMap,xC=n=>{const a=$d.get(n.target);a&&a(n)},bC=n=>{n.forEach(xC)};function SC({root:n,...a}){const s=n||document;dd.has(s)||dd.set(s,{});const l=dd.get(s),u=JSON.stringify(a);return l[u]||(l[u]=new IntersectionObserver(bC,{root:n,...a})),l[u]}function jC(n,a,s){const l=SC(a);return $d.set(n,s),l.observe(n),()=>{$d.delete(n),l.unobserve(n)}}const wC={some:0,all:1};class EC extends Sr{constructor(){super(...arguments),this.hasEnteredView=!1,this.isInView=!1}startObserver(){var p;(p=this.stopObserver)==null||p.call(this);const{viewport:a={}}=this.node.getProps(),{root:s,margin:l,amount:u="some",once:h}=a,f={root:s?s.current:void 0,rootMargin:l,threshold:typeof u=="number"?u:wC[u]},m=g=>{const{isIntersecting:v}=g;if(this.isInView===v||(this.isInView=v,h&&!v&&this.hasEnteredView))return;v&&(this.hasEnteredView=!0),this.node.animationState&&this.node.animationState.setActive("whileInView",v);const{onViewportEnter:x,onViewportLeave:b}=this.node.getProps(),E=v?x:b;E&&E(g)};this.stopObserver=jC(this.node.current,f,m)}mount(){this.startObserver()}update(){if(typeof IntersectionObserver>"u")return;const{props:a,prevProps:s}=this.node;["amount","margin","root"].some(TC(a,s))&&this.startObserver()}unmount(){var a;(a=this.stopObserver)==null||a.call(this),this.hasEnteredView=!1,this.isInView=!1}}function TC({viewport:n={}},{viewport:a={}}={}){return s=>n[s]!==a[s]}const CC={inView:{Feature:EC},tap:{Feature:vC},focus:{Feature:yC},hover:{Feature:gC}},NC={layout:{ProjectionNode:zb,MeasureLayout:$b}},DC={...JT,...CC,...pC,...NC},AC=XT(DC,$T);function Kb(){!Vf.current&&db();const[n]=S.useState(io.current);return n}const Zb=AC,uo=new Map,Nv=new Set;let MC=0;const Yf=()=>{var n;return(n=window.chrome)==null?void 0:n.webview};function kC(n){var s;const a=uo.get(n.id);if(a){if(n.type==="progress"){(s=a.progress)==null||s.call(a,n.data);return}window.clearTimeout(a.timer),uo.delete(n.id),n.ok?a.resolve(n.data):a.reject(new Error(n.error||"操作失败"))}}var lx;(lx=Yf())==null||lx.addEventListener("message",n=>kC(n.data));function RC(n,a){var s;a&&Nv.has(a)||(a&&Nv.add(a),(s=Yf())==null||s.postMessage({type:"app.ready",route:n,navigation:a}))}function me(n,a,s=3e4,l){const u=Yf();if(!u)return Promise.reject(new Error("当前页面未连接到桌面宿主"));const h=`${Date.now()}-${++MC}`;return new Promise((f,m)=>{const p=window.setTimeout(()=>{uo.delete(h),m(new Error("操作超时，请重试"))},s);uo.set(h,{resolve:g=>f(g),reject:m,timer:p,progress:l}),u.postMessage({id:h,operation:n,payload:a})})}/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const OC=n=>n.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),Qb=(...n)=>n.filter((a,s,l)=>!!a&&a.trim()!==""&&l.indexOf(a)===s).join(" ").trim();/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var zC={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _C=S.forwardRef(({color:n="currentColor",size:a=24,strokeWidth:s=2,absoluteStrokeWidth:l,className:u="",children:h,iconNode:f,...m},p)=>S.createElement("svg",{ref:p,...zC,width:a,height:a,stroke:n,strokeWidth:l?Number(s)*24/Number(a):s,className:Qb("lucide",u),...m},[...f.map(([g,v])=>S.createElement(g,v)),...Array.isArray(h)?h:[h]]));/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pe=(n,a)=>{const s=S.forwardRef(({className:l,...u},h)=>S.createElement(_C,{ref:h,iconNode:a,className:Qb(`lucide-${OC(n)}`,l),...u}));return s.displayName=`${n}`,s};/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ns=Pe("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const VC=Pe("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const BC=Pe("Calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const us=Pe("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const LC=Pe("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const UC=Pe("ChevronLeft",[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const HC=Pe("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qC=Pe("CircleAlert",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const YC=Pe("Copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kd=Pe("Database",[["ellipse",{cx:"12",cy:"5",rx:"9",ry:"3",key:"msslwz"}],["path",{d:"M3 5V19A9 3 0 0 0 21 19V5",key:"1wlel7"}],["path",{d:"M3 12A9 3 0 0 0 21 12",key:"mv7ke4"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const PC=Pe("Ellipsis",[["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}],["circle",{cx:"19",cy:"12",r:"1",key:"1wjl8i"}],["circle",{cx:"5",cy:"12",r:"1",key:"1pcz8c"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dv=Pe("FileCheck2",[["path",{d:"M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4",key:"1pf5j1"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"m3 15 2 2 4-4",key:"1lhrkk"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fo=Pe("FileSpreadsheet",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M8 13h2",key:"yr2amv"}],["path",{d:"M14 13h2",key:"un5t4a"}],["path",{d:"M8 17h2",key:"2yhykz"}],["path",{d:"M14 17h2",key:"10kma7"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const GC=Pe("FileText",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ho=Pe("FolderOpen",[["path",{d:"m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",key:"usdka0"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sn=Pe("LoaderCircle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const FC=Pe("Play",[["polygon",{points:"6 3 20 12 6 21 6 3",key:"1oa8hb"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const XC=Pe("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jb=Pe("RefreshCw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $C=Pe("RotateCw",[["path",{d:"M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8",key:"1p45f6"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const KC=Pe("Rows3",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M21 9H3",key:"1338ky"}],["path",{d:"M21 15H3",key:"9uk58r"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pf=Pe("Settings2",[["path",{d:"M20 7h-9",key:"3s1dr2"}],["path",{d:"M14 17H5",key:"gfn3mx"}],["circle",{cx:"17",cy:"17",r:"3",key:"18b49y"}],["circle",{cx:"7",cy:"7",r:"3",key:"dfmy0x"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ZC=Pe("Sigma",[["path",{d:"M18 7V5a1 1 0 0 0-1-1H6.5a.5.5 0 0 0-.4.8l4.5 6a2 2 0 0 1 0 2.4l-4.5 6a.5.5 0 0 0 .4.8H17a1 1 0 0 0 1-1v-2",key:"wuwx1p"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const QC=Pe("SlidersHorizontal",[["line",{x1:"21",x2:"14",y1:"4",y2:"4",key:"obuewd"}],["line",{x1:"10",x2:"3",y1:"4",y2:"4",key:"1q6298"}],["line",{x1:"21",x2:"12",y1:"12",y2:"12",key:"1iu8h1"}],["line",{x1:"8",x2:"3",y1:"12",y2:"12",key:"ntss68"}],["line",{x1:"21",x2:"16",y1:"20",y2:"20",key:"14d8ph"}],["line",{x1:"12",x2:"3",y1:"20",y2:"20",key:"m0wm8r"}],["line",{x1:"14",x2:"14",y1:"2",y2:"6",key:"14e1ph"}],["line",{x1:"8",x2:"8",y1:"10",y2:"14",key:"1i6ji0"}],["line",{x1:"16",x2:"16",y1:"18",y2:"22",key:"1lctlv"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const JC=Pe("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const WC=Pe("TriangleAlert",[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gf=Pe("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);function Ie({value:n,options:a,placeholder:s,disabled:l,ariaLabel:u,onChange:h}){const[f,m]=S.useState(!1),p=Kb(),g=a.find(v=>v.value===n);return o.jsxs("div",{className:"form-picker",children:[o.jsxs("button",{type:"button",className:`picker-trigger ${f?"open":""}`,disabled:l,"aria-label":u,"aria-haspopup":"listbox","aria-expanded":f,onClick:()=>m(!f),children:[o.jsx("span",{className:g?"":"picker-placeholder",children:(g==null?void 0:g.label)||s}),o.jsx(LC,{})]}),f&&o.jsxs(o.Fragment,{children:[o.jsx("button",{type:"button",className:"picker-backdrop","aria-label":"关闭选项",onClick:()=>m(!1)}),o.jsxs(Zb.div,{className:"picker-popover choice-popover",role:"listbox",initial:p?!1:{opacity:0,y:-5},animate:{opacity:1,y:0,transitionEnd:{transform:"none"}},transition:{duration:p?0:.12},children:[a.map(v=>o.jsxs("button",{type:"button",role:"option","aria-selected":v.value===n,className:v.value===n?"selected":"",onClick:()=>{h(v.value),m(!1)},children:[o.jsx("span",{children:v.label}),v.value===n&&o.jsx(us,{})]},v.value)),!a.length&&o.jsx("span",{className:"picker-empty",children:"暂无可选项"})]})]})]})}const fd=[{key:"sheetTab",title:"① Sheet 标签",prompt:"请在浏览器中点击任意一个底部 Sheet 标签。程序会识别它所属的集合。"},{key:"cellAddressBox",title:"② 单元格名称框",prompt:"请点击左上角显示当前单元格地址的位置。"},{key:"cellEditor",title:"③ 内容编辑区／公式栏",prompt:"请点击可以读取和输入单元格内容的编辑区，不要选择名称框。"}];function IC({value:n,documentUrl:a,disabled:s,allowLegacy:l=!1,onChange:u,onActive:h}){const[f,m]=S.useState([]),[p,g]=S.useState(),[v,x]=S.useState(""),[b,E]=S.useState(!1),[w,N]=S.useState(""),[T,A]=S.useState(""),[D,_]=S.useState(!1),[O,U]=S.useState(""),[H,M]=S.useState([]),R=()=>me("tencentSite.list").then(J=>m(J.profiles??[]));S.useEffect(()=>{R().catch(J=>{_(!0),A(String(J))})},[]);function V(){U(""),M([])}function K(J){g(J?structuredClone(J):{name:"腾讯共享表格",siteType:"TencentDocs",controls:{}}),x(a||(J==null?void 0:J.sampleUrl)||""),E(!1),A(""),_(!1),V(),h(!0)}async function Q(J,G){var L;if(!p)return;N(G??J),_(!1),A(G?fd.find(ne=>ne.key===G).prompt:"正在操作…");const de=O;J!=="save"&&V();try{const ne=await me(`tencentSite.${J}`,{profile:p,documentUrl:v,key:G,token:de},3e5);A(ne.message),J==="open"&&E(!0),J==="pick"&&ne.profile&&g({...ne.profile,id:p.id,revision:p.revision}),J==="test"&&(ne.profile&&g({...ne.profile,id:p.id,revision:p.revision}),U(ne.token??""),M(ne.steps)),J==="save"&&((L=ne.profile)!=null&&L.id)&&(await R(),g(void 0),h(!1),u(ne.profile.id))}catch(ne){_(!0),A(ne instanceof Error?ne.message:String(ne)),V()}finally{N("")}}const ie=f.find(J=>J.id===n);return o.jsxs("section",{className:"tencent-site-profiles tencent-sheet-panel","aria-label":"网页适配配置","aria-busy":!!w,children:[o.jsxs("div",{children:[o.jsx("h3",{children:"网页适配配置"}),o.jsx("p",{className:"tencent-sheet-help",children:"相同网页控件录制一次，多份文档复用。具体填报位置由每份文档单独示范。"})]}),p?o.jsx(o.Fragment,{children:o.jsxs("fieldset",{className:"tencent-site-fields",disabled:s||!!w,children:[o.jsxs("div",{className:"tencent-sheet-grid",children:[o.jsxs("label",{children:["适配名称",o.jsx("input",{value:p.name,maxLength:80,onChange:J=>{g({...p,name:J.target.value}),V()}})]}),o.jsxs("label",{children:["用于配置的文档地址",o.jsx("input",{type:"url",value:v,placeholder:"https://docs.qq.com/sheet/...",onChange:J=>{x(J.target.value),E(!1),V()}})]})]}),o.jsx("p",{className:"tencent-sheet-help",children:"这份文档用于录制和测试公共控件；后续可以换另一份文档使用同一适配。"}),o.jsx("button",{className:"primary",disabled:!p.name.trim()||!v.trim(),onClick:()=>Q("open"),children:b?"重新打开配置文档":"开始配置"}),o.jsxs("div",{className:"tencent-site-recording",children:[o.jsx("div",{className:"tencent-site-controls",children:fd.map(J=>o.jsxs("div",{children:[o.jsx("strong",{children:J.title}),o.jsx("span",{className:"tencent-control-state",children:p.controls[J.key]?"已录制":"未配置"}),o.jsxs("button",{className:"secondary",disabled:!b,onClick:()=>Q("pick",J.key),children:["录制",J.key==="sheetTab"?" Sheet 标签":J.key==="cellEditor"?"内容编辑区":"单元格名称框"]})]},J.key))}),o.jsxs("div",{className:"tencent-site-instructions",children:[o.jsx("strong",{children:fd.some(J=>J.key===w)?"正在等待网页点选":"控件录制模式"}),o.jsx("p",{children:"点击左侧录制按钮后，在打开的浏览器中选择控件。鼠标悬停时高亮，点击只记录位置，不执行页面原动作。按 Esc 取消。"}),o.jsx("p",{children:"录制时先识别标签集合；测试时自动切换两个标签并切回，学习选中状态。登录提示自动发现，无需录制。"})]})]}),!!(H!=null&&H.length)&&o.jsx("ol",{className:"tencent-site-results",children:H.map(J=>o.jsxs("li",{children:[o.jsx("strong",{children:J.label}),o.jsx("span",{children:J.detail})]},J.label))}),o.jsx("p",{className:"tencent-sheet-help",children:"测试会在两个标签间切换、学习选中状态，再切回录制标签并定位 J9。不会向业务单元格填写数值。全部通过后才可保存。"}),p.id&&o.jsx("p",{className:"tencent-sheet-help",children:"保存更新后，引用此适配的文档会使用新控件规则，各自的业务填报位置保持不变。"}),o.jsxs("div",{className:"tencent-sheet-actions",children:[o.jsx("button",{className:"secondary",disabled:!b||!p.controls.sheetTab||!p.controls.cellAddressBox||!p.controls.cellEditor,onClick:()=>Q("test"),children:"测试适配"}),o.jsx("button",{className:"primary",disabled:!O,onClick:()=>Q("save"),children:"保存适配配置"}),o.jsx("button",{className:"secondary",onClick:()=>{g(void 0),h(!1),V(),A("")},children:"取消"})]})]})}):o.jsxs(o.Fragment,{children:[o.jsxs("label",{children:["选择网页适配",o.jsx(Ie,{value:n,options:[...l?[{value:"",label:"本任务已有控件配置（兼容）"}]:[],...f.map(J=>({value:J.id,label:J.name}))],placeholder:"请选择适配，或新建腾讯文档适配",disabled:s,ariaLabel:"选择网页适配",onChange:u})]}),o.jsxs("div",{className:"tencent-sheet-actions",children:[o.jsx("button",{className:"secondary",disabled:s,onClick:()=>K(),children:"新建腾讯文档适配"}),ie&&o.jsx("button",{className:"secondary",disabled:s,onClick:()=>K(ie),children:"重新录制此适配"})]})]}),T&&o.jsx("div",{className:`notice ${D?"error":"info"}`,role:D?"alert":"status",children:T})]})}function Wb({value:n,disabled:a,allowLegacy:s=!1,onChange:l}){const[u,h]=S.useState([]),[f,m]=S.useState("");return S.useEffect(()=>{me("tencentSite.list").then(p=>h(p.profiles??[])).catch(p=>m(String(p)))},[]),o.jsxs("div",{children:[o.jsxs("label",{children:["网页适配",o.jsx(Ie,{value:n,options:[...s?[{value:"",label:"本任务原有配置（兼容）"}]:[],...u.map(p=>({value:p.id,label:p.name+(p.controls.cellEditor?"":" · 待补录编辑区")}))],placeholder:"选择已配置的网页适配",disabled:a,ariaLabel:"选择网页适配",onChange:l})]}),o.jsx("p",{className:"tencent-sheet-help",children:"公共控件在自动化任务列表的“网页适配配置”中统一录制；这里仅选择要使用的适配。"}),f&&o.jsx("p",{role:"alert",children:f})]})}function eN({onActive:n}){const[a,s]=S.useState("");return o.jsx("div",{className:"tencent-sheet-workbench",children:o.jsx(IC,{value:a,documentUrl:"",disabled:!1,onChange:s,onActive:n})})}var Ff=ux();const tN=["一","二","三","四","五","六","日"],nN=Array.from({length:12},(n,a)=>`${a+1}月`);function rN(n){if(!n)return null;const[a,s,l=1]=n.split("-").map(Number);return!a||!s||!l?null:new Date(a,s-1,l)}function Av(n){const a=n.getFullYear(),s=String(n.getMonth()+1).padStart(2,"0"),l=String(n.getDate()).padStart(2,"0");return`${a}-${s}-${l}`}function aN(n){const a=n.getFullYear(),s=String(n.getMonth()+1).padStart(2,"0"),l=String(n.getDate()).padStart(2,"0");return`${a}/${s}/${l}`}function iN(n,a){const s=new Date(n,a,1).getDay();return s===0?6:s-1}function sN(n,a){return new Date(n,a+1,0).getDate()}function Mv(n,a){return n.getFullYear()===a.getFullYear()&&n.getMonth()===a.getMonth()&&n.getDate()===a.getDate()}function lN(n){return Math.floor(n/12)*12}function tn({value:n,onChange:a,label:s,disabled:l=!1,selectionMode:u="day"}){var C;const h=S.useId(),f=S.useMemo(()=>rN(n),[n]),[m,p]=S.useState(!1),[g,v]=S.useState(u),[x,b]=S.useState(f??new Date),[E,w]=S.useState({top:0,left:0}),[N,T]=S.useState("bottom"),A=S.useRef(null),D=S.useRef(null),_=S.useRef(null);S.useEffect(()=>{f&&b(f)},[n]);function O(){const z=A.current,re=_.current;if(!z||!re)return;const ce=z.ownerDocument.defaultView||window,ue=z.getBoundingClientRect(),fe=re.getBoundingClientRect(),be=fe.width,oe=fe.height,I=8,he=12,se=ce.innerHeight-ue.bottom-he,ge=ue.top-he,$=oe>se&&ge>se,pe=$?"top":"bottom";let ke=$?ue.top-oe-I:ue.bottom+I;ke<he&&(ke=he),ke+oe>ce.innerHeight-he&&(ke=Math.max(he,ce.innerHeight-oe-he));let Xe=ue.left;Xe+be>ce.innerWidth-he&&(Xe=ce.innerWidth-be-he),Xe<he&&(Xe=he),T(pe),w({top:ke,left:Xe})}S.useLayoutEffect(()=>{m&&O()},[m,g]),S.useEffect(()=>{var ce;if(!m)return;const z=((ce=A.current)==null?void 0:ce.ownerDocument.defaultView)||window;function re(){O()}return z.addEventListener("resize",re),z.addEventListener("scroll",re,!0),()=>{z.removeEventListener("resize",re),z.removeEventListener("scroll",re,!0)}},[m,g]),S.useEffect(()=>{var ue;const z=((ue=D.current)==null?void 0:ue.ownerDocument)||document;function re(fe){var he,se;const be=fe.target,oe=(he=D.current)==null?void 0:he.contains(be),I=(se=_.current)==null?void 0:se.contains(be);!oe&&!I&&(p(!1),v(u))}function ce(fe){fe.key==="Escape"&&(p(!1),v(u))}return z.addEventListener("mousedown",re),z.addEventListener("keydown",ce),()=>{z.removeEventListener("mousedown",re),z.removeEventListener("keydown",ce)}},[u]);const U=x.getFullYear(),H=x.getMonth(),M=sN(U,H),R=iN(U,H),V=lN(U),K=Array.from({length:12},(z,re)=>V+re),Q=[];for(let z=0;z<R;z+=1)Q.push(null);for(let z=1;z<=M;z+=1)Q.push(z);function ie(){if(g==="day"){b(new Date(U,H-1,1));return}if(g==="month"){b(new Date(U-1,H,1));return}b(new Date(U-12,H,1))}function J(){if(g==="day"){b(new Date(U,H+1,1));return}if(g==="month"){b(new Date(U+1,H,1));return}b(new Date(U+12,H,1))}function G(){if(u==="month"){v(g==="month"?"year":"month");return}if(g==="day"){v("month");return}if(g==="month"){v("year");return}v("day")}function de(z){const re=new Date(U,H,z);a(Av(re)),p(!1),v("day")}function L(z){if(u==="month"){a(`${U}-${String(z+1).padStart(2,"0")}`),b(new Date(U,z,1)),p(!1),v("month");return}b(new Date(U,z,1)),v("day")}function ne(z){b(new Date(z,H,1)),v("month")}function W(){const z=new Date;b(z),a(u==="month"?`${z.getFullYear()}-${String(z.getMonth()+1).padStart(2,"0")}`:Av(z)),v(u),p(!1)}function Y(){return g==="day"?`${U}年 ${H+1}月`:g==="month"?`${U}年`:`${V} - ${V+11}`}const te=m?o.jsxs("div",{ref:_,className:`date-picker-popover date-picker-popover-${N}`,style:{top:E.top,left:E.left},children:[o.jsxs("div",{className:"date-picker-header",children:[o.jsx("button",{type:"button",className:"date-picker-nav-button",onClick:ie,"aria-label":"上一页",children:o.jsx(UC,{size:17,strokeWidth:1.7})}),o.jsx("button",{type:"button",className:"date-picker-title-button",onClick:G,children:Y()}),o.jsx("button",{type:"button",className:"date-picker-nav-button",onClick:J,"aria-label":"下一页",children:o.jsx(HC,{size:17,strokeWidth:1.7})})]}),g==="day"&&o.jsxs(o.Fragment,{children:[o.jsx("div",{className:"date-picker-weekdays",children:tN.map(z=>o.jsx("div",{children:z},z))}),o.jsx("div",{className:"date-picker-grid",children:Q.map((z,re)=>{if(z===null)return o.jsx("div",{},`empty-${re}`);const ce=new Date(U,H,z),ue=f?Mv(ce,f):!1,fe=Mv(ce,new Date);return o.jsx("button",{type:"button",className:["date-picker-day",ue?"date-picker-day-selected":"",fe&&!ue?"date-picker-day-today":""].filter(Boolean).join(" "),onClick:()=>de(z),children:z},`${U}-${H}-${z}`)})})]}),g==="month"&&o.jsx("div",{className:"date-picker-month-grid",children:nN.map((z,re)=>{const ce=f&&f.getFullYear()===U&&f.getMonth()===re,ue=new Date().getFullYear()===U&&new Date().getMonth()===re;return o.jsx("button",{type:"button",className:["date-picker-month-item",ce?"date-picker-month-item-selected":"",ue&&!ce?"date-picker-month-item-current":""].filter(Boolean).join(" "),onClick:()=>L(re),children:z},z)})}),g==="year"&&o.jsx("div",{className:"date-picker-year-grid",children:K.map(z=>{const re=f&&f.getFullYear()===z,ce=new Date().getFullYear()===z;return o.jsx("button",{type:"button",className:["date-picker-year-item",re?"date-picker-year-item-selected":"",ce&&!re?"date-picker-year-item-current":""].filter(Boolean).join(" "),onClick:()=>ne(z),children:z},z)})}),o.jsx("div",{className:"date-picker-footer",children:o.jsx("button",{type:"button",className:"date-picker-today-button",onClick:W,children:u==="month"?"回到本月":"回到今天"})})]}):null;return o.jsxs(o.Fragment,{children:[o.jsxs("div",{ref:D,className:"date-picker",children:[s&&o.jsx("label",{id:`${h}-label`,className:"date-picker-label",children:s}),o.jsxs("button",{ref:A,type:"button",disabled:l,className:`date-picker-trigger ${m?"date-picker-trigger-open":""}`,onClick:()=>{l||p(z=>{const re=!z;return re&&v(u),re})},"aria-expanded":m,"aria-labelledby":s?`${h}-label ${h}-value`:void 0,"aria-label":s?void 0:u==="month"?"选择月份":"选择日期",children:[o.jsx("span",{id:`${h}-value`,className:f?"":"date-picker-placeholder",children:f?u==="month"?`${f.getFullYear()} / ${String(f.getMonth()+1).padStart(2,"0")}`:aN(f):u==="month"?"选择月份":"选择日期"}),o.jsx(BC,{className:"date-picker-calendar-icon",size:16,strokeWidth:1.7})]})]}),te&&Ff.createPortal(te,((C=D.current)==null?void 0:C.ownerDocument.body)||document.body)]})}const Ib=`/* Generated from tools/experiments/production_message/production_assistant_demo/src/index.css and App.css.\r
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
`,e0=`/* Shared controls: normal typography, neutral focus and unobtrusive scrollbars. */\r
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
`,oN=`<!doctype html>\r
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
`,t0=""+new URL("Inter-VF2RPR_K.ttf",import.meta.url).href,n0=""+new URL("NotoSansSC-Dz1u1FRy.ttf",import.meta.url).href,Xi=new Map;function cN(n,a,s=!1){const l=JSON.stringify([n,a]),u=`daily-field-cache-v1:${l}`;let h=s?void 0:Xi.get(l);if(!h&&!s)try{const f=JSON.parse(localStorage.getItem(u)||"null");f&&Array.isArray(f.metrics)&&f.metrics.every(m=>m&&typeof m.id=="string"&&typeof m.name=="string")&&(h=Promise.resolve(f),Xi.set(l,h))}catch{}return h||(h=me("daily.getProperties",{id:n,sourceId:a}).then(f=>{try{localStorage.setItem(u,JSON.stringify(f))}catch{}return f}).catch(f=>{throw Xi.delete(l),f}),Xi.set(l,h)),h}function uN(n=!1){if(Xi.clear(),n)try{Object.keys(localStorage).filter(a=>a.startsWith("daily-field-cache-v1:")).forEach(a=>localStorage.removeItem(a))}catch{}}const zl=[0,-1,-2].flatMap(n=>[{granularity:"day",key:n===0?"today":`day${n}`,label:n===0?"今日":`${n===-1?"去年":"前年"}同日`},{granularity:"mtd",key:n===0?"mtd":n===-1?"lastmonth":"mtd-2",label:n===0?"本月累计":`${n===-1?"去年":"前年"}同期月累计`},{granularity:"ytd",key:n===0?"ytd":n===-1?"last":"ytd-2",label:n===0?"本年累计":`${n===-1?"去年":"前年"}同期`},{granularity:"fullyear",key:n===0?"fullyear":n===-1?"full":"full-2",label:`${n===0?"今年":n===-1?"去年":"前年"}全年`}].map(a=>({key:a.key,label:a.label,spec:{granularity:a.granularity,yearOffset:n}}))),r0={"system.date":'today("yyyy年M月d日")',"system.year":'today("yyyy年")',"system.month":'today("M月")',"system.day":'today("d日")'};function dN(n){return r0[n]||n}function kv(n){const a=[[]];function s(u){u.replace(/\u00a0/g," ").split(`
`).forEach((h,f)=>{var p;if(f&&a.push([]),!h)return;const m=a.at(-1);((p=m.at(-1))==null?void 0:p.type)==="text"?m.at(-1).text+=h:m.push({type:"text",text:h})})}function l(u){var h;if(u.nodeType===3){s(u.textContent||"");return}if(u instanceof n.ownerDocument.defaultView.HTMLElement){if(u.dataset.key){const f=dN(u.dataset.key);a.at(-1).push({type:f.startsWith("today(")?"dateToken":"fieldToken",attrs:{placeholder:f,label:u.textContent||"",...u.dataset.legacySpec?{dateRangeSpec:JSON.parse(u.dataset.legacySpec)}:{}}});return}if(u.tagName==="BR"){s(`
`);return}u!==n&&["DIV","P"].includes(u.tagName)&&u.childNodes.length===1&&((h=u.firstChild)==null?void 0:h.nodeName)==="BR"||Array.from(u.childNodes).forEach((f,m)=>{m&&f.nodeType===1&&["DIV","P"].includes(f.tagName)&&s(`
`),l(f)})}}return l(n),{text:a.map(u=>u.map(h=>h.type==="text"?h.text:h.attrs.placeholder).join("")).join(`
`),document:JSON.stringify({type:"doc",content:a.map(u=>({type:"paragraph",content:u}))})}}function fN(n,a,s,l){const u=[...s,...Object.entries(r0).map(([f,m])=>({key:m,label:f==="system.date"?"业务日期":f==="system.year"?"业务年份":f==="system.month"?"业务月份":"业务日",metric:"date",scope:"date",keywords:"",field:void 0}))].filter(f=>f.field||f.metric==="date").sort((f,m)=>m.key.length-f.key.length);let h=a;for(;h;){const f=u.map(m=>({d:m,index:h.indexOf(m.key)})).filter(m=>m.index>=0).sort((m,p)=>m.index-p.index)[0];if(!f){n.append(n.ownerDocument.createTextNode(h));break}f.index&&n.append(n.ownerDocument.createTextNode(h.slice(0,f.index))),n.append(l(f.d)),h=h.slice(f.index+f.d.key.length)}}function hN(n,a,s,l){if(!a)return!1;let u;try{u=JSON.parse(a)}catch{return!1}if(u.type!=="doc")return!1;function h(f){var m,p,g,v;if(f.type==="text"){n.append(n.ownerDocument.createTextNode(f.text||""));return}if(f.type==="hardBreak"){n.append(n.ownerDocument.createTextNode(`
`));return}if(f.type==="fieldToken"||f.type==="dateToken"){const x=((m=f.attrs)==null?void 0:m.placeholder)||"";let b=s.find(w=>w.key===x);b||(b={key:x,label:f.type==="dateToken"?"业务日期":((p=f.attrs)==null?void 0:p.label)||"已有数据",metric:f.type==="dateToken"?"date":"legacy",scope:"legacy",keywords:((g=f.attrs)==null?void 0:g.label)||""},s.push(b));const E=l(b);(v=f.attrs)!=null&&v.dateRangeSpec&&(E.dataset.legacySpec=JSON.stringify(f.attrs.dateRangeSpec)),n.append(E);return}(f.content||[]).forEach((x,b)=>{f.type==="doc"&&b&&n.append(n.ownerDocument.createTextNode(`
`)),h(x)})}return h(u),!0}function a0({id:n,back:a,changed:s,openSettings:l}){const u=S.useRef(null),[h,f]=S.useState("");return S.useEffect(()=>{let m=!1;const p=u.current;return me("daily.get",{id:n}).then(g=>{if(m)return;const v=mN(g,{back:a,changed:s,openSettings:l});p.dailyRuntime=v,p.srcdoc=oN.replace("../../src/ProductionAssistant.App/Assets/Fonts/Inter.ttf",new URL(t0,window.location.href).href).replace("../../src/ProductionAssistant.App/Assets/Fonts/NotoSansSC.ttf",new URL(n0,window.location.href).href)}).catch(g=>{m||f(String(g.message||g))}),()=>{var g;m=!0,(g=p.dailyRuntime)==null||g.dispose()}},[n]),o.jsxs("div",{className:"message-template-host",children:[h&&o.jsx("p",{role:"alert",children:h}),o.jsx("iframe",{ref:u,title:"日报消息模板"})]})}function mN(n,a){var H;let s=!1,l=!1,u,h,f=Promise.resolve(),m=0,p;const g=new Date,v=n.fields.map(M=>{var R,V,K;return{key:M.placeholder,label:M.label.replace(" · ",""),metric:`${M.databaseId||((R=M.binding)==null?void 0:R.dataSourceId)}:${M.businessId||((V=M.binding)==null?void 0:V.businessMetricId)}`,scope:((K=zl.find(Q=>JSON.stringify(Q.spec)===JSON.stringify(M.dateRangeSpec)))==null?void 0:K.key)||"legacy",keywords:M.label,field:M}}),x=[];let b=(H=n.metricSourceIds)!=null&&H.length?n.metricSourceIds:[...new Set(n.fields.map(M=>{var R;return M.databaseId||((R=M.binding)==null?void 0:R.dataSourceId)}).filter(Boolean))];const E=new Map(n.fields.map(M=>[M.placeholder,M])),w=new Map;function N(M){const R=h==null?void 0:h.querySelector("#preview-status");R&&(R.textContent=M)}function T(){h==null||h.querySelectorAll("[data-send]").forEach(M=>M.disabled=l||!n.notificationConfigured)}async function A(M){M.text===n.draftTemplate&&M.document===n.draftTemplateDocument||(await me("daily.saveTemplate",{id:O,...M}),n.draftTemplate=M.text,n.draftTemplateDocument=M.document)}async function D(){var M;try{const R=await me("daily.get",{id:O});if(s)return;n.notificationConfigured=R.notificationConfigured,n.sources=R.sources,T(),(M=h==null?void 0:h.querySelector("[data-notification-notice]"))==null||M.toggleAttribute("hidden",!!n.notificationConfigured),await _()}catch(R){N(String(R))}}async function _(){var R;const M=await Promise.allSettled(b.map(async V=>({sourceId:V,metrics:(await cN(O,V)).metrics})));if(!s){v.splice(0,v.length,...v.filter(V=>V.field)),x.length=0;for(const V of M)if(V.status==="fulfilled")for(const K of V.value.metrics){const Q=`${V.value.sourceId}:${K.id}`;x.push([Q,K.name,K.name,0]);const ie=K.granularity==="monthly"?[{key:"month",label:"本月"}]:zl;for(const J of ie)v.push({key:`${Q}:${J.key}`,metric:Q,scope:J.key,label:K.granularity==="monthly"?K.name:J.label+K.name,keywords:K.name+" "+J.label+" "+(((R=n.sources.find(G=>G.id===V.value.sourceId))==null?void 0:R.name)||""),sourceId:V.value.sourceId,metricId:K.id});for(const J of v.filter(G=>G.metric===Q&&G.field))J.sourceId=V.value.sourceId,J.metricId=K.id}M.some(V=>V.status==="rejected")?N("部分指标目录读取失败，请到系统设置刷新数据库。"):b.length||N("请在右上角任务设置中配置本任务的指标范围。")}}const O=n.id,U={dirty(){m++,p=void 0},id:O,name:n.name,sendTime:n.sendTime,businessDate:`${g.getFullYear()}-${String(g.getMonth()+1).padStart(2,"0")}-${String(g.getDate()).padStart(2,"0")}`,definitions:v,metrics:x,value:M=>{var R,V,K;return M.metric==="date"?"业务日期":((R=p==null?void 0:p.fieldValues)==null?void 0:R[M.key])||((K=p==null?void 0:p.fieldValues)==null?void 0:K[((V=v.find(Q=>Q.field&&Q.metric===M.metric&&Q.scope===M.scope))==null?void 0:V.key)||""])||""},mount:(M,R)=>{hN(M,n.draftTemplateDocument,v,R)||fN(M,n.draftTemplate,v,R)},async materialize(M){var J;if(M.field||M.metric==="date")return M;const R=v.find(G=>G.metric===M.metric&&G.sourceId),V=M.sourceId||(R==null?void 0:R.sourceId),K=M.metricId||(R==null?void 0:R.metricId);if(!V||!K)throw new Error("此字段缺少可用的指标定义，请在任务设置中刷新指标。");const Q=JSON.stringify([V,K,M.scope,M.label]);let ie=w.get(Q);return ie||(ie=me("daily.addField",{id:O,sourceId:V,metricId:K,placeholder:"",displayName:M.label,...M.scope==="month"?{rangeKind:"current-month"}:{dateRangeSpec:(J=zl.find(G=>G.key===M.scope))==null?void 0:J.spec}}).then(({field:G})=>{E.set(G.placeholder,G);const de={...M,key:G.placeholder,field:G,sourceId:V,metricId:K};return v.some(L=>L.key===de.key)||v.push(de),a.changed(),de}).catch(G=>{throw w.delete(Q),G}),w.set(Q,ie)),ie},save(M){const R=kv(M),V=f.catch(()=>{}).then(()=>s?void 0:A(R));return f=V,V},preview(M,R){const V=kv(M),K=++m,Q=f.catch(()=>{}).then(async()=>{if(s||K!==m)return{succeeded:!1,text:"",message:"内容已修改，请重新生成预览",errors:[]};await A(V);const ie=await me("daily.preview",{id:O,businessDate:R},12e4),J={...ie,errors:ie.fieldErrors||[],message:ie.succeeded?"已生成 · "+R:ie.message};return K===m&&!s&&(p=J),J});return f=Q,Q},async send(M,R,V){if(!l){if(!n.notificationConfigured)throw new Error("请先在系统设置中配置通知渠道。");l=!0,T();try{await U.save(M);const K=await me(R==="test"?"daily.test":"daily.sendToday",R==="test"?{id:O,businessDate:V}:{id:O},12e4);if(!K.succeeded)throw new Error(K.message||"发送失败，请查看运行记录");N(K.alreadySent?"今日当前内容已发送":R==="test"?"测试发送成功":"今日消息已发送"),a.changed()}finally{l=!1,T()}}},configureAdvanced(M,R){const V=v.some(ie=>ie.metric===M&&ie.scope==="month"),K=V?[{key:"month",label:"本月计划"}]:[{key:"day",label:"日（业务日当天）"},{key:"mtd",label:"月累计（月初至业务日）"},{key:"ytd",label:"年累计（年初至业务日）"},{key:"fullyear",label:"全年"}];R.replaceChildren(...K.map(ie=>new Option(ie.label,ie.key)));const Q=R.ownerDocument.querySelector("#scope-year");Q&&(Q.disabled=V,Q.value="0")},resolveAdvanced(M,R){return M==="month"?"month":zl.find(V=>V.spec.granularity===M&&V.spec.yearOffset===Number(R)).key},async saveBasics(M,R){const V=Array.from((h==null?void 0:h.querySelectorAll("[data-context-source]:checked"))||[]).map(K=>K.value);await me("daily.saveBasics",{id:O,name:M,sendTime:R,metricSourceIds:V}),n.name=M,n.sendTime=R,b=V,U.name=M,await _(),a.changed()},connect(M){var W;h=M,M.title=n.name,M.querySelector("#runs p").textContent="";const R=M.querySelector("header > span");R.removeAttribute("aria-hidden"),R.setAttribute("role","button"),R.setAttribute("tabindex","0"),R.setAttribute("aria-label","返回任务列表");const V=async()=>{const Y=M.querySelector("#editor");Y.contentEditable="false",m++;try{await U.save(Y),a.back()}catch(te){N(String(te)),Y.contentEditable="true"}};R.addEventListener("click",V),R.addEventListener("keydown",Y=>{Y.key==="Enter"&&V()});const K=M.querySelector("#settings"),Q=M.createElement("fieldset");Q.style.cssText="border:0;padding:0;max-height:180px;overflow:auto";const ie=M.createElement("legend");ie.textContent="本任务的指标范围",Q.append(ie);for(const Y of n.sources){const te=M.createElement("label");te.style.cssText="display:flex;gap:8px;margin:8px 0";const C=M.createElement("input");C.type="checkbox",C.value=Y.id,C.dataset.contextSource="",C.checked=b.includes(Y.id),C.style.width="auto",te.append(C,M.createTextNode(Y.name)),Q.append(te)}(W=K.querySelector("p"))==null||W.replaceWith(Q);const J=M.createElement("button");J.textContent="数据库设置",J.type="button",J.onclick=()=>{var Y;K.close(),(Y=a.openSettings)==null||Y.call(a)},Q.after(J);const G=M.querySelector("footer");for(const[Y,te]of[["test","测试发送"],["today","发送今日消息"]]){const C=M.createElement("button");C.textContent=te,C.dataset.send=Y,C.onclick=async()=>{const z=M.querySelector("#editor");z.contentEditable="false";try{await U.send(z,Y,M.querySelector("#date").value)}catch(re){N(String(re))}finally{z.contentEditable="true"}},G.append(C)}const de=M.createElement("style");de.textContent=Ib+`
`+e0+`
body{font-family:var(--font-ui)}#date-picker{width:154px}`,M.head.append(de);const L=M.createElement("span");L.className="production-message-demo",L.hidden=!0,M.body.append(L),u=df.createRoot(M.querySelector("#date-picker")),u.render(o.jsx(pN,{input:M.querySelector("#date")})),window.addEventListener("production-settings-updated",D);const ne=M.querySelector("#runs");if(ne.ontoggle=async()=>{if(!ne.open)return;const Y=ne.querySelector("p");Y.textContent="正在读取…";try{const te=await me("daily.runs",{id:O});Y.textContent=te.runs.length?"":"暂无运行记录";for(const C of te.runs){const z=M.createElement("div");z.textContent=`${C.time} · ${C.status} · ${C.businessDate}${C.error?" · "+C.error:""}`,Y.append(z)}}catch(te){Y.textContent=String(te)}},!n.notificationConfigured){const Y=M.createElement("div");Y.className="notice",Y.dataset.notificationNotice="",Y.append(M.createTextNode("通知渠道尚未配置。 "));const te=M.createElement("button");te.textContent="通知设置",te.onclick=a.openSettings||null,Y.append(te),M.querySelector("#message").before(Y)}T(),_().catch(Y=>N(String(Y)))},dispose(){s=!0,m++,u==null||u.unmount(),window.removeEventListener("production-settings-updated",D)}};return U}function pN({input:n}){const[a,s]=S.useState(n.value);return o.jsx(tn,{value:a,onChange:l=>{var u;s(l),n.value=l,n.dispatchEvent(new(((u=n.ownerDocument.defaultView)==null?void 0:u.Event)||Event)("change",{bubbles:!0}))}})}const gN=`<!doctype html>
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
`,Rv=()=>{const n=new Date;return n.setDate(n.getDate()-1),`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}-${String(n.getDate()).padStart(2,"0")}`};function i0({id:n,...a}){const s=S.useRef(null),[l,u]=S.useState("");return S.useEffect(()=>{let h=!1,f;const m=s.current;return u(""),me("notionFill.get",{id:n}).then(p=>{h||(f=yN(p,a),m.onload=()=>{var g;!h&&((g=m.contentDocument)!=null&&g.getElementById("date-picker"))&&f.connect(m.contentDocument)},m.srcdoc=gN.replace("../../src/ProductionAssistant.App/Assets/Fonts/Inter.ttf",new URL(t0,window.location.href).href).replace("../../src/ProductionAssistant.App/Assets/Fonts/NotoSansSC.ttf",new URL(n0,window.location.href).href))}).catch(p=>{h||u(String(p.message||p))}),()=>{h=!0,m.onload=null,f==null||f.dispose()}},[n]),o.jsxs("div",{className:"message-template-host",children:[l&&o.jsx("p",{role:"alert",children:l}),o.jsx("iframe",{ref:s,title:"原材料自动入库"})]})}function yN(n,a){let s={...n,runTime:n.runTime||"00:00"},l,u,h=!1,f=!1,m=0,p=0,g=Rv(),v,x=s.isEnabled;const b=Y=>l.getElementById(Y),E=Y=>b(Y),w=Y=>b(Y),N=Y=>b(Y),T=Y=>Y instanceof Error?Y.message:String(Y),A=Y=>Y.toLocaleString("zh-CN",{minimumFractionDigits:3,maximumFractionDigits:3});function D(Y,te=!1){b("feedback").textContent=Y,b("feedback").className=te?"callout error":""}function _(){return!!(s.sourcePageUrl&&s.username&&s.passwordConfigured)}function O(){u==null||u.render(o.jsx(tn,{value:g,disabled:f,onChange:M}))}function U(){for(const Y of["preview","source-test","yesterday","settings-open","back","confirm-run"])w(Y).disabled=f;w("preview").disabled=f||!_()||!s.notionConfigured,w("source-test").disabled=f||!_(),w("run").disabled=f||!v,l.querySelectorAll("#settings button, #settings input").forEach(Y=>Y.disabled=f),w("toggle").disabled=f||!s.schedulingAvailable,w("preview").textContent=f?"处理中…":"生成预览",b("name").textContent=s.name,b("enabled").textContent=s.isEnabled?s.schedulerInstalled?"已启用":"计划异常":"未启用",b("target-name").textContent=s.targetDataSourceName,b("settings-target-name").textContent=s.targetDataSourceName,E("password").placeholder=s.passwordConfigured?"已保存；留空不修改":"请输入 93 系统密码",O()}function H(Y="尚未生成预览"){m++,v=void 0,b("source-empty").hidden=!1,b("source-values").hidden=!0,b("source-error").hidden=!0,b("record").hidden=!0,b("target-status").hidden=!0,b("target-empty").hidden=!1,b("target-empty").querySelector("strong").textContent=Y,b("target-empty").querySelector("span").textContent="预览只读取数据，不会新增记录",w("run").textContent="执行本日期",w("run").disabled=!0,N("confirm").open&&N("confirm").close()}function M(Y){f||(g=Y,E("date").value=Y,H("待重新预览"),D(""),O())}function R(Y){b("source-empty").hidden=!0,b("source-values").hidden=!1;for(const[te,C]of[["plate",Y.plateWeight],["section",Y.sectionWeight],["total",Y.totalWeight]])b(te).textContent=A(C)}function V(Y){R(Y),b("target-empty").hidden=!0,b("record").hidden=!1,b("record-title").textContent=`${Y.businessDate} 入库`,b("record-date").textContent=Y.businessDate,b("record-plate").textContent=`${A(Y.plateWeight)} 吨`,b("record-section").textContent=`${A(Y.sectionWeight)} 吨`,b("target-status").hidden=!1,b("target-status").textContent=Y.targetRecordExists?"该日期已有记录，无需新增。":"可新增 1 条入库记录。",w("run").textContent=Y.targetRecordExists?"验证查重":"执行本日期"}function K(Y){b("run-count").textContent=Y.length?`· ${Y.length}`:"";const te=Y.map(C=>{const z=l.createElement("div");z.className="run";const re=l.createElement("span");re.textContent={"source-test":"93 测试",test:"只读预览",manual:"手动执行",automatic:"自动执行"}[C.source]||C.source;const ce=l.createElement("div");ce.textContent=C.error||C.message||(C.status==="created"?"已新增":C.status==="failed"?"执行失败":"已检查"),C.status==="failed"&&(ce.style.color="#B91C1C");const ue=l.createElement("p");ue.textContent=C.status==="failed"?C.businessDate:`${C.businessDate} · 板材 ${A(C.plateWeight)} 吨 · 型材 ${A(C.sectionWeight)} 吨`,ce.append(ue);const fe=l.createElement("small");return fe.textContent=C.time,z.append(re,ce,fe),z});b("runs-body").replaceChildren(...te),Y.length||(b("runs-body").textContent="暂无运行记录")}async function Q(){const Y=++p;try{const te=await me("notionFill.runs",{id:s.id});!h&&Y===p&&K(te.runs)}catch(te){!h&&Y===p&&(b("runs-body").textContent=`运行记录读取失败：${T(te)}；重新展开可重试。`)}}function ie(){Promise.resolve(a.changed()).catch(()=>{})}async function J(Y){if(f||!g)return;f=!0,H("正在读取…");const te=m;U(),D("");try{const C=await me(Y?"notionFill.testSource":"notionFill.test",{id:s.id,businessDate:g},12e4);if(h||te!==m)return;if(!C.succeeded)throw new Error(C.message||"读取失败");Y?(R(C),b("target-empty").querySelector("strong").textContent="尚未检查 Notion",b("target-empty").querySelector("span").textContent="点击“生成预览”完成读取与查重"):(s.validated=!0,v=C,V(C)),ie()}catch(C){if(h||te!==m)return;H("本次预览未完成"),b("source-error").hidden=!1,b("source-error").textContent=T(C)}finally{h||(f=!1,U(),Q())}}async function G(){if(f||!v||!N("confirm").open)return;const Y=v.businessDate;N("confirm").close(),f=!0,U(),D("");try{const te=await me("notionFill.runNow",{id:s.id,businessDate:Y},12e4);if(h)return;if(!te.succeeded)throw new Error(te.message||"执行失败");v={...v,targetRecordExists:!0},b("target-status").textContent=te.message,w("run").textContent="验证查重",D(te.created?"Notion 写入成功。":"该日期已有记录，本次已跳过。"),ie()}catch(te){h||(H("执行未完成，请重新预览"),D(T(te),!0))}finally{h||(f=!1,U(),Q())}}function de(){return E("task-name").value.trim()!==s.name||E("url").value.trim().replace(/\/+$/,"")!==s.sourcePageUrl||E("username").value.trim()!==s.username||!!E("password").value}function L(){w("toggle").setAttribute("aria-checked",String(x)),b("schedule-hint").textContent=s.schedulingAvailable?de()?"配置已修改：保存后需重新预览，再启用。":s.isEnabled&&!s.schedulerInstalled?s.schedulerMessage:s.validated?"只读预览已通过，可以启用定时入库。":"完成一次“生成预览”后可启用。":"当前运行环境不支持定时启停，预览与手动执行仍可使用。"}async function ne(Y){if(Y.preventDefault(),f)return;const te=E("task-name").value.trim(),C=E("username").value.trim();if(!te||!C){b("settings-note").textContent="任务名称和用户名不能为空。";return}const z=de(),re=E("run-time").value;if(!/^([01]\d|2[0-3]):[0-5]\d$/.test(re)){b("settings-note").textContent="请选择有效的执行时间。";return}const ce=z||re!==s.runTime,ue=z?!1:x;let fe=!1;f=!0,U();try{if(ce){const oe=E("url").value.trim().replace(/\/+$/,""),I=E("password").value;if(await me("notionFill.save",{id:s.id,name:te,sourcePageUrl:oe,username:C,password:I,runTime:re}),h)return;fe=!0,s={...s,name:te,sourcePageUrl:oe,username:C,runTime:re,passwordConfigured:s.passwordConfigured||!!I,isEnabled:z?!1:s.isEnabled,validated:z?!1:s.validated},E("password").value="",z&&H("配置已修改，请重新预览")}if(ue!==s.isEnabled){const oe=await me("automation.setEnabled",{id:s.id,taskType:"notion_fill",enabled:ue});if(h)return;if(s.isEnabled=oe.enabled,oe.enabled!==ue)throw new Error(oe.message||"定时任务状态未更新");fe=!0}const be=await me("notionFill.get",{id:s.id});if(h)return;s=be,N("settings").close(),D(z?"配置已保存，请重新预览后启用。":"任务设置已保存。")}catch(be){h||(b("settings-note").textContent=`${fe?"设置已更新，但后续操作失败：":""}${T(be)}`)}finally{h||(f=!1,x=s.isEnabled,U(),L(),fe&&ie())}}async function W(){if(f||h)return;const Y=m;try{const te=await me("notionFill.get",{id:s.id});if(h||f||Y!==m)return;s=te,H("系统设置已更新，请重新预览"),U(),D(s.notionConfigured?"系统设置已更新，点击“生成预览”读取数据。":"Notion 连接尚未配置，仍可仅测试 93 读取。")}catch(te){h||D(T(te),!0)}}return{connect(Y){u==null||u.unmount(),l=Y;const te=l.createElement("style");te.textContent=Ib+`
`+e0+`
body{color:#292524}#date-picker{width:163px;display:inline-block}`,l.head.append(te);const C=l.createElement("span");C.className="production-message-demo",C.hidden=!0,l.body.append(C),u=df.createRoot(b("date-picker")),E("date").value=g,E("date").onchange=()=>M(E("date").value),w("yesterday").onclick=()=>M(Rv()),w("preview").onclick=()=>{J(!1)},w("source-test").onclick=()=>{J(!0)},w("back").onclick=a.back,w("run").onclick=()=>{f||!v||(b("confirm-title").textContent=v.targetRecordExists?"验证查重":"执行本日期",b("confirm-copy").textContent=v.targetRecordExists?`${v.businessDate} 已有记录，本次执行应跳过。`:`将向“${s.targetDataSourceName}”新增 ${v.businessDate} 的记录：板材 ${A(v.plateWeight)} 吨，型材 ${A(v.sectionWeight)} 吨。`,N("confirm").showModal())},w("confirm-run").onclick=()=>{G()},w("settings-open").onclick=()=>{E("task-name").value=s.name,E("url").value=s.sourcePageUrl,E("username").value=s.username,E("password").value="",E("run-time").value=s.runTime,E("password").required=!s.passwordConfigured,b("settings-note").textContent="修改名称或连接后，需重新预览并启用定时任务。",x=s.isEnabled,L(),N("settings").showModal()},w("toggle").onclick=()=>{if(s.schedulingAvailable){if(!x&&(!s.validated||de())){b("schedule-hint").textContent="请先保存配置并完成“生成预览”，再启用定时入库。";return}x=!x,L()}};for(const z of["task-name","url","username","password"])E(z).oninput=()=>{de()&&(x=!1),L()};b("settings-form").onsubmit=z=>{ne(z)},N("settings").onclose=()=>{E("password").value=""},N("settings").oncancel=z=>{f&&z.preventDefault()},l.querySelectorAll("[data-close]").forEach(z=>z.onclick=()=>{f||N(z.dataset.close).close()}),w("system-settings").hidden=!a.openSettings,w("system-settings").onclick=()=>{var z;N("settings").close(),(z=a.openSettings)==null||z.call(a)},l.querySelector(".runs").ontoggle=z=>{z.currentTarget.open&&Q()},window.addEventListener("production-settings-updated",W),H(),U(),_()?s.notionConfigured||D("Notion 连接尚未配置，请从任务设置打开系统设置；仍可仅测试 93 读取。"):D("请先在任务设置中补全 93 系统连接配置。")},dispose(){h=!0,m++,p++,u==null||u.unmount(),window.removeEventListener("production-settings-updated",W)}}}var vN=Object.defineProperty,$a=(n,a)=>vN(n,"name",{value:a,configurable:!0}),s0=!!(typeof window<"u"&&window.document&&window.document.createElement);function yr(n,a,{checkForDefaultPrevented:s=!0}={}){return $a(function(u){if(n==null||n(u),s===!1||!u||!u.defaultPrevented)return a==null?void 0:a(u)},"handleEvent")}$a(yr,"composeEventHandlers");function xN(n){var a;if(!s0)throw new Error("Cannot access window outside of the DOM");return((a=n==null?void 0:n.ownerDocument)==null?void 0:a.defaultView)??window}$a(xN,"getOwnerWindow");function Zd(n){if(!s0)throw new Error("Cannot access document outside of the DOM");return(n==null?void 0:n.ownerDocument)??document}$a(Zd,"getOwnerDocument");function l0(n,a=!1){const{activeElement:s}=Zd(n);if(!(s!=null&&s.nodeName))return null;if(o0(s)&&s.contentDocument)return l0(s.contentDocument.body,a);if(a){const l=s.getAttribute("aria-activedescendant");if(l){const u=Zd(s).getElementById(l);if(u)return u}}return s}$a(l0,"getActiveElement");function o0(n){return n.tagName==="IFRAME"}$a(o0,"isFrame");var bN=Object.defineProperty,Xf=(n,a)=>bN(n,"name",{value:a,configurable:!0});function Qd(n,a){if(typeof n=="function")return n(a);n!=null&&(n.current=a)}Xf(Qd,"setRef");function c0(...n){return a=>{let s=!1;const l=n.map(u=>{const h=Qd(u,a);return!s&&typeof h=="function"&&(s=!0),h});if(s)return()=>{for(let u=0;u<l.length;u++){const h=l[u];typeof h=="function"?h():Qd(n[u],null)}}}}Xf(c0,"composeRefs");function Ka(...n){return S.useCallback(c0(...n),n)}Xf(Ka,"useComposedRefs");var SN=Object.defineProperty,Wt=(n,a)=>SN(n,"name",{value:a,configurable:!0});function jN(n,a){const s=S.createContext(a);s.displayName=n+"Context";const l=Wt(h=>{const{children:f,...m}=h,p=S.useMemo(()=>m,Object.values(m));return o.jsx(s.Provider,{value:p,children:f})},"Provider");l.displayName=n+"Provider";function u(h,f={}){const{optional:m=!1}=f,p=S.useContext(s);if(p)return p;if(a!==void 0)return a;if(!m)throw new Error(`\`${h}\` must be used within \`${n}\``)}return Wt(u,"useContext"),[l,u]}Wt(jN,"createContext");function u0(n,a=[]){let s=[];function l(h,f){const m=S.createContext(f);m.displayName=h+"Context";const p=s.length;s=[...s,f];const g=Wt(x=>{var A;const{scope:b,children:E,...w}=x,N=((A=b==null?void 0:b[n])==null?void 0:A[p])||m,T=S.useMemo(()=>w,Object.values(w));return o.jsx(N.Provider,{value:T,children:E})},"Provider");g.displayName=h+"Provider";function v(x,b,E={}){var A;const{optional:w=!1}=E,N=((A=b==null?void 0:b[n])==null?void 0:A[p])||m,T=S.useContext(N);if(T)return T;if(f!==void 0)return f;if(!w)throw new Error(`\`${x}\` must be used within \`${h}\``)}return Wt(v,"useContext"),[g,v]}Wt(l,"createContext");const u=Wt(()=>{const h=s.map(f=>S.createContext(f));return Wt(function(m){const p=(m==null?void 0:m[n])||h;return S.useMemo(()=>({[`__scope${n}`]:{...m,[n]:p}}),[m,p])},"useScope")},"createScope");return u.scopeName=n,[l,d0(u,...a)]}Wt(u0,"createContextScope");function d0(...n){const a=n[0];if(n.length===1)return a;const s=Wt(()=>{const l=n.map(u=>({useScope:u(),scopeName:u.scopeName}));return Wt(function(h){const f=l.reduce((m,{useScope:p,scopeName:g})=>{const x=p(h)[`__scope${g}`];return{...m,...x}},{});return S.useMemo(()=>({[`__scope${a.scopeName}`]:f}),[f])},"useComposedScopes")},"createScope");return s.scopeName=a.scopeName,s}Wt(d0,"composeContextScopes");var br=globalThis!=null&&globalThis.document?S.useLayoutEffect:()=>{},wN=Object.defineProperty,EN=(n,a)=>wN(n,"name",{value:a,configurable:!0}),TN=is[" useId ".trim().toString()]||(()=>{}),CN=0;function Ql(n){const[a,s]=S.useState(TN());return br(()=>{n||s(l=>l??String(CN++))},[n]),n||(a?`radix-${a}`:"")}EN(Ql,"useId");var NN=Object.defineProperty,DN=(n,a)=>NN(n,"name",{value:a,configurable:!0}),Ov=is[" useEffectEvent ".trim().toString()],zv=is[" useInsertionEffect ".trim().toString()];function f0(n){if(typeof Ov=="function")return Ov(n);const a=S.useRef(()=>{throw new Error("Cannot call an event handler while rendering.")});return typeof zv=="function"?zv(()=>{a.current=n}):br(()=>{a.current=n}),S.useMemo(()=>((...s)=>{var l;return(l=a.current)==null?void 0:l.call(a,...s)}),[])}DN(f0,"useEffectEvent");var AN=Object.defineProperty,ds=(n,a)=>AN(n,"name",{value:a,configurable:!0}),MN=is[" useInsertionEffect ".trim().toString()]||br;function h0({prop:n,defaultProp:a,onChange:s=ds(()=>{},"onChange"),caller:l}){const[u,h,f]=m0({defaultProp:a,onChange:s}),m=n!==void 0,p=m?n:u,g=S.useCallback(v=>{var x;if(m){const b=p0(v)?v(n):v;b!==n&&((x=f.current)==null||x.call(f,b))}else h(v)},[m,n,h,f]);return[p,g]}ds(h0,"useControllableState");function m0({defaultProp:n,onChange:a}){const[s,l]=S.useState(n),u=S.useRef(s),h=S.useRef(a);return MN(()=>{h.current=a},[a]),S.useEffect(()=>{var f;u.current!==s&&((f=h.current)==null||f.call(h,s),u.current=s)},[s,u]),[s,l,h]}ds(m0,"useUncontrolledState");function p0(n){return typeof n=="function"}ds(p0,"isFunction");var _v=Symbol("RADIX:SYNC_STATE");function kN(n,a,s,l){const{prop:u,defaultProp:h,onChange:f,caller:m}=a,p=u!==void 0,g=f0(f),v=[{...s,state:h}];l&&v.push(l);const[x,b]=S.useReducer((T,A)=>{if(A.type===_v)return{...T,state:A.state};const D=n(T,A);return p&&!Object.is(D.state,T.state)&&g(D.state),D},...v),E=x.state,w=S.useRef(E);S.useEffect(()=>{w.current!==E&&(w.current=E,p||g(E))},[E,w,p]);const N=S.useMemo(()=>u!==void 0?{...x,state:u}:x,[x,u]);return S.useEffect(()=>{p&&!Object.is(u,x.state)&&b({type:_v,state:u})},[u,x.state,p]),[N,b]}ds(kN,"useControllableStateReducer");var RN=Object.defineProperty,un=(n,a)=>RN(n,"name",{value:a,configurable:!0});function $f(n){const a=S.forwardRef((s,l)=>{let{children:u,...h}=s,f=null,m=!1;const p=[];Jd(u)&&typeof _l=="function"&&(u=_l(u._payload)),S.Children.forEach(u,b=>{var E;if(x0(b)){m=!0;const w=b;let N="child"in w.props?w.props.child:w.props.children;Jd(N)&&typeof _l=="function"&&(N=_l(N._payload)),f=zN(w,N),p.push((E=f==null?void 0:f.props)==null?void 0:E.children)}else p.push(b)}),f?f=S.cloneElement(f,void 0,p):!m&&S.Children.count(u)===1&&S.isValidElement(u)&&(f=u);const g=f?v0(f):void 0,v=Ka(l,g);if(!f){if(u||u===0)throw new Error(m?BN(n):VN(n));return u}const x=y0(h,f.props??{});return f.type!==S.Fragment&&(x.ref=l?v:g),S.cloneElement(f,x)});return a.displayName=`${n}.Slot`,a}un($f,"createSlot");var g0=Symbol.for("radix.slottable");function ON(n){const a=un(s=>"child"in s?s.children(s.child):s.children,"Slottable");return a.displayName=`${n}.Slottable`,a.__radixId=g0,a}un(ON,"createSlottable");var zN=un((n,a)=>{if("child"in n.props){const s=n.props.child;return S.isValidElement(s)?S.cloneElement(s,void 0,n.props.children(s.props.children)):null}return S.isValidElement(a)?a:null},"getSlottableElementFromSlottable");function y0(n,a){const s={...a};for(const l in a){const u=n[l],h=a[l];/^on[A-Z]/.test(l)?u&&h?s[l]=(...m)=>{const p=h(...m);return u(...m),p}:u&&(s[l]=u):l==="style"?s[l]={...u,...h}:l==="className"&&(s[l]=[u,h].filter(Boolean).join(" "))}return{...n,...s}}un(y0,"mergeProps");function v0(n){var l,u;let a=(l=Object.getOwnPropertyDescriptor(n.props,"ref"))==null?void 0:l.get,s=a&&"isReactWarning"in a&&a.isReactWarning;return s?n.ref:(a=(u=Object.getOwnPropertyDescriptor(n,"ref"))==null?void 0:u.get,s=a&&"isReactWarning"in a&&a.isReactWarning,s?n.props.ref:n.props.ref||n.ref)}un(v0,"getElementRef");function x0(n){return S.isValidElement(n)&&typeof n.type=="function"&&"__radixId"in n.type&&n.type.__radixId===g0}un(x0,"isSlottable");var _N=Symbol.for("react.lazy");function Jd(n){return n!=null&&typeof n=="object"&&"$$typeof"in n&&n.$$typeof===_N&&"_payload"in n&&b0(n._payload)}un(Jd,"isLazyComponent");function b0(n){return typeof n=="object"&&n!==null&&"then"in n}un(b0,"isPromiseLike");var VN=un(n=>`${n} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`,"createSlotError"),BN=un(n=>`${n} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`,"createSlottableError"),_l=is[" use ".trim().toString()],LN=Object.defineProperty,UN=(n,a)=>LN(n,"name",{value:a,configurable:!0}),HN=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","select","span","svg","ul"],$r=HN.reduce((n,a)=>{const s=$f(`Primitive.${a}`),l=S.forwardRef((u,h)=>{const{asChild:f,...m}=u,p=f?s:a;return typeof window<"u"&&(window[Symbol.for("radix-ui")]=!0),o.jsx(p,{...m,ref:h})});return l.displayName=`Primitive.${a}`,{...n,[a]:l}},{});function S0(n,a){n&&Ff.flushSync(()=>n.dispatchEvent(a))}UN(S0,"dispatchDiscreteCustomEvent");var qN=Object.defineProperty,YN=(n,a)=>qN(n,"name",{value:a,configurable:!0});function Pa(n){const a=S.useRef(n);return S.useEffect(()=>{a.current=n}),S.useMemo(()=>((...s)=>{var l;return(l=a.current)==null?void 0:l.call(a,...s)}),[])}YN(Pa,"useCallbackRef");var PN=Object.defineProperty,ut=(n,a)=>PN(n,"name",{value:a,configurable:!0}),Wd="dismissableLayer.update",GN="dismissableLayer.pointerDownOutside",FN="dismissableLayer.focusOutside",Vv,j0=S.createContext({layers:new Set,layersWithOutsidePointerEventsDisabled:new Set,branches:new Set,dismissableSurfaces:new Set}),XN=S.forwardRef(ut(function(a,s){const{disableOutsidePointerEvents:l=!1,deferPointerDownOutside:u=!1,onEscapeKeyDown:h,onPointerDownOutside:f,onFocusOutside:m,onInteractOutside:p,onDismiss:g,...v}=a,x=S.useContext(j0),[b,E]=S.useState(null),w=(b==null?void 0:b.ownerDocument)??(globalThis==null?void 0:globalThis.document),[,N]=S.useState({}),T=Ka(s,E),A=Array.from(x.layers),[D]=[...x.layersWithOutsidePointerEventsDisabled].slice(-1),_=D?A.indexOf(D):-1,O=b?A.indexOf(b):-1,U=x.layersWithOutsidePointerEventsDisabled.size>0,H=O>=_,M=S.useRef(!1),R=E0(ie=>{f==null||f(ie),p==null||p(ie),ie.defaultPrevented||g==null||g()},{ownerDocument:w,deferPointerDownOutside:u,isDeferredPointerDownOutsideRef:M,dismissableSurfaces:x.dismissableSurfaces,shouldHandlePointerDownOutside:S.useCallback(ie=>{if(!(ie instanceof Node))return!1;const J=[...x.branches].some(G=>G.contains(ie));return H&&!J},[x.branches,H])}),V=T0(ie=>{if(u&&M.current)return;const J=ie.target;[...x.branches].some(de=>de.contains(J))||(m==null||m(ie),p==null||p(ie),ie.defaultPrevented||g==null||g())},w),K=b?O===A.length-1:!1,Q=Pa(ie=>{ie.key==="Escape"&&(h==null||h(ie),!ie.defaultPrevented&&g&&(ie.preventDefault(),g()))});return S.useEffect(()=>{if(K)return w.addEventListener("keydown",Q,{capture:!0}),()=>w.removeEventListener("keydown",Q,{capture:!0})},[w,K,Q]),S.useEffect(()=>{if(b)return l&&(x.layersWithOutsidePointerEventsDisabled.size===0&&(Vv=w.body.style.pointerEvents,w.body.style.pointerEvents="none"),x.layersWithOutsidePointerEventsDisabled.add(b)),x.layers.add(b),Id(),()=>{l&&(x.layersWithOutsidePointerEventsDisabled.delete(b),x.layersWithOutsidePointerEventsDisabled.size===0&&(w.body.style.pointerEvents=Vv))}},[b,w,l,x]),S.useEffect(()=>()=>{b&&(x.layers.delete(b),x.layersWithOutsidePointerEventsDisabled.delete(b),Id())},[b,x]),S.useEffect(()=>{const ie=ut(()=>N({}),"handleUpdate");return document.addEventListener(Wd,ie),()=>document.removeEventListener(Wd,ie)},[]),o.jsx($r.div,{...v,ref:T,style:{pointerEvents:U?H?"auto":"none":void 0,...a.style},onFocusCapture:yr(a.onFocusCapture,V.onFocusCapture),onBlurCapture:yr(a.onBlurCapture,V.onBlurCapture),onPointerDownCapture:yr(a.onPointerDownCapture,R.onPointerDownCapture)})},"DismissableLayer"));function w0(){const n=S.useContext(j0),[a,s]=S.useState(null);return S.useEffect(()=>{if(a)return n.dismissableSurfaces.add(a),()=>{n.dismissableSurfaces.delete(a)}},[a,n.dismissableSurfaces]),s}ut(w0,"useDismissableLayerSurface");var $N=ut(()=>!0,"IS_TRUE");function E0(n,a){const{ownerDocument:s=globalThis==null?void 0:globalThis.document,deferPointerDownOutside:l=!1,isDeferredPointerDownOutsideRef:u,dismissableSurfaces:h,shouldHandlePointerDownOutside:f=$N}=a,m=Pa(n),p=S.useRef(!1),g=S.useRef(!1),v=S.useRef(new Map),x=S.useRef(()=>{});return S.useEffect(()=>{function b(){g.current=!1,u.current=!1,v.current.clear()}ut(b,"resetOutsideInteraction");function E(){return Array.from(v.current.values()).some(Boolean)}ut(E,"isOutsideInteractionIntercepted");function w(_){if(!g.current)return;const O=_.target;O instanceof Node&&[...h].some(H=>H.contains(O))||v.current.set(_.type,!0),_.type==="click"&&window.setTimeout(()=>{g.current&&x.current()},0)}ut(w,"handleInteractionCapture");function N(_){g.current&&v.current.set(_.type,!1)}ut(N,"handleInteractionBubble");const T=ut(_=>{if(_.target&&!p.current){let O=function(){s.removeEventListener("click",x.current);const H=E();b(),H||Kf(GN,m,U,{discrete:!0})};if(ut(O,"handleAndDispatchPointerDownOutsideEvent"),!f(_.target)){s.removeEventListener("click",x.current),b(),p.current=!1;return}const U={originalEvent:_};g.current=!0,u.current=l&&_.button===0,v.current.clear(),!l||_.button!==0?O():(s.removeEventListener("click",x.current),x.current=O,s.addEventListener("click",x.current,{once:!0}))}else s.removeEventListener("click",x.current),b();p.current=!1},"handlePointerDown"),A=["pointerup","mousedown","mouseup","touchstart","touchend","click"];for(const _ of A)s.addEventListener(_,w,!0),s.addEventListener(_,N);const D=window.setTimeout(()=>{s.addEventListener("pointerdown",T)},0);return()=>{window.clearTimeout(D),s.removeEventListener("pointerdown",T),s.removeEventListener("click",x.current);for(const _ of A)s.removeEventListener(_,w,!0),s.removeEventListener(_,N)}},[s,m,l,u,h,f]),{onPointerDownCapture:ut(()=>p.current=!0,"onPointerDownCapture")}}ut(E0,"usePointerDownOutside");function T0(n,a=globalThis==null?void 0:globalThis.document){const s=Pa(n),l=S.useRef(!1);return S.useEffect(()=>{const u=ut(h=>{h.target&&!l.current&&Kf(FN,s,{originalEvent:h},{discrete:!1})},"handleFocus");return a.addEventListener("focusin",u),()=>a.removeEventListener("focusin",u)},[a,s]),{onFocusCapture:ut(()=>l.current=!0,"onFocusCapture"),onBlurCapture:ut(()=>l.current=!1,"onBlurCapture")}}ut(T0,"useFocusOutside");function Id(){const n=new CustomEvent(Wd);document.dispatchEvent(n)}ut(Id,"dispatchUpdate");function Kf(n,a,s,{discrete:l}){const u=s.originalEvent.target,h=new CustomEvent(n,{bubbles:!1,cancelable:!0,detail:s});a&&u.addEventListener(n,a,{once:!0}),l?S0(u,h):u.dispatchEvent(h)}ut(Kf,"handleAndDispatchCustomEvent");var KN=Object.defineProperty,jt=(n,a)=>KN(n,"name",{value:a,configurable:!0}),hd="focusScope.autoFocusOnMount",md="focusScope.autoFocusOnUnmount",Bv={bubbles:!1,cancelable:!0},ZN=S.forwardRef(jt(function(a,s){const{loop:l=!1,trapped:u=!1,onMountAutoFocus:h,onUnmountAutoFocus:f,...m}=a,[p,g]=S.useState(null),v=Pa(h),x=Pa(f),b=S.useRef(null),E=Ka(s,g),w=S.useRef({paused:!1,pause(){this.paused=!0},resume(){this.paused=!1}}).current;S.useEffect(()=>{if(u){let T=function(O){if(w.paused||!p)return;const U=O.target;p.contains(U)?b.current=U:Yn(b.current,{select:!0})},A=function(O){if(w.paused||!p)return;const U=O.relatedTarget;U!==null&&(p.contains(U)||Yn(b.current,{select:!0}))},D=function(O){if(document.activeElement===document.body)for(const H of O)H.removedNodes.length>0&&Yn(p)};jt(T,"handleFocusIn"),jt(A,"handleFocusOut"),jt(D,"handleMutations"),document.addEventListener("focusin",T),document.addEventListener("focusout",A);const _=new MutationObserver(D);return p&&_.observe(p,{childList:!0,subtree:!0}),()=>{document.removeEventListener("focusin",T),document.removeEventListener("focusout",A),_.disconnect()}}},[u,p,w.paused]),S.useEffect(()=>{if(p){Lv.add(w);const T=document.activeElement;if(!p.contains(T)){const D=new CustomEvent(hd,Bv);p.addEventListener(hd,v),p.dispatchEvent(D),D.defaultPrevented||(C0(k0(Zf(p)),{select:!0}),document.activeElement===T&&Yn(p))}return()=>{p.removeEventListener(hd,v),setTimeout(()=>{const D=new CustomEvent(md,Bv);p.addEventListener(md,x),p.dispatchEvent(D),D.defaultPrevented||Yn(T??document.body,{select:!0}),p.removeEventListener(md,x),Lv.remove(w)},0)}}},[p,v,x,w]);const N=S.useCallback(T=>{if(!l&&!u||w.paused)return;const A=T.key==="Tab"&&!T.altKey&&!T.ctrlKey&&!T.metaKey,D=document.activeElement;if(A&&D){const _=T.currentTarget,[O,U]=N0(_);O&&U?!T.shiftKey&&D===U?(T.preventDefault(),l&&Yn(O,{select:!0})):T.shiftKey&&D===O&&(T.preventDefault(),l&&Yn(U,{select:!0})):D===_&&T.preventDefault()}},[l,u,w.paused]);return o.jsx($r.div,{tabIndex:-1,...m,ref:E,onKeyDown:N})},"FocusScope"));function C0(n,{select:a=!1}={}){const s=document.activeElement;for(const l of n)if(Yn(l,{select:a}),document.activeElement!==s)return}jt(C0,"focusFirst");function N0(n){const a=Zf(n),s=ef(a,n),l=ef(a.reverse(),n);return[s,l]}jt(N0,"getTabbableEdges");function Zf(n){const a=[],s=document.createTreeWalker(n,NodeFilter.SHOW_ELEMENT,{acceptNode:jt(l=>{const u=l.tagName==="INPUT"&&l.type==="hidden";return l.disabled||l.hidden||u?NodeFilter.FILTER_SKIP:l.tabIndex>=0?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP},"acceptNode")});for(;s.nextNode();)a.push(s.currentNode);return a}jt(Zf,"getTabbableCandidates");function ef(n,a){const s=typeof a.checkVisibility=="function"&&a.checkVisibility({checkVisibilityCSS:!0});for(const l of n)if(!(s?!l.checkVisibility({checkVisibilityCSS:!0}):D0(l,{upTo:a})))return l}jt(ef,"findVisible");function D0(n,{upTo:a}){if(getComputedStyle(n).visibility==="hidden")return!0;for(;n;){if(a!==void 0&&n===a)return!1;if(getComputedStyle(n).display==="none")return!0;n=n.parentElement}return!1}jt(D0,"isHidden");function A0(n){return n instanceof HTMLInputElement&&"select"in n}jt(A0,"isSelectableInput");function Yn(n,{select:a=!1}={}){if(n&&n.focus){const s=document.activeElement;n.focus({preventScroll:!0}),n!==s&&A0(n)&&a&&n.select()}}jt(Yn,"focus");var Lv=M0();function M0(){let n=[];return{add(a){const s=n[0];a!==s&&(s==null||s.pause()),n=tf(n,a),n.unshift(a)},remove(a){var s;n=tf(n,a),(s=n[0])==null||s.resume()}}}jt(M0,"createFocusScopesStack");function tf(n,a){const s=[...n],l=s.indexOf(a);return l!==-1&&s.splice(l,1),s}jt(tf,"arrayRemove");function k0(n){return n.filter(a=>a.tagName!=="A")}jt(k0,"removeLinks");var QN=Object.defineProperty,JN=(n,a)=>QN(n,"name",{value:a,configurable:!0}),WN=S.forwardRef(JN(function(a,s){var p;const{container:l,...u}=a,[h,f]=S.useState(!1);br(()=>f(!0),[]);const m=l||h&&((p=globalThis==null?void 0:globalThis.document)==null?void 0:p.body);return m?Ff.createPortal(o.jsx($r.div,{...u,ref:s}),m):null},"Portal")),IN=Object.defineProperty,Pn=(n,a)=>IN(n,"name",{value:a,configurable:!0});function R0(n,a){return S.useReducer((s,l)=>a[s][l]??s,n)}Pn(R0,"useStateMachine");var Qf=Pn(n=>{const{present:a,children:s}=n,l=O0(a),u=typeof s=="function"?s({present:l.isPresent}):S.Children.only(s),h=z0(l.ref,_0(u));return typeof s=="function"||l.isPresent?S.cloneElement(u,{ref:h}):null},"Presence");function O0(n){const[a,s]=S.useState(),l=S.useRef(null),u=S.useRef(n),h=S.useRef("none"),f=S.useRef(void 0),m=n?"mounted":"unmounted",[p,g]=R0(m,{mounted:{UNMOUNT:"unmounted",ANIMATION_OUT:"unmountSuspended"},unmountSuspended:{MOUNT:"mounted",ANIMATION_END:"unmounted"},unmounted:{MOUNT:"mounted"}});return S.useEffect(()=>{p==="mounted"?(h.current=f.current??Va(l.current),f.current=void 0):h.current="none"},[p]),br(()=>{const v=l.current,x=u.current;if(x!==n){const E=h.current,w=Va(v);n?(f.current=w,g("MOUNT")):w==="none"||(v==null?void 0:v.display)==="none"?g("UNMOUNT"):g(x&&E!==w?"ANIMATION_OUT":"UNMOUNT"),u.current=n}},[n,g]),br(()=>{if(a){let v;const x=a.ownerDocument.defaultView??window,b=Pn(w=>{const T=Va(l.current).includes(CSS.escape(w.animationName));if(w.target===a&&T&&(g("ANIMATION_END"),!u.current)){const A=a.style.animationFillMode;a.style.animationFillMode="forwards",v=x.setTimeout(()=>{a.style.animationFillMode==="forwards"&&(a.style.animationFillMode=A)})}},"handleAnimationEnd"),E=Pn(w=>{w.target===a&&(h.current=Va(l.current))},"handleAnimationStart");return a.addEventListener("animationstart",E),a.addEventListener("animationcancel",b),a.addEventListener("animationend",b),()=>{x.clearTimeout(v),a.removeEventListener("animationstart",E),a.removeEventListener("animationcancel",b),a.removeEventListener("animationend",b)}}else g("ANIMATION_END")},[a,g]),{isPresent:["mounted","unmountSuspended"].includes(p),ref:S.useCallback(v=>{if(v){const x=getComputedStyle(v);l.current=x,f.current=Va(x)}else l.current=null;s(v)},[])}}Pn(O0,"usePresence");function nf(n,a){if(typeof n=="function")return n(a);n!=null&&(n.current=a)}Pn(nf,"setRef");function z0(...n){const a=S.useRef(n);return a.current=n,S.useCallback(s=>{const l=a.current;let u=!1;const h=l.map(f=>{const m=nf(f,s);return!u&&typeof m=="function"&&(u=!0),m});if(u)return()=>{for(let f=0;f<h.length;f++){const m=h[f];typeof m=="function"?m():nf(l[f],null)}}},[])}Pn(z0,"useStableComposedRefs");function Va(n){return(n==null?void 0:n.animationName)||"none"}Pn(Va,"getAnimationName");function _0(n){var l,u;let a=(l=Object.getOwnPropertyDescriptor(n.props,"ref"))==null?void 0:l.get,s=a&&"isReactWarning"in a&&a.isReactWarning;return s?n.ref:(a=(u=Object.getOwnPropertyDescriptor(n,"ref"))==null?void 0:u.get,s=a&&"isReactWarning"in a&&a.isReactWarning,s?n.props.ref:n.props.ref||n.ref)}Pn(_0,"getElementRef");var eD=Object.defineProperty,Jf=(n,a)=>eD(n,"name",{value:a,configurable:!0}),Vl=0,pn=null;function tD(n){return Wf(),n.children}Jf(tD,"FocusGuards");function Wf(){S.useEffect(()=>{pn||(pn={start:rf(),end:rf()});const{start:n,end:a}=pn;return document.body.firstElementChild!==n&&document.body.insertAdjacentElement("afterbegin",n),document.body.lastElementChild!==a&&document.body.insertAdjacentElement("beforeend",a),Vl++,()=>{Vl===1&&(pn==null||pn.start.remove(),pn==null||pn.end.remove(),pn=null),Vl=Math.max(0,Vl-1)}},[])}Jf(Wf,"useFocusGuards");function rf(){const n=document.createElement("span");return n.setAttribute("data-radix-focus-guard",""),n.tabIndex=0,n.style.outline="none",n.style.opacity="0",n.style.position="fixed",n.style.pointerEvents="none",n}Jf(rf,"createFocusGuard");var vn=function(){return vn=Object.assign||function(a){for(var s,l=1,u=arguments.length;l<u;l++){s=arguments[l];for(var h in s)Object.prototype.hasOwnProperty.call(s,h)&&(a[h]=s[h])}return a},vn.apply(this,arguments)};function V0(n,a){var s={};for(var l in n)Object.prototype.hasOwnProperty.call(n,l)&&a.indexOf(l)<0&&(s[l]=n[l]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var u=0,l=Object.getOwnPropertySymbols(n);u<l.length;u++)a.indexOf(l[u])<0&&Object.prototype.propertyIsEnumerable.call(n,l[u])&&(s[l[u]]=n[l[u]]);return s}function nD(n,a,s){if(s||arguments.length===2)for(var l=0,u=a.length,h;l<u;l++)(h||!(l in a))&&(h||(h=Array.prototype.slice.call(a,0,l)),h[l]=a[l]);return n.concat(h||Array.prototype.slice.call(a))}var Jl="right-scroll-bar-position",Wl="width-before-scroll-bar",rD="with-scroll-bars-hidden",aD="--removed-body-scroll-bar-size";function pd(n,a){return typeof n=="function"?n(a):n&&(n.current=a),n}function iD(n,a){var s=S.useState(function(){return{value:n,callback:a,facade:{get current(){return s.value},set current(l){var u=s.value;u!==l&&(s.value=l,s.callback(l,u))}}}})[0];return s.callback=a,s.facade}var sD=typeof window<"u"?S.useLayoutEffect:S.useEffect,Uv=new WeakMap;function lD(n,a){var s=iD(null,function(l){return n.forEach(function(u){return pd(u,l)})});return sD(function(){var l=Uv.get(s);if(l){var u=new Set(l),h=new Set(n),f=s.current;u.forEach(function(m){h.has(m)||pd(m,null)}),h.forEach(function(m){u.has(m)||pd(m,f)})}Uv.set(s,n)},[n]),s}function oD(n){return n}function cD(n,a){a===void 0&&(a=oD);var s=[],l=!1,u={read:function(){if(l)throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");return s.length?s[s.length-1]:n},useMedium:function(h){var f=a(h,l);return s.push(f),function(){s=s.filter(function(m){return m!==f})}},assignSyncMedium:function(h){for(l=!0;s.length;){var f=s;s=[],f.forEach(h)}s={push:function(m){return h(m)},filter:function(){return s}}},assignMedium:function(h){l=!0;var f=[];if(s.length){var m=s;s=[],m.forEach(h),f=s}var p=function(){var v=f;f=[],v.forEach(h)},g=function(){return Promise.resolve().then(p)};g(),s={push:function(v){f.push(v),g()},filter:function(v){return f=f.filter(v),s}}}};return u}function uD(n){n===void 0&&(n={});var a=cD(null);return a.options=vn({async:!0,ssr:!1},n),a}var B0=function(n){var a=n.sideCar,s=V0(n,["sideCar"]);if(!a)throw new Error("Sidecar: please provide `sideCar` property to import the right car");var l=a.read();if(!l)throw new Error("Sidecar medium not found");return S.createElement(l,vn({},s))};B0.isSideCarExport=!0;function dD(n,a){return n.useMedium(a),B0}var L0=uD(),gd=function(){},No=S.forwardRef(function(n,a){var s=S.useRef(null),l=S.useState({onScrollCapture:gd,onWheelCapture:gd,onTouchMoveCapture:gd}),u=l[0],h=l[1],f=n.forwardProps,m=n.children,p=n.className,g=n.removeScrollBar,v=n.enabled,x=n.shards,b=n.sideCar,E=n.noRelative,w=n.noIsolation,N=n.inert,T=n.allowPinchZoom,A=n.as,D=A===void 0?"div":A,_=n.gapMode,O=V0(n,["forwardProps","children","className","removeScrollBar","enabled","shards","sideCar","noRelative","noIsolation","inert","allowPinchZoom","as","gapMode"]),U=b,H=lD([s,a]),M=vn(vn({},O),u);return S.createElement(S.Fragment,null,v&&S.createElement(U,{sideCar:L0,removeScrollBar:g,shards:x,noRelative:E,noIsolation:w,inert:N,setCallbacks:h,allowPinchZoom:!!T,lockRef:s,gapMode:_}),f?S.cloneElement(S.Children.only(m),vn(vn({},M),{ref:H})):S.createElement(D,vn({},M,{className:p,ref:H}),m))});No.defaultProps={enabled:!0,removeScrollBar:!0,inert:!1};No.classNames={fullWidth:Wl,zeroRight:Jl};var fD=function(){if(typeof __webpack_nonce__<"u")return __webpack_nonce__};function hD(){if(!document)return null;var n=document.createElement("style");n.type="text/css";var a=fD();return a&&n.setAttribute("nonce",a),n}function mD(n,a){n.styleSheet?n.styleSheet.cssText=a:n.appendChild(document.createTextNode(a))}function pD(n){var a=document.head||document.getElementsByTagName("head")[0];a.appendChild(n)}var gD=function(){var n=0,a=null;return{add:function(s){n==0&&(a=hD())&&(mD(a,s),pD(a)),n++},remove:function(){n--,!n&&a&&(a.parentNode&&a.parentNode.removeChild(a),a=null)}}},yD=function(){var n=gD();return function(a,s){S.useEffect(function(){return n.add(a),function(){n.remove()}},[a&&s])}},U0=function(){var n=yD(),a=function(s){var l=s.styles,u=s.dynamic;return n(l,u),null};return a},vD={left:0,top:0,right:0,gap:0},yd=function(n){return parseInt(n||"",10)||0},xD=function(n){var a=window.getComputedStyle(document.body),s=a[n==="padding"?"paddingLeft":"marginLeft"],l=a[n==="padding"?"paddingTop":"marginTop"],u=a[n==="padding"?"paddingRight":"marginRight"];return[yd(s),yd(l),yd(u)]},bD=function(n){if(n===void 0&&(n="margin"),typeof window>"u")return vD;var a=xD(n),s=document.documentElement.clientWidth,l=window.innerWidth;return{left:a[0],top:a[1],right:a[2],gap:Math.max(0,l-s+a[2]-a[0])}},SD=U0(),Ha="data-scroll-locked",jD=function(n,a,s,l){var u=n.left,h=n.top,f=n.right,m=n.gap;return s===void 0&&(s="margin"),`
  .`.concat(rD,` {
   overflow: hidden `).concat(l,`;
   padding-right: `).concat(m,"px ").concat(l,`;
  }
  body[`).concat(Ha,`] {
    overflow: hidden `).concat(l,`;
    overscroll-behavior: contain;
    `).concat([a&&"position: relative ".concat(l,";"),s==="margin"&&`
    padding-left: `.concat(u,`px;
    padding-top: `).concat(h,`px;
    padding-right: `).concat(f,`px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(m,"px ").concat(l,`;
    `),s==="padding"&&"padding-right: ".concat(m,"px ").concat(l,";")].filter(Boolean).join(""),`
  }
  
  .`).concat(Jl,` {
    right: `).concat(m,"px ").concat(l,`;
  }
  
  .`).concat(Wl,` {
    margin-right: `).concat(m,"px ").concat(l,`;
  }
  
  .`).concat(Jl," .").concat(Jl,` {
    right: 0 `).concat(l,`;
  }
  
  .`).concat(Wl," .").concat(Wl,` {
    margin-right: 0 `).concat(l,`;
  }
  
  body[`).concat(Ha,`] {
    `).concat(aD,": ").concat(m,`px;
  }
`)},Hv=function(){var n=parseInt(document.body.getAttribute(Ha)||"0",10);return isFinite(n)?n:0},wD=function(){S.useEffect(function(){return document.body.setAttribute(Ha,(Hv()+1).toString()),function(){var n=Hv()-1;n<=0?document.body.removeAttribute(Ha):document.body.setAttribute(Ha,n.toString())}},[])},ED=function(n){var a=n.noRelative,s=n.noImportant,l=n.gapMode,u=l===void 0?"margin":l;wD();var h=S.useMemo(function(){return bD(u)},[u]);return S.createElement(SD,{styles:jD(h,!a,u,s?"":"!important")})},af=!1;if(typeof window<"u")try{var Bl=Object.defineProperty({},"passive",{get:function(){return af=!0,!0}});window.addEventListener("test",Bl,Bl),window.removeEventListener("test",Bl,Bl)}catch{af=!1}var Ra=af?{passive:!1}:!1,TD=function(n){return n.tagName==="TEXTAREA"},H0=function(n,a){if(!(n instanceof Element))return!1;var s=window.getComputedStyle(n);return s[a]!=="hidden"&&!(s.overflowY===s.overflowX&&!TD(n)&&s[a]==="visible")},CD=function(n){return H0(n,"overflowY")},ND=function(n){return H0(n,"overflowX")},qv=function(n,a){var s=a.ownerDocument,l=a;do{typeof ShadowRoot<"u"&&l instanceof ShadowRoot&&(l=l.host);var u=q0(n,l);if(u){var h=Y0(n,l),f=h[1],m=h[2];if(f>m)return!0}l=l.parentNode}while(l&&l!==s.body);return!1},DD=function(n){var a=n.scrollTop,s=n.scrollHeight,l=n.clientHeight;return[a,s,l]},AD=function(n){var a=n.scrollLeft,s=n.scrollWidth,l=n.clientWidth;return[a,s,l]},q0=function(n,a){return n==="v"?CD(a):ND(a)},Y0=function(n,a){return n==="v"?DD(a):AD(a)},MD=function(n,a){return n==="h"&&a==="rtl"?-1:1},kD=function(n,a,s,l,u){var h=MD(n,window.getComputedStyle(a).direction),f=h*l,m=s.target,p=a.contains(m),g=!1,v=f>0,x=0,b=0;do{if(!m)break;var E=Y0(n,m),w=E[0],N=E[1],T=E[2],A=N-T-h*w;(w||A)&&q0(n,m)&&(x+=A,b+=w);var D=m.parentNode;m=D&&D.nodeType===Node.DOCUMENT_FRAGMENT_NODE?D.host:D}while(!p&&m!==document.body||p&&(a.contains(m)||a===m));return(v&&Math.abs(x)<1||!v&&Math.abs(b)<1)&&(g=!0),g},Ll=function(n){return"changedTouches"in n?[n.changedTouches[0].clientX,n.changedTouches[0].clientY]:[0,0]},Yv=function(n){return[n.deltaX,n.deltaY]},Pv=function(n){return n&&"current"in n?n.current:n},RD=function(n,a){return n[0]===a[0]&&n[1]===a[1]},OD=function(n){return`
  .block-interactivity-`.concat(n,` {pointer-events: none;}
  .allow-interactivity-`).concat(n,` {pointer-events: all;}
`)},zD=0,Oa=[];function _D(n){var a=S.useRef([]),s=S.useRef([0,0]),l=S.useRef(),u=S.useState(zD++)[0],h=S.useState(U0)[0],f=S.useRef(n);S.useEffect(function(){f.current=n},[n]),S.useEffect(function(){if(n.inert){document.body.classList.add("block-interactivity-".concat(u));var N=nD([n.lockRef.current],(n.shards||[]).map(Pv),!0).filter(Boolean);return N.forEach(function(T){return T.classList.add("allow-interactivity-".concat(u))}),function(){document.body.classList.remove("block-interactivity-".concat(u)),N.forEach(function(T){return T.classList.remove("allow-interactivity-".concat(u))})}}},[n.inert,n.lockRef.current,n.shards]);var m=S.useCallback(function(N,T){if("touches"in N&&N.touches.length===2||N.type==="wheel"&&N.ctrlKey)return!f.current.allowPinchZoom;var A=Ll(N),D=s.current,_="deltaX"in N?N.deltaX:D[0]-A[0],O="deltaY"in N?N.deltaY:D[1]-A[1],U,H=N.target,M=Math.abs(_)>Math.abs(O)?"h":"v";if("touches"in N&&M==="h"&&H.type==="range")return!1;var R=window.getSelection(),V=R&&R.anchorNode,K=V?V===H||V.contains(H):!1;if(K)return!1;var Q=qv(M,H);if(!Q)return!0;if(Q?U=M:(U=M==="v"?"h":"v",Q=qv(M,H)),!Q)return!1;if(!l.current&&"changedTouches"in N&&(_||O)&&(l.current=U),!U)return!0;var ie=l.current||U;return kD(ie,T,N,ie==="h"?_:O)},[]),p=S.useCallback(function(N){var T=N;if(!(!Oa.length||Oa[Oa.length-1]!==h)){var A="deltaY"in T?Yv(T):Ll(T),D=a.current.filter(function(U){return U.name===T.type&&(U.target===T.target||T.target===U.shadowParent)&&RD(U.delta,A)})[0];if(D&&D.should){T.cancelable&&T.preventDefault();return}if(!D){var _=(f.current.shards||[]).map(Pv).filter(Boolean).filter(function(U){return U.contains(T.target)}),O=_.length>0?m(T,_[0]):!f.current.noIsolation;O&&T.cancelable&&T.preventDefault()}}},[]),g=S.useCallback(function(N,T,A,D){var _={name:N,delta:T,target:A,should:D,shadowParent:VD(A)};a.current.push(_),setTimeout(function(){a.current=a.current.filter(function(O){return O!==_})},1)},[]),v=S.useCallback(function(N){s.current=Ll(N),l.current=void 0},[]),x=S.useCallback(function(N){g(N.type,Yv(N),N.target,m(N,n.lockRef.current))},[]),b=S.useCallback(function(N){g(N.type,Ll(N),N.target,m(N,n.lockRef.current))},[]);S.useEffect(function(){return Oa.push(h),n.setCallbacks({onScrollCapture:x,onWheelCapture:x,onTouchMoveCapture:b}),document.addEventListener("wheel",p,Ra),document.addEventListener("touchmove",p,Ra),document.addEventListener("touchstart",v,Ra),function(){Oa=Oa.filter(function(N){return N!==h}),document.removeEventListener("wheel",p,Ra),document.removeEventListener("touchmove",p,Ra),document.removeEventListener("touchstart",v,Ra)}},[]);var E=n.removeScrollBar,w=n.inert;return S.createElement(S.Fragment,null,w?S.createElement(h,{styles:OD(u)}):null,E?S.createElement(ED,{noRelative:n.noRelative,gapMode:n.gapMode}):null)}function VD(n){for(var a=null;n!==null;)n instanceof ShadowRoot&&(a=n.host,n=n.host),n=n.parentNode;return a}const BD=dD(L0,_D);var P0=S.forwardRef(function(n,a){return S.createElement(No,vn({},n,{ref:a,sideCar:BD}))});P0.classNames=No.classNames;var LD=function(n){if(typeof document>"u")return null;var a=Array.isArray(n)?n[0]:n;return a.ownerDocument.body},za=new WeakMap,Ul=new WeakMap,Hl={},vd=0,G0=function(n){return n&&(n.host||G0(n.parentNode))},UD=function(n,a){return a.map(function(s){if(n.contains(s))return s;var l=G0(s);return l&&n.contains(l)?l:(console.error("aria-hidden",s,"in not contained inside",n,". Doing nothing"),null)}).filter(function(s){return!!s})},HD=function(n,a,s,l){var u=UD(a,Array.isArray(n)?n:[n]);Hl[s]||(Hl[s]=new WeakMap);var h=Hl[s],f=[],m=new Set,p=new Set(u),g=function(x){!x||m.has(x)||(m.add(x),g(x.parentNode))};u.forEach(g);var v=function(x){!x||p.has(x)||Array.prototype.forEach.call(x.children,function(b){if(m.has(b))v(b);else try{var E=b.getAttribute(l),w=E!==null&&E!=="false",N=(za.get(b)||0)+1,T=(h.get(b)||0)+1;za.set(b,N),h.set(b,T),f.push(b),N===1&&w&&Ul.set(b,!0),T===1&&b.setAttribute(s,"true"),w||b.setAttribute(l,"true")}catch(A){console.error("aria-hidden: cannot operate on ",b,A)}})};return v(a),m.clear(),vd++,function(){f.forEach(function(x){var b=za.get(x)-1,E=h.get(x)-1;za.set(x,b),h.set(x,E),b||(Ul.has(x)||x.removeAttribute(l),Ul.delete(x)),E||x.removeAttribute(s)}),vd--,vd||(za=new WeakMap,za=new WeakMap,Ul=new WeakMap,Hl={})}},qD=function(n,a,s){s===void 0&&(s="data-aria-hidden");var l=Array.from(Array.isArray(n)?n:[n]),u=LD(n);return u?(l.push.apply(l,Array.from(u.querySelectorAll("[aria-live], script"))),HD(l,u,s,"aria-hidden")):function(){return null}},YD=Object.defineProperty,nn=(n,a)=>YD(n,"name",{value:a,configurable:!0}),If="Dialog",[F0,GA]=u0(If),[PD,jn]=F0(If),mo=nn(n=>{const{__scopeDialog:a,children:s,open:l,defaultOpen:u,onOpenChange:h,modal:f=!0}=n,m=S.useRef(null),p=S.useRef(null),[g,v]=h0({prop:l,defaultProp:u??!1,onChange:h,caller:If}),[x,b]=S.useState(0),[E,w]=S.useState(0);return o.jsx(PD,{scope:a,triggerRef:m,contentRef:p,contentId:Ql(),titleId:Ql(),descriptionId:Ql(),titlePresent:x>0,descriptionPresent:E>0,setTitleCount:b,setDescriptionCount:w,open:g,onOpenChange:v,onOpenToggle:S.useCallback(()=>v(N=>!N),[v]),modal:f,children:s})},"Dialog"),X0="DialogPortal",[GD,$0]=F0(X0,{forceMount:void 0}),po=nn(n=>{const{__scopeDialog:a,forceMount:s,children:l,container:u}=n,h=jn(X0,a);return o.jsx(GD,{scope:a,forceMount:s,children:S.Children.map(l,f=>o.jsx(Qf,{present:s||h.open,children:o.jsx(WN,{asChild:!0,container:u,children:f})}))})},"DialogPortal"),sf="DialogOverlay",go=S.forwardRef(nn(function(a,s){const l=$0(sf,a.__scopeDialog),{forceMount:u=l.forceMount,...h}=a,f=jn(sf,a.__scopeDialog);return f.modal?o.jsx(Qf,{present:u||f.open,children:o.jsx(XD,{...h,ref:s})}):null},"DialogOverlay")),FD=$f("DialogOverlay.RemoveScroll"),XD=S.forwardRef(nn(function(a,s){const{__scopeDialog:l,...u}=a,h=jn(sf,l),f=w0(),m=Ka(s,f);return o.jsx(P0,{as:FD,allowPinchZoom:!0,shards:[h.contentRef],children:o.jsx($r.div,{"data-state":eh(h.open),...u,ref:m,style:{pointerEvents:"auto",...u.style}})})},"DialogOverlayImpl")),rs="DialogContent",yo=S.forwardRef(nn(function(a,s){const l=$0(rs,a.__scopeDialog),{forceMount:u=l.forceMount,...h}=a,f=jn(rs,a.__scopeDialog);return o.jsx(Qf,{present:u||f.open,children:f.modal?o.jsx($D,{...h,ref:s}):o.jsx(KD,{...h,ref:s})})},"DialogContent")),$D=S.forwardRef(nn(function(a,s){const l=jn(rs,a.__scopeDialog),u=S.useRef(null),h=Ka(s,l.contentRef,u);return S.useEffect(()=>{const f=u.current;if(f)return qD(f)},[]),o.jsx(K0,{...a,ref:h,trapFocus:l.open,disableOutsidePointerEvents:l.open,onCloseAutoFocus:yr(a.onCloseAutoFocus,f=>{var m;f.preventDefault(),(m=l.triggerRef.current)==null||m.focus()}),onPointerDownOutside:yr(a.onPointerDownOutside,f=>{const m=f.detail.originalEvent,p=m.button===0&&m.ctrlKey===!0;(m.button===2||p)&&f.preventDefault()}),onFocusOutside:yr(a.onFocusOutside,f=>f.preventDefault())})},"DialogContentModal")),KD=S.forwardRef(nn(function(a,s){const l=jn(rs,a.__scopeDialog),u=S.useRef(!1),h=S.useRef(!1);return o.jsx(K0,{...a,ref:s,trapFocus:!1,disableOutsidePointerEvents:!1,onCloseAutoFocus:f=>{var m,p;(m=a.onCloseAutoFocus)==null||m.call(a,f),f.defaultPrevented||(u.current||(p=l.triggerRef.current)==null||p.focus(),f.preventDefault()),u.current=!1,h.current=!1},onInteractOutside:f=>{var g,v;(g=a.onInteractOutside)==null||g.call(a,f),f.defaultPrevented||(u.current=!0,f.detail.originalEvent.type==="pointerdown"&&(h.current=!0));const m=f.target;((v=l.triggerRef.current)==null?void 0:v.contains(m))&&f.preventDefault(),f.detail.originalEvent.type==="focusin"&&h.current&&f.preventDefault()}})},"DialogContentNonModal")),K0=S.forwardRef(nn(function(a,s){const{__scopeDialog:l,trapFocus:u,onOpenAutoFocus:h,onCloseAutoFocus:f,...m}=a,p=jn(rs,l);return Wf(),o.jsx(o.Fragment,{children:o.jsx(ZN,{asChild:!0,loop:!0,trapped:u,onMountAutoFocus:h,onUnmountAutoFocus:f,children:o.jsx(XN,{role:"dialog",id:p.contentId,"aria-describedby":p.descriptionPresent?p.descriptionId:void 0,"aria-labelledby":p.titlePresent?p.titleId:void 0,"data-state":eh(p.open),...m,ref:s,deferPointerDownOutside:!0,onDismiss:()=>p.onOpenChange(!1)})})})},"DialogContentImpl")),ZD="DialogTitle",vo=S.forwardRef(nn(function(a,s){const{__scopeDialog:l,...u}=a,h=jn(ZD,l),{setTitleCount:f}=h;return br(()=>(f(m=>m+1),()=>f(m=>m-1)),[f]),o.jsx($r.h2,{id:h.titleId,...u,ref:s})},"DialogTitle")),QD="DialogDescription",xo=S.forwardRef(nn(function(a,s){const{__scopeDialog:l,...u}=a,h=jn(QD,l),{setDescriptionCount:f}=h;return br(()=>(f(m=>m+1),()=>f(m=>m-1)),[f]),o.jsx($r.p,{id:h.descriptionId,...u,ref:s})},"DialogDescription")),JD="DialogClose",bo=S.forwardRef(nn(function(a,s){const{__scopeDialog:l,...u}=a,h=jn(JD,l);return o.jsx($r.button,{type:"button",...u,ref:s,onClick:yr(a.onClick,()=>h.onOpenChange(!1))})},"DialogClose"));function eh(n){return n?"open":"closed"}nn(eh,"getState");function WD({onCreated:n,onBack:a,onCancel:s}){const[l,u]=S.useState(2),[h,f]=S.useState("日报任务"),[m,p]=S.useState("17:30"),[g,v]=S.useState(!1),[x,b]=S.useState("");async function E(){v(!0),b("");try{const w=await me("daily.create",{name:h.trim(),sendTime:m});await n(w)}catch(w){b(w instanceof Error?w.message:String(w))}finally{v(!1)}}return o.jsxs(o.Fragment,{children:[o.jsx(ID,{current:l}),x&&o.jsx("div",{className:"notice error",role:"alert",children:o.jsxs("div",{children:[o.jsx("strong",{children:"创建失败"}),o.jsx("span",{children:x})]})}),l===2?o.jsxs("div",{className:"automation-create-step",children:[o.jsxs("div",{children:[o.jsx("h3",{children:"基本信息"}),o.jsx("p",{children:"名称用于在自动化任务列表中识别这份日报。"})]}),o.jsxs("label",{children:["任务名称",o.jsx("input",{value:h,autoFocus:!0,onChange:w=>f(w.target.value)})]}),o.jsxs("div",{className:"dialog-actions",children:[o.jsxs("button",{className:"ghost",onClick:a,children:[o.jsx(ns,{}),"返回选择类型"]}),o.jsx("button",{className:"primary",disabled:!h.trim(),onClick:()=>u(3),children:"下一步"})]})]}):o.jsxs("div",{className:"automation-create-step",children:[o.jsxs("div",{children:[o.jsx("h3",{children:"日报必要配置"}),o.jsx("p",{children:"先确定每天的发送时间；消息字段和测试发送在创建后的专用 Tab 中完成。"})]}),o.jsxs("label",{children:["每天发送时间",o.jsx("input",{type:"time",value:m,onChange:w=>p(w.target.value)})]}),o.jsxs("div",{className:"automation-create-summary",children:[o.jsx("span",{children:"任务类型"}),o.jsx("strong",{children:"日报推送"}),o.jsx("span",{children:"创建后继续"}),o.jsx("strong",{children:"消息内容 → 预览与测试"})]}),o.jsxs("div",{className:"dialog-actions",children:[o.jsxs("button",{className:"ghost",disabled:g,onClick:()=>u(2),children:[o.jsx(ns,{}),"上一步"]}),o.jsx("button",{className:"secondary",disabled:g,onClick:s,children:"取消"}),o.jsxs("button",{className:"primary",disabled:g||!m,onClick:E,children:[g&&o.jsx(Sn,{className:"spin"}),"创建任务"]})]})]})]})}function ID({current:n}){return o.jsxs("ol",{className:"automation-create-progress","aria-label":"新建任务进度",children:[o.jsx("li",{className:"done",children:"1 选择类型"}),o.jsx("li",{className:n===2?"current":"done",children:"2 基本信息"}),o.jsx("li",{className:n===3?"current":"",children:"3 必要配置"})]})}function eA({onCreated:n,onBack:a,onCancel:s}){const[l,u]=S.useState(2),[h,f]=S.useState("原材料入库自动填报"),[m,p]=S.useState(""),[g,v]=S.useState(""),[x,b]=S.useState(""),[E,w]=S.useState(!1),[N,T]=S.useState("");async function A(){w(!0),T("");try{const D=await me("notionFill.create",{name:h.trim(),sourcePageUrl:m.trim(),username:g.trim(),password:x});await n(D)}catch(D){T(D instanceof Error?D.message:String(D))}finally{w(!1)}}return o.jsxs(o.Fragment,{children:[o.jsx(tA,{current:l}),N&&o.jsx("div",{className:"notice error",role:"alert",children:o.jsxs("div",{children:[o.jsx("strong",{children:"创建失败"}),o.jsx("span",{children:N})]})}),l===2?o.jsxs("div",{className:"automation-create-step",children:[o.jsxs("div",{children:[o.jsx("h3",{children:"基本信息"}),o.jsx("p",{children:"名称用于在自动化任务列表中识别这份填报任务。"})]}),o.jsxs("label",{children:["任务名称",o.jsx("input",{value:h,autoFocus:!0,onChange:D=>f(D.target.value)})]}),o.jsxs("div",{className:"dialog-actions",children:[o.jsxs("button",{className:"ghost",onClick:a,children:[o.jsx(ns,{}),"返回选择类型"]}),o.jsx("button",{className:"primary",disabled:!h.trim(),onClick:()=>u(3),children:"下一步"})]})]}):o.jsxs("div",{className:"automation-create-step",children:[o.jsxs("div",{children:[o.jsx("h3",{children:"93 系统连接"}),o.jsx("p",{children:"凭据只归 NotionFill 任务所有，并使用现有 Windows 加密存储。"})]}),o.jsxs("label",{children:["材料入库业务页面",o.jsx("input",{type:"url",value:m,placeholder:"http://服务器/业务页面",autoFocus:!0,onChange:D=>p(D.target.value)})]}),o.jsxs("label",{children:["93 系统用户名",o.jsx("input",{value:g,autoComplete:"username",onChange:D=>v(D.target.value)})]}),o.jsxs("label",{children:["93 系统密码",o.jsx("input",{type:"password",value:x,autoComplete:"new-password",onChange:D=>b(D.target.value)})]}),o.jsxs("div",{className:"automation-create-summary",children:[o.jsx("span",{children:"填报目标"}),o.jsx("strong",{children:"原材料入库数据库"}),o.jsx("span",{children:"执行时间"}),o.jsx("strong",{children:"每天 00:00 · 填报前一天"}),o.jsx("span",{children:"写入方式"}),o.jsx("strong",{children:"按日期查重，仅新增"})]}),o.jsxs("div",{className:"dialog-actions",children:[o.jsxs("button",{className:"ghost",disabled:E,onClick:()=>u(2),children:[o.jsx(ns,{}),"上一步"]}),o.jsx("button",{className:"secondary",disabled:E,onClick:s,children:"取消"}),o.jsxs("button",{className:"primary",disabled:E||!m.trim()||!g.trim()||!x,onClick:A,children:[E&&o.jsx(Sn,{className:"spin"}),"创建任务"]})]})]})]})}function tA({current:n}){return o.jsxs("ol",{className:"automation-create-progress","aria-label":"新建任务进度",children:[o.jsx("li",{className:"done",children:"1 选择类型"}),o.jsx("li",{className:n===2?"current":"done",children:"2 基本信息"}),o.jsx("li",{className:n===3?"current":"",children:"3 必要配置"})]})}const Gv=["firstTarget","secondTarget","dateHeader","label"],Fv=n=>n.rowStep?`每天向下 ${n.rowStep} 行`:`每天向右 ${n.columnStep} 列`;function nA(){const n=new Intl.DateTimeFormat("en",{timeZone:"Asia/Shanghai",year:"numeric",month:"2-digit"}).formatToParts(new Date);return`${n.find(a=>a.type==="year").value}-${n.find(a=>a.type==="month").value}`}function rA({id:n,metrics:a,initialMetric:s,rules:l,requireTeaching:u=!1,fixedSheet:h,disabled:f,run:m,onActive:p,onSaved:g}){var Q,ie;const[v,x]=S.useState(s||((Q=a[0])==null?void 0:Q.value)||""),[b]=S.useState(nA),[E,w]=S.useState(`${b}-01`),[N,T]=S.useState(`${b}-02`),[A,D]=S.useState(),[_,O]=S.useState({}),[U,H]=S.useState(""),M=!!A,R=((ie=a.find(J=>J.value===v))==null?void 0:ie.label)||"业务字段",V={firstTarget:`${E} 的${R}填报格`,secondTarget:`${N} 的${R}填报格`,dateHeader:`${E} 的日期单元格`,label:"项目名称、公司或材料表头"};async function K(J){H(""),await m(J==="preview"?"验证排列并定位第三个日期":J==="confirm"?"保存排列规则":"记录示范位置",async()=>{try{const G=await me("tencentSheet.teach",{id:n,stage:J,metric:v,firstDate:E,secondDate:N,sessionToken:A==null?void 0:A.sessionToken,previewToken:A==null?void 0:A.previewToken,slot:A==null?void 0:A.step},3e5);J==="confirm"||J==="cancel"?(D(void 0),O({}),p(!1),J==="confirm"&&await g()):(D(de=>({...de,...G})),p(!0),G.capture&&G.slot&&O(de=>({...de,[G.slot]:G.capture})))}catch(G){H(G instanceof Error?G.message:String(G)),J==="cancel"&&(D(void 0),O({}),p(!1))}})}return o.jsxs("fieldset",{className:"tencent-sheet-panel tencent-teaching",disabled:f,children:[o.jsx("legend",{children:"示范填报位置"}),o.jsxs("p",{className:"tencent-sheet-help",children:["为每个项目记录排列规则。示范两个日期的位置，程序学习向右或向下的间隔，再请你确认第三个位置。",u?"新文档须完成各项示范，网页适配不会推断业务位置。":"未示范的项目沿用原模板。"]}),o.jsx("div",{className:"tencent-teaching-rules",children:a.map(J=>o.jsxs("div",{children:[o.jsx("strong",{children:J.label}),o.jsx("span",{children:l!=null&&l[J.value]?Fv(l[J.value]):u?"待示范位置":"沿用原模板"})]},J.value))}),U&&o.jsx("div",{className:"notice error",role:"alert",children:o.jsxs("div",{children:[o.jsx("strong",{children:"示范未完成"}),o.jsx("span",{children:U})]})}),M?o.jsxs(o.Fragment,{children:[o.jsx("ol",{className:"tencent-teaching-steps","aria-label":"示范进度",children:Gv.map((J,G)=>{var de;return o.jsxs("li",{"aria-current":A.step===J?"step":void 0,className:_[J]?"done":"",children:[o.jsxs("span",{children:[G+1,". ",V[J]]}),o.jsx("strong",{children:((de=_[J])==null?void 0:de.address)||"待选取"})]},J)})}),Gv.includes(A.step)&&o.jsxs("div",{className:"tencent-teaching-prompt",children:[o.jsxs("strong",{children:["请在网页中单击：",V[A.step]]}),o.jsx("p",{children:A.step==="dateHeader"?"选择显示该日期的单元格，程序会检查后续日期是否按同样间隔排列。":A.step==="label"?"选择一处固定的文字标志，用于确认每次填写的仍是这个项目。":"只选中单元格即可，不需要输入数据。已有数据的格子也可用于示范。"}),o.jsx("button",{className:"primary",onClick:()=>K("capture"),children:"记住当前选中的单元格"})]}),A.step==="preview"&&o.jsx("button",{className:"primary",onClick:()=>K("preview"),children:"验证规则并查看第三个位置"}),A.step==="confirm"&&A.rule&&A.prediction&&o.jsxs("div",{className:"tencent-teaching-prompt",children:[o.jsxs("strong",{children:[R,"：",Fv(A.rule)]}),o.jsxs("p",{children:["程序已选中 ",A.prediction.date," 的预测位置 ",o.jsx("b",{children:A.prediction.address}),"。请查看网页，确认它确实是当天的填报格。"]}),o.jsxs("p",{children:["日期及“",A.rule.labelAnchor.expected,"”已通过只读校验。"]}),(A.sheetMode==="fixed"||!A.sheetMode&&h)&&!A.rule.dateAnchor.format.includes("{yyyy}")&&o.jsx("p",{children:"日期未包含完整年月。此固定工作表跨月时需重新示范确认。"}),o.jsxs("div",{className:"tencent-sheet-actions",children:[o.jsx("button",{className:"secondary",onClick:()=>K("preview"),children:"再次定位预测位置"}),o.jsx("button",{className:"primary",onClick:()=>K("confirm"),children:"位置正确，保存此项目"})]})]}),o.jsx("button",{className:"ghost",onClick:()=>K("cancel"),children:"取消示范，保留原配置"})]}):o.jsxs(o.Fragment,{children:[o.jsxs("label",{children:["要示范哪个项目？",o.jsx(Ie,{value:v,options:a,placeholder:"选择项目",disabled:f,ariaLabel:"要示范的项目",onChange:x})]}),o.jsxs("div",{className:"tencent-sheet-grid",children:[o.jsx(tn,{value:E,onChange:w,label:"第一个示范日期",disabled:f}),o.jsx(tn,{value:N,onChange:T,label:"第二个示范日期",disabled:f})]}),o.jsx("p",{className:"tencent-sheet-help",children:"先在网页选中要配置的工作表。两个日期必须在同一个月，建议使用 1 日和 2 日。"}),o.jsx("button",{className:"secondary",disabled:f||!v||!E||!N,onClick:()=>K("start"),children:l!=null&&l[v]?"重新示范此项目":"开始示范此项目"})]})]})}function aA({id:n,field:a,disabled:s,onSave:l,onCancel:u}){const[h,f]=S.useState(a.notion??{sourceId:"",valueFieldId:"",queryMode:"date",dateFieldId:"",datasetId:"",period:"day"}),[m,p]=S.useState([]),[g,v]=S.useState([]),[x,b]=S.useState([]),[E,w]=S.useState(!1),[N,T]=S.useState(!1),[A,D]=S.useState("");S.useEffect(()=>{let R=!0;return me("tencentSheet.sources",{id:n}).then(V=>{R&&p(V.sources)}).catch(V=>{R&&D(String(V))}),()=>{R=!1}},[n]),S.useEffect(()=>{let R=!0;if(v([]),D(""),w(!1),!!h.sourceId)return w(!0),me("tencentSheet.schema",{id:n,sourceId:h.sourceId}).then(V=>{R&&v(V.fields)}).catch(V=>{R&&D(String(V))}).finally(()=>{R&&w(!1)}),()=>{R=!1}},[n,h.sourceId]),S.useEffect(()=>{let R=!0;if(b([]),T(!1),!(h.queryMode!=="view"||!h.sourceId))return T(!0),me("tencentSheet.views",{id:n,sourceId:h.sourceId},12e4).then(V=>{R&&b(V.views)}).catch(V=>{R&&D(String(V))}).finally(()=>{R&&T(!1)}),()=>{R=!1}},[n,h.sourceId,h.queryMode]);const _=R=>R.map(V=>({value:V.id,label:V.name})),O=g.filter(R=>["number","formula","rollup"].includes(R.type??"")),U=g.filter(R=>R.type==="date"),H=s||E||h.queryMode==="view"&&N,M=m.some(R=>R.id===h.sourceId)&&O.some(R=>R.id===h.valueFieldId)&&(h.queryMode==="date"?U.some(R=>R.id===h.dateFieldId):x.some(R=>R.id===h.datasetId));return o.jsxs("fieldset",{className:"tencent-sheet-panel",disabled:s,children:[o.jsxs("legend",{children:["绑定 Notion：",a.name]}),o.jsx("p",{className:"tencent-sheet-help",children:"这个字段的网页位置已配置。现在选择它的数据来源，按数据库原值汇总，不自动换算单位。"}),o.jsxs("label",{children:["Notion 数据库",o.jsx(Ie,{value:h.sourceId,options:_(m),placeholder:"选择已有数据库",ariaLabel:"Notion 数据库",disabled:H,onChange:R=>f({...h,sourceId:R,valueFieldId:"",dateFieldId:"",datasetId:""})})]}),o.jsxs("label",{children:["取数方式",o.jsx(Ie,{value:h.queryMode,options:[{value:"date",label:"按业务日期筛选后汇总"},{value:"view",label:"汇总指定 View 的筛选结果"}],placeholder:"选择取数方式",disabled:H,onChange:R=>{D(""),f({...h,queryMode:R})}})]}),o.jsxs("div",{className:"tencent-sheet-grid",children:[o.jsxs("label",{children:["数值字段",o.jsx(Ie,{value:h.valueFieldId,options:_(O),placeholder:"选择要汇总的数值字段",disabled:H,onChange:R=>f({...h,valueFieldId:R})})]}),h.queryMode==="date"?o.jsxs("label",{children:["日期字段",o.jsx(Ie,{value:h.dateFieldId,options:_(U),placeholder:"选择用于筛选的日期字段",disabled:H,onChange:R=>f({...h,dateFieldId:R})})]}):o.jsxs("label",{children:["Notion View",o.jsx(Ie,{value:h.datasetId,options:_(x),placeholder:"选择真实 View",disabled:H,onChange:R=>f({...h,datasetId:R})})]})]}),h.queryMode==="date"?o.jsxs("label",{children:["统计范围",o.jsx(Ie,{value:h.period,options:[{value:"day",label:"业务当天"},{value:"month",label:"本月至业务当天"},{value:"year",label:"本年至业务当天"}],placeholder:"选择统计范围",disabled:H,onChange:R=>f({...h,period:R})})]}):o.jsx("p",{className:"tencent-sheet-help",children:"使用该 View 在 Notion 中的真实筛选结果，不额外添加日期条件。"}),(E||N)&&o.jsx("p",{role:"status",children:"正在读取数据库结构…"}),A&&o.jsx("p",{role:"alert",children:A}),o.jsxs("div",{className:"tencent-sheet-actions",children:[o.jsx("button",{className:"primary",disabled:H||!M,onClick:()=>{var R,V,K;return l({...h,sourceName:(R=m.find(Q=>Q.id===h.sourceId))==null?void 0:R.name,valueFieldName:(V=O.find(Q=>Q.id===h.valueFieldId))==null?void 0:V.name,datasetName:(K=x.find(Q=>Q.id===h.datasetId))==null?void 0:K.name})},children:"保存数据绑定"}),o.jsx("button",{className:"secondary",disabled:s,onClick:u,children:"取消绑定"})]})]})}const iA={nameBox:"左上角显示单元格地址的输入框",valueBox:"显示单元格内容的编辑区",activeSheet:"底部工作表标签"},lf=n=>n instanceof Error?n.message:String(n);function sA({onCreated:n,onCancel:a}){var g;const[s,l]=S.useState({documentUrl:""}),[u,h]=S.useState(!1),[f,m]=S.useState("");async function p(){h(!0),m("");try{await n(await me("tencentSheet.create",{config:s}))}catch(v){m(lf(v))}finally{h(!1)}}return o.jsxs("div",{className:"automation-create-step",children:[o.jsxs("div",{children:[o.jsx("h3",{children:"连接生产填报文档"}),o.jsx("p",{children:"选择已保存的网页适配，再为这份文档新增业务字段并示范位置。"})]}),o.jsxs("label",{children:["文档分享链接",o.jsx("input",{type:"url",value:s.documentUrl||"",onChange:v=>l({...s,documentUrl:v.target.value}),placeholder:"粘贴腾讯文档或企业微信文档链接"})]}),o.jsx(Wb,{value:s.siteProfileId??"",disabled:u,onChange:v=>l(x=>({...x,siteProfileId:v}))}),f&&o.jsx("p",{role:"alert",children:f}),o.jsxs("div",{className:"dialog-actions",children:[o.jsx("button",{className:"secondary",disabled:u,onClick:a,children:"取消"}),o.jsxs("button",{className:"primary",disabled:u||!((g=s.documentUrl)!=null&&g.trim())||!s.siteProfileId,onClick:p,children:[u&&o.jsx(Sn,{className:"spin"}),"创建并配置"]})]})]})}function lA({id:n,changed:a}){const[s,l]=S.useState(),[u,h]=S.useState(""),[f,m]=S.useState(""),[p,g]=S.useState(!1),[v,x]=S.useState([]),[b,E]=S.useState(!1),[w,N]=S.useState(""),[T,A]=S.useState({}),[D,_]=S.useState(),[O,U]=S.useState(!1),[H,M]=S.useState(!1),[R,V]=S.useState(""),[K,Q]=S.useState(""),[ie,J]=S.useState(""),[G,de]=S.useState(""),[L,ne]=S.useState(),W=()=>me("tencentSheet.get",{id:n}).then(l);S.useEffect(()=>{W().catch($=>{g(!0),m(lf($))})},[n]);async function Y($,pe){h($),m(""),g(!1);try{await pe()}catch(ke){g(!0),m(lf(ke))}finally{h("")}}function te(){ne(void 0),_(void 0)}function C($){l(pe=>pe&&{...pe,config:$}),U(!0),te()}async function z($,pe){te(),l(await me("tencentSheet.updateField",{id:n,fieldId:$.id,name:$.name,unit:$.unit,...pe?{notion:pe}:{}})),de(""),a()}async function re(){if(!s)return;const $=await me("tencentSheet.save",{id:n,config:s.config});l($),U(!1),_(void 0),a()}async function ce($,pe){O&&await re(),te();const ke=await me(`tencentSheet.${$}`,{id:n,key:pe},3e5);m(ke.message),ke.missing&&x(ke.missing),$==="pick"&&pe&&x(Xe=>Xe.filter(lt=>lt!==pe&&!(pe==="activeSheet"&&lt==="sheetTabs"))),await W()}if(!s)return o.jsx("div",{className:"notice",role:"status",children:f||"正在读取填报配置…"});const ue=s.config,fe=ue.fields??[],be=fe.find($=>$.id===ie),oe=fe.find($=>$.id===G),I=fe.some($=>$.notion||!$.legacyKey),he=fe.filter($=>$.legacyKey&&!$.notion),se=!!u||H||!!oe,ge=$=>($==="activeSheet"?["activeSheet","sheetTabs"]:[$]).every(pe=>!v.includes(pe)&&!!ue.adapter[pe]);return o.jsxs("div",{className:"tencent-sheet-workbench","aria-busy":!!u,children:[o.jsxs("div",{className:"tencent-sheet-intro",children:[o.jsxs("div",{children:[o.jsx("h2",{children:"腾讯文档生产填报"}),o.jsx("p",{children:"连接一次，检查本次数据，再确认填报。目标格已有内容时会停止。"})]}),o.jsx("span",{children:"Development 测试"})]}),f&&o.jsx("div",{className:`notice ${p?"error":"info"}`,role:p?"alert":"status",children:o.jsxs("div",{children:[o.jsx("strong",{children:p?"操作未完成":"操作结果"}),o.jsx("span",{children:f})]})}),o.jsx(Wb,{value:ue.siteProfileId??"",disabled:!!u||H||!!oe,allowLegacy:!0,onChange:$=>C({...ue,siteProfileId:$})}),o.jsxs("fieldset",{disabled:se,className:"tencent-sheet-panel",children:[o.jsx("legend",{children:"1 · 连接文档"}),o.jsxs("label",{children:["文档链接",o.jsx("input",{type:"url",value:ue.documentUrl,onChange:$=>C({...ue,documentUrl:$.target.value})})]}),o.jsxs("div",{className:"tencent-sheet-actions",children:[o.jsx("button",{className:"secondary",onClick:()=>Y("打开文档",()=>ce("open")),children:"打开文档 / 扫码登录"}),o.jsx("button",{className:"primary",onClick:()=>Y("识别页面",()=>ce("recognize")),children:"识别并检查"})]}),o.jsx("p",{className:"tencent-sheet-help",children:"首次使用扫码登录。识别过程只获取网页控件位置，不填写数据。"}),ue.siteProfileId?o.jsx("p",{className:"tencent-sheet-help",children:"工作表标签、名称框和内容编辑区使用所选网页适配，其他文档可以复用。"}):o.jsxs("div",{className:"tencent-sheet-guidance",children:[o.jsx("strong",{children:"网页识别位置"}),o.jsx("p",{className:"tencent-sheet-help",children:"本任务保留原有控件配置。也可在任务列表中录制公共网页适配，供其他文档复用。"}),Object.entries(iA).map(([$,pe])=>o.jsxs("div",{children:[o.jsxs("span",{children:[pe,o.jsx("small",{className:"tencent-control-state",children:ge($)?"已记录":"待选取"})]}),o.jsx("button",{className:"secondary","aria-label":`点选${pe}`,onClick:()=>Y("选取网页位置",()=>ce("pick",$)),children:ge($)?"重新点选":"去网页点选"})]},$))]}),o.jsxs("div",{className:"tencent-sheet-guidance",children:[o.jsx("strong",{children:"这份文档填写哪个工作表"}),o.jsx("p",{className:"tencent-sheet-help",children:"先在已打开的网页底部点击目标工作表，再点下方按钮保存它的名称。示范位置时也会自动保存当前工作表。"}),o.jsx("button",{className:"secondary",onClick:()=>Y("记住工作表",()=>ce("captureSheet")),children:"记住网页当前工作表"}),o.jsxs("span",{children:[ue.capturedSheet?`已记住：${ue.capturedSheet}`:ue.sheetMode==="fixed"?`已记住：${ue.sheetName}`:"尚未记住，请选择工作表或开始示范位置",ue.capturedSheet&&ue.sheetMode!=="fixed"?" · 填报时自动切换到业务月份":""]})]}),O&&o.jsx("button",{className:"primary",onClick:()=>Y("保存配置",async()=>{await re(),m("配置已保存，请重新检查本次数据。")}),children:"保存文档配置"})]}),o.jsxs("fieldset",{disabled:se||O,className:"tencent-sheet-panel",children:[o.jsx("legend",{children:"2 · 自定义业务字段"}),o.jsx("p",{className:"tencent-sheet-help",children:"新增你要填写的业务名称，示范两个日期的位置并确认第三个位置，再选择对应的 Notion 数据库。"}),o.jsxs("div",{className:"tencent-sheet-grid",children:[o.jsxs("label",{children:["业务字段名称",o.jsx("input",{value:R,placeholder:"例如：合格数量",onChange:$=>V($.target.value)})]}),o.jsxs("label",{children:["单位（可选）",o.jsx("input",{value:K,placeholder:"例如：件",onChange:$=>Q($.target.value)})]})]}),o.jsx("button",{className:"primary",disabled:!R.trim(),onClick:()=>Y("新增业务字段",async()=>{var pe,ke;te();const $=await me("tencentSheet.addField",{id:n,name:R,unit:K});l($),J(((ke=(pe=$.config.fields)==null?void 0:pe.at(-1))==null?void 0:ke.id)??""),V(""),Q(""),a()}),children:"新增业务字段"}),!fe.length&&o.jsx("p",{children:"还没有业务字段，请先新增。新文档没有预设业务。"}),o.jsx("div",{className:"tencent-sheet-guidance",children:fe.map($=>{var pe,ke;return o.jsxs("div",{children:[o.jsxs("span",{children:[o.jsxs("strong",{children:[$.name,$.unit?`（${$.unit}）`:""]}),o.jsxs("small",{className:"tencent-control-state",children:[(pe=ue.rules)!=null&&pe[$.id]?"位置已示范":$.legacyKey?"保留原任务位置":"待示范位置"," · ",$.notion?`${$.notion.sourceName??"Notion"} / ${$.notion.valueFieldName??"数值字段"}`:$.legacyKey?"保留原任务手动输入":"待绑定数据库"]})]}),o.jsxs("div",{className:"tencent-sheet-actions",children:[o.jsxs("button",{className:"secondary",onClick:()=>{J($.id),te()},children:["示范位置：",$.name]}),o.jsxs("button",{className:"secondary",disabled:!((ke=ue.rules)!=null&&ke[$.id])&&!$.legacyKey,onClick:()=>{de($.id),te()},children:["绑定数据：",$.name]}),o.jsxs("button",{className:"ghost",onClick:()=>Y("删除业务字段",async()=>{te(),l(await me("tencentSheet.deleteField",{id:n,fieldId:$.id})),ie===$.id&&J(""),a()}),children:["删除：",$.name]})]})]},$.id)})})]}),be&&!oe&&o.jsx(rA,{id:n,metrics:[{value:be.id,label:be.name}],initialMetric:be.id,rules:ue.rules,requireTeaching:!be.legacyKey,fixedSheet:ue.sheetMode==="fixed",disabled:!!u||O,run:Y,onActive:$=>{M($),$&&te()},onSaved:async()=>{await W(),te(),J(""),de(be.id),m("位置已保存，请为这个字段选择 Notion 数据来源。"),a()}},`${n}:${be.id}:${JSON.stringify(ue.rules)}`),oe&&o.jsx(aA,{id:n,field:oe,disabled:!!u,onCancel:()=>de(""),onSave:$=>Y("保存数据绑定",()=>z(oe,$))},oe.id),o.jsxs("fieldset",{disabled:se||O,className:"tencent-sheet-panel",children:[o.jsx("legend",{children:"3 · 本次填报数据"}),o.jsxs("label",{className:"tencent-sheet-date-mode",children:[o.jsx("input",{type:"checkbox",checked:b,onChange:$=>{E($.target.checked),te()}}),"指定补填日期"]}),b?o.jsx(tn,{label:"业务日期",disabled:!!u,value:w,onChange:$=>{N($),te()}}):o.jsx("p",{children:"默认填报前一天，按北京时间计算。"}),o.jsx("div",{className:"tencent-sheet-grid",children:he.map($=>o.jsxs("label",{children:[$.name,$.unit?`（${$.unit}）`:"",o.jsx("input",{type:"number",step:"any",inputMode:"decimal",value:T[$.id]??"",placeholder:"输入本次实际数据",onChange:pe=>{A({...T,[$.id]:pe.target.value}),te()}})]},$.id))}),I&&o.jsx("button",{className:"secondary",disabled:!fe.length||b&&!w||he.some($=>{var pe;return!((pe=T[$.id])!=null&&pe.trim())})||fe.some($=>{var pe;return!$.legacyKey&&(!((pe=ue.rules)!=null&&pe[$.id])||!$.notion)}),onClick:()=>Y("获取 Notion 数据",async()=>{te(),ne(await me("tencentSheet.fetch",{id:n,businessDate:b?w:void 0,values:T},3e5)),m("取数完成，请核对来源、日期和数值后检查网页位置。")}),children:"获取本次 Notion 数据"}),L&&o.jsxs("div",{className:"tencent-sheet-table",children:[o.jsxs("p",{children:["业务日期：",L.date]}),o.jsxs("table",{children:[o.jsx("thead",{children:o.jsxs("tr",{children:[o.jsx("th",{children:"业务字段"}),o.jsx("th",{children:"数值"}),o.jsx("th",{children:"来源与范围"}),o.jsx("th",{children:"记录数"})]})}),o.jsx("tbody",{children:L.rows.map($=>o.jsxs("tr",{children:[o.jsx("td",{children:$.name}),o.jsxs("td",{children:[$.value," ",$.unit]}),o.jsxs("td",{children:[$.source," · ",$.period]}),o.jsx("td",{children:$.recordCount})]},$.id))})]})]}),o.jsx("button",{className:"primary",disabled:!fe.length||b&&!w||(I?!L:he.some($=>{var pe;return!((pe=T[$.id])!=null&&pe.trim())})),onClick:()=>Y("检查填报位置",async()=>{_(void 0);const $=await me("tencentSheet.inspect",{id:n,values:T,dataToken:L==null?void 0:L.dataToken,businessDate:(L==null?void 0:L.date)??(b?w:void 0)},3e5);_($),m($.message),a()}),children:"检查本次数据与位置"})]}),D&&o.jsxs("section",{className:"tencent-sheet-panel",children:[o.jsx("h3",{children:"4 · 确认填报"}),o.jsxs("p",{children:[D.date," · ",D.sheet]}),o.jsx("div",{className:"tencent-sheet-table",children:o.jsxs("table",{children:[o.jsx("thead",{children:o.jsxs("tr",{children:[o.jsx("th",{children:"项目"}),o.jsx("th",{children:"位置"}),o.jsx("th",{children:"原内容"}),o.jsx("th",{children:"本次填报"})]})}),o.jsx("tbody",{children:D.rows.map($=>o.jsxs("tr",{children:[o.jsx("td",{children:$.label}),o.jsx("td",{children:$.address}),o.jsx("td",{children:$.current||"空白"}),o.jsx("td",{children:$.value})]},$.address))})]})}),o.jsx("p",{children:D.conflict?"目标格已有内容，本次不可写入。":"将仅填写以上空白单元格。确认有效期为 2 分钟。"}),o.jsxs("button",{className:"primary",disabled:se||!D.token||D.conflict,onClick:()=>Y("填报并确认保存",async()=>{const $=D;_(void 0);const pe=await me("tencentSheet.write",{id:n,values:T,dataToken:L==null?void 0:L.dataToken,businessDate:$.date,token:$.token},31e4);m(pe.message),a()}),children:["确认填报以上 ",D.rows.length," 项"]})]}),u&&o.jsxs("p",{role:"status",className:"tencent-sheet-progress",children:[o.jsx(Sn,{className:"spin"}),u,"… 请等待操作结束"]})]})}const Z0=[{taskType:"tencent_sheet_fill",name:"腾讯文档填报",includeBasics:!1,description:"连接生产月报，检查位置后填写下料、装焊与材料入库数据。",renderCreate:n=>o.jsx(sA,{...n}),taskTabs:[{id:"configuration",label:"配置与填报"}],resolveSection:()=>"configuration",issueTitle:()=>"请完成文档连接与位置检查",renderEditor:n=>o.jsx(lA,{id:n.id,changed:n.changed}),loadRuns:n=>me("tencentSheet.runs",{id:n}).then(({runs:a})=>a.map(s=>({...s,title:s.businessDate,details:s.message?[s.message]:[]})))},{taskType:"daily_report",name:"日报推送",description:"查询日报数据、生成消息并发送钉钉。",renderCreate:n=>o.jsx(WD,{...n}),taskTabs:[{id:"configuration",label:"任务配置"},{id:"execution",label:"运行与测试"}],resolveSection:n=>n==="basics"?"basics":n==="template"?"configuration":"execution",issueTitle:n=>n==="notification"?"通知渠道未就绪":n==="template"?"日报配置尚未验证":"基本信息不完整",renderEditor:n=>o.jsx(a0,{id:n.id,back:()=>n.navigate("list"),changed:n.changed,openSettings:n.openSettings}),loadRuns:n=>me("daily.runs",{id:n}).then(({runs:a})=>a.map(s=>({id:s.id,time:s.time,source:s.source,status:s.status,title:s.textSummary||`业务日期 ${s.businessDate||"—"}`,details:[`业务日期：${s.businessDate||"—"}`,`阶段：${s.stage}`,`尝试：${s.attempts}`],error:s.error})))},{taskType:"notion_fill",name:"Notion 自动填报",description:"读取 93 系统前一天入库数据并新增到 Notion。",renderCreate:n=>o.jsx(eA,{...n}),taskTabs:[{id:"configuration",label:"任务配置"},{id:"execution",label:"运行与测试"}],resolveSection:n=>n==="basics"?"basics":n==="test"?"execution":"configuration",issueTitle:n=>n==="connection"?"93 系统连接未就绪":n==="target"?"Notion 填报目标未就绪":n==="test"?"任务尚未完成只读测试":"基本信息不完整",renderEditor:n=>o.jsx(i0,{id:n.id,back:()=>n.navigate("list"),changed:n.changed,openSettings:n.openSettings}),loadRuns:n=>me("notionFill.runs",{id:n}).then(({runs:a})=>a.map(s=>({id:s.id,time:s.time,source:s.source==="source-test"?"93读取测试":s.source==="test"?"只读测试":s.source==="manual"?"手动执行":"自动执行",status:s.status==="created"?"已新增":s.status==="checked"?"已检查":"失败",title:`${s.businessDate} · 板材 ${s.plateWeight.toLocaleString("zh-CN",{maximumFractionDigits:3})} 吨 · 型材 ${s.sectionWeight.toLocaleString("zh-CN",{maximumFractionDigits:3})} 吨`,details:[s.message].filter(Boolean),error:s.error})))}];function Xv(n){return Z0.find(a=>a.taskType===n)}const xd=n=>({tone:"error",title:"操作失败",message:n instanceof Error?n.message:String(n)});function oA({openSettings:n}){var J;const[a,s]=S.useState([]),[l,u]=S.useState(),[h,f]=S.useState(""),[m,p]=S.useState(""),[g,v]=S.useState(),[x,b]=S.useState(),[E,w]=S.useState(),[N,T]=S.useState(!1),[A,D]=S.useState(!1),[_,O]=S.useState(!1),[U,H]=S.useState(""),[M,R]=S.useState(["daily_report","notion_fill"]),V=()=>me("automation.list").then(G=>{G.availableTaskTypes&&R(G.availableTaskTypes);const de=Array.isArray(G.tasks)?G.tasks:a;return s(de),u(L=>L&&(de.find(ne=>ne.taskType===L.taskType&&ne.id===L.id)||L)),de});S.useEffect(()=>{V().catch(G=>v(xd(G)))},[]),S.useEffect(()=>{if(!x)return;const G=()=>b(void 0),de=L=>L.key==="Escape"&&G();return window.addEventListener("pointerdown",G),window.addEventListener("keydown",de),window.addEventListener("blur",G),()=>{window.removeEventListener("pointerdown",G),window.removeEventListener("keydown",de),window.removeEventListener("blur",G)}},[x]);async function K(G,de){const L=await V();O(!1),H(""),u(L.find(ne=>ne.taskType===G&&ne.id===de.id))}async function Q(G){p(G.id),v(void 0);try{const de=await me("automation.setEnabled",{taskType:G.taskType,id:G.id,enabled:!G.isEnabled},6e4);de.missingStep?(f(de.missingStep),u(G),v({tone:"warning",title:"配置尚未完成",message:de.message||""})):await V()}catch(de){v(xd(de))}finally{p("")}}async function ie(G){if(!G.isEnabled){p(G.id);try{await me("automation.delete",{taskType:G.taskType,id:G.id}),w(void 0),await V()}catch(de){v(xd(de))}finally{p("")}}}if(N)return o.jsxs("div",{className:"page daily-page",children:[o.jsxs("header",{children:[o.jsxs("div",{children:[o.jsx("h1",{children:"网页适配配置"}),o.jsx("p",{children:"录制网站共用的控件，供不同文档任务复用。"})]}),o.jsx("button",{className:"secondary",disabled:A,onClick:()=>T(!1),children:"返回任务列表"})]}),o.jsx(eN,{onActive:D})]});if(l){const G=Xv(l.taskType);if(G)return o.jsx(cA,{openSettings:n,task:l,definition:G,focusStep:h,notice:g,refresh:V,back:()=>{u(void 0),f(""),v(void 0),V()}})}return o.jsxs("div",{className:"page daily-page automation-list-page",children:[o.jsxs("header",{children:[o.jsxs("div",{children:[o.jsx("h1",{children:"自动化任务"}),o.jsx("p",{children:"管理定时推送与自动填报，查看任务配置和运行情况。"})]}),o.jsxs("div",{className:"header-actions",children:[M.includes("tencent_sheet_fill")&&o.jsx("button",{className:"secondary",onClick:()=>T(!0),children:"网页适配配置"}),o.jsxs("button",{className:"primary",onClick:()=>O(!0),children:[o.jsx(XC,{}),"新建任务"]})]})]}),g&&o.jsx("div",{className:`notice ${g.tone}`,role:"status",children:o.jsxs("div",{children:[o.jsx("strong",{children:g.title}),o.jsx("span",{children:g.message})]})}),o.jsxs("section",{className:"daily-job-list","aria-label":"任务列表",children:[a.map(G=>o.jsxs("article",{className:`daily-job-card${["incomplete","pending-test","schedule-error"].includes(G.status)?" needs-attention":""}`,onClick:()=>u(G),onContextMenu:de=>{de.preventDefault(),b({task:G,x:Math.min(de.clientX,window.innerWidth-176),y:Math.min(de.clientY,window.innerHeight-58)})},children:[o.jsxs("div",{className:"job-copy",children:[o.jsx("h2",{children:o.jsx("button",{type:"button",className:"automation-task-name",onClick:de=>{de.stopPropagation(),u(G)},children:G.name||"未命名任务"})}),o.jsxs("p",{children:[G.taskTypeName," · ",G.schedule," · ",G.connectionStatus]})]}),o.jsxs("div",{className:"job-actions",onClick:de=>de.stopPropagation(),children:[o.jsx("span",{className:`job-status ${G.status}`,children:Q0(G.status)}),o.jsxs("label",{className:"switch",children:[o.jsx("input",{type:"checkbox","aria-label":`启用${G.name||"未命名任务"}`,checked:G.isEnabled,disabled:!G.schedulingAvailable||m===G.id,title:G.schedulingAvailable?void 0:"Development 环境默认不启用定时任务",onChange:()=>Q(G)}),o.jsx("span",{})]}),o.jsx("button",{type:"button",className:"automation-task-more","aria-label":`${G.name||"未命名任务"}的更多操作`,"aria-haspopup":"menu",onClick:de=>{const L=de.currentTarget.getBoundingClientRect();b({task:G,x:Math.min(L.left,window.innerWidth-176),y:Math.min(L.bottom+4,window.innerHeight-58)})},children:o.jsx(PC,{})})]}),o.jsxs("div",{className:"automation-card-footer",children:["最近运行：",G.lastRun]})]},`${G.taskType}:${G.id}`)),!a.length&&o.jsxs("div",{className:"empty-state",children:[o.jsx(GC,{}),o.jsx("h2",{children:"还没有自动化任务"}),o.jsx("p",{children:"选择一种任务类型，新建后进入对应的专用配置界面。"})]})]}),!!a.length&&o.jsx("p",{className:"automation-list-help",children:"点击任务名称进入配置。日报配置通知后即可开启，执行结果见运行记录。"}),x&&o.jsx("div",{className:"job-context-menu",role:"menu",style:{left:x.x,top:x.y},onPointerDown:G=>G.stopPropagation(),children:o.jsxs("button",{className:"danger-quiet",role:"menuitem",disabled:x.task.isEnabled||m===x.task.id,onClick:()=>{w(x.task),b(void 0)},children:[o.jsx(JC,{}),x.task.isEnabled?"停用后可删除":"删除任务"]})}),o.jsx(mo,{open:!!E,onOpenChange:G=>!G&&w(void 0),children:o.jsxs(po,{children:[o.jsx(go,{className:"dialog-overlay"}),o.jsxs(yo,{className:"dialog",children:[o.jsx(vo,{children:"删除自动化任务？"}),o.jsxs(xo,{children:["将删除“",E==null?void 0:E.name,"”及其业务记录，此操作无法撤销。"]}),o.jsxs("div",{className:"dialog-actions",children:[o.jsx("button",{className:"secondary",onClick:()=>w(void 0),children:"取消"}),o.jsx("button",{className:"danger",disabled:!!m,onClick:()=>E&&ie(E),children:"确认删除"})]})]})]})}),o.jsx(mo,{open:_,onOpenChange:G=>{O(G),G||H("")},children:o.jsxs(po,{children:[o.jsx(go,{className:"dialog-overlay"}),o.jsxs(yo,{className:"dialog automation-create-dialog",children:[o.jsx(vo,{children:"新建自动化任务"}),o.jsx(xo,{children:U?"填写任务信息，创建后可随时通过 Tab 修改。":"先选择任务类型，后续配置由对应任务自己提供。"}),U?(J=Xv(U))==null?void 0:J.renderCreate({onCreated:G=>K(U,G),onBack:()=>H(""),onCancel:()=>{O(!1),H("")}}):o.jsx("div",{className:"automation-create-types",children:Z0.filter(G=>M.includes(G.taskType)).map(G=>o.jsxs("button",{onClick:()=>H(G.taskType),children:[o.jsx("strong",{children:G.name}),o.jsx("span",{children:G.description})]},G.taskType))})]})]})})]})}function cA({openSettings:n,task:a,definition:s,focusStep:l,notice:u,refresh:h,back:f}){const[m,p]=S.useState(l?s.resolveSection(l):s.includeBasics===!1?s.taskTabs[0].id:"basics"),g=a.taskType==="daily_report",[v,x]=S.useState(),[b,E]=S.useState(""),[w,N]=S.useState(!1),T=[...s.includeBasics===!1?[]:[{id:"basics",label:"基本信息"}],...s.taskTabs,{id:"runs",label:"运行记录"}],A=[...a.missingMessage?[{id:`configuration:${a.missingStep||"unknown"}`,title:s.issueTitle(a.missingStep||""),message:a.missingMessage,section:s.resolveSection(a.missingStep||"")}]:[],...a.status==="schedule-error"&&a.schedulerMessage?[{id:"scheduler",title:"计划任务异常",message:a.schedulerMessage,section:"basics"}]:[]];async function D(){N(!0),E("");try{x(await s.loadRuns(a.id))}catch(O){E(O instanceof Error?O.message:String(O))}finally{N(!1)}}S.useEffect(()=>{m==="runs"&&v===void 0&&D()},[m,v]);function _(O,U){var M;if(O.key!=="ArrowLeft"&&O.key!=="ArrowRight")return;O.preventDefault();const H=(U+(O.key==="ArrowRight"?1:-1)+T.length)%T.length;p(T[H].id),T[H].id==="basics"&&h().catch(()=>{}),(M=document.getElementById(`automation-tab-${T[H].id}`))==null||M.focus()}return g?o.jsx(a0,{id:a.id,back:f,changed:h,openSettings:n}):a.taskType==="notion_fill"?o.jsx(i0,{id:a.id,back:f,changed:h,openSettings:n}):o.jsxs("div",{className:"page daily-page automation-detail",children:[o.jsxs("header",{children:[o.jsxs("div",{children:[o.jsxs("button",{className:"back-link","aria-label":"返回任务列表",onClick:f,children:[o.jsx(ns,{}),"返回任务列表"]}),o.jsx("h1",{title:a.name||"未命名任务",children:a.name||"未命名任务"}),o.jsxs("p",{children:[a.taskTypeName," · ",a.schedule]})]}),o.jsx("span",{className:`job-status ${a.status}`,children:Q0(a.status)})]}),o.jsx("div",{className:"automation-tabs",role:"tablist","aria-label":"任务详情",children:T.map((O,U)=>o.jsx("button",{type:"button",role:"tab",id:`automation-tab-${O.id}`,"aria-selected":m===O.id,"aria-controls":`automation-panel-${O.id}`,tabIndex:m===O.id?0:-1,onClick:()=>{p(O.id),O.id==="basics"&&h().catch(()=>{})},onKeyDown:H=>_(H,U),children:O.label},O.id))}),o.jsxs("div",{children:[u&&o.jsx("div",{className:`notice ${u.tone}`,role:"status",children:o.jsxs("div",{children:[o.jsx("strong",{children:u.title}),o.jsx("span",{children:u.message})]})}),!!A.length&&o.jsxs("section",{className:"automation-issues","aria-labelledby":"automation-issues-title",children:[o.jsxs("div",{className:"automation-issues-heading",children:[o.jsx(WC,{}),o.jsxs("div",{children:[o.jsx("h2",{id:"automation-issues-title",children:"配置问题"}),o.jsx("p",{children:"完成以下项目后才能安全启用任务。"})]}),o.jsxs("span",{children:[A.length," 项"]})]}),o.jsx("ul",{children:A.map(O=>{var U;return o.jsxs("li",{children:[o.jsxs("div",{children:[o.jsx("strong",{children:O.title}),o.jsx("span",{children:O.message})]}),o.jsxs("button",{type:"button",onClick:()=>{p(O.section)},children:["前往",((U=T.find(H=>H.id===O.section))==null?void 0:U.label)||"处理",o.jsx(VC,{})]})]},O.id)})})]}),o.jsxs("div",{className:"automation-tab-panel",role:"tabpanel",id:`automation-panel-${m}`,"aria-labelledby":`automation-tab-${m}`,children:[o.jsx("div",{hidden:m==="runs",children:s.renderEditor({id:a.id,section:m,openSettings:n,navigate:p,changed:()=>{h().catch(()=>{})}})}),m==="runs"&&o.jsxs("section",{className:"surface automation-runs",children:[o.jsxs("div",{className:"automation-runs-heading",children:[o.jsxs("div",{children:[o.jsx("h2",{children:"运行记录"}),o.jsx("p",{children:"查看任务执行结果和错误详情。"})]}),o.jsxs("button",{className:"secondary",disabled:w,onClick:D,children:[w?o.jsx(Sn,{className:"spin"}):o.jsx($C,{}),"刷新"]})]}),b&&o.jsx("div",{className:"notice error",role:"alert",children:o.jsxs("div",{children:[o.jsx("strong",{children:"运行记录读取失败"}),o.jsx("span",{children:b})]})}),o.jsx("div",{className:"automation-run-list",children:v==null?void 0:v.map(O=>o.jsxs("details",{children:[o.jsxs("summary",{children:[o.jsx("span",{children:O.time}),o.jsx("span",{children:O.source}),o.jsx("strong",{children:O.title}),o.jsx("b",{className:O.error?"error-text":"",children:O.status})]}),o.jsxs("div",{children:[O.details.map(U=>o.jsx("p",{children:U},U)),O.error&&o.jsxs("p",{className:"run-error",children:["错误：",O.error]})]})]},O.id))}),!w&&v&&!v.length&&o.jsx("p",{className:"automation-empty",children:"暂无运行记录"})]})]})]})]})}function Q0(n){return{incomplete:"配置未完成","pending-test":"待测试",checked:"已验证",ready:"可启用",enabled:"已启用","schedule-error":"计划异常"}[n]||n}function $v({value:n,onChange:a,unit:s,className:l="",disabled:u,ariaLabel:h,onKeyDown:f}){return o.jsxs("div",{className:`numeric-input ${l}`.trim(),children:[o.jsx("input",{type:"text",inputMode:"decimal",value:n,disabled:u,"aria-label":h,onChange:m=>a(m.target.value),onKeyDown:f}),s&&o.jsx("span",{children:s})]})}function J0({current:n,titles:a,label:s}){const l=a.map((u,h)=>({number:h+1,title:u}));return o.jsx("div",{className:"step-bar","aria-label":s,children:l.map((u,h)=>{const f=u.number<n?"done":u.number===n?"active":"pending";return o.jsxs(S.Fragment,{children:[o.jsxs("div",{className:`step step-${f}`,"aria-current":f==="active"?"step":void 0,children:[o.jsx("div",{className:`step-circle ${f}`,children:f==="done"?o.jsx(us,{}):u.number}),o.jsx("span",{children:u.title})]}),h<l.length-1&&o.jsx("div",{className:`step-line ${u.number<n?"done":u.number===n?"transition":"pending"}`})]},u.number)})})}const Kv={configured:!1,binding:{bound:!1,name:"",path:""},usesBusinessSections:!1,businessSections:[],sources:[],selected:""};function uA(){const n=new Date;return`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}`}function dA({openSettings:n}){const[a,s]=S.useState(1),[l,u]=S.useState(uA),[h,f]=S.useState(""),[m,p]=S.useState([]),[g,v]=S.useState(Kv),[x,b]=S.useState(!1),[E,w]=S.useState("database"),[N,T]=S.useState(""),[A,D]=S.useState(""),[_,O]=S.useState(!1),[U,H]=S.useState("state"),[M,R]=S.useState(""),[V,K]=S.useState(""),[Q,ie]=S.useState(),J=S.useRef(!1),G=S.useRef(!1);S.useEffect(()=>{me("weld.getState").then(I=>{var se;const he=I!=null&&I.binding&&Array.isArray(I.sources)?I:Kv;v(he),T(((se=he.sources.find(ge=>ge.id===he.selected))==null?void 0:se.businessSection)||""),D(he.selected)}).catch(I=>R(I instanceof Error?I.message:"读取 Notion 配置失败")).finally(()=>H(void 0))},[]);const de=/^\d+$/.test(h)&&Number(h)>0,L=S.useMemo(()=>m.reduce((I,he)=>I+Number(he.qty||0),0),[m]),ne=L-Number(h||0),W=m.length>0&&m.every(I=>/^\d+$/.test(I.qty))&&ne===0,Y=g.usesBusinessSections?g.sources.filter(I=>I.businessSection===N):g.sources,te=!!U;async function C(){if(!(!de||te)){H("generate"),R("");try{const I=await me("weld.generate",{month:l,total:h});p(I.map(he=>({...he,qty:String(he.qty)}))),s(2)}catch(I){R(I instanceof Error?I.message:"拆分失败")}finally{H(void 0)}}}function z(I,he){he!==""&&!/^\d+$/.test(he)||p(se=>se.map((ge,$)=>$===I?{...ge,qty:he}:ge))}async function re(){if(!(!A||U)){H("binding"),R("");try{const I=await me("weld.saveBinding",{sourceId:A});v(I),D(I.selected),b(!1)}catch(I){R(I instanceof Error?I.message:"绑定失败")}finally{H(void 0)}}}async function ce(){if(!W||!g.binding.bound||te||J.current)return;J.current=!0,H("check"),R("");const I={month:l,total:h,rows:m.map(he=>({date:he.date,qty:he.qty}))};try{if((await me("weld.check",I,12e4)).hasExistingData){O(!0);return}await ue(I,!1)}catch(he){R(he instanceof Error?he.message:"Notion 数据检查失败")}finally{J.current=!1,H(he=>he==="check"?void 0:he)}}async function ue(I,he){if(!G.current){G.current=!0,H("write"),R(""),ie(void 0);try{const se=await me("weld.write",{...I,overwriteExisting:he},12e4,ge=>ie(ge));K(se.message),O(!1),s(3)}catch(se){R(se instanceof Error?se.message:"写入 Notion 失败")}finally{G.current=!1,H(void 0)}}}function fe(){s(1),p([]),f(""),K(""),R(""),ie(void 0)}function be(){var I;te||(D(g.selected),T(((I=g.sources.find(he=>he.id===g.selected))==null?void 0:I.businessSection)||""),R(""),w("database"),b(!0))}const oe={month:l,total:h,rows:m.map(I=>({date:I.date,qty:I.qty}))};return o.jsx("div",{className:"app-shell",children:o.jsxs("main",{className:"main-content",children:[o.jsxs("header",{className:"content-header",children:[o.jsx("h1",{children:"每日焊接数据模拟"}),o.jsx("button",{type:"button",className:"template-config-button",disabled:te,"aria-label":"焊接设置",title:"焊接设置",onClick:be,children:o.jsx(Pf,{})})]}),o.jsxs("div",{className:"production-message-scroll daily-weld-page",children:[o.jsx(J0,{current:a,titles:["录入计划","拆分预览","完成"],label:"焊接计划拆分进度"}),M&&o.jsx("div",{className:"weld-notice error",role:"alert",children:M}),a===1&&o.jsxs("section",{className:"weld-plan-card","aria-labelledby":"weld-plan-title",children:[o.jsx("div",{className:"weld-section-heading",children:o.jsx("h2",{id:"weld-plan-title",children:"计划信息"})}),o.jsxs("div",{className:"weld-fields",children:[o.jsx(tn,{label:"计划月份",value:l,selectionMode:"month",disabled:te,onChange:u}),o.jsxs("label",{className:"weld-field",children:[o.jsx("span",{children:"计划焊接总量"}),o.jsx($v,{value:h,disabled:te,onChange:I=>{(I===""||/^\d+$/.test(I))&&f(I)},unit:"吨",ariaLabel:"计划焊接总量"})]})]}),o.jsx("div",{className:"weld-actions",children:o.jsx("button",{type:"button",className:"primary-button",disabled:!de||te,onClick:C,children:U==="generate"?"正在拆分…":"下一步：拆分预览"})})]}),a===2&&o.jsxs("section",{className:"weld-preview","aria-labelledby":"weld-preview-title",children:[o.jsxs("div",{className:"weld-preview-heading",children:[o.jsxs("div",{children:[o.jsxs("h2",{id:"weld-preview-title",children:[l.replace("-"," 年 ")," 月每日拆分详情"]}),o.jsx("p",{children:"可直接修改任意一天的数值；不满意本次浮动效果可重新模拟。"})]}),o.jsxs("button",{type:"button",className:"secondary",disabled:te,onClick:C,children:[o.jsx(Jb,{}),"重新模拟浮动"]})]}),o.jsx("div",{className:"weld-table-wrap",children:o.jsxs("table",{children:[o.jsx("thead",{children:o.jsxs("tr",{children:[o.jsx("th",{children:"日期"}),o.jsx("th",{children:"星期"}),o.jsx("th",{children:"类型"}),o.jsx("th",{children:"计划量（吨）"})]})}),o.jsx("tbody",{children:m.map((I,he)=>o.jsxs("tr",{children:[o.jsx("td",{children:I.date}),o.jsx("td",{children:I.weekday}),o.jsx("td",{children:o.jsx("span",{className:`weld-day-pill ${I.isWeekend?"weekend":""}`,children:I.isWeekend?"休息日":"工作日"})}),o.jsx("td",{children:o.jsx($v,{value:I.qty,disabled:te,onChange:se=>z(he,se),unit:"吨",ariaLabel:`${I.date} 计划量`})})]},I.date))})]})}),o.jsxs("div",{className:"weld-summary",children:[o.jsxs("span",{children:["共 ",m.length," 天 · 计划总量 ",o.jsx("strong",{children:h})," 吨"]}),o.jsxs("span",{children:["拆分合计 ",o.jsx("strong",{children:L})," 吨 ",ne===0?o.jsx("em",{className:"match",children:"与计划总量一致"}):o.jsxs("em",{className:"mismatch",children:["偏差 ",ne>0?"+":"",ne," 吨，可手动调整"]})]})]}),U==="write"&&o.jsx("div",{className:"weld-write-progress",role:"status","aria-live":"polite",children:Q?`正在写入 ${Q.date.slice(0,10)}（${Q.current}/${Q.total}）`:"正在准备 Notion 层级数据…"}),o.jsxs("div",{className:"weld-actions split",children:[o.jsx("button",{type:"button",className:"secondary",disabled:te,onClick:()=>s(1),children:"返回修改"}),o.jsx("button",{type:"button",className:"primary-button",disabled:!W||!g.binding.bound||te,onClick:ce,children:U==="check"?"正在检查…":U==="write"?"正在写入…":"确认并写入 Notion"})]})]}),a===3&&o.jsxs("section",{className:"complete-view weld-complete",children:[o.jsx("div",{className:"complete-icon",children:o.jsx(us,{})}),o.jsx("h2",{children:"入库完成"}),o.jsx("p",{children:V||`${l} 共 ${m.length} 天的焊接计划数据已写入 Notion。`}),o.jsx("button",{className:"primary-button",onClick:fe,children:"拆分下一个月"})]})]}),x&&o.jsx("div",{className:"weld-settings-overlay",children:o.jsxs("section",{className:"weld-settings-dialog",role:"dialog","aria-modal":"true","aria-labelledby":"weld-settings-title",children:[o.jsxs("aside",{className:"weld-settings-nav",children:[o.jsx("h2",{id:"weld-settings-title",children:"焊接设置"}),o.jsxs("nav",{"aria-label":"焊接设置分类",children:[o.jsxs("button",{type:"button",className:E==="rules"?"active":"",onClick:()=>w("rules"),children:[o.jsx(QC,{}),"拆分规则"]}),o.jsxs("button",{type:"button",className:E==="database"?"active":"",onClick:()=>w("database"),children:[o.jsx(Kd,{}),"数据库绑定"]})]})]}),o.jsxs("div",{className:"weld-settings-main",children:[o.jsx("button",{type:"button",className:"weld-settings-close","aria-label":"关闭焊接设置",disabled:U==="binding",onClick:()=>b(!1),children:o.jsx(Gf,{})}),E==="rules"?o.jsxs(o.Fragment,{children:[o.jsxs("div",{className:"weld-settings-heading",children:[o.jsx("h3",{children:"拆分规则"}),o.jsx("p",{children:"当前规则用于生成每日焊接计划，修改每日数值后仍需保证月度合计一致。"})]}),o.jsxs("dl",{className:"weld-rule-list",children:[o.jsxs("div",{children:[o.jsx("dt",{children:"分配周期"}),o.jsx("dd",{children:"按所选月份的全部自然日"})]}),o.jsxs("div",{children:[o.jsx("dt",{children:"产量浮动"}),o.jsx("dd",{children:"基准量叠加 22% 随机波动"})]}),o.jsxs("div",{children:[o.jsx("dt",{children:"周末权重"}),o.jsx("dd",{children:"周六、周日自动降低计划权重"})]}),o.jsxs("div",{children:[o.jsx("dt",{children:"总量配平"}),o.jsx("dd",{children:"每日取整后自动配平至月度计划"})]})]})]}):o.jsxs(o.Fragment,{children:[o.jsxs("div",{className:"weld-settings-heading",children:[o.jsx("h3",{children:"数据库绑定"}),o.jsx("p",{children:"每项业务只绑定一个主写入数据库，汇总数据库由系统自动维护。"})]}),M&&o.jsx("div",{className:"weld-notice error",role:"alert",children:M}),o.jsxs("section",{className:"weld-business-binding","aria-labelledby":"weld-business-title",children:[o.jsxs("div",{className:"weld-business-title",children:[o.jsxs("div",{children:[o.jsx("h4",{id:"weld-business-title",children:"焊接业务"}),o.jsx("p",{children:"每日焊接计划的主写入数据库"})]}),o.jsx("span",{className:g.binding.bound?"bound":"",children:g.binding.bound?"已绑定":"未绑定"})]}),!g.configured||!g.sources.length?o.jsx("div",{className:"weld-notice",children:"请先在系统设置中完成数据库连接并刷新数据源。"}):o.jsxs("div",{className:"weld-dialog-field",children:[g.usesBusinessSections&&o.jsxs(o.Fragment,{children:[o.jsx("span",{children:"业务板块"}),o.jsx(Ie,{value:N,options:g.businessSections.map(I=>({value:I,label:I})),placeholder:"选择焊接业务板块",ariaLabel:"焊接业务板块",disabled:U==="binding",onChange:I=>{T(I),D("")}})]}),o.jsx("span",{children:"主写入数据库"}),o.jsx(Ie,{value:A,options:Y.map(I=>({value:I.id,label:I.name})),placeholder:"选择每日焊接量数据库",ariaLabel:"焊接业务主写入数据库",disabled:g.usesBusinessSections&&!N||U==="binding",onChange:D})]}),o.jsx("p",{className:"weld-binding-help",children:"月度和周度汇总数据库由系统在写入时自动维护，无需单独绑定。"})]}),o.jsxs("div",{className:"weld-settings-actions",children:[o.jsx("button",{type:"button",disabled:U==="binding",onClick:()=>b(!1),children:"取消"}),!g.configured||!g.sources.length?o.jsx("button",{type:"button",className:"primary-button",onClick:n,children:"前往系统设置"}):o.jsx("button",{type:"button",className:"primary-button",disabled:!A||U==="binding",onClick:re,children:U==="binding"?"正在检测…":"保存绑定"})]})]})]})]})}),_&&o.jsx("div",{className:"pm-dialog-overlay",children:o.jsxs("section",{className:"pm-dialog weld-confirm-dialog",role:"alertdialog","aria-modal":"true","aria-labelledby":"weld-overwrite-title",children:[o.jsx("h2",{id:"weld-overwrite-title",children:"确认覆盖已有产量"}),o.jsxs("p",{children:[l," 已存在产量数据。继续后将按本次拆分结果覆盖该月每日产量，并更新月、周、日关联。"]}),M&&o.jsx("div",{className:"weld-notice error",role:"alert",children:M}),U==="write"&&o.jsx("div",{className:"weld-write-progress",role:"status","aria-live":"polite",children:Q?`正在写入 ${Q.date.slice(0,10)}（${Q.current}/${Q.total}）`:"正在准备 Notion 层级数据…"}),o.jsxs("div",{className:"pm-dialog-actions",children:[o.jsx("button",{type:"button",disabled:U==="write",onClick:()=>O(!1),children:"取消"}),o.jsx("button",{type:"button",className:"primary-button",disabled:U==="write",onClick:()=>ue(oe,!0),children:U==="write"?"正在写入…":"确认覆盖并写入"})]})]})})]})})}const W0=[{category:"数据文件处理",name:"挂网计划 PDF 导出"},{category:"数据文件处理",name:"生产会资料拆分"},{category:"数据文件处理",name:"文件统计汇总"},{category:"数据同步",name:"每日焊接数据模拟"},{category:"数据同步",name:"生产消息 Notion 入库"},{category:"数据同步",name:"数据库查看"},{category:"自动化",name:"自动化任务"}],fA=[...new Set(W0.map(n=>n.category))];function hA(n){switch(n){case"挂网计划 PDF 导出":return"plan-pdf";case"生产会资料拆分":return"production-meeting";case"每日焊接数据模拟":return"daily-weld";case"生产消息 Notion 入库":return"production-message";case"数据库查看":return"database-viewer";case"文件统计汇总":return"report-center";case"自动化任务":return"daily-report";default:return"plan-pdf"}}function mA({active:n,navigate:a,openSettings:s}){return o.jsxs("aside",{className:"sidebar",children:[o.jsx("div",{className:"sidebar-top",children:o.jsx("div",{className:"sidebar-brand",children:"生产助手"})}),o.jsx("nav",{className:"sidebar-nav","aria-label":"业务模块",children:fA.map(l=>o.jsxs("section",{className:"sidebar-section",children:[o.jsx("div",{className:"sidebar-section-label",children:l}),W0.filter(u=>u.category===l).map(u=>{const h=hA(u.name),f=h===n;return o.jsxs("button",{className:`sidebar-item ${f?"sidebar-item-active":""}`,"aria-current":f?"page":void 0,onClick:()=>a(h),children:[o.jsx(Zv,{name:u.name}),o.jsx("span",{children:u.name})]},u.name)})]},l))}),o.jsx("div",{className:"sidebar-bottom",children:o.jsxs("button",{className:"sidebar-item","aria-haspopup":"dialog",onClick:s,children:[o.jsx(Zv,{name:"设置"}),o.jsx("span",{children:"设置"})]})})]})}function Zv({name:n}){return n==="挂网计划 PDF 导出"||n==="生产会资料拆分"?o.jsxs("svg",{className:"nav-icon",viewBox:"0 0 24 24","aria-hidden":"true",children:[o.jsx("path",{className:"folder-lid",d:"M3.5 7h6l1.8 2h9.2"}),o.jsx("path",{d:"M4.2 7h15.6l-1.3 11H5.5L4.2 7Z"})]}):n==="每日焊接数据模拟"||n==="自动化任务"?o.jsxs("svg",{className:"nav-icon",viewBox:"0 0 24 24","aria-hidden":"true",children:[o.jsx("rect",{x:"5",y:"4.5",width:"14",height:"15",rx:"2"}),o.jsx("path",{d:"M8 3v3M16 3v3M5 9h14"}),o.jsx("path",{className:"daily-check",d:"m8.5 14 2 2 4.5-4.5"})]}):n==="生产消息 Notion 入库"?o.jsxs("svg",{className:"nav-icon",viewBox:"0 0 24 24","aria-hidden":"true",children:[o.jsx("path",{d:"M4 14.5 6.2 6h11.6l2.2 8.5V19H4v-4.5Z"}),o.jsx("path",{className:"inbox-tray",d:"M4.3 14h4.1l1.2 2h4.8l1.2-2h4.1"}),o.jsx("path",{className:"inbox-arrow",d:"M12 5v7m-2.5-2.5L12 12l2.5-2.5"})]}):n==="数据库查看"?o.jsxs("svg",{className:"nav-icon",viewBox:"0 0 24 24","aria-hidden":"true",children:[o.jsx("ellipse",{cx:"12",cy:"6",rx:"7",ry:"3"}),o.jsx("path",{d:"M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"})]}):n==="文件统计汇总"?o.jsxs("svg",{className:"nav-icon",viewBox:"0 0 24 24","aria-hidden":"true",children:[o.jsx("path",{d:"M4.5 19h15"}),o.jsx("rect",{className:"report-bar report-bar-one",x:"6",y:"12",width:"2.5",height:"6",rx:"0.5"}),o.jsx("rect",{className:"report-bar report-bar-two",x:"10.75",y:"8",width:"2.5",height:"10",rx:"0.5"}),o.jsx("rect",{className:"report-bar report-bar-three",x:"15.5",y:"5",width:"2.5",height:"13",rx:"0.5"})]}):o.jsxs("svg",{className:"nav-icon",viewBox:"0 0 24 24","aria-hidden":"true",children:[o.jsx("circle",{cx:"12",cy:"12",r:"3"}),o.jsx("path",{className:"settings-ring",d:"M12 3.5v2M12 18.5v2M3.5 12h2M18.5 12h2M6 6l1.4 1.4M16.6 16.6 18 18M18 6l-1.4 1.4M7.4 16.6 6 18"})]})}const Qv=new Set(["raw_message","message_type","parser_version","unit"]),pA=new Set(["piece_count","weight","sheet_in_stock","profile_in_stock","cutting","welding","daily_output","monthly_output","yearly_output","monthly_reference","output_sections"]),gA=/(公斤|千克|kg|吨|t|张|件|套|节|台|米|m)$/i,yA={piece_count:"张",weight:"吨",sheet_in_stock:"吨",profile_in_stock:"吨",cutting:"吨",welding:"吨",daily_output:"套",output_sections:"节"};function bd(){const n=new Date;return`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}-${String(n.getDate()).padStart(2,"0")}`}function Gi(n){return n instanceof Error?n.message:String(n)}function of(n,a=""){const s=n.trim().match(gA);return{value:s?n.trim().slice(0,-s[0].length).trim():n,unit:(s==null?void 0:s[0])||a}}function vA(n,a){return n.trim()?`${n}${a}`:""}function xA(n,a){const s=of(a).value.trim(),l=of(n.databaseValue).value.trim(),u=n.propertyType==="number"&&!Number.isFinite(Number(s.replaceAll(",",""))),h=!s||u?"exception":l?n.propertyType==="number"?Number(s.replaceAll(",",""))===Number(l.replaceAll(",",""))?"same":"confirm":s===l?"same":"confirm":"new";return{...n,parsedValue:a,status:h,message:h==="exception"?`${n.name}的输入值无效`:h==="confirm"?"与数据库现值不同":""}}function bA(n){return{new:"新增",same:"一致",confirm:"待确认",exception:"异常",unchecked:"待检查"}[n]||"异常"}function SA(){const[n,a]=S.useState(""),[s,l]=S.useState(""),[u,h]=S.useState([]),[f,m]=S.useState(),[p,g]=S.useState(),[v,x]=S.useState(),[b,E]=S.useState(""),[w,N]=S.useState({}),[T,A]=S.useState(!1),[D,_]=S.useState(),[O,U]=S.useState(""),[H,M]=S.useState([]),[R,V]=S.useState({}),[K,Q]=S.useState(!1),[ie,J]=S.useState({cutting:"",towerDaily:""}),G=u.length>0,de=G&&n!==s,L=!!f;S.useEffect(()=>{me("production.getBindings").then(oe=>{_(oe),J({cutting:oe.selected.cutting||"",towerDaily:oe.selected.towerDaily||""})}).catch(oe=>U(Gi(oe)))},[]);async function ne(){U("");try{await me("production.saveBindings",ie,12e4);const oe=await me("production.getBindings");_(oe),Q(!1)}catch(oe){U(Gi(oe))}}async function W(oe){m("check"),E(""),N({});try{const I=await me("production.check",{drafts:oe,defaultDate:bd()});g(I)}catch(I){E(Gi(I))}finally{m(void 0)}}async function Y(){if(!(!n.trim()||L)){m("parse"),E(""),A(!1),x(void 0),g(void 0),N({});try{const oe=await me("production.parse",{text:n,defaultDate:bd()});if(h(oe),l(n),!oe.length){E("没有解析到可核对的数据，请检查消息内容后重试。");return}oe.every(I=>I.canWrite)&&await W(oe)}catch(oe){h([]),g(void 0),E(Gi(oe))}finally{m(oe=>oe==="parse"?void 0:oe)}}}async function te(oe,I){const he=u.map(se=>se.index===oe?{...se,businessDate:I,canWrite:!!I,warningText:I?"":se.warningText}:se);h(he),g(void 0),N({}),he.every(se=>se.canWrite)&&await W(he)}function C(oe,I,he){const se=`${oe}:${I}`;h(ge=>ge.map($=>$.index===oe?{...$,canWrite:!!$.businessDate&&$.kind!=="Unknown",fields:{...$.fields,[I]:he},previewFields:$.previewFields.map(pe=>pe.key===I?{...pe,value:he}:pe)}:$)),N(ge=>Object.fromEntries(Object.entries(ge).filter(([$])=>$!==se))),g(ge=>{if(!ge)return ge;const $=ge.items.map(pe=>{if(pe.index!==oe||!pe.fields)return pe;const ke=pe.fields.map(lt=>lt.key===I?xA(lt,he):lt),Xe=ke.some(lt=>lt.status==="exception")?"error":ke.some(lt=>lt.status==="confirm")?"existing":"ready";return{...pe,fields:ke,status:Xe}});return{...ge,items:$,succeeded:$.every(pe=>pe.status!=="error")}})}async function z(oe){if(!(!p||L)){m("write"),E("");try{const I=await me("production.write",{drafts:u,defaultDate:bd(),overwriteExisting:!1,fieldChoices:w,monthlyPlans:oe},12e4);if(x(I),I.requiredMonths.length){M(I.requiredMonths),V({});return}I.succeeded?A(!0):E(I.message||"Notion 写入未完成。")}catch(I){E(Gi(I))}finally{m(void 0)}}}function re(){a(""),l(""),h([]),g(void 0),x(void 0),N({}),A(!1),E("")}const ce=S.useMemo(()=>u.flatMap(oe=>{var he;const I=(he=p==null?void 0:p.items.find(se=>se.index===oe.index))==null?void 0:he.fields;return I!=null&&I.length?I.filter(se=>!Qv.has(se.key)).map(se=>({draft:oe,key:se.key,name:se.name,propertyType:se.propertyType,parsedValue:oe.fields[se.key]??se.parsedValue,databaseValue:se.databaseValue,status:se.status,message:se.message})):oe.previewFields.filter(se=>!Qv.has(se.key)).map(se=>({draft:oe,key:se.key,name:se.label,propertyType:pA.has(se.key)?"number":"",parsedValue:oe.fields[se.key]??se.value,databaseValue:"",status:oe.canWrite?"unchecked":"exception",message:oe.warningText}))}),[u,p]),ue=S.useMemo(()=>({newFields:ce.filter(oe=>oe.status==="new").length,same:ce.filter(oe=>oe.status==="same").length,confirm:ce.filter(oe=>oe.status==="confirm").length,exception:ce.filter(oe=>oe.status==="exception").length}),[ce]),fe=ce.filter(oe=>oe.status==="confirm"),be=G&&!de&&!L&&!!(p!=null&&p.succeeded)&&u.every(oe=>oe.canWrite&&!!oe.businessDate)&&ce.every(oe=>oe.status!=="exception"&&oe.status!=="unchecked")&&fe.every(oe=>!!w[`${oe.draft.index}:${oe.key}`]);return T?o.jsxs("div",{className:"app-shell",children:[o.jsxs("main",{className:"main-content",children:[o.jsx(Wv,{disabled:L,configure:()=>{D&&J({cutting:D.selected.cutting||"",towerDaily:D.selected.towerDaily||""}),U(""),Q(!0)}}),o.jsxs("div",{className:"production-message-scroll",children:[o.jsx(Iv,{current:3}),o.jsxs("section",{className:"complete-view",children:[o.jsx("div",{className:"complete-icon",children:o.jsx(us,{})}),o.jsx("h2",{children:"入库完成"}),o.jsx("p",{children:(v==null?void 0:v.message)||`${u.length} 条消息已写入 Notion`}),o.jsx("button",{className:"primary-button",onClick:re,children:"录入下一条"})]})]})]}),K&&D&&o.jsx(Jv,{state:D,selections:ie,setSelections:J,error:O,close:()=>Q(!1),save:ne})]}):o.jsxs("div",{className:"app-shell",children:[o.jsxs("main",{className:"main-content",children:[o.jsx(Wv,{disabled:L,configure:()=>{D&&J({cutting:D.selected.cutting||"",towerDaily:D.selected.towerDaily||""}),U(""),Q(!0)}}),o.jsxs("div",{className:"production-message-scroll",children:[o.jsx(Iv,{current:G?2:1}),o.jsxs("div",{className:"workspace-panel",children:[o.jsxs("section",{className:"message-pane",children:[o.jsxs("div",{className:"pane-title",children:[o.jsx("h2",{children:"原始消息"}),o.jsx("p",{children:"输入生产消息，系统将自动解析并检查已有数据。"})]}),o.jsx("textarea",{className:"message-textarea",value:n,disabled:L,onChange:oe=>a(oe.target.value),placeholder:"请输入生产消息"}),o.jsx("div",{className:"parse-action",children:o.jsxs("button",{className:"primary-button",disabled:!n.trim()||L,onClick:Y,children:[G&&o.jsx(Jb,{className:"button-icon refresh-icon"}),o.jsx("span",{children:f==="parse"?"正在解析…":G?"重新解析":"解析消息"})]})})]}),o.jsx("section",{className:"review-pane",children:G?o.jsxs(o.Fragment,{children:[o.jsxs("div",{className:"review-header",children:[o.jsx("h2",{children:"解析结果"}),o.jsxs("div",{className:"review-summary",children:[o.jsxs("span",{children:["新增",o.jsx("strong",{children:ue.newFields})]}),o.jsx("i",{children:"·"}),o.jsxs("span",{children:["一致",o.jsx("strong",{children:ue.same})]}),o.jsx("i",{children:"·"}),o.jsxs("span",{children:["待确认",o.jsx("strong",{children:ue.confirm})]}),o.jsx("i",{children:"·"}),o.jsxs("span",{children:["异常",o.jsx("strong",{children:ue.exception})]})]})]}),o.jsx("div",{className:"date-groups",children:u.map(oe=>{const I=ce.filter(ge=>ge.draft.index===oe.index),he=I.filter(ge=>ge.status==="confirm"),se=p?{...p,items:p.items.filter(ge=>ge.index===oe.index)}:void 0;return o.jsxs("section",{className:"date-group","data-business-date":oe.businessDate,children:[o.jsxs("div",{className:"identity-section",children:[o.jsx("div",{className:"identity-field",children:o.jsx(tn,{label:"日期",value:oe.businessDate||"",disabled:L,onChange:ge=>te(oe.index,ge)})}),o.jsxs("div",{className:"identity-field",children:[o.jsx("label",{children:"业务 / 产线"}),o.jsx("input",{className:"field-input",value:oe.typeDisplay||"",readOnly:!0,disabled:L})]})]}),o.jsx(jA,{busy:f==="check",result:se,error:b,needsReparse:de,invalidCount:oe.canWrite?0:1,fieldStatuses:I.map(ge=>ge.status)}),o.jsx("div",{className:"data-title",children:"数据字段"}),o.jsxs("div",{className:"field-table",children:[o.jsxs("div",{className:"field-table-header",children:[o.jsx("div",{children:"字段"}),o.jsx("div",{children:"本次解析值"}),o.jsx("div",{children:"数据库值"}),o.jsx("div",{className:"header-status",children:"状态"})]}),I.map(ge=>{const $=of(ge.parsedValue,ge.propertyType==="number"&&yA[ge.key]||""),pe=`${ge.draft.index}:${ge.key}`;return o.jsxs("div",{className:"field-row",children:[o.jsx("div",{className:"field-name",children:ge.name}),o.jsx("div",{className:"field-editor",children:o.jsxs("div",{className:"input-unit-wrap",children:[o.jsx("input",{className:"field-input compact-input",value:$.value,disabled:L,"aria-invalid":ge.status==="exception",onChange:ke=>C(ge.draft.index,ge.key,vA(ke.target.value,$.unit)),onKeyDown:ke=>{ke.key==="Enter"&&ke.currentTarget.blur()}}),$.unit&&o.jsx("span",{children:$.unit})]})}),o.jsx("div",{className:"database-value",children:ge.databaseValue||"—"}),o.jsx("div",{className:"field-status",children:ge.status!=="unchecked"&&o.jsx("span",{className:`pill pill-${ge.status}`,title:ge.message,children:bA(ge.status)})})]},pe)})]}),he.length>0&&o.jsxs("section",{className:"conflict-section","aria-label":`${oe.businessDate} 待确认字段`,children:[o.jsx("div",{className:"conflict-section-title",children:"待确认字段"}),he.map(ge=>{const $=`${ge.draft.index}:${ge.key}`;return o.jsxs("div",{className:"conflict-panel",children:[o.jsxs("div",{className:"conflict-message",children:[o.jsx("strong",{children:ge.name}),o.jsx("span",{children:"原值与新值不同，请选择保留项。"})]}),o.jsxs("div",{className:"conflict-options",children:[o.jsxs("label",{children:[o.jsx("input",{type:"radio",name:`conflict-${$}`,checked:w[$]==="keep",onChange:()=>N(pe=>({...pe,[$]:"keep"}))}),o.jsxs("span",{children:[o.jsx("small",{children:"原值"}),o.jsx("strong",{children:ge.databaseValue||"—"})]})]}),o.jsxs("label",{children:[o.jsx("input",{type:"radio",name:`conflict-${$}`,checked:w[$]==="use",onChange:()=>N(pe=>({...pe,[$]:"use"}))}),o.jsxs("span",{children:[o.jsx("small",{children:"新值"}),o.jsx("strong",{children:ge.parsedValue||"—"})]})]})]})]},$)})]})]},oe.index)})}),o.jsxs("div",{className:"review-footer",children:[o.jsx("span",{className:"review-footer-text",children:u.length>1?`本次共 ${u.length} 条消息，将整批写入 Notion。`:"确认后将把本次解析结果写入 Notion。"}),o.jsx("button",{className:"primary-button confirm-button",disabled:!be,onClick:()=>z(),children:f==="write"?"正在入库…":"确认入库"})]})]}):o.jsxs("div",{className:"review-empty",children:[o.jsx("h2",{children:"解析结果"}),o.jsx("p",{children:"解析消息后，Notion 数据检查结果将在这里显示。"}),(O||(D==null?void 0:D.configured)===!1||D&&(!D.cutting.bound||!D.towerDaily.bound))&&o.jsx("div",{className:"pm-notice",role:"alert",children:O||((D==null?void 0:D.configured)===!1?"Notion 连接尚未配置。":"数据库已变更，请点击右上角“数据库绑定”重新选择下料和塔筒主数据库。")})]})})]})]})]}),H.length>0&&o.jsx(wA,{months:H,values:R,setValues:V,close:()=>M([]),submit:oe=>{M([]),z(oe)}}),K&&D&&o.jsx(Jv,{state:D,selections:ie,setSelections:J,error:O,close:()=>Q(!1),save:ne})]})}function jA({busy:n,result:a,error:s,needsReparse:l,invalidCount:u,fieldStatuses:h}){if(n)return o.jsxs("div",{className:"match-status",role:"status","aria-live":"polite",children:[o.jsx("span",{className:"status-loader"}),o.jsx("span",{className:"match-status-copy",children:"正在检查 Notion 数据…"})]});if(l)return o.jsxs("div",{className:"match-status match-status-error",role:"alert",children:[o.jsx("span",{className:"new-record-icon",children:"!"}),o.jsx("span",{className:"match-status-copy",children:"原始消息已修改，请重新解析"})]});if(u)return o.jsxs("div",{className:"match-status match-status-error",role:"alert",children:[o.jsx("span",{className:"new-record-icon",children:"!"}),o.jsxs("span",{className:"match-status-copy",children:["本批有 ",u," 条异常，已停止检查和入库"]})]});if(s)return o.jsxs("div",{className:"match-status match-status-error",role:"alert",children:[o.jsx("span",{className:"new-record-icon",children:"!"}),o.jsxs("span",{className:"match-status-copy",children:["检查失败：",s]})]});const f=a==null?void 0:a.items.some(b=>b.status==="existing"||b.status==="conflict"),m=b=>h.includes(b),p=h.length>0&&h.every(b=>b==="same"),g=m("exception")||a&&!a.succeeded&&h.length===0?"match-status-error":m("confirm")?"match-status-warning":p?"match-status-neutral":"",v=m("exception")?"存在异常，不能入库":m("unchecked")?"字段已修改，等待检查":m("confirm")?"已找到对应记录，有字段待确认":m("new")?f||m("same")?"已找到对应记录，将补充空字段":"未找到对应记录，将新建":p?"已找到对应记录，数据一致":a&&!a.succeeded?"Notion 检查未通过":"等待检查 Notion 数据",x=!!a&&!m("exception")&&!m("confirm")&&!m("unchecked");return o.jsxs("div",{className:`match-status ${g}`,role:g==="match-status-error"?"alert":"status","aria-live":"polite",children:[x?o.jsx("span",{className:"match-check",children:o.jsx(us,{})}):o.jsx("span",{className:"new-record-icon",children:g?"!":"+"}),o.jsx("span",{className:"match-status-copy",children:v})]})}function wA({months:n,values:a,setValues:s,close:l,submit:u}){const h=Object.fromEntries(n.map(m=>[m,Number(a[m])])),f=n.every(m=>{var p;return((p=a[m])==null?void 0:p.trim())&&Number.isFinite(h[m])&&h[m]>=0});return o.jsx("div",{className:"pm-dialog-overlay",children:o.jsxs("section",{className:"pm-dialog",role:"dialog","aria-modal":"true","aria-labelledby":"monthly-plan-title",children:[o.jsx("h2",{id:"monthly-plan-title",children:"补充下料月计划"}),o.jsx("p",{children:"独立月计划库中没有该月份记录，请填写计划下料（吨）。"}),n.map(m=>o.jsxs("label",{children:[m,o.jsx("input",{type:"number",min:"0",value:a[m]||"",onChange:p=>s({...a,[m]:p.target.value})})]},m)),o.jsxs("div",{className:"pm-dialog-actions",children:[o.jsx("button",{onClick:l,children:"取消"}),o.jsx("button",{className:"primary-button",disabled:!f,onClick:()=>u(h),children:"创建并继续"})]})]})})}function Jv({state:n,selections:a,setSelections:s,error:l,close:u,save:h}){var x,b;const[f,m]=S.useState(((x=n.sources.find(E=>E.id===a.cutting))==null?void 0:x.businessSection)||""),[p,g]=S.useState(((b=n.sources.find(E=>E.id===a.towerDaily))==null?void 0:b.businessSection)||""),v=E=>n.usesBusinessSections?n.sources.filter(w=>w.businessSection===E):n.sources;return o.jsx("div",{className:"pm-dialog-overlay",children:o.jsxs("section",{className:"pm-dialog pm-binding-dialog",role:"dialog","aria-modal":"true","aria-labelledby":"binding-title",children:[o.jsx("h2",{id:"binding-title",children:"数据库绑定"}),o.jsx("p",{children:"只绑定每日主数据库。月累计和年累计由软件查询计算；下料月计划库通过主库的 Relation 自动识别。"}),n.usesBusinessSections&&o.jsxs("label",{children:["下料业务板块",o.jsx(Ie,{value:f,ariaLabel:"下料业务板块",placeholder:"不处理下料消息",options:[{value:"",label:"不处理下料消息"},...n.businessSections.map(E=>({value:E,label:E}))],onChange:E=>{m(E),s({...a,cutting:""})}})]}),o.jsxs("label",{children:["下料主数据库",o.jsx(Ie,{value:a.cutting,ariaLabel:"下料主数据库",placeholder:"不处理下料消息",disabled:n.usesBusinessSections&&!f,options:[{value:"",label:"不处理下料消息"},...v(f).map(E=>({value:E.id,label:E.name}))],onChange:E=>s({...a,cutting:E})})]}),n.usesBusinessSections&&o.jsxs("label",{children:["塔筒业务板块",o.jsx(Ie,{value:p,ariaLabel:"塔筒业务板块",placeholder:"请选择业务板块",options:n.businessSections.map(E=>({value:E,label:E})),onChange:E=>{g(E),s({...a,towerDaily:""})}})]}),o.jsxs("label",{children:["塔筒产线主数据库",o.jsx(Ie,{value:a.towerDaily,ariaLabel:"塔筒产线主数据库",placeholder:"请选择具体数据库",disabled:n.usesBusinessSections&&!p,options:v(p).map(E=>({value:E.id,label:E.name})),onChange:E=>s({...a,towerDaily:E})})]}),l&&o.jsx("div",{className:"pm-notice",role:"alert",children:l}),o.jsxs("div",{className:"pm-dialog-actions",children:[o.jsx("button",{onClick:u,children:"取消"}),o.jsx("button",{className:"primary-button",disabled:!a.towerDaily,onClick:h,children:"保存绑定"})]})]})})}function Wv({configure:n,disabled:a}){return o.jsxs("header",{className:"content-header",children:[o.jsx("h1",{children:"生产消息入库"}),o.jsx("button",{type:"button",className:"template-config-button",disabled:a,"aria-label":"数据库绑定",title:"数据库绑定",onClick:n,children:o.jsx(Pf,{})})]})}function Iv({current:n}){return o.jsx(J0,{current:n,titles:["录入消息","解析确认","完成"],label:"生产消息入库进度"})}const ex={audit:"正在检查",repair:"正在备份修复并复查",export:"正在导出",pickFolder:"选择目录",openOutput:"正在打开目录"},tx=n=>n.split(/[\\/]/).pop();function EA(){const[n,a]=S.useState(""),[s,l]=S.useState(),[u,h]=S.useState(),[f,m]=S.useState(),[p,g]=S.useState(),[v,x]=S.useState(),[b,E]=S.useState(""),[w,N]=S.useState("全部"),[T,A]=S.useState(),D=S.useRef(!1),_=S.useRef(0);S.useEffect(()=>()=>{_.current++},[]);const O=(s==null?void 0:s.issues.filter(V=>V.severity==="错误").length)||0,U=(s==null?void 0:s.issues.filter(V=>V.severity==="警告").length)||0;function H(V){D.current||(a(V),l(void 0),m(void 0),h(void 0),E(""),A(void 0),N("全部"))}async function M(V){if(D.current||V==="audit"&&!n.trim()||["repair","export","openOutput"].includes(V)&&!s)return;const K=++_.current;D.current=!0,g(V),E(""),x(void 0),V==="audit"&&(l(void 0),h(void 0),N("全部")),V==="repair"&&(l(Q=>Q&&{...Q,repaired:!1,canExport:!1}),h(void 0)),["audit","repair","export"].includes(V)&&(m(void 0),A(void 0));try{if(V==="pickFolder"){const Q=await me("plan.pickFolder",void 0,6e5);if(K!==_.current)return;Q.path&&(D.current=!1,H(Q.path),D.current=!0)}else{const Q=await me(`plan.${V}`,{path:n.trim(),auditId:s==null?void 0:s.auditId,confirmed:V==="repair"||V==="export"},18e5,ie=>{K===_.current&&D.current&&A(ie)});if(K!==_.current)return;if(V==="audit"&&l(Q),V==="repair"){const ie=Q;l(ie.audit),h(ie.repair)}V==="export"&&m(Q)}}catch(Q){K===_.current&&(E(Q instanceof Error?Q.message:String(Q)),(V==="repair"||V==="export")&&l(ie=>ie&&{...ie,canExport:!1,repaired:!1}))}finally{K===_.current&&(D.current=!1,g(void 0),A(void 0))}}const R=p?ex[p]:f?"候选 PDF 已生成":s?O?"存在待处理错误":s.canExport?"可以导出":"检查完成，待修复":"等待检查";return o.jsxs("div",{className:"page plan-pdf-page",children:[o.jsxs("header",{className:"plan-header",children:[o.jsx("h1",{children:"挂网计划导出"}),o.jsx("span",{children:R})]}),o.jsxs("div",{className:"plan-content",children:[o.jsxs("section",{className:"plan-source",children:[o.jsx("label",{htmlFor:"plan-folder",children:"月度目录"}),o.jsxs("div",{children:[o.jsx("input",{id:"plan-folder",value:n,disabled:!!p,placeholder:"选择包含一二三级计划的月份目录",onChange:V=>H(V.target.value)}),o.jsxs("button",{className:"secondary",disabled:!!p,onClick:()=>void M("pickFolder"),children:[o.jsx(ho,{}),"选择目录"]}),o.jsx("button",{className:"primary",disabled:!!p||!n.trim(),onClick:()=>void M("audit"),children:s?"重新检查":"检查计划"})]})]}),b&&o.jsx("p",{className:"plan-error",role:"alert",children:b}),p&&o.jsxs("div",{className:"plan-progress",role:"status",children:[o.jsxs("span",{children:[o.jsx(Sn,{className:"spin"}),ex[p]]}),p==="export"&&T&&o.jsxs(o.Fragment,{children:[o.jsxs("span",{children:[T.current," / ",T.total," · ",T.name]}),o.jsx("progress",{"aria-label":"PDF 导出进度",max:T.total||11,value:T.current})]})]}),o.jsxs("div",{className:"plan-workspace",children:[o.jsxs("section",{className:"plan-inspection",children:[o.jsxs("div",{className:"plan-pane-heading",children:[o.jsx("h2",{children:"检查结果"}),s&&o.jsxs("span",{children:[s.sheetCount," 个工作表"]})]}),s?o.jsxs(o.Fragment,{children:[o.jsxs("div",{className:"plan-workbook",children:[o.jsxs("strong",{children:[s.workspace.year," 年 ",s.workspace.month," 月计划"]}),o.jsx("span",{children:tx(s.workspace.workbookPath)})]}),o.jsx("div",{className:"plan-filters","aria-label":"问题筛选",children:["全部","错误","警告"].map(V=>o.jsxs("button",{"aria-pressed":w===V,onClick:()=>N(V),children:[V," ",o.jsx("span",{children:V==="全部"?s.issues.length:V==="错误"?O:U})]},V))}),o.jsxs("div",{className:"plan-issues",children:[s.issues.filter(V=>w==="全部"||V.severity===w).map((V,K)=>o.jsxs("article",{children:[o.jsxs("div",{children:[o.jsx("span",{className:V.severity==="错误"?"plan-severity-error":"",children:V.severity}),o.jsxs("strong",{children:[V.sheet,V.location&&` · ${V.location}`]}),o.jsx("span",{children:V.canAutoFix?"可自动修复":"需手动处理"})]}),o.jsx("p",{children:V.message})]},K)),!s.issues.some(V=>w==="全部"||V.severity===w)&&o.jsx("p",{className:"plan-clear",children:s.issues.length?`没有${w}`:"未发现检查问题"})]}),o.jsxs("div",{className:"plan-next",children:[o.jsx("span",{children:O?s.repaired?"请手动处理剩余错误，再重新检查。":"修复后自动复查，剩余错误需手动处理。":s.canExport?"复查通过，可以导出候选 PDF。":"继续备份并修复，完成导出前准备。"}),o.jsx("button",{className:"secondary",disabled:!!p,onClick:()=>x("repair"),children:s.repaired?"再次修复":"备份并修复"})]}),u&&o.jsxs("details",{className:"plan-details",children:[o.jsx("summary",{children:"备份与修复明细"}),o.jsxs("p",{children:["已调整 ",u.changedCells," 个单元格、",u.changedRows," 行。"]}),o.jsxs("p",{children:["备份：",u.backupPath]})]})]}):o.jsxs("div",{className:"plan-empty",children:[o.jsx(Dv,{}),o.jsx("strong",{children:"尚未检查计划"}),o.jsx("p",{children:"选择月度目录后，查看需要处理的问题。"})]})]}),o.jsxs("section",{className:"plan-result",children:[o.jsxs("div",{className:"plan-pane-heading",children:[o.jsx("h2",{children:"导出结果"}),f&&o.jsxs("span",{children:[f.files.length," 份 PDF"]})]}),f?o.jsxs(o.Fragment,{children:[o.jsx("div",{className:"plan-file-list",children:f.files.map(V=>o.jsx("p",{children:tx(V)},V))}),o.jsxs("div",{className:"plan-output",children:[o.jsx("span",{children:"文件位置"}),o.jsx("p",{children:f.outputFolder}),o.jsxs("button",{className:"secondary",disabled:!!p,onClick:()=>void M("openOutput"),children:[o.jsx(ho,{}),"打开输出目录"]})]})]}):o.jsxs("div",{className:"plan-empty",children:[o.jsx(Dv,{}),o.jsx("strong",{children:p==="export"?"正在生成候选 PDF":"尚未导出"}),o.jsx("p",{children:"完成检查和修复后，生成 11 份候选 PDF。"})]}),o.jsx("div",{className:"plan-export-action",children:o.jsx("button",{className:"primary",disabled:!!p||!(s!=null&&s.canExport),onClick:()=>x("export"),children:f?"重新导出 PDF":"导出 PDF"})})]})]})]}),o.jsx(mo,{open:!!v,onOpenChange:V=>{V||x(void 0)},children:o.jsxs(po,{children:[o.jsx(go,{className:"dialog-overlay"}),o.jsxs(yo,{className:"plan-confirm",children:[o.jsxs("div",{children:[o.jsx(vo,{children:v==="repair"?"确认备份并修复":"确认导出 PDF"}),o.jsx(bo,{asChild:!0,children:o.jsx("button",{className:"secondary","aria-label":"关闭确认",children:o.jsx(Gf,{})})})]}),o.jsx(xo,{children:v==="repair"?"将先备份 Excel，再修复格式和序号，并自动复查。":"将生成 11 份候选 PDF，不修改 Excel。"}),o.jsxs("footer",{children:[o.jsx(bo,{asChild:!0,children:o.jsx("button",{className:"secondary",autoFocus:!0,children:"取消"})}),o.jsx("button",{className:"primary",onClick:()=>v&&void M(v),children:v==="repair"?"备份并修复":"确认导出"})]})]})]})})]})}const TA=n=>n.split(/[\\/]/).pop();function CA(){const[n,a]=S.useState(""),[s,l]=S.useState(),[u,h]=S.useState(),[f,m]=S.useState(""),p=S.useRef(!1),g=S.useRef(0);S.useEffect(()=>()=>{g.current++},[]);function v(b){p.current||(a(b),l(void 0),m(""))}async function x(b){if(p.current||b==="export"&&!n.trim()||b==="open"&&!s)return;p.current=!0;const E=++g.current;h(b),m(""),b==="export"&&l(void 0);try{if(b==="pick"){const w=await me("meeting.pickFile",void 0,6e5);E===g.current&&w.path&&(a(w.path),l(void 0))}else if(b==="export"){const w=await me("meeting.export",{path:n.trim()},18e5);E===g.current&&l(w)}else await me("meeting.openOutput",{resultId:s.resultId})}catch(w){E===g.current&&m(w instanceof Error?w.message:String(w))}finally{E===g.current&&(p.current=!1,h(void 0))}}return o.jsxs("div",{className:"page meeting-page",children:[o.jsxs("header",{className:"meeting-header",children:[o.jsx("h1",{children:"生产会资料拆分"}),o.jsx("span",{children:u==="export"?"正在拆分":s?"拆分完成":"等待拆分"})]}),o.jsxs("div",{className:"meeting-content",children:[f&&o.jsx("p",{className:"meeting-error",role:"alert",children:f}),o.jsxs("div",{className:"meeting-workspace",children:[o.jsxs("section",{children:[o.jsx("h2",{children:"源文件"}),o.jsx("label",{htmlFor:"meeting-source",children:"生产会资料 Excel"}),o.jsxs("div",{className:"meeting-input",children:[o.jsx("input",{id:"meeting-source",value:n,disabled:!!u,onChange:b=>v(b.target.value),placeholder:"选择 .xlsx、.xlsm 或 .xls 文件"}),o.jsxs("button",{className:"secondary",disabled:!!u,onClick:()=>void x("pick"),children:[o.jsx(ho,{}),"选择文件"]})]}),o.jsx("p",{className:"meeting-hint",children:"源文件需包含一个工作表，按已发运、在制、预投三个分段拆分。"}),o.jsxs("details",{className:"meeting-rules",children:[o.jsx("summary",{children:"拆分规则"}),o.jsx("p",{children:"生成包含三个独立工作表的 .xlsx，保存到源文件所在目录，保留源文件。"}),o.jsx("p",{children:"保留原有内容、公式和布局，清除红色与绿色背景填充。宏不会保留到输出文件。"})]}),o.jsx("div",{className:"meeting-actions",children:o.jsx("button",{className:"primary",disabled:!!u||!n.trim(),onClick:()=>void x("export"),children:u==="export"?"正在拆分…":s?"重新拆分":"开始拆分"})})]}),o.jsxs("section",{className:"meeting-result","aria-live":"polite",children:[o.jsxs("div",{className:"meeting-result-heading",children:[o.jsx("h2",{children:"拆分结果"}),s&&o.jsxs("span",{children:[s.sheetNames.length," 个工作表"]})]}),s?o.jsxs(o.Fragment,{children:[o.jsxs("div",{className:"meeting-file",children:[o.jsx(fo,{}),o.jsxs("div",{children:[o.jsx("h3",{children:TA(s.outputPath)}),o.jsxs("p",{children:["开会日期 · ",s.meetingDate]})]})]}),o.jsx("ol",{children:s.sheetNames.map(b=>o.jsx("li",{children:b},b))}),o.jsxs("div",{className:"meeting-output",children:[o.jsx("span",{children:"文件位置"}),o.jsx("p",{children:s.outputPath}),o.jsxs("button",{className:"secondary",disabled:!!u,onClick:()=>void x("open"),children:[o.jsx(ho,{}),"打开文件位置"]})]})]}):o.jsxs("div",{className:"meeting-empty",children:[u==="export"?o.jsx(Sn,{className:"spin"}):o.jsx(fo,{}),o.jsx("strong",{children:u==="export"?"正在生成拆分文件":"尚未生成拆分文件"}),o.jsx("p",{children:u==="export"?"正在检查并处理工作表，请稍候。":"选择源文件后开始拆分。"})]})]})]})]})]})}const Sd=(n=0)=>{const a=new Date;return{startDate:new Date(Date.UTC(a.getFullYear(),a.getMonth()+n-1,21)).toISOString().slice(0,10),endDate:new Date(Date.UTC(a.getFullYear(),a.getMonth()+n,20)).toISOString().slice(0,10)}},jd={sourceRoot:"",outputRoot:"",reportUrl:"",username:"",password:""},nx=n=>({sourceRoot:n.sourceRoot,outputRoot:n.outputRoot,reportUrl:n.reportUrl,username:n.username,password:""}),ql=n=>n instanceof Error?n.message:String(n),rx=n=>n?`${n.slice(0,4)} 年 ${Number(n.slice(5,7))} 月`:"—",ax={prepare:"准备中",collect:"正在导出日报",parse:"正在读取数据",summary:"正在生成汇总",complete:"正在完成"};function NA(){const[n,a]=S.useState(),[s,l]=S.useState(Sd),[u,h]=S.useState(jd),[f,m]=S.useState(!1),[p,g]=S.useState("load"),[v,x]=S.useState(""),[b,E]=S.useState(""),[w,N]=S.useState(),[T,A]=S.useState(),[D,_]=S.useState(!1),[O,U]=S.useState(!1),H=S.useRef(0),M=S.useRef(!1),R=Math.floor((Date.parse(`${s.endDate}T00:00:00Z`)-Date.parse(`${s.startDate}T00:00:00Z`))/864e5)+1,V=Number.isFinite(R)?R<1?"结束日期不能早于开始日期。":R>366?"单次统计范围不能超过 366 天。":"":"请选择完整日期。",K=T!=null&&T.total?Math.min(100,Math.max(0,Math.round(T.current/T.total*100))):0;async function Q(){const W=++H.current;M.current=!0,g("load"),x("");try{const Y=await me("report.getState");W===H.current&&a(Y)}catch(Y){W===H.current&&x(ql(Y))}finally{W===H.current&&(M.current=!1,g(void 0))}}S.useEffect(()=>(Q(),()=>{H.current++}),[]);function ie(W){M.current||(l(W),N(void 0),A(void 0),_(!1),x(""),U(!1))}function J(W){M.current||(m(W),E(""),h(W&&n?nx(n):jd))}async function G(W){if(W.preventDefault(),M.current||!n)return;const Y={...u,sourceRoot:u.sourceRoot.trim(),outputRoot:u.outputRoot.trim(),reportUrl:u.reportUrl.trim(),username:u.username.trim()};if(JSON.stringify(Y)===JSON.stringify(nx(n))){J(!1);return}const te=++H.current;M.current=!0,g("save"),E("");try{const C=await me("report.saveConfig",Y);if(te!==H.current)return;a(C),m(!1),h(jd),N(void 0),A(void 0),_(!1),x("")}catch(C){te===H.current&&E(ql(C))}finally{te===H.current&&(M.current=!1,g(void 0))}}async function de(){if(M.current||!(n!=null&&n.credentialsConfigured))return;const W=++H.current;M.current=!0,g("auth"),x("");try{await me("report.authenticate",void 0,600*1e3);const Y=await me("report.getState");W===H.current&&a(Y)}catch(Y){W===H.current&&x(ql(Y))}finally{W===H.current&&(M.current=!1,g(void 0))}}async function L(){if(M.current||!(n!=null&&n.authenticated)||V)return;const W=++H.current,Y={...s};M.current=!0,g("run"),x(""),N(void 0),_(!1),U(!1),A({stage:"prepare",current:0,total:R,message:""});try{const te=await me("report.run",Y,18e5,C=>{W===H.current&&M.current&&A(C)});W===H.current&&(N(te),A(void 0))}catch(te){W===H.current&&(x(ql(te)),_(!0),A(void 0))}finally{W===H.current&&(M.current=!1,g(void 0))}}async function ne(){if(w)try{await navigator.clipboard.writeText(w.summaryPath),U(!0)}catch{x("无法复制，请选中文件路径手动复制。")}}return o.jsxs("div",{className:"page report-center-page",children:[o.jsxs("header",{className:"report-header",children:[o.jsx("h1",{children:"文件统计汇总"}),o.jsxs("div",{className:"report-header-actions",children:[o.jsx("span",{className:"report-status",children:p==="load"?"加载中":n!=null&&n.authenticated?"已验证登录":"未验证登录"}),o.jsx("button",{className:"secondary report-icon-button","aria-label":"报表设置",title:"报表设置",disabled:!!p||!n,onClick:()=>J(!0),children:o.jsx(Pf,{})})]})]}),o.jsxs("div",{className:"report-content",children:[v&&o.jsxs("div",{className:"report-error",role:"alert",children:[o.jsx("span",{children:v}),!n&&o.jsx("button",{className:"secondary",disabled:!!p,onClick:()=>void Q(),children:"重新加载"})]}),o.jsxs("section",{className:"report-workspace",children:[o.jsxs("div",{className:"report-pane report-period",children:[o.jsxs("div",{className:"report-pane-heading",children:[o.jsx("h2",{children:"统计范围"}),!V&&o.jsxs("span",{children:[R," 天"]})]}),o.jsxs("div",{className:"report-dates",children:[o.jsx(tn,{label:"开始日期",value:s.startDate,disabled:!!p,onChange:W=>ie({...s,startDate:W})}),o.jsx(tn,{label:"结束日期",value:s.endDate,disabled:!!p,onChange:W=>ie({...s,endDate:W})})]}),o.jsxs("div",{className:"report-range-tools",children:[o.jsxs("div",{children:[o.jsx("button",{disabled:!!p,onClick:()=>ie(Sd()),children:"本期"}),o.jsx("button",{disabled:!!p,onClick:()=>ie(Sd(-1)),children:"上期"})]}),o.jsx("span",{children:V||`汇总月份 · ${rx(s.endDate)}`})]}),o.jsxs("div",{className:"report-execution",children:[p==="run"&&o.jsxs("div",{className:"report-progress",role:"status",children:[o.jsxs("div",{children:[o.jsxs("span",{children:[o.jsx(Sn,{className:"spin"}),ax[(T==null?void 0:T.stage)||"prepare"]]}),T&&["collect","parse"].includes(T.stage)&&o.jsxs("span",{children:[T.current," / ",T.total]})]}),o.jsx("div",{className:"report-progress-bar",role:"progressbar","aria-label":ax[(T==null?void 0:T.stage)||"prepare"],"aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":K,children:o.jsx("i",{style:{width:`${K}%`}})}),(T==null?void 0:T.message)&&o.jsxs("details",{className:"report-details",children:[o.jsx("summary",{children:"处理详情"}),o.jsx("p",{children:T.message})]})]}),!(n!=null&&n.credentialsConfigured)&&n&&o.jsxs("p",{className:"report-setup",children:["请先配置报表连接。",o.jsx("button",{onClick:()=>J(!0),children:"报表设置"})]}),(n==null?void 0:n.credentialsConfigured)&&!n.authenticated&&o.jsx("p",{className:"report-setup",children:"请先验证登录。"}),o.jsxs("div",{className:"report-actions",children:[(n==null?void 0:n.credentialsConfigured)&&o.jsxs("button",{className:"secondary",disabled:!!p,onClick:de,children:[p==="auth"&&o.jsx(Sn,{className:"spin"}),p==="auth"?"验证中…":n!=null&&n.authenticated?"重新验证":"验证登录"]}),o.jsx("button",{className:"primary",disabled:!!p||!(n!=null&&n.authenticated)||!!V,onClick:L,children:p==="run"?"正在汇总…":D?"重新汇总":"开始汇总"})]})]})]}),o.jsxs("div",{className:"report-pane report-result","aria-live":"polite",children:[o.jsxs("div",{className:"report-pane-heading",children:[o.jsx("h2",{children:"汇总结果"}),w&&o.jsx("span",{children:"已完成"})]}),w?o.jsxs(o.Fragment,{children:[o.jsxs("div",{className:"report-file",children:[o.jsx(fo,{}),o.jsxs("div",{children:[o.jsxs("h3",{children:[rx(w.period.endDate),"设备台时汇总"]}),o.jsxs("p",{children:[w.period.startDate," — ",w.period.endDate]})]})]}),o.jsxs("dl",{className:"report-result-stats",children:[o.jsxs("div",{children:[o.jsx("dt",{children:"日报"}),o.jsxs("dd",{children:[w.parsedReports," / ",w.plannedReports," 份"]})]}),o.jsxs("div",{children:[o.jsx("dt",{children:"设备"}),o.jsxs("dd",{children:[w.deviceCount," 台"]})]})]}),o.jsxs("div",{className:"report-output",children:[o.jsx("span",{children:"文件位置"}),o.jsx("p",{children:w.summaryPath}),o.jsxs("button",{className:"secondary",onClick:ne,children:[o.jsx(YC,{}),O?"已复制":"复制路径"]})]}),o.jsxs("details",{className:"report-details",children:[o.jsx("summary",{children:"汇总明细"}),o.jsxs("p",{children:["数据点：",w.actualDataPoints," / ",w.expectedDataPoints]}),w.warnings.map((W,Y)=>o.jsx("p",{children:W},Y))]})]}):o.jsxs("div",{className:"report-empty",children:[o.jsx(fo,{}),o.jsx("strong",{children:p==="run"?"正在生成汇总":D?"未生成汇总文件":"尚未生成汇总"}),o.jsx("p",{children:p==="run"?"完成后可在这里查看文件。":D?"处理错误后，可重新汇总。":"选择统计范围后开始汇总。"})]})]})]})]}),o.jsx(mo,{open:f,onOpenChange:J,children:o.jsxs(po,{children:[o.jsx(go,{className:"dialog-overlay"}),o.jsxs(yo,{className:"report-settings-dialog",children:[o.jsxs("div",{className:"report-settings-heading",children:[o.jsx(vo,{children:"报表设置"}),o.jsx(bo,{asChild:!0,children:o.jsx("button",{className:"secondary report-icon-button",disabled:!!p,"aria-label":"关闭报表设置",children:o.jsx(Gf,{})})})]}),o.jsx(xo,{className:"report-sr-only",children:"设置报表连接与文件保存位置。"}),o.jsxs("form",{onSubmit:G,children:[o.jsxs("fieldset",{disabled:!!p,children:[o.jsx("legend",{children:"报表连接"}),o.jsxs("label",{children:["报表网页",o.jsx("input",{type:"url",required:!0,value:u.reportUrl,onChange:W=>h({...u,reportUrl:W.target.value}),placeholder:"https://…"})]}),o.jsxs("div",{className:"report-settings-grid",children:[o.jsxs("label",{children:["账号",o.jsx("input",{required:!0,autoComplete:"username",value:u.username,onChange:W=>h({...u,username:W.target.value})})]}),o.jsxs("label",{children:["密码",o.jsx("input",{type:"password",required:!(n!=null&&n.credentialsConfigured),autoComplete:"new-password",value:u.password,onChange:W=>h({...u,password:W.target.value}),placeholder:n!=null&&n.credentialsConfigured?"留空保持原密码":"请输入密码"})]})]})]}),o.jsxs("fieldset",{disabled:!!p,children:[o.jsx("legend",{children:"保存位置"}),o.jsxs("label",{children:["原始日报",o.jsx("input",{required:!0,value:u.sourceRoot,onChange:W=>h({...u,sourceRoot:W.target.value})})]}),o.jsxs("label",{children:["汇总文件",o.jsx("input",{required:!0,value:u.outputRoot,onChange:W=>h({...u,outputRoot:W.target.value})})]})]}),b&&o.jsx("p",{className:"report-error",role:"alert",children:b}),o.jsxs("div",{className:"report-settings-actions",children:[o.jsx(bo,{asChild:!0,children:o.jsx("button",{className:"secondary",type:"button",disabled:!!p,children:"取消"})}),o.jsx("button",{className:"primary",type:"submit",disabled:!!p,children:p==="save"?"保存中…":"保存设置"})]})]})]})]})})]})}const cf="••••••••••••",ix=[{key:"connection",label:"连接",keywords:"Notion API 令牌 根页面 数据源",icon:o.jsx(_A,{})},{key:"notification",label:"通知",keywords:"钉钉 Webhook Secret 规则",icon:o.jsx(VA,{})},{key:"data",label:"数据与缓存",keywords:"Notion 数据源 缓存 绑定",icon:o.jsx(BA,{})},{key:"about",label:"关于",keywords:"版本 WebView2 React TypeScript",icon:o.jsx(LA,{})}];function DA({open:n,onClose:a}){const[s,l]=S.useState("connection"),[u,h]=S.useState(""),[f,m]=S.useState(null),[p,g]=S.useState(""),[v,x]=S.useState(""),[b,E]=S.useState(""),w=S.useRef(null),N=S.useRef(null);S.useEffect(()=>{if(!n)return;N.current=document.activeElement instanceof HTMLElement?document.activeElement:null,E("settings.open"),x(""),me("settings.open").then(_=>m(_)).catch(_=>x(_ instanceof Error?_.message:"设置加载失败，请重试。")).finally(()=>E("")),window.setTimeout(()=>{var _;return(_=w.current)==null?void 0:_.focus()},0);const D=_=>{_.key==="Escape"&&a()};return window.addEventListener("keydown",D),()=>{var _;window.removeEventListener("keydown",D),(_=N.current)==null||_.focus()}},[n,a]),S.useEffect(()=>{if(!p)return;const D=window.setTimeout(()=>g(""),3e3);return()=>window.clearTimeout(D)},[p]);const T=async(D,_)=>{E(D),x(""),g("");try{const O=await me(D,_,6e4);return(D==="settings.refreshDataSources"||D==="settings.saveConnection")&&uN(!0),m(O.state),g(O.message),!0}catch(O){return x(O instanceof Error?O.message:"操作未完成，请重试。"),!1}finally{E("")}},A=S.useMemo(()=>{const D=u.trim().toLocaleLowerCase("zh-CN");return D?ix.filter(_=>`${_.label} ${_.keywords}`.toLocaleLowerCase("zh-CN").includes(D)):ix},[u]);return n?o.jsx("div",{className:"settings-overlay",onMouseDown:D=>{D.target===D.currentTarget&&a()},children:o.jsxs("div",{className:"settings-window",role:"dialog","aria-modal":"true","aria-label":"设置",children:[o.jsxs("aside",{className:"settings-sidebar",children:[o.jsxs("label",{className:"settings-search",children:[o.jsx(zA,{}),o.jsx("input",{value:u,onChange:D=>h(D.target.value),placeholder:"搜索设置","aria-label":"搜索设置"})]}),o.jsx("div",{className:"settings-sidebar-title",children:"设置"}),o.jsxs("nav",{className:"settings-nav","aria-label":"设置分类",children:[A.map(D=>o.jsxs("button",{type:"button",className:s===D.key?"settings-nav-item active":"settings-nav-item","aria-current":s===D.key?"page":void 0,onClick:()=>l(D.key),children:[o.jsx("span",{className:"settings-nav-icon",children:D.icon}),o.jsx("span",{children:D.label})]},D.key)),A.length===0&&o.jsx("p",{className:"settings-empty-search",children:"没有匹配的设置"})]})]}),o.jsxs("main",{className:"settings-main",children:[o.jsx("button",{ref:w,type:"button",className:"settings-close",onClick:a,"aria-label":"关闭设置",children:o.jsx(UA,{})}),o.jsxs("div",{className:"settings-content",children:[b==="settings.open"&&!f?o.jsx("div",{className:"settings-loading",children:"正在读取本机设置…"}):o.jsxs(o.Fragment,{children:[s==="connection"&&f&&o.jsx(AA,{state:f,busy:b,run:T}),s==="notification"&&f&&o.jsx(MA,{state:f,busy:b,run:T}),s==="data"&&f&&o.jsx(kA,{state:f,busy:b,run:T}),s==="about"&&f&&o.jsx(RA,{state:f})]}),(p||v)&&o.jsx("div",{className:`settings-message ${v?"error":""}`,role:"status","aria-live":"polite",children:v||p})]})]})]})}):null}function AA({state:n,busy:a,run:s}){const[l,u]=S.useState(""),[h,f]=S.useState(!1),[m,p]=S.useState(n.notion.rootPageId);S.useEffect(()=>p(n.notion.rootPageId),[n.notion.rootPageId]);const g=async b=>{await s(b,{token:h?l:"",rootPageId:m})&&(u(""),f(!1))},v=a==="settings.refreshDataSources",x=a==="settings.saveConnection";return o.jsxs(Do,{title:"连接",description:"管理生产助手使用的外部数据源和服务连接。",children:[o.jsxs(Xr,{title:"Notion",children:[o.jsx(Ht,{title:"连接状态",description:"当前本机连接配置和数据源缓存状态",children:o.jsx(I0,{connected:n.notion.configured,label:n.notion.configured?"已配置":"未配置"})}),o.jsx(Ji,{title:"API 令牌",description:"使用 Windows 当前用户加密后保存在本机",children:o.jsx("input",{className:"settings-input",type:"password",autoComplete:"off",placeholder:"输入 Notion API Token",value:h?l:n.notion.configured?cf:"",onFocus:b=>{!h&&n.notion.configured&&b.currentTarget.select()},onChange:b=>{f(!0),u(b.target.value)}})}),o.jsx(Ji,{title:"根页面 ID",description:"可选。留空时自动发现当前令牌有权限访问的数据源",children:o.jsx("input",{className:"settings-input",value:m,onChange:b=>p(b.target.value)})}),o.jsxs("div",{className:"settings-buttons",children:[o.jsxs("button",{type:"button",className:"settings-button-primary",disabled:!!a,onClick:()=>g("settings.saveConnection"),children:[x&&o.jsx(as,{})," ",x?"正在连接…":"保存并连接"]}),o.jsxs("button",{type:"button",className:"settings-button-secondary",disabled:!!a,onClick:()=>g("settings.refreshDataSources"),children:[v&&o.jsx(as,{})," ",v?"正在刷新…":"刷新数据源"]})]})]}),o.jsxs(Xr,{title:"数据源",children:[o.jsx(Ht,{title:"已发现数据源",description:"最近一次从 Notion 获取的数据源",children:o.jsxs("span",{className:"settings-value",children:[n.notion.dataSourceCount," 个"]})}),o.jsx(Ht,{title:"上次同步",description:"数据源元信息最后更新时间",children:o.jsx("span",{className:"settings-value",children:n.notion.lastSyncedAt||"尚未同步"})})]})]})}function MA({state:n,busy:a,run:s}){const l=n.notification,[u,h]=S.useState(l.enabled),[f,m]=S.useState(l.channelName),[p,g]=S.useState(""),[v,x]=S.useState(""),[b,E]=S.useState(!1),[w,N]=S.useState(!1),[T,A]=S.useState(l.rules);S.useEffect(()=>{h(l.enabled),m(l.channelName),A(l.rules)},[l]);const D={enabled:u,channelName:f,webhook:b?p:"",secret:w?v:""},_=async H=>{await s(H,D)&&(g(""),x(""),E(!1),N(!1))},O=a==="settings.saveNotification",U=a==="settings.testNotification";return o.jsxs(Do,{title:"通知",description:"配置生产助手全局通知使用的技术通道。业务模块只决定何时通知。",children:[o.jsxs(Xr,{title:"通知服务",children:[o.jsx(Ht,{title:"启用通知",description:"关闭后所有业务模块都不会向外发送通知",children:o.jsx(sx,{checked:u,onChange:h,label:"启用通知"})}),o.jsx(Ht,{title:"发送方式",description:"当前使用的全局通知技术通道",children:o.jsx("span",{className:"settings-value",children:"钉钉机器人 Webhook"})}),o.jsx(Ht,{title:"连接状态",description:l.checkedAt?`上次测试 ${l.checkedAt}`:"尚未发送测试通知",children:o.jsx(I0,{connected:l.connected,label:l.connected===!0?"连接正常":l.connected===!1?"连接失败":"待测试"})})]}),o.jsxs(Xr,{title:"钉钉机器人",children:[o.jsx(Ji,{title:"Webhook URL",description:"使用 Windows 当前用户加密后保存在本机",children:o.jsx("input",{className:"settings-input",type:"password",autoComplete:"off",placeholder:"https://oapi.dingtalk.com/robot/send?...",value:b?p:l.webhookConfigured?cf:"",onFocus:H=>{!b&&l.webhookConfigured&&H.currentTarget.select()},onChange:H=>{E(!0),g(H.target.value)}})}),o.jsx(Ji,{title:"加签密钥",description:"钉钉机器人 Secret，使用 Windows 当前用户加密保存",children:o.jsx("input",{className:"settings-input",type:"password",autoComplete:"off",placeholder:"SEC...",value:w?v:l.secretConfigured?cf:"",onFocus:H=>{!w&&l.secretConfigured&&H.currentTarget.select()},onChange:H=>{N(!0),x(H.target.value)}})}),o.jsx(Ji,{title:"默认接收群",description:"用于识别当前通知渠道",children:o.jsx("input",{className:"settings-input",value:f,onChange:H=>m(H.target.value),placeholder:"生产管理群"})}),o.jsxs("div",{className:"settings-buttons",children:[o.jsxs("button",{type:"button",className:"settings-button-primary",disabled:!!a,onClick:()=>_("settings.saveNotification"),children:[O&&o.jsx(as,{})," ",O?"正在保存…":"保存设置"]}),o.jsxs("button",{type:"button",className:"settings-button-secondary",disabled:!!a,onClick:()=>_("settings.testNotification"),children:[U&&o.jsx(as,{})," ",U?"正在发送…":"发送测试"]})]}),l.status&&o.jsx("p",{className:"settings-inline-status",children:l.status})]}),o.jsxs(Xr,{title:"通知规则",children:[o.jsx("div",{className:"settings-rule-list",children:T.map(H=>o.jsx(Ht,{title:H.name,description:`钉钉 · ${OA(H.level)}`,children:o.jsx(sx,{checked:H.enabled,label:`通知规则：${H.name}`,onChange:M=>A(R=>R.map(V=>V.eventType===H.eventType?{...V,enabled:M}:V))})},H.eventType))}),o.jsx("div",{className:"settings-buttons settings-buttons-end",children:o.jsx("button",{type:"button",className:"settings-button-primary",disabled:!!a,onClick:()=>s("settings.saveNotificationRules",{rules:T}),children:"保存通知规则"})})]})]})}function kA({state:n,busy:a,run:s}){return o.jsx(Do,{title:"数据与缓存",description:"查看和维护生产助手保存在本机的 Notion 数据源缓存。",children:o.jsxs(Xr,{title:"本地数据",children:[o.jsx(Ht,{title:"Notion 数据源缓存",description:"用于减少重复的网络请求",children:o.jsxs("div",{className:"settings-inline-actions",children:[o.jsxs("span",{className:"settings-value",children:[n.notion.dataSourceCount," 个"]}),o.jsxs("button",{type:"button",className:"settings-text-button",disabled:!!a,onClick:()=>s("settings.refreshDataSources"),children:[a==="settings.refreshDataSources"&&o.jsx(as,{})," ",a==="settings.refreshDataSources"?"刷新中…":"刷新"]})]})}),o.jsx(Ht,{title:"上次同步",description:"数据源元信息最后更新时间",children:o.jsx("span",{className:"settings-value",children:n.notion.lastSyncedAt||"尚未同步"})})]})})}function RA({state:n}){return o.jsx(Do,{title:"关于",description:"生产助手的版本和运行环境信息。",children:o.jsxs(Xr,{title:"生产助手",children:[o.jsx(Ht,{title:"版本",description:"当前安装版本",children:o.jsx("span",{className:"settings-value",children:n.version})}),o.jsx(Ht,{title:"桌面环境",description:"应用运行容器",children:o.jsx("span",{className:"settings-value",children:"WinUI 3 + WebView2"})}),o.jsx(Ht,{title:"前端",description:"用户界面技术栈",children:o.jsx("span",{className:"settings-value",children:"React + TypeScript"})}),o.jsx(Ht,{title:"本地数据保护",description:"令牌和通知凭据仅保存在本机",children:o.jsx("span",{className:"settings-value",children:"Windows 当前用户加密"})})]})})}function Do({title:n,description:a,children:s}){return o.jsxs("div",{className:"settings-page",children:[o.jsxs("header",{className:"settings-page-header",children:[o.jsx("h1",{children:n}),o.jsx("p",{children:a})]}),s]})}function Xr({title:n,children:a}){return o.jsxs("section",{className:"settings-section",children:[o.jsx("h2",{children:n}),o.jsx("div",{className:"settings-section-body",children:a})]})}function Ht({title:n,description:a,children:s}){return o.jsxs("div",{className:"settings-row",children:[o.jsxs("div",{className:"settings-row-text",children:[o.jsx("div",{className:"settings-row-title",children:n}),a&&o.jsx("div",{className:"settings-row-description",children:a})]}),o.jsx("div",{className:"settings-row-control",children:s})]})}function Ji({title:n,description:a,children:s}){return o.jsxs("label",{className:"settings-field",children:[o.jsx("span",{className:"settings-field-title",children:n}),a&&o.jsx("span",{className:"settings-field-description",children:a}),o.jsx("span",{className:"settings-field-control",children:s})]})}function sx({checked:n,onChange:a,label:s}){return o.jsx("button",{type:"button",role:"switch","aria-checked":n,"aria-label":s,className:n?"settings-switch checked":"settings-switch",onClick:()=>a(!n),children:o.jsx("span",{})})}function I0({connected:n,label:a}){return o.jsxs("div",{className:`settings-connected ${n===!1?"error":n===null?"pending":""}`,children:[o.jsx("span",{className:"settings-status-dot"}),a]})}function as(){return o.jsx("span",{className:"settings-spinner","aria-hidden":"true"})}const OA=n=>n==="warning"?"警告":n==="info"?"信息":"错误";function zA(){return o.jsxs("svg",{viewBox:"0 0 24 24","aria-hidden":"true",children:[o.jsx("circle",{cx:"11",cy:"11",r:"6.5"}),o.jsx("path",{d:"m16 16 4 4"})]})}function _A(){return o.jsxs("svg",{viewBox:"0 0 24 24","aria-hidden":"true",children:[o.jsx("path",{d:"M10 13a5 5 0 0 0 7.1.1l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1"}),o.jsx("path",{d:"M14 11a5 5 0 0 0-7.1-.1l-2 2A5 5 0 0 0 12 20l1.1-1.1"})]})}function VA(){return o.jsxs("svg",{viewBox:"0 0 24 24","aria-hidden":"true",children:[o.jsx("path",{d:"M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"}),o.jsx("path",{d:"M10 21h4"})]})}function BA(){return o.jsxs("svg",{viewBox:"0 0 24 24","aria-hidden":"true",children:[o.jsx("ellipse",{cx:"12",cy:"5",rx:"7",ry:"3"}),o.jsx("path",{d:"M5 5v6c0 1.7 3.1 3 7 3s7-1.3 7-3V5"}),o.jsx("path",{d:"M5 11v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"})]})}function LA(){return o.jsxs("svg",{viewBox:"0 0 24 24","aria-hidden":"true",children:[o.jsx("circle",{cx:"12",cy:"12",r:"9"}),o.jsx("path",{d:"M12 11v6"}),o.jsx("path",{d:"M12 7h.01"})]})}function UA(){return o.jsxs("svg",{viewBox:"0 0 24 24","aria-hidden":"true",children:[o.jsx("path",{d:"m6 6 12 12"}),o.jsx("path",{d:"m18 6-12 12"})]})}const wd=new Date().toISOString().slice(0,10);function HA(){const[n,a]=S.useState(""),[s,l]=S.useState(!1),[u,h]=S.useState([]),[f,m]=S.useState(""),[p,g]=S.useState([]),[v,x]=S.useState(""),[b,E]=S.useState([]),[w,N]=S.useState(""),[T,A]=S.useState([]),[D,_]=S.useState(""),[O,U]=S.useState(""),[H,M]=S.useState("day"),[R,V]=S.useState(wd),[K,Q]=S.useState(wd),[ie,J]=S.useState(wd),[G,de]=S.useState("load"),[L,ne]=S.useState(""),[W,Y]=S.useState();S.useEffect(()=>{me("database.getState").then(se=>{a(se.provider),l(se.usesBusinessSections),h(se.businessSections),g(se.sources)}).catch(se=>ne(se instanceof Error?se.message:String(se))).finally(()=>de(""))},[]);const te=async se=>{var ge,$,pe,ke;if(x(se),N(""),_(""),U(""),E([]),A([]),Y(void 0),ne(""),!!se){de("schema");try{const Xe=await me("database.getSchema",{sourceId:se});A(Xe.fields),E(Xe.datasets),_(((ge=Xe.fields.find(lt=>lt.type==="date"))==null?void 0:ge.id)||""),U((($=Xe.fields.find(lt=>lt.type==="number"))==null?void 0:$.id)||""),N(((pe=Xe.datasets.find(lt=>lt.name==="本年截止今日"))==null?void 0:pe.id)||((ke=Xe.datasets[0])==null?void 0:ke.id)||"")}catch(Xe){ne(Xe instanceof Error?Xe.message:String(Xe))}finally{de("")}}},C=async()=>{de("query"),ne(""),Y(void 0);try{Y(await me("database.inspect",{sourceId:v,datasetId:w,dateFieldId:be?D:"",valueFieldId:be?O:"",rangeKind:be?H:"all",businessDate:R,startDate:K,endDate:ie},12e4))}catch(se){ne(se instanceof Error?se.message:String(se))}finally{de("")}},z=T.filter(se=>se.type==="date"),re=s?p.filter(se=>se.businessSection===f):p,ce=T.filter(se=>se.type==="number"),ue=T.find(se=>se.id===O),fe=b.find(se=>se.id===w),be=(fe==null?void 0:fe.name.trim())==="本年截止今日",oe=S.useMemo(()=>{const se=new Set([D,O]);return[...T.filter(ge=>se.has(ge.id)),...T.filter(ge=>!se.has(ge.id))]},[T,D,O]),I=H==="week"||H==="custom",he=v&&w&&(!be||D&&(!I||K&&ie));return o.jsxs("div",{className:"page database-viewer-page",children:[o.jsxs("header",{children:[o.jsxs("div",{children:[o.jsx("h1",{children:"数据库查看"}),o.jsx("p",{children:"按当前适配器提供的目录选择数据库并查看真实 View；目录层级不会由界面写死。"})]}),o.jsxs("span",{className:"database-provider",children:[o.jsx(Kd,{}),"当前适配器：",n||"读取中"]})]}),o.jsxs("section",{className:"database-query-panel",children:[o.jsxs("div",{className:"database-query-heading",children:[o.jsx("h2",{children:"查询条件"}),o.jsx("p",{children:"普通 View 读取其完整结果；只有“本年截止今日”可在返回记录内计算日期口径。"})]}),o.jsxs("div",{className:"database-query-grid",children:[s&&o.jsxs("label",{children:["业务板块",o.jsx(Ie,{value:f,placeholder:G==="load"?"正在读取业务板块…":"请选择业务板块",disabled:!!G,options:u.map(se=>({value:se,label:se})),onChange:se=>{m(se),te("")}})]}),o.jsxs("label",{children:["数据库",o.jsx(Ie,{value:v,placeholder:"请选择具体数据库",disabled:s&&!f||!!G,options:re.map(se=>({value:se.id,label:se.name})),onChange:te})]}),o.jsxs("label",{children:["View",o.jsx(Ie,{value:w,placeholder:G==="schema"?"正在读取 View…":"请选择 View",disabled:!v||!!G,options:b.map(se=>({value:se.id,label:se.name})),onChange:se=>{N(se),Y(void 0)}})]}),be&&o.jsxs(o.Fragment,{children:[o.jsxs("label",{children:["日期字段",o.jsx(Ie,{value:D,placeholder:"请选择日期字段",disabled:!T.length||!!G,options:z.map(se=>({value:se.id,label:se.name})),onChange:_})]}),o.jsxs("label",{children:["累计字段",o.jsx(Ie,{value:O,placeholder:"可选择数值字段",disabled:!T.length||!!G,options:ce.map(se=>({value:se.id,label:se.name})),onChange:U})]}),o.jsxs("label",{children:["软件查询口径",o.jsx(Ie,{value:H,placeholder:"请选择日期口径",disabled:!!G,options:[{value:"day",label:"指定日期"},{value:"week",label:"指定日期范围"},{value:"month",label:"月初至指定日期"},{value:"year",label:"年初至指定日期"}],onChange:se=>{M(se),Y(void 0)}})]}),!I&&o.jsxs("label",{children:["指定日期",o.jsx(tn,{value:R,onChange:V})]}),I&&o.jsxs(o.Fragment,{children:[o.jsxs("label",{children:["开始日期",o.jsx(tn,{value:K,onChange:Q})]}),o.jsxs("label",{children:["结束日期",o.jsx(tn,{value:ie,onChange:J})]})]})]})]}),o.jsx("div",{className:"database-query-actions",children:o.jsxs("button",{className:"primary",disabled:!he||!!G,onClick:C,children:[G==="query"?o.jsx(Sn,{className:"spin"}):o.jsx(FC,{}),G==="query"?"正在查询…":"执行查询"]})})]}),L&&o.jsxs("div",{className:"notice error",role:"alert",children:[o.jsx(qC,{}),o.jsxs("div",{children:[o.jsx("strong",{children:"查询失败"}),o.jsx("span",{children:L})]})]}),W?o.jsxs("section",{className:"database-result",children:[o.jsxs("div",{className:"database-result-head",children:[o.jsxs("div",{children:[o.jsxs("h2",{children:[W.sourceName," · ",W.datasetName]}),o.jsx("p",{children:be?`${W.startDate} ～ ${W.endDate}`:"完整 View 结果"})]}),o.jsxs("dl",{children:[o.jsxs("div",{children:[o.jsxs("dt",{children:[o.jsx(KC,{}),"命中记录"]}),o.jsx("dd",{children:W.recordCount})]}),be&&o.jsxs("div",{children:[o.jsxs("dt",{children:[o.jsx(ZC,{}),(ue==null?void 0:ue.name)||"累计值"]}),o.jsx("dd",{children:W.total??"—"})]})]})]}),o.jsx("div",{className:"database-table-wrap",children:o.jsxs("table",{children:[o.jsx("thead",{children:o.jsx("tr",{children:oe.map(se=>o.jsxs("th",{children:[se.name,o.jsx("small",{children:se.type})]},se.id))})}),o.jsx("tbody",{children:W.records.map(se=>o.jsx("tr",{children:oe.map(ge=>o.jsx("td",{children:qA(se.values[ge.id])},ge.id))},se.id))})]})}),W.truncated&&o.jsx("p",{className:"database-truncated",children:"结果仅展示前 200 条，命中数量和累计值按全部记录计算。"})]}):!G&&!L&&o.jsxs("section",{className:"database-empty",children:[o.jsx(Kd,{}),o.jsx("h2",{children:s?"选择业务板块、数据库和 View 后执行查询":"选择数据库和 View 后执行查询"}),o.jsx("p",{children:"普通 View 显示完整结果；“本年截止今日”可进一步选择日期口径。所有操作均为只读。"})]})]})}function qA(n){return n==null||n===""?"—":typeof n=="boolean"?n?"是":"否":typeof n=="number"?n.toLocaleString("zh-CN",{maximumFractionDigits:2}):String(n)}function YA(){const[n,a]=S.useState(()=>window.location.search),[s,l]=S.useState(!1);S.useEffect(()=>{const E=()=>a(window.location.search);return window.addEventListener("popstate",E),()=>window.removeEventListener("popstate",E)},[]);const u=new URLSearchParams(n),h=u.get("route"),f=h!=null&&h.startsWith("navigation:")||h==="daily-weld"||h==="production-message"||h==="database-viewer"||h==="daily-report"||h==="report-center"||h==="plan-pdf"||h==="production-meeting"?h:"production-message",m=u.get("navigation")||"",p=Kb();S.useEffect(()=>{RC(f,m)},[f,m]);const g=E=>me("app.navigateNative",{tag:E}).catch(()=>{}),v=f.startsWith("navigation:")?f.slice(11):f,x=f.startsWith("navigation:");S.useEffect(()=>(document.body.classList.toggle("settings-over-native",x&&s),()=>document.body.classList.remove("settings-over-native")),[x,s]);const b=()=>{l(!1),window.dispatchEvent(new Event("production-settings-updated")),me("settings.close").catch(()=>{})};return o.jsxs("div",{className:`desktop-shell ${x&&s?"settings-over-native":""}`,children:[o.jsx("div",{className:"production-message-demo desktop-shell-navigation",children:o.jsx(mA,{active:v,navigate:g,openSettings:()=>l(!0)})}),o.jsx("div",{className:`desktop-shell-content ${x?"desktop-shell-content-native":""}`,children:x?o.jsx("div",{className:"native-content-slot","aria-hidden":"true"}):o.jsx(ST,{mode:"wait",children:o.jsx(Zb.div,{className:f==="production-message"||f==="daily-weld"?"production-message-demo production-message-content":"app-shell","data-page-route":f,initial:p?!1:{opacity:0,y:8},animate:{opacity:1,y:0},exit:p?void 0:{opacity:0,y:-6},transition:{duration:.2},children:f==="production-message"?o.jsx(SA,{}):f==="daily-weld"?o.jsx(dA,{openSettings:()=>l(!0)}):o.jsx("main",{children:f==="production-meeting"?o.jsx(CA,{}):f==="plan-pdf"?o.jsx(EA,{}):f==="database-viewer"?o.jsx(HA,{}):f==="daily-report"?o.jsx(oA,{openSettings:()=>l(!0)}):o.jsx(NA,{})})},f)})}),o.jsx(DA,{open:s,onClose:b})]})}kj.createRoot(document.getElementById("root")).render(o.jsx(cx.StrictMode,{children:o.jsx(YA,{})}));
